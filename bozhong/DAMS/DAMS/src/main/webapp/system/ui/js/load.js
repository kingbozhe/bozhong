var t1;
function initLoadJsp(url, drillUrl, key, columns) {
	var maxTabIndex = parseInt($("#maxTabIndex").val())+1;
	$("#maxTabIndex").val(maxTabIndex);
	
	//上传并保存文件
	$("#uploadForm").attr("id","uploadForm"+maxTabIndex);
	$("#importData").attr("id","importData"+maxTabIndex);
	$("#outDictionary").attr("id","outDictionary"+maxTabIndex);
	$("#download").attr("id","download"+maxTabIndex);
	$("#storeFileName").attr("id","storeFileName"+maxTabIndex);
	$("#allApp").attr("id","allApp"+maxTabIndex);
	$("#type").attr("id","type"+maxTabIndex);
	$("#findFile").attr("id","findFile"+maxTabIndex);
	$("#TemplatefileForLoad").attr("id","TemplatefileForLoad"+maxTabIndex);
	$("#uploadTrigger").attr("id","uploadTrigger"+maxTabIndex);
	$("#templateFileSubmit").attr("id","templateFileSubmit"+maxTabIndex);
	$("#findFile2").attr("id","findFile2"+maxTabIndex);
	$("#TemplateValuefile").attr("id","TemplateValuefile"+maxTabIndex);
	$("#uploadTrigger2").attr("id","uploadTrigger2"+maxTabIndex);
	$("#TemplateValuefileSubmit").attr("id","TemplateValuefileSubmit"+maxTabIndex);
	$("#uploadForm2").attr("id","uploadForm2"+maxTabIndex);
	$("#storeFileName2").attr("id","storeFileName2"+maxTabIndex);
	$("#frameFile").attr("id","frameFile"+maxTabIndex);
	$("#importData2").attr("id","importData2"+maxTabIndex);
	$("#fileName").attr("id","fileName"+maxTabIndex);
	$("#fileName2").attr("id","fileName2"+maxTabIndex);
	$("#zresult").attr("id","zresult"+maxTabIndex);
	$("#zresult2").attr("id","zresult2"+maxTabIndex);
	
	$("#uploadForm"+maxTabIndex).submit(function(){   
		var round = randomWord(10);	
		if($('#TemplatefileForLoad'+maxTabIndex).val() == null || $('#TemplatefileForLoad'+maxTabIndex).val() == ""){
			$("#zresult"+maxTabIndex).empty().html('<i class="fa fa-exclamation-triangle"></i> 请选择文件');
			return false;
		}
		var options = {  
	        target: "#frameFile"+maxTabIndex,         //把服务器返回的内容放入id为output1的元素中  
	        success: function(data){
	        	if(data.status=="ok"){
	        		$("#storeFileName"+maxTabIndex).val(data.result);
	        		$("#zresult"+maxTabIndex).empty().html('<i class="fa fa-check-circle"></i> 已成功上传');
	        	} else{
	        		$("#zresult"+maxTabIndex).empty().html('<i class="fa fa-close"></i> 上传失败，请重新上传');
	        		alert(data.result);
	        	}
	        },         
	        url: "/DAMS/file/storefile.do?round="+round,           //默认是form的action，如果声明，则会覆盖  
	        type: "post",     //默认是form的method，如果声明，则会覆盖  
	        dataType: "json"   //接受服务端返回的类型  
	    };
	    $(this).ajaxSubmit(options);   
	    return false;   //防止表单自动提交  
	}); 
	
	$("#importData"+maxTabIndex).click(function(){
		var fileName = $("#storeFileName"+maxTabIndex).val();
		var importType = $(this).siblings(".iselect").find("button i").attr("value");
		if(fileName == null || fileName == "undefined" || fileName == ""){
			$("#zresult"+maxTabIndex).empty().html('<i class="fa fa-exclamation-triangle"></i> 请选择文件');
			return false;
		}
		if(importType == "undefined" || importType == null){
			$("#zresult"+maxTabIndex).empty().html('<i class="fa fa-exclamation-triangle"></i> 请选择导入方式');
			return false;
		}
		var data = {
				"fileName" : fileName,
				"importType" : importType
		};
		var appId = $("#allApp"+maxTabIndex).attr("value");
		if(appId != null && appId != "undefined" && appId != ""){
			data["appId"] = appId;
			var type = $("#type"+maxTabIndex).attr("value");
			if(type == null || type == "undefined" || type == ""){
				$("#zresult"+maxTabIndex).empty().html('<i class="fa fa-exclamation-triangle"></i> 请选择类型');
				return false;
			} else{
				data["type"] = type;
			}
		}
		$("#zresult"+maxTabIndex).empty().html('<i class="fa fa-check-circle"></i> 正在导入...');
		$.ajax({
	        type : "post",
	        data : data,
	        url : "/DAMS/td/loadtemplatefile/main",
	        dataType: "json",
	        success : function(data){
	            errorLog($("#zresult"+maxTabIndex),data);
	        },
	        error : function(e){
	        	$("#zresult"+maxTabIndex).empty().html('<i class="fa fa-close"></i> 导入失败');
	        }
	    });
	});
	
	$("#outDictionary"+maxTabIndex).click(function(){
		var key = $(this).siblings(".iselect").find("button i").attr("value");
		if(key == null || key == "" || key == "undefined"){
			alert("请选择导出内容！");
			return false;
		}
		$("#download"+maxTabIndex).trigger("click");
	});
	
	$("#findFile"+maxTabIndex).click(function(){
		$("#TemplatefileForLoad"+maxTabIndex).trigger("click");
	});
	
	$('#TemplatefileForLoad'+maxTabIndex).change(function(){
		var str=$(this).val().split('\\');
		var fileName=str[str.length-1];
		$("#fileName"+maxTabIndex).val(fileName);
		$("#zresult"+maxTabIndex).empty();
	});

	$("#uploadTrigger"+maxTabIndex).click(function(){
		$("#templateFileSubmit"+maxTabIndex).trigger("click");
	});
		
	$("#findFile2"+maxTabIndex).click(function(){
		$("#TemplateValuefile"+maxTabIndex).trigger("click");
	});

	$('#TemplateValuefile'+maxTabIndex).change(function(){
		var str=$(this).val().split('\\');
		var fileName=str[str.length-1];
		$("#fileName2"+maxTabIndex).val(fileName);
		$("#zresult2"+maxTabIndex).empty();
	});

	$("#uploadTrigger2"+maxTabIndex).click(function(){
		$("#TemplateValuefileSubmit"+maxTabIndex).trigger("click");
	});

	//保存文件
	$("#uploadForm2"+maxTabIndex).submit(function(){   
		var round = randomWord(10);
		if($('#TemplateValuefile'+maxTabIndex).val() == null || $('#TemplateValuefile'+maxTabIndex).val() == ""){
			$("#zresult2"+maxTabIndex).empty().html('<i class="fa fa-exclamation-triangle"></i> 请选择文件');
			return false;
		}
		var options = {  
	        target: "#frameFile"+maxTabIndex,         //把服务器返回的内容放入id为output1的元素中  
	        success: function(data){
	        	if(data.status=="ok"){
	        		$("#storeFileName2"+maxTabIndex).val(data.result);
	        		$("#zresult2"+maxTabIndex).empty().html('<i class="fa fa-check-circle"></i> 已成功上传');
	        	} else{
	        		$("#zresult2"+maxTabIndex).empty().html('<i class="fa fa-close"></i> 上传失败，请重新上传');
	        		alert(data.result);
	        	}
	        },         
	        url: "/DAMS/file/storefile.do?round="+round,           //默认是form的action，如果声明，则会覆盖  
	        type: "post",     //默认是form的method，如果声明，则会覆盖  
	        dataType: "json"   //接受服务端返回的类型  
	    };
	    $(this).ajaxSubmit(options);   
	    return false;   //防止表单自动提交  
	}); 
	
	//导入数据库
	$("#importData2"+maxTabIndex).click(function(){
		var fileName = $("#storeFileName2"+maxTabIndex).val();
		var importType = $(this).siblings(".iselect").find("button i").attr("value");
		if(fileName == null || fileName == "undefined" || fileName == ""){
			$("#zresult2"+maxTabIndex).empty().html('<i class="fa fa-exclamation-triangle"></i> 请选择文件');
			return false;
		}
		if(importType == "undefined" || importType == null){
			$("#zresult2"+maxTabIndex).empty().html('<i class="fa fa-exclamation-triangle"></i> 请选择导入方式');
			return false;
		}
		var data = {"fileName":fileName,"fileType":"excel","firstCol":importType};
		$("#zresult2"+maxTabIndex).empty().html('<i class="fa fa-check-circle"></i> 正在导入...');
	    $.ajax({
	        type : "post",
	        data : data,
	        url : "/DAMS/td/loadvalue.do",
	        dataType: "json",
	        success : function(data){
	            if(data.status == "ok"){
        			$("#zresult2"+maxTabIndex).empty().html('<i class="fa fa-check-circle"></i> 导入成功');
	        	} else{
	        		$("#zresult2"+maxTabIndex).empty().html('<i class="fa fa-close"></i> '+data.status);
	        	}
	        },
	        error : function(e){
	            console.log("失败");
	        }
	    });
	});

	$(".import .dropdown-menu li").click(function(){
		$(this).parents(".iselect").find("button i").text($(this).find("a").text());
		$(this).parents(".iselect").find("button i").attr("value",$(this).data("value"));
	});
}

//生成随机函数
function randomWord(num){
    var str = "",
        range = num,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
 
    for(var i=0; i<range; i++){
        pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}


$("#do").click(function(){
   	if($("#tableName").val()==""){
   		return alert("请输入表名");
   	}
   	var tablename = $("#tableName").val();
   	var data = {"tableName": tablename};
    $.ajax({
        url : "/DAMS/export/dbvalue.do",
        type : "post",
        data : data,
        dataType : "json",
        success : function(data){
            alert(data.result);
        },
        error : function(e){
        	alert(e);
        }
   	});
 });






function getFileValue(){
    var data = "",json;
    
    data = $("#storeFileName2").val().trim();
    if(data == ""){
        json = false;
    }
    else{
        json = {"fileName":data,"fileType":"excel","firstCol":"false"};
    }
    return json;
}

function errorLog(result,data){
	if(data.status == "ok"){
		if(data.errorList.length != 0){
			result.empty().html('<i class="fa fa-check-circle"></i> 导入成功,但存在 '+data.errorList+" 没有找到");
		} else{
			result.empty().html('<i class="fa fa-check-circle"></i> 导入成功');
		}
	} else{
		result.empty().html('<i class="fa fa-close"></i> '+data.status);
	}
}

