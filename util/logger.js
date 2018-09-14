/**
 * Created by Arley on 2017/12/07.
 */

var logger = require('./log4Config');

exports.logError = function (msg, otherMsg) {
    var logError = logger('error');
    var errorInfo = msg
                    + "\n"
                    + "uid: " + user.uid
                    + "\n"
                    + "privileges: " + user.privilege
                    + "\n"
                    + "company: " + user.companyId
                    + "\n"
                    + (otherMsg ? otherMsg : '');
    if (apiServerPath.indexOf('kuaishoudan.com') !== -1) {
        logError.error(errorInfo);
    }
    console.error(errorInfo);
};

exports.logInfo = function (msg, otherMsg) {
    var logInfo = logger('info');
    var errorInfo = msg
                    + "\n"
                    + "uid: " + user.uid
                    + "\n"
                    + "privileges: " + user.privilege
                    + "\n"
                    + "company: " + user.companyId
                    + "\n"
                    + (otherMsg ? otherMsg : '');
    if (apiServerPath.indexOf('kuaishoudan.com') !== -1) {
        logInfo.info(errorInfo);
    }
    console.log(errorInfo);
};