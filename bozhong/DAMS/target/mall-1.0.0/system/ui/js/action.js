var AUDIT_ACTION_TYPE = ['5','6','7','8','9','10','11','12','13'];
var NOFORM_ACTION_TYPE = ['12','13','28'];
/*
 *过滤框搜索按钮点击事件
 */
function search(button){
	var tabIndex=$(button).attr("tabIndex");
	var buttonId = 'ileft'+tabIndex;
	var param={};
	$("#"+buttonId+" .iline .im .sinput").each(function(index,sinput){
		var input = sinput.firstChild;
		var value = $(input).val();
		if($(input).is("select") && value=="all"){
			return true;//continue
		}
		if($(input).hasClass("bootstrap-select")){
			value = $(input).find(".selectpicker").selectpicker('val');
		}
		if($(input).hasClass("easyui-datebox")){
			value = $(input).datebox('getValue');	// get datebox value
		}
		var biz_atom_id = $(input).attr("id");
		var dbc_column_name = $(input).attr("dbc_column_name");
		param[dbc_column_name.toUpperCase()]=value;
	});
	//重新加载
	$("#dg"+tabIndex).datagrid('reload',param);
}

/*
 *过滤框搜索按钮重置事件
 */
function resetFilters(button){
	var tabIndex=$(button).attr("tabIndex");
	var buttonId = 'ileft'+tabIndex;
	$("#"+buttonId+" .iline .im .sinput").each(function(index,sinput){
		var input = sinput.firstChild;
		if($(input).attr("disabled")!="disabled"){
			if($(input).is("select")){
				$(input).val('all');//continue
			}else if($(input).hasClass("easyui-datebox")){
				value = $(input).val('');	// set datebox value
			}else{
				value = $(input).val('');
			}
		}
	});
}

/*
 * 下钻跳转
 */
function drill(obj){
	var tabIndex = $(obj).attr("tabIndex");
	var field = $(obj).parent().parent().attr("field");
	var drillModelId = $("#"+tabIndex+"DRILL-MODEL-FIELD-KEY"+field).val();
	var drillViewId = $("#"+tabIndex+"DRILL-VIEW-FIELD-KEY"+field).val();
	var param={};
	param[field.toUpperCase()]=$(obj).text();
	appendTab(tabIndex,drillModelId,drillViewId,param);
}

/*
 * 按钮跳转
 */
function buttonDrill(buttonId,tabIndex,modelId,drillModelId,drillViewId){
	var paramRow={};
	var param={};
	var row = $("#dg"+tabIndex).datagrid('getSelected');
	var rows = $("#dg"+tabIndex).datagrid('getSelections');
	if(rows.length>1){
		showAlertDialog('您选择了多条记录，请一次选择一条!');
		return;
	}
	if(row){
		paramRow=row;
		paramRow.FORM_BUTTON_ID = buttonId;
		//获取action_attr JSON格式
		$.ajax({
	    	url : '/DAMS/action/actionAttrJson',
	    	type : "POST",
	    	dataType : "json",
	    	contentType : 'application/json;charset=UTF-8',
	    	data : JSON.stringify(paramRow),                   //转换为json字符串 如果不转,java代码中是获取不到值
	    	success : function(data)
	        {
    			//成功执行的方法
    			if(data.length>0){
    				for(o in data){
    					var dbc_column_name = data[o].DBC_COLUMN_NAME;
    					var drill_column_name = data[o].DRILL_COLUMN_NAME;
    					var value = null;
    					for(var p in paramRow){
    						if(dbc_column_name.toUpperCase() == p){
    							value =  paramRow[p];
    						}
    					}
    					if(value != null){
    						param[drill_column_name.toUpperCase()]=value;
    					}
    				}
    			}
                //添加下钻tab
        		appendTab(tabIndex,drillModelId,drillViewId,param);
	        },error:function(data){
				if(data.status =='500'){
     				showAlertDialog("服务器内部错误,请检查网络!");
     			}
			}
		});
	}else{
		showAlertDialog('请选择一条记录!');
		return;
	}
	/*$.ajax({
    	url : '/DAMS/drill/drillAtomInfo?modelId='+modelId+'&drillModelId='+drillModelId,
    	type : "GET",
    	dataType : "json",
    	contentType : 'application/json;charset=UTF-8',
    	success : function(data) {
    		//drill atoms here to build where clause
    		for(var i=0;i<data.length;i++){
    			var map = data[i];
    			var biz_atom_desc = map.BIZ_ATOM_DESC;
    			var biz_atom_id = map.BIZ_ATOM_ID;
    			var dbc_column_name = map.DBC_COLUMN_NAME;
    			var drill_column_name = map.DRILL_COLUMN_NAME;
    			var value = null;
    			for(var p in paramRow){
			　　 	if(dbc_column_name.toUpperCase() == p){
			　　 		value =  paramRow[p];
			　　 	}
			　　}
    			if(value != null){
    				param[drill_column_name.toUpperCase()]=value;
    			}
    		}
    		//添加下钻tab
    		appendTab(tabIndex,drillModelId,drillViewId,param);
    	},
    	error:function(data){
    		if(data.status == '500'){
    			showAlertDialog("服务器内部错误，请检查网络");
    		}
    	}
    });*/
}

/*
 * 无参数按钮跳转
 */
function buttonDrillNoParam(buttonId,tabIndex,modelId,drillModelId,drillViewId){
	var paramRow={};
	var param={};
	paramRow.FORM_BUTTON_ID = buttonId;
	//获取action_attr JSON格式
	$.ajax({
    	url : '/DAMS/action/actionAttrJson',
    	type : "POST",
    	dataType : "json",
    	contentType : 'application/json;charset=UTF-8',
    	data : JSON.stringify(paramRow),                   //转换为json字符串 如果不转,java代码中是获取不到值
    	success : function(data)
        {
			//成功执行的方法
			if(data.length>0){
				for(o in data){
					var dbc_column_name = data[o].DBC_COLUMN_NAME;
					var drill_column_name = data[o].DRILL_COLUMN_NAME;
					var value = null;
					for(var p in paramRow){
						if(dbc_column_name.toUpperCase() == p){
							value =  paramRow[p];
						}
					}
					if(value != null){
						param[drill_column_name.toUpperCase()]=value;
					}
				}
			}
            //添加下钻tab
    		appendTab(tabIndex,drillModelId,drillViewId,param);
        },error:function(data){
			if(data.status =='500'){
 				showAlertDialog("服务器内部错误,请检查网络!");
 			}
		}
	});
}

