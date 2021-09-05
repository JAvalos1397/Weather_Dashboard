const cityContainer = $("#cityName");
const tempContainer = $("#temp");
const windContainer = $('#wind');
const uvContainer = $('#uv');
const apiKey = "5cd2b271a245b10cee40362f079a84fd";

function getWeather(userInput){

    const getapiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=imperial&appid=${apiKey}`
    fetch(getapiUrl)
    .then (response => response.json())
    .then(data => {
        console.log(data)
        const temp = data.main.temp;
        const icon = data.weather[0].icon;
        const wind = data.wind.speed;
        const lon = data.coord.lon;
        const lat = data.coord.lat;
        const name = data.name;
        let UVQueryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`;
        fetch(UVQueryURL)
        .then(response => response.json())
        .then(data => {
           console.log(data)
        const uv = data.current.uvi  
         
        renderWeather(name,temp,icon,wind,uv)
    })
    });
}

$("#submit").on('click', function(event) {
 event.preventDefault(event);

 const userInput = $("#city").val();
 getWeather(userInput);
 searchHistory(userInput);
 $(".empty").empty();


})

function renderWeather(name,temp,icon,wind,uv){
    if (uv >= 6){
        var severity = 'high'
    } else if (uv <= 2){
        var severity = 'low'
    } else{
        var severity = 'moderate'
    }  
console.log(name,temp,icon,wind,uv)
    const title = $('<h2>');
    const cardT = $('<p>');
    const cardS = $('<img>');
    const cardWS = $('<p>');
    const cardUV = $('<p>');
    const span = $('<span>')
//adding weather
    title.text(name);
    title.addClass("center empty")
    cardS.attr('src', `http://openweathermap.org/img/wn/${icon}@2x.png`);


    cardT.text(`Temperature: ${temp}`)
    cardT.addClass('fw-bold empty')

    cardWS.text(`WindSpeed: ${wind}`)
    cardWS.addClass('fw-bold empty')

    cardUV.text('UV: ')
    cardUV.addClass("fw-bold empty")

    span.addClass(severity)
    span.text(`${uv}`)
    span.addClass("fw-bold empty")


//appending weather
    cityContainer.append(title)
    cityContainer.append(cardS)
    tempContainer.append(cardT)
    
    windContainer.append(cardWS)
    uvContainer.append(cardUV)
    uvContainer.append(span)
}

function searchHistory(response){

}

function clear(){

}