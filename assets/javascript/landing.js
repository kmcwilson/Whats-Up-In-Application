<<<<<<< HEAD
const cityInput= document.getElementById('input-city');
const searchBtn=document.getElementById('search-btn');
const cityName=cityInput.value.trim();

searchBtn.addEventListener('click', function(event){
    event.preventDefault();
    const cityName=cityInput.value.trim();
    if (!cityName){
     alert('Error');
     //TODO display a nice message instead
     return;
    }
    console.log('hello');
    document.location.replace(`second.html?city=${cityName}`);
});
=======
const cityInput= document.getElementById('input-city');
const searchBtn=document.getElementById('search-btn');
const cityName=cityInput.value.trim();

searchBtn.addEventListener('click', function(event){
    event.preventDefault();
    const cityName=cityInput.value.trim();
    if (!cityName){
     alert('Error');
     //TODO display a nice message instead
     return;
    }
    console.log('hello');
    document.location.replace(`second.html?city=${cityName}`);
});
>>>>>>> 47dfd767a47a8c57e74d8a27428f95ac7a160fc4
