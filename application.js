$(document).ready(function() {
	function instagood() {
		// ajax call
		$.ajax({
			type: "GET",
			dataType: "jsonp",
			cache: false,
			url: "https://api.instagram.com/v1/tags/"+$("#playTag").val().replace(" ", "") +"/media/recent?client_id=12798879df08427ca9115a9a331c2140",
			success: function(response) {
				// for testing purposes, loging the respose helps determine how to work with the object
			  console.log(response);
			  //the selected image
			  var selected = response.data[Math.floor(Math.random() * response.data.length)];
			  console.log(selected.images.standard_resolution.url);
			  //adding the photo
			  $("#photos").html("<img src='"+selected.images.standard_resolution.url+"'><br />");

			  //looping through and adding a UL of tags for the chosen picture
			  var ulString = "<ul>";
			  for(var i = 0; i < selected.tags.length; i++)
			  {
			  	ulString += "<li>" + selected.tags[i] + "</li>";
			  }
			  $("#intro").html("Showing a random result for " +$("#playTag").val());
			  ulString += "</ul>"
			  $("#tags").html("<p>Tags for this image include:</p><br /><br />" + ulString);

			  // make tags buttons that will search for an image by calling this function over again
			  $("#tags").find("li").on("click", function() {
			  	console.log($(this).text());
			  	$("#playTag").val($(this).text());
			  	$("#f1").submit();
			  });
			}
		});
	}
	$("#f1").submit(function(event) {
		// call the function to get the instagram photo
		instagood();
		// prevent the submit button from reloading the page and not displaying what we made the call for
		event.preventDefault();
	});

/* preventDefault() above prevents reload of the page when clicking submit */

/*********************************************
********************************************
Below: part where I request from same origin
*********************************************/	

	$("#collegeButton").on('click', function(){
		$("#responseArea").hide();
		$.getJSON("colleges.json", function(responseObject, didItWork) {
			console.log(didItWork);
			// get colleges from the same origin
			var displayText = "This is a list of " + responseObject.colleges.length + " colleges in Pennsylvania: <table class=\"table\"><thead><tr><th>Name<\/th><th>City<\/th><\/tr><\/thead>";
			for(var i = 0; i < responseObject.colleges.length; i++) {
				var currentCollege = responseObject.colleges[i];
				displayText+= "<tr><td>" + currentCollege.name + "<\/td><td>" + currentCollege.city + "<\/td><\/tr>";
			}
			// buttons that change the way the table is displayed
			displayText += "<\/table><br\/><input class=\"btn btn-primary\" type=\"button\" value=\"Add stripes\" id=\"stripes\">  \
      <input class=\"btn btn-primary\" type=\"button\" value=\"Add border\" id=\"border\">  \
      <input class=\"btn btn-primary\" type=\"button\" value=\"Add Hover\" id=\"hover\">"

      $("#responseArea").html(displayText);

      // click listeners to add bootstrap classes to the table
			$("#stripes").on("click", function() {
				$(".table").addClass("table-striped")
			});
			$("#border").on("click", function() {
				$(".table").addClass("table-bordered");
			});
			$("#hover").on("click", function() {
				$(".table").addClass("table-hover");
			});

		$("#responseArea").show();
		});
	});
});

  /*
    For displayText just above, "\" were placed so I could separate the long string into 3 lines
  */



