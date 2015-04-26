'use strict';

var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	FoodSurvey   = mongoose.model('FoodSurvey');


module.exports = function(app) {
	app.post('/api/users/submitSurvey', function(req, res) {
		var survey = req.body;
		console.log('Surevey: ' + JSON.stringify(survey));
	})
};