//增加一个tab页
function appendTab(tabIndex,drillModelId,drillViewId,param){
	var maxTabIndex = parseInt($("#maxTabIndex").val())+1;
	$("#maxTabIndex").val(maxTabIndex);
	//获取目标页面的名称
	var title = $("#tablia"+tabIndex).text();
	var tablia = $('<a href="#tab'+maxTabIndex+'" id="tablia'+maxTabIndex+'" aria-controls="tab'+maxTabIndex+'" role="tab" data-toggle="tab">'+title+'</a>')
	var liEle = $('<li role="presentation"><i class="fa fa-remove tab-close"></i></li>');
	liEle.prepend(tablia);
	$("#contentnavid").append(liEle);

	var targetTabName;
	$.ajax({
    	url : '/DAMS/model/modelInfo?modelId='+drillModelId,
    	type : "GET",
    	dataType : "json",
    	contentType : 'application/json;charset=UTF-8',
    	success : function(data) {
    		targetTabName = data[0].BIZ_MODEL_NAME;
    		tablia.text(targetTabName);
    	},
    	error:function(data){
    		if(data.status == '500'){
    			showAlertDialog("服务器内部错误，请检查网络");
    		}
    	}
    });
	
	var tabPane = $('<div role="tabpanel" class="tab-pane active" id="tab'+maxTabIndex+'"></div>');
	//$("#tabContent").append(tabPane);
	//增加面包屑
	var navBread = $('#zbre'+tabIndex).clone();
	$(navBread).attr("id",'zbre'+maxTabIndex);
	//$(navBread).find("#sbre"+tabIndex).attr("id",'sbre'+maxTabIndex)
	//$(navBread).find("#sbre"+tabIndex).append($("<em><i class=\"fa fa-angle-right\"></i>下钻</em>"));
	$(navBread).find(".sbre").append($("<em><i class=\"fa fa-angle-right\"></i>下钻</em>"));

	$(tabPane).append(navBread);
	
	$(tabPane).append($('<input id="hiddenBizModelId'+maxTabIndex+'" type="hidden" value="'+drillModelId+'"></input>'));
	$(tabPane).append($('<input id="hiddenBizViewId'+maxTabIndex+'" type="hidden" value="'+drillViewId+'"></input>'));

	var boxDom = $('<div id="box'+maxTabIndex+'" tabIndex="'+maxTabIndex+'" class="box"></div>');
	//动态创建过滤条件dom
	formFilterDom(drillModelId,drillViewId,maxTabIndex,boxDom,param);
	//动态创建按钮dom
	//formButtonDom(drillModelId,maxTabIndex,boxDom);
	//动态创建表格Dom 并获取数据
	//formGridDom(drillModelId,drillViewId,maxTabIndex,boxDom);
	
	$(tabPane).append(boxDom);
	$("#tabContent").append($(tabPane));
	$('#contentnavid a:last').tab('show');
	resize();
}

//增加自定义页面到一个tab页
function appendTabUserdefined(tabIndex,url,targetPageName){
	var maxTabIndex = parseInt($("#maxTabIndex").val())+1;
	$("#maxTabIndex").val(maxTabIndex);
	var title = $("#tablia"+tabIndex).text();
	$("#contentnavid").append($('<li role="presentation"><a href="#tab'+maxTabIndex+'" id="tablia'+maxTabIndex+'" aria-controls="tab'+maxTabIndex+'" role="tab" data-toggle="tab">'+title+'>下钻</a><i class="fa fa-remove tab-close"></i></li></li>'));
	var tabPane = $('<div role="tabpanel" class="tab-pane active" id="tab'+maxTabIndex+'"></div>');
	//增加面包屑
	var navBread = $('#zbre'+tabIndex).clone();
	$(navBread).attr("id",'zbre'+maxTabIndex);
	$(navBread).find(".sbre").append($("<em><i class=\"fa fa-angle-right\"></i>"+targetPageName+"</em>"));
	$(tabPane).append(navBread);
	var boxDom = $('<div id="box'+maxTabIndex+'" tabIndex="'+maxTabIndex+'" class="box"></div>');
    if(url.indexOf("/DAMS/auth/")!==-1||url.indexOf("/DAMS/jobs/")!==-1){
        $(boxDom).load(url);
    }else{
        var iframe=$('<iframe width="100%" height="100%" frameborder="0" allowtransparency="yes"></iframe>');
        boxDom.append(iframe);
        iframe.attr("src",url);
    }
	$(tabPane).append(boxDom);
	$("#tabContent").append($(tabPane));
	$('#contentnavid a:last').tab('show');
	resize();
}


/*
 * 按钮跳转外部页面 或 自定义页面
 */
function buttonDrillUserDefinedPage(buttonId,tabIndex){
	var paramRow={};
	var param={};
	var row = $("#dg"+tabIndex).datagrid('getSelected');
	var rows = $("#dg"+tabIndex).datagrid('getSelections');
	if(rows.length>1){
		showAlertDialog('您选择了多条记录，请一次选择一条!');
		return;
	}
	if(row){
		paramRow=row;
		paramRow.FORM_BUTTON_ID = buttonId;
		//获取action_attr JSON格式
		$.ajax({
	    	url : '/DAMS/action/actionAttrOriginal',
	    	type : "POST",
	    	dataType : "json",
	    	contentType : 'application/json;charset=UTF-8',
	    	data : JSON.stringify(paramRow),                   //转换为json字符串 如果不转,java代码中是获取不到值
	    	success : function(data)
	        {
    			//成功执行的方法
    			if(data.length<1){
    				showAlertDialog("没有配置action_attr!请联系管理员!");
    			}
    			var externalUrl = data[0];
                //添加下钻tab
        		appendTabUserDefinedPage(tabIndex,externalUrl);
	        },error:function(data){
				if(data.status =='500'){
     				showAlertDialog("服务器内部错误,请检查网络!");
     			}
			}
		});
	}else{
		showAlertDialog('请选择一条记录!');
		return;
	}
}

//增加一个tab页
function appendTabUserDefinedPage(tabIndex,externalUrl){
	var maxTabIndex = parseInt($("#maxTabIndex").val())+1;
	$("#maxTabIndex").val(maxTabIndex);
	var title = $("#tablia"+tabIndex).text();
	$("#contentnavid").append($('<li role="presentation"><a href="#tab'+maxTabIndex+'" id="tablia'+maxTabIndex+'" aria-controls="tab'+maxTabIndex+'" role="tab" data-toggle="tab">'+title+'>下钻</a><i class="fa fa-remove tab-close"></i></li></li>'));
	var tabPane = $('<div role="tabpanel" class="tab-pane active" id="tab'+maxTabIndex+'"></div>');
	//$("#tabContent").append(tabPane);
	//增加面包屑
	var navBread = $('#zbre'+tabIndex).clone();
	$(navBread).attr("id",'zbre'+maxTabIndex);
	//$(navBread).find("#sbre"+tabIndex).attr("id",'sbre'+maxTabIndex)
	//$(navBread).find("#sbre"+tabIndex).append($("<em><i class=\"fa fa-angle-right\"></i>下钻</em>"));
	$(navBread).find(".sbre").append($("<em><i class=\"fa fa-angle-right\"></i>下钻</em>"));

	$(tabPane).append(navBread);
	
	var boxDom = $('<div id="box'+maxTabIndex+'" tabIndex="'+maxTabIndex+'" class="box"></div>');
	//加载自定义或者外部页面
    if(externalUrl.indexOf("/DAMS/auth/")!==-1||externalUrl.indexOf("/DAMS/jobs/")!==-1){
        $(boxDom).load(externalUrl);
    }else{
        var iframe=$('<iframe width="100%" height="100%" frameborder="0" allowtransparency="yes"></iframe>');
        boxDom.append(iframe);
        iframe.attr("src",externalUrl);
    }

	$(tabPane).append(boxDom);
	$("#tabContent").append($(tabPane));
	$('#contentnavid a:last').tab('show');
	resize();
}


/*
 * 弹出dialog
 */
