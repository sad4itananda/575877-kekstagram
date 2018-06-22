'use strict';

var PHRASES_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var PHRASES_DESCRIPTIONS = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят',
  'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'];
var LIKES_START_QUANTITY = 15;
var LIKES_FINISH_QUANTITY = 200;
var PHOTOS_COUNT = 25;
var templateSelector = document.querySelector('#picture').content.querySelector('a');
var picturesSelector = document.querySelector('.pictures');
var parentCommentsSelector = document.querySelector('.social__comments');

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

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

var showBigPicture = function () {
  document.querySelector('.big-picture').classList.remove('hidden');
};

var hiddenElements = function () {
  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.social__loadmore').classList.add('visually-hidden');
};

var renderPhotos = function (array) {
  for (var i = 0; i < array.length; i++) {
    var element = templateSelector.cloneNode(true);
    element.querySelector('.picture__stat--likes').textContent = array[i].likes;
    element.querySelector('.picture__stat--comments').textContent = array[i].comments;
    element.querySelector('img').src = array[i].url;
    element.querySelector('img').setAttribute('data-id', i);
    picturesSelector.appendChild(element);
  }
};

var initBigPictureData = function (element) {
  document.querySelector('.big-picture__img').src = element.url;
  document.querySelector('.likes-count').textContent = element.likes;
  document.querySelector('.comments-count').textContent = +element.comments.length;
  document.querySelector('.social__caption').textContent = element.description;
};

var getComment = function (element) {
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
};

var photos = generatePhotos();

var init = function () {
  renderPhotos(photos);
  hiddenElements();
};

init();
// --------------------events-block------------------------------------------------
var VALUE_MAX = 100;
var ESC_KEYCODE = 27;
var uploadFormSelector = document.querySelector('#upload-file');
var buttonCancelFormSelector = document.querySelector('#upload-cancel');
// var scalePinSelector = document.querySelector('.scale__pin');
var scaleValue = document.querySelector('.scale__value').value;
var effectsListSelector = document.querySelector('.effects__list');
var imgUploadPreviewSelector = document.querySelector('.img-upload__preview');
var pictureCanselSelector = document.querySelector('#picture-cancel');
var imgUploadScaleSelector = document.querySelector('.img-upload__scale');

var onUploadFormSelectorChange = function () {
  document.querySelector('.img-upload__overlay')
  .classList.remove('hidden');
};

var onButtonCancelFormSelectorClick = function () {
  document.querySelector('.img-upload__overlay')
  .classList.add('hidden');
};

var onDocumentKeydown = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    document.querySelector('.img-upload__overlay').classList.add('hidden');
  }
};

var onEffectsListSelectorClick = function (evt) {
  switch (evt.target.id) {
    case 'effect-none':
      imgUploadScaleSelector.classList.add('hidden');
      break;
    case 'effect-chrome':
      imgUploadPreviewSelector.style.cssText = '';
      imgUploadPreviewSelector.style.filter = 'grayscale(' + (scaleValue / VALUE_MAX) + ')';
      imgUploadScaleSelector.classList.remove('hidden');
      break;
    case 'effect-sepia':
      imgUploadPreviewSelector.style.cssText = '';
      imgUploadPreviewSelector.style.filter = 'sepia(' + (scaleValue / VALUE_MAX) + ')';
      imgUploadScaleSelector.classList.remove('hidden');
      break;
    case 'effect-marvin':
      imgUploadPreviewSelector.style.cssText = '';
      imgUploadPreviewSelector.style.filter = 'invert(' + scaleValue + '%)';
      imgUploadScaleSelector.classList.remove('hidden');
      break;
    case 'effect-phobos':
      imgUploadPreviewSelector.style.cssText = '';
      imgUploadPreviewSelector.style.filter = 'blur(' + (scaleValue / VALUE_MAX * 3) + 'px)';
     imgUploadScaleSelector.classList.remove('hidden');
      break;
    case 'effect-heat':
      imgUploadPreviewSelector.style.cssText = '';
      imgUploadPreviewSelector.style.filter = 'brightness(' + (scaleValue / VALUE_MAX * 3) + ')';
     imgUploadScaleSelector.classList.remove('hidden');
      break;
  }
};

var onDocumentPicturesSelectorClick = function (evt) {
  if (evt.target.className === 'picture__img') {
    var index = evt.target.getAttribute('data-id');
    document.querySelector('.big-picture__img img').src = photos[index].url;
    showBigPicture();
    initBigPictureData(photos[index]);
    getComment(photos[index]);
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
// scalePin.addEventListener('mouseup', onScalePinMouseup);
effectsListSelector.addEventListener('click', onEffectsListSelectorClick);
document.addEventListener('click', onDocumentPicturesSelectorClick);

