<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<% String path = request.getContextPath();%>
<html>
<head>
<link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="assets/css/bootstrap-dialog.css" rel="stylesheet" type="text/css">
    <link href="assets/css/font-awesome.css" rel="stylesheet" type="text/css">
    <link href="assets/css/easyui.css" rel="stylesheet" type="text/css">
    <link href="assets/css/daterangepicker.css" rel="stylesheet" type="text/css">
    <!--自定义的放这-->
    <link href="ui/css/kit.css" rel="stylesheet" type="text/css">
    <link href="ui/css/comm.css" rel="stylesheet" type="text/css">
    <script src="assets/js/jquery-1.11.3.min.js"></script>
<script src="assets/js/jquery.easyui.min.js"></script>

<script src="assets/js/jquery.form.js"></script>

<script>
$(document).ready(function(){
	var app_id = $(" #app_id ").val();
	$.ajax({
		url : "/DAMS/SHOW/difference1",
		type : "GET",
		dataType : "json",
		contentType : 'application/json;charset=UTF-8',
		success : function(data) {
			var dat = eval(data);
			

			var first = [ {field:'first',title:'数据字典',colspan:7,width:700},
			              {field:'second',title:'元数据',colspan:7,width:700}
            			];
			

			var second = [];
			for(var i = 0; i < dat.length; i ++){
				var map = {};
				var arr = dat[i].split('@');
				
				map.field = arr[0];
				map.title=arr[1];
				map.width = 103;
				second.push(map);
				}

            
			$('#tt').datagrid({
			    url: "/DAMS/SHOW/difference2?APP_ID="+app_id,
			    method: 'get',
			    pagination: true,
			    total: 2000,
			    pageSize: 10,
			    fitColumns: false,
			    rownumbers: true,
			    idField: 'Project_id',
			    columns: [first,second],
			    onLoadSuccess:function(){
		        	var trs = $(this).prev().find('div.datagrid-body').find('tr');
		        	var tr;
		        	for(var i = 0; i < trs.length; i ++){
		        		
		        		tr = trs[i];
		        		for(var j = 0; j < tr.cells.length;j++){
		        			
		        				tr.cells[j].style.cssText = 'background:#fff;color:#000';
		        		        
		        				if(j <7 && tr.cells[j].childNodes[0].innerHTML!=tr.cells[j+7].childNodes[0].innerHTML){
		        					if(tr.cells[j].childNodes[0].innerHTML==""){

		        						tr.cells[j].style.cssText = 'background:#E1E100;color:#fff';
		        					}else if(tr.cells[j+7].childNodes[0].innerHTML==""){
		        						tr.cells[j].style.cssText = 'background:#6FB7B7;color:#fff';
		        					}else{
		        						tr.cells[j].style.cssText = 'background:#0080FF;color:#fff';
		        					}
		        					
		        				
		        				}
		        				if(j >=7 && tr.cells[j].childNodes[0].innerHTML!=tr.cells[j-7].childNodes[0].innerHTML){
		        					tr.cells[j].style.cssText = 'background:#888;color:#fff';
		        				
		        				}
		        			
		        		}
		        	}
				    }
			});
			},
		error : function(e) {
				console.log("erroree");
			}
		});
})

			
			
	

	

	
</script>
</head>
<body>
 <table id="tt" width:1400></table> 
 <input id="app_id" value='${APP_ID }' type="hidden"> 
 </body>
</html>
