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
  // document.querySelector('.social__comment-count').classList.add('visually-hidden');
  // document.querySelector('.social__loadmore').classList.add('visually-hidden');
};

var renderPhotos = function (array) {
  for (var i = 0; i < array.length; i++) {
    var element = templateSelector.cloneNode(true);
    element.querySelector('.picture__stat--likes').textContent = array[i].likes;
    element.querySelector('.picture__stat--comments').textContent = array[i].comments;
    element.querySelector('img').src = array[i].url;
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

var init = function () {
  var photos = generatePhotos();
  renderPhotos(photos);
  // showBigPicture();
  initBigPictureData(photos[0]);
  getComment(photos[0]);
};

init();
// --------------------events-block------------------------------------------------
var VALUE_MAX = 100;
var uploadForm = document.querySelector('#upload-file');
var buttonCancelForm = document.querySelector('#upload-cancel');
var scalePin = document.querySelector('.scale__pin');
var scaleValue = document.querySelector('.scale__value').value;
var effectsList = document.querySelector('.effects__list');
var imgUploadPreview = document.querySelector('.img-upload__preview');
var pictureCansel = document.querySelector('#picture-cancel');


var onUploadFormChange = function () {
  document.querySelector('.img-upload__overlay')
  .classList.remove('hidden');
};
var onButtonCancelFormClick = function () {
  document.querySelector('.img-upload__overlay')
  .classList.add('hidden');
};
var onDocumentKeydown = function (evt) {
  if (evt.keyCode === 27) {
    document.querySelector('.img-upload__overlay').classList.add('hidden');
  }
};



var onEffectsListClick = function(evt) {
  switch (evt.target.id) {
    case 'effect-none':
    // imgUploadScale.classList.add('hidden');
    // по тз шкала пропадает , это работает но покая это скрыл.
    break;
    case 'effect-chrome':
    imgUploadPreview.style.cssText = '';
    imgUploadPreview.style.filter = 'grayscale(' + (scaleValue / VALUE_MAX) + ')';
    console.log(imgUploadPreview.style.filter);
    break;
    case 'effect-sepia':
    imgUploadPreview.style.cssText = '';
    imgUploadPreview.style.filter = 'sepia(' + (scaleValue / VALUE_MAX) + ')';
    console.log(imgUploadPreview.style.filter);
    break;
    case 'effect-marvin':
    imgUploadPreview.style.cssText = '';
    imgUploadPreview.style.filter = 'invert(' + scaleValue  + '%)';
    console.log(imgUploadPreview.style.filter);
    break;
    case 'effect-phobos':
    imgUploadPreview.style.cssText = '';
    imgUploadPreview.style.filter = 'blur(' + (scaleValue / VALUE_MAX * 3) + 'px)';
    console.log(imgUploadPreview.style.filter);
    break;
    case 'effect-heat':
    imgUploadPreview.style.cssText = '';
    imgUploadPreview.style.filter = 'brightness(' + (scaleValue / VALUE_MAX * 3) + ')';
    console.log(imgUploadPreview.style.filter);
    break;
  }
};

var onDocumentPicturesClick = function(evt) {
 if (evt.target.className === 'picture__img') {
  showBigPicture();
 };
};

var onPictureCanselClick = function() {
  document.querySelector('.big-picture')
  .classList.add('hidden');
};

pictureCansel.addEventListener('click', onPictureCanselClick)
uploadForm.addEventListener('change', onUploadFormChange);
buttonCancelForm.addEventListener('click', onButtonCancelFormClick);
document.addEventListener('keydown', onDocumentKeydown);
scalePin.addEventListener('mouseup', onScalePinMouseup);
effectsList.addEventListener('click', onEffectsListClick);
document.addEventListener('click', onDocumentPicturesClick);

