/**
 * 获得指定id的jqgrid的colNames数组
 * @param gridId
 * @author CunZhang
 * @returns {Array}
 */
function getJqGridColNames(gridId){
	var colNames = $(gridId).jqGrid('getGridParam', 'colNames');
	var temp = new Array();
	if(colNames != null){
		for(var i=0; i<colNames.length; i++){
			temp[i] = colNames[i];
		}
	}
	return temp;
}

/**
 * 获得指定id的jqgrid的colModel的index数组
 * @param gridId
 * @author CunZhang
 * @returns {Array}
 */
function getJqGridColModelNames(gridId){
	var colModel = $(gridId).jqGrid('getGridParam', 'colModel');
	var indexs = new Array();
	if(colModel != null){
		for(var i=0; i<colModel.length; i++){
			indexs[i] = colModel[i].name;
		}
	}
	return indexs;
}

/**
 * 自动换行的formatter方法
 * @param cellvalue
 * @param options
 * @param rowObject
 * @author CunZhang
 * @returns {String}
 */
function autoLineFeed_10(cellvalue, options, rowObject){
	var valueArr = cellvalue.split('');
	var newValue = "";
	for(var i=0; i<valueArr.length; i++){
		if(i != 0 && i%10 == 0){
			newValue += valueArr[i] + "</br>";
		}else{
			newValue += valueArr[i];
		}
	}
	return newValue;
}

/**
 * 将时间装换为特定的显示格式
 */
function dataforrmat(cellValue){
	if(cellValue == "" || cellValue == undefined){
		return "";
	}
	var datetime = new Date(cellValue);
	var year = datetime.getFullYear();
	var month = datetime.getMonth()+1;//js从0开始取 
	var date = datetime.getDate(); 
	var hour = datetime.getHours(); 
	var minutes = datetime.getMinutes(); 
	var second = datetime.getSeconds();
	 
	if(month<10){
		month = "0" + month;
	}
	if(date<10){
		date = "0" + date;
	}
	if(hour <10){
		hour = "0" + hour;
	}
	if(minutes <10){
		minutes = "0" + minutes;
	}
	if(second <10){
		second = "0" + second ;
	}
	 
	var time = year+"-"+month+"-"+date+" "+hour+":"+minutes+":"+second; //2009-06-12 17:18:05
	// alert(time);
	return time;
}

/**
 * 将状态码转化为文字
 * @param cellValue
 */
function statFormat(cellValue){
	if(cellValue == "1"){
		return "正常";
	}else if(cellValue == "0"){
		return "废止";
	}else if(cellValue == "2"){
		return "无效";
	}else if(cellValue == "3"){
		return "删除";
	}else{
		return cellValue;
	}
}

/**
 * 将状态码转化为值
 * @param statDesc
 */
function statFormatResolve(statDesc){
	if(statDesc == "正常"){
		return "1";
	}else if(statDesc == "废止"){
		return "0";
	}else if(statDesc == "无效"){
		return "2";
	}else if(statDesc == "删除"){
		return "3";
	}else{
		return "";
	}
}

/**
 * 将链接/设置为kong 
 * @param cellValue
 */
function lnkFormat(cellValue){
	if(cellValue == "/"){
		return "";
	}else{
		return cellValue;
	}
}

/**
 * 将一个时间转化为yy-MM-dd格式
 * @param value
 * @returns {String}
 */
function dateFormatyyMMdd(cellValue){
	if(cellValue == "" || cellValue == undefined){
		return "";
	}
	var datetime = new Date(cellValue);
	var year = datetime.getFullYear();
	var month = datetime.getMonth()+1;//js从0开始取 
	var date = datetime.getDate(); 
	 
	if(month<10){
		month = "0" + month;
	}
	if(date<10){
		date = "0" + date;
	}
	var time = year+"-"+month+"-"+date; //2009-06-12 17:18:05
	// alert(time);
	return time;
}

/**
 * 将一个时间格式的字符串yy-MM-dd hh:mm:ss转化为yy-MM-dd格式
 * @param value
 * @returns {String}
 */
function dateStrFormatyyMMdd(cellValue){
	return cellValue.split(" ")[0];
}