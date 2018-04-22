<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	//ModelAndView跳转时带过来的参数，需要写进session中
	//String jobId = ${jobId};
	String jobId = request.getParameter("");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'frameIndex.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

  </head>
  
  <body>
    <a href="<%=request.getContextPath()%>/CDA/CTREE?jobId=${jobId}&planId=${planId}"  target="showframe">平衡树</a>
	<a href="<%=request.getContextPath()%>/CDA/CTEND?jobId=${jobId}&planId=${planId}"  target="showframe">趋势图</a>
	<a href="<%=request.getContextPath()%>/CDA/CPOLAR?jobId=${jobId}&planId=${planId}" target="showframe">雷达图</a>
	<a href="<%=request.getContextPath()%>/CDA/CGAUGE?jobId=${jobId}&planId=${planId}" target="showframe">仪表图</a>

  </body>
</html>
