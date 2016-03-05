(function () {
  'use strict';

  describe('Workouts Route Tests', function () {
    // Initialize global variables
    var $scope,
      WorkoutsService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _WorkoutsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      WorkoutsService = _WorkoutsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('workouts');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/workouts');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          WorkoutsController,
          mockWorkout;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('workouts.view');
          $templateCache.put('modules/workouts/client/views/view-workout.client.view.html', '');

          // create mock Workout
          mockWorkout = new WorkoutsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Workout Name'
          });

          //Initialize Controller
          WorkoutsController = $controller('WorkoutsController as vm', {
            $scope: $scope,
            workoutResolve: mockWorkout
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:workoutId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.workoutResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            workoutId: 1
          })).toEqual('/workouts/1');
        }));

        it('should attach an Workout to the controller scope', function () {
          expect($scope.vm.workout._id).toBe(mockWorkout._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/workouts/client/views/view-workout.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          WorkoutsController,
          mockWorkout;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('workouts.create');
          $templateCache.put('modules/workouts/client/views/form-workout.client.view.html', '');

          // create mock Workout
          mockWorkout = new WorkoutsService();

          //Initialize Controller
          WorkoutsController = $controller('WorkoutsController as vm', {
            $scope: $scope,
            workoutResolve: mockWorkout
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.workoutResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/workouts/create');
        }));

        it('should attach an Workout to the controller scope', function () {
          expect($scope.vm.workout._id).toBe(mockWorkout._id);
          expect($scope.vm.workout._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/workouts/client/views/form-workout.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          WorkoutsController,
          mockWorkout;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('workouts.edit');
          $templateCache.put('modules/workouts/client/views/form-workout.client.view.html', '');

          // create mock Workout
          mockWorkout = new WorkoutsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Workout Name'
          });

          //Initialize Controller
          WorkoutsController = $controller('WorkoutsController as vm', {
            $scope: $scope,
            workoutResolve: mockWorkout
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:workoutId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.workoutResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            workoutId: 1
          })).toEqual('/workouts/1/edit');
        }));

        it('should attach an Workout to the controller scope', function () {
          expect($scope.vm.workout._id).toBe(mockWorkout._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/workouts/client/views/form-workout.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
