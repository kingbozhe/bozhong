function panelMarginLeft() {
    $(".box .stepMain .panel-heading").each(function () {
        var panelMargin = ($(this).width() - $(this).find("h3").outerWidth() - $(this).find("em").outerWidth() - $(this).find("i").outerWidth()) / 2;

        $(this).find("h3").css({"marginLeft": panelMargin});
        $(".box .down").css({"marginLeft": ($(".box").innerWidth() - $(".box .down").outerWidth() - 28) / 2});
    });
}
function resize() {
    //计算全局宽高比适应性
    $(".head").outerWidth($(window).outerWidth());
    $(".main").outerWidth($(window).outerWidth());
    $(".main").outerHeight($(window).outerHeight() - $(".head").outerHeight());

    $(".zcontainer").outerWidth($(window).outerWidth() - $(".menu-list").outerWidth());
    $(".zcontainer .itabs").outerWidth($(".zcontainer").outerWidth() - $(".zcontainer .itoolbar").outerWidth());
    $(".headright").outerWidth($(window).outerWidth() - $(".logo").outerWidth());
    $(".zcontainer").outerHeight($(window).outerHeight() - $(".head").outerHeight());
    $(".box").outerWidth($(".zcontainer").outerWidth()-6);
    $(".box iframe").outerWidth($(".box").outerWidth()-30);
    $(".box iframe").outerHeight($(".box").outerHeight()-35);
    
    $(".box").outerHeight($(window).outerHeight() - $(".head").outerHeight() - $(".nav-tabs").outerHeight()-$(".zbre").outerHeight());
//    $(".box").outerHeight($(window).outerHeight() - $(".head").outerHeight() - $(".ztab").outerHeight()-34);
//  $(".ztable").outerWidth($(".box").outerWidth() - 40);
	$(".im .sinput").each(function(){
		$(this).outerWidth($(this).parent().outerWidth() - $(this).siblings("em").outerWidth()-21);
	})
    $(".zcontainer .active .box .ifilter .ibtn .sbtn").css("marginTop", ($(".zcontainer .active .box .ifilter .ibtn").outerHeight() - $(".zcontainer .active .box .ifilter .ibtn .sbtn").outerHeight()) / 2);
	//button margin高度
    $(".zcontainer .box .zbox .cbox .zitem .zright").outerWidth($(".zcontainer .box .zbox .cbox .zitem").outerWidth() - $(".zcontainer .box .zbox .cbox .zitem .zleft").outerWidth());
	$(".modal-dialog").css("marginTop",($(window).outerHeight()-$(".modal-dialog").outerHeight())/2);
	
	$(".itoolbar .inn").css("marginTop",($(".itoolbar").outerHeight()-$(".itoolbar .inn").outerHeight())/2);
	
	$(".itoolbar .inn i").css("top",($(".itoolbar .inn").outerHeight()-$(".itoolbar .inn i").outerHeight())/2);
	//$(".scorecard").outerHeight( $(".box").outerHeight());
	$(".scorecard li").outerWidth( (($(".scorecard ul").outerWidth()-30)/3) + 3.33 );
	
	$(".cards").outerHeight($(".scorecard").outerHeight()-45);


	$(".zybox").outerHeight( $(".cards").outerHeight()-$(".ifilter").outerHeight()-15);
	
	$(".iscroll").outerHeight( $(".cards").outerHeight()-$(".ifilter").outerHeight()-15);
	$("#gaugeDiv").outerHeight($(".iscroll").outerHeight()-2);
	$("#gaugeDiv").outerWidth($(".icard").outerWidth()-22);
	
	$(".ilink").outerWidth($(".box").outerWidth()-30);
    $(".iboxs").outerHeight($(".box").outerHeight()-$(".ilink").outerHeight()-45);
    
    
}

$(window).resize(function () {
    resize();
});




$(document).ready(function () {
    resize();
    $(".scbtn").css("marginTop", ($(".cho").outerHeight() - $(".scbtn").outerHeight()) / 2);
    var winPos = 0;	
/*
    $("#dg").datagrid({
        url: 'ui/json/data.json',
        singleSelect: true,
        pagination: true,
        method: 'get',
        columns: [[
            {field: 'ck',checkbox:true},
            {field: 'mingcheng', title: '数据库名称'},
            {field: 'duixiang', title: '对象名称'},
            {field: 'zhushi', title: '注释'},
            {field: 'duixiang', title: '对象类型'},
            {field: 'geshu', title: '源个数'},
            {field: 'mubiao', title: '目标数'},
            {field: 'jiekou', title: '接口数'},
            {field: 'wuli', title: '仅物理'}
        ]]
    });
    */
    $(".imenu").on("click",function(){
    	if($(".imenu").hasClass("imenu-close")){
    		$(".zcontainer").css("width","100%");
    		$(".LeftMenu").css("width","0px");
    		$(".imenu").removeClass("imenu-close").addClass("imenu-open");
            $(".imenu i").removeClass().addClass("fa fa-caret-right");
    	}else{
    		$(".LeftMenu").css("width","210px");
    		$(".imenu").removeClass("imenu-open").addClass("imenu-close");
            $(".imenu i").removeClass().addClass("fa fa-caret-left");
    	}
    	resize();
    })
});









