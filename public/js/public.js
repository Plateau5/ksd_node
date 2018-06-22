/**
 * Created by Arley on 2016/12/01.
 */

//'use strict';
// var VERSION = '2.1.0';
// var contextPath = '';
// var LOCALURL = window.location;
// var DOMAIN = '';

/**
 * 扩展Date()方法的格式化
 * @author Arley   07|04|2017
 *
 * @param fmt {string} :  "yyyy/MM/dd qq hh/mm/ss" 注：该规则字符串可随意删减部分传入。
 * @returns {*}
 */
Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
};
Date.prototype.getQuarter = function() {
    var month = this.getMonth();
    if(month  < 3) {
        return 1;
    }else if(month < 6) {
        return 2;
    }else if(month < 9) {
        return 3;
    }else if(month < 12) {
        return 4;
    }
};

/**
 * 扩展数组的删除方法
 * @param val
 * @returns {number}
 */
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
String.prototype.number = function () {
    return Number(this);
};
String.prototype.trim = function () {
    return $.trim(this);
};
Number.prototype.number = function() {
    return Number(this);
};
// ----------------------------------------------------------------------
// <summary>
// 限制只能输入数字
// </summary>
// ----------------------------------------------------------------------
$.fn.onlyNum = function () {
    $(this).keypress(function (event) {
        var eventObj = event || e;
        var keyCode = eventObj.keyCode || eventObj.which;
        if ((keyCode >= 48 && keyCode <= 57))
            return true;
        else
            return false;
    }).focus(function () {
        //禁用输入法
        this.style.imeMode = 'disabled';
    }).bind("paste", function () {
        //获取剪切板的内容
        var clipboard = window.clipboardData.getData("Text");
        if (/^\d+$/.test(clipboard))
            return true;
        else
            return false;
    });
};
// ----------------------------------------------------------------------
// <summary>
// 限制只能输入字母
// </summary>
// ----------------------------------------------------------------------
$.fn.onlyAlpha = function () {
    $(this).keypress(function (event) {
        var eventObj = event || e;
        var keyCode = eventObj.keyCode || eventObj.which;
        if ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122))
            return true;
        else
            return false;
    }).focus(function () {
        this.style.imeMode = 'disabled';
    }).bind("paste", function () {
        var clipboard = window.clipboardData.getData("Text");
        if (/^[a-zA-Z]+$/.test(clipboard))
            return true;
        else
            return false;
    });
};
// ----------------------------------------------------------------------
// <summary>
// 限制只能输入数字和字母
// </summary>
// ----------------------------------------------------------------------
$.fn.onlyNumAlpha = function () {
    $(this).keypress(function (event) {
        var eventObj = event || e;
        var keyCode = eventObj.keyCode || eventObj.which;
        if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122))
            return true;
        else
            return false;
    }).focus(function () {
        this.style.imeMode = 'disabled';
    }).bind("paste", function () {
        var clipboard = window.clipboardData.getData("Text");
        if (/^(\d|[a-zA-Z])+$/.test(clipboard))
            return true;
        else
            return false;
    });
};

/**
 * **************************************
 * GLOBAL PATTERN FOR REGEXP
 * *************** START ****************
 */
var PHONEPATTERN = /^1[3|4|5|8|7|9|6]\d{9}$/;
var IDPATTERN = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9]$)/;
var TENCENTAPPID = '1256864073';
/**
 * **************** END ****************
 * GLOBAL PATTERN FOR REGEXP
 * **************************************
 */





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
 *  按钮禁用方法(IE下适用IE8以上)
 *  注意：该方法与 rebind 方法共同使用，切传入事件句柄必须相同
 *
 *  @author Arley   01|12|2016
 *
 *  @param selector         ：   目标元素选择器          string类型       必选项
 *  @Param type             ：   解除绑定事件类型        string类型       必选项
 *  @param eventHandler     ：   目标元素事件句柄                         必选项
 *  @param callback         ：   禁用后需要执行的逻辑                     可选项
 */
function disabled(selector, event, eventHandler, callback) {
    if (typeof selector != 'string') {
        return;
    }
    if (typeof event != 'string') {
        return;
    }
    if (typeof eventHandler != 'function' || Boolean(eventHandler) == false) {
        return;
    }
    if (!!callback) {
        if (typeof callback != 'function') {
            return;
        }
    }
    var d = document.querySelectorAll(selector).item(0);
    if (d.removeEventListener) {
        d.removeEventListener(event, eventHandler, false);
    } else if (d.detachEvent) {   //兼容IE8及其他浏览器
        d.detachEvent('on' + event, eventHandler);
    } else {
        alert("该浏览器暂不支持这种方法，请选择其他方法")
    }
    callback && callback();
    return true;
}
/**
 *  按钮恢复绑定事件方法(IE下适用IE8以上)
 *  注意：该方法与 disabled 方法共同使用，切传入事件句柄必须相同
 *
 *  @author Arley   01|12|2016
 *
 *  @param selector         ： 目标元素选择器             string类型   必选项
 *  @Param type             :  解除绑定事件类型           string类型   必选项
 *  @param eventHandler     ： 目标元素事件句柄                        必选项
 *  @param callback         ： 重新绑定后需要执行的逻辑                 可选项
 */

function rebind (selector, event, eventHandler, callback) {
    if (typeof selector != 'string') {
        return;
    }
    if (typeof event != 'string') {
        return;
    }
    if (typeof eventHandler != 'function' || Boolean(eventHandler) == false) {
        return;
    }
    if (!!callback) {
        if (typeof callback != 'function') {
            return;
        }
    }
    var d = document.querySelectorAll(selector).item(0);
    if (d.addEventListener) {
        d.addEventListener(event, eventHandler, false);
    } else if (d.attachEvent) {  //兼容IE8及其他浏览器
        d.attachEvent('on' + event, eventHandler);
    } else {
        alert("该浏览器暂不支持这种方法，请选择其他方法");
    }
    callback && callback();
    return true;
}

/**
 *  分页功能
 *  @author Arley   04|12|2016
 *
 *  @param page     ：   当前页面索引值
 *  @param pageSize ：   每页显示列表数
 *  @param totalNum ：   列表总个数
 *
 */
function paging (page, pageSize, totalNum) {
    page = page || 1;
    pageSize = pageSize || 10;
    var totalPage = Math.ceil(totalNum / pageSize); // 总页数
    if (totalPage < 2) {return "";}
    page = Math.min(totalPage, page);
    var showNum = 5;	// 显示多少个页 * 2

    var start = Math.max(1, page - showNum);
    var end = Math.min(totalPage, page + showNum);

    // 不足 $showNum，补全左右两侧
    var right = page + showNum - totalPage;
    if(right > 0) start = Math.max(1, start -= right);
    var left = page - showNum;
    if(left < 0) end = Math.min(totalPage, end -= left);

    var s = '';
    s += '<a href="javascript:;" class="prev-page">上一页</a>';
    if(start > 1) s += '<a href="javascript:void(0)" data-index="1">1 '+(start > 2 ? '... ' : '')+'</a>';
    for(var i=start; i<=end; i++) {
        if(i == page) {
            s += '<a href="javascript:void(0)" data-index="' + i + '" class="page-active">'+i+'</a>';   // active
        } else {
            s += '<a href="javascript:void(0)" data-index="' + i + '">'+i+'</a>';
        }
    }
    if(end != totalPage) s += '<a href="javascript:void(0)" data-index="' + totalPage + '">'+(totalPage - end > 1 ? '... ' : '')+totalPage+'</a>';
    if(page != totalPage) s += '<a href="javascript:;" class="next-page">下一页</a>';
    return s;
}

//重定义Ajax调用
function redefineAjax (option) {
    var options = $.extend({}, option);
    //调用jQuery的ajax逻辑
    $.ajax({
        type : options.type || 'post',   //请求类型
        url : options.url || '',        //请求地址
        data : options.data || {},      //请求的参数
        dataType : options.dataType || 'json',     //返回值类型
        async : (options.async === false) ? false : true,      //TRUE: 异步；FALSE：同步，默认值
        processData : options.processData || true,      //序列化参数为String类型，默认：true。
        //contentType : options.contentType || true,      //内容编码，文件上传时设为FALSE
        timeout : options.timeout || 2000,         //时间
        //jsonpCallback : options.jsonpCallback || '',        //jsonp时设置的callback函数名
        beforeSend : function (XMLHttpRequest) {       //请求发送前的事件逻辑
            if (!!options.beforeSend) {
                options.beforeSend();
            }
        },
        complete : function (XMLHttpRequest) {       //请求完成的事件逻辑
            if (!!options.complete) {
                options.complete();
            }
        },
        success : function (res) {      //请求成功
            try {
                if (res) {
                    var data = JSON.parse(res);
                    options.success(data);
                } else {
                    console.log(JSON.stringify(res));
                    throw new Error('The redefineAjax method has an unknown error, and the return value is printed on top, check the return value.');
                }
            } catch (e) {
                // console.log(e.message);
                if (res) {
                    options.success(res);
                } else {
                    console.log(JSON.stringify(res));
                }
            }
        },
        error : function (XMLHttpRequest, textStatus, errorThrown) {        //请求失败
            if (!!options.error) {
                options.error();
            } else {
                //console.log(textStatus);
                // $alert('操作失败，请重新尝试');
            }
        },
        complete : function (XMLHttpRequest, textStatus) {      //请求完成
            if (!!options.complete) {
                options.complete();
            } else {
                return false;
            }
        }
    });
}


/**
 * 自定义jQuery的Ajax请求方法
 *  参数必选项：type,url,data,successHandler，其余为可选项。
 *
 *  @author Arley   06|12|2016
 *
 *  @param type     ：   请求类型，默认为“ POST ”
 *  @param url      ：   请求接口地址
 *  @param successHandler   ：   请求成功后的回调函数
 *  @param errorHandler     ：   请求失败后的回调函数
 *  @param beforeHandler    ：   请求发送前的执行函数
 *  @param conmleteHandler  ：   请求完成后的执行函数
 *  @param async    ：   异步或同步，默认为异步（true）
 *
 */

