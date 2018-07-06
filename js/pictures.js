'use strict';

(function () {
  var templateSelector = document.querySelector('#picture').content.querySelector('a');
  var picturesSelector = document.querySelector('.pictures');

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

  var onLoad = function (data) {
    window.util.photos = data;
    renderPhotos(data);
    hiddenElements();
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  };

  var onError = function (err) {
    window.util.showError(err);
  };

  var init = function () {
    window.download(onLoad, onError);
  };

  init();
})();
