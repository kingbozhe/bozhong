<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ path + "/";
	String roleId = request.getParameter("roleId");
	String branchId = request.getParameter("branchId");
	String branchLevel = request.getParameter("branchLevel");
	String userId = request.getParameter("userId");
	request.getSession().setAttribute("roleId", roleId);
	request.getSession().setAttribute("branchId", branchId);
	request.getSession().setAttribute("branchLevel", branchLevel);
	request.getSession().setAttribute("userId", userId);
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<%-- <base href="<%=basePath%>"> --%>
<meta http-equiv="Content-Type" content="text/x-component; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE" />
<meta http-equiv="pragma" content="no-cache" />
<title></title>

<script type="text/javascript" src="assets/js/jquery-1.11.3.min.js"></script>

<script type="text/javascript"	src="assets/js/jquery.easyui.min.js"></script>
<script type="text/javascript"	src="assets/js/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="assets/js/highstock.js"></script>
<script type="text/javascript" src="assets/js/highcharts-more.js"></script>

<!-- 框架CSS  -->
<link rel="stylesheet" type="text/css" href="assets/css/common.css" />
<link rel="stylesheet" type="text/css" href="assets/css/easyui.css" />
<link rel="stylesheet" type="text/css" href="assets/css/icon.css" />

<script type="text/javascript" >

$(function(){
 		
		//设置搜索条件的默认值
		var formatterDate = function(date){
			var day = date.getDate()>9?date.getDate():"0"+date.getDate();
			var month = (date.getMonth()+1)>9?(date.getMonth()+1):"0"+(date.getMonth()+1);
			return date.getFullYear()+'-'+month+'-'+day;
		}
		//$("#dataSysBeginDate").datebox('setValue',formatterDate(new Date()));
		//$("#dataSysBeginDate").datebox('setValue',"2016-07-20");
		
		$.post('<%=request.getContextPath()%>/CDA/getLatestCalDate',"",
	       	function(result){
	       		var rows = result.rows;
	       		maxDate = rows[0];
	       		$('#dataSysBeginDate').datebox('setValue', maxDate);},'json');
		
		//加载评分卡 信息
		loadEstimateCard();
		 $('#dataSysQuery').click(function(){
		 	
		 	var demSEL = $("#mysearch input[name=DEMSELECT]").val();
		 	if(demSEL=="DEM"){
		 	//按照维度
		 		getPolarDataAndGenerateChart();
		 		getCardDemenCheckId();//eDate,cardInfo,org_id,dimension
		 	}else if(demSEL=="SYSID"){
		 	//按照系统
		 		getPolarChartBySys();
		 		getCardSysCheckId();//eDate,cardInfo,org_id,dimension
		 	}
		 	
		});	
	
});


function loadEstimateCard(){
    //alert("${jobId}");
    $.ajax({
    	url : '/DAMS/CDA/CTQuery?jobId=${jobId}&planId=${planId}',
    	type : "GET",
    	dataType : "json",
    	contentType : 'application/json;charset=UTF-8',
    	success : function(result) {
    		var rows = result.rows;
			$('#ESTIMATE_CARD_INFO').combobox({
				data:rows,
				idField:'ID', // value值字段
				textField:'NAME', // 显示的字段
				fitColumns: true,
				striped: true,
				editable:false// 不可编辑，只能选择
			});
			var card_info = $('#ESTIMATE_CARD_INFO').combobox('getData');
			if(card_info.length>0){
				$('#ESTIMATE_CARD_INFO').combobox('select',card_info[0].ID);
			}
			loadOrgInfo();
			},
    	error : function(e) {
        		console.log("error");
        	}
    });
    
}
//加载机构信息
 function loadOrgInfo(){
 	$.ajax({
    	url : '/DAMS/CDA/getOrgInfo',
    	type : "GET",
    	dataType : "json",
    	contentType : 'application/json;charset=UTF-8',
    	success : function(result) {
    		var rows = result.rows;
	       		//所属评分卡
				$('#org_info').combobox({
						data:rows,
						idField:'BRANCH_ID', // value值字段
						textField:'BRANCH_NAME', // 显示的字段
						fitColumns: true,
						striped: true,
						editable:false// 不可编辑，只能选择
				});
				
				$('#DEMSELECT').combobox({
						data:[
							{"DEMID":'DEM' ,"DEMNAME":"五大维度",selected:true},
							{"DEMID":'SYSID' ,"DEMNAME":"按系统"}
						],
						idField:'DEMID', // value值字段
						textField:'DEMNAME', // 显示的字段
						fitColumns: true,
						striped: true,
						editable:false// 不可编辑，只能选择
				});
				
				var org_info = $('#org_info').combobox('getData');
				if(org_info.length>0){
						$('#org_info').combobox('select',org_info[0].BRANCH_ID);
				}
				getPolarDataAndGenerateChart();
				//得分评分卡对应日期的规则得分信息
				getCardDemenCheckId();
		},
    	error : function(e) {
        		console.log("error");
        	}
    });
 
 }
 
 //得到雷达图的数据并调用产生雷达图的方法---系统
