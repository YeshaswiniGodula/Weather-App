const apiKey = '619e6a4b9b0fdcd81ba0fb1e23f81532'; // Your provided API key
const defaultCity = 'London'; // Set your default city here

function fetchWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            if (data.cod !== 200) {
                throw new Error('Error: ' + data.message);
            }
            document.getElementById('city').textContent = data.name;
            document.getElementById('description').textContent = data.weather[0].description;
            document.getElementById('temperature').textContent = `${data.main.temp}°C`;
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            alert('Failed to fetch weather data. Please check the city name and try again.');
        });
}

// Fetch weather for the default city on load
fetchWeather(defaultCity);

// Automatically update weather every 10 minutes (600000 milliseconds)
setInterval(() => {
    fetchWeather(defaultCity);
}, 600000);

// Event listener for search button
document.getElementById('search-button').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    fetchWeather(city);
});