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

    init();

    function init() {
    }
  }
})();
