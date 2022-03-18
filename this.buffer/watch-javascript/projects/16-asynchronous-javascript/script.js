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

/*
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
*/

/*
//-- The event loop in practice

// 1
console.log("Test start");

// 5
setTimeout(() => console.log("0 sec timer"), 0);

// 3
Promise.resolve("Resolved promise 1").then(console.log);

// 4
Promise.resolve("Resolved promise 2").then((res) => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});

// 2
console.log("Test end");
*/

/*
//-- Building a simple Promise

// Immediately creating a fulfilled or rejected Promise
Promise.resolve("resolved value").then(console.log);
Promise.reject("resolved value").catch(console.error);

const lotteryPromise = new Promise((resolve, reject) => {
  console.log("Lottery draw is happening... 🔮");
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve("You WIN 💰");
    } else {
      reject(new Error("You lost your money 💩"));
    }
  }, 2000);
});

lotteryPromise.then(console.log).catch(console.log);

// Promisifying setTimeout
const wait = (seconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log("1 seconds passed");
    return wait(1);
  })
  .then(() => {
    console.log("2 seconds passed");
    return wait(1);
  })
  .then(() => {
    console.log("3 seconds passed");
    return wait(1);
  })
  .then(() => {
    console.log("4 seconds passed");
  });

// Promisifying Geolocation API
const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
*/

/*
//-- Coding Challenge #1

const whereAmI = () => {
  const apiKey = "PASTE-YOUR-API-KEY-HERE";

  getPosition()
    .then((position) => {
      const { latitude, longitude } = position.coords;

      return fetch(
        `https://geocode.xyz/${latitude},${longitude}?geoit=json&auth=${apiKey}`
      );
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Problem with geocoding (${res.status})`);
      }

      return res.json();
    })
    .then((data) => {
      let { region, country } = data;

      region = region.trim().endsWith(",")
        ? region.trim().slice(0, -1)
        : region;

      console.log(`You are in ${region}, ${country}.`);

      return getCountryAndNeighbor(country);
    })
    .catch((error) => {
      console.error(`💥 Error: ${error.message}`);
    });
};

btn.addEventListener("click", whereAmI);
*/

/*
//-- Coding Challenge #2

const wait = (seconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = (imagePath) => {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");

    img.src = imagePath;

    img.addEventListener("load", () => {
      document.querySelector(".images").append(img);
      resolve(img);
    });

    img.addEventListener("error", () => {
      reject(new Error("Image not found"));
    });
  });
};

let currentImg;

createImage("/img/img-1.jpg")
  .then((img) => {
    currentImg = img;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = "none";
    return createImage("/img/img-2.jpg");
  })
  .then((img) => {
    currentImg = img;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = "none";
  })
  .catch((error) => {
    console.error(error.message);
  });
*/
