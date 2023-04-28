"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////
function getCountry(country) {
    const request = new XMLHttpRequest();
    request.open("GET", `https://restcountries.com/v2/name/${country}`);
    request.send();

    request.addEventListener("load", function() {
        const [data] = JSON.parse(this.responseText);
        console.log(data);
        const html = `<article class="${data.name}">
                // <img class="country__img" src="${data.flag}" />
                // <div class="country__data">
                // <h3 class="country__name">${data.name}</h3>
                //  <h4 class="country__region">${data.name}</h4>
                //  <p class="country__row"><span>👫</span>${(
                  +data.population / 1000000
                ).toFixed(1)}</p>
                //<p class="country__row"><span>🗣️</span>${
                  data.languages[0].name
                }</p>
                // <p class="country__row"><span>💰</span>${
                  data.currencies[0].name
                }</p>
                //  </div>
                 </article>
                `;
        countriesContainer.insertAdjacentHTML("beforeend", html);
        countriesContainer.style.opacity = 1;
    });
}
const getCountryData = function(country) {
    fetch(`https: //restcountries.com/v2/name/${country}`)
        .then((response) => {
            console.log(response);
            if (!response.ok) {
                throw new Error(`Country not found(${response.status})`);
            }
            return response.json();
        })
        .then((data) => {
            renderCountry(data[0]);
            const neighbour = data[0].borders[0];

            if (!neighbour) throw new Error("Country not found");

            return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Country not found(${response.status})`);
            }
            response.json();
        })
        .then((data) => renderCountry(data, "neighbour"))
        .catch((err) => {
            console.error(`${err} $$$$$`);
            renderError(`Try again ${err.message}.Check Service later`);
        })
        .finally(() => {
            countriesContainer.style.opacity = 1;
        });
};

btn.addEventListener("click", function() {
    getCountryData("argentina");
    getCountryData("Iceland");
});
getCountryData("Australia");



getCountry("Netherlands");
getCountry("Kosovo");
getCountry("Germany");