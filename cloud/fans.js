exports.init_cloud = init_cloud;
exports.shareMedia_cloud = shareMedia_cloud;
exports.findPlayerMatches_cloud = findPlayerMatches_cloud;
exports.setFollowedPlayer_cloud = setFollowedPlayer_cloud;
exports.getFeed_cloud = getFeed_cloud;

var ResponseCodes = require('cloud/response_codes.js');

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

function shareMedia_cloud(request, response) {
	var user = request.user;
	var mediaId = request.params.mediaId;
	shareMedia(user, mediaId, {
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

function findPlayerMatches_cloud(request, response) {
	var ids = request.params.ids;
	findPlayerMatches(ids, {
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

function setFollowedPlayer_cloud(request, response) {
	var user = request.user;
	var playerId = request.params.playerId;
	setFollowedPlayer(user, playerId, {
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

function getFeed_cloud(request, response) {
	var user = request.user;
	getFeed(user, {
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

function init(user, callbacks) {
	user.set('points', 0);
	user.save();
	user.save(null, {
		success: function(user) {
			callbacks.success(ResponseCodes.OK, null);
			return;
		},
		error: function(object, error) {
			callbacks.error(error.code, error.message);
			return;
		}
	});
}

function shareMedia(user, mediaId, callbacks) {
	user.set('points', user.get("points") + 1);
	user.save(null, {
		success: function(user) {
			var mediaQuery = new Parse.Query("Media");
			mediaQuery.equalTo("objectId", mediaId);
			mediaQuery.first({
				success: function(media) {
					media.relation("sharedBy").add(user);
					media.save(null, {
						success: function(media) {
							callbacks.success(ResponseCodes.OK, null);
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
				}
			});
		},
		error: function(object, error) {
			callbacks.error(error.code, error.message);
			return;
		}
	});
}

function findPlayerMatches(ids, callbacks) {
	players = [];
	var count = 0;
	for (var i=0; i<ids.length; i++) {
		var query = new Parse.Query("Player");
		query.equalTo("roster_id", ids[i]);
		query.first({
			success: function(player) {
				count++;
				players.push(player);
				if (count == ids.length) {
					callbacks.success(ResponseCodes.OK, players);				
					return;
				}
			},
			error: function(object, error) {
				callbacks.error(error.code, error.message);
				return;
			}
		});
	}
}

function setFollowedPlayer(user, playerId, callbacks) {
	var playerQuery = new Parse.Query("Player");
	playerQuery.equalTo("roster_id", playerId);
	playerQuery.first({
		success: function(player) {
			user.set("followerPlayer", player);
			user.save(null, {
				success: function(user) {
					callbacks.success(ResponseCodes.OK, null);
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

function getFeed(user, callbacks) {
	var mediaQuery = user.get("followedPlayer").relation("media").query();
	mediaQuery.addDescending("createdAt");
	mediaQuery.find({
		success: function(feed) {
			callbacks.success(ResponseCodes.OK, feed);
		},
		error: function(object, error) {
			callbacks.error(error.code, error.message);
			return;
		}
	});
}