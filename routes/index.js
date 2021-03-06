var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');  // 文件上传接受参数中间件
var multipartMiddleware = multipart();      // 实例化中间件，使用参考本文件65行
var proxy = require('express-http-proxy');
// Require the controllers.
var homeCtrl = require('../controller/viewsController/homeController');
var customerCtrl = require('../controller/viewsController/customerController');
var supplierCtrl = require('../controller/viewsController/supplierController');
var workflowCtrl = require('../controller/viewsController/workflowController');
var questionCtrl = require('../controller/viewsController/questionController');
var warehouseCtrl = require('../controller/viewsController/warehouseController');
var contactCtrl = require('../controller/viewsController/contactController');
var statisticsCtrl = require('../controller/viewsController/statisticsController');
var systemManagementCtrl = require('../controller/viewsController/systemManagementController');
var settingsCtrl = require('../controller/viewsController/settingsController');
var privilegeCtrl = require('../controller/viewsController/privilegeController');
var merchantsCtrl = require('../controller/viewsController/merchantsController');
var dockingCtrl = require('../controller/viewsController/dockingController');
var schoolCtrl = require('../controller/viewsController/schoolController');
var carModelCtrl = require('../controller/viewsController/carModelController');
var testCtrl = require('../controller/viewsController/testController');
var workorderCtrl = require('../controller/viewsController/workorderController');

var markUri = '/ksd';

/* GET login page. */
// 根路径
// router.get('/', homeCtrl.LOGIN_PAGE);res.cookie('username', 'koby', {maxAge: 900000 });
router.get(markUri + '/', homeCtrl.LOGIN_PAGE);
// 登出路径
router.get(markUri + '/logout', homeCtrl.LOGIN_PAGE);
// 登录页跳转
router.get(markUri + '/login', homeCtrl.LOGIN_PAGE);
// 登录提交
router.post(markUri + '/login', homeCtrl.LOGIN_CONTROL);


// 首页访问路由
router.get(markUri + '/home', homeCtrl.VIEW_HOME_DATA);

router.post('/api/message/getNotice', homeCtrl.API_MESSAGE_GETNOTICE);

// 客户管理-下载资料-api 1038
router.post('/api/files/download', customerCtrl.API_FILES_DOWNLOAD);
// 客户访问路径
router.get(markUri + '/customer/system', customerCtrl.VIEW_CUSTOMER_SYSTEM);
// 客户订单历史记录
router.post(markUri + '/customer/history', customerCtrl.VIEW_CUSTOMER_HISTORY);
// 客户-贷款管理-访问路径 1016
router.get(markUri + '/customer/loan/system', customerCtrl.VIEW_CUSTOMER_LOAN_SYSTEM);
// 客户-贷款管理-待分配 1017
router.all(markUri + '/customer/loan/pendingAllot', customerCtrl.VIEW_CUSTOMER_LOAN_PENDINGALLOT);
// 客户-贷款管理-已分配 1018
router.all(markUri + '/customer/loan/alreadyAllot', customerCtrl.VIEW_CUSTOMER_LOAN_ALREADYALLOT);
// 客户-贷款管理-已录入 1019
router.all(markUri + '/customer/loan/entered', customerCtrl.VIEW_CUSTOMER_LOAN_ENTERED);
// 客户-贷款管理-已通过 1020
router.all(markUri + '/customer/loan/passed', customerCtrl.VIEW_CUSTOMER_LOAN_PASSED);
// 客户-贷款管理-未通过 1021
router.all(markUri + '/customer/loan/unpass', customerCtrl.VIEW_CUSTOMER_LOAN_UNPASS);
// 客户管理-详情页-贷款管理 1036
router.post(markUri + '/customer/loan/detail', customerCtrl.VIEW_CUSTOMER_LOAN_DETAIL);
// 客户管理-详情页-贷款管理-极致预审信息
router.post(markUri + '/customer/loan/JZPretrial/detail', customerCtrl.VIEW_CUSTOMER_JZPRETRIAL_DETAIL);
// 客户管理-详情页-贷款管理-平安预审信息
router.post(markUri + '/customer/loan/PAPretrial/detail', customerCtrl.VIEW_CUSTOMER_PAPRETRIAL_DETAIL);
// 客户管理-详情页-贷款管理-预审信息-个人信用报告
router.post(markUri + '/customer/loan/JZPretrial/credit', customerCtrl.VIEW_CUSTOMER_JZPRETRIAL_CREDIT);

// 客户管理-详情页-贷款管理-进件资料编辑跳转
router.post(markUri + '/customer/loan/edit/entry', customerCtrl.VIEW_CUSTOMER_DETAIL_EDIT_ENTRY);
// 客户管理-详情页-合同管理-进件资料编辑跳转
router.post(markUri + '/customer/compact/edit/entry', customerCtrl.VIEW_CUSTOMER_DETAIL_EDIT_ENTRY);
// 客户管理-详情页-请款管理-进件资料编辑跳转
router.post(markUri + '/customer/requestpayout/edit/entry', customerCtrl.VIEW_CUSTOMER_DETAIL_EDIT_ENTRY);
// 客户管理-详情页-审批管理-进件资料编辑跳转
router.post(markUri + '/customer/approval/edit/entry', customerCtrl.VIEW_CUSTOMER_DETAIL_EDIT_ENTRY);


// 客户管理-订单分配页面跳转 1022
router.post(markUri + '/customer/loan/allot', customerCtrl.VIEW_CUSTOMER_LOAN_ALLOT);
// 客户管理-资料不合格页面跳转 1037
router.post(markUri + '/customer/loan/unqualified', customerCtrl.VIEW_CUSTOMER_LOAN_UNQUALIFIED);
// 客户管理-通知审核结果-页面 1236
router.post(markUri + '/customer/loan/notifyResult', customerCtrl.VIEW_CUSTOMER_LOAN_NOTIFYRESULT);
// 客户管理-重新通知审核结果-页面 1522
router.post(markUri + '/customer/loan/renewNotifyResult', customerCtrl.VIEW_CUSTOMER_LOAN_RENEWNOTIFYRESULT);


