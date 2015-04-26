'use strict';
var mongoose = require('mongoose');
var AvailableFood = mongoose.model('AvailableFood');


module.exports = function(app) {
	app.post('/api/foodData/availableFoods', function(req, res) {
		var data = req.body;
		console.log("DATA:  " + JSON.stringify(data));
		AvailableFood.find({}, function(err, doc) {
			if (err) {
				console.log('error finding all food.');
			} else {
				console.log("food: " + JSON.stringify(doc));
				res.jsonp(doc);
			}

		});
	});
}
