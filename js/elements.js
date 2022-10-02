"use strice";

import { getSectionsHeight, hexToRgb } from "./utils.js";

export class Navbar {
  _elem;
  _hideY = 0;
  _transformY = 0;
  _sectionsOffsetTop = [];
  _coor = [];

  currentElem;
  currentLeft = 0;

  borderGap = 10;

  constructor() {
    this._elem = document.getElementById("navbar");
    this.currentElem = document.querySelector("nav .current");

    this._hideY =
      document.querySelector(".header-text-container").offsetTop -
      this._elem.offsetHeight;
    this._transformY =
      document.getElementById("home").offsetHeight - this.borderGap;

    this._sectionsOffsetTop = getSectionsHeight();

    [...this._elem.querySelector(".items-list").children].forEach((elem) => {
      this._coor.push(parseInt(elem.offsetLeft + elem.offsetWidth / 2));
    });
    this.currentLeft = 0;

    requestAnimationFrame(this.animate.bind(this));
  }

  init() {}

  animate() {
    if (this._hideY <= window.scrollY && window.scrollY < this._transformY) {
      this._elem.classList.add("hide");
    } else {
      this._elem.classList.remove("hide");
    }

    if (window.scrollY >= this._transformY) {
      this._elem.classList.add("nav2");
    } else {
      this._elem.classList.remove("nav2");
    }

    this._sectionsOffsetTop.forEach((offsetTop, idx) => {
      offsetTop -= this.borderGap;

      if (idx == 0 && window.scrollY < offsetTop) {
        this.currentLeft = 0;
      } else if (
        idx < this._sectionsOffsetTop.length &&
        offsetTop <= window.scrollY &&
        window.scrollY < this._sectionsOffsetTop[idx + 1]
      ) {
        this.currentLeft = this._coor[idx];
      } else if (offsetTop <= window.scrollY) {
        this.currentLeft = this._coor[idx];
      }
    });

    if (this.currentLeft == 0) {
      this.currentElem.style.display = "none";
    } else {
      this.currentElem.style.display = "block";
      this.currentElem.style.left = `${this.currentLeft}px`;
    }

    requestAnimationFrame(this.animate.bind(this));
  }
}

export class AboutSection {
  _mainContainerElem;
  _observeConditions = [];

  constructor() {
    this._mainContainerElem = document.querySelector("#about .main-container");

    this.initMainContainer();

    requestAnimationFrame(this.animate.bind(this));
  }

  initMainContainer() {
    let selectIdx = 0;
    let prevIdx = 0;
    const selectTitle = [
      "Saving<br />memory",
      "Powerful<br />searching",
      "Easy<br />managing",
    ];
    const selectColor = ["#4299FF", "#3DB439", "#894AAE"];
    const selectDescription = [
      "By saving tabs that aren't used right now, you can lower memory usage and increase the speed of your computer",
      "Unlike chrome embedded tab searching, tab manager find tabs by searching the whole text content of each tab",
      "You can manager your tabs more concisely and comfortably by readable dashboard",
    ];

    const menu = this._mainContainerElem.querySelector(".features-container");

    [...menu.children].forEach((li, index) => {
      li.addEventListener(
        "click",
        (e) => {
          prevIdx = selectIdx;
          selectIdx = index;
        },
        {
          passive: true,
        }
      );
    });

    let isOnViewport = false;
    const video = this._mainContainerElem.querySelector(
      "#about .video-container"
    );

    for (let i = 0; i < 3; i++) {
      const rgb = hexToRgb(selectColor[i]);

      video.innerHTML += `
        <video class="v${i}" width="600" autoplay loop muted>
          <source src="./videos/hero${i + 1}.mp4" />
        </video>

        <div class="text-container v${i}">
          <h1 style="color: ${selectColor[i]}">
            ${selectTitle[i]}
          </h1>
          <p>
            ${selectDescription[i]}
          </p>
          <div class="circle"
          style="background: linear-gradient(
            226.64deg,
            rgb(${rgb.red}, ${rgb.green}, ${rgb.blue}) 13.13%,
            rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, 0.611012) 34.38%,
            rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, 0) 67.76%
          );"
          ></div>
        </div>
      `;
    }

    const update = () => {
      // render menu elem
      [...menu.children].forEach((li, index) => {
        if (index === selectIdx) {
          li.classList.add("about-selected");
        } else {
          li.classList.remove("about-selected");
        }
      });

      // render video elem
      [...video.children].forEach((e) => {
        if (e.classList.contains(`v${selectIdx}`)) {
          e.setAttribute("manualFadeIn", "show");

          if (isOnViewport && e.tagName === "VIDEO") {
            e.play();
          }
        } else {
          e.setAttribute("manualFadeIn", "");

          if (e.tagName === "VIDEO") {
            e.pause();
            e.currentTime = 0;
          }
        }
      });
    };

    const videoIo = new IntersectionObserver(
      (entries, _) => {
        entries.forEach((entry) => {
          /**
           * to prevent play() pause() error
           */
          if (!entry.isIntersecting) {
            isOnViewport = false;
            entry.target.pause();
          } else if (
            entry.isIntersecting &&
            entry.target.getAttribute("manualFadeIn") === "show"
          ) {
            isOnViewport = true;
            entry.target.play();
          }
        });
      },
      { threshold: 0.4 }
    );

    video.querySelectorAll("video").forEach((v) => videoIo.observe(v));

    update();

    this._observeConditions.push({
      occurCondition: () => {
        const bool = prevIdx != selectIdx;
        prevIdx = selectIdx;

        return bool;
      },
      callback: update,
    });
  }

  animate() {
    this._observeConditions.forEach(({ occurCondition, callback }) => {
      if (occurCondition()) callback();
    });

    requestAnimationFrame(this.animate.bind(this));
  }
}
