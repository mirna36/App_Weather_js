const app = document.querySelector(".weather-app");
const nameOutput = document.querySelector(".name");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".timeOutput");
const temp = document.querySelector(".temp");
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
       
       getWeatherData();
        //Fade out the app (simple animation)
        app.style.opacity = "1";
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
       getWeatherData();
       //remove all text from the input field
       search.value = "";
       //Fade out the app (simple animation)
       app.style.opacity = "1";
    }
//Prevents the default behaviour of the form

});

/*Function that returns a day of the week
Monday, tuesday....
*/
function dayOfTheWeek(m, d, y) {
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]
    return weekday[new Date(`${m}/${d}/${y}`).getDate()];

}

/*Function fetches and displays the data from the weather API*/
function getWeatherData(){
    /*fetch the data and dynamicaly add the city name with tempalte literals*/
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=aacbb9f509e9c39a0085f232e50c3536`
    )
      /*Take the data (which is in JSON format) and covert to regular JS obje*/
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.list[0].main.temp);

        /*let's start by adding the temperature and weather condition for the days*/

        temp.innerHTML =
          Number(data.list[0].main.temp - 288.53).toFixed(0) + "&#176;";

        icon.src =
          "http://openweathermap.org/img/wn/" +
          data.list[0].weather[0].icon +
          ".png";
        conditionOutput.innerHTML = data.list[0].weather[0].description;
        cloudyOutput.innerHTML = data.list[0].clouds.all;
        humidityOutput.innerHTML = data.list[0].main.humidity + "%";
        windSpeedOutput.innerHTML = "Speed: " + data.list[0].wind.speed *100 +"km";
        windDegOutput.innerHTML = "Deg: " + data.list[0].wind.deg+"°";

        /*Get the date and time from the city and extract the day, month, year and time into individual variables*/

        const date = data.list[0].dt_txt;
        const y = parseInt(date.substr(0.4));
        const m = parseInt(date.substr(5, 2));
        const d = parseInt(date.substr(8, 2));
        const lat = data.city.coord.lat;
        const lng = data.city.coord.lon;
        const time = "";

        //api time zone
        fetch(
          `http://api.timezonedb.com/v2.1/get-time-zone?key=JJ2L8AIXPWKG&format=json&by=position&lat=${lat}&lng=${lng}
`
        )
          .then((res) => res.json())
          .then((data) => {
            //console.log(data.formatted);
            
            const time = data.formatted.substr(11);
            timeOutput.innerHTML = time;
            //console.log(time);

            if ("05:00:00" <= time && time <= "18:00:00") {
              timeOfDay = "day";
            } else {
              timeOfDay = "night";
            }

            //set de background image
            if (code === "Clear") {
              app.style.backgroundImage = `url(asset/images/${timeOfDay}/clear.jpg)`;
            } else {
              timeOfDay = "night";
            }
            if (code === "Clouds") {
              app.style.backgroundImage = `url(asset/images/${timeOfDay}/cloudy-1.jpg)`;
            } else {
              timeOfDay = "night";
            }
            if (code === "broken clouds" || code === "scattered clouds") {
              app.style.backgroundImage = `url(asset/images/${timeOfDay}/cloudy-3.jpg)`;
            } else {
              timeOfDay = "night";
            }

            if (
              code === "Rain"
            ) {
              app.style.backgroundImage = `url(asset/images/${timeOfDay}/rain.jpg)`;
            } else {
              timeOfDay = "night";
            }
             if (code === "Thunderstorm" ) {
               app.style.backgroundImage = `url(asset/images/${timeOfDay}/storm.jpg)`;
             } else {
               timeOfDay = "night";
             }
             if (code === "Snow") {
               app.style.backgroundImage = `url(asset/images/${timeOfDay}/snow.jpg)`;
             } else {
               timeOfDay = "night";
             }
             if (code === "Mist") {
               app.style.backgroundImage = `url(asset/images/${timeOfDay}/clear.jpg)`;
             } else {
               timeOfDay = "night";
             }
             
            
            
          });

        /*Reformat the date into something more appealling and add to the page*/

        dateOutput.innerHTML = `${dayOfTheWeek(m, d, y)} ${d} / ${m} / ${y}`;

        /*add the name of the city into the page*/
        nameOutput.innerHTML = data.city.name;

        //set default time of day
        let timeOfDay = "clear sky";
        //Get the unique id for each weather condition
        const code = data.list[0].weather[0].main;
        
      });
      
   
};
getWeatherData();



