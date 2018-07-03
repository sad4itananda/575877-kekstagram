'use strict';

(function () {
  var uploadFormSelector = document.querySelector('#upload-file');
  var buttonCancelFormSelector = document.querySelector('#upload-cancel');
  var effectsListSelector = document.querySelector('.effects__list');
  var pictureCanselSelector = document.querySelector('#picture-cancel');
  var imgUploadScaleSelector = document.querySelector('.img-upload__scale');
  var imgUploadOverlaySelector = document.querySelector('.img-upload__overlay');
  var bigPictureSelector = document.querySelector('.big-picture');
  var bigPictureImgSelector = document.querySelector('.big-picture__img img');

  var onUploadFormSelectorChange = function () {document.querySelector('.img-upload__overlay').classList.remove('hidden');
  };

  var onButtonCancelFormSelectorClick = function () {document.querySelector('.img-upload__overlay').classList.add('hidden');
  };

  var onDocumentKeydown = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      imgUploadOverlaySelector.classList.add('hidden');
      bigPictureSelector.classList.add('hidden');
    }
  };

  var onEffectsListSelectorClick = function (evt) {
    window.util.scalePinSelector.style.left = window.util.SCALE_WIDTH + 'px';
    window.util.scaleLevelSelector.style.width = window.util.VALUE_MAX + '%';

    var swichImgUploadPreviewClass = function (className) {
      if (window.util.imgUploadPreviewSelector.classList.length === 1) {
        window.util.imgUploadPreviewSelector.classList.add(className);
      } else {
        window.util.imgUploadPreviewSelector.classList.replace(window.util.imgUploadPreviewSelector.classList[1], className);
      }
    };
    switch (evt.target.id) {
      case 'effect-none':
        window.util.imgUploadPreviewSelector.style.filter = '';
        swichImgUploadPreviewClass('effects__preview--none');
        imgUploadScaleSelector.classList.add('hidden');
        break;
      case 'effect-chrome':
        window.util.imgUploadPreviewSelector.style.filter = 'grayscale(' + 1 + ')';
        swichImgUploadPreviewClass('effects__preview--chrome');
        imgUploadScaleSelector.classList.remove('hidden');
        break;
      case 'effect-sepia':
        window.util.imgUploadPreviewSelector.style.filter = 'sepia(' + 1 + ')';
        swichImgUploadPreviewClass('effects__preview--sepia');
        imgUploadScaleSelector.classList.remove('hidden');
        break;
      case 'effect-marvin':
        window.util.imgUploadPreviewSelector.style.filter = 'invert(' + window.util.VALUE_MAX + '%)';
        swichImgUploadPreviewClass('effects__preview--marvin');
        imgUploadScaleSelector.classList.remove('hidden');
        break;
      case 'effect-phobos':
        window.util.imgUploadPreviewSelector.style.filter = 'blur(' + 3 + 'px)';
        swichImgUploadPreviewClass('effects__preview--phobos');
        imgUploadScaleSelector.classList.remove('hidden');
        break;
      case 'effect-heat':
        window.util.imgUploadPreviewSelector.style.filter = 'brightness(' + 3 + ')';
        swichImgUploadPreviewClass('effects__preview--heat');
        imgUploadScaleSelector.classList.remove('hidden');
        break;
    }
  };

  var onDocumentPicturesSelectorClick = function (evt) {
    if (evt.target.className === 'picture__img') {
      var index = evt.target.getAttribute('data-id');
      bigPictureImgSelector.src = window.photos[index].url;
      window.util.showBigPicture();
      window.util.initBigPictureData(window.photos[index]);
      window.util.getComment(window.photos[index]);
    }
  };

  var onPictureCanselSelectorClick = function () {document.querySelector('.big-picture').classList.add('hidden');
  };

  imgUploadScaleSelector.classList.add('hidden');
  pictureCanselSelector.addEventListener('click', onPictureCanselSelectorClick);
  uploadFormSelector.addEventListener('change', onUploadFormSelectorChange);
  buttonCancelFormSelector.addEventListener('click', onButtonCancelFormSelectorClick);
  document.addEventListener('keydown', onDocumentKeydown);
  effectsListSelector.addEventListener('click', onEffectsListSelectorClick);
  document.addEventListener('click', onDocumentPicturesSelectorClick);
})();
