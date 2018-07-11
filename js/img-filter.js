'use strict';

var imgFiltersFormSelector = document.querySelector('form.img-filters__form');
var picturesSelector = document.querySelector('.pictures');
var imgWrapperSelector = document.querySelector('.img-upload');
var newPhotosAmount = 10;

var onImgFiltersFormSelectorClick = function (evt) {
  var photos = window.util.photos;

  switch (evt.target.id) {
    case 'filter-popular':
      activeImgFilter(evt);
      var popularImg = sortPopularImg(photos);
      removeChildren(picturesSelector, imgWrapperSelector);
      window.renderPhotos(popularImg);
      break;
    case 'filter-new':
      activeImgFilter(evt);
      var newImg = sortNewImg(photos, newPhotosAmount);
      removeChildren(picturesSelector, imgWrapperSelector);
      window.renderPhotos(newImg);
      break;
    case 'filter-discussed':
      activeImgFilter(evt);
      var disscusedImg = sortDiscussedImg(photos);
      removeChildren(picturesSelector, imgWrapperSelector);
      window.renderPhotos(disscusedImg);
      break;
  }
};

var activeImgFilter = function (evt) {
  for (var i = 0; i < imgFiltersFormSelector.children.length; i++) {
    var list = imgFiltersFormSelector.children[i].classList;
    if (list.length > 1) {
      list.remove('img-filters__button--active');
    }
    evt.target.classList.add('img-filters__button--active');
  }
};

var removeChildren = function (elem, nextElem) {
  while (elem.lastChild !== nextElem) {
    elem.removeChild(elem.lastChild);
  }
};

var sortPopularImg = function (array) {
  return array.sort(function (a, b) {
    if (a.index > b.index) {
      return 1;
    }
    if (a.index < b.index) {
      return -1;
    }
    return 0;
  });
};

var sortNewImg = function (array, amount) {
  var newArray = [];
  while (newArray.length < amount) {
    var num = window.getRandomInteger(0, array.length - 1);
    if (newArray.length === 0) {
      newArray.push(array[num]);
    }
    for (var i = 0, k = 0; i < newArray.length; i++) {
      if (array[num] === newArray[i]) {
        k++;
      }
    } if (k === 0) {
      newArray.push(array[num]);
    }
  }
  return newArray;
};

var sortDiscussedImg = function (array) {
  return array.sort(function (a, b) {
    if (a.comments.length > b.comments.length) {
      return 1;
    }
    if (a.comments.length < b.comments.length) {
      return -1;
    }
    return 0;
  });
};

imgFiltersFormSelector.addEventListener('click', onImgFiltersFormSelectorClick);
