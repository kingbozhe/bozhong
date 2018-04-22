//平衡树模块
var ZYcard = (function () {
    var init = function (jobId,planId) {
    	
        $.ajax({
            url: '/DAMS/CDA/getLatestCalDate?jobId='+jobId,
            type: "GET",
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (result) {
                if(result.success){
                    var maxDate = result.date;
                    if(maxDate==null){
                        maxDate = formatterDate(new Date());
                    }
                    $('#check_date').datebox('setValue', maxDate);
                    loadEstimateCard(maxDate,jobId,planId);
                }
            },
            error: function (e) {
                console.log("error");
            }
        });
        //var nodeCss = {"width":"160px","height":"120px"};
        //$(".jOrgChart .node").css(nodeCss);
        // $("#dataList").css("display", "none");
        //$('#check_date').datebox('setValue', formatterDate(new Date()));
    };

    $('#searchbtn').click(function () {
        queryCardTree(jobId,planId);
    });

    function formatterDate(date) {
        var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
        var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
            + (date.getMonth() + 1);
        return date.getFullYear() + '-' + month + '-' + day;
    }

    $("#export").click(function () {
        var row = $("#allBelowOrgScoreTable").datagrid('getSelected');
        if(row!==null){
            window.open("exportScoreDetail?nodeId="+$("#nodeIdDown").val()+"&planId="+planId+"&jobId="+jobId+"&branchId="+row.DQ_RSLT_ORG, '_self');
        }
    });

    //menu_list为json数据
    //parent为要组合成html的容器
    function showall(menu_list, parent) {
    	//alert(parent);
        for (var menu in menu_list) {
            if (menu_list[menu].CHILDREN != null) {
                //如果有子节点，创建一个子节点li
                var li = $("<li></li>");
                //将li的文本设置好，并马上添加一个空白的ul子节点，并且将这个li添加到父亲节点中
                $(li).append(" <a  href='javascript:void(0)' title='" + menu_list[menu].NAME 
                		+ "' onclick='ZYcard.allOrgDetail(" + menu_list[menu].ID + ")'>" +
                		menu_list[menu].NAME + "<br>实际得分:" + menu_list[menu].SCORE*100 + "<br>最高得分:" 
                		+ menu_list[menu].MAXSCORE*100 + "<br>得分占比:" 
                		+ (menu_list[menu].MAXSCORE > 0 ? (menu_list[menu].SCORE * 100 / menu_list[menu].MAXSCORE).toFixed(2) : '无') + "%</a>")
                    .append("<ul></ul>")
                    .appendTo(parent);
                //将空白的ul作为下一个递归遍历的父亲节点传入
                showall(menu_list[menu].CHILDREN, $(li).children().eq(1));
            } else {
                var nodeInfo = menu_list[menu].ID + "#" + menu_list[menu].NAME;
                //如果该节点没有子节点，则直接将该节点li以及文本创建好直接添加到父亲节点中
                $("<li></li>").append(" <a href='javascript:void(0)' title='" + menu_list[menu].NAME 
                		+ "' onclick='ZYcard.allOrgDetail(" + menu_list[menu].ID + ")'>" + menu_list[menu].NAME 
                		+ "<br>实际得分:" + menu_list[menu].SCORE + "<br>最高得分:" + menu_list[menu].MAXSCORE*100 
                		+ "<br>得分占比:" + (menu_list[menu].MAXSCORE > 0 ? (menu_list[menu].SCORE * 100 / menu_list[menu].MAXSCORE).toFixed(2) : '无') + "%</a>").appendTo(parent);
            }
        }
    }

    //查看机构当前节点直接下级的得分明细
    function allOrgDetail(nodeId) {
        var obj = event.srcElement;
        var check_date = $("#check_date").combo("getValue");;
        if (check_date == "") {
            $.messager.alert("提 示", "请选择检查日期！", "icon-cancel");
            return;
        }

        var ORG_INFO = $("#ORG_INFO").combo("getValue");
        if (ORG_INFO == "") {
            $.messager.alert("提 示", "请选择机构！", "icon-cancel");
            return;
        }

        $("#nodeIdDown").val(nodeId);
        $("#allBelowOrgScoreDiv").dialog("open").dialog("setTitle", obj.title);
        //加载数据

        $("#allBelowOrgScoreTable").datagrid({
            /* idField:'id' ,
             title:'评分组管理' , *///没有内容，就会少一个div的标题内容
            //width:1300 ,
            fit: false,
            height: 420,
            singleSelect: true,
            //queryParams:{idd:'dd',nnn:'ff'},传入更灵活的参数
            url: '/DAMS/CDA/searchBelowOrgScore?nodeId='+nodeId+'&rundate='+check_date+'&orgId='+ORG_INFO+'&jobId='+jobId+'&planId='+planId,
            method: 'GET',
            fitColumns: true,
            rownumbers: false,//显示序号，默认是true
            selectOnCheck: true,
            checkOnSelect: true,
            striped: true,					//隔行变色特性
            //nowrap: false ,				//折行显示
            loadMsg: '数据正在加载,请耐心的等待...',
            pagination: true,
            rownumbers: true,
            columns: [[
                {field: 'DQ_RSLT_ORG', title: '机构代码', align: 'center', width: 120, hidden: false},
                {
                    field: 'ORGNAME',
                    title: '机构名称',
                    align: 'center',
                    width: 300,
                    hidden: false,
                    formatter: function (value, record, index) {
                        return "<a title='" + record.DQ_RSLT_ORG + "#" + value + "' onclick='ZYcard.allOrgDetail2(" + nodeId + ")'>" + value + "</a>";
                    }
                },

                {field: 'SCORE', title: '得分', align: 'center', width: 120},
                {field: 'MAXSCORE', title: '最高得分', align: 'center', width: 120, hidden: true},
                {
                    field: 'RUNDATE',
                    title: '计算日期',
                    align: 'center',
                    width: 150,
                    formatter: function (value, record, index) {
                        //var str = value.substring(0,19);
                        return value;
                    }
                }

            ]]
        });
    }

    //查看所有下级当前节点的得分明细
    function allOrgDetail2(nodeId) {
        var obj = event.srcElement;
        var ORG_INFO = $("#ORG_INFO").combo("getValue");
        var clickOrg = obj.title.split("#")[0];
        var check_date = $("#check_date").combo("getValue");
        if (check_date == "") {
            $.messager.alert("提 示", "请选择检查日期！", "icon-cancel");
            return;
        }


        $("#allBelowOrgScoreDiv2").dialog("open").dialog("setTitle", obj.title.split("#")[1]);
        //加载数据
        $('#allBelowOrgScoreTable2').datagrid({
            width: 'auto',
            height: "380",//auto的话表格高度会随着数据的变化而变化
            striped: true,
            singleSelect: true,
            url: '/DAMS/CDA/searchChildrenOrgScore?nodeId='+nodeId+'&rundate='+check_date+'&orgId='+ORG_INFO+'&jobId='+jobId+'&planId='+planId,
            queryParams: {check_date: check_date, selOrg: clickOrg},
            loadMsg: '数据加载中请稍后……',
            pagination: true,
            rownumbers: true,
            columns: [[
                {field: 'DQ_RSLT_ORG', title: '机构代码', align: 'center', width: 120, hidden: false},
                {field: 'ORGNAME', title: '机构名称', align: 'center', width: 200, hidden: false},
                {field: 'SCORE', title: '得分', align: 'center', width: 120},
                {
                    field: 'RUNDATE',
                    title: '计算日期',
                    align: 'center',
                    width: 150,
                    formatter: function (value, record, index) {
                        //var str = value.substring(0,19);
                        return value;
                    }
                }

            ]]
        });
    }

    function clickLeafNode(nodeId) {
        var obj = event.srcElement;
        $("#ruleScoreTableDiv").dialog("open").dialog("setTitle", obj.title);
        var check_date = $("#check_date").combo("getValue");
        if (check_date == "") {
            $.messager.alert("提 示", "请选择检查日期！", "icon-cancel");
            return;
        }
        var ORG_INFO = $("#ORG_INFO").combo("getValue");
        if (ORG_INFO == "") {
            $.messager.alert("提 示", "请选择机构！", "icon-cancel");
            return;
        }

        //加载数据
        $("#ruleScoreTable").datagrid({
            width: 'auto',
            height: "380",//auto的话表格高度会随着数据的变化而变化
            striped: true,
            singleSelect: true,
            url: 'DAMS/CDA/searchRuleScore?nodeId=' + nodeId,
            queryParams: {check_date: check_date, selOrg: ORG_INFO},
            loadMsg: '数据加载中请稍后……',
            pagination: true,
            rownumbers: true,
            columns: [[
                {field: 'GROUP_ID', title: '评分组ID', align: 'center', width: 80, hidden: true},
                {field: 'CHECK_ID', title: '规则ID', align: 'center', width: 80},
                {field: 'SCORE', title: '规则得分', align: 'center', width: 140, hidden: false},
                {field: 'SYS_ID', title: 'schema', align: 'center', width: 80},
                {field: 'TABLE_NAME', title: '表名', align: 'center', width: 120},
                {field: 'CHECK_COLUMN_NAME', title: '字段名', align: 'center', width: 80},
                {
                    field: 'START_DT',
                    title: '创建日期',
                    align: 'center',
                    width: 200,
                    formatter: function (value, record, index) {
                        var str = value.substring(0, 19);
                        return str;
                    }
                },
                {field: 'CREATE_OPER', title: '创建人', align: 'center', width: 100}
            ]]
        });
    }

    //平衡树信息查询
    function queryCardTree(jobId,planId) {
        //功能插件，不能通过ID获得值
        var check_date = $("#check_date").combo("getValue");
        if (check_date == "") {
            $.messager.alert("提 示", "请选择检查日期！", "icon-cancel");
            return;
        }

        var selectCard = $("#ESTIMATE_CARD_INFO").combo("getValue");
        var cardInfo = selectCard.trim().replace("#", "@");

        if (selectCard == "") {
            $.messager.alert("提 示", "请选择评分卡！", "icon-cancel");
            return;
        }

        var ORG_INFO = $("#ORG_INFO").combo("getValue");
        if (ORG_INFO == "") {
            $.messager.alert("提 示", "请选择机构！", "icon-cancel");
            return;
        }

        $.ajax({
            url: '/DAMS/CDA/JSONJORG?check_date='+check_date+'&ESTIMATE_CARD_INFO='+cardInfo +'&ORG_INFO='+ORG_INFO+'&jobId='+jobId+'&planId='+planId,
            type: "GET",
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (result) {
                /* var result = eval('('+result+')');  */
            	
                //这里直接定义，那么每次加载时都会创建
                var html = $("#org").html();//得到ul里面的html代码
                if (html != null) {
                    $("#org").html("");//这里对org里面的标签内容进行了清空
                    var showlist = $("#org");
                    showall(result, showlist);
                    $("#bodyId").append(showlist);
                    $("div.jOrgChart").html("");//清除了里面的内容，但是div对象本身还是存在，会占用默认的页面空间
                    $("div.jOrgChart").remove();//真正清除页面上生成的div
                    //每次都会生成div
                    $("#org").jOrgChart();
                } else {
                    //第一次查询，需要生成一定的数据结构对象
                    var showlist = $("<ul id='org' style='display:none'></ul>");
                    showall(result, showlist);
                    //将生成好的固定格式的ul拼接到body,ul必须要依赖容器才能存在
                    $("#bodyId").append(showlist);
                    $("#org").jOrgChart();
                }
            },
            error: function (e) {
                console.log("error");
            }
        });
    }

    function loadEstimateCard(maxDate,jobId,planId) {
        $.ajax({
            url: '/DAMS/CDA/CTQuery?date='+maxDate+'&jobId='+jobId+'&planId='+planId,
            type: "GET",
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (result) {
                var rows = result.rows;
                //所属评分卡
                $('#ESTIMATE_CARD_INFO').combobox({
                    data: rows,
                    idField: 'ID', // value值字段
                    textField: 'NAME', // 显示的字段
                    fitColumns: true,
                    striped: true,
                    editable: false// 不可编辑，只能选择
                });
                //默认显示第一个
                $('#ESTIMATE_CARD_INFO').combobox("setValue", rows[0].ID);
                loadOrgInfo();
            },
            error: function (e) {
                console.log("error");
            }
        });


    }

    function loadOrgInfo() {

        $.ajax({
            url: '/DAMS/CDA/getOrgInfo',
            type: "GET",
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (result) {
                var rows = result.rows;
                //所属评分卡
                $('#ORG_INFO').combobox({
                    data: rows,
                    idField: 'BRANCH_ID', // value值字段
                    textField: 'BRANCH_NAME', // 显示的字段
                    fitColumns: true,
                    striped: true,
                    editable: false// 不可编辑，只能选择
                });
                $('#ORG_INFO').combobox("setValue", rows[0].BRANCH_ID);
                //评分卡，机构基础数据加载完毕之后再执行默认的初始化
                queryCardTree(jobId,planId);
            },
            error: function (e) {
                console.log("error");
            }
        });

    }

    var exportData = function () {
    	
        $("#estimateGroupEditForm").form('submit', {
            url: WebPath + '/CDA/exportScoreDetail',
            onSubmit: function (param) {
                //除了表单的元素，再提交自定义的参数
                return true;
            },
            success: function (result) {
                var result = eval('(' + result + ')');
            }
        });
        //会发生页面跳转
        //window.open(url,"","");
        //不会发生页面跳转
        //dataList.location.href="<%=request.getContextPath()%>/CDA/exportScoreDetail";
    };

    return {
        init: init,
        exportData: exportData,
        showall: showall,
        allOrgDetail: allOrgDetail,
        allOrgDetail2: allOrgDetail2
    }
})();

