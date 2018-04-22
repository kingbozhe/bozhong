/*
 * 由于OPTION元素不能通过display：none hide等来隐藏
 * 所以通过dom缓存的方法来实现select的缓存工作
 */

$(function(){
	//Bind the change event 
	$("#dropLang").unbind("change",eDropLangChange).bind("change", eDropLangChange); 
	$("#dropFrame").unbind("change",eDropFrameChange).bind("change", eDropFrameChange); 
}); 

//The change event of language dropdown-list 
var eDropLangChange = function(){
	//The selected value of the language dropdown-list. 
	var selectedValue = $(this).val(); 
	
	//show all options. 
	$("#dropFrame").children("span").each(function(){ 
		$(this).children().clone().replaceAll($(this)); //use the content of the <span> replace the <span> 
	}); 
	
	//Filter the data through selected value of language dropdown-list except <Please Select>. 
	//If the option is <Please Select>, it only needs to show all and hide nothing. 
	if(parseInt(selectedValue) != 0){
		//hide the option whose parentid is not equal with selected value of language dropdown-list. 
		//The <Please Select> option should not be hidden. 
		$("#dropFrame").children("option[parentid!='" + selectedValue + "'][value!='0']").each(function(){
			$(this).wrap("<span style='display:none'></span>"); //add a <span> around the <option> and hide the <span>. 
		}); 
	} 
}; 

//The change event of frame dropdown-list. 
var eDropFrameChange = function(){
	//Find the selected option of frame dropdown-list. set the value of language dropdown-list by selected parentid. 
	$("#dropLang").val($(this).children("option:selected").attr("parentid")); 
}; 