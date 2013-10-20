$(document).ready(function() {
	$("#errorMsg").hide();
	function instagood() {
		// dealing with the issue of improper input
		var term = $("#playTag").val();
		
		if(term.match(/^[0-9a-zA-Z]+$/)) {
			$("#errorMsg").hide();
			// ajax call
			$.ajax({
				type: "GET",
				dataType: "jsonp",
				cache: false,
				url: "https://api.instagram.com/v1/tags/"+ term +"/media/recent?client_id=12798879df08427ca9115a9a331c2140",
				success: function(response) {
				  //the selected image
				  var selected = response.data[Math.floor(Math.random() * response.data.length)];
				  //adding the photo
				  $("#photos").html("<img src='"+selected.images.standard_resolution.url+"'><br />");

				  //looping through and adding a UL of tags for the chosen picture
				  var ulString = "<ul>";
				  for(var i = 0; i < selected.tags.length; i++)
				  {
				  	ulString += "<li class='tagButton'>" + selected.tags[i] + "</li>";
				  }
				  $("#intro").html("Showing a random result for " +term);
				  ulString += "</ul>"
				  $("#tags").html("<p>Tags for this image include:</p><br /><br />" + ulString);

				  // make tags buttons that will search for an image by calling this function over again
				  $("#tags").find("li").on("click", function() {
				  	$("#playTag").val($(this).text());
				  	$("#f1").submit();
				  });
				}
			});
		}
		else {
			$("#errorMsg").show();
		}
	}
	$("#f1").submit(function(event) {
		// call the function to get the instagram photo
		instagood();
		// prevent the submit button from reloading the page and not displaying what we made the call for
		event.preventDefault();
	});
});

/* preventDefault() above prevents reload of the page when clicking submit */



