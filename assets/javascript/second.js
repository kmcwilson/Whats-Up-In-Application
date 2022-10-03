//This takes the input from the first page and uses it in order to call functions for that specific city
const city = decodeURI(document.location.search.split('=')[1]);
//Calling these items globally because they wil be used throughout several functions
const searchButton = document.querySelector('.search-button');
const weatherBar = document.getElementById('weather');
const eventBox = document.getElementById('events');
const newsBox = document.getElementById('news');
const cityTitle = document.getElementById('city-header');
const cityInput = document.getElementById('search-input');
const cityName = cityInput.value.trim();
//Creating an array for cities in order to use for localStorage
const cities = JSON.parse(localStorage.getItem('cities')) || [];

//if condition checks if a city was entered to enact these functions
//All functions require a city name in order to function
if (city) {
    cityTitle.textContent = '...  ' + city;
    getEvents(city);
    getCoordinates(city);
    getNews(city);
    storeCities(city);

    //Using ticketmaster to call on events using the input parameter of cityName
    function getEvents(cityName) {
        let eventUrl = `https://app.ticketmaster.com/discovery/v2/events.json?size=4&city=${cityName}&apikey=2xNO6r6cdtVrFZ7W6Hi5KIVTf2YQsmhQ`;

        fetch(eventUrl)

            .then(function (response) {
                return response.json();
            })

            .then(function (data) {
                //Calling the display events function to go through the array and display events
                displayEvents(data._embedded.events);
            })
    }
    // The function of displayEvents loops through the events array and creates li items for each event along with the link for the event
    function displayEvents(data) {
        for (i = 0; i < data.length; i++) {
            let eventsDisplay = document.createElement('li');
            let eventLink = document.createElement('a');
            eventLink.href = data[i].url;
            eventLink.textContent = data[i].name;
            //Setting the attribute of the link so that it opens a new tab when it is clicked
            eventLink.setAttribute('target', '_blank');
            eventsDisplay.classList.add('eventsList');
            eventsDisplay.appendChild(eventLink);
            eventBox.appendChild(eventsDisplay);
        }

    }
};
//Getting the weather for the specific city using the cityName input
function displayDescription(event, description) {
    var newEl = document.createElement("p")

    newEl.textContent = description
    event.target.appendChild(newEl)
    console.log(description)
}

function getCoordinates(cityName) {
    const requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=aa6c01f4dfd1b379ce9333353fec65d7
    `;
    fetch(requestUrl)

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //Using the latitude and longitude taken from the getCoordinates and using it in the search weather api
            let lat = data[0].lat;
            let lon = data[0].lon;
            searchWeather(lat, lon);
        })
};
//This function is using the latitude and longitude of the cityName to show the weather forecast
function searchWeather(lat, lon) {
    let secondUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&limit=1&appid=aa6c01f4dfd1b379ce9333353fec65d7
    `;
    fetch(secondUrl)

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayWeather(data.list[0]);
        })
}

//Displaying the weather from the application on the page using the array that it has been saved into
function displayWeather(data) {
    const weatherIcon = data.weather[0].icon;
    const weatherDescription = data.weather[0].description;
    const weatherImg = document.createElement('img');
    weatherImg.classList.add('weather-img');
    //Calling on the icon that is being shared through the openweather API
    weatherImg.src = `https://openweathermap.org/img/wn/${weatherIcon}.png`
    let currentWeather = document.createElement('li');
    currentWeather.classList.add('weather-bar');
    currentWeather.textContent = `Current Temp: ${data.main.temp} Feels like: ${data.main.feels_like} ${weatherDescription}`;
    weatherBar.appendChild(currentWeather);
    weatherBar.appendChild(weatherImg);

}

//Using fetch to go through the news using the cityName input for the news and limiting it to 4

function getNews(cityName) {
    let newsUrl = `https://api.mediastack.com/v1/news?access_key=c3b88abad62dc4da8988f412bd2cf297&languages=en&keywords=${cityName}&limit=4`;
    fetch(newsUrl)

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayNews(data.data);
        })

}
//Looping through the news similarly as the displaying events function and displaying using the array that the data was placed into
//Creating a list item for each of the data items as well as a link to take the user to the full story. There is a description attached to each link.

function displayNews(data) {
    for (i = 0; i < data.length; i++) {
        let newsDisplay = document.createElement('li');
        let newsLink = document.createElement('a');
        let newsDescription = document.createElement('li');
        newsLink.href = data[i].url;
        newsLink.textContent = data[i].title;
        newsDescription.textContent = data[i].description;
        //Setting the attribute of the link to take you to a new window when it is clicked.
        newsLink.setAttribute('target', '_blank');
        newsDisplay.classList.add('newsList');
        newsDisplay.appendChild(newsLink);

        newsBox.appendChild(newsDisplay);
        newsBox.appendChild(newsDescription);
    }
};

//Added a searchButton event listener to the search bar at the top right of the second page
searchButton.addEventListener('click', function (event) {
    event.preventDefault();
    const cityInput = document.getElementById('search-input')
    const cityName = cityInput.value.trim();
    //If the cityName is empty, the function will stop
    if (!cityName) {
        return;
    }
    //If there is an input, the elements will clear 
    else {
        weatherBar.textContent = '';
        eventBox.textContent = '';
        newsBox.textContent = '';
        cityTitle.textContent = '';
    }

    //The functions are then called when the new city is input

    cityTitle.textContent = '...  ' + cityName;
    getEvents(cityName);
    getCoordinates(cityName);
    getNews(cityName);
    storeCities(cityName);
})

// storeCities is taking the empty array of cities and setting it into storage on a local device 

function storeCities(cityName) {
    cities.push(cityName);
    localStorage.setItem("cities", JSON.stringify(cities));
};

//This function takes the set items in localStorage and begins to append them to a ul element on the page 
function renderCityList() {
    const pastCities = document.getElementById('past-searches');
    if (!cities.length) {
        return;
    }


    // Looping through the newly created cities array and creating buttons based on the previous cities entered by the user
    for (let i = 0; i < cities.length; i++) {
        let cityItem = document.createElement('button');
        cityItem.textContent = cities[i];
        cityItem.classList.add('list-items');
        pastCities.appendChild(cityItem);
        if (i === 5) {
            return
        }
    }
}

renderCityList();



