<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<% String path = request.getContextPath();%>
<script>
    (function(){
        var JobscolumnsArr = [{field: 'ck', checkbox: true}
            , {field: 'JOB_ID', title: '作业编号', width: 100, checkbox: false, hidden: false,sortable:true}
            , {field: 'JOB_DEF_ID', title: '作业配置编号', width: 100, checkbox: false,sortable:true}
            , {field: 'JOB_TYPE', title: '作业类型', width: 100, checkbox: false,sortable:true,formatter: jobCodeTranslate}
            , {field: 'RUN_TIME', title: '执行时间', width: 120, checkbox: false}
            , {field: 'DQ_SAMPLE_LIMIT', title: '样本上限', width: 100, checkbox: false}
            , {field: 'RUN_DS_ID', title: '数据源编号', width: 80, checkbox: false}
            , {field: 'JOB_PROCESS', title: '执行数进度', width: 80, checkbox: false}
            , {field: 'RULESUM', title: '执行总数', width: 70, checkbox: false}
            , {field: 'JOB_RUN_STATUS', title: '执行状态', width: 70, checkbox: false,formatter: jobCodeTranslate}
            , {field: 'JOBSTARTTIME', title: '开始执行时间', width: 120, checkbox: false}
            , {field: 'JOBENDTIME', title: '执行结束时间', width: 120, checkbox: false}
            , {field: 'JOBRUNORG', title: '执行机构', width: 70, checkbox: false}
            , {field: 'JOBRUNUSER', title: '执行用户', width: 70, checkbox: false}];

        initJobstable("<%=path%>/jobs/list", "<%=path%>/jobs/second", ["JOB_ID"], JobscolumnsArr);
    })();
</script>
