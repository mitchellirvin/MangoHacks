(function() {
  'use strict';

  angular
    .module('core')
    .controller('WorkoutSetupController', WorkoutSetupController);

  WorkoutSetupController.$inject = ['$scope'];

  function WorkoutSetupController($scope) {
    var vm = this;
    var numDays = 0;

    // Workout setup controller logic
    // ...
    $(function() {
      $('select').material_select();
      vm.numDays = $('#workout-setup-form select[name=days]').val();
    });

    $('#workout-setup-form select[name=days]').on('change',function(){
      console.log('select has changed to:',$(this).val());
      vm.numDays = $(this).val();
    });

    $scope.generateWorkout = function() {
//      console.log(noDays);
      console.log(vm.noDays);
    };
  }
})();
