let weather = {
    apiKey: '78d6b13c1f44e9edc27faf17eaa349f8',

    // Async Await Method of Fetch
    fetchWeather: async function (city) {
        let response = await fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
             + city 
             + "&units=metric&appid="
             + this.apiKey
            );
        let data = await response.json();
        return this.displayWeather(data);
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector('.city').innerText = "Weather in " + name;
        document.querySelector('.icon').src = 'https://openweathermap.org/img/wn/' + icon + '.png';
        document.querySelector('.description').innerText = description;
        document.querySelector('.temp').innerText = temp + '°C';
        document.querySelector('.humidity').innerText = 'Humidity: ' + humidity + '%';
        document.querySelector('.wind').innerText = 'Wind speed: ' + speed + 'km/hr';
        document.querySelector('.weather').classList.remove('loading');
        document.body.style.backgroundImage = "url('https://source.unsplash.com/random/?" + name + "')"
    },
}

document.querySelector('.search button').addEventListener('click', function () {
    weather.fetchWeather(document.querySelector('.search-bar').value);
})

document.querySelector('.search-bar').addEventListener('keyup', function (event) {
    if(event.key === 'Enter'){
        weather.fetchWeather(document.querySelector('.search-bar').value);
    }
})

// Initial call with default city Singapore set by us
weather.fetchWeather('Singapore');


// api.openweathermap.org/data/2.5/weather?q=Denver&units=metric&appid=78d6b13c1f44e9edc27faf17eaa349f8


// Chaining Promises method for fetch API

// fetchWeather: function (city) {
// fetch(
// "https://api.openweathermap.org/data/2.5/weather?q="
//  + city 
//  + "&units=metric&appid="
//  + this.apiKey
// )
// .then( response => response.json())
// .then( data => this.displayWeather(data))
// },