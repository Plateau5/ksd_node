var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');  // 文件上传接受参数中间件
var multipartMiddleware = multipart();      // 实例化中间件，使用参考本文件65行
var proxy = require('express-http-proxy');
// Require the controllers.
var homeCtrl = require('../controller/viewsController/homeController');
var customerCtrl = require('../controller/viewsController/customerController');
var organizationCtrl = require('../controller/viewsController/organizationController');
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
// 客户管理-订单分配页面跳转 1022
router.post(markUri + '/customer/loan/allot', customerCtrl.VIEW_CUSTOMER_LOAN_ALLOT);
// 客户管理-资料不合格页面跳转 1037
router.post(markUri + '/customer/loan/unqualified', customerCtrl.VIEW_CUSTOMER_LOAN_UNQUALIFIED);
// 客户管理-通知审核结果-页面 1236
router.post(markUri + '/customer/loan/notifyResult', customerCtrl.VIEW_CUSTOMER_LOAN_NOTIFYRESULT);


// 客户-合同管理-访问路径 1260
router.get(markUri + '/customer/compact/system', customerCtrl.VIEW_CUSTOMER_COMPACT_SYSTEM);
// 客户-合同管理-待出合同 1261
router.all(markUri + '/customer/compact/pendingPass', customerCtrl.VIEW_CUSTOMER_COMPACT_PENDINGPASS);
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
// 客户-归档管理-待处理 1177
router.all(markUri + '/customer/pigeonhole/pending', customerCtrl.VIEW_CUSTOMER_PIGEONHOLE_PENDING);
// 客户-归档管理-已归档 1178
router.all(markUri + '/customer/pigeonhole/archived', customerCtrl.VIEW_CUSTOMER_PIGEONHOLE_ARCHIVED);
// 客户管理-详情页-归档管理 1179
router.post(markUri + '/customer/pigeonhole/detail', customerCtrl.VIEW_CUSTOMER_PIGEONHOLE_DETAIL);
// 客户-归档管理-已归档-通知所需材料页面 1117
router.post(markUri + '/customer/pigeonhole/notifyMaterial', customerCtrl.VIEW_CUSTOMER_PIGEONHOLE_NOTIFYMATERIAL);


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














// 机构管理访问路径
router.get(markUri + '/organization', organizationCtrl.VIEW_ORGANIZATION_LIST);
// 机构管理首页访问路径
router.get(markUri + '/organization/list', organizationCtrl.VIEW_ORGANIZATION_LIST);
// 机构管理-创建机构跳转
router.post(markUri + '/organization/toAdd', organizationCtrl.VIEW_ORGANIZATION_TOADD);
// 机构管理-查看详情跳转
router.post(markUri + '/organization/detail', organizationCtrl.VIEW_ORGANIZATION_DETAIL);
// 机构管理-查看详情跳转
router.post(markUri + '/organization/toEdit', organizationCtrl.VIEW_ORGANIZATION_TOEDIT);
// 机构管理-已发布产品列表跳转
router.post(markUri + '/organization/product/publishList', organizationCtrl.VIEW_ORGANIZATION_PRODUCT_PUBLISHLIST);
// 机构管理-产品新增跳转
router.post(markUri + '/organization/product/toAdd', organizationCtrl.VIEW_ORGANIZATION_PRODUCT_TOADD);
// 机构管理-仓库中产品列表跳转
router.post(markUri + '/organization/product/warehouseList', organizationCtrl.VIEW_ORGANIZATION_PRODUCT_WAREHOUSELIST);
// 机构管理-产品编辑页跳转
router.post(markUri + '/organization/product/toEdit', organizationCtrl.VIEW_ORGANIZATION_PRODUCT_TOEDIT);
// 机构管理-查看产品详情页跳转
router.post(markUri + '/organization/product/detail', organizationCtrl.VIEW_ORGANIZATION_PRODUCT_DETAIL);
// 机构管理-产品请款材料编辑跳转
router.post(markUri + '/organization/product/material', organizationCtrl.VIEW_ORGANIZATION_PRODUCT_MATERIAL);


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

// 问题管理-客户问题列表 1092
router.all(markUri + '/question/customer/list', questionCtrl.VIEW_QUESTION_CUSTOMER_LIST);
// 问题管理-客户问题历史记录 1101
router.post(markUri + '/question/customer/historyRecord', questionCtrl.VIEW_QUESTION_CUSTOMER_HISRECORD);
// 问题管理-商户问题列表 1365
router.all(markUri + '/question/merchants/list', questionCtrl.VIEW_QUESTION_MERCHANTS_LIST);
// 问题管理-商户问题历史记录 1393
router.post(markUri + '/question/merchants/historyRecord', questionCtrl.VIEW_QUESTION_MERCHANTS_HISRECORD);



// GPS仓库列表页跳转 1280
router.all(markUri + '/gps/warehouse/list', warehouseCtrl.VIEW_GPS_LIST);
// GPS仓库-创建GPS仓库跳转 1281
router.all(markUri + '/gps/warehouse/create', warehouseCtrl.VIEW_GPS_CREATE);
// GPS仓库-GPS仓库详情页跳转 1311
router.post(markUri + '/gps/warehouse/detail', warehouseCtrl.VIEW_GPS_DETAIL);
// GPS仓库-编辑GPS仓库页跳转 1282
router.post(markUri + '/gps/warehouse/edit', warehouseCtrl.VIEW_GPS_EDIT);
// GPS仓库-GPS仓库-新增入库页跳转 1283
router.post(markUri + '/gps/warehouse/putin', warehouseCtrl.VIEW_GPS_PUTIN);
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



// If router is undefined redirect to 404 page.
router.all(markUri + '/404', function(req, res, next) {
    res.render('./errorpage/404', {title: '404'});
});
router.get('*', function(req, res, next) {
    res.render('./errorpage/404', {title: '404'});
});

module.exports = router;
