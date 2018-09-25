/**
 * Created by Arley on 2017/8/16.
 */
// 加载必须文件
var express = require('express');
var router = require('./../../routes/index');
var common = require('./../common');
var request = require('request');
var COMMONUTIL = require('./../../util/commonUtil');  // 主加密方法类文件
var LOGERROR = require('./../../util/logger').logError;   // 错误日志打印
var ERRORTYPES = require('./../../util/ErrorTypesConf'); // 自定义错误类型配置

// 数据统计主导航跳转
exports.VIEW_STATISTICS_SYSTEM = function(req, res, next) {
    try {
        if (common.checkPrivilege(1327, req)) {
            res.redirect(markUri + '/statistics/business/list');
        } else if (common.checkPrivilege(1328, req)) {
            res.redirect(markUri + '/statistics/person/system');
        } else if (common.checkPrivilege(1464, req)) {
            res.redirect(markUri + '/statistics/merchants/synthesize');
        } else if (common.checkPrivilege(1514, req)) {
            res.redirect(markUri + '/statistics/operating/system');
        } else if (common.checkPrivilege(1592, req)) {
            res.redirect(markUri + '/statistics/voucher/system');
        } else {
            throw new Error(ERRORTYPES.CheckPrivilege + ': The code 1327 | 1328 | 1464 | 1514 | 1592 is not defined.');
        }
    } catch (e) {
        LOGERROR(e.stack);
        res.redirect(markUri + '/404');
    }
};

// 数据统计-业务统计跳转
exports.VIEW_STATISTICS_BUSINESS_LIST = function(req, res, next) {
    res.render('./dataStatistics/businessList', { title : '数据统计-业务量统计', markUri : markUri});
};

// 数据统计-业务量统计-业务量统计视图数据获取
exports.API_STATISTICS_BUSINESS_DATA = function(req, res, next) {
    var body = req.body;
    common.httpRequest({
        url : apiServerPath + '/api/statistics/business',
        form : body
    }, function (result) {
        var data = result;
        if (data.error_code === 0) {
            res.send(data);
        } else {
            res.render(data.error_msg);
        }
    }, req, res, next);
};

// 数据统计-业务量统计-城市统计视图数据获取
exports.API_STATISTICS_CITY_DATA = function(req, res, next) {
    var body = req.body;
    common.httpRequest({
        url : apiServerPath + '/api/statistics/city',
        form : body
    }, function (result) {
        var data = result;
        if (data.error_code === 0) {
            res.send(data);
        } else {
            res.render(data.error_msg);
        }
    }, req, res, next);
};

// 数据统计-业务量统计-产品统计视图数据获取
exports.API_STATISTICS_PRODUCT_DATA = function(req, res, next) {
    var body = req.body;
    common.httpRequest({
        url : apiServerPath + '/api/statistics/product',
        form : body
    }, function (result) {
        var data = result;
        if (data.error_code === 0) {
            res.send(data);
        } else {
            res.render(data.error_msg);
        }
    }, req, res, next);
};


