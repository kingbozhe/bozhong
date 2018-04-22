<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String parId = request.getParameter("currId");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <%-- <base href="<%=basePath%>"> --%>
    
    <title>评分组管理</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<!-- 框架JS-->
	<script type="text/javascript" src="assets/js/jquery-1.11.3.min.js"></script>
	<script src="assets/js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="assets/js/easyui-lang-zh_CN.js"></script>
	
	<!-- 框架CSS  -->
	<link rel="stylesheet" type="text/css" href="assets/css/common.css" />
	<link rel="stylesheet" type="text/css" href="assets/css/easyui.css" />
	<link rel="stylesheet" type="text/css" href="assets/css/icon.css" />
	
	<!-- <script src="ui/js/group.js"></script> -->
	
	
	<style type="text/css">
        .ftitle{
            font-size:14px;
            font-weight:bold;
            padding:5px 0;
            margin-bottom:10px;
            border-bottom:1px solid #ccc;
        }
        .fitem{
            margin-bottom:5px;
        }
        .fitem label{
            display:inline-block;
            width:80px;
        }
        .fitem input{
            width:160px;
        }
	</style>
	<script type="text/javascript">
	var currOperNodeId = "<%=parId%>";
	var groupWeightArr= [];//存储当前设置的评分组的权重
	
	$(function(){

		$('#estimateGroup').datagrid({
			/* idField:'id' ,	 */
			title:'评分组管理' ,//没有内容，就会少一个div的标题内容
			//width:1300 ,
			fit:true ,
			height:420 ,
			singleSelect:false,
			//queryParams:{idd:'dd',nnn:'ff'},传入更灵活的参数
			url:'/DAMS/EC/groupQuery?parID = 1' ,
			fitColumns:true ,
			rownumbers:false,//显示序号，默认是true
			selectOnCheck: true,
			checkOnSelect: true,
			striped: true ,					//隔行变色特性 
			//nowrap: false ,				//折行显示
			loadMsg: '数据正在加载,请耐心的等待...' ,
			//rownumbers:true ,
			rowStyler: function(index ,record){
			} ,
			frozenColumns:[[//冻结列特性 ,不要与fitColumns 特性一起使用 
				{
					field:'ck' ,
					width:30 ,
					checkbox: true
				}
			]],
			columns:[[
				{
					field:'GROUP_ID' ,
					title:'评分组ID' ,
					width:60 ,
					align:'center',
					hidden: false
				},
				{
					field:'GROUP_NAME' ,
					title:'评分组名称' ,
					width:100 ,
					align:''
				},
				{
					field:'GROUP_DESC' ,
					title:'评分组描述' ,
					width:300 ,
					align:''
				},
				{
					field:'WEIGHT' ,
					title:'实际权重' ,
					width:50 ,
					hidden: false
				},
				{
					field:'DIS_WEIGHT' ,
					title:'分配权重' ,
					width:50 ,
					hidden: false
				},{
					field:'START_DT' ,
					title:'创建日期' ,
					width:110 ,
					hidden: false,
					formatter:function(value , record , index){
						/* var str = value.substring(0,19);
						return str; */
					}
				}
			]] ,
			
			toolbar:[
			 {  
                 text:'新增',iconCls:'icon-edit',handler:estimateGroupAddPop
             },{
	             text:'删除',iconCls:'icon-cancel',handler:estimateGroupDelete
             },{
	             text:'修改',iconCls:'icon-search',handler:estimateGroupInit  
             },{
	             text:'查看',iconCls:'icon-search',handler:estimateGroupDetail 
             },{
	             text:'权重设置',iconCls:'icon-edit',handler:setGroupWeight 
             }
            ],  
			pagination: true , 
			pageSize: 10 ,
			pageList:[10,15,20,50]
	});//table data init block
	
	$('#searchbtn').click(function(){
		$('#estimateGroup').datagrid('reload',serializeForm($('#mysearch')));
	});
	
});//jquery init block

