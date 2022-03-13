"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

//-- Using XMLHttpRequeset

const getCountryData = (country) => {
  const request = new XMLHttpRequest();

  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener("load", (event) => {
    const [data] = JSON.parse(event.target.responseText);
    console.log(data);

    const html = `
      <article class="country">
        <img class="country__img" src="${data.flags.png}" />
        <div class="country__data">
          <h3 class="country__name">${data.name.common}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            Number(data.population) / 1000000
          ).toFixed(1)}M people</p>
          <p class="country__row"><span>🗣️</span>${
            data.languages[Object.keys(data.languages)[0]]
          }</p>
          <p class="country__row"><span>💰</span>${
            data.currencies[Object.keys(data.currencies)[0]].name
          }</p>
        </div>
      </article>
    `;

    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData("portugal");
getCountryData("usa");
getCountryData("turkey");