// 客户-合同管理-访问路径 1260
router.get(markUri + '/customer/compact/system', customerCtrl.VIEW_CUSTOMER_COMPACT_SYSTEM);
// 客户-合同管理-待分配  1661
router.all(markUri + '/customer/compact/pendingPass', customerCtrl.VIEW_CUSTOMER_COMPACT_PENDINGPASS);
// 客户-合同管理-已分配 1261
router.all(markUri + '/customer/compact/alreadyPass', customerCtrl.VIEW_CUSTOMER_COMPACT_ALREADYPASS);
// 客户-合同管理-订单分配页面跳转 1662
router.post(markUri + '/customer/compact/allot', customerCtrl.VIEW_CUSTOMER_COMPACT_ALLOT);
// 客户管理-详情页-合同管理 1268
router.post(markUri + '/customer/compact/detail', customerCtrl.VIEW_CUSTOMER_COMPACT_DETAIL);
// 客户-合同管理-同意页面 1264
router.post(markUri + '/customer/compact/agree', customerCtrl.VIEW_CUSTOMER_COMPACT_AGREE);
// 客户-合同管理-不同意页面 1265
router.post(markUri + '/customer/compact/disagree', customerCtrl.VIEW_CUSTOMER_COMPACT_DISAGREE);
// 客户-合同管理-已通过 1262
router.all(markUri + '/customer/compact/pass', customerCtrl.VIEW_CUSTOMER_COMPACT_PASS);
// 客户-合同管理-未通过 1263
router.all(markUri + '/customer/compact/unpass', customerCtrl.VIEW_CUSTOMER_COMPACT_UNPASS);


// 客户-请款管理-访问路径 1225
router.get(markUri + '/customer/requestpayout/system', customerCtrl.VIEW_CUSTOMER_RESQUESTPAYOUT_SYSTEM);
// 客户-请款管理-待请款 1202
router.all(markUri + '/customer/requestpayout/pendingDispose', customerCtrl.VIEW_CUSTOMER_RESQUESTPAYOUT_PENDINGDISPOSE);
// 客户-请款管理-待通过 1203
router.all(markUri + '/customer/requestpayout/pendingPass', customerCtrl.VIEW_CUSTOMER_RESQUESTPAYOUT_PENDINGPASS);
// 客户-请款管理-待审批 1110
router.all(markUri + '/customer/requestpayout/pendingAudit', customerCtrl.VIEW_CUSTOMER_RESQUESTPAYOUT_PENDINGAUDIT);
// 客户-请款管理-已通过 1204
router.all(markUri + '/customer/requestpayout/pass', customerCtrl.VIEW_CUSTOMER_RESQUESTPAYOUT_PASS);
// 客户-请款管理-未通过 1205
router.all(markUri + '/customer/requestpayout/unpass', customerCtrl.VIEW_CUSTOMER_RESQUESTPAYOUT_UNPASS);
// 客户管理-详情页-请款管理 1112
router.post(markUri + '/customer/requestpayout/detail', customerCtrl.VIEW_CUSTOMER_REQUESTPAYOUT_DETAIL);
// 客户-请款管理-待请款-确认提交页面 1220
router.post(markUri + '/customer/requestpayout/affirmSubmit', customerCtrl.VIEW_CUSTOMER_RESQUESTPAYOUT_AFFIRMSUBMIT);
// 客户-请款管理-待请款-不同意页面 1116
router.post(markUri + '/customer/requestpayout/disagree', customerCtrl.VIEW_CUSTOMER_RESQUESTPAYOUT_DISAGREE);
// 客户-请款管理-待审核-同意页面 1115
router.post(markUri + '/customer/requestpayout/agree', customerCtrl.VIEW_CUSTOMER_RESQUESTPAYOUT_AGREE);
// 客户-请款管理-待审核-转交他人页面 1184
router.post(markUri + '/customer/requestpayout/transfer', customerCtrl.VIEW_CUSTOMER_RESQUESTPAYOUT_TRANSFER);


/*// 客户-审批管理-访问路径 1226
router.get('/ksd/customer/approval/system', customerCtrl.VIEW_CUSTOMER_APPROVAL_SYSTEM);*/
// 客户-审批管理-访问路径 1226
router.get(markUri + '/customer/approval/system', customerCtrl.VIEW_CUSTOMER_APPROVAL_SYSTEM);
// 客户-审批管理-待审批 1162
router.all(markUri + '/customer/approval/pendingAudit', customerCtrl.VIEW_CUSTOMER_APPROVAL_PENDINGAUDIT);
// 客户-审批管理-已通过 1206
router.all(markUri + '/customer/approval/pass', customerCtrl.VIEW_CUSTOMER_APPROVAL_PASS);
// 客户-审批管理-未通过 1207
router.all(markUri + '/customer/approval/unpass', customerCtrl.VIEW_CUSTOMER_APPROVAL_UNPASS);
// 客户-审批管理-已回款 1164
router.all(markUri + '/customer/approval/return', customerCtrl.VIEW_CUSTOMER_APPROVAL_RETURN);
// 客户管理-详情页-审批管理 1166
router.post(markUri + '/customer/approval/detail', customerCtrl.VIEW_CUSTOMER_APPROVAL_DETAIL);
// 客户-审批管理-待审核-同意页面 1168
router.post(markUri + '/customer/approval/agree', customerCtrl.VIEW_CUSTOMER_APPROVAL_AGREE);
// 客户-审批管理-待审核-不同意页面 1168
router.post(markUri + '/customer/approval/disagree', customerCtrl.VIEW_CUSTOMER_APPROVAL_DISAGREE);
// 客户-审批管理-待审核-转交他人页面 1185
router.post(markUri + '/customer/approval/transfer', customerCtrl.VIEW_CUSTOMER_APPROVAL_TRANSFER);
// 客户-审批管理-待审核-确认提交 1213
router.post(markUri + '/customer/approval/submit', customerCtrl.VIEW_CUSTOMER_APPROVAL_SUBMIT);


