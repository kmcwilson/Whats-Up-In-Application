const cityInput = document.getElementById('input-city');
const searchBtn = document.getElementById('search-btn');
const cityName = cityInput.value.trim();
const message = document.getElementById("error");

searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    const cityName = cityInput.value.trim();
    //add in no input error message without an alert using bootstrap
    if (!cityName) {
        alert('Error');

        //TODO display a nice message instead

        return;
    }
    console.log('hello');
    document.location.replace(`second.html?city=${cityName}`);
});