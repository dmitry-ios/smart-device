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
