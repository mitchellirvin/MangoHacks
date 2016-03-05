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
      vm.numDays = $('#workout-setup-form select[name=days]').val();
    });

    $('#workout-setup-form select[name=days]').on('change',function(){
      vm.numDays = $(this).val();
    });

    $scope.generateWorkout = function() {
//      console.log(noDays);
      console.log(vm.numDays);
      console.log($('#workout-setup-form select[name=days]').val(););
      
    };
  }
})();
