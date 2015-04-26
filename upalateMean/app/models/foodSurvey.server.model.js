/** Model for food surveys from user.
 *  @author Alan Ponte
 */

'use strict';

var mongoose = require('mongoose'),
	Schema   = mongoose.Schema;


var FoodSurveySchema = new Schema({

	yesterday: {
		breakfast:  {
			type: String
		},
		lunch: {
			type: String
		},
		dinner: {
			type: String
		}
	},
	dayBeforeYesterday: {
		breakfast: {
			type: String
		},
		lunch: {
			type: String
		},
		dinner: {
			type: String
		}
	},
	twoDaysBeforeYesterday: {
		breakfast: {
			type: String
		},
		lunch: {
			type: String
		},
		dinner: {
			type: String
		}
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},

	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('FoodSurvey', FoodSurveySchema);
