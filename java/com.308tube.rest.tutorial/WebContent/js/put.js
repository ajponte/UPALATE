/**
 * js file for post.html
 * Please use modern web browser as this file will not attempt to be
 * compatible with older browsers. Use Chrome and open javascript console
 * or Firefox with developer console.
 * 
 * jquery is required
 */
$(document).ready(function() {
	
	var $put_example = $('#put_example')
		, $SET_FOOD_NAME = $('#SET_FOOD_NAME');
	
	getInventory();
	
	$(document.body).on('click', ':button, .UPDATE_BTN', function(e) {
		//console.log(this);
		var $this = $(this)
			, FOODS_PK = $this.val()
			, $tr = $this.closest('tr')
			, FOOD_NAME = $tr.find('.CL_FOOD_NAME').text();
		
		$('#SET_FOODS_PK').val(FOODS_PK);
		$SET_FOOD_NAME.text(FOOD_NAME);
		
		$('#update_response').text("");
	});
	
	$put_example.submit(function(e) {
		e.preventDefault(); //cancel form submit
		
		var obj = $put_example.serializeObject()
			, FOOD_NAME = $SET_FOOD_NAME.text();
		
		updateInventory(obj, FOOD_NAME);
	});
});

function updateInventory(obj, name) {
	
	ajaxObj = {  
			type: "PUT",
			url: "http://localhost:7001/me.upalate.analytics/api/v3/inventory/" + name,
			data: JSON.stringify(obj), 
			contentType:"application/json",
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(jqXHR.responseText);
			},
			success: function(data) {
				console.log(data);
				$('#update_response').text( data[0].MSG );
			},
			complete: function(XMLHttpRequest) {
				console.log( XMLHttpRequest.getAllResponseHeaders() );
				getInventory();
			}, 
			dataType: "json" //request JSON
		};
		
	return $.ajax(ajaxObj);
}

function getInventory() {
	
	var d = new Date()
		, n = d.getTime();
	
	ajaxObj = {  
			type: "GET",
			url: "http://localhost:7001/me.upalate.analytics/api/v1/inventory", 
			data: "ts="+n, 
			contentType:"application/json",
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(jqXHR.responseText);
			},
			success: function(data) { 
				console.log(data);
				var html_string = "";
				
				$.each(data, function(index1, val1) {
					console.log(val1);
					html_string = html_string + templateGetInventory(val1);
				});
				
				$('#get_inventory').html("<table border='1'>" + html_string + "</table>");
			},
			complete: function(XMLHttpRequest) {
				//console.log( XMLHttpRequest.getAllResponseHeaders() );
			}, 
			dataType: "json" //request JSON
		};
		
	return $.ajax(ajaxObj);
}

function templateGetInventory(param) {
	return '<tr>' +
				'<td class="CL_FOOD_NAME">' + param.name + '</td>' +
				'<td class="CL_FOODS_BTN"> <button class="UPDATE_BTN" value=" ' + param.FOODS_PK + ' " type="button">Update</button> </td>' +
			'</tr>';
}

