'use strict';
(function (){
  utilParametrs.scalePinSelector.style.left = (utilParametrs.scalePinSelector.offsetLeft + utilParametrs.SCALE_WIDTH) + 'px';
  utilParametrs.scaleLevelSelector.style.width = utilParametrs.VALUE_MAX + '%';

  var onScalePinSelectorMousedown = function (evt) {
    evt.preventDefault();
    var startCoords = {
      X: evt.clientX
    };

    var onDocumentMousemove = function (moveEvt) {
      var valuePin = utilParametrs.scalePinSelector.offsetLeft;
      moveEvt.preventDefault();
      if (utilParametrs.scalePinSelector.offsetLeft <= 0) {
        utilParametrs.scalePinSelector.style.left = 0;
      } else if (utilParametrs.scalePinSelector.offsetLeft >= utilParametrs.SCALE_WIDTH) {
        utilParametrs.scalePinSelector.style.left = utilParametrs.SCALE_WIDTH + 'px';
      }
      var shift = {
        X: startCoords.X - moveEvt.clientX
      };
      startCoords = {
        X: moveEvt.clientX
      };
      utilParametrs.scalePinSelector.style.left = (utilParametrs.scalePinSelector.offsetLeft - shift.X) + 'px';
      utilParametrs.scaleValue = valuePin * utilParametrs.VALUE_MAX / utilParametrs.SCALE_WIDTH;
      utilParametrs.scaleLevelSelector.style.width = utilParametrs.scaleValue + '%';

      switch (utilParametrs.imgUploadPreviewSelector.classList[1]) {
        case 'effects__preview--chrome':
        utilParametrs.imgUploadPreviewSelector.style.filter = 'grayscale(' + (utilParametrs.scaleValue / utilParametrs.VALUE_MAX) + ')';
        break;
        case 'effects__preview--sepia':
        utilParametrs.imgUploadPreviewSelector.style.filter = 'sepia(' + (utilParametrs.scaleValue / utilParametrs.VALUE_MAX) + ')';
        break;
        case 'effects__preview--marvin':
        utilParametrs.imgUploadPreviewSelector.style.filter = 'invert(' + utilParametrs.scaleValue + '%)';
        break;
        case 'effects__preview--phobos':
        utilParametrs.imgUploadPreviewSelector.style.filter = 'blur(' + (utilParametrs.scaleValue / utilParametrs.VALUE_MAX * 3) + 'px)';
        break;
        case 'effects__preview--heat':
        utilParametrs.imgUploadPreviewSelector.style.filter = 'brightness(' + (utilParametrs.scaleValue / utilParametrs.VALUE_MAX * 3) + ')';
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

  utilParametrs.scalePinSelector.addEventListener('mousedown', onScalePinSelectorMousedown);

})();
