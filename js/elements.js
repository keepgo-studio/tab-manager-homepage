import { getSectionsHeight } from "./utils.js";

export class Navbar {
  _element;
  _hideY = 0;
  _transformY = 0;
  _sectionsOffsetTop = [];
  _coor = [];

  currentElem;
  currentLeft = 0;

  borderGap = 5;

  constructor() {
    this._element = document.getElementById("navbar");
    this.currentElem = document.querySelector("nav .current");

    this._hideY =
      document.querySelector(".header-text-container").offsetTop -
      this._element.offsetHeight;
    this._transformY = document.getElementById("home").offsetHeight - this.borderGap;

    this._sectionsOffsetTop = getSectionsHeight();

    [...this._element.querySelector(".items-list").children].forEach((elem) => {
      this._coor.push(parseInt(elem.offsetLeft + elem.offsetWidth / 2));
    });
    this.currentLeft = 0;

    requestAnimationFrame(this.animate.bind(this));
  }

  init() {}

  animate() {
    if (this._hideY <= window.scrollY && window.scrollY < this._transformY) {
      this._element.classList.add("hide");
    } else {
      this._element.classList.remove("hide");
    }

    if (window.scrollY >= this._transformY) {
      this._element.classList.add("nav2");
    } else {
      this._element.classList.remove("nav2");
    }

    this._sectionsOffsetTop.forEach((offsetTop, idx) => {
      offsetTop -= this.borderGap;
      if (idx == 0 && window.scrollY < offsetTop) {
        this.currentLeft = 0
      }
      else if (
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
      this.currentElem.style.display = 'none';
    } else {
      this.currentElem.style.display = 'block';
      this.currentElem.style.left = `${this.currentLeft}px`;
    }

    requestAnimationFrame(this.animate.bind(this));
  }
}

class AboutSection {

}