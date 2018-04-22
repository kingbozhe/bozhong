<%@ page contentType="text/html; charset=UTF-8" language="java" errorPage="" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>

	<head>

		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>登录页面</title>

		<!-- CSS -->
		<link rel="stylesheet" href="assets/css/bootstrap.min.css" type="text/css">
		<link rel="stylesheet" href="assets/css/font-awesome.css">
		<link rel="stylesheet" href="assets/css/form-elements.css">
		<link rel="stylesheet" href="ui/css/login.css">
		<script src="assets/js/jquery-1.11.3.min.js"></script>
		<script src="assets/js/bootstrap.min.js"></script>
		
		<!-- 换肤都在这 -->
		<%@ include file="skin.jsp"%>
		<!-- login再改下这个 -->
		<script src="ui/skin/login-1.js"></script>

		<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--[if lt IE 9]>
            <script src="assets/js/html5shiv.js"></script>
            <script src="assets/js/respond.min.js"></script>
        <![endif]-->

		<script type="text/javascript">
		</script>
	</head>

	<body>
		<div class="login-logo">
		</div>
		<div class="login-inn">
			<div class="form-box">
				<div class="form-top">数据管控平台</div>
				<div class="form-bottom">
					<c:set var="salary" scope="session" value="${authResultType}" />
					<form role="form" action="/DAMS/auth/login" method="post" class="login-form">
						<div class="form-group">
							<i class="user"></i>
							<label class="sr-only" for="form-username">用户名</label>
							<input type="text" name="userId" placeholder="账号..." class="form-username" id="form-username" value="${Status}" autocomplete="off">
						</div>
						<div class="form-group">
							<i class="lock"></i>
							<label class="sr-only" for="form-password">密　码</label>
							<input type="password" name="password" placeholder="密码..." class="form-password" id="form-password" autocomplete="off">
						</div>
						<div class="wrong<c:if test="${authResultType==null ||authResultType=='00'}"> hide</c:if>" id="loginMessage">
							<c:choose>
								<c:when test="${authResultType=='02'}">用户名或密码不正确!
									<script type="text/JavaScript">passwordReset();</script>
								</c:when>
								<c:when test="${authResultType=='06'}">用户使用默认密码登录，请修改密码！</c:when>
								<c:when test="${authResultType=='03'}">用户没有初始化角色，请联系管理员</c:when>
								<c:when test="${authResultType=='04'}">用户已被禁用，请联系管理员</c:when>
								<c:otherwise>账号异常，请联系管理员！</c:otherwise>
							</c:choose>
						</div>
						<button type="submit" class="btn">登录</button>
					</form>
				</div>
			</div>
		</div>
		<!--<div class="login-footer">建议使用IE9以上浏览器和1280*800以上分辨率</div>-->
		<div class="login-footer"></div>

		<input type="hidden" value="${authResultType}"></input>
		<!--[if lt IE 10]>
            <script src="ui/js/placeholder.js"></script>
        <![endif]-->
	</body>

</html>