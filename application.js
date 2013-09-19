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
			  	ulString += "<li class='btn btn-primary'>" + selected.tags[i] + "</li>";
			  }
			  $("#intro").html("Showing a random result for " +$("#playTag").val());
			  ulString += "</ul>"
			  $("#tags").html("<p>Tags for this image include:</p><br /><br />" + ulString);
			  $("#tags").find("li").on("click", function() {
			  	console.log($(this).text());
			  	$("#playTag").val($(this).text());
			  	$("#f1").submit();
			  });
			}
		});
	}
	$("#f1").submit(function(event) {
		instagood();
		event.preventDefault();
	});
});