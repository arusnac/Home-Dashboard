export function createCard(i, high, low, condition, day, conditionDesc) {
  const weatherDay = createWeatherElement(
    "h5",
    ["card-title", "mb-2"],
    `${day}`
  );

  const lowTemp = createWeatherElement(
    "h5",
    ["card-subtitle", "mb-2"],
    `Low: ${low}`
  );
  const highTemp = createWeatherElement(
    "h5",
    ["card-subtitle", "pt-5", "mb-2"],
    `High ${high}`
  );
  const conditionIcon = document.createElement("img");
  conditionIcon.src = getConditionIcon(conditionDesc);
  conditionIcon.alt = "weather icon";

  const weatherCondition = createWeatherElement(
    "h5",
    ["card-subtitle", "mb-2"],
    `${condition}`
  );
  const innerCard = createWeatherElement("div", ["card-body"]);
  innerCard.appendChild(weatherDay);
  innerCard.appendChild(conditionIcon);
  innerCard.appendChild(highTemp);
  innerCard.appendChild(lowTemp);
  innerCard.appendChild(weatherCondition);

  const outerCard = createWeatherElement("div", ["card", `card${i}`]);
  outerCard.style.width = "9rem";
  outerCard.style.boxShadow = "1px 1px rgb(153, 153, 153)";
  outerCard.appendChild(innerCard);

  document.querySelector(".weather").appendChild(outerCard);
}

function createWeatherElement(type, classes, text) {
  const div = document.createElement(type);

  if (classes.length) div.classList.add(...classes);

  if (text) div.innerText = text;

  return div;
}

function getConditionIcon(con) {
  let icon;

  if (con === "clear sky") icon = "sun.svg";
  else if (con === "few clouds" || con === "scattered clouds")
    icon = "cloud-sun.svg";
  else if (con === "overcast clouds" || con === "broken clouds")
    icon = "cloud.svg";
  else if (
    con === "light rain" ||
    con === "light intensity drizzle" ||
    con === "drizzle"
  )
    icon = "cloud-drizzle.svg";
  else if (
    con === "moderate rain" ||
    con === "heavy intensity rain" ||
    con === "very heavy rain"
  )
    icon = "cloud-rain.svg";
  else if (con === "mist" || con === "Smoke" || con === "Haze" || con === "fog")
    icon = "haze.svg";
  else if (con === "light snow" || con === "Snow" || con === "Heavy snow")
    icon = "cloud-snow.svg";

  return icon;
}
