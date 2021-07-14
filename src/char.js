export default class Char {
  constructor(container, char) {
    this.span = document.createElement("span");
    this.span.setAttribute("data-char", char);
    this.span.innerText = char;
    container.appendChild(this.span);
    this.mouse = { x: 0, y: 0 };
    this.maxDist = 0;
  }

  setMouse(x, y) {
    console.log('setMouse ' + x);
    this.mouse.x = x;
    this.mouse.y = y;
  }

  setMaxDist(dist) {
    this.maxDist = dist;
  }

  getDist() {
    this.pos = this.span.getBoundingClientRect();
    return Math.dist(this.mouse, {
      x: this.pos.x + this.pos.width / 1.75,
      y: this.pos.y
    });
  };

  getAttr(dist, min, max) {
    var wght = max - Math.abs((max * dist) / this.maxDist);
    return Math.max(min, wght + min);
  };

  update(args) {
    var dist = this.getDist();
    console.log('update' + dist);
    this.wdth = args.wdth ? ~~this.getAttr(dist, 5, 200) : 100;
    this.wght = args.wght ? ~~this.getAttr(dist, 100, 800) : 400;
    this.alpha = args.alpha ? this.getAttr(dist, 0.2, 1).toFixed(2) : 1;
    this.ital = args.ital ? this.getAttr(dist, 0, 1).toFixed(2) : 0;
    this.draw();
  };

  draw() {
    var style = "";
    style += "opacity: " + this.alpha + ";";
    style +=
      "font-variation-settings: 'wght' " +
      this.wght +
      ", 'wdth' " +
      this.wdth +
      ", 'ital' " +
      this.ital +
      ";";
    this.span.style = style;
  };
};