// 数据统计-人效统计首页跳转
exports.VIEW_STATISTICS_PERSON_SYSTEM = function(req, res, next) {
    try {
        if (common.checkPrivilege(1354, req)) {
            res.redirect(markUri + '/statistics/person/order');
        } else if (common.checkPrivilege(1629, req)) {
            res.redirect(markUri + '/statistics/person/compact');
        } else if (common.checkPrivilege(1355, req)) {
            res.redirect(markUri + '/statistics/person/request');
        } else if (common.checkPrivilege(1356, req)) {
            res.redirect(markUri + '/statistics/person/pigeonhole');
        } else {
            throw new Error(ERRORTYPES.CheckPrivilege + ': The code 1354 | 1629 | 1355 | 1356 is not defined.');
        }
    } catch (e) {
        LOGERROR(e.stack);
        res.redirect(markUri + '/404');
    }
};
// 数据统计-人效统计-进件跳转
exports.VIEW_STATISTICS_PERSON_ORDER = function(req, res, next) {
    var body = req.body;
    common.httpRequest({
        url : apiServerPath + '/api/statistics/person/order',
        form : body
    }, function (result) {
        var data = result;
        data.uri = '/statistics/person/order';
        data.title = '数据统计-人效统计';
        data.markUri = markUri;
        if (data.error_code === 0) {
            res.render('./dataStatistics/personList', data);
        } else {
            res.render(data.error_msg);
        }
    }, req, res, next);
    //res.render('./dataStatistics/personList', { title : '数据统计-进件统计'});
};
// 数据统计-人效统计-合同跳转
exports.VIEW_STATISTICS_PERSON_COMPACT = function(req, res, next) {
    var body = req.body;
    common.httpRequest({
        url : apiServerPath + '/api/statistics/person/compact',
        form : body
    }, function (result) {
        var data = result;
        data.uri = '/statistics/person/compact';
        data.title = '数据统计-人效统计';
        data.markUri = markUri;
        if (data.error_code === 0) {
            res.render('./dataStatistics/personList', data);
        } else {
            res.render(data.error_msg);
        }
    }, req, res, next);
    //res.render('./dataStatistics/personList', { title : '数据统计-进件统计'});
};
// 数据统计-人效统计-请款跳转
exports.VIEW_STATISTICS_PERSON_REQUEST = function(req, res, next) {
    var body = req.body;
    common.httpRequest({
        url : apiServerPath + '/api/statistics/person/request',
        form : body
    }, function (result) {
        var data = result;
        data.uri = '/statistics/person/request';
        data.title = '数据统计-人效统计';
        if (data.error_code === 0) {
            res.render('./dataStatistics/personList', data);
        } else {
            res.render(data.error_msg);
        }
    }, req, res, next);
    //res.render('./dataStatistics/personList', { title : '数据统计-请款统计'});
};
// 数据统计-人效统计-归档跳转
exports.VIEW_STATISTICS_PERSON_PIGEONHOLE = function(req, res, next) {
    var body = req.body;
    common.httpRequest({
        url : apiServerPath + '/api/statistics/person/pigeonhole',
        form : body
    }, function (result) {
        var data = result;
        data.uri = '/statistics/person/pigeonhole';
        data.title = '数据统计-人效统计';
        if (data.error_code === 0) {
            res.render('./dataStatistics/personList', data);
        } else {
            res.render(data.error_msg);
        }
    }, req, res, next);
    // res.render('./dataStatistics/personList', { title : '数据统计-归档统计'});
};
// 数据统计-人效统计-个人业务量跳转
exports.VIEW_STATISTICS_PERSONAL = function(req, res, next) {
    var body = req.body;
    common.httpRequest({
        url : apiServerPath + '/api/statistics/personal',
        form : body
    }, function (result) {
        var data = result;
        data.title = '人效统计-个人业务量';
        if (data.error_code === 0) {
            // res.send(data);
            res.render('./dataStatistics/personDetail', data);
        } else {
            res.render(data.error_msg);
        }
    }, req, res, next);
};

// 数据统计-人效统计-个人进件统计视图数据获取
exports.API_STATISTICS_PERSONAL_ORDER_DATA = function(req, res, next) {
    var body = req.body;
    common.httpRequest({
        url : apiServerPath + '/api/statistics/personal/order',
        form : body
    }, function (result) {
        var data = result;
        if (data.error_code === 0) {
            res.send(data);
        } else {
            res.render(data.error_msg);
        }
    }, req, res, next);
};

// 数据统计-人效统计-个人请款统计视图数据获取
exports.API_STATISTICS_PERSONAL_REQUEST_DATA = function(req, res, next) {
    var body = req.body;
    common.httpRequest({
        url : apiServerPath + '/api/statistics/personal/request',
        form : body
    }, function (result) {
        var data = result;
        if (data.error_code === 0) {
            res.send(data);
        } else {
            res.render(data.error_msg);
        }
    }, req, res, next);
};

// 数据统计-人效统计-个人请款统计视图数据获取
exports.API_STATISTICS_PERSONAL_PIGEONHOLE_DATA = function(req, res, next) {
    var body = req.body;
    common.httpRequest({
        url : apiServerPath + '/api/statistics/personal/pigeonhole',
        form : body
    }, function (result) {
        var data = result;
        if (data.error_code === 0) {
            res.send(data);
        } else {
            res.render(data.error_msg);
        }
    }, req, res, next);
};

