'use strict';

var template = document.querySelector('#picture').content.querySelector('a');
var pictures = document.querySelector('.pictures');
var parentComments = document.querySelector('.social__comments');
var QUANTITY_OBJ = 25;

var PHRASES_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var PHRASES_DESCRIPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят',
  'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'];

var getRandomInt = function (minIn, maxIn) {
  return Math.floor(Math.random() * (maxIn - minIn + 1)) + minIn;
};

var createElement = function (tag, className, text) {
  var element = document.createElement(tag);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};

var addChild = function (child, parent) {
  parent.appendChild(child);
};

var getarrayUrl = function () {
  var array = [];
  for (var i = 0; i < QUANTITY_OBJ; i++) {
    array[i] = 'photos/' + (i + 1) + '.jpg';
  }
  return array;
};

var getarrayPhotosUsers = function () {
  var array = [];
  for (var i = 0; i < QUANTITY_OBJ; i++) {
    var obj = array[i] = {};
    var URLS = getarrayUrl();
    var rdmLikes = getRandomInt(15, 200);
    var rdmPhrases = PHRASES_COMMENTS[getRandomInt(0, PHRASES_COMMENTS.length - 1)];
    var rdmPhrases2 = PHRASES_COMMENTS[getRandomInt(0, PHRASES_COMMENTS.length - 1)];
    obj.url = URLS[i];
    obj.likes = rdmLikes;
    obj.comments = [rdmPhrases];
    if (getRandomInt(0, 1)) {
      obj.comments[1] = rdmPhrases2;
    }
    obj.description = PHRASES_DESCRIPTION[getRandomInt(0, PHRASES_DESCRIPTION.length - 1)];
  }
  return array;
};

var showSetap = function () {
  document.querySelector('.big-picture').classList.remove('hidden');
  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.social__loadmore').classList.add('visually-hidden');
};

var insTemplatePhotosUsers = function (array) {
  for (var i = 0; i < array.length; i++) {
    var element = template.cloneNode(true);
    element.querySelector('.picture__stat--likes').textContent = array[i].likes;
    element.querySelector('.picture__stat--comments').textContent = array[i].comments;
    element.querySelector('img').src = array[i].url;
    pictures.appendChild(element);
  }
};

var setupBigPicture = function (array) {
  document.querySelector('.big-picture__img').src = array[0].url;
  document.querySelector('.likes-count').textContent = array[0].likes;
  document.querySelector('.comments-count').textContent = + array[0].comments.length;
  document.querySelector('.social__caption').textContent = array[0].description;
};

var getComment = function (array, i) {
  var parent = createElement('li', 'social__comment');
  parent.classList.add('social__comment--text');
  var childImg = createElement('img', 'social__picture');
  childImg.src = 'img/avatar-' + getRandomInt(1, 6) + '.svg';
  childImg.alt = 'Аватар комментатора фотографии';
  childImg.width = '35';
  childImg.height = '35';
  var childP = createElement('p', 'social__text', array[0].comments[i]);
  addChild(childImg, parent);
  addChild(childP, parent);
  return parent;
};

var init = function () {
  var photosUsers = getarrayPhotosUsers();
  insTemplatePhotosUsers(photosUsers);
  showSetap();
  setupBigPicture(photosUsers);
  for (var i = 0; i < photosUsers[0].comments.length; i++) {
    addChild(getComment(photosUsers, i), parentComments);
  }
};

init();

