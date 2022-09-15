$(document).ready(function () {
  const countriesElement = $(".all-countries");

  const all_countries_Url = "https://restcountries.com/v3.1/all"; // url to fetch all countries
  const countryPromise = fetch(all_countries_Url); // fetching the api

  // passing the promise
  countryPromise
    .then((res) => (res = res.json()))
    .then((countries) => {
      countries.map((country) => {
        // if (country.capital[0] === "undefined") {
        //   country.capital[0] = "No capital found";
        // }
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
                Population: <span>${country.population}</span>
              </p>
              <p class="country-region">Region:<span>${country.region}</span></p>
              <p class="country-capital">Capital:<span>${country.capital}</span></p>
            </div>
          </div>
        </div>
          `
        );
      });
    });
});
