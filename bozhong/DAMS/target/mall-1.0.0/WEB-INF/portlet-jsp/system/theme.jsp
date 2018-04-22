<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<% String path = request.getContextPath();%>
<html>
<head>
    <title>十大主题数据标准</title>
</head>
<body>
</body>
<script>
    $.getJSON("<%=path%>/auth/themeData?themeId=${themeId}", function (json) {
        var maxIndex = parseInt($("#maxTabIndex").val());
        var link = $('<div class="ilink"><a class="iorange" id="link-ibox'+maxIndex+'-1"><em class="fa fa-link"></em> <span class="themeTag"></span>定义</a> <a class="iblue"  id="link-ibox'+maxIndex+'-2"> <em class="fa fa-link"></em> <span class="themeTag"></span>主题数据标准项分类框架 </a> <a class="igreen" id="link-ibox'+maxIndex+'-3"> <em class="fa fa-link"></em> <span class="themeTag"></span>主题数据流向图 </a> </div>');
        var body = $('<div class="iboxs iboxs'+maxIndex+'"><div class="ibox" id="ibox'+maxIndex+'-1"> <div class="ititle"><span class="themeTag"></span>定义</div> <div class="icontent indesc" id="indesc'+maxIndex+'"></div> </div> <div class="ibox" id="ibox'+maxIndex+'-2"> <div class="ititle"><span class="themeTag"></span>主题数据标准项分类框架</div> <div class="icontent intable" id="intable'+maxIndex+'"></div> </div> <div class="ibox" id="ibox'+maxIndex+'-3"> <div class="ititle"><span class="themeTag"></span>主题数据流向图</div> <div class="icontent inimg"> <img id="themeImage'+maxIndex+'"> </div> </div></div>');
        $("#box"+maxIndex).html(link).append(body);
        if (json.success == true) {
            $("#box"+maxIndex+" .themeTag").html(json.data.themeName);
            $("#box"+maxIndex+" #indesc"+maxIndex).html(json.data.themeDesc);
            $("#box"+maxIndex+" #themeImage"+maxIndex).attr('src',json.data.image);
            initTable("#box"+maxIndex+" #intable"+maxIndex, json.data);
            $("#link-ibox"+maxIndex+"-1").click(function(){
                $(".iboxs").animate(
                		{scrollTop:0},{duration:500,easing:"swing"}
                );
                return false;
            });
            $("#link-ibox"+maxIndex+"-2").click(function(){
                $(".iboxs").animate({scrollTop:$("#ibox"+maxIndex+"-1").outerHeight() + 17},{duration:500,easing:"swing"});
                return false;
            });
            $("#link-ibox"+maxIndex+"-3").click(function(){
                $(".iboxs").animate({scrollTop:$("#ibox"+maxIndex+"-1").outerHeight() + $("#ibox"+maxIndex+"-2").outerHeight() + 34},{duration:500,easing:"swing"});
                return false;
            });
        } else {
            alert("服务器异常！");
        }
    });

    function initTable(div, data) {
        var tableStr = $("<table class=\"intable\" align=\"left\"></table>");
        var tableHead = $("<tr><th colspan=\"2\">第一级</th><th colspan=\"2\">第二级</th><th colspan=\"2\">第三级</th></tr><tr><th colspan=\"2\">" + data.firstCount + "类</th><th colspan=\"2\">" + data.secondCount + "类</th><th colspan=\"2\">" + data.thirdCount + "类</th></tr><tr><th>名称</th><th>业务说明</th><th>名称</th><th>业务说明</th><th>名称</th><th>业务说明</th></tr>");
        tableStr.append(tableHead);
        var tables = data.tableLists;
        for (var x = 0; x < tables.length; x++) {
            var fcount = 0;
            for (var y = 0; y < tables[x].children.length; y++) {
                fcount += tables[x].children[y].children.length;
            }
            var tr = $("<tr><td width=\"6%\" align=\"center\" rowspan=\"" + fcount + "\">" + tables[x].nodeName + "</td><td rowspan=\"" + fcount + "\">" + tables[x].nodeDesc + "</td></tr>");
            for (var y = 0; y < tables[x].children.length; y++) {
                if (y == 0) {
                    tr.append("<td width=\"7%\" align=\"center\" rowspan=\"" + tables[x].children[y].children.length + "\">" + tables[x].children[y].nodeName + "</td><td rowspan=\"" + tables[x].children[y].children.length + "\">" + tables[x].children[y].nodeDesc + "</td>");
                } else {
                    tr = $("<tr><td rowspan=\"" + tables[x].children[y].children.length + "\">" + tables[x].children[y].nodeName + "</td><td rowspan=\"" + tables[x].children[y].children.length + "\">" + tables[x].children[y].nodeDesc + "</td></tr>");
                }
                for (var z = 0; z < tables[x].children[y].children.length; z++) {
                    if (z == 0) {
                        tr.append("<td  width=\"7%\" align=\"center\">" + tables[x].children[y].children[z].nodeName + "</td><td>" + tables[x].children[y].children[z].nodeDesc + "</td>");
                        tableStr.append(tr);
                    } else {
                        tableStr.append("<tr><td>" + tables[x].children[y].children[z].nodeName + "</td><td>" + tables[x].children[y].children[z].nodeDesc + "</td></tr>");
                    }
                }
            }
        }
        $(div).html(tableStr);
        $(".ilink").outerWidth($(".box").outerWidth()-30);
        $(".iboxs").outerHeight($(".box").outerHeight()-$(".ilink").outerHeight()-45);
    }
</script>
</html>
