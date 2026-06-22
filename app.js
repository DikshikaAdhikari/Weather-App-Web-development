
// DOM Elements

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");

const temp = document.getElementById("temp");
const condition = document.getElementById("condition");
const city = document.getElementById("city");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feelsLike = document.getElementById("feelsLike");
const cloud = document.getElementById("cloud");
const weatherIcon = document.getElementById("weatherIcon");
const dateTime = document.getElementById("dateTime");
const loader = document.getElementById("loader");
const errorMessage = document.getElementById("errorMessage");


// API Key
const apiKey = "8ef5ed279c152498d94e781c761b35c9";

// Search Button
searchBtn.addEventListener("click", () => {
    const cityName = cityInput.value.trim();

    if(cityName === ""){
        alert("Please enter a city.");
        return;
    }

    getWeather(cityName);
});

// Enter Key Search
cityInput.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        searchBtn.click();

    }

});

// Fetch Weather
async function getWeather(cityName){
     loader.style.display="block";
     errorMessage.innerText="";
    try{
         const url =
         `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

        const response = await fetch(url);

        if(!response.ok){

            throw new Error("City not found");
        }
    const data = await response.json();
    displayWeather(data);
   }
        catch(error){
        errorMessage.innerText = error.message;
    }
    finally{
        loader.style.display="none";
    }}
// Display Weather
function displayWeather(data){
   const {
        name,
        sys,
        weather,
        main,
        wind:windData,
        clouds
    } = data;

    temp.innerText = `${Math.round(main.temp)}°C`;
    condition.innerText = weather[0].description;
    city.innerText = `${name}, ${sys.country}`;
    humidity.innerText = `${main.humidity}%`;
    wind.innerText = `${windData.speed} km/h`;
    feelsLike.innerText = `${Math.round(main.feels_like)}°C`;
    cloud.innerText = `${clouds.all}%`;
    updateDateTime();

setInterval(updateDateTime,1000);

function updateDateTime(){
    const options = {
        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric",
        hour:"2-digit",
        minute:"2-digit",
        second:"2-digit"
    };
dateTime.innerText = new Date().toLocaleString("en-US",options);
}
   const icon=weather[0].main;

if(icon=="Clear"){

weatherIcon.src="images/clear.png";

}

else if(icon=="Clouds"){

weatherIcon.src="images/cloud.jpg";

}

else if(icon=="Rain"){

weatherIcon.src="images/rain.jpg";

}

else if(icon=="Snow"){

weatherIcon.src="images/snow.jpg";

}

else{

weatherIcon.src="images/mist.png";

}
    changeBackground(weather[0].main);
    function changeBackground(weather){
switch(weather){

case "Clear":
document.body.style.background =
"linear-gradient(135deg,#FFD54F,#FF9800)";
break;

case "Clouds":
document.body.style.background =
"linear-gradient(135deg,#B0BEC5,#ECEFF1)";
break;

case "Rain":
document.body.style.background =
"linear-gradient(135deg,#546E7A,#263238)";
break;

case "Snow":
document.body.style.background =
"linear-gradient(135deg,#E3F2FD,#FFFFFF)";
break;

case "Thunderstorm":
document.body.style.background =
"linear-gradient(135deg,#424242,#212121)";
break;

default:
document.body.style.background =
"linear-gradient(135deg,#74b9ff,#dfe6e9)";

}}
const sunriseTime =
new Date(sys.sunrise*1000).toLocaleTimeString();

const sunsetTime =
new Date(sys.sunset*1000).toLocaleTimeString();

document.getElementById("sunrise").innerText=sunriseTime;

document.getElementById("sunset").innerText=sunsetTime;
}

locationBtn.addEventListener("click",()=>{
navigator.geolocation.getCurrentPosition(getPosition);
});
function getPosition(position){
const lat = position.coords.latitude;
const lon = position.coords.longitude;
getWeatherByLocation(lat,lon);
}
async function getWeatherByLocation(lat,lon){
loader.style.display="block";

try{
const url =
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

const response = await fetch(url);
const data = await response.json();
displayWeather(data);
}
catch(error){
errorMessage.innerText="Unable to get your location.";
}
finally{
loader.style.display="none";
}}


const iconCode = data.weather[0].icon;
const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

document.getElementById("icon").src = iconUrl;

  const tempe = data.main.tempe;
document.getElementById("tempe").innerText = `${tempe}°C`;

data.name + ", " + data.sys.country
city.innerText = `${data.name}, ${data.sys.country}`;

if (data.cod === "404") {
  document.querySelector(".error").innerText = "City not found";
}

