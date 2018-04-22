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
        <li class="cardlink orange">
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
        <li class="cardlink red">
            <img src="ui/images/icon-4.png" width="18" height=""/>仪表图
            <i class="fa fa-caret-down"></i>
        </li>
    </ul>
    <!--评分卡切换DIV-->
    <div class="cards">
        <div class="icard" id="icard-1" style="display: block;">
            <div class="ifilter">
                <form id="estimateGroupEditForm" method="post">
                    <div>
                        <div class="im col-xs-4">
                            <em>检查日期:</em>
                            <div><input name="check_date" id="check_date" class="easyui-datebox" value=""
                                        style="width:120px"/></div>
                        </div>
                        <div class="im col-xs-4">
                            <em>评分卡：</em>
                            <div><input id="ESTIMATE_CARD_INFO" name="ESTIMATE_CARD_INFO" class="easyui-combobox"
                                        valueField="ID" textField="NAME"></div>
                        </div>
                        <div class="im col-xs-4">
                            <em>机构：</em>
                            <div><input id="ORG_INFO" name="ORG_INFO" class="easyui-combobox" valueField="BRANCH_ID"
                                        textField="BRANCH_NAME" style="width:240px"></div>
                        </div>
                    </div>
                    <!-- 当前节点folder_id -->
                    <input name="nodeIdDown" id="nodeIdDown" type="hidden" value="" style="width:120px"/>
                    <div>
                        <a id="searchbtn" class="easyui-linkbutton">查询</a>
                    </div>
                </form>
            </div>
            <div id="bodyId" class="ibox">
                <div id="ruleScoreTableDiv" class="easyui-dialog" closed="true"
                     style="width:700px;height:450px;" buttons="#card_tree_buttons">
                    <div class="ftitle"><!-- title信息，根据增加和修改按钮动态变化 --></div>
                    <table id="ruleScoreTable"></table>
                </div>
                <div id="allBelowOrgScoreDiv" class="easyui-dialog" closed="true"
                     style="width:700px;height:450px;" buttons="#allBelowOrgScoreButtons">
                    <div class="ftitle"><!-- title信息，根据增加和修改按钮动态变化 --></div>
                    <table id="allBelowOrgScoreTable"></table>
                </div>

                <div id="allBelowOrgScoreButtons" style="text-align:center">
                    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok" onclick="exportData()"
                       style="">下 载</a>
                    <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-undo"
                       onclick="javascript:$('#allBelowOrgScoreDiv').dialog('close')" style="">关 闭</a>
                </div>

                <div id="allBelowOrgScoreDiv2" class="easyui-dialog" closed="true"
                     style="width:700px;height:450px;" buttons="#card_tree_buttons">
                    <div class="ftitle"><!-- title信息，根据增加和修改按钮动态变化 --></div>
                    <table id="allBelowOrgScoreTable2"></table>
                </div>
            </div>
        </div>
        <div class="icard" id="icard-2">
            <div class="ifilter">
                <form id="tendCardSearch" method="post">
                    <div class="im col-xs-6">
                        <em>日期：</em>
                        <div><input type="text" id="tendBeginDateCard" name="beginDateCard" class="easyui-datebox"
                                    value=""></div>
                        <em>~</em>
                        <div><input type="text" id="tendEndDateCard" name="endDateCard" class="easyui-datebox" value="">
                        </div>
                    </div>
                    <div class="im col-xs-3">
                        <em>评分卡：</em>
                        <div><input id="tendESTIMATE_CARD_INFOCard" name="ESTIMATE_CARD_INFOCard"
                                    class="easyui-combobox" valueField="ID" textField="NAME"></div>
                    </div>
                    <div class="im col-xs-3">
                        <em>机构 ：</em>
                        <div><input id="tendOrg_id" name="org_id" class="easyui-combobox" valueField="BRANCH_ID"
                                    textField="BRANCH_NAME"></div>
                    </div>
                    <div>
                        <a id="cardTend" class="easyui-linkbutton">查询</a>
                    </div>
                </form>
            </div>
            <div class="iscroll">
                <div class="col-md-12">
                    <%--<div class="intitle"></div>--%>
                    <div class="incontent">
                        <div id="cardOrgTend" class=""></div>
                    </div>
                </div>
                <div id="cardGroupDiv" style="height:100%;">
                    <table id='cardGroupDetail'></table>
                </div>
            </div>
        </div>
        <div class="icard" id="icard-3">
            <div class="ifilter">
                <form id="polarmysearch" method="post">
                    <div>
                        <em>日期：</em>
                        <div><input id="polardataSysBeginDate" name="dataSysBeginDate" class="easyui-datebox" value=""></div>
                    </div>
                    <div>
                        <em>评分卡：</em>
                        <div><input id="polarESTIMATE_CARD_INFO" name="ESTIMATE_CARD_INFO" class="easyui-combobox"
                                    valueField="ID" textField="NAME"></div>
                    </div>
                    <div>
                        <em>维度选择：</em>
                        <div><input id="polarDEMSELECT" name="DEMSELECT" class="easyui-combobox" valueField="DEMID"
                                    textField="DEMNAME"></div>
                    </div>
                    <div>
                        <em>机构：</em>
                        <div><input id="polarorg_info" name="org_info" class="easyui-combobox" valueField="BRANCH_ID"
                                    textField="BRANCH_NAME"></div>
                    </div>
                    <input id="polardimension" name="dimension" type="hidden" value="">
                    <div>
                        <a id="polardataSysQuery" class="easyui-linkbutton">查询</a>
                    </div>
                </form>
            </div>
            <div class="iscroll">
                <div class="col-md-12">
                    <div class="incontent">
                        <div id="polarcontainer"></div>
                    </div>
                </div>
                <div class="col-md-12">
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
            </div>
        </div>
        <div class="icard" id="icard-4">
            <div class="ifilter">
                <form id="mysearch" method="post">
                    <div>
                        <em>日期：</em>
                        <div><input id="dataSysBeginDate" name="dataSysBeginDate" class="easyui-datebox"
                                    style="width:100px;" value=""></div>
                    </div>
                    <div>
                        <em>评分卡：</em>
                        <div><input type="text" id="cardText" value=""></div>
                    </div>
                    <input type="hidden" id="cardVal" style="" value="">
                    <div>
                        <a id="dataSysQuery" class="easyui-linkbutton" style="margin-left:0px">查询</a>
                    </div>
                    <!-- 评分卡：<input id="ESTIMATE_CARD_INFO" name="ESTIMATE_CARD_INFO" class="easyui-combobox" valueField="ID" multiple = "true" textField="NAME" >-->

                    <!-- <select id="ESTIMATE_CARD_INFO" name="ESTIMATE_CARD_INFO" class="" style="width:100px;height:21px" multiple="multiple" ></select> -->
                </form>
            </div>
            <div class="iscroll">
                <div class="col-md-12" >
                    <div id="container0" class="" style="width:25%;float:left"></div>
                    <div id="container1" class="" style="width:25%;float:left"></div>
                    <div id="container2" class="" style="width:25%;float:left"></div>
                    <div id="container3" class="" style="width:25%;float:left"></div>
                    <div id="container4" class="" style="width:25%;float:left"></div>
                    <div id="container5" class="" style="width:25%;float:left"></div>
                    <div id="container6" class="" style="width:25%;float:left"></div>
                    <div id="container7" class="" style="width:25%;float:left"></div>

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
                            <select id="cardSel" name="cardSel" class="" multiple="multiple">
                            </select><br>
                            说明：按住Ctrl进行多选
                        </div>
                    </div>
                    <div id="card_buttons" style="text-align:center;height:40px">
                        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok" onclick="ZYgauge.selectCard()"
                           style="">确 定</a>
                        <a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-undo"
                           onclick="javascript:$('#cardSelDiv').dialog('close')" style="">取 消</a>
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
    $(".cardlink").click(function () {
        $(".icard").hide();
        switch ($(this).index()) {
            case 0:
                ZYcard.init();
                $(".icard:eq(0)").show();
                break;
            case 1:
                ZYtend.init();
                $(".icard:eq(1)").show();
                break;
            case 2:
                ZYpolar.init();
                $(".icard:eq(2)").show();
                break;
            case 3:
                ZYgauge.init();
                $(".icard:eq(3)").show();
                break;
        }
    });
</script>
</body>
</html>