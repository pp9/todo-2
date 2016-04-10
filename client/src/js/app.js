angular.module('todo', [])
    .service('mainService', function($http) {
        var data = [];

        function getData() {
            return $http.get('/db/app.json')
                .then(function(data) {
                    // data = angular.fromJson(data.data);
                    return angular.fromJson(data.data);
                })
        }
        return {
            getData: getData
        }
    })
    .controller('MainCntr', function($scope, $http, mainService) {
        $scope.tasks = [];
        $scope.currentTask;

        const Item = function(item) {
            this.id = item.id || $scope.currentTask.items.length;
            this.done = item.done || false;
            this.text = item.text || '';
        }

        mainService.getData()
            .then(function(data) {
                $scope.tasks = data.tasks;
                // console.log($scope.tasks)
            })
        $scope.editTask = function(item) {
            $scope.currentTask = item;
            $('#modal-id').modal('show');
        }
        $scope.addItem = function() {
            let newItem = new Item({});
            $scope.currentTask.items.push(newItem);
            console.log(newItem);
        }
        $scope.removeItem = function(index) {
            $scope.currentTask.items.splice(index, 1);
        }

        $scope.saveTask = function() {
            var json = {
                "tasks": $scope.tasks
            }
            json = angular.toJson(json);

            var req = {
             method: 'POST',
             url: '/data',
             headers: {
               'Content-Type': 'application/json'
             },
             data: json
            }

            $http(req).then(function(){
                console.log('eroor');
            }, function(){
                console.log('done');
            });
        }
    })