//趋势图模块
var ZYtend = (function () {
    var init = function (jobId,planId) {
    	
        loadEstimateCard(jobId,planId);
    };

    $('#cardTend').click(function () {
        getCardTendChart(jobId,planId);
    });

    function formatterDate(date) {
        var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
        var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
            + (date.getMonth() + 1);
        return date.getFullYear() + '-' + month + '-' + day;
    }

    function loadEstimateCard(jobId,planId) {
    	
        $.ajax({
            url: '/DAMS/CDA/CTQuery?jobId='+jobId+'&planId='+planId,
            type: "GET",
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (result) {

                var rows = result.rows;
                //所属评分卡
                $("#tendBeginDateCard").datebox('setValue', "2017-01-01");
                $("#tendEndDateCard").datebox('setValue', formatterDate(new Date()));

                $('#tendESTIMATE_CARD_INFOCard').combobox({
                    data: rows,
                    idField: 'ID', // value值字段
                    textField: 'NAME', // 显示的字段
                    fitColumns: true,
                    striped: true,
                    editable: false// 不可编辑，只能选择
                });
                var card_info = $('#tendESTIMATE_CARD_INFOCard').combobox('getData');

                if (card_info.length > 0) {
                    $('#tendESTIMATE_CARD_INFOCard').combobox('select', card_info[0].ID);
                }

                loadOrgInfo(jobId,planId);
            },
            error: function (e) {
                console.log("error");
            }
        });


    }

    //加载机构信息
    function loadOrgInfo(jobId,planId) {
    	
        $.ajax({
            url: '/DAMS/CDA/getOrgInfo',
            type: "GET",
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (result) {
                var rows = result.rows;
                //所属评分卡
                $('#tendOrg_id').combobox({
                    data: rows,
                    idField: 'BRANCH_ID', // value值字段
                    textField: 'BRANCH_NAME', // 显示的字段
                    fitColumns: true,
                    striped: true,
                    editable: false// 不可编辑，只能选择
                });

                var org_info = $('#tendOrg_id').combobox('getData');
                if (org_info.length > 0) {
                    $('#tendOrg_id').combobox('select', org_info[0].BRANCH_ID);
                }
                getCardTendChart(jobId,planId);
                //初始化的时候默认显示
                var selectCard = $("#tendESTIMATE_CARD_INFOCard").combo("getValue");
                ;
                $.post(WebPath + '/CDA/getLatestCalDate?jobId='+jobId, "",
                    function (result) {
                    if(result.success){
                        var maxDate = result.date;
                        if(maxDate==null){
                            maxDate = formatterDate(new Date());
                        }
                        getcardGroupDetail(maxDate,selectCard,jobId,planId);
                    }
                    }, 'json');
            },
            error: function (e) {
                console.log("error");
            }
        });

    }

    //生成折线图
    function genLineCharts(containerId, catagories, data, title, subtitle, unit, exportingFlag) {
        var option = {
            chart: {
                renderTo: containerId,
                borderColor: '#EBBA95',
                borderWidth: 0,
                type: 'line'//图标类型  line, spline, area, areaspline, column, bar, pie ,scatter
            },
            title: {
                useHTML: true,//要使得html标签有效时，必须设置该属性
                text: title
                /*style:{
                 fontWeight:"bold"
                 }*/
            },

            plotOptions: {
                series: {
                    cursor: 'pointer',
                    events: {
                        click: function (e) {
                            var date = e.point.category;
                            //var cardInfo = data[0].name;
                            var cardInfo = $("#tendESTIMATE_CARD_INFOCard").combo("getValue");
                            
                            document.getElementById("cardGroupDiv").style.display = "block";
                            getcardGroupDetail(date, cardInfo,jobId,planId);
                        }
                    },
                    marker: {
                        radius: 1,
                        states: {
                            //鼠标移动至数据点所显示的样式
                            hover: {
                                fillColor: 'red',//数据点颜色值
                                radius: 10, //点半径大小
                                enabled: false
                            }
                        }
                    }
                }
            },
            //配置副标题
            subtitle: {
                text: subtitle
                /*y:40 //在y轴方向的距离间隔*/
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: catagories,
                labels: {
                    // 标签位置
                    align: 'center',
                    style: {
                        color: 'black',
                        fontSize: 10
                    },
                    y: 15
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: '' //不设置的话默认显示values
                },
                labels: {
                    formatter: function () {
                        if (typeof unit == 'undefined') {
                            unit = '';
                        }
                        return this.value + '' + unit;//y轴刻度的修饰
                    }
                }
            },
            //配置数据点提示框
            tooltip: {
                crosshairs: true,
                shared: false
            },
            series: data
        };

        var chartObject1 = new Highcharts.Chart(option);
    }

//生成规则组信息详情表格
    function getcardGroupDetail(date, cardInfo,jobId,planId) {
        var orgId = $("#tendOrg_id").combo("getValue");
        //var cardName = cardInfo;
        var cardId = cardInfo.split("#")[0];
        //$("#cardGroupDetail").dialog("setTitle",date+'--'+cardName+'规则得分明细');
        $('#cardGroupDetail').datagrid({
            title: date + '--' + cardInfo + '规则得分明细',//没有内容，就会少一个div的标题内容
            //title: '规则得分明细' ,
            //width:1300 ,
            method: 'GET',
            fit: false,
            height: 420,
            singleSelect: false,
            url: '/DAMS/CDA/getCardGroupScore?cardId='+cardId+'&rundate='+date+'&jobId='+jobId+'&planId='+planId+'&org_info='+orgId,
            fitColumns: true,
            rownumbers: true,//显示序号，默认是true
            selectOnCheck: true,
            checkOnSelect: true,
            striped: true,					//隔行变色特性
            loadMsg: '数据正在加载,请耐心的等待...',
            rowStyler: function (index, record) {

            },
            /* frozenColumns:[[//冻结列特性 ,不要与fitColumns 特性一起使用
             {
             field:'ck' ,
             width:30 ,
             checkbox: true
             }
             ]], */
            columns: [[
                {
                    field: 'RUNDATE',
                    title: '日期',
                    width: 50,
                    hidden: true
                }, {
                    field: 'BRANCH_NAME',
                    title: '机构',
                    width: 100,
                    hidden: false
                }, {
                    field: 'RULE_ID',
                    title: '规则ID',
                    width: 100,
                    hidden: false
                }, {
                    field: 'APP_ID',
                    title: 'schma',
                    width: 70,
                    hidden: false
                }, {
                    field: 'TABLE_NAME',
                    title: '表名',
                    width: 70,
                    hidden: false
                }, {
                    field: 'CHECK_COLUMN_NAME',
                    title: '检查字段',
                    width: 70,
                    hidden: false
                }, {
                    field: 'SCORE',
                    title: '得分',
                    width: 60,
                    hidden: false
                }, {
                    field: 'MAXSCORE',
                    title: '最高得分',
                    width: 60,
                    hidden: true
                }, {
                    field: 'PERRATE',
                    title: '得分占比',
                    width: 60,
                    hidden: true
                }
            ]],

            pagination: true,
            pageSize: 10,
            pageList: [10, 15, 20, 50]
        });
    }

//将一个含有相同值的数组去重
    function getDiffValueFromArr(a) {
        var b = [], n = a.length, i, j;
        for (i = 0; i < n; i++) {
            for (j = i + 1; j < n; j++) {
                if (a[i] === a[j]) j = ++i;
            }
            b.push(a[i]);
        }
        return b.sort(function (a, b) {
            return a - b
        });
    }


//评分卡按照机构的趋势图
    function getCardTendChart(jobId,planId) {

        var beginDate1 = $("#tendBeginDateCard").combo("getValue");

        //功能插件，不能通过ID获得值
        if (beginDate1 == "") {
            $.messager.alert("提 示", "请选择检查日期！", "icon-cancel");
            return;
        }

        var endDate1 = $("#tendEndDateCard").combo("getValue");
        if (endDate1 == "") {
            $.messager.alert("提 示", "请选择检查日期！", "icon-cancel");
            return;
        }

        var cardInfo1 = $("#tendESTIMATE_CARD_INFOCard").combo("getValue");
        var cardId = cardInfo1.split("#")[0];
        if (cardId == "") {
            $.messager.alert("提 示", "请选择评分卡！", "icon-cancel");
            return;
        }

        var org_id = $("#tendOrg_id").combo("getValue");
        if (org_id == "") {
            $.messager.alert("提 示", "请选择机构！", "icon-cancel");
            return;
        }

        $.ajax({
            type: "GET",
            url: WebPath + "/CDA/CTEQuery?jobId="+jobId+"&planId="+planId,
            data : {
             beginDate1 : beginDate1,
             endDate1 : endDate1,
             cardInfo1: cardId,
             org_id : org_id
             },
            dataType: 'json',
            success: function (json) {
                if (json == null) {
                    alert("没有数据");
                } else {
                    var dataJson = json.rows;
                    var catagories = [];
                    var displayDatas = [];
                    var estimateCard = {};

                    estimateCard.name = cardInfo1.split("#")[1];
                    var estimateCardData = [];

                    var reg = new RegExp("-", "g"); //创建正则RegExp对象

                    for (var i = 0; i < dataJson.length; i++) {

                        catagories.push(dataJson[i].RUNDATE);
                    }
                    var catagoriesNew = getDiffValueFromArr(catagories);

                    //需要保证所有的data数组长度和x坐标的保持一致，否则，对应的图形系列就会消失
                    for (var j = 0; j < catagoriesNew.length; j++) {
                        estimateCardData.push(0);
                    }

                    //对每一个x轴上的时间点，将相应的维度得分进行填充
                    for (var j = 0; j < catagoriesNew.length; j++) {
                        var xdate = catagoriesNew[j];
                        for (var i = 0; i < dataJson.length; i++) {
                            //数据库查出来的是字符串，所以这里需要进行类型转换
                            var score = parseFloat(parseFloat(dataJson[i].SCORE).toFixed(2));

                            //为什么rundate取到的是一个对象呢？

                            if (xdate == dataJson[i].RUNDATE) {

                                estimateCardData[j] = score;

                            } else {
                                continue;
                            }
                        }
                    }

                    estimateCard.data = estimateCardData;
                    displayDatas.push(estimateCard);
                    var subtitle = "";
                    //生成各个指标的图形
                    genLineCharts('cardOrgTend', catagoriesNew, displayDatas, '评分卡得分趋势图', subtitle, '', true);
                }
            }
        });
    }

    return {
        init: init
    }
})();

