const cityContainer = $("#cityName");
const tempContainer = $("#temp");
const windContainer = $('#wind');
const uvContainer = $('#uv');
const historyContainer = $('#history')
const currentContainer = $('#currentDay')
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
        
        const uv = data.current.uvi  
        // renderWeather(name,temp,icon,wind,uv)

        const forecast = data.daily;
        forecast.forEach((element) => {
            renderForecast(element)
        })
    })
    });
}

//sending search value
$("#submit").on('click', function(event) {
 event.preventDefault(event);
 
 const userInput = $("#city").val();
 $("#city").val('')
 getWeather(userInput);
 setHistory(userInput);
 $(".empty").empty();
})

//sending value of history
$(document).on('click','.card-body',function() {
    const history = $(this).text();
    console.log(history)
    getWeather(history);
    $(".empty").empty();
})

function renderForecast(data){
    console.log(data)
}

//renderCurrent weather 
function renderWeather(name,temp,icon,wind,uv){
    if (uv >= 6){
        var severity = 'bg-danger'
    } else if (uv <= 2){
        var severity = 'bg-success'
    } else{
        var severity = 'bg-warning'
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
    title.addClass("center")
    cardS.attr('src', `http://openweathermap.org/img/wn/${icon}@2x.png`);
    cityContainer.addClass('bg-info')


    cardT.text(`Temperature: ${temp}`)
    cardT.addClass('fw-bold')

    cardWS.text(`WindSpeed: ${wind}`)
    cardWS.addClass('fw-bold')

    cardUV.text('UV: ')
    cardUV.addClass("fw-bold")

    span.addClass(severity)
    span.text(`${uv}`)
    span.addClass("fw-bold")


//appending weather
    cityContainer.append(title)
    cityContainer.append(cardS)
    tempContainer.append(cardT)
    
    windContainer.append(cardWS)
    uvContainer.append(cardUV)
    uvContainer.append(span)
}

function generatehistory(response){
    const btn = $('<button>')
    const btnClass = 'btn btn-outline-dark card-body'
    
    btn.attr('type','button')
    btn.addClass(btnClass)
    btn.text(response)
    historyContainer.append(btn)
}


//clearing History/ and storage
$('#clear').on('click', (event) => {
    $("#history").empty();
    localStorage.clear();
})

// SAVE then get

 function setHistory(response) {
    var cities = [];
    var uniqueCity = [];
    
    var getCity = response;
    
    cities = JSON.parse(localStorage.getItem('SearchHistory')) || [];
    cities.push(getCity);

    $.each(cities, function(i, el){
        if($.inArray(el, uniqueCity) === -1) uniqueCity.push(el);
    });
    localStorage.setItem("SearchHistory", JSON.stringify(uniqueCity)); 
    getHistory()   
}

function getHistory () {
    var retrieveData = localStorage.getItem("SearchHistory") 
    var historyList = JSON.parse(retrieveData)
    // console.log(parkCode)
    $("#history").empty();

    for (let i = 0; i < historyList.length; i++) {
        var city = historyList[i];
        if (city )
        console.log(city);
        generatehistory(city);
    }
}

getHistory()