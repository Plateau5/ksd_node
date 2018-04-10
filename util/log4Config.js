/**
 * Created by Arley Joe on 2017-11-10 10:49:56
 */

var log4js = require('log4js');     // 日志模块
var KSDConf = require('./../usr/local/config/KSDConfig');
// var logPath = '/home/work/apps/node/logs';      // 日志文件存放位置
var logPath = KSDConf.path;      // 日志文件存放位置
// var logPath = 'F:/logs';

// 日志配置项
log4js.configure({
    appenders: {
        console: {
            type: 'console'
        },
        default: {
            type: 'dateFile',
            filename: logPath + '/default',
            pattern: "/KSD_WEB_yyyy-MM-dd.txt",
            alwaysIncludePattern:true,
            maxLogSize: 102400,
            backups: 7
        },
        info: {
            type: 'dateFile',
            filename: logPath + '/info',
            pattern: "/KSD_WEB_yyyy-MM-dd.txt",
            alwaysIncludePattern: true,
            maxLogSize: 102400,
            backups: 7
        },
        error: {
            type: 'dateFile',
            filename: logPath + '/error',
            pattern: "/KSD_WEB_yyyy-MM-dd.txt",
            alwaysIncludePattern:true,
            maxLogSize: 10240,
            backups: 7
        },
        email : {
            type: 'smtp',
            recipients: 'qiaosl@jizhicar.com',
            sendInterval: 0,
            transport: 'SMTP',
            subject : '快收单异常-WEB',
            sender : 'ksd@kuaishoudan.com',
            SMTP: {
                host: 'smtp.kuaishoudan.com',
                secureConnection: true,
                port: 25,
                auth: {
                    user: 'ksd@kuaishoudan.com',
                    pass: 'kuaiSD2017'
                },
                debug: true
            }
            /*sender : 'arleyjoe@163.com',
            SMTP: {
                host: 'smtp.163.com',
                secureConnection: true,
                port: 465,
                auth: {
                    user: 'arleyjoe@163.com',
                    pass: 'ArleyJoe8023'
                },
                debug: true
            }*/
        }
    },
    categories: {
        console : {appenders: ['console'], level:'info'},   // 控制台打印类型
        default: { appenders: ['console'], level: 'info' },    // app.js文件使用
        info: { appenders: ['console', 'info'], level: 'info' },    // 基础信息类型
        error: { appenders: ['error', 'email'], level: 'error' },   // 错误类型
        email : { appenders: [ 'email' ], level: 'error' }      // 邮件类型
    },
    replaceConsole: true
});

var logger = function(name){
    var logger = log4js.getLogger(name);
    // logger1.level = 'INFO';
    return logger;
};

module.exports = logger;