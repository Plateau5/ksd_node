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

// 供应商部分-金融机构-产品列表-已发布页  1075
exports.VIEW_SUPPLIER_ORGANIZATION_PUBLISHEDPRODUCTS_LIST = function(req, res, next) {
    common.getPageData({
        url : '/api/product/publishList',
        title : '供应商-已发布产品',
        page : './organization/publishList',
        callback : function (data) {
            if (data) {
                for (var i = 0, len = data.list.length; i < len; i++) {
                    if (data.list[i].downpayment_type == 1) {
                        data.list[i].downpayment_value = data.list[i].downpayment_value.replace(/,/g,'% / ') + '%';
                    } else if (data.list[i].downpayment_type == 2) {
                        data.list[i].downpayment_value = data.list[i].downpayment_value.replace(/,/g,'元 / ') + '元';
                    }
                    data.list[i].interest_rate = data.list[i].interest_rate.replace(/,/g,'% / ') + '%';
                }
            }
        }
    }, req, res, next);
};
// 供应商部分-金融机构-产品列表-未发布页  1076
exports.VIEW_SUPPLIER_ORGANIZATION_UNPUBLISHEDPRODUCTS_LIST = function(req, res, next) {
    common.getPageData({
        url : '/api/product/warehouseList',
        title : '供应商-仓库中的产品',
        page : './organization/warehouseList'
    }, req, res, next);
};



// 供应商部分-金融机构-产品材料库页跳转  1193
exports.VIEW_SUPPLIER_ORGANIZATION_PRODUCTMATERIAL = function(req, res, next) {
    common.getPageData({
        url : '/api/product/material',
        title : '供应商-编辑请款材料',
        page : './organization/material'
    }, req, res, next);
};
// 供应商部分-金融机构-模板发布页跳转
exports.VIEW_SUPPLIER_ORGANIZATION_PRODUCTCOPY = function(req, res, next) {
    common.getPageData({
        url : '/api/product/toEdit',
        title : '供应商-模板发布',
        page : './organization/copy'
    }, req, res, next);
};
// 供应商部分-金融机构-佣金政策列表页 1475
exports.VIEW_SUPPLIER_ORGANIZATION_POLICIESLIST = function(req, res, next) {
    common.getPageData({
        url : '/api/organization/rebate/list',
        title : '供应商-机构政策返点列表',
        page : './organization/policiesList'
    }, req, res, next);
};
// 供应商部分-金融机构-佣金政策创建编辑页 1476
exports.VIEW_SUPPLIER_ORGANIZATION_POLICIESLIST_EDIT = function(req, res, next) {
    common.getPageData({
        url : '/api/organization/addrebate/data',
        title : '供应商-制订返佣政策',
        page : './organization/policyEdit',
        callback : function (data) {
            var citys = data.city_list;
            if (data.city_list.length > 0) {
                data.city_list = JSON.stringify(data.city_list);
            }
            if (data.rebatePolicy.length > 0) {
                for (var i = 0, len = data.rebatePolicy.length; i < len; i++) {
                    data.rebatePolicy[i].condition_city_lists = JSON.stringify(data.rebatePolicy[i].condition_city_list);
                }
            }
            data.rebatePolicies = JSON.stringify(data.rebatePolicy);
            data.supplierTypes = JSON.stringify(data.supplierType);


            // 计算万元系数
            var ratesArr = data.rates.split(',');     // 所有费率
            var periods = data.rebatePeriods.split(',');
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
            data.ratesList = ratesList;
        }
    }, req, res, next);
};


