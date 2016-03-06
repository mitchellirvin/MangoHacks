(function() {
  'use strict';

  angular
    .module('core')
    .controller('WorkoutProgramController', WorkoutProgramController);

  WorkoutProgramController.$inject = ['$scope', '$stateParams', '$state', '$http'];

  function WorkoutProgramController($scope, $stateParams, $state, $http) {
    var vm = this;

    $http.get('/programs/' + $stateParams.programId).then(function (data, status) {
        console.log(data.data);
        $scope.workoutProgram = data.data;
        // TODO: Databind the data.data 

      }, function (error) {
          console.log(error);
      });
    
    console.log($stateParams.programId);

    $scope.goToWorkoutDay = function(day) {
      	$state.go('workout', {"workoutData": $scope.workoutProgram.weeks[day]});
    };

  }
})();
