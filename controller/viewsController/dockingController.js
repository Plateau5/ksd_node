/**
 * Created by Arley on 2017/12/28
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


// 平安对接-跳转录入首页 1429
exports.VIEW_DOCKING_PINGAN_HOME = function(req, res, next) {
    var financeId = req.body.finance_id;
    var queryType = req.body.query_type;
    var url = req.body.url;
    var userName = req.body.userName;
    var navigation = req.body.navigation;
    var nodeUrl = req.body.nodeUrl;
    common.getPageData({
        url : '/api/docking/table',
        title : '客户-录入资料',
        page : './customer/dockingPAHome',
        callback : function (data) {
            data.finance_id = financeId;
            data.query_type = queryType;
            data.url = url;
            data.userName = userName;
            data.navigation = navigation;
            data.nodeUrl = nodeUrl;
            /*data.carInfo = 1;
            data.renterInfo = 1;
            data.sponsorInfo = 1;
            data.fileInfo = 1;
            data.creditInfo = 1;*/
        }
    }, req, res, next);
};
// 平安对接-车辆信息页
exports.VIEW_DOCKING_PINGAN_CAR = function(req, res, next) {
    common.getPageData({
        url : '/api/pingan/carInfo/detail',
        title : '客户-车辆信息',
        page : './customer/dockingPACarInfo',
        callback : function (data) {
            if (data.carInfo) {
                data.carInfo = JSON.parse(data.carInfo);
            }
            formatCarInfoAmount(data);
            var queryType = req.body.query_type;
            var finance_id = req.body.finance_id;
            var preCode = req.body.preCode;
            var nextQueryType = req.body.nextQueryType;
            var userName = req.body.userName;
            var navigation = req.body.navigation;
            var nodeUrl = req.body.nodeUrl;
            data.navigation = navigation;
            data.nodeUrl = nodeUrl;
            data.userName = userName;
            data.nextQueryType = nextQueryType;
            data.preCode = preCode;
            data.query_type = queryType;
            var url = req.body.url;
            data.finance_id = finance_id;
            data.url = url;
        }
    }, req, res, next);
};
// 平安对接-承租人信息页
exports.VIEW_DOCKING_PINGAN_LENDER = function(req, res, next) {
    common.getPageData({
        url : '/api/pingan/renterInfo/detail',
        title : '客户-承租人信息',
        page : './customer/dockingPARenterInfo',
        callback : function (data) {
            data.renterInfo = JSON.parse(data.renterInfo);
            var finance_id = req.body.finance_id;
            var url = req.body.url;
            var queryType = req.body.query_type;
            var preCode = req.body.preCode;
            var nextQueryType = req.body.nextQueryType;
            var userName = req.body.userName;
            var navigation = req.body.navigation;
            var nodeUrl = req.body.nodeUrl;
            data.navigation = navigation;
            data.nodeUrl = nodeUrl;
            data.userName = userName;
            data.nextQueryType = nextQueryType;
            data.preCode = preCode;
            data.query_type = queryType;
            data.finance_id = finance_id;
            data.url = url;
            (!data.renterInfo.familyInCome && data.renterInfo.familyInCome != 0) && (data.renterInfo.familyInCome = 0);        // 每月家庭净收入
            (!data.renterInfo.familyExpend && data.renterInfo.familyExpend != 0) && (data.renterInfo.familyExpend = 0);        // 每月支出
        }
    }, req, res, next);
};
// 平安对接-担保人信息页
exports.VIEW_DOCKING_PINGAN_GUARGANTOR = function(req, res, next) {
    common.getPageData({
        url : '/api/pingan/sponsorInfos/detail',
        title : '客户-担保人信息',
        page : './customer/dockingPAGuarantorInfo',
        callback : function (data) {
            if (data.sponsorInfo) {
                data.sponsorInfo = JSON.parse(data.sponsorInfo);
            }
            var finance_id = req.body.finance_id;
            var url = req.body.url;
            var queryType = req.body.query_type;
            var preCode = req.body.preCode;
            var nextQueryType = req.body.nextQueryType;
            var userName = req.body.userName;
            var navigation = req.body.navigation;
            var nodeUrl = req.body.nodeUrl;
            data.navigation = navigation;
            data.nodeUrl = nodeUrl;
            data.userName = userName;
            data.nextQueryType = nextQueryType;
            data.preCode = preCode;
            data.query_type = queryType;
            data.finance_id = finance_id;
            data.url = url;
        }
    }, req, res, next);
};
// 平安对接-文件信息页
exports.VIEW_DOCKING_PINGAN_FILES = function(req, res, next) {
    common.getPageData({
        url : '/api/docking/document/list',
        title : '客户-文件信息',
        page : './customer/dockingPARenterFilesInfo',
        callback : function (data) {
            var finance_id = req.body.finance_id;
            var url = req.body.url;
            var queryType = req.body.query_type;
            var preCode = req.body.preCode;
            var nextQueryType = req.body.nextQueryType;
            var userName = req.body.userName;
            var navigation = req.body.navigation;
            var nodeUrl = req.body.nodeUrl;
            data.navigation = navigation;
            data.nodeUrl = nodeUrl;
            data.userName = userName;
            data.nextQueryType = nextQueryType;
            data.preCode = preCode;
            data.query_type = queryType;
            data.finance_id = finance_id;
            data.url = url;
            var formatRes = organizeData(data.data_material);
            data.dataFiles = formatRes.dataFiles;
            data.groupNum = formatRes.groupNum;
            data.groupId = formatRes.groupId;
        }
    }, req, res, next);
};
// 平安对接-征信查询信息页
exports.VIEW_DOCKING_PINGAN_CREDIT = function(req, res, next) {
    common.getPageData({
        url : '/api/docking/credit/list',
        title : '客户-征信查询信息',
        page : './customer/dockingPACreditInfo',
        callback : function (data) {
            var finance_id = req.body.finance_id;
            var url = req.body.url;
            var queryType = req.body.query_type;
            var preCode = req.body.preCode;
            var nextQueryType = req.body.nextQueryType;
            var userName = req.body.userName;
            var navigation = req.body.navigation;
            var nodeUrl = req.body.nodeUrl;
            data.navigation = navigation;
            data.nodeUrl = nodeUrl;
            data.userName = userName;
            data.nextQueryType = nextQueryType;
            data.preCode = preCode;
            data.query_type = queryType;
            data.finance_id = finance_id;
            data.url = url;
        }
    }, req, res, next);
};

