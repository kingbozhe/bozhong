/**
 * Created by Octopus on 2017/9/20.
 */
var t1;
var filterParams=null;
function initJobstable(url, drillUrl, key, columns) {
    var maxIndex = parseInt($("#maxTabIndex").val()),
        jobDiv = $('<div class="ztable" id="bizEntityTable' + maxIndex + '" style="float: left"> <div class="zoperate" style="float: left"> <i id="stop' + maxIndex + '">关闭监控</i> <i id="start' + maxIndex + '">启动监控</i><i id="details' + maxIndex + '">查看作业详情</i> </div> <table id="jobsTable' + maxIndex + '" style="width:100%;float: left"> </table> </div>');
    filterDiv("#box",maxIndex,[{"name":"作业编号","key":"JOB_ID"},{"name":"作业类型","key":"JOB_TYPE"}]);
    $("#box" + maxIndex).append(jobDiv);
    var codeIndex = ["JOB_TYPE","JOB_RUN_STATUS"];
    //获取码值
    for(var i=0;i<codeIndex.length;i++){
        $.ajax({
            url: "/DAMS/model/reference",
            type: 'GET',
            data:{"catalog_name":codeIndex[i].toUpperCase()},
            dataType: "json",
            async: false,
            success: function (codeList) {
                //先清理缓存dom
                $('#catalogCache'+codeIndex[i].toUpperCase()).remove();
                var catalogCache = $('<div style="display:none" id="catalogCache'+codeIndex[i].toUpperCase()+'"></div>');
                for(var j=0;j<codeList.length;j++){
                    var map = codeList[j];
                    var catalog_id = map.CATALOGID;
                    var ref_no = map.REF_NO;
                    var ref_name = map.REF_NAME;
                    catalogCache.append($('<input type="hidden" value="'+ref_name+'" refName="'+ref_name+'" refNo="'+ref_no+'" ></input>'));
                }
                $("#box" + maxIndex).append(catalogCache);
            },
            error:function(data){
                if(data.status =='500'){
                    showAlertDialog("服务器内部错误,请检查网络!");
                }
            }
        });
    }



    loadData(maxIndex, url, false, columns);
    window.clearInterval(t1);
    t1 = JInterval(loadData, 5000, maxIndex, url, false, columns);
    $("#start" + maxIndex).click(function () {
        window.clearInterval(t1);
        loadData(maxIndex, url, false, columns);
        t1 = JInterval(loadData, 5000, maxIndex, url, false, columns);
    });

    $("#stop" + maxIndex).click(function () {
        window.clearInterval(t1);
    });

    $("#metadata" + maxIndex).click(function () {
        var row = $("#jobsTable" + maxIndex).datagrid('getSelected'),
            rows = $("#jobsTable" + maxIndex).datagrid('getSelections');
        if (rows.length === 1) {
            window.clearInterval(t1);
            var param = {};
            param["Job_ID".toUpperCase()] = row.Job_ID;
            appendTab(maxIndex, "BM50007", "", param);
        } else {
            showAlertDialog('您选择了多条记录，请一次选择一条!');
            return;
        }
    });

    $("#details" + maxIndex).click(function () {
        var row = $("#jobsTable" + maxIndex).datagrid('getSelected');
        var rows = $("#jobsTable" + maxIndex).datagrid('getSelections');
        if (rows.length === 1) {
            window.clearInterval(t1);
            appendTabUserdefined(maxIndex, drillUrl + "?" + key + "=" + row[key], "详情");
        } else {
            showAlertDialog('您选择了多条记录，请一次选择一条!');
            return;
        }
    });
}

function initDetailsTable(url, drillUrl, key, columns) {
    var maxIndex = parseInt($("#maxTabIndex").val()),
        jobDiv = $('<div class="ztable" id="bizEntityTable' + maxIndex + '" style="float: left"> <div class="zoperate" style="float: left"> <i id="stop' + maxIndex + '">关闭监控</i> <i id="start' + maxIndex + '">启动监控</i><i id="joborg' + maxIndex + '">查看机构</i> </div> <table id="jobsTable' + maxIndex + '" style="width:100%;float: left"> </table> </div>');
    $("#box" + maxIndex).html(jobDiv);
    loadData(maxIndex, url, true, columns);
    window.clearInterval(t1);
    t1 = JInterval(loadData, 5000, maxIndex, url, true, columns);
    $("#joborg" + maxIndex).click(function () {
        var row = $("#jobsTable" + maxIndex).datagrid('getSelected');
        var rows = $("#jobsTable" + maxIndex).datagrid('getSelections');
        if (rows.length === 1) {
            appendTabUserdefined(maxIndex, drillUrl + "?" + getParamUrl(row, key), "相关机构");
        } else {
            showAlertDialog('您选择了多条记录，请一次选择一条!');
            return;
        }
    });
    $("#start" + maxIndex).click(function () {
        window.clearInterval(t1);
        loadData(maxIndex, url, true, columns);
        t1 = JInterval(loadData, 5000, maxIndex, url, true, columns);
    });

    $("#stop" + maxIndex).click(function () {
        window.clearInterval(t1);
    });
}

function initJobsOrgTable(url, drillUrl, key, columns) {
    var maxIndex = parseInt($("#maxTabIndex").val()),jobDiv = $('<div class="ztable" id="bizEntityTable' + maxIndex + '" style="float: left"> <div class="zoperate" style="float: left"> <i id="showSample' + maxIndex + '">查看错误样本</i> </div> <table id="jobsTable' + maxIndex + '" style="width:100%;float: left"> </table> </div>');
    filterDiv("#box",maxIndex,[{"name":"机构","key":"dq_rslt_org"}]);
    $("#box" + maxIndex).append(jobDiv);
    loadData(maxIndex, url, true, columns);

    $("#showSample" + maxIndex).click(function () {
        var row = $("#jobsTable" + maxIndex).datagrid('getSelected');
        var rows = $("#jobsTable" + maxIndex).datagrid('getSelections');
        if (rows.length === 1) {
            appendTabUserdefined(maxIndex, drillUrl + "?" + getParamUrl(row, key), "错误样本");
        } else {
            showAlertDialog('您选择了多条记录，请一次选择一条!');
            return;
        }
    });
}

