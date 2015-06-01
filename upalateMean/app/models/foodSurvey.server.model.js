/** Model for food surveys from user.
 *  @author Alan Ponte
 */

'use strict';

var mongoose = require('mongoose'),
	Schema   = mongoose.Schema;


var FoodSurveySchema = new Schema({

	yesterday: {
		dateString: {
			type: String
		},
		breakfast:  {
			//type: String
			type: Array
		},
		lunch: {
			type: Array
		},
		dinner: {
			type: Array
		}
	},
	dayBeforeYesterday: {
		dateString: {
			type: String
		},
		breakfast: {
			type: Array
		},
		lunch: {
			type: Array
		},
		dinner: {
			type: Array
		}
	},
	twoDaysBeforeYesterday: {
		dateString: {
			type: String
		},
		breakfast: {
			type: Array
		},
		lunch: {
			type: Array
		},
		dinner: {
			type: Array
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
