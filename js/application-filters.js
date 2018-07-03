'use strict';
(function () {
  window.utilParametrs.scalePinSelector.style.left = (window.utilParametrs.scalePinSelector.offsetLeft + window.utilParametrs.SCALE_WIDTH) + 'px';
  window.utilParametrs.scaleLevelSelector.style.width = window.utilParametrs.VALUE_MAX + '%';

  var onScalePinSelectorMousedown = function (evt) {
    evt.preventDefault();
    var startCoords = {
      X: evt.clientX
    };

    var onDocumentMousemove = function (moveEvt) {
      var valuePin = window.utilParametrs.scalePinSelector.offsetLeft;
      moveEvt.preventDefault();
      if (window.utilParametrs.scalePinSelector.offsetLeft <= 0) {
        window.utilParametrs.scalePinSelector.style.left = 0;
      } else if (window.utilParametrs.scalePinSelector.offsetLeft >= window.utilParametrs.SCALE_WIDTH) {
        window.utilParametrs.scalePinSelector.style.left = window.utilParametrs.SCALE_WIDTH + 'px';
      }
      var shift = {
        X: startCoords.X - moveEvt.clientX
      };
      startCoords = {
        X: moveEvt.clientX
      };
      window.utilParametrs.scalePinSelector.style.left = (window.utilParametrs.scalePinSelector.offsetLeft - shift.X) + 'px';
      window.utilParametrs.scaleValue = valuePin * window.utilParametrs.VALUE_MAX / window.utilParametrs.SCALE_WIDTH;
      window.utilParametrs.scaleLevelSelector.style.width = window.utilParametrs.scaleValue + '%';

      switch (window.utilParametrs.imgUploadPreviewSelector.classList[1]) {
        case 'effects__preview--chrome':
          window.utilParametrs.imgUploadPreviewSelector.style.filter = 'grayscale(' + (window.utilParametrs.scaleValue / window.utilParametrs.VALUE_MAX) + ')';
          break;
        case 'effects__preview--sepia':
          window.utilParametrs.imgUploadPreviewSelector.style.filter = 'sepia(' + (window.utilParametrs.scaleValue / window.utilParametrs.VALUE_MAX) + ')';
          break;
        case 'effects__preview--marvin':
          window.utilParametrs.imgUploadPreviewSelector.style.filter = 'invert(' + window.utilParametrs.scaleValue + '%)';
          break;
        case 'effects__preview--phobos':
          window.utilParametrs.imgUploadPreviewSelector.style.filter = 'blur(' + (window.utilParametrs.scaleValue / window.utilParametrs.VALUE_MAX * 3) + 'px)';
          break;
        case 'effects__preview--heat':
          window.utilParametrs.imgUploadPreviewSelector.style.filter = 'brightness(' + (window.utilParametrs.scaleValue / window.utilParametrs.VALUE_MAX * 3) + ')';
          break;
      }
    };

    var onDocumentMouseup = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onDocumentMousemove);
      document.removeEventListener('mouseup', onDocumentMouseup);
    };
    document.addEventListener('mousemove', onDocumentMousemove);
    document.addEventListener('mouseup', onDocumentMouseup);
  };

  window.utilParametrs.scalePinSelector.addEventListener('mousedown', onScalePinSelectorMousedown);

})();
