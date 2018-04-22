//过滤框
var FILTER_DOM_DIV_LINE = "<div class=\"iline col-sm-12\"></div>";
var FILTER_DOM_DIV_COL = "<div class=\"im col-xs-4\"></div>";
var FILTER_DOM_DIV_ROW = "<div class=\"im col-xs-12\"></div>";
 
/*
 * 主页面初始化
 */
jQuery(document).ready(function() {
	console.log("form.js");
	var entityId ="${entityId}";
	console.log(${entityId});
	var pageToLoad = '/DAMS/bizEntity/formInputs?entityId='+entityId+'&actionType=${mode}';
	$.ajax({
    	url : pageToLoad,
    	type : "GET",
    	dataType : "json",
    	contentType : 'application/json;charset=UTF-8',
    	success : function(formInputs) {
        		console.log("success");
        		buildFormDom(formInputs);
        		console.log("succeed");
        	},
    	error : function(e) {
        		console.log("error");
        	}
    });
});

/*
 *根据json串创建过滤框Dom结构
 */
function buildFormDom(formInputs){
	if(formInputs.length<1){
		return;
	}
	//一行
	var div = $(FILTER_DOM_DIV_LINE);
	for(var i=0;i<formInputs.length;i++){
		var map = formInputs[i];
		var biz_entity_id = map.BIZ_VIEW_ID;
		var biz_atom_desc = map.BIZ_ATOM_DESC;
		var biz_atom_name = map.BIZ_ATOM_NAME;
		var biz_atom_input_type = map.BIZ_ATOM_INPUT_TYPE;
		var biz_atom_default_value = map.BIZ_ATOM_DEFAULT_VALUE;
		var biz_atom_id = map.BIZ_ATOM_ID;
		var hierarchy_biz_atom_id = map.HIERARCHY_BIZ_ATOM_ID;
		console("formInputMap");
		//一列
		var divCol = $(FILTER_DOM_DIV_ROW);
		var filterDom;
		//根据输入框类型确定dom类型
		switch(biz_atom_input_type) {
		    case "01":
		    	divCol.append($("<em>"+biz_atom_desc+"</em>"));
		    	filterDom = $("<div class=\"sinput sinput\"></div>");
		    	filterDom.append("<input class=\"itext form-control\" id=\""+biz_atom_id+"\" placeholder=\"请输入名称\" aria-describedby=\"basic-addon1\" type=\"text\">");
		    	divCol.append(filterDom);
				break;
		    case "02":
		    	divCol.append($("<em>"+biz_atom_desc+"</em>"));
		    	filterDom = $("<div class=\"sinput sdrop\"></div>");
                var selDom = $("<select class=\"dropdown-menu-select\" id=\""+biz_atom_id+"\" ></select>");
 				selDom.append($("<option value=\"all\">全部</option>"));

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
             				selDom.append($("<option hierarchykey=\""+hierarchyKey+"\" value=\""+key+"\">"+value+"</option>"));
             			}
             		},
             		error:function(data){
                        alert(data+"02");
                    }
            	});
                filterDom.append(selDom);
                selDom.attr("hierarchykey",hierarchy_biz_atom_id);
                if(hierarchy_biz_atom_id != null && hierarchy_biz_atom_id !=""){//需要进行联动处理
                	$(selDom).on("change",function(value,key){
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
                filterDom.append("<input  id=\""+biz_atom_id+"\"  class=\"easyui-datebox\" style=\"width: 100%!important;\"/>");
		    	divCol.append(filterDom);
		    	break;
		    case "04":
		    	break;
		    default: break;
		}
		div.append(divCol);
		$("#entityForm").append(div);
		div = $(FILTER_DOM_DIV_LINE);
	}
	$.parser.parse($("#entityForm"));
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