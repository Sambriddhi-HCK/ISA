


// selecting variables from DOM
const city = document.querySelector("#city-search-box");
const city_search = document.querySelector("#city-search-box");
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

const errorMessage = document.getElementById('error-message');
//for error message


//fetch weather data for the city searched
async function fetchWeatherData(cityname) {
    /* fetching the api promise from OpenWeatherMap Api server and 
    assinging the Resolved to 'response' variable */
    try{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&APPID=7d17be01b693f19d87e4e70713d64879`);
    if (!response.ok) {
        errorMessage.innerHTML = 'Sorry.. City Not Found!! ' 
    }
    const data = await response.json(); //storing json content in data variable 

    //Setting a random image of the city entered
    document.body.style.backgroundImage = `URL("https://source.unsplash.com/1600x900/?${data.name}")`


    //adding data taken from the API to DOM 
        weather_description.innerHTML = `Weather Today : ${data.weather[0].description}`;

        let fetchIcon = `${data.weather[0].icon}`;
        weather_icon.innerHTML = `<img src = "http://openweathermap.org/img/wn/${fetchIcon}@2x.png">`;
        city_name.innerHTML = data.name;
    
        max_temp.innerHTML = `Maximum Temperature: ${data.main.temp_max} °C`;
    
        min_temp.innerHTML = `Minimum Temperature: ${data.main.temp_min} `;
    
        humidity.innerHTML = `Humidity : ${data.main.humidity}%`;
        
        wind.innerHTML = `Wind speed : ${data.wind.speed}m/s <br> degree : ${data.wind.deg}°`;

        pressure.innerHTML = `Pressure : ${data.main.pressure} Pascal`;

        console.log(data)
    } catch (error) {
      //catching error and display a error meesage in DOM as well as console 
        console.error(error);
        errorMessage.innerHTML = 'Sorry.. City Not Found!!'
        
      }
}
fetchWeatherData("Arlington");

// to update data 
function updateDate() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // as month returns a number between 0 and 11 , adding one to get 1 in January 
    let day = date.getDate();
    datebox.innerHTML = `${year}-${month}-${day}`;
  }
  
setInterval(updateDate, 1000);//checking every second?

city_search.addEventListener('keydown', (eventinsearchbox) => { //adding event listener to the search box from enter key
    if (eventinsearchbox.keyCode === 13) {
      eventinsearchbox.preventDefault(); // Prevents default fr0m submission
      const cityname = city.value;
      fetchWeatherData(cityname);
    }
  });

submit.addEventListener('click', () => { // adding event listener to the submit button where it takes the cityname  
    const city = document.querySelector("#city-search-box");
    const cityname = city.value; 
    fetchWeatherData(cityname); // calling the function with the entered cityname

});



