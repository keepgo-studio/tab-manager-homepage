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

export class ElementsFadeIn {
  _elements;

  constructor(elements) {
    this._elements = elements;

    this.attach();
  }

  attach() {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.top = 0;

          observer.unobserve(entry.target)
        }
      })
    }, {
      threshold: 0.5
    })
    
    this._elements.forEach(e => { io.observe(e) });

  }
}
export class ElementsFadeInOut {
  _elements;

  constructor(elements) {
    this._elements = elements;

    this.attach();
  }

  attach() {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.top = 0;
        } else {
          entry.target.style.opacity = 0;
          entry.target.style.top = '10px';
        }
      })
    }, {
      threshold: 0.5
    })
    
    this._elements.forEach(e => { io.observe(e) });

  }
}