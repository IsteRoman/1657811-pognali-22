const header = function() {
  const header_block = document.querySelector('.header');
  const logo_static = header_block.querySelector('.header__logo-static');
  const logo_move = header_block.querySelector('.header__logo-move');
  const menu_button = header_block.querySelector('.header__button');
  const navigation_list = header_block.querySelector('.header__navigation-list');
  const min_scrolheight = 1;

  const show_logo_move = function() {
    logo_static.classList.add('header__logo--scrol');
    logo_move.classList.remove('header__logo--scrol');
  }

  const show_logo_static = function() {
    logo_static.classList.remove('header__logo--scrol');
    logo_move.classList.add('header__logo--scrol');
  }

  const button_open_appirance = function() {
    menu_button.classList.remove('header__button--close');
    menu_button.classList.add('header__button--open');
  }

  const button_close_appirance = function() {
    menu_button.classList.add('header__button--close');
    menu_button.classList.remove('header__button--open');
  }

  const start = function () {
    header_block.classList.remove('header--no-js');
    show_logo_static();
    button_open_appirance();
    navigation_list.classList.remove('header__navigation-list--open');
  }

  start();

  const scrol = function() {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > min_scrolheight) {
        header_block.classList.add('header--scrol');
        show_logo_move();
      } else {
        header_block.classList.remove('header--scrol');
        show_logo_static();
      }
    });
  }

  scrol();

  menu_button.addEventListener('click', function() {
    if (menu_button.classList.contains('header__button--open')) {
      header_block.classList.add('header--open');
      show_logo_move();
      button_close_appirance();
    } else if (menu_button.classList.contains('header__button--close')) {
      header_block.classList.remove('header--open');
      show_logo_static();
      button_open_appirance();
    }
  });
}

