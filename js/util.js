'use strict';

(function () {

  var parentCommentsSelector = document.querySelector('.social__comments');

  var createElement = function (tag, className, text) {
    var element = document.createElement(tag);
    element.classList.add(className);
    if (text) {
      element.textContent = text;
    }
    return element;
  };

  var addChildElement = function (child, parent) {
    parent.appendChild(child);
  };

  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.util = {
    SCALE_WIDTH: 453,
    VALUE_MAX: 100,
    ESC_KEYCODE: 27,
    scaleValue: null,
    scalePinSelector: document.querySelector('.scale__pin'),
    scaleLevelSelector: document.querySelector('.scale__level'),
    imgUploadPreviewSelector: document.querySelector('.img-upload__preview'),

    showBigPicture: function () {
      document.querySelector('.big-picture').classList.remove('hidden');
    },
    initBigPictureData: function (element) {
      document.querySelector('.big-picture__img').src = element.url;
      document.querySelector('.likes-count').textContent = element.likes;
      document.querySelector('.comments-count').textContent = +element.comments.length;
      document.querySelector('.social__caption').textContent = element.description;
    },
    getComment: function (element) {
      for (var i = 0; i < element.comments.length; i++) {
        var parent = createElement('li', 'social__comment');
        parent.classList.add('social__comment--text');
        var childImg = createElement('img', 'social__picture');
        childImg.src = 'img/avatar-' + getRandomInteger(1, 6) + '.svg';
        childImg.alt = 'Аватар комментатора фотографии';
        childImg.width = '35';
        childImg.height = '35';
        var childComment = createElement('p', 'social__text', element.comments[i]);
        addChildElement(childImg, parent);
        addChildElement(childComment, parent);
        addChildElement(parent, parentCommentsSelector);
      }
    },
    showError: function () {
      var errorEelement = document.querySelector('#picture').content.querySelector('.img-upload__message--error').cloneNode(true);
      document.querySelector('.img-upload__overlay').classList.add('hidden');
      document.body.appendChild(errorEelement);
      errorEelement.classList.remove('hidden');
      setTimeout(function () {
        errorEelement.classList.add('hidden');
      }, 2000);
    }
  };

})();

