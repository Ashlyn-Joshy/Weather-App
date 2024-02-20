const details = {
  cityName: document.querySelector("#cityName"),
  search: document.querySelector("button"),
  cityInfo: document.querySelector("#cityInfo"),
  city: document.querySelector("#city"),
  weatherDescription: document.querySelector("#weatherDescription"),
  weatherPic: document.querySelector("#weatherPic"),
  temp: document.querySelector("#temp"),
  feelsLike: document.querySelector("#feelsLike"),
  tempMin: document.querySelector("#tempMin"),
  tempMax: document.querySelector("#tempMax"),
  humidity: document.querySelector("#humidity"),
  windSpeed: document.querySelector("#windSpeed"),
  windGust: document.querySelector("#windGust"),
  windDirection: document.querySelector("#windDirection"),
  visibility: document.querySelector("#visibility"),
};

const weather = async () => {
  try {
    const city = details.cityName.value;
    const searchCity = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ca80acb542b7d78a0221ef33b51153bb`
    );
    data(searchCity);
    details.cityName.value = "";
  } catch (error) {
    alert("city not found");
    console.log("ohh boy something went wrong", error);
  }
};
const data = (info) => {
  //about the city and country
  details.city.innerHTML = `${info.data.name} , ${info.data.sys.country}`;
  //weather pic image
  const weatherImg = document.createElement("img");
  weatherImg.src = ` https://openweathermap.org/img/wn/${info.data.weather[0].icon}@2x.png`;
  //removing previous image
  details.weatherPic.innerHTML = "";
  details.weatherPic.append(weatherImg);
  details.weatherDescription.innerHTML = `${info.data.weather[0].description}`;
  //all about temperature
  details.temp.innerHTML = `${tempCelsius(info.data.main.temp)}℃`;
  details.feelsLike.innerHTML = `${tempCelsius(info.data.main.feels_like)}℃`;
  details.tempMax.innerHTML = `${tempCelsius(info.data.main.temp_max)}℃`;
  details.tempMin.innerHTML = `${tempCelsius(info.data.main.temp_min)}℃`;
  //humidity
  details.humidity.innerHTML = `${info.data.main.humidity}%`;
  //all about wind
  details.windDirection.innerHTML = `${info.data.wind.deg}`;
  details.windSpeed.innerHTML = `${info.data.wind.speed} meter/sec`;
  details.windGust.innerHTML = `${info.data.wind.gust} meter/sec`;
  //visibility
  details.visibility.innerHTML = `${info.data.visibility / 1000} KM`;
};
//to convert the temp
const tempCelsius = (tempKelvin) => Math.floor(tempKelvin - 273.15);
//when pressing the enter button
const enterButton = async (event) => {
  if (event.keyCode === 13) {
    await weather();
  }
};
details.cityName.addEventListener("keydown", enterButton);
details.search.addEventListener("click", weather);
