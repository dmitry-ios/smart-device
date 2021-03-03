'use strict';

(function () {
  var form = document.querySelector('.feedback__form');
  var phoneInput = document.querySelector('#phone-field');
  var phoneMask = window.util.makePhoneMask(phoneInput);
  var isAvailable = form && phoneInput;

  if (isAvailable) {
    return;
  }

  form.addEventListener('submit', function (evt) {
    if (!window.util.checkPhoneValidity(phoneInput)) {
      evt.preventDefault();
    }
  });

  phoneInput.addEventListener('focus', function () {
    window.util.startInput(phoneInput, phoneMask);
  });

  phoneInput.addEventListener('input', function () {
    window.util.resetValidity(phoneInput);
  });

})();
