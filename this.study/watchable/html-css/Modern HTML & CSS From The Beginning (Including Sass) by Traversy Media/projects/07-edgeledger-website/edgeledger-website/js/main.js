// Transparent navbar toggling

const navbar = document.querySelector("#navbar");
let scrollAtTop = true;

window.addEventListener("scroll", function()
{
  if (window.pageYOffset > 100)
  {
    navbar.classList.remove("top");

    if (scrollAtTop)
    {
      navbar.style.transform = "translateY(-70px)";
      
      setTimeout(function()
      {
        navbar.style.transform = "translateY(0)";
        scrollAtTop = false;
      }, 200);
    }
  }
  else
  {
    navbar.classList.add("top");
    scrollAtTop = true;
  }
});

// Smooth scrolling

$("#navbar a").on("click", function (e)
{
  if (this.hash !== "")
  {
    e.preventDefault();

    const hash = this.hash;

    $("html, body").animate(
      {
        scrollTop: $(hash).offset().top - 100
      },
      800
    );
  }
});