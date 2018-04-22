//应用dom初始元素 应用三级

var APP_DOM_UL_THIRD = "<ul class=\"third\"></ul>";
var APP_DOM_UL_SECOND = "<ul class=\"second\"></ul>";

var APP_DOM_LI_THIRD = "<li></li>";
var APP_DOM_LI_SECOND = "<li></li>";
var APP_DOM_LI_FIRST = "<li class=\"HeadMenuList\"></li>";
var APP_DOM_LI_ARROW_FIRST= "<i class=\"fa fa-caret-down\"></i>";
var APP_DOM_LI_ARROW_SECOND= "<i class=\"fa fa-caret-right\"></i>";

//菜单dom初始元素 菜单五级
var MENU_DOM_UL_FIVE = "<ul class=\"five\"></ul>";
var MENU_DOM_UL_FOUR = "<ul class=\"four\"></ul>";
var MENU_DOM_UL_THREE = "<ul class=\"three\"></ul>";
var MENU_DOM_UL_TWO = "<ul class=\"two\"></ul>";

var MENU_DOM_LI_FIVE = "<li></li>";
var MENU_DOM_LI_FOUR = "<li></li>";
var MENU_DOM_LI_THREE = "<li></li>";
var MENU_DOM_LI_TWO = "<li></li>";
var MENU_DOM_LI_ONE = "<li class=\"LeftMenuList\"></li>";

//过滤框
var FILTER_CONTENT = '<div class="col-md-12 ifilter" id="ifilter"></div>';
var FILTER_CONTENT_BLOCK = '<div class="ileft"></div>';
var FILTER_BUTTON_BLOCK = '<div class="ibtn"><div class="sbtn"><button class="bggray">重置</button><button onclick="search($(this));" class="orange">确定</button></div></div>';
var FILTER_DOM_DIV_LINE = "<div class=\"iline col-sm-12\"></div>";
var FILTER_DOM_DIV_COL = "<div class=\"im col-xs-4\"></div>";
var FILTER_DOM_DIV_ROW = "<div class=\"im col-xs-12\"></div>";

//应用及菜单dom
var appDom = $(".HeadMenu");
var menuDom = $(".LeftMenuLu");
var gird;
//字段名数组
var FILEDS = [];

var RECURSIVE_LEVEL = 0;
//系统变量MAP
var DEFAULT_VALUE_MAP;

//系统登录相关提示信息
var alertsessionTimeOut = "用户登录超时！";
var alertallopatry = "用户在其他地方登录!";
/*
 * 主页面初始化
 */
jQuery(document).ready(function() {
	//初始化系统变量
	/*$.ajax({
    	url : '/DAMS/defaultValue/defaultValueMap',
    	type : "GET",
    	dataType : "json",
    	contentType : 'application/json;charset=UTF-8',
    	success : function(data) {
    			DEFAULT_VALUE_MAP = data;
    			for(varName in data){
        			$('#sysVarCache').append($('<input type="hidden" id="'+varName+'" value="'+data[varName]+'" ></input>'));
    			}
        	},
    	error : function(e) {
        		console.log("error");
        	}
    });	*/
	//初始化应用dom
	$.ajax({
 		url: "/DAMS/app/apps",
 		type: 'GET',
 		dataType: "json",
 		async: false,
 		success: function (appList) {
 			buildAppDom(appList);
 			$(".HeadMenuList").first().addClass("active");
 			
 			//初始化菜单dom
 			$.ajax({
 		 		url: "/DAMS/menu/defaultMenus",
 		 		type: 'GET',
 		 		dataType: "json",
 		 		async: false,
 		 		success: function (menuList) {
 		 			buildMenuDom(menuList);
 		 			initialize();
 		 			bindMenuClick();
 		 		},
 		 		error:function(data){
 		 			if(data.status =='500'){
 		 				showAlertDialog("服务器内部错误,请检查网络!");
 		 			}
 		        } 
 			});
 		},
 		error:function(data){
 			if(data.status =='500'){
 				showAlertDialog("服务器内部错误,请检查网络!");
 			}
        }
	});
	
	/*
	 * 点击第一级应用 左侧菜单联动
	 */
	$(".HeadMenuList").each(function(){
		if($(this).children().length<1){
			$(this).on("click",function(){
				showMenu($(this));
				activeClickedAppFirstDom($(this));
			});
		}
	});
	/*
	 * 点击第三级应用 左侧菜单联动
	 */
	$(".third li").on("click",function(){
		showMenu($(this));
		activeClickedAppDom($(this));
	});
	
	$(".showDialog").on("click",function(){
		buttonClick($(this));
	})
	
});

/*
 * 展现菜单
 */
function showMenu(liObj){
	menuDom.empty();
	appId = liObj.attr("app_id");
	//菜单dom
	$.ajax({
 		url: "/DAMS/menu/menus",
 		data:{appId:appId},
 		type: 'GET',
 		dataType: "json",
 		success: function (menuList) {
 			buildMenuDom(menuList);
 			initialize();
 			bindMenuClick();
 		},
 		error:function(data){
 			if(data.status =='500'){
 				showAlertDialog("服务器内部错误,请检查网络!");
 			}
        }
	});
}
/*
 * 在点击三级应用时，调整一级应用的显示为选中状态
 */
function activeClickedAppDom(dom){
	dom.parent().parent().parent().parent().siblings().each(function(){
		$(this).removeClass("active");
	});
	dom.parent().parent().parent().parent().addClass("active");
}

