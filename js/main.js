import { AboutSection, KeppgoSection, Navbar } from "./elements.js";
import { LeonSansFont } from "./font.js";
import { logoText } from "./global.js";
import { ElementsFadeIn, ElementsFadeInOut, FadeSetting } from "./utils.js";


window.onload = () => {
  // initializing for logo canvas
  new LeonSansFont(
    document.querySelector(".keepgo-studio-logo"),
    logoText,
    "#000",
    80,
    200,
    300,
    165
  );
  new LeonSansFont(
    document.querySelector(".keepgo-studio-logo-s"),
    logoText,
    "#000",
    20,
    200,
    70,
    40
  );

  new Navbar();
  new AboutSection();
  new KeppgoSection();

  const fadeInElements = document.querySelectorAll("[fadeIn]");
  const fadeInOutElements = document.querySelectorAll("[fadeInOut]");

  new FadeSetting(
    {
      fiTransitionFunction: "ease",
      fiTrasnitionDurationMs: 500,
      fiTrasnitionDistance: 15,
    },
    {
      fioTransitionFunction: "ease-in-out",
      fioTrasnitionDurationMs: 300,
      fioTrasnitionDistance: 15,
    }
  );
  new ElementsFadeIn(fadeInElements);
  new ElementsFadeInOut(fadeInOutElements);
};
