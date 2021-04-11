
const APIkey = '89cfc3719f6983d24c6f54b6e9725fe4'
const units = 'metric'
const container = document.getElementById('container');
const p = document.createElement('p');
const submitBtn = document.querySelector('.submit-btn');

submitBtn.addEventListener('click',handleSubmit);

//fetch
function fetchWeather(location){
    
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${APIkey}`,
    {
        mode: "cors"
    })
        .then((res) => {
        return res.json();
    })
        .then((res) => {
            const newData = processData(res)
            displayWeather(newData)
            console.log(processData(res))
            console.log(res)
        })
        .catch((err) => {
            console.log('error');
        })
    
    container.appendChild(p)
    console.log('fetchweather')
}

//prevents default submit
//and initialises sendweather
function handleSubmit(e) {
    e.preventDefault();
    sendWeather();
    console.log('handlesubmit')
}

//obtains input and uses it to fetch the weather
function sendWeather() {
    const input = document.querySelector('.value').value;
    fetchWeather(input)
    console.log('sendweather')
}

function processData(weather) {
    const weatherData = {
        condition: weather.weather[0].description.toUpperCase(),
        feels_like: Math.round(weather.main.feels_like),
        temp: Math.round(weather.main.temp),
        high: Math.round(weather.main.temp_max),
        low: Math.round(weather.main.temp_min),
        location: weather.sys.country.toUpperCase(),
        city: weather.name.toUpperCase()
    }

    return weatherData
}

function displayWeather(data) {
    
    document.querySelector('.card-title').textContent =  `${data.city}, ${data.location}`
    document.querySelector('.display-1').innerHTML =  `${data.temp}&deg;`
    document.querySelector('.condition').textContent =  `${data.condition}`
    document.querySelector('.feels').textContent =  `FEELS LIKE: ${data.feels_like}`
    document.querySelector('.h').innerHTML =  `H: ${data.high}&deg;`
    document.querySelector('.l').innerHTML =  `L: ${data.low}&deg;`
}

