/** Model for food surveys from user.
 *  @author Alan Ponte
 */

'use strict';

var mongoose = require('mongoose'),
	Schema   = mongoose.Schema;


var FoodSurveySchema = new Schema({

	yesterday: {
		breakfast:  {
<<<<<<< HEAD
			type: String
		},
		lunch: {
			type: String
		},
		dinner: {
			type: String
=======
			//type: String
			type: Array
		},
		lunch: {
			type: Array
		},
		dinner: {
			type: Array
>>>>>>> origin/imtootired
		}
	},
	dayBeforeYesterday: {
		breakfast: {
<<<<<<< HEAD
			type: String
		},
		lunch: {
			type: String
		},
		dinner: {
			type: String
=======
			type: Array
		},
		lunch: {
			type: Array
		},
		dinner: {
			type: Array
>>>>>>> origin/imtootired
		}
	},
	twoDaysBeforeYesterday: {
		breakfast: {
<<<<<<< HEAD
			type: String
		},
		lunch: {
			type: String
		},
		dinner: {
			type: String
=======
			type: Array
		},
		lunch: {
			type: Array
		},
		dinner: {
			type: Array
>>>>>>> origin/imtootired
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
