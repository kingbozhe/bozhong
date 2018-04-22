<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<% String path = request.getContextPath();
    String url = request.getRequestURI();
%>
<script>
    (function () {
        var JobscolumnsArr = [{field: 'ck', checkbox: true}
            , {field: 'JOB_ID', title: '作业编号', width: 100, checkbox: false, hidden: false}
            , {field: 'RULE_LIB_ID', title: '规则库编号', width: 100, checkbox: false}
            , {field: 'RULE_ID', title: '规则编号', width: 100, checkbox: false}];
        initDetailsTable("<%=path%>/jobs/rule?JOB_ID=${JOB_ID}", "<%=path%>/jobs/third", ["JOB_ID","RULE_ID"], JobscolumnsArr);
    })();
</script>