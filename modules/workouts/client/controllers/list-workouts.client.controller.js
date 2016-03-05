(function () {
  'use strict';

  angular
    .module('workouts')
    .controller('WorkoutsListController', WorkoutsListController);

  WorkoutsListController.$inject = ['WorkoutsService'];

  function WorkoutsListController(WorkoutsService) {
    var vm = this;

    vm.workouts = WorkoutsService.query();
  }
})();
