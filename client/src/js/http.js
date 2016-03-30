'use strict';

const http = (() => {
    const get = function (url) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = function() {
                if(xhr.status == 200) {
                    resolve(xhr.response);
                } else {
                    reject(Error(xhr.statusText));
                }
            }
            // Handle network errors
            xhr.onerror = function() {
              reject(Error("Network Error"));
            };
            xhr.send();
        });
    }
    return {
        get: get
    }
})();



