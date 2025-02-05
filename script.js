let weather = {
    apiKey: "f7a29db5ec30b6b27b83fb5a4983a5fb",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => {
          this.displayWeather(data);
          this.fetchUVIndex(data.coord.lat, data.coord.lon);
          this.fetchAirQuality(data.coord.lat, data.coord.lon);
        });
    },
    fetchWeatherByCoordinates: function (latitude, longitude) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
          latitude +
          "&lon=" +
          longitude +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => {
          this.displayWeather(data);
          this.fetchUVIndex(latitude, longitude);
          this.fetchAirQuality(latitude, longitude);
        });
    },
    fetchUVIndex: function (latitude, longitude) {
      fetch(
        "https://api.openweathermap.org/data/2.5/uvi?lat=" +
          latitude +
          "&lon=" +
          longitude +
          "&appid=" +
          this.apiKey
      )
        .then((response) => response.json())
        .then((data) => {
          const uvValue = data.value;
          const uvBadge = document.querySelector(".uv-index .badge");
          uvBadge.innerText = uvValue;
          if (uvValue <= 2) {
            uvBadge.className = "badge uv low";
            uvBadge.innerText = "Low";
          } else if (uvValue <= 5) {
            uvBadge.className = "badge uv moderate";
            uvBadge.innerText = "Moderate";
          } else if (uvValue <= 7) {
            uvBadge.className = "badge uv high";
            uvBadge.innerText = "High";
          } else {
            uvBadge.className = "badge uv very-high";
            uvBadge.innerText = "Very High";
          }
        });
    },
    fetchAirQuality: function (latitude, longitude) {
      fetch(
        "https://api.openweathermap.org/data/2.5/air_pollution?lat=" +
          latitude +
          "&lon=" +
          longitude +
          "&appid=" +
          this.apiKey
      )
        .then((response) => response.json())
        .then((data) => {
          const aqiValue = data.list[0].main.aqi;
          const aqiBadge = document.querySelector(".air-quality .badge");
          if (aqiValue === 1) {
            aqiBadge.className = "badge aqi good";
            aqiBadge.innerText = "Good";
          } else if (aqiValue === 2) {
            aqiBadge.className = "badge aqi moderate";
            aqiBadge.innerText = "Moderate";
          } else if (aqiValue === 3) {
            aqiBadge.className = "badge aqi poor";
            aqiBadge.innerText = "Poor";
          } else if (aqiValue === 4) {
            aqiBadge.className = "badge aqi unhealthy";
            aqiBadge.innerText = "Unhealthy";
          } else {
            aqiBadge.className = "badge aqi hazardous";
            aqiBadge.innerText = "Hazardous";
          }
        });
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity .progress").style.width = humidity + "%";
      document.querySelector(".humidity .value").innerText = humidity + "%";
      document.querySelector(".wind .badge").innerText = speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
        "/Users/atharvadahake/Downloads/weatherWise-master/images/" + icon + "bg_image.png";
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.fetchWeatherByCoordinates(latitude, longitude);
        },
        (error) => {
          alert("Unable to retrieve your location");
        }
      );
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        weather.search();
      }
    });
  
  // Auto-detect and fetch weather for current location on load
  weather.geolocate();
  
  // Set default location to Amravati, Maharashtra
  weather.fetchWeather("Amravati, Maharashtra");
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
