let hamburgerBtn = document.querySelector(".btn") as HTMLElement;
let sidebar = document.querySelector(".sidebar") as HTMLDivElement;
let searchBtn = document.querySelector(".bx-search") as HTMLElement;

hamburgerBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

searchBtn.addEventListener("click", () => {
  if (!sidebar.classList.contains("active")) {
    sidebar.classList.add("active");
  }
});
