(function() {
  'use strict';

  angular
    .module('core')
    .controller('WorkoutProgramController', WorkoutProgramController);

  WorkoutProgramController.$inject = ['$scope', '$stateParams', '$http', 'workouts'];

  function WorkoutProgramController($scope, $stateParams, $http, workouts) {
    var vm = this;
    
    console.log(workouts.type);

  }
})();