function showDialog(buttonId,displayType,actionModelId,actionViewId,tabIndex){
	var paramRow={};
	if(displayType=="0" || displayType=="2" || displayType=="6"){
		var row = $("#dg"+tabIndex).datagrid('getSelected');
		var rows = $("#dg"+tabIndex).datagrid('getSelections');
		if(rows.length>1){
			showAlertDialog('您选择了多条记录，请一次选择一条!');
			return;
		}
		if(row){
			paramRow=row;
		}else{
			showAlertDialog('请选择一条记录!');
			return;
		}
		
		//根据参数row获取表单值  向服务器再发起一次请求
		paramRow.MODEL_ID=$("#hiddenBizModelId"+tabIndex).val();
		/*paramRow.VIEW_ID=$("#hiddenBizViewId"+tabIndex).val();
		paramRow.DISPALY_TYPE = displayType;
		paramRow.ACTION_MODEL_ID = actionModelId;
		paramRow.ACTION_VIEW_ID = actionViewId;*/
		
		//update时才需要去查询原来的数据
		$.ajax({
	    	url : '/DAMS/bizEntity/formData',
	    	type : "POST",
	    	dataType : "json",
	    	contentType : 'application/json;charset=UTF-8',
	    	data : JSON.stringify(paramRow),                 //转换为json字符串 如果不转,java代码中是获取不到值
	    	success : function(data) {
	    			$("#formDataCache"+tabIndex).remove();
	    			var formDataCache = $('<div id="formDataCache'+tabIndex+'" type="hidden"></div>');
	    			$("#box"+tabIndex).append(formDataCache);
	        		for(var p in data){
	    			 	var value = data[p];
	    			 	var prop = $('<input type="hidden" id="'+tabIndex+'formDataCache'+p+'" value="'+value+'"></input>');
	    			 	$(formDataCache).append(prop);
	    			}
	        		/*for ( var i = 0; i < data.length; i++) {
	        			var value = data[i].VALUE;
	        			var key = data[i].KEY;
	        			var highlight = data[i].HIGHLIGHT;
	        			var prop = $('<input type="hidden" id="'+tabIndex+'formDataCache'+i+'" value="'+value+'"></input>');
	    			　　 $(formDataCache).append(prop);
	        		}*/
	        		//数据获取完成后 才能形成Dom 不然ajax请求可能没完成
	        		formFormDom(buttonId,displayType,actionModelId,actionViewId,tabIndex,data);
	        	},
	    	error : function(e) {
		    		if(e.status =='500'){
	     				showAlertDialog("服务器内部错误,请检查网络!");
	     			}
	        	}
	    });
	}else{//ADD
		$("#formDataCache"+tabIndex).remove();
		var formDataCache = $('<div id="formDataCache'+tabIndex+'" type="hidden"></div>');
		$("#box"+tabIndex).append(formDataCache);
		
		formFormDom(buttonId,displayType,actionModelId,actionViewId,tabIndex,null);
	}
	
	/*直接将表格行拿到form中展示 不再向服务器发起请求
	$("#formDataCache"+tabIndex).remove();
	var formDataCache = $('<div id="formDataCache'+tabIndex+'" type="hidden"></div>');
	$("#box"+tabIndex).append(formDataCache);
	for(var p in paramRow){
	　　 	var value = paramRow[p];
	　　 	var prop = $('<input type="hidden" id="'+tabIndex+'formDataCache'+p+'" value="'+value+'"></input>');
	　　 	$(formDataCache).append(prop);
	　　}
	formFormDom(actionType,actionModelId,actionViewId,actionId,tabIndex);
	*/

}

function formFormDom(buttonId,displayType,actionModelId,actionViewId,tabIndexForm,data){
	//先构建表单form的dom结构
	var formDom = $('<form id="entityForm'+tabIndexForm+'" class="coverpopup" method="POST" action="/DAMS/bizEntity/operate"  ></form>');// enctype="multipart/form-data"
	/*formDom.append($('<input name="form_view_id" type="hidden" value="'+$("#hiddenBizViewId"+tabIndexForm).val()+'"></input>'));
	formDom.append($('<input name="form_model_id" type="hidden" value="'+$("#hiddenBizModelId"+tabIndexForm).val()+'"></input>'));
	formDom.append($('<input name="form_action_model_id" type="hidden" value="'+actionModelId+'"></input>'));*/
	formDom.append($('<input name="form_display_type" type="hidden" value="'+displayType+'"></input>'));
	formDom.append($('<input name="form_button_id" type="hidden" value="'+buttonId+'"></input>'));
	
	if(data == null){
		data={};
	}
	data.ACTION_MODEL_ID = actionModelId;
	data.ACTION_VIEW_ID = actionViewId;

	var fromUrl = '/DAMS/bizEntity/formInputs';
	$.ajax({
    	url : fromUrl,
    	type : "POST",
    	dataType : "json",
    	contentType : 'application/json;charset=UTF-8',
    	data : JSON.stringify(data),                 //转换为json字符串 如果不转,java代码中是获取不到值
    	success : function(formInputs) {
        		formDom = buildFormDom(formInputs,formDom,displayType,tabIndexForm);
        		/*if(displayType == '5' || displayType == '6'){
        			formDom.append($('<input name="form_audit_file" type="file">审核文件</input>'));
        		}*/
        	},
    	error : function(e) {
	    		if(e.status =='500'){
	 				showAlertDialog("服务器内部错误,请检查网络!");
	 			}
        	}
    });
	
	var saveButton = {
            label: '保存',
            cssClass: 'btn-primary',
            action: function(dialog) {
            	//表单验证
            	/** 判断input属性中是否存在required属性 */
            	var inputs = $(':input',"#entityForm"+tabIndexForm);
            	var validate = true;
        		for ( var i = 0; i < inputs.length; i++) {
        			if (inputs[i].required && ($(inputs[i]).val()==null || $(inputs[i]).val()=='') && !$(inputs[i]).hasClass('selectPicker')) {
        				$(inputs[i]).addClass("inputborder");
        				validate = false;
        			}
        		}
            	if(!validate){
            		showAlertDialog("表单验证失败!");
            		return;
            	}
            	//参数组装 审核模式需进行痕迹记录
            	var param = {};
            	for ( var i = 0; i < inputs.length; i++) {
            		if($(inputs[i]).is("button")){//表单里的button类型是bootstrap-select控件自动生成的 不需要处理
            			continue;
            		}else{
            			var value;
            			if($(inputs[i]).is("select") && $(inputs[i]).hasClass("selectpicker")){
            				value = $(inputs[i]).selectpicker('val');
            				if(value!=null &&value!=''){
            					value=value.join(",");
            				} else{
            					value = "";
            				}
            			}/*else if($(inputs[i]).hasClass("daterange")){
            				var startDate=  $(inputs[i]).data('daterangepicker').startDate;//.format('YYYY-MM-DD');
            				var endDate=  $(inputs[i]).data('daterangepicker').endDate;//.format('YYYY-MM-DD');
            				value = startDate+'-'+endDate;
            			}*/else{
            				value = $(inputs[i]).val();
            			}
            			var key = inputs[i].name;
            			var columnName = key;
            			var oldValue =  $("#"+tabIndexForm+"formDataCache"+columnName).val();
            			var data = {};
            			data.VALUE = value;
            			data.OLDVALUE = oldValue;
            			if(value != oldValue){
            				data.CHANGED = true;
            			}else{
            				data.CHANGED = false;
            			}
            			param[key]=data;
            		}
        		}
            	if($.inArray(displayType, AUDIT_ACTION_TYPE)!=-1){
	            	var rcdStatus = {};
	            	rcdStatus.VALUE = $("#"+tabIndexForm+"formDataCacheRCDSTATUS").val();
	            	rcdStatus.OLDVALUE = "";
	            	rcdStatus.CHANGED = false;
	            	param["RCDSTATUS"] = rcdStatus;
            	}
            	param.FORM_BUTTON_ID = buttonId;
            	//提交
            	/*if($.inArray(displayType, AUDIT_ACTION_TYPE)==-1){//NORMAL MODE
	            	$.ajax({
		                 url:"/DAMS/action/operate",
		                 data:$("#entityForm"+tabIndexForm).serialize(),
		                 type:"POST",
		  				 dataType : "json",
		                 success:function(data){//ajax返回的数据
							 if(data=='1'){
								 //成功则关闭form窗口
								 dialog.close();
								 showAlertDialog("操作成功!");
								 //重新加载
	                             $("#dg"+tabIndexForm).datagrid('reload');
				             }else{
				            	 showAlertDialog("操作失败!");
				             }
		                 },
						 error:function(data){
							 if(data.status =='500'){
		             				showAlertDialog("服务器内部错误,请检查网络!");
		             			}
						 }
		            });
            	}else{//AUDIT MODE
            		$.ajax({
	                 	url:"/DAMS/action/operate",
	                 	data:JSON.stringify(param),
	                 	type:"POST",
	  				 	dataType : "json",
            			contentType : 'application/json;charset=UTF-8',
            			success:function(data){//ajax返回的数据
            				if(data=='1'){
            					//成功则关闭form窗口
            					dialog.close();
            					showAlertDialog("操作成功!");
            					//重新加载
            					$("#dg"+tabIndexForm).datagrid('reload');
            				}else{
            					showAlertDialog("操作失败!");
            				}
            			},
            			error:function(data){
            				if(data.status =='500'){
            					showAlertDialog("服务器内部错误,请检查网络!");
            				}
            			}
            		});
            	}
            	*/
            	$.ajax({
					url:"/DAMS/action/operate",
					data:JSON.stringify(param),
					type:"POST",
					dataType : "json",
        			contentType : 'application/json;charset=UTF-8',
        			success:function(data){//ajax返回的数据
        				if(data=='1'){
        					//成功则关闭form窗口
        					dialog.close();
        					showAlertDialog("操作成功!");
        					//重新加载
        					$("#dg"+tabIndexForm).datagrid('reload');
        				}else if(data=='-2'){
        					showAlertDialog("您不能对这条记录进行该操作(不符合Action Precheck条件)!");
        				}else{
        					showAlertDialog("操作失败!");
        				}
        			},
        			error:function(data){
        				if(data.status =='500'){
        					showAlertDialog("服务器内部错误,请检查网络!");
        				}
        			}
        		});
            }
       };
	
	var buttonArray = [];
	if(displayType!='0'){
		buttonArray.push(saveButton);
	}
	buttonArray.push({
		label: '退出',
		cssClass: 'btn-default',
		action: function(dialog) {
			dialog.close();
		}
	});
	
	BootstrapDialog.show({
		title: '数据维护',
        //message: $('#dialog').load('/DAMS/entity/form'),
        message: function(dialog) {
            //var $message = $('<div></div>');
            //var pageToLoad = dialog.getData('pageToLoad');
            //$message.load(pageToLoad);
            return formDom;
        },
		buttons:buttonArray,
	    data: {
           //'pageToLoad': '/DAMS/bizEntity/form?entityId='+$("#hiddenBizViewId").val()+'&actionType='+actionType
           //'pageToLoad': '/DAMS/bizEntity/form'
        },
        closable:false,
        autodestroy:true
    });
}


