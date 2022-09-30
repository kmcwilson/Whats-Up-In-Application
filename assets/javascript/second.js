const city = decodeURI(document.location.search.split('=')[1]);
const searchButton = document.querySelector('.search-button');
const weatherBar = document.getElementById('weather');
const eventBox = document.getElementById('events');
const newsBox = document.getElementById('news');
const cityTitle = document.getElementById('city-header');
const cityInput = document.getElementById('search-input')
const cityName = cityInput.value.trim();
const cities= JSON.parse(localStorage.getItem('cities'))|| [];


if (city) {
    // let cityTitle = document.getElementById('city-header');
    cityTitle.textContent = '...  ' + city;
    // const currentDate= moment().format('ddd MMM YYYY');
    // weatherBar.textContent=currentDate;
    getEvents(city);
    getCoordinates(city);
    getNews(city);
    storeCities(city);
    //GETTING EVENTS FUNCTION IN LIST
    function getEvents(cityName) {
        let eventUrl = `https://app.ticketmaster.com/discovery/v2/events.json?size=4&city=${cityName}&apikey=2xNO6r6cdtVrFZ7W6Hi5KIVTf2YQsmhQ`;

        fetch(eventUrl)

            .then(function (response) {
                return response.json();
            })

            .then(function (data) {
                displayEvents(data._embedded.events);
            })
    }

    function displayEvents(data) {
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
                searchWeather(lat, lon);
            })
    };

    function searchWeather(lat, lon) {
        let secondUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&limit=1&appid=21b94d9f597cdce5a2ddff64c6b85a82
    `;
        fetch(secondUrl)

            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                displayWeather(data.list[0]);
            })
    }

    function displayWeather(data) {
        // let weatherIconEl= document.createElement('img');
        // let currentIcon= data.weather.icon;
        // let weatherIcon= weatherIconEl.setAttribute("src", `https://openweathermap.org/img/wn/${currentIcon}.png`);
        const weatherIcon = data.weather[0].icon;
        const weatherImg = document.createElement('img');
        weatherImg.classList.add('weather-img');
        weatherImg.src = `https://openweathermap.org/img/wn/${weatherIcon}.png`
        let currentWeather = document.createElement('li');
        currentWeather.classList.add('weather-bar');
        currentWeather.textContent = `Current Temp: ${data.main.temp} Feels like: ${data.main.feels_like} ${data.weather[0].description}`;
        weatherBar.appendChild(currentWeather);
        weatherBar.appendChild(weatherImg);

    }

    function getNews(cityName) {
        let newsUrl = `http://api.mediastack.com/v1/news?access_key=3a02bff89377038110c51afa9a144173&languages=en&keywords=${cityName}&limit=4`;
        fetch(newsUrl)

            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                displayNews(data.data);
            })

    }

    function displayNews(data) {
        for (i = 0; i < data.length; i++) {
            let newsDisplay = document.createElement('li');
            let newsLink = document.createElement('a');
            let newsDescription= document.createElement('li');
            newsLink.href = data[i].url;
            newsLink.textContent = data[i].title;
            newsDescription.textContent=data[i].description;
            newsLink.setAttribute('target', '_blank');
            newsDisplay.classList.add('newsList');
            newsDisplay.appendChild(newsLink);
            newsBox.appendChild(newsDisplay);
            newsBox.appendChild(newsDescription);
        }
    };

    searchButton.addEventListener('click', function () {
        if (!cityName) {
            return;
        }
        else{
            weatherBar.textContent = '';
            eventBox.textContent = '';
            newsBox.textContent = '';
            cityTitle.textContent = '';
        }
   

        cityTitle.textContent = '...  ' + cityName;
        getEvents(cityName);
        getCoordinates(cityName);
        getNews(cityName);
    })


    function storeCities(cityName){
        cities.push(cityName);
    localStorage.setItem("cities", JSON.stringify(cities));
    };
    
    function renderCityList(){
        let pastCities= document.getElementById('past-searches')
        if(!cities.length){
            return;
        } 
        // else if (cityName && cities|| newCityName && cities) {

        // }
        for (let i=0; i<cities.length; i+=5){
        let cityItem= document.createElement('li');
        cityItem.textContent=cities[i];
        cityItem.classList.add('list-items');
        pastCities.appendChild(cityItem);
     }
    }
    
    renderCityList();
}
