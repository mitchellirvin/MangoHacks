(function() {
  'use strict';

  angular
    .module('core')
    .controller('WorkoutSetupController', WorkoutSetupController);

  WorkoutSetupController.$inject = ['$scope', '$stateParams', '$http'];

  function WorkoutSetupController($scope, $stateParams, $http) {
    var vm = this;
    // Workout setup controller logic
    // ...
    $(function() {
      $('select').material_select();
      vm.numDays = $('#workout-setup-form select[name=days]').val();
      $('#beginner').prop("checked", true);
    });

    $('#workout-setup-form select[name=days]').on('change',function(){
      vm.numDays = $(this).val();
    });

    $scope.generateWorkout = function() {
      console.log('Num Days: ' + vm.numDays);
      console.log('Skill Level: ' + $('input[name="group1"]:checked').val());
      console.log('Workout Type: ' + $stateParams.type);
      var data = { "experienceLevel": $('input[name="group1"]:checked').val(), "goal": $stateParams.type, "numberOfDays": vm.numDays };

      $http.post('/programs', data).then(function (data, status) {
        console.log(data.data);
        // TODO: Go to next controller passing in data.data as state param
      }, function (error) {
          console.log(error);
      });
 /*     workouts.numDays = data.data.numDays;
      workouts.type = data.data.type;
      workouts.skill = data.data.skill;*/
    };
  }
})();
