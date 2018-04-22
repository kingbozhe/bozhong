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
	$(".login-inn").append('<img src="ui/images/loginbg/arcu/3.png" />');
	$(".login-footer").html("建议使用IE9以上浏览器和1280*800以上分辨率");

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