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
	  mechanicsType: String,
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

	var ExerciseDB = mongoose.model('Exercise');
	var Program = mongoose.model('Workout');

	// Define error pages
	app.route('/server-error').get(core.renderServerError);

	// Return a 404 for all undefined api, module or lib routes
	app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

	app.route('/exercises')
	.get(function(req, res) {
		ExerciseDB.find(function(err, exercises) {
			if (err) {
				res.send(err);
			}

			res.json(exercises); // return all nerds in JSON format
		});
	})
	.post(function(req, res, next) {
		var exercise = new ExerciseDB(req.body);
		
		exercise.save(function(err, exercise) {
			if(err) {
				return next(err);
			}

			res.json(exercise);
		});
	});

	app.route('/exercises/:exercise_id')
	.get(function(req, res) {
		ExerciseDB.findById(req.params.exercise_id, function(err, exercise) {
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
		var ExperienceLevel = req.body.experienceLevel;
		var goal = req.body.goal;
		var numberOfDays = req.body.numberOfDays;
		var week = [];

		console.log("Experience: " + ExperienceLevel + " goal: " + goal + " num days: " + numberOfDays);

		makeWorkout(numberOfDays, week, ExperienceLevel, goal);

		var programObj = {"weeks": week, "experienceLevel": ExperienceLevel, "type": goal, "numDays": numberOfDays};
		var program = new Program(programObj);
		
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

	// Dat Algorithm Though

	function makeWorkout(numberOfDays, week, ExperienceLevel, goal){		//passed in number of days per week and the week array (holds each day)
		console.log("Experience: " + ExperienceLevel + " goal: " + goal + " num days: " + numberOfDays);
		if(numberOfDays === 1) {
			switch(goal) {
				case 0: 
					week.push([new Exercise("Squats",4,8),new Exercise("Bench Press",4,8),new Exercise("Deadlift",3,6),new Exercise("Rows",4,12)]);
					break;
				case 1:
					week.push([new Exercise("Squats",4,8),new Exercise("Walking Lunges",4,8),new Exercise("Running",30,0)]);
					break;
				case 2:
					week.push([new Exercise("Squats",4,8),new Exercise("Bench Press",4,8),new Exercise("Deadlift",3,6),new Exercise("Running",15,0)]);
					break;
				default:
					break; 
			}
		}
		else {
			for(var i=0; i < numberOfDays; i++){
				if(i%2 === 0){
					makeUpperDay(week, ExperienceLevel, goal);
				}
				else if(i%2 === 1) {
					makeLowerDay(week, ExperienceLevel, goal); 
				}		
			}
		}
		return week; 
	}

	function makeLowerDay(week, ExperienceLevel, goal){
		console.log("Lower Day, Experience: " + ExperienceLevel + " goal: " + goal);
		if(goal == 0){
			console.log("goal 0");
			if(ExperienceLevel == 0){
				week.push([new Exercise("Walking Lunges",3,10),new Exercise("Leg Extensions",3,10),new Exercise("Hamstring Curls",3,10)]);
			} else if(ExperienceLevel == 1){
				week.push([new Exercise("Squats",4,8),new Exercise("Deadlifts",4,6),new Exercise("Hamstring Curls",3,10),new Exercise("Calf Extensions",4,12)]);
			} else {
				console.log("goal = 0, experience not 0 or 1");
				week.push([new Exercise("Squats",3,5),new Exercise("Deadlifts",3,5),new Exercise("Hamstring Curls",4,10),new Exercise("Calf Extensions",4,12)]);
			}
		} else if(goal == 2) {
			if(ExperienceLevel == 0){
				week.push([new Exercise("Walking Lunges",3,10),new Exercise("Leg Extensions",3,10),new Exercise("Elliptical",15,0)]);
			} else if(ExperienceLevel == 1){
				week.push([new Exercise("Squats",4,8),new Exercise("Deadlifts",4,6),new Exercise("Calf Extensions",4,12),new Exercise("Running",15,0)]);
			} else {
				console.log("goal = 2, experience not 0 or 1");
				week.push([new Exercise("Squats",4,8),new Exercise("Deadlifts",4,4),new Exercise("Calf Extensions",4,12),new Exercise("Running",15,0)]);
			}
		} else {
			console.log("goal not 0 or 2, experience not 0 or 1");
			week.push([new Exercise("Squats",4,12),new Exercise("Walking Lunges",4,12),new Exercise("Running",30,0)]);
		}
	}
	function makeUpperDay(week, ExperienceLevel, goal){
		console.log("Upper Day, Experience: " + ExperienceLevel + " goal: " + goal);
		if(goal == 0){
			if(ExperienceLevel == 0){
				week.push([new Exercise("Bench Press",3,10),new Exercise("Lat Pulldowns",3,10),new Exercise("Curls",3,10)]);
			} else if(ExperienceLevel == 1){
				week.push([new Exercise("Bench Press",5,5),new Exercise("Overhead Press",4,8),new Exercise("Pullups",4,6),new Exercise("Curls",3,10)]);
			} else {
				week.push([new Exercise("Bench Press",3,5),new Exercise("Overhead Press",4,6),new Exercise("Pullups",4,10),new Exercise("Curls",3,10)]);
			}
		} else if(goal == 2){
			if(ExperienceLevel == 0){
				week.push([new Exercise("Bench Press",3,10),new Exercise("Lat Pulldowns",3,10),new Exercise("Elliptical",10,0)]);
			} else if(ExperienceLevel == 1){
				week.push([new Exercise("Bench Press",5,5),new Exercise("Overhead Press",4,8),new Exercise("Pullups",4,6),new Exercise("Running",15,0)]);
			} else {
				week.push([new Exercise("Bench Press",3,5),new Exercise("Overhead Press",4,6),new Exercise("Pullups",4,10),new Exercise("Running",15,0)]);
			}
		} else {
			week.push([new Exercise("Bench Press",4,12),new Exercise("Lat Pulldowns",4,12),new Exercise("Running",30,0)]);
		}
	}

	function Exercise(id, sets, reps) {
		this.exerciseId = id;
		this.reps = reps;
		this.sets = sets;
		this.isCompleted = false;
	}
};