function getPolarChartBySys(){

	var eDate = $("#mysearch input[name=dataSysBeginDate]").val();
	var cardInfo = $("#mysearch input[name=ESTIMATE_CARD_INFO]").val();
	var cardName = cardInfo.split("#")[1];
	var org_id = $("#mysearch input[name=org_info]").val();
	$.ajax({
		type : "GET",
		url : "<%=request.getContextPath()%>/CDA/CPQuerySys",
		data : {
			eDate : eDate,
			cardInfo: cardInfo,
			org_id :org_id
		},
		dataType : 'json',
		success :function(json){
			//数据初始化
			if(json==null){
			}else{
				var rows = json.rows;
				var sysScores = [];
				var categories =  [];
				
				for ( var i = 0; i < rows.length; i++) {
					var score = parseFloat(parseFloat(rows[i].SCORE).toFixed(2));
					sysScores[i] = score;
		       		categories[i] = rows[i].APP_ID;
				}
			
			}
		       	
	     	//生成雷达图	
			generatePolarChartBySys(sysScores,categories,cardName);
			$('#detailScore').datagrid('reload',serializeForm($('#mysearch')));
		}//success
	});//ajax method block
	
	
}
//得到雷达图的数据并调用产生雷达图的方法---维度
function getPolarDataAndGenerateChart(){

	var eDate = $("#mysearch input[name=dataSysBeginDate]").val();
	
	var cardInfo = $("#mysearch input[name=ESTIMATE_CARD_INFO]").val();
	var cardId = cardInfo.split("#")[0];
	var cardName = cardInfo.split("#")[1];
	var org_id = $("#mysearch input[name=org_info]").val();
	$.ajax({
    	url : '/DAMS/CDA/CPQueryDimen?org_id='+org_id+'&cardId='+cardId+'&jobId=${jobId}&planId=${planId}',
    	type : "GET",
    	dataType : "json",
    	contentType : 'application/json;charset=UTF-8',
    	success : function(result) {
    			//数据初始化
	    	dimScore = [];//数据长度要和categories保持一致
			categories =  [];
			categories.push('有效性');
			categories.push('唯一性');
			categories.push('一致性');
			categories.push('准确性');
			categories.push('完整性');
			if(result==null){
				
			}else{
				var rows = result.rows;
		    	for ( var i = 0; i < rows.length; i++) {
		       		var score = parseFloat(parseFloat(rows[i].SCORE).toFixed(2));
					if(rows[i].CHECKDIMENSION == '01'){
						dimScore[0]= score;
					}else if(rows[i].CHECKDIMENSION == '02'){
						dimScore[1]= score;
					}else if(rows[i].CHECKDIMENSION =='03'){
						dimScore[2]= score;
					}else if(rows[i].CHECKDIMENSION == '04'){
						dimScore[3]= score;
					}else if(rows[i].CHECKDIMENSION == '05'){
						dimScore[4]= score;
					}else if(rows[i].CHECKDIMENSION == '06'){
						dimScore[5]= score;
					}
				}
			}
		       	
	     	//生成雷达图	
			generatePolarChart(dimScore,categories,cardName);
			$('#detailScore').datagrid('reload',serializeForm($('#mysearch')));
		},
    	error : function(e) {
        		console.log("error");
        	}
    });
	
}
//产生雷达图
function generatePolarChart(dimensionScore,categories,cardName) {
	$('#container5').highcharts({
	    chart: {
	    	borderColor: '#EBBA95',
			borderWidth: 0,
			//width : 290,
			//height : 210,
	        polar: true,
	        type: 'line'
	    },
	    title: {
	        text: cardName+' 维度雷达图',
	        x: 10
	    },
	    pane: {
	    	size: '80%'
	    },
	    xAxis: {
	        categories: categories,
	        tickmarkPlacement: 'off',
	        lineWidth: 0
	    },
	    yAxis: {
	        gridLineInterpolation: 'polygon',
	        lineWidth: 0,
	        min: 0
	    },
	    //鼠标移近的提示
	    tooltip: {
	    	shared: true,
	        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:.2f}</b><br/>'
	    },
	    credits : {
				enabled : false
			},
	    legend: {
	        //align: 'left',
	        verticalAlign: 'bottom',
	        //y: 70,
	        layout: 'vertical',
	        borderWidth: 1 
	    },
	    
	    //图形上添加点击事件
	    plotOptions: {
		  series: {
		   cursor: 'pointer',
		   events: {
			    click: function(e) {
			       var dimensionValue = "";
			       
			    	if("有效性"==e.point.category){
			    		dimensionValue = "01";
			    	}else if("唯一性"==e.point.category){
			    		dimensionValue = "02";
			    	}else if("一致性"==e.point.category){
			    		dimensionValue = "03";
			    	}else if("准确性"==e.point.category){
			    		dimensionValue = "04";
			    	}else if("完整性"==e.point.category){
			    		dimensionValue = "05";
			    	}
			    	
                   document.getElementById("dimension").value = dimensionValue;
                   getCardDemenCheckId();
			    }
		   	}
		  }
		}, 
	    series: [{
	        name: '维度得分',
	        data: dimensionScore,
	        pointPlacement: 'on'
	    }]
	
	});
}

