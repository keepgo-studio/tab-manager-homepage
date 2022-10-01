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
        tick = false
        callback();
        return;
      }
    });
  };
}

export function getSectionsHeight() {
  const sectionIds = [
    'about',
    'features',
    'cost',
    'keepgo'
  ];

  const sectionsOffsetTop = sectionIds.map(id => document.getElementById(id).offsetTop);

  return sectionsOffsetTop;
}