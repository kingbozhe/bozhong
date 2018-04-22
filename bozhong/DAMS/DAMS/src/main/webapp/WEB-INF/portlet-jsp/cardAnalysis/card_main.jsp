<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
    String roleId = request.getParameter("roleId");
    String branchId = request.getParameter("branchId");
    String branchLevel = request.getParameter("branchLevel");
    String userId = request.getParameter("userId");
    request.getSession().setAttribute("roleId", roleId);
    request.getSession().setAttribute("branchId", branchId);
    request.getSession().setAttribute("branchLevel", branchLevel);
    request.getSession().setAttribute("userId", userId);
%>
<html>
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="assets/css/common.css"/>
    <link rel="stylesheet" type="text/css" href="assets/css/easyui.css"/>
    <link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="assets/css/font-awesome.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" type="text/css" href="assets/css/icon.css"/>
    <link rel="stylesheet" type="text/css" href="ui/css/scorecard.css"/>
    <link rel="stylesheet" href="assets/css/jquery.jOrgChart.css"/>
    <title>评分卡结果分析与展示</title>
</head>
<body style="background: transparent">
<div class="scorecard">
    <!--评分卡切换TAB-->
    <ul>
        <li class="cardlink orange active">
            <img src="ui/images/icon-1.png" width="18" height=""/>平衡树
            <i class="fa fa-caret-down"></i>
        </li>
        <li class="cardlink blue">
            <img src="ui/images/icon-2.png" width="18" height=""/>趋势图
            <i class="fa fa-caret-down"></i>
        </li>
        <li class="cardlink green">
            <img src="ui/images/icon-3.png" width="18" height=""/>雷达图
            <i class="fa fa-caret-down"></i>
        </li>
        <!-- <li class="cardlink red">
            <img src="ui/images/icon-4.png" width="18" height=""/>仪表图
            <i class="fa fa-caret-down"></i>
        </li> -->
    </ul>
    <!--评分卡切换DIV-->
    <div class="cards">
        <div class="icard" id="icard-1" style="display: block;">
            <div class="ifilter">
                <%--<form id="estimateGroupEditForm" method="post">--%>
                    <div>
                        <div class="im">
                            <em>检查日期：</em>
                            <input name="check_date" id="check_date" class="easyui-datebox" value="" style="width:120px"/>
                        </div>
                        <div class="im">
                            <em>评分卡：</em>
                            <input id="ESTIMATE_CARD_INFO" name="ESTIMATE_CARD_INFO" class="easyui-combobox" valueField="ID" textField="NAME">
                        </div>
                        <div class="im">
                            <em>机构：</em>
                            <input id="ORG_INFO" name="ORG_INFO" class="easyui-combobox" valueField="BRANCH_ID" textField="BRANCH_NAME" style="width:240px">
                        </div>
                    </div>
                    <!-- 当前节点folder_id -->
                    <input name="nodeIdDown" id="nodeIdDown" type="hidden" value="" style="width:120px"/>
                    <div>
                        <button id="searchbtn" class="orange">查询</button>
                    </div>
                <%--</form>--%>
            </div>
            <div id="bodyId" class="zybox">
                <div id="ruleScoreTableDiv" class="easyui-dialog" closed="true"
                     style="width:700px;height:450px;" buttons="#card_tree_buttons">
                    <div class="ftitle"><!-- title信息，根据增加和修改按钮动态变化 --></div>
                    <table id="ruleScoreTable"></table>
                </div>
                <div id="allBelowOrgScoreDiv" class="easyui-dialog" closed="true"
                     style="width:700px;height:505px;" buttons="#allBelowOrgScoreButtons">
                    <div class="ftitle"><!-- title信息，根据增加和修改按钮动态变化 --></div>
                    <table id="allBelowOrgScoreTable"></table>
                </div>

                <div id="allBelowOrgScoreButtons" style="text-align:center">
                    <button id="export" class="orange" iconCls="icon-ok"
                       style="">下 载</button>
                    <button class="bggray" iconCls="icon-undo"
                       onclick="javascript:$('#allBelowOrgScoreDiv').dialog('close')" style="">关 闭</button>
                </div>

                <div id="allBelowOrgScoreDiv2" class="easyui-dialog" closed="true"
                     style="width:700px;height:415px;" buttons="#card_tree_buttons">
                    <div class="ftitle"><!-- title信息，根据增加和修改按钮动态变化 --></div>
                    <table id="allBelowOrgScoreTable2"></table>
                </div>
            </div>
        </div>
        <div class="icard" id="icard-2">
            <div class="ifilter">
                <%--<form id="tendCardSearch" method="post">--%>
                    <div class="im">
                        <em>日期：</em>
                        <input type="text" id="tendBeginDateCard" name="beginDateCard" class="easyui-datebox" value="" style="width:120px">
                        ~
                        <input type="text" id="tendEndDateCard" name="endDateCard" class="easyui-datebox" value="" style="width:120px">
                    </div>
                    <div class="im">
                        <em>评分卡：</em>
                        <input id="tendESTIMATE_CARD_INFOCard" name="ESTIMATE_CARD_INFOCard" class="easyui-combobox" valueField="ID" textField="NAME" style="width:120px">
                    </div>
                    <div class="im">
                        <em>机构 ：</em>
                        <input id="tendOrg_id" name="org_id" class="easyui-combobox" valueField="BRANCH_ID" textField="BRANCH_NAME" style="width:120px">
                    </div>
                    <div>
                        <button id="cardTend" class="orange">查询</button>
                    </div>
                <%--</form>--%>
            </div>
            <div class="iscroll">
                <div id="cardGroupDiv" style="height:auto;">
                    <table id='cardGroupDetail'></table>
                </div>
                <%--<div class="intitle"></div>--%>
                <div class="incontent" style="height: auto;">
                    <div id="cardOrgTend" class=""></div>
                </div>
            </div>
        </div>
        <div class="icard" id="icard-3">
            <div class="ifilter">
                <%--<form id="polarmysearch" method="post">--%>
                    <div class="im">
                        <em>日期：</em>
                        <input id="polardataSysBeginDate" name="dataSysBeginDate" class="easyui-datebox" value="" style="width:120px">
                    </div>
                    <div class="im">
                        <em>评分卡：</em>
                        <input id="polarESTIMATE_CARD_INFO" name="ESTIMATE_CARD_INFO" class="easyui-combobox" valueField="ID" textField="NAME" style="width:120px">
                    </div>
                    <div class="im">
                        <em>维度选择：</em>
                        <input id="polarDEMSELECT" name="DEMSELECT" class="easyui-combobox" valueField="DEMID" textField="DEMNAME" style="width:120px">
                    </div>
                    <div class="im">
                        <em>机构：</em>
                        <input id="polarorg_info" name="org_info" class="easyui-combobox" valueField="BRANCH_ID" textField="BRANCH_NAME" style="width:120px">
                    </div>
                    <input id="polardimension" name="dimension" type="hidden" value="">
                    <div>
                        <button id="polardataSysQuery" class="orange">查询</button>
                    </div>
                <%--</form>--%>
            </div>
            <div class="iscroll">
                <div class="">
                    <div class="incontent">
                        <div id="polardetailDiv">
                            <!-- <form id="mysearch1" method="post">
                                 日期：<input id = "dataSysBeginDate1" name="dataSysBeginDate"class="easyui-datebox" style="width:100px;" value="">
                                评分卡：<input id = "ESTIMATE_CARD_INFO1" name="ESTIMATE_CARD_INFO" class="easyui-combobox" valueField="ID" textField="NAME" >
                                 <a id="dataSysQuery1" class="easyui-linkbutton" style="margin-left:0px">查询</a>
                         </form> -->
                            <table id="polardetailScore"></table>
                        </div>
                    </div>
                </div>
				<div class="">
                    <div class="incontent">
                        <div id="polarcontainer"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="icard" id="icard-4">
            <div class="ifilter">
                <%--<form id="mysearch" method="post">--%>
                    <div class="im">
                        <em>日期：</em>
                        <input id="dataSysBeginDate" name="dataSysBeginDate" class="easyui-datebox" style="width:100px;" value="">
                    </div>
                    <div class="im">
                        <em>评分卡：</em>
                        <input type="text" id="cardText" value="">
                    </div>
                    <input type="hidden" id="cardVal" style="" value="">
                    <div>
                        <button id="dataSysQuery" class="orange">查询</button>
                    </div>
                    <!-- 评分卡：<input id="ESTIMATE_CARD_INFO" name="ESTIMATE_CARD_INFO" class="easyui-combobox" valueField="ID" multiple = "true" textField="NAME" >-->

                    <!-- <select id="ESTIMATE_CARD_INFO" name="ESTIMATE_CARD_INFO" class="" style="width:100px;height:21px" multiple="multiple" ></select> -->
                <%--</form>--%>
            </div>
            <div class="iscroll">
                <div class="col-md-12" id="gaugeDiv">
                    <div id="container0" class="idashboard"></div>
                    <div id="container1" class="idashboard"></div>
                    <div id="container2" class="idashboard"></div>
                    <div id="container3" class="idashboard"></div>
                    <div id="container4" class="idashboard"></div>
                    <div id="container5" class="idashboard"></div>
                    <div id="container6" class="idashboard"></div>
                    <div id="container7" class="idashboard"></div>

                    <div id="orgScoreDiv" class="easyui-dialog" closed="true"
                         style="width:700px;height:450px;" buttons="#orgScore_buttons">
                        <div class="ftitle"><!-- title信息，根据增加和修改按钮动态变化 --></div>
                        <table id="orgScore"></table>
                    </div>
                    <!-- <div id="orgScore_buttons" style="text-align:center">
                            <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-undo" onclick="javascript:$('#cardSelDiv').dialog('close')" style="">取 消</a>
                     </div> -->
                    <div id="cardSelDiv" class="easyui-dialog" style="width:400px;height:400px;padding:5px 20px"
                         closed="true" buttons="#card_buttons">
                        <div class="ftitle"></div>
                        <div class="fitem">
                            <select id="cardSel" name="cardSel" class="" multiple="multiple" style="width: 120px">
                            </select><br>
                            说明：按住Ctrl进行多选
                        </div>
                    </div>
                    <div id="card_buttons" style="text-align:center;height:40px">
                        <button class="orange" iconCls="icon-ok" onclick="ZYgauge.selectCard()"
                           style="">确 定</button>
                        <button class="bggray" iconCls="icon-undo"
                           onclick="javascript:$('#cardSelDiv').dialog('close')" style="">取 消</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="assets/js/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="assets/js/jquery.easyui.min.js"></script>
