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
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">    
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
	
<title></title>

	<script type="text/javascript" src="assets/js/jquery-1.11.3.min.js"></script>
	<script type="text/javascript" src="assets/js/highstock.js"></script>
	<script type="text/javascript"	src="assets/js/jquery.easyui.min.js"></script>
	<script type="text/javascript"	src="assets/js/easyui-lang-zh_CN.js"></script>

<!-- 框架CSS  -->
	<link rel="stylesheet" type="text/css" href="assets/css/common.css" />
	<link rel="stylesheet" type="text/css" href="assets/css/easyui.css" />
	<link rel="stylesheet" type="text/css" href="assets/css/icon.css" />
<!-- 	<link rel="stylesheet" type="text/css"	href="js/jquery-easyui-1.2.6/themes/default/easyui.css" />
	<link rel="stylesheet" type="text/css"	href="js/jquery-easyui-1.2.6/themes/icon.css" /> -->

<script type="text/javascript">

 //折现多系列图
 $(function () {
 	
 	loadEstimateCard();
	$('#cardTend').click(function(){
         getCardTendChart();
	});
 	
});
function formatterDate(date){
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
	+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
}
function loadEstimateCard(){
	
	//alert("${jobId}");
	
	$.ajax({
    	url : '/DAMS/CDA/CTQuery?jobId=${jobId}&planId=${planId}',
    	type : "GET",
    	dataType : "json",
    	contentType : 'application/json;charset=UTF-8',
    	success : function(result) {
    			
    			var rows = result.rows;
		      	//所属评分卡
				$("#beginDateCard").datebox('setValue',"2017-01-01");
				$("#endDateCard").datebox('setValue', formatterDate(new Date()));
				
				$('#ESTIMATE_CARD_INFOCard').combobox({
						data:rows,
						idField:'ID', // value值字段
						textField:'NAME', // 显示的字段
						fitColumns: true,
						striped: true,
						editable:false// 不可编辑，只能选择
				});
				var card_info = $('#ESTIMATE_CARD_INFOCard').combobox('getData');
				
				if(card_info.length>0){
					
					$('#ESTIMATE_CARD_INFOCard').combobox('select',card_info[0].ID);
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
				$('#org_id').combobox({
						data:rows,
						idField:'BRANCH_ID', // value值字段
						textField:'BRANCH_NAME', // 显示的字段
						fitColumns: true,
						striped: true,
						editable:false// 不可编辑，只能选择
				});
					
				var org_info = $('#org_id').combobox('getData');
				if(org_info.length>0){
					$('#org_id').combobox('select',org_info[0].BRANCH_ID);
				}
				getCardTendChart();
				//初始化的时候默认显示
				var selectCard = $("input[name='ESTIMATE_CARD_INFOCard']").val();
				$.post('<%=request.getContextPath()%>/CDA/getLatestCalDate',"",
			       	function(result){
			       		var rows = result.rows;
			       		maxDate = rows[0];
			       		//var maxDateReplace = maxDate.repalce("-","");
			       		getcardGroupDetail(maxDate,selectCard);
			       	},'json');
		},
    	error : function(e) {
        		console.log("error");
        	}
    });
 	 
 }
 
 //生成折线图      
function genLineCharts(containerId, catagories, data,title,subtitle,unit,exportingFlag){
			var option = {
		   			chart:{
		   				renderTo: containerId,
		   				borderColor: '#EBBA95',
						borderWidth: 0,
		   				type:'line'//图标类型  line, spline, area, areaspline, column, bar, pie ,scatter
		   			},
		   			title:{
		   				useHTML:true,//要使得html标签有效时，必须设置该属性
		   				text:title
		   				/*style:{
					        fontWeight:"bold"
					    }*/
		   			},
		   			
			   	     plotOptions: {            
			             series: {
			             	cursor: 'pointer',
			             	events: {
							    click: function(e) {
				                   var date = e.point.category;
				                   //var cardInfo = data[0].name;
				                    var cardInfo= $("#cardSearch input[name=ESTIMATE_CARD_INFOCard]").val(); 
									 document.getElementById("cardGroupDiv").style.display = "block";
									getcardGroupDetail(date,cardInfo);
							    }
						   	},
			                 marker: { 
			                     radius:1,
			                     states: {
			                         //鼠标移动至数据点所显示的样式
			                         hover: {
			                             fillColor: 'red',//数据点颜色值
			                             radius: 10, //点半径大小
			                             enabled:false
			                         }
			                     }
			                 }
			             }
			         },
		   			//配置副标题
		            subtitle:{
			            text:subtitle
			            /*y:40 //在y轴方向的距离间隔*/            
			        },
		            credits:{
			            enabled:false
		            },
		   			xAxis:{
		   				categories:catagories,
		   				labels:{
		                    // 标签位置
		                    align: 'center',
		                    style : {
		    					color : 'black',
		    					fontSize : 10
		    				},
		    				y : 15
		                }
		   			},
		   			yAxis:{
		   				min : 0,
		   				title:{
		   					text:'' //不设置的话默认显示values
		   				},
		   				labels:{
		   					formatter:function(){
		   						if( typeof unit == 'undefined'){
		   							unit = '';
		   						}
		   						return this.value+''+unit;//y轴刻度的修饰
		   					}
		   				}
		   			},
		   			//配置数据点提示框
		            tooltip:{
			            crosshairs:true,
			            shared:false
		            },
		   			series: data
		   		};
		   		
		   		var chartObject1 = new Highcharts.Chart(option);
		}
//生成规则组信息详情表格
function getcardGroupDetail(date,cardInfo){
 	var orgId = $("#cardSearch input[name=org_id]").val();
 	//var cardName = cardInfo;
 	var cardId = cardInfo.split("#")[0];
 	//$("#cardGroupDetail").dialog("setTitle",date+'--'+cardName+'规则得分明细');
	$('#cardGroupDetail').datagrid({
		title:date+'--'+cardInfo+'规则得分明细' ,//没有内容，就会少一个div的标题内容
		//title: '规则得分明细' ,
		//width:1300 ,
		method:'GET',
		fit:true ,
		height:420 ,
		singleSelect:false,
		url:'/DAMS/CDA/getCardGroupScore?cardId='+cardId+'&rundate='+date+'&orgId='+orgId+'&jobId=${jobId}&planId=${planId}' ,
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
				checkbox: true
			}
		]], */
		columns:[[
			{
				field:'RUNDATE' ,
				title:'日期' ,
				width:50,
				hidden: true
			},{
				field:'BRANCH_NAME' ,
				title:'机构' ,
				width:100,
				hidden: false
			},{
				field:'RULE_ID' ,
				title:'规则ID' ,
				width:100,
				hidden:false
			},{
				field:'APP_ID' ,
				title:'schma' ,
				width:70,
				hidden:false
			},{
				field:'TABLE_NAME' ,
				title:'表名' ,
				width:70,
				hidden:false
			},{
				field:'CHECK_COLUMN_NAME' ,
				title:'检查字段' ,
				width:70,
				hidden:false
			},{
				field:'SCORE' ,
				title:'得分' ,
				width:60 ,
				hidden: false
			},{
				field:'MAXSCORE' ,
				title:'最高得分' ,
				width:60 ,
				hidden: true
			},{
				field:'PERRATE' ,
				title:'得分占比' ,
				width:60 ,
				hidden: true
			}
		]] ,
		
		pagination: true , 
		pageSize: 10 ,
		pageList:[10,15,20,50]
	});
}		

