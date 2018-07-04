/**
 * Created by qi on 2018/7/3.
 */

var fs = require('fs');
var path=require("path");
var common = require('./../common');
var qs = require('querystring');
var urlParse = require('url');
var LOGERROR = require('./../../util/logger').logError;   // 错误日志打印
var ERRORTYPES = require('./../../util/ErrorTypesConf'); // 自定义错误类型配置

// 业务-车型库侧导航跳转
/*exports.VIEW_CAR_SYSTEM = function(req, res, next) {
    common.getPageData({
        url : '/api/carModel/brand/list',
        title : '品牌列表',
        page : './carmodel/carModelList',
    }, req, res, next);
};*/
// 业务-车型库侧导航跳转
exports.VIEW_CAR_SYSTEM = function(req, res, next) {
    try {
        if (common.checkPrivilege(1554, req)) {
            res.redirect(markUri + '/car/brand');
        } else if (common.checkPrivilege(1558, req)) {
            res.redirect(markUri + '/car/series');
        }  else if (common.checkPrivilege(1563, req)) {
            res.redirect(markUri + '/car/model');
        } else {
            throw new Error(ERRORTYPES.CheckPrivilege + ': The code 1554 | 1558 | 1563  is not defined.');
        }
    } catch (e) {
        LOGERROR(e.stack);
        res.redirect(markUri + '/404');
    }
};
// 业务-车型库-品牌列表页跳转 1554
exports.VIEW_CAR_BRAND = function(req, res, next) {
    common.getPageData({
        url : '/api/carModel/brand/list',
        title : '品牌列表',
        page : './carmodel/carModelList',
    }, req, res, next);
};
// 业务-车型库-车系列表 1558
exports.VIEW_CAR_SERIES = function(req, res, next) {
    common.getPageData({
        url : '/api/carModel/series/list',
        title : '车系列表',
        page : './carmodel/carModelList',
    }, req, res, next);
};
// 业务-车型库-车型列表 1563
exports.VIEW_CAR_MODEL = function(req, res, next) {
    common.getPageData({
        url : '/api/carModel/model/list',
        title : '车型列表',
        page : './carmodel/carModelList',
    }, req, res, next);
};
