exports.getSeasons_cloud = getSeasons_cloud;
exports.searchByName_cloud = searchByName_cloud;
exports.searchByRosterId_cloud = searchByRosterId_cloud;
exports.init_cloud = init_cloud;
exports.uploadVideo_cloud = uploadVideo_cloud;

exports.searchByName = searchByName;

var ResponseCodes = require('cloud/response_codes.js');
var Media = Parse.Object.extend("Media");

function getSeasons_cloud(request, response) {
	var playerId = request.params.playerId;
	getSeasons(playerId, {
		success: function(responseCode, object) {
			response.success({
				code: responseCode,
				data: object
			});
		},
		error: function(responseCode, errorMsg) {
			response.success({
				code: responseCode,
				data: errorMsg
			});
		}
	});
}

function searchByName_cloud(request, response) {
	var playerName = request.params.playerName;
	searchByName(playerName, {
		success: function(responseCode, object) {
			response.success({
				code: responseCode,
				data: object
			});
		},
		error: function(responseCode, errorMsg) {
			response./*error*/success({
				code: responseCode,
				data: errorMsg
			});
		}
	});
}

function searchByRosterId_cloud(request, response) {
	var rosterId = request.params.rosterId;
	searchByRosterId(rosterId, {
		success: function(responseCode, object) {
			response.success({
				code: responseCode,
				data: object
			});
		},
		error: function(responseCode, errorMsg) {
			response./*error*/success({
				code: responseCode,
				data: errorMsg
			});
		}
	});
}

function init_cloud(request, response) {
	var user = request.user;
	init(user, {
		success: function(responseCode, object) {
			response.success({
				code: responseCode,
				data: object
			});
		},
		error: function(responseCode, errorMsg) {
			response./*error*/success({
				code: responseCode,
				data: errorMsg
			});
		}
	});
}

function uploadVideo_cloud(request, response) {
	var playerId = request.params.playerId;
	var videoUrl = request.params.videoUrl;
	var caption = request.params.caption;
	uploadVideo(playerId, videoUrl, caption, {
		success: function(responseCode, object) {
			response.success({
				code: responseCode,
				data: object
			});
		},
		error: function(responseCode, errorMsg) {
			response./*error*/success({
				code: responseCode,
				data: errorMsg
			});
		}
	});
}

function getSeasons(playerId, callbacks) {
	var playerQuery = new Parse.Query("Player");
	playerQuery.equalTo("objectId", playerId);
	playerQuery.first({
		success: function(player) {
			var seasonsQuery = player.relation("seasons").query();
			seasonsQuery.addDescending("season");
			seasonsQuery.find({
				success: function(seasons) {
					callbacks.success(ResponseCodes.OK, seasons);
					return;
				},
				error: function(object, error) {
					callbacks.error(error.code, error.message);
					return;
				}
			});
		},
		error: function(object, error) {
			callbacks.error(error.code, error.message);
			return;
		}
	});
}

function searchByName(playerName, callbacks) {
	var firstName = playerName.split(" ")[0];
	var lastName = playerName.split(" ")[1];
	
	var playerQuery = new Parse.Query("Player");
	playerQuery.equalTo("first", firstName);
	playerQuery.equalTo("last", lastName);
	playerQuery.first({
		success: function(player) {
			callbacks.success(ResponseCodes.OK, player);
			return;
		},
		error: function(object, error) {
			callbacks.error(error.code, error.message);
			return;
		}
	});
}

function searchByRosterId(rosterId, callbacks) {
	var playerQuery = new Parse.Query("Player");
	playerQuery.equalTo("roster_id", rosterId);
	playerQuery.first({
		success: function(player) {
			callbacks.success(ResponseCode.OK, player);
			return;
		},
		error: function(object, error) {
			callbacks.error(error.code, error.message);
			return;
		}
	});
}

function init(user, callbacks) {
	var playerQuery = new Parse.Query("Player");
	playerQuery.equalTo("roster_id", user.get("roster_id"));
	playerQuery.first({
		success: function(player) {
			user.set("isPlayer", player);
		},	
		error: function(object, error) {
			callbacks.error(error.code, error.message);
			return;
		}
	});
}

function uploadVideo(playerId, videoUrl, caption, callbacks) {

	var playerQuery = new Parse.Query("Player");
	playerQuery.equalTo("objectId", playerId);
	playerQuery.first({
		success: function(player) {
			var media = new Media();
			media.save({
				createdBy: player,
				url: videoUrl,
				caption: caption
		    }, {
		      	success: function(media) {
  					player.relation("media").add(media);
      				player.save(null, {
      					success: function(player) {
      						callbacks.success(ResponseCodes.OK, media);        	
							return;
      					},
      					error: function(object, error) {
      						callbacks.error(error.code, error.message);
      						return;
      					}
      				});
				},
				error: function(object, error) {
  					callbacks.error(error.code, error.message);
      				return;
      			}	
      		});
      	},
      	error: function(object, error) {
	        callbacks.error(error.code, error.message);
	        return;
      	}
    });
}