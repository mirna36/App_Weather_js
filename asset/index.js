const app = document.querySelector(".weather-app");
const nameOutput = document.querySelector(".name");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const temp_min = document.querySelector(".temp_min");
const temp_max = document.querySelector(".temp_max");
const conditionOutput = document.querySelector(".condition");
const icon = document.querySelector(".icon");
const cloudyOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windSpeedOutput = document.querySelector(".windSpeed");
const windDegOutput = document.querySelector(".windDeg");
const form = document.querySelector("#locationInput");
const search = document.querySelector(".search");
const btn = document.querySelector(".btn");
const cities = document.querySelectorAll(".city");




//Default city when the page loads
let cityInput = "Paris";

//Add click event to each city in the panel
cities.forEach((city) => {
    city.addEventListener("click", (e) =>{
        //change from default to clicked one
       cityInput = e.target.innerHTML;
        /*Function that fetches 
        and displays all the data from the weather API
        */
       
       fetchWeatherData();
        //Fade out the app (simple animation)
        app.style.opacity = "0";
   });

})

//add submit event to the form
form.addEventListener('submit', (e) => {
    e.preventDefault();
    /*If the input field (search bard) is empty,
    throw an alert*/
    if (search.value.length == 0) {
      alert("please enter a city name !");
    } else {
      /*change from default city to 
        the one written in the input field*/
      cityInput = search.value;
      /*Function that fetches 
        and displays all the data from the weather API
        */
       fetchWeatherData();
       //remove all text from the input field
       search.value = "";
       //Fade out the app (simple animation)
       app.style.opacity = "0";
    }
//Prevents the default behaviour of the form

});

/*Function that returns a day of the week
Monday, tuesday....
*/
function dayOfTheWeek(day, month, year) {
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]
    return weekday[new Date(`${day}/${month}/${year}`).getDate()];

}
/*Function fetches and displays the data from the weather API*/
function getWeatherData(){
    /*fetch the data and dynamicaly add the city name with tempalte literals*/
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=aacbb9f509e9c39a0085f232e50c3536`
    )
      /*Take the data (which is in JSON format) and covert to regular JS obje*/
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.main.temp_min);


        /*let's start by adding the temperature and weather condition for the days*/
     
          temp_min.innerHTML = "Min:" + Number(data.main.temp_min -288.53).toFixed(0) + "&#176;";
          temp_max.innerHTML = "Max:" + Number(data.main.temp_max - 288.53).toFixed(0) + "&#176;";
          
          icon.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon+".png";
          conditionOutput.innerHTML = data.weather[0].description;
          cloudyOutput.innerHTML = data.clouds.all;
         humidityOutput.innerHTML = data.main.humidity+"%";
          windSpeedOutput.innerHTML = "Speed: " + data.wind.speed;
          windDegOutput.innerHTML = "Deg: " + data.wind.deg;

            /*Get the date and time from the city and extract the day, month, year and time into individual variables*/
           const dt = data.dt; // unix timestamp in seconds
           const timezone = data.timezone; // zone in seconds

           // moment.unix - Unix Timestamp (seconds)
          const dateTime = moment().zone(timezone);

           console.log(dateTime);


        
      })
      
   
};
getWeatherData();