function generatePolarChartBySys(sysScore,categories,cardName) {
	$('#container5').highcharts({
	    chart: {
	    	borderColor: '#EBBA95',
			borderWidth: 2,
			//width : 290,
			//height : 210,
	        polar: true,
	        type: 'line'
	    },
	    title: {
	        text: cardName+' 系统雷达图',
	        x: 10
	    },
	    pane: {
	    	size: '80%'
	    },
	    xAxis: {
	        categories: categories,
	        tickmarkPlacement: 'off',
	        lineWidth: 0
	    },
	    yAxis: {
	        gridLineInterpolation: 'polygon',
	        lineWidth: 0,
	        min: 0
	    },
	    //鼠标移近的提示
	    tooltip: {
	    	shared: true,
	        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:.2f}</b><br/>'
	    },
	    credits : {
				enabled : false
			},
	    legend: {
	        //align: 'left',
	        verticalAlign: 'bottom',
	        //y: 70,
	        layout: 'vertical',
	        borderWidth: 1 
	    },
	    
	    //图形上添加点击事件
	    plotOptions: {
		  series: {
		   cursor: 'pointer',
		   events: {
			    click: function(e) {
                   document.getElementById("dimension").value = e.point.category;
                   getCardSysCheckId();
			    }
		   	}
		  }
		}, 
	    series: [{
	        name: '系统得分',
	        data: sysScore,
	        pointPlacement: 'on'
	    }]
	
	});
}
	//表单字段信息的收集
