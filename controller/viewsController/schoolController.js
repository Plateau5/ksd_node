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
        if (common.checkPrivilege(1529, req)) {
            res.redirect(markUri + '/school/course/category/system');
        } else if (common.checkPrivilege(1543, req)) {
            res.redirect(markUri + '/school/course/lists/system');
        } else if (common.checkPrivilege(1536, req)) {
            res.redirect(markUri + '/school/teacher/system');
        } else {
            throw new Error(ERRORTYPES.CheckPrivilege + ': The code 1529 | 1543 | 1536 is not defined.');
        }
    } catch (e) {
        LOGERROR(e.stack);
        res.redirect(markUri + '/404');
    }
};
// 培训-课程分类-侧导航跳转 1529
exports.VIEW_SCHOOL_COURSE_CATEGORY_SYSTEM = function(req, res, next) {
    try {
        if (common.checkPrivilege(1529, req)) {
            res.redirect(markUri + '/school/course/category/home');
        }else {
            throw new Error(ERRORTYPES.CheckPrivilege + ': The code 1529 is not defined.');
        }
    } catch (e) {
        LOGERROR(e.stack);
        res.redirect(markUri + '/404');
    }
};
// 培训-课程分类-课程分类页 1529
exports.VIEW_SCHOOL_COURSE_CATEGORY_HOME = function(req, res, next) {
    common.getPageData({
        url : '/api/school/classify/getclassify',
        title : '培训-培训列表页',
        page : './school/courseClassify'
    }, req, res, next);
};


// 培训-课程列表-侧导航跳转 1543
exports.VIEW_SCHOOL_COURSE_LISTS_SYSTEM = function(req, res, next) {
    try {
        if (common.checkPrivilege(1543, req)) {
            res.redirect(markUri + '/school/course/lists/home');
        }else {
            throw new Error(ERRORTYPES.CheckPrivilege + ': The code 1543 is not defined.');
        }
    } catch (e) {
        LOGERROR(e.stack);
        res.redirect(markUri + '/404');
    }
};
// 培训-课程列表-课程列表页 1543
exports.VIEW_SCHOOL_COURSE_LISTS_HOME = function(req, res, next) {
    common.getPageData({
        url : '/api/school/course/getlist',
        title : '培训-课程列表页',
        page : './school/courseList'
    }, req, res, next);
};
// 培训-课程列表-新增课程页 1545
exports.VIEW_SCHOOL_COURSE_LISTS_CREATE = function(req, res, next) {
    common.getPageData({
        url : '/api/school/course/getcondition',
        title : '培训-新增课程页',
        page : './school/courseCreate',
        callback : function (data) {
             data.list = JSON.stringify(data.list);
        }
    }, req, res, next);
};
// 培训-课程列表-编辑课程页 1546
exports.VIEW_SCHOOL_COURSE_LISTS_EDIT = function(req, res, next) {
    common.getPageData({
        url : '/api/school/course/toedit',
        title : '培训-编辑课程页',
        page : './school/courseCreate',
        callback : function (data) {
            if (data) {
                data.list = JSON.stringify(data.Lecturerlist);
                var lecturer_ids = data.toEdit.lecturer_ids;
                var teacher_name = data.toEdit.teacher_name;
                var cur_teachers = [];
                if (lecturer_ids.indexOf(',') != -1) {
                    var cur_ids = lecturer_ids.split(',');
                    var cur_names = teacher_name.split(',');
                    for (var i = 0, len = cur_ids.length;i < len; i++) {
                        cur_teachers.push({
                            id :  cur_ids[i],
                            name : cur_names[i]
                        });
                    }
                } else {
                    cur_teachers.push({
                        id :  lecturer_ids,
                        name : teacher_name
                    });
                }
                data.toEdit.already_teacher = cur_teachers;
            }
        }
    }, req, res, next);
};
// 培训-课程列表-课程详情页 1548
exports.VIEW_SCHOOL_COURSE_LISTS_DETAIL = function(req, res, next) {
    common.getPageData({
        url : '/api/school/course/detail',
        title : '培训-课程详情页',
        page : './school/courseDetail',
        callback : function (data) {
            var introduction = data.courseDetail.introduction;
            data.courseDetail.intro = [];
            data.courseDetail.intro.push(introduction);
        }
    }, req, res, next);
};


// 培训-培训讲师-侧导航跳转 1536
exports.VIEW_SCHOOL_TEACHER_SYSTEM = function(req, res, next) {
    try {
        if (common.checkPrivilege(1536, req)) {
            res.redirect(markUri + '/school/teacher/list');
        }else {
            throw new Error(ERRORTYPES.CheckPrivilege + ': The code 1536 is not defined.');
        }
    } catch (e) {
        LOGERROR(e.stack);
        res.redirect(markUri + '/404');
    }
};
// 培训-培训讲师-培训讲师列表页 1536
exports.VIEW_SCHOOL_TEACHER_LIST = function(req, res, next) {
    common.getPageData({
        url : '/api/school/lecturer/getlecturerlist',
        title : '培训-培训列表页',
        page : './school/teacherList'
    }, req, res, next);
};
// 培训-培训讲师-新建讲师页 1538
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
// 培训-培训讲师-编辑讲师页 1540
exports.VIEW_SCHOOL_TEACHER_EDIT = function(req, res, next) {
    common.getPageData({
        url : '/api/school/lecturer/toedit',
        title : '培训-讲师编辑页',
        page : './school/teacherCreate'
    }, req, res, next);
};
// 培训-培训讲师-培训讲师详情页 1537
exports.VIEW_SCHOOL_TEACHER_DETAIL = function(req, res, next) {
    common.getPageData({
        url : '/api/school/lecturer/detail',
        title : '培训-讲师详情页',
        page : './school/teacherDetail'
    }, req, res, next);
};














