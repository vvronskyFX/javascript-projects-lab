const apikey = "c5b7896e93a7ecf1b99f22bf8ccc01e4";

const weatherDataEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

//Event listenr here on the submit button for the inputed city.
formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);     
});

// fetching from the API
async function getWeatherData(cityValue){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)

        if(!response.ok){
            throw new Error("Network response was not OK.")
        }
        //convert response to json data.
        const data = await response.json();
        console.log(data);
        const temperature = Math.round(data.main.temp)
        const description = data.weather[0].description
        const icon = data.weather[0].icon
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}℃`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`,
        ]
    //Substituting info into the class elements.
        weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
    //Adding temperature querySelector.
        weatherDataEl.querySelector(".temperature").textContent = `${temperature}℃`;
    //Adding weather description.
        weatherDataEl.querySelector(".description").textContent = `${description}`;
    //Adding weather details. it getts looped through w/ the ".map" and inserted into the div.
    // the ".join" function gets rid of the comma between the details.
        weatherDataEl.querySelector(".details").innerHTML = details.map((detail) => `<div>${detail}</div>`).join("");
    
    } catch (error) {
    // Funny errors!
        weatherDataEl.querySelector(".icon").innerHTML = `<img src="https://media.giphy.com/media/mPytjcsG3XS4o/giphy.gif" alt="Lost">`;
        weatherDataEl.querySelector(".temperature").textContent = "";
        weatherDataEl.querySelector(".description").textContent = "You gotta add an actual city. Someone needs to brush up on geography!🧠";
        weatherDataEl.querySelector(".details").innerHTML = "";
    }
}