// 客户-款项管理-访问路径 1227
router.get(markUri + '/customer/financial/system', customerCtrl.VIEW_CUSTOMER_FINANCIAL_SYSTEM);
// 客户-款项管理-待回款 1208
router.all(markUri + '/customer/financial/pendingReturn', customerCtrl.VIEW_CUSTOMER_FINANCIAL_PENDINGRETURN);
// 客户-款项管理-待审批 1170
router.all(markUri + '/customer/financial/pendingAudit', customerCtrl.VIEW_CUSTOMER_FINANCIAL_PENDINGAUDIT);
// 客户-款项管理-已通过 1209
router.all(markUri + '/customer/financial/pass', customerCtrl.VIEW_CUSTOMER_FINANCIAL_PASS);
// 客户-款项管理-未通过 1210
router.all(markUri + '/customer/financial/unpass', customerCtrl.VIEW_CUSTOMER_FINANCIAL_UNPASS);
// 客户-款项管理-已回款 1172
router.all(markUri + '/customer/financial/return', customerCtrl.VIEW_CUSTOMER_FINANCIAL_RETURN);
// 客户管理-详情页-款项管理 1173
router.post(markUri + '/customer/financial/detail', customerCtrl.VIEW_CUSTOMER_FINANCIAL_DETAIL);
// 客户-款项管理-待回款-已回款页面 1214
router.post(markUri + '/customer/financial/returnResult', customerCtrl.VIEW_CUSTOMER_FINANCIAL_RETURNRESULT);
// 客户-款项管理-待审批-同意页面 1175
router.post(markUri + '/customer/financial/agree', customerCtrl.VIEW_CUSTOMER_FINANCIAL_AGREE);
// 客户-款项管理-待审批-不同意页面 1176
router.post(markUri + '/customer/financial/disagree', customerCtrl.VIEW_CUSTOMER_FINANCIAL_DISAGREE);
// 客户-款项管理-待审批-转交页面 1186
router.post(markUri + '/customer/financial/transfer', customerCtrl.VIEW_CUSTOMER_FINANCIAL_TRANSFER);
// 客户-款项管理-订单打印 1190
router.all(markUri + '/customer/financial/print', customerCtrl.VIEW_CUSTOMER_FINANCIAL_PRINT);



// 客户-归档管理-访问路径 1228
router.get(markUri + '/customer/pigeonhole/system', customerCtrl.VIEW_CUSTOMER_PIGEONHOLE_SYSTEM);
// 客户-归档管理-待归档 1177
router.all(markUri + '/customer/pigeonhole/pending', customerCtrl.VIEW_CUSTOMER_PIGEONHOLE_PENDING);
// 客户-归档管理-已归档 1178
router.all(markUri + '/customer/pigeonhole/archived', customerCtrl.VIEW_CUSTOMER_PIGEONHOLE_ARCHIVED);
// 客户管理-详情页-归档管理 1179
router.post(markUri + '/customer/pigeonhole/detail', customerCtrl.VIEW_CUSTOMER_PIGEONHOLE_DETAIL);
// 客户-归档管理-已归档-通知所需材料页面 1117
router.post(markUri + '/customer/pigeonhole/notifyMaterial', customerCtrl.VIEW_CUSTOMER_PIGEONHOLE_NOTIFYMATERIAL);
// 客户-归档管理--同意页面
router.post(markUri + '/customer/pigeonhole/agree', customerCtrl.VIEW_CUSTOMER_PIGEONHOLE_AGREE);
// 客户-归档管理--不同意页面
router.post(markUri + '/customer/pigeonhole/disagree', customerCtrl.VIEW_CUSTOMER_PIGEONHOLE_DISAGREE);
// 客户-归档管理--强制归档页面 1626
router.post(markUri + '/customer/pigeonhole/force', customerCtrl.VIEW_CUSTOMER_PIGEONHOLE_FORCE);

// 客户-其他管理-访问路径 1330
router.get(markUri + '/customer/otherfund/system', customerCtrl.VIEW_CUSTOMER_OTHERFUND_SYSTEM);
// 客户-其他管理-待审核 1331
router.all(markUri + '/customer/otherfund/pendingAudit', customerCtrl.VIEW_CUSTOMER_OTHERFUND_PENDINGAUDIT);
// 客户-其他管理-已通过 1332
router.all(markUri + '/customer/otherfund/pass', customerCtrl.VIEW_CUSTOMER_OTHERFUND_PASS);
// 客户-其他管理-未通过 1333
router.all(markUri + '/customer/otherfund/unpass', customerCtrl.VIEW_CUSTOMER_OTHERFUND_UNPASS);
// 客户管理-详情页-其他管理 1337
router.post(markUri + '/customer/otherfund/detail', customerCtrl.VIEW_CUSTOMER_OTHERFUND_DETAIL);
// 客户-其他管理-待审批-同意页面 1334
router.post(markUri + '/customer/otherfund/agree', customerCtrl.VIEW_CUSTOMER_OTHERFUND_AGREE);
// 客户-其他管理-待审批-不同意页面 1335
router.post(markUri + '/customer/otherfund/disagree', customerCtrl.VIEW_CUSTOMER_OTHERFUND_DISAGREE);
// 客户-其他管理-待审批-转交他人页面 1336
router.post(markUri + '/customer/otherfund/transfer', customerCtrl.VIEW_CUSTOMER_OTHERFUND_TRANSFER);

// 客户-预审管理-访问路径 1575
router.get(markUri + '/customer/JZPretrial/system', customerCtrl.VIEW_CUSTOMER_JZPRETRIAL_SYSTEM);
// 客户-预审管理列表 1575
router.all(markUri + '/customer/JZPretrial/list', customerCtrl.VIEW_CUSTOMER_JZPRETRIAL_LIST);
// 客户-预审管理-极致预审信息详情 1576
router.post(markUri + '/customer/JZPretrial/detail', customerCtrl.VIEW_CUSTOMER_JZPRETRIAL_DETAIL);
// 客户-预审管理-平安预审信息详情 1576
router.post(markUri + '/customer/PAPretrial/detail', customerCtrl.VIEW_CUSTOMER_PAPRETRIAL_DETAIL);
// 客户-预审管理-极致预审信息-个人信用报告 1577
router.post(markUri + '/customer/JZPretrial/credit', customerCtrl.VIEW_CUSTOMER_JZPRETRIAL_CREDIT);
// app-极致预审管理-个人信用报告
router.all(markUri + '/pretrial/credit', customerCtrl.VIEW_PRETRIAL_CREDIT);



