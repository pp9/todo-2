angular.module('todo.services', [])
  .service('mainService', function($http) {
      var data = [];

      function getData() {
          return $http.get('/db/app.json')
              .then(function(data) {
                  return angular.fromJson(data.data);
              })
      }
      return {
          getData: getData
      }
  })
