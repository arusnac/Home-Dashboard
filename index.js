import { createCard } from "./createCard.js";

const currentDate = document.querySelector(".date");
const currentTime = document.querySelector(".time");
const currentDay = document.querySelector(".day");
const todayTemp = document.querySelector(".today-temp");
const todayHigh = document.querySelector(".today-high");
const todayLow = document.querySelector(".today-low");
const todayCondition = document.querySelector(".today-condition");
const imageGallery = document.querySelector(".image-gallery");
let backgroundImage = document.body.style.background;

let day = new Date().getDay();

function getDayString(d) {
  //If the day number is higher than 6 reset it
  if (d > 6) d -= 7;

  //Determine the day based on the number
  switch (d) {
    case 0:
      d = "Sunday";
      break;
    case 1:
      d = "Monday";
      break;
    case 2:
      d = "Tuesday";
      break;
    case 3:
      d = "Wednesday";
      break;
    case 4:
      d = "Thursday";
      break;
    case 5:
      d = "Friday";
      break;
    case 6:
      d = "Saturday";
      break;
    default:
      "Sunday";
  }

  return d;
}

//Clock that updates every second
function clock() {
  let date = new Date();
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();
  let indicator = "AM";
  let today = new Date().toLocaleDateString();
  let dayString = getDayString(day);

  if (hh > 12) {
    indicator = "PM";
    hh -= 12;
  }

  hh === 0 ? (hh = 12) : (hh = hh);

  hh = hh < 10 ? "0" + hh : hh;
  mm = mm < 10 ? "0" + mm : mm;
  ss = ss < 10 ? "0" + ss : ss;

  let time = `${hh}:${mm}:${ss}`;

  //Force a resfresh of the page at 2:30 am
  if (time === "02:30:00" && indicator === "AM") window.location.reload(true);

  currentDay.textContent = dayString;
  currentTime.textContent = time;
  currentDate.textContent = today;
  const timeOutTime = setTimeout(function () {
    clock();
  }, 1000);
}

clock();

const fetchData = async () => {
  await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&units=imperial&appid=${OPEN_API}`
  )
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      drawWeather(result);
    })
    .catch(function () {
      console.log("error");
    });

  const timeoutWeather = setTimeout(function () {
    fetchData();
  }, 12000000);
};

fetchData();

//Determine the high and low from the next twelve hours
function getHigh(data) {
  let high = 0;
  let low = 200;
  for (let i = 0; i <= 12; i++) {
    let current = data.hourly[i].temp;
    if (high < current) high = current;
    if (low > current) low = current;
  }
  return [Math.trunc(high), Math.trunc(low)];
}

//Display todays weather data
function drawWeather(data) {
  let [high, low] = getHigh(data);
  todayTemp.innerHTML = Math.trunc(data.current.temp) + "&deg;";
  todayHigh.innerHTML = "High: " + high;
  todayLow.innerHTML = "Low: " + low;
  todayCondition.innerHTML = data.current.weather[0].main;

  getForecast(data);
}

//Build and set the data for the next handful of days utilizing the createCard function
function getForecast(data) {
  for (let i = 0; i < 6; i++) {
    console.log(
      data.daily[i].temp.max,
      data.daily[i].temp.min,
      data.daily[i].weather[0].main,
      getDayString(day + i + 1),
      data.daily[i].weather[0].description
    );

    //If the elements are already there remove them and update when the data refreshes
    const weatherCard = document.querySelector(`.card${i}`);
    if (weatherCard) weatherCard.remove();

    createCard(
      i,
      Math.trunc(data.daily[i].temp.max),
      Math.trunc(data.daily[i].temp.min),
      data.daily[i].weather[0].main,
      getDayString(day + i + 1),
      data.daily[i].weather[0].description
    );
  }
  console.log(data.daily[0]);
}

//Get a random int for pulling the photo url
function getRandomInt() {
  return Math.floor(Math.random() * 443 + 1);
}

//Set photo randomly from s3
function setImages() {
  let currentImage = getRandomInt();
  imageGallery.src = `${s3_url}`;

  const timeoutImages = setTimeout(function () {
    setImages();
  }, 600000);
}

setImages();
