/**
 * Created by Arley on 2017/12/01
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

// 商户-商户管理-主导航跳转 1366
exports.VIEW_MERCHANTS_SYSTEM = function(req, res, next) {
    try {
        if (common.checkPrivilege(1367, req)) {
            res.redirect(markUri + '/merchants/manage/system');
        } else if (common.checkPrivilege(1368, req)) {
            res.redirect(markUri + '/records/manage');
        } else if (common.checkPrivilege(1487, req) || common.checkPrivilege(1488, req)) {
            res.redirect(markUri + '/loan/system');
        } else {
            throw new Error(ERRORTYPES.CheckPrivilege + ': The code 1369 | 1368 | 1367 is not defined.');
        }
    } catch (e) {
        LOGERROR(e.stack);
        res.redirect(markUri + '/404');
    }
};
// 商户-商户管理-侧导航跳转 1367
exports.VIEW_MERCHANTS_MANAGE_SYSTEM = function(req, res, next) {
    try {
        if (common.checkPrivilege(1370, req)) {
            res.redirect(markUri + '/merchants/pendingAudit');
        } else if (common.checkPrivilege(1371, req)) {
            res.redirect(markUri + '/merchants/pass');
        } else if (common.checkPrivilege(1372, req)) {
            res.redirect(markUri + '/merchants/unpass');
        } else if (common.checkPrivilege(1369, req)) {
            res.redirect(markUri + '/merchants/norecords');
        } else {
            throw new Error(ERRORTYPES.CheckPrivilege + ': The code 1370 | 1371 | 1372 | 1369 is not defined.');
        }
    } catch (e) {
        LOGERROR(e.stack);
        res.redirect(markUri + '/404');
    }
};
// 商户-商户管理-待审核 1370
exports.VIEW_MERCHANTS_PENDINGAUDIT = function(req, res, next) {
    common.getPageData({
        url : '/api/supplier/audit/list',
        title : '商户管理-待审核',
        page : './merchants/merchantsList'
    }, req, res, next);
};
// 商户-商户管理-已通过 1371
exports.VIEW_MERCHANTS_PASS = function(req, res, next) {
    common.getPageData({
        url : '/api/supplier/pass/list',
        title : '商户管理-已通过',
        page : './merchants/merchantsList'
    }, req, res, next);
};
// 商户-商户管理-未通过 1372
exports.VIEW_MERCHANTS_UNPASS = function(req, res, next) {
    common.getPageData({
        url : '/api/supplier/unpass/list',
        title : '商户管理-未通过',
        page : './merchants/merchantsList'
    }, req, res, next);
};
// 商户-商户管理-未备案 1369
exports.VIEW_MERCHANTS_NORECORDS = function(req, res, next) {
    common.getPageData({
        url : '/api/supplier/unrecords/list',
        title : '商户管理-未备案',
        page : './merchants/merchantsList'
    }, req, res, next);
};
// 商户-商户管理-备案管理 1368
exports.VIEW_RECORDS_MANAGE = function(req, res, next) {
    common.getPageData({
        url : '/api/records/manager',
        title : '商户管理-备案管理',
        page : './merchants/recordsList'
    }, req, res, next);
};
// 商户-商户管理-详情页 1373
exports.VIEW_MERCHANTS_DETAIL = function(req, res, next) {
    common.getPageData({
        url : '/api/supplier/detail',
        title : '商户管理-详情页',
        page : './merchants/detail'
    }, req, res, next);
};
// 商户-商户管理-待审核-同意页面跳转 1395
exports.VIEW_MERCHANTS_AUDIT_AGREE = function(req, res, next) {
    common.getPageData({
        url : '/api/supplier/tocheck/agree',
        title : '商户管理-审核通过',
        page : './merchants/agree'
    }, req, res, next);
};
// 商户-商户管理-待审核-不同意页面跳转 1396
exports.VIEW_MERCHANTS_AUDIT_DISAGREE = function(req, res, next) {
    common.getPageData({
        url : '/api/supplier/tocheck/disagree',
        title : '商户管理-审核不通过',
        page : './merchants/disagree'
    }, req, res, next);
};
// 商户-商户管理-待审核-编辑页面 1385
exports.VIEW_MERCHANTS_EDIT = function(req, res, next) {
    common.getPageData({
        url : '/api/supplier/toedit',
        title : '商户管理-编辑商户',
        page : './merchants/edit',
        callback : function (data) {
            data.empList = JSON.stringify(data.empList);
            data.supplierTypeNEWString = JSON.stringify(data.supplierTypeNEW);
            data.supplierTypeOLDString = JSON.stringify(data.supplierTypeOLD);
            data.supplierTypeString = JSON.stringify(data.supplierType);
        }
    }, req, res, next);
};
// 商户-商户管理-跳转返佣政策列表页 1480
exports.VIEW_MERCHANTS_POLICIES_LIST = function(req, res, next) {
    common.getPageData({
        url : '/api/supplier/rebate/policy',
        title : '商户管理-制定返佣政策',
        page : './merchants/merchantsPolicies'
    }, req, res, next);
};
// 商户-商户管理-返佣政策编辑页 1481
exports.VIEW_MERCHANTS_POLICIES_EDIT = function(req, res, next) {
    common.getPageData({
        url : '/api/supplier/rebatepolicy/list',
        title : '商户管理-制定返佣政策',
        page : './merchants/merchantsPoliciesEdit',
        callback : function (data) {
            var policiesList = data.data;

            for (var n = 0, length = policiesList.length; n < length; n++) {
                // 计算万元系数
                var ratesArr = policiesList[n].rate.split(',');     // 当前政策所有费率
                var periods = policiesList[n].rebate_period.split(',');     // 当前政策所有期限
                var ratesList = [];
                for (var a = 0, l = ratesArr.length; a < l; a++) {
                    var _arr = [];       // 当前利率的对应期数万元系数
                    var _rateObj = {};      // 当前利率数据
                    _rateObj.rates = ratesArr[a];
                    for (var j = 0, c = periods.length; j < c; j++) {
                        var _obj = {};
                        // 万元系数=（费率*10000*(融资期限➗12)+10000）➗融资期限（费率为百分数，需转化为小数）
                        var millionCoefficient = parseInt((((Number(ratesArr[a]) * 100 * (Number(periods[j]) / 12)) + 10000) / Number(periods[j])) * 1000) / 1000;
                        // console.log(Number(ratesArr[a]) + '-' + Number(periods[j]));
                        if (millionCoefficient.toString().indexOf('.') !== -1) {
                            if (Number(millionCoefficient.toString().split('.')[1]) > 445) {
                                millionCoefficient = Number(millionCoefficient.toString().split('.')[0]) + 1;
                            } else {
                                millionCoefficient = Number(millionCoefficient.toString().split('.')[0]);
                            }
                        }
                        _obj.name = periods[j] + '期';
                        _obj.value = millionCoefficient;
                        _arr.push(_obj);
                        _rateObj.millionCoefficients = _arr;
                    }
                    ratesList.push(_rateObj);
                }
                data.data[n].ratesList = ratesList;     // 为每一条政策添加数据
            }
        }
    }, req, res, next);
};
// 商户-商户管理-返佣政策历史页 1478
exports.VIEW_MERCHANTS_POLICIES_HISTORY_LIST = function(req, res, next) {
    common.getPageData({
        url : '/api/supplier/rebatepolicy/dislist',
        title : '供应商-机构政策返点列表',
        page : './merchants/merchantsPoliciesHistory',
        callback : function (data) {
            // 计算万元系数
            var policiesList = data.data;
            for (var i = 0, len = policiesList.length; i < len; i++) {
                // -- 计算每个政策的万元系数
                var rate = Number(policiesList[i].rebate_period);    // 当前政策的费率
                var periods = Number(policiesList[i].rate);    // 当前政策的融资期限
                // 万元系数=（费率*10000*(融资期限➗12)+10000）➗融资期限（费率为百分数，需转化为小数）
                var millionCoefficient = parseInt((((rate * 100 * (periods / 12)) + 10000) / periods) * 1000) / 1000;
                if (millionCoefficient.toString().indexOf('.') !== -1) {
                    if (Number(millionCoefficient.toString().split('.')[1]) > 445) {
                        millionCoefficient = Number(millionCoefficient.toString().split('.')[0]) + 1;
                    } else {
                        millionCoefficient = Number(millionCoefficient.toString().split('.')[0]);
                    }
                }
                policiesList[i].millionCoefficient = millionCoefficient;

                // 格式化返点规则
                var rule = '';
                if (policiesList[i].rebate_way === 1) {     // 固定金额
                    rule = '固定金额：' + policiesList[i].rebate_money + '元';
                } else if (policiesList[i].rebate_way === 2) {      // 超额返比例
                    rule = '超过' + policiesList[i].exceed_money + '返超出金额的' + policiesList[i].rebate_money;
                } else if (policiesList[i].rebate_way === 3) {      // 超额返金额
                    rule = '超过' + policiesList[i].exceed_money + '返超出金额的' + policiesList[i].rebate_money;
                } else if (policiesList[i].rebate_way === 4) {      // 返比例
                    rule = '固定比例：' + policiesList[i].rebate_money + '%';
                }
                policiesList[i].rule = rule;

                // 转化城市名称
                if (policiesList[i].city_name) {
                    policiesList[i].city_names = policiesList[i].city_name.replace(/,/g, '、');
                }
            }
            data.data = policiesList;
        }
    }, req, res, next);
};


// 商户-放款管理-侧导航跳转
exports.VIEW_LOAN_SYSTEM = function(req, res, next) {
    try {
        if (common.checkPrivilege(1487, req)) {
            res.redirect(markUri + '/loan/pending');
        } else if (common.checkPrivilege(1488, req)) {
            res.redirect(markUri + '/loan/pass');
        } else {
            throw new Error(ERRORTYPES.CheckPrivilege + ': The code 1487 | 1488  is not defined.');
        }
    } catch (e) {
        LOGERROR(e.stack);
        res.redirect(markUri + '/404');
    }
};
// 商户-放款管理-待审批 1487
exports.VIEW_LOAN_PENDING = function(req, res, next) {
    common.getPageData({
        url : '/api/loan/waitList',
        title : '商户-放款管理-待审批',
        page : './merchants/pending',
        callback : function (data) {
            data.list_type = 1;
        }
    }, req, res, next);
};

 //商户-放款管理-已审批 1488
exports.VIEW_LOAN_PASS = function(req, res, next) {
    common.getPageData({
        url: '/api/loan/passList',
        title: '商户-放款管理-已审批',
        page: './merchants/pending',
        callback : function (data) {
            data.list_type = 2;
        }
    }, req, res, next);
};
// 商户-放款管理-商户打款结算详情 1498
exports.VIEW_LOAN_PASS_LIST = function(req, res, next) {
    common.getPageData({
        url: '/api/loan/already/list',
        title: '商户-放款管理-已审批',
        page: './merchants/detailsInfo'
    }, req, res, next);
};


//商户-放款管理-详情 1497
exports.VIEW_LOAN_PENDING_LIST = function(req, res, next) {
    common.getPageData({
        url : '/api/loan/wait/list',
        title : '商户-放款管理-放款管理详情',
        page : './merchants/detailsInfo'
    }, req, res, next);
};

// 商户-放款管理-待审核-同意页面跳转 1501
exports.VIEW_LOAN_BATCH_AGREE = function(req, res, next) {
    common.getPageData({
        url : '/api/financial/toAgree',
        title : '放款管理-审核通过',
        page : './merchants/infoagree'
    }, req, res, next);
};

// 商户-放款管理-待审核-同意页面跳转(批量) 1501
exports.VIEW_LOAN_AGREE = function(req, res, next) {
    common.getPageData({
        url : '/api/loan/toAgree',
        title : '放款管理-审核通过',
        page : './merchants/infoagree'
    }, req, res, next);
};

// 商户-商户管理-待审核-不同意页面跳转 1502
exports.VIEW_LOAN_BATCH_DISAGREE = function(req, res, next) {
    common.getPageData({
        url : '/api/loan/toDisAgree',
        title : '放款管理-审核不通过',
        page : './merchants/infoagree'
    }, req, res, next);
};

// 商户-放款管理-待审核-不同意页面跳转(批量) 1502
exports.VIEW_LOAN_DISAGREE = function(req, res, next) {
    common.getPageData({
        url : '/api/loan/toDisAgree',
        title : '放款管理-审核不通过',
        page : './merchants/infoagree'
    }, req, res, next);
};

// 商户-放款管理-待审核-转交他人页面 1503
exports.VIEW_LOAN_BATCH_TURNOVER = function(req, res, next) {
    common.getPageData({
        url : '/api/loan/toTransfer',
        title : '放款管理-转交他人',
        page : './merchants/loanTransfer'
    }, req, res, next);
};

// 商户-放款管理-待审核-转交他人页面(批量) 1503
exports.VIEW_LOAN_TURNOVER = function(req, res, next) {
    common.getPageData({
        url : '/api/loan/toTransfer',
        title : '放款管理-转交他人',
        page : './merchants/loanTransfer'
    }, req, res, next);
};
