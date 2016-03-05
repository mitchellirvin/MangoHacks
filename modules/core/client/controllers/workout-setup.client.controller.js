(function() {
  'use strict';

  angular
    .module('core')
    .controller('WorkoutSetupController', WorkoutSetupController);

  WorkoutSetupController.$inject = ['$scope'];

  function WorkoutSetupController($scope) {
    var vm = this;

    // Workout setup controller logic
    // ...
    $(function() {
      $('select').material_select();
    });

    $scope.generateWorkout = function() {
//      console.log(noDays);
      console.log($scope.noDays);
    }
  }
})();