// 商户-商户管理-主导航跳转 1366
router.get(markUri + '/merchants/system', merchantsCtrl.VIEW_MERCHANTS_SYSTEM);
// 商户-商户管理-侧导航跳转 1367
router.all(markUri + '/merchants/manage/system', merchantsCtrl.VIEW_MERCHANTS_MANAGE_SYSTEM);
// 商户-商户管理-未备案 1369
router.all(markUri + '/merchants/norecords', merchantsCtrl.VIEW_MERCHANTS_NORECORDS);
// 商户-商户管理-待审核 1370
router.all(markUri + '/merchants/pendingAudit', merchantsCtrl.VIEW_MERCHANTS_PENDINGAUDIT);
// 商户-商户管理-已通过 1371
router.all(markUri + '/merchants/pass', merchantsCtrl.VIEW_MERCHANTS_PASS);
// 商户-商户管理-未通过 1372
router.all(markUri + '/merchants/unpass', merchantsCtrl.VIEW_MERCHANTS_UNPASS);
// 商户-商户管理-详情页 1373
router.post(markUri + '/merchants/detail', merchantsCtrl.VIEW_MERCHANTS_DETAIL);
// 商户-商户管理-待审核-同意页面跳转 1395
router.post(markUri + '/merchants/audit/agree', merchantsCtrl.VIEW_MERCHANTS_AUDIT_AGREE);
// 商户-商户管理-待审核-不同意页面跳转 1396
router.post(markUri + '/merchants/audit/disagree', merchantsCtrl.VIEW_MERCHANTS_AUDIT_DISAGREE);
// 商户-商户管理-待审核-编辑页面 1385
router.post(markUri + '/merchants/edit', merchantsCtrl.VIEW_MERCHANTS_EDIT);
// 商户-商户管理-备案管理 1368
router.all(markUri + '/records/manage', merchantsCtrl.VIEW_RECORDS_MANAGE);
// 商户-商户管理-跳转返佣政策列表页 1480
router.all(markUri + '/merchants/policies/list', merchantsCtrl.VIEW_MERCHANTS_POLICIES_LIST);
// 商户-商户管理-返佣政策编辑页 1481
router.all(markUri + '/merchants/policies/edit', merchantsCtrl.VIEW_MERCHANTS_POLICIES_EDIT);
// 商户-商户管理-返佣政策历史页 1478
router.all(markUri + '/merchants/policies/history/list', merchantsCtrl.VIEW_MERCHANTS_POLICIES_HISTORY_LIST);
//商户-商户管理-跳转配置金融产品列表页
router.post(markUri + '/merchants/config/products/list',merchantsCtrl.VIEW_MERCHANTS_CONFIG_PRODUCTS_LIST);
//商户-商户管理-编辑跳转
router.all(markUri + '/merchants/config/products/edit',merchantsCtrl.VIEW_MERCHANTS_PRODUCTS_EDIT);

// 商户-放款管理-侧导航跳转 1490
router.all(markUri + '/loan/system', merchantsCtrl.VIEW_LOAN_SYSTEM);
// 商户-放款管理-待审批 1487
router.all(markUri + '/loan/pending', merchantsCtrl.VIEW_LOAN_PENDING);
// 商户-放款管理-已审批 1488
router.all(markUri + '/loan/pass', merchantsCtrl.VIEW_LOAN_PASS);
// 商户-放款管理-商户打款结算详情 1497
router.post(markUri + '/loan/pending/list', merchantsCtrl.VIEW_LOAN_PENDING_LIST);
// 商户-放款管理-商户打款结算详情 1498
router.post(markUri + '/loan/pass/list', merchantsCtrl.VIEW_LOAN_PASS_LIST);
// 商户-放款管理-待审核-同意页面 1501
router.post(markUri + '/loan/batch/agree', merchantsCtrl.VIEW_LOAN_BATCH_AGREE);
// 商户-放款管理-待审核-同意页面(批量) 1501
router.post(markUri + '/loan/agree', merchantsCtrl.VIEW_LOAN_AGREE);
// 商户-放款管理-待审核-同意页面(放款) 1519
router.post(markUri + '/loan/toLoanAgree', merchantsCtrl.VIEW_LOAN_TOLOANAGREE);
// 商户-放款管理-查询交易列表 1517
router.post(markUri + '/loan/transRecordsList', merchantsCtrl.VIEW_LOAN_TRANSRECORDSLIST);
// 商户-放款管理-查询交易详情
router.post(markUri + '/loan/transRecordsList/detail', merchantsCtrl.VIEW_LOAN_TRANSRECORDSDETAIL);
// 商户-放款管理-待审核-重新提交(放款)
router.post(markUri + '/loan/againLoanAgree', merchantsCtrl.VIEW_LOAN_AGAINLOANAGREE);

// 商户-放款管理-待请款-不同意页面 1502
router.post(markUri + '/loan/batch/disagree', merchantsCtrl.VIEW_LOAN_BATCH_DISAGREE);
// 商户-放款管理-待请款-不同意页面(批量) 1502
router.post(markUri + '/loan/disagree', merchantsCtrl.VIEW_LOAN_DISAGREE);
// 商户-放款管理-待审核-转交他人页面 1503
router.post(markUri + '/loan/batch/turnover', merchantsCtrl.VIEW_LOAN_BATCH_TURNOVER);
// 商户-放款管理-待审核-转交他人页面(批量) 1503
router.post(markUri + '/loan/turnover', merchantsCtrl.VIEW_LOAN_TURNOVER);


// 商户-放款管理-侧导航跳转 1610
router.all(markUri + '/merchants/level/system', merchantsCtrl.VIEW_MERCHANTS_LEVEL_SYSTEM);
// 商户-等级列表  1610
router.all(markUri + '/merchants/level/list', merchantsCtrl.VIEW_MERCHANTS_LEVELLIST);
// 商户-新建等级
router.post(markUri + '/merchants/level/create', merchantsCtrl.VIEW_MERCHANTS_LEVELCREATE);
// 商户-编辑等级
router.post(markUri + '/merchants/level/edit', merchantsCtrl.VIEW_MERCHANTS_LEVELEDIT);



// 供应商部分-主导航跳转  1067
router.get(markUri + '/supplier/system', supplierCtrl.VIEW_SUPPLIER_SYSTEM);
// 供应商部分-金融机构-侧导航跳转  1067
router.all(markUri + '/supplier/organization/system', supplierCtrl.VIEW_SUPPLIER_ORGANIZATION_SYSTEM);
// 供应商部分-金融机构-机构列表页  1067
router.all(markUri + '/supplier/organization/list', supplierCtrl.VIEW_SUPPLIER_ORGANIZATION_LIST);
// 供应商部分-金融机构-产品列表-已发布页  1075
router.post(markUri + '/supplier/organization/publishedProducts', supplierCtrl.VIEW_SUPPLIER_ORGANIZATION_PUBLISHEDPRODUCTS_LIST);
// 供应商部分-金融机构-产品列表-未发布页  1076
router.post(markUri + '/supplier/organization/unpublishedProducts', supplierCtrl.VIEW_SUPPLIER_ORGANIZATION_UNPUBLISHEDPRODUCTS_LIST);
// 供应商部分-金融机构-产品材料库页跳转  1193
router.post(markUri + '/supplier/organization/productMaterial', supplierCtrl.VIEW_SUPPLIER_ORGANIZATION_PRODUCTMATERIAL);
// 供应商部分-金融机构-模板发布页跳转
router.post(markUri + '/supplier/organization/productCopy', supplierCtrl.VIEW_SUPPLIER_ORGANIZATION_PRODUCTCOPY);
// 供应商部分-金融机构-佣金政策列表页 1475
router.post(markUri + '/supplier/organization/policies', supplierCtrl.VIEW_SUPPLIER_ORGANIZATION_POLICIESLIST);
// 供应商部分-金融机构-佣金政策创建编辑页 1476
router.post(markUri + '/supplier/organization/policies/edit', supplierCtrl.VIEW_SUPPLIER_ORGANIZATION_POLICIESLIST_EDIT);
// 供应商部分-金融机构-佣金政策历史记录页 1478
router.post(markUri + '/supplier/organization/policies/history', supplierCtrl.VIEW_SUPPLIER_ORGANIZATION_POLICIESLIST_HISTORYLIST);


