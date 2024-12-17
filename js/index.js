let myCountry = document.getElementById("mycountry");
let temp = document.getElementById("temp");
let toDayImage = document.getElementById("toDayImage");
let text = document.getElementById("text");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let direction = document.getElementById("direction");
let secondDayImage = document.getElementById("secondDayImage");
let secondDayTemp = document.getElementById("secondDayTemp");
let secondDayNum = document.getElementById("secondDayNum");
let secondDaytext = document.getElementById("secondDaytext");
let theredDayImage = document.getElementById("theredDayImage");
let theredDaytemp = document.getElementById("theredDaytemp");
let theredDaytext = document.getElementById("theredDaytext");
let theredDaynum = document.getElementById("theredDaynum");
let todayName = document.getElementById("todayName");
let todayNumber = document.getElementById("todayNumber");
let todayMonth = document.getElementById("todayMonth");
let nextDay = document.getElementById("nextDay");
let lastDay = document.getElementById("lastDay");

let btnSearch = document.getElementById("btnSearch");
let searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function () {
  mainFunction(searchInput.value);
});

let country = [];

async function search(city) {
  try {
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=f8df002fbed0461c84a180509240612&q=${city}&days=3`
    );
    if (response.ok) {
      let data = await response.json();
      return data;
    }
  } catch (error) {
    console.log("Error: " + error);
  }
}

//  current day
function displayTodayData(mydata) {
  let today = new Date();
  todayName.textContent = today.toLocaleDateString("en-us", {
    weekday: "long",
  });
  todayNumber.textContent = today.getDate();
  todayMonth.textContent = today.toLocaleDateString("en-us", { month: "long" });
  myCountry.textContent = mydata.location.name;
  temp.textContent = mydata.current.temp_c + "oC";
  toDayImage.setAttribute("src", mydata.current.condition.icon);
  text.textContent = mydata.current.condition.text;
  humidity.innerHTML =
    `<img src="./images/icon-umberella.png" alt=""> ` +
    mydata.current.humidity +
    "%";
  wind.innerHTML =
    `<img src="./images/icon-wind.png" alt="">` +
    mydata.current.wind_kph +
    "km/h";
  direction.innerHTML =
    `<img src="./images/icon-compass.png" alt="">` + mydata.current.wind_dir;
}

//  next 2 days
function getDaysOne(mydata) {
  let forecastdayDate = mydata.forecast.forecastday;
  secondDayImage.setAttribute("src", forecastdayDate[1].day.condition.icon);
  secondDayTemp.textContent = forecastdayDate[1].day.maxtemp_c + "oC";
  secondDayNum.textContent = forecastdayDate[1].day.mintemp_c + "oC";
  secondDaytext.textContent = forecastdayDate[1].day.condition.text;

  let nextDate = new Date(forecastdayDate[1].date);
  nextDay.textContent = nextDate.toLocaleDateString("en-US", {
    weekday: "long",
  });
}

function getDayTwo(mydata) {
  let forecastdayDate = mydata.forecast.forecastday;
  theredDayImage.setAttribute("src", forecastdayDate[2].day.condition.icon);
  theredDaytemp.textContent = forecastdayDate[2].day.maxtemp_c + "oC";
  theredDaynum.textContent = forecastdayDate[2].day.mintemp_c + "oC";
  theredDaytext.textContent = forecastdayDate[2].day.condition.text;

  let nextDate = new Date(forecastdayDate[2].date);
  lastDay.textContent = nextDate.toLocaleDateString("en-US", {
    weekday: "long",
  });
}

// start function
async function mainFunction(city = "Cairo") {
  let mydata = await search(city);
  if (!mydata.error) {
    displayTodayData(mydata);
    getDaysOne(mydata);
    getDayTwo(mydata);
  }
}
mainFunction();