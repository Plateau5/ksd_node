/**
 * Created by Arley on 2017/8/6.
 */

var fs = require('fs');     // 文件流系统中间件
var path=require("path");   // 路径解析中间件
var common = require('./../common');    // 主控制器文件
var qs = require('querystring');    // 查询字符串解析中间件
var urlParse = require('url');  // url解析控制中间件
var LOGERROR = require('./../../util/logger').logError;   // 错误日志打印
var ERRORTYPES = require('./../../util/ErrorTypesConf'); // 自定义错误类型配置


/**
 * GPS部分
 */

// 业务-车型库侧导航跳转
exports.VIEW_GPS_SYSTEM = function(req, res, next) {
    try {
        if (common.checkPrivilege(1563, req)) {
            res.redirect(markUri + '/gps/list');
        } else if (common.checkPrivilege(1558, req)) {
            res.redirect(markUri + '/gps/warehouse/list');
        }  else if (common.checkPrivilege(1554, req)) {
            res.redirect(markUri + '/gps/apply/list');
        } else {
            throw new Error(ERRORTYPES.CheckPrivilege + ': The code 1554 | 1558 | 1563  is not defined.');
        }
    } catch (e) {
        LOGERROR(e.stack);
        res.redirect(markUri + '/404');
    }
};
// GPS列表页跳转
exports.VIEW_LIST = function(req, res, next) {
    common.getPageData({
        url : '/api/gps/list',
        title : '仓库管理-GPS仓库列表',
        page : './gps/gpsList',
        callback : function (data) {
            if (data) {
                if (data.condition_city_list) {
                    if (data.condition_city_list.length != 0) {
                        data.cityName = data.condition_city_list[0].city_list[0].name;
                    }
                }
                if (data.condition) {
                    if (data.condition.use_id) {

                    }
                }
                data.city_list = JSON.stringify(data.city_list);
                data.condition_city_list = JSON.stringify(data.condition_city_list);
                data.emp_list = JSON.stringify(data.emp_list);
            }
        }
    }, req, res, next);
};
// 仓库管理列表页跳转
exports.VIEW_WAREHOUSE_LIST = function(req, res, next) {
    common.getPageData({
        url : '/api/gps/warehouse/toList',
        title : '仓库管理-GPS仓库列表',
        page : './gps/gpsList'
    }, req, res, next);
};
// GPS申请列表页跳转
exports.VIEW_APPLY_LIST = function(req, res, next) {
    common.getPageData({
        url : '/api/gps/applyList',
        title : '仓库管理-GPS仓库列表',
        page : './gps/gpsList'
    }, req, res, next);
};
//业务-GPS编辑页跳转
exports.VIEW_EDIT = function(req, res, next) {
    common.getPageData({
        url : '/api/gps/warehouse/toList',
        title : '仓库管理-GPS仓库列表',
        page : './gps/gpsEdit'
    }, req, res, next);
};
//业务-GPS编辑页跳转
exports.VIEW_GPS_APPLY_RESULT = function(req, res, next) {
    common.getPageData({
        url : '/api/gps/warehouse/toList',
        title : '仓库管理-GPS仓库列表',
        page : './gps/gpsEdit'
    }, req, res, next);
};








