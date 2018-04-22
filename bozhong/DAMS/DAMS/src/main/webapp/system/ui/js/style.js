/**
 * Created by stephy on 17/2/27.
 */
function initialize(){
	$(".LeftMenuLu em").each(function(){
		$(this).find("b").remove();
		$(this).data("active","close");
		var level = "level-" + $(this).parents("ul").size();
		$(this).addClass(level);
		if($(this).nextAll().length == 0){
			$(this).children().eq(0).remove();
			$(this).prepend('<i class="fa fa-file-text-o"></i>');
			//$(this).attr("class","lastLevel");
			$(this).addClass("lastLevel");
		}
		if($(this).hasClass("level-1") && !$(this).hasClass("lastLevel")){
			$(this).append('<b>+</b>');
		}
		$(".LeftMenuLu").children("li:last").addClass("lastChild");

	});
}
function acPosition(em){
	$(".LeftMenuLu em").removeClass("sky-blue leftBorderBlue");
	if(em.data("active") == "open"){
		em.addClass("sky-blue");
	}
	$(".fileIcon").attr("src","ui/images/file-close-off.png");
	em.parents("ul").each(function(){
		var This = $(this).siblings("em");
		judge(This);
	});
}
function judge(icon){
	
	if(icon.hasClass("level-1")){
		if(icon.hasClass("lastLevel")){
        	
    		if(icon.hasClass("sky-blue leftBorderBlue")){
    			icon.removeClass("sky-blue leftBorderBlue");
    		}
    		else{
    			icon.addClass("sky-blue leftBorderBlue");
    		}
        }
		else{
			if(icon.hasClass("sky-blue")){
				icon.removeClass("sky-blue leftBorderBlue");
				icon.data("active","close");
				icon.find("b").html("+");
			}else{
				icon.addClass("sky-blue leftBorderBlue");
				icon.data("active","open");
				icon.find("b").html("-");
			}	
		}
		
    }
    else if(icon.hasClass("level-2")){
    	if(icon.hasClass("lastLevel")){
        	
    		if(icon.hasClass("sky-blue")){
    			icon.removeClass("sky-blue");
    		}
    		else{
    			icon.addClass("sky-blue");
    		}
        }
    	else{
    		var src = icon.hasClass("sky-blue")?"ui/images/file-close-off.png":"ui/images/file-open.png";
            icon.find("img").attr("src",src);
            if(icon.hasClass("sky-blue")){
           		icon.removeClass("sky-blue");
           		icon.data("active","close");
            }
            else{
        		icon.addClass("sky-blue");
        		icon.data("active","open");
            } 
    	}
    	
    }
    else if(icon.hasClass("level-3")){
    	if(icon.hasClass("lastLevel")){
        	
    		if(icon.hasClass("sky-blue")){
    			icon.removeClass("sky-blue");
    		}
    		else{
    			icon.addClass("sky-blue");
    		}
        }
    	else{
    		if(icon.hasClass("sky-blue")){
				icon.removeClass("sky-blue");
				icon.find("i").attr("class","fa fa-caret-right");
				icon.data("active","close");
			}
			else{
				icon.addClass("sky-blue");
				icon.find("i").attr("class","fa fa-caret-down");
				icon.data("active","open");
			}	
    	}
    	
		
    }
    
    else if(icon.hasClass("level-4")){
    	if(icon.hasClass("lastLevel")){
        	
    		if(icon.hasClass("sky-blue")){
    			icon.removeClass("sky-blue");
    		}
    		else{
    			icon.addClass("sky-blue");
    		}
        }
    	else{
    		if(icon.hasClass("sky-blue")){
    			icon.removeClass("sky-blue");
    			icon.find("i").attr("class","fa fa-angle-right");
    			icon.data("active","close");
    		}
    		else{
    			icon.addClass("sky-blue");
    			icon.find("i").attr("class","fa fa-angle-up");
    			icon.data("active","open");
    		}
    	}
		
    }
    else if(icon.hasClass("level-5")){
		if(icon.hasClass("sky-blue")){
			icon.removeClass("sky-blue");
		}
		else{
			icon.addClass("sky-blue");
		}
    }
}
function allSlideDown(em){
	em.siblings("ul").find("ul").each(function(){
		$(this).slideUp();
	});
	em.siblings("ul").find("em").each(function(){
		$(this).data("active","close");
	})
}
$(document).ready(function(){
	
    $(".dropdown-menu").on("click","li",function(){
        var text = $(this).find("a").text();
        $(this).parent().siblings("button").find("i").text(text);
    });
	//initialize();
    $(".LeftMenuLu").on("click","em",function(e){
        $(this).siblings("ul").slideToggle("fast");
		acPosition($(this));
		judge($(this));
		allSlideDown($(this));
        e.stopPropagation();
    })
    $(".LeftMenuLu").find("em").eq(0).trigger("click");
    $(".LeftMenuLu").on("mouseover mouseout",".level-2",function(e){
    	e=e||event;
        if(e.type == "mouseover" && !$(this).hasClass("sky-blue")){
			$(this).find("img").attr("src","ui/images/file-close-on.png");
        }
        if(e.type == "mouseout" && !$(this).hasClass("sky-blue")){
    		$(this).find("img").attr("src","ui/images/file-close-off.png");
        }
    });
});





