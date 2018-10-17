/**
 * Created by Plateau on 2018年6月15日14:57:19
 */

var fs = require('fs');
var path=require("path");
var common = require('./../common');
var qs = require('querystring');
var urlParse = require('url');
var LOGERROR = require('./../../util/logger').logError;   // 错误日志打印
var ERRORTYPES = require('./../../util/ErrorTypesConf'); // 自定义错误类型配置

//业务-工单配置侧导航跳转
exports.VIEW_WORKORDER_CONFIGURATION_SYSTEM = function(req, res, next) {
    try {
        if (common.checkPrivilege(1563, req)) {
            res.redirect(markUri + '/workorder/configuration/incoming');
        } else if (common.checkPrivilege(1558, req)) {
            res.redirect(markUri + '/workorder/configuration/compact');
        } else {
            throw new Error(ERRORTYPES.CheckPrivilege + ': The code 1529 | 1543 | 1536 is not defined.');
        }
    } catch (e) {
        LOGERROR(e.stack);
        res.redirect(markUri + '/404');
    }
};

//业务-工单配置-进件工单
exports.VIEW_WORKORDER_CONFIGURATION_INCOMING = function(req, res, next) {
    common.getPageData({
        url : '/api/workorder/finance/orderlist',
        title : '进件工单',
        page : './workorder/workConfigurationList'
    }, req, res, next);
};

//业务-工单配置-合同工单
exports.VIEW_WORKORDER_CONFIGURATION_COMPACT = function(req, res, next) {
    common.getPageData({
        url : '/api/workorder/compact/orderlist',
        title : '进件工单',
        page : './workorder/workConfigurationList'
    }, req, res, next);
};

//业务-工单配置-新建跳转
exports.VIEW_WORKORDER_CONFIGURATION_TOCREATE = function(req, res, next) {
    common.getPageData({
        url : '/api/workorder/to/createfinance',
        title : '工单新增',
        page : './workorder/workconfigCreate',
        callback : function (data) {
            data.list = JSON.stringify(data.employeeList);
        }
    }, req, res, next);
};

//业务-工单配置-编辑跳转
exports.VIEW_WORKORDER_CONFIGURATION_TOEDIT = function(req, res, next) {
    common.getPageData({
        url : '/api/workorder/to/updatefinance',
        title : '工单编辑',
        page : './workorder/workconfigCreate',
        callback : function (data) {
            data.list = JSON.stringify(data.employeeList);
        }
    }, req, res, next);
};