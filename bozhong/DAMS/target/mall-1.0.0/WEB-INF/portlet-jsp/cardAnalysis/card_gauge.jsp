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

<!-- 需要这个插件才能显示仪表图 -->

	<script type="text/javascript" src="assets/js/jquery-1.11.3.min.js"></script>
	<script type="text/javascript" src="assets/js/highstock.js"></script>
	<script type="text/javascript" src="assets/js/highcharts-more.js"></script>
	
	
	<script type="text/javascript"	src="assets/js/jquery.easyui.min.js"></script>
	<script type="text/javascript"	src="assets/js/easyui-lang-zh_CN.js"></script>

<!-- 框架CSS  -->
	<link rel="stylesheet" type="text/css" href="assets/css/common.css" />
	<link rel="stylesheet" type="text/css" href="assets/css/easyui.css" />
	<link rel="stylesheet" type="text/css" href="assets/css/icon.css" />
<!-- 	<link rel="stylesheet" type="text/css"	href="js/jquery-easyui-1.2.6/themes/default/easyui.css" />
	<link rel="stylesheet" type="text/css"	href="js/jquery-easyui-1.2.6/themes/icon.css" /> -->
	
	
<script type="text/javascript" >

        
$(function () {
	 
	 var formatterDate = function(date){
			var day = date.getDate()>9?date.getDate():"0"+date.getDate();
			var month = (date.getMonth()+1)>9?(date.getMonth()+1):"0"+(date.getMonth()+1);
			return date.getFullYear()+'-'+month+'-'+day;
		}
	 $("#dataSysBeginDate").datebox('setValue',formatterDate(new Date()));
	 //这里的日期应该是有评分卡数据的最新日期
	 //$("#dataSysBeginDate").datebox('setValue','2016-07-20');
	 //加载 评分卡信息并生成仪表图
	 loadEstimateCard();
	 //点击查询选中的评分卡的仪表盘,其他评分卡需要隐藏
	 $('#dataSysQuery').click(function(){
	 	var length = $("#cardSel").find("option:selected").size();
	 	for(var i = 7;i>length;i--){
	 		document.getElementById("container"+i).style.display = "none";	
	 	} 
		getGaugeDataAndGernerateChart();
	});
	
	$("#cardText").click(function(){
		var showy = event.clientY+document.body.scrollTop+document.documentElement.scrollTop;
		$("#cardSelDiv").parent().css({"top":showy+"px"});
		$("#cardSelDiv").dialog("open").dialog("setTitle","选择评分卡");
		//以下是获得显示的div层的阴影层。这个阴影层是克隆可视的div，所以必须现有可视div
		//即先有上面的语句，才有下面的语句，顺序不能颠倒
		$("#cardSelDiv").parent().next("div").css({"top":showy+"px"});
	});
	
});//jquery block
//根据评分卡信息生成仪表图
function getGaugeDataAndGernerateChart(){
	var eDate = $("#mysearch input[name=dataSysBeginDate]").val();
	var cardInfo = $("#mysearch input[name=ESTIMATE_CARD_INFO]").val(); 
	var cardVal = $("#cardVal").val();
	if(cardInfo==""||eDate==""){ 
		alert("请选择日期和评分卡信息"); 
	}else{
		$.ajax({
		type : "post",
		url : "<%=request.getContextPath()%>/CDA/gaugeScore",
			data : {
				eDate : eDate,
				cardInfo: cardInfo,
				selectedCards:cardVal
			},
			dataType : 'json',
			success :function(json){
			if(json == null){
		       	alert("没有数据");
		     }else{
		       	var rows = json.rows;
		       	//生成仪表盘图
		       	for(var i = 1;i<=rows.length;i++){
		       		var score = parseFloat(parseFloat(rows[i-1].SCORE).toFixed(2));
		       		var card_name = rows[i-1].GROUP_NAME;
		       		var card_Id = rows[i-1].GROUP_ID+'';
		       		document.getElementById("container"+i).style.display = "block";	
		       		myGaugeChart1("container"+i, 0,100,20,card_name,"",score,card_Id,eDate);
		       	}
						
			}
		}
		});
			
	} 
}
//得到下级机构的得分并生成表格
function getCardChildOrgCheckId(cardId,eDate){
	$("#orgScoreDiv").dialog("open").dialog("setTitle","下级机构明细");
	//下级机构得分列表
	$('#orgScore').datagrid({
			height:420 ,
			singleSelect:false,
			url:'<%=request.getContextPath()%>/CDA/gaugeOrgScore&cardId='+cardId+'&eDate='+eDate ,
			fitColumns:true ,
			rownumbers: true,//显示序号，默认是true
			selectOnCheck: true,
			checkOnSelect: true,
			striped: true ,					//隔行变色特性 
			loadMsg: '数据正在加载,请耐心的等待...' ,
			rowStyler: function(index ,record){
				 
			} ,
			/* frozenColumns:[[//冻结列特性 ,不要与fitColumns 特性一起使用 
				{
					field:'ck' ,
					width:30 ,
					checkbox: false
				}
			]], */
			columns:[[
				{
					field:'RUNDATE' ,//FOLDER_ID 
					title:'日期' ,
					width:40,
					hidden: false
				},{
					field:'ORG_NAME' ,//CheckDimension
					title:'机构' ,
					width:100,
					hidden:false
				},{
					field:'SCORE' ,//score
					title:'得分' ,
					width:50 ,
					hidden: false
				}
			]] ,
			
			pagination: true , 
			pageSize: 10 ,
			pageList:[10,15,20,50]
	
	});
	
}

