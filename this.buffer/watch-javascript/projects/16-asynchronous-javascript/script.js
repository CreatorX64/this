"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

const renderCountry = (data, className = "") => {
  const html = `
    <article class="country ${className}">
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
};

const renderError = (msg) => {
  countriesContainer.insertAdjacentText("beforeend", msg);
};

/*
//-- Using XMLHttpRequeset

const getCountryData = (country) => {
  const request = new XMLHttpRequest();

  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener("load", (event) => {
    const [data] = JSON.parse(event.target.responseText);

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
*/

/*
//-- Callback hell

setTimeout(() => {
  console.log("1 second passed");
  setTimeout(() => {
    console.log("2 seconds passed");
    setTimeout(() => {
      console.log("3 seconds passed");
      setTimeout(() => {
        console.log("4 seconds passed");
        // ...
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

const getCountryAndNeighbor = (country) => {
  // AJAX call for country
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener("load", (event) => {
    const [data] = JSON.parse(event.target.responseText);

    // Render country
    renderCountry(data);

    // Get neighbor country
    const [neighbor] = data.borders;

    if (!neighbor) {
      return;
    }

    // AJAX call for neighbor country
    const request2 = new XMLHttpRequest();
    request2.open("GET", `https://restcountries.com/v3.1/alpha/${neighbor}`);
    request2.send();

    request2.addEventListener("load", (event) => {
      const [data2] = JSON.parse(event.target.responseText);
      renderCountry(data2, "neighbor");
    });
  });
};

// getCountryAndNeighbor("portugal");
// getCountryAndNeighbor("usa");
*/

//-- Promises and the Fetch API

// const getCountryAndNeighbor = (country) => {
//   // Country 1
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error(`Country not found (${res.status})`);
//       }
//       return res.json();
//     })
//     .then((data) => {
//       renderCountry(data[0]);
//       const [neighbor] = data[0].borders;
//       if (!neighbor) {
//         return;
//       }
//       // Country 2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
//     })
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error(`Country not found (${res.status})`);
//       }
//       return res.json();
//     })
//     .then((data) => renderCountry(data[0], "neighbor"))
//     .catch((error) => {
//       console.error(`💥💥💥 ${error}`);
//       renderError(`💥 Something went wrong: ${error.message} 💥`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// Utility function to reduce duplication in the getCountryAndNeighbor()
// function below, in contrast to the one above.
const getJSON = (url, errorMsg = "Something went wrong") => {
  return fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(`${errorMsg} (${res.status})`);
    }
    return res.json();
  });
};

const getCountryAndNeighbor = (country) => {
  // Country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, "Country not found")
    .then((data) => {
      renderCountry(data[0]);

      if (!data[0].borders) {
        throw new Error("No neighbor found!");
      }

      const [neighbor] = data[0].borders;

      // Country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbor}`,
        "Country not found"
      );
    })
    .then((data) => renderCountry(data[0], "neighbor"))
    .catch((error) => {
      console.error(`💥💥💥 ${error}`);
      renderError(`💥 Something went wrong: ${error.message} 💥`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener("click", () => {
  getCountryAndNeighbor("turkey");
});
