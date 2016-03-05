'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Workout Schema
 */
var WorkoutSchema = new Schema({
  workoutProgram: [{
    weeks: [{
      days: [{
        isCompleted: Boolean,
        ExerciseID: Number,
        reps: Number,
        sets: Number
      }]
    }],
    ExperienceLevel: String,
    type: String,
    numDays: Number,
    workoutID: Number
  }]
});

mongoose.model('Workout', WorkoutSchema);
