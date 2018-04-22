/**
 * 将页面中的必填选项输入框设置为红色
 * 
 * @param form
 *            表单名称
 * @param validateOption
 *            验证操作名
 */
common.requiredHint = function(form, validateOption) {
	/** 判断validate中是否存在required属性的字段 */
	if (validateOption != null) {
		var myrules = validateOption.rules;
		if (myrules != null) {
			for ( var item in myrules) {
				if (myrules[item].required) {
					$(":input[name=" + item + "]", '#' + form).addClass(
							"inputborder");
				}
			}
		}
	}
	/** 判断input属性中是否存在required属性 */
	var inputs = $(':input', '#' + form);
	if (inputs != null) {
		for ( var i = 0; i < inputs.length; i++) {
			if (inputs[i].required) {
				$("#" + inputs[i].id).addClass("inputborder");
			}
		}
	}
};