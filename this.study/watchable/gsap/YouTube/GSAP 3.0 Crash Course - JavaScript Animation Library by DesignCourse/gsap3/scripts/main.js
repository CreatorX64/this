const rule = CSSRulePlugin.getRule(".content__heading-line::after");

//-- Without timelines

/*
gsap.from(".anim1", {
  opacity: 0,
  y: -50,
  duration: 1,
  stagger: 0.6
});

gsap.to(rule, {
  cssRule: {
    scaleY: 0
  },
  duration: 1
});

gsap.from(".aside", {
  opacity: 0,
  backgroundPosition: "200px 0px",
  duration: 1,
  delay: 1.1
});

gsap.from(".aside__image", {
  opacity: 0,
  y: 30,
  duration: 1,
  delay: 1.4
});
*/

//-- With timelines

const timeline = gsap.timeline({ defaults: { duration: 1 } });

timeline
  .from(".anim1", { y: -50, stagger: 0.6, opacity: 0 })
  .to(rule, { duration: 1.8, cssRule: { scaleY: 0 } }, "-=2.2")
  .from(".aside", { backgroundPosition: "200px 0px", opacity: 0 }, "-=1.5")
  .from(".aside__image", { y: 50, opacity: 0 }, "-=0.5");

document.querySelector(".content__link").addEventListener("click", () => {
  timeline.reversed() ? timeline.play() : timeline.reverse();
});
