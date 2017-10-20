'use strict';

document.addEventListener('DOMContentLoaded', function () {
  svg4everybody();

  function isHasClass(classString) {
    return document.body.classList.contains(classString);
  }

  var SCENE_OFFSET = -160;
  var controller = new ScrollMagic.Controller();
  var animations = {
    tweeen1: {
      opacity: 0,
      y: 50
    }
  };
  var labelAnimation = animations.tweeen1;
  var titleAnimation = animations.tweeen1;

  if (isHasClass('home')) {
    var favoritWorksTween = new TimelineMax();

    favoritWorksTween
        .from('.favorit-work-slide__title', 0.8, {
          y: -80,
          opacity: 0
        }, '+=0.3')
        .from('.favorit-work-slide__text', 0.6, {
          y: 80,
          opacity: 0,
          ease: Back.easeOut.config(1.2)
        }, '-=0.3')
        .from('.favorit-work-slide__button', 0.6, {
          y: 80,
          opacity: 0,
          ease: Back.easeOut.config(1.7)
        }, '-=0.45');

    var tweenSectionFavoritWorks = function () {
      var favoritWorks = document.querySelector('.favorit-works');
      var label = favoritWorks.querySelector('.section__label');

      var clientsTween = new TimelineMax();

      clientsTween
          .from(label, 0.4, labelAnimation)

      var scene = new ScrollMagic.Scene({
        triggerElement: favoritWorks,
        offset: SCENE_OFFSET
      })
          .setTween(clientsTween)
          .setClassToggle(label, 'section__label--triggered')
          .addTo(controller);

      if ((location.hostname === 'localhost')) {
        scene.addIndicators();
      }
    };
    var tweenSectionMission = function () {
      var mission = document.querySelector('.mission');
      var label = mission.querySelector('.section__label');
      var title = mission.querySelector('.section__title');

      var missionTween = new TimelineMax();

      missionTween
          .from(label, 0.4, labelAnimation)
          .from(title, 0.4, titleAnimation)
          .staggerFrom('.mission__item', 0.4, {opacity: 0, scale: 1.2, x: 80}, 0.15);

      var scene = new ScrollMagic.Scene({
        triggerElement: mission,
        offset: SCENE_OFFSET
      })
          .setTween(missionTween)
          .setClassToggle(label, 'section__label--triggered')
          .addTo(controller);

      if ((location.hostname === 'localhost')) {
        scene.addIndicators();
      }
    };
    var tweenSectionClients = function () {
      var clients = document.querySelector('.clients');
      var label = clients.querySelector('.section__label');

      var clientsTween = new TimelineMax();

      clientsTween
          .from(label, 0.4, labelAnimation)
          .staggerFrom('.clients__item', 0.4, {opacity: 0, y: 70}, 0.15);

      var scene = new ScrollMagic.Scene({
        triggerElement: clients,
        offset: SCENE_OFFSET
      })
          .setTween(clientsTween)
          .setClassToggle(label, 'section__label--triggered')
          .addTo(controller);

      if ((location.hostname === 'localhost')) {
        scene.addIndicators();
      }
    };
    var tweenSectionContacts = function () {
      var contacts = document.querySelector('.contacts');
      var label = contacts.querySelector('.section__label');
      var title = contacts.querySelector('.section__title');

      var clientsTween = new TimelineMax();

      clientsTween
          .from(label, 0.4, labelAnimation)
          .from(title, 0.4, titleAnimation)
          .staggerFrom('.contacts-details__item', 0.4, {opacity: 0, y: 50}, 0.15);

      var scene = new ScrollMagic.Scene({
        triggerElement: contacts,
        offset: SCENE_OFFSET
      })
          .setTween(clientsTween)
          .setClassToggle(label, 'section__label--triggered')
          .addTo(controller);

      if ((location.hostname === 'localhost')) {
        scene.addIndicators();
      }
    };

    tweenSectionFavoritWorks();
    tweenSectionMission();
    tweenSectionClients();
    tweenSectionContacts();
  }

  if (isHasClass('project')) {
    var passProjectLink = function (callback) {
      $('.project-section a').each(function() {
        var container = this.parentElement;

        if ($(this).children('img').length) {
          this.dataset.fancybox = '';
          this.dataset.type = 'image';

          if (!container.classList.contains('project-gallery')) {
            container.classList.add('project-gallery');
          }
        }
      });

      if (typeof callback === 'function') {
        callback();
      }
    };

    passProjectLink(function () {
      $('.project-gallery').each(function () {
        var key = (Math.random() + '').slice(2);
        var name = 'project-gallery';
        $(this).children('a').each(function () {
          this.dataset.fancybox = name + key;
        });
      });
    });

    var projectHeadTween = new TimelineMax();

    projectHeadTween
        .from('.project-head__title', 0.8, {
          y: -100,
          opacity: 0
        }, '+=0.35')
        .from('.project-head__text', 0.7, {
          y: 90,
          opacity: 0,
          ease: Back.easeOut.config(1.2)
        }, '+=0.05')
        .from('.project-head__link-case', 0.7, {
          y: 70,
          opacity: 0,
          ease: Back.easeOut.config(1.7)
        }, '-=0.4');

    var tweenProjectSection = function () {
      var projectSections = document.querySelectorAll('.project-section');

      Array.from(projectSections).forEach(function (projectSection) {
        var projectContentTween = new TimelineMax();
        var label = projectSection.querySelector('.project-section__label');
        var title = projectSection.querySelector('.project-section__title');
        var p = projectSection.querySelectorAll('p');
        var reviewAside = projectSection.querySelector('.project-review__aside');

        if (label) {
          projectContentTween
              .from(label, 0.4, labelAnimation);
        }
        if (title) {
          projectContentTween
              .from(title, 0.4, titleAnimation);
        }
        if (p.length) {
          projectContentTween
              .staggerFrom(p, 0.45, {opacity: 0, y: 50, ease: Back.easeOut.config(1.7)}, 0.3);
        }
        if (reviewAside) {
          projectContentTween
              .from(reviewAside, 0.4, titleAnimation);
        }

        var scene = new ScrollMagic.Scene({
          triggerElement: projectSection,
          offset: SCENE_OFFSET
        })
            .setTween(projectContentTween)
            .setClassToggle(label, 'project-section__label--triggered')
            .addTo(controller);

        if ((location.hostname === 'localhost')) {
          scene.addIndicators();
        }
      });
    };

    tweenProjectSection();
  }


  // Toggle nav

  var navToggler = document.querySelector('.nav-toggler');
  var siteCover = document.querySelector('.site-cover');
  var navTogglerIconItems = navToggler.querySelectorAll('.nav-toggler__icon');
  var scrollPage = 0;

  function toggleTogglerIcons() {
    Array.prototype.forEach.call(navTogglerIconItems, function (item) {
      item.classList.toggle('nav-toggler__icon--hidden');
    });
  }

  function openSiteCover() {
    scrollPage = window.pageYOffset;
    document.body.classList.add('no-scroll');
    siteCover.classList.add('site-cover--opened');
    toggleTogglerIcons();
  }

  function closeSiteCover() {
    document.body.classList.remove('no-scroll');
    siteCover.classList.remove('site-cover--opened');
    window.scrollTo(0, scrollPage);
    toggleTogglerIcons();
  }

  if (navToggler) {
    navToggler.addEventListener('click', function (event) {
      event.preventDefault();
      if (!siteCover.classList.contains('site-cover--opened')) {
        openSiteCover();
      } else {
        closeSiteCover();
      }
    });
  }


  var mainHeaderLogo = document.querySelector('.main-header__logo');
  window.addEventListener('scroll', function () {
    if (pageYOffset !== 0) {
      mainHeaderLogo.classList.add('main-header__logo--mini');
    } else {
      mainHeaderLogo.classList.remove('main-header__logo--mini');
    }
  });


  var clients = document.querySelector('.clients');
  var clinetsListWrapper;
  var bodyWidth;
  var clinetsList;
  var clinetsListWidth;
  var mouseX;
  var k;
  var result;

  if (clients) {
    clinetsListWrapper = clients.querySelector('.clients__list-wrapper');

    if (device.mobile() || device.tablet()) {
      clinetsListWrapper.classList.add('clients__list-wrapper--scroll');
    } else if (device.desktop()) {
      imagesLoaded(clients, function () {
        bodyWidth = document.body.clientWidth;
        clinetsList = clients.querySelector('.clients__list');
        clinetsListWidth = clinetsList.scrollWidth;
        mouseX = 0;
        k = 0;
        result = 0;

        function calcValuesWidths() {
          bodyWidth = document.body.clientWidth;
          clinetsListWidth = clinetsList.scrollWidth;
        }

        function moveDocumentHandler(event) {
          mouseX = event.clientX;
          k = mouseX / bodyWidth;
          result = k * (clinetsListWidth - bodyWidth + 50);
          clinetsList.style.transform = 'translateX(-' + result + 'px)';
        }

        window.addEventListener('mousemove', moveDocumentHandler, false);
        window.addEventListener('resize', function () {
          calcValuesWidths();
        });
      });
    }
  }


  var favoritWorks = document.querySelector('.favorit-works');

  if (favoritWorks) {
    var favoritWorksSlider = favoritWorks.querySelector('.favorit-works__slider');
    var pagerCurrentWorkSlide = favoritWorks.querySelector('.favorit-works__pager-number--current');
    var pagerWorkSlides = favoritWorks.querySelector('.favorit-works__pager-number--all');
    var slidesCount = 0;

    var recalcWorkSlidesInit = function (slick) {
      pagerCurrentWorkSlide.textContent = slick.currentSlide + 1;
      slidesCount = slick.slideCount;
      pagerWorkSlides.textContent = slidesCount;
    };

    var recalcWorkSlidesChange = function (currentSlide, nextSlide) {
      pagerCurrentWorkSlide.textContent = nextSlide + 1;
      pagerWorkSlides.textContent = slidesCount;
    };

    var changeColorControls = function (slick, currentSlide, nextSlide) {
      var currentSlideElement = slick.$slides[nextSlide];
      var workSlide = currentSlideElement.querySelector('.favorit-work-slide');

      if (workSlide.classList.contains('favorit-work-slide--white')) {
        favoritWorks.classList.add('favorit-works--white');
        favoritWorks.classList.remove('favorit-works--black');
      } else if (workSlide.classList.contains('favorit-work-slide--black')) {
        favoritWorks.classList.add('favorit-works--black');
        favoritWorks.classList.remove('favorit-works--white');
      }
    };

    $(favoritWorksSlider).on('init', function (event, slick) {
      recalcWorkSlidesInit(slick);
      changeColorControls(slick, 0, 0);
      // AOS.refresh();
    });

    $(favoritWorksSlider).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      recalcWorkSlidesChange(currentSlide, nextSlide);
      changeColorControls(slick, currentSlide, nextSlide);
      favoritWorksTween.restart();
    });

    $(favoritWorksSlider).slick({
      accessibility: false,
      speed: 800,
      appendDots: '.favorit-works__pager',
      appendArrows: '.favorit-works__controls'
    });
  }
});
