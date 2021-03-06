'use strict';

(function () {
  var form = document.querySelector('.feedback__form');
  var phoneInput = document.querySelector('#phone-field');
  var isAvailable = form && phoneInput;

  if (!isAvailable) {
    return;
  }

  var phoneMask = window.util.makePhoneMask(phoneInput);

  form.addEventListener('submit', function (evt) {
    if (!window.util.checkPhoneValidity(phoneInput)) {
      evt.preventDefault();
    }
  });

  phoneInput.addEventListener('focus', function () {
    if (phoneMask !== null) {
      window.util.startInput(phoneInput, phoneMask);
    }
  });

  phoneInput.addEventListener('input', function () {
    window.util.resetValidity(phoneInput);
  });

})();