function serializeForm(form){
	var obj = {};
	$.each(form.serializeArray(),function(index){
		//下面的this是一个表单域的对象
		if(obj[this['name']]){
			obj[this['name']] = obj[this['name']] + ','+this['value'];
		} else {
			obj[this['name']] =this['value'];
		}
	});
	return obj;
}
//系统
function getCardSysCheckId(){
	var eDate = $("#mysearch input[name=dataSysBeginDate]").val();
	var cardInfo = $("#mysearch input[name=ESTIMATE_CARD_INFO]").val();
	var cardId = cardInfo.split("#")[0].trim();
	var org_id = $("#mysearch input[name=org_info]").val(); 
	var sysId = $("#mysearch input[name=dimension]").val();
	
	if(sysId==""){
		sysId = "ODS";
	}
	$("#detailScore").dialog("open").dialog("setTitle",sysId);
        	
	$("#detailScore").datagrid({
		/* idField:'id' ,	
		title:'评分组管理' , *///没有内容，就会少一个div的标题内容
		//width:1300 ,
		fit:true ,
		height:420 ,
		singleSelect:false,
		//queryParams:{idd:'dd',nnn:'ff'},传入更灵活的参数
		url:'/DAMS/CDA/sysScoreTopTen?org_id='+org_id+'&cardId='+cardId ,
		method:'GET',
		fitColumns:true ,
		rownumbers:false,//显示序号，默认是true
		selectOnCheck: true,
		checkOnSelect: true,
		striped: true ,					//隔行变色特性 
		//nowrap: false ,				//折行显示
		loadMsg: '数据正在加载,请耐心的等待...' ,  
        pagination: true,  
        rownumbers: true,
		columns:[[
			{
				field:'RUN_TIME' ,
				title:'日期' ,
				width:90,
				hidden: true
			},{
				field:'BRANCH_NAME' ,
				title:'机构' ,
				width:100,
				hidden: false
			},{
				field:'CHECKDIMENSION' ,//CheckDimension
				title: '规则维度' ,
				width: 100,
				formatter:function(value , record , index){
				if(value == '01'){
					return '<span>有效性</span>';
				} else if( value == '02'){
					return '<span>唯一性</span>';
				} else if( value == '03'){
					return '<span>一致性</span>';
				} else if( value == '04'){
					return '<span>准确性</span>';
				} else if( value == '05'){
					return '<span>完整性</span>';
				} else if( value == '06'){
					return '<span>及时性</span>';
				} else {
					return '<span>有效性</span>';
				}
			},
				hidden: true
			},{
				field:'MAP_ID' ,//map_id
				title:'规则组' ,
				width:40,
				hidden:true
			},{
				field:'RULE_ID' ,//check_id,规则说明是否需要显示出来
				title:'规则ID' ,
				width:60,
				hidden:false
			},{
				field:'RULE_DEFINITION' ,
				title:'规则说明' ,
				width:140,
				hidden:false
			},{
				field:'APP_ID' ,
				title:'schma' ,
				width:50,
				hidden:false
			},{
				field:'TBL_ID' ,
				title:'表名' ,
				width:100,
				hidden:false
			},{
				field:'CHECK_COLUMN_NAME' ,
				title:'字段名' ,
				width:100,
				hidden:false
			},{
				field:'SCORE' ,//score
				title:'规则得分' ,
				width:60 ,
				hidden: false
			}
		]] ,
		
		pagination: true , 
		pageSize: 10 ,
		pageList:[10,15,20,50]
	});
}
//维度
function getCardDemenCheckId(){

	var eDate = $("#mysearch input[name=dataSysBeginDate]").val();
	var cardInfo = $("#mysearch input[name=ESTIMATE_CARD_INFO]").val();
	var cardId = cardInfo.split("#")[0];
	
	var org_id = $("#mysearch input[name=org_info]").val(); 
	var dimension = $("#mysearch input[name=dimension]").val();
	var dimensionCN ;
	if(dimension == '01'){
		dimensionCN = '有效性';
	} else if( dimension == '02'){
		dimensionCN = '唯一性';
	} else if( dimension == '03'){
		dimensionCN = '一致性';
	} else if( dimension == '04'){
		dimensionCN = '准确性';
	} else if( dimension == '05'){
		dimensionCN = '完整性';
	} else if( dimension == '06'){
		dimensionCN = '及时性';
	} else {
		dimensionCN = '有效性';
	}
	//$("#detailScore").dialog("open").dialog("setTitle",dimensionCN);
	$("#detailScore").datagrid({
		title: dimensionCN ,
		//width:1300 ,
		method:'GET',
		fit:true ,
		height:420 ,
		singleSelect:false,
		url:'<%=request.getContextPath()%>/CDA/sysScoreTopTen?cardId='+cardId+'&org_id='+org_id ,
		fitColumns:true ,
		rownumbers: true,//显示序号，默认是true
		selectOnCheck: true,
		checkOnSelect: true,
		striped: true ,					//隔行变色特性 
		//nowrap: false ,				//折行显示
		loadMsg: '数据正在加载,请耐心的等待...' ,
		rowStyler: function(index ,record){
			 
		} ,
		columns:[[
			{
				field:'RUN_TIME' ,//FOLDER_ID 
				title:'日期' ,
				width:90,
				hidden: true
			},{
				field:'CHECKDIMENSION' ,//CheckDimension
				title: '规则维度' ,
				width: 100,
				formatter:function(value , record , index){
				if(value == '01'){
					return '<span>有效性</span>';
				} else if( value == '02'){
					return '<span>唯一性</span>';
				} else if( value == '03'){
					return '<span>一致性</span>';
				} else if( value == '04'){
					return '<span>准确性</span>';
				} else if( value == '05'){
					return '<span>完整性</span>';
				} else if( value == '06'){
					return '<span>及时性</span>';
				} else {
					return '<span>有效性</span>';
				}
			},
				hidden: true
			},{
				field:'BRANCH_NAME' ,//map_id
				title:'机构' ,
				width:120,
				hidden: false
			},{
				field:'MAP_ID' ,//map_id
				title:'规则组' ,
				width:40,
				hidden:true
			},{
				field:'CHECK_ID' ,//check_id,规则说明是否需要显示出来
				title:'规则ID' ,
				width:60,
				hidden: true
			},{
				field:'RULE_DEFINITION' ,
				title:'规则说明' ,
				width:140,
				hidden:false
			},{
				field:'APP_ID' ,
				title:'schma' ,
				width:50,
				hidden:false
			},{
				field:'TBL_ID' ,
				title:'表名' ,
				width:100,
				hidden:false
			},{
				field:'COL_ID' ,
				title:'字段名' ,
				width:100,
				hidden:false
			},{
				field:'SCORE' ,//score
				title:'规则得分' ,
				width:60 ,
				hidden: false
			}
		]] ,
		
		pagination: true , 
		pageSize: 10 ,
		pageList:[10,15,20,50]
	});
}

