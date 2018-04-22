<%@ page contentType="text/html; charset=UTF-8" language="java" errorPage="" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<% String path = request.getContextPath();%>
<!DOCTYPE html>
<html>
<head>
    <!--默认声明，不要改-->
    <meta charset="UTF-8">
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
    <meta content="IE=edge chrome=1" http-equiv="X-UA-Compatible">
    <meta content="width=device-width  initial-scale=1.0  maximum-scale=1.0  minimum-scale=1.0  user-scalable=no  minimal-ui" name="viewport">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <!-- home screen app 全屏 -->
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <!--<meta name="viewport" content="width=device-width  initial-scale=1.0">-->
    <title>数据管控平台</title>
    <!--框架的放这-->
    <link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="assets/css/bootstrap-dialog.css" rel="stylesheet" type="text/css">
    <link href="assets/css/bootstrap-select.min.css" rel="stylesheet" type="text/css">
    <link href="assets/css/font-awesome.css" rel="stylesheet" type="text/css">
    <link href="assets/css/easyui.css" rel="stylesheet" type="text/css">
    <link href="assets/css/daterangepicker.css" rel="stylesheet" type="text/css">
    <!--自定义的放这-->
    <link href="ui/css/kit.css" rel="stylesheet" type="text/css">
    <link href="ui/css/comm.css" rel="stylesheet" type="text/css">
    
    <!-- 换肤都在这 -->
	<%@ include file="skin.jsp"%>
		
	<!--[if IE]>
    <script src="assets/js/html5shiv.js"></script>
    <![endif]-->
</head>
<body>
<!--头部Header-->
<div class="head">
    <!--系统图标-->
    <div class="logo">
        <!-- <img src="ui/images/td-white.png" width="" height=""> -->
    </div>
    <!--菜单-->
    <div class="headright">
        <ul class="HeadMenu">
        </ul>
        <!--右侧-->
        <div class="information">
	        <div class="inn">
			    <span class="bank fa fa-key"></span>
			    <em onclick="updatePassword();">修改密码</em>
			</div>
            <div class="inn">
                <span class="glyphicon glyphicon-user"></span>
                <em>${userVO.userName}</em>
            </div>
            <div class="inn">
                <span class="bank fa fa-bank"></span>
               <em>${userVO.branchName}</em>
            </div>
            <div class="inn">
                <span class="glyphicon glyphicon-log-out"></span>
                <em onclick="logout();">退出</em>
            </div>
            <div class="inn">
                <span class="glyphicon glyphicon-question-sign"></span>
                <em>帮助</em>
            </div>
        </div>
    </div>
</div>
<!--头部Header--End-->
<!--主体内容main-->
<div class="main">
    <!--左侧二级菜单-->
    <div class="LeftMenu menu-list">
        <ul class="LeftMenuLu">
        </ul>
    </div>
    <!--左侧二级菜单--End-->
    <!--主要内容container-->
    <div class="zcontainer">
    	<!-- 控制条 -->
    	<div class="itoolbar imenu imenu-close">
    		<div class="inn">
    			<i class="fa fa-caret-left"></i>
    		</div>
    	</div>
    	
    	<div class="itabs">
	        <!--tab切换-->
	        <input type="hidden" id="maxTabIndex" value="1"></input>
	        <div id="sysVarCache" type="hidden"></div>
	        <ul class="nav nav-tabs" role="tablist" id="contentnavid">
	<!-- 		    <li role="presentation" class="active"><a href="#tab1" aria-controls="tab1" role="tab" data-toggle="tab">我的工作台</a><i class="fa fa-remove tab-close"></i></li>
	 -->		</ul>
	         <!-- Tab panes -->
		  	<div class="tab-content" id="tabContent">
	<!-- 	    <div role="tabpanel" class="tab-pane active" id="tab1">welcome</div>
	 -->	</div> 
 		</div>
    </div>
</div>
<!--主要内容container--End-->
<!--主体内容main--End-->


<script src="assets/js/jquery-1.11.3.min.js"></script>
<script src="assets/js/jquery.easyui.min.js"></script>
<script src="assets/js/bootstrap.min.js"></script>
<script src="assets/js/bootstrap-dialog.js"></script>
<script src="assets/js/bootstrap-select.min.js"></script>
<script src="assets/js/jquery.form.js"></script>
<script src="assets/js/moment.js"></script>
<script src="assets/js/daterangepicker.js"></script>

<!--ui js-->
<script src="ui/js/index.js"></script>
<script src="ui/js/action.js"></script>
<script src="ui/js/layout.js"></script>
<script src="ui/js/style.js"></script>
<script src="ui/js/tab.js"></script>
<script src="ui/js/DateUtil.js"></script>
<script src="ui/js/DoCellTip.js"></script>
<script src="ui/js/changePassword.js"></script>
<script src="ui/js/jobs.js"></script>

<script>
var webPath = '<%=path%>';
$.ajaxSetup({
    complete :checkAjaxSession,
    cache:false
});

/*
 * 处理用户登录超时和异地登录问题
 */
function checkAjaxSession(request) {
    var sessionStatus=request.getResponseHeader("sessionstatus");
    if(sessionStatus!=null){
        var redirect=webPath+"/auth/login";
        console.log(redirect);
        if(sessionStatus=="allopatry"){
            alert(alertallopatry);
        }else if(sessionStatus=="timeout"){
            alert(alertsessionTimeOut);
        }
        top.location.href=redirect;
    }
};
</script>
<input type="hidden" value="${authResultType}"></input>
<c:if test="${authResultType=='06'}">
    <script type="text/JavaScript">
        updatePassword();
    </script>
</c:if>
</body>
</html>
