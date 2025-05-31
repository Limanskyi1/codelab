interface PhysicsConfig {
  gravityAcceleration: number;
  energyLossFactor: number;
  minimumBounceVelocity: number;
}

const DEFAULT_CONFIG: PhysicsConfig = {
  gravityAcceleration: 0.5,
  energyLossFactor: 0.7,
  minimumBounceVelocity: 1,
};

class BouncingBall {
  private velocity = 0;
  private currentTop = 0;
  private direction: "up" | "down" = "down";
  private isAnimating = false;

  constructor(
    private readonly ball: HTMLDivElement,
    private readonly ground: HTMLDivElement,
    private readonly config: PhysicsConfig = DEFAULT_CONFIG
  ) {
    this.currentTop = ball.offsetTop;
  }

  private getRects() {
    return {
      ball: this.ball.getBoundingClientRect(),
      ground: this.ground.getBoundingClientRect(),
    };
  }

  private updateDownward() {
    this.velocity += this.config.gravityAcceleration;
    this.currentTop += this.velocity;

    const { ball, ground } = this.getRects();
    const predictedBottom = ball.bottom + this.velocity;

    if (predictedBottom >= ground.top) {
      this.currentTop -= predictedBottom - ground.top;
      this.velocity = -this.velocity * this.config.energyLossFactor;
      this.direction = "up";

      if (Math.abs(this.velocity) < this.config.minimumBounceVelocity) {
        this.isAnimating = false;
      }
    }
  }

  private updateUpward() {
    this.velocity += this.config.gravityAcceleration;
    this.currentTop += this.velocity;

    if (this.velocity >= 0) {
      this.direction = "down";
    }
  }

  private animate = () => {
    if (!this.isAnimating) return;

    this.direction === "down" ? this.updateDownward() : this.updateUpward();
    this.ball.style.top = `${this.currentTop}px`;

    if (this.isAnimating) {
      requestAnimationFrame(this.animate);
    }
  };

  public bounce() {
    if (this.isAnimating) return;

    this.velocity = 0;
    this.direction = "down";
    this.isAnimating = true;
    this.animate();
  }
}

const ballElement = document.querySelector("#ball")! as HTMLDivElement;
const groundElement = document.querySelector("#ground")! as HTMLDivElement;
const bounceButton = document.querySelector("#down")! as HTMLButtonElement;

const bouncingBall = new BouncingBall(ballElement, groundElement);

bounceButton.addEventListener("click", () => {
  bouncingBall.bounce();
});
