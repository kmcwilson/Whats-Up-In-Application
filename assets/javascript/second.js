const city = document.location.search.split('=')[1];
const searchBtn = document.querySelector('search-btn');


if (city) {
    let cityTitle = document.getElementById('city-header');
    cityTitle.innerHTML = '...  ' + city;
    getEvents(city);
    getCoordinates(city);
    // getHotels(city);
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

    function displayEvents(data) {
        console.log('data:', data);
        let eventBox = document.getElementById('events');
        for (i = 0; i < data.length; i++) {
            let eventsDisplay = document.createElement('li');
            let eventLink= document.createElement('a');
            eventLink.href=data[i].url;
            eventLink.textContent= data[i].name;
            eventLink.setAttribute('target','_blank');
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
        let currentWeather = document.createElement('li');
        currentWeather.classList.add('weather-bar');
        currentWeather.innerHTML = data.list;
        weatherBar.appendChild(currentWeather);
    }

    // function getHotels(cityName){
    //     const options = {
    //         method: 'GET',
    //         headers: {
    //             'X-RapidAPI-Key': '5bb4e737ebmsh6cefefe47bf6938p18bd1ejsncae2677adb5d',
    //             'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
    //         }
    //     }
    //     let hotelUrl= `https://hotels4.p.rapidapi.com/locations/v2/search?query=${cityName}&locale=en_US&currency=CAD${options}`;

    //     fetch(hotelUrl)

    //     .then(function(response){
    //         return response.json();
    //     })
    //     .then(function(data){
    //         console.log(data)
    //     });
    //     }
    //  }


    // searchBtn.addEventListener('click', function(){
    //    const cityName=cityInput.value.trim();

    //    if (!cityName){
    //     alert('Error');
    //     //TODO display a nice message instead
    //     return;
    //    }   // storeCities(cityName);
    //        getEvents(cityName);
    //        getCoordinates(cityName);
    //        getNews(cityName);       
    //     //    getNews(cityName);
    //    })

    // function getNews(cityName){
    //     let newsUrl= `https://newsapi.org/v2/top-headlines?q=${cityName}&from=2022-09-01&sortBy=popularity&pageSize=4&language=en,fr&apiKey=61e1895e2972426480dd0d5bc3f32a8b`;
    //     fetch(newsUrl)

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
}