// 数据统计-人效统计-个人业务详情跳转
exports.VIEW_STATISTICS_PERSONAL_BUSINESS = function(req, res, next) {
    var body = req.body;
    common.httpRequest({
        url : apiServerPath + '/api/statistics/personal/business',
        form : body
    }, function (result) {
        var data = result;
        data.title = '人效统计-个人业务详情';
        data.organizationId = data.organization_id;
        if (data.error_code === 0) {
            // res.send(data);
            res.render('./dataStatistics/personBusiness', data);
        } else {
            res.render(data.error_msg);
        }
    }, req, res, next);
};

// 数据统计-商户统计-首页跳转
exports.VIEW_STATISTICS_MERCHANTS_SYNTHESIZE = function(req, res, next) {
    var data = {};
    var localUrl = req.originalUrl;
    data.title = '数据统计-商户分类列表';
    data.originUrl = localUrl;
    data.markUri = markUri;
    data.apiServerPath = apiServerPath;
    data.domain = domain;
    res.render('./dataStatistics/merchantsStatistics', data);
};
// 数据统计-商户统计-商户分类列表页跳转
exports.VIEW_STATISTICS_MERCHANTS_TYPELIST = function(req, res, next) {
    common.getPageData({
        url : '/api/web/supplier/statistics/list',
        title : '数据统计-商户分类列表',
        page : './dataStatistics/merchantsTypeClassificationList',
        callback : function (data) {
            data.merchants = req.body;
        }
    }, req, res, next);
    // res.render('./dataStatistics/merchantsTypeClassificationList', { title : '数据统计-商户分类列表', markUri : markUri});
};
// 数据统计-商户统计-商户详情页跳转
exports.VIEW_STATISTICS_MERCHANTS_DETAIL = function(req, res, next) {
    common.getPageData({
        url : '/api/web/supplier/statistics/main',
        title : '数据统计-商户主页',
        page : './dataStatistics/merchantDetail',
        callback : function (data) {
            data.merchants = req.body;
            data.time = new Date().getTime();
            data.supplier_id = req.body.supplier_id;
        }
    }, req, res, next);
    // res.render('./dataStatistics/merchantDetail', { title : '数据统计-商户主页', markUri : markUri});
};

// 数据统计-运营报表-报表列表页跳转1514
exports.VIEW_STATISTICS_OPERATING_SYSTEM = function(req, res, next) {
    try {
        if (common.checkPrivilege(1514, req)) {
            res.redirect(markUri + '/statistics/operating/list');
        } else {
            throw new Error(ERRORTYPES.CheckPrivilege + ': The code 1514 is not defined.');
        }
    } catch (e) {
        LOGERROR(e.stack);
        res.redirect(markUri + '/404');
    }
};
// 数据统计-运营报表-报表列表页跳转
exports.VIEW_STATISTICS_OPERATING_LIST = function(req, res, next) {
    common.getPageData({
        url : '/api/reportForm/finance/list',
        title : '数据统计-运营报表列表',
        page : './dataStatistics/operatingReportList',
        callback : function (data) {
            data.merchants = req.body;
            if (data.condition_city_list) {
                if (data.condition_city_list.length != 0) {
                    data.cityName = data.condition_city_list[0].city_list[0].name;
                }
            }
            if (data.city_list) {
                data.city_list = JSON.stringify(data.city_list);
            }
            if (data.condition_city_list) {
                data.condition_city_list = JSON.stringify(data.condition_city_list);
            }
        }
    }, req, res, next);
};

// 数据统计-财务凭证-财务凭证列表页跳转1592
exports.VIEW_STATISTICS_VOUCHER_SYSTEM = function(req, res, next) {
    try {
        if (common.checkPrivilege(1592, req)) {
            res.redirect(markUri + '/statistics/voucher/list');
        } else {
            throw new Error(ERRORTYPES.CheckPrivilege + ': The code 1592 is not defined.');
        }
    } catch (e) {
        LOGERROR(e.stack);
        res.redirect(markUri + '/404');
    }
};
// 数据统计-财务凭证-财务凭证列表页跳转
exports.VIEW_STATISTICS_VOUCHER_LIST = function(req, res, next) {
    common.getPageData({
        url : '/api/reportForm/finance/getVoucherList',
        title : '数据统计-财务凭证列表',
        page : './dataStatistics/voucherList'
    }, req, res, next);
};