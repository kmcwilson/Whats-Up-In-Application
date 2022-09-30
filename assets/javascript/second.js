const city = decodeURI(document.location.search.split('=')[1]);
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');


if (city) {
    let cityTitle = document.getElementById('city-header');
    cityTitle.innerHTML = '...  ' + city;
    getEvents(city);
    getCoordinates(city);
    getNews(city);

};

    // searchBtn.addEventListener('click', function(){
    //    const cityName=searchInput.value.trim();

    //    if (!cityName){
    //     alert('Error');
    //     //TODO display a nice message instead
    //     return;
    //    } currentWeather  

    // storeCities(cityName);
    //        getEvents(cityName);
    //        getCoordinates(cityName);
    //        getNews(cityName);       
    //     //    getBars(cityName);
    //    })



    // function getBars(cityName){
    //     let barsUrl= `https://api.openbrewerydb.org/breweries?per_page=5&by_city=${cityName}`;
    //     fetch(barsUrl)

    //     .then(function(response){
    //         return response.json();
    //     })
    //     .then(function(data){
    //         console.log(data)
    //     })

    // }




    // ''.addEventListener('click', function(){
    //     let originalHeader=document.getElementById('');
    //     let newCity= document.createElement('div');
    //     newCity.innerHTML(cityName);
    //     originalHeader.appendChild(newCity);

    //     getEvents(cityName);
    // })

    // function storeCities(cityName){
    //     let cities=[];
    //     let pastCities=document.querySelector('input')
    //     cities.push(cityName);
    //     localStorage.setItem('cities', JSON.stringify(cities));
    // let cityList= document.createElement('');
    //cityList.textContent=cityName;
    //pastCities.appendChild(cityList);
    //console.log(cities);
    //
    // function renderCityList(){
    //     if(!cities.length){
    //         return;
    //     }
    //     for(let i=0; i<citieis.length;i++){
    //         let cityItem=document.createElement('li');
    //         cityItem.textContent=cities[i];
    //         cityItem.classList.add('list-items');
    //         pastCities.appendChild(cityItem);
    //     }
    // }
    // renderCityList();
// 

//GETTING EVENTS FUNCTION IN LIST
function getEvents(cityName) {
    let eventUrl = `https://app.ticketmaster.com/discovery/v2/events.json?size=4&city=${cityName}&apikey=2xNO6r6cdtVrFZ7W6Hi5KIVTf2YQsmhQ`;

    fetch(eventUrl)

        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            console.log(data._embedded.events);
            displayEvents(data._embedded.events);
        })
}

function getNews(cityName) {
    let newsUrl = `http://api.mediastack.com/v1/news?access_key=3a02bff89377038110c51afa9a144173&languages=en&keywords=${cityName}&limit=3`;
    fetch(newsUrl)

        .then(function (response) {
            console.log(newsUrl);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            displayNews(data.data);
        })

}

function displayNews(data) {
    console.log('data:', data);
    let newsBox = document.getElementById('hotels');
    for (i = 0; i < data.length; i++) {
        let newsDisplay = document.createElement('li');
        let newsLink = document.createElement('a');
        newsLink.href = data[i].url;
        newsLink.textContent = data[i].title;
        newsLink.setAttribute('target', '_blank');
        newsDisplay.classList.add('newsList');
        newsDisplay.appendChild(newsLink);
        newsBox.appendChild(newsDisplay);
    }
};

function displayEvents(data) {
    let eventBox = document.getElementById('events');
    for (i = 0; i < data.length; i++) {
        let eventsDisplay = document.createElement('li');
        let eventLink = document.createElement('a');
        eventLink.href = data[i].url;
        eventLink.textContent = data[i].name;
        eventLink.setAttribute('target', '_blank');
        eventsDisplay.classList.add('eventsList');
        eventsDisplay.appendChild(eventLink);
        eventBox.appendChild(eventsDisplay);
    }
};

//GETTING THE WEATHER FOR THE CITY
function getCoordinates(cityName) {
    const requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=21b94d9f597cdce5a2ddff64c6b85a82
        `;
    fetch(requestUrl)

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let lat = data[0].lat;
            let lon = data[0].lon;
            console.log(data);
            searchWeather(lat, lon);
        })
};

function searchWeather(lat, lon) {
    let secondUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=21b94d9f597cdce5a2ddff64c6b85a82
        `;
    fetch(secondUrl)

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.list[0]);
            displayWeather(data.list[0]);
        })
}

function displayWeather(data) {
    let weatherBar = document.getElementById('weather');
    for (let i = 0; i < data.length; i++) {
        let currentWeather = document.createElement('li');
        currentWeather.classList.add('weather-bar');
        currentWeather.textContent = data[i].list.weather;
        weatherBar.appendChild(currentWeather);
    };
}