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
const humidity =  document.querySelector(".humidity");
const wind =  document.querySelector(".windspeed");
const pressure =  document.querySelector(".pressure");
const datebox = document.querySelector("#datebox");
const table = document.querySelector("#past_data_table");


//fetch weather data for the city searched
async function fetchWeatherData(cityname) {
    /* fetching the api promise from OpenWeatherMap Api server and 
    assinging the Resolved to 'response' variable */

    try{
    const response = await fetch(`http://localhost/ISA/weatherapp/Prototype-two/currentdatafetch.php?name=${cityname}`);
    const data = await response.json(); //storing json content in data variable 
    console.log(data);
    //adding data taken from the API to DOM 
      weather_description.innerHTML = `Weather Today : ${data.description}`;

      let fetchIcon = `${data.icon}`;
      weather_icon.innerHTML = `<img src = "http://openweathermap.org/img/wn/${fetchIcon}@2x.png">`;
        
      city_name.innerHTML = data.city;
    
      max_temp.innerHTML = `Maximum Temperature: ${data.max_temperature} °C`;
    
      min_temp.innerHTML = `Minimum Temperature: ${data.min_temperature} °C`;
    
      humidity.innerHTML = `Humidity : ${data.humidity}%`;
        
      wind.innerHTML = `Wind speed : ${data.wind_speed}m/s <br> degree : ${data.wind_degree}°`;

      pressure.innerHTML = `Pressure : ${data.pressure} Pascal`;
        
    } catch (error) {
      // Catch the error and display an error message in the DOM as well as the console
      console.error(error);
      alert ('Sorry.. City Not Found!!');

    }
}

fetchWeatherData("Arlington"); // Call fetchWeatherData() function and output the results

async function fetchPastData(cityname) {
  try {
    const response = await fetch(`http://localhost/ISA/weatherapp/Prototype-two/pastdatafetch.php?name=${cityname}`); //api for current weather data
    const data = await response.json(); //converting the response data into json
    
    // Update the table with the data
    var rowCount = table.rows.length;
        for (var i = rowCount - 1; i > 0; i--) {
            table.deleteRow(i);
        }

    // loop through each day of data and create a new row for each
    for (let i = 0; i < data.length; i++) {
      let rowData = data[i];
      // create a new row for the data
      let row = table.insertRow(-1);

      // add the data for each column to the row
      row.innerHTML = "<td>" + rowData.date_stamp + "</td><td>" + rowData.description + "</td><td>" +`<img src = "http://openweathermap.org/img/wn/${rowData.icon }@2x.png">`+ "</td><td>" + rowData.max_temperature + "</td><td>" + rowData.min_temperature + "</td><td>" + rowData.pressure + "</td><td>" + rowData.humidity + "</td><td>" + rowData.wind_speed + "</td><td>" + rowData.wind_degree + "</td>";
    }
  } catch (error) { //error handling
    console.error(error); 
    alert('Sorry.. Past Data Not Found!! \n ');
    var rowCount = table.rows.length;
        for (var i = rowCount - 1; i > 0; i--) {
            table.deleteRow(i);
        }
    
  }
}
fetchPastData("Arlington") // Call fetchPastData() function and output the results


// to update date
function updateDate() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // as month returns a number between 0 and 11 , adding one to get 1 in January 
    let day = date.getDate();
    datebox.innerHTML = `${year}-${month}-${day}`;
  }
  
setTimeout(updateDate, 1000);

city_search_box.addEventListener('keydown', (eventinsearchbox) => { //adding event listener to the search box from enter key
    if (eventinsearchbox.keyCode === 13) {
      eventinsearchbox.preventDefault(); // Prevents default fr0m submission
      const cityname = city_search_box.value;
      fetchWeatherData(cityname); //for current data
      fetchPastData(cityname); // for past data 
    }
  });

submit.addEventListener('click', () => { // adding event listener to the submit button where it takes the cityname  
    const cityname = city_search_box.value; 
    // calling the functions with the entered cityname
    fetchWeatherData(cityname); 
    fetchPastData(cityname);
});



