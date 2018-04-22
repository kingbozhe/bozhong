
(function($){
	
    $.fn.select = function (options) {
    	$this = $(this);
    	
    	if(options == 'clear'){
    		$this.empty();
    		$this.append($("<option></option>"));
    	}else{
    		options = $.extend({
    			url: '',
    			textfield: 'text',
    			valuefiled: 'value',
    			emptyOption: true,
    			onSelect: function(){},
    			parameter: ''
    		}, options || {});
    		
    		if ($this.children().length === 0) {
    			$this.append('<option></option>');
    		}
    		
    		$this.empty().append('<option>加载中...</option>');
    		
    		$.ajax({url: options.url, type: 'get', dataType: "json", async: false,
    			success: function (json) {
    				if (json.length > 0) {
    					$this.empty();
    					$this.append($("<option></option>"));
    					$.each(json, function (i, item) {
    						$this.append($("<option></option>")
    								.attr("value", eval("item." + options.valuefiled))
    								.text(eval("item." + options.textfield)));
    					});
    				}else {
    					$this.empty().append('<option></option>');
    				}
    			}
    		});
    		
    		$(this).bind("change", function () {
    			if (typeof options.onSelect == "function"){ 
    				options.onSelect(); 
    			}
    		});
    		
    		return options;
    	}
	};
	
	$.fn.AddOption = function (text, value, selected, index) {
		option = new Option(text, value);
		this[0].options.add(option, index);
		this[0].options[index].selected = selected;
	};
	
	$.fn.selectOption = function (type, index) {
		this[0].options[index].selected = true;
	};
	
	$.fn.selectOption = function (value) {
		$.each(this[0].options, function(i, item){
			if(value == item.value){
				this[0].options[i].selected = true;
			}
		});
	};
 

	
	
})(jQuery);