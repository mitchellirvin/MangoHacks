'use strict';

var reps,
	sets;

var inputDay = 2;
var inputExperience = "beginner";

var ExperienceLevel = inputExperience;
var goal = "strength";
var week = [];
var numberOfDays = inputDay;
//days[exercise1,exercise2]
// var exercise1 = {};
// exercise1[sets] = 5;
// exercise1[reps] = 8; 
// exercise1[id] = exerciseID;

//makeWorkout(numberOfDays,week,ExperienceLevel,0);

function makeWorkout(numberOfDays, week, ExperienceLevel, goal){		//passed in number of days per week and the week array (holds each day)
	if(numberOfDays == 1) {
		switch(goal) {
			case "strength": 
				week.push([{"Squats",4,8},{"Bench Press",4,8},{"Deadlift",3,6},{"Rows",4,12}]);
				break;
			case "weight loss":
				week.push([{"Squats",4,8},{"Walking Lunges",4,8},{"Running",30,0}]);
				break;
			case "balanced":
				week.push([{"Squats",4,8},{"Bench Press",4,8},{"Deadlift",3,6},{"Running",15,0}]);
				break;
			default:
				break; 
		}
	}
	else {
		for(int i=0; i < numberOfDays; i++){
			if(i%2 == 0){
				makeUpperDay(week, ExperienceLevel, goal);
			}
			else if(i%2 == 1) {
				makeLowerDay(week, ExperienceLevel, goal); 
			}		
		}
	}
}

function makeLowerDay(week, ExperienceLevel, goal){
	if(goal == "strength"){
		if(ExperienceLevel == "Beginner"){
			week.push([{"Walking Lunges",3,10},{"Leg Extensions",3,10},{"Hamstring Curls",3,10}]);
		} else if(ExperienceLevel == "Intermediate"){
			week.push([{"Squats",4,8},{"Deadlifts",4,6},{"Hamstring Curls",3,10},{"Calf Extensions",4,12}]);
		} else {
			week.push([{"Squats",3,5},{"Deadlifts",3,5},{"Hamstring Curls",4,10},{"Calf Extensions",4,12}]);
		}
	} else if(goal == "balanced") {
		if(ExperienceLevel == "Beginner"){
			week.push([{"Walking Lunges",3,10},{"Leg Extensions",3,10},{"Elliptical",15,0}]);
		} else if(ExperienceLevel == "Intermediate"){
			week.push([{"Squats",4,8},{"Deadlifts",4,6},{"Calf Extensions",4,12},{"Running",15,0}]);
		} else {
			week.push([{"Squats",4,8},{"Deadlifts",4,4},{"Calf Extensions",4,12},{"Running",15,0}]);
		}
	} else {
		week.push([{"Squats",4,12},{"Walking Lunges",4,12},{"Running",30,0}]);
	}
}
function makeUpperDay(week, ExperienceLevel, goal){
	if(goal == "strength"){
		if(ExperienceLevel == "Beginner"){
			week.push([{"Bench Press",3,10},{"Lat Pulldowns",3,10},{"Curls",3,10}]);
		} else if(ExperienceLevel == "Intermediate"){
			week.push([{"Bench Press",5,5},{"Overhead Press",4,8},{"Pullups",4,6},{"Curls",3,10}]);
		} else {
			week.push([{"Bench Press",3,5},{"Overhead Press",4,6},{"Pullups",4,10},{"Curls",3,10}]);
		}
	} else if(goal == "balanced"){
		if(ExperienceLevel == "Beginner"){
			week.push([{"Bench Press",3,10},{"Lat Pulldowns",3,10},{"Elliptical",10,0}]);
		} else if(ExperienceLevel == "Intermediate"){
			week.push([{"Bench Press",5,5},{"Overhead Press",4,8},{"Pullups",4,6},{"Running",15,0}]);
		} else {
			week.push([{"Bench Press",3,5},{"Overhead Press",4,6},{"Pullups",4,10},{"Running",15,0}]);
		}
	} else {
		week.push([{"Bench Press",4,12},{"Lat Pulldowns",4,12},{"Running",30,0}]);
	}
}


