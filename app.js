var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var log4js = require('log4js'); // 日志模块
var logger = require('./util/log4Config');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');
var crypto = require('crypto'); // 加密模块
var COMMONUTIL = require('./util/commonUtil');  // 主加密方法类文件
var LOGERROR = require('./util/logger').logError;
var xtemplate = require('./util/xtemplate');

var app = express();
var index = require('./routes/index');
var common = require('./controller/common');
global.apiServerPath = '';
global.contextPath = '';
global.domain = '';
global.markUri = '/ksd';
global.user = {};

// 获取域名信息（host）
app.use(function (req, res, next) {
    var host = req.hostname;
    // console.log(host);
    apiServerPath = 'http://' + host;
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'xtpl');
app.use(log4js.connectLogger(logger('default'), { level: 'auto', format : ':method :url HTTP/:http-version :status :res[content-length] :referrer :user-agent - :response-time ms' }));
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')));
//app.use(logs('common'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(markUri + '/static', lessMiddleware(path.join(__dirname, 'public')));
app.use(markUri + '/static', express.static(path.join(__dirname, 'public')));
app.use(common.startWith);
app.use(common.getUserInfo);
app.use(common.verifyCode);


// 启动登录拦截功能。
app.use(function (req, res, next) {
    var url = req.originalUrl;//获取浏览器中当前访问的nodejs路由地址；
    //获取客户端存取的cookie,userCookies为cookie的名称；//有时拿不到cookie值，可能是因为拦截器位置放错，获取该cookie的方式是依赖于nodejs自带的cookie模块.
    var logininfo = req.cookies.logininfo;
    var comp_info = req.cookies.comp_info;
    var inner_logininfo = req.cookies.inner_logininfo;
    // console.log((url !== markUri + '/login' && url !== markUri + '/' && url !== markUri + '/logout'));
    // console.log((logininfo === undefined));
    if((url !== markUri + '/login' && url !== markUri + '/' && url !== markUri + '/logout') && (logininfo === undefined || comp_info === undefined || inner_logininfo === undefined)){ //通过判断控制用户登录后不能访问登录页面；
        res.clearCookie();
        res.redirect('/');    // 页面重定向
    } else {
        next();
    }
});

/**
 * Grab the information of the user who logged into this application.
 * uid - User primary key ID.
 * privilege - user's privileges.
 * companyId - user's company id.
 */
app.use(function (req, res, next) {
    var cookies = req.cookies;
    var userInfo = {};
    var JSESSIONID = cookies.JSESSIONID;
    userInfo.JSESSIONID = JSESSIONID;
    userInfo.uid = COMMONUTIL.decrypt(cookies.inner_logininfo);
    userInfo.privilege = COMMONUTIL.decrypt(cookies.logininfo);
    userInfo.companyId = COMMONUTIL.decrypt(cookies.comp_info);
    global.user = userInfo;
    next();
});

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var url = req.originalUrl;      // 获取浏览器中当前访问的nodejs路由地址；
    var err = new Error('Request Url "' + url + '" is not defined.');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  LOGERROR(err);
    // res.render(err);
  res.redirect(markUri + '/404');
});


module.exports = app;