/*
 * 在点击一级应用时，调整一级应用的显示为选中状态
 */
function activeClickedAppFirstDom(dom){
	dom.siblings().each(function(){
		$(this).removeClass("active");
	});
	dom.addClass("active");
}

/*
 * 点击末级菜单 右侧加载业务单元页面
 */
function bindMenuClick(){
	$(".lastLevel").on("click",function(){
		//首先搜索查看是否已经打开过相应的菜单
		var menu_text = $(this).children("span").text();
		var hasOpen = false;
		$('#contentnavid li a').each(function(index,item){
			var tmpTabIndex = $(item).attr('aria-controls').substr(3);
			var tmpText = $(item).text();
			if(tmpText == menu_text){
				$(this).tab('show');
				hasOpen = true;
				return false;
			}
		});
		if(hasOpen){//如果对应的菜单已经打开过了 则不再增加tab
			return;
		}
		//增加一个tab页
		var maxTabIndex = parseInt($("#maxTabIndex").val())+1;
		$("#maxTabIndex").val(maxTabIndex);
		$("#contentnavid").append($('<li role="presentation"><a href="#tab'+maxTabIndex+'" id="tablia'+maxTabIndex+'" aria-controls="tab'+maxTabIndex+'" role="tab" data-toggle="tab" onfocus="this.blur()">'+$(this).children("span").text()+'</a><i class="fa fa-remove tab-close"></i></li>'));
		var tabPane = $('<div role="tabpanel" class="tab-pane active" id="tab'+maxTabIndex+'"></div>');
		//增加面包屑
		var navBread = $('<div id="zbre'+maxTabIndex+'" class="zbre"><i class="fa fa-angle-double-right"></i></div>');
		//<div id="sbre'+maxTabIndex+'" class="imenu imenu-close"></div>
		//填充面包屑
		updateNavigateBreadText($(this),navBread);
		$(tabPane).append(navBread);
		
		//更新业务单元展示界面
		//$("#ifilter").remove();
		//先销毁
		//$(".zoperate").remove();
		//$("#bizEntityTable").remove();
		var menuUrl = $(this).parent().attr("url");
		//var menuId = $(this).parent().attr("menu_id");

		if(menuUrl != null){
			var modelId;//model必须有
			var viewId;//view可以有
			//在页面中记录viewId
			var myurl = menuUrl.substr(menuUrl.indexOf("?")+1);
			if(myurl !=null && myurl.toString().length>1)
			{
				modelId=GetQueryString(myurl,"modelId");
				viewId=GetQueryString(myurl,"viewId");
				var boxDom = $('<div id="box'+maxTabIndex+'" tabIndex="'+maxTabIndex+'" class="box" onfocus="this.blur()"></div>');
				if(modelId == null){//加载自定义页面或者外部页面
					if(menuUrl.indexOf("/DAMS/auth/")!==-1||menuUrl.indexOf("/DAMS/jobs/")!==-1){
                        $(boxDom).load(menuUrl);
					}else{
                        var iframe=$('<iframe width="100%" height="100%" frameborder="0" allowtransparency="yes"></iframe>');
                        boxDom.append(iframe);
                        iframe.attr("src",menuUrl);
					}
					$(tabPane).append($(boxDom));
					//$("#tabContent").append($(tabPane));
				}else{
					$(tabPane).append($('<input id="hiddenBizModelId'+maxTabIndex+'" type="hidden" value="'+modelId+'"></input>'));
					$(tabPane).append($('<input id="hiddenBizViewId'+maxTabIndex+'" type="hidden" value="'+viewId+'"></input>'));
					//$("#tab"+maxTabIndex).append(boxDom);
					//动态创建过滤条件dom
					formFilterDom(modelId,viewId,maxTabIndex,boxDom);
					//动态创建按钮dom
					//formButtonDom(modelId,viewId,maxTabIndex,boxDom);
					//动态创建表格Dom 并获取数据
					//formGridDom(modelId,viewId,maxTabIndex,boxDom);
					
					$(tabPane).append(boxDom);
				}
				//$("#hiddenBizModelId").val(modelId);
				//$("#hiddenBizViewId").val(viewId);
			}
			$("#tabContent").append($(tabPane));
		}else{
			//若菜单未配置对应内容，则只展示面包屑
			$("#tabContent").append($(tabPane));
		}
		$('#contentnavid a:last').tab('show');
		resize();
		$.parser.parse($('#contentnavid'));
		$.parser.parse($('#tabContent'));

	});
}

/*
 * 处理app dom的拼接 （第一级菜单的父菜单为-1特殊）
 */
function buildAppDom(appList) {
	var firstApp = new Array();
	var otherApp = new Array();
	//获取第一级应用
	for(var i=0;i<appList.length;i++){
		var map = appList[i];
		var par_app_id = map.PAR_APP_ID;
		if(par_app_id == -1){
			firstApp.push(map);//一级
		}else{
			otherApp.push(map);//二级及三级（数据管控应用设计为最多三级）  分开处理的原因是一级的父应用为-1 与其余的逻辑不同
		}
	}
	//遍历一级应用
	for(var j=0;j<firstApp.length;j++){
		var map1 = firstApp[j];
		var app_name = map1.APP_NAME;
		var app_id = map1.APP_ID;
		var li_first = $(APP_DOM_LI_FIRST);
		li_first.text(app_name);
		li_first.attr("app_id",app_id);
		appDom.append(li_first);
		//递归处理子
		buildAppDomRecursively(otherApp, map1, li_first);
	}
}