// 平安对接-查看详情-跳转录入首页
exports.VIEW_DOCKING_PINGAN_DETAILHOME = function(req, res, next) {
    var financeId = req.body.finance_id;
    var queryType = req.body.query_type;
    var url = req.body.url;
    var nextQueryType = req.body.nextQueryType;
    var userName = req.body.userName;
    var navigation = req.body.navigation;
    var nodeUrl = req.body.nodeUrl;
    common.getPageData({
        url : '/api/docking/table',
        title : '客户-查看录入资料',
        page : './customer/dockingPAHomeDetail',
        callback : function (data) {
            data.userName = userName;
            data.nextQueryType = nextQueryType;
            data.finance_id = financeId;
            data.query_type = queryType;
            data.url = url;
            data.navigation = navigation;
            data.nodeUrl = nodeUrl;
        }
    }, req, res, next);
};
// 平安对接-查看详情-车辆信息页
exports.VIEW_DOCKING_PINGAN_DETAILCAR = function(req, res, next) {
    common.getPageData({
        url : '/api/pingan/carInfo/detail',
        title : '客户-查看车辆信息',
        page : './customer/dockingPACarInfoDetail',
        callback : function (data) {
            if (data.carInfo) {
                data.carInfo = JSON.parse(data.carInfo);
            }
            formatCarInfoAmount(data);
            var queryType = req.body.query_type;
            var finance_id = req.body.finance_id;
            var preCode = req.body.preCode;
            var nextQueryType = req.body.nextQueryType;
            var userName = req.body.userName;
            var navigation = req.body.navigation;
            var nodeUrl = req.body.nodeUrl;
            data.navigation = navigation;
            data.nodeUrl = nodeUrl;
            data.userName = userName;
            data.nextQueryType = nextQueryType;
            data.preCode = preCode;
            data.query_type = queryType;
            var url = req.body.url;
            data.finance_id = finance_id;
            data.url = url;
            data.repaymentPlan = calcRepaymentPlan (data.carInfo.financeAmount, data.carInfo.interestRate, data.carInfo.rentDue, data.time);
        }
    }, req, res, next);
};
// 平安对接-查看详情-承租人信息页
exports.VIEW_DOCKING_PINGAN_DETAILLENDER = function(req, res, next) {
    common.getPageData({
        url : '/api/pingan/renterInfo/detail',
        title : '客户-查看承租人信息',
        page : './customer/dockingPARenterInfoDetail',
        callback : function (data) {
            data.renterInfo = JSON.parse(data.renterInfo);
            var finance_id = req.body.finance_id;
            var url = req.body.url;
            var queryType = req.body.query_type;
            var preCode = req.body.preCode;
            var nextQueryType = req.body.nextQueryType;
            var userName = req.body.userName;
            var navigation = req.body.navigation;
            var nodeUrl = req.body.nodeUrl;
            data.navigation = navigation;
            data.nodeUrl = nodeUrl;
            data.userName = userName;
            data.nextQueryType = nextQueryType;
            data.preCode = preCode;
            data.query_type = queryType;
            data.finance_id = finance_id;
            data.url = url;
        }
    }, req, res, next);
};
// 平安对接-查看详情-担保人信息页
exports.VIEW_DOCKING_PINGAN_DETAILGUARGANTOR = function(req, res, next) {
    common.getPageData({
        url : '/api/pingan/sponsorInfos/detail',
        title : '客户-查看担保人信息',
        page : './customer/dockingPAGuarantorInfoDetail',
        callback : function (data) {
            if (data.sponsorInfo) {
                data.sponsorInfo = JSON.parse(data.sponsorInfo);
            }
            var finance_id = req.body.finance_id;
            var url = req.body.url;
            var queryType = req.body.query_type;
            var preCode = req.body.preCode;
            var nextQueryType = req.body.nextQueryType;
            var userName = req.body.userName;
            var navigation = req.body.navigation;
            var nodeUrl = req.body.nodeUrl;
            data.navigation = navigation;
            data.nodeUrl = nodeUrl;
            data.userName = userName;
            data.nextQueryType = nextQueryType;
            data.preCode = preCode;
            data.query_type = queryType;
            data.finance_id = finance_id;
            data.url = url;
        }
    }, req, res, next);
};
// 平安对接-查看详情-文件信息页
exports.VIEW_DOCKING_PINGAN_DETAILFILES = function(req, res, next) {
    common.getPageData({
        url : '/api/docking/document/list',
        title : '客户-查看文件信息',
        page : './customer/dockingPARenterFilesInfoDetail',
        callback : function (data) {
            var finance_id = req.body.finance_id;
            var url = req.body.url;
            var queryType = req.body.query_type;
            var preCode = req.body.preCode;
            var nextQueryType = req.body.nextQueryType;
            var userName = req.body.userName;
            var navigation = req.body.navigation;
            var nodeUrl = req.body.nodeUrl;
            data.navigation = navigation;
            data.nodeUrl = nodeUrl;
            data.userName = userName;
            data.nextQueryType = nextQueryType;
            data.preCode = preCode;
            data.query_type = queryType;
            data.finance_id = finance_id;
            data.url = url;
            var formatRes = organizeData(data.data_material);
            data.dataFiles = formatRes.dataFiles;
            data.groupNum = formatRes.groupNum;
            data.groupId = formatRes.groupId;
        }
    }, req, res, next);
};
// 平安对接-查看详情-征信查询信息页
exports.VIEW_DOCKING_PINGAN_DETAILCREDIT = function(req, res, next) {
    common.getPageData({
        url : '/api/docking/credit/list',
        title : '客户-查看征信查询信息',
        page : './customer/dockingPACreditInfoDetail',
        callback : function (data) {
            var finance_id = req.body.finance_id;
            var url = req.body.url;
            var queryType = req.body.query_type;
            var preCode = req.body.preCode;
            var nextQueryType = req.body.nextQueryType;
            var userName = req.body.userName;
            var navigation = req.body.navigation;
            var nodeUrl = req.body.nodeUrl;
            data.navigation = navigation;
            data.nodeUrl = nodeUrl;
            data.userName = userName;
            data.nextQueryType = nextQueryType;
            data.preCode = preCode;
            data.query_type = queryType;
            data.finance_id = finance_id;
            data.url = url;
        }
    }, req, res, next);
};


