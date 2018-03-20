/**
 * Created by Arley Joe on 20/01/2018
 */

var fs = require('fs');
var path=require("path");
var common = require('./../common');
var qs = require('querystring');
var urlParse = require('url');
var LOGERROR = require('./../../util/logger').logError;   // 错误日志打印
var ERRORTYPES = require('./../../util/ErrorTypesConf'); // 自定义错误类型配置

// 供应商-主导航跳转 1067
exports.VIEW_SUPPLIER_SYSTEM = function(req, res, next) {
    try {
        if (common.checkPrivilege(1067, req)) {
            res.redirect(markUri + '/supplier/organization/system');
        }else {
            throw new Error(ERRORTYPES.CheckPrivilege + ': The code 1067 is not defined.');
        }
    } catch (e) {
        LOGERROR(e.stack);
        res.redirect(markUri + '/404');
    }
};
// 供应商部分-金融机构-侧导航跳转  1067
exports.VIEW_SUPPLIER_ORGANIZATION_SYSTEM = function(req, res, next) {
    try {
        if (common.checkPrivilege(1067, req)) {
            res.redirect(markUri + '/supplier/organization/list');
        }else {
            throw new Error(ERRORTYPES.CheckPrivilege + ': The code 1067 is not defined.');
        }
    } catch (e) {
        LOGERROR(e.stack);
        res.redirect(markUri + '/404');
    }
    //res.render('./organization/organizationList');
};
// 供应商部分-金融机构-侧导航跳转  1067
exports.VIEW_SUPPLIER_ORGANIZATION_LIST = function(req, res, next) {
    common.getPageData({
        url : '/api/organization/getList',
        title : '供应商-金融机构列表',
        page : './organization/organizationList'
    }, req, res, next);
};
// 供应商部分-金融机构-创建机构跳转  1068
exports.VIEW_SUPPLIER_ORGANIZATION_CREATE = function(req, res, next) {
    common.getPageData({
        url : '/api/organization/toAdd',
        title : '供应商-金融机构列表',
        page : './organization/create'
    }, req, res, next);
};
// 供应商部分-金融机构-机构编辑页跳转  1070
exports.VIEW_SUPPLIER_ORGANIZATION_EDIT = function(req, res, next) {
    common.getPageData({
        url : '/api/organization/detail',
        title : '供应商-机构详情页',
        page : './organization/edit'
    }, req, res, next);
};
// 供应商部分-金融机构-机构详情页跳转  1071
exports.VIEW_SUPPLIER_ORGANIZATION_DETAIL = function(req, res, next) {
    common.getPageData({
        url : '/api/organization/detail',
        title : '供应商-机构详情页',
        page : './organization/detail'
    }, req, res, next);
};































