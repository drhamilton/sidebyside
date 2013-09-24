$(document).ready(function () {

	var firstCat;
	var firstVal;
	var secondCat;
	var secondVal;
	var data;
	var intAge = [];
	var map;
	var firstSelected;
	var secondSelected
	
	$(document).on("click", ".first input:radio", function ( event ) {
	
		firstSelected = $(this);
	
		$('.second input:radio').prop('disabled', false);
		$('.second input:radio').parent().css('background', 'rgba(255,255,255,0.2)');	
		
		if(secondSelected){
			secondSelected.parent().css('background', '#EC008C');
		}
		
		$('#cartodb-map').remove();
		$('#result').after('<div id="cartodb-map"></div>');
		
		firstCat = $(this).attr('name');
		firstVal = $(this).val();
		
		$('.first input:radio').each( function () {
			if ($(this).prop('disabled') == false){
				$(this).parent().css('background', 'rgba(255,255,255,0.2)');
			}
		});
		
		//turn it red
		$(this).parent().css('background', '#EC008C');
		
		//disable in other column
		$('.second input:radio[name=' + firstCat + ']').attr('disabled', 'disabled');
		$('.second input:radio[name=' + firstCat + ']').parent().css('background', '#A8AAAD');
		
		//loop through and look for all others that are not disabled, turn them blue
		
		$.ajax({
			type: 'POST',
			dataType: 'json',
			url: 'game.php',
			data: {
				category	: 	firstCat,
				value		: 	firstVal,
				category2	:	secondCat,
				value2		:	secondVal,
			},
			beforeSend: function () {
		   		$("#result").html("Investigating...");
		    },
		    success: function(data) {
		    	if (data.lng.length > 0){
		 			$("#result").html("<h1>" + data.lng.length + "</h1>");
		 		}
		 		else {
			 		$("#result").html("<h1>0</h1>");
		 		}
		 		
		 		init(data);
		 		
		 		//chart stuff
		 		
		 		//turn each into an int
		 		$.each(data.age, function(index, value){
			    	data.age[index] = parseInt(data.age[index]);
			    });
			    
			    //call arrayCountValues function
			    var result = arrayCountValues(data.age);
			    
				//set options
		 		var options = {
			        chart: {
			            renderTo: 'container',
			            type: 'column'
			        },
			        title: {
			            text: 'Age'
			        },
			        credits: {
				        enabled: false,
				        href: '#',
				        text: ''
			        },
			        exporting: {
				        enabled: false
			        },
			        tooltip: {
				      enabled: false  
			        },
			        legend: {
				    	enabled: false  
			        },
			        xAxis: {
			            categories: result[0], //These are the unique ages
			            gridLineWidth: 0
			        },
			        yAxis: {
			            title: {
			                text: '#'
			            },
			            gridLineWidth: 0
			        },
			        series: [{
				        name: ' '
			        }]
			    };
			    
		 		options.series[0].data = result[1]; //This contains the counts for each age
		 		
		 		//make the chart
		 		var chart = new Highcharts.Chart(options);
		 	},
		 	async: false
		});
	}); 
	
	$(document).on("click", ".second input:radio", function( event ) {
	
		secondSelected = $(this);
	
		$('.first input:radio').each(function () {
			$(this).attr('disabled', false);
			$(this).parent().css('background', 'rgba(255,255,255,0.2)');
		});
		
		if(firstSelected){
			firstSelected.parent().css('background', '#EC008C');
		}
		
		$('#cartodb-map').remove();
		$('#result').after('<div id="cartodb-map"></div>');
		
		secondCat = $(this).attr('name');
		secondVal = $(this).val();
		
		$('.second input:radio').each( function () {
			if ($(this).prop('disabled') == false){
				$(this).parent().css('background', 'rgba(255,255,255,0.2)');
			}
		});
		
		$(this).parent().css('background', '#EC008C');
		
		$('.first input:radio[name=' + secondCat + ']').attr('disabled', 'disabled');
		$('.first input:radio[name=' + secondCat + ']').parent().css('background', '#A8AAAD');
		
		$.ajax({
			type: 'POST',
			dataType: 'json',
			url: 'game.php',
			data: {
				category	: 	firstCat,
				value		: 	firstVal,
				category2	:	secondCat,
				value2		:	secondVal,
			},
			beforeSend: function () {
		   		$("#result").html("Investigating...");
		    },
		    success: function(data) {
		    	if (data.lng.length > 0){
		 			$("#result").html("<h1>" + data.lng.length + "</h1>");
		 		}
		 		else {
			 		$("#result").html("<h1>0</h1>");
		 		}
		 		
		 		init(data);
		 		
		 		//chart stuff
		 		
		 		//turn each into an int
		 		$.each(data.age, function(index, value){
			    	data.age[index] = parseInt(data.age[index]);
			    });
			    
			    //call arrayCountValues function
			    var result = arrayCountValues(data.age);
			    
				//set options
		 		var options = {
			        chart: {
			            renderTo: 'container',
			            type: 'column'
			        },
			        title: {
			            text: 'Age'
			        },
			        credits: {
				        enabled: false,
				        href: '#',
				        text: ''
			        },
			        exporting: {
				        enabled: false
			        },
			        tooltip: {
				      enabled: false  
			        },
			        legend: {
				    	enabled: false  
			        },
			        xAxis: {
			            categories: result[0], //These are the unique ages
			            gridLineWidth: 0
			        },
			        yAxis: {
			            title: {
			                text: '#'
			            },
			            gridLineWidth: 0
			        },
			        series: [{
				        name: ' '
			        }]
			    };
			    
		 		options.series[0].data = result[1]; //This contains the counts for each age
		 		
		 		//make the chart
		 		var chart = new Highcharts.Chart(options);
		 		
		 		
		 	},
		 	async: false
		});	
	});
});