/**
 * 文件信息部分数据格式化
 * @author Arley Joe 2018-1-4 14:39:06
 * @param d {Object} : 源数据
 * @return {Array}  ：返回值
 */
var organizeData = function (d) {
    var res = {};
    var dataFiles = [];
    var groupId = [];
    var groupName = [];
    var groupNum = [];
    var materialSeries = [];
    for (var i = 0, len = d.length; i < len; i++) {
        var o = {};
        if (d[i].material_type) {
            if (materialSeries.indexOf(d[i].material_type) === -1) {
                materialSeries.push(d[i].material_type);
                o.type = d[i].material_type;
                if (d[i].material_name) {
                    o.name = d[i].material_name;
                }
                o.children = [];
                if (d[i].require === '1') {
                    o.children.unshift(d[i]);
                } else {
                    o.children.push(d[i]);
                }
                dataFiles[d[i].material_type] = o;
            } else {
                if (d[i].require === '1') {
                    dataFiles[d[i].material_type].children.unshift(d[i]);
                } else {
                    dataFiles[d[i].material_type].children.push(d[i]);
                }
                // dataFiles[d[i].material_type].children.push(d[i]);
            }
        }
        if (d[i].group_id && groupId.indexOf(d[i].group_id) === -1) {
            groupId.push(d[i].group_id);
        }
        if (d[i].group_num && groupNum.indexOf(d[i].group_num) === -1) {
            groupNum.push(d[i].group_num);
        }

    }
    res.dataFiles = dataFiles;
    res.groupId = groupId.join(',');
    res.groupNum = groupNum.join(',');
    return res;
};


