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
    if ($(this).scrollTop() > 150) {
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





const particlesId = 'particles-js'

const runParticlesJS = (selector) => {

  particlesJS(selector, {
    particles: {
        number: {
            value: 30,  
            density: {
                enable: true,
                value_area: 800  
            }
        },
        shape: {
            type: 'image',
            image: {
                src: 'images/icons8-airplane-take-off-100blue.png',
                width: 200,  
                height: 200  
            }
        },
        opacity: {
            value: 0.5,  
            random: true,
            anim: {
                enable: true,
                speed: 2,
                opacity_min: 0.1,
                sync: true
            }
        },
        size: {
            value: 30,  
            random: true,
            anim: {
                enable: false,
                speed: 30,
                size_min: 0.1,
                sync: false
            }
        },
        move: {
            enable: true,
            speed: 1,  
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
           
        },
        
        modes: {
            repulse: {
                distance: 200,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            }
        },
         
    },
    retina_detect: true
  });
}
const targetElem = document.getElementById(particlesId)
if(targetElem) {
  runParticlesJS(particlesId)
  let counterResize = 0
  const resizeObserver = new ResizeObserver((entries) => {
    counterResize++
    //console.log('entries', entries[0])
    if(counterResize>1) {
      if(entries[0].target.id===particlesId) {
        setTimeout(() => {
          const currentElement = document.getElementById(particlesId)
          if(currentElement) {
            const currentElementCanvas = currentElement.querySelector('canvas')
            if(currentElementCanvas) {
              currentElement.removeChild(currentElementCanvas)
              runParticlesJS(particlesId)
            }
          
            //console.log('newElem', newElem)
          }
        }, 200)
      
      }
    }

  })
  resizeObserver?.observe(document.getElementById('particles-js'))
}



//==>
const hambergerBtn = document.body.querySelector('#js-btn-menu')
if(hambergerBtn) {
  const menu = document.body.querySelector('#header-menu')
  if(menu) {
    hambergerBtn.addEventListener('click', e => {
      e.preventDefault()
      if(menu.classList.contains('active')) {
        menu.classList.remove('active')
      } else {
        menu.classList.add('active')
      }
    })
  }
  
}


//==> control sidbare
const connectedUserHambergerBtn = document.body.querySelector('[data-action="control-sidebare"]')
if(connectedUserHambergerBtn) {
  const sidebar = document.body.querySelector('#sidebar')
  if(sidebar) {
    connectedUserHambergerBtn.addEventListener('click', e => {
      e.preventDefault()
      if(sidebar.classList.contains('active')) {
        sidebar.classList.remove('active')
        connectedUserHambergerBtn.classList.remove('active')
      } else {
        sidebar.classList.add('active')
        connectedUserHambergerBtn.classList.add('active')
      }
    })
    
  }
}


//====>> Control user-menu
const userMenuBtn = document.querySelector('[data-action="control-user-menu"]')
if(userMenuBtn) {
  const userMenuBox = document.querySelector('[data-id="user-menu"]')
  if(userMenuBox) {
    userMenuBtn.addEventListener('click', e => {
      e.preventDefault()
      userMenuBox.classList.toggle('open')
    })
    document.addEventListener('click', e => {
      const targetElem = e.target
      console.log('targetElem', targetElem)
      if(!userMenuBox.classList.contains('open')) return
      if((targetElem.dataset?.action==='control-user-menu')||targetElem.closest('[data-action="control-user-menu"]')||targetElem.classList.contains('user-menu')||targetElem.closest('.user-menu')) return
      userMenuBox.classList.remove('open')
    })
  }
  
}

// /*
// -------------------------------
// * Accordion
// -------------------------------
// */
// const Accordion = (opt={}) => {
//   const section = opt.section??document.body
//   const allAccordion = opt.targetAccordion?? section.querySelectorAll('[data-accordion="true"]')
//   if(allAccordion) {
//     InjectStyles({
//       name:'Accordion',
//       styles: `
//       .cpn-accordion {}
//       .ui-pagination__table tbody tr td.cpn-accordion__item {  padding: 0;}
//       .cpn-accordion__item-label {  background-color:#60A3D9; padding: 8px 50px 8px 8px;  cursor: pointer; }
//       .ui-pagination__table tbody tr td.cpn-accordion__item .cpn-accordion__item-label {  /* padding: 16px 60px 16px 18px; */}
//       .cpn-accordion__item-label--active::before {transform: rotate(180deg);}
//       .cpn-accordion__item-label::before {content: "";  position: absolute;  width: 16px;  height: 16px;  background-color: #000;  -webkit-mask-image: url('./../../assets/images/svg/icon-arrow-bottom.svg');  -webkit-mask-size: 16px 16px;  -webkit-mask-repeat: no-repeat ;  -webkit-mask-position: center;  right: 8px;  top: calc(50% - 8px);  transition: transform .3s linear;}
//       .cpn-accordion__item-content {padding: 0 10px;background-color:#f7fdff;max-height: 0; min-height:0;transition: all .3s linear;margin: 0;overflow: auto;}
//       .cpn-accordion__item-content::-webkit-scrollbar {width: 6px;height: 6px;}
//       .cpn-accordion__item-content::-webkit-scrollbar-thumb {width: 30%;height: 6px;background-color: #A8AAB1 !important;outline: none;border-radius: 6px;}
//       .cpn-accordion__item-content::-webkit-scrollbar-track {background-color: transparent;}
//       .cpn-accordion__item-content::-webkit-scrollbar-track-piece {width: 6px;background-color: #c6cada !important;border-radius: 5px;box-shadow: none;border: none;}
//       .cpn-accordion__item-label--active {background-color: #41545d;}
//       .cpn-accordion__item-label--active + dd.cpn-accordion__item-content {/*padding: 10px;*/max-height: 900px;min-height: 50px;border: solid 1px #d2d9dc;padding: 10px 10px;}
//       .cpn-accordion__item-label--active + dd.cpn-accordion__item-content .cpn-wrap-table {max-height: 800px;}
//       .cpn-accordion-head {display: flex;align-items: center;}
//       .cpn-accordion-head__col {width: 33.33%;padding: 8px 10px;}
//       .cpn-accordion-head__item-label {font-size: 0.8rem;line-height: 0.9rem;font-family: "Inter-Medium", sans-serif;color: #06407f;}
//       .cpn-accordion-head__item-value {font-size: 0.7rem;line-height: 0.7rem;color: #050505;}
//       .cpn-accordion-head__col-text {font-size: 0.75rem;line-height: 0.8rem;color: #050505;}
 
//       .cpn-accordion__item-label--active .cpn-accordion-head__item-label {color: #ffffff;}
//       .cpn-accordion__item-label--active .cpn-accordion-head__item-value {color: #cbc6c6;}
//       .cpn-accordion__item-label--active .cpn-accordion-head__col-text {color: #c9f2ed;}
 
//       .ui-pagination__table tbody .cpn-accordion__item-content tr:nth-child(even) {background-color: #f1f8fa;}
//       `
//     })
//     const eventClick = e => {
//       e.preventDefault
//       const $this = e.target
//       const elem = e.currentTarget
//       elem.classList.toggle('cpn-accordion__item-label--active')
//     }
//     setTimeout(() => {
//       allAccordion.forEach(accordion => {
//         const allDt = accordion.querySelectorAll('dt')
//         if(allDt) {
//           allDt.forEach(item => {
//             item.addEventListener('click', eventClick)
//           })
//         }
//       })
//     }, 200)
//   }
//  }
 