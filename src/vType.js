export default class vType {
  constructor() {
    this.maxDist = 0;
    this.mouse = { x: 0, y: 0 };
    this.cursor = {
      x: window.innerWidth,
      y: window.innerHeight
    };
  }

  init() {
    this.initMouseMove();
  }

  initMouseMove() {
    const _this = this;
    window.addEventListener("mousemove", (e) => {
      _this.cursor.x = e.clientX;
      _this.cursor.y = e.clientY;
    });
  }
}