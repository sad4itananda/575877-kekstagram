'use strict';

(function () {
  var pinSelector = window.util.scalePinSelector;
  var uploadPinSelector = window.util.imgUploadPreviewSelector;

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

      switch (uploadPinSelector.classList[1]) {
        case 'effects__preview--chrome':
          uploadPinSelector.style.filter = 'grayscale(' + (window.util.scaleValue / window.util.VALUE_MAX) + ')';
          break;
        case 'effects__preview--sepia':
          uploadPinSelector.style.filter = 'sepia(' + (window.util.scaleValue / window.util.VALUE_MAX) + ')';
          break;
        case 'effects__preview--marvin':
          uploadPinSelector.style.filter = 'invert(' + window.util.scaleValue + '%)';
          break;
        case 'effects__preview--phobos':
          uploadPinSelector.style.filter = 'blur(' + (window.util.scaleValue / window.util.VALUE_MAX * 3) + 'px)';
          break;
        case 'effects__preview--heat':
          uploadPinSelector.style.filter = 'brightness(' + (window.util.scaleValue / window.util.VALUE_MAX * 3) + ')';
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
