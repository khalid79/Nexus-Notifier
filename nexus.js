
$(document).ready(function(){
	// nexus_4_8gb
	ajaxNexus('nexus_4_8gb');
	// nexus_4_16gb
	ajaxNexus('nexus_4_16gb');
	// nexus_7_16gb
	ajaxNexus('nexus_7_16gb');
	// nexus_7_32gb
	ajaxNexus('nexus_7_32gb');
	// nexus_7_32gb_hspa
	ajaxNexus('nexus_7_32gb_hspa');
	// nexus_10_16gb
	ajaxNexus('nexus_10_16gb');
	// nexus_10_32gb
	ajaxNexus('nexus_10_32gb');
});

function ajaxNexus(nexusModel){
	// device url 
	var deviceURL = 'https://play.google.com/store/devices/details?id='+nexusModel;
	// add click listener
	$('#'+nexusModel).parent().click(function(){
		chrome.tabs.create({'url': deviceURL}, function(tab) {
			console.log('new tab opened');
		});
	});
	// forward ajax request
	$.ajax({
		url: deviceURL,
		success: function(response) {
			var $response = $(response);
			var soldOut = $response.find('.hardware-sold-out');
			var availability = null;
			if( soldOut.length != 0 ) {
				availability = 'Not available'; 
				backgroundImage = 'not-available';
			}else{
				availability = 'Available ' + $response.find('.hardware-price').text();
				backgroundImage = 'available';
			}
		  // update data
		  $('#'+nexusModel).text(availability).parent().removeClass('note').addClass(backgroundImage);
		}
	});
}