function initJobsSampleTable(url, columns) {
    var maxIndex = parseInt($("#maxTabIndex").val()),jobDiv = $('<div class="ztable" id="bizEntityTable' + maxIndex + '" style="float: left"> <div class="zoperate" style="float: left"></div> <table id="jobsTable' + maxIndex + '" style="width:100%;float: left"> </table> </div>');
    $("#box" + maxIndex).append(jobDiv);
    url = encodeURI(encodeURI(url));
    loadData(maxIndex, url, true, columns);
}

function loadData(maxIndex, url, pagination, columns) {
    if ($("#tab" + maxIndex).hasClass("active")) {
        $("#jobsTable" + maxIndex).datagrid({
            url: url,
            singleSelect: true,
            pagination: pagination,
            method: 'post',
            //fitColumns: true,
            queryParams: {"select":filterParams},
            columns: [columns],
            onLoadSuccess: function (data) {
                restyleCheckBox();
                $(".datagrid-body").css("overflow-x", "auto");
                $(".ztable .datagrid").css("width", "100%");
                /*$("#jobsTable" + maxIndex).datagrid('doCellTip', {cls: {'max-width': '300px'}, delay: 1000});*/
            }
        });
    } else {
        filterParams=null;
        window.clearInterval(t1);
    }
}

function JInterval(funcName, time) {
    var args = [];
    for (var i = 2; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    return window.setInterval(function () {
        funcName.apply(this, args);
    }, time);
}

function getParamUrl(params, key) {
    var num = key.length,
        url = "";
    for (var i = 0; i < num; i++) {
        url += key[i] + "=" + encodeURI(encodeURI(params[key[i]])) + "&";
    }
    return url.substr(0, url.length - 1);
}

function filterDiv(parentDiv,index,filterParame){
    var filterDiv = $('<div class="col-md-12 ifilter" id="ifilter' + index + '">'),
        ifilterLeft =$('<div id="ileft'+index+'" class="ileft"></div>'),
        filterButtonBlock = $('<div class="ibtn"><div class="sbtn"></div></div>'),
        resetButton = $('<button id="resetFilterBtn'+index+'" class="bggray" tabIndex="'+index+'" >重置</button>'),
        okButton = $('<button id="okFilterBtn'+index+'" tabIndex="'+index+'" class="orange">确定</button>'),
        div = $(FILTER_DOM_DIV_LINE),
        divCol,
        filterDom,
        controlDom;
    $(filterDiv).append(ifilterLeft);
    $(filterButtonBlock).find(".sbtn").append(okButton);
    $(filterButtonBlock).find(".sbtn").append(resetButton);
    $(filterDiv).append($(filterButtonBlock));
    $(parentDiv+index).append(filterDiv);
    for(var i=0,sum = filterParame.length;i<sum;i++){
        divCol = $(FILTER_DOM_DIV_COL);
        divCol.append($("<em>"+filterParame[i].name+"</em>"));
        filterDom = $("<div class=\"sinput sinput\"></div>");
        controlDom = $("<input class=\"itext form-control\" placeholder=\"请输入名称\" aria-describedby=\"basic-addon1\" type=\"text\" data-key=\""+filterParame[i].key+"\"> ");
        filterDom.append(controlDom);
        divCol.append(filterDom);
        div.append(divCol);
        if((i+1)%3==0){
            $(ifilterLeft).append(div);
            div = $(FILTER_DOM_DIV_LINE);
        }
        if(i===sum-1&&div.children().length>0){
            ifilterLeft.append(div);
        }
    }
    $("#okFilterBtn"+index).click(function (){
        var params = [];
        $("#ileft"+index).find("input").each(function(){
            var param = {};
            param.key=$(this).data("key");
            param.value=$(this).val();
            params.push(param);
        });
        filterParams = JSON.stringify(params);
        $("#jobsTable"+index).datagrid('reload',{"select":filterParams});
    });
    $("#resetFilterBtn"+index).click(function (){
        $("#ileft"+index).find("input").each(function(){
            $(this).val("");
        });
    });
    resize();
}

function tableDiv(parentDiv,index){
    var jobDiv = $('<div class="ztable" id="bizEntityTable' + index + '" style="float: left"> <div class="zoperate" style="float: left"> <i id="stop' + index + '">关闭监控</i> <i id="start' + index + '">启动监控</i><i id="metadata' + index + '">元数据</i> <i id="details' + index + '">查看作业详情</i> </div> <table id="jobsTable' + index + '" style="width:100%;float: left"> </table> </div>');
    $(parentDiv+index).append(jobDiv);
}


function jobCodeTranslate(value,row,index){
    /*if(value != null && value !=''){
        if(value=='1'){
            return "质量检查";
        } else{
            return "元数据采集";
        }
    }*/

    var mappedValue = null;
    if(value != null && value !=''){
        var mappedItem = $('#catalogCache'+this.field);
        if(mappedItem != null && mappedItem.find('input').length > 0){
            var findedValue = mappedItem.find('input[refNo="'+value+'"]');
            if(findedValue.length>0){
                mappedValue = $(findedValue).val();
            }else{
                mappedValue = value;
            }
        }else{
            mappedValue = value;
        }
    }else{
        mappedValue = value;
    }
    return mappedValue;
}