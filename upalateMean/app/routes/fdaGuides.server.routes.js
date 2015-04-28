/** Routes for  FDA info.
 *  @author Alan Ponte
 */

'use strict';
var mongoose = require('mongoose');
var FdaGuide = mongoose.model('FdaGuide');
var User = mongoose.model('User');


module.exports = function(app) {
	app.get('/api/foodData/fdaGuides', function(req, res) {
		FdaGuide.find(function(err, doc) {
			if (err) {
				console.log("Error getting FDA guide: " + err);
				res.jsonp(err);
			}
			console.log("success getting fda guide!");
			res.jsonp(doc);

		});
	});
};