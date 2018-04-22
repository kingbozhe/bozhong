<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<% String path = request.getContextPath();%>
<script>
    (function () {
        var OrgscolumnsArr = [{field: 'ck', checkbox: true}
            , {field: 'JOB_ID', title: '作业编号', width: 100, checkbox: false, hidden: false}
            , {field: 'RULE_LIB_ID', title: '规则库编号', width: 100, checkbox: false}
            , {field: 'RULE_ID', title: '规则编号', width: 100, checkbox: false}
            , {field: 'DQ_RSLT_ORG', title: '结果统计机构', width: 120, checkbox: false}
            , {field: 'DQ_RSLT_T_CNT', title: '结果统计总记录数', width: 100, checkbox: false}
            , {field: 'DQ_RSLT_N_CNT', title: '结果统计错误数', width: 80, checkbox: false}
            , {field: 'DQ_RSLT_E_CNT', title: '结果统计规则级别通过数', width: 80, checkbox: false}];

        initJobsOrgTable("<%=path%>/jobs/ruleorg?JOB_ID=${JOB_ID}&RULE_ID=${RULE_ID}", "<%=path%>/jobs/forth", ["JOB_ID", "RULE_ID", "DQ_RSLT_ORG"], OrgscolumnsArr);
    })();

</script>
