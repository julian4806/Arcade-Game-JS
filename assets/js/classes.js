// player position
class Sprite {
  constructor({ position, velocity, image, frames = { max: 1 }, sprites }) {
    this.position = position;
    this.image = image;
    this.frames = { ...frames, val: 0, elapsed: 0 };
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;

      //Check position
      setInterval(() => {
        // console.log("Y position: " + this.position.y);
        // console.log("X position: " + this.position.x);
        if (this.position.y <= -1750 && this.position.x <= -1932) {
          // on the spot
          talahRama();
        } else if (this.position.y <= -1650 && this.position.y > -1749) {
          // left the spot
          blocked = false;
        } else if (
          player.image === player.sprites.up &&
          this.position.x <= -1845 &&
          this.position.x >= -2052 && // between -1845 & -2052
          this.position.y === -855
        ) {
          text = "mailbox";
        }
      }, 100);
    };
    this.moving = false;
    this.sprites = sprites;
  }

  draw() {
    //map position
    c.drawImage(
      this.image,
      this.frames.val * this.width,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
    );

    if (!this.moving) return;
    if (this.frames.max > 1) {
      this.frames.elapsed++;
    }
    if (this.frames.elapsed % 10 === 0) {
      if (this.frames.val < this.frames.max - 1) {
        this.frames.val++;
      } else {
        this.frames.val = 0;
      }
    }
  }
}

class Boundary {
  static width = 120;
  static height = 120;

  constructor({ position }) {
    this.position = position;
    this.width = 120;
    this.height = 120;
  }

  draw() {
    c.fillStyle = "rgba(255, 0, 0, 0.0)"; // color collisions
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