</script>
</head>

<body>
	<div style="width:100%;margin-right:20px;">
		<form id="mysearch" method="post">
           	 日期：<input id = "dataSysBeginDate" name="dataSysBeginDate"class="easyui-datebox" style="width:100px;" value="">
           	评分卡：<input id = "ESTIMATE_CARD_INFO" name="ESTIMATE_CARD_INFO" class="easyui-combobox" valueField="ID" textField="NAME" >
           	维度选择：<input id = "DEMSELECT" name="DEMSELECT" class="easyui-combobox" valueField="DEMID" textField="DEMNAME" >
			机构：<input id = "org_info" name="org_info" class="easyui-combobox" valueField="BRANCH_ID" textField="BRANCH_NAME" style="width:240px">
				<a id="dataSysQuery" class="easyui-linkbutton" style="margin-left:0px">查询</a>
				<input id = "dimension" name = "dimension"  type = "hidden" value = "">
		</form>
   	</div>
   	<div id = "detailDiv" style="width:54%;height:420px;float:left;border:1px" >
   		<!-- <form id="mysearch1" method="post">
           	 日期：<input id = "dataSysBeginDate1" name="dataSysBeginDate"class="easyui-datebox" style="width:100px;" value="">
           	评分卡：<input id = "ESTIMATE_CARD_INFO1" name="ESTIMATE_CARD_INFO" class="easyui-combobox" valueField="ID" textField="NAME" >
				<a id="dataSysQuery1" class="easyui-linkbutton" style="margin-left:0px">查询</a>
		</form> -->
		<table id="detailScore"></table>
	</div>
   	
	<div id="container5" class="" style="width:45%;float:right"></div>
		
</body>
</html>
