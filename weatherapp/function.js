
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
const dateAndtime = document.querySelector("#date_time");


const errorMessage = document.getElementById('error-message');


//fetch weather data for the city searched
async function fetchWeatherData(cityname) {
    /* fetching the api promise from OpenWeatherMap Api server and 
    assinging the Resolved to 'response' variable */
    try{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&APPID=7d17be01b693f19d87e4e70713d64879`);
    if (!response.ok) {
        errorMessage.innerHTML = 'Sorry.. City Not Found!! '
    }
    const data = await response.json();
    // create h2 for city
    console.log(cityname);
    console.log(data);

    //Setting a random image of the city entered
    document.body.style.backgroundImage = `URL("https://source.unsplash.com/1600x900/?${data.name}")`

        weather_description.innerHTML = `Weather Today : ${data.weather.description}`;

        city_name.innerHTML = data.name;
    
        max_temp.innerHTML = `Maximum Temperature: ${data.main.temp_max} °C`;
    
        min_temp.innerHTML = `Minimum Temperature: ${data.main.temp_min} °C`;
    
        humidity.innerHTML = `Humidity : ${data.main.humidity}%`;
        
        wind.innerHTML = `Wind speed : ${data.wind.speed}m/s <br> degree : ${data.wind.deg}°`;

        pressure.innerHTML = `Pressure : ${data.main.pressure} Pascal`;


        
    } catch (error) {
        console.error(error);
        errorMessage.innerHTML = 'Sorry.. City Not Found!!'
        
      }
}
fetchWeatherData("Arlington");

// function updateTime() {
//     let date = new Date();
//     let year = date.getFullYear();
//     let month = date.getMonth() + 1; // as month returns a number between 0 and 11 , adding one to get 1 in January 
//     let day = date.getDate();
//     let hours = date.getHours();
//     let minutes = date.getMinutes();
//     let seconds = date.getSeconds();
//     let date_timeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
//     dateAndtime.innerHTML = date_timeString;
//     console.log(date_timeString);
//   }
  
// setInterval(updateTime, 1000);

city_search.addEventListener('keydown', (eventinsearchbox) => {
    if (eventinsearchbox.keyCode === 13) {
      eventinsearchbox.preventDefault(); // Prevent default fr0m submission
      const cityname = city.value;
      fetchWeatherData(cityname);
    }
  });

submit.addEventListener('click', () => {
    const city = document.querySelector("#city-search-box");
    const cityname = city.value; 
    fetchWeatherData(cityname);

});



