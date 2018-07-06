'use strict';

var imgFiltersForm = document.querySelector('form.img-filters__form');

var onImgFiltersFormClick = function (evt) {
  var photos = window.util.photos;

  switch (evt.target.id) {
    case 'filter-popular':
      activeImgFilter(evt);
      var sortPopularImg = photos.sort (function (a, b){
        if (a.index > b.index) {
          return 1;
        }
        if (a.index < b.index) {
          return -1;
        }
        return 0;
      });
      // console.log(sortPopularImg);
      break;
    case 'filter-new':
      activeImgFilter(evt);
      break;
    case 'filter-discussed':
      activeImgFilter(evt);
      var sortDiscussedImg = photos.sort (function (a, b){
        if (a.comments.length > b.comments.length) {
          return 1;
        }
        if (a.comments.length < b.comments.length) {
          return -1;
        }
        return 0;
      });
      // console.log(sortDiscussedImg);
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

// var sortNewImg = function (photos) {};
