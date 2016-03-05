(function () {
  'use strict';

  angular
    .module('workouts')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Workouts',
      state: 'workouts',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'workouts', {
      title: 'List Workouts',
      state: 'workouts.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'workouts', {
      title: 'Create Workout',
      state: 'workouts.create',
      roles: ['user']
    });
  }
})();