// 供应商部分-金融机构-发布新产品基本信息页跳转  1077  new
router.post(markUri + '/supplier/organization/productBasicCreate', supplierCtrl.VIEW_SUPPLIER_ORGANIZATION_PRODUCTBASICCREATE);
// 供应商部分-金融机构-发布新产品政策页跳转   new
router.post(markUri + '/supplier/organization/productPolicyCreate', supplierCtrl.VIEW_SUPPLIER_ORGANIZATION_PRODUCPOLICYCREATE);
// 供应商部分-金融机构-产品详情页跳转 1079  new
router.post(markUri + '/supplier/organization/productDetail', supplierCtrl.VIEW_SUPPLIER_ORGANIZATION_PRODUCTDETAIL);
// 供应商部分-金融机构-编辑产品基本信息跳转  1078  new
router.post(markUri + '/supplier/organization/productEditBase', supplierCtrl.VIEW_SUPPLIER_ORGANIZATION_PRODUCTEDITBASE);
// 供应商部分-金融机构-编辑产品政策跳转   new
router.post(markUri + '/supplier/organization/productEditPolicy', supplierCtrl.VIEW_SUPPLIER_ORGANIZATION_PRODUCTEDITPOLICY);
// 供应商部分-金融机构-创建机构跳转  1068   new
router.post(markUri + '/supplier/organization/create', supplierCtrl.VIEW_SUPPLIER_ORGANIZATION_CREATE);
// 供应商部分-金融机构-机构编辑页跳转  1070   new
router.post(markUri + '/supplier/organization/edit', supplierCtrl.VIEW_SUPPLIER_ORGANIZATION_EDIT);
// 供应商部分-金融机构-机构详情页跳转  1071   new
router.post(markUri + '/supplier/organization/detail', supplierCtrl.VIEW_SUPPLIER_ORGANIZATION_DETAIL);
// 供应商部分-金融机构-机构进件资料编辑页跳转   new
router.post(markUri + '/supplier/organization/editMaterial/incoming', supplierCtrl.VIEW_SUPPLIER_ORGANIZATION_EDITMATERIAL_INCOMING);
// 供应商部分-金融机构-机构请款资料编辑页跳转   new
router.post(markUri + '/supplier/organization/editMaterial/request', supplierCtrl.VIEW_SUPPLIER_ORGANIZATION_EDITMATERIAL_REQUEST);
// 供应商部分-金融机构-机构归档资料编辑页跳转   new
router.post(markUri + '/supplier/organization/editMaterial/placefile', supplierCtrl.VIEW_SUPPLIER_ORGANIZATION_EDITMATERIAL_PLACEFILE);
// 供应商部分-金融机构-跳往机构查看政策页   new
router.post(markUri + '/supplier/organization/policyDetail', supplierCtrl.VIEW_SUPPLIER_ORGANIZATION_POLICYDETAIL);
// 供应商部分-金融机构-机构签约方式及合同编辑页跳转
router.post(markUri + '/supplier/organization/editRichText/contract', supplierCtrl.VIEW_SUPPLIER_ORGANIZATION_EDITRICHTEXT_CONTRACT);
// 供应商部分-金融机构-机构面签照编辑页跳转
router.post(markUri + '/supplier/organization/editRichText/facereg', supplierCtrl.VIEW_SUPPLIER_ORGANIZATION_EDITRICHTEXT_FACEREG);
// 供应商部分-金融机构-机构GPS安装编辑页跳转
router.post(markUri + '/supplier/organization/editRichText/gps', supplierCtrl.VIEW_SUPPLIER_ORGANIZATION_EDITRICHTEXT_GPS);
// 供应商部分-金融机构-机构附件资料编辑页跳转
router.post(markUri + '/supplier/organization/editAnnex', supplierCtrl.VIEW_SUPPLIER_ORGANIZATION_EDITRICHTEXT_ANNEX);
// 供应商部分-金融机构-跳转复制产品
router.post(markUri + '/supplier/organization/copyProduct', supplierCtrl.VIEW_SUPPLIER_ORGANIZATION_COPYPRODUCT);




// 业务管理-主导航节点跳转
router.get(markUri + '/business/system', workflowCtrl.VIEW_BUSINESS_SYSTEM);
// 业务管理-城市管理 1357
router.all(markUri + '/business/city/manage', workflowCtrl.VIEW_BUSINESS_CITY_MANAGE);
// 流程管理-审批流列表页跳转 1130
// router.get(markUri + '/workflow/system', workflowCtrl.VIEW_WORKFLOW_SYSTEM);
// 流程管理-审批流列表页跳转 1130
router.all(markUri + '/workflow/list', workflowCtrl.VIEW_WORKFLOW_LIST);
// 流程管理-创建审批流页跳转 1131
router.all(markUri + '/workflow/toCreate', workflowCtrl.VIEW_WORKFLOW_CREATE);
// 流程管理-查看审批流详情页跳转 1133
router.post(markUri + '/workflow/toDetail', workflowCtrl.VIEW_WORKFLOW_DETAIL);
// 流程管理-编辑审批流页跳转 1132
router.post(markUri + '/workflow/toEdit', workflowCtrl.VIEW_WORKFLOW_EDIT);

