import "../css/style.scss";
import "../img/home.png";
import { Slider } from "./Slider.js";
import "./scroll.js";

const slider = document.querySelector(".slider");
const sliderPage = new Slider(slider, false);
const sliderPopup = document.querySelector(".popup .slider");
const sliderInPopup = new Slider(sliderPopup, true);
const about = document.querySelector(".about");
const popupClose = document.querySelector(".about .popup .popup__close");
const popupShowButton = about.querySelector(".about__detailed");
const homeButton = document.querySelector(".header .header__logo");
const nextSlideButtiotn = document.querySelector(".home .home__next");

sliderPage.sliderTrack.style.transform = "translate3d(0px, 0px, 0px)";
sliderPage.sliderList.classList.add("grab");
sliderPage.sliderTrack.addEventListener("transitionend", () => {
  sliderPage.allowSwipe = true;
});
sliderPage.slider.addEventListener("touchstart", sliderPage.swipeStart);
sliderPage.slider.addEventListener("mousedown", sliderPage.swipeStart);

sliderInPopup.arrows.addEventListener("click", function () {
  const target = event.target;
  if (target.classList.contains("slider__next")) {
    sliderInPopup.slideIndex++;
  } else if (target.classList.contains("slider__prev")) {
    sliderInPopup.slideIndex--;
  } else {
    return;
  }
  sliderInPopup.slide();
});

popupClose.addEventListener("click", () => {
  about.classList.toggle("popup_show");
});

popupShowButton.addEventListener("click", () => {
  about.classList.toggle("popup_show");
});

homeButton.addEventListener("click", () => {
  sliderPage.slideIndex = 0;
  sliderPage.sliderTrack.style.transition = "transform .5s";
  sliderPage.sliderTrack.style.transform = "translate3d(0px, 0px, 0px)";
});

nextSlideButtiotn.addEventListener("click", () => {
  sliderPage.slideIndex++;
  sliderPage.slide();
});
