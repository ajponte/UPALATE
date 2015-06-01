/** Node REST APIs for the AvalableFoods collection.
 *  
 *  @author Alan Ponte
 */

'use strict';
var mongoose = require('mongoose');
var AvailableFood = mongoose.model('AvailableFood');


module.exports = function(app) {

	/** Returns all available foods from the DB. */
	app.post('/api/foodData/availableFoods', function(req, res) {
		var data = req.body;
		console.log("DATA NO FILTER:  " + JSON.stringify(data));
		AvailableFood.find({}, function(err, doc) {
			if (err) {
				console.log('error finding all food.');
			} else {
				console.log("food: " + JSON.stringify(doc));
				res.jsonp(doc);
			}

		});
	});

	/** Makes a call to findOne, using a filter defined in the request REQ. */
	app.post('/api/foodData/availableFoods/filter', function(req, res) {
		var data = req.body;
		console.log("DATA FOR FILTER:  " + JSON.stringify(data));
		AvailableFood.findOne(data, function(err, doc) {
			if (err) {
				console.log('error finding all food.');
			} else {
				console.log("food: " + JSON.stringify(doc));
				res.jsonp(doc);
			}

		});
	});
}
