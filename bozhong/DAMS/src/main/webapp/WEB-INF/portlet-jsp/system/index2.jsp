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
    <link href="assets/css/bootstrap-dialog.css" rel="stylesheet" type="text/css">
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


<!--头部Header-->
<div class="head">
    <!--系统图标-->
    <div class="logo">
        <img src="ui/images/TD-logo.png" width="" height="">
    </div>
    <!--菜单-->
    <div class="headright">
        <ul class="HeadMenu">
        <!--     <li class="HeadMenuList">
                子系统
            </li>
            <li class="HeadMenuList active">
                客户分群<i class="fa fa-caret-down"></i>
                <ul class="second">
                    <li>
                        菜单2-1<i class="fa fa-caret-right"></i>
                        <ul class="third">
                            <li>菜单2-1-1</li>
                            <li>菜单2-1-2</li>
                        </ul>
                    </li>
                    <li>
                        菜单2-2
                    </li>
                </ul>
            </li>
            <li class="HeadMenuList">
                基本信息
            </li> -->
        </ul>
        <!--右侧-->
        <div class="information">
            <div class="inn">
                <span class="glyphicon glyphicon-user"></span>
                <em>用户</em>
            </div>
            <div class="inn">
                <span class="bank fa fa-bank"></span>
                <em>总行</em>
            </div>
            <div class="inn">
                <span class="glyphicon glyphicon-log-out"></span>
                <em>退出</em>
            </div>
            <div class="inn">
                <span class="glyphicon glyphicon-question-sign"></span>
                <em>帮助</em>
            </div>
        </div>
        <div class="bgimg">
            <img src="ui/images/header-pic.png">
        </div>
    </div>



</div>
<!--头部Header--End-->

