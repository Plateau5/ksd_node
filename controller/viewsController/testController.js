/**
 * Created by Arley Joe on 06/08/2018
 * @description This controller is for testing purposes only. Not used on production platforms.
 *              Don't write anything here without testing.
 * @copyright arleyjoe@163.com
 */

var fs = require('fs');
var path=require("path");
var common = require('./../common');
var qs = require('querystring');
var urlParse = require('url');
var LOGERROR = require('./../../util/logger').logError;   // 错误日志打印
var ERRORTYPES = require('./../../util/ErrorTypesConf'); // 自定义错误类型配置

// Used to kindEditor
exports.VIEW_TEST_KINDEDITOR = function(req, res, next) {
    var data = {};
    var localUrl = req.originalUrl;
    data.title = 'kindEditor';
    data.originUrl = localUrl;
    data.markUri = markUri;
    data.apiServerPath = apiServerPath;
    data.domain = domain;
    var body = req.body;
    data.reqParams = body;

    // 创建可读流

    var text = '房间打开了房间砥砺奋进打算理发解放东路及分离打扫房间第三附近的路口附近打历史返点啥房间的酸辣粉就的撒廊坊';

    // 创建一个可以写入的流，写入到文件 output.txt 中
    var writerStream = fs.createWriteStream('E:\\test.txt');

    // 使用 utf8 编码写入数据
    writerStream.write(text,'UTF8');

    // 标记文件末尾
    writerStream.end();

    // 处理流事件 --> data, end, and error
    writerStream.on('finish', function() {
        console.log("写入完成。");
        /*res.write(text);//返回给app
        next();*/
    });

    writerStream.on('error', function(err){
        console.log(err.stack);
    });


    var txt = '';
    // 创建可读流
    var readerStream = fs.createReadStream('E:\\test.txt');

    // 设置编码为 utf8。
    readerStream.setEncoding('UTF8');

    // 处理流事件 --> data, end, and error
    readerStream.on('data', function(chunk) {
        txt += chunk;
    });

    readerStream.on('end',function(){
        console.log(txt);

        // res.end(data);//发送给app
    });

    readerStream.on('error', function(err){
        console.log(err.stack);
    });
    res.render('./test/kindEditor', data);
};


