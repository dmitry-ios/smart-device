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

'use strict';

(function () {
  var callButton = document.querySelector('.js-call');
  var modalForm = document.querySelector('.modal-form');
  var closeButton = document.querySelector('.js-modal-close-button');
  var wrapperForm = document.querySelector('.modal-form__wrapper');
  var usernameInput = document.querySelector('.js-username');
  var phoneInput = document.querySelector('.js-phone');
  var questionText = document.querySelector('.js-question');
  var form = document.querySelector('.modal-form__form');

  var isAvailable = callButton
        && modalForm
        && closeButton
        && wrapperForm
        && usernameInput
        && phoneInput
        && questionText
        && form;

  var isLocalStorageSupport = true;
  var usernameValue = '';
  var phoneValue = '';
  var questionValue = '';

  if (!isAvailable) {
    return;
  }

  var phoneMask = window.util.makePhoneMask(phoneInput);

  try {
    usernameValue = localStorage.getItem('username');
    phoneValue = localStorage.getItem('phone');
    questionValue = localStorage.getItem('question');
  } catch (error) {
    isLocalStorageSupport = false;
  }

  var onCloseModal = function () {
    document.body.classList.remove('page__body--fullscreen');
    modalForm.classList.remove('modal-form--open');

    closeButton.removeEventListener('click', onCloseModal);
    window.removeEventListener('keydown', onEscapeKeyPress);
    modalForm.removeEventListener('click', onCloseModal);
    wrapperForm.removeEventListener('click', onWrapperClick);
  };

  var onEscapeKeyPress = function (evt) {
    var escKey = 27;
    if (evt.keyCode === escKey) {
      onCloseModal();
    }
  };

  var onWrapperClick = function (evt) {
    evt.stopPropagation();
  };

  callButton.addEventListener('click', function (evt) {
    evt.preventDefault();

    document.body.classList.add('page__body--fullscreen');
    modalForm.classList.add('modal-form--open');

    closeButton.addEventListener('click', onCloseModal);
    window.addEventListener('keydown', onEscapeKeyPress);
    modalForm.addEventListener('click', onCloseModal);

    wrapperForm.addEventListener('click', onWrapperClick);

    usernameInput.value = usernameValue;
    phoneInput.value = phoneValue;
    phoneMask.updateValue();
    questionText.value = questionValue;
    usernameInput.focus();
  });

  form.addEventListener('submit', function (evt) {
    if (!window.util.checkPhoneValidity(phoneInput)) {
      evt.preventDefault();
    }

    if (isLocalStorageSupport) {
      localStorage.setItem('username', usernameInput.value);
      localStorage.setItem('phone', phoneInput.value);
      localStorage.setItem('question', questionText.value);
      window.util.resetValidity(usernameInput);
      window.util.resetValidity(phoneInput);
      window.util.resetValidity(questionText);
    }
  });

  phoneInput.addEventListener('focus', function () {
    window.util.startInput(phoneInput, phoneMask);
  });

  phoneInput.addEventListener('input', function () {
    window.util.resetValidity(phoneInput);
  });
})();

'use strict';

(function () {
  var MAX_SYMBOLS = 211;
  var ENDING_SYMBOLS = '..';
  var BREAKPOINT = 1024;

  var text = document.querySelector('.about-us__text--less');
  var originText = text && text.textContent;
  var isLess = false;

  var setupText = function (width) {
    if (!originText) {
      return;
    }

    if (width >= BREAKPOINT) {
      if (isLess) {
        text.textContent = originText;
        isLess = false;
      }
      return;
    }

    if (!isLess && text.textContent.length > MAX_SYMBOLS) {
      var newText = text.textContent.slice(0, MAX_SYMBOLS);
      text.textContent = newText.trim().concat(ENDING_SYMBOLS);
      isLess = true;
    }
  };

  setupText(window.innerWidth);

  window.addEventListener('resize', function () {
    setupText(window.innerWidth);
  });
})();

'use strict';

(function () {
  var form = document.querySelector('.feedback__form');
  var phoneInput = document.querySelector('#phone-field');
  var phoneMask = window.util.makePhoneMask(phoneInput);
  var isAvailable = form && phoneInput;

  if (!isAvailable) {
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

'use strict';

(function () {
  var blocks = document.querySelectorAll('.accordion');

  var closeOthers = function (block) {
    for (var i = 0; i < blocks.length; ++i) {
      if (blocks[i].classList.contains('accordion--closed')) {
        continue;
      }

      if (blocks[i] === block) {
        continue;
      }

      blocks[i].classList.add('accordion--closed');
    }
  };

  var toggleBlock = function (block) {
    var btn = block.querySelector('h2');

    btn.addEventListener('click', function () {
      closeOthers(block);
      block.classList.toggle('accordion--closed');
    });
  };

  for (var i = 0; i < blocks.length; ++i) {
    var currentBlock = blocks[i];

    currentBlock.classList.remove('accordion--nojs');

    toggleBlock(currentBlock);
  }
})();
