<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
    <title>load</title>
    
</head>
<body>
	<a style="display: none" target="_blank" href="/DAMS/file/downloadfile.do?filePath=${dictionaryPath}&fileType=application/vnd.ms-excel&fileName=dictionary.xlsx"><span id="download">XX</span></a>
    <div class="forUploadTemplateFile" style="display: none">
	  	<form id="uploadForm"  enctype="multipart/form-data" target="frameFile">
	  	  	<input type="file" id="TemplatefileForLoad" name="file"/>
	  	  	<input id="templateFileSubmit" type="submit" value="上传文件"/>
	  	 </form>
	  	<input type="hidden" id="storeFileName"/>
	</div>
    <!--3-->
	<div class="import">
		<div class="itop">导入模块</div>
		<div class="imain">
			<div class="inline">
				<div class="ititle">类型</div>
				<div class="sinput sdrop iselect">
                     <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                         <i id="type">请选择</i>
                         <span class="caret"></span>
                     </button>
                     <ul class="dropdown-menu" aria-labelledby="dropdownMenu3">
                         <li data-value="dictionary"><a href="#">数据字典导入</a></li>
                     </ul>
                </div>
			</div>
			<div class="inline">
				<div class="ititle">系统</div>
				<div class="sinput sdrop iselect">
                     <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                         <i id="allApp">请选择</i>
                         <span class="caret"></span>
                     </button>
                     <ul class="dropdown-menu" aria-labelledby="dropdownMenu3">
                         <c:forEach items="${app}" var="item">
				            <li data-value="${item.APP_ID}"><a href="#"> ${item.APP_CN_NAME} </a></li>
				         </c:forEach>
                     </ul>
                </div>
			</div>
			<div class="inline">
				<div class="ititle">导入文件</div>
				<div class="input-group">
					<input type="text" class="form-control" id="fileName" disabled="disabled" >
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
	                    <i>全部</i>
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
	<!--4-->
	<div class="import">
		<div class="itop">导出模块</div>
		<div class="imain">
			<div class="inline">
				<div class="ititle">导出内容</div>
				<div class="sinput sdrop iselect">
                    <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i>请选择</i>
                        <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenu3">
                        <li data-value="dictionary"><a href="#">数据字典模板</a></li>
                    </ul>
                </div>
				<button class="igray" id="outDictionary">导出</button>
			</div>
		</div>
	</div>
	
	
  
  <script src="assets/js/jquery.form.js"></script>
  <script src="ui/js/load.js"></script>
  <script type="text/javascript">
    (function(){
        initLoadJsp();
    })();
    
  </script>
  
</body>
</html>
