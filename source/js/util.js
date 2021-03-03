'use strict';

(function () {
  var PHONE_CHECK_MSG = 'Введите номер телефона в формате +7(xxx)xxx-xxxx';

  var makePhoneMask = function (phoneInput) {
    var mask = new window.IMask(phoneInput, {
      mask: '+{7}(000)000-0000'
    });
    return mask;
  };

  var checkPhoneValidity = function (input) {
    var result = true;
    var regex = /^\+7\(\d{3}\)\d{3}\-\d{4}$/;

    if (!regex.test(input.value)) {
      result = false;
      input.setCustomValidity(PHONE_CHECK_MSG);
    } else {
      input.setCustomValidity('');
    }
    input.reportValidity();

    return result;
  };

  var startInput = function (input, mask) {
    if (input.value === '') {
      input.value = '+7(';
      mask.updateValue();
    }
  };

  var resetValidity = function (input) {
    input.setCustomValidity('');
    input.reportValidity();
  };

  window.util = {
    makePhoneMask: makePhoneMask,
    checkPhoneValidity: checkPhoneValidity,
    startInput: startInput,
    resetValidity: resetValidity
  };

})();