// GPS仓库列表页跳转 1280
/*exports.VIEW_GPS_LIST = function(req, res, next) {
    common.getPageData({
        url : '/api/gps/warehouse/toList',
        title : '仓库管理-GPS仓库列表',
        page : './gps/warehouseList'
    }, req, res, next);
};*/
// GPS仓库-创建GPS仓库跳转 1281
exports.VIEW_GPS_CREATE = function(req, res, next) {
    common.getPageData({
        url : '/api/gps/warehouse/toAdd',
        title : '仓库管理-创建GPS仓库',
        page : './gps/warehouseCreate'
    }, req, res, next);
};
// GPS仓库-GPS仓库详情页跳转 1311
exports.VIEW_GPS_DETAIL = function(req, res, next) {
    common.getPageData({
        url : '/api/gps/warehouse/toDetail',
        title : '仓库管理-GPS仓库详情',
        page : './gps/warehouseDetail'
    }, req, res, next);
};
// GPS仓库-编辑GPS仓库页跳转 1282
exports.VIEW_GPS_EDIT = function(req, res, next) {
    common.getPageData({
        url : '/api/gps/warehouse/toEdit',
        title : '仓库管理-编辑GPS仓库',
        page : './gps/warehouseEdit'
    }, req, res, next);
};
// GPS仓库-GPS仓库-新增入库页跳转 1283
exports.VIEW_GPS_PUTIN = function(req, res, next) {
    common.getPageData({
        url : '/api/gps/warehouse/toPutIn',
        title : '仓库管理-GPS入库',
        page : './gps/warehousePutin',
        callback : function (data) {
            if (data) {
                data.city_list = JSON.stringify(data.city_list);
            }
        }
    }, req, res, next);
};
// GPS仓库-GPS仓库-申请单详情页页跳转 1289
exports.VIEW_GPS_APPLY_DETAIL = function(req, res, next) {
    common.getPageData({
        url : '/api/gps/toApplyDetail',
        title : '仓库管理-GPS申请详情',
        page : './gps/applyDetail'
    }, req, res, next);
};
// GPS仓库-GPS仓库-申请单-确认按钮点击跳转
exports.VIEW_GPS_APPLY_CONFIRM = function(req, res, next) {
    var param = req.body;   // 页面提交数据
    var data = {};
    try {
        data.originUrl = req.originalUrl;
        data.markUri = markUri;
        data.apiServerPath = apiServerPath;
        data.domain = domain;
        data.gps_apply_id = param.gps_apply_id;     // 锁定的gps
        data.applicant = param.applicant;   // 申请人
        data.gps_ids = param.gps_ids;       // 确认发送的gps
        data.delGps_ids = param.delGps_ids;     // 删除发送的GPS
        if (param.gps_ids === '' || param.gps_ids === undefined) {
            data.title = '仓库管理-不同意';
            res.render('./gps/applyDisagree', data);
        } else if (param.receive_type === "1") {  // 当面交付
            data.title = '仓库管理-GPS当面交付';
            res.render('./gps/applyToface', data);
        } else if (param.receive_type === "2") {
            common.getPageData({
                url : '/api/gps/toApplyConfirm',
                title : '仓库管理-快递邮寄',
                page : './gps/applyExpress'
            }, req, res, next);
        } else {
            throw new Error(ERRORTYPES.Param + '：The next page of to gps apply confirm is not defined. Request get params are error is possible.');
        }
    } catch (e) {
        LOGERROR(e.stack);
        res.redirect(markUri + '/404', {status : 400});
    }

};


/**
 * 行政仓库部分
 */
// 行政仓库列表页跳转 1298
exports.VIEW_ADMINISTRATIVE_LIST = function(req, res, next) {
    common.getPageData({
        url : '/api/administrative/list',
        title : '仓库管理-行政仓库列表',
        page : './administrative/list'
    }, req, res, next);
};
// 行政仓库-创建行政仓库跳转 1299
exports.VIEW_ADMINISTRATIVE_CREATE = function(req, res, next) {
    var data = {};
    data.title = '仓库管理-新建行政仓库';
    data.originUrl = req.originalUrl;
    data.markUri = markUri;
    data.apiServerPath = apiServerPath;
    data.domain = domain;
    res.render('./administrative/create', data);
};
// 行政仓库-编辑仓库跳转 1300
exports.VIEW_ADMINISTRATIVE_EDIT = function(req, res, next) {
    common.getPageData({
        url : '/api/administrative/to/edit',
        title : '仓库管理-编辑行政仓库',
        page : './administrative/edit'
    }, req, res, next);
};
// 行政仓库-库存列表页跳转 1301
exports.VIEW_ADMINISTRATIVE_EQUIPMENT_LIST = function(req, res, next) {
    common.getPageData({
        url : '/api/administrative/equipment/list',
        title : '仓库管理-行政物品列表',
        page : './administrative/equipmentList'
    }, req, res, next);
};
// 行政仓库-新增入库页跳转 1302
exports.VIEW_ADMINISTRATIVE_EQUIPMENT_CREATE = function(req, res, next) {
    common.getPageData({
        url : '/api/administrative/equipment/tocreate',
        title : '仓库管理-新增入库',
        page : './administrative/equipmentCreate',
        callback : function (data) {
            data.emp_list = JSON.stringify(data.emp_list);
        }
    }, req, res, next);
};
// 行政仓库-库存编辑页跳转 1303
exports.VIEW_ADMINISTRATIVE_EQUIPMENT_EDIT = function(req, res, next) {
    common.getPageData({
        url : '/api/administrative/equipment/toedit',
        title : '仓库管理-编辑物品',
        page : './administrative/equipmentEdit',
        callback : function (data) {
            data.emp_list = JSON.stringify(data.emp_list);
        }
    }, req, res, next);
};