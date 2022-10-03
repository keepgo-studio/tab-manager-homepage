"use strice";

import { mb1, mb2 } from "./global.js";
import { getSectionsHeight, hexToRgb } from "./utils.js";

export class Navbar {
  _elem;
  _currentElem;
  _hideY = 0;
  _transformY = 0;
  _sectionsOffsetTop = [];
  _coor = [];
  _currentLeft = 0;

  // for mobile style
  _mbBtnElem;
  _mbListElem;
  _mbListInitHeight;
  _ro;
  _mode = "pc";

  borderGap = 10;

  constructor() {
    this._elem = document.getElementById("navbar");

    this._currentElem = document.querySelector("nav .current");

    this._hideY =
      document.querySelector("#home .header-text-container").offsetTop -
      this._elem.offsetHeight;

    this._transformY =
      document.getElementById("home").offsetHeight - this.borderGap;

    this._sectionsOffsetTop = getSectionsHeight();

    [...this._elem.querySelectorAll(".items-list a")].forEach((elem) => {
      this._coor.push(parseInt(elem.offsetLeft + elem.offsetWidth / 2));
    });

    this._currentLeft = 0;

    this._mbBtnElem = this._elem.querySelector(".mb-icon");

    this._mbListElem = this._elem.querySelector(".items-list");

    this._ro = new ResizeObserver((entries) => {
      if (window.innerWidth <= mb1) {
        if (this._mode === "pc") {
          this.initMbStyle();
          // console.log('pc -> mb');
        }
        this._mode = "mb";
      } else {
        if (this._mode === "mb") {
          this._mbBtnElem.classList.remove("clicked");
          this.removeMbStyle();
          // console.log('mb -> pc')
        }
        this._mode = "pc";
      }
    });
    this._ro.observe(this._elem);

    requestAnimationFrame(this.animate.bind(this));
  }

  handleBtnClick(e) {
    const isClicked = e.currentTarget.classList.toggle("clicked");
    if (isClicked) {
      // this._mbListElem.style.transform = "";
      this._mbListElem.style.height = `${this._mbListInitHeight}px`;
    } else {
      // this._mbListElem.style.transform = "translateY(-100%)";
      this._mbListElem.style.height = "0px";
    }
  }
  initMbStyle() {
    this._elem.classList.remove("hide");
    this._elem.classList.remove("nav2");
    this._mbListInitHeight = this._mbListElem.offsetHeight;
    this._mbListElem.style.height = "0px";

    this._mbBtnElem.addEventListener("click", this.handleBtnClick.bind(this), {
      passive: true,
    });
  }
  removeMbStyle() {
    this._mbListElem.style.height = "fit-content";

    this._mbBtnElem.removeEventListener(
      "click",
      this.handleBtnClick.bind(this)
    );
  }

  renderHide() {
    if (this._hideY <= window.scrollY && window.scrollY < this._transformY) {
      this._elem.classList.add("hide");
    } else {
      this._elem.classList.remove("hide");
    }
  }

  renderTransform() {
    if (window.scrollY >= this._transformY) {
      this._elem.classList.add("nav2");
    } else {
      this._elem.classList.remove("nav2");
    }
  }

  renderCurrentElem() {
    this._sectionsOffsetTop.forEach((offsetTop, idx) => {
      offsetTop -= this.borderGap;

      if (idx == 0 && window.scrollY < offsetTop) {
        this._currentLeft = 0;
      } else if (
        idx < this._sectionsOffsetTop.length &&
        offsetTop <= window.scrollY &&
        window.scrollY < this._sectionsOffsetTop[idx + 1]
      ) {
        this._currentLeft = this._coor[idx];
      } else if (offsetTop <= window.scrollY) {
        this._currentLeft = this._coor[idx];
      }
    });

    if (this._currentLeft == 0) {
      this._currentElem.style.display = "none";
    } else {
      this._currentElem.style.display = "block";
      this._currentElem.style.left = `${this._currentLeft}px`;
    }
  }

  animate() {
    if (this._mode === "pc") {
      this.renderHide();
      this.renderTransform();
      this.renderCurrentElem();
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
        <video class="v${i}" width="600" autoplay loop muted >
          <source src="./videos/hero${i + 1}.mp4" />
          <source src="./videos/hero${i + 1}.mp4" />
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

export class KeppgoSection {
  _btn;
  _mode = 'pc';

  constructor() {
    this._btn = document.querySelector("#keepgo .ending .container .card-container .btn-style-xl ");

    
    requestAnimationFrame(this.animate.bind(this));
  }
  
  animate() {
    if (this._mode === 'pc' && window.innerWidth <= mb2) {
      this._btn.classList.add('btn-style-s')
      this._mode = 'mb';
    } else if (window.innerWidth > mb2) {
      this._mode = 'pc';
    }

    requestAnimationFrame(this.animate.bind(this));
  }
}