'use strict';

(function () {
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';
  var URL_DOWNLOAD = 'https://js.dump.academy/kekstagram/data';

  window.upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Ошибка соединения');
      }
    });
    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });


    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  window.download = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Ошибка соединения');
      }
    });
    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.open('GET', URL_DOWNLOAD);
    xhr.send();
  };
})();