//表单字段信息的收集
function serializeForm(form){
	var obj = {};
	$.each(form.serializeArray(),function(index){
		//下面的this是一个表单域的对象
		if(obj[this['name']]){
			obj[this['name']] = obj[this['name']] + ','+this['value'];
		} else {
			obj[this['name']] =this['value'];
		}
	});
	return obj;
}
//评分组查看
function estimateGroupDetail(){
	
	var rows = $("#estimateGroup").datagrid("getSelections");
	if (rows==null || rows==""){
		$.messager.alert("提 示","请选择需要查看的记录！","icon-cancel");
		return false;
	}
	if(rows.length>1){
		$.messager.alert("提 示","只能查看单条记录！","icon-cancel");
		return false;
	}
	$("#estimateGroupDetailForm").form("clear");
    var row = $("#estimateGroup").datagrid("getSelected");
    if (row){
        $("#estimateGroupDetailDiv").dialog("open").dialog("setTitle","评分组信息");
        $("#estimateGroupDetailForm").form('load',row);
    }
}

function setGroupWeight(){

	var rows = $("#estimateGroup").datagrid("getSelections");
		
	if (rows==null || rows==""){
		$.messager.alert("提 示","请选择需要的记录！","icon-cancel");
		return false;
	}
    var rowArr = $("#estimateGroup").datagrid("getSelections");
    var groupIds=[];
    for(var i=0;i<rowArr.length;i++){
    	groupIds.push(rowArr[i].GROUP_ID);
    }
   	
   	$("#setGroupWeightDiv").dialog("open").dialog("setTitle","评分组权重设置");
   	//加载数据
	$('#groupWeight').datagrid({
           width: 'auto',  
           height: "380",//auto的话表格高度会随着数据的变化而变化               
           striped: true,  
           singleSelect : true,  
           url: '<%=request.getContextPath()%>/EC/ECGroup',
            queryParams:{groupIds:groupIds.join("#")},  
            loadMsg:'数据加载中请稍后……',  
            pagination: true,  
            rownumbers: false,     
            columns:[[
                {field:'GROUP_ID',title: '评分组ID',align: 'center',width: 80,hidden:false},
                {field:'GROUP_NAME',title: '评分组名称',align: 'center',width: 210,hidden:false},  
                {field:'WEIGHT',title: '实际权重',align: 'center',width: 70},
                {field:'DIS_WEIGHT',title: '分配权重',align: 'center',width: 70,formatter:function(value , record , index){
					var str = "<input type='text' id='"+record.GROUP_ID+"' value='"+value+"' onblur='modifyDisWeight(this)' />";
					return str;
				}}
            ]],
            pagination: true , 
			pageSize: 100 ,
            pageList:[100,150,200,500]
        }); 
}


	function modifyDisWeight(obj){
       		
       		var nodeArr = obj.id+"@"+obj.value;
       		var exist = false;
     		var index;
     		//需要遍历所有的节点，才知道当前校验的节点是否已经设置过权重
     		//id@disweight
     		//数据第一位存储的是评分组的id，所以要从第二位开始校验
     		for(var k = 0;k<groupWeightArr.length;k++){
     			if(groupWeightArr[k].split("@")[0]==obj.id){
					exist = true;
					index = k;
   				}
   			}
			if(exist){
				//已经设置过节点的权重信息，这里就要覆盖，而不是重新添加
				groupWeightArr[index] = nodeArr;
			}else{
				groupWeightArr.push(nodeArr);
			}
       		//alert(groupWeightArr);
       }
       
       //设置过的评分组总和不能超过1
        function groupWeightCheck(){
        alert("hello world");
       		var weight=0;
       		for(var k = 0;k<groupWeightArr.length;k++){
       			weight = parseFloat(weight) + parseFloat(groupWeightArr[k].split("@")[1]);
   			}
   			weight = parseFloat(weight.toFixed(4));
   			if(weight >1){
   				$.messager.alert("提示","评分组的分配权重之和不能超过1！","icon-ok");
   				return ;
   			}
   			
   			$.post('<%=request.getContextPath()%>/EC?method=updateGroupWeight',{groupWeight:groupWeightArr.join(","),currNodeId:currOperNodeId},
           		function(result){
	            	$.messager.alert("提示",result.resultInfo,"icon-ok");
	            	$("#groupWeight").datagrid('reload');
	            	groupWeightArr = [];//更新了权重之后需要置空已经修改过的评分组权重
             },'json');
   			
       }
       
            
