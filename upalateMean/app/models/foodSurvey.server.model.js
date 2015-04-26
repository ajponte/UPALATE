/** Model for food surveys from user.
 *  @author Alan Ponte
 */

'use strict';

var mongoose = require('mongoose'),
	Schema   = mongoose.Schema;


var FoodSurveySchema = new Schema({

	yesterday: {
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
