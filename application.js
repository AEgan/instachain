$(document).ready(function() {
	$("#f1").submit(function(event) {
		$.ajax({
			type: "GET",
			dataType: "jsonp",
			cache: false,
			url: "https://api.instagram.com/v1/tags/"+$("#playTag").val()+"/media/recent?client_id=12798879df08427ca9115a9a331c2140",
			success: function(response) {
			  console.log(response);
			  var selected = response.data[Math.floor(Math.random() * response.data.length)];
			  console.log(selected.images.standard_resolution.url);
			  $("#photos").html("<img src='"+selected.images.standard_resolution.url+"'><br />");
			  var ulString = "<ul>";
			  for(var i = 0; i < selected.tags.length; i++)
			  {
			  	ulString += "<li>#" + selected.tags[i] + "</li>";
			  }
			  ulString += "</ul>"
			  $("#photos").append("<br /><br />" + ulString);
			}
		});
		event.preventDefault();
	});