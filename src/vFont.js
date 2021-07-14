import Char from './Char.js';

export default class vFont {
  constructor(element) {
    this.title = document.getElementById(element);
    this.str = this.title.innerText;
    this.title.innerHTML = "";
    this.alpha = true;
    this.width = true;
    this.weight = true;
    this.italic = false;
    this.chars = [];
    this.mouse = { x: 0, y: 0 };
    this.cursor = {
      x: window.innerWidth,
      y: window.innerHeight
    };
  }

  init() {
    this.captureChars();
    this.set();
    this.animate();
    this.setListeners();
  };

  captureChars() {
    for (let i = 0; i < this.str.length; i += 1) {
      var c = new Char(this.title, this.str[i]);
      this.chars.push(c);
    }
  }

  setListeners() {
    window.addEventListener("resize", this.setSize.bind(this));

    window.addEventListener("mousemove", (e) => {
      this.cursor.x = e.clientX;
      this.cursor.y = e.clientY;
    });

    window.addEventListener("touchmove", (e) => {
      var t = e.touches[0];
      this.cursor.x = t.clientX;
      this.cursor.y = t.clientY;
      }, { passive: false 
    });
  }

  set() {
    this.title.className = "";
    this.setSize();
  };

  setSize() {
    let widthToUse = window.innerWidth;

    if (widthToUse > 900) {
      widthToUse = 900;
    }

    let fontSize = widthToUse / (this.str.length / 2);
    this.title.style = "font-size: " + fontSize + "px;";
  };

  animate() {
    this.mouse.x += (this.cursor.x - this.mouse.x) / 10;
    this.mouse.y += (this.cursor.y - this.mouse.y) / 10;

    // trigger loop
    window.requestAnimationFrame(this.animate.bind(this));

    // report mouse positions to char class
    for (let i = 0; i < this.chars.length; i += 1) {
      this.chars[i].setMouse(this.mouse.x, this.mouse.y);
    };

    this.render();
  };

  render() {
    this.maxDist = this.title.getBoundingClientRect().width / 2;

    // report mouse positions to char class
    for (let i = 0; i < this.chars.length; i += 1) {
      this.chars[i].setMaxDist(this.maxDist);
      this.chars[i].update({
        wght: this.weight,
        wdth: this.width,
        ital: this.italic,
        alpha: this.alpha
      });
    }
  };
};