/*
 * 递归实现第二级级第三级app dom的拼接 （实际也可支持更多级别）
 */
function buildAppDomRecursively(allAppList, parentApp, parentDom) {
	if(allAppList.length<1){//没有子孙了 则递归返回
		return;
	}
	var app_id = parentApp.APP_ID;
	var app_level_id =  parentApp.APP_LEVEL_ID;
	var firstApp = new Array();
	var otherApp = new Array();
	//查找当前一级应用的二级子孙
	for(var k=0;k<allAppList.length;k++){
		var map = allAppList[k];
		var par_app_id1 = map.PAR_APP_ID;
		if(par_app_id1 == app_id){
			firstApp.push(map);//最高级别
		}else{
			otherApp.push(map);//其余级别
		}
	}
	//如果当前父节点有子孙 则继续递归处理
	var ul,arrow;
	if(firstApp.length>0){
		if(app_level_id == 1){
			arrow = $(APP_DOM_LI_ARROW_FIRST);
			parentDom.append(arrow);
			ul = $(APP_DOM_UL_SECOND);
			parentDom.append(ul);
		}else if(app_level_id == 2){
			arrow = $(APP_DOM_LI_ARROW_SECOND);
			parentDom.append(arrow);
			ul = $(APP_DOM_UL_THIRD);
			parentDom.append(ul);
		}
	}

	//遍历一级应用
	for(var j=0;j<firstApp.length;j++){
		var li;
		var map1 = firstApp[j];
		//如果当前父节点有子孙 则继续递归处理
		var app_name = map1.APP_NAME;
		var app_id = map1.APP_ID;
		if(app_level_id == 1){
			li = $(APP_DOM_LI_SECOND);
			li.text(app_name);
			ul.append(li);
		}else if(app_level_id == 2){
			li = $(APP_DOM_LI_THIRD);
			li.text(app_name);
			ul.append(li);
		}else{
			//防御性处理,如果层级超过3级 则不处理
			continue;
		}
		li.attr("app_id",app_id);
		//递归处理子孙
		buildAppDomRecursively(otherApp, map1, li);
	}
}

function buildMenuDom(menuList) {
	var firstMenu = new Array();
	var otherMenu = new Array();
	//获取第一级应用菜单
	for(var i=0;i<menuList.length;i++){
		var map = menuList[i];
		var par_menu_id = map.PAR_MENU_ID;
		if(par_menu_id == -1){
			firstMenu.push(map);//一级菜单
		}else{
			otherMenu.push(map);//二级及三级菜单（数据管控应用菜单设计为最多三级）  分开处理的原因是一级菜单的父菜单为-1 与其余的逻辑不同
		}
	}
	//遍历一级应用菜单
	for(var j=0;j<firstMenu.length;j++){
		var map1 = firstMenu[j];
		var menu_name = map1.MENU_NAME;
		var menu_id = map1.MENU_ID;
		var menu_url = map1.MENU_URL;
		var li_first = $(MENU_DOM_LI_ONE);
		if(menu_url != null){
			li_first.attr("url",menu_url);
			li_first.attr("menu_id",menu_id);
		}
		li_first.append($("<em><i class=\"fa fa-database\"></i><span>"+menu_name+"</span></em>"));
		menuDom.append(li_first);
		//递归处理子菜单
		buildMenuDomRecursively(otherMenu,map1,li_first);
	}
}

/*
 * 递归实现第二级级第三级菜单dom的拼接 （实际也可支持更多级别）
 */
function buildMenuDomRecursively(allMenuList, parentMenu, parentDom) {
	if(allMenuList.length<1){//没有子菜单了 则递归返回
		return;
	}
	var menu_id = parentMenu.MENU_ID;
	var menu_level_id = parentMenu.MENU_LEVEL_ID;
	var firstMenu = new Array();
	var otherMenu = new Array();
	//查找当前一级应用菜单的二级子菜单
	for(var k=0;k<allMenuList.length;k++){
		var map = allMenuList[k];
		var par_menu_id1 = map.PAR_MENU_ID;
		if(par_menu_id1 == menu_id){
			firstMenu.push(map);//最高级菜单
		}else{
			otherMenu.push(map);//其余菜单
		}
	}
	//如果当前父节点有子孙 则继续递归处理
	var ul;
	if(firstMenu.length>0){
		ul = appendUL(parentDom, menu_level_id); 
	}

	//遍历一级应用菜单
	var li;
	for(var j=0;j<firstMenu.length;j++){
		var map1 = firstMenu[j];
		//如果当前父节点有子孙 则继续递归处理
		var menu_name = map1.MENU_NAME;
		var menu_url = map1.MENU_URL;
		li = appendLI(ul, menu_level_id, menu_name);
		if(menu_url != null){
			li.attr("url",menu_url);
		}
		//递归处理子菜单
		buildMenuDomRecursively(otherMenu, map1, li);
	}
}

/*
 * 根据层级append ul元素
 */