/**
 * 格式化金额数据
 * @author Arley Joe 2018-1-9 14:47:47
 * @param d
 */
function formatCarInfoAmount (d) {
    if (d.carInfo) {
        (!d.carInfo.buyTax && d.carInfo.buyTax != 0) && (d.carInfo.buyTax = 0);     // 购置税
        (!d.carInfo.pawnValue && d.carInfo.pawnValue != 0) && (d.carInfo.pawnValue = 0);    // 车辆实际价格
        (!d.carInfo.otherFee && d.carInfo.otherFee != 0) && (d.carInfo.otherFee = 0);       // 其他费用
        (!d.carInfo.assure && d.carInfo.assure != 0) && (d.carInfo.assure = 0);     // 保险
        (!d.carInfo.firstPayScale && d.carInfo.firstPayScale != 0) && (d.carInfo.firstPayScale = 20);    // 首付比例
        (!d.carInfo.cautionMoney && d.carInfo.cautionMoney != 0) && (d.carInfo.cautionMoney = 0);       // 保证金
        (!d.carInfo.serviceCharge && d.carInfo.serviceCharge != 0) && (d.carInfo.serviceCharge = 0);        // 服务费
        (!d.carInfo.attachFinance && d.carInfo.attachFinance != 0) && (d.carInfo.attachFinance = 0);        // 附加融资额
        (!d.carInfo.price && d.carInfo.price != 0) && (d.carInfo.price = 0);        // 品牌指导价
        (!d.carInfo.firstPay && d.carInfo.firstPay != 0) && (d.carInfo.firstPay = 0);        // 首付金额
        (!d.carInfo.financeAmount && d.carInfo.financeAmount != 0) && (d.carInfo.financeAmount = 0);        // 融资金额
        (!d.carInfo.netFinanceAmount && d.carInfo.netFinanceAmount != 0) && (d.carInfo.netFinanceAmount = 0);        // 净融资额
        (!d.carInfo.eachRent && d.carInfo.eachRent != 0) && (d.carInfo.eachRent = 0);        // 每期租金
        (!d.carInfo.projectAmount && d.carInfo.projectAmount != 0) && (d.carInfo.projectAmount = 0);        // 项目金额
    } else {
        d.carInfo = {};
        d.carInfo.buyTax = 0;
        d.carInfo.pawnValue = 0;
        d.carInfo.otherFee = 0;
        d.carInfo.assure = 0;
        d.carInfo.firstPayScale = 20;
        d.carInfo.cautionMoney = 0;
        d.carInfo.serviceCharge = 0;
        d.carInfo.attachFinance = 0;
        d.carInfo.price = 0;
        d.carInfo.firstPay = 0;
        d.carInfo.financeAmount = 0;
        d.carInfo.netFinanceAmount = 0;
        d.carInfo.eachRent = 0;
        d.carInfo.projectAmount = 0;
    }
}