function loadEstimateCard(){
	var selectObj = $("#cardSel");
    var length = $("#cardSel option").size();
    if(length<1){
		$.post('<%=request.getContextPath()%>/CDA/CTQuery?jobId=${jobId}&planId=${planId}',"",
	       	function(result){
	       		var rows = result.rows;
	       		var length = rows.length;
	       		var forNum = 8;
	       		if(length<=forNum){
	       			//页面初始化时最多显示8个评分卡
					forNum = length;
	       		}
	       		for(var i = 0;i<forNum;i++){
					var  temp = rows[i];
			        selectObj.append("<option selected value='"+temp.ID+"'>"+temp.NAME+"</option>");
				}
				selectCard();
				//生成仪表图，
			   getGaugeDataAndGernerateChart();
				
	         },'json');
		}
}
/**
 * 
 * @param containerId 容器id
 * @param min  最小值
 * @param max  最大值
 * @param step  步长
 * @param text  标题
 * @param name  系列名
 * @param data  数据      不能是字符串
 */
 function myGaugeChart1(containerId, min, max, step, text, name, data,cardId,eDate) {
	var a = new Array();
	a.push(data);
	//Chart不是一个静态方法，所以new 关键字一定不能省去
	new Highcharts.Chart({
			chart : {
				renderTo : containerId,
				type : "gauge",
				plotBorderWidth : 1,
				plotBackgroundColor : "#000000",
				plotBackgroundImage : null,
				width : 290,
				height : 210,
				events:{
						click:function(e){
							<%if("1".equals(branchLevel)){%>
								getCardChildOrgCheckId(cardId,eDate);
							<%}else{ }%>
						}
					}
			},
			exporting : {
				// 是否允许导出
				enabled : false
			},
			credits : {
				enabled : false
			},
			title : {
				text : name
			},
			pane : [ {
				startAngle : -90,
				endAngle : 90,
				background : null,
				// 极坐标图或角度测量仪的中心点，像数组[x,y]一样定位。位置可以是以像素为单位的整数或者是绘图区域的百分比
				center : [ '50%', '90%' ],
				size : 200
			} ],
			yAxis : {
				min : min,
				max : max,
				// 步长
				tickInterval : step,
				minorTickPosition : 'outside',
				tickPosition : 'outside',
				labels : {
					// 刻度值旋转角度
					rotation : 'auto',
					distance : 20,
					style: {
						color: '#FFFFFF',
						fontWeight: 'bold'
					}
				},
				plotBands : [ {
					// 预警红色区域长度
					from: 80,
					to: 100,
					color: '#C02316',
					// 红色区域查出刻度线
					innerRadius : '100%',
					outerRadius : '115%'
				} ],
				// 表盘,为0时为半圆，其余都为圆
				pane : 0,
				title : {
					style: {color:'#FFFFFF',fontSize: '12px'},
					text : text,
					y : -5
				}
			},
			plotOptions : {
				gauge : {
					dataLabels : {
						enabled : false
					},
					dial : {
						 backgroundColor: '#FFD700',
						// 半径：指针长度
						radius : '100%'
					}
				}
			},
			series : [ {
				data : a,
				name : name,
				yAxis : 0
			} ]

		});
}
 function selectCard(){
		$("#cardSelDiv").dialog("close");
		//var selectText = $("#cardSel").find("option:selected").text();
		var optionObj = $("#cardSel").find("option:selected");
		var cardJoinText = "";
		//通过$将DOM对象转换成JQuery对象
		for(var i=0;i<optionObj.length;i++){
			cardJoinText += $(optionObj[i]).text()+",";
		}
		$("#cardText").val(cardJoinText);
		var selectVal = $("#cardSel").val();
		$("#cardVal").val(selectVal);
}
	

