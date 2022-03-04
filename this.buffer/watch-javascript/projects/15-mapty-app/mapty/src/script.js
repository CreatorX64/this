"use strict";

const containerWorkouts = document.querySelector(".workouts");
const form = document.querySelector(".form");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

class Workout {
  id = Date.now().toString().slice(-10) + Math.random().toString();
  date = new Date();

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // km
    this.duration = duration; // min
  }

  _setDescription() {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

class Running extends Workout {
  type = "running";

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    // pace = min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = "cycling";

  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    // speed = km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

class App {
  #map;
  #mapEvent;
  #workouts = [];

  constructor() {
    this._getPosition();
    form.addEventListener("submit", this._newWorkout.bind(this));
    inputType.addEventListener("change", this._toggleElevationField);
  }

  _getPosition() {
    // Geolocation API might not be available in older browsers.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), () => {
        alert("Could not get your position");
      });
    }
  }

  _loadMap(position) {
    const { latitude, longitude } = position.coords;

    this.#map = L.map("map").setView([latitude, longitude], 13);

    // The map is made up of small tiles, and those tiles come from the URL
    // we pass into L.tileLayer(), which is Open Street Map. Leaflet works
    // with other kinds of maps as well, like Google Maps.
    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.#map);

    // Handle clicks on map.
    this.#map.on("click", this._showForm.bind(this));
  }

  _showForm(event) {
    this.#mapEvent = event;
    form.classList.remove("hidden");
    inputDistance.focus();
  }

  _hideForm() {
    inputDistance.value = "";
    inputDuration.value = "";
    inputCadence.value = "";
    inputElevation.value = "";

    form.style.display = "none";
    form.classList.add("hidden");
    setTimeout(() => {
      form.style.display = "grid";
    }, 1000);
  }

  _toggleElevationField() {
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  }

  _newWorkout(event) {
    event.preventDefault();

    const validInputs = (...inputs) => {
      return inputs.every((input) => Number.isFinite(input));
    };
    const allPositive = (...inputs) => {
      return inputs.every((input) => input > 0);
    };

    const { lat, lng } = this.#mapEvent.latlng;

    // Get data from the form.
    const type = inputType.value;
    const distance = Number(inputDistance.value);
    const duration = Number(inputDuration.value);

    let workout;

    // If workout is running, create Running object.
    if (type === "running") {
      const cadence = Number(inputCadence.value);

      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      ) {
        return alert("Inputs have to be positive numbers!");
      }

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If workout is cycling, create Cycling object.
    if (type === "cycling") {
      const elevation = Number(inputElevation.value);

      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      ) {
        return alert("Inputs have to be positive numbers!");
      }

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object to workouts array.
    this.#workouts.push(workout);

    // Render workout on map as a marker.
    this._renderWorkoutMarker(workout);

    // Render workout on workouts list.
    this._renderWorkout(workout);

    // Hide form & clear input fields.
    this._hideForm();
  }

  _renderWorkoutMarker(workout) {
    const { coords, type, description } = workout;

    L.marker(coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${type}-popup`
        })
      )
      .setPopupContent(`${type === "running" ? "🏃‍♂️" : "🚴‍♀️"} ${description}`)
      .openPopup();
  }

  _renderWorkout(workout) {
    const { id, type, description, distance, duration } = workout;

    let html = `
      <li class="workout workout--${type}" data-id="${id}">
        <h2 class="workout__title">${description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${type === "running" ? "🏃‍♂️" : "🚴‍♀️"}</span>
          <span class="workout__value">${distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${duration}</span>
          <span class="workout__unit">min</span>
        </div>
    `;

    if (type === "running") {
      html += `
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>
      `;
    }

    if (type === "cycling") {
      html += `
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>
      `;
    }

    form.insertAdjacentHTML("afterend", html);
  }
}

const app = new App();
