<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	String planId = request.getAttribute("planId")+"";
	//ModelAndView跳转时带过来的参数，需要写进session中
	//String planId = ${planId};
	/* request.getSession().setAttribute("jobId", "1");
	request.getSession().setAttribute("planId",planId); */ 
%>

<!DOCTYPE html>
<html>
<head> 
<meta charset="utf-8"> 
<title>评分卡结果分析与展示</title> 
     
    <link rel="stylesheet" href="assets/css/custom.css"/>
    
    <script type="text/javascript" src="assets/js/jquery-1.11.3.min.js"></script>
    
    <!-- <link rel="stylesheet" type="text/css" href="assets/css/common.css" /> -->
	<link rel="stylesheet" type="text/css" href="assets/css/easyui.css" />
	<link rel="stylesheet" type="text/css" href="assets/css/icon.css" />
    
	<script type="text/javascript" src="assets/js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="assets/js/easyui-lang-zh_CN.js"></script>
	<script>
		$(document).ready(function () {
    		
			
			var ttt = "${jobId}";
			//var jobId = $("#jobId").val();
   			//alert(ttt); 	
		
        });
		
	</script>
	<!-- jquery easy ui 需要的引入文件 -->
	<!-- 框架CSS  -->
</head>
	
<frameset rows="5%,*" >
	<framset frameborder="0" scroll="no">
		<frame src="<%=request.getContextPath()%>/CDA/index?jobId=1&planId=1">
	</framset>

	<framset>

		<frame src="<%=request.getContextPath()%>/CDA/CTREE?jobId=1&planId=1" name="showframe"/>
		
	</framset>
  
</frameset>


</html>