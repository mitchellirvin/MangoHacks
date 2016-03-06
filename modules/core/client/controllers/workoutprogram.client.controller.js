(function() {
  'use strict';

  angular
    .module('core')
    .controller('WorkoutProgramController', WorkoutProgramController);

  WorkoutProgramController.$inject = ['$scope', '$stateParams', '$http'];

  function WorkoutProgramController($scope, $stateParams, $http) {
    var vm = this;

    $http.get('/programs/' + $stateParams.programId).then(function (data, status) {
        console.log(data.data);
        // TODO: Databind the data.data 

      }, function (error) {
          console.log(error);
      });
    
    console.log($stateParams.programId);

  }
})();
