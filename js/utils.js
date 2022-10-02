export function fitScroll(
  callback,
  dismissCondition = () => false,
  triggerCondition = () => true
) {
  if (!callback) {
    throw Error("Callback function should be valid");
  }
  let tick = false;

  return () => {
    if (tick) return;

    tick = true;

    return requestAnimationFrame(() => {
      if (dismissCondition()) {
        tick = false;
        return;
      }

      if (triggerCondition()) {
        tick = false;
        callback();
        return;
      }
    });
  };
}

export function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        red: parseInt(result[1], 16),
        green: parseInt(result[2], 16),
        blue: parseInt(result[3], 16),
      }
    : null;
}
export function getSectionsHeight() {
  const sectionIds = ["about", "features", "cost", "keepgo"];

  const sectionsOffsetTop = sectionIds.map(
    (id) => document.getElementById(id).offsetTop
  );

  return sectionsOffsetTop;
}


export class FadeSetting {
  constructor(
    { fiTransitionFunction, fiTrasnitionDurationMs, fiTrasnitionDistance },
    { fioTransitionFunction, fioTrasnitionDurationMs, fioTrasnitionDistance }
  ) {
    const s = document.createElement("style");
    s.innerHTML = `
    [fadeIn] {
      transition-timing-function: ${fiTransitionFunction} !important;
      transition-duration: ${fiTrasnitionDurationMs}ms !important;
      top: ${fiTrasnitionDistance}px !important;
    }
    [fadeIn="show"] {
      opacity: 1 !important;
      top: 0 !important;
    }

    [manualFadeIn] {
      transition-timing-function: ${fiTransitionFunction} !important;
      transition-duration: ${fiTrasnitionDurationMs}ms !important;
      top: ${fiTrasnitionDistance}px !important;
    }
    [manualFadeIn="show"] {
      opacity: 1 !important;
      top: 0 !important;
    }

    [fadeInOut]  {
      transition-timing-function: ${fioTransitionFunction} !important;
      transition-duration: ${fioTrasnitionDurationMs}ms !important;
      top: ${fioTrasnitionDistance}px !important;
    }
    [fadeInOut="show"] {
      opacity: 1 !important;
      top: 0 !important;
    }
    `;

    document.head.appendChild(s);
  }
}
export class ElementsFadeIn {
  _io;
  _elements;

  constructor(elements) {
    this._elements = elements ?? [];

    this.attach();
  }

  attach() {
    this._io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("fadeIn", "show");

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    this._elements.forEach((e) => {
      this._io.observe(e);
    });
  }

  append(elem) {
    this._io.observe(elem);
  }

  remove(elem) {
    this._io.unobserve(elem);
  }
}
export class ElementsFadeInOut {
  _elements;
  _io;

  constructor(elements) {
    this._elements = elements ?? [];

    this.attach();
  }

  attach() {
    this._io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("fadeInOut", "show");
          } else {
            entry.target.setAttribute("fadeInOut", "");
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    this._elements.forEach((e) => {
      this._io.observe(e);
    });
  }

  append(elem) {
    this._io.observe(elem);
  }
}
