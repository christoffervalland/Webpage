$(document).ready(function () {
  $(".navbar-nav li a").click(function(event) {
    $(".navbar-collapse").collapse('hide');
  });
});

$('#submit').on('click', function(e){
	e.preventDefault();
	$.ajax({
		type: "POST",
		url: "script/contact.php",
		data: $('#contact-form').serialize(),
		success: function(data) {
			if(data=="Sendt"){
				console.log("stemmer");
				$('#msg').hide().removeClass('success').removeClass('error').addClass('success').html(data).fadeIn('slow').delay(5000).fadeOut('slow');
			} else {
				$('#msg').hide().removeClass('success').removeClass('error').addClass('error').html(data).fadeIn('slow').delay(5000).fadeOut('slow');
			}
		}
	});
});