function appendUL(parentDom, menu_level_id) {
	var ul;
	switch(menu_level_id) {
	    case 1: 
	    	ul = $(MENU_DOM_UL_TWO);
			break;
	    case 2: 
	    	ul = $(MENU_DOM_UL_THREE);
	    	break;
	    case 3: 
	    	ul = $(MENU_DOM_UL_FOUR);
	    	break;
	    case 4:
	    	ul = $(MENU_DOM_UL_FIVE);
	    	break;
	    default: break;
	}
	parentDom.append(ul);
	return ul;

}

/*
 * 根据层级append li元素
 */
function appendLI(parentDom, menu_level_id, menu_name) {
	var li;
	switch(menu_level_id) {
	    case 1: 
			li = $(MENU_DOM_LI_TWO);
	    	li.append($("<em><img class=\"fileIcon\" src=\"ui/images/file-close-off.png\" data-active=\"close\" alt=\"\" /><span>"+menu_name+"</span></em>"));
			break;
	    case 2: 
	    	li = $(MENU_DOM_LI_THREE);
	    	li.append($("<em><i class=\"fa fa-caret-right\"></i><span>"+menu_name+"</span></em>"));
			break;
	    case 3: 
	    	li = $(MENU_DOM_LI_FOUR);
	    	li.append($("<em><i class=\"fa fa-angle-right\"></i><span>"+menu_name+"</span></em>"));
			break;
	    case 4: 
	    	li = $(MENU_DOM_LI_FIVE);
	    	li.append($("<em><i class=\"fa fa-file-text-o\"></i><span>"+menu_name+"</span></em>"));
	    	break;
	    default: break;
	}
	parentDom.append(li);
	return li;
}

/*
 * 拼接过滤框Dom
 */
function formFilterDom(modelId,viewId,maxTabIndex,boxDom,param){
	//初始化过滤框dom
	$.ajax({
 		url: "/DAMS/bizEntity/filters?modelId="+modelId,
 		type: 'GET',
 		dataType: "json",
 		async: false,
 		success: function (filterList) {
 			if(filterList != null && filterList.length>1){
 				//$(boxDom).append($(FILTER_CONTENT));
 			}
 			buildFilterDom(filterList,boxDom,maxTabIndex,param);
 			//动态创建按钮dom
			formButtonDom(modelId,viewId,maxTabIndex,boxDom,param);
 		},
 		error:function(data){
 			if(data.status =='500'){
 				showAlertDialog("服务器内部错误,请检查网络!");
 			}
        }
	});
}

/*
 * 形成按钮Dom
 */
function formButtonDom(modelId,viewId,maxTabIndex,boxDom,param){
	//初始化按钮dom
	$.ajax({
 		url: "/DAMS/action/buttons?modelId="+modelId,
 		type: 'GET',
 		dataType: "json",
 		async: false,
 		success: function (buttonList) {
 			if(buttonList != null && buttonList.length>0){
 				var operateDom = $('<div class="zoperate" id="zoperate'+maxTabIndex+'"></div>');
 				$(boxDom).append(operateDom);
 			}
 			buildButtonDom(buttonList,boxDom,operateDom,maxTabIndex);
 			//动态创建表格Dom 并获取数据
			formGridDom(modelId,viewId,maxTabIndex,boxDom,param);
 		},
 		error:function(data){
            //alert(data+"buttonList retrieve failed");
        }
	});
}

/*
 * 拼接grid的Dom
 */
function formGridDom(modelId,viewId,maxTabIndex,boxDom,param){
	//初始化表格dom
	$.ajax({
 		url: "/DAMS/bizEntity/columns?modelId="+modelId+"&viewId="+viewId,
 		type: 'GET',
 		dataType: "json",
 		async: false,
 		success: function (columns) {
 			var grid = $('<div class="ztable" id="bizEntityTable'+maxTabIndex+'"></div>');
 			var table = $('<table id="dg'+maxTabIndex+'"></table>');
 			$(grid).append(table);
 			$(boxDom).append(grid);
 			buildGridDom(columns,boxDom,maxTabIndex,table,param);
 		},
 		error:function(data){
 			if(data.status =='500'){
 				showAlertDialog("服务器内部错误,请检查网络!");
 			}
        }
	});
}

/*
 *根据json串创建过滤框Dom结构
 */
