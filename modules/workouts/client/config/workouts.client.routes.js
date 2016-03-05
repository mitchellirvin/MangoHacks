(function () {
  'use strict';

  angular
    .module('workouts')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('workouts', {
        abstract: true,
        url: '/workouts',
        template: '<ui-view/>'
      })
      .state('workouts.list', {
        url: '',
        templateUrl: 'modules/workouts/client/views/list-workouts.client.view.html',
        controller: 'WorkoutsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Workouts List'
        }
      })
      .state('workouts.create', {
        url: '/create',
        templateUrl: 'modules/workouts/client/views/form-workout.client.view.html',
        controller: 'WorkoutsController',
        controllerAs: 'vm',
        resolve: {
          workoutResolve: newWorkout
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Workouts Create'
        }
      })
      .state('workouts.edit', {
        url: '/:workoutId/edit',
        templateUrl: 'modules/workouts/client/views/form-workout.client.view.html',
        controller: 'WorkoutsController',
        controllerAs: 'vm',
        resolve: {
          workoutResolve: getWorkout
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Workout {{ workoutResolve.name }}'
        }
      })
      .state('workouts.view', {
        url: '/:workoutId',
        templateUrl: 'modules/workouts/client/views/view-workout.client.view.html',
        controller: 'WorkoutsController',
        controllerAs: 'vm',
        resolve: {
          workoutResolve: getWorkout
        },
        data:{
          pageTitle: 'Workout {{ articleResolve.name }}'
        }
      });
  }

  getWorkout.$inject = ['$stateParams', 'WorkoutsService'];

  function getWorkout($stateParams, WorkoutsService) {
    return WorkoutsService.get({
      workoutId: $stateParams.workoutId
    }).$promise;
  }

  newWorkout.$inject = ['WorkoutsService'];

  function newWorkout(WorkoutsService) {
    return new WorkoutsService();
  }
})();