//业务-车型库侧导航跳转
router.all(markUri + '/car/system', carModelCtrl.VIEW_CAR_SYSTEM);
//业务-车型库-品牌列表页跳转 1554
router.all(markUri + '/car/brand', carModelCtrl.VIEW_CAR_BRAND);
//业务-车型库车系列表页跳转 1558
router.all(markUri + '/car/series', carModelCtrl.VIEW_CAR_SERIES);
//业务-车型库车型列表页跳转 1563
router.all(markUri + '/car/model', carModelCtrl.VIEW_CAR_MODEL);
//业务-车型库品牌新增 1556
router.post(markUri + '/car/brand/create', carModelCtrl.VIEW_CAR_BRAND_CREATE);
//业务-车型库品牌编辑 1555
router.post(markUri + '/car/brand/edit', carModelCtrl.VIEW_CAR_BRAND_EDIT);
//业务-车型库车系新增 1559
router.post(markUri + '/car/series/create', carModelCtrl.VIEW_CAR_SERIES_CREATE);
//业务-车型库车系编辑 1561
router.post(markUri + '/car/series/edit', carModelCtrl.VIEW_CAR_SERIES_EDIT);
//业务-车型库车型新增跳转 1564
router.post(markUri + '/car/model/create', carModelCtrl.VIEW_CAR_MODEL_CREATE);
//业务-车型库车型编辑 1566
router.post(markUri + '/car/model/edit', carModelCtrl.VIEW_CAR_MODEL_EDIT);


//业务-工单配置侧导航跳转
router.all(markUri + '/workorder/configuration/system', workorderCtrl.VIEW_WORKORDER_CONFIGURATION_SYSTEM);
//业务-工单配置-进件工单 1658
router.all(markUri + '/workorder/configuration/incoming', workorderCtrl.VIEW_WORKORDER_CONFIGURATION_INCOMING);
//业务-工单配置-合同工单 1659
router.all(markUri + '/workorder/configuration/compact', workorderCtrl.VIEW_WORKORDER_CONFIGURATION_COMPACT);
//业务-工单配置-新建跳转 1654
router.post(markUri + '/workorder/configuration/tocreate', workorderCtrl.VIEW_WORKORDER_CONFIGURATION_TOCREATE);
//业务-工单配置-编辑跳转 1656
router.post(markUri + '/workorder/configuration/toedit', workorderCtrl.VIEW_WORKORDER_CONFIGURATION_TOEDIT);


// 问题管理-客户问题列表 1092
router.all(markUri + '/question/customer/list', questionCtrl.VIEW_QUESTION_CUSTOMER_LIST);
// 问题管理-客户问题历史记录 1101
router.post(markUri + '/question/customer/historyRecord', questionCtrl.VIEW_QUESTION_CUSTOMER_HISRECORD);
// 问题管理-商户问题列表 1365
router.all(markUri + '/question/merchants/list', questionCtrl.VIEW_QUESTION_MERCHANTS_LIST);
// 问题管理-商户问题历史记录 1393
router.post(markUri + '/question/merchants/historyRecord', questionCtrl.VIEW_QUESTION_MERCHANTS_HISRECORD);
// 业务-标签管理 1644
router.all(markUri + '/label/list', questionCtrl.VIEW_LABEL_LIST);
// 问题管理-GPS问题列表  1671
router.all(markUri + '/question/gps/list', questionCtrl.VIEW_QUESTION_GPS_LIST);
// 问题管理-GPS问题历史记录
router.post(markUri + '/question/gps/historyRecord', questionCtrl.VIEW_QUESTION_GPS_HISRECORD);



//业务-GPS仓库侧导航跳转
router.get(markUri + '/gps/system', warehouseCtrl.VIEW_GPS_SYSTEM);
//业务-GPS列表页跳转 1579
router.all(markUri + '/gps/list', warehouseCtrl.VIEW_LIST);
//业务-仓库管理列表页跳转 1280
router.all(markUri + '/gps/warehouse/list', warehouseCtrl.VIEW_WAREHOUSE_LIST);
//业务-GPS申请列表页跳转 1580
router.all(markUri + '/gps/apply/list', warehouseCtrl.VIEW_APPLY_LIST);
//业务-GPS编辑页跳转 1581
router.post(markUri + '/gps/edit', warehouseCtrl.VIEW_EDIT);
//业务-GPS处理结果跳转 1584
router.post(markUri + '/gps/apply/result', warehouseCtrl.VIEW_GPS_APPLY_RESULT);
//业务-GPS列表解绑跳转
router.post(markUri + '/gps/list/unbind', warehouseCtrl.VIEW_GPS_LIST_UNBIND);

/*// GPS仓库列表页跳转 1280
router.all(markUri + '/gps/warehouse/list', warehouseCtrl.VIEW_GPS_LIST);*/
// GPS仓库-创建GPS仓库跳转 1281
router.all(markUri + '/gps/warehouse/create', warehouseCtrl.VIEW_GPS_CREATE);
// GPS仓库-GPS仓库详情页跳转 1311
router.post(markUri + '/gps/warehouse/detail', warehouseCtrl.VIEW_GPS_DETAIL);
// GPS仓库-编辑GPS仓库页跳转 1282
router.post(markUri + '/gps/warehouse/edit', warehouseCtrl.VIEW_GPS_EDIT);
// GPS仓库-GPS仓库-新增入库页跳转 1283
router.post(markUri + '/gps/warehouse/putin', warehouseCtrl.VIEW_GPS_PUTIN);
// GPS仓库-GPS仓库-调拨跳转
router.post(markUri + '/gps/warehouse/transfer', warehouseCtrl.VIEW_GPS_TRANSFER);
// GPS仓库-GPS仓库-申请单详情页页跳转 1289
router.post(markUri + '/gps/apply/detail', warehouseCtrl.VIEW_GPS_APPLY_DETAIL);
// GPS仓库-GPS仓库-申请单确认发送点击跳转 1293
router.post(markUri + '/gps/apply/confirmSend', warehouseCtrl.VIEW_GPS_APPLY_CONFIRM);




// 行政仓库列表页跳转 1298
router.all(markUri + '/administrative/warehouse/list', warehouseCtrl.VIEW_ADMINISTRATIVE_LIST);
// 行政仓库-创建行政仓库跳转 1299
router.all(markUri + '/administrative/warehouse/create', warehouseCtrl.VIEW_ADMINISTRATIVE_CREATE);
// 行政仓库-编辑仓库跳转 1300
router.post(markUri + '/administrative/warehouse/edit', warehouseCtrl.VIEW_ADMINISTRATIVE_EDIT);
// 行政仓库-库存列表页跳转 1301
router.post(markUri + '/administrative/equipment/list', warehouseCtrl.VIEW_ADMINISTRATIVE_EQUIPMENT_LIST);
// 行政仓库-新增入库页跳转 1302
router.post(markUri + '/administrative/equipment/create', warehouseCtrl.VIEW_ADMINISTRATIVE_EQUIPMENT_CREATE);
// 行政仓库-库存编辑页跳转 1303
router.post(markUri + '/administrative/equipment/edit', warehouseCtrl.VIEW_ADMINISTRATIVE_EQUIPMENT_EDIT);


