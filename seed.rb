require 'json'
require 'net/http'

workouts = JSON.parse(File.read('workout.json'))

workouts.each do |workout|
	name = workout.keys.at(0)
	body = workout[name]

	equipment = body['Equipment'].lstrip if body['Equipment']
	force = body['Force'].lstrip if body['Force']
	level = body['Level'].lstrip if body['Level']
	primaryMuscleGroup = body['Main Muscle Worked'].lstrip if body['Main Muscle Worked']
	mechanicsType = body['Mechanics Type'].lstrip if body['Mechanics Type']
	sportstr = body['Sport'].lstrip if body['Sport']
	sport = sportstr == 'Yes'
	type = body['Type'].lstrip if body['Type']
	guide = body['guide']
	link = body['link']
	picLeft = body['pic_left']
	picRight = body['pic_right']

	new_workout = {name: name, equipment: equipment, force: force, level: level, primaryMuscleGroup: primaryMuscleGroup, mechanicsType: mechanicsType, sport: sport, type: type, guide: guide, link: link, picLeft: picLeft, picRight: picRight}

	# uri = URI.parse('localhost:3000/exercises')
	# req = Net::HTTP::Post.new(uri, initheader = {'Content-Type' =>'application/json'})
	# req.body = new_workout
	# res = Net::HTTP.start(uri.hostname, uri.port) do |http|
 #  		http.request(req)
	# end

	uri = URI.parse("http://127.0.0.1:3000")
	http = Net::HTTP.new(uri.host, uri.port)
	request = Net::HTTP::Post.new("/exercises")
	request.add_field('Content-Type', 'application/json')
	request.body = new_workout.to_json
	response = http.request(request)
end