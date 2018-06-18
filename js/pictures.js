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
var photosCount = 25;
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
  for (var i = 0; i < photosCount; i++) {
    var object = array[i] = {};
    var comemetsQuantity = getRandomInteger(1, 2);
    var randomLikes = getRandomInteger(LIKES_START_QUANTITY, LIKES_FINISH_QUANTITY);
    object.url = 'photos/' + (i + 1) + '.jpg';
    object.likes = randomLikes;
    object.comments = [];
    for (var j = 0; j < comemetsQuantity; j++) {
      var randomPhrases = PHRASES_COMMENTS[getRandomInteger(0, PHRASES_COMMENTS.length - 1)];
      object.comments[j] = randomPhrases;
    }
    object.description = PHRASES_DESCRIPTIONS[getRandomInteger(0, PHRASES_DESCRIPTIONS.length - 1)];
  }
  return array;
};

var showSetup = function () {
  document.querySelector('.big-picture').classList.remove('hidden');
  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.social__loadmore').classList.add('visually-hidden');
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

var initBigPictureData = function (array) {
  document.querySelector('.big-picture__img').src = array[0].url;
  document.querySelector('.likes-count').textContent = array[0].likes;
  document.querySelector('.comments-count').textContent = +array[0].comments.length;
  document.querySelector('.social__caption').textContent = array[0].description;
};

var getComment = function (array) {
  for (var i = 0; i < array[0].comments.length; i++) {
    var parent = createElement('li', 'social__comment');
    parent.classList.add('social__comment--text');
    var childImg = createElement('img', 'social__picture');
    childImg.src = 'img/avatar-' + getRandomInteger(1, 6) + '.svg';
    childImg.alt = 'Аватар комментатора фотографии';
    childImg.width = '35';
    childImg.height = '35';
    var childComment = createElement('p', 'social__text', array[0].comments[i]);
    addChildElement(childImg, parent);
    addChildElement(childComment, parent);
    addChildElement(parent, parentCommentsSelector);
  }
};

var init = function () {
  var photos = generatePhotos();
  renderPhotos(photos);
  showSetup();
  initBigPictureData(photos);
  getComment(photos);
};

init();
