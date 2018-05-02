/*
 * Dialog Layer
 * @author Arley Joe
 * @date   2016-11-21
 * @copyright
 * 
 * 
 * @params type : 弹出层类型
 * @params params : 配置参数
 * 		默认参数配置 ： this.defaults
 * 		
 * @params callback : 全局回调函数
 * 
 * alert open success error
 * */

var DialogLayer = function(type, params, callback) {
	//对传入的参数进行检测
	if( !type ) {
		return;
	}

	if(typeof type != "string"){
		return;
	}

	if(typeof type == "string") {
		this.type = type;
	}

	if(typeof params != "object"){
		params = {};
	}

	if(typeof params == "function"){
		callback = params;
	}


	this.defaults = {
		//以下所有主内容区皆为指向content部分
		closeBtn : false,					//是否需要关闭按钮
		drug : false,						//是否开启拖拽功能（拖拽触发区域：dialog的header）
		moving : false,					//控制鼠标拖拽开始或结束
		target : "#dialog-layer",			//对话框目标元素选择器
		minWidth : 600,					//对话框最小宽度
		maxWidth : 800,					//对话框最大宽度
		maxHieght : 200,					//对话框主内容区最大高度 
		minHeight : 60,					//对话框主内容区高度
		title : "提醒",				//对话框的title
		content : "",			//对话框主内容区显示内容
		button : ["确定","取消"],			//按钮文本配置项
		duration : 5000,					//跳转倒计时（只适用于success中）
		href : "",							//计时结束后的跳转路径
		maskClose : true,					//是否点击遮罩层关闭
		errorMsg : "",						//错误提示信息
		"input" : 	{						//输入框类型配置项
			show : false,
			label : "",
			type : 'text',
			value : '',
			name : '',
			id : '',
			placeholder : '',
			width : 160,
			height : 30
		},
		"select" : 	{
			show : false,
			value : '',
			size : '',
			width : 120,
			height : 30,
			options : "",
			defaultOption : "全部"
		},
		"textarea" : 	{
			show : false,
			value : '',
			name : '',
			rows : '',
			cols : '',
			width : '90%',
			height : 200,
			placeholder : '',
			maxlength : 1000
		},
		"onConfirm" : null,
		"onCancel" : null,
		"onClose" : null
	};



	this.options = $.extend(true,{},this.defaults,params);
	this.target = $(this.options.target);


	//针对主内容区有input/select/textarea的特殊处理
	if(this.options.input.show) {
		this.options.content = this.options.content.replace(/input/g, '<input type="'+ this.options.input.type +'" id="'+ this.options.input.id +'" name="'+ this.options.input.name +'" value="'+ this.options.input.value +'" placeholder="'+ this.options.input.placeholder +'"style="width:'+ this.options.input.width +'px;height:'+ this.options.input.height +'px;" />' + this.options.input.label);
	}

	if(this.options.select.show) {
		var options = this.options.select.options.split(",");
		var opEle = '<option value=0>'+ this.options.select.defaultOption +'</option>';
		for(var i = 0, len = options.length; i < len ; i++) {
			opEle += '<option value="'+ (parseInt(i) + 1) +'">'+ options[i] +'</option>';
		}
		this.options.content = this.options.content.replace(/select/g, '<select id="dialog-layer-select" size="'+ this.options.select.size +'"  style="width:'+ this.options.select.width +'px;height:'+ this.options.select.height +'px;margin:0 5px;">'+ opEle +'</select>');
	}

	if(this.options.textarea.show) {
		this.options.content = this.options.content.replace(/textarea/g, '<br /><br /><textarea id="dialog-layer-textarea" placeholder="'+ this.options.textarea.placeholder +'" maxlength="'+ this.options.textarea.maxlength +'" style="width:'+ this.options.textarea.width +';height:'+ this.options.textarea.height +'px;margin:0 auto;border-radius:5px;"></textarea>');
	}

	this.requiredSource = function () {
		var head = $("head");
		var body = $("body");
		var link = '<link rel="stylesheet" href="../static/dialog/dialog-layer.css">';
		head.append(link);
	};

	this.dom = {
		"container" : 	'<div id="dialog-layer" class="dialog-layer">'
		+'	<div class="dialog-container">'
		+'		<div class="dialog-header" onselectstart="return false;" style="-moz-user-select:none;"><span class="title-text">'+ this.options.title + '</span>' + ((this.options.closeBtn) ? ('<a href="javascript:;" class="dialog-close-btn">X</a>') : '') +'</div>'
		+'		<div class="content">'
			//+'			<p>'+ this.options.content +'</p>'
		+'			<p></p>'
		+'		</div>'
		+'		<div style="display: none;" class="error_msg" id="errorMsg">'+ this.options.errorMsg +'</div>'
		+'	</div>'
		+'</div>',

		"button" : 	'<div class="dialog-btn">'
		+ (this.options.button[0] ? ('<a href="javascript:;" class="confirm">'+ this.options.button[0] +'</a>') : '')
		+ (this.options.button[1] ? ('<a href="javascript:;" class="cancel">'+ this.options.button[1] +'</a>') : '')
		+'</div>',
		"input" : '<input type="'+ this.options.input.type +'" id="'+ this.options.input.id +'" name="'+ this.options.input.name +'" value="'+ this.options.input.value +'" placeholder="'+ this.options.input.placeholder +'" width="'+ this.options.input.width +'px" height="'+ this.options.input.height +'px" />' + this.options.input.label
	};

	this.alert = function(container, content) {
		container.append(this.dom.button);
		content.find("p").text(this.options.content);
	};

	this.open = function(container, content) {
		container.append(this.dom.button);
		content.find("p").html(this.options.content);
	};

	this.success = function(content) {
		var _this = this;

		var c = this.options.content;
		var d = c.replace(/[^0-9]/ig,""),
				duration = d * 1000;
		if(duration == "" || duration == undefined || duration == null) {
			throw Error("duration is not defined");
		} else {
			this.options.content = c.replace(d, "<span class='jump-time'>"+ d +"</span>");
			content.append(this.dom.button).find("p").append(this.options.content);
			this.options.onConfirm = function(_this) {
				window.location.href = this.href;		//当前的this指向为options.
			};
			var stimer = setInterval(function() {
				d--;
				content.find(".jump-time").text(d);
				if(d <= 0){
					clearInterval(stimer);
					window.location.href = _this.options.href;
				}
			}, 1000);
		}
	};

	this.error = function() {

	};



	this.createDom = function() {
		var _this = this;

		var dialog = this.target[0];
		if(!dialog) {
			var body = $(document.body);
			body.append(this.dom.container);
			this.target = $(this.options.target);


			var container = this.target.find(".dialog-container"),
					content = container.find(".content");

			if(this.type == "alert") {
				this.alert(container, content);
			}

			if(this.type == "open") {
				this.open(container, content);
			}

			if(type == "success") {
				this.success(content);
			}
		}

		return this.target = $(this.options.target);	//修改this.target的初始值
	};

	//计算弹出层的位置
	this.setPosition = function() {
		var container = this.target.find(".dialog-container"),
				content = this.target.find(".content");
				windowWidth = $(window).width(),
				windowHeight = $(window).height(),
				targetWidth = container.width(),
				targetHeight = container.height(),
				contentHeight = content.height();

		if(parseFloat(targetWidth) <= 600) {
			this.options.minWidth = 600;
		} else {
			targetWidth = 800;
		}

		if(parseFloat(contentHeight) < 60) {
			content.css({
				"min-height" : this.options.minHeight + "px",
				"line-height" : this.options.minHeight + "px"
			});
		}

		container.css({
			"min-width" : this.options.minWidth + "px",
			"max-width" : this.options.maxWidth + "px",
			'left' : (windowWidth - targetWidth)/2  + "px",
			"top" : (windowHeight - targetHeight)/2 - 50 + "px"		//该位置优化50px的top值
		});
	};

	//关闭逻辑
	this.close = function() {
		this.target.remove();
	};


	//绑定事件
	this.bindEvent = function() {
		var _this = this;

		var isClickMask = false;								//是否点击遮罩层
		var container = this.target.find(".dialog-container");
		confirmBtn = this.target.find(".confirm"),
				cancelBtn = this.target.find(".cancel"),
				closeBtn = this.target.find(".dialog-close-btn");


		/*container.off("click").on("click", function(e) {
			var e = e || window.event;
			e.stopPropagation();
		});*/

		//console.log(this.target[0]);
		this.target.off("mousedown").on("mousedown", function(e) {
			var e = e || window.event;
			//e.preventDefault();
			e.stopPropagation();
			var id = e.target.id;
			//console.log(id);
			if (_this.options.maskClose) {
				if(id == "dialog-layer") {
					isClickMask = true;
				}
			}

		}).off("mouseup").on("mouseup", function(e) {
			var e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			if(isClickMask) {
				_this.close();
			}
		});

		confirmBtn.off("click").on("click", function(e) {
			var e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			_this.options.onConfirm && _this.options.onConfirm(_this);
		});

		cancelBtn.off("click").on("click", function(e) {
			var e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			if(_this.options.onCancel) {
				_this.options.onCancel(_this);
			} else {
				_this.close();
			}

		});

		closeBtn.off("click").on("click", function(e) {
			var e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			if(_this.options.onClose) {
				_this.options.onClose(_this);
			} else {
				_this.close();
			}
		});
	};


	//辅助功能 —— 拖拽(只能在header区域控制拖拽)
	this.drag = function() {
		var _this = this;
		var d = $(document),
				cont = this.target.find(".dialog-container"),
				title = cont.find(".dialog-header"),
				contWidth = cont.width(),
				contHeight = cont.height(),
				contLeft = cont.css("left"),
				contTop = cont.css("top"),
				windowW = d.width(),
				windowH = d.height();

		var x,y;//移动距离

		var d = $(document);
		title.off("mousedown").on("mousedown", function(e) {
			_this.options.moving = true;
			//获取鼠标位置
			var e = e || window.event;
			e.stopPropagation();
			e.preventDefault();
			x = e.pageX - parseInt(contLeft);		//获得左边位置
			y = e.pageY - parseInt(contTop);		//获得上边位置
			//console.info({'x':e.pageX,'y':e.pageY});

		}).off("mouseup").on("mouseup", function(e) {
			_this.options.moving = false;
			var e = e || window.event;
			e.stopPropagation();
			e.preventDefault();
			//console.info({'x':e.clientX,'y':e.clientY});
		}).off("mousemove").on("mousemove", function(e) {
			var e = e || window.event;
			e.stopPropagation();
			e.preventDefault();
			var target = $(e.target);
			if(target.hasClass("dialog-header")) {
				if(_this.options.moving) {
					var _x = e.pageX - x;					//移动时根据鼠标位置计算控件左上角的绝对位置
					if(_x <= 0) {
						_x = 0
					};
					_x = Math.min(windowW - contWidth, _x) + 10;
					var _y = e.pageY - y;
					if( _y <= 0) {
						_y = 0
					};
					_y = Math.min(windowH - contHeight, _y) + 10;
					cont.css({			//控件新位置
						top : _y,
						left : _x
					});
				}
			}
		})/*.off("mouseleave").on("mouseleave", function(e) {
		 var e = e || window.event;
		 e.stopPropagation();
		 _this.options.moving = false;
		 })*/;
	};

	this.init = function() {
		//this.requiredSource();
		this.createDom();
		this.setPosition();
		this.bindEvent();

		if(this.options.drug) {
			this.drag();
		} else {
			this.target.find(".dialog-header").css({
				"cursor" : "default"
			});
		}

	};

	this.init();

	return this;
};

var dialog = function(type, params, callback) {
	var DialogLayerModule = new DialogLayer(type, params, callback);
	return DialogLayerModule;
};