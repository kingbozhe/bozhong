<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	String roleId = request.getParameter("roleId");
	String branchId = request.getParameter("branchId");
	String branchLevel = request.getParameter("branchLevel");
	String userId = request.getParameter("userId");
	String planId = request.getParameter("planId");
	String jobId = request.getParameter("jobId");
	request.getSession().setAttribute("roleId", roleId);
	request.getSession().setAttribute("branchId", branchId);
	request.getSession().setAttribute("branchLevel", branchLevel);
	request.getSession().setAttribute("userId", userId);
	
%>
<!DOCTYPE html>
<html lang="en">
<head>
	<%-- <base href="<%=basePath%>"> --%>
    <title>
    </title>
     
     <!-- 组织机构树插件的引入文件 -->
    <link rel="stylesheet" href="assets/css/jquery.jOrgChart.css"/>
    <link rel="stylesheet" href="assets/css/custom.css"/>
    
    <script type="text/javascript" src="assets/js/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="assets/js/jquery.jOrgChart.js"></script>
    
    <!-- <link rel="stylesheet" type="text/css" href="assets/css/common.css" /> -->
	<link rel="stylesheet" type="text/css" href="assets/css/easyui.css" />
	<link rel="stylesheet" type="text/css" href="assets/css/icon.css" />
    
	<script type="text/javascript" src="assets/js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="assets/js/easyui-lang-zh_CN.js"></script>
	
	<!-- jquery easy ui 需要的引入文件 -->
	<!-- 框架CSS  -->
	
    <script>
	
    	$(document).ready(function () {
            $.ajax({
		    	url : '/DAMS/CDA/getLatestCalDate?jobId=${jobId}',
		    	type : "GET",
		    	dataType : "json",
		    	contentType : 'application/json;charset=UTF-8',
		    	success : function(result) {
		    		var rows = result.rows;
		       		maxDate = rows[0];
		       		maxDate = '2017-09-08';
		       		//var maxDateSplit = maxDate.substring(0,10);
		       		$('#check_date').datebox('setValue', maxDate);
		       		loadEstimateCard(maxDate);
				},
		    	error : function(e) {
		        		console.log("error");
		        }
		    });
	      	
            $('#searchbtn').click(function(){
            	
            	queryCardTree();
			});
			
			//var nodeCss = {"width":"160px","height":"120px"};
			//$(".jOrgChart .node").css(nodeCss);
			$("#dataList").css("display","none");
			//$('#check_date').datebox('setValue', formatterDate(new Date()));
			
        });
        
        //menu_list为json数据
        //parent为要组合成html的容器
        function showall(menu_list, parent) {
            for (var menu in menu_list) {
                
                if (menu_list[menu].CHILDREN!=null) {
                    //如果有子节点，创建一个子节点li
                    var li = $("<li></li>");
                    //将li的文本设置好，并马上添加一个空白的ul子节点，并且将这个li添加到父亲节点中
                    $(li).append(" <a  href='javascript:void(0)' title='"+menu_list[menu].NAME+"' onclick='allOrgDetail("+menu_list[menu].ID+")'>"+menu_list[menu].NAME+"<br>实际得分:"+menu_list[menu].SCORE*100+"<br>最高得分:" +menu_list[menu].MAXSCORE*100+ "<br>得分占比:"+(menu_list[menu].MAXSCORE>0?(menu_list[menu].SCORE*100/menu_list[menu].MAXSCORE).toFixed(2):'无')+"%</a>")
                    .append("<ul></ul>")
                    .appendTo(parent);
                    //将空白的ul作为下一个递归遍历的父亲节点传入
                    showall(menu_list[menu].CHILDREN, $(li).children().eq(1));
                }else {
                	var nodeInfo = menu_list[menu].ID+"#"+menu_list[menu].NAME;
                	//如果该节点没有子节点，则直接将该节点li以及文本创建好直接添加到父亲节点中
                    $("<li></li>").append(" <a href='javascript:void(0)' title='"+menu_list[menu].NAME+"' onclick='allOrgDetail("+ menu_list[menu].ID+ ")'>" + menu_list[menu].NAME +"<br>实际得分:"+menu_list[menu].SCORE+"<br>最高得分:" +menu_list[menu].MAXSCORE*100+"<br>得分占比:"+(menu_list[menu].MAXSCORE>0?(menu_list[menu].SCORE/menu_list[menu].MAXSCORE).toFixed(2):'无')+ "%</a>").appendTo(parent);
                }
            }
        }
		
		//查看机构当前节点直接下级的得分明细
		function allOrgDetail(nodeId){
			var obj = event.srcElement;
			
			var check_date = $("input[name='check_date']").val();
        	if(check_date==""){
        		$.messager.alert("提 示","请选择检查日期！","icon-cancel");
        		return ;
        	}
        	
        	var ORG_INFO = $("input[name='ORG_INFO']").val();
        	if(ORG_INFO==""){
        		$.messager.alert("提 示","请选择机构！","icon-cancel");
        		return ;
        	}
        	
        	$("#nodeIdDown").val(nodeId);
        	$("#allBelowOrgScoreDiv").dialog("open").dialog("setTitle",obj.title);
        	//加载数据
        	
    		$("#allBelowOrgScoreTable").datagrid({
                /* idField:'id' ,	
				title:'评分组管理' , *///没有内容，就会少一个div的标题内容
				//width:1300 ,
				fit:true ,
				height:420 ,
				singleSelect:false,
				//queryParams:{idd:'dd',nnn:'ff'},传入更灵活的参数
				url:'/DAMS/CDA/searchBelowOrgScore?nodeId='+nodeId+'&rundate='+check_date+'&orgId='+ORG_INFO+'&jobId=${jobId}&planId=${planId}' ,
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
                	{field:'DQ_RSLT_ORG',title: '机构代码',align: 'center',width: 120,hidden:false},
                    {field:'ORGNAME',title: '机构名称',align: 'center',width: 300,hidden:false,formatter:function(value,record,index){
                    	return "<a title='"+record.ORG_ID+"#"+value+"' onclick='allOrgDetail2("+nodeId+")'>"+value+"</a>";
                    }},
                    
                    {field:'SCORE',title: '得分',align: 'center',width: 120},
                    {field:'MAXSCORE',title: '最高得分',align: 'center',width: 120,hidden:true},
                    {field:'RUNDATE',title: '计算日期',align: 'center',width:150,formatter:function(value , record , index){
						//var str = value.substring(0,19);
						return value;
					}}
                                                                
                ]]  
            }); 
		}
		
		//查看所有下级当前节点的得分明细
		function allOrgDetail2(nodeId){
			var obj = event.srcElement;
			
			var clickOrg = obj.title.split("#")[0];
			var check_date = $("input[name='check_date']").val();
        	if(check_date==""){
        		$.messager.alert("提 示","请选择检查日期！","icon-cancel");
        		return ;
        	}
        	
        	
        	$("#allBelowOrgScoreDiv2").dialog("open").dialog("setTitle",obj.title.split("#")[1]);
        	//加载数据
    		$('#allBelowOrgScoreTable2').datagrid({
                width: 'auto',  
                height: "380",//auto的话表格高度会随着数据的变化而变化               
                striped: true,  
                singleSelect : true,  
                url:'DAMS/CDA/searchBelowOrgScore?nodeId='+nodeId ,
                queryParams:{check_date:check_date,selOrg:clickOrg},  
                loadMsg:'数据加载中请稍后……',  
                pagination: true,  
                rownumbers: true,     
                columns:[[  
                	{field:'DQ_RSLT_ORG',title: '机构代码',align: 'center',width: 120,hidden:false},
                    {field:'ORGNAME',title: '机构名称',align: 'center',width: 300,hidden:false},
                    {field:'SCORE',title: '得分',align: 'center',width: 120},
                    {field:'RUNDATE',title: '计算日期',align: 'center',width:150,formatter:function(value , record , index){
						//var str = value.substring(0,19);
						return value;
					}}
                                                                           
                ]]  
            }); 
		}
		
        function clickLeafNode(nodeId){
        	var obj = event.srcElement;
        	$("#ruleScoreTableDiv").dialog("open").dialog("setTitle",obj.title);
        	var check_date = $("input[name='check_date']").val();
        	if(check_date==""){
        		$.messager.alert("提 示","请选择检查日期！","icon-cancel");
        		return ;
        	}
        	var ORG_INFO = $("input[name='ORG_INFO']").val();
        	if(ORG_INFO==""){
        		$.messager.alert("提 示","请选择机构！","icon-cancel");
        		return ;
        	}
        	
        	//加载数据
    		$("#ruleScoreTable").datagrid({
                width: 'auto',  
                height: "380",//auto的话表格高度会随着数据的变化而变化               
                striped: true,  
                singleSelect : true,  
                url:'DAMS/CDA/searchRuleScore?nodeId='+nodeId ,
                queryParams:{check_date:check_date,selOrg:ORG_INFO},
                loadMsg:'数据加载中请稍后……',  
                pagination: true,  
                rownumbers: true,     
                columns:[[  
                    {field:'GROUP_ID',title: '评分组ID',align: 'center',width: 80,hidden:true},
                    {field:'CHECK_ID',title: '规则ID',align: 'center',width: 80},
                     {field:'SCORE',title: '规则得分',align: 'center',width: 140,hidden:false},  
                    {field:'SYS_ID',title: 'schema',align: 'center',width: 80},  
                    {field:'TABLE_NAME',title: '表名',align: 'center',width: 120},
                    {field:'CHECK_COLUMN_NAME',title: '字段名',align: 'center',width: 80},    
                    {field:'START_DT',title: '创建日期',align: 'center',width:200,formatter:function(value , record , index){
						var str = value.substring(0,19);
						return str;
					}}, 
                    {field:'CREATE_OPER',title: '创建人',align: 'center',width: 100}                                                          
                ]]  
            }); 
        }
        //平衡树信息查询
        function queryCardTree(){
        	//功能插件，不能通过ID获得值
        	var check_date = $("input[name='check_date']").val();
        	if(check_date==""){
        		$.messager.alert("提 示","请选择检查日期！","icon-cancel");
        		return ;
        	}
        	
        	var selectCard = $("input[name='ESTIMATE_CARD_INFO']").val();
        	var cardInfo = selectCard.trim().replace("#","@");
        	
        	if(selectCard==""){
        		$.messager.alert("提 示","请选择评分卡！","icon-cancel");
        		return ;
        	}
        	
        	var ORG_INFO = $("input[name='ORG_INFO']").val();
        	if(ORG_INFO==""){
        		$.messager.alert("提 示","请选择机构！","icon-cancel");
        		return ;
        	}
       		
       		$.ajax({
		    	url : '/DAMS/CDA/JSONJORG?check_date='+check_date+'&ESTIMATE_CARD_INFO='+cardInfo+'&ORG_INFO='+ORG_INFO+'&jobId=${jobId}&planId=${planId}',
		    	type : "GET",
		    	dataType : "json",
		    	contentType : 'application/json;charset=UTF-8',
		    	success : function(result) {
		    		/* var result = eval('('+result+')');  */
		    		
		          	//这里直接定义，那么每次加载时都会创建
		          	var html = $("#org").html();//得到ul里面的html代码
		          	if(html !=null){
		          		$("#org").html("");//这里对org里面的标签内容进行了清空
		          		var showlist = $("#org");
		          		showall(result, showlist);
		          		 $("#bodyId").append(showlist);
		          		$("div.jOrgChart").html("");//清除了里面的内容，但是div对象本身还是存在，会占用默认的页面空间
		          		$("div.jOrgChart").remove();//真正清除页面上生成的div
		          		//每次都会生成div
	                    $("#org").jOrgChart();
		          	}else{
		          		//第一次查询，需要生成一定的数据结构对象
		          		var showlist = $("<ul id='org' style='display:none'></ul>");
	                    showall(result, showlist);
	                    //将生成好的固定格式的ul拼接到body,ul必须要依赖容器才能存在
	                    $("#bodyId").append(showlist);
	                    $("#org").jOrgChart();
		          	}
				},
		    	error : function(e) {
		        		console.log("error");
		        }
		    });
	      	
        }
        
        function loadEstimateCard(maxDate){
		     //alert("${jobId}");
		      $.ajax({
		    	url : '/DAMS/CDA/CTQuery?date='+maxDate+'&jobId=${jobId}&planId=${planId}',
		    	type : "GET",
		    	dataType : "json",
		    	contentType : 'application/json;charset=UTF-8',
		    	success : function(result) {
		    		 
		    		var rows = result.rows;
		    		
		       		//所属评分卡
					$('#ESTIMATE_CARD_INFO').combobox({
							data:rows,
							idField:'ID', // value值字段
							textField:'NAME', // 显示的字段
							fitColumns: true,
							striped: true,
							editable:false// 不可编辑，只能选择
					});
					//默认显示第一个
					
					$('#ESTIMATE_CARD_INFO').combobox("setValue",rows[0].ID);
					
					loadOrgInfo();
				},
		    	error : function(e) {
		        		console.log("error");
		        }
		   	 });
				      
		      
        }
        
      function loadOrgInfo(){
      
      	$.ajax({
	    	url : '/DAMS/CDA/getOrgInfo',
	    	type : "GET",
	    	dataType : "json",
	    	contentType : 'application/json;charset=UTF-8',
	    	success : function(result) {
	    		var rows = result.rows;
	       		//所属评分卡
				$('#ORG_INFO').combobox({
						data:rows,
						idField:'BRANCH_ID', // value值字段
						textField:'BRANCH_NAME', // 显示的字段
						fitColumns: true,
						striped: true,
						editable:false// 不可编辑，只能选择
				});
				$('#ORG_INFO').combobox("setValue",rows[0].BRANCH_ID);
				//评分卡，机构基础数据加载完毕之后再执行默认的初始化
				queryCardTree();
			},
	    	error : function(e) {
	        		console.log("error");
	        }
	    });
      		
      }
        
        function exportData() {
        	
        	$("#estimateGroupEditForm").form('submit',{
		        url: '<%=request.getContextPath()%>/CDA/exportScoreDetail',
		        onSubmit: function(param){
		        	//除了表单的元素，再提交自定义的参数
		            return true;
		        },
		        success: function(result){
		        	var result = eval('('+result+')');
		        	
		        }
		    });
        	//会发生页面跳转
			//window.open(url,"","");
			//不会发生页面跳转
			//dataList.location.href="<%=request.getContextPath()%>/CDA/exportScoreDetail";
		}
    </script>
  </head>