// 人员信息主导航跳转
router.get(markUri + '/employee/system', contactCtrl.VIEW_EMPLOYEE_SYSTEM);
// 通讯录列表页跳转
router.get(markUri + '/employee/list', contactCtrl.VIEW_EMPLOYEE_LIST);
// 邀请同事页跳转
router.get(markUri + '/employee/invite', contactCtrl.VIEW_EMPLOYEE_INVITE);
// 员工个人详情页跳转
router.post(markUri + '/employee/detail', contactCtrl.VIEW_EMPLOYEE_DETAIL);
// 部门页跳转
router.get(markUri + '/department', contactCtrl.VIEW_DEPARTMENT);

// 数据统计主导航跳转 1327
router.get(markUri + '/statistics/system', statisticsCtrl.VIEW_STATISTICS_SYSTEM);
// 数据统计-业务统计跳转
router.get(markUri + '/statistics/business/list', statisticsCtrl.VIEW_STATISTICS_BUSINESS_LIST);
// 数据统计-业务量统计-业务量统计视图数据获取
router.post(markUri + '/api/statistics/business', statisticsCtrl.API_STATISTICS_BUSINESS_DATA);
// 数据统计-业务量统计-城市统计视图数据获取
router.post(markUri + '/api/statistics/city', statisticsCtrl.API_STATISTICS_CITY_DATA);
// 数据统计-业务量统计-产品统计视图数据获取
router.post(markUri + '/api/statistics/product', statisticsCtrl.API_STATISTICS_PRODUCT_DATA);
// 数据统计-人效统计导航跳转
router.get(markUri + '/statistics/person/system', statisticsCtrl.VIEW_STATISTICS_PERSON_SYSTEM);
// 数据统计-人效统计-进件跳转
router.all(markUri + '/statistics/person/order', statisticsCtrl.VIEW_STATISTICS_PERSON_ORDER);
// 数据统计-人效统计-合同跳转
router.all(markUri + '/statistics/person/compact', statisticsCtrl.VIEW_STATISTICS_PERSON_COMPACT);
// 数据统计-人效统计-请款跳转
router.all(markUri + '/statistics/person/request', statisticsCtrl.VIEW_STATISTICS_PERSON_REQUEST);
// 数据统计-人效统计-归档跳转
router.all(markUri + '/statistics/person/pigeonhole', statisticsCtrl.VIEW_STATISTICS_PERSON_PIGEONHOLE);
// 数据统计-人效统计-个人主页跳转
router.post(markUri + '/statistics/personal', statisticsCtrl.VIEW_STATISTICS_PERSONAL);
// 数据统计-人效统计-个人进件统计视图数据获取
router.post('/api/statistics/personal/order', statisticsCtrl.API_STATISTICS_PERSONAL_ORDER_DATA);
// 数据统计-人效统计-个人请款统计视图数据获取
router.post('/api/statistics/personal/request', statisticsCtrl.API_STATISTICS_PERSONAL_REQUEST_DATA);
// 数据统计-人效统计-个人归档统计视图数据获取
router.post('/api/statistics/personal/pigeonhole', statisticsCtrl.API_STATISTICS_PERSONAL_PIGEONHOLE_DATA);
// 数据统计-人效统计-个人业务量统计跳转
router.post(markUri + '/statistics/personal/business', statisticsCtrl.VIEW_STATISTICS_PERSONAL_BUSINESS);
// 数据统计-商户统计-首页跳转
router.all(markUri + '/statistics/merchants/synthesize', statisticsCtrl.VIEW_STATISTICS_MERCHANTS_SYNTHESIZE);
// 数据统计-商户统计-商户分类列表页跳转
router.post(markUri + '/statistics/merchants/typeList', statisticsCtrl.VIEW_STATISTICS_MERCHANTS_TYPELIST);
// 数据统计-商户统计-商户详情页跳转
router.post(markUri + '/statistics/merchants/detail', statisticsCtrl.VIEW_STATISTICS_MERCHANTS_DETAIL);
// 数据统计-运营报表-报表列表页跳转1514
router.all(markUri + '/statistics/operating/system', statisticsCtrl.VIEW_STATISTICS_OPERATING_SYSTEM);
// 数据统计-运营报表-报表列表页跳转1514
router.all(markUri + '/statistics/operating/list', statisticsCtrl.VIEW_STATISTICS_OPERATING_LIST);
// 数据统计-财务凭证-财务凭证列表页跳转1592
router.all(markUri + '/statistics/voucher/system', statisticsCtrl.VIEW_STATISTICS_VOUCHER_SYSTEM);
// 数据统计-财务凭证-财务凭证列表页跳转1592
router.all(markUri + '/statistics/voucher/list', statisticsCtrl.VIEW_STATISTICS_VOUCHER_LIST);



// 培训主导航跳转
router.get(markUri + '/school/system', schoolCtrl.VIEW_SCHOOL_SYSTEM);
// 培训-课程分类-侧导航跳转 1529
router.all(markUri + '/school/course/category/system', schoolCtrl.VIEW_SCHOOL_COURSE_CATEGORY_SYSTEM);
// 培训-课程分类-课程分类页 1529
router.all(markUri + '/school/course/category/home', schoolCtrl.VIEW_SCHOOL_COURSE_CATEGORY_HOME);
// 培训-课程列表-侧导航跳转 1543
router.all(markUri + '/school/course/lists/system', schoolCtrl.VIEW_SCHOOL_COURSE_LISTS_SYSTEM);
// 培训-课程列表-课程列表页 1543
router.all(markUri + '/school/course/lists/home', schoolCtrl.VIEW_SCHOOL_COURSE_LISTS_HOME);
// 培训-课程列表-新增课程页 1545
router.all(markUri + '/school/course/lists/create', schoolCtrl.VIEW_SCHOOL_COURSE_LISTS_CREATE);
// 培训-课程列表-编辑课程页 1546
router.all(markUri + '/school/course/lists/edit', schoolCtrl.VIEW_SCHOOL_COURSE_LISTS_EDIT);
// 培训-课程列表-课程详情页 1548
router.all(markUri + '/school/course/lists/detail', schoolCtrl.VIEW_SCHOOL_COURSE_LISTS_DETAIL);
// 培训-培训讲师-侧导航跳转 1536
router.all(markUri + '/school/teacher/system', schoolCtrl.VIEW_SCHOOL_TEACHER_SYSTEM);
// 培训-培训讲师-培训讲师列表页 1536
router.all(markUri + '/school/teacher/list', schoolCtrl.VIEW_SCHOOL_TEACHER_LIST);
// 培训-培训讲师-新建讲师页 1538
router.all(markUri + '/school/teacher/create', schoolCtrl.VIEW_SCHOOL_TEACHER_CREATE);
// 培训-培训讲师-编辑讲师页 1540
router.all(markUri + '/school/teacher/edit', schoolCtrl.VIEW_SCHOOL_TEACHER_EDIT);
// 培训-培训讲师-培训讲师详情页 1537
router.all(markUri + '/school/teacher/detail', schoolCtrl.VIEW_SCHOOL_TEACHER_DETAIL);




