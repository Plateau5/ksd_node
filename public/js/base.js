/**
 * Created by Arley on 2016/11/30.
 *
 *  实现对javascript对象扩展，简化javascript代码操作
 *  Web Development Group
 */

var Base = {
    Browser: {
        IE:     !!(window.attachEvent && !window.opera),
        Opera:  !!window.opera,
        WebKit: navigator.userAgent.indexOf('AppleWebKit/') > -1,
        Gecko:  navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') == -1
    },
    ScriptFragment: '<script[^>]*>([\\S\\s]*?)<\/script>',
    JSONFilter: /^\/\*-secure-([\s\S]*)\*\/\s*$/,
    getUrlParam : function(param){
        var reg = new RegExp("(^|&)"+ param +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        var reStr = (r != null?unescape(r[2]):"");
        return reStr;
    },
};

/**
 * 对Object类进行的扩展，target目标对象将拥有source源对象的所有属性和方法
 * @param target    扩展的目标对象
 * @param source    扩展的来源对象
 * @returns {*}     返回扩展后的对象，该对象拥有来源对象的所有属性和方法
 */
Object.extend = function(target, source) {
    for (var property in source) {
        target[property] = source[property];
    }
    return target;
};

Object.extend(Object, {
    /**
     * 传入一个对象, 返回对象的字符串表示
     * @param object
     * @returns {*}
     */
    inspect: function(object) {
        try {
            if (object === undefined) return 'undefined';
            if (object === null) return 'null';
            return object.inspect ? object.inspect() : object.toString();
        } catch (e) {
            if (e instanceof RangeError) return '...';
            throw e;
        }
    },

    /**
     * 传入一个对象, 返回该对象的json格式数据
     * @param object
     * @returns {Array}
     */
    toJSON: function(object) {
        var type = typeof object;
        switch(type) {
            case 'undefined':
            case 'function':
            case 'unknown': return;
            case 'boolean': return object.toString();
        }
        if (object === null) return 'null';
        if (object.toJSON) return object.toJSON();
        if (object.ownerDocument === document) return;
        var results = [];
        for (var property in object) {
            var value = Object.toJSON(object[property]);
            if (value !== undefined)
                results.push(property.toJSON() + ': ' + value);
        }
        return '{' + results.join(', ') + '}';
    },

    /**
     * 传入一个对象, 返回该对象中所有的属性, 构成数组返回
     * @param object
     * @returns {Array}
     */
    keys: function(object) {
        var keys = [];
        for (var property in object)
            keys.push(property);
        return keys;
    },

    /**
     * 获取object数据类型的长度
     * @param obj       object类型数据
     * @returns {int}   返回数据的长度
     */
    len : function (obj) {
        if (!obj){
            return 0;
        }
        if (obj.length) {
            return obj.length;
        }
        var count = 0;
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                count ++;
            }
        }
        return count;
    },

    /**
     * object数据类型的对象是否包含某个属性
     * @param attrName      属性名称
     * @param obj           object类型数据
     * @returns {boolean}   true:包含该属性  false:不包含该属性
     */
    hasAttr : function (attrName, obj) {
        return obj.hasOwnProperty(attrName);
    },

    /**
     * object数据类型删除某个属性
     * @param attrName  属性名称
     * @param obj       object类型数据
     */
    removeAttr : function (attrName, obj) {
        if (obj.hasOwnProperty(attrName)) {
            delete obj[attrName];
        };
    },

    /**
     * 传入一个对象, 返回该对象中所有属性所对应的值, 构成数组返回
     * @param object
     * @returns {Array}
     */
    values: function (object) {
        var values = [];
        for (var property in object)
            values.push(object[property]);
        return values;
    },
    /**
     * 传入一个对象, 克隆一个新对象并返回
     * @param object
     * @returns {*}
     */
    clone: function (object) {
        return Object.extend({}, object);
    },
    /**
     * 传入一个对象, 克隆一个新对象并返回
     * @param object
     * @returns {*}
     */
    isArray: function (arr) {
        return Object.prototype.toString.call(arr) === "[object Array]";
    }
});

Object.extend(Date.prototype, {
    now: function () {
        return (new Date).valueOf();
    }
});
Object.extend(String.prototype, {
    toArray: function () {
        return this.split('');
    },
    isJSON: function () {
        var str = this.replace(/\\./g, '@').replace(/"[^"\\\n\r]*"/g, '');
        return (/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(str);
    },
    include: function (pattern) {
        return this.indexOf(pattern) > -1;
    },
    empty: function () {
        return this == '';
    },
    blank: function () {
        return /^\s*$/.test(this);
    },
    trim: function () {
        return this.replace(/^\s+|\s+$/g,'');
    }
});

Object.extend(Array.prototype, {
    /**
     * 数组转化为object数据类型，数组的值为object的属性，属性值默认都为1
     * @param arr       数组
     * @returns {{}}    返回object类型数据
     */
    toObject : function (arr) {
        var obj = {};
        for (var i = 0, j = arr.length; i < j; i++) {
            obj[arr[i]] = 1;
        }
        return obj;
    }
});
/**
 * 转化对象为查询字符串格式
 */
Object.toQuerystring = function (o) {
    var arr = [];
    for (var key in o) {
        arr.push(key.toString() + '=' + o[key]);
    }
    return arr.join('&');
};
/**
 * 判断一个对象是否为空
 */
Object.isEmpty = function (o) {
    for (var key in o) {
        return false;
    }
    return true;
};

String.prototype.gblen = function() {
    var len = 0;
    for (var i=0; i<this.length; i++) {
        if (this.charCodeAt(i)>127 || this.charCodeAt(i)==94) {
            len += 2;
        } else {
            len ++;
        }
    }
    return len;
};

Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};