function $ajax (type, url, data, successHandler, errorHandler, beforeHandler, completeHandler, async) {
    if (!!type) {
        if (typeof type != 'string') {
            throw new Error("The parameter of 'type''s type must be a string.");
            return;
        }
    } else {
        throw new Error("The parameter of 'type' is not defined.");
    }

    if (!!url) {
        if (typeof url != 'string') {
            throw new Error("The parameter of 'url''s type must be a string.");
            return;
        }
    } else {
        throw new Error("The parameter of 'url' is not defined.");
    }

    var _data;
    if (typeof data == 'string') {
        var reg = /[-_=]/ig;
        if (reg.test(data)) {
            _data = data;
        } else {
            throw new Error("The parameter 'data' format is wrong.");
        }
    } else if (typeof data == 'object') {
        _data = data;
    } else {
        return  new Error('Parameter data is wrong');
    }

    if (!!successHandler && typeof successHandler != 'function') {
        return;
    }

    if (!!errorHandler && typeof errorHandler != 'function') {
        return;
    }

    if (!!beforeHandler && typeof beforeHandler != 'function') {
        return;
    }

    if (!!completeHandler && typeof completeHandler != 'function') {
        return;
    }

    if (!!async && async != false && async != true) {
        return;
    }

    $.ajax({
        type : type || 'post',
        url : url,
        data : _data,
        dataType : 'json',            //php接口GET方法时不对。
        async : async || true,
        timeout : 2000,
        contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
        beforeSend : beforeHandler,
        success : function (res) {
            try {
                if (res) {
                    var data = eval("("+ res +")");
                    successHandler(data);
                } else {
                    console.log(JSON.stringify(res));
                }
            } catch (e) {
                console.log(e.message);
                if (res) {
                    successHandler(res);
                } else {
                    console.log(JSON.stringify(res));
                }
            }
        },
        error : function (XMLHttpRequest, textStatus, errorThrown) {
            errorHandler();
        },
        complete : completeHandler
    });
    return true;
}


/**
 * 对原生Ajax书写进行封装
 * @author Arley   12|12|2016
 * @param options   ： 参数集合
 * 调用方式
 * xhrAjax({
 *       url: "string",                         //请求地址
 *       type: "POST",                          //请求方式 默认为POST
 *       data: { name: "super", age: 20 },      //请求参数
 *       dataType: "json",
 *       success: function (response, xml) {
 *           // 此处放成功后执行的代码
 *       },
 *       error: function (status) {
 *           // 此处放失败后执行的代码
 *       }
 *   });
 */

function xhrAjax(options) {
    options = options || {};
    options.type = (options.type || "POST").toUpperCase();
    options.dataType = options.dataType || "json";
    var params = formatParams(options.data);

    //首先检测xmlHttpRequest对象
    var xmlHttpRequest;
    if (window.XMLHttpRequest) {
        //针对FireFox，Mozilla，Opera，Safari，IE7，IE8
        xmlHttpRequest = new XMLHttpRequest();
        //针对某些特定版本的Mozilla浏览器的BUG进行修正
        if (xmlHttpRequest.overrideMimeType) {
            xmlHttpRequest.overrideMimeType("text/xml");
        }
    } else if (window.ActiveXObject) {
        //针对IE6，IE5.5，IE5
        //两个可以用于创建XMLHTTPRequest对象的控件名称，保存在一个js的数组中
        //排在前面的版本较新
        var activeXName = [ "MSXML2.XMLHTTP", "Microsoft.XMLHTTP" ];
        for ( var i = 0; i < activeXName.length; i++) {
            try {
                //取出一个控件名进行创建，如果创建成功就终止循环
                //如果创建失败，回抛出异常，然后可以继续循环，继续尝试创建
                xmlHttpRequest = new ActiveXObject(activeXName[i]);
                if(xmlHttpRequest){
                    break;
                }
            } catch (e) {
                console.log(e.message);
            }
        }
    }

    if (options.type == "GET") {
        xmlHttpRequest.open("GET", options.url + "?" + params, true);
        xmlHttpRequest.send(null);
    } else if (options.type == "POST") {
        xmlHttpRequest.open("POST", options.url, true);
        //设置表单提交时的内容类型
        xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        xmlHttpRequest.send(params);
    }
    xmlHttpRequest.onreadystatechange = function(){
        if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
            options.success && options.success(xhr.responseText, xhr.responseXML);
        } else {
            options.error && options.error(xmlHttpRequest.status);
        }
    }

    //格式化数据
    var formatParams = function (data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        arr.push(("v=" + Math.random()).replace(".",""));
        return arr.join("&");
    }
}


/**
 *	获取查询字符串的参数值（value）
 * @param name  	参数名   string
 * @param queryArr	查询数组 array
 * @returns {null}
 */
function getQuerystringParam (name, queryArr) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = queryArr || window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

/**
 *  tab标签及导航切换功能
 *  注：导航类型为不含二级导航
 *
 *  @author Arley   08|12|2016
 *
 * @param selector          ：   标签公用选择器
 * @param checkedSelector   ：   选中状态的选择器
 * @param callback          ：   选中后的回调函数
 */