//雷达图模块
var ZYpolar = (function () {
    var init = function (jobId,planId) {
        //$("#dataSysBeginDate").datebox('setValue',formatterDate(new Date()));
        //$("#dataSysBeginDate").datebox('setValue',"2016-07-20");

        $.post(WebPath + '/CDA/getLatestCalDate?jobId='+jobId, "", function (result) {
            if(result.success){
                maxDate = result.date;
                $('#polardataSysBeginDate').datebox('setValue', maxDate);
            }
        }, 'json');

        //加载评分卡 信息
        loadEstimateCard(jobId,planId);
    };

    var formatterDate = function (date) {
        var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
        var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1);
        return date.getFullYear() + '-' + month + '-' + day;
    }

    $('#polardataSysQuery').click(function () {
        var demSEL = $("#polarDEMSELECT").combo("getValue");
        if (demSEL == "DEM") {
            //按照维度
            getPolarDataAndGenerateChart(jobId,planId);
            getCardDemenCheckId(jobId,planId);//eDate,cardInfo,org_id,dimension
        } else if (demSEL == "SYSID") {
            //按照系统
            getPolarChartBySys(jobId,planId);
            getCardSysCheckId(jobId,planId,sysId);//eDate,cardInfo,org_id,sysId
        }
    });

    function loadEstimateCard(jobId,planId) {
        $.ajax({
            url: '/DAMS/CDA/CTQuery?jobId='+jobId+'&planId='+planId,
            type: "GET",
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (result) {
                var rows = result.rows;
                $('#polarESTIMATE_CARD_INFO').combobox({
                    data: rows,
                    idField: 'ID', // value值字段
                    textField: 'NAME', // 显示的字段
                    fitColumns: true,
                    striped: true,
                    editable: false// 不可编辑，只能选择
                });
                var card_info = $('#polarESTIMATE_CARD_INFO').combobox('getData');
                if (card_info.length > 0) {
                    $('#polarESTIMATE_CARD_INFO').combobox('select', card_info[0].ID);
                }
                loadOrgInfo(jobId,planId);
            },
            error: function (e) {
                console.log("error");
            }
        });
    }

    //加载机构信息
    function loadOrgInfo(jobId,planId) {
        $.ajax({
            url: '/DAMS/CDA/getOrgInfo',
            type: "GET",
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (result) {
                var rows = result.rows;
                //所属评分卡
                $('#polarorg_info').combobox({
                    data: rows,
                    idField: 'BRANCH_ID', // value值字段
                    textField: 'BRANCH_NAME', // 显示的字段
                    fitColumns: true,
                    striped: true,
                    editable: false// 不可编辑，只能选择
                });

                $('#polarDEMSELECT').combobox({
                    data: [
                        {"DEMID": 'DEM', "DEMNAME": "五大维度", selected: true},
                        {"DEMID": 'SYSID', "DEMNAME": "按系统"}
                    ],
                    idField: 'DEMID', // value值字段
                    textField: 'DEMNAME', // 显示的字段
                    fitColumns: true,
                    striped: true,
                    editable: false// 不可编辑，只能选择
                });

                var org_info = $('#polarorg_info').combobox('getData');
                if (org_info.length > 0) {
                    $('#polarorg_info').combobox('select', org_info[0].BRANCH_ID);
                }
                getPolarDataAndGenerateChart(jobId,planId);
                //得分评分卡对应日期的规则得分信息
                getCardDemenCheckId(jobId,planId);
            },
            error: function (e) {
                console.log("error");
            }
        });

    }

    //得到雷达图的数据并调用产生雷达图的方法---系统
    function getPolarChartBySys(jobId,planId) {
        var eDate = $("#polardataSysBeginDate").combo("getValue");
        var cardInfo = $("#polarESTIMATE_CARD_INFO").combo("getValue");
        var cardName = cardInfo.split("#")[1];
        var org_id = $("#polarorg_info").combo("getValue");
        $.ajax({
            type: "GET",
            url: WebPath + "/CDA/CPQuerySys?jobId="+jobId+'&planId='+planId,
            data: {
                eDate: eDate,
                cardInfo: cardInfo,
                org_id: org_id
            },
            dataType: 'json',
            success: function (json) {
                //数据初始化
                if (json == null) {
                } else {
                    var rows = json.rows;
                    var sysScores = [];
                    var categories = [];

                    for (var i = 0; i < rows.length; i++) {
                        var score = parseFloat(parseFloat(rows[i].SCORE).toFixed(2));
                        sysScores[i] = score;
                        categories[i] = rows[i].APP_ID;
                    }

                }

                //生成雷达图
                generatePolarChartBySys(sysScores, categories, cardName,jobId,planId);
                $('#polardetailScore').datagrid('reload', serializeForm($('#polarmysearch')));
            }//success
        });//ajax method block


    }

//得到雷达图的数据并调用产生雷达图的方法---维度
    function getPolarDataAndGenerateChart(jobId,planId) {

        var eDate = $("#polardataSysBeginDate").val();

        var cardInfo = $("#polarESTIMATE_CARD_INFO").combo("getValue");
        var cardId = cardInfo.split("#")[0];
        var cardName = cardInfo.split("#")[1];
        var org_id = $("#polarorg_info").combo("getValue");
      
        $.ajax({
            url: '/DAMS/CDA/CPQueryDimen?org_id='+org_id+'&cardId='+cardId+'&jobId='+jobId+'&planId='+planId,
            type: "GET",
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (result) {
                //数据初始化
                dimScore = [];//数据长度要和categories保持一致
                categories = [];
                categories.push('有效性');
                categories.push('准确性');
                categories.push('一致性');
                categories.push('完整性');
                categories.push('唯一性');
                categories.push('及时性');
                if (result == null) {

                } else {
                    var rows = result.rows;
                    for (var i = 0; i < rows.length; i++) {
                        var score = parseFloat(parseFloat(rows[i].SCORE).toFixed(2));
                        if (rows[i].CHECKDIMENSION == '1') {
                            dimScore[0] = score;
                        } else if (rows[i].CHECKDIMENSION == '2') {
                            dimScore[1] = score;
                        } else if (rows[i].CHECKDIMENSION == '3') {
                            dimScore[2] = score;
                        } else if (rows[i].CHECKDIMENSION == '4') {
                            dimScore[3] = score;
                        } else if (rows[i].CHECKDIMENSION == '5') {
                            dimScore[4] = score;
                        } else if (rows[i].CHECKDIMENSION == '6') {
                            dimScore[5] = score;
                        }
                    }
                }

                //生成雷达图
                generatePolarChart(dimScore, categories, cardName,jobId,planId);
                $('#polardetailScore').datagrid('reload', serializeForm($('#polarmysearch')));
            },
            error: function (e) {
                console.log("error");
            }
        });

    }

//产生雷达图
    function generatePolarChart(dimensionScore, categories, cardName,jobId,planId) {
        $('#polarcontainer').highcharts({
            chart: {
                borderColor: '#EBBA95',
                borderWidth: 0,
                //width : 290,
                //height : 210,
                polar: true,
                type: 'line'
            },
            title: {
                text: cardName + ' 维度雷达图',
                x: 10
            },
            pane: {
                size: '80%'
            },
            xAxis: {
                categories: categories,
                tickmarkPlacement: 'off',
                lineWidth: 0
            },
            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0
            },
            //鼠标移近的提示
            tooltip: {
                shared: true,
                pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:.2f}</b><br/>'
            },
            credits: {
                enabled: false
            },
            legend: {
                //align: 'left',
                verticalAlign: 'bottom',
                //y: 70,
                layout: 'vertical',
                borderWidth: 1
            },

            //图形上添加点击事件
            plotOptions: {
                series: {
                    cursor: 'pointer',
                    events: {
                        click: function (e) {
                            var dimensionValue = "";

                            if ("有效性" == e.point.category) {
                                dimensionValue = "1";
                            } else if ("准确性" == e.point.category) {
                                dimensionValue = "2";
                            } else if ("一致性" == e.point.category) {
                                dimensionValue = "3";
                            } else if ("完整性" == e.point.category) {
                                dimensionValue = "4";
                            } else if ("唯一性" == e.point.category) {
                                dimensionValue = "5";
                            }

                            document.getElementById("polardimension").value = dimensionValue;
                            getCardDemenCheckId(jobId,planId,dimensionValue);
                        }
                    }
                }
            },
            series: [{
                name: '维度得分',
                data: dimensionScore,
                pointPlacement: 'on'
            }]

        });
    }

    function generatePolarChartBySys(sysScore, categories, cardName,jobId,planId) {
        $('#polarcontainer').highcharts({
            chart: {
                borderColor: '#EBBA95',
                borderWidth: 2,
                //width : 290,
                //height : 210,
                polar: true,
                type: 'line'
            },
            title: {
                text: cardName + ' 系统雷达图',
                x: 10
            },
            pane: {
                size: '80%'
            },
            xAxis: {
                categories: categories,
                tickmarkPlacement: 'off',
                lineWidth: 0
            },
            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0
            },
            //鼠标移近的提示
            tooltip: {
                shared: true,
                pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:.2f}</b><br/>'
            },
            credits: {
                enabled: false
            },
            legend: {
                //align: 'left',
                verticalAlign: 'bottom',
                //y: 70,
                layout: 'vertical',
                borderWidth: 1
            },

            //图形上添加点击事件
            plotOptions: {
                series: {
                    cursor: 'pointer',
                    events: {
                        click: function (e) {
                            document.getElementById("polardimension").value = e.point.category;
                            var sysId = e.point.category;
                            
                            getCardSysCheckId(jobId,planId,sysId);
                        }
                    }
                }
            },
            series: [{
                name: '系统得分',
                data: sysScore,
                pointPlacement: 'on'
            }]

        });
    }

    //表单字段信息的收集
    function serializeForm(form) {
        var obj = {};
        $.each(form.serializeArray(), function (index) {
            //下面的this是一个表单域的对象
            if (obj[this['name']]) {
                obj[this['name']] = obj[this['name']] + ',' + this['value'];
            } else {
                obj[this['name']] = this['value'];
            }
        });
        return obj;
    }

