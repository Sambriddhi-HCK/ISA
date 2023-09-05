//API KEY
// api_key = "7d17be01b693f19d87e4e70713d64879";

// selecting variables from DOM
const container = document.querySelector("#container");
const city_search_box = document.querySelector("#city-search-box");
const submit = document.querySelector("#submit");
const weather_description = document.querySelector(".weather_description");
const weather_icon = document.querySelector(".weather-icon");
const city_name = document.querySelector(".city_name");
const max_temp = document.querySelector(".maximum-temperature");
const min_temp = document.querySelector(".minimum-temperature");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".windspeed");
const pressure = document.querySelector(".pressure");
const datebox = document.querySelector("#datebox");
const table = document.querySelector("#past_data_table");
const past = document.querySelector("#pastcontainer");


let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1; // as month returns a number between 0 and 11 , adding one to get 1 in January 
let day = date.getDate();
today = `${year}-0${month}-${day}`;

//fetch weather data for the city searched
async function fetchWeatherData(cityname) {
  /* fetching the api promise from OpenWeatherMap Api server and 
  assinging the Resolved to 'response' variable */
  // console.log(today);
  localdata = localStorage.getItem(cityname);
  // console.log(localdata);
  try {
    if (localdata) {
      localdata = JSON.parse(localdata);
      //adding data taken from the API to DOM 
      weather_description.innerHTML = `Weather Today : ${localdata.description}`;

      let fetchIcon = `${localdata.icon}`;
      weather_icon.innerHTML = `<img src = "http://openweathermap.org/img/wn/${fetchIcon}@2x.png">`;

      city_name.innerHTML = localdata.city;

      max_temp.innerHTML = `Maximum Temperature: ${localdata.max_temperature} °C`;

      min_temp.innerHTML = `Minimum Temperature: ${localdata.min_temperature} °C`;

      humidity.innerHTML = `Humidity : ${localdata.humidity}%`;

      wind.innerHTML = `Wind speed : ${localdata.wind_speed}m/s <br> degree : ${localdata.wind_degree}°`;

      pressure.innerHTML = `Pressure : ${localdata.pressure} Pascal`;

      datebox.innerHTML = localdata.date_Stamp;
      console.log("Current data obtained from local storage.");
    }

    else {
      const response = await fetch(`http://localhost/ISA/weatherapp/Prototype-three/currentdatafetch.php?name=${cityname}`);
      const data = await response.json(); //storing json content in data variable 
      console.log(data[0]);
      //adding data taken from the API to DOM 
      weather_description.innerHTML = `Weather Today : ${data[0].description}`;

      let fetchIcon = `${data[0].icon}`;
      weather_icon.innerHTML = `<img src = "http://openweathermap.org/img/wn/${fetchIcon}@2x.png">`;

      city_name.innerHTML = data[0].city;

      max_temp.innerHTML = `Maximum Temperature: ${data[0].max_temperature} °C`;

      min_temp.innerHTML = `Minimum Temperature: ${data[0].min_temperature} °C`;

      humidity.innerHTML = `Humidity : ${data[0].humidity}%`;

      wind.innerHTML = `Wind speed : ${data[0].wind_speed}m/s <br> degree : ${data[0].wind_degree}°`;

      pressure.innerHTML = `Pressure : ${data[0].pressure} Pascal`;

      datebox.innerHTML = data[0].date_Stamp;

      localStorage.setItem(cityname, JSON.stringify(data[0]));
      console.log(data[1]);

    }
  } catch (error) {
    // Catch the error and display an error message in the DOM as well as the console
    console.error(error);
    alert('Sorry.. City Not Found!!');

  }
}

