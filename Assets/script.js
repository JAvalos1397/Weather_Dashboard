const cityElement = $("#cityName");
const temp = $("#temp");
const wind = $('#wind');
const uv = $('#uv');
const apiKey = "5cd2b271a245b10cee40362f079a84fd";

function getWeather(searchResults){

    const getapiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchResults}&units=imperial&appid=${apiKey}`
    fetch(getapiUrl)
    .then (response => response.json())
    .then(data => {
        console.log(data)
        const temp = data.main.temp;
        const weather = data.weather[0].icon;
        const wind = data.wind.speed;
        const lon = data.coord.lon;
        const lat = data.coord.lat;
        let UVQueryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}`;
        fetch(UVQueryURL)
        .then(response => response.json())
        .then(data => {
           console.log(data)
        const uv = data.current.uvi
        console.log(uv)
        renderWeather(temp,weather,wind,uv)
    })
    });
}

$("#submit").on('click', function(event) {
 event.preventDefault(event);

 const searchResults = $("#city").val();
    console.log(searchResults)
 getWeather(searchResults)
 searchHistory(searchResults)
})

function renderWeather(temp,weather,wind,uv){

}

function searchHistory(response){

}