<body id="bodyId">
	    <div id="ruleScoreTableDiv" class="easyui-dialog" closed="true"
	    	style="width:700px;height:450px;" buttons="#card_tree_buttons">
			<div class="ftitle"><!-- title信息，根据增加和修改按钮动态变化 --></div>
			<table id="ruleScoreTable"></table> 
		</div>
	  <div id="allBelowOrgScoreDiv" class="easyui-dialog" closed="true"
	    	style="width:700px;height:450px;" buttons="#allBelowOrgScoreButtons">
			<div class="ftitle"><!-- title信息，根据增加和修改按钮动态变化 --></div>
			<table id="allBelowOrgScoreTable"></table> 
		</div>
	
	 <div id="allBelowOrgScoreButtons" style="text-align:center">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok" onclick="exportData()" style="">下 载</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-undo" onclick="javascript:$('#allBelowOrgScoreDiv').dialog('close')" style="">关 闭</a>
    </div>
    
	 <div id="allBelowOrgScoreDiv2" class="easyui-dialog" closed="true"
	    	style="width:700px;height:450px;" buttons="#card_tree_buttons">
			<div class="ftitle"><!-- title信息，根据增加和修改按钮动态变化 --></div>
			<table id="allBelowOrgScoreTable2"></table> 
		</div>
	<form id="estimateGroupEditForm" method="post">
				<!-- 当前节点folder_id -->
				<input name="nodeIdDown" id="nodeIdDown" type="hidden" value="" style="width:120px" />
	
		     &nbsp;&nbsp;检查日期:<input name="check_date" id="check_date" class="easyui-datebox" value="" style="width:120px" />
	   评分卡：<input id="ESTIMATE_CARD_INFO" name="ESTIMATE_CARD_INFO" class="easyui-combobox" valueField="ID" textField="NAME" >
	  机构： <input id="ORG_INFO" name="ORG_INFO" class="easyui-combobox" valueField="BRANCH_ID" textField="BRANCH_NAME" style="width:240px" >
	    <a id="searchbtn" class="easyui-linkbutton" style="margin-left:20px">查询</a>
	</form>
	<!-- 为了防止页面发生跳转 -->
	<iframe name="dataList" frameborder="0" src="" scrolling="auto" width="0" height="0"/>
	
	
	
</body>
</html>