function estimateGroupAddPop(){
	$("#estimateGroupAddDiv").dialog("open").dialog("setTitle","评分组新增");
	//$("#estimateGroupAddForm").form("clear");会清除hidden的数据
}

function estimateGroupAdd(oper){

    $("#estimateGroupAddForm").form('submit',{
        url: '<%=request.getContextPath()%>/EC/add?operFlag='+oper,
        onSubmit: function(){
        	//表单提交之前进行校验
        	return $(this).form('validate');
        },
        success: function(result){
            //转换成JSON大对象
          	var result = eval('('+result+')');
          	$.messager.alert("提示",result.resultInfo,"icon-ok");
            $("#estimateGroupAddDiv").dialog('close');        // close the dialog
            $("#estimateGroup").datagrid('reload');    // reload the user data
            //重新加载左边的树
            self.parent.frames["treeLeft"].reloadTree(currOperNodeId);
        }
    });
}

//评分组修改初始化
function estimateGroupInit(){
	var estimateGroupNos = [];
	var rows = $("#estimateGroup").datagrid("getSelections");
	if (rows==null || rows==""){
		$.messager.alert("提 示","请选择需要修改的记录！","icon-cancel");
		return false;
	}
	if(rows.length>1){
		$.messager.alert("提 示","只能修改单条记录！","icon-cancel");
		return false;
	}
	
	var row = $("#estimateGroup").datagrid("getSelected");
    if (row){
    	$("#estimateGroupEditDiv").dialog("open").dialog("setTitle","评分组修改");
    	$("#estimateGroupEditForm").form("load",row);
    }
}

//评分组修改
function estimateGroupModify(oper){
	
	$("#estimateGroupEditForm").form('submit',{
        url: '<%=request.getContextPath()%>/EC/updateGroup',
        onSubmit: function(param){
        	//除了表单的元素，再提交自定义的参数
            return true;
        },
        success: function(result){
        
          	var result = eval('('+result+')');
            if (result.resultFlag=="fail"){
                $.messager.alert("错误提示",result.resultInfo,"icon-close");
            } else {
            	$.messager.alert("成功提示",result.resultInfo,"icon-ok");
                $("#estimateGroupEditDiv").dialog("close");  
                $("#estimateGroup").datagrid("reload");
                //self.parent.frames["treeLeft"].reloadTree(currOperNodeId);
            }
        }
    });
}

//删除评分组
function estimateGroupDelete(){
	var estimateGroupNos = [];
	var rows = $("#estimateGroup").datagrid("getSelections");
	if (rows==null || rows==""){
		$.messager.alert("提 示","请选择需要删除的记录！","icon-cancel");
		return false;
	}
	for(var i=0;i<rows.length;i++){
		estimateGroupNos.push(rows[i].GROUP_ID);
	}
    if (estimateGroupNos){
        $.messager.confirm("确认","确定删除所选择的记录吗?",function(r){
            if (r){
            	//这里传入json参数格式为{issueNoParams:issueNos.join(",")}，issuesNos是数组，一定要拼接成字符串
            	$.post('<%=request.getContextPath()%>/EC/deleteGroup',
            	{estimateGroupNoParams:estimateGroupNos.join(",")},
            	function(result){
		            	$.messager.alert("提示",result.resultInfo,"icon-ok");
		                $("#estimateGroup").datagrid("reload");
		                //删除之后刷新左侧frame页面里面的树
		                //self.parent.frames["treeLeft"].reloadTree(currOperNodeId);
                },'json');
            }
        });
    }
}



