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
  countriesContainer.style.opacity = 1;
};

const renderError = (msg) => {
  countriesContainer.insertAdjacentText("beforeend", msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = (url, errorMsg = "Something went wrong") => {
  return fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(`${errorMsg} (${res.status})`);
    }
    return res.json();
  });
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

// Using the getJSON utility function to reduce duplication in the function
// below, in contrast to the one above.
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

/*
//-- Consuming Promises with async/await

// async/await is all about consuming Promises in a different way, so they're
// syntactic sugar. They way we build Promises doesn't change, only the way
// we consume them changes when we use async/await.
const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async () => {
  try {
    // Get user's position in lat & lng.
    const position = await getPosition();
    const { latitude, longitude } = position.coords;

    // Reverse geocode using lat & lng to get user's country.
    const apiKey = "PASTE-YOUR-API-KEY-HERE";
    const resGeocode = await fetch(
      `https://geocode.xyz/${latitude},${longitude}?geoit=json&auth=${apiKey}`
    );
    if (!resGeocode.ok) {
      throw new Error("Problem getting location data");
    }
    const dataGeocode = await resGeocode.json();

    // Get country data.
    const resCountry = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeocode.country}`
    );
    if (!resCountry.ok) {
      throw new Error("Problem getting country data");
    }
    const [countryInfo] = await resCountry.json();

    // Render country.
    renderCountry(countryInfo);

    return `You are in ${dataGeocode.region}, ${dataGeocode.country}`;
  } catch (error) {
    console.error(`💥 ${error}`);
    renderError(`💥 ${error.message}`);

    // Throw the error again so that the caller of this function can handle it
    // as well. If we don't throw this error, the caller of the function will
    // receive a fulfilled Promise even though there are errors in the function.
    // Alternatively, we can remove the try...catch from this function completely
    // and leave the error handling to the caller.
    throw error;
  }
};

console.log("1: Will get location");

// whereAmI()
//   .then((city) => console.log(`2: ${city}`))
//   .catch((error) => console.error(`2: ${error.message} 💥`))
//   .finally(() => console.log("3: Finished getting location"));

(async () => {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (error) {
    console.error(`2: ${error.message} 💥`);
  } finally {
    console.log("3: Finished getting location");
  }
})();
*/

/*
//-- Running Promises in parallel using Promise.all "combinator". It's called
// a "combinator" function because it allows us to combine multiple Promises.

const getThreeCountries = async (c1, c2, c3) => {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
    // console.log([data1.capital[0], data2.capital[0], data3.capital[0]]);

    // If one of the Promises reject, the whole Promise.all rejects. So make
    // sure to handle errors in the real world usage of this.
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`)
    ]);
    console.log(data.map((d) => d[0].capital[0]));
  } catch (error) {
    console.error(error);
  }
};

getThreeCountries("portugal", "canada", "tanzania");
*/

/*
//-- Other Promise combinator: race, allSettled, any.

// Promise.race(): The settled value of the whole Promise is the settled
// value of the first Promise that fulfills or rejects.
(async () => {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/italy`),
    getJSON(`https://restcountries.com/v3.1/name/egypt`),
    getJSON(`https://restcountries.com/v3.1/name/mexico`)
  ]);
  console.log(res[0].name.common);
})();

// We can use Promise.race to have a request timeout effect for
// network requests that take too long.

const timeout = (seconds) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Request took too long"));
    }, seconds * 1000);
  });
};

(async () => {
  try {
    const res = await Promise.race([
      getJSON(`https://restcountries.com/v3.1/name/tanzania`),
      timeout(2)
    ]);
    console.log(res[0]);
  } catch (error) {
    console.error(error);
  }
})();

// Promise.allSettled(): Added in ES2020. Takes an array of Promises, returns
// array of all settled Promises no matter if Promises got rejected or not. The
// difference from Promise.all() is that Promise.allSettled() will not
// short-circuit as soon as a Promise rejects and it will simply return all the
// results of all the Promises.
Promise.allSettled([
  Promise.resolve("success"),
  Promise.reject("error"),
  Promise.resolve("success")
])
  .then((res) => console.log(res))
  .catch((error) => console.error(error));

// Promise.any(): Added in ES2021. Returns the first fulfilled value from an
// array of Promises. The difference from Promise.race() is that the rejected
// values in Promise.any() are ignored. Tje result of Promise.any() is going
// to be a fulfilled Promise if at least 1 Promise in the passed array fulfills.
// If all of them rejects, Promise.any() rejects.
Promise.any([
  Promise.reject("error"),
  Promise.resolve("success 1"),
  Promise.resolve("success 2")
])
  .then((res) => console.log(`Promise.any(): ${res}`))
  .catch((error) => console.error(`Promise.any(): ${error}`));
*/

/*
//-- Coding challenge #3

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

// Part 1: Convert challenge #2 to use async/await.
// const loadAndPause = async () => {
//   try {
//     // Load image 1
//     let img = await createImage("/img/img-1.jpg");
//     console.log("Image 1 loaded");
//     await wait(2);
//     img.style.display = "none";

//     // Load image 2
//     img = await createImage("/img/img-2.jpg");
//     console.log("Image 2 loaded");
//     await wait(2);
//     img.style.display = "none";
//   } catch (error) {
//     console.error(error);
//   }
// };
// loadAndPause();

// Part 2: Create an async function to load images in parallel.
// const loadAll = async (imgPaths) => {
//   try {
//     const imgs = await Promise.all(
//       imgPaths.map((imgPath) => createImage(imgPath))
//     );
//     imgs.forEach((img) => img.classList.add("parallel"));
//   } catch (error) {
//     console.error(error);
//   }
// };
// loadAll(["/img/img-1.jpg", "/img/img-2.jpg", "/img/img-3.jpg"]);
*/
