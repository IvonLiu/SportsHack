var api_config = require('./api_config.js');
var Parse = require('parse/node').Parse;
Parse.initialize(api_config.Parse.API_KEY, api_config.Parse.JS_KEY);

var urlList = ["https://www.youtube.com/watch?v=uxpDa-c-4Mc", "https://www.youtube.com/watch?v=_OBlgSz8sSM", "https://www.youtube.com/watch?v=kfVsfOSbJY0", "https://www.youtube.com/watch?v=88YovCsnMxs", "https://www.youtube.com/watch?v=Ywtd719FPpM"];
var commentList = ["The ornament collaborates the prose.", "The account pioneers the noisy opinion.", "The empty rule counsels the person.", "The trouble directs the ratty curve.", "The smile gathers the reason."];

var playerQuery = new Parse.Query("Player");
playerQuery.find({
	success: function(players) {
		for (var i=0; i<players.length; i++) {
			var player = players[i];
			length = Math.random() * 10 + 10;
			for (var j=0; j<length; j++) {
				var x = Math.random() * 5;
				var y = Math.random() * 5;
				var params = {
					playerId: player.id,
					videoUrl: urlList[x],
					caption: commentList[y]
				};
				for (var useless=0; useless<20000000; useless++) {
					// useless
				}
				console.log("Adding something");
				Parse.Cloud.run('Players_uploadVideo', params, {
					success: function(response) {
						console.log("Added media");
					},
					error: function(error) {
						console.log(JSON.stringify(error));
					}
				});
			}
		}
	},
	error: function(object, error) {
		console.log(error.code + ", " + error.message);
	}
});