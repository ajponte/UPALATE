'use strict';


var mongoose = require('mongoose'),
	Schema   = mongoose.Schema;

var AvailableFoodsSchema = new Schema({
	"name": {
		type: String
	}
});

mongoose.model('AvailableFood', AvailableFoodsSchema);
