<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<% String path = request.getContextPath();%>
<html>
<script>
    (function(){
        var OrgscolumnsArr = [{field: 'ck', checkbox: true}
            , {field: 'JOB_ID', title: '作业编号', width: 100, checkbox: false, hidden: false}
            , {field: 'RULE_LIB_ID', title: '规则库编号', width: 100, checkbox: false}
            , {field: 'RULE_ID', title: '规则编号', width: 100, checkbox: false}
            , {field: 'DQ_RSLT_PK_VL', title: '错误记录主键', width: 120, checkbox: false}
            , {field: 'DQ_RSLT_ORG', title: '错误记录机构', width: 100, checkbox: false}
            , {field: 'DQ_RSLT_T_CNT', title: '结果统计总记录数', width: 80, checkbox: false}
            , {field: 'DQ_RSLT_DTL_VALUE', title: '错误信息', width: 80, checkbox: false}];

        initJobsSampleTable("<%=path%>/jobs/sample?JOB_ID=${JOB_ID}&RULE_ID=${RULE_ID}&DQ_RSLT_ORG=${DQ_RSLT_ORG}", OrgscolumnsArr);
    })();
</script>