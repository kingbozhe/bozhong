<%--
  Created by IntelliJ IDEA.
  User: Octopus
  Date: 2017/9/6
  Time: 18:01
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
   <!--  <link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="assets/css/font-awesome.css" rel="stylesheet" type="text/css">
    自定义的放这
    <link href="ui/css/comm.css" rel="stylesheet" type="text/css"> -->
    <title>重置缓存</title>
</head>
<body>
<div class="panel panel-default">
    <!-- Default panel contents -->
    <div class="panel-heading">重置系统Redis中对应模块缓存</div>
    <div class="panel-body">
        <p id="message"></p>
    </div>
    <!-- Table -->
    <table class="table">
        <tr>
            <th>名称</th>
            <th>重置</th>
        </tr>
        <tr>
            <td>全部</td>
            <td><span class="reset blue" id="all">重置</span></td>
        </tr>
        <tr>
            <td>注销用户</td>
            <td><span class="reset blue" id="user">重置</span></td>
        </tr>
    </table>
</div>
</body>
<!-- <script src="assets/js/jquery-1.11.3.min.js"></script> -->
<script type="text/javascript">
    //新增清楚缓存连接时在此处加入链接地址
    var urls = ["/DAMS/auth/refreshCache","/DAMS/auth/refreshCache?keyPartern=*DAMS-CACHEPRE:USER*"];
    $(".reset").click(function () {
        var index = $(".reset").index(this);
        $.getJSON(urls[index], function (data) {
            if (data.result == true) {
                $("#message").html("重置缓存成功").removeClass().addClass("blue");
            } else {
                $("#message").html("重置缓存失败").removeClass().addClass("red");
            }
        });
    });
</script>
</html>
