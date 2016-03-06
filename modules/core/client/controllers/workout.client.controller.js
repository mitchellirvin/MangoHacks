(function() {
  'use strict';

  angular
    .module('core')
    .controller('WorkoutController', WorkoutController);

  WorkoutController.$inject = ['$scope'];

  function WorkoutController($scope) {
    var vm = this;

    // Workout controller logic
    // ...

    init();

    function init() {
    }
  }
})();
