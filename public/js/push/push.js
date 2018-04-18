$(function($){
//	warm();
	windowInFocus();
	getMessagesInfo('#header_messages');
});



/*setInterval('warm();', 1000*60*5);  //每隔5分钟循环执行过程函数！

function warm() {
	$.post(contextPath+"/api/message/getNotice?query_type=1",function(data){
    	if(data.count > '0'){
    		$('#newMes,#header_message').addClass('newMes active');
    	}else if(data.count =='0'){
    		$('#newMes,#header_message').removeClass('newMes active');
    	}
    });
}*/


var Cookie = {
	    set : function (name, value, expiredays, path, callback) {
	        var exdate = new Date();
	        exdate.setDate(exdate.getDate() + expiredays);
	        document.cookie = name + "=" + escape(value) + ((expiredays==null) ? "" : ";expires=" + exdate.toGMTString()) + ";" + ((path==null) ? "" : "path=" + escape(path));
	        if (typeof callback == "function") {
	            callback && callback();
	        }
	    },
	    del : function (name, callback) {
	        var exp = new Date();
	        exp.setTime(exp.getTime() - 1);
	        var cval = getCookie(name);
	        if(cval != null) {
	            document.cookie= name + "="+ cval +";expires="+exp.toGMTString();
	        }
	        if (typeof callback == "function") {
	            callback && callback();
	        }
	    },
	    get : function (name, callback) {
	        if (document.cookie.length > 0) {
	            var arr,
	                    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	            if(arr = document.cookie.match(reg))
	                return arr[2];
	            else
	                return null;
	        }
	        if (typeof callback == "function") {
	            callback && callback();
	        }
	    }
	};

/**
 * 判断当前窗口是否为USER屏幕最前端视口
 * @author Arley   01|12|2016
 *
 * 该方法必须声明全局变量：WINDOWFOCUS
 * 依赖于jQuery。
 *
 */
var WINDOWFOCUS = true; //该全局变量用于保存当前页面是否在屏幕最前端（即：未最小化或是未切换任务栏）
function windowInFocus () {
	$(window).on("focus", function () {
		WINDOWFOCUS = true;
	});
	$(window).on("blur", function () {
		WINDOWFOCUS = false;
	});
	return true;
}

/**
 *  主导航的message查询
 *  @author Arley   12|12|2016
 *  @param selector 选择器
 */

function getMessagesInfo(selector) {
	if (!selector) {
		return;
	} else if (typeof selector != 'string') {
		console.log("The parameters of 'selector''s type must be a string.");
		return;
	}
	var cookieValue = Cookie.get("logininfo");
	var getMessages = function () {
		var newMessage = 0;
		$.post(contextPath+"/api/message/getNotice?query_type=1",function(datas){
			var data = eval(datas);
			if (data.error_code == 0) {
				$("#header_image_url").attr("src",data.image_url);
				$("#header_username").html(data.name);
				$("#id_center").show();
				//if (data.cookie != cookieValue) {
					//alert("登录失效，请重新登录");
					//window.location.href = contextPath + "/login/logout";
				//} else {
					if (data.other_count > 0) {
						newMessage = data.other_count;
						$(selector).addClass('active');
						$(".message_count").find("span").text(data.other_count).end().show();
					} else if(data.other_count =='0'){
                        $(selector).removeClass('active');
                        $(".message_count ").hide().find("span").text("");
                        $(".message_tip").hide().find(".count").text("");
                    }
					if(data.count > '0'){
						/*newMessage = data.count;
						$(selector).addClass('active');
						$(".message_count").find("span").text(data.count).end().show();*/
						// $(".message_tip").show().find(".count").text(data.count);
						//五秒钟后隐藏页面提示框。
						var timer = setTimeout(function () {
							$(".message_tip").hide();
							clearTimeout(timer);
						}, 5000);
						//当前页面处于屏幕最前端视口时不弹出桌面提示
						if (!WINDOWFOCUS) {
							messageNotification("快收单", "您有"+ data.count +"条待处理事项", contextPath + "/home", contextPath + "/static/icon/kuaisd_m_logo.png");
						}
					}/*else if(data.count =='0'){
						$(selector).removeClass('active');
						$(".message_count ").hide().find("span").text("");
						// $(".message_tip").hide().find(".count").text("");
					}*/
				//}
			} else if (data.error_code == 800||data.error_code == 1000) {
				alert("登录失效，请重新登录");
				window.location.href = contextPath + "/login/logout";
			} else {
				// alert(data.error_msg);
				console.log(data.error_msg);
			}
		});
		return newMessage;
	};
	getMessages();
	setInterval(function () {
		//var mCount = getMessages();
		getMessages();
		//调用消息提醒功能
		//messageNotification("快收单", "您有"+ mCount +"条待处理事项", contextPath + "/home", contextPath + "/static/icon/kuaisd_m_logo.png");
	}, 300000);
}

/**
 *  桌面消息提醒功能
 *  @author Arley   07|03|2017
 *  @param title          ：消息通知头字符串
 *  @param showDetailInfo ：消息通知主体内容字符串
 *  @param href           ：点击消息通知后的跳转路径字符串
 *  @param icon           ：消息通知图标的URL字符串
 *  @returns {*}
 */