<!--主体内容main-->
<div class="main">
    <!--左侧二级菜单-->

    <div class="LeftMenu menu-list">
        <ul class="LeftMenuLu">
           <!--  <li class="LeftMenuList">
	            <em>
	                <i class="fa fa-database"></i>
	                <span>元数据</span>
	            </em>
	            
	            <ul class="two">
	                <li>
	                    <em>
	                    		<img class="fileIcon" src="ui/images/file-close-off.png" data-active="close" alt="" />
	                    		<span>数据浏览</span>
	                    </em>
	                    <ul class="three">
	                        <li>
	                            <em>
	                            		<i class="fa fa-caret-right"></i>
	                            		<span>菜单1-1-1</span>
	                            </em>
	                            <ul class="four">
	                                <li>
	                                    <em>
	                                    		<i class="fa fa-angle-right"></i>
	                                    		<span>菜单1-1-1-1</span>
	                                    </em>
	                                    
	                                </li>
	                                <li>
	                                    <em>
	                                    		<i class="fa fa-angle-right"></i>
	                                    		<span>菜单1-1-1-1</span>
	                                    </em>
	                                    
	                                </li>
									<li>
	                                    <em>
	                                    		<i class="fa fa-angle-right"></i>
	                                    		<span>菜单1-1-1-1</span>
	                                    </em>
	                                    <ul class="five">
	                                        <li>
	                                        		<em>
	                                        			<i class="fa fa-file-text-o"></i>
	                                        			<span>菜单1-1-1-1-1</span>
	                                        		</em>
	                                        </li>
	                                        <li>
	                                        		<em>
	                                        			<i class="fa fa-file-text-o"></i>
	                                        			<span>菜单1-1-1-1-1</span>
	                                        		</em>
	                                        </li>
	                                        <li>
	                                        		<em>
	                                        			<i class="fa fa-file-text-o"></i>
	                                        			<span>菜单1-1-1-1-1</span>
	                                        		</em>
	                                        </li>
	                                    </ul>
	                                </li>
	                            </ul>
	                        </li>
	                    </ul>
	                </li>
	                <li>
	                    <em>
	                    		<img class="fileIcon" src="ui/images/file-close-off.png" data-active="close" alt="" />
	                    		<span>数据搜索</span>
	                    </em>
	                    <ul class="three">
	                        <li>
	                            <em>
	                            		<i class="fa fa-caret-right"></i>
	                            		<span>菜单1-1-1</span>
	                            </em>
	                        </li>
	                    </ul>
	                </li>
	                <li>
	                    <em>
	                    		<img class="fileIcon" src="ui/images/file-close-off.png" data-active="close" alt="" />
	                    		<span>数据管理</span>
	                    </em>
	                    <ul class="three">
	                        <li>
	                            <em>
	                            		<i class="fa fa-caret-right"></i>
	                            		<span>源系统管理</span>
	                            </em>
	                        </li>
	                        <li>
	                            <em>
	                            		<i class="fa fa-caret-right"></i>
	                            		<span>工具管理</span>
	                            </em>
	                        </li>
	                        <li>
	                            <em>
	                            		<i class="fa fa-caret-right"></i>
	                            		<span>ETL服务器管理</span>
	                            </em>
	                        </li>
	                        <li>
	                            <em>
	                            		<i class="fa fa-caret-right"></i>
	                            		<span>集市清单管理</span>
	                            </em>
	                            <ul class="four">
	                                <li>
	                                    <em>
	                                    		<i class="fa fa-angle-right"></i>
	                                    		<span>集市管理</span>
	                                    </em>
	                                    <ul class="five">
	                                        <li>
	                                        		<em>
	                                        			<i class="fa fa-file-text-o"></i>
	                                        			<span>菜单1-1-1-1-1</span>
	                                        		</em>
	                                        </li>
	                                        <li>
	                                        		<em>
	                                        			<i class="fa fa-file-text-o"></i>
	                                        			<span>菜单1-1-1-1-1</span>
	                                        		</em>
	                                        </li>
	                                        <li>
	                                        		<em>
	                                        			<i class="fa fa-file-text-o"></i>
	                                        			<span>菜单1-1-1-1-1</span>
	                                        		</em>
	                                        </li>
	                                    </ul>
	                                </li>
	                                <li>
	                                    <em>
	                                    		<i class="fa fa-angle-right"></i>
	                                    		<span>清单管理</span>
	                                    </em>
	                                    <ul class="five">
	                                        <li>
	                                        		<em>
	                                        			<i class="fa fa-file-text-o"></i>
	                                        			<span>客户清单</span>
	                                        		</em>
	                                        </li>
	                                        <li>
	                                        		<em>
	                                        			<i class="fa fa-file-text-o"></i>
	                                        			<span>数据清单</span>
	                                        		</em>
	                                        </li>
	                                    </ul>
	                                </li>
									
	                            </ul>
	                        </li>
	                    </ul>
	                </li>
	                <li>
	                    <em>
	                    		<img class="fileIcon" src="ui/images/file-close-off.png" data-active="close" alt="" />
	                    		<span>分析数据</span>
	                    </em>
	                    
	                </li>
	            </ul>
	        </li>
            
            <li class="LeftMenuList">
	            <em>
	                <i class="fa fa-cube"></i>
	                <span>技术元数据</span>
	            </em>
	            
	            <ul class="two">
	                <li>
	                    <em>
	                    		<img class="fileIcon" src="ui/images/file-close-off.png" data-active="close" alt="" />
	                    		<span>数据浏览</span>
	                    </em>
	                    <ul class="three">
	                        <li>
	                            <em>
	                            		<i class="fa fa-caret-right"></i>
	                            		<span>菜单1-1-1</span>
	                            </em>
	                            <ul class="four">
	                                <li>
	                                    <em>
	                                    		<i class="fa fa-angle-right"></i>
	                                    		<span>菜单1-1-1-1</span>
	                                    </em>
	                                    <ul class="five">
	                                        <li>
	                                        		<em>
	                                        			<i class="fa fa-file-text-o"></i>
	                                        			<span>菜单1-1-1-1-1</span>
	                                        		</em>
	                                        </li>
	                                        <li>
	                                        		<em>
	                                        			<i class="fa fa-file-text-o"></i>
	                                        			<span>菜单1-1-1-1-1</span>
	                                        		</em>
	                                        </li>
	                                        <li>
	                                        		<em>
	                                        			<i class="fa fa-file-text-o"></i>
	                                        			<span>菜单1-1-1-1-1</span>
	                                        		</em>
	                                        </li>
	                                    </ul>
	                                </li>
	                                <li>
	                                    <em>
	                                    		<i class="fa fa-angle-right"></i>
	                                    		<span>菜单1-1-1-1</span>
	                                    </em>
	                                    <ul class="five">
	                                        <li>
	                                        		<em>
	                                        			<i class="fa fa-file-text-o"></i>
	                                        			<span>菜单1-1-1-1-1</span>
	                                        		</em>
	                                        </li>
	                                        <li>
	                                        		<em>
	                                        			<i class="fa fa-file-text-o"></i>
	                                        			<span>菜单1-1-1-1-1</span>
	                                        		</em>
	                                        </li>
	                                        <li>
	                                        		<em>
	                                        			<i class="fa fa-file-text-o"></i>
	                                        			<span>菜单1-1-1-1-1</span>
	                                        		</em>
	                                        </li>
	                                    </ul>
	                                </li>
									<li>
	                                    <em>
	                                    		<i class="fa fa-angle-right"></i>
	                                    		<span>菜单1-1-1-1</span>
	                                    </em>
	                                    <ul class="five">
	                                        <li>
	                                        		<em>
	                                        			<i class="fa fa-file-text-o"></i>
	                                        			<span>菜单1-1-1-1-1</span>
	                                        		</em>
	                                        </li>
	                                        <li>
	                                        		<em>
	                                        			<i class="fa fa-file-text-o"></i>
	                                        			<span>菜单1-1-1-1-1</span>
	                                        		</em>
	                                        </li>
	                                        <li>
	                                        		<em>
	                                        			<i class="fa fa-file-text-o"></i>
	                                        			<span>菜单1-1-1-1-1</span>
	                                        		</em>
	                                        </li>
	                                    </ul>
	                                </li>
	                            </ul>
	                        </li>
	                    </ul>
	                </li>
	            </ul>
	        </li>

			<li class="LeftMenuList lastChild">
	            <em>
	                <i class="fa fa-cog"></i>
	                <span>系统管理</span>
	            </em>
	        </li>
	         -->
        </ul>
    </div>
    <!--左侧二级菜单--End-->

    <!--主要内容container-->
    <div class="zcontainer">
        <!--tab切换-->
        
        <ul class="nav nav-tabs" role="tablist" id="contentnavid">
		    <li role="presentation" class="active"><a href="#tab1" aria-controls="tab1" role="tab" data-toggle="tab">tab1</a></li>
		    <li role="presentation"><a href="#tab2" aria-controls="tab2" role="tab" data-toggle="tab">tab2</a></li>
		    <li role="presentation"><a href="#tab3" aria-controls="tab3" role="tab" data-toggle="tab">tab3</a></li>
		    <li role="presentation" id="closetabli"><a href="#closetab" aria-controls="closetab" role="tab" data-toggle="tab"><span>closetab</span>
		    &nbsp;<button type="button" class="close"  aria-label="Close" id="closetabbtn"><span aria-hidden="true" style="color:red">&times;</span></button>
		    </a></li>
		</ul>
         <!-- Tab panes -->
	  	<div class="tab-content">
	    	<div role="tabpanel" class="tab-pane active" id="tab1">this is tab1</div>
	    	<div role="tabpanel" class="tab-pane active" id="tab2">this is tab2</div>
	    	<div role="tabpanel" class="tab-pane active" id="tab3">this is tab3</div>
	    	<div role="tabpanel" class="tab-pane active" id="closetab">this is closetab</div>
	  	</div> 
        <div class="zbre">
        	<div class="imenu imenu-close"></div>
            <div class="sbre" id="navigateBread">
                <em>客户分群 <i class="fa fa-angle-right"></i></em>
                <em>菜单2-1 <i class="fa fa-angle-right"></i></em>
                <em>菜单2-1-1 <i class="fa fa-angle-right"></i></em>
                <em>元数据 <i class="fa fa-angle-right"></i></em>
            </div>
        </div>
        <!--主体内容-->
        <input id="hiddenBizModelId" type="hidden"></input>
        <input id="hiddenBizViewId" type="hidden"></input>
        <div id="hiddenDrillViewId" type="hidden"></div>
        <div id="hiddenDrillModelId" type="hidden"></div>
        <div class="box">
            <!--筛选框-->
            <div class="col-md-12 ifilter" id="ifilter">
                <div class="ileft">
                    <div class="iline col-sm-12">
                        <div class="im col-xs-4"><!--文本框-->
                            <em>输入名称</em>
                            <div class="sinput sinput">
                                <input class="itext form-control" placeholder="请输入名称" aria-describedby="basic-addon1" type="text">
                            </div>
                        </div>
                        <div class="im col-xs-4"><!--下拉选择-->
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
                        <div class="im col-xs-4"><!--下拉选择-->
                            <em>是否</em>
                            <div class="sinput sradio">
                                <div class="sra">
                                    <input type="radio" name="radio">
                                    <em>是</em>
                                </div>
                                <div class="sra">
                                    <input type="radio" name="radio">
                                    <em>否</em>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="iline col-sm-12">
                        <div class="im col-xs-4"><!--下拉选择-->
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
                        <div class="im col-xs-4"><!--下拉选择-->
                            <em>筛选名称</em>
                            <div class="sinput">
                                <!-- <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i>全部</i>
                                    <span class="caret"></span>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenu3">
                                    <li><a href="#">选项 1</a></li>
                                    <li><a href="#">选项 2</a></li>
                                    <li><a href="#">选项 3</a></li>
                                    <li><a href="#">选项 4</a></li>
                                </ul> -->
                                <select class="dropdown-menu-select">
                                	<option value="all">全部</option>
									<option value="1">选项 1</option>
									<option value="2">选项 2</option>
									<option value="3">选项 3</option>
                                </select>
                            </div>
                        </div>
                        <div class="im col-xs-4"><!--下拉选择-->
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
                        <div class="im col-xs-4"><!--输入搜索-->
                            <em>导入</em>
                            <div class="sinput input-group">
                                <input class="form-control" placeholder="" aria-describedby="basic-addon2" type="text">
                                <span class="input-group-addon">
                                    <i class="fa fa-upload"></i>
                                </span>
                            </div>
                        </div>
                        <div class="im col-xs-4"><!-- 日期控件 -->
                            <em>日期</em>
                            <div class="sinput cdate">
                                <input class="easyui-datebox" style="width: 100%!important;"/>
                            </div>

                        </div>
                        <div class="im col-xs-4"><!--输入搜索-->
                            <em>搜索</em>
                            <div class="sinput input-group">
                                <input class="form-control" placeholder="请输入名称" aria-describedby="basic-addon2" type="text">
                                <span class="input-group-addon" id="basic-addon2">
                                    <i class="fa fa-search"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="iline col-sm-12">
                        <div class="im col-xs-12"><!-- 点选 -->
				            <em>复选</em>
				            <div class="sinput scheck" style="width: 787px;">
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
				                <div class="sra left">
				                    <input type="checkbox">
				                    <em>选项4</em>
				                </div>
				                <div class="sra right">
				                    <input type="checkbox">
				                    <em>选项5</em>
				                </div>
				                <div class="sra right">
				                    <input type="checkbox">
				                    <em>选项6</em>
				                </div>
				            </div>
				
				        </div>
                    </div>
                </div>
                <div class="ibtn">
                    <div class="sbtn">
                        <button class="bggray">重置</button>
                        <button class="orange">确定</button>
                    </div>
                </div>
            </div>
			
			<!--EasyUI表格筛选-->
	        <div class="zoperate">
	        		<!-- <i class="">查找</i>
	        		<i class="showEditDialog">修改</i>
	        		<i class="showDelDialog">删除</i>
	        		<i class="showAddDialog">增加</i> -->
	        </div>
	        <!--EasyUI表格筛选--End-->
	        
			<!--EasyUI表格-->
	        <div class="ztable" id="bizEntityTable">
	            <table id="dg"></table>
	        </div>
	        <!--EasyUI表格--End-->
        </div>
        
        <div id="dialog"></div>
        <div id="formDataCache" type="hidden"></div>
        
    </div>
</div>
<!--主要内容container--End-->
<!--主体内容main--End-->


<script src="assets/js/jquery-1.11.3.min.js"></script>
<script src="assets/js/jquery.easyui.min.js"></script>
<script src="assets/js/bootstrap.min.js"></script>
<script src="assets/js/bootstrap-dialog.js"></script>
<script src="assets/js/jquery.form.js"></script>


<!--ui js-->
<script src="ui/js/index.js"></script>
<script src="ui/js/layout.js"></script>
<script src="ui/js/style.js"></script>


</body>
</html>
