/** Routes for saving survey info.
 *  @author Alan Ponte
 */

'use strict';
var mongoose = require('mongoose');
var FoodSurvey = mongoose.model('FoodSurvey');
var User = mongoose.model('User');

module.exports = function(app) {
	app.post('/api/users/submitSurvey', function(req, res) {
		var survey = req.body;
		console.log('Surevey: ' + JSON.stringify(survey));

		// The constructor will save this object
		var surveyObj = {
			yesterday: {
				breakfast: survey.yesterday.breakfast,
				lunch: survey.yesterday.lunch,
				dinner: survey.yesterday.dinner
			},
			dayBeforeYesterday: {
				breakfast: survey.dayBeforeYesterday.breakfast,
				lunch: survey.dayBeforeYesterday.lunch,
				dinner: survey.dayBeforeYesterday.dinner
			},
			twoDaysBeforeYesterday: {
				breakfast: survey.twoDaysBeforeYesterday.breakfast,
				lunch: survey.twoDaysBeforeYesterday.lunch,
				dinner: survey.twoDaysBeforeYesterday.dinner
			}, 
			user: survey.user
		};
		var foodSurvey = new FoodSurvey(surveyObj);
		foodSurvey.save(survey, function(err, doc) {
<<<<<<< HEAD
			console.log('Saved survey!');
=======
			if (err) {
				console.log('Error saving survey: ' + err);
			} else {
				console.log('Saved survey!');
			}

>>>>>>> origin/imtootired
		});
	});
};
