const button = document.querySelector("button");
const input1 = document.querySelector(".num1");
const input2 = document.querySelector(".num2");

function add(num1, num2) {
  if (typeof num1 === "number" && typeof num2 === "number") {
    return num1 + num2;
  } else {
    return Number(num1) + Number(num2);
  }
}

button.addEventListener("click", () => {
  console.log(add(input1.value, input2.value));
});
