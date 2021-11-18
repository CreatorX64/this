(() => {
  const formSignUp = document.querySelector(".signup__form");
  const elemStepOne = document.querySelector(".signup__step-1");
  const elemStepTwo = document.querySelector(".signup__step-2");
  const inlineInputs = document.querySelectorAll(".signup__inline-input");
  const progressItems = document.querySelectorAll(".signup__progress-item");

  formSignUp.addEventListener("submit", (event) => {
    event.preventDefault();
    elemStepOne.classList.add("hidden");
    elemStepTwo.classList.remove("hidden");
    progressItems.forEach((item) =>
      item.classList.toggle("signup__progress-item--active")
    );
  });

  inlineInputs.forEach((inlineInput, index) => {
    if (index < inlineInputs.length - 1) {
      inlineInput.addEventListener("keyup", (event) => {
        if (event.key.match(/^[0-9a-zA-Z]$/)) {
          inlineInputs[index + 1].focus();
        }
      });
    }
  });
})();