/*
 *根据json串创建过滤框Dom结构
 */
function buildFormDom(formInputs,formDom,displayType,tabIndexBuildForm){
	if(formInputs.length<1){
		return;
	}
	//一行
	//var div = $(FILTER_DOM_DIV_LINE);
	//var sysVarReg = /@\{(.+?)\}/g;
	//var sysVarReg =new RegExp("\\{(.| )+?\\}","igm");
	var sysVarReg = /\@\{\w+\}/g;

	for(var i=0;i<formInputs.length;i++){
		var map = formInputs[i];
		//var biz_model_id = map.BIZ_MODEL_ID;
		var biz_atom_desc = map.BIZ_ATOM_DESC;
		var biz_atom_name = map.BIZ_ATOM_NAME;
		var biz_atom_input_type = map.BIZ_ATOM_INPUT_TYPE;
		var biz_atom_default_value = map.BIZ_ATOM_DEFAULT_VALUE;
		var biz_atom_id = map.BIZ_ATOM_ID;
		var hierarchy_biz_atom_id = map.HIERARCHY_BIZ_ATOM_ID;
		var dbc_column_name = map.DBC_COLUMN_NAME;
		var is_pk = map.IS_PK;
		var is_readonly = map.IS_READONLY;
		var is_needed = map.IS_NEEDED;
		var highlight = map.CHGFIELD;
		//一列
		var divCol = $(FILTER_DOM_DIV_LINE);
		var filterDom;
		//根据输入框类型确定dom类型
		switch(biz_atom_input_type) {
		    case "01":
		    	divCol.append($("<em>"+biz_atom_desc+"</em>"));
		    	filterDom = $("<div class=\"sinput\"></div>");
		    	var inputDom = $("<input class=\"itext form-control\" name=\""+dbc_column_name.toUpperCase()+"\" placeholder=\"请输入\" aria-describedby=\"basic-addon1\" type=\"text\"></input>");
		    	if(displayType=="0"||displayType=="2"||displayType=="6"){//修改
		    		var currentVal = $("#"+tabIndexBuildForm+"formDataCache"+dbc_column_name.toUpperCase()).val();
		    		if(currentVal == null){
		    			currentVal = "";
		    		}
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
		    case "02":
		    	divCol.append($("<em>"+biz_atom_desc+"</em>"));
		    	filterDom = $("<div class=\"sinput sdrop\"></div>");
                var inputDom = $('<select class="dropdown-menu-select" name="'+dbc_column_name.toUpperCase()+'" ></select>');
                
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
             			}
             			inputDom.append($('<option></option>'));
             		},
             		error:function(data){
             			if(data.status =='500'){
             				showAlertDialog("服务器内部错误,请检查网络!");
             			}
                    }
            	});
                if(displayType=="0"||displayType=="2"||displayType=="6"){//修改
		    		var currentVal = $("#"+tabIndexBuildForm+"formDataCache"+dbc_column_name.toUpperCase()).val();
		    		if(currentVal == null){
		    			currentVal = "";
		    		}
		    		$(inputDom).val(currentVal);
		    		if(is_readonly=='1'){
			    		$(inputDom).attr("readonly","readonly");
			    		$(inputDom).attr("disabled","disabled");
			    		$(inputDom).css("background-color","#eee");
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
                filterDom.append(inputDom);
                inputDom.attr("hierarchykey",hierarchy_biz_atom_id);
                if(hierarchy_biz_atom_id != null && hierarchy_biz_atom_id !=""){//需要进行联动处理
                	$(inputDom).on("change",function(value,key){
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
		    	var inputDom = $('<input name="'+dbc_column_name.toUpperCase()+'"  class="easyui-datebox" data-options="formatter:myformatter,parser:myparser" style="width: 100%!important;"/>');
		    	if(displayType=="0"||displayType=="2"||displayType=="6"){//修改
		    		var currentVal = $("#"+tabIndexBuildForm+"formDataCache"+dbc_column_name.toUpperCase()).val();
		    		if(currentVal == null){
		    			currentVal = "";
		    		}
		    		$(inputDom).val(currentVal);
		    		if(is_readonly=='1'){
			    		$(inputDom).attr("readonly","readonly");
			    		$(inputDom).datebox({disabled:true});
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
                filterDom.append(inputDom);
		    	divCol.append(filterDom);
		    	break;
		    case "04":
		    	divCol.append($("<em>"+biz_atom_desc+"</em>"));
		    	filterDom = $("<div class=\"sinput cdate\"></div>");
		    	var inputDom = 	$('<input  name="'+dbc_column_name.toUpperCase()+'"  id="'+biz_atom_id+'"  class="daterange" style="width: 100%!important;"/>');
                filterDom.append(inputDom);
		    	divCol.append(filterDom);
		    	$(inputDom).daterangepicker({
                	autoUpdateInput: false,
                	locale: {
                		applyLabel: '确认',
                		cancelLabel: '重置'
                	}
                });
                $(inputDom).on('apply.daterangepicker', function(ev, picker) {
                    $(this).val(picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD'));
                });
                $(inputDom).on('cancel.daterangepicker', function(ev, picker) {
                    $(this).val('');
                });
		    	if(displayType=="0"||displayType=="2"||displayType=="6"){//修改
		    		var currentVal = $("#"+tabIndexBuildForm+"formDataCache"+dbc_column_name.toUpperCase()).val();
		    		if(currentVal == null){
		    			currentVal = "";
		    		}
		    		$(inputDom).val(currentVal);
		    		if(is_readonly=='1'){
		    			//$(inputDom).daterangepicker('disable'});
		    			$(inputDom).attr("readonly","readonly");
			    		$(inputDom).attr("disabled","disabled");
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
		    	filterDom = $("<div class=\"sinput drop\"></div>");
                var inputDom = $('<select class="selectpicker" id="'+dbc_column_name.toUpperCase()+'" name="'+dbc_column_name.toUpperCase()+'" dbc_column_name="'+dbc_column_name.toUpperCase()+'" multiple></select>');
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
                if(displayType=="0"||displayType=="2"||displayType=="6"){//修改
		    		var currentVal = $("#"+tabIndexBuildForm+"formDataCache"+dbc_column_name.toUpperCase()).val();
		    		if(currentVal == null){
		    			currentVal = "";
		    		}else{
		    			currentVal = currentVal.split(",");
		    		}
		    		$(inputDom).selectpicker('val', currentVal);
		    		if(is_readonly=='1'){
			    		$(inputDom).attr("readonly","readonly");
			    		$(inputDom).attr("disabled","disabled");  
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
		//高亮field
		if(displayType=="0"||displayType=="2"){//查看、修改
			if(highlight != null && highlight != ''){
				$(inputDom).css("background-color","#31b0d5");
				$(inputDom).css("color","#FFF");
			}
		}
		$('#ifilter'+tabIndexBuildForm+' .continueEditParam').each(function(index,input){
			//console.log($(input).attr("id"));
			if($(input).attr("id") == dbc_column_name.toUpperCase()){
				$(inputDom).val($(input).val());
				$(inputDom).attr("readonly","readonly");
				$(inputDom).attr("disabled","disabled");
			}
		});
		/*div.append(divCol);
		$(formDom).append(div);
		div = $(FILTER_DOM_DIV_LINE);*/
		$(formDom).append(divCol);
	}
	$.parser.parse($(formDom));
	return $(formDom)
}

//检测是否选择了某条记录 并设置更改痕迹标志
function hasSelectRecord(paramRow,param,tabIndex){
	var row = $("#dg"+tabIndex).datagrid('getSelected');
	var rows = $("#dg"+tabIndex).datagrid('getSelections');
	if(rows.length>1){
		showAlertDialog('您选择了多条记录，请一次选择一条!');
		return false;
	}
	if(row){
		paramRow=row;
    	for (key in paramRow) {
			 var value = paramRow[key];
			 var data = {};
			 //代码逆转换
			/* var codedValue = $('#catalogCache'+key).find('input[refName='+value+']');
			 if(codedValue != null && codedValue.length >0){//需要进行代码逆转换
				 data.VALUE = codedValue;
				 data.OLDVALUE = codedValue;
				 data.CHANGED = false;
			 }else{
				 data.VALUE = value;
				 data.OLDVALUE = value;
				 data.CHANGED = false;
			 }*/
			 data.VALUE = value;
			 data.OLDVALUE = value;
			 data.CHANGED = false;
			 param[key]=data;
			 
		}
    	/*
    	$("#bizEntityTable"+tabIndex).find(".datagrid-row-selected td").each(function(index,cell){
    		var field = $(cell).attr("field");
    		if(field != 'ck'){
    			var data = {};
        		data.VALUE = $($(cell).children("div").get(0)).text();
        		console.log(data.VALUE);
        		data.OLDVALUE = data.VALUE;
        		data.CHANGED = false;
    			param[field]=data;
    		}
    	})*/
    	return true;
	}else{
		return false;
	}
}

/*
 * 弹出dialog
 */
function showConformDialog(buttonId,displayType,tabIndex,titleStr,msgStr){
	var paramRow={};
	//参数组装 审核模式需进行痕迹记录
	var param = {};
	
	var selected = hasSelectRecord(paramRow,param,tabIndex);
	if($.inArray(displayType, NOFORM_ACTION_TYPE)==-1){
		if(!selected){
			showAlertDialog("您未选中记录!");
			return;
		}
	}
	param.FORM_BUTTON_ID = buttonId;
	paramRow.FORM_BUTTON_ID = buttonId;

	BootstrapDialog.show({
		title: titleStr,
		message: msgStr,
		buttons: [{
	            label: '确认',
	            cssClass: 'btn-primary',
	            action: function(dialog) {
	            	/*if($.inArray(displayType, AUDIT_ACTION_TYPE)==-1){//NORMAL MODE
	            		$.ajax({
		        	    	//url : '/DAMS/action/noFormAction',
		        	    	url : '/DAMS/action/operate',
		        	    	type : "POST",
		        	    	dataType : "json",
		        	    	contentType : 'application/json;charset=UTF-8',
		        	    	data : JSON.stringify(paramRow),                 //转换为json字符串 如果不转,java代码中是获取不到值
		        	    	success : function(data)
		                        {   //成功执行的方法 
		                            if(data=='1'){
		                            	//成功则关闭form窗口
										dialog.close();
		                            	showAlertDialog("操作成功!");
		                            	//重新加载
		                            	$("#dg"+tabIndex).datagrid('reload');
		                            }else{
		                            	showAlertDialog("操作失败!");
		                            }
		                        },
		        	    	error : function(e) {
			        	    		if(e.status =='500'){
			             				showAlertDialog("服务器内部错误,请检查网络!");
			             			}
		        	        	}
		        	    });
	            	}else{//AUDIT MODE
	            		$.ajax({
		        	    	//url : '/DAMS/action/noFormAction',
		        	    	url : '/DAMS/audit/operatePending',
		        	    	type : "POST",
		        	    	dataType : "json",
		        	    	contentType : 'application/json;charset=UTF-8',
		        	    	data : JSON.stringify(paramRow),                 //转换为json字符串 如果不转,java代码中是获取不到值
		        	    	success : function(data)
		                        {   //成功执行的方法 
		                            if(data=='1'){
		                            	//成功则关闭form窗口
										dialog.close();
		                            	showAlertDialog("操作成功!");
		                            	//重新加载
		                            	$("#dg"+tabIndex).datagrid('reload');
		                            }else{
		                            	showAlertDialog("操作失败!");
		                            }
		                        },
		        	    	error : function(e) {
			        	    		if(e.status =='500'){
			             				showAlertDialog("服务器内部错误,请检查网络!");
			             			}
		        	        	}
		        	    });
	            	}*/
	            	
	            	$.ajax({
	        	    	//url : '/DAMS/action/noFormAction',
	        	    	url : '/DAMS/action/operate',
	        	    	type : "POST",
	        	    	dataType : "json",
	        	    	contentType : 'application/json;charset=UTF-8',
	        	    	data : JSON.stringify(param),                 //转换为json字符串 如果不转,java代码中是获取不到值
	        	    	success : function(data)
	                        {   //成功执行的方法 
	                            if(data=='1'){
	                            	//成功则关闭form窗口
									dialog.close();
	                            	showAlertDialog("操作成功!");
	                            	//重新加载
	                            	$("#dg"+tabIndex).datagrid('reload');
	                            }else if(data=='-2'){
	            					showAlertDialog("您不能对这条记录进行该操作(不符合Action Precheck条件)!");
	            				}else{
	                            	showAlertDialog("操作失败!");
	                            }
	                        },
	        	    	error : function(e) {
		        	    		if(e.status =='500'){
		             				showAlertDialog("服务器内部错误,请检查网络!");
		             			}
	        	        	}
	        	    });
	            	
	            }
		       }, {
		            label: '取消',
		            cssClass: 'btn-default',
		            action: function(dialog) {
		                dialog.close();
		            }
		       }],
        closable:false,
        autodestroy:true
    });
	
}

/*
 * 弹出dialog 不需传入选中的行
 */
/*function showConformDialog(buttonId,tabIndex,titleStr,msgStr){
	var paramRow={};
	paramRow.form_button_id = buttonId;
	BootstrapDialog.show({
		title: titleStr,
		message: msgStr,
		buttons: [{
	            label: '确认',
	            cssClass: 'btn-primary',
	            action: function(dialog) {
	            	$.ajax({
	        	    	url : '/DAMS/action/operate',
	        	    	type : "POST",
	        	    	dataType : "json",
	        	    	contentType : 'application/json;charset=UTF-8',
	        	    	data : JSON.stringify(paramRow),                   //转换为json字符串 如果不转,java代码中是获取不到值
	        	    	success : function(data)
	                        {    //成功执行的方法  
	                            if(data=1){
	                            	//成功则关闭form窗口
									dialog.close();
	                            	showAlertDialog("操作成功!");
	                            	//重新加载
	                            	$("#dg"+tabIndex).datagrid('reload');
	                            }else if(data>1){
	                            	//成功则关闭form窗口
									dialog.close();
	                            	showAlertDialog("操作成功！条数："+data);
	                            }else{
	                            	showAlertDialog("操作失败!");
	                            }
	                        },
	        	    	error : function(e) {
		        	    		if(e.status =='500'){
		             				showAlertDialog("服务器内部错误,请检查网络!");
		             			}
	        	        	}
	        	    });
	            }
		       }, {
		            label: '取消',
		            cssClass: 'btn-default',
		            action: function(dialog) {
		                dialog.close();
		            }
		       }],
        closable:false,
        autodestroy:true
    });
	
}*/

/*
 * 附件上传
 */
function showUploadDialog(tabIndex,modelId,title){
	var formDom = $('<form id="attachmentFileForm" class="coverpopup" method="POST" action="" enctype="multipart/form-data" ></form>');// 
	formDom.append($('<span>请上传附件<input name="file" type="file"></input></span>'));
	
	var saveButton = {
            label: '上传',
            cssClass: 'btn-primary',
            action: function(dialog) {
            	//表单验证
            	/** 判断input属性中是否存在required属性 */
            	var inputs = $(':input',"#attachmentFileForm");
            	var validate = true;
        		for ( var i = 0; i < inputs.length; i++) {
        			if (inputs[i].required && ($(inputs[i]).val()==null || $(inputs[i]).val()=='')) {
        				$(inputs[i]).addClass("inputborder");
        				validate = false;
        			}
        		}
            	if(!validate){
            		showAlertDialog("表单验证失败!");
            		return;
            	}
            	var options  = {
                        url:'/DAMS/audit/storeAttachmentfile.do',
                        type:'POST',
                        dataType : "json",
                        success:function(data)
                        {    //成功执行的方法  
                             if(data=='1'){
	                           	  //成功则关闭form窗口
	   							 dialog.close();
	   							 showAlertDialog("上传成功!");
                             }else{
                           	  	showAlertDialog("上传失败!");
                             }
                        },
   					 error:function(data){
   						 if(data.status =='500'){
   	             				showAlertDialog("服务器内部错误,请检查网络!");
   	             			}
   					 }
                   };
               	$("#attachmentFileForm").ajaxSubmit(options);
            }
       };
	
	var buttonArray = [];
	buttonArray.push(saveButton);
	buttonArray.push({
		label: '取消',
		cssClass: 'btn-default',
		action: function(dialog) {
			dialog.close();
		}
	});
	
	BootstrapDialog.show({
		title: title,
        message: function(dialog) {
            return formDom;
        },
		buttons:buttonArray,
	    data: {
        },
        closable:false,
        autodestroy:true
    });
}
/*
 * 弹出确认下载dialog
 */
function showDownloadDialog(buttonId,tabIndex,titleStr,msgStr){
	var paramRow={};
	var filePath;
	var fileName;
	paramRow.form_button_id = buttonId;
	var row = $("#dg"+tabIndex).datagrid('getSelected');
	var rows = $("#dg"+tabIndex).datagrid('getSelections');
	if(rows.length>1){
		showAlertDialog('您选择了多条记录，请一次选择一条!');
		return;
	}
	if(row){
		//获取action_attr
		$.ajax({
	    	url : '/DAMS/action/actionAttr',
	    	type : "POST",
	    	dataType : "json",
	    	contentType : 'application/json;charset=UTF-8',
	    	data : JSON.stringify(paramRow),                   //转换为json字符串 如果不转,java代码中是获取不到值
	    	success : function(data)
	            {    //成功执行的方法  
	                var map = data[0];
	                filePath = map.FILEPATH;
	                fileName = map.FILENAME;
	                
	                
	                for(p in row){
	        			if(p == filePath){
	        				filePath = row[p];
	        			}
	        			if(p == fileName){
	        				fileName = row[p];
	        			}
	        		}
	                if(filePath == null || filePath =='' || fileName == null || fileName ==''){
	                	showAlertDialog("文件路径不正确，请检查!");
	                }
	        		
	        		BootstrapDialog.show({
	        			title: titleStr,
	        			message: msgStr,
	        			buttons: [{
	        		            label: '确认',
	        		            cssClass: 'btn-primary',
	        		            action: function(dialog) {
	        		            	window.location.href='/DAMS/file/downloadfile.do?filePath='+encodeURI(filePath)+'&fileName='+fileName+'&fileType=txt';
	        		            	dialog.close();
	        		            	return false;
	
	        		            }
	        			       }, {
	        			            label: '取消',
	        			            cssClass: 'btn-default',
	        			            action: function(dialog) {
	        			                dialog.close();
	        			            }
	        			       }],
	        	        closable:false,
	        	        autodestroy:true
	        	    });
	            },
	    	error : function(e) {
		    		if(e.status =='500'){
	     				showAlertDialog("服务器内部错误,请检查网络!");
	     			}
	        	}
	    });
		
	}else{
		showAlertDialog("您未选中记录!");
		return;
	}
}

/*
 * 弹出确认发布规则dialog
 */
/* *
 * 
 * 弹出确认执行dialog
 * 
 * */
function showOutInterfaceDialog(url,tabIndex,titleStr,msgStr){
	var row = $("#dg"+tabIndex).datagrid('getSelected');
	var rows = $("#dg"+tabIndex).datagrid('getSelections');
	if(rows.length>1){
		showAlertDialog('您选择了多条记录，请一次选择一条!');
		return;
	}
	if(row){
		BootstrapDialog.show({
			title: titleStr,
			message: msgStr,
			buttons: [{
		            label: '确认',
		            cssClass: 'btn-primary',
		            action: function(dialog) {
		            	$.ajax({
		        	    	url : url,
		        	    	type : "POST",
		        	    	dataType : "json",
		        	    	contentType : 'application/json;charset=UTF-8',
		        	    	data : JSON.stringify(row),               //转换为json字符串 如果不转,java代码中是获取不到值
		        	    	success : function(data)
		                        {    //成功执行的方法  
		                            
	                            	//成功则关闭form窗口
		        	    			
									dialog.close();
									var text;
									if(data.can == "true"){
										text = "执行成功";
									} else{
										text = data.can;
									}
	                            	showAlertDialog(text);
	                            	//重新加载
		                            
		                        },
		        	    	error : function(e) {
			        	    		if(e.status =='500'){
			             				showAlertDialog("服务器内部错误,请检查网络!");
			             			}
		        	        	}
		        	    });

		            }
			       }, {
			            label: '取消',
			            cssClass: 'btn-default',
			            action: function(dialog) {
			                dialog.close();
			            }
			       }],
	        closable:false,
	        autodestroy:true
	    });
		
	}else{
		showAlertDialog("您未选中记录!");
		return;
	}
}
/*
 * 弹出确认发布规则dialog
 */
function showOutPublishDialog(url,tabIndex,titleStr,msgStr){
	var row = $("#dg"+tabIndex).datagrid('getSelected');
	var rows = $("#dg"+tabIndex).datagrid('getSelections');
	if(rows.length>1){
		showAlertDialog('您选择了多条记录，请一次选择一条!');
		return;
	}
	if(row){
		BootstrapDialog.show({
			title: titleStr,
			message: msgStr,
			buttons: [{
		            label: '确认',
		            cssClass: 'btn-primary',
		            action: function(dialog) {
		            	$.ajax({
		        	    	url : url,
		        	    	type : "POST",
		        	    	dataType : "json",
		        	    	contentType : 'application/json;charset=UTF-8',
		        	    	data : JSON.stringify(row),               //转换为json字符串 如果不转,java代码中是获取不到值
		        	    	success : function(data)
		                        {    //成功执行的方法  
		                            
	                            	//成功则关闭form窗口
									dialog.close();
									var text;
									switch (data.status){
					                    case "some":
					                        text = "文件上传失败";
					                    	break;

					                    case "false":
					                        text = "上传失败";
					                        break;

					                    case "unconnect":
					                        text = "拒绝访问，连接失败";
					                        break;

					                    case "disconnect":
					                        text = "关闭连接出现异常";
					                        break;

					                    case "unNet":
					                        text = "无法访问网络";
					                        break;

					                    case "account":
					                        text = "用户名密码不正确";
					                        break;

					                    case "IO":
					                        text = "文件存储异常,请重新发布";
					                        break;

					                    case "ftpNET":
					                        text = "与服务器连接断开,请检查连接是否异常";
					                        break;

					                    case "true":
					                        text = "上传成功";
					                        break;

					                    case "unknow":
					                        text = "发生未知错误";
					                        break;
					                        
					                    default:
					                    	text = data.status;
					                }
									showAlertDialog(text);
	                            	//重新加载
		                           
		                        },
		        	    	error : function(e) {
			        	    		if(e.status =='500'){
			             				showAlertDialog("服务器内部错误,请检查网络!");
			             			}
		        	        	}
		        	    });

		            }
			       }, {
			            label: '取消',
			            cssClass: 'btn-default',
			            action: function(dialog) {
			                dialog.close();
			            }
			       }],
	        closable:false,
	        autodestroy:true
	    });
		
	}else{
		showAlertDialog("您未选中记录!");
		return;
	}
}
/*
 * 审核文档长传
 */
function showAuditUploadDialog(tabIndex,modelId,title){
	var row = $("#dg"+tabIndex).datagrid('getSelected');
	var rows = $("#dg"+tabIndex).datagrid('getSelections');
	if(rows.length>1){
		showAlertDialog('您选择了多条记录，请一次选择一条!');
		return;
	}
	if(!row){
		showAlertDialog("您未选中记录!");
		return;
	}
	var formDom = $('<form id="auditFileForm" class="coverpopup" method="POST" action="" enctype="multipart/form-data" ></form>');// 
	formDom.append($('<span>请上传审核文件<input name="file" type="file"></input></span>'));
	
	var saveButton = {
            label: '保存',
            cssClass: 'btn-primary',
            action: function(dialog) {
            	//表单验证
            	/** 判断input属性中是否存在required属性 */
            	var inputs = $(':input',"#auditFileForm");
            	var validate = true;
        		for ( var i = 0; i < inputs.length; i++) {
        			if (inputs[i].required && ($(inputs[i]).val()==null || $(inputs[i]).val()=='')) {
        				$(inputs[i]).addClass("inputborder");
        				validate = false;
        			}
        		}
            	if(!validate){
            		showAlertDialog("表单验证失败!");
            		return;
            	}
            	var round = "";
            	if(row.REF_CODE_ID != null){
            		round = row.REF_CODE_ID+'-'+row.VERSION_ID;
            	}
            	if(row.STANDARD_ID != null){
            		round = row.STANDARD_ID+'-'+row.VERSION_ID;
            	}
            	var options  = {
                        url:'/DAMS/audit/storefile.do?round='+round,
                        type:'POST',
                        dataType : "json",
                        success:function(data)
                        {    //成功执行的方法  
                             if(data=='1'){
	                           	  //成功则关闭form窗口
	   							 dialog.close();
	   							 showAlertDialog("上传成功!");
                             }else{
                           	  	showAlertDialog("上传失败!");
                             }
                        },
   					 error:function(data){
   						 if(data.status =='500'){
   	             				showAlertDialog("服务器内部错误,请检查网络!");
   	             			}
   					 }
                   };
               	$("#auditFileForm").ajaxSubmit(options);
            }
       };
	
	var buttonArray = [];
	buttonArray.push(saveButton);
	buttonArray.push({
		label: '取消',
		cssClass: 'btn-default',
		action: function(dialog) {
			dialog.close();
		}
	});
	
	BootstrapDialog.show({
		title: title,
        message: function(dialog) {
            return formDom;
        },
		buttons:buttonArray,
	    data: {
        },
        closable:false,
        autodestroy:true
    });
}

/*
 * 审核文档下载
 */
function showAuditDownloadDialog(tabIndex,modelId,titleStr){
	var paramRow={};
	var filePath;
	var fileName;
	var row = $("#dg"+tabIndex).datagrid('getSelected');
	var rows = $("#dg"+tabIndex).datagrid('getSelections');
	if(rows.length>1){
		showAlertDialog('您选择了多条记录，请一次选择一条!');
		return;
	}
	if(row){
        var round = "";
     	if(row.REF_CODE_ID != null){
     		round = row.REF_CODE_ID+'-'+row.VERSION_ID;
     	}
     	if(row.STANDARD_ID != null){
     		round = row.STANDARD_ID+'-'+row.VERSION_ID;
     	}
 		
 		BootstrapDialog.show({
 			title: titleStr,
 			message: "确认下载吗",
 			buttons: [{
 		            label: '确认',
 		            cssClass: 'btn-primary',
 		            action: function(dialog) {
 		            	//window.location.href='/DAMS/audit/downloadfile.do?round='+round+'&fileType=txt';
 		            	$.ajax({
 		                   url : '/DAMS/audit/downloadfile.do?round='+round+'&fileType=txt',
 		                   type : "GET",
 		                   dataType : "json",
 		                   success : function(data){
 		                	   if(data!=null && data!=''){
 		                		   window.location.href='/DAMS/audit/downloadfile.do?round='+round+'&fileType=txt';
 		                	   }else{
 		                		   showAlertDialog("未上传相关审核附件!");
 		                	   }
 		                   },
 		                   error : function(e){
 		                	  console.log(e);
 		                	  //showAlertDialog("未上传相关审核附件!");
 		                	  if(e.responseText!=null && e.responseText!=''){
		                		   window.location.href='/DAMS/audit/downloadfile.do?round='+round+'&fileType=txt';
		                	   }else{
		                		   showAlertDialog("未上传相关审核附件!");
		                	   }
 		                   }
 		              	});
 		            	dialog.close();
 		            	return false;

 		            }
 			       }, {
 			            label: '取消',
 			            cssClass: 'btn-default',
 			            action: function(dialog) {
 			                dialog.close();
 			            }
 			       }],
 	        closable:false,
 	        autodestroy:true
 	    });
		
	}else{
		showAlertDialog("您未选中记录!");
		return;
	}
	
}

/*
 * 弹出dialog
 */
function showAlertDialog(msg){
	BootstrapDialog.show({
		title: '提示',
		message:msg,
        closable:true
    });
	
}

/*
 * button点击事件
 */
function buttonClick(button){
	var tabIndex = $(button).attr("tabIndex");
	var buttonId = $(button).attr("button_id");
	var actionModelId = $(button).attr("action_model_id");
	var actionViewId = $(button).attr("action_view_id");
	var displayType = $(button).attr("display_type");
	
	var modelId = $("#hiddenBizModelId"+tabIndex).val();
	//3:删除 7:以删除方式发起修订 8:撤销 9:提交
	if(displayType=='0'){
		showDialog(buttonId,displayType,actionModelId,actionViewId,tabIndex);
	}else if(displayType=="3"){
		showConformDialog(buttonId,displayType,tabIndex,'删除','确认删除这条记录吗？');
	}else if(displayType=="4"){
		showConformDialog(buttonId,displayType,tabIndex,'维护','确认操作这条记录吗？');
	}else if(displayType=='7'){
		showConformDialog(buttonId,displayType,tabIndex,'修订','确认以"删除"方式修订这条记录吗？');
	}else if(displayType=='8'){
		showConformDialog(buttonId,displayType,tabIndex,'撤销','确认撤销对这条记录的修订吗？');
	}else if(displayType=='9'){
		showConformDialog(buttonId,displayType,tabIndex,'提交','确认提交对这条记录进行的修订吗？');
	}else if(displayType=='10'){
		showConformDialog(buttonId,displayType,tabIndex,'审核','批准对这条记录进行的修订吗？');
	}else if(displayType=='11'){
		showConformDialog(buttonId,displayType,tabIndex,'审核','驳回对这条记录进行的修订吗？');
	}else if(displayType=='12'){
		showConformDialog(buttonId,displayType,tabIndex,'小版本发布','确认进行支线版本发布吗？');
	}else if(displayType=='13'){
		showConformDialog(buttonId,displayType,tabIndex,'大版本发布','确认进行主线版本发布吗？');
	}else if(displayType=='16'){//下载
		showDownloadDialog(buttonId,tabIndex,'下载','确认下载吗？');
	}else if(displayType=='17'){//开始执行
		showOutInterfaceDialog('/DAMS/socket/executeDQC.do',tabIndex,'开始执行','确认开始执行吗？');
	}else if(displayType=='20'){//发布规则
		showOutPublishDialog('/DAMS/net/DQCAndMDCftp.do',tabIndex,'发布','确认对这条记录进行发布吗？');
	}else if(displayType=='21'){//按钮跳转
		buttonDrill(buttonId,tabIndex,modelId,actionModelId,actionViewId);
	}else if(displayType=='22'){//审核文档下载
		showAuditDownloadDialog(tabIndex,actionModelId,'审核文档下载');
	}else if(displayType=='23'){//审核文档上传
		showAuditUploadDialog(tabIndex,actionModelId,'审核文档上传');
	}else if(displayType=='27'){//按钮跳转外部页面或自定义页面
		buttonDrillUserDefinedPage(buttonId,tabIndex);
	}else if(displayType=='28'){//普通发布
		showConformDialog(buttonId,displayType,tabIndex,'发布','确认进行发布吗？');
	}else if(displayType=='29'){//计算评分卡权重
		calculateWeight(buttonId,displayType,tabIndex,'检查权重');
	}else if(displayType=='30'){//无传参按钮跳转
		buttonDrillNoParam(buttonId,tabIndex,modelId,actionModelId,actionViewId);
	}else if(displayType=='31'){//计算数据质量得分
		calculateScore(buttonId,displayType,tabIndex,'计算得分');
	}else if(displayType=='32'){//附件上传
		showUploadDialog(tabIndex,actionModelId,'附件上传');
	}else{
		showDialog(buttonId,displayType,actionModelId,actionViewId,tabIndex);
	}
}

//检查评分卡权重
function calculateWeight(buttonId,displayType,tabIndex,titleStr){
	var paramRow={};
	var filePath;
	var fileName;
	var row = $("#dg"+tabIndex).datagrid('getSelected');
	var rows = $("#dg"+tabIndex).datagrid('getSelections');
	if(rows.length>1){
		showAlertDialog('您选择了多条记录，请一次选择一条!');
		return;
	}
	if(row){
		$.ajax({
	    	url : '/DAMS/CDA/calWeight',
	    	type : "POST",
	    	dataType : "json",
	    	contentType : 'application/json;charset=UTF-8',
	    	data : JSON.stringify(row),               //转换为json字符串 如果不转,java代码中是获取不到值的
	    	success : function(data)
                {   
					if(data.result=='success'){
						showAlertDialog(data.nodeName+"权重设置正确");
					}else if(data.result=='fail'){
						showAlertDialog(data.nodeName+"权重设置不正确");
					}
                },
	    	error : function(e) {
    	    		if(e.status =='500'){
         				showAlertDialog("服务器内部错误,请检查网络!");
         			}else{
         				showAlertDialog("错误!"+e.responseText);
         			}
	        	}
	    });
	}else{
		showAlertDialog("您未选中记录!");
		return;
	}
}

//计算数据质量得分
function calculateScore(buttonId,displayType,tabIndex,titleStr){
	var paramRow={};
	var filePath;
	var fileName;
	var row = $("#dg"+tabIndex).datagrid('getSelected');
	var rows = $("#dg"+tabIndex).datagrid('getSelections');
	if(rows.length>1){
		showAlertDialog('您选择了多条记录，请一次选择一条!');
		return;
	}
	if(row){
		$.ajax({
	    	url : '/DAMS/CDA/cal',
	    	type : "POST",
	    	dataType : "json",
	    	contentType : 'application/json;charset=UTF-8',
	    	data : JSON.stringify(row),               //转换为json字符串 如果不转,java代码中是获取不到值的
	    	success : function(data)
                {   
					if(data.result=='success'){
						showAlertDialog("作业"+data.jobId+"评分卡得分计算成功");
					}else if(data.result=='fail'){
						showAlertDialog("作业"+data.jobId+"评分卡得分计算失败，请重新计算");
					}
                },
	    	error : function(e) {
    	    		if(e.status =='500'){
         				showAlertDialog("服务器内部错误,请检查网络!");
         			}else{
         				showAlertDialog("错误!"+e.responseText);
         			}
	        	}
	    });
	}else{
		showAlertDialog("您未选中记录!");
		return;
	}
}