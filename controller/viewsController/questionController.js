/**
 * Created by Arley on 2017/8/15.
 */


// var express = require('express');
// var router = require('./../../routes/index');
var fs = require('fs');
var path=require("path");
var common = require('./../common');
var qs = require('querystring');
var urlParse = require('url');
var LOGERROR = require('./../../util/logger').logError;   // 错误日志打印
var ERRORTYPES = require('./../../util/ErrorTypesConf'); // 自定义错误类型配置


// 客户问题列表页
exports.VIEW_QUESTION_CUSTOMER_LIST = function(req, res, next) {
    common.getPageData({
        url : '/api/question/getList',
        title : '客户问题列表',
        page : './question/customerList'
    }, req, res, next);
};
// 问题列表页 1365
exports.VIEW_QUESTION_MERCHANTS_LIST = function(req, res, next) {
    common.getPageData({
        url : '/api/merquestion/list',
        title : '商户问题列表',
        page : './question/merchantsList'
    }, req, res, next);
};
exports.VIEW_QUESTION_CUSTOMER_HISRECORD = function(req, res, next) {
    common.getPageData({
        url : '/api/question/his',
        title : '历史记录',
        page : './question/customerHisList'
    }, req, res, next);
};
// 问题管理-商户问题历史记录 1393
exports.VIEW_QUESTION_MERCHANTS_HISRECORD = function(req, res, next) {
    common.getPageData({
        url : '/api/merquestion/his',
        title : '历史记录',
        page : './question/merchantsHis'
    }, req, res, next);
};

// 标签管理列表页 1644
exports.VIEW_LABEL_LIST = function(req, res, next) {
    common.getPageData({
        url : '/label/list',
        title : '标签管理',
        page : './question/labelList'
    }, req, res, next);
};