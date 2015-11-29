var api_config = require('./api_config.js');
var Parse = require('parse/node').Parse;
Parse.initialize(api_config.Parse.API_KEY, api_config.Parse.JS_KEY);

var seasonQuery = new Parse.Query("Season");
seasonQuery.find({
	success: function(seasons) {
		var playerQuery = new Parse.Query("Player");
		playerQuery.find({
			success: function(players) {
				for (var i=0; i<players.length; i++) {
					var player = players[i];
					console.log("Starting " + player.get("first") + " " + player.get("last"));
					for (var j=0; j<seasons.length; j++) {
						if (seasons[j].get("roster_id") == player.get("roster_id")) {
							player.relation("seasons").add(seasons[j]);
						}
					}
					player.save(null, {
						success: function(saved) {
							console.log("Done something");
						},
						error: function(object, error) {
							console.log(error.code + ", " + error.message);
						}
					});
				}
			},
			error: function(object, error) {
				console.log(erorr.code + ", " + error.message);
			}
		});
	},
	error: function(object, error) {
		console.log(error.code + ", " + error.message);
	}
});