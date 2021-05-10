const header = function() {

  const header_block = document.querySelector('.header');
  const logo_static = header_block.querySelector('.header__logo-static');
  const logo_move = header_block.querySelector('.header__logo-move');
  const menu_button = header_block.querySelector('.header__button');
  const navigation_list = header_block.querySelector('.header__navigation-list');
  const minScrolheight = 1;

  const showLogoMove = function() {
    logo_static.classList.add('header__logo--scrol');
    logo_move.classList.remove('header__logo--scrol');
  }

  const showLogoStatic = function() {
    logo_static.classList.remove('header__logo--scrol');
    logo_move.classList.add('header__logo--scrol');
  }

  const buttonOpenAppirance = function() {
    menu_button.classList.remove('header__button--close');
    menu_button.classList.add('header__button--open');
  }

  const buttonCloseAppirance = function() {
    menu_button.classList.add('header__button--close');
    menu_button.classList.remove('header__button--open');
  }

  const start = function () {
    header_block.classList.remove('header--no-js');
    showLogoStatic();
    buttonOpenAppirance();
    navigation_list.classList.remove('header__navigation-list--open');
  }

  start();

  const scrol = function() {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > minScrolheight) {
        header_block.classList.add('header--scrol');
        showLogoMove();
      } else {
        header_block.classList.remove('header--scrol');
        showLogoStatic();
      }
    });
  }

  scrol();

  menu_button.addEventListener('click', function() {
    if (menu_button.classList.contains('header__button--open')) {
      header_block.classList.add('header--open');
      showLogoMove();
      buttonCloseAppirance();
    } else if (menu_button.classList.contains('header__button--close')) {
      header_block.classList.remove('header--open');
      showLogoStatic();
      buttonOpenAppirance();
    }
  })
}

const tariffs_block = document.querySelector('.tariffs');
const business_tariffs = function() {
  if (!tariffs_block) {
    return;
  }

  const show_tariffs = tariffs_block.querySelector('.tariffs__open-business');
  const hide_tariffs = tariffs_block.querySelector('.tariffs__close-business');
  const tariffs_block_business = tariffs_block.querySelector('.tariffs__business-block');

  show_tariffs.addEventListener('click', function(evt) {
    evt.preventDefault();
    tariffs_block_business.classList.remove('tariffs__business-block--close');
  });

  hide_tariffs.addEventListener('click', function() {
    tariffs_block_business.classList.add('tariffs__business-block--close');
  });
}

const validation = function() {

  const form_check_in = document.querySelector('.check-in');
  if (!form_check_in) {
    return;
  }


  const maliRegEx = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  const submitButton = form_check_in.querySelector('.check-in__button');
  const inputEmail = form_check_in.querySelector('.check-in__input[type="email"]');


  inputEmail.addEventListener('input', function() {
    if (!maliRegEx.test(inputEmail.value)) {
      inputEmail.classList.add('check-in__input--error');
    } else {
      inputEmail.classList.remove('check-in__input--error');
    }
  });

  submitButton.addEventListener ('click', function(evt) {
    if (inputEmail.classList.contains('check-in__input--error')) {
      evt.preventDefault();
    }
  })
}

const map_block = function() {
  if (!document.querySelector('.contacts')) {
    return;
  }

  document.addEventListener('DOMContentLoaded', function() {

    if (document.querySelector('#map')) {
      ymaps.ready(function() {
        var myMap = new ymaps.Map('map', {
          center: [59.938635, 30.323118],
          zoom: 16
        }, {
          searchControlProvider: 'yandex#search'
        }),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {}, {
          iconLayout: 'default#image',
          iconImageHref: 'img/map/map-element/map-pin.svg',
          iconImageSize: [57, 53],
          iconImageOffset: [-25, -45]
        });

        myMap.controls.remove('geolocationControl');
        myMap.controls.remove('searchControl');
        myMap.controls.remove('trafficControl');
        myMap.controls.remove('typeSelector');
        myMap.controls.remove('fullscreenControl');
        myMap.controls.remove('rulerControl');
        myMap.behaviors.disable('scrollZoom');
        myMap.geoObjects.add(myPlacemark);
      });
    }
  })
}

header();

business_tariffs();

validation();

map_block();
