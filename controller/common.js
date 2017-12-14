//var common = require('./common');
var COMMONUTIL = require('./../util/commonUtil');  // 主加密方法类文件
var extend = require('node.extend');
var request = require('request');
var LOGERROR = require('./../util/logger').logError;   // 错误日志打印
var ERRORTYPES = require('./../util/ErrorTypesConf'); // 自定义错误类型配置
/*var app = require('./../app');
app.logger('common');*/
/**
 * 导航的选中状态
 * @author Arley Joe | 2017年7月24日15:02:16
 * @param req
 * @param res
 * @param next
 */
exports.startWith = function (req, res, next) {
    res.locals.startWith = function (nav) {
        var result = '';
        var _path = req.path;
        var navArr = nav.split(" || ");
        for(var i in navArr) {
            if (navArr[i]) {
                if (_path.indexOf(navArr[i]) !== -1) {
                    result = true;
                    break;
                } else {
                    result = false;
                }
            }
        }
        return result;
    };
    next();
};

/**
 * 请求头中Cookie的解析
 * @author Arley Joe 2017-8-22 16:44:58
 * @param req ： request实例
 * @param res ： response实例
 * @param next ： 程序执行下一步必须调用‘next();’
 * @returns {string} ： 格式化后的Cookie串
 */
exports.getCookies = function (req, res, next) {
    var cookiesObj = req.cookies;
    var cookies = [];
    for (var key in cookiesObj) {
        cookies.push(key.toString() + '=' + encodeURIComponent(cookiesObj[key]));
    }
    return cookies.join(';');
};

/**
 * 获取用户信息（头像、用户名）
 * @author Arley JOe 2017-8-24 10:43:32
 * @param req 请求头信息
 * @param res 响应信息
 * @param next 下一步
 */
exports.getUserInfo = function (req, res, next) {
    res.locals.getUserInfo = function () {
        var cookiesObj = req.cookies;
        var userInfo = {};
        for (var key in cookiesObj) {
            if (key !== 'JSESSIONID') {
                var _val = COMMONUTIL.decrypt(cookiesObj[key]);
                /*console.log(key + ' = ' + a);
                login_info = 管理员
                login_info_img = http://emp-file.img-cn-beijing.aliyuncs.com/6c387299-b919-4762-862f-b91f7dc5a8ba.jpg@100w_100h_100q.jpg*/
                userInfo[key] = _val.toString();
            }
        }
        /*console.log(userInfo);*/
        return userInfo;
    };
    next();
};

/**
 * 权限校验功能（Verify Permissions）
 * @author Arley Joe 2017-8-24 15:26:55
 * @params p {String || Number} : 权限code码。
 */
exports.verifyCode = function (req, res, next) {
    res.locals.verifyCode = function (p) {
        var privilegeCookie = COMMONUTIL.decrypt(req.cookies.logininfo);
        var privilegeArr = privilegeCookie.split(',');
        p = Number(p);
        for (var i = 0, len = privilegeArr.length; i < len; i++) {
            var _thisPrivilege = Number(privilegeArr[i]);
            if (p === _thisPrivilege) {
                return true;
            }
        }
        return false;
    };
    next();
};

exports.checkPrivilege = function (p, req) {
    var privilegeCookie = COMMONUTIL.decrypt(req.cookies.logininfo);
    // console.log(privilegeCookie);
    var privilegeArr = privilegeCookie.split(',');
    p = Number(p);
    for (var i = 0, len = privilegeArr.length; i < len; i++) {
        var _thisPrivilege = Number(privilegeArr[i]);
        if (p === _thisPrivilege) {
            return true;
        }
    }
    return false;
};

/**
 * 公用HTTP请求方法
 *
 * Create by Arley Joe on 2017-8-24 15:26:55
 * @param opt {Object} : 请求报头及请求参数配置项
 * @param callback {Function} : 回调函数
 * @param req {Object} : 请求信息对象
 * @param res {Object} ：返回执行逻辑对象
 * @param next {Object} ：下一步需要执行的入口
 */