function buildFilterDom(filterList,boxDom,tabIndex,param){
	if(filterList.length<1){
		return;
	}
	var ifilter = $('<div class="col-md-12 ifilter" id="ifilter'+$(boxDom).attr("tabIndex")+'">');
	var ifilterLeft =$('<div id="ileft'+tabIndex+'" class="ileft"></div>');
	$(ifilter).append(ifilterLeft);
	//$(ifilter).append('<div class="ibtn"><div class="sbtn"><button class="bggray">重置</button><button class="orange">确定</button></div></div>');
	$(boxDom).append(ifilter);
	//$(ifilter).append($(FILTER_CONTENT_BLOCK));
	//一行
	var div = $(FILTER_DOM_DIV_LINE);
	for(var i=0;i<filterList.length;i++){
		var map = filterList[i];
		//var biz_entity_id = map.BIZ_ENTITY_ID;
		var biz_model_id = map.BIZ_MODEL_ID;
		var biz_atom_desc = map.BIZ_ATOM_DESC;
		var biz_atom_name = map.BIZ_ATOM_NAME;
		var biz_atom_input_type = map.BIZ_ATOM_INPUT_TYPE;
		var biz_atom_default_value = map.BIZ_ATOM_DEFAULT_VALUE;
		var biz_atom_id = map.BIZ_ATOM_ID;
		var hierarchy_biz_atom_id = map.HIERARCHY_BIZ_ATOM_ID;
		var dbc_column_name = map.DBC_COLUMN_NAME;

		//如果param不为空 则预设filter值
		var filterValue=null;
		if(param != null){
			for(p in param){
				if(p==dbc_column_name.toUpperCase()){
					filterValue = param[p];
				}
			}
		}
		//一列
		var divCol = $(FILTER_DOM_DIV_COL);
		var filterDom;
		var controlDom;
		//根据输入框类型确定dom类型
		switch(biz_atom_input_type) {
		    case "01":
		    	divCol.append($("<em>"+biz_atom_desc+"</em>"));
		    	filterDom = $("<div class=\"sinput sinput\"></div>");
		    	controlDom = $("<input class=\"itext form-control\" dbc_column_name=\""+dbc_column_name+"\" id=\""+biz_atom_id+"\" placeholder=\"请输入名称\" aria-describedby=\"basic-addon1\" type=\"text\">");
		    	filterDom.append(controlDom);
		    	divCol.append(filterDom);
				break;
		    case "02":
		    	divCol.append($("<em>"+biz_atom_desc+"</em>"));
		    	filterDom = $("<div class=\"sinput sdrop\"></div>");
		    	//filterDom.append("<button class=\"btn btn-default dropdown-toggle\" type=\"button\" id=\""+biz_atom_id+"\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"><i>全部</i><span class=\"caret\"></span></button>");
                //var ulDom = $("<ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu3\"></ul>");
		    	controlDom = $("<select class=\"dropdown-menu-select\"  dbc_column_name=\""+dbc_column_name+"\"  id=\""+biz_atom_id+"\" ></select>");
		    	controlDom.append($("<option value=\"all\">全部</option>"));

                $.ajax({
             		url: "/DAMS/bizEntity/filterCode",
             		type: 'GET',
             		data:{"biz_atom_id":biz_atom_id},
             		dataType: "json",
             		async: false,
             		success: function (codeList) {
             			for(var i=0;i<codeList.length;i++){
             				var map = codeList[i];
             				/*var keys = [];
             				var values = [];
             				for (var prop in map) {
             					values.push(map[prop]);
             					//keys.push(prop);
             				}
             				var key = values[1];
             				var value = values[0];*/
             				var hierarchyKey = map.HIERARCHY_KEY;
             				var key = map.CODE_KEY;
             				var value = map.CODE_VALUE;
             				//ulDom.append($("<li code=\""+key+"\"><a href=\"#\">"+value+"</a></li>"));
             				controlDom.append($("<option hierarchykey=\""+hierarchyKey+"\" value=\""+key+"\">"+value+"</option>"));
             			}
             		},
             		error:function(data){
             			if(data.status =='500'){
             				showAlertDialog("服务器内部错误,请检查网络!");
             			}
                    }
            	});
                //filterDom.append(ulDom);
                filterDom.append(controlDom);
                controlDom.attr("hierarchykey",hierarchy_biz_atom_id);
                if(hierarchy_biz_atom_id != null && hierarchy_biz_atom_id !=""){//需要进行联动处理
                	$(controlDom).on("change",function(value,key){
                		//var optionSelected = $("option:selected", this);
                        var valueSelected = this.value;
                        //递归改变级联的select展示项
                        changeHirarchySelect(this,valueSelected);
                	});
                }
		    	divCol.append(filterDom);
		    	break;
		    case "03":
		    	divCol.append($("<em>"+biz_atom_desc+"</em>"));
		    	filterDom = $("<div class=\"sinput cdate\"></div>");
		    	controlDom = $("<input  dbc_column_name=\""+dbc_column_name+"\"  id=\""+biz_atom_id+"\"  class=\"easyui-datebox\" data-options=\"formatter:myformatter,parser:myparser\" style=\"width: 100%!important;\"/>");
                filterDom.append(controlDom);
		    	divCol.append(filterDom);
		    	break;
		    case "04":
		    	divCol.append($("<em>"+biz_atom_desc+"</em>"));
		    	filterDom = $('<div class="sinput cdate"></div>');
		    	controlDom = $('<input  dbc_column_name="'+dbc_column_name+'"  id="'+biz_atom_id+'"  class="daterange" style="width: 100%!important;"/>');
                filterDom.append(controlDom);
                divCol.append(filterDom);
                $(controlDom).daterangepicker({
                	autoUpdateInput: false,
                	locale: {
                		applyLabel: '确认',
                		cancelLabel: '重置'
                	}
                });
                $(controlDom).on('apply.daterangepicker', function(ev, picker) {
                    $(this).val(picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD'));
                });

                $(controlDom).on('cancel.daterangepicker', function(ev, picker) {
                    $(this).val('');
                });
		    	break;
		    case "05":
		    	divCol.append($("<em>"+biz_atom_desc+"</em>"));
		    	filterDom = $("<div class=\"sinput\"></div>");
		    	var inputDom = $("<input class=\"itext form-control\" name=\""+dbc_column_name.toUpperCase()+"\" placeholder=\"请输入\" aria-describedby=\"basic-addon1\" type=\"password\"></input>");
		    	if(displayType=="0"||displayType=="2"||displayType=="6"){//修改
		    		var currentVal = $("#"+tabIndexBuildForm+"formDataCache"+dbc_column_name.toUpperCase()).val();
		    		if(currentVal == null){
		    			currentVal = "";
		    		}
	    			//$(inputDom).attr("placeholder",currentVal);
		    		$(inputDom).val(currentVal);
			    	if(is_readonly=='1'){
			    		$(inputDom).attr("readonly","readonly");
			    	}
		    	}else if(displayType=="1"||displayType=="5"){//新增
		    		if(biz_atom_default_value != null && biz_atom_default_value != '' && biz_atom_default_value.match(sysVarReg)){
		    			//alert(biz_atom_default_value.match(sysVarReg)[0]);
		    			var left = biz_atom_default_value.indexOf('{');
			    		var right = biz_atom_default_value.indexOf('}');
			    		var result = biz_atom_default_value.substr(left+1,right-left-1).toUpperCase();
			    		//$(inputDom).val($("#"+result).val());
		    		}
		    		//也初始化空的formDataCache 用于是否变更对比标记
		    		var prop = $('<input type="hidden" id="'+tabIndexBuildForm+'formDataCache'+dbc_column_name.toUpperCase()+'" value=""></input>');
		    	    $("#formDataCache"+tabIndexBuildForm).append(prop);
		    	}
		    	if(is_needed =='1'){
		    		$(inputDom).attr("required","true");
		    	}
	    		filterDom.append(inputDom);
		    	divCol.append(filterDom);
		    	break;
		    case "06"://多选下拉框
				divCol.append($("<em>"+biz_atom_desc+"</em>"));
		    	filterDom = $('<div class="sinput drop" dbc_column_name="'+dbc_column_name.toUpperCase()+'"></div>');
                var inputDom = $('<select class="selectpicker" id="'+dbc_column_name.toUpperCase()+'" name="'+dbc_column_name.toUpperCase()+'"  dbc_column_name="'+dbc_column_name.toUpperCase()+'" multiple></select>');
                filterDom.append(inputDom);
                divCol.append(filterDom);
		    	$(inputDom).selectpicker({noneSelectedText:'请选择'});
		    	$(filterDom).find('div:first').attr('dbc_column_name',dbc_column_name.toUpperCase());
                $.ajax({
             		url: "/DAMS/bizEntity/filterCode",
             		type: 'GET',
             		data:{"biz_atom_id":biz_atom_id},
             		dataType: "json",
             		async: false,
             		success: function (codeList) {
             			for(var i=0;i<codeList.length;i++){
             				var map = codeList[i];
             				var hierarchyKey = map.HIERARCHY_KEY;
             				var key = map.CODE_KEY;
             				var value = map.CODE_VALUE;
             				inputDom.append($("<option hierarchykey=\""+hierarchyKey+"\" value=\""+key+"\">"+value+"</option>"));
                            $(inputDom).selectpicker('refresh');
             			}
             		},
             		error:function(data){
             			if(data.status =='500'){
             				showAlertDialog("服务器内部错误,请检查网络!");
             			}
                    }
            	});
                //filterDom.append(inputDom);
                inputDom.attr("hierarchykey",hierarchy_biz_atom_id);
                if(hierarchy_biz_atom_id != null && hierarchy_biz_atom_id !=""){//需要进行联动处理
                	$(inputDom).on("change",function(value,key){
                		//var optionSelected = $("option:selected", this);
                        var valueSelected = this.value;
                        //递归改变级联的select展示项
                        changeHirarchySelect(this,valueSelected);
                	});
                }
		    	//divCol.append(filterDom);
		    	break;
		    default: break;
		}
		if(filterValue != null){
			controlDom.val(filterValue);
			//controlDom.attr("readonly","readonly");
			controlDom.attr("disabled","disabled");
		}
		div.append(divCol);
		//每加三列需另起一行
		if((i+1)%3==0){
			$(ifilterLeft).append(div);
			div = $(FILTER_DOM_DIV_LINE);
		}
	}
	if((i+1)%3<3 && i%3!=0){
		$(ifilterLeft).append(div);
	}
	
	var filterButtonBlock = $('<div class="ibtn"><div class="sbtn"></div></div>');
	var resetButton = $('<button onclick="resetFilters($(this))" id="resetFilterBtn'+tabIndex+'" class="bggray" tabIndex="'+tabIndex+'" >重置</button>');
	var okButton = $('<button onclick="search($(this));" id="okFilterBtn'+tabIndex+'" tabIndex="'+tabIndex+'" class="orange">确定</button>');
	$(filterButtonBlock).find(".sbtn").append(okButton);
	$(filterButtonBlock).find(".sbtn").append(resetButton);
	$(ifilter).append($(filterButtonBlock));
	$.parser.parse($(ifilterLeft));
	
	//记录continueEdit参数
	if(param != null){
		for(p in param){
			$(ifilter).append('<input type="hidden" class="continueEditParam" id="'+p+'" value="'+param[p]+'"/>');
		}
	}
}

/*
 * 改变级联的select展示项
 */
function changeHirarchySelect(select,parentValue){
	RECURSIVE_LEVEL++;
	var hierarchyKey = $(select).attr("hierarchykey");
	//没有下级级联了
	if(hierarchyKey == null || hierarchyKey ==""){
		RECURSIVE_LEVEL=0;
		return;
	}
	if(RECURSIVE_LEVEL>1){
		$("#"+hierarchyKey).children("option[value!='all']").each(function(){
			$(this).wrap("<span style='display:none'></span>"); //add a <span> around the <option> and hide the <span>. 
		});
	}else{
		//show all options. 
		$("#"+hierarchyKey).children("span").each(function(){ 
			$(this).children().clone().replaceAll($(this)); //use the content of the <span> replace the <span> 
		});
		//Filter the data through selected value of language dropdown-list except 全部
		//If the option is 全部, it only needs to show all and hide nothing. 
		if(parentValue != "all"){
			//hide the option whose parentid is not equal with selected value of language dropdown-list. 
			//The 全部 option should not be hidden. 
			$("#"+hierarchyKey).children("option[hierarchykey!='" + parentValue + "'][value!='all']").each(function(){
				$(this).wrap("<span style='display:none'></span>"); //add a <span> around the <option> and hide the <span>. 
			});
		}
	}
	//递归
	changeHirarchySelect($("#"+hierarchyKey),"all");
}

/*
 * 创建按钮dom
 */
function buildButtonDom(buttonList,boxDom,operateDom,maxTabIndex){
	if(buttonList.length<1){
		return;
	}
	for(var i=0;i<buttonList.length;i++){
		var button = buttonList[i];
		var buttonId = button.BIZ_BUTTON_ID;
		var buttonName = button.BUTTON_NAME;
		var displayType = button.DISPLAY_TYPE;
		var actionModelId = button.ACTION_MODEL_ID;
		var actionViewId = button.ACTION_VIEW_ID;

		var button = $("<i class=\"showDialog\" tabIndex=\""+maxTabIndex+"\" button_id=\""+buttonId+"\" onclick=\"buttonClick($(this))\" action_model_id=\""+actionModelId+"\" action_view_id=\""+actionViewId+"\"  display_type=\""+displayType+"\">"+buttonName+"</i>");
		$(operateDom).prepend(button);
	}
	$(boxDom).append(operateDom);
	
	//$.parser.parse($(".zoperate"));
}

/*
 * 填充导航栏面包屑text
 */
function updateNavigateBreadText(menu,navBread){
	//$("#navigateBread").empty();
	var breadDom = $("<div class=\"sbre\"></div>");
	breadDom.append($("<em><i class=\"fa fa-angle-right\"></i>"+menu.children("span").text()+"</em>"));
	menu.parents("ul").each(function(){
		var em = $(this).siblings("em");
		if(em != null){
			breadDom.prepend($("<em><i class=\"fa fa-angle-right\"></i>"+em.children("span").text()+"</em>"));
		}
	});
	breadDom.children().first().find("i").remove();
	$(navBread).append(breadDom);
}

/*
 * 创建表格dom
 */
function buildGridDom(columns,boxDom,tabIndex,table,param){
	if(columns.length<1){
		return;
	}
	//一行
	var columnsArr = [{field:'ck',checkbox:true}];
	//$("#hiddenDrillModelId").empty();
	//$("#hiddenDrillViewId").empty();
	var hiddenDrillModel = $('<div id="hiddenDrillModelId'+tabIndex+'" class="hiddenDrillModel" type="hidden"></div>');
	var hiddenDrillView = $('<div id="hiddenDrillViewId'+tabIndex+'" class="hiddenDrillView" type="hidden"></div>');
	$(boxDom).append(hiddenDrillModel);
	$(boxDom).append(hiddenDrillView);
	for(var i=0;i<columns.length;i++){
		var map = columns[i];
		var modelId = map.bizModelId;
		var viewId = map.bizViewId;
		var drillModelId = map.drillModelId;
		var drillViewId = map.drillViewId;
		var columnType = map.bizAtomType;
		var inputType = map.bizAtomInputType;
		var column = {};
		column.field = map.bizAtomName.toUpperCase();
		column.title = map.bizAtomDesc;
		column.width = map.columnWidth;
		column.align = map.columnAlign;
		column.hidden = map.isHidden == 1?true:false;
		column.sortable = true;
		
		if(drillModelId != null && drillModelId !=''){
			$(hiddenDrillModel).append($("<input id=\""+tabIndex+"DRILL-MODEL-FIELD-KEY"+column.field+"\" value=\""+drillModelId+"\" type=\"hidden\"/>"));
			$(hiddenDrillView).append($("<input id=\""+tabIndex+"DRILL-VIEW-FIELD-KEY"+column.field+"\" value=\""+drillViewId+"\" type=\"hidden\"/>"));
			column.formatter=function(value,row,index){
						        return '<a style="color:blue" tabIndex='+tabIndex+' onclick="drill($(this))" href="javascript:void(0);">'+value+'</a>';
							}
		}
		if(columnType=='TIMESTAMP'){
			column.formatter= Common.formatDate;
		}
		if(inputType == '02'){//下拉框
			if($(boxDom).find('#catalogCache'+map.bizAtomName.toUpperCase()) == null || $(boxDom).find('#catalogCache'+map.bizAtomName.toUpperCase()).length <= 0){
				$.ajax({
	         		url: "/DAMS/model/reference",
	         		type: 'GET',
	         		data:{"catalog_name":map.bizAtomName.toUpperCase()},
	         		dataType: "json",
	         		async: false,
	         		success: function (codeList) {
	         			//先清理缓存dom
	         			$('#catalogCache'+column.field).remove();
	         			var catalogCache = $('<div style="display:none" id="catalogCache'+column.field+'"></div>');
	         			for(var i=0;i<codeList.length;i++){
	         				var map = codeList[i];
	         				var catalog_id = map.CATALOGID;
	         				var ref_no = map.REF_NO;
	         				var ref_name = map.REF_NAME;
	         				catalogCache.append($('<input type="hidden" value="'+ref_name+'" refName="'+ref_name+'" refNo="'+ref_no+'" ></input>'));
	         			}
	         			$(boxDom).append(catalogCache);
	         		},
	         		error:function(data){
	         			if(data.status =='500'){
	         				showAlertDialog("服务器内部错误,请检查网络!");
	         			}
	                }
	        	});
			}
			column.formatter=codeTranslate;
		}
		if(inputType == '06'){//多选下拉框
			if($(boxDom).find('#catalogCache'+map.bizAtomName.toUpperCase()) == null || $(boxDom).find('#catalogCache'+map.bizAtomName.toUpperCase()).find('input').length <= 0){
				$.ajax({
	         		url: "/DAMS/model/reference",
	         		type: 'GET',
	         		data:{"catalog_name":map.bizAtomName.toUpperCase()},
	         		dataType: "json",
	         		async: false,
	         		success: function (codeList) {
	         			//先清理缓存dom
	         			$('#catalogCache'+column.field).remove();
	         			var catalogCache = $('<div style="display:none" id="catalogCache'+column.field+'"></div>');
	         			for(var i=0;i<codeList.length;i++){
	         				var map = codeList[i];
	         				var catalog_id = map.CATALOGID;
	         				var ref_no = map.REF_NO;
	         				var ref_name = map.REF_NAME;
	         				catalogCache.append($('<input type="hidden" value="'+ref_name+'" refName="'+ref_name+'" refNo="'+ref_no+'" ></input>'));
	         			}
	         			$(boxDom).append(catalogCache);
	         		},
	         		error:function(data){
	         			if(data.status =='500'){
	         				showAlertDialog("服务器内部错误,请检查网络!");
	         			}
	                }
	        	});
			}
			column.formatter=multiCodeTranslate;
		}

		columnsArr[i+1] = column;
	}
	

	//再创建
	$(table).datagrid({
        //url: 'ui/json/entity1.json',
        url: '/DAMS/bizEntity/data?viewId='+viewId+'&modelId='+modelId,
        singleSelect: false,
        pagination: true,
        method: 'post',
        //fitColumns: true,
        queryParams:param,
        //frozenColumns:[[{field:'ck',title:'选择',checkbox:true,width:80,align:'left'}]],
        columns: [columnsArr],
        onLoadSuccess:function(){
        	restyleCheckBox();
        	$(".datagrid-body").css("overflow-x","auto");
        	//$(".datagrid-view").css("height",$(".datagrid-view").outerHeight()+20);
        	//$(".datagrid-body").css("height",$(".datagrid-body").outerHeight()+20);
        	//$(".datagrid-cell").css("width","200px");
        	$(table).datagrid('doCellTip',{cls:{'max-width':'300px'},delay:1000}); 

        }
    });
	
	
}

/*
 * 多选码值转换展示
 */
function multiCodeTranslate(value,row,index){
	var mappedValue = '';
	if(value != null && value !=''){
		var mappedItem = $('#catalogCache'+this.field);
		$(value.split(",")).each(function(index,oneVal){
			if(mappedItem != null && mappedItem.find('input').length > 0){
				mappedValue += mappedItem.find('input[refNo="'+oneVal+'"]').val()+";";
			}else{
				mappedValue = value;
			}
		});
	}else{
		mappedValue = value;
	}
    return mappedValue;
}
/*
 * 码值转换展示
 */
function codeTranslate(value,row,index){
	var mappedValue = null;
	if(value != null && value !=''){
		var mappedItem = $('#catalogCache'+this.field);
		if(mappedItem != null && mappedItem.find('input').length > 0){
			var findedValue = mappedItem.find('input[refNo="'+value+'"]');
			if(findedValue.length>0){
				mappedValue = $(findedValue).val();
			}else{
				mappedValue = value;
			}
		}else{
			mappedValue = value;
		}
	}else{
		mappedValue = value;
	}
    return mappedValue;
}
/*
 * 美化checkbox的样式
 */
function restyleCheckBox(){
	$(".datagrid-cell-check").each(function(index){
		$(this).children("input:first-child").attr("id","icheckbox"+index);
		$(this).children("input:first-child").css("display","none");
		$(this).append($("<label for=\"icheckbox"+index+"\" class=\"checkbox-beauty\"></label>"));
	})
	$(".datagrid-cell-check label").on("click",function(e){
		e.stopPropagation();
	});
	$(".datagrid-header-check").each(function(index){
		$(this).children("input:first-child").attr("id","ihcheckbox"+index);
		$(this).children("input:first-child").css("display","none");
		$(this).append($("<label for=\"ihcheckbox"+index+"\" class=\"checkbox-beauty\"></label>"));
	})
	$(".datagrid-header-check label").on("click",function(e){
		e.stopPropagation();
	});
}


/*
 * 采用正则表达式获取地址栏参数
 */
function GetQueryString(url,name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = url.match(reg);
     if(r!=null)
    	 return  unescape(r[2]);
     return null;
}	

function trim(str){ //删除左右两端的空格
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

function logout(){
    top.location.href="/DAMS/auth/logout";
}