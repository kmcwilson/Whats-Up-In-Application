//Getting the user input and using this in order to fill the following page
const cityInput = document.getElementById('input-city');
const searchBtn = document.getElementById('search-btn');
const cityName = cityInput.value.trim();
const message = document.getElementById("error");

searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    const cityName = cityInput.value.trim();
    //If a city name is not entered, the user will find an error message below the input bar
    if (!cityName) {
        $('.alert').attr('style', "display: flex");

        return;
    }
    //When a city name is entered, the document location will change to the second html page and use the input of city to grab information
    document.location.replace(`second.html?city=${cityName}`);
});