function messageNotification (title, showDetailInfo, href, icon) {
	if (!!title) {
		if (typeof title != 'string') {
			throw new Error("The parameter of 'title''s type must be a string.");
			return;
		}
	} else {
		throw new Error("The parameter of 'title' is not defined.");
	}

	if (!!showDetailInfo) {
		if (typeof showDetailInfo != 'string') {
			throw new Error("The parameter of 'showDetailInfo''s type must be a string.");
			return;
		}
	} else {
		throw new Error("The parameter of 'showDetailInfo' is not defined.");
	}

	if (!!href) {
		if (typeof href != 'string') {
			throw new Error("The parameter of 'href''s type must be a string.");
			return;
		}
	} else {
		throw new Error("The parameter of 'href' is not defined.");
	}

	if (!!icon) {
		if (typeof icon != 'string') {
			throw new Error("The parameter of 'icon''s type must be a string.");
			return;
		}
	} else {
		throw new Error("The parameter of 'icon' is not defined.");
	}

	var NotificationHandler = {
		isNotificationSupported: 'Notification' in window,
		isPermissionGranted: function() {
			return Notification.permission === 'granted';
		},
		requestPermission: function() {
			if (!this.isNotificationSupported) {
				//console.log('the current browser does not support Notification API');
				alert("该浏览器目前不支持消息推送，请更换Chrome浏览器打开");
				return;
			}

			Notification.requestPermission(function(status) {
				//status是授权状态，如果用户允许显示桌面通知，则status为'granted'
				//permission只读属性
				//var permission = Notification.permission;
				//default 用户没有接收或拒绝授权 不能显示通知
				//granted 用户接受授权 允许显示通知
				//denied  用户拒绝授权 不允许显示通知
			});
		},
		showNotification: function() {
			if (!this.isNotificationSupported) {
				//console.log('the current browser does not support Notification API');
				alert("该浏览器目前不支持消息推送，请更换Chrome浏览器打开");
				return;
			}
			if (!this.isPermissionGranted()) {
				//console.log('the current page has not been granted for notification');
				this.requestPermission();
			}

			var n = new Notification(title, {
				tag : 1,
				renotify : true,
				requireInteraction : true,
				icon: icon,
				body: showDetailInfo
			});

			//onshow函数在消息框显示时会被调用
			//可以做一些数据记录及定时操作等
			/*n.onshow = function() {
			 //5秒后关闭消息框
			 setTimeout(function() {
			 n.close();
			 }, 5000);
			 };*/

			//消息框被点击时被调用
			//可以打开相关的视图，同时关闭该消息框等操作
			n.onclick = function() {
				window.location.href = href;
				n.close();
			};

			//当有错误发生时会onerror函数会被调用
			//如果没有granted授权，创建Notification对象实例时，也会执行onerror函数
			n.onerror = function() {
				console.log('Notification encounters an error.');
				//do something useful
			};

			//一个消息框关闭时onclose函数会被调用
			/*n.onclose = function() {
			 //do something useful
			 };*/
		}
	};

	return NotificationHandler.showNotification();
}

/**
 *  封装绑定事件
 *
 * @author Arley   22|12|2016
 * @param type
 * @param selector
 * @param callback
 * @returns {boolean}
 */

function bindEvents (type, selector, callback) {
	if (!type || !selector) {
		console.log("The parameters of 'type' or 'selector' is not defined.")
		return false;
	} else {
		if (typeof type != "string") {
			console.log("The parameters of 'selector''s type must be a string.");
			return false;
		}
		if (typeof selector != "string") {
			console.log("The parameters of 'selector''s type must be a string.");
			return false;
		}
	}
	if (!!callback && typeof callback != 'function') {
		console.log("The parameters of 'callback' is not defined or it's type is not a function.");
	}
	//input.trigger('input propertychange');
	var ele = $(selector);
	ele.off(type).on(type, function (e) {
		var e = e || window.event;
		callback && callback(e);
	});
}

/**
 * 需传递订单编号进行的页面跳转方法
 *
 * @param selector {string} 按钮的选择器
 * @param opt {Object} 额外传递的参数
 */
function  pageJump (selector, opt) {
	var options = {};
	if (opt) {
		options = $.extend({}, opt);
	}
	var btn = $(selector);
	btn.off("click").on("click", function () {
		var target = $(this);
		var financeId = $.trim(target.data("id"));
		var workflowId = $.trim(target.data("flow_id"));
		var advanceId = $.trim(target.data("advance_id"));
		var url = $.trim(target.data("url"));
		financeId && (options.finance_id = financeId);
		workflowId && (options.id = workflowId);
        advanceId && (options.advance_id = advanceId);
		locationTo({
			action : url,
			param : options
		});
	});
}

/**
 * 图片查看大图功能
 * @author Arley Joe 2017年11月27日17:05:01
 * @param selector {String} 图片列表的容器（选择器或者DOM元素）
 */
function viewLargeImage (selector) {
    var selectorName = selector || '#viewerImageList';
    var galley = $(selectorName);

    galley.each(function (i, t) {
        // var imgItem = $(this).find('.img_item');
        var imgItem = $(this).find('img');
        if (imgItem.length > 0) {
            var viewer = new Viewer(t, {
                url: 'data-original',
                interval : 2000,
                loop : true,
                toolbar: {
                    zoomIn : true,
                    zoomOut : true,
                    oneToOne: true,
                    reset : true,
                    prev: function() {
                        viewer.prev(true);
                    },
                    play: true,
                    next: function() {
                        viewer.next(true);
                    },
                    rotateLeft : true,
                    rotateRight : true,
                    flipHorizontal : true,
                    flipVertical : true,
                    download: function() {
                        const a = document.createElement('a');
                        a.href = viewer.image.src;
                        a.download = viewer.image.alt;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    }
                }
            });
        }
    });
}