async function fetchPastData(cityname) {

  var rowCount = table.rows.length;
  for (var i = rowCount - 1; i > 0; i--) {
    table.deleteRow(i);
  }

  const response = await fetch(`http://localhost/ISA/weatherapp/Prototype-three/pastdatafetch.php?name=${cityname}`); //api for current weather data
  const data = await response.json(); //converting the response data into json
  if (data.length > 0) {
    // Update the table with the data
    // loop through each day of data and create a new row for each
    for (let i = 0; i < data.length; i++) {
      let rowData = data[i];
      // create a new row for the data
      let row = table.insertRow(-1);

      // add the data for each column to the row
      row.innerHTML = "<td>" + rowData.date_stamp + "</td><td>" + rowData.description + "</td><td>" + `<img src = "http://openweathermap.org/img/wn/${rowData.icon}@2x.png">` + "</td><td>" + rowData.max_temperature + "</td><td>" + rowData.min_temperature + "</td><td>" + rowData.pressure + "</td><td>" + rowData.humidity + "</td><td>" + rowData.wind_speed + "</td><td>" + rowData.wind_degree + "</td>";
      localStorage.setItem(cityname + ": " + rowData.date_stamp, JSON.stringify(data));
    }
  } else {
    console.error("error");
    alert('Sorry.. Past Data Not Found!!');
  }
}


if (window.navigator.onLine) {
  fetchWeatherData("Arlington"); // Call fetchWeatherData() function and output the results
  fetchPastData("Arlington") // Call fetchPastData() function and output the results

  city_search_box.addEventListener('keydown', (eventinsearchbox) => { //adding event listener to the search box from enter key
    if (eventinsearchbox.keyCode === 13) {
      eventinsearchbox.preventDefault(); // Prevents default fr0m submission
      const cityname = city_search_box.value;
      fetchWeatherData(cityname); //for current data
      fetchPastData(cityname); // for past data 
    }
  });

  submit.addEventListener('click', () => { // adding event listener to the submit button where it takes the cityname  
    if (city_search_box.value === '') { // If the search bar is empty, do nothing 
      console.log("nothing");
      return;
    }
    const cityname = city_search_box.value;
    // calling the functions with the entered cityname
    fetchWeatherData(cityname);
    fetchPastData(cityname);
  });

}
else {
  try {
    getcache("Arlington");
    past.innerHTML = " ";
    city_search_box.addEventListener('keydown', (eventinsearchbox) => { //adding event listener to the search box from enter key
      if (eventinsearchbox.keyCode === 13) {
        eventinsearchbox.preventDefault(); // Prevents default fr0m submission
        const cityname = city_search_box.value;
        fetchWeatherData(cityname); //for current data
        fetchPastData(cityname); // for past data 
      }
    });

    submit.addEventListener('click', () => { // adding event listener to the submit button where it takes the cityname  
      if (city_search_box.value === '') { // If the search bar is empty, do nothing 
        console.log("nothing");
        return;
      }
      const cityname = city_search_box.value;
      // calling the functions with the entered cityname
      fetchWeatherData(cityname);
      fetchPastData(cityname);
    });
  } catch (error) {
  // Catch the error and display an error message in the DOM as well as the console
  console.error(error);
  alert('Data Not Found!!');

}

}

function getcache(cityname) {
  localdata = localStorage.getItem(cityname);
  localdata = JSON.parse(localdata);
  //adding data taken from the API to DOM 
  weather_description.innerHTML = `Weather Today : ${localdata.description}`;

  let fetchIcon = `${localdata.icon}`;
  weather_icon.innerHTML = `<img src = "http://openweathermap.org/img/wn/${fetchIcon}@2x.png">`;

  city_name.innerHTML = localdata.city;

  max_temp.innerHTML = `Maximum Temperature: ${localdata.max_temperature} °C`;

  min_temp.innerHTML = `Minimum Temperature: ${localdata.min_temperature} °C`;

  humidity.innerHTML = `Humidity : ${localdata.humidity}%`;

  wind.innerHTML = `Wind speed : ${localdata.wind_speed}m/s <br> degree : ${localdata.wind_degree}°`;

  pressure.innerHTML = `Pressure : ${localdata.pressure} Pascal`;

  datebox.innerHTML = localdata.date_Stamp;

}