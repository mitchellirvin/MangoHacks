'use strict';

/**
 * Module dependencies
 */
var workoutsPolicy = require('../policies/workouts.server.policy'),
  workouts = require('../controllers/workouts.server.controller');

module.exports = function(app) {
  // Workouts Routes
  app.route('/api/workouts').all(workoutsPolicy.isAllowed)
    .get(workouts.list)
    .post(workouts.create);

  app.route('/api/workouts/:workoutId').all(workoutsPolicy.isAllowed)
    .get(workouts.read)
    .put(workouts.update)
    .delete(workouts.delete);

  // Finish by binding the Workout middleware
  app.param('workoutId', workouts.workoutByID);
};