// 系统管理主导航跳转
router.get(markUri + '/systemManagement', systemManagementCtrl.VIEW_SYSTEMMANAGEMENT);
// 系统管理-租户管理-列表页跳转
router.get(markUri + '/company/list', systemManagementCtrl.VIEW_SYSTEM_COMPANY_LIST);
// 系统管理-租户管理-创建租户跳转
router.get(markUri + '/company/create', systemManagementCtrl.VIEW_SYSTEM_COMPANY_CREATE);
// 系统管理-租户管理-编辑租户跳转
router.post(markUri + '/company/edit', systemManagementCtrl.VIEW_SYSTEM_COMPANY_EDIT);
// 系统管理-租户管理-查看租户详情跳转
router.post(markUri + '/company/detail', systemManagementCtrl.VIEW_SYSTEM_COMPANY_DETAIL);
// 系统管理-意见反馈-列表页跳转
router.all(markUri + '/feedback/list', systemManagementCtrl.VIEW_SYSTEM_FEEDBACK_LIST);
// 系统管理-意见反馈-查看详情页跳转
router.all(markUri + '/feedback/detail', systemManagementCtrl.VIEW_SYSTEM_FEEDBACK_DETAIL);


// 权限管理-主导航跳转
router.get(markUri + '/privilege/system', privilegeCtrl.VIEW_PRIVILEGE_system);
// 权限管理-角色列表页跳转
router.get(markUri + '/privilege/roles/list', privilegeCtrl.VIEW_PRIVILEGE_ROLE_LIST);
// 权限管理-角色管理-创建页跳转
router.get(markUri + '/privilege/roles/create', privilegeCtrl.VIEW_PRIVILEGE_ROLE_CREATE);
// 权限管理-角色管理-编辑页跳转
router.post(markUri + '/privilege/roles/edit', privilegeCtrl.VIEW_PRIVILEGE_ROLE_EDIT);
// 权限管理-人员管理-列表页跳转
router.get(markUri + '/privilege/user/list', privilegeCtrl.VIEW_PRIVILEGE_USER_LIST);
// 权限管理-人员管理-赋予角色跳转
router.post(markUri + '/privilege/user/toAssignRoles', privilegeCtrl.VIEW_PRIVILEGE_USER_ASSIGN_ROLES);



// 个人中心-导航跳转
router.get(markUri + '/userCenter/information', settingsCtrl.VIEW_userCenter);
// 个人中心-重设密码跳转
router.get(markUri + '/userCenter/resetPassword', settingsCtrl.VIEW_userCenter_resetPassword);

/**
 * 平安对接部分路由
 * Created by Arley Joe 2017-12-28 16:27:11
 */
// 平安对接-跳转录入首页 1429
router.all(markUri + '/docking/pingan/home', dockingCtrl.VIEW_DOCKING_PINGAN_HOME);
// 平安对接-车辆信息页
router.post(markUri + '/docking/pingan/car', dockingCtrl.VIEW_DOCKING_PINGAN_CAR);
// 平安对接-承租人信息页
router.post(markUri + '/docking/pingan/renter', dockingCtrl.VIEW_DOCKING_PINGAN_LENDER);
// 平安对接-担保人信息页
router.post(markUri + '/docking/pingan/guarantor', dockingCtrl.VIEW_DOCKING_PINGAN_GUARGANTOR);
// 平安对接-文件信息页
router.post(markUri + '/docking/pingan/files', dockingCtrl.VIEW_DOCKING_PINGAN_FILES);
// 平安对接-征信查询信息页
router.post(markUri + '/docking/pingan/credit', dockingCtrl.VIEW_DOCKING_PINGAN_CREDIT);

// 平安对接-查看详情-跳转录入首页
router.post(markUri + '/docking/pingan/detailHome', dockingCtrl.VIEW_DOCKING_PINGAN_DETAILHOME);
// 平安对接-查看详情-车辆信息页
router.post(markUri + '/docking/pingan/detailCar', dockingCtrl.VIEW_DOCKING_PINGAN_DETAILCAR);
// 平安对接-查看详情-承租人信息页
router.post(markUri + '/docking/pingan/detailRenter', dockingCtrl.VIEW_DOCKING_PINGAN_DETAILLENDER);
// 平安对接-查看详情-担保人信息页
router.post(markUri + '/docking/pingan/detailGuarantor', dockingCtrl.VIEW_DOCKING_PINGAN_DETAILGUARGANTOR);
// 平安对接-查看详情-文件信息页
router.post(markUri + '/docking/pingan/detailFiles', dockingCtrl.VIEW_DOCKING_PINGAN_DETAILFILES);
// 平安对接-查看详情-征信查询信息页
router.post(markUri + '/docking/pingan/detailCredit', dockingCtrl.VIEW_DOCKING_PINGAN_DETAILCREDIT);


// If router is undefined redirect to 404 page.
router.all(markUri + '/404', function(req, res, next) {
    res.render('./errorpage/404', {title: '404'});
});




/************** TEST CONTROLLER START **************/
// These routers are for testing purposes only. Not used on production platforms.
router.get(markUri + '/test/kindEditor', testCtrl.VIEW_TEST_KINDEDITOR);
/************** TEST CONTROLLER END **************/




router.get('*', function(req, res, next) {
    /*res.redirect('./errorpage/404', {title: '404'});*/
    res.render('./errorpage/404');
});
module.exports = router;
