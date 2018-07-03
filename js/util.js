'use strict';

(function () {
  var PHOTOS_COUNT = 25;
  var LIKES_START_QUANTITY = 15;
  var LIKES_FINISH_QUANTITY = 200;
  var PHRASES_DESCRIPTIONS = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят',
    'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];
  var PHRASES_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
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

  var generatePhotos = function () {
    var array = [];
    for (var i = 0; i < PHOTOS_COUNT; i++) {
      var commentsQuantity = getRandomInteger(1, 2);
      array[i] = {
        url: 'photos/' + (i + 1) + '.jpg',
        likes: getRandomInteger(LIKES_START_QUANTITY, LIKES_FINISH_QUANTITY),
        description: PHRASES_DESCRIPTIONS[getRandomInteger(0, PHRASES_DESCRIPTIONS.length - 1)],
        comments: []
      };
      for (var j = 0; j < commentsQuantity; j++) {
        var randomPhrases = PHRASES_COMMENTS[getRandomInteger(0, PHRASES_COMMENTS.length - 1)];
        array[i].comments[j] = randomPhrases;
      }
    }
    return array;
  };

  // window.photos = generatePhotos();

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
    photos: generatePhotos()
  };

})();

