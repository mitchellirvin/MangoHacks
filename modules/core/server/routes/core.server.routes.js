'use strict';

module.exports = function (app) {
	/**
	 * Module dependencies.
	 */
	var mongoose = require('mongoose'),
	  Schema = mongoose.Schema;

	/**
	 * Workout Schema
	 */
	// var WorkoutProgramSchema = new Schema({
	//   weeks: [
	//     [
	//       [
	//         { 
	//           isCompleted: Boolean, 
	//           exerciseId: Number,
	//           reps: Number,
	//           sets: Number
	//         }
	//       ]
	//     ]
	//   ],
	//   experienceLevel: String,
	//   type: String,
	//   numDays: Number
	// });

	var WorkoutProgramSchema = new Schema({
	  weeks: Schema.Types.Mixed,
	  experienceLevel: String,
	  type: String,
	  numDays: Number
	});

	var ExerciseSchema = new Schema({
	  name: String,
	  equipment: String,
	  force: String,
	  level: String,
	  primaryMuscleGroup: String,
	  mechanicstType: String,
	  sport: Boolean,
	  type: String,
	  guide: Array,
	  link: String,
	  picLeft: String,
	  picRight: String
	});

	mongoose.model('Workout', WorkoutProgramSchema);
	mongoose.model('Exercise', ExerciseSchema);

	// Root routing
	var core = require('../controllers/core.server.controller');

	var Exercise = mongoose.model('Exercise');
	var Program = mongoose.model('Workout');

	// Define error pages
	app.route('/server-error').get(core.renderServerError);

	// Return a 404 for all undefined api, module or lib routes
	app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

	app.route('/exercises')
	.get(function(req, res) {
		Exercise.find(function(err, exercises) {
			if (err) {
				res.send(err);
			}

			res.json(exercises); // return all nerds in JSON format
		});
	})
	.post(function(req, res, next) {
		var exercise = new Exercise(req.body);
		
		exercise.save(function(err, exercise) {
			if(err) {
				return next(err);
			}

			res.json(exercise);
		});
	});

	app.route('/exercises/:exercise_id')
	.get(function(req, res) {
		Exercise.findById(req.params.exercise_id, function(err, exercise) {
			if (err) {
				res.send(err);
			}

			res.json(exercise);
		});
	});

	app.route('/programs')
	.get(function(req, res) {
		Program.find(function(err, exercises) {
			if (err) {
				res.send(err);
			}

			res.json(exercises); // return all nerds in JSON format
		});
	})
	.post(function(req, res, next) {
		var program = new Program(req.body);
		
		program.save(function(err, program) {
			if(err) {
				return next(err);
			}

			res.json(program);
		});
	});

	app.route('/programs/:program_id')
	.get(function(req, res) {
		Program.findById(req.params.program_id, function(err, program) {
			if (err) {
				res.send(err);
			}

			res.json(program);
		});
	});

	// Define application route
	app.route('/*').get(core.renderIndex);
};
