'use strict';

var imgFiltersForm = document.querySelector('form.img-filters__form');
var templateSelector = document.querySelector('#picture').content.querySelector('a');
var picturesSelector = document.querySelector('.pictures');
var imgWrapper = document.querySelector('.img-upload');
var newPhotosAmount = 10;

var onImgFiltersFormClick = function (evt) {
  var photos = window.util.photos;

  switch (evt.target.id) {
    case 'filter-popular':
      activeImgFilter(evt);
      var sortPopularImg = photos.sort(function (a, b) {
        if (a.index > b.index) {
          return 1;
        }
        if (a.index < b.index) {
          return -1;
        }
        return 0;
      });
      removeChildren(picturesSelector, imgWrapper);
      window.renderPhotos(sortPopularImg);
      break;
    case 'filter-new':
      activeImgFilter(evt);
      var newImg = sortNewImg (photos, newPhotosAmount);
      removeChildren(picturesSelector, imgWrapper);
      window.renderPhotos(newImg);
      break;
    case 'filter-discussed':
      activeImgFilter(evt);
      var sortDiscussedImg = photos.sort(function (a, b) {
        if (a.comments.length > b.comments.length) {
          return 1;
        }
        if (a.comments.length < b.comments.length) {
          return -1;
        }
        return 0;
      });
      removeChildren(picturesSelector, imgWrapper);
      break;
  }
};

imgFiltersForm.addEventListener('click', onImgFiltersFormClick);

var activeImgFilter = function (evt) {
  for (var i = 0; i < imgFiltersForm.children.length; i++) {
    var list = imgFiltersForm.children[i].classList;
    if (list.length > 1) {
      list.remove('img-filters__button--active');
    }
    evt.target.classList.add('img-filters__button--active');
  }
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

var removeChildren = function (elem, nextElem) {
  while (elem.lastChild !== nextElem) {
    elem.removeChild(elem.lastChild);
  }
};

var sortNewImg = function (array, amount ) {
  var newArray = [];
  while(newArray.length < amount) {
    var num = getRandomInteger (0, array.length - 1);
    if (newArray.length === 0 ) {
      newArray.push(array[num]);
    }
    for (var i = 0, k = 0; i < newArray.length; i++) {
      if (array[num] === newArray[i]) {k++};
    } if (k===0){ newArray.push(array[num])};
  }
  return newArray;
};