/**
 * 还款计划表计算
 * @author Arley Joe 2018-1-3 18:16:57
 * @desc :   还款计划表公式：
 *           每期租金（计划表中为：租金金额）=〔融资金额×月利率×(1＋月利率)^租赁期限〕÷〔(1＋月利率)^租赁期限-1〕
 *           利息金额 = 融资金额 × 月利率 × 〔(1+月利率)^租赁期限-(1+月利率)^(租金期次-1)〕÷〔(1+月利率)^租赁期限-1〕
 *           本金金额 = 融资金额×月利率×(1+月利率)^(租金期次-1)÷〔(1+月利率)^租赁期限-1〕
 *
 *           其中：328产品月利率=(11.21%÷12)；329产品月利率=(11.42%÷12)
 */

function calcRepaymentPlan (financeAmount, interestRate, rentDue, time) {
    financeAmount = Number(financeAmount);
    interestRate = Number(interestRate);
    rentDue = Number(rentDue);
    interestRate = interestRate / 100;
    /*var data = {
        interestRateAmount : [],        // 利息金额
        principalAmount : [],        // 本金金额,
        rentTime : []
    };*/
    var data = [];
    var timeArr = time.split('-');
    timeArr[0] = Number(timeArr[0]);
    timeArr[1] = Number(timeArr[1]);
    var month = timeArr[1],
        year = timeArr[0];
    var monthRent = Number((interestRate / 12));
    var eachRent = Number((financeAmount * monthRent * Math.pow((1 + monthRent), rentDue)  / (Math.pow((1 + monthRent), rentDue) - 1)).toFixed(2));
    for (var i = 1; i <= rentDue; i++) {
        // 循环时间
        month += 1;     // 首个还款日为下个月的15号
        if (month > 12) {
            year += 1;
            month = 1;
        }
        // 每期利息金额
        var a = Number((financeAmount * monthRent * (Math.pow((1 + monthRent), rentDue) - Math.pow((1 + monthRent), (i - 1))) / (Math.pow((1 + monthRent), rentDue) - 1)).toFixed(2));
        // 本金金额
        var b = Number((financeAmount * monthRent * Math.pow((1 + monthRent), (i - 1)) / (Math.pow((1 + monthRent), rentDue) - 1)).toFixed(2));
        var o = {};
        o.eachRent = eachRent;
        o.interestRateAmount = formatNum(a);
        o.principalAmount = formatNum(b);
        /*data.interestRateAmount.push(a);
        data.principalAmount.push(b);*/
        // data.rentTime.push(payTime);
        o.rentTime = year + '-' + ((month < 10) ? ('0' + month) : month) +'-15';
        data.push(o);
    }
    return data;
}


/**
 * 保留两位小数自动补0
 * @author Arley Joe 2018-1-7 10:14:16
 * @param value {Number|String} 需要进行保留两位小数的值
 * @return {*}
 */
function formatNum (value){
    value = Math.round(parseFloat(value)*100)/100;
    var xsd=value.toString().split(".");
    if(xsd.length==1){
        value=value.toString()+".00";
        return value;
    }
    if(xsd.length>1){
        if(xsd[1].length<2){
            value=value.toString()+"0";
        }
        return value;
    }
}










