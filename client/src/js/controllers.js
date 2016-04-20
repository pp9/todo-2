angular.module('todo.controllers', [])
.controller('LoginCtrl', function($scope, $http, $rootScope, $state) {

    $('#login-modal').modal('show');

    $scope.submitPassword = function() {
        var json = angular.toJson({
            "password": $scope.password
        });
        var req = {
         method: 'POST',
         url: '/password',
         headers: {
           'Content-Type': 'application/json'
         },
         data: json
        }

        $http(req).then(function(data){
            if(data.data === 'true') {
                $rootScope.login = true;
                $('#login-modal').modal('hide');
                $('body').removeClass('modal-open');

                $state.go('index');
            }
        }, function(){
            console.log('error');
        });

    }
})
.controller('MainCntr', function($rootScope, $scope, $http, mainService, $location) {
    $('.modal-backdrop').remove();

    // if(!$rootScope.login) $location.path( "/" );

    $scope.tasks = [];
    $scope.currentTask;

    const Item = function(item) {
        this.id = item.id || $scope.currentTask.items.length;
        this.done = item.done || false;
        this.text = item.text || '';
    }

    const Task = function(task) {
        this.id = task.id || $scope.tasks.length;
        this.name = task.name || 'Name';
        this.textNote = task.textNote || 'Text';
        this.items = task.items || [];
    }

    mainService.getData()
        .then(function(data) {
            $scope.tasks = data.tasks.reverse();
        })


    $scope.editTask = function(item) {
        $scope.currentTask = item;
        $('#modal-id').modal('show');
    }

    $scope.addTask = function() {
      let task = new Task({});
      $scope.tasks.push(task);
    }

    $scope.removeTask = function(index) {
        $scope.tasks.splice(index, 1);
    }

    $scope.addItem = function() {
        let newItem = new Item({});
        $scope.currentTask.items.push(newItem);
        // console.log(newItem);
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
            $('#modal-id').modal('hide');
        }, function(){
            console.log('error');
        });
    }
})