function switcher (selector, checkedSelector, callback) {
    if (!selector && !checkedSelector) {
        return;
    }
    if (callback && typeof callback != 'function') {
        return;
    }

    var type,
        target = $(selector),
        reg = /\.|\[(.*?)\]/ig,
        b = checkedSelector.match(reg)[0],
        attr = b.replace(/\[|\]/ig, "");
    if ( b.indexOf(".") != -1) {
        type = "class";
        var c = checkedSelector.replace(/\.|\#|\[(.*?)\]/g, "");
    } else if (b.indexOf("[") != -1) {
        type = "attr";
        var attrName = attr.split("=")[0],
            attrValue = attr.split("=")[1].replace(/\"|\'/ig, "");
    } else {
        alert("The parameters of checkedSelector if no defined.");
    }

    target.each(function (i, obj) {
        var s = $(this);
        s.off("click").on("click", function (e) {
            var e = e || window.event;
            if (type == "class") {
                s.siblings(selector).removeClass(c).end().addClass(c);
                callback && callback(e);
            } else if (type = "attr") {
                s.siblings(selector).attr(attrName).end().attr(attrName, attrValue);
                callback && callback(e);
            } else {
                alert("The parameters of checkedSelector if no defined.");
                callback && callback(e);
            }
        })
    });
    return true;
}

/**
 *  重构（美化）后的复选框及单选框选中公用逻辑
 *
 * @author Arley   09|12|2016
 *
 * @param type              ：   [radio || checkbox]       string   使用类型
 * @param selector          ：   目标元素选择器              string
 * @param checkedSelector   ：   选中状态的选择器            string
 */

function resetCheckboxAndRadio (type, selector, checkedSelector, callback) {
    if (!type && !selector && !checkedSelector) {
        return;
    } else if (typeof type != 'string' && typeof selector != 'string' &&  typeof checkedSelector != 'string') {
        return;
    }
    if (callback && typeof callback != 'function') {
        return;
    }

    var tp,         //选中状态选择器的类型
        target = $(selector),
        reg = /\.|\[(.*?)\]/ig,
        b = checkedSelector.match(reg)[0],
        attr = b.replace(/\[|\]/ig, "");
    if ( b.indexOf(".") != -1) {
        tp = "class";
        var c = checkedSelector.replace(/\.|\#|\[(.*?)\]/g, "");
    } else if (b.indexOf("[") != -1) {
        tp = "attr";
        var attrName = attr.split("=")[0],
            attrValue = attr.split("=")[1].replace(/\"|\'/ig, "");
    } else {
        alert("The parameters of checkedSelector if no defined.");
    }

    if(type == 'radio') {
        //target.each(function (i, obj) {
        //     $(obj).off('click').on('click', function () {
            $('body').on('click', selector, function (e) {
                var ev = e || window.event;
                ev.stopPropagation();
                ev.preventDefault();
                var t = $(this);
                if (!t.hasClass("disabled")) {
                    if (tp == 'class') {
                        if (t.hasClass(c)) {
                            t.siblings(selector).removeClass(c).end().removeClass(c).siblings("input[type='radio']").attr('checked', false);
                            callback && callback();
                        } else {
                            t.siblings(selector).removeClass(c).end().addClass(c).siblings("input[type='radio']").attr('checked', true);
                            callback && callback();
                        }

                    } else if (tp == 'attr') {
                        if (!!t.attr(attrName)) {
                            t.siblings(selector).attr(attrName).end().attr(attrName, '').end().siblings("input[type='radio']").attr('checked', false);
                            callback && callback();
                        } else {
                            t.siblings(selector).attr(attrName).end().attr(attrName, attrValue).end().siblings("input[type='radio']").attr('checked', true);
                            callback && callback();
                        }

                    }
                } else {
                    return false;
                }
            })
        //})
    } else if (type == 'checkbox') {
        //target.each(function (i, obj) {
        //     $(obj).off('click').on('click', function () {
            $('body').on('click', selector, function () {
                var t = $(this);
                if (!t.hasClass("disabled")) {
                    if (tp == 'class') {
                        if (t.hasClass(c)) {
                            t.removeClass(c).siblings("input[type='checkbox']").attr("checked", false);
                            //console.log(t.siblings("input[type='checkbox']:checked").val());
                            //监听是否有全选按钮并处理选中逻辑
                            if (!t.hasClass("check_all")) {
                                checkboxMonitor(t);
                            }
                            callback && callback();
                        } else {
                            t.addClass(c).siblings("input[type='checkbox']").attr('checked', true);
                            //console.log(t.siblings("input[type='checkbox']:checked").val());
                            //监听是否有全选按钮并处理选中逻辑
                            if (!t.hasClass("check_all")) {
                                checkboxMonitor(t);
                            }
                            callback && callback();
                        }
                    } else if (tp == 'attr') {
                        if (!!t.attr(attrName)) {
                            t.attr(attrName, "").siblings("input[type='checkbox']").attr('checked', false);
                            //监听是否有全选按钮并处理选中逻辑
                            if (!t.hasClass("check_all")) {
                                checkboxMonitor(t);
                            }
                            callback && callback();
                        } else {
                            t.attr(attrName, attrValue).siblings("input[type='checkbox']").attr('checked', true);
                            //监听是否有全选按钮并处理选中逻辑
                            if (!t.hasClass("check_all")) {
                                checkboxMonitor(t);
                            }
                            callback && callback();
                        }
                    }
                } else {
                    return false;
                }
            })
        // })
    } else {
        return false;
    }
    return true;
}
// 切换事件绑定方式  2018年5月16日16:05:45
function resetCheckboxAndRadioNew (type, selector, checkedSelector, callback) {
    if (!type && !selector && !checkedSelector) {
        return;
    } else if (typeof type != 'string' && typeof selector != 'string' &&  typeof checkedSelector != 'string') {
        return;
    }
    if (callback && typeof callback != 'function') {
        return;
    }

    var tp,         //选中状态选择器的类型
        target = $(selector),
        reg = /\.|\[(.*?)\]/ig,
        b = checkedSelector.match(reg)[0],
        attr = b.replace(/\[|\]/ig, "");
    if ( b.indexOf(".") != -1) {
        tp = "class";
        var c = checkedSelector.replace(/\.|\#|\[(.*?)\]/g, "");
    } else if (b.indexOf("[") != -1) {
        tp = "attr";
        var attrName = attr.split("=")[0],
            attrValue = attr.split("=")[1].replace(/\"|\'/ig, "");
    } else {
        alert("The parameters of checkedSelector if no defined.");
    }

    if(type == 'radio') {
        //target.each(function (i, obj) {
        //     $(obj).off('click').on('click', function () {
        $('body').on('click', selector, function (e) {
            var ev = e || window.event;
            ev.stopPropagation();
            ev.preventDefault();
            var t = $(this);
            if (!t.hasClass("disabled")) {
                if (tp == 'class') {
                    if (t.hasClass(c)) {
                        t.siblings(selector).removeClass(c).end().removeClass(c).siblings("input[type='radio']").prop('checked', false);
                        callback && callback();
                    } else {
                        t.siblings(selector).removeClass(c).end().addClass(c).siblings("input[type='radio']").prop('checked', true);
                        callback && callback();
                    }

                } else if (tp == 'attr') {
                    if (!!t.attr(attrName)) {
                        t.siblings(selector).attr(attrName).end().attr(attrName, '').end().siblings("input[type='radio']").prop('checked', false);
                        callback && callback();
                    } else {
                        t.siblings(selector).attr(attrName).end().attr(attrName, attrValue).end().siblings("input[type='radio']").prop('checked', true);
                        callback && callback();
                    }

                }
            } else {
                return false;
            }
        })
        //})
    } else if (type == 'checkbox') {
        //target.each(function (i, obj) {
        //     $(obj).off('click').on('click', function () {
        $('body').on('click', selector, function () {
            var t = $(this);
            if (!t.hasClass("disabled")) {
                if (tp == 'class') {
                    if (t.hasClass(c)) {
                        t.removeClass(c).siblings("input[type='checkbox']").prop("checked", false);
                        //console.log(t.siblings("input[type='checkbox']:checked").val());
                        //监听是否有全选按钮并处理选中逻辑
                        if (!t.hasClass("check_all")) {
                            checkboxMonitor(t);
                        }
                        callback && callback();
                    } else {
                        t.addClass(c).siblings("input[type='checkbox']").prop('checked', true);
                        //console.log(t.siblings("input[type='checkbox']:checked").val());
                        //监听是否有全选按钮并处理选中逻辑
                        if (!t.hasClass("check_all")) {
                            checkboxMonitor(t);
                        }
                        callback && callback();
                    }
                } else if (tp == 'attr') {
                    if (!!t.attr(attrName)) {
                        t.attr(attrName, "").siblings("input[type='checkbox']").prop('checked', false);
                        //监听是否有全选按钮并处理选中逻辑
                        if (!t.hasClass("check_all")) {
                            checkboxMonitor(t);
                        }
                        callback && callback();
                    } else {
                        t.attr(attrName, attrValue).siblings("input[type='checkbox']").prop('checked', true);
                        //监听是否有全选按钮并处理选中逻辑
                        if (!t.hasClass("check_all")) {
                            checkboxMonitor(t);
                        }
                        callback && callback();
                    }
                }
            } else {
                return false;
            }
        })
        // })
    } else {
        return false;
    }
    return true;
}


/**
 * 复选框全选功能
 *  @author Arley   09/03|2017
 *
 * @param selector          ：   全选元素选择器              string
 * @param callback          ：   点击后执行的返回函数         function
 *
 */

function checkAll (selector, callback) {
    var target = $(selector);
    target.on("click", function () {
        var t = $(this);
        if (!t.hasClass("checked")) {
            var checkBoxInput = t.parents(".check_all_box").siblings(".form_container").find("input[type='checkbox']");
            checkBoxInput.each(function () {
                var e = $(this);
                e.siblings("label").addClass("checked");
                e.attr('checked', true);
            });
        } else {
            var checkBoxInput = t.parents(".check_all_box").siblings(".form_container").find("input[type='checkbox']");
            checkBoxInput.each(function () {
                var e = $(this);
                e.siblings("label").removeClass("checked");
                e.attr('checked', false);
            });
        }
    })
}


/**
 * 监听checkbox是否全部选中
 *
 * 该方法会在封装后的单复选按钮逻辑中调用。
 * @returns {boolean}
 */

function checkboxMonitor (that) {
    var parent = that.parents(".form_item");
    var checkAll = parent.find(".check_all_box .form_group .check_all").not("input");
    if (checkAll.length == 0) {
        return false;
    } else {
        var labels = parent.find(".form_group label").not(".check_all");
        var isCheckedAll = true;
        labels.each(function () {
            var t = $(this);
            if (!t.hasClass("checked")) {
                isCheckedAll = false;
            }
        });
        if (isCheckedAll) {
            if (!checkAll.hasClass("checked")) {
                checkAll.addClass("checked").siblings("input[type='checkbox']").attr('checked', true);
            }
        } else {
            if (checkAll.hasClass("checked")) {
                checkAll.removeClass("checked").siblings("input[type='checkbox']").attr('checked', false);
            }
        }
    }
}

/**
 * 展开折叠隐藏部分内容
 * @author Arley   31/03|2017
 *
 * @param selector {String}  调用元素选择器
 */
function dropDownIcon (selector) {
    var ele = $(selector),
        downIcon = '<em class="down_icon"></em>';
    var curHeight = ele.height(),
        maxHeight = parseInt(ele.css("max-height"));
    var childrenCount = ele.find(".form_group").length;
    var newHeight = ((childrenCount % 4) > 0) ? (Math.ceil(childrenCount / 4)) * 30 : Math.floor(childrenCount / 4) * 30;
    if (newHeight > maxHeight) {
        if (ele.length != 0 || ele.length != undefined) {
            ele.append(downIcon);
        }
    }
    //展开折叠按钮的点击事件
    ele.off("click").on("click", ".down_icon", function () {
        var t = $(this);
        if (t.hasClass("unfold")) {
            t.animate({"transform" : "rotate(180deg)"}, 1000);
            t.removeClass("unfold");
            ele.animate({'height': curHeight, "max-height": maxHeight}, 500);
        } else {
            t.animate({"transform" : "rotate(-180deg)"});
            t.addClass("unfold");
            ele.animate({'height': newHeight,  "max-height": newHeight}, 500);
        }
    })
}


/**
 *  筛选条件的选中及事件绑定
 *
 * @author Arley   22|12|2016
 * @param eventType         ： 绑定事件类型
 * @param selector          ： 目标元素选择器
 * @param checkedClassName  ： 选中状态类名称（此处必须为class）
 * @param callback          ： 绑定事件的回调函数
 * @returns {boolean}       ： 暂无
 */

function filtrateChoose (eventType, selector, checkedClassName, callback) {
    if (!selector || !checkedClassName) {
        console.log("The parameters of 'selector' or 'checkedSelector' is not defined.")
        return false;
    } else {
        if (typeof selector != "string") {
            console.log("The parameters of 'selector''s type must be a string.");
            return false;
        }
        if (typeof checkedClassName != "string") {
            console.log("The parameters of 'checkedClassName''s type must be a string.");
            return false;
        }
    }
    if (!!callback && typeof callback != 'function') {
        console.log("The parameters of 'callback' is not defined or it's type is not a function.");
    }

    var ele  = $(selector);
    if (ele.length == 0) {
        return false;
    }
    ele.each(function (obj, value) {
        var t = $(value);
        t.off(eventType).on(eventType, function (e) {
            var e = e || window.event;
            var _this = $(this);
            if (!_this.hasClass("disabled")) {
                _this.addClass(checkedClassName).siblings(selector).removeClass(checkedClassName);
                callback && callback(e);
            }
        })
    });
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
        console.log("The parameters of 'type' or 'selector' is not defined.");
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
                }else if(data.other_count =='0'){
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
                        $(".message_tip").hide().find(".count").text("");
                    }*/
                //}
            } else if (data.error_code == 800||data.error_code == 1000 || data.error_code == 802|| data.error_code == 804) {
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
        var mCount = getMessages();
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
 * COOKIE的增删查功能。
 */

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
 * 根据筛选条件加载列表页数据列表
 */

function searchBusinessList (firstLetter) {
    var id = $('body').find("form[role='form']").attr('id');
    var time = $("#filtrate_date").val() || '';
    var start_with = firstLetter;
    var cityId = $("select.city_select option:selected").val();
    var riskType = $("select.risk_type_select option:selected").val();
    var status = $("select.order_status_select option:selected").val();//状态筛选
    var alreadyRequest = $("select.req_type_select option:selected").val();//请款类型筛选
    var label_id = $("select#filtrate_tags option:selected").val();//GPS标签筛选
    var carType = $("select#typeBusiness option:selected").val();   // 商户-业务类型
    var merchantsStatus = $("select#merchantsState option:selected").val();   // 商户-状态
    var ownType = $("select#hadType option:selected").val();   // 商户-拥有状态
    var settlementType = $("select#settlementType option:selected").val();   // 商户-结算方式

    /*var CustomerStart = $("#start_loan_time").val() || '';  // 客户-放款时间开始
    var CustomerEnd = $("#end_loan_time").val() || '';   // 客户-放款时间结束
    var pigeonholeStatus = $("select#pigeonholeStatus option:selected").val();   // 客户-状态筛选
    var createName = $("#createName").val();   // 客户-订单所属人*/

    /*var timeorder_type = $("select#timeorder_type option:selected").val();   // 商户-放款时间
    var receipt_type = $("select#receipt_type option:selected").val();   // 商户-款项类型
    var orderby_type = $("select#orderby_type option:selected").val();   // 商户-放款排序方式
    var is_pass = $("select#is_pass option:selected").val();   // 商户-放款审核结果*/

    label_id && $("#"+id).append('<input type="hidden" id="label_id" name="label_id" value="'+ label_id + '" />');
    var gps_type = $("select#gps_type option:selected").val();//GPS类型筛选
    gps_type && $("#"+id).append('<input type="hidden" id="gps_type" name="gps_type" value="'+ gps_type + '" />');
    var city_id = $("select#filtrate_city option:selected").val();//GPS类型筛选
    city_id && $("#"+id).append('<input type="hidden" id="city_id" name="city_id" value="'+ city_id + '" />');
    (start_with == "全部") && (start_with = '');
    time && $("#"+id).append('<input type="hidden" id="time" name="time" value="'+ time+ '" />');
    start_with && $("#"+id).append('<input type="hidden" id="start_with" name="start_with" value="'+ start_with + '" />');
    cityId && $("#"+id).append('<input type="hidden" id="city_id" name="city_id" value="'+ cityId +'" />');
    status && $("#"+id).append('<input type="hidden" id="status" name="status" value="'+ status +'" />');
    alreadyRequest && $("#"+id).append('<input type="hidden" id="alreadyRequest" name="already_request" value="'+ alreadyRequest +'" />');
    riskType && $("#"+id).append('<input type="hidden" id="riskType" name="risk_type" value="'+ riskType +'" />');
    carType && $("#"+id).append('<input type="hidden" id="car_type" name="car_type" value="'+ carType +'" />');
    merchantsStatus && $("#"+id).append('<input type="hidden" id="status" name="status" value="'+ merchantsStatus +'" />');
    ownType && $("#"+id).append('<input type="hidden" id="own_type" name="own_type" value="'+ ownType +'" />');
    settlementType && $("#"+id).append('<input type="hidden" id="settlement_type" name="settlement_type" value="'+ settlementType +'" />');

    /*CustomerStart && $("#"+id).append('<input type="hidden" id="start_loan_time" name="start_loan_time" value="'+ CustomerStart + '" />');
    CustomerEnd && $("#"+id).append('<input type="hidden" id="end_loan_time" name="end_loan_time" value="'+ CustomerEnd + '" />');
    pigeonholeStatus && $("#"+id).append('<input type="hidden" id="pigeonholeStatus" name="pigeonhole_status" value="'+ pigeonholeStatus +'" />');
    createName && $("#"+id).append('<input type="hidden" id="createName" name="create_name" value="'+ createName + '" />');*/

    /*timeorder_type && $("#"+id).append('<input type="hidden" id="timeorder_type" name="timeorder_type" value="'+ timeorder_type +'" />');
    receipt_type && $("#"+id).append('<input type="hidden" id="receipt_type" name="receipt_type" value="'+ receipt_type +'" />');
    orderby_type && $("#"+id).append('<input type="hidden" id="orderby_type" name="orderby_type" value="'+ orderby_type +'" />');
    is_pass && $("#"+id).append('<input type="hidden" id="is_pass" name="is_pass" value="'+ is_pass +'" />');*/

    $("#"+id).submit();
}


/**
 * 分页切换事件
 * @param e  event || window.event
 */
function pageChange (e, firstLetter) {
    var target = $(e.target);
    if (target[0].tagName == "A") {
        target = target.parents(".page_item");
    }
    if (target.hasClass("disabled")) {
        return;
    } else {
        var id = $('body').find("form[role='form']").attr('id');
        var currentPage = $('.page_list .page_item.active').attr('currentPage') || '';
        var limit = $('.page_list .page_item.active').attr('limit') || '';
        var time = $("#filtrate_date").val() || '';     // 时间
        var start_with = firstLetter;
        var cityId = $("select.city_select option:selected").val(); // 城市
        var initial = $(".first_letter_conditions .personnel_query.active").text();
        var riskType = $("select.risk_type_select option:selected").val();
        var status = $("select.order_status_select option:selected").val();
        var alreadyRequest = $("select.req_type_select option:selected").val();//请款类型筛选
        var label_id = $("select#filtrate_tags option:selected").val();//GPS标签筛选
        var carType = $("select#typeBusiness option:selected").val();   // 商户-业务类型
        var merchantsStatus = $("select#merchantsState option:selected").val();   // 商户-状态
        var ownType = $("select#hadType option:selected").val();   // 商户-拥有状态
        var CustomerStart = $("#start_loan_time").val() || '';  // 客户-放款时间开始
        var CustomerEnd = $("#end_loan_time").val() || '';   // 客户-放款时间结束
        var CustomerArchivedStart = $("#start_pigeonhole_time").val() || '';  // 客户-归档时间开始
        var CustomerArchivedEnd = $("#end_pigeonhole_time").val() || '';   // 客户-归档时间结束
        var pigeonholeStatus = $("select#pigeonholeStatus option:selected").val();   // 客户-状态筛选
        var createName = $("#createName").val();   // 客户-订单所属人


        label_id && $("#"+id).append('<input type="hidden" id="label_id" name="label_id" value="'+ label_id + '" />');
        var gps_type = $("select#gps_type option:selected").val();//GPS类型筛选
        gps_type && $("#"+id).append('<input type="hidden" id="gps_type" name="gps_type" value="'+ gps_type + '" />');
        var city_id = $("select#filtrate_city option:selected").val();//GPS类型筛选
        city_id && $("#"+id).append('<input type="hidden" id="city_id" name="city_id" value="'+ city_id + '" />');
        (initial == "全部") && (initial = '');
        initial && $("#"+id).append('<input type="hidden" id="initial" name="initial" value="'+ initial + '" />');
        (start_with == "全部") && (start_with = '');
        time && $("#"+id).append('<input type="hidden" id="time" name="time" value="'+ time+ '" />');
        start_with && $("#"+id).append('<input type="hidden" id="start_with" name="start_with" value="'+ start_with + '" />');
        cityId && $("#"+id).append('<input type="hidden" id="city_id" name="city_id" value="'+ cityId +'" />');
        status && $("#"+id).append('<input type="hidden" id="status" name="status" value="'+ status +'" />');
        alreadyRequest && $("#"+id).append('<input type="hidden" id="alreadyRequest" name="already_request" value="'+ alreadyRequest +'" />');
        limit && $("#"+id).append('<input type="hidden" id="limit" name="limit" value="'+ limit +'" />');
        currentPage && $("#"+id).append('<input type="hidden" id="currentPage" name="currentPage" value="'+ currentPage +'" />');
        riskType && $("#"+id).append('<input type="hidden" id="riskType" name="risk_type" value="'+ riskType +'" />');
        carType && $("#"+id).append('<input type="hidden" id="car_type" name="car_type" value="'+ carType +'" />');
        merchantsStatus && $("#"+id).append('<input type="hidden" id="status" name="status" value="'+ merchantsStatus +'" />');
        ownType && $("#"+id).append('<input type="hidden" id="own_type" name="own_type" value="'+ ownType +'" />');
        CustomerStart && $("#"+id).append('<input type="hidden" id="start_loan_time" name="start_loan_time" value="'+ CustomerStart + '" />');
        CustomerEnd && $("#"+id).append('<input type="hidden" id="end_loan_time" name="end_loan_time" value="'+ CustomerEnd + '" />');
        CustomerArchivedStart && $("#"+id).append('<input type="hidden" id="start_pigeonhole_time" name="start_pigeonhole_time" value="'+ CustomerArchivedStart + '" />');
        CustomerArchivedEnd && $("#"+id).append('<input type="hidden" id="end_pigeonhole_time" name="end_pigeonhole_time" value="'+ CustomerArchivedEnd + '" />');
        pigeonholeStatus && $("#"+id).append('<input type="hidden" id="pigeonholeStatus" name="pigeonhole_status" value="'+ pigeonholeStatus +'" />');
        createName && $("#"+id).append('<input type="hidden" id="createName" name="create_name" value="'+ createName + '" />');
        $("#"+id).submit();
    }
}

/**
 * 姓名首字母筛选逻辑
 * @author Arley Joe 2017-8-8 16:31:51
 * @param callback {function} : 回调函数
 */
function firstLetterQuery (callback) {
    var letterBtn = $(' .letter_conditions');
    var checkedBox = $('.checked_first_letter .letter_list');
    letterBtn.off('click');   // 必须项，去除人名筛选的默认点击事件
    letterBtn.off('click').on('click', function (e) {
        var e = e || window.event;
        e.stopPropagation();
        e.preventDefault();
        var _this = $(this);
        var _thisLetter = $.trim(_this.text());
        var len = Number(checkedBox.find('.letter_item').length);
        if (_thisLetter == '全部') {
            if (FILTRATETYPE === 1){
                searchBusinessList();
            }
            return;
        } else {
            var errorTips = checkedBox.find('.error_msg');
            if (len >= 10) {
                if (errorTips.is(':hidden')) {
                    errorTips.show();
                    var timer = setTimeout(function () {
                        errorTips.hide();
                        clearTimeout(timer);
                    }, 3000);
                };
                return false;
            } else {
                if (_thisLetter == '#') {
                    checkedBox.find('.letter_item').remove();
                } else {
                    checkedBox.find('.letter_item[data-value="#"]').remove();
                }
                var liElem = '<li class="letter_item" dat-value="'+ _thisLetter +'">' +
                    '            <span class="letter_val">'+ _thisLetter +'</span>' +
                    '            <em class="remove_btn"></em>' +
                    '        </li>';
                checkedBox.find('li.error_msg').before(liElem);
                callback();
            }
        }
    });
    // 已选中首字母的删除功能
    var removeLetter = function () {
        checkedBox.on('click', '.remove_btn', function (e) {
            var e = e || window.event;
            e.stopPropagation();
            e.preventDefault();
            var _this = $(this);
            _this.parents('.letter_item').remove();
            callback();
        })
    };
    removeLetter();
}

/**
 * 获取选中的首字母
 */
function getCheckedFirstLetter () {
    var checkedStr = '';
    var checkedArr = [];
    var elem = $('.letter_item');
    var firstLetters = $('.letter_conditions');
    firstLetters.off('click');  // 屏蔽连续点击造成的数据错误
    elem.each(function () {
        var _this = $(this);
        var v = $.trim(_this.find('.letter_val').text());
        checkedArr.push(v);
    });
    checkedStr = checkedArr.join('');
    return checkedStr;
}

/**
 * 姓名查询逻辑
 */

function personnelSearch () {
    var id = $('body').find("form[role='form']").attr('id');
    var initial = $(".first_letter_conditions .personnel_query.active").text();
    (initial == "全部") && (initial = '');
    initial && $("#"+id).append('<input type="hidden" id="initial" name="initial" value="'+ initial + '" />');
    $("#"+id).submit();
}

/**
 * 下拉框筛选条件更改的提交事件
 *  @author Arley   10|03|2017
 *
 * 备注：该方法为简单的select框提交事件
 * Role：select必须含有“filtrate_select”类，同时要提交的表单ID为：#form_search
 * 注意：请遵循Role引用
 */
function selectChange () {
    var s = $(".filtrate_select");
    s.off("change").on("change", function () {
        //$("#form_search").submit();
        searchBusinessList();
    })
}

function $alert (text, callback) {
    dialog("alert", {
        closeBtn : false,
        "title" : "提  醒",
        "button" : ["确定",""],
        "content" : text,
        maskClose : false,
        onConfirm : function (d) {
            d.close();
            callback && callback();
        }
    });
}


/**
 * 列表页跳转详情页公用方法
 *
 *
 */
function toOrderDetail () {
    var input = $("#financeId");
    var advance = $('#advanceId');
    var form = $("#to_order_detail");
    var orderList = $(".business_list .list_item .list_item_detail");
    var url = LOCALURL;
    url && form.append("<input type='hidden' value='"+ url +"' name='url' />");
    orderList.each(function () {
        var currentOrder = $(this);
        currentOrder.off("click").on("click", function () {
            $('.business_list .order_mask').show();     // 禁用多次点击
            var t = $(this);
            var financeId = $.trim(t.parents(".list_item").attr("lang"));
            var advanceId = $.trim(t.parents('.list_item').data('advance_id'));
            input.val(financeId);
            advance.val(advanceId);
            form.submit();
        });
    });
}


/**
 *  图片上传功能
 *  @author Arley   28|03|2017
 *
 *  调用直接注册imgUpload方法即可。
 */
function imgUpload () {
    var parent = $(".img_upload");
    //需要创建的input且type为file
    var inputFile = '<input type="file" class="img_upload_btn" name="file" accept="image/jpeg,image/jpg,image/png" value="上传图片" style="display: none" />';
    var imgCount = 0; //保存已经上传的图片的个数
    parent.each(function () {
        var that = $(this);
        var btn = that.find(".img_upload_layer"); //触发上传图片的元素
        //上传图片按钮的点击事件
        btn.off("click").on("click", function () {
            var fileBtn = that.find(".img_upload_btn");//type为file的input元素组
            var t = $(this);
            if (!t.hasClass("disabled")) {
                t.addClass("disabled");
                fileBtn.eq(imgCount).click();
            }
            fileBtn.eq(imgCount).on("change", function () {
                var targetFile = $(this);
                var success = chooseImage(targetFile);
                //计算图片个数并校验,同时校验通过后创建新的input
                imgCount++;
                if (imgCount >= 5) {
                    t.addClass("disabled");
                } else {
                    t.removeClass("disabled");
                    if (success) {
                        that.append(inputFile);
                    } else {
                        targetFile.remove();
                        that.append(inputFile);
                        imgCount--;
                    }
                }
            });
        });
        //删除按钮的点击事件
        that.on("click", ".remove_btn", function () {
            var t = $(this);
            var thisIndex = t.parents(".img_item").index(); //存储当前图片的索引值
            //console.log(thisIndex);
            t.parents(".img_item").remove();
            that.find(".img_upload_btn").eq(thisIndex).remove();

            //改注释代码为测试删除input是否正确。
            var a = [];
            that.find(".img_upload_btn").each(function () {
                var file = $(this)[0].files[0] && $(this)[0].files[0].name;
                a.push(file);
            });
            console.log(a);
            if (imgCount >= 5) {
                that.append(inputFile);
            }
            imgCount--;
            btn.removeClass("disabled");
        });
    });
}

/**
 * 获取选择的图片并展示图片
 * @author Arley   28|03|2017
 *
 * @param f imgUpload内部调用方法。
 * @returns {boolean}
 */
function chooseImage (f) {
    f.parents(".img_upload").find(".error_msg").hide();
    var file = f[0];
    if (!file.files || !file.files[0]) {
        return;
    }
    var filePath = file.value;
    //获取图片扩展名
    var extname = filePath.substring(filePath.lastIndexOf(".") + 1, filePath.length); //此处使用lastIndexOf屏蔽图片中自带“.”
    if (extname != 'jpg' && extname != 'jpeg' && extname != 'png') {
        //alert('请使用正确格式的图片');
        f.parents(".img_upload").find(".img_error").text("请使用正确格式的图片").show();
        if(f.outerHTML){
            f.outerHTML = f.outerHTML;
        } else{      //FF
            f.value="";

        }
        return false;
    }
    //获取图片大小并校验
    var filseSize = file.files[0].size / 1024 / 1024; //此处单位为“M”
    if (filseSize > 5) {
        //alert('图片大小超过5M');
        f.parents(".img_upload").find(".img_error").text("图片大小超过5M").show();
        return false;
    }
    //获取图片名称
    var fileName = file.files[0].name;
    var fileRender = new FileReader();
    var imgViewBox = $(".img_box");
    fileRender.onload = function (e) {
        var result = e.target.result;
        var imgViewItem =    '<div class="img_item">'
            +     '<img src="'+ result +'" alt="">'
            +     '<span class="img_name nor_wrap">'+ fileName +'</span>'
            +     '<span class="img_size">'+ filseSize.toFixed(2) +'M</span>'
            +     '<div class="remove_mask">'
            +         '<em class="remove_btn"></em>'
            +     '</div>'
            + '</div>'
        imgViewBox.append(imgViewItem);
    };
    fileRender.readAsDataURL(file.files[0]);
    return true;
}

/**
 * 隐藏域表单提交方法（页面跳转）
 * @author Arley   29|03|2017
 *
 * @param opt {Object} 需要传入的跳转参数明细
 * 注意：页面跳转参数需在opt的queryString中配置：
 *     {
 *       action : '',
 *       method : '',
 *       enctype : 'multipart/form-data',
 *       param : {
 *              finance_id : 10056，
 *              pageNum : 9
 *              ……
 *          }
 *          ……
 *       }
 * 备注：在static/js/common/header.js中也有该方法。
 */
function locationTo (opt) {
    var option = {
        action : '',
        method : 'post',
        enctype : 'application/x-www-form-urlencoded', //用于文件上传时间必须配置该项为‘'multipart/form-data'’
        param : {
            finance_id : ''
        }
    };
    var options = $.extend({}, option, opt);
    var form = document.createElement("form"); //隐藏域form元素
    var formId = form.id = "submitForm" + (new Date().getTime()); //动态创建form元素唯一标识符id
    form.action = options.action;
    form.method = options.method;
    form.enctype = options.enctype;
    form.style.display = 'none';
    document.body.appendChild(form);
    var inputEles = '', //form表单内部input元素
        arr = options.param;
    for (var key in arr) {
        if (arr[key] != '' || (arr[key] === 0 || arr[key] === '0')) {
            inputEles += '<input type="hidden" name="'+ key +'" value="'+ arr[key] +'" />';
        }
    }
    var thisForm = document.getElementById(formId);
    thisForm.innerHTML = inputEles;
    thisForm.submit();
}


/**
 *  公用的取消按钮点击事件
 *  @author Arley Joe 2017/05/22
 *
 *  @return ：需要在使用的页面调用
 */
function cancleEvent () {
    var btn = $(".cancle");
    btn.off("click").on("click", function () {
        window.history.back();
    });
}

function onClear() {
    //Do something here.
    searchBusinessList();

}

function onConfirm () {
    //Do something here.
    searchBusinessList();
}

function onChooseFun () {
    searchBusinessList();
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
        var url = $.trim(target.data("url"));
        var advanceId = $.trim(target.data("advance_id"));
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
 *  文件上传功能
 * @author Arley Joe 2017/07/04
 * @param opt {Object} 参数配置项
 */
function fileUpload (opt) {
    if (opt) {
        if (!typeof opt === 'object') return false;
    }
    var option = {
        maxCount : null,        // {Number} 允许上传最大文件个数
        filesSize : null,       // {Number} 允许上传最大文件大小，单位M
        fileFormat : [],        // {Array}  允许上传文件的格式集合。
        imgFormat : ['png', 'jpg', 'jpeg', 'svg', 'gif', 'bmp', 'raw', 'cdr'],       // 常见图片格式
        wordFormat : ['doc', 'docx', 'dot', 'dotx', 'docm', 'dotm'],     // 所有word文档后缀格式
        excelFormat : ['xls', 'xlsx', 'xlsm'],       // 常用excel文档后缀格式。
        needThumbnails : true,      // 是否需要缩略图
        thumbnailsElem : null,    // 缩略图元素
        callback : null,    // 回调函数
    };
    var options = $.extend({}, option, opt);
    var parent = $(".file_upload");
    //需要创建的input且type为file
    var inputFile = '<input type="file" class="file_upload_btn" name="file"  value="上传文件" style="display: none" />';
    var fileCount = 0; //保存已经上传的文件的个数
    parent.each(function () {
        var that = $(this);
        var btn = that.find(".file_upload_layer"); //触发上传文件的元素
        //上传文件按钮的点击事件
        btn.off("click").on("click", function () {
            var fileBtn = that.find(".file_upload_btn");//type为file的input元素组
            var t = $(this);
            if (!t.hasClass("disabled")) {
                fileBtn.eq(fileCount).click();
            }
            fileBtn.eq(fileCount).on("change", function () {
                var targetFile = $(this);
                var success = chooseFile(targetFile);
                //计算文件个数并校验,同时校验通过后创建新的input
                fileCount++;
                if (options.maxCount) {
                    if (fileCount >= options.maxCount) {
                        btn.addClass("disabled");
                        options.callback && options.callback(t);    // 回传点击的按钮
                        fileCount--;
                    } else {
                        btn.removeClass("disabled");
                        if (success) {
                            that.append(inputFile);
                            options.callback && options.callback(t);    // 回传点击的按钮
                        } else {
                            targetFile.remove();
                            that.append(inputFile);
                            fileCount--;
                            options.callback && options.callback(t);    // 回传点击的按钮
                        }
                    }
                } else {
                    btn.removeClass("disabled");
                    if (success) {
                        that.append(inputFile);
                        options.callback && options.callback(t);    // 回传点击的按钮
                    } else {
                        targetFile.remove();
                        that.append(inputFile);
                        fileCount--;
                        options.callback && options.callback(t);    // 回传点击的按钮
                    }
                }
            });
        });
        //删除按钮的点击事件
        that.on("click", ".remove_btn", function () {
            var t = $(this);
            var thisIndex = t.parents(".file_item").index(); //存储当前文件的索引值
            //console.log(thisIndex);
            t.parents(".file_item").remove();
            that.find(".file_upload_btn").eq(thisIndex).remove();
            var a = [];
            that.find(".file_upload_btn").each(function () {
                var file = $(this)[0].files[0] && $(this)[0].files[0].name;
                a.push(file);
            });
            console.log(a);
            if (options.maxCount) {
                if (fileCount >= options.maxCount) {
                    that.append(inputFile);
                }
            }
            fileCount--;
            btn.removeClass("disabled");
        });
    });
    //获取选择的文件并展示文件
    var chooseFile = function (f) {
        f.parents(".file_upload").find(".error_msg").hide();
        var file = f[0];
        if (!file.files || !file.files[0]) {
            return;
        }
        var filePath = file.value;
        //获取文件扩展名
        var extname = filePath.substring(filePath.lastIndexOf(".") + 1, filePath.length); // 此处使用lastIndexOf屏蔽文件中自带“.”
        if (options.fileFormat.length != 0) {
            //if (extname != 'jpg' && extname != 'jpeg' && extname != 'png') {
            var isNeedFormat = $.inArray(extname, options.fileFormat);
            if ( isNeedFormat == -1) {
                //alert('请使用正确格式的文件');
                f.parents(".file_upload").find(".error_msg").text("(请使用正确格式的文件)").show();
                if(f.outerHTML){
                    f.outerHTML = f.outerHTML;
                } else{      //FF
                    f.value="";
                }
                return false;
            }
        }
        //获取文件大小并校验
        var filesSize = file.files[0].size / 1024 / 1024; //此处单位为“M”
        if (options.filesSize && filesSize > options.filesSize) {
            //alert('文件大小超过5M');
            f.parents(".file_upload").find(".error_msg").text("文件大小超过"+ options.filesSize +"M").show();
            return false;
        }
        //获取文件名称
        var fileName = file.files[0].name;
        var fileRender = new FileReader();
        var imgViewBox = $(".file_box");
        fileRender.onload = function (e) {
            var result = e.target.result;
            if ($.inArray(extname, options.imgFormat) != -1 ) { // 图片格式的文件
                result = result;    //设置图片的SRC为图片缩略图
            } else if (extname == 'pdf') {
                result = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAmpJREFUWAljlD225z/DIAYsILc9snRuHIxulDu+t55pMDoM2U2jDkQODXLYoyFITqgh6xkNQeTQIIcNLgeJ1QgqlwipZWRk+MfCyPSXg4n5uxAL63stbp6HEeJSVxz5hV8T0otNniQHYjMAXez/fwam3///Mf3+94/185/ffA9/fJPf8e61rRW/4NmFmvrb2BiYSKq5yHLgVj2zfnSHwfh/Gf4zfvv7j/nT3z9sd759Edj57rX2pa+ftI5+eGcSeuUc20Ydk/UwtcTQZDlQl5v3EzGGMwiKvMiRVrgx6emDa32P74Wc//xRb/bzR5dTJeXuEKUfqIguuThPWuG6Jb/gOZCj1rx+YUKs40Dq6OJAkEWx4tJnQfSd718UQTSxgG4ONOUTeAdy1O9//9me//rFPugc+OznTw6Yo7hZmP7A2IRouoXgyU8fxEGO4Wdh+cjHxPKXkMNg8nRx4C+Gf4wLnz+yBVmqx8N/E2Y5MTTNHfjl3z/m2GsXvB///CHLwsT0u1RO6RgxDoOpIbkcZGRkxFsT/Pj3j+np758cZz69Fzn44Z3ioQ9vDT/9+cPPANSXJiW3xYCb7yPMcmJokh34//9/RmLqZGTLBVhZP+RIK25Lk5S9jSxODJtkB4IMFWRhe8fECKx1sQAmUEOBkfEnNzPLd0VOrhdmvIKPEiVl7pKblshy4Eodo/kanNxfsLiP6kLkeozqDsFl4KgDcYUMseKjIUhsSOFSNxqCuEKGWHGSykFg4Qsu+1iZmP4RawGl6khy4HUz+15KLSRV/2gaJDXE0NWPhiB6iJDKHw1BUkMMXT3jYJ+GAABXtKsh7y/GBwAAAABJRU5ErkJggg==';
            } else if ($.inArray(extname, options.wordFormat) != -1) {
                result = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABOhJREFUWAntWWtMm1UY5uuFQS8f7XoBSku7tlwEt8FYcboBoo4ZHS4my2JMjD/cDzOiUaMsKpsZmZgYsz+aTJ1RE43xj2EzJIvLjIEh4ICpK0KkMGi5lFFaeqH0Rr/6vR+c7cDgoy3+4EffpDnveW/nyXPec86XlNB0XY+lbWPhATbbo0+e244Y87t//YCzHYHhmFIAcTaS0VMMJsManpNiEGcjGT3FYDKs4TnMS4IbcP2lob+PdHqcpmgsxsXtuJ7B4QZOqvKvNmr0ZtwO+vHBW/V9Xvdeii2fy1l8Q62/ckqlHV6bD3PWLf5rwVPMBg4KBKlo5qVp6zP2cHgHzJF8bp8ouOmZ38cGDmKDUUrQ5ZnXo7y1IyuDT0nlvT857Ich6VWVrvWYXDmGF7hot5X/7JipDVFURovNUvmpsfQG8n9nt1UxOkHEPjGUfFMqELqRD8Zmq6Wm2zNfQdD+k7maPtyH66wMntUV9gq4XD8ktLnumkqFYh/+a9EVdYm5PB/4f3HNHnAuhfmg/zA7rZ0IBTWgPywUDZ1Q5EzgeUIeb6nf59kN/j1C8p/HJbI50NcTVoBSHi/yrDz7d0icDAbUsG14EZJe6HlFbgfYYKtaxkdNoH81fZ+9N9V6xg92JOfGhw+GKSod2HtHY2hH9vVGVoCQcDa/oFe4wuLX09Yn1hZp0hpvSfj8ebDPRkJkm2tWNRLwG2BeIhANH5bK74KOxBLwCzvcrkqYl4nIgWqJdEP2IGZTgFk0S0dXWJwJh3IuTI6VQCKSDA6HekGR1w5svK7R91yw3alFvga17gF2zltHDkUoig/xb+ezswd1NgUIQU0Mi7wF0L+fmaxdSksjQEfSqDXcfnqn4sadwAJJs2cEe6FAZKnfqbSjGBgHA35Rp9u1H3SaPXMVKXWCziZxAWRYlC334lwkLP/YOroHL0pfBbEvCnf/9tnk/RZoyFuHvTFLVSRG8QgijWrMN3TgNTbS4wIIyWe0xj4Rd5nFHx1TNUGKWpV7yW4zWoOLWog1ZgpHTaRkFTtmv4/s9roqwF8ukgwcjIM9iF21CBg2EjixR2XZneB3RyJSupf2odhwGkVcnLIeQfMqiWzw5cE/j6M5jOetlmq49FfYe6A38VhcjxsgJNEntp9mkbn3Wh32ai+1xDyBZ8aGK2HrIWZXpmB8wO9V06fVgK6l/gWv5A+vuwz8FWKJ+TFS4gI9HkkIILBYr1juRV90Sdw8NmKyhUKZrbMzNWixE8rcHvoSZnr0y6nxOmC3hWYPnjxg7/Qm9x6qg8aEAELS+3QvotejzTlz6K2RgTp4j8FXLs4yN6h0/+am72DuPmD1lSFzHQ14L/grxFm3HyElzJ0J83gkYYAkhxd9Tp7D9OJiNCq8ubJ16RxO+CPDQ9dg0dfUu5gR9Hb33AGaPQ6HIKjTWmMH2BKRhAFC8Xd1hn7EIlqsXpbdXpIpZO7KF5UqaxH9iiAfjPuBPVFi7EFeUgCBxWPynHtfLjI+3/mhvrgHCiJ5T2e8Dj0H82X2CuI+uagGjPQdm5w064v6psMBKf3VomjSFVwT0E8eXqk2S+Y4lae7fNXpKK+XK/tNInLV5xYey6YnDZBOjH1bXHav19ZbhD6xZvit54vXltQWx1v8/4hLAdwqiykGUwxulYGt5qd6cKsMEtv9b4j/AL4uyO/mp2kIAAAAAElFTkSuQmCC';
            } else if ($.inArray(extname, options.excelFormat) != -1) {
                result = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABFRJREFUWAntWW1sU1UY9t7de4tJ14+10M19McbWdStrYZuIhkTRiGOiv9ZE/eMkIH6AEmJISAiZ0Rg/MCLRiMBmTPRH5x8FpiSo0cRBBo61ZWxdHaxbWTe6rR802N7entK3cuZ1KfV+GLMfPX/Oe97zvs/73Lenz7lNifK+s6l7lvCggNvEhkc7lyLHinM/HiSXIjE+pzxBfjek2PkOSukaPyffQX43pNgZHRSSeHDcs67bP7EVYhUkGfu6oeloi1IVEpIbQ4jc5Djf4Yv9WQbxZmXhcO+a++1CcgV/xJ0rawbWFqpdABpHaNmroy5bFKECIUV2jjofw+S0NB08YbR+KyQPYgQThOCuusaTOpqZBdsfj5VsH3FsBjvX+GTKa/wpOLcBYiiC4N5ZVWcvYZh4rhz+niiCOopJHKqu76FIMgEgv4XnWz70XavnA/LtgWhEfXjy2tPY96yh7MyWohXTeC1kFkUQADdpdTc6Ssp7MfinvvGnzkdCRXiN51vpc/fyqKs9hpL3gs+iVA29VVV7Ee8LnUUTBOADFasHm1UaB9hsCil2ey63RxD3j/P4otv5+FQ8VgoxWpqZP260fAe22CGJIBQ5YbScXs4oAmBPs/Hi7SPOVrBhHLk+XvdLaG492DRBcu9Vm+wGhmFhLXZIJqilqPR5NNnpO+fxXDjY9P7EVfOFaETzse/vc/ecofSHzVr9jFhiOF4yQQB4WKOb3VZccRqDHfV7t+50O58BGQKfVal2vVlV+zvelzLLIggF91dWO1pUmktgswgxATa+AmyQo25T40mw5QzZBKF4t9HSq7+jj7AmCSIJcgSyBGs54z8hOHwrWngTcYWYCEqlCvqjoWK8ljPLJgjysstz2RZPIgWfyLEpb9uvoaCe75Niyya4w+16AmQGiusZJtCsUg+CnUApZs/YUHuY4wS/kEDe4iGL4Ae+q+a+0HwzgILcHFpd3/OFyXrKwCgy1xl8YTrcg22Li4pZSybYl77ePrvuzbx+QUGQm0fUuoCKpJKHa8w9DEFmXgguRsLWtyf+sIohxY+VRDCS/the8wzZQFYADGQG5AYDP6jSzL9UVrkgMV3+yS0/h+eW430xsySCL4w6W2fYmAEKpa+7G11pmVlcdG/ZqqGH1EUXwJ9AiN7ruWILchy9OO7f1qIJvjs5tqY/HFwHwDRJsB/VNNjVFMVlK3SsznKmmFH4YW82weqfHxl8MltcLp8ogiAbn095F4rsuK/y1EaVdu5uBZQkmTxiNPcoCv46j5duhhs70z8d7hafzS+YIMgFyAbIBwA9oNYO7CuvzvwEyAaMfeuVmuArpSsXXvG/nPa1ng3OZq5DHJNrFkxwm9vRhu9ZA7Ns5nht4/e5gPl7r5dWDW/U6PrBl0gh6o2xK7YAx2YelB+XzRYsot80NEEXFjqRDSyX7yuTFR5I8ENhLMEdxAn/95wnKLfj+Q7mOyi3A3LziaX+N8Rt7k12gfELYf4AAAAASUVORK5CYII=';
            } else {
                result = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABNlJREFUWAntmWtMWlccwOUKKC9B8UHFJ8oFRbBa106XbJq2qctqK6uvWVPbL8uaZjHL2n5Zl65Ll2aPLl2s2m3p0jXG2NqHurjNTWdat1qnGFFACaDgg+JERZArL+nuMSEhfPGCpvEDJyH3HO7/nP+P37k5/5uAS3zW8zJkFzc8YJvJP3hlNzImDfRehnYjmDdTENDbRiD9oMFArHnPCRr0thFIf9cb3DyoA/llW825qlNn96wYs/V2G4sUCiFpJMrcpWRuXy41YnWrud73d9zgkstBKB77t+oHva50yemIhEmUKQaeYJFazIIKmeRsg17L8wbYqr+jBs0uF14sk1RrbevJx2JYfTfSBf1ogs1a/8xsiqpTycpvzE2Li+jMhkwKzbIVHLi/YwbX3O5QsWy4SruOpNTGJXTdTBc8/W35P9a9RX2Sze2GCiIYy99xs9rc7pDQz3SqQixwIGZHDAKAMtlwuWrdmlYZy+4+n8iRHpYOvqdE1mCQ5PrMlKFdmHcHQKaSyNOadSQBfI+lbdugKyQEVyaTvKuwWnjHY1h/XU6Fh8TyoU24okjmgDh6T6/BYWdd0aoKAFAMgWhadTkZWOBAzLYNVsglx8esZkExM7b/a07GP8fGhyrVCMIpj4v/4zonYwAk6V5ZzJ+32Zig/8Jhj2YSiEugj6Vty2CFYqRk2GzKBqYaYWHfCbnkxCS6rSXMuD4P3EXN5AFkw0UW0GizncaF+GkbksInU7RY4EBMwAZPToy+/Xx1JbeAETV8m7/3T3SbS8fXzJmHo2L+boCznoLF0W3NaV3UH0khkbU1seyJmonRWgoUar3G4T8B97G0gAyeUUoP9ZuW9udF0EdbMnK6qhUj74xYTKI3GczB2zxRL0j81eyU8CfDbEkiMWwOPW7aT09KT5pdTvrFpLTH8cRwOxY4EOM34FmV7K3eZeMb2dQI+X1BXmftxGgxanLf6/TIkeaMvb+DRevntfzGeW0pixhmqIeFDz9QjlWih3b0+SRO22lWwhSIwdr8AvxIrSjoMi4Uooessk2w79EFtSL/iWnpQA6NPtaamfsLSPrji5n0b2enyqIJxMUmWHjvnEpWtuB0sD5MSHl0Lj5FiRXME4f5GXywaEh8aDQc4pIomgdZeW3hEOR2hrzEo+YkLZm5XeCX3jHMca7p1JVoaVv5nidqrVPJxfN2G/v9PUkdHydw5J6k/lwxA96c1xbRoNA1FOY+FYI2QBJQLTzJQMX4XKeqouLxllt8YQtq96jOhiSfYiV2XUpOl3ri/L1i3mLwViKg0lRxRKLDN0mHcYH9iUZZTYYg5BYsav5UoyxWo1WlAq0qV1PhYd94f8aYAcMgyG7d2Aj3Xbx7xRh3QTNRQ4QgZyNX1PyFTnUQnIWgqnyTxn/uG+/vGDMgj0yZlqPlDNjyJPkVfRlAn7NTEA7nboSzfh5HVpngLARVpR59k/HEbeeK+Rn8Mj2z56h0EK5Ty8806bUqkFSJWLkECGev5wrvFjKYxmwqfZUKEe7WstjT24HynovZYFoYCWkXvtYEzr8Zm40NPiJqhKJTuL/pSGT0Alg0Eo937iQcWBOzQRDMI1GsHVl5j0H/VTXMBl8VkG+eIKCvEX/HQYP+GvONDxr0NeLvOGjQX2O+8bjd/jfE/2Mi4D596XZHAAAAAElFTkSuQmCC';
            }
            if (options.needThumbnails) {
                if (!options.thumbnailsElem) {
                    var imgViewItem =    '<div class="file_item">'
                        +     '<img src="'+ result +'" alt="">'
                        +     '<span class="file_name nor_wrap">'+ fileName +'</span>'
                        +     '<span class="file_size">'+ filesSize.toFixed(2) +'M</span>'
                        +     '<div class="remove_mask">'
                        +         '<em class="remove_btn"></em>'
                        +     '</div>'
                        + '</div>';
                } else {
                    var imgViewItem = options.thumbnailsElem;
                }
                imgViewBox.append(imgViewItem);
            }
        };
        fileRender.readAsDataURL(file.files[0]);
        return true;
    }
}
/**
 * 加载动画的时间冒泡屏蔽
 * @author Arley Joe 2017-7-12 18:47:29
 * @returns {boolean}
 */
function loading() {
    var elem = $('#loading');
    if (elem.length == 0) {
        return false;
    } else {
        elem.off('click').on('click', function (e) {
            var e = e || window.event;
            e.stopPropagation();
            e.preventDefault();
            return false;
        });
    }
}

/**
 * 年份日期插件
 * @author Arley Joe 2018年2月2日09:58:49
 * @param target {elem} 触发元素
 */
function initDateOfYear (target) {
    $(target).jeDate({
        isinitVal:false,
        festival:true,
        ishmsVal:false,
        determine:false,
        format:"YYYY",
        zIndex:3000,
        minDate : '2017',
        maxDate : $.nowDate({DD:0})
    });
    $(target).addClass('datainp wicon');
}

/**
 * 年份日期插件
 * @author Arley Joe 2018年2月2日10:09:23
 * @param target {elem} 触发元素
 */
function initDateOfMonth (target) {
    $(target).jeDate({
        isinitVal:false,
        festival:true,
        ishmsVal:false,
        determine:false,
        format:"YYYY-MM",
        zIndex:3000,
        minDate : '2017-01-01',
        maxDate : $.nowDate({DD:0})
    });
    $(target).addClass('datainp wicon');
}

/**
 * 加载日期插件
 * @author Arley Joe 2017-11-4 17:33:34
 * @param target {elem} 触发元素
 */
function initDateAll (target, pattern) {
    $(target).jeDate({
        isinitVal : false,
        festival : false,
        ishmsVal : false,
        format : pattern || "YYYY-MM-DD",
        zIndex : 3000,
        isClear : true
    });
    $(target).addClass('datainp wicon');
}

/**
 * 加载日期插件
 * @author Arley Joe 2017-11-4 17:33:34
 * @param target {elem} 触发元素
 */
function datePicker (target, options) {
    $(target).jeDate({
        isinitVal : false,
        festival : false,
        ishmsVal : false,
        isToday : ((options.isToday === false) ? false : true),
        format : options.format || "YYYY-MM-DD",
        zIndex : 3000,
        minDate : options.minDate || '',
        maxDate : options.maxDate || '',
        isClear : options.isClear ? true : false,
        okfun : options.okfun || onConfirm,
        choosefun : options.okfun || onChooseFun,
        clearfun : options.clearfun || onClear,
    });
    $(target).addClass('datainp wicon');
}

/**
 * 时间联动（开始结束）的逻辑封装
 * @author Arley Joe 2017-8-4 11:41:37
 * @param startSelector {string} : 开始时间
 * @param endSelector {string} : 结束时间
 */
function initDateStartEnd (startSelector, endSelector) {
    var start = {
        format: 'YYYY-MM-DD',
        //minDate: '2014-06-16', //设定最小日期为当前日期
        //festival:true,
        maxDate: $.nowDate({DD:0}), //最大日期,
        isClear : false,
        choosefun: function(elem,datas){
            end.minDate = datas; //开始日选好后，重置结束日的最小日期
            endDates();
        },
        okfun:function (elem,datas) {
            // alert(datas)
        }
    };
    var end = {
        format: 'YYYY-MM-DD',
        // minDate: $.nowDate({DD:0}), //设定最小日期为当前日期
        // festival:true,
        maxDate: $.nowDate({DD:0}), //最大日期
        isClear : false,
        choosefun: function(elem,datas){
            start.maxDate = datas; //将结束日的初始值设定为开始日的最大日期
        }
    };
    function endDates() {
        end.trigger = false;
        $(endSelector).jeDate(end);
    }
    $(startSelector + ' , '+ endSelector).addClass('datainp wicon');
    $(startSelector).jeDate(start);
    $(endSelector).jeDate(end);
}

/**
 * 最小时间当前时间
 * @author Arley Joe 2017-8-9 14:33:32
 * @param target {string} 目标触发元素
 */
function initDateMinToday (target) {
    $(target).jeDate({
        isinitVal : true,
        festival : false,
        ishmsVal : false,
        minDate :  $.nowDate({DD:0}),
        format : "YYYY-MM-DD",
        zIndex : 3000,
        isClear : false
    })
    $(target).addClass('datainp wicon');
}

/**
 * 最大时间当前时间
 * @author Arley Joe 2017-8-9 14:50:11
 * @param target {string} 目标触发元素
 */
function initDateMinTodayForOrder (target) {
    var onClear, onConfirm, onChoosefun;
    onClear = onConfirm = onChoosefun = function () {
        var checkedLetter = getCheckedFirstLetter();
        searchBusinessList(checkedLetter);
    };

    $(target).jeDate({
        isinitVal : false,
        festival : false,
        ishmsVal : false,
        maxDate :  $.nowDate({DD:0}),
        format : "YYYY-MM-DD",
        zIndex : 3000,
        isClear : true,
        clearfun : onClear,
        onfun : onConfirm,
        choosefun : onChoosefun
    });
    $(target).addClass('datainp wicon');
}

/**
 * 开关样式的单选按钮重构
 * @author Arley Joe 2017-9-11 17:12:22
 * @param opt
 */
function radioSwitch (opt) {
    var option = {
        on : function () {}, // 开启/选中的回调逻辑
        off : function () {}, // 关闭/未选中的回调逻辑
        restore : function (target) { // 重置为原始状态
            if (target.attr('type') == 'off') {
                target.find('div').stop().animate({
                    'left' : '28px'
                },200);
                target.removeClass('off').attr('type', 'on');
            }else {
                target.find('div').stop().animate({
                    'left' : '2px'
                },200);
                target.addClass('off').attr("type","off");
            }
        }
    };
    var options = $.extend({}, option, opt);
    var s = $(".r_radio");  // 重置单选按钮（开关样式）
    s.on('mousedown', function() {
        var _this = $(this);
        if (_this.attr('type') == 'off') {
            _this.find('div').stop().animate({
                'left' : '28px'
            },200);
            _this.removeClass('off').attr('type', 'on');
            options.on(_this, options);
        }else {
            _this.find('div').stop().animate({
                'left' : '2px'
            },200);
            _this.addClass('off').attr("type","off");
            options.off(_this, options);
        }
    });
}

/**
 * 格式化城市数据
 * @author Arley Joe 2017-9-13 16:54:36
 * @param data 后台返回的城市数据
 * @returns {{list: {}, relations: {}, category: {provinces: Array}}}
 */
function formatCityData (data) {
    var __LocalDataCities = {list: {},relations: {},category: {provinces: [],}};
    for (var i = 0, len = list.length; i < len; i++) {
        var provinceId = list[i].id,
            provinceName = list[i].name;
        var province = [provinceName, "", "", provinceId];
        __LocalDataCities.list[provinceId] = province;
        __LocalDataCities.category.provinces.push(provinceId);
        var citysCode = [];
        for (var k = 0, clist = list[i].city_list, cLen = clist.length; k < cLen ; k++ ){
            var cityId = clist[k].id,
                cityName = clist[k].name;
            var city = [cityName, "", "", provinceId, provinceName];
            citysCode.push(cityId);
            __LocalDataCities.list[cityId] = city;
            __LocalDataCities.relations[provinceId] = citysCode;
        }
    }
    return __LocalDataCities;
}

/**
 * 禁用订单列表多次点击的遮罩层
 * @author Arley Joe 2017-9-14 09:46:16
 * @desc : 该方法已经全局调用，不用重复调用。
 */
function customerListMask () {
    var disabledMask = $('.business_list .order_mask');
    if (disabledMask.length > 0) {
        disabledMask.off('click');
    }
}

/**
 * 跳转下一个页面
 * @author Arley Joe 2017-10-31 16:39:02
 * @param target：目标元素
 * @param param：需要传递的参数
 */
function toNextPage(target, params) {
    var btn = $(target);
    var param = {
        url : LOCALURL
    };
    var options = $.extend({}, param, params);
    btn.off('click').on('click', function (){
        var _this = $(this);
        var url = $.trim(_this.data('url'));
        locationTo({
            action : contextPath + url,
            param : options
        })
    });
}

//只允许输入数字或者输入两位小数
function checkNum (ele) {
    ele.on("keyup input", function () {
        var reg = /^\d{0,7}(\.\d{0,2})?$/g;
        var _this = $(this);
        var val = _this.val();
        if (reg.test(val)) {
            $(".is_return_msg").hide();
            return true;
        } else {
            val = parseInt(val);
            if (!isNaN(val) && val != 0) {
                val = (/\d+(\.\d{1,2})?/g.exec(val))[0];
                _this.val(val);
            } else {
                _this.val("");
            }
        }
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
        var imgItem = $(this).find('.img_item');
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
                        var a = document.createElement('a');
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

/**
 * 保留两位小数自动补0
 * @author Arley Joe 2018-1-7 10:14:16
 * @param value {Number|String} 需要进行保留两位小数的值
 * @return {*}
 */
function formatNum (value){
    value = Math.round(parseFloat(value)*100)/100;
    var xsd=value.toString().split(".");
    if(xsd.length==1){
        value=value.toString()+".00";
        return value;
    }
    if(xsd.length>1){
        if(xsd[1].length<2){
            value=value.toString()+"0";
        }
        return value;
    }
}

/**
 * 判断小数点后是否是两位小数
 * @author gaoyuan 2018年4月12日13:50:44
 * @param value {Number|String} 需要进行保留两位小数的值
 * @return {*}
 */
function formatPointTwoNum (el) {
    var xsd = el.val().toString();
    if (xsd[1].split(".").length > 2) {
        $alert('请输入保留两位小数。');
        return false;
    } else if (xsd[1].split(".").length == 1) {
        el.val(xsd + "0");
        return;
    } else {
        el.val(xsd + ".00");
        return;
    }
}

/**
 * 手机号校验
 * @param selector
 */
function verifyPhone (selector) {
    var body = $('body');
    body.on('blur', selector, function (e) {
        var event = e || window.event;
        event.preventDefault();
        event.stopPropagation();

        var _this = $(this);
        var phoneNum = $.trim(_this.val());
        var tips = _this.siblings('.tips_info');
        if (phoneNum == '') {
            tips.find('.tips_text').text('手机号不能为空').end().show();
            _this.attr('verify', 0);
        } else if (!PHONEPATTERN.test(phoneNum)) {
            tips.find('.tips_text').text('请输入正确的手机号').end().show();
            _this.attr('verify', 0);
        } else {
            tips.find('.tips_text').text('').end().hide();
            _this.attr('verify', 1);
        }
    });
}

/**
 * 校验证件号码 —— 身份证
 * @param selector {String} : 证件号码输入元素选择器（input）
 */
function verifyLicense (selector, callback) {
    var body = $('body');
    body.on('blur', selector, function (e) {
        var event = e || window.event;
        event.stopPropagation();
        event.preventDefault();

        var t = $(this);
        var v = $.trim(t.val());   // 证件号码
        if (v == '') {
            t.siblings('.tips_info').find('.tips_text').text('证件号码不能为空').end().show();
            t.attr('verify', 0);
        } else {
            if (!IDPATTERN.test(v)) {
                t.siblings('.tips_info').find('.tips_text').text('请输入有效证件号码').end().show();
                t.attr('verify', 0);
            } else {
                t.siblings('.tips_info').find('.tips_text').text('').end().hide();
                t.attr('verify', 1);
                callback && callback();
            }
        }
    });
}


// 分页切换
function paginationSwitch () {
    var btn = $('.page .page-item');
    btn.off('click').on('click', function () {
        var _this = $(this);
        _this.off('click');
        var form = $('form[role="form"]');
        var currentPage = _this.data('currentpage');
        var nextPage = null;
        if (!_this.hasClass('disabled')) {
            if (_this.hasClass('prev')) {
                nextPage = currentPage - 1;
            } else if (_this.hasClass('next')) {
                nextPage = currentPage + 1;
            } else {
                nextPage = currentPage;
            }
            var currentPageE = form.find('input[name="current_page"]');
            if (currentPageE.length <= 0) {
                form.append('<input type="hidden" name="current_page" value="'+ nextPage +'" id="currentPage" />');
            } else {
                currentPageE.val(nextPage);
            }
            _this.data('currentpage', nextPage).siblings('.prev').data('currentpage', nextPage);
            var start_with = getCheckedFirstLetter();
            (start_with == "全部") && (start_with = '');
            if (start_with) {
                var firstLetter = form.find('#start_with');
                if (firstLetter.length <= 0) {
                    form.append('<input type="hidden" class="filtrate_input" id="start_with" name="start_with" value="'+ start_with + '" />');
                } else {
                    firstLetter.val(start_with);
                }
            }
            form.submit();
        }
    });
}

function disabledFormAutoSubmit () {
    var doc = $('body');
    doc.on('keydown', 'form', function (e) {
        var ev = e || window.event;
        var keyCode = ev.keyCode;
        var form = $(this);
        if (keyCode == 13) {
            var special = form.find('.special-ele');
            if (special.length > 0) {
                return true;
            } else {
                return false;
            }
        }
    });
}


$(function () {
    customerListMask(); // 禁用订单多次点击跳转
    windowInFocus();    // 判断当前标签页的活动状态
    getMessagesInfo('#header_messages');
    switcher(".nav_item", ".active");
    filtrateChoose("click", ".category_item", "active", function () {});
    /*filtrateChoose("click", ".conditions_item", "active" , function () {
        searchBusinessList();
    });*/
    // 姓名字母查询
    firstLetterQuery(function () {
        if (FILTRATETYPE === 1){
            var checkedLetter = getCheckedFirstLetter();
            searchBusinessList(checkedLetter);
        }
    });
    /*// 姓名全部查询
    filtrateChoose("click", ".first_letter_conditions .choose_all", "active", function (e) {
        searchBusinessList();
    });*/
    filtrateChoose("click", ".page_item", "active", function (e) {
        var checkedLetter = getCheckedFirstLetter();
        pageChange(e, checkedLetter);
    });
    filtrateChoose("click", ".first_letter_conditions .personnel_query", "active" , function () {
        personnelSearch();
    });
    loading();
    disabledFormAutoSubmit();
});





















