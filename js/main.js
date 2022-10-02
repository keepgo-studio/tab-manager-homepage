import { Navbar } from "./elements.js";
import { LeonSansFont } from "./font.js";
import { ElementsFadeIn, ElementsFadeInOut } from "./utils.js";

const logoText = "keepgo\nstudio";

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

  const fadeInElements = document.querySelectorAll("[fadeIn]");
  const fadeInOutElements = document.querySelectorAll("[fadeInOut]");
	
  new ElementsFadeIn(fadeInElements);
  new ElementsFadeInOut(fadeInOutElements);
};
