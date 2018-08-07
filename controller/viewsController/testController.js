/**
 * Created by Arley Joe on 06/08/2018
 * @description This controller is for testing purposes only. Not used on production platforms.
 *              Don't write anything here without testing.
 * @copyright arleyjoe@163.com
 */

var fs = require('fs');
var path=require("path");
var common = require('./../common');
var qs = require('querystring');
var urlParse = require('url');
var LOGERROR = require('./../../util/logger').logError;   // 错误日志打印
var ERRORTYPES = require('./../../util/ErrorTypesConf'); // 自定义错误类型配置

// Used to kindEditor
exports.VIEW_TEST_KINDEDITOR = function(req, res, next) {
    var data = {};
    var localUrl = req.originalUrl;
    data.title = 'kindEditor';
    data.originUrl = localUrl;
    data.markUri = markUri;
    data.apiServerPath = apiServerPath;
    data.domain = domain;
    var body = req.body;
    data.reqParams = body;
    res.render('./test/kindEditor', data);
};
