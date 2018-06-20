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

// 培训-主导航跳转
exports.VIEW_SCHOOL_SYSTEM = function(req, res, next) {
    try {
        res.redirect(markUri + '/school/course/category/system');
        // if (common.checkPrivilege(1067, req)) {
        // } else if (common.checkPrivilege(1328, req)) {
        //     res.redirect(markUri + '/school/course/lists/system');
        // } else if (common.checkPrivilege(1328, req)) {
        //     res.redirect(markUri + '/school/teacher/system');
        // } else {
        //     throw new Error(ERRORTYPES.CheckPrivilege + ': The code 1067 is not defined.');
        // }
    } catch (e) {
        LOGERROR(e.stack);
        res.redirect(markUri + '/404');
    }
};
// 培训-课程分类-侧导航跳转
exports.VIEW_SCHOOL_COURSE_CATEGORY_SYSTEM = function(req, res, next) {
    try {
        res.redirect(markUri + '/school/course/category/home');
        // if (common.checkPrivilege(1067, req)) {
        // }else {
        //     throw new Error(ERRORTYPES.CheckPrivilege + ': The code 1067 is not defined.');
        // }
    } catch (e) {
        LOGERROR(e.stack);
        res.redirect(markUri + '/404');
    }
};
// 培训-课程分类-侧导航跳转
exports.VIEW_SCHOOL_COURSE_CATEGORY_HOME = function(req, res, next) {
    common.getPageData({
        url : '/api/school/classify/getclassify',
        title : '培训-培训列表页',
        page : './school/courseClassify'
    }, req, res, next);
};


// 培训-课程列表-侧导航跳转
exports.VIEW_SCHOOL_COURSE_LISTS_SYSTEM = function(req, res, next) {
    try {
        res.redirect(markUri + '/school/course/lists/home');
        // if (common.checkPrivilege(1067, req)) {
        // }else {
        //     throw new Error(ERRORTYPES.CheckPrivilege + ': The code 1067 is not defined.');
        // }
    } catch (e) {
        LOGERROR(e.stack);
        res.redirect(markUri + '/404');
    }
};
// 培训-课程列表-课程列表页
exports.VIEW_SCHOOL_COURSE_LISTS_HOME = function(req, res, next) {
    // common.getPageData({
    //     url : '/api/organization/getList',
    //     title : '培训-课程列表页',
    //     page : './school/courseList'
    // }, req, res, next);
    res.render('./school/courseList',{markUri : '/ksd'});
};
// 培训-课程列表-新增课程页
exports.VIEW_SCHOOL_COURSE_LISTS_CREATE = function(req, res, next) {
    // common.getPageData({
    //     url : '/api/organization/getList',
    //     title : '培训-课程列表页',
    //     page : './school/courseList'
    // }, req, res, next);
    res.render('./school/courseCreate',{markUri : '/ksd'});
};
// 培训-课程列表-课程详情页
exports.VIEW_SCHOOL_COURSE_LISTS_DETAIL = function(req, res, next) {
    // common.getPageData({
    //     url : '/api/organization/getList',
    //     title : '培训-课程列表页',
    //     page : './school/courseList'
    // }, req, res, next);
    res.render('./school/courseDetail',{markUri : '/ksd'});
};


// 培训-培训讲师-侧导航跳转
exports.VIEW_SCHOOL_TEACHER_SYSTEM = function(req, res, next) {
    try {
        res.redirect(markUri + '/school/teacher/list');
        // if (common.checkPrivilege(1067, req)) {
        // }else {
        //     throw new Error(ERRORTYPES.CheckPrivilege + ': The code 1067 is not defined.');
        // }
    } catch (e) {
        LOGERROR(e.stack);
        res.redirect(markUri + '/404');
    }
};
// 培训-培训讲师-培训讲师列表页
exports.VIEW_SCHOOL_TEACHER_LIST = function(req, res, next) {
    common.getPageData({
        url : '/api/school/lecturer/getlecturerlist',
        title : '培训-培训列表页',
        page : './school/teacherList'
    }, req, res, next);
};
// 培训-培训讲师-新建讲师页
exports.VIEW_SCHOOL_TEACHER_CREATE = function(req, res, next) {
    common.getPageData({
        url : '/api/school/lecturer/getemplist',
        title : '培训讲师-新建讲师',
        page : './school/teacherCreate',
        callback : function (data) {
            data.emp_list = JSON.stringify(data.emp_list);
        }
    }, req, res, next);
};
// 培训-培训讲师-编辑讲师页
exports.VIEW_SCHOOL_TEACHER_EDIT = function(req, res, next) {
    common.getPageData({
        url : '/api/school/lecturer/toedit',
        title : '培训-讲师编辑页',
        page : './school/teacherCreate'
    }, req, res, next);
    //res.render('./school/teacherCreate',{markUri : '/ksd'});
};
// 培训-培训讲师-培训讲师详情页
exports.VIEW_SCHOOL_TEACHER_DETAIL = function(req, res, next) {
    common.getPageData({
        url : '/api/school/lecturer/detail',
        title : '培训-讲师详情页',
        page : './school/teacherDetail'
    }, req, res, next);
};














