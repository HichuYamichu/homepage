const canvas = document.querySelector('canvas');
const rect = canvas.parentNode.getBoundingClientRect();
canvas.width = rect.width;
canvas.height = rect.height;

window.addEventListener('resize', () => {
  const rect = canvas.parentNode.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
});

const ctx = canvas.getContext('2d');
const circles = [];
const colors = ['#F40873', '#F135A7', '#A0049A', '#470156', '#62EEF6'];

class Circle {
  constructor(radious, x, y, dx, dy) {
    this.radious = radious;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radious, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    const exeedsRight = this.x + this.radious > canvas.width;
    const exeedsLeft = this.x - this.radious < 0;

    if (exeedsRight || exeedsLeft) {
      this.dx = -this.dx;
    }

    const exeedsTop = this.y - this.radious < 0;
    const exeedsBottom = this.y + this.radious > canvas.height;

    if (exeedsTop || exeedsBottom) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }

  start() {
    requestAnimationFrame(this.start.bind(this));
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.update();
  }
}

for (let i = 0; i < 80; i++) {
  const radious = 40;
  const x = Math.random() * (canvas.width - radious * 2) + radious;
  const y = Math.random() * (canvas.height - radious * 2) + radious;
  const dx = (Math.random() - 0.5) * 2;
  const dy = (Math.random() - 0.5) * 2;
  const circle = new Circle(radious, x, y, dx, dy);
  circles.push(circle);
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const circle of circles) {
    circle.update();
  }
}

animate();
