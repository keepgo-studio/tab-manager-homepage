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

export function getSectionsHeight() {
  const sectionIds = ["about", "features", "cost", "keepgo"];

  const sectionsOffsetTop = sectionIds.map(
    (id) => document.getElementById(id).offsetTop
  );

  return sectionsOffsetTop;
}

function _fadeSettingsStyles(
  transitionFunction,
  trasnitionDurationMs,
  trasnitionDistance
) {
  return `
    transition-timing-function: ${transitionFunction};
    transition-duration: ${trasnitionDurationMs}ms;
    top: ${trasnitionDistance}px;
  `;
}

export class ElementsFadeIn {
  distance = 10;
  _elements;

  constructor(elements) {
    this._elements = elements;

    const fiStyle = document.createElement("style");
    fiStyle.innerHTML = `
    [fadeIn] {
      ${_fadeSettingsStyles("ease", 500, this.distance)}
    }
    `

    document.head.appendChild(fiStyle);

    this.attach();
  }

  attach() {
    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.top = 0;

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    this._elements.forEach((e) => {
      io.observe(e);
    });
  }
}
export class ElementsFadeInOut {
  distance = 10;
  _elements;

  constructor(elements) {
    this._elements = elements;

    const fioStyle = document.createElement('style')
    fioStyle.innerHTML = `
    [fadeInOut]  {
      ${_fadeSettingsStyles("ease-in-out", 300, this.distance)}
    }
    `

    document.head.appendChild(fioStyle);

    this.attach();
  }

  attach() {
    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.top = 0;
          } else {
            entry.target.style.opacity = 0;
            entry.target.style.top = `${this.distance}px`;
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    this._elements.forEach((e) => {
      io.observe(e);
    });
  }
}
