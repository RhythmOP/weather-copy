let weather = {
  apiKey: "f7a29db5ec30b6b27b83fb5a4983a5fb",
  fetchWeather: function (city) {
      // ... (Your existing fetchWeather function)
  },
  fetchWeatherByCoordinates: function (latitude, longitude) {
      // ... (Your existing fetchWeatherByCoordinates function)
  },
  fetchUVIndex: function (latitude, longitude) {
      // ... (Your existing fetchUVIndex function)
  },
  fetchAirQuality: function (latitude, longitude) {
      // ... (Your existing fetchAirQuality function)
  },
  displayWeather: function (data) {
      // ... (Your existing displayWeather function)
  },
  search: function () {
      const city = document.querySelector(".search-bar").value;
      this.fetchWeather(city);
      this.fetchForecast(city); // Fetch forecast when searching
  },
  geolocate: function () {
      navigator.geolocation.getCurrentPosition(
          (position) => {
              const { latitude, longitude } = position.coords;
              this.fetchWeatherByCoordinates(latitude, longitude);
              this.fetchForecastByCoordinates(latitude, longitude); // Fetch forecast by coordinates
          },
          (error) => {
              alert("Unable to retrieve your location");
          }
      );
  },
  fetchForecast: function (city) {
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=<span class="math-inline">\{city\}&units\=metric&appid\=</span>{this.apiKey}`;
      fetch(forecastUrl)
          .then((response) => response.json())
          .then((data) => {
              this.displayForecast(data.list);
          })
          .catch((error) => {
              console.error("Error fetching forecast:", error);
              const forecastContainer = document.querySelector(".forecast-container");
              forecastContainer.innerHTML = "<p>Error fetching forecast.</p>";
          });
  },
  displayForecast: function (forecastData) {
      const forecastContainer = document.querySelector(".forecast-container");
      forecastContainer.innerHTML = "";

      const dailyForecast = [];
      for (let i = 0; i < forecastData.length; i += 8) {
          dailyForecast.push(forecastData[i]);
      }

      dailyForecast.forEach((dayData) => {
          const date = new Date(dayData.dt * 1000);
          const day = date.toLocaleDateString('en-US', { weekday: 'short' });
          const iconCode = dayData.weather[0].icon;
          const temp = Math.round(dayData.main.temp);

          const forecastDay = document.createElement("div");
          forecastDay.classList.add("forecast-day");
          forecastDay.innerHTML = `
              <div class="forecast-date"><span class="math-inline">\{day\}</div\></4\>
<img class\="forecast\-icon" src\="https\://openweathermap\.org/img/wn/</span>{iconCode}.png" alt="Forecast Icon">
              <div class="forecast-temp">${temp}°C</div>
          `;
          forecastContainer.appendChild(forecastDay);
      });
  },
  fetchForecastByCoordinates: function (latitude, longitude) {
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=<span class="math-inline">\{latitude\}&lon\=</span>{longitude}&units=metric&appid=${this.apiKey}`;
      fetch(forecastUrl)
          .then((response) => response.json())
          .then((data) => {
              this.displayForecast(data.list);
          })
          .catch((error) => {
              console.error("Error fetching forecast:", error);
              const forecastContainer = document.querySelector(".forecast-container");
              forecastContainer.innerHTML = "<p>Error fetching forecast.</p>";
          });
  },
};


document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document.querySelector
// ... (Your existing JavaScript code) ...

weather.fetchForecast = function (city) {
  fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${this.apiKey}`
  )
      .then((response) => response.json())
      .then((data) => {
          this.displayForecast(data.list);
      });
};

weather.displayForecast = function (forecastData) {
  const forecastContainer = document.querySelector(".forecast-container");
  forecastContainer.innerHTML = ""; // Clear previous forecast

  // Filter forecast data to get one entry per day (around noon)
  const dailyForecast = [];
  for (let i = 0; i < forecastData.length; i += 8) { // 8 entries per day
      dailyForecast.push(forecastData[i]);
  }



  dailyForecast.forEach((dayData) => {
      const date = new Date(dayData.dt * 1000);
      const day = date.toLocaleDateString('en-US', { weekday: 'short' }); // Get day of the week
      const iconCode = dayData.weather[0].icon;
      const temp = Math.round(dayData.main.temp);


      const forecastDay = document.createElement("div");
      forecastDay.classList.add("forecast-day");
      forecastDay.innerHTML = `
          <div class="forecast-date">${day}</div>
          <img class="forecast-icon" src="https://openweathermap.org/img/wn/${iconCode}.png" alt="Forecast Icon">
          <div class="forecast-temp">${temp}°C</div>
         
      `;
      forecastContainer.appendChild(forecastDay);
  });
};


weather.search = function () {
  const city = document.querySelector(".search-bar").value;
  this.fetchWeather(city);
  this.fetchForecast(city); // Fetch forecast when searching
};

weather.geolocate = function () {
  navigator.geolocation.getCurrentPosition(
      (position) => {
          const { latitude, longitude } = position.coords;
          this.fetchWeatherByCoordinates(latitude, longitude);
          this.fetchForecastByCoordinates(latitude, longitude); // Fetch forecast by coordinates
      },
      (error) => {
          alert("Unable to retrieve your location");
      }
  );
};

weather.fetchForecastByCoordinates = function (latitude, longitude) {
  fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${this.apiKey}`
  )
      .then((response) => response.json())
      .then((data) => {
          this.displayForecast(data.list);
      });
};


// ... (Rest of your JavaScript code)

// Call fetchForecast initially to display forecast for default city
weather.fetchForecast("Amravati, Maharashtra");