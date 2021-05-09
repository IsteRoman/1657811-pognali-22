const header = function() {

  const header_block = document.querySelector('.header');
  const logo_static = document.querySelector('.header__logo-static');
  const logo_move = document.querySelector('.header__logo-move');
  const menu_button = document.querySelector('.header__button');
  const navigation_block = document.querySelector('.header__navigation-block');
  const navigation_list = document.querySelector('.header__navigation-list');
  const header_out_trail = document.querySelector('.header__out-trail');

  const start = function () {
    header_block.classList.remove('header--no-js');
    logo_static.classList.remove('header__logo--scrol');
    logo_move.classList.add('header__logo--scrol');
    menu_button.classList.remove('header__button--close');
    menu_button.classList.add('header__button--open');
    navigation_list.classList.remove('header__navigation-list--open');
  }

  start();

  const scrol = function() {
    window.addEventListener('scroll', function(evt) {
      if (window.pageYOffset > 1) {
        header_block.classList.add('header--scrol');
        logo_static.classList.add('header__logo--scrol');
      logo_move.classList.remove('header__logo--scrol');
      } else if (window.pageYOffset < 1) {
        header_block.classList.remove('header--scrol');
        logo_static.classList.remove('header__logo--scrol');
      logo_move.classList.add('header__logo--scrol');
      }
    });
  }

  scrol();

  menu_button.addEventListener('click', function() {
    if (menu_button.classList.contains('header__button--open')) {
      header_block.classList.add('header--open');
      logo_static.classList.add('header__logo--scrol');
      logo_move.classList.remove('header__logo--scrol');
      menu_button.classList.remove('header__button--open');
      menu_button.classList.add('header__button--close');
      navigation_block.classList.add('header__navigation-block--open');
      navigation_list.classList.add('header__navigation-list--open');
      header_out_trail.classList.add('header__out-trail--hidden');
    } else if (menu_button.classList.contains('header__button--close')) {
      header_block.classList.remove('header--open');
      logo_static.classList.remove('header__logo--scrol');
      logo_move.classList.add('header__logo--scrol');
      menu_button.classList.add('header__button--open');
      menu_button.classList.remove('header__button--close');
      navigation_block.classList.remove('header__navigation-block--open');
      navigation_list.classList.remove('header__navigation-list--open');
      header_out_trail.classList.remove('header__out-trail--hidden');
    }
  })
}




const business_tariffs = function() {
  if (!document.querySelector('.tariffs')) {
    return;
  }

  const show_tariffs = document.querySelector('.tariffs__open-business');
  const hide_tariffs = document.querySelector('.tariffs__close-business');
  const tariffs_block_business = document.querySelector('.tariffs__business-block');

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
  const submitButton = document.querySelector('.check-in__button');
  const inputEmail = document.querySelector('.check-in__input[type="email"]');


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
        myMap.geoObjects.add(myPlacemark);
      });
    }
  })
}

header();

business_tariffs();

validation();

map_block();
