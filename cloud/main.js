/**
 * This is the complete list of Cloud Code functions
 * the backend supports right now. Think of this as
 * the header file. However, since this is Cloud Code,
 * the way you call methods is slightly different than
 * the way you call normal JavaScript methods.
 *
 * Sample:
 *
 * If a cloud function were defined as

 	Parse.Cloud.define("sample_cloud_function", sampleCloudFunction.main);

 * then, you would call it with

	Parse.Cloud.run('sample_cloud_function', params, {
	    success: function(object) {
	        // Handle success here
		},
	    error: function(error) {
	        // Handle error here
	    }
	});

 * Notes:
 * 
 * - Because of Cloud Code limitations, put arguments into params object as such:

	params = {
		arg0: value0,
		arg1: value1,
		// ...
		argN: valueN
	};

 * - Response will be a JSON object containing the repsonse code and a data object
 * 	if the method is supposed to return a value. Otherwise the data object will
 *	be undefined. There will always be a response code. You may find out what the
 *	response code means in cloud/error_codes.js.
 */

/**************************/
/********** Fans **********/
/**************************/

var Fans = require('cloud/fans.js');

/** Static */
// nothing here yet

/** Instance*/

/**
 * Initializes points to zero
 */
Parse.Cloud.define("Fans_init", Fans.init_cloud);

/** 
 * Share a media object
 * @param {String} mediaId
 */
Parse.Cloud.define("Fans_shareMedia", Fans.shareMedia_cloud);

/**
 * Gets a list of top matches
 * @return {Player[]} players
 */
Parse.Cloud.define("Fans_findPlayerMatches", Fans.Fans_findPlayerMatches_cloud);

/**
 * Sets a player to follow
 * @param {String} playerId
 */
Parse.Cloud.define("Fans_setFollowedPlayer", Fans.setFollowerPlayed_cloud);

/**
 * Get feed for user
 * @return {Media[]} feed
 */
Parse.Cloud.define("Fans_getFeed", Fans.getFeed_cloud);

/*****************************/
/********** Players **********/
/*****************************/

var Players = require('cloud/players.js');

/** Static */

/**
 * Search player by name
 * @param {String} playerName
 * @return {Player} player
 */
Parse.Cloud.define("Players_searchByName", Players.searchByName);

/** Instance */

/**
 * Initialize players.
 * Links user to Player object
 */
Parse.Cloud.define("Players_init", Players.init_cloud);

/**
 * Get player info
 * @param {String} playerId
 * @return {Player} player
 */
Parse.Cloud.define("Players_getInfo", Players.getInfo_cloud);

/**
 * Add a media object
 * @param {String} videoUrl
 * @param {String} caption
 * @return {Media} the created media object
 */
Parse.Cloud.define("Players_uploadVideo", Players.uploadVideo_cloud);
