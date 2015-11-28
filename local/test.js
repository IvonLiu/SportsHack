var fs = require('fs');
var api_config = require('./api_config.js');
var Parse = require('parse/node').Parse;
Parse.initialize(api_config.Parse.API_KEY, api_config.Parse.JS_KEY);

var Player = Parse.Object.extend("Player");

//var csv is the CSV file with headers
function csvJSON(csv){

  	var lines=csv.split("\n");

  	var result = [];

  	var headers=lines[0].replace("\r", "").split(",");

  	for(var i=1;i<lines.length;i++){

	  	var obj = {};
	  	var currentline=lines[i].replace("\r", "").split(",");

	  	for(var j=0;j<headers.length;j++){
		  	obj[headers[j]] = currentline[j];
	  	}

	  	result.push(obj);

  	}
  
  	//return result; //JavaScript object
  	return result; //JSON
}

console.log("Reading JSON file");
var roster = csvJSON(fs.readFileSync('data/output/roster.csv', 'utf8'));

for (var i=0; i<roster.length; i++) {
	r = roster[i]
	var player = new Player();
	player.save({
		city: r.City,
		roster_id: parseInt(r.ID),
		state: r.State,
		height: parseInt(r.height),
		weight: parseFloat(r.weight),
		season: parseInt(r.season),
		season_type: r.season_type,
		team_id: parseInt(r.team_id),
		games: r.games,
		touchdowns: parseInt(r.touchdowns),
		points: parseInt(r.points),
		two_point_points: parseInt(r.two_point_points),
		total_singles: parseInt(r.total_singles),
		punt_singles: parseInt(r.punt_singles),
		field_goal_singles: parseInt(r.field_goal_singles),
		kickoff_singles: parseInt(r.kickoff_singles),
		fumbles: parseInt(r.fumbles),
		fumbles_lost: parseInt(r.fumbles_lost),
		fumble_return_yards: parseInt(r.fumble_return_yards),
		fumble_touchdowns: parseInt(r.fumble_touchdowns)
    }, {
      	success: function(player) {
        	// Execute any logic that should take place after the object is saved.
        	console.log('New object created with title: ' + player.get("roster_id"));
      	},
      	error: function(player, error) {
	        // Execute any logic that should take place if the save fails.
        	// error is a Parse.Error with an error code and message.
        	console.log('Failed to create new object (' + player.get("roster_id") + '), with error code: ' + error.message);
      	}
    });
}