// 供应商部分-金融机构-历史政策页 1478
exports.VIEW_SUPPLIER_ORGANIZATION_POLICIESLIST_HISTORYLIST = function(req, res, next) {
    common.getPageData({
        url : '/api/organization/rebatepolicy/list ',
        title : '供应商-机构政策返点列表',
        page : './organization/policiesHistory',
        callback : function (data) {
            // 计算万元系数
            var policiesList = data.data;
            for (var i = 0, len = policiesList.length; i < len; i++) {
                // -- 计算每个政策的万元系数
                var rate = Number(policiesList[i].rate);    // 当前政策的费率
                var periods = Number(policiesList[i].rebate_period);    // 当前政策的融资期限
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
                    rule = '超过' + policiesList[i].exceed_money + '返超出金额的' + policiesList[i].rebate_money + '%';
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





// 供应商部分-金融机构-发布新产品页跳转  1077  new
exports.VIEW_SUPPLIER_ORGANIZATION_PRODUCTBASICCREATE = function(req, res, next) {
    common.getPageData({
        url : '/api/product/toAdd',
        title : '供应商-发布新产品',
        page : './organization/productBasicCreate',
        callback : function (data) {
            data.city_list = JSON.stringify(data.list_city);
        }
    }, req, res, next);
};
// 供应商部分-金融机构-发布新产品政策页跳转   new
exports.VIEW_SUPPLIER_ORGANIZATION_PRODUCPOLICYCREATE = function(req, res, next) {
    common.getPageData({
        url : '/api/product/to/policy',
        title : '供应商-发布新产品',
        page : './organization/productPolicyCreate'
    }, req, res, next);
};
// 供应商部分-金融机构-产品详情页跳转   new
exports.VIEW_SUPPLIER_ORGANIZATION_PRODUCTDETAIL = function(req, res, next) {
    common.getPageData({
        url : '/api/product/detail',
        title : '供应商-发布新产品',
        page : './organization/productDetailNew',
        callback : function (data) {
            if (data) {
                data.vo.applyto_cityname = data.vo.applyto_cityname.replace(/,/g,'、');
                for (var i = 0, len = data.policy_list.length; i < len; i++) {
                    if (data.policy_list[i].downpayment_type == 1) {
                        data.policy_list[i].downpayment_value = data.policy_list[i].downpayment_value.replace(/,/g,'% / ') + '%';
                    } else if (data.policy_list[i].downpayment_type == 2) {
                        data.policy_list[i].downpayment_value = data.policy_list[i].downpayment_value.replace(/,/g,'元 / ') + '元';
                    }
                    data.policy_list[i].interest_rate = data.policy_list[i].interest_rate.replace(/,/g,'% / ') + '%';
                    data.policy_list[i].term = data.policy_list[i].term.replace(/,/g,' / ');
                    // for (var j = 0, lenj = data.policy_list[i].policy_list.length; j <lenj; j++) {
                    //     if (data.policy_list[i].policy_list[j].material_name = data.policy_list[i].policy_list[j].material_name) {
                    //         data.policy_list[i].policy_list[j].material_name = data.policy_list[i].policy_list[j].material_name.replace(/,/g,'、');
                    //     }
                    // }
                }
            }
        }
    }, req, res, next);
};
// 供应商部分-金融机构-编辑产品基本信息跳转   new
exports.VIEW_SUPPLIER_ORGANIZATION_PRODUCTEDITBASE = function(req, res, next) {
    common.getPageData({
        url : '/api/product/toUpdate/baseinfo',
        title : '供应商-发布新产品',
        page : './organization/productBasicCreate',
        callback : function (data) {
            data.city_list = JSON.stringify(data.city_list);
            data.condition_city_list = JSON.stringify(data.condition_city_list);
            if (data.detail.city_ids.indexOf(',') !== -1) {
                var city_name_arr = data.detail.applyto_cityname.split(',');
                data.detail.city_arr = [];
                for (var i = 0, len = city_name_arr.length; i < len; i++) {
                    data.detail.city_arr.push(city_name_arr[i]);
                }
            } else {
                data.detail.city_arr = [data.detail.applyto_cityname];
            }
        }
    }, req, res, next);
};
// 供应商部分-金融机构-编辑产品政策跳转   new
exports.VIEW_SUPPLIER_ORGANIZATION_PRODUCTEDITPOLICY = function(req, res, next) {
    common.getPageData({
        url : '/api/product/toUpdate/policy',
        title : '供应商-发布新产品',
        page : './organization/productPolicyCreate'
    }, req, res, next);
};
// 供应商部分-金融机构-创建机构跳转  1068   new
exports.VIEW_SUPPLIER_ORGANIZATION_CREATE = function(req, res, next) {
    common.getPageData({
        url : '/api/organization/toAdd',
        title : '供应商-发布新产品',
        page : './organization/organizationCreate'
    }, req, res, next);
};
// 供应商部分-金融机构-机构编辑页跳转  1070   new
exports.VIEW_SUPPLIER_ORGANIZATION_EDIT = function(req, res, next) {
    common.getPageData({
        url : '/api/organization/toEdit',
        title : '供应商-发布新产品',
        page : './organization/organizationCreate'
    }, req, res, next);
};
// 供应商部分-金融机构-机构详情页跳转  1071   new
exports.VIEW_SUPPLIER_ORGANIZATION_DETAIL = function(req, res, next) {
    common.getPageData({
        url : '/api/organization/detail',
        title : '供应商-发布新产品',
        page : './organization/organizationDetail',
        callback : function (data) {
            if (data.file_list) {
                var M_1 = 1024*1024;
                for (var i = 0, len = data.file_list.length; i < len; i++) {
                    if (data.file_list[i].file_size >= M_1) {
                        data.file_list[i].file_size = (data.file_list[i].file_size/M_1).toFixed(2) + 'MB';
                    } else {
                        data.file_list[i].file_size = (data.file_list[i].file_size/1024).toFixed(2) + 'KB';
                    }
                }
            }
        }
    }, req, res, next);
};


// 供应商部分-金融机构-机构进件资料编辑页跳转   new
exports.VIEW_SUPPLIER_ORGANIZATION_EDITMATERIAL_INCOMING = function(req, res, next) {
    common.getPageData({
        url : '/api/organization/orderMaterial/toEdit',
        title : '供应商-机构详情页',
        page : './organization/editMaterial',
        callback : function (data) {
            data.policy_lists = JSON.stringify(data.organizationMaterialList);
        }
    }, req, res, next);
};
// 供应商部分-金融机构-机构请款资料编辑页跳转  NEW
exports.VIEW_SUPPLIER_ORGANIZATION_EDITMATERIAL_REQUEST = function(req, res, next) {
    common.getPageData({
        url : '/api/organization/requestMaterial/toEdit',
        title : '供应商-机构详情页',
        page : './organization/editMaterial',
        callback : function (data) {
            data.policy_lists = JSON.stringify(data.organizationMaterialList);
        }
    }, req, res, next);
};
// 供应商部分-金融机构-机构归档资料编辑页跳转 NEW
exports.VIEW_SUPPLIER_ORGANIZATION_EDITMATERIAL_PLACEFILE = function(req, res, next) {
    common.getPageData({
        url : '/api/organization/pigeonholeMaterial/toEdit',
        title : '供应商-机构详情页',
        page : './organization/editMaterial',
        callback : function (data) {
            data.policy_lists = JSON.stringify(data.organizationMaterialList);
        }
    }, req, res, next);
};
// 供应商部分-金融机构-跳往机构查看政策页   new
exports.VIEW_SUPPLIER_ORGANIZATION_POLICYDETAIL = function(req, res, next) {
    common.getPageData({
        url : '/api/organization/policy/detail',
        title : '供应商-机构详情页',
        page : './organization/organizationPolicyDetail'
    }, req, res, next);
};



// 供应商部分-金融机构-机构签约方式及合同编辑页跳转
exports.VIEW_SUPPLIER_ORGANIZATION_EDITRICHTEXT_CONTRACT = function(req, res, next) {
    common.getPageData({
        url : '/api/organization/to/signcontract',
        title : '供应商-机构详情页',
        page : './organization/editRichText'
    }, req, res, next);
};
// 供应商部分-金融机构-机构面签照编辑页跳转
exports.VIEW_SUPPLIER_ORGANIZATION_EDITRICHTEXT_FACEREG = function(req, res, next) {
    common.getPageData({
        url : '/api/organization/to/facesign',
        title : '供应商-机构详情页',
        page : './organization/editRichText'
    }, req, res, next);
};
// 供应商部分-金融机构-机构GPS安装编辑页跳转
exports.VIEW_SUPPLIER_ORGANIZATION_EDITRICHTEXT_GPS = function(req, res, next) {
    common.getPageData({
        url : '/api/organization/to/gpssign',
        title : '供应商-机构详情页',
        page : './organization/editRichText'
    }, req, res, next);
};
// 供应商部分-金融机构-机构附件资料编辑页跳转
exports.VIEW_SUPPLIER_ORGANIZATION_EDITRICHTEXT_ANNEX = function(req, res, next) {
    common.getPageData({
        url : '/api/organization/to/file',
        title : '供应商-机构详情页',
        page : './organization/editAnnex',
        callback : function (data) {
            data.file_datas = JSON.stringify(data.file_list);
            var M_1 = 1024*1024;
            for (var i = 0, len = data.file_list.length; i < len; i++) {
                if (data.file_list[i].file_size >= M_1) {
                    data.file_list[i].file_size = (data.file_list[i].file_size/M_1).toFixed(2) + 'MB';
                } else {
                    data.file_list[i].file_size = (data.file_list[i].file_size/1024).toFixed(2) + 'KB';
                }
            }
        }
    }, req, res, next);
};
// 供应商部分-金融机构-跳转复制产品
exports.VIEW_SUPPLIER_ORGANIZATION_COPYPRODUCT = function(req, res, next) {
    common.getPageData({
        url : '/api/to/copy/product',
        title : '供应商-机构详情页',
        page : './organization/copyProduct',
        callback : function (data) {
            data.city_list = JSON.stringify(data.list_city);
        }
    }, req, res, next);
};








