'use strict';
(function () {
  var uploadFormSelector = document.querySelector('#upload-file');
  var buttonCancelFormSelector = document.querySelector('#upload-cancel');

  var effectsListSelector = document.querySelector('.effects__list');
  var pictureCanselSelector = document.querySelector('#picture-cancel');
  var imgUploadScaleSelector = document.querySelector('.img-upload__scale');
  imgUploadScaleSelector.classList.add('hidden');
  var onUploadFormSelectorChange = function () {
    document.querySelector('.img-upload__overlay')
    .classList.remove('hidden');
  };

  var onButtonCancelFormSelectorClick = function () {
    document.querySelector('.img-upload__overlay')
    .classList.add('hidden');
  };

  var onDocumentKeydown = function (evt) {
    if (evt.keyCode === window.utilParametrs.ESC_KEYCODE) {
      document.querySelector('.img-upload__overlay').classList.add('hidden');
      document.querySelector('.big-picture').classList.add('hidden');
    }
  };

  var onEffectsListSelectorClick = function (evt) {
    window.utilParametrs.scalePinSelector.style.left = window.utilParametrs.SCALE_WIDTH + 'px';
    window.utilParametrs.scaleLevelSelector.style.width = window.utilParametrs.VALUE_MAX + '%';

    var swichImgUploadPreviewClass = function (className) {
      if (window.utilParametrs.imgUploadPreviewSelector.classList.length === 1) {
        window.utilParametrs.imgUploadPreviewSelector.classList.add(className);
      } else {
        window.utilParametrs.imgUploadPreviewSelector.classList.replace(window.utilParametrs.imgUploadPreviewSelector.classList[1], className);
      }
    };
    switch (evt.target.id) {
      case 'effect-none':
        window.utilParametrs.imgUploadPreviewSelector.style.filter = '';
        swichImgUploadPreviewClass('effects__preview--none');
        imgUploadScaleSelector.classList.add('hidden');
        break;
      case 'effect-chrome':
        window.utilParametrs.imgUploadPreviewSelector.style.filter = 'grayscale(' + 1 + ')';
        swichImgUploadPreviewClass('effects__preview--chrome');
        imgUploadScaleSelector.classList.remove('hidden');
        break;
      case 'effect-sepia':
        window.utilParametrs.imgUploadPreviewSelector.style.filter = 'sepia(' + 1 + ')';
        swichImgUploadPreviewClass('effects__preview--sepia');
        imgUploadScaleSelector.classList.remove('hidden');
        break;
      case 'effect-marvin':
        window.utilParametrs.imgUploadPreviewSelector.style.filter = 'invert(' + window.utilParametrs.VALUE_MAX + '%)';
        swichImgUploadPreviewClass('effects__preview--marvin');
        imgUploadScaleSelector.classList.remove('hidden');
        break;
      case 'effect-phobos':
        window.utilParametrs.imgUploadPreviewSelector.style.filter = 'blur(' + 3 + 'px)';
        swichImgUploadPreviewClass('effects__preview--phobos');
        imgUploadScaleSelector.classList.remove('hidden');
        break;
      case 'effect-heat':
        window.utilParametrs.imgUploadPreviewSelector.style.filter = 'brightness(' + 3 + ')';
        swichImgUploadPreviewClass('effects__preview--heat');
        imgUploadScaleSelector.classList.remove('hidden');
        break;
    }
  };

  var onDocumentPicturesSelectorClick = function (evt) {
    if (evt.target.className === 'picture__img') {
      var index = evt.target.getAttribute('data-id');
      document.querySelector('.big-picture__img img').src = photos[index].url;
      window.utilMethods.showBigPicture();
      window.utilMethods.initBigPictureData(photos[index]);
      window.utilMethods.getComment(photos[index]);
    }
  };

  var onPictureCanselSelectorClick = function () {
    document.querySelector('.big-picture')
    .classList.add('hidden');
  };

  pictureCanselSelector.addEventListener('click', onPictureCanselSelectorClick);
  uploadFormSelector.addEventListener('change', onUploadFormSelectorChange);
  buttonCancelFormSelector.addEventListener('click', onButtonCancelFormSelectorClick);
  document.addEventListener('keydown', onDocumentKeydown);
  effectsListSelector.addEventListener('click', onEffectsListSelectorClick);
  document.addEventListener('click', onDocumentPicturesSelectorClick);
})();
