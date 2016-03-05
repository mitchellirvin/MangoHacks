//Workouts service used to communicate Workouts REST endpoints
(function () {
  'use strict';

  angular
    .module('workouts')
    .factory('WorkoutsService', WorkoutsService);

  WorkoutsService.$inject = ['$resource'];

  function WorkoutsService($resource) {
    return $resource('api/workouts/:workoutId', {
      workoutId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
