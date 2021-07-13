



class vType {
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
let v = new vType();
v.init();

var maxDist;
var mouse = { x: 0, y: 0 };
var cursor = {
  x: window.innerWidth,
  y: window.innerHeight
};

Math.dist = function (a, b) {
  var dx = b.x - a.x;
  var dy = b.y - a.y;
  return Math.sqrt(Math.pow(dx, 2), Math.pow(dy, 2));
};

window.addEventListener("mousemove", function (e) {
  cursor.x = e.clientX;
  cursor.y = e.clientY;
});

window.addEventListener(
  "touchmove",
  function (e) {
    var t = e.touches[0];
    cursor.x = t.clientX;
    cursor.y = t.clientY;
  },
  {
    passive: false
  }
);

var Char = function (container, char) {
  var span = document.createElement("span");
  span.setAttribute("data-char", char);
  span.innerText = char;
  container.appendChild(span);

  this.getDist = function () {
    this.pos = span.getBoundingClientRect();
    return Math.dist(mouse, {
      x: this.pos.x + this.pos.width / 1.75,
      y: this.pos.y
    });
  };
  this.getAttr = function (dist, min, max) {
    var wght = max - Math.abs((max * dist) / maxDist);
    return Math.max(min, wght + min);
  };
  this.update = function (args) {
    var dist = this.getDist();
    this.wdth = args.wdth ? ~~this.getAttr(dist, 5, 200) : 100;
    this.wght = args.wght ? ~~this.getAttr(dist, 100, 800) : 400;
    this.alpha = args.alpha ? this.getAttr(dist, 0.2, 1).toFixed(2) : 1;
    this.ital = args.ital ? this.getAttr(dist, 0, 1).toFixed(2) : 0;
    this.draw();
  };
  this.draw = function () {
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
    span.style = style;
  };
  return this;
};

var VFont = function () {
  this.scale = false;
  this.flex = false;
  this.alpha = true;
  this.stroke = false;
  this.width = true;
  this.weight = true;
  this.italic = false;
  var title,
    str,
    chars = [];

  this.init = function () {
    title = document.getElementById("title");
    str = title.innerText;
    title.innerHTML = "";
    for (var i = 0; i < str.length; i++) {
      var _char = new Char(title, str[i]);
      chars.push(_char);
    }
    this.set();
    window.addEventListener("resize", this.setSize.bind(this));
  };

  this.set = function () {
    title.className = "";
    title.className += this.flex ? " flex" : "";
    title.className += this.stroke ? " stroke" : "";
    this.setSize();
  };

  this.setSize = function () {
    let widthToUse = window.innerWidth;

    if (widthToUse > 900) {
      widthToUse = 900;
    }
    var fontSize = widthToUse / (str.length / 2);
    title.style = "font-size: " + fontSize + "px;";
    if (this.scale) {
      var scaleY = (
        window.innerHeight / title.getBoundingClientRect().height
      ).toFixed(2);
      var lineHeight = scaleY * 0.2;
      title.style =
        "font-size: " +
        fontSize +
        "px; transform: scale(1," +
        scaleY +
        "); line-height: " +
        lineHeight +
        "em;";
    }
  };

  this.animate = function () {
    mouse.x += (cursor.x - mouse.x) / 10;
    mouse.y += (cursor.y - mouse.y) / 10;
    requestAnimationFrame(this.animate.bind(this));
    this.render();
  };

  this.render = function () {
    maxDist = title.getBoundingClientRect().width / 2;
    for (var i = 0; i < chars.length; i++) {
      chars[i].update({
        wght: this.weight,
        wdth: this.width,
        ital: this.italic,
        alpha: this.alpha
      });
    }
  };
  this.init();
  this.animate();
  return this;
};

var txt = new VFont();

$(window).on("scroll", function () {
  let perc = $(window).scrollTop() / 2 / ($(window).height() / 2);
  console.log(
    "scrollTop: " +
      $(window).scrollTop() +
      " offset top: " +
      $(".work").offset().top
  );
  $(".landing .inner").css("filter", "blur(" + perc * 8 + "px)");
  $(".landing .inner").css("opacity", 1 - (perc/4));
});

$(function () {
  var overlayOpen = false;

  function initAnimation() {
    AOS.init();
  }

  function loadOverlayImages() {
    $('.overlay .overlay-outer').each(function() {
      $(this).find('.overlay-item').each(function() {
        $(this).find('img').attr('src', $(this).find('img').data('src'));
      });
    });
  }

  function openOverlay(id) {
    overlayOpen = true;

    // set scroll position to the top
    $('.overlay .inner').scrollTop(0);

    // show only active overlay
    $(".overlay .overlay-outer").hide().eq(id).show();

    // add class to body and trigger css animation
    $("body").addClass("overlay-active");
  }

  function closeOverlay() {
    overlayOpen = false;
    $('body').removeClass('overlay-active');
  }

  function initListeners() {
    $(".work-item a").on("click", function (e) {
      e.preventDefault();
      openOverlay($(this).parent().index());
    });

    $(".overlay .close-btn").on("click", function (e) {
      e.preventDefault();
      closeOverlay();
    });

    $(document).on('keydown', function(e) {
      if (e.key === 'Escape' && overlayOpen) {
        closeOverlay();
      }
    });

    $(".main-btn").on("click", (e) => {
      e.preventDefault();
      $("html, body").animate({ scrollTop: $(".work").offset().top }, 1000);
    });

      document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        // generate a five digit number for the contact_number variable
        this.contact_number.value = Math.random() * 100000;
        
        // these IDs from the previous steps
        emailjs.sendForm('service_8pls7dp', 'template_n5ugnq7', this)
        .then(function() {
          $('#contact-form').addClass('success');
          $('#contact-message').html('Thank you for contacting me. I will respond shortly.')
          console.log('SUCCESS!');
        }, function(error) {
          console.log('FAILED...', error);
        });
      });
  }

  function initContactForm() {
    emailjs.init("user_6gEpumhEMoMyRktID4nN9");
  }

  function init() {
    initAnimation();
    initContactForm();
    initListeners();
    loadOverlayImages();
  }

  init();

});