<script type="text/javascript" src="assets/js/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="assets/js/jquery.jOrgChart.js"></script>
<script type="text/javascript" src="assets/js/highstock.js"></script>
<script type="text/javascript" src="assets/js/highcharts-more.js"></script>
<script type="text/javascript" src="ui/js/scorecard.js"></script>
<script src="ui/js/layout.js"></script>
<script>
    var WebPath = '<%=path%>';
    var branchLevel = '<%=branchLevel%>';
    var jobId = '${jobId}';
    var planId = '${planId}';
	ZYcard.init(jobId,planId);
	//alert("www");
    $(".cardlink").click(function () {
        $(".icard").hide();
        $(".cardlink").removeClass("active");
        switch ($(this).index()) {
            case 0:
                ZYcard.init(jobId,planId);
                $(".cardlink:eq(0)").addClass("active");
                $(".icard:eq(0)").show();
                break;
            case 1:
                ZYtend.init(jobId,planId);
                $(".cardlink:eq(1)").addClass("active");
                $(".icard:eq(1)").show();
                break;
            case 2:
                ZYpolar.init(jobId,planId);
                $(".cardlink:eq(2)").addClass("active");
                $(".icard:eq(2)").show();
                break;
            case 3:
                ZYgauge.init(jobId,planId);
                $(".cardlink:eq(3)").addClass("active");
                $(".icard:eq(3)").show();
                break;
        }
    });
</script>
</body>
</html>