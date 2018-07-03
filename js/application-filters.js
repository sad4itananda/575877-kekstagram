'use strict';

(function () {
  var pinSelector = window.util.scalePinSelector;
  pinSelector.style.left = (pinSelector.offsetLeft + window.util.SCALE_WIDTH) + 'px';
  window.util.scaleLevelSelector.style.width = window.util.VALUE_MAX + '%';

  var onScalePinSelectorMousedown = function (evt) {
    evt.preventDefault();
    var startCoords = {
      X: evt.clientX
    };

    var onDocumentMousemove = function (moveEvt) {
      var valuePin = pinSelector.offsetLeft;
      moveEvt.preventDefault();
      if (pinSelector.offsetLeft <= 0) {
        pinSelector.style.left = 0;
      } else if (pinSelector.offsetLeft >= window.util.SCALE_WIDTH) {
        pinSelector.style.left = window.util.SCALE_WIDTH + 'px';
      }
      var shift = {
        X: startCoords.X - moveEvt.clientX
      };
      startCoords = {
        X: moveEvt.clientX
      };
      pinSelector.style.left = (pinSelector.offsetLeft - shift.X) + 'px';
      window.util.scaleValue = valuePin * window.util.VALUE_MAX / window.util.SCALE_WIDTH;
      window.util.scaleLevelSelector.style.width = window.util.scaleValue + '%';

      switch (window.util.imgUploadPreviewSelector.classList[1]) {
        case 'effects__preview--chrome':
          window.util.imgUploadPreviewSelector.style.filter = 'grayscale(' + (window.util.scaleValue / window.util.VALUE_MAX) + ')';
          break;
        case 'effects__preview--sepia':
          window.util.imgUploadPreviewSelector.style.filter = 'sepia(' + (window.util.scaleValue / window.util.VALUE_MAX) + ')';
          break;
        case 'effects__preview--marvin':
          window.util.imgUploadPreviewSelector.style.filter = 'invert(' + window.util.scaleValue + '%)';
          break;
        case 'effects__preview--phobos':
          window.util.imgUploadPreviewSelector.style.filter = 'blur(' + (window.util.scaleValue / window.util.VALUE_MAX * 3) + 'px)';
          break;
        case 'effects__preview--heat':
          window.util.imgUploadPreviewSelector.style.filter = 'brightness(' + (window.util.scaleValue / window.util.VALUE_MAX * 3) + ')';
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

  pinSelector.addEventListener('mousedown', onScalePinSelectorMousedown);

})();
