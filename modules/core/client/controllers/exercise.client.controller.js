(function() {
  'use strict';

  angular
    .module('core')
    .controller('ExerciseController', ExerciseController);

  ExerciseController.$inject = ['$scope', '$stateParams', '$http'];

  function ExerciseController($scope, $stateParams, $http) {
    var vm = this;

    var exerciseData = $stateParams.exerciseData;
    // Exercise controller logic
    // ...

  }
});
