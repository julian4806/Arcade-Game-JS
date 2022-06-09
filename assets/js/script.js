document.addEventListener("contextmenu", (event) => event.preventDefault());

let notification = document.querySelector(".note");
let title = document.querySelector("h1");
let talah = document.querySelector(".talahRama");
const show = [notification, talah];

let fadeEffect = setInterval(function () {
  if (!title.style.opacity) {
    title.style.opacity = 1;
  }
  if (title.style.opacity > 0) {
    title.style.opacity -= 0.07;
  } else {
    clearInterval(fadeEffect);
  }
}, 200);

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 30) {
  collisionsMap.push(collisions.slice(i, 30 + i));
}

const offset = {
  x: -2070,
  y: -750,
};

const boundaries = [];
collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 856)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

const image = new Image();
image.src = "./assets/img/Meditation Island.png";

const foregroundImage = new Image();
foregroundImage.src = "./assets/img/foregroundObjects.png";

const playerDownImage = new Image();
playerDownImage.src = "./assets/img/player/playerDown.png";
const playerUpImage = new Image();
playerUpImage.src = "./assets/img/player/playerUp.png";
const playerLeftImage = new Image();
playerLeftImage.src = "./assets/img/player/playerLeft.png";
const playerRightImage = new Image();
playerRightImage.src = "./assets/img/player/playerRight.png";

// player starting position
const player = new Sprite({
  position: {
    x: canvas.width / 2 - 339 / 4 / 2,
    y: canvas.height / 2 - 120 / 2,
  },
  image: playerDownImage,
  frames: {
    max: 4,
  },
  sprites: {
    up: playerUpImage,
    left: playerLeftImage,
    right: playerRightImage,
    down: playerDownImage,
  },
});

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: image,
});

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: foregroundImage,
});

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

const movables = [background, ...boundaries, foreground];

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  );
}

// directional code
function animate() {
  window.requestAnimationFrame(animate);
  background.draw();
  boundaries.forEach((Boundary) => {
    Boundary.draw();
  });
  player.draw();
  foreground.draw();

  let moving = true;
  player.moving = false;
  if (keys.w.pressed && lastKey === "KeyW") {
    player.moving = true;
    player.image = player.sprites.up;
    for (let i = 0; i < boundaries.length; i++) {
      const Boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...Boundary,
            position: {
              x: Boundary.position.x,
              y: Boundary.position.y + 3,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }

    if (moving) {
      movables.forEach((movable) => {
        movable.position.y += 3;
      });
    }
  } else if (keys.a.pressed && lastKey === "KeyA") {
    player.moving = true;
    player.image = player.sprites.left;
    for (let i = 0; i < boundaries.length; i++) {
      const Boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...Boundary,
            position: {
              x: Boundary.position.x + 3,
              y: Boundary.position.y,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }

    if (moving) {
      movables.forEach((movable) => {
        movable.position.x += 3;
      });
    }
  } else if (keys.s.pressed && lastKey === "KeyS") {
    player.moving = true;
    player.image = player.sprites.down;
    for (let i = 0; i < boundaries.length; i++) {
      const Boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...Boundary,
            position: {
              x: Boundary.position.x,
              y: Boundary.position.y - 3,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }

    if (moving) {
      movables.forEach((movable) => {
        movable.position.y -= 3;
      });
    }
  } else if (keys.d.pressed && lastKey === "KeyD") {
    player.moving = true;
    player.image = player.sprites.right;
    for (let i = 0; i < boundaries.length; i++) {
      const Boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...Boundary,
            position: {
              x: Boundary.position.x - 3,
              y: Boundary.position.y,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }

    if (moving) {
      movables.forEach((movable) => {
        movable.position.x -= 3;
      });
    }
  } else if (keys.d.pressed && lastKey === "Space") {
    pickupTimeout();
  }
}
animate();

// Wait before pickup-audio can play again
let text = "Can't talk to this thing...";
let isBlocked = false;
function pickupTimeout() {
  if (isBlocked === false) {
    new Audio("/assets/audio/pickup.mp3").play();
    // hardcoded
    notification.innerHTML = text;
    Object.assign(notification.style, {
      display: `block`,
      "z-index": 2,
    });
    isBlocked = true;
    setTimeout(() => {
      Object.assign(notification.style, {
        display: `none`,
        "z-index": 0,
      });
      text = "Can't talk to this thing...";
      setTimeout(() => {
        isBlocked = false;
      }, 500);
    }, 1000);
  }
}
setInterval(() => {
  console.log(isBlocked);
}, 100);
// Wait before pickup-audio can play again

let lastKey = "";
window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "KeyW":
      keys.w.pressed = true;
      lastKey = "KeyW";
      break;
    case "KeyA":
      keys.a.pressed = true;
      lastKey = "KeyA";
      break;
    case "KeyS":
      keys.s.pressed = true;
      lastKey = "KeyS";
      break;
    case "KeyD":
      keys.d.pressed = true;
      lastKey = "KeyD";
      break;
    case "Space":
      keys.d.pressed = true;
      lastKey = "Space";
      break;
  }
});
window.addEventListener("keyup", (e) => {
  switch (e.code) {
    case "KeyW":
      keys.w.pressed = false;
      break;
    case "KeyA":
      keys.a.pressed = false;
      break;
    case "KeyS":
      keys.s.pressed = false;
      break;
    case "KeyD":
      keys.d.pressed = false;
      break;
    case "Space":
      keys.d.pressed = false;
      break;
  }
});

// Talah Rama Code
let blocked = false;
let reuse = null;
let testBlocked = false;
function talahRama() {
  if (blocked === false) {
    let mA = new Audio(`/assets/audio/meditate.mp3`);
    mA.loop = true;
    let interval = setInterval(() => {
      let opacity = Math.floor(Math.random() * 7 + 1);
      Object.assign(canvas.style, {
        opacity: `${"0." + opacity}`,
        transition: "all 1.5s",
      });
      clearInterval(interval);
    }, 500);
    if (testBlocked === false) {
      mA.play();
      mA.volume = 1;
      testBlocked = true;
    }
    show.forEach((e) => {
      e.style.display = "block";
    });
    notification.innerHTML = "press 'F' to exit";
    reuse = false;
    window.addEventListener("keydown", (e) => {
      if (["KeyW", "KeyA", "KeyS", "KeyD", "Space"].indexOf(e.code) > -1) {
        for (x in keys) {
          keys[x].pressed = reuse;
        }
      }

      if (e.code === "KeyF") {
        let lowerVolume = setInterval(function () {
          if (mA.volume > 0) {
            mA.volume = Math.max(0, mA.volume - 0.1);
            if (mA.volume < 0.1) {
              mA.volume = 0;
            }
          } else {
            clearInterval(lowerVolume);
          }
        }, 200);

        blocked = true;
        setTimeout(() => {
          reuse = true;
          testBlocked = false;
          show.forEach((e) => {
            e.style.display = "none";
          });
        }, 2000);
      }
    });
  }

  if (blocked === true) {
    canvas.style.opacity = 1;
  }
}
// talahRama();
// Talah Rama Code END
