import "./style.css";
import {
  getParticles,
  getRadius,
  getSpeedFactor,
  init,
  setParticles,
  setRadius,
  setSpeedFactor,
} from "./sketch";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Particles</h1>
    <div id="p5"></div>
    <div>
      <p>Particles</p>
      <input type="range" min="1" max="200" value="${getParticles()}" class="slider" id="particles">
      <p>Link radius</p>
      <input type="range" min="1" max="200" value="${getRadius()}" class="slider" id="radius">
      <p>Speed</p>
      <input type="range" min="1" max="10" value="${
        11 - getSpeedFactor()
      }" class="slider" id="speed">
    </div>
  </div>
`;

const particlesSlider = document.getElementById("particles");
if (particlesSlider) {
  particlesSlider.oninput = (e) => {
    setParticles(e.target!.value);
  };
}

const radiusSlider = document.getElementById("radius");
if (radiusSlider) {
  radiusSlider.oninput = (e) => {
    // output.innerHTML = this.value;
    setRadius(e.target!.value);
  };
}

const speedSlider = document.getElementById("speed");
if (speedSlider) {
  speedSlider.oninput = (e) => {
    // output.innerHTML = this.value;
    setSpeedFactor(11 - e.target!.value);
  };
}

init();
