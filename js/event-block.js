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
  var uploadPinSelector = window.util.imgUploadPreviewSelector;
  // var Error = document.querySelector('.img-upload__message--error');

  // document.addEventListener('click',onDocumentClick);

  // var onDocumentClick = function () {
  //   document.querySelector('.img-upload__message--error').classList.add('hidden');
  };

  var onUploadFormSelectorChange = function () {
    document.querySelector('.img-upload__overlay').classList.remove('hidden');
  };

  var onButtonCancelFormSelectorClick = function () {
    document.querySelector('.img-upload__overlay').classList.add('hidden');
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
      if (uploadPinSelector.classList.length === 1) {
        uploadPinSelector.classList.add(className);
      } else {
        uploadPinSelector.classList.replace(uploadPinSelector.classList[1], className);
      }
    };
    switch (evt.target.id) {
      case 'effect-none':
        uploadPinSelector.style.filter = '';
        swichImgUploadPreviewClass('effects__preview--none');
        imgUploadScaleSelector.classList.add('hidden');
        break;
      case 'effect-chrome':
        uploadPinSelector.style.filter = 'grayscale(' + 1 + ')';
        swichImgUploadPreviewClass('effects__preview--chrome');
        imgUploadScaleSelector.classList.remove('hidden');
        break;
      case 'effect-sepia':
        uploadPinSelector.style.filter = 'sepia(' + 1 + ')';
        swichImgUploadPreviewClass('effects__preview--sepia');
        imgUploadScaleSelector.classList.remove('hidden');
        break;
      case 'effect-marvin':
        uploadPinSelector.style.filter = 'invert(' + window.util.VALUE_MAX + '%)';
        swichImgUploadPreviewClass('effects__preview--marvin');
        imgUploadScaleSelector.classList.remove('hidden');
        break;
      case 'effect-phobos':
        uploadPinSelector.style.filter = 'blur(' + 3 + 'px)';
        swichImgUploadPreviewClass('effects__preview--phobos');
        imgUploadScaleSelector.classList.remove('hidden');
        break;
      case 'effect-heat':
        uploadPinSelector.style.filter = 'brightness(' + 3 + ')';
        swichImgUploadPreviewClass('effects__preview--heat');
        imgUploadScaleSelector.classList.remove('hidden');
        break;
    }
  };

  var onDocumentPicturesSelectorClick = function (evt) {
    if (evt.target.className === 'picture__img') {
      var index = evt.target.getAttribute('data-id');
      bigPictureImgSelector.src = window.util.photos[index].url;
      window.util.showBigPicture();
      window.util.initBigPictureData(window.util.photos[index]);
      window.util.getComment(window.util.photos[index]);
    }
  };

  var onPictureCanselSelectorClick = function () {
    document.querySelector('.big-picture').classList.add('hidden');
  };

  imgUploadScaleSelector.classList.add('hidden');
  pictureCanselSelector.addEventListener('click', onPictureCanselSelectorClick);
  uploadFormSelector.addEventListener('change', onUploadFormSelectorChange);
  buttonCancelFormSelector.addEventListener('click', onButtonCancelFormSelectorClick);
  document.addEventListener('keydown', onDocumentKeydown);
  effectsListSelector.addEventListener('click', onEffectsListSelectorClick);
  document.addEventListener('click', onDocumentPicturesSelectorClick);
})();
