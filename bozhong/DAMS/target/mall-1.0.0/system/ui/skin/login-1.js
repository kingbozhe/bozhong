function resize() {
	//计算全局宽高比适应性
	$(".form-box").css("marginTop", ($(window).outerHeight() - $(".form-box").outerHeight()) / 2);
	$(".login-inn").outerHeight($(window).outerHeight() - $(".login-logo").outerHeight() - $(".login-footer").outerHeight());
	$(".form-box").css("marginTop", ($(".login-inn").outerHeight() - $(".form-box").outerHeight()) / 2);
}

function passwordReset() {
	$("#form-password").val("");
	$("#form-password")[0].focus();
}

$(window).resize(function() {
	resize();
});

jQuery(document).ready(function() {
	resize();
	var firstBgIndex = 1;
	//	$.backstretch("ui/images/loginbg/1.png");
	$(".login-inn").append('<img src="ui/images/loginbg/gca/1.png" />');
	$(".login-footer").html("TERADATA 版权所有 CopyRight &copy; 2017");
	var t1 = setInterval(function() {

		//      console.log(firstBgIndex);
		$(".login-inn img").fadeOut(600, function() {

			if(firstBgIndex >= 3 || firstBgIndex <= 0) {
				firstBgIndex = 0;
			}
			firstBgIndex++;
			//	        	console.log(firstBgIndex);
			$(".login-inn img").attr("src", "ui/images/loginbg/gca/" + firstBgIndex + ".png");
			$(".login-inn img").fadeIn(600);
		});

		//      var t2 = setTimeout(function(){
		//          if(firstBgIndex >= 2){
		//              firstBgIndex = -1;
		//          }
		//      },800);
	}, 5000);

	/* Fullscreen background */

	/* Form validation */
	$('.login-form input[type="text"], .login-form input[type="password"], .login-form textarea').on('focus', function() {
		$(this).removeClass('input-error');
	});

	$('.login-form').on('submit', function(e) {

		$(this).find('input[type="text"], input[type="password"], textarea').each(function() {
			if($(this).val() == "") {
				e.preventDefault();
				$(this).addClass('input-error');
			} else {
				$(this).removeClass('input-error');
			}
		});
	});
});