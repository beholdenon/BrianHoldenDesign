import vType from './vType.js';
import vFont from './vFont.js';
import AOS from 'aos';
import $ from 'jquery';

$(() => {
  var overlayOpen = false;

  Math.dist = function (a, b) {
    var dx = b.x - a.x;
    var dy = b.y - a.y;
    return Math.sqrt(Math.pow(dx, 2), Math.pow(dy, 2));
  };

  function initVariableType() {
    let t = new vType();
    t.init();
    var f = new vFont('title');
    f.init();
  } 

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

    // add class to body and trigger show css animation
    $("body").addClass("overlay-active");
  }

  function closeOverlay() {
    overlayOpen = false;

    // remove class to body and trigger hide css animation
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

    $('.view-work-btn').on("click", (e) => {
      e.preventDefault();
      $("html, body").animate({ scrollTop: $(".work").offset().top }, 1000);
    });


  }

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function initContactForm() {
    $('#contact-form').on('submit', function(e) {
      e.preventDefault();

      let numErrors = 0;
      const form = $(this);

      // capture data
      const data = {
        fname: $('#fname').val(),
        email: $('#email').val(),
        message: $('#message').val()
      };

      if(data.fname === "") {
        numErrors += 1;
        $('#fname').addClass("error");
      }

      if(data.email === "" || !validateEmail(data.email)) {
        numErrors += 1;
        $('#email').addClass("error");
      }

      if(data.message === "") {
        numErrors += 1;
        $('#message').addClass("error");
      }

      if(numErrors === 0) {
        $.ajax({
          type: form.attr('method'),
          url: form.attr('action'),
          data: JSON.stringify(data),
          cache: false,
          contentType: 'application/json; charset=utf-8',
          error: (err) => { console.log(err); },
          success: (data) => {
            $('#contact-message').html('Thank you for your comments. I will respond shortly.')
            $('#contact-form').addClass('success');
          },
        });
      }

    });
  }

  function resetScroll() {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }

  function init() {
    initVariableType();
    resetScroll();
    initAnimation();
    initContactForm();
    initListeners();
    loadOverlayImages();
  }

  init();

});