//系统
    function getCardSysCheckId(jobId,planId,sysId) {
        var eDate = $("#polardataSysBeginDate").val();
        var cardInfo = $("#polarESTIMATE_CARD_INFO").val();
        var cardId = cardInfo.split("#")[0].trim();
        var org_id = $("#polarorg_info").combo("getValue");
        //var sysId =  "ODS";
        //$("#polardetailScore").dialog("open").dialog("setTitle", sysId);

        $("#polardetailScore").datagrid({
            /* idField:'id' ,*/
             title:sysId , //没有内容，就会少一个div的标题内容
            //width:1300 ,
            fit: false,
            height: 420,
            singleSelect: false,
            //queryParams:{idd:'dd',nnn:'ff'},传入更灵活的参数
            url: '/DAMS/CDA/sysScoreTopTen?org_id='+org_id+'&cardId='+cardId+'&jobId='+jobId+'&planId='+planId+'&sysId='+sysId,
            method: 'GET',
            fitColumns: true,
            rownumbers: false,//显示序号，默认是true
            selectOnCheck: true,
            checkOnSelect: true,
            striped: true,					//隔行变色特性
            //nowrap: false ,				//折行显示
            loadMsg: '数据正在加载,请耐心的等待...',
            pagination: true,
            rownumbers: true,
            columns: [[
                {
                    field: 'RUN_TIME',
                    title: '日期',
                    width: 90,
                    hidden: true
                }, {
                    field: 'BRANCH_NAME',
                    title: '机构',
                    width: 100,
                    hidden: false
                }, {
                    field: 'CHECKDIMENSION',//CheckDimension
                    title: '规则维度',
                    width: 100,
                    /*formatter: function (value, record, index) {
                        if (value == '1') {
                            return '<span>有效性</span>';
                        } else if (value == '2') {
                            return '<span>准确性</span>';
                        } else if (value == '3') {
                            return '<span>一致性</span>';
                        } else if (value == '4') {
                            return '<span>完整性</span>';
                        } else if (value == '5') {
                            return '<span>唯一性</span>';
                        } else if (value == '6') {
                            return '<span>及时性</span>';
                        } else {
                            return '<span>有效性</span>';
                        }
                    },*/
                    hidden: true
                }, {
                    field: 'MAP_ID',//map_id
                    title: '规则组',
                    width: 40,
                    hidden: true
                }, {
                    field: 'RULE_ID',//check_id,规则说明是否需要显示出来
                    title: '规则ID',
                    width: 60,
                    hidden: false
                }, {
                    field: 'RULE_DEFINITION',
                    title: '规则说明',
                    width: 140,
                    hidden: false
                }, {
                    field: 'APP_ID',
                    title: 'schma',
                    width: 50,
                    hidden: false
                }, {
                    field: 'TBL_ID',
                    title: '表名',
                    width: 100,
                    hidden: false
                }, {
                    field: 'CHECK_COLUMN_NAME',
                    title: '字段名',
                    width: 100,
                    hidden: false
                }, {
                    field: 'SCORE',//score
                    title: '规则得分',
                    width: 60,
                    hidden: false
                }
            ]],

            pagination: true,
            pageSize: 10,
            pageList: [10, 15, 20, 50]
        });
    }

