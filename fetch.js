$(document).ready(function () {
  const countriesElement = $(".all-countries"); // Element to append all countries
  const regionsDropdown = $("#regions"); // Element to append all region to the drodown

  const all_countries_Url = "https://restcountries.com/v3.1/all"; // url to fetch all countries

  let allRegions = []; // Array to store all regions
  let regionUrl; // variable to get or store the current region that is selected

  // Calling the function for first time
  fetchallCountries(all_countries_Url);

  // Function to get all the regions, update it into the array and render oceania region on page load
  async function fetchallCountries(url) {
    const promiseForAllCountries = await fetch(url); // fetching the api
    const allCountriesData = await promiseForAllCountries.json(); // Changing the data from json form
    allCountriesData.map((country) => {
      allRegions.push(country.region); //  updating the array
      allRegions = [...new Set(allRegions)]; // removing the repeated or dupicate regions
    });
    allRegions.forEach((region) => {
      let regionItem = new Option(region, region); // Creating the news options from the regions array.
      regionItem.classList.add("region-item"); // Adding the class to options
      //console.log(regionItem);
      regionsDropdown.append(regionItem); // appending the regions to the dropdown
      $("select option[value='Oceania']").attr("selected", "selected"); //selecting the oceania as selected region
    });
    regionUrl = `https://restcountries.com/v3.1/region/Oceania`; // Default region to show on page
    rendercountries(regionUrl); // calling the render function to load oceania region on the page
  }

  // render function to show the countries on the page
  async function rendercountries(url) {
    const regionPromise = await fetch(url); // getting the countries
    const countries = await regionPromise.json(); // changing the data from json form

    // Rendering each country of the region on the page
    countries.map((country) => {
      let population = country.population;
      population = changePopToNumberSystem(population);
      //console.log(population);
      countriesElement.prepend(
        `
            <div class="country">
            <div class="country-header">
              <img class="country-image" src="${country.flags.png}" alt="${country.name.official} flag svg" />
            </div>
            <div class="country-section">
              <h3 class="country-name">${country.name.common}</h3>
              <div class="country-data">
                <p class="country-population">
                  Population: <span>${population}</span>
                </p>
                <p class="country-region">Region: <span>${country.region}</span></p>
                <p class="country-capital">Capital: <span>${country.capital}</span></p>
              </div>
            </div>
          </div>
            `
      );
    });
  }

  // Function to change population to K,M,B;
  const changePopToNumberSystem = (population) => {
    let popInStart = population;
    population = population / 1000000;
    population = population.toFixed(2);
    if (population < 1) {
      population = population * 1000;
      if (population < 1) {
        population = popInStart.toFixed(2);
      }
      population = population + "K";
    } else if (population > 1000) {
      population = population / 1000;
      population = population.toFixed(2);
      population = population + "B";
    } else {
      population = population + "M";
    }
    return population;
    // console.log(popInStart , population);
  };

  // Adding the onchange listener to the dropdown
  regionsDropdown.change((e) => {
    let currentRegion = e.target.value;
    regionUrl = `https://restcountries.com/v3.1/region/${currentRegion}`;
    rendercountries(regionUrl);
  });
});
