/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Fit Text Plugin for Main Header
    $("h1").fitText(
        1.2, {
            minFontSize: '35px',
            maxFontSize: '65px'
        }
    );

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    // Initialize WOW.js Scrolling Animations
    new WOW().init();

})(jQuery); // End of use strict


/**
* App and all rights reserved Christoffer Valland
* Code written by Christoffer Valland
* http://www.christoffervalland.no/
**/
var apiKey = "https://api.mongolab.com/api/1/databases/lifebuoy/collections/buoys?apiKey=2P7QlEw29SmcG6BrJ5TZJZZT-eQmd64s";
var map;
function initMap() {
  var myLatLng = {lat: 60.3670919, lng: 6.1551339};

  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 8
  });

  var xhrUrl = new XMLHttpRequest();
	xhrUrl.open("GET", apiKey);
	xhrUrl.onload = function(){
			var response = JSON.parse(xhrUrl.responseText);
			for(var i = 0; i < response.length; i++){
				var buoy = response[i];
				//i+1 because it's an array and I don't want the first object to be 0.
				addMarkerToMap(buoy);
			}
		}
	xhrUrl.send();
}

function addMarkerToMap(buoy){
  var city = buoy.place.city;
  var location = buoy.place.location;

  var latLong = {lat: parseFloat(buoy.place.latitude), lng: parseFloat(buoy.place.longitude)};
  var marker = new google.maps.Marker({
    position: latLong,
    map: map
  });

  var infowindow = new google.maps.InfoWindow({
  content: "Location of buoy: " + location + ", " + city
  });

google.maps.event.addListener(marker, 'click', function() {
  infowindow.open(map,marker);
  });
}

$(function() {
    jQuery.fn.extend({
        disable: function(state) {
            return this.each(function() {
                var $this = $(this);
                if($this.is('input, button'))
                    this.disabled = state;
                else
                    $this.toggleClass('disabled', state);
            });
        }
    });

    $('#addBuoyButton').disable(true);

    $('body').on('click', 'a.disabled', function(event) {
        event.preventDefault();
    });
});

$('#addBuoyButton').click(function() {
  var city = $('#inputCity').val();
  var location = $('#inputLocation').val();
  var latitude= $('#inputLat').val();
  var longitude = $('#inputLong').val();
  var json = '{"place":{"city":"' + city + '", "location":"' + location + '", "latitude":"' + latitude + '", "longitude":"' + longitude + '"}}';

  $.ajax( { url: apiKey,
            data: json,
            type: "PUT",
            contentType: "application/json",
            success: function(data){
              alert("Buoy successfully added to database. Site will now reload!");
              window.location.reload();
            },
            error:function(data){
              alert("Could not add buoy. Try again later.");
            }
          });

  var xhrPost = new XMLHttpRequest();
  xhrPost.open("POST", apiKey);
  xhrPost.setRequestHeader("Content-Type", "application/json");
  xhrPost.send(json);


});

function dms2deg(s) {
  // Determine if south latitude or west longitude
  var sw = /[sw]/i.test(s);

  // Determine sign based on sw (south or west is -ve)
  var f = sw? -1 : 1;

  // Get into numeric parts
  var bits = s.match(/[\d.]+/g);

  var result = 0;

  // Convert to decimal degrees
  for (var i=0, iLen=bits.length; i<iLen; i++) {

    // String conversion to number is done by division
    // To be explicit (not necessary), use
    //   result += Number(bits[i])/f
    result += bits[i]/f;

    // Divide degrees by +/- 1, min by +/- 60, sec by +/-3600
    f *= 60;
  }
  return result;
}

$(document).ready(function() {
  $('input[type="text"],textarea').on('keyup',function() {
    var city = $('#inputCity').val()
    var location = $('#inputLocation').val();
    var latitude= $('#inputLat').val();
    var longitude = $('#inputLong').val();

    if(city != '' && location != '' && latitude != '' && longitude != '') {
      $('#addBuoyButton').disable(false);
    }else{
      $('#addBuoyButton').disable(true);
    }
  });

  $('[data-toggle="tooltip"]').tooltip();
  $('.input-group input[required], .input-group textarea[required], .input-group select[required]').on('keyup change', function() {
    var $form = $(this).closest('form'),
    $group = $(this).closest('.input-group'),
		$addon = $group.find('.input-group-addon'),
		$icon = $addon.find('span'),
		state = false;

    if (!$group.data('validate')) {
			state = $(this).val() ? true : false;
		}else if ($group.data('validate') == "email") {
			state = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($(this).val())
		}else if($group.data('validate') == 'phone') {
			state = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/.test($(this).val())
		}else if ($group.data('validate') == "length") {
			state = $(this).val().length >= $group.data('length') ? true : false;
		}else if ($group.data('validate') == "number") {
			state = !isNaN(parseFloat($(this).val())) && isFinite($(this).val());
		}

		if (state) {
				$addon.removeClass('danger');
				$addon.addClass('success');
				$icon.attr('class', 'glyphicon glyphicon-ok');
		}else{
				$addon.removeClass('success');
				$addon.addClass('danger');
				$icon.attr('class', 'glyphicon glyphicon-remove');
		}

    if ($form.find('.input-group-addon.danger').length == 0) {
      $form.find('[type="submit"]').prop('disabled', false);
    }else{
      $form.find('[type="submit"]').prop('disabled', true);
    }
	});

  $('.input-group input[required], .input-group textarea[required], .input-group select[required]').trigger('change');
  });
