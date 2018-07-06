'use strict';

var imgFiltersForm =  document.querySelector('form.img-filters__form');

var onImgFiltersFormClick = function(evt) {
  switch (evt.target.id) {
    case 'filter-popular':
      activeImgFilter(evt);
      break;
    case 'filter-new':
      activeImgFilter(evt);
      break;
    case 'filter-discussed':
      activeImgFilter(evt);
      break;
  }
};


 imgFiltersForm.addEventListener('click', onImgFiltersFormClick);

var activeImgFilter = function (evt) {
  for (var i = 0; i < imgFiltersForm.children.length; i ++) {
    var list = imgFiltersForm.children[i].classList;
    if (list.length > 1 ) {
      list.remove('img-filters__button--active');
    };
    evt.target.classList.add('img-filters__button--active');
  }
};