//将一个含有相同值的数组去重
function getDiffValueFromArr(a) {
    var b = [], n = a.length, i, j;
    for (i = 0; i < n; i++) {
        for (j = i + 1; j < n; j++){
        if (a[i] === a[j])j=++i;
        }
        b.push(a[i]);
    }
    return b.sort(function(a,b){return a-b});
}

       

//评分卡按照机构的趋势图
function getCardTendChart(){
			
			var beginDate1 = $("#cardSearch input[name=beginDateCard]").val();
			
			//功能插件，不能通过ID获得值
        	if(beginDate1==""){
        		$.messager.alert("提 示","请选择检查日期！","icon-cancel");
        		return ;
        	} 			
			
			var endDate1 = $("#cardSearch input[name=endDateCard]").val();
			if(endDate1==""){
        		$.messager.alert("提 示","请选择检查日期！","icon-cancel");
        		return ;
        	} 			
			
			var cardInfo1 = $("#cardSearch input[name=ESTIMATE_CARD_INFOCard]").val();
			var cardId = cardInfo1.split("#")[0];
			if(cardInfo1==""){
        		$.messager.alert("提 示","请选择评分卡！","icon-cancel");
        		return ;
        	} 	
			
			var org_id = $("#cardSearch input[name=org_id]").val();
			if(org_id==""){
        		$.messager.alert("提 示","请选择机构！","icon-cancel");
        		return ;
        	}
			
				$.ajax({
					type : "GET",
					url : "<%=request.getContextPath()%>/CDA/CTEQuery?jobId=${jobId}&planId=${planId}",
					data : {
						beginDate1 : beginDate1,
						endDate1 : endDate1,
						cardInfo1: cardId,
						org_id : org_id
					}, 
					dataType : 'json',
					success : function(json) {
						if(json == null){
			       			alert("没有数据");
			       		}else{
							var dataJson = json.rows;
							var catagories = [];
							var displayDatas = [];
							var estimateCard = {};
							
							estimateCard.name = cardInfo1.split("#")[1];
							var estimateCardData = [];
							
							var reg=new RegExp("-","g"); //创建正则RegExp对象  
							
							for ( var i = 0; i < dataJson.length; i++) {
								
								catagories.push(dataJson[i].RUNDATE);
							}
							var catagoriesNew =  getDiffValueFromArr(catagories);
							
							//需要保证所有的data数组长度和x坐标的保持一致，否则，对应的图形系列就会消失
							for ( var j = 0; j < catagoriesNew.length; j++) {
								estimateCardData.push(0);
							}
							
							//对每一个x轴上的时间点，将相应的维度得分进行填充
							for ( var j = 0; j < catagoriesNew.length; j++) {
								var xdate = catagoriesNew[j];
								for ( var i = 0; i < dataJson.length; i++) {
									//数据库查出来的是字符串，所以这里需要进行类型转换
									var score = parseFloat(parseFloat(dataJson[i].SCORE).toFixed(2));
									
									//为什么rundate取到的是一个对象呢？
									
									if(xdate==dataJson[i].RUNDATE){
									
										estimateCardData[j] = score;
										
									}else{
										continue;
									}
								}
							}
							
							estimateCard.data = estimateCardData;
							displayDatas.push(estimateCard);
							
							var subtitle = "";
							
							//生成各个指标的图形
					   		genLineCharts('cardOrgTend',catagoriesNew,displayDatas,'评分卡得分趋势图',subtitle,'',true);
					   	}
					}
				});
			
		}

</script>
</head>

<body>
	<div>

		<div id="containercard" class="" style="width:100%;">
			<form id="cardSearch" method="post">
				日期：<input type="text" id="beginDateCard" name="beginDateCard" class="easyui-datebox" style="width:100px;" value=""> 
				~<input type="text" id="endDateCard" name="endDateCard" class="easyui-datebox" style="width:100px;" value="">
				 评分卡：<input id="ESTIMATE_CARD_INFOCard" name="ESTIMATE_CARD_INFOCard" class="easyui-combobox" valueField="ID" textField="NAME">
			
				机构 ： <input id="org_id" name="org_id" class="easyui-combobox" valueField="BRANCH_ID" textField="BRANCH_NAME" style="width:240px"> 
		
				<a id="cardTend" class="easyui-linkbutton" style="margin-left:0px">查询</a>
			</form>
		</div>
		<div id="cardOrgTend" class="" style="width:52%;height:420px;float:right"></div>
		
		<div id="cardGroupDiv" style="width:47%;height:420px;float:left">
	        <table id = 'cardGroupDetail'></table>    
		</div>
	</div>
</body>
</html>
