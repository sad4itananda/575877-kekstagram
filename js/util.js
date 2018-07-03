'use strict';

(function () {
  window.utilParametrs = {
    PHRASES_DESCRIPTIONS: ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят',
      'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
      'Вот это тачка!'],
    PHRASES_COMMENTS: ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
      'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
      'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
      'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
      'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'],

    SCALE_WIDTH: 453,
    VALUE_MAX: 100,
    ESC_KEYCODE: 27,
    PHOTOS_COUNT: 25,
    LIKES_START_QUANTITY: 15,
    LIKES_FINISH_QUANTITY: 200,
    scaleValue: 0,
    scalePinSelector: document.querySelector('.scale__pin'),
    scaleLevelSelector: document.querySelector('.scale__level'),
    imgUploadPreviewSelector: document.querySelector('.img-upload__preview'),
    parentCommentsSelector: document.querySelector('.social__comments')
  };

  window.utilMethods = {
    createElement: function (tag, className, text) {
      var element = document.createElement(tag);
      element.classList.add(className);
      if (text) {
        element.textContent = text;
      }
      return element;
    },

    addChildElement: function (child, parent) {
      parent.appendChild(child);
    },

    getRandomInteger: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    generatePhotos: function () {
      var array = [];
      for (var i = 0; i < utilParametrs.PHOTOS_COUNT; i++) {
        var commentsQuantity = utilMethods.getRandomInteger(1, 2);
        array[i] = {
          url: 'photos/' + (i + 1) + '.jpg',
          likes: utilMethods.getRandomInteger(utilParametrs.LIKES_START_QUANTITY, utilParametrs.LIKES_FINISH_QUANTITY),
          description: utilParametrs.PHRASES_DESCRIPTIONS[utilMethods.getRandomInteger(0, utilParametrs.PHRASES_DESCRIPTIONS.length - 1)],
          comments: []
        };
        for (var j = 0; j < commentsQuantity; j++) {
          var randomPhrases = utilParametrs.PHRASES_COMMENTS[utilMethods.getRandomInteger(0, utilParametrs.PHRASES_COMMENTS.length - 1)];
          array[i].comments[j] = randomPhrases;
        }
      }
      return array;
    },

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
        var parent = utilMethods.createElement('li', 'social__comment');
        parent.classList.add('social__comment--text');
        var childImg = utilMethods.createElement('img', 'social__picture');
        childImg.src = 'img/avatar-' + utilMethods.getRandomInteger(1, 6) + '.svg';
        childImg.alt = 'Аватар комментатора фотографии';
        childImg.width = '35';
        childImg.height = '35';
        var childComment = utilMethods.createElement('p', 'social__text', element.comments[i]);
        utilMethods.addChildElement(childImg, parent);
        utilMethods.addChildElement(childComment, parent);
        utilMethods.addChildElement(parent, utilParametrs.parentCommentsSelector);
      }
    }
  };

  window.photos = utilMethods.generatePhotos();
})();

