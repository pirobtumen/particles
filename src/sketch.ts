import P5 from "p5";

type Particle = {
  x: number;
  y: number;
  size: number;
  xDir: number;
  yDir: number;
};

type Config = {
  particles: number;
  width: number;
  height: number;
  linkRadius: number;
  speedFactor: number;
};

let particles: Particle[] = [];
const config: Config = {
  particles: 100,
  width: 600,
  height: 600,
  linkRadius: 100,
  speedFactor: 10,
};

// -------------------------------------------------------------------------------------------------

export function setParticles(n: number) {
  config.particles = n;
  particles = [];
  generateParticles();
}

export function setRadius(r: number) {
  config.linkRadius = r;
}

export function setSpeedFactor(s: number) {
  config.speedFactor = s;
}

export function getRadius(): number {
  return config.linkRadius;
}

export function getParticles(): number {
  return config.particles;
}

export function getSpeedFactor(): number {
  return config.speedFactor;
}

// -------------------------------------------------------------------------------------------------

function generateParticles() {
  for (let i = 0; i < config.particles; i++) {
    particles.push({
      x: getRandomInt(config.width),
      y: getRandomInt(config.height),
      size: getRandomInt(6) + 3,
      xDir: getRandomInt(5),
      yDir: getRandomInt(5),
    });
  }
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function distance(x1: number, y1: number, x2: number, y2: number) {
  let y = x2 - x1;
  let x = y2 - y1;

  return Math.sqrt(x * x + y * y);
}

// -------------------------------------------------------------------------------------------------

const sketch = (p5: P5) => {
  p5.setup = () => {
    const canvas = p5.createCanvas(config.width, config.height);
    canvas.parent("p5");
    p5.frameRate(60);
    generateParticles();
  };

  p5.draw = () => {
    p5.background(10, 10, 10);

    for (let i = 0; i < config.particles; i++) {
      p5.strokeWeight(particles[i].size);
      p5.stroke(255, 255, 255);
      p5.point(particles[i].x, particles[i].y);
      particles[i].x += particles[i].xDir / config.speedFactor;
      particles[i].y += particles[i].yDir / config.speedFactor;

      if (
        particles[i].x > config.width ||
        particles[i].x < 0 ||
        particles[i].y > config.height ||
        particles[i].y < 0
      ) {
        particles[i].xDir *= -1;
        particles[i].yDir *= -1;
      }
    }

    for (let i = 0; i < config.particles; i++) {
      for (let j = 0; j < config.particles; j++) {
        const d = distance(
          particles[i].x,
          particles[i].y,
          particles[j].x,
          particles[j].y
        );
        if (i != j && d < config.linkRadius) {
          p5.strokeWeight(1 - d / config.linkRadius);
          p5.line(
            particles[i].x,
            particles[i].y,
            particles[j].x,
            particles[j].y
          );
        }
      }
    }
  };
};

export const init = () => {
  new P5(sketch);
};
