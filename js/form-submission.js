'use strict';

(function () {
  var MAX_HASHTAG_SYMBOLS = 20;
  var LIMIT_HASH_TAGS = 5;
  var hashTagSelector = document.querySelector('.text__hashtags');

  hashTagSelector.addEventListener('change', function (evt) {
    var hashTagArray = (evt.target.value.toLowerCase()).split(' ');
    evt.target.setCustomValidity('');

    if (hashTagArray.length > LIMIT_HASH_TAGS) {
      evt.target.setCustomValidity('Нельзя использовать более 5 хештегов!');
      return;
    }

    for (var i = 0; i < hashTagArray.length; i++) {
      var elem = hashTagArray[i];
      if (hashTagArray[i] === '') {
        evt.target.setCustomValidity('между хештегами должен быть один пробел!');
        return;
      } else if (hashTagArray[i].charAt(0) !== '#') {
        evt.target.setCustomValidity('Хеш тег должен начинаться с символа решетка: #');
        return;
      } else if (hashTagArray[i] === '#') {
        evt.target.setCustomValidity('Хештег не может состоять из одной #!');
        return;
      } else if (hashTagArray[i].length > MAX_HASHTAG_SYMBOLS) {
        evt.target.setCustomValidity('Хештег не может быть длиннее 20 символов!');
        return;
      }
      for (var j = 1; j < hashTagArray[i].length; j++) {
        if (hashTagArray[i].charAt(j) === '#') {
          evt.target.setCustomValidity('Хеш тег не может внутри себя содержать символ решетка: #');
          return;
        }
      }
      for (var k = i + 1; k < hashTagArray.length; k++) {
        if (elem === hashTagArray[k]) {
          evt.target.setCustomValidity('нельзя использовать одинаковые хештеги!');
          return;
        }
      }
    }
  });
  // ===============================================Server-upload==========================================================
  var formSelector = document.querySelector('#upload-select-image');

  // var uploadButtonSelecotr = document.querySelector('#upload-submit');

  var onLoad = function () {
    document.querySelector('.img-upload__overlay').classList.add('hidden');
  };

  var onError = function (err) {
    console.log(err);
    window.util.showError();
  };

  var onUploadButtonSelectorSubmit = function (evt) {
    evt.preventDefault();
    window.upload(new FormData(formSelector), onLoad, onError);
  };

  formSelector.addEventListener('submit', onUploadButtonSelectorSubmit);

  // =======================================================================================================================

})();
