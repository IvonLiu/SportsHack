exports.init_cloud = init_cloud;
exports.shareMedia_cloud = shareMedia_cloud;
exports.findPlayerMatches_cloud = findPlayerMatches_cloud;
exports.setFollowedPlayer_cloud = setFollowedPlayer_cloud;

var ResponseCodes = require('cloud/response_codes.js');

function init_cloud(request, response) {
	var username = request.params.username;

	var email 
	var tag = request.params.tag;
	init(username, tag, {
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
	var username = request.params.username;
	var tag = request.params.tag;
	shareMedia(username, tag, {
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
	var username = request.params.username;
	var tag = request.params.tag;
	findPlayerMatches(username, tag, {
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
	var username = request.params.username;
	var tag = request.params.tag;
	setFollowedPlayer(username, tag, {
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

