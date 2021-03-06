/** Routes for food survey info.
 *  @author Alan Ponte
 */

'use strict';
var mongoose = require('mongoose');
var FoodSurvey = mongoose.model('FoodSurvey');
var User = mongoose.model('User');

module.exports = function(app) {

	/** Returns the survey for the indicated user. */
	app.post('/api/users/getSurveyData', function(req, res) {
		var data = req.body;
		FoodSurvey.find({"user": data.user}, function(err, doc) {
			console.log("surveyData: " + JSON.stringify(doc));
			res.jsonp(doc);
		});
	});

	/** Submits the user's food survey. */
	app.post('/api/users/submitSurvey', function(req, res) {
		var survey = req.body;
		console.log('Surevey: ' + JSON.stringify(survey));

		// The constructor will save this object
		var surveyObj = {
			yesterday: {
				dateString: survey.yesterday.dateString,
				breakfast: survey.yesterday.breakfast,
				lunch: survey.yesterday.lunch,
				dinner: survey.yesterday.dinner
			},
			dayBeforeYesterday: {
				dateString: survey.dayBeforeYesterday.dateString,
				breakfast: survey.dayBeforeYesterday.breakfast,
				lunch: survey.dayBeforeYesterday.lunch,
				dinner: survey.dayBeforeYesterday.dinner
			},
			twoDaysBeforeYesterday: {
				dateString: survey.twoDaysBeforeYesterday.dateString,
				breakfast: survey.twoDaysBeforeYesterday.breakfast,
				lunch: survey.twoDaysBeforeYesterday.lunch,
				dinner: survey.twoDaysBeforeYesterday.dinner
			}, 
			user: survey.user
		};
		var foodSurvey = new FoodSurvey(surveyObj);
		foodSurvey.save(survey, function(err, doc) {
			if (err) {
				console.log('Error saving survey: ' + err);
			} else {
				console.log('Saved survey!');
			}

		});
	});
};
