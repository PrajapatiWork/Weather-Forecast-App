let cityName = document.querySelector("#searchCity");
let btnSearch = document.querySelector(".searchBtn");
const temp = document.querySelector(".temp");
const icon = document.querySelector(".temp-icon img");
const description = document.querySelector(".description");
const humidity = document.querySelector(".humi");
const windSpeed = document.querySelector(".speed");
let msg = document.querySelector(".msg");

const baseURL = "http://api.openweathermap.org/data/2.5/weather?q";
let appId = "your API key";

 btnSearch.addEventListener("click", () => {
  if (cityName.value == "") {
    return;
  }
  weatherInfo();
});

const weatherInfo = async () => {
  msg.innerText = " ";
  let cityNm = cityName.value;
  // make 1st letter capital
  let city = cityNm.charAt(0).toUpperCase() + cityNm.slice(1);

  const URL = `${baseURL}=${city}&appid=${appId}`;  
  let response = await fetch(URL);
  let data = await response.json();

  try {
    let temparture = data.main.temp;
    // temparture is in Kelvin formula is 296.17K − 273.15 = 23.02°C
    tempInCel = `${temparture} ` - 273.15;
    temp.innerText = tempInCel.toFixed(2) + " °C";

    let wIcon = data.weather[0].icon;
    icon.src = `https://openweathermap.org/img/wn/${wIcon}@2x.png`;
    icon.style.display = "block";

    let descr = data.weather[0].description;
    description.innerText = descr.charAt(0).toUpperCase() + descr.slice(1);

    humidity.innerText = data.main.humidity + " %";
    windSpeed.innerText = data.wind.speed + " Km/h";

  } catch (error) {
    msg.innerText = data.message;
    temp.innerText="0 °C";
    icon.style.display = "none";
    description.innerText="----";
    humidity.innerText="0 %";
    windSpeed.innerText="0 Km/h";
  }
};
