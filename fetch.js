$(document).ready(function () {
  const countriesElement = $(".all-countries");
  const regionsDropdown = $("#regions");

  const all_countries_Url = "https://restcountries.com/v3.1/all"; // url to fetch all countries
  const promiseForAllCountries = fetch(all_countries_Url); // fetching the api

  let allRegions = [];
  let regionToRender;
  let regionUrl;
  // Getting all the regions from the API
  promiseForAllCountries
    .then((res) => (res = res.json()))
    .then((countries) => {
      countries.map((country) => {
        allRegions.push(country.region);
        allRegions = [...new Set(allRegions)];
      });
      allRegions.forEach((region) => {
        let regionItem = new Option(region, region); // Creating the news options from the regions array.
        regionItem.classList.add("region-item");
        console.log(regionItem);
        regionsDropdown.append(regionItem);
        $("select option[value='Oceania']").attr("selected", "selected");
      });
      return (regionToRender = "Oceania");
    })
    .then((region) => {
      regionUrl = `https://restcountries.com/v3.1/region/${region}`;
      rendercountries(regionUrl);
      regionsDropdown.change((e) => {
        let currentRegion = e.target.value;
        regionUrl = `https://restcountries.com/v3.1/region/${currentRegion}`;
        rendercountries(regionUrl);
      });
    });

  const rendercountries = (url) => {
    // passing the promise
    regionPromise = fetch(url);
    regionPromise
      .then((res) => (res = res.json()))
      .then((countries) => {
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
      });
  };

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
});