exports.httpRequest = function (opt, callback, req, res, next) {
    var cookies = this.getCookies(req, res, next);
    var option = {
        method : 'post',
        url : '',
        timeout : 10000,
        headers : {
            Cookie : cookies,
            ctype : 1
        }
    };
    var  options = extend(true, option, opt);
    request(options, function (error, response, body) {
        //logger.info("This is an index page! -- log4js");
        if (!error && response.statusCode === 200) {
            var result = null;
            try {
                result = JSON.parse(body);
                result.markUri = markUri;
                if (result.error_code === 1001) {
                    res.render('./home/warning', result);
                } else if (result.error_code === 1000) {
                    res.send('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>请重新登录</title></head><body></body><script>alert(\'请登录系统\');window.location.href = \'/\';</script></html>');
                } else if (result.error_code === 800) {
                    res.send('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>登录失效，请重新登录</title></head><body></body><script>alert(\'登录失效，请登录系统\');window.location.href = \'/\';</script></html>');
                } else if (result.error_code === 0) {
                    callback(result);
                } else {
                    LOGERROR(ERRORTYPES.HttpRequest + '：Background server (Java) returned an error message. Data:' + JSON.stringify(result));
                    callback(result);
                }
            } catch (e) {
                result = body;
                if (result.error_code === 1001) {
                    res.render('./home/warning', result);
                } else if (result.error_code === 1000) {
                    res.send('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>请重新登录</title></head><body></body><script>alert(\'请登录系统\');window.location.href = \'/\';</script></html>');
                } else if (result.error_code === 800) {
                    res.send('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>登录失效，请重新登录</title></head><body></body><script>alert(\'登录失效，请登录系统\');window.location.href = \'/\';</script></html>');
                } else if (result.error_code === 0)  {

                    callback(result);
                } else {
                    LOGERROR(ERRORTYPES.HttpRequest + '：Background server (Java) returned an error message. Data:' + JSON.stringify(result));
                    callback(result);
                }
                // callback(result);
                LOGERROR(ERRORTYPES.HttpRequest + '：The result of server return is not need to parse.');
            }
        } else {
            LOGERROR(ERRORTYPES.HttpRequest + '：' + error);
        }
        res.end();
    });

};

/**
 * 获取客户列表页数据公用方法
 * @author Arley Joe 2017-11-14 11:31:11
 *
 */
exports.getCustomerList = function(url,title, req, res, next) {
    var body = req.body;
    var data = {};
    var localUrl = req.originalUrl;
    try {
        // 回显详情页访问路由
        if (localUrl.indexOf( markUri + '/customer/loan') !== -1) {
            var detailUrl = markUri + '/customer/loan/detail';
        } else if (localUrl.indexOf( markUri + '/customer/compact') !== -1) {
            var detailUrl =  markUri + '/customer/compact/detail';
        } else if (localUrl.indexOf( markUri + '/customer/requestpayout') !== -1) {
            var detailUrl =  markUri + '/customer/requestpayout/detail';
        } else if (localUrl.indexOf( markUri + '/customer/approval') !== -1) {
            var detailUrl =  markUri + '/customer/approval/detail';
        } else if (localUrl.indexOf( markUri + '/customer/financial') !== -1) {
            var detailUrl =  markUri + '/customer/financial/detail';
        } else if (localUrl.indexOf( markUri + '/customer/pigeonhole') !== -1) {
            var detailUrl =  markUri + '/customer/pigeonhole/detail';
        } else if (localUrl.indexOf( markUri + '/customer/otherfund') !== -1) {
            var detailUrl =  markUri + '/customer/otherfund/detail';
        } else {
            throw new Error(ERRORTYPES.Route + '："' + localUrl + '" is not defined.');
        }
        this.httpRequest({
            url : apiServerPath + url,
            formData : body
        }, function (result) {
            data = result;
            if (data.error_code === 0) {
                data.title = title;
                data.originUrl = localUrl;  // 页面访问路径
                data.detailUrl = detailUrl; // 详情页访问路径
                data.markUri = markUri;
                res.render('./customer/customerList', data);
            } else {
                //res.render(data.error_msg);
                res.redirect('/404');
            }
        }, req, res, next);
    } catch (e) {
        LOGERROR(e.stack);
        res.redirect('/404')
    }/* finally {
        // todo：To find a way solve how to stop request data form java server.
    }*/
};

