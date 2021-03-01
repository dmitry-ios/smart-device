'use strict';

(function () {
  var MAX_SYMBOLS = 211;
  var ENDING_SYMBOLS = '..';
  var BREAKPOINT = 1024;

  var text = document.querySelector('.about-us__text--less');
  var originText = text && text.textContent;

  var setupText = function (width) {
    if (!originText) {
      return;
    }

    if (width >= BREAKPOINT) {
      text.textContent = originText;
      return;
    }

    if (text.textContent.length > MAX_SYMBOLS) {
      var newText = text.textContent.slice(0, MAX_SYMBOLS);
      text.textContent = newText.trim().concat(ENDING_SYMBOLS);
    }
  };

  setupText(window.innerWidth);

  window.addEventListener('resize', function () {
    setupText(window.innerWidth);
  });
})();