const business_tariffs = function() {
  const tariffs_block = document.querySelector('.tariffs');
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

  const mail_reg_ex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  const submit_button = form_check_in.querySelector('.check-in__button');
  const input_email = form_check_in.querySelector('.check-in__input[type="email"]');

  input_email.addEventListener('input', function() {
    if (!mail_reg_ex.test(input_email.value)) {
      input_email.classList.add('check-in__input--error');
    } else {
      input_email.classList.remove('check-in__input--error');
    }
  });

  submit_button.addEventListener ('click', function(evt) {
    if (input_email.classList.contains('check-in__input--error')) {
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

const step_by_step = function() {
  const plans_block = document.querySelector('.plan-add');
    if (!plans_block) {
      return;
    }

  const plans_indicator = plans_block.querySelector('.plan-add__steps-indicator');
  const plans_indicator_item = plans_indicator.getElementsByClassName('plan-add__steps-dotts');
  const button_next_second = plans_block.querySelector('.step-one__button');
  const button_next_third = plans_block.querySelector('.step-second__button');
  const button_back_first = plans_block.querySelector('.step-second__button-back');
  const button_back_second = plans_block.querySelector('.step-three__button-back');
  const country_block = plans_block.querySelector('.step-second__countrys-block');
  const button_select = plans_block.getElementsByClassName('step-second__button-country-cheese');

  const open_menu_step_two = function() {
    country_block.classList.add('step-second__countrys-block--show');
    button_select[2].classList.add('step-second__button-country-cheese--active');
  }

  const close_menu_step_two = function() {
    country_block.classList.remove('step-second__countrys-block--show');
    button_select[2].classList.remove('step-second__button-country-cheese--active');
  }

  const go_second_step = function() {
    button_next_second.addEventListener('click', function() {
      plans_block.classList.add('step-second--visibility');
      open_menu_step_two();
      plans_indicator_item[0].classList.remove('plan-add__steps-dotts--active');
      plans_indicator_item[1].classList.add('plan-add__steps-dotts--active');
    });
  }

  const back_first_step = function() {
    button_back_first.addEventListener('click', function() {
      plans_block.classList.remove('step-second--visibility');
      close_menu_step_two();
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
      open_menu_step_two();
      plans_indicator_item[2].classList.remove('plan-add__steps-dotts--active');
      plans_indicator_item[1].classList.add('plan-add__steps-dotts--active');
    });
  }

  go_second_step();

  back_first_step();

  go_third_step();

  back_second_step();
}

const country_select = function() {
  const step_two = document.querySelector('.step-second');
  if (!step_two) {
    return;
  }

  const button_select = step_two.getElementsByClassName('step-second__button-country-cheese');
  const country_block = step_two.querySelector('.step-second__countrys-block');
  const button_close = step_two.getElementsByClassName('step-second__button-close');

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

  const country_menu_close_by_key = function() {
    window.addEventListener('keydown', function(evt) {
      if (evt.keyCode === 27) {
        button_select[2].classList.remove('step-second__button-country-cheese--active');
        country_block.classList.remove('step-second__countrys-block--show');
      }
    });
  }

  const close_country_menu_by_full_path = function() {
    const country_label = step_two.querySelectorAll('.step-second__radio-label-country');

    const exit_menu = function() {
      button_select[2].classList.remove('step-second__button-country-cheese--active');
      country_block.classList.remove('step-second__countrys-block--show');
    }

    country_label.forEach(function(country_selection) {
      country_selection.addEventListener('click', checkIndex);
    })

    function checkIndex(event) {
      const i = Array.from(country_label).indexOf(event.target);
      button_select[2].innerText = country_label[i].innerText;
      exit_menu();
    }
  }

  open_country_menu();

  close_by_button_country_menu();

  country_menu_close_by_key();

  close_country_menu_by_full_path();
}

const textarea_validation = function () {
  const step_three = document.querySelector('.step-three');
  if (!step_three) {
    return;
  }

  const textarea = step_three.querySelectorAll('.step-three__entertainment-textarea');
  const min_lenght_textarea = 3;
  const button_submit = step_three.querySelector('.plan-add__button-submit');

  const lenght_check = function() {
    Array.prototype.forEach.call(textarea, function(check) {
      check.addEventListener('input', textarea_check)
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

const ipnut_work = function() {
  const step_one = document.querySelector('.step-one');
  if (!step_one) {
    return;
  }
  const button_minus = step_one.querySelectorAll('.step-one__button-minus');
  const button_plus = step_one.querySelectorAll('.step-one__button-plus');
  const min_input_value = 1;
  const max_input_value = 14;
  Array.prototype.forEach.call(button_minus, function(minus) {
    minus.addEventListener('click', dec);
  });

  Array.prototype.forEach.call(button_plus, function(plus) {
    plus.addEventListener('click', inc);
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

const country_filter = function() {
  const country_block = document.querySelector('.filter');
  if (!country_block) {
    return;
  }

  const country_section = country_block.querySelector('.filter__section');
  const button_open_country_filter = country_block.querySelector('.filter__button');

  const remove_no_js_catalog = function() {
    country_block.classList.remove('catalog-no-js');
  }

  const button_open_country_change = function() {
    if (button_open_country_filter.classList.contains('filter__button--close')) {
      button_open_country_filter.classList.remove('filter__button--close');
      button_open_country_filter.classList.add('filter__button--open');
    } else if (button_open_country_filter.classList.contains('filter__button--open')) {
      button_open_country_filter.classList.remove('filter__button--open');
      button_open_country_filter.classList.add('filter__button--close');
    }
  }

  const country_filter_open = function() {
    button_open_country_filter.addEventListener('click', function() {
      country_block.classList.toggle('filter__block-menu--open');
      button_open_country_change();
    });
  }

  const country_filter_close_by_button = function() {
    const button_close_country_filter = country_block.querySelector('.filter__section-button-close');
    button_close_country_filter.addEventListener('click', function() {
      country_block.classList.remove('filter__block-menu--open');
      button_open_country_change();
    });
  }

  const country_filter_close_by_key = function() {
    window.addEventListener('keydown', function(evt) {
      if (evt.keyCode === 27) {
        country_block.classList.remove('filter__block-menu--open');
        button_open_country_change();
      }
    });
  }

  const country_list_show = function() {
    const country_letter_button = country_section.querySelectorAll('.filter__country-table-letter-button');
    Array.prototype.forEach.call(country_letter_button, function(select) {
      select.addEventListener('click', country_items_select)
    });


    function country_items_select() {
      country_item = this.parentElement;
      const country_items = country_section.querySelectorAll('.filter__country-table-item');
      Array.prototype.forEach.call(country_items, function(cleaner) {
      cleaner.classList.remove('filter__country-table-item--active');
      });
      country_item.classList.add('filter__country-table-item--active');
    }
  }

  remove_no_js_catalog();

  country_filter_open();

  country_filter_close_by_button();

  country_filter_close_by_key();

  country_list_show();
}

const partner_select_work = function() {
  const partner_select_block = document.querySelector('.select-partners');
  if (!partner_select_block) {
    return;
  }

  const partner_fieldset = partner_select_block.querySelectorAll('.select-partners__fieldset');
  const partner_fieldset_title = partner_select_block.querySelectorAll('.select-partners__legend');
  const partner_fieldset_button = partner_select_block.querySelectorAll('.select-partners__button');

  const remove_js_partner_select = function() {
    Array.prototype.forEach.call(partner_fieldset, function(clean_no_js) {
      clean_no_js.classList.remove('catalog-no-js');
    });
  }

  const open_partner_select_by_title = function() {
    Array.prototype.forEach.call(partner_fieldset_title, function(title_open) {
      title_open.addEventListener('click', open_by_title)
    });

    function open_by_title() {
      this_fieldset = this.parentElement;
      this_fieldset.classList.toggle('select-partners__fieldset--open');
    }
  }

  const open_partner_select_by_button = function() {
    Array.prototype.forEach.call(partner_fieldset_button, function(button_open) {
      button_open.addEventListener('click', open_by_title)
    });

    function open_by_title() {
      this_fieldset = this.parentElement;
      this_fieldset.classList.toggle('select-partners__fieldset--open');
    }
  }

  remove_js_partner_select();

  open_partner_select_by_title();

  open_partner_select_by_button();
}

const like_button = function() {
  const button_like = document.querySelectorAll('.users-card__button-heart');
  if (!button_like) {
    return;
  }

  Array.prototype.forEach.call(button_like, function(herrt_button) {
    herrt_button.addEventListener('click', put_like)
  });

  function put_like() {
    this.classList.toggle('users-card__button-heart--active');
  }
}

header();

business_tariffs();

validation();

map_block();

step_by_step();

ipnut_work();

country_select();

textarea_validation();

country_filter();

partner_select_work();

like_button();
