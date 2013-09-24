$(document).ready(function () {

	var h = {};
	h.length = 0;
	var found = false;
	
	$(document).on("click", ".first input:radio", function ( event ) {
	
		var name = $(this).attr('name');
		$(this).parent().css('background', 'red');
		
		$('.second').css('visibility', 'visible');
		$('label').css('background', '#428bca');
		$('.second [name=' + name + ']').parent().css('background', 'grey');
		
	}); 
	
	$(document).on("click", "input:radio", function( event ) {
	
		
		//get selected option
		var category = $(this).attr('name');
		var value = $(this).val();
		
		
		if (h.length == 0){
			h['one'] = [category, value];
			h.length ++;
		}
		
		//if theres one entry in the hash already, check to see if it already exists, 
		//if it does, replace with new value, if not then add it to the hash
		if (h.length == 1){
			if (h.one[0] == category){
				h.one[1] = value;
			}
			else {
				h['two'] = [category, value];
				h.length ++;
			}
		}
		
		//if h is full, check to see if the category already exists, if it does then replace with new value
		//if new category, push 'one' into 'two', and set new category to 'one'
		if (h.length == 2){
			for (var k in h){
				if (h[k][0] == category){
					h[k][1] = value;
					found = true;
					break;
				}
			}
			if (found == false){
				h.two = h.one;
				h.one = [category, value];
			}
			found = false;
		}
		
		if (h.length == 2){
			$.ajax({
				type: 'POST',
				url: 'game.php',
				data: {
					category	: 	h.one[0],
					value		: 	h.one[1],
					category2	:	h.two[0],
					value2		:	h.two[1],
				},
				beforeSend: function () {
			   		$("#result").html("Investigating...");
			    },
			    success: function(data) {
			 		$("#result").html(data);
			 	}
			});
		}
	});
});