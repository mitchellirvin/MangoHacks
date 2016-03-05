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
  program: {
    weeks: [
        [
          [
            { 
              isCompleted: Boolean, 
              exerciseId: Number,
              reps: Number,
              sets: Number
            }
          ]
        ]
      ]
    experienceLevel: String,
    type: String,
    numDays: Number,
    _id: Number
  }
});

mongoose.model('Workout', WorkoutSchema);
