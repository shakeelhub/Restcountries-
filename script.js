// Fetch countries data and display weather information for selected countries
function restcountries() {
  fetch("https://restcountries.com/v2/all")// Convert response to JSON
  .then((data) => {
    return data.json();
  }).then((data1) => {
    console.log(data1);

    // Filter the countries based on their names
    let country1 = data1.filter((val) => {
      return val.name === "India";
    });
    let country2 = data1.filter((val) => {
      return val.name === "Australia";
    });
    let country3 = data1.filter((val) => {
      return val.name === "Malaysia";
    });
    console.log(country3);

      // Call the main function with the filtered countries
    main(country1, country2, country3);
  });
}

// Call the 'restcountries' function to fetch and display the countries
restcountries();

// Create the main container
function main(a, b, c) {
  const main = document.createElement("div");
  main.setAttribute("id", "main");
  main.classList.add("container");

  // Create the title heading
  const h1 = document.createElement("h1");
  h1.innerHTML = "Restcountries and Weather using fetch API";
  h1.setAttribute("id", "title");
  h1.classList.add("text-center");

  // Create the main_div container to hold the cards
  const main_div = document.createElement("div");
  main_div.setAttribute("id", "main_div");
  main_div.classList.add("row");

   // Append the main elements to the document body
  document.body.append(main);
  main.append(h1, main_div);

  // Loop through the country data and create cards for each country
  [a, b, c].forEach((country, index) => {
    const section = document.createElement("div");
    section.classList.add("col-sm-6", "col-md-4", "col-lg-4", "col-xl-4");
    main_div.append(section);

      // Create a card container for each country
    const div = document.createElement("div");
    div.setAttribute("id", `div${index + 1}`);
    div.classList.add("card");
    section.append(div);

      // Create the heading for the card
    const heading = document.createElement("div");
    heading.setAttribute("id", `heading${index + 1}`);
    heading.classList.add("card-header");
    heading.style.backgroundColor = "black"; // Set the background color to black

      // Create the country name element
    const name = document.createElement("h5");
    name.innerHTML = country[0].name;

     // Create the body for the card
    const body = document.createElement("div");
    body.classList.add("card-body");

     // Create a container for the country flag and center it
    const divImg = document.createElement("div");
    divImg.setAttribute("id", `div_img${index + 1}`);
    divImg.classList.add("card-img-top");
    divImg.style.display = "flex"; // Add flexbox styling
    divImg.style.alignItems = "center"; // Center the items vertically

    // Create the country flag image
    const img = document.createElement("img");
    img.src = country[0].flags.svg;
    img.style.margin = "auto"; // Center the image horizontally

     // Create elements for capital, region, population, and country code
    const capital = document.createElement("h5");
    capital.innerHTML = `Capital : ${country[0].capital}`;

    const region = document.createElement("h5");
    region.innerHTML = `Region : ${country[0].region}`;

    const population = document.createElement("h5");
    population.innerHTML = `Population : ${country[0].population}`;

    const countryCode = document.createElement("h5");
    countryCode.innerHTML = `Country Code : ${country[0].cioc}`;

    // Create a container for the weather button and center it
    const divButton = document.createElement("div");
    divButton.setAttribute("id", `div_button${index + 1}`);
    divButton.style.display = "flex"; // Add flexbox styling
    divButton.style.justifyContent = "center"; // Center the button horizontally

    const button = document.createElement("button");
    button.setAttribute("id", `button${index + 1}`);
    button.innerHTML = "Click for Weather";
    button.onclick = () => weather(country[0]);
    button.classList.add("btn", "btn-primary");

     // Append the elements to their respective containers
    heading.append(name);
    divImg.append(img);
    divButton.append(button);
    body.append(divImg, capital, region, population, countryCode, divButton);
    div.append(heading, body);
  });
}

// Call the main function with the country data
main(country1, country2, country3);



// Functions to display weather information for each country
function weather() {
  // Weather information for India
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=20&lon=77&appid=fe9049d89fa19d96d1e5fd46f30befef`)
    .then((data) => data.json())
    .then((data1) => {
      console.log(data1);
      updateWeatherData(data1, "India");
    });
}


function weather2() {
  // Weather information for Australia
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=27&lon=133&appid=fe9049d89fa19d96d1e5fd46f30befef`)
    .then((data) => data.json())
    .then((data1) => {
      console.log(data1);
      updateWeatherData(data1, "Australia");
    });
}


function weather3() {
  // Weather information for Malaysia
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=2.5&lon=112.5&appid=fe9049d89fa19d96d1e5fd46f30befef`)
    .then((data) => data.json())
    .then((data1) => {
      console.log(data1);
      updateWeatherData(data1, "Malaysia");
    });
}

// Function to update weather data in the DOM
function updateWeatherData(data, countryName) {
  document.querySelectorAll("#main_fin").forEach((e) => e.remove());
  let main_fin = document.createElement("div");
  main_fin.setAttribute("id", "main_fin");
  main_fin.classList.add("container");
  let s = document.getElementById("main");
  s.append(main_fin);

  let fin_div = document.createElement("div");
  fin_div.setAttribute("id", "fin_div");
  main_fin.append(fin_div);

  let h2 = document.createElement("h2");
  h2.innerHTML = `To check weather in ${countryName}`;
  h2.setAttribute("id", "h2");

  let temp = document.createElement("h5");
  temp.innerHTML = `Temperature : ${Math.round(data.main.temp - 273.15)} <span id="siz"><sup>o</sup>C</span>`;

  let humidity = document.createElement("h5");
  humidity.innerHTML = `Humidity : ${data.main.humidity}`;

  let cloud = document.createElement("h5");
  cloud.innerHTML = `Cloud : ${data.weather[0].description}`;

  let wind = document.createElement("h5");
  wind.innerHTML = `Wind Speed : ${data.wind.speed}`;

  fin_div.append(h2, temp, humidity, wind, cloud);
}