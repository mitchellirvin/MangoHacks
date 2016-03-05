(function() {
  'use strict';

  angular
    .module('core')
    .controller('WorkoutSetupController', WorkoutSetupController);

  WorkoutSetupController.$inject = ['$scope', '$stateParams'];

  function WorkoutSetupController($scope, $stateParams) {
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
    };
  }
})();
