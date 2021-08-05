init();

function init()
{
  const slideDots = document.querySelectorAll(".slide");
  const pages = document.querySelectorAll(".page");
  const backgrounds =
  [
    `radial-gradient(#2B3760, #0B1023)`,
    `radial-gradient(#4E3022, #161616)`,
    `radial-gradient(#4E4342, #161616)`
  ];

  let currentPageIndex = 0;
  let scrollIndex = 0;

  slideDots.forEach((slideDot, index) =>
  {
    slideDot.addEventListener("click", function()
    {
      changeToDot(this);
      showPage(index);
    });
  });

  // Change the page on scroll (and on touch in mobile). We can add both of them
  // without checking the platform because you can't scroll in mobile and you
  // can't touch in desktop. Even if you could, it wouldn't change the behavior.
  // Also, we use "wheel" instead of "scroll" because our page is 100vh so the
  // user cannot scroll, but they can turn the mouse wheel regardless.
  document.addEventListener("wheel", throttle(scrollChange, 1500));
  document.addEventListener("touchmove", throttle(scrollChange, 1500));

  // Configure the dropdown menu.
  
  const hamburgerIcon = document.querySelector(".menu");
  const hamburgerLines = document.querySelectorAll(".menu line");
  const navigationMenu = document.querySelector(".nav-open");
  const contactInfo = document.querySelector(".contact");
  const socialInfo = document.querySelector(".social");
  const logo = document.querySelector(".logo");

  const tl = new TimelineMax({paused: true, reversed: true});

  tl
    .to(navigationMenu, 0.5, {y: 0})
    .fromTo(contactInfo, 0.5, {opacity: 0, y: 10}, {opacity: 1, y: 0}, "-=0.1")
    .fromTo(socialInfo, 0.5, {opacity: 0, y: 10}, {opacity: 1, y: 0}, "-=0.5")
    .fromTo(logo, 0.2, {color: "white"}, {color: "black"}, "-=1")
    .fromTo(hamburgerLines, 0.2, {stroke: "white"}, {stroke: "black"}, "-=1");

  hamburgerIcon.addEventListener("click", () =>
  {
    tl.reversed() ? tl.play() : tl.reverse();
  });

  function changeToDot(selectedDot)
  {
    slideDots.forEach(slideDot =>
    {
      slideDot.classList.remove("active");
    });

    selectedDot.classList.add("active");
  }

  function changeToDotByIndex(dotIndex)
  {
    const nextDot = document.querySelectorAll(".slide")[dotIndex];

    slideDots.forEach(slideDot =>
    {
      slideDot.classList.remove("active");
    });

    nextDot.classList.add("active");
  }

  function showPage(pageIndex)
  {
    if (pageIndex === currentPageIndex)
    {
      return;
    }

    const portfolio = document.querySelector(".portfolio");
    const currentPage = pages[currentPageIndex];
    const currentLeftPicture = currentPage.querySelector(".hero .photo-left");
    const currentRightPicture = currentPage.querySelector(".hero .photo-right");
    const nextPage = pages[pageIndex];
    const nextLeftImage = nextPage.querySelector(".hero .photo-left");
    const nextRightImage = nextPage.querySelector(".hero .photo-right");
    const nextText = nextPage.querySelector(".details");
    
    const timeline = new TimelineMax({
      onStart: function()
      {
        slideDots.forEach(slideDot =>
        {
          slideDot.style.pointerEvents = "none";
        })
      },
      onComplete: function()
      {
        slideDots.forEach(slideDot =>
        {
          slideDot.style.pointerEvents = "all";
        })
      }
    });
  
    timeline
      .fromTo(currentLeftPicture, 0.3, {y: "-10%"}, {y: "-100%"})
      .fromTo(currentRightPicture, 0.3, {y: "10%"}, {y: "-100%"}, "-=0.2")
      .to(portfolio, 0.3, {backgroundImage: backgrounds[pageIndex]})
      .fromTo(currentPage, 0.3, {opacity: 1, pointerEvents: "all"}, {opacity: 0, pointerEvents: "none"})
      .fromTo(nextPage, 0.3, {opacity: 0, pointerEvents: "none"}, {opacity: 1, pointerEvents: "all"}, "-=0.6")
      .fromTo(nextLeftImage, 0.3, {y: "-100%"}, {y: "-10%"}, "-=0.6")
      .fromTo(nextRightImage, 0.3, {y: "-100%"}, {y: "10%"}, "-=0.8")
      .fromTo(nextText, 0.3, {opacity: 0, y: 0}, {opacity: 1, y: 0})
      .set(nextLeftImage, {clearProps: "all"})
      .set(nextRightImage, {clearProps: "all"});

    currentPageIndex = pageIndex;
    scrollIndex = pageIndex;
  }

  function scrollChange(wheelEvent)
  {
    if (wheelEvent.deltaY > 0)
    {
      scrollIndex += 1;
    }
    else
    {
      scrollIndex -= 1;
    }

    if (scrollIndex > 2)
    {
      scrollIndex = 0;
    }

    if (scrollIndex < 0)
    {
      scrollIndex = 2;
    }

    changeToDotByIndex(scrollIndex);
    showPage(scrollIndex);
  }

  function throttle(func, limit)
  {
    let inThrottle = false;

    return function()
    {
      const args = arguments;
      const context = this;

      if (!inThrottle)
      {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }
}