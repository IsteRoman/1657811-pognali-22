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

const form_page = function() {
  const plans_block = document.querySelector('.plan-add');
  if (!plans_block) {
    return;
  }

  const plans_indicator = plans_block.querySelector('.plan-add__steps-indicator');
  const plans_indicator_item = plans_indicator.getElementsByClassName('plan-add__steps-dotts');
  const button_minus = plans_block.querySelectorAll('.step-one__button-minus');
  const button_plus = plans_block.querySelectorAll('.step-one__button-plus');

  const form_start = function() {
    plans_block.classList.remove('no-js-form');
  }

  const step_by_step = function() {
    const button_next_second = plans_block.querySelector('.step-one__button');
    const button_next_third = plans_block.querySelector('.step-second__button');
    const button_back_first = plans_block.querySelector('.step-second__button-back');
    const button_back_second = plans_block.querySelector('.step-three__button-back');

    const go_second_step = function() {
      button_next_second.addEventListener('click', function() {
        plans_block.classList.remove('step-one--visibility');
        plans_block.classList.add('step-second--visibility');
        plans_indicator_item[0].classList.remove('plan-add__steps-dotts--active');
        plans_indicator_item[1].classList.add('plan-add__steps-dotts--active');
      });
    }

    const back_first_step = function() {
      button_back_first.addEventListener('click', function() {
        plans_block.classList.remove('step-second--visibility');
        plans_block.classList.add('step-one--visibility');
        plans_indicator_item[1].classList.remove('plan-add__steps-dotts--active');
        plans_indicator_item[0].classList.add('plan-add__steps-dotts--active');
      });
    }

    const go_third_step = function() {
      button_next_third.addEventListener('click', function() {
        plans_block.classList.remove('step-second--visibility');
        plans_block.classList.add('step-three--visibility');
        plans_indicator_item[1].classList.remove('plan-add__steps-dotts--active');
        plans_indicator_item[2].classList.add('plan-add__steps-dotts--active');
      });
    }

    const back_second_step = function() {
      button_back_second.addEventListener('click', function() {
        plans_block.classList.remove('step-three--visibility');
        plans_block.classList.add('step-second--visibility');
        plans_indicator_item[2].classList.remove('plan-add__steps-dotts--active');
        plans_indicator_item[1].classList.add('plan-add__steps-dotts--active');
      });
    }

    go_second_step();

    back_first_step();

    go_third_step();

    back_second_step();
  }

  const ipnut_work = function() {
    const min_input_value = 1;
    const max_input_value = 14;
    Array.prototype.forEach.call(button_minus, function(v) {
      v.addEventListener('click', dec);
    });

    Array.prototype.forEach.call(button_plus, function(v) {
      v.addEventListener('click', inc);
    });

    function dec() {
      var div = this.parentElement;
      var input = div.children.item(2)
      if (input.value > min_input_value) {
        input.setAttribute('value', (parseInt(input.getAttribute('value')) - 1).toString());
      } else {
        button_minus.setAttribute('disabled');
      }
    }

    function inc() {
      var div = this.parentElement;
      var input = div.children.item(2)
      if (input.value < max_input_value) {
        input.setAttribute('value', (parseInt(input.getAttribute('value')) + 1).toString());
      } else {
        button_plus.setAttribute('disabled');
      }
    }
  }

  const country_select = function() {
    const button_select = plans_block.getElementsByClassName('step-second__button-country-cheese');
    const country_block = plans_block.querySelector('.step-second__countrys-block');
    const button_close = plans_block.getElementsByClassName('step-second__button-close');

    const open_country_menu = function() {
      button_select[2].addEventListener('click', function() {
        country_block.classList.add('step-second__countrys-block--show');
        button_select[2].classList.add('step-second__button-country-cheese--active');
      });
    }

    const close_by_button_country_menu = function() {
      button_close[2].addEventListener('click', function() {
        button_select[2].classList.remove('step-second__button-country-cheese--active');
        country_block.classList.remove('step-second__countrys-block--show');
      })
    }

    const close_country_menu_by_full_path = function() {
      const country_label = plans_block.querySelectorAll('.step-second__radio-label-country');
      const country_label_value = plans_block.querySelectorAll('.step-second__radio-country');

      const exit_menu = function() {
        button_select[2].classList.remove('step-second__button-country-cheese--active');
        country_block.classList.remove('step-second__countrys-block--show');
      }

      country_label.forEach(function(v) {
        v.addEventListener('click', checkIndex);
      })

      function checkIndex(event) {
        const i = Array.from(country_label).indexOf(event.target);
        button_select[2].innerText = country_label[i].innerText;
        exit_menu();
      }
    }

    open_country_menu();

    close_by_button_country_menu();

    close_country_menu_by_full_path();
  }

  const textarea_validation = function () {

    const textarea = plans_block.querySelectorAll('.step-three__entertainment-textarea');
    const min_lenght_textarea = 3;
    const button_submit = plans_block.querySelector('.plan-add__button-submit');

    const lenght_check = function() {
      Array.prototype.forEach.call(textarea, function(k) {
        k.addEventListener('input', textarea_check)
      });

      function textarea_check() {
        const textarea_block = this.parentElement;
        if (this.value.length < min_lenght_textarea) {
          textarea_block.classList.add('step-three__entertainment-item--error');
          button_submit.setAttribute('disabled', 'disabled');
        } else if (this.value.length > min_lenght_textarea) {
          textarea_block.classList.remove('step-three__entertainment-item--error');
          button_submit.removeAttribute('disabled', 'disabled');
        }
      }
    }

    lenght_check();
  }

  form_start();

  step_by_step();

  ipnut_work();

  country_select();

  textarea_validation();

}

header();

business_tariffs();

validation();

map_block();

form_page();
