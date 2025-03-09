"use strict";
const navList = document.querySelector(".nav-list");
const navButton = document.querySelector(".nav-button");
const layout = document.querySelector(".layout");
const navlink = document.querySelectorAll(".nav-link");
const aboutPage = document.querySelector(".about-page");
const textBox = document.querySelector(".text-box-top");
const leftSectionImage = document.querySelectorAll(".left-section-img");
const navTab = document.querySelectorAll(".nav--tab");

const tourContent1 = document.querySelector(".tour-content1");
const tourContent2 = document.querySelector(".tour-content2");
const createAccPage = document.querySelector(".create-acc-page");
const offerTitle = document.querySelector(".offer-title");
const slides = document.querySelectorAll(".comments");
const commentsSliding = document.querySelector(".comments-sliding");
const previousBtn = document.querySelector(".previous");
const nextBtn = document.querySelector(".next");
const textBoxBot = document.querySelectorAll(".text-box-bot");
const textBoxTop = document.querySelector(".text-box-top");
const leftSecImg = document.querySelectorAll(".left-section-img");
const receiveTitle = document.querySelector(".receive-title");

// Functions___________________________________________________________________________
const removeClass = function (target, className) {
  //remove class by classlist
  target.classList.remove(className);
};
const addClass = function (target, className) {
  // add class by classlist
  target.classList.add(className);
};
const toggleClass = function (target, className) {
  target.classList.toggle(className);
};
const toggleNavFunc = function () {
  // toggle class by classlist
  toggleClass(navList, "hide");
  toggleClass(layout, "hide");
  toggleClass(navButton, "button-opacity");
};
//Does not show nav button if it leaves outside the home page
const windowButton = function () {
  if (this.window.scrollY > 50) {
    addClass(navButton, "button-opacity");
    addClass(aboutPage, "fade-in-overlap");
  } else {
    removeClass(navButton, "button-opacity");
    removeClass(aboutPage, "fade-in-overlap");
  }
};

// Function to handle hover effects with opacity
const handleOver = function (e) {
  if (e.target.classList.contains("nav--tab")) {
    const link = e.target;
    const siblings = link
      .closest(".text-box-top")
      .querySelectorAll(".nav--tab");

    // Changes the textbox according to the tab
    textBoxBot.forEach((c) => {
      if (c.dataset.content === link.dataset.tab) {
        addClass(c, "text-bot-opacity");
      } else {
        removeClass(c, "text-bot-opacity");
      }
    });
    // Changes the image according to the tab
    leftSecImg.forEach((img) => {
      if (img.dataset.img === link.dataset.tab) {
        addClass(img, "text-bot-opacity");
      } else {
        removeClass(img, "text-bot-opacity");
      }
    });

    // Set opacity for sibling tabs
    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
  }
};
const initHandleOver = function () {
  const initValue = 1;
  document
    .querySelector(`.text-box-bot[data-content="${initValue}"]`)
    .classList.add("text-bot-opacity");
  document
    .querySelector(`.left-section-img[data-img="${initValue}"]`)
    .classList.add("text-bot-opacity");
};
initHandleOver(); //inital view of elements un about page

// Sliding part functions
let currSlide = 0;
const maxSlide = slides.length - 1;
const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
const nextSlide = function () {
  // will go to the next slide
  if (currSlide === maxSlide) {
    currSlide = 0;
  } else {
    currSlide++;
  }
  goToSlide(currSlide);
};

const prevSlide = function () {
  // will go to the previous slide
  if (currSlide === 0) {
    currSlide = maxSlide;
  } else {
    currSlide--;
  }
  goToSlide(currSlide);
};

const init = function () {
  goToSlide(0); //initialize to the first slide
};
init();

// Select sections to oobserve
const reveal = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("hide-below")
  addClass(entry.target, "span-up-effect");
  observer.unobserve(entry.target);
};
const elementObserver = new IntersectionObserver(reveal, {
  root: null,
  threshold: 0.02,
});
const observerFunc = function (el) {
  elementObserver.observe(el);
  el.classList.add("hide-below");
};

// Event listeners___________________________________________________________________________
// Scroll fade the nav button
window.addEventListener("scroll", windowButton);

// Shhows list when you hover the button nav
navButton.addEventListener("click", toggleNavFunc);
navlink.forEach((link) => {
  link.addEventListener("click", toggleNavFunc);
});

// set opacity values for hover
textBox.addEventListener("mouseover", handleOver.bind(0.1));
textBox.addEventListener("mouseout", handleOver.bind(1));

// Reveal elemenmts when scrolled
observerFunc(offerTitle);
observerFunc(tourContent1);
observerFunc(tourContent2);
observerFunc(receiveTitle);
observerFunc(commentsSliding);

// For the sliding operation
nextBtn.addEventListener("click", nextSlide);
previousBtn.addEventListener("click", prevSlide);
