"use strict";

const elemModal = document.querySelector(".modal");
const elemOverlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");

for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener("click", openModal);
}

btnCloseModal.addEventListener("click", closeModal);
elemOverlay.addEventListener("click", closeModal);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !elemModal.classList.contains("hidden")) {
    closeModal();
  }
});

function openModal() {
  elemModal.classList.remove("hidden");
  elemOverlay.classList.remove("hidden");
}

function closeModal() {
  elemModal.classList.add("hidden");
  elemOverlay.classList.add("hidden");
}