//维度
    function getCardDemenCheckId(jobId,planId,dimension) {

        var eDate = $("#polardataSysBeginDate").val();
        var cardInfo = $("#polarESTIMATE_CARD_INFO").val();
        var cardId = cardInfo.split("#")[0];

        var org_id = $("#polarorg_info").combo("getValue");
        //var dimension = $("#polardimension").val();
        var dimensionCN;
        if (dimension == '1') {
            dimensionCN = '有效性';
        } else if (dimension == '2') {
            dimensionCN = '准确性';
        } else if (dimension == '3') {
            dimensionCN = '一致性';
        } else if (dimension == '4') {
            dimensionCN = '完整性';
        } else if (dimension == '5') {
            dimensionCN = '唯一性';
        } else if (dimension == '6') {
            dimensionCN = '及时性';
        } else {
            dimensionCN = '有效性';
            dimension = '1';
        }
        //$("#detailScore").dialog("open").dialog("setTitle",dimensionCN);
        $("#polardetailScore").datagrid({
            title: dimensionCN,
            //width:1300 ,
            method: 'GET',
            fit: false,
            height: 420,
            singleSelect: false,
            url: WebPath + '/CDA/dimenScoreTopTen?cardId='+cardId+'&org_id='+org_id
            		+'&jobId='+jobId+'&planId='+planId+'&dimension='+dimension,
            fitColumns: true,
            rownumbers: true,//显示序号，默认是true
            selectOnCheck: true,
            checkOnSelect: true,
            striped: true,					//隔行变色特性
            //nowrap: false ,				//折行显示
            loadMsg: '数据正在加载,请耐心的等待...',
            rowStyler: function (index, record) {

            },
            columns: [[
                {
                    field: 'RUN_TIME',//FOLDER_ID
                    title: '日期',
                    width: 90,
                    hidden: true
                }, {
                    field: 'CHECKDIMENSION',//CheckDimension
                    title: '规则维度',
                    width: 100,
                    formatter: function (value, record, index) {
                        if (value == '1') {
                            return '<span>有效性</span>';
                        } else if (value == '2') {
                            return '<span>准确性</span>';
                        } else if (value == '3') {
                            return '<span>一致性</span>';
                        } else if (value == '4') {
                            return '<span>完整性</span>';
                        } else if (value == '5') {
                            return '<span>唯一性</span>';
                        } else if (value == '6') {
                            return '<span>及时性</span>';
                        } else {
                            return '<span>有效性</span>';
                        }
                    },
                    hidden: true
                }, {
                    field: 'BRANCH_NAME',//map_id
                    title: '机构',
                    width: 120,
                    hidden: false
                }, {
                    field: 'MAP_ID',//map_id
                    title: '规则组',
                    width: 40,
                    hidden: true
                }, {
                    field: 'CHECK_ID',//check_id,规则说明是否需要显示出来
                    title: '规则ID',
                    width: 60,
                    hidden: true
                }, {
                    field: 'RULE_DEFINITION',
                    title: '规则说明',
                    width: 140,
                    hidden: false
                }, {
                    field: 'APP_ID',
                    title: 'schma',
                    width: 50,
                    hidden: false
                }, {
                    field: 'TBL_ID',
                    title: '表名',
                    width: 100,
                    hidden: false
                }, {
                    field: 'COL_ID',
                    title: '字段名',
                    width: 100,
                    hidden: false
                }, {
                    field: 'SCORE',//score
                    title: '规则得分',
                    width: 60,
                    hidden: false
                }
            ]],

            pagination: true,
            pageSize: 10,
            pageList: [10, 15, 20, 50]
        });
    }

    return {
        init: init
    }
})();

