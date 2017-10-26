'use strict';

document.addEventListener('DOMContentLoaded', function () {
  svg4everybody();

  var SCENE_OFFSET = -160;
  var controller = new ScrollMagic.Controller();
  var animations = {
    tween1: {
      opacity: 0,
      y: 100
    }
  };

  var isBodyHasClass = function (classString) {
    return document.body.classList.contains(classString);
  };

  var createPageGallery = function (callback) {
    $('.page-section a').each(function () {
      var container = this.parentElement;

      if ($(this).children('img').length) {
        this.dataset.fancybox = '';
        this.dataset.type = 'image';

        if (!container.classList.contains('page-gallery')) {
          container.classList.add('page-gallery');
        }
      }
    });

    if (typeof callback === 'function') {
      callback();
    }
  };

  var tweenElements = function (config) {
    var triggerSelector = config.triggerSelector;
    var childrenSelectors = config.childrenSelectors;
    var toggleClass = config.toggleClass;

    var triggerBoxes = document.querySelectorAll(triggerSelector);

    Array.from(triggerBoxes).forEach(function (triggerBox) {
      var animateElements = triggerBox.querySelectorAll(childrenSelectors.join(', '));
      var tl = new TimelineMax();

      tl.staggerFrom(animateElements, 0.45, animations.tween1, 0.25);

      var scene = new ScrollMagic.Scene({
        triggerElement: triggerBox,
        offset: SCENE_OFFSET
      })
        .setTween(tl)
        .addTo(controller);

      if (typeof toggleClass !== 'undefined') {
        scene.setClassToggle(triggerSelector + '.' + toggleClass, toggleClass + '--triggered');
      }

      if ((location.hostname === 'localhost')) {
        scene.addIndicators();
      }
    });
  };

  var addGalleryAtrs = function (gallery) {
    var key = (Math.random() + '').slice(2);
    var name = 'page-gallery';
    var galleryLinks = gallery.querySelectorAll('a');

    Array.from(galleryLinks).forEach(function (link) {
      link.dataset.fancybox = name + key;
    });
  };

  if (isBodyHasClass('home')) {
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

    tweenElements({
      triggerSelector: '.favorit-works',
      childrenSelectors: ['.section__label'],
      toggleClass: 'section'
    });
    tweenElements({
      triggerSelector: '.mission',
      childrenSelectors: ['.section__label', '.section__title', 'li', 'p'],
      toggleClass: 'section'
    });
    tweenElements({
      triggerSelector: '.clients',
      childrenSelectors: ['.section__label', '.section__title', 'li', 'p'],
      toggleClass: 'section'
    });
    tweenElements({
      triggerSelector: '.contacts',
      childrenSelectors: ['.section__label', '.section__title', '.contacts-details__item'],
      toggleClass: 'section'
    });
  }

  if (isBodyHasClass('project')) {
    createPageGallery(function () {
      var pageGalleries = document.querySelectorAll('.page-gallery');

      Array.from(pageGalleries).forEach(addGalleryAtrs);
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
  }

  if (isBodyHasClass('page')) {
    var pageHeadTween = new TimelineMax();

    pageHeadTween
      .from('.page-head__title', 0.8, {
        y: -100,
        opacity: 0
      }, '+=0.35');
  }

  if (isBodyHasClass('project') || isBodyHasClass('page')) {
    tweenElements({
      triggerSelector: '.page-section',
      childrenSelectors: ['.page-section__label', '.page-section__title', 'p', '.page-gallery > a', 'blockquote', '.project-review__aside'],
      toggleClass: 'page-section'
    });
  }


  // Filter

  function getHashFilter() {
    var hash = location.hash;
    // get filter=filterName
    var matches = location.hash.match(/filter=([^&]+)/i);
    var hashFilter = matches && matches[1];

    if (!hashFilter) {
      return '*';
    }
    return hashFilter && decodeURIComponent(hashFilter);
  }

  var $filter = $('.filter');

  if ($filter.length) {
    var $grid = $('.cards');
    var $filters = $filter.on('click', 'a', function (event) {
      event.preventDefault();
      var filterAttr = $(this).data('filter');
      // set filter in hash
      location.hash = 'filter=' + encodeURIComponent(filterAttr);
    });

    var isIsotopeInit = false;
    onHashchange();

    $(window).on('hashchange', onHashchange);
  }

  // bind filter button click
  function onHashchange() {
    var hashFilter = getHashFilter();
    hashFilter = (hashFilter != '*') ? hashFilter : 'all';
    if (!hashFilter && isIsotopeInit) {
      return;
    }
    isIsotopeInit = true;
    // filter isotope
    $grid.isotope({
      itemSelector: '.all',
      filter: '.' + hashFilter
    });
    // set selected class on button
    if (hashFilter) {
      $filters.find('.filter__options-item--active').removeClass('filter__options-item--active');
      $filters.find('[data-filter="' + hashFilter + '"]').closest('li').addClass('filter__options-item--active');
    }
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