//////////////////////////////////////////
// Initialize Map and Query
//////////////////////////////////////////

function init(data){
  // initiate leaflet map

  map = L.map('cartodb-map').setView([40.750028, -73.926768], 10);
 
 //http://a.tiles.mapbox.com/v3/dillon.map-ulaj2697/{z}/{x}/{y}.png
  L.tileLayer('http://a.tiles.mapbox.com/v3/dillon.map-ulaj2697/{z}/{x}/{y}.png', {
	  attribution: 'Mapbox <a href="http://mapbox.com/about/maps" target="_blank">Terms & Feedback</a>'
  }).addTo(map);

  //small neighs
  //var layerUrl = 'http://dillon.cartodb.com/api/v2/viz/506e7f54-2167-11e3-b06e-dbe92e2bf437/viz.json';
  //bigger neighs
  var layerUrl = 'http://dillon.cartodb.com/api/v2/viz/e55ed5b0-248b-11e3-8095-5db6007d502b/viz.json';
  
  cartodb.createLayer(map, layerUrl, data)
	  .addTo(map)
	  .on('done', function(layer) {
	  
	  	var lngArray = data.lng; 
	  	var latArray = data.lat;
	  	
	  	for(var i = 0; i < lngArray.length; i ++){
		  	var lng = lngArray[i];
		  	var lat = latArray[i];
		  	
		  	var point = "ST_SetSRID(ST_Point(" + lng + ", " + lat +"),4326)";
		  	var sql = "SELECT * FROM nyc WHERE ST_Intersects(" + point + ", the_geom)";
		  	
		  	layer.createSubLayer({
			    sql: sql,
			    cartocss: '#nyc {polygon-fill:#EC008C;line-color: #FFFFFF;line-width: 1;polygon-opacity: 0.4;line-opacity: 1;}'
			});
		}
	  })
	  .on('error', function() {
	    //log the error
	  });
  
}

//////////////////////////////////////////
// array count values function
//////////////////////////////////////////

function arrayCountValues(arr) {
    var a = [], b = [], prev;
    
    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }
    
    return [a, b];
}