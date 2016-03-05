'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Workout = mongoose.model('Workout'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Workout
 */
exports.create = function(req, res) {
  var workout = new Workout(req.body);
  workout.user = req.user;

  workout.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(workout);
    }
  });
};

/**
 * Show the current Workout
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var workout = req.workout ? req.workout.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  workout.isCurrentUserOwner = req.user && workout.user && workout.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(workout);
};

/**
 * Update a Workout
 */
exports.update = function(req, res) {
  var workout = req.workout ;

  workout = _.extend(workout , req.body);

  workout.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(workout);
    }
  });
};

/**
 * Delete an Workout
 */
exports.delete = function(req, res) {
  var workout = req.workout ;

  workout.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(workout);
    }
  });
};

/**
 * List of Workouts
 */
exports.list = function(req, res) { 
  Workout.find().sort('-created').populate('user', 'displayName').exec(function(err, workouts) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(workouts);
    }
  });
};

/**
 * Workout middleware
 */
exports.workoutByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Workout is invalid'
    });
  }

  Workout.findById(id).populate('user', 'displayName').exec(function (err, workout) {
    if (err) {
      return next(err);
    } else if (!workout) {
      return res.status(404).send({
        message: 'No Workout with that identifier has been found'
      });
    }
    req.workout = workout;
    next();
  });
};
