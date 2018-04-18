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
    // var cookies = this.getCookies(req, res, next);
    var option = {
        method : 'post',
        url : '',
        timeout : 600000,
        headers : {
            Cookie : req.headers.cookie,
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
                if (result.error_code === 803) {    // 无权限
                    res.render('./home/warning', result);
                } else if (result.error_code === 804) {     // 权限变更
                    res.send('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>请重新登录</title></head><body></body><script>alert(\'权限变更，请重新登录\');window.location.href = \'/\';</script></html>');
                } else if (result.error_code === 802) {     // 登录失效
                    res.send('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>登录失效，请重新登录</title></head><body></body><script>alert(\'登录失效，请重新登录\');window.location.href = \'/\';</script></html>');
                } else if (result.error_code === 800) {     // 非法请求
                    res.send('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>登录失效，请重新登录</title></head><body></body><script>alert(\'登录失效，请重新登录\');window.location.href = \'/\';</script></html>');
                } else if (result.error_code === 801) {     // 无此方法
                    res.send('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>无此方法</title></head><body></body><script>alert(\'请求无效，无此方法\');</script></html>');
                } else if (result.error_code === 0) {
                    callback(result);
                } else {
                    LOGERROR(ERRORTYPES.HttpRequest + '：[Node] Background server (Java) returned an error message. Data:' + JSON.stringify(result));
                    callback(result);
                }
            } catch (e) {
                result = body;
                if (result.error_code === 803) {    // 无权限
                    res.render('./home/warning', result);
                } else if (result.error_code === 804) {     // 权限变更
                    res.send('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>请重新登录</title></head><body></body><script>alert(\'权限变更，请重新登录\');window.location.href = \'/\';</script></html>');
                } else if (result.error_code === 802) {     // 登录失效
                    res.send('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>登录失效，请重新登录</title></head><body></body><script>alert(\'登录失效，请重新登录\');window.location.href = \'/\';</script></html>');
                } else if (result.error_code === 800) {     // 非法请求
                    res.send('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>登录失效，请重新登录</title></head><body></body><script>alert(\'登录失效，请重新登录\');window.location.href = \'/\';</script></html>');
                } else if (result.error_code === 801) {     // 无此方法
                    res.send('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>无此方法</title></head><body></body><script>alert(\'请求无效，无此方法\');</script></html>');
                } else if (result.error_code === 0) {
                    callback(result);
                } else {
                    // LOGERROR(ERRORTYPES.HttpRequest + '：Background server (Java) returned an error message. Data:' + JSON.stringify(result));
                    callback(result);
                    LOGERROR(e.stack);
                }
                // callback(result);
                LOGERROR(ERRORTYPES.HttpRequest + '：The result of server return is not need to parse.');
            }
        } else {
            // LOGERROR(ERRORTYPES.HttpRequest + '：' + error);
            res.render('./errorpage/404', {title: '404'});
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
                res.redirect(markUri + '/404');
            }
        }, req, res, next);
    } catch (e) {
        LOGERROR(e.stack);
        res.redirect(markUri + '/404')
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
            try {
                data.title = '客户-订单详情';
                data.originUrl = localUrl;
                data.markUri = markUri;
                data.vo.thousandRate = thousandRate(data);
                //所属商户弹出层的标签名
                if(data.supplierDetail){
                    if(data.supplierDetail.label_name){
                        if(data.supplierDetail.label_name.indexOf(",")!=-1){
                            data.label_names = data.supplierDetail.label_name.split(",");
                        }else{
                            data.label_names = [data.supplierDetail.label_name];
                        }
                    }
                }

                //所属商户弹出层的返点数据计算
                /*data.rebatePolicy[i].rebate_type = 1为车款返点；2为gps返点；3为服务费返点；4为保险费返点
                * 1.data.rebatePolicy[i].rebate_way=1时，返点为固定金额data.rebatePolicy[i].rebate_money
                * 2.data.rebatePolicy[i].rebate_way=2时，返点为（固定金额 - 超出金额data.rebatePolicy[i].exceed_money）*超出金额的百分比data.rebatePolicy[i].rebate_money
                * 3.data.rebatePolicy[i].rebate_way=3时，返点为超出金额的固定金额，即data.rebatePolicy[i].rebate_money;
                * 4.data.rebatePolicy[i].rebate_way=4时，返点为固定金额data.vo.purchase_tax的百分比，即data.vo.purchase_tax * data.rebatePolicy[i].rebate_money
                * */
                if(data.rebatePolicy){
                    for(var i = 0,len=data.rebatePolicy.length;i<len;i++){
                        switch (data.rebatePolicy[i].rebate_type){
                            case 1://车款返点
                                if(data.rebatePolicy[i].rebate_way == 1){
                                    data.rebate_car = data.rebatePolicy[i].rebate_money;
                                }else if(data.rebatePolicy[i].rebate_way == 2){
                                    if(data.vo.purchase_tax > data.rebatePolicy[i].exceed_money){
                                        data.rebate_car = (data.vo.purchase_tax - data.rebatePolicy[i].exceed_money) * data.rebatePolicy[i].rebate_money;
                                    }
                                }else if(data.rebatePolicy[i].rebate_way == 3){
                                    if(data.vo.purchase_tax > data.rebatePolicy[i].exceed_money){
                                        data.rebate_car = data.rebatePolicy[i].rebate_money;
                                    }
                                }else if(data.rebatePolicy[i].rebate_way == 4){
                                    data.rebate_car = data.vo.purchase_tax * data.rebatePolicy[i].rebate_money;
                                }
                                break;
                            case 2://gps返点
                                if(data.rebatePolicy[i].rebate_way == 1){
                                    data.rebate_gps = data.rebatePolicy[i].rebate_money;
                                }else if(data.rebatePolicy[i].rebate_way == 2){
                                    if(data.vo.gps_charge > data.rebatePolicy[i].exceed_money) {
                                        data.rebate_gps = (data.vo.gps_charge - data.rebatePolicy[i].exceed_money) * data.rebatePolicy[i].rebate_money;
                                    }

                                }else if(data.rebatePolicy[i].rebate_way == 3) {
                                    if(data.vo.gps_charge > data.rebatePolicy[i].exceed_money) {
                                        data.rebate_gps = data.rebatePolicy[i].rebate_money;
                                    }
                                }else if(data.rebatePolicy[i].rebate_way == 4){
                                    data.rebate_gps = data.vo.gps_charge * data.rebatePolicy[i].rebate_money;
                                }
                                break;
                            case 3://服务费返点
                                if(data.rebatePolicy[i].rebate_way == 1){
                                    data.rebate_service = data.rebatePolicy[i].rebate_money;
                                }else if(data.rebatePolicy[i].rebate_way == 2){
                                    if(data.vo.service_charge > data.rebatePolicy[i].exceed_money){
                                        data.rebate_service = (data.vo.service_charge - data.rebatePolicy[i].exceed_money) * data.rebatePolicy[i].rebate_money;
                                    }
                                }else if(data.rebatePolicy[i].rebate_way == 3){
                                    if(data.vo.service_charge > data.rebatePolicy[i].exceed_money){
                                        data.rebate_service = data.rebatePolicy[i].rebate_money;
                                    }
                                }else if(data.rebatePolicy[i].rebate_way == 4){
                                    data.rebate_service = data.vo.service_charge * data.rebatePolicy[i].rebate_money;
                                }
                                break;
                            case 4://保险费返点
                                if(data.rebatePolicy[i].rebate_way == 1){
                                    data.rebate_insurance = data.rebatePolicy[i].rebate_money;
                                }else if(data.rebatePolicy[i].rebate_way == 2){
                                    if(data.vo.insurance > data.rebatePolicy[i].exceed_money){
                                        data.rebate_insurance = (data.vo.insurance - data.rebatePolicy[i].exceed_money) * data.rebatePolicy[i].rebate_money;
                                    }
                                }else if(data.rebatePolicy[i].rebate_way == 3){
                                    if(data.vo.insurance > data.rebatePolicy[i].exceed_money){
                                        data.rebate_insurance = data.rebatePolicy[i].rebate_money;
                                    }
                                }else if(data.rebatePolicy[i].rebate_way == 4){
                                    data.rebate_insurance = data.vo.insurance * data.rebatePolicy[i].rebate_money;
                                }
                                break;
                        }
                    }
                }

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
                } else {
                    throw new Error(ERRORTYPES.Route + ':' + localUrl + 'is not defined.');
                }
            } catch (e) {
                LOGERROR(e.stack);
                res.redirect(markUri + '/404');
            }

        } else {
            res.redirect(markUri + '/404');
        }
        //计算万元系数
        function thousandRate (data) {
            // 万元系数=（费率*10000*(融资期限➗12)+10000）➗融资期限（费率为百分数，需转化为小数）
            var thoudsanData = parseInt((((data.vo.rate * 100 * (data.vo.pay_periods / 12)) + 10000) / data.vo.pay_periods) * 1000) / 1000;
            // var thoudsanData = data.vo.rate*1000*(data.vo.pay_periods/12)/data.vo.pay_periods;
            if(thoudsanData.toString().indexOf(".")!=-1){
                var floatNum = Number(thoudsanData.toString().split(".")[1]);
                if (floatNum <= 0) {
                    floatNum = 0;
                } else if (floatNum < 10) {
                    floatNum *= 100;
                } else if (floatNum < 100) {
                    floatNum *= 10;
                }
                if(floatNum < 445){
                    thoudsanData = thoudsanData.toString().split(".")[0];
                }else{
                    thoudsanData = Number(thoudsanData.toString().split(".")[0]) + 1;
                }
                console.log(thoudsanData);
            }
            return thoudsanData;
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
    console.log(body)
    try {
        this.httpRequest({
            url : apiServerPath + options.url,
            formData : body
        }, function (results) {
            data = results;
            if (data.error_code === 0) {
                data.title = options.title;
                data.originUrl = localUrl;
                data.markUri = markUri;
                data.apiServerPath = apiServerPath;
                data.domain = domain;
                data.reqParams = body;
                options.callback && options.callback(data);
                res.render(options.page, data);
            } else {
                console.log(data);
                res.redirect(markUri + '/404');
            }
        }, req, res, next);
    } catch (err) {
        res.statusCode = 500;
        /*return res.json({success: false, message: '服务器异常'});*/
        res.redirect(markUri + '/404');
    }

};
/*exports.getPageData = function(options, req, res, next) {
    var data = {};
    data.list=[{
        "car_loan_charge": 50000,//车价贷款额
        "car_type": 1,//车辆类型 0新车,1二手车
        "car_type_value": "二手车",
        "city_id": 1012,//城市id
        "city_name": "南宁市",//车市
        "create_id": 73943,//贷前关联id
        "create_time": "2017-12-25 18:40",//请款时间
        "emp_name": "韦丽媛",//贷前
        "finance_id": 1043100,//金融订单id
        "financed_charge_rebate": 2500,//融资额返点
        "id": 1033786,//请款单id
        "pay_account": "6217 0033 6000 0174 424",//付款账户
        "receipt_id": 1,// 1车款 ，不等于1其他款项
        "start_with": "ZY",//客户首字母
        "total_charge": 52500,//付款总额
        "user_name": "周毅",//用户名称
        "vin": "LFMBE22DX60054871",//车架号
        "gps_rebate":53555,//GPS返点
        "insurance_rebate":53555,//保险返点
        "service_charge_rebate":53555,//服务费返点
        "gps_installCharge":53555,//GPS安装费
        "pledge_charge":53555,//抵押费
        "unpack_charge":53555,//解押费
        "pre_interest":53555,//前置利息
        "refund_charge":53555,//退款
        "refund_charge":53555,//车价贷款（返贷）
    }];
    res.render(options.page, data);
}*/


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


/**
 * 根据参数对JSON数组进行重新排序并返回新数据
 * @param key {String} : 排序参照
 * @param value {Object} : 条件
 * @param data  {Array} : 源数据数组
 * @return {Array} : 返回值
 */
exports.sortJsonArray = function  (key, value, data) {
    var arr = [];
    for (var i = 0, len = data.length; i < len; i++) {
        if (data[i][key] = value) {
            arr.unshift(data[i]);
        } else {
            arr.push(data[i]);
        }
    }
    return arr;
};