"use strict";

/*

/-- Testing Prettier

const x = "23";
if (x === 23) {
  console.log(x);
}

const calcAge = (birthYear) => 2037 - birthYear;
*/

/*
//-- Problem: We work for a company building a smart home thermometer. Our most
// recent task is this: "Given an array of temperatures of one day, calculate the
// temperature amplitude. Keep in mind that sometimes there might be a sensor error."

const temperatures = [3, -2, -6, -1, "error", 9, 13, 17, 15, 14, 9, 5];

// 1) Understand the problem:
//   - What is temp amplitude? Answer: Difference between highest and lowest temp.
//   - How to compute max and min temps?
//   - What's a sensor error look like? And what to do?

// 2) Breking up into sub-problems:
//   - How to ignore errors?
//   - Find max value in temp array.
//   - Find min value in temp array.
//   - Subtract min from max (amplitude) and return it.

function calcTempAmplitude(temps) {
  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const currTemp = temps[i];

    if (typeof currTemp !== "number") {
      continue;
    }

    if (currTemp > max) {
      max = currTemp;
    }

    if (currTemp < min) {
      min = currTemp;
    }
  }

  return max - min;
}

//-- Problem 2: Function should now receive 2 arrays of temps.

// 1) Understanding the problem:
//   - With 2 arrays, should we implement functionality twice? NO! Just merge two arrays.

// 2) Breaking up into sub-problems
//   - Merge 2 arrays.

const amplitude = calcTempAmplitude(temperatures);
console.log(amplitude);

function calcTempAmplitudeNew(temps1, temps2) {
  const temps = temps1.concat(temps2);

  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const currTemp = temps[i];

    if (typeof currTemp !== "number") {
      continue;
    }

    if (currTemp > max) {
      max = currTemp;
    }

    if (currTemp < min) {
      min = currTemp;
    }
  }

  return max - min;
}

const amplitudeNew = calcTempAmplitudeNew([3, 5, 1], [9, 0, 5]);
console.log(amplitudeNew);
*/

/*
//-- Debugging with console and breakpoints

function measureKelvin() {
  const measurement = {
    type: "temp",
    unit: "celsius",
    // value: prompt("Degrees celsius:"),
    // C) Fix
    value: Number(prompt("Degrees celsius:"))
  };

  // B) Find
  console.table(measurement);

  // console.log(measurement.value);
  // console.warn(measurement.value);
  // console.error(measurement.value);

  // We can place breakpoints in our source code using devtools "Sources" tab. Alternatively, you can active the debugger by typing:
  // debugger;

  const kelvin = measurement.value + 273;
  return kelvin;
}

// A) Identify
console.log(measureKelvin());
*/
