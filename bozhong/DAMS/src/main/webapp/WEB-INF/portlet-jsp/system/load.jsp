<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>load</title>
    <!-- <link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="assets/css/bootstrap-dialog.css" rel="stylesheet" type="text/css">
    <link href="assets/css/bootstrap-select.min.css" rel="stylesheet" type="text/css">
    <link href="assets/css/font-awesome.css" rel="stylesheet" type="text/css">
    <link href="assets/css/easyui.css" rel="stylesheet" type="text/css">
    <link href="ui/css/kit.css" rel="stylesheet" type="text/css">
    <link href="ui/css/comm.css" rel="stylesheet" type="text/css"> -->
    
</head>
<body>
	<div class="forUploadTemplateFile" style="display: none">
	  	<form id="uploadForm"  enctype="multipart/form-data" target="frameFile">
	  	  	<input type="file" id="TemplatefileForLoad" name="file"/>
	  	  	<input id="templateFileSubmit" type="submit" value="上传文件"/>
	  	 </form>
	  	<input type="hidden" id="storeFileName"/>
	</div>
	
	<div class="forTemplateFile" style="display: none">
	  	<form id="uploadForm2"  enctype="multipart/form-data" target="frameFile">
	  	  	<input type="file" id="TemplateValuefile" name="file"/>
	  	  	<input id="TemplateValuefileSubmit" type="submit" value="上传文件"/>
	  	 </form>
	  	<input type="hidden" id="storeFileName2"/>
	</div>
    <!--1-->
	<div class="import">
		<div class="itop">导入模块</div>
		<div class="imain">
			<div class="inline">
				<div class="ititle">导入文件</div>
				<div class="input-group">
					<input type="text" class="form-control" id="fileName" disabled="disabled">
					<span class="input-group-btn">
				    	<button class="btn btn-default" type="button" id="findFile">浏览</button>
				    </span>
				</div> 
				<button class="iorange" id="uploadTrigger">上传</button>
				<div class="zresult" id="zresult"></div>
			</div>
			<div class="inline">
				<div class="ititle">导入方式</div>
				<div class="sinput sdrop iselect">
                    <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i>请选择</i>
                        <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenu3">
                        <li data-value="update"><a href="#">增量导入</a></li>
                        <li data-value="del"><a href="#">全量导入</a></li>
                    </ul>
                </div>
				<button class="igray" id="importData">入库</button>
			</div>
		</div>
	</div>
	<!--2-->
	<div class="import" style="display: none;">
		<div class="itop">导出模块</div>
		<div class="imain">
			<div class="inline">
				<div class="ititle">导出方式</div>
				<div class="sinput sdrop iselect">
                     <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                         <i>全部</i>
                         <span class="caret"></span>
                     </button>
                     <ul class="dropdown-menu" aria-labelledby="dropdownMenu3">
                         <li data-value="update"><a href="#">增量导入</a></li>
                         <li data-value="del"><a href="#">全量导入</a></li>
                     </ul>
                </div>
			</div>
			<div class="inline">
				<div class="ititle">导出内容</div>
				<div class="sinput sdrop iselect">
                    <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
				<button class="igray">导出</button>
			</div>
		</div>
	</div>
    <!--3-->
	<div class="import">
		<div class="itop">配置模板导入模块</div>
		<div class="imain">
			<div class="inline">
				<div class="ititle">导入文件</div>
				<div class="input-group">
					<input type="text" class="form-control" id="fileName2" disabled="disabled">
					<span class="input-group-btn">
				    	<button class="btn btn-default" type="button" id="findFile2">浏览</button>
				    </span>
				</div> 
				<button class="iorange" id="uploadTrigger2">上传</button>
				<div class="zresult2" id="zresult2"></div>
			</div>
			<div class="inline">
				<div class="ititle">首行内容</div>
				<div class="sinput sdrop iselect">
                    <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i>请选择</i>
                        <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenu3">
                        <li data-value="false"><a href="#">表字段</a></li>
                    </ul>
                </div>
				<button class="igray" id="importData2">入库</button>
			</div>
		</div>
	</div>
	<!-- <script src="assets/js/jquery-1.11.3.min.js"></script>
	<script src="assets/js/jquery.easyui.min.js"></script>
	<script src="assets/js/bootstrap.min.js"></script>
	<script src="assets/js/bootstrap-dialog.js"></script>
	<script src="assets/js/bootstrap-select.min.js"></script>
	<script src="assets/js/jquery.form.js"></script>
	<script src="assets/js/moment.js"></script>
	<script src="assets/js/daterangepicker.js"></script>
    <script src="ui/js/action.js"></script>  -->
    <script src="ui/js/load.js"></script>
    <script type="text/javascript">
	    (function(){
	        initLoadJsp();
	    })();
    
    </script>
</body>
</html>
