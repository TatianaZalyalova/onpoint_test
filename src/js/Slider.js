export class Slider {
  slideIndex = 0;
  posInit = 0;
  posX1 = 0;
  posX2 = 0;
  posY1 = 0;
  posY2 = 0;
  posFinal = 0;
  isSwipe = false;
  isScroll = false;
  allowSwipe = true;
  transition = true;
  nextTrf = 0;
  prevTrf = 0;
  trfRegExp = /([-0-9.]+(?=px))/;
  swipeStartTime;
  swipeEndTime;
  constructor(slider, showArrows) {
    this.slider = slider;
    this.sliderTrack = slider.querySelector(".slider__track");
    this.sliderList = slider.querySelector(".slider__list");
    this.slides = this.sliderTrack.childNodes;
    if (showArrows) {
      this.arrows = slider.querySelector(".slider__arrows");
      this.prev = this.arrows.children[0];
      this.next = this.arrows.children[this.arrows.children.length - 1];
      this.dots = slider.querySelectorAll(".slider__dot");
      this.showArrows = true;
      this.slider
        .querySelector('.slider__dot[data-dot="' + this.slideIndex + '"]')
        .classList.add("slider__dot_active");
    }

    this.lastTrf = this.slides.length * this.slideWidth;
    this.posThreshold = this.slides[0].offsetWidth * 0.35;
    this.slideWidth = this.slides[0].offsetWidth;
  }

  slide = function () {
    this.slideWidth = this.slides[0].offsetWidth;
    this.sliderTrack.style.transition = "transform .5s";
    this.sliderTrack.style.transform = `translate3d(-${
      this.slideIndex * this.slideWidth
    }px, 0px, 0px)`;
    if (this.posInit > this.posX1) {
      this.sliderTrack
        .querySelector('.slide[data-slide="' + this.slideIndex + '"]')
        .classList.add("visual");
    }

    if (this.showArrows) {
      this.prev.classList.toggle("disabled", this.slideIndex === 0);
      this.next.classList.toggle(
        "disabled",
        this.slideIndex === this.slides.length - 1
      );
      this.dots.forEach((dot) => {
        dot.classList.remove("slider__dot_active");
      });
      const dotActive = this.slider.querySelector(
        '.slider__dot[data-dot="' + this.slideIndex + '"]'
      );

      dotActive.classList.add("slider__dot_active");
    }
  };
  getEvent() {
    return event.type.search("touch") !== -1 ? event.touches[0] : event;
  }

  swipeStart = () => {
    const evt = this.getEvent();

    if (this.allowSwipe) {
      this.swipeStartTime = Date.now();

      this.transition = true;

      this.nextTrf = (this.slideIndex + 1) * this.slideWidth;

      this.prevTrf = (this.slideIndex - 1) * this.slideWidth;

      this.posInit = this.posX1 = evt.clientX;
      this.posY1 = evt.clientY;

      this.sliderTrack.style.transition = "";

      document.addEventListener("touchmove", this.swipeAction);
      document.addEventListener("mousemove", this.swipeAction);
      document.addEventListener("touchend", this.swipeEnd);
      document.addEventListener("mouseup", this.swipeEnd);

      this.sliderList.classList.remove("grab");
      this.sliderList.classList.add("grabbing");
    }
  };

  swipeAction = () => {
    const evt = this.getEvent();
    const style = this.sliderTrack.style.transform;
    const transform = +style.match(this.trfRegExp)[0];

    this.posX2 = this.posX1 - evt.clientX;
    this.posX1 = evt.clientX;

    this.posY2 = this.posY1 - evt.clientY;
    this.posY1 = evt.clientY;

    if (!this.isSwipe && !this.isScroll) {
      const posY = Math.abs(this.posY2);
      if (posY > 7 || this.posX2 === 0) {
        this.isScroll = true;
        this.allowSwipe = false;
      } else if (posY < 7) {
        this.isSwipe = true;
      }
    }

    if (this.isSwipe) {
      if (this.slideIndex === 0) {
        if (this.posInit < this.posX1) {
          this.setTransform(transform, 0);
          return;
        } else {
          this.allowSwipe = true;
        }
      }

      if (this.slideIndex === this.slides.length - 1) {
        if (this.posInit > this.posX1) {
          this.setTransform(transform, this.lastTrf);
          return;
        } else {
          this.allowSwipe = true;
        }
      }

      if (
        (this.posInit > this.posX1 && transform < this.nextTrf) ||
        (this.posInit < this.posX1 && transform > this.prevTrf)
      ) {
        this.reachEdge();
        return;
      }

      this.sliderTrack.style.transform = `translate3d(${
        this.transform - this.posX2
      }px, 0px, 0px)`;

      if (this.posInit > this.posX1) {
        const nextSlide = this.sliderTrack.querySelector(
          '.slide[data-slide="' + this.slideIndex + 1 + '"]'
        );
        nextSlide.classList.add("visual");
      }
    }
  };
  swipeEnd = () => {
    this.posFinal = this.posInit - this.posX1;

    this.isScroll = false;
    this.isSwipe = false;

    document.removeEventListener("touchmove", this.swipeAction);
    document.removeEventListener("mousemove", this.swipeAction);
    document.removeEventListener("touchend", this.swipeEnd);
    document.removeEventListener("mouseup", this.swipeEnd);

    this.sliderList.classList.add("grab");
    this.sliderList.classList.remove("grabbing");

    if (this.allowSwipe) {
      this.swipeEndTime = Date.now();
      if (
        Math.abs(this.posFinal) > this.posThreshold ||
        this.swipeEndTime - this.swipeStartTime < 300
      ) {
        if (this.posInit < this.posX1) {
          this.slideIndex--;
          if (this.slideIndex === 0) {
            this.slides.forEach(function (item) {
              item.classList.remove("visual");
            });
          }
        } else if (this.posInit > this.posX1) {
          this.slideIndex++;
        }
      }

      if (this.posInit !== this.posX1) {
        this.allowSwipe = false;
        this.slide();
      } else {
        this.allowSwipe = true;
      }
    } else {
      this.allowSwipe = true;
    }
  };
  setTransform = (transform, comapreTransform) => {
    if (transform >= comapreTransform) {
      if (transform > comapreTransform) {
        this.sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
      }
    }
    this.allowSwipe = false;
  };
  reachEdge = () => {
    this.transition = false;
    this.swipeEnd();
    this.allowSwipe = true;
  };
}
