<%@ page contentType="text/html; charset=UTF-8" language="java" errorPage="" %>
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
    <link href="assets/css/font-awesome.css" rel="stylesheet" type="text/css">
    <link href="assets/css/easyui.css" rel="stylesheet" type="text/css">

    <!--自定义的放这-->
    <link href="ui/css/kit.css" rel="stylesheet" type="text/css">
    <link href="ui/css/comm.css" rel="stylesheet" type="text/css">
	<!--[if IE]>
    <script src="assets/js/html5shiv.js"></script>
    <![endif]-->
    
</head>

<body>

<!--主体内容main-->
<div class="main">
    

    <!--主要内容container-->
    <div class="zcontainer">
        <!--主体内容-->
        <div class="box">
            <!--筛选框-->
            <div class="col-md-12 ifilter" id="ifilter">
              <form id="entityForm" method="post" action="/DAMS/bizEntity/formData">
                <div class="">
                    <div class="iline col-sm-12">
                        <div class="im col-xs-12"><!--文本框-->
                            <em>输入名称</em>
                            <div class="sinput sinput">
                                <input class="itext form-control" placeholder="请输入名称" aria-describedby="basic-addon1" type="text">
                            </div>
                        </div>
                    </div>
                    <div class="iline col-sm-12">
                        <div class="im col-xs-12"><!--下拉选择-->
                            <em>筛选名称</em>
                            <div class="sinput sdrop">
                                <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i>全部</i>
                                    <span class="caret"></span>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenu3">
                                    <li><a href="#">选项 1</a></li>
                                    <li><a href="#">选项 2</a></li>
                                    <li><a href="#">选项 3</a></li>
                                    <li><a href="#">选项 4</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="iline col-sm-12">
                        <div class="im col-xs-12"><!--输入搜索-->
                            <em>导入</em>
                            <div class="sinput input-group">
                                <input class="form-control" placeholder="" aria-describedby="basic-addon2" type="text">
                                <span class="input-group-addon">
                                    <i class="fa fa-upload"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="iline col-sm-12">
                        <div class="im col-xs-12"><!-- 点选 -->
				            <em>复选</em>
				            <div class="sinput scheck">
				                <div class="sra left">
				                    <input type="checkbox">
				                    <em>选项1</em>
				                </div>
				                <div class="sra right">
				                    <input type="checkbox">
				                    <em>选项2</em>
				                </div>
				                <div class="sra right">
				                    <input type="checkbox">
				                    <em>选项3</em>
				                </div>
				            </div>
				
				        </div>
                    </div>
                </div>
              </form>
            </div>
        </div>
        
    </div>
</div>
<!--主要内容container--End-->
<!--主体内容main--End-->


<script src="assets/js/jquery-1.11.3.min.js"></script>
<script src="assets/js/jquery.easyui.min.js"></script>
<script src="assets/js/bootstrap.min.js"></script>

<!--ui js-->
<script src="ui/js/form.js"></script>



</body>
</html>
