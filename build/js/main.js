'use strict';

(function () {
  return;
})();

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
    var btn = block.querySelector('button');

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
