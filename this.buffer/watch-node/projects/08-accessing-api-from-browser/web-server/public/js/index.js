const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const messageOne = document.querySelector(".message-one");
const messageTwo = document.querySelector(".message-two");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  const location = searchInput.value;

  fetch(`/weather?address=${location}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });

  searchInput.value = "";
});