/**
 * 获取客户列表页数据公用方法
 * @author Arley Joe 2017-11-14 11:31:11
 *
 */
exports.getCustomerDetail = function(url, req, res, next) {
    var body = req.body;
    var data = {};
    var localUrl = req.originalUrl;
    this.httpRequest({
        url : apiServerPath + url,
        formData : body
    }, function (result) {
        data = result;
        // res.send(data);
        if (data.error_code === 0) {
            data.title = '客户-订单详情';
            data.originUrl = localUrl;
            data.markUri = markUri;
            if (localUrl.indexOf( markUri + '/customer/loan') !== -1) {
                res.render('./customer/imgDetail', data);
            } else if (localUrl.indexOf( markUri + '/customer/compact') !== -1) {
                res.render('./compact/imgDetail', data);
            } else if (localUrl.indexOf( markUri + '/customer/requestpayout') !== -1) {
                res.render('./requestpayout/imgDetail', data);
            } else if (localUrl.indexOf( markUri + '/customer/approval') !== -1) {
                res.render('./approval/imgDetail', data);
            } else if (localUrl.indexOf( markUri + '/customer/financial') !== -1) {
                res.render('./financial/imgDetail', data);
            } else if (localUrl.indexOf( markUri + '/customer/pigeonhole') !== -1) {
                res.render('./pigeonhole/imgDetail', data);
            } else if (localUrl.indexOf( markUri + '/customer/otherfund') !== -1) {
                res.render('./otherfund/imgDetail', data);
            }
        } else {
            // res.render(data.error_msg);
            console.log(data);
            res.redirect('/404');
        }
    }, req, res, next);
};

/**
 * 获取客户列表页数据公用方法
 * @author Arley Joe 2017年11月16日16:04:35
 * @options {Object} : 属性参数为[url, title, page]且必传
 *          - {url} : 请求数据API路径
 *          - {title} : 渲染页面title
 *          - {page} : 渲染页面物理路径
 */
exports.getPageData = function(options, req, res, next) {
    var body = req.body;
    var data = {};
    var localUrl = req.originalUrl;
    try {
        this.httpRequest({
            url : apiServerPath + options.url,
            formData : body
        }, function (result) {
            data = result;
            if (data.error_code === 0) {
                data.title = options.title;
                data.originUrl = localUrl;
                data.markUri = markUri;
                data.apiServerPath = apiServerPath;
                data.domain = domain;
                options.callback && options.callback(data);
                res.render(options.page, data);
            } else {
                console.log(data);
                res.redirect('/404');
            }
        }, req, res, next);
    } catch (err) {
        /*logger.error(err);*/
        console.log(err + '268');
        res.statusCode = 500;
        /*return res.json({success: false, message: '服务器异常'});*/
        res.redirect('/404');
    }

};

/**
 * 调用后台API接口公用方法
 * @author Arley Joe 2017年11月16日16:04:35
 * @options {String} : 后台请求接口路径
 */
exports.publicForApi = function(url, req, res, next) {
    var body = req.body;
    try {
        this.httpRequest({
            url : apiServerPath + url,
            formData : body
        }, function (result) {
            var data = result;
            res.send(data);
        }, req, res, next);
    } catch (err) {
        /*logger.error(err);*/
        console.log(err);
        res.statusCode = 400;
        return res.json({success: false, message: '服务器异常'});
    }

};