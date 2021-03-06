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

  var isAvailable = modalForm
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

  var prepareInputs = function () {
    if (usernameValue !== null) {
      usernameInput.value = usernameValue;
    }
    if (phoneValue !== null) {
      phoneInput.value = phoneValue;
      phoneMask.updateValue();
    }
    questionText.value = questionValue;
    usernameInput.focus();
  };

  if (callButton) {
    callButton.addEventListener('click', function (evt) {
      evt.preventDefault();

      document.body.classList.add('page__body--fullscreen');
      modalForm.classList.add('modal-form--open');

      if (closeButton) {
        closeButton.addEventListener('click', onCloseModal);
      }

      window.addEventListener('keydown', onEscapeKeyPress);
      modalForm.addEventListener('click', onCloseModal);

      wrapperForm.addEventListener('click', onWrapperClick);

      prepareInputs();
    });
  } else {
    prepareInputs();
  }

  form.addEventListener('submit', function (evt) {
    if (!window.util.checkPhoneValidity(phoneInput)) {
      evt.preventDefault();
    }

    if (isLocalStorageSupport) {
      localStorage.setItem('username', usernameInput.value);
      localStorage.setItem('phone', phoneInput.value);
      localStorage.setItem('question', questionText.value);
    }
  });

  phoneInput.addEventListener('focus', function () {
    window.util.startInput(phoneInput, phoneMask);
  });

  phoneInput.addEventListener('input', function () {
    window.util.resetValidity(phoneInput);
  });
})();
