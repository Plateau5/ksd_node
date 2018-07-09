/**
 * Created by Arley on 2017/8/6.
 */
var express = require('express');
var router = require('./../../routes/index');
var common = require('./../common');
var request = require('request');
var COMMONUTIL = require('./../../util/commonUtil');  // 主加密方法类文件
exports.LOGIN_CONTROL =  function(req, res, next) {
    var account = req.body.account;
    var password = req.body.password;
    if (account === '') {
        return res.render('index', {
            code : 900,
            error_msg : '邮箱不能为空',
            account : account,
            password : password
        });
    } else if (password === '') {
        return res.render('index', {
            code: 900,
            error_msg : '密码不能为空',
            account : account,
            password: password
        });
    } else {
        psd = COMMONUTIL.md5(password);
        var option = {
            'account' : account,
            'password' : psd
        };
        var url = apiServerPath + '/login';
        request.post({url: url, form:option}, function(error, response, body) {
            /*res.send(response);
            res.end();*/
            if (!error && response.statusCode === 200) {
                var data = JSON.parse(body);
                var cookie = response.headers['set-cookie'];
                /**
                 * @{desc} 此正则为匹配Cookies过期时间的表达式。
                 * @{reason} login接口为与APP公用，在APP端有Cookie设置了过期时间（Max-Age）为一周后，而WEB需要设置为浏览器关闭时。
                 */
                var reg = /Expires[\s\S]*GMT;/ig;
                for (var i = 0, len = cookie.length; i < len; i++) {
                    cookie[i] = cookie[i].replace(reg, '');
                    /*console.log(cookie[i]);*/
                    res.cookie(cookie[i],{ Expires: ''});
                }
                if (data.error_code === 0) {
                    res.redirect('/home');
                } else if (data.error_code === 900) {
                    res.render('index', {
                        code: 900,
                        error_msg : data.error_msg,
                        account: account,
                        password: password
                    });
                } else {
                    res.redirect(markUri + '/404');
                }
            } else {
                res.redirect(markUri + '/404');
            }
            //res.send(response);
        });
    }
};
exports.LOGIN_PAGE =  function(req, res, next) {
    /*res.render('index', { title: '快收单'});*/
    res.redirect('/customer/system');
};
exports.VIEW_HOME_DATA = function(req, res, next) {
    var url = apiServerPath + '/home';
    common.httpRequest({
        url : apiServerPath + '/home'
    }, function (result) {
        var data = result;
        if (data.error_code === 0) {
            data.title = '首页';
            res.render('./home/home', data);
        } else {
            res.render(data.error_msg);
        }
    }, req, res, next);
};

exports.API_MESSAGE_GETNOTICE = function(req, res, next) {
    var url = apiServerPath + '/api/message/getNotice?query_type=1';
    common.httpRequest({
        url : url
    }, function (result) {
        var data = result;
        if (data.error_code === 0) {
            res.send(data);
        } else {
            res.send(data);
        }
    }, req, res, next);
};
