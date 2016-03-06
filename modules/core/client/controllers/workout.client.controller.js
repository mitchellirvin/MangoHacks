(function() {
  'use strict';

  angular
    .module('core')
    .controller('WorkoutController', WorkoutController);

  WorkoutController.$inject = ['$scope', '$stateParams', '$http'];

  function WorkoutController($scope, $stateParams, $http) {
    var vm = this;

    $scope.workoutsForTheDay = $stateParams.workoutData;

    console.log($stateParams.workoutData)
  }
})();
