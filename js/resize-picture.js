'use strict';

(function () {
  var MIN_SIZE_PICTURE = 25;
  var MAX_SIZE_PICTURE = 100;
  var resizeMinusSelector = document.querySelector('.resize__control--minus');
  var resizePlusSelector = document.querySelector('.resize__control--plus');
  var resizeValueSelector = document.querySelector('.resize__control--value');
  var valueResize = MAX_SIZE_PICTURE;
  resizeValueSelector.value = MAX_SIZE_PICTURE + ' %';

  var onResizeMinusSelectorClick = function () {
    if (valueResize !== MIN_SIZE_PICTURE) {
      valueResize -= MIN_SIZE_PICTURE;
      resizeValueSelector.value = valueResize + ' %';
      window.util.imgUploadPreviewSelector.style.transform = 'scale(' + valueResize / MAX_SIZE_PICTURE + ')';
    }
  };

  var onResizePlusSelectorClick = function () {
    if (valueResize !== MAX_SIZE_PICTURE) {
      valueResize += MIN_SIZE_PICTURE;
      resizeValueSelector.value = valueResize + ' %';
      window.util.imgUploadPreviewSelector.style.transform = 'scale(' + valueResize / MAX_SIZE_PICTURE + ')';
    }
  };

  resizeMinusSelector.addEventListener('click', onResizeMinusSelectorClick);
  resizePlusSelector.addEventListener('click', onResizePlusSelectorClick);
})();
