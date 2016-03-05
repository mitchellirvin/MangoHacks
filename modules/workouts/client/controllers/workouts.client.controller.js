(function () {
  'use strict';

  // Workouts controller
  angular
    .module('workouts')
    .controller('WorkoutsController', WorkoutsController);

  WorkoutsController.$inject = ['$scope', '$state', 'Authentication', 'workoutResolve'];

  function WorkoutsController ($scope, $state, Authentication, workout) {
    var vm = this;

    vm.authentication = Authentication;
    vm.workout = workout;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Workout
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.workout.$remove($state.go('workouts.list'));
      }
    }

    // Save Workout
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.workoutForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.workout._id) {
        vm.workout.$update(successCallback, errorCallback);
      } else {
        vm.workout.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('workouts.view', {
          workoutId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
