//= ../components/modal.js
const counter = () => {
  const counters = document.querySelectorAll('[data-name="counter-num"]')
  const speed = 200

  counters.forEach( counter => {
    const animate = () => {
        const value = +counter.getAttribute('value');
        const data = +counter.innerText;
        const time = value / speed;
      if(data < value) {
        counter.innerText = Math.ceil(data + time);
        setTimeout(animate, 1);
      }else{
        counter.innerText = value;
      }
    }
    animate();
  });
}
counter()




$('.js-catalogue').slick({
  dots:true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 8000,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    },
  ],
});

//catalogue
$('.js-partners').slick({
  dots:true,
  centerMode: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 8000,
  responsive: [
      {
          breakpoint: 575,
          settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          }
      },
  ],
});

const wow = new WOW(
  {
    boxClass:     'wow',      // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset:       0,          // distance to the element when triggering the animation (default is 0)
    mobile:       true,       // trigger animations on mobile devices (default is true)
    live:         true,       // act on asynchronously loaded content (default is true)
    callback:     function(box) {
      // the callback is fired every time an animation is started
      // the argument that is passed in is the DOM node being animated
    },
    scrollContainer: null,    // optional scroll container selector, otherwise use window,
    resetAnimation: true,     // reset animation on end (default is true)
  }
);
wow.init();





$(document).ready(function() {
  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function () {
    $('html, body').animate({scrollTop: 0}, 1500, );
    return false;
  });

  $('select').select2();
});