</script>
</head>

<body>
	<div>
		<div id="container8" class="" >
			<form id="mysearch" method="post">
				日期：<input id = "dataSysBeginDate" name="dataSysBeginDate"class="easyui-datebox" style="width:100px;" value="">
		                 <!-- 评分卡：<input id="ESTIMATE_CARD_INFO" name="ESTIMATE_CARD_INFO" class="easyui-combobox" valueField="ID" multiple = "true" textField="NAME" >-->
		                   评分卡：<!-- <select id="ESTIMATE_CARD_INFO" name="ESTIMATE_CARD_INFO" class="" style="width:100px;height:21px" multiple="multiple" ></select> -->
		                   <input type="text" id="cardText" style="width:200px" value="">
		                    <input type="hidden" id="cardVal" style="" value=""> 
				<a id="dataSysQuery" class="easyui-linkbutton" style="margin-left:0px">&nbsp &nbsp查询</a>
			</form>
		</div>
		
		<div id="container0" class="" style="width:25%;float:left"></div>
		<div id="container1" class="" style="width:25%;float:left"></div>
		<div id="container2" class="" style="width:25%;float:left"></div>
		<div id="container3" class="" style="width:25%;float:left"></div>
		<div id="container4" class="" style="width:25%;float:left"></div>
		<div id="container5" class="" style="width:25%;float:left"></div>
		<div id="container6" class="" style="width:25%;float:left"></div>
		<div id="container7" class="" style="width:25%;float:left"></div>
	
		<div id="orgScoreDiv" class="easyui-dialog" closed="true"
	    	style="width:700px;height:450px;" buttons="#orgScore_buttons">
	    	<div class="ftitle"><!-- title信息，根据增加和修改按钮动态变化 --></div>
			<table id="orgScore"></table> 
		</div>
		<!-- <div id="orgScore_buttons" style="text-align:center">
		        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-undo" onclick="javascript:$('#cardSelDiv').dialog('close')" style="">取 消</a>
		 </div> -->
		<div id="cardSelDiv" class="easyui-dialog" style="width:400px;height:400px;padding:5px 20px"
		            closed="true" buttons="#card_buttons">
		        <div class="ftitle"></div>
	            <div class="fitem">
	                 <select id="cardSel" name="cardSel" class="" style="width:250px;height:300px" multiple="multiple" >
					</select><br>
					说明：按住Ctrl进行多选
	    		</div>
		 </div>
		 <div id="card_buttons" style="text-align:center;height:40px">
		        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok" onclick="selectCard()" style="">确 定</a>
		        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-undo" onclick="javascript:$('#cardSelDiv').dialog('close')" style="">取 消</a>
		 </div>
		
	</div>
	
	
</body>
</html>