//仪表图模块
var ZYgauge = (function () {
    var init = function (jobId,planId) {
        $("#dataSysBeginDate").datebox('setValue', formatterDate(new Date()));
        //这里的日期应该是有评分卡数据的最新日期
        //$("#dataSysBeginDate").datebox('setValue','2016-07-20');
        //加载 评分卡信息并生成仪表图
        loadEstimateCard(jobId,planId);
        //点击查询选中的评分卡的仪表盘,其他评分卡需要隐藏

    };

    var formatterDate = function (date) {
        var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
        var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1);
        return date.getFullYear() + '-' + month + '-' + day;
    }

    $('#dataSysQuery').click(function () {
        var length = $("#cardSel").find("option:selected").size();
        for (var i = 7; i > length; i--) {
            document.getElementById("container" + i).style.display = "none";
        }
        getGaugeDataAndGernerateChart();
    });

    $("#cardText").click(function () {
        var showy = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        $("#cardSelDiv").parent().css({"top": showy + "px"});
        $("#cardSelDiv").dialog("open").dialog("setTitle", "选择评分卡");
        //以下是获得显示的div层的阴影层。这个阴影层是克隆可视的div，所以必须现有可视div
        //即先有上面的语句，才有下面的语句，顺序不能颠倒
        $("#cardSelDiv").parent().next("div").css({"top": showy + "px"});
    });

    //根据评分卡信息生成仪表图
    function getGaugeDataAndGernerateChart() {
        var eDate = $("#dataSysBeginDate").combo("getValue");
        //ERROR???页面为什么注解了这个框？？
        var cardInfo = $("#mysearch input[name=ESTIMATE_CARD_INFO]").val();
        var cardVal = $("#cardVal").val();
        if (cardInfo == "" || eDate == "") {
            alert("请选择日期和评分卡信息");
        } else {
            $.ajax({
                type: "post",
                url: WebPath + "/CDA/gaugeScore",
                data: {
                    eDate: eDate,
                    cardInfo: cardInfo,
                    selectedCards: cardVal
                },
                dataType: 'json',
                success: function (json) {
                    if (json == null) {
                        alert("没有数据");
                    } else {
                        var rows = json.rows;
                        //生成仪表盘图
                        for (var i = 1; i <= rows.length; i++) {
                            var score = parseFloat(parseFloat(rows[i - 1].SCORE).toFixed(2));
                            var card_name = rows[i - 1].GROUP_NAME;
                            var card_Id = rows[i - 1].GROUP_ID + '';
                            document.getElementById("container" + i).style.display = "block";
                            myGaugeChart1("container" + i, 0, 100, 20, card_name, "", score, card_Id, eDate);
                        }

                    }
                }
            });

        }
    }

//得到下级机构的得分并生成表格
    function getCardChildOrgCheckId(cardId, eDate) {
        $("#orgScoreDiv").dialog("open").dialog("setTitle", "下级机构明细");
        //下级机构得分列表
        $('#orgScore').datagrid({
            height: 420,
            singleSelect: false,
            url: WebPath + '/CDA/gaugeOrgScore&cardId=' + cardId + '&eDate=' + eDate,
            fitColumns: true,
            rownumbers: true,//显示序号，默认是true
            selectOnCheck: true,
            checkOnSelect: true,
            striped: true,					//隔行变色特性
            loadMsg: '数据正在加载,请耐心的等待...',
            rowStyler: function (index, record) {

            },
            /* frozenColumns:[[//冻结列特性 ,不要与fitColumns 特性一起使用
             {
             field:'ck' ,
             width:30 ,
             checkbox: false
             }
             ]], */
            columns: [[
                {
                    field: 'RUNDATE',//FOLDER_ID
                    title: '日期',
                    width: 40,
                    hidden: false
                }, {
                    field: 'ORG_NAME',//CheckDimension
                    title: '机构',
                    width: 100,
                    hidden: false
                }, {
                    field: 'SCORE',//score
                    title: '得分',
                    width: 50,
                    hidden: false
                }
            ]],

            pagination: true,
            pageSize: 10,
            pageList: [10, 15, 20, 50]

        });

    }

    function loadEstimateCard(jobId,planId) {
        var selectObj = $("#cardSel");
        var length = $("#cardSel option").size();
        if (length < 1) {
            $.post(WebPath + '/CDA/CTQuery?jobId='+jobId+'&planId='+planId, "",
                function (result) {
                    var rows = result.rows;
                    var length = rows.length;
                    var forNum = 8;
                    if (length <= forNum) {
                        //页面初始化时最多显示8个评分卡
                        forNum = length;
                    }
                    for (var i = 0; i < forNum; i++) {
                        var temp = rows[i];
                        selectObj.append("<option selected value='" + temp.ID + "'>" + temp.NAME + "</option>");
                    }
                    selectCard();
                    //生成仪表图，
                    getGaugeDataAndGernerateChart();

                }, 'json');
        }
    }

      /**
     *
     * @param containerId 容器id
     * @param min  最小值
     * @param max  最大值
     * @param step  步长
     * @param text  标题
     * @param name  系列名
     * @param data  数据      不能是字符串
     */
    function myGaugeChart1(containerId, min, max, step, text, name, data, cardId, eDate) {
        var a = new Array();
        a.push(data);
        //Chart不是一个静态方法，所以new 关键字一定不能省去
        new Highcharts.Chart({
            chart: {
                renderTo: containerId,
                type: "gauge",
                plotBorderWidth: 1,
                plotBackgroundColor: "#ffffff",
                plotBackgroundImage: null,
                //width: 290,
                height: 300,
				margin: [0, 0, 0, 0],				
                events: {
                    click: function (e) {
                        if (branchLevel == "1") {
                            getCardChildOrgCheckId(cardId, eDate);
                        }
                    }
                }
            },
            exporting: {
                // 是否允许导出
                enabled: false
            },
            credits: {
                enabled: false
            },
            title: {
                text: name
            },
            pane: [{
                startAngle: -90,
                endAngle: 90,
                background: null,
                // 极坐标图或角度测量仪的中心点，像数组[x,y]一样定位。位置可以是以像素为单位的整数或者是绘图区域的百分比
                center: ['50%', '90%'],
                size: 300
            }],
            yAxis: {
                min: min,
                max: max,
                // 步长
                tickInterval: step,
                minorTickPosition: 'outside',
                tickPosition: 'outside',
                labels: {
                    // 刻度值旋转角度
                    rotation: 'auto',
                    distance: 20,
                    style: {
                        color: '#000',
                        fontWeight: 'bold'
                    }
                },
                plotBands: [{
                    // 预警红色区域长度
                    from: 80,
                    to: 100,
                    color: '#E3E3E9',
                    // 红色区域查出刻度线
                    innerRadius: '100%',
                    outerRadius: '115%'
                }],
                // 表盘,为0时为半圆，其余都为圆
                pane: 0,
                title: {
                    style: {color: '#FFFFFF', fontSize: '12px'},
                    text: text,
                    y: -5
                }
            },
            plotOptions: {
                gauge: {
                    dataLabels: {
                        enabled: false
                    },
                    dial: {
                        backgroundColor: '#4990E2',
                        // 半径：指针长度
                        radius: '100%'
                    }
                }
            },
            series: [{
                data: a,
                name: name,
                yAxis: 0
            }]

        });
    }

    function selectCard() {
        $("#cardSelDiv").dialog("close");
        //var selectText = $("#cardSel").find("option:selected").text();
        var optionObj = $("#cardSel").find("option:selected");
        var cardJoinText = "";
        //通过$将DOM对象转换成JQuery对象
        for (var i = 0; i < optionObj.length; i++) {
            cardJoinText += $(optionObj[i]).text() + ",";
        }
        $("#cardText").val(cardJoinText);
        var selectVal = $("#cardSel").val();
        $("#cardVal").val(selectVal);
    }

    return {
        init: init,
        selectCard:selectCard
    }
})();