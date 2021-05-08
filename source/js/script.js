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

business_tariffs();

validation();

map_block();
