import { Navbar } from "./elements.js";
import { LeonSansFont } from "./font.js";

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
};
