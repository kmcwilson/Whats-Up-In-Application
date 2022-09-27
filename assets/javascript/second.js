console.log('hello')
const city=document.location.search.split('=')[1];
const searchBtn= document.querySelector('search-btn');
console.log(city);
if(city){
    getEvents(city);
    getCoordinates(city);

<<<<<<< HEAD
=======
console.log('hello')
const city=document.location.search.split('=')[1];
console.log(city);
if(city){
    getEvents(city);
>>>>>>> 47dfd767a47a8c57e74d8a27428f95ac7a160fc4
}
//GETTING EVENTS FUNCTION IN LIST
function getEvents(cityName){
    let eventUrl= `https://app.ticketmaster.com/discovery/v2/events.json?size=4&city=${cityName}&apikey=2xNO6r6cdtVrFZ7W6Hi5KIVTf2YQsmhQ`;

    fetch(eventUrl)

    .then(function(response){
        return response.json();
    })

    .then(function(data){
     console.log(data)
    //  let eventSection=document.getElementById('');
    //  let eventsDisplay= document.createElement('p');
    //  eventsDisplay.classList.add('events');
    //  eventsDisplay.innerHTML(data);
    //  eventSection.appendChild(eventsDisplay);
})
} 
//GETTING THE WEATHER FOR THE CITY
function getCoordinates(cityName){
    const requestUrl= `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=21b94d9f597cdce5a2ddff64c6b85a82
    `;
    fetch(requestUrl)
    
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        let lat= data[0].lat;
        let lon=data[0].lon;
        console.log(data);
    searchWeather(lat, lon);
    })
    };
    
    function searchWeather(lat, lon){
    let secondUrl=  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=21b94d9f597cdce5a2ddff64c6b85a82
    `;
    fetch(secondUrl)
    
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data.list[0]);
    //    for(let i=0; i<data.list.length; i+=20){
    //         console.log(data.list[i]);   
    
    //     }
        })
     }

<<<<<<< HEAD
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
=======
searchBtn.addEventListener('click', function(event){
   const cityName=cityInput.value.trim();
   if (!cityName){
    alert('Error');
    //TODO display a nice message instead
    return;
   }
   loadMain(cityName);
       // storeCities(cityName);
       getEvents(cityName);
       getCoordinates(cityName);
       getNews(cityName);
>>>>>>> 47dfd767a47a8c57e74d8a27428f95ac7a160fc4
       
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
//     let pastCities=document.querySelector('.')
//     cities.push(cityName);
//     localStorage.setItem(cities);
// let cityList= document.querySelector('');
<<<<<<< HEAD
//
        
=======
// }
>>>>>>> 47dfd767a47a8c57e74d8a27428f95ac7a160fc4