</script>
  </head>
  
  <body>
	<body>
	<div id="lay" class="easyui-layout" style="width: 100%;height:100%" >
		<div region="north" title="条件过滤" collapsed=false style="height:60px;padding-top:5px" >
			<form id="mysearch" method="post">&nbsp;&nbsp;&nbsp;&nbsp;
				<!-- 加入属性data-options="formatter:ww4,parser:w4" 修改控件默认的显示格式 -->
				评分组名称:<input name="groupName" class="easyui-validatebox" style="width:150px">&nbsp
				<a id="searchbtn" class="easyui-linkbutton" style="margin-left:20px">查询</a>
			</form>
		</div>
		<div region="center" >
			<table id="estimateGroup"></table>
		</div>
	</div>
	<!--新增评分组  -->
    <div id="estimateGroupAddDiv" class="easyui-dialog" style="width:450px;height:200px;padding:10px 20px"
            closed="true" buttons="#estimateGroupAdd_buttons">
        <div class="ftitle"></div><!-- 加入分组说明信息 -->
        <form id="estimateGroupAddForm" method="post">
        	<input name="par_GROUP_id" type="hidden" value="<%=parId%>">
	         <div class="fitem">
	              <label>评分组名称:</label><input name="GROUP_NAME" class="easyui-validatebox" required="true"><br/>
	              <label>评分组描述:</label>
	              <textarea name="GROUP_DESC" style="margin-left:-4px;height:60px;width:250px"></textarea>
	         </div>
        </form>
    </div>
    <!--修改评分组信息  -->
    <div id="estimateGroupEditDiv" class="easyui-dialog" style="width:450px;height:200px;padding:10px 20px"
            closed="true" buttons="#estimateGroupEdit_buttons">
        <div class="ftitle"></div>
         <form id="estimateGroupEditForm" method="post">
        	<input name="GROUP_ID" id="GROUP_ID" class="" type="hidden" value="">
            <div class="fitem">
            	<!-- 这里的name要和grid的field一致 -->
                <label>评分组名称:</label><input name="GROUP_NAME" class="easyui-textbox"><br>
                <label>评分组描述:</label>
                <textarea name="GROUP_DESC" style="margin-left:-4px;height:60px;width:250px"></textarea>
            </div>
        </form>
    </div>
    
    <div id="setGroupWeightDiv" class="easyui-dialog" closed="true"
	    	style="width:500px;height:450px;" buttons="#groupWeight_buttons">
			<div class="ftitle"><!-- title信息，根据增加和修改按钮动态变化 --></div>
			<table id="groupWeight"></table> 
	</div>
	<div id="groupWeight_buttons" style="text-align:center">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok" onclick="groupWeightCheck()" style="">权重确认</a>
    </div>
	
    <!-- 评分组的查看，所有的属性都是readonly的 -->
    <div id="estimateGroupDetailDiv" class="easyui-dialog" style="width:450px;height:300px;padding:10px 20px"
            closed="true" buttons="#estimateGroupDetail_btn">
        <div class="ftitle"><!-- title信息，根据增加和修改按钮动态变化 --></div>
        <form id="estimateGroupDetailForm" method="post">
            <div class="fitem">
            	<!-- 这里的name要和grid的field一致 -->
                <label>评分组ID:</label><input name="GROUP_ID" readonly class="easyui-textbox" readonly ><br/>
                <label>评分组名称:</label><input name="GROUP_NAME" readonly class="easyui-textbox" readonly><br/>
                <label>评分组描述:</label><textarea name="GROUP_DESC"  readonly style="margin-left:-4px;height:60px;width:250px"></textarea>
                <label>创建人:</label><input name="CREATE_OPER" readonly class="easyui-textbox" readonly><br/>
                <label>有效起期:</label><input name="START_DT" readonly class="easyui-textbox" readonly>
            </div>
        </form>
        <div id="estimateGroupDetail_btn" style="text-align:center">
	        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-undo" onclick="javascript:$('#estimateGroupDetailDiv').dialog('close')" style="">关闭</a>
	    </div>
    </div>
     <!-- 评分组增加的按钮 -->
    <div id="estimateGroupAdd_buttons" style="text-align:center">
    	<!-- a的style不能加入width，否则出现按钮有空隙的问题 -->
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok" onclick="estimateGroupAdd('submit')" style="">提 交</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-undo" onclick="javascript:$('#estimateGroupAddDiv').dialog('close')" style="">关 闭</a>
    </div>
    <!-- 评分组修改的按钮 -->
     <div id="estimateGroupEdit_buttons" style="text-align:center">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok" onclick="estimateGroupModify('submit')" style="">提 交</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-undo" onclick="javascript:$('#estimateGroupEditDiv').dialog('close')" style="">关 闭</a>
    </div>
       
  </body>
</html>
