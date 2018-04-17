/**
 * Created by Arley Joe 2017-12-29 14:52:47
 */

/**
 * Toast轻提示扩展
 * @author Arley Joe 2017-12-29 14:56:57
 * @param str {String} : 提示文本
 * @param callback {Function} : 回调函数
 * @param type {Number} : 提示类型：0-success; 1-error; 2-warning
 */
var $toast = function(str, callback, type){
    var toast = '<div class="toast-container" id="toast">\n' +
        '        <p class="toast-content '+ ((type && type === 1) && 'error')  +'">\n' +
        '            <span class="toast-context">'+ str +'</span>\n' +
        '        </p>\n' +
        '    </div>';
    $('body').append(toast);
    $('#toast').fadeIn(600);
    var timer = setTimeout(function () {
        $('#toast').fadeOut(600,function () {
            callback && callback();
            $(this).remove();
        });
        clearTimeout(timer);
    }, 2000);
};

/**
 * 跳转订单详情页
 * @author Arley Joe 2018-1-3 14:18:44
 */
function goOrderDetail () {
    // var url = $('.go_order_detail').data('detailurl');
    var financeId = $.trim($('#financeId').val());
    $('.go_order_detail').on('click', function () {
        locationTo({
            action : markUri + '/customer/loan/detail',
            param : {
                finance_id : financeId
            }
        });
    });
}

/**
 * 输入框焦点离开非空校验
 * @author Arley Joe 2017-12-29 14:56:57
 * @desc 所有必传项的input必须含有requireTrue类（class）,同时必须含有兄弟元素’tips_info‘
 */
function validateBlurEmpty () {
    $('.docking_container').on('blur', '.required', function () {
        var t = $(this);
        var readonly = t.attr('readonly');
        if (readonly == 'readonly') {
            return false;
        }
        var v = $.trim(t.val());
        if (v == '') {
            var tipText = t.data('tips');
            t.siblings('.tips_info').show().find('.tips_text').text(tipText);
            return false;
        }
    });
    $('.docking_container').on('input', '.required', function () {
        var t = $(this);
        var v = $.trim(t.val());
        if (v != '') {
            t.css({
                'border-color' : '#e4e4e4'
            }).siblings('.tips_info').hide();
            return true;
        } else {
            return false;
        }
    });
}

/**
 * 下拉选择框值发生变化监听
 * @author Arley Joe 2018年1月11日13:25:28
 */
function selectListener () {
    $('.docking_container').on('input', 'select', function () {
        var t = $(this);
        var v = $.trim(t.find('option:selected').val());
        if (v != '') {
            t.css({
                'border-color' : '#e4e4e4'
            });
        }
    });
}



/**
 * 输入框只允许输入数字或者两位小数方法
 * @author Arley Joe 2017年12月30日12:36:49
 * @param ele   {String} 输入框元素（Jquery对象）
 * @param max   {Number} 最大可输入值。
 */
function intOrFloat (ele, max) {
    ele.on("input", function () {
        var reg = /^\d{0,7}(\.\d{0,2})?$/g;
        var _this = $(this);
        // var isVerify = _this.attr('verify');
        // if (isVerify == 1) {
            var val = _this.val();
            if (reg.test(val)) {
                _this.siblings('.tips_info').hide();
                _this.attr('verify', 1);
                return true;
            } else {
                val = Number(val);
                if (!isNaN(val) && val != 0) {
                    val = (/\d+(\.\d{1,2})?/g.exec(val))[0];
                    _this.val(val);
                    _this.siblings('.tips_info').hide();
                    _this.attr('verify', 1);
                    return true;
                } else {
                    _this.val(0);
                    _this.siblings('.tips_info').show().find('.tips_text').text("只允许输入数字,最多两位小数");
                    _this.attr('verify', 0);
                    return false;
                }
            }
            if (val > max) {
                _this.siblings('.tips_info').show().find('.tips_text').text("最大可输入数值为"+ max +".");
                _this.attr('verify', 0);
                return false;
            } else {
                _this.siblings('.tips_info').hide();
                _this.attr('verify', 1);
                return false;
            }
        // }
    });
}

/**
 * 校验车架号
 * @author Arley Joe  2018年4月16日14:49:19
 * @pattern 车架号只能输入英文及汉字
 *
 */
function checkVin () {
    var vinE = $('#carVin');
    var vinPattern = /[a-zA-Z0-9]/;
    if (vinE.length > 0) {
        vinE.on('input', function () {
            var _this = $(this);
            var v = _this.val().trim();
            _this.val(v.toUpperCase());
            if (vinPattern.test(v)) {
                _this.siblings('.tips_info').hide();
                _this.attr('verify', 1);
                return true;
            } else {
                _this.val();
                _this.siblings('.tips_info').show().find('.tips_text').text("只允许输入数字与字母");
                _this.attr('verify', 0);
                return false;
            }
        });
        vinE.on('blur', function () {
            var _this = $(this);
            var val = _this.val().trim();
            var len = val.length;
            if (len && len < 17) {
                _this.siblings('.tips_info').show().find('.tips_text').text("请输入17位数字与字母");
                _this.attr('verify', 0);
                return false;
            } else {
                return false;
            }
        });
    }
}



/**
 * 获取品牌信息
 * @author Arley Joe 2018-1-9 14:17:40
 * @param data {Json} : 请求参数
 * @return {*}
 */
function getBrand(data) {
    var brandList = null;
    redefineAjax({
        url : contextPath + '/api/pingan/getBrand',
        data : data,
        async : false,
        success : function (res) {
            if (res.error_code == 0) {
                brandList = JSON.parse(res.data);
            } else {
                return false;
            }
        },
        error : function () {
            return false;
        }
    });
    return brandList;
}


/**
 * 创建品牌车型选项
 * @author Arley Joe 2018-1-9 14:22:26
 * @param data  {Array} : 源数据
 * @param type  {String} : 渲染类型     1：品牌；2：车系；3：车型
 * @return {string} ： 渲染数据
 */
function createBrandOption (data, type) {
    var eleStr = '<option value="">请选择</option>';
    for (var i = 0, len = data.length; i < len; i++) {
        if (type == 1) {
            eleStr += '<option value="'+ data[i].brandId +'">'+ data[i].brandName +'</option>';
        } else if (type == 2) {
            eleStr += '<option value="'+ data[i].serialId +'">'+ data[i].serialName +'</option>';
        } else if (type == 3) {
            eleStr += '<option data-is_can="'+ data[i].is_can +'" value="'+ data[i].modelId +'" data-price="'+ Math.round(data[i].price * 10000) +'">'+ data[i].modelName +'</option>';
        }

    }
    return eleStr;
}

// 是否有工作
function isHaveWork () {
    var workInput = $('input[name="work"]');    // 是否有工作的input
    var workInfo = $('.work_info');     // 工作信息模块
    workInput.on("change", function () {
        var _this = $(this);
        var v = $.trim(_this.val());
        if (v == 1) {
            workInfo.show();
        } else if (v == 2) {
            workInfo.hide();
        }
    });
}

/**
 * 清除已填写的工作信息
 * @author Arley Joe 2018-1-12 13:25:03
 * @desc : 当是否有工作项选择了否的时间，在提交时间清除已经填写的工作内容信息，并禁用所有的输入项及下拉选择以容差。
 */
function clearWorkInfo () {
    var workInfo = $('.work_info');
    if (workInfo.length > 0 && workInfo.is(':hidden')) {
        var workInput = workInfo.find('input');
        var workSelect = workInfo.find('select');
        workInput.each(function () {
            var _this = $(this);
            _this.val('').attr('verify', 1).attr('disabled', 'disabled');
        });
        workSelect.each(function () {
            var _this = $(this);
            _this.val('').attr('disabled', 'disabled');
        });
    }
}

/**
 * 婚姻状况与配偶信息联动
 * @author Arley Joe 2018-1-5 16:08:36
 * @return {boolean}
 */
function isMarriage () {
    var marriageInfo = $('#renterMarriage');    // 婚姻状况选择器
    var spouseInfo = $('.spouse_info');     // 配偶信息部分
    var parentInfo = $('.parent_info');     // 直系亲属部分
    marriageInfo.on('change', function () {
        var _this = $(this);
        var v = $.trim(_this.find('option:selected').val());
        if (v == 2) {
            spouseInfo.show();
            parentInfo.hide();
            // clearInput(parentInfo, 2);
        } else {
            spouseInfo.hide();
            parentInfo.show();
            // clearInput(spouseInfo, 1)
        }
    });
}

/**
 * 性别自动查询
 * @author Arley Joe 2018-1-9 14:23:36
 * @return {boolean}
 */
function verifyGender () {
    var IDNum = $.trim($('input[name="IDnum"]').val());      // 身份证号
    var gender = $('.option_item.gender');      // 性别选择容器
    var genderH = $('.gender_h');       // 性别隐藏数据容器
    if (IDNum) {
        // 获取身份证第17位或是15位。
        if (IDNum.length == 18) {
            var seventeenthNum = IDNum.slice(16,17).number();
        } else if (IDNum.length == 15) {
            var seventeenthNum = IDNum.slice(13,14).number();
        }
        if (seventeenthNum % 2 === 1) {
            gender.find('input[type="radio"].male').prop('checked', true);
            gender.find('input[type="radio"].female').prop('checked', false);
            genderH.val(1);
        } else {
            gender.find('input[type="radio"].male').prop('checked', false);
            gender.find('input[type="radio"].female').prop('checked', true);
            genderH.val(2);
        }
    }
}
/**
 * 出生日期自动查询
 * @author Arley Joe 2018年1月19日16:20:48
 * @return {boolean}
 */
function setBirthday () {
    var IDNum = $.trim($('input[name="IDnum"]').val());      // 身份证号
    var birthday = $('.birthday');      // 性别选择容器
    if (IDNum) {
        // 获取身份证第17位或是15位。
        if (IDNum.length == 18) {
            var birthdayNum = IDNum.slice(6,14).number();
            birthday.val(birthdayNum);
        } else if (IDNum.length == 15) {
            var birthdayNum = IDNum.slice(6,12).number();
            birthday.val(birthdayNum);
        }

    }
}

// 校验必填项是否填写完整
function verifyEmpty () {
    var isAleary = true;
    var inputs = $('form[role="saveForm"] input.required').not('input[disabled="disabled"]');
    var select = $('form[role="saveForm"] select').not('selected[disabled="disabled"]');
    var parent = $('.parent_info');
    var spouse = $('.spouse_info');
    var workInfo = $('.work_info');
    inputs.each(function () {
        var _this = $(this);
        var _parent = _this.parents('.parent_info');
        var _spouse = _this.parents('.spouse_info');
        var _workInfo = _this.parents('.work_info');
        var v = $.trim(_this.val());
        // 不是配偶/不是直系亲属/不是工作单位
        if ((_parent.length <= 0 && _spouse.length <= 0 && _workInfo.length <= 0)
            || (_spouse.length > 0 && !spouse.is(':hidden'))
            || (_parent.length > 0 && !parent.is(':hidden'))
            || (_workInfo.length > 0 && !workInfo.is(':hidden')) ) {
            if (!v) {
                isAleary = false;
                _this.css({
                    'border-color' : 'rgb(251, 39, 65)'
                });
                // return false;
            } else {
                var roulePass = _this.attr('verify');
                if (roulePass == 0) {
                    isAleary = false;
                    _this.css({
                        'border-color' : 'rgb(251, 39, 65)'
                    });
                }
            }
        }
    });

    select.each(function () {
        var _this = $(this);
        var selected = _this.find('option:selected');
        var v = $.trim(selected.val());
        var _parent = _this.parents('.parent_info');
        var _spouse = _this.parents('.spouse_info');
        var _workInfo = _this.parents('.work_info');
        if ((_parent.length <= 0 && _spouse.length <= 0 && _workInfo.length <= 0)
            || (_spouse.length > 0 && !spouse.is(':hidden'))
            || (_parent.length > 0 && !parent.is(':hidden'))
            || (_workInfo.length > 0 && !workInfo.is(':hidden'))
            ) {
            if (!v & v != '0') {
                isAleary = false;
                _this.css({
                    'border-color' : 'rgb(251, 39, 65)'
                });
                // return false;
            }
        }
    });


    return isAleary;
}


/**
 * 图片上传功能
 * @author Arley Joe 2017-11-2 11:44:28
 */
function uploadImage () {
    fileUpload({
        maxCount : 1,
        filesSize : 10,
        fileFormat : ['png', 'jpg', 'jpeg'],
        needThumbnails : false,
        callback : function (btn) {
            onChoose(btn);
        }
    });
    // 上传逻辑
    var onChoose = function (btn) {
        var type = $.trim(btn.data('type'));
        var data = (btn.parents('.file_upload').find('.file_upload_btn')[0]).files[0];
        var form = new FormData();
        form.append("file", data);
        var url = contextPath + '/api/docking/file/upload';
        $.ajax({
            type : "post",
            url : url,
            data : form,
            async : true,
            timeout : 300000,
            processData: false,
            contentType: false,
            beforeSend : function () {
                //elem.loading.show();
                $('#loading').show();
                btn.removeClass('disabled');
                btn.parents('.img_md_box').find('.file_upload_btn').replaceWith('<input type="file" class="file_upload_btn" name="file"  value="上传图片" style="display: none" />');
            },
            complete : function () {
                // $('#loading').hide();
            },
            success : function (res) {
                $('#loading').hide();
                if (res.error_code == 0) {
                    $alert('图片上传成功');
                    var imgEle = '<a href="javascript:;" class="img_item" data-type="imgBox" data-id="'+ res.file_id +'">' +
                        '             <img data-original="'+ res.url +'" src="'+ res.thumbnail_url +'"/>\n' +
                        '             <div class="img_md_operate_box">\n' +
                        '             <em class="img_md_operate_btn view" data-url="'+ res.url +'" style="margin-right: 0" title="查看"></em>\n'+
                        ((type != '2') ?('<em class="img_md_operate_btn delete" data-id="'+ res.file_id +'" title="删除"></em>') : '') +
                        '             </div>\n' +
                        '             </a>';
                    if (type == '2') {
                        var parents = btn.parents('.img_md_box');
                        var img = parents.find('.img_item');
                        if (img.length <= 0) {
                            btn.before(imgEle);
                        } else {
                            btn.parents('.img_md_box').find('.img_item').replaceWith(imgEle);
                        }
                        $('#image_url').val(res.image_url);
                        if (img.length >= 1) {
                            parents[0].viewer.destroy();
                        }
                        // parents[0].viewer.destroy();
                        viewLargeImage(parents[0]);
                        /*var viewer = new Viewer(parents[0], {
                            url: 'data-original',
                            interval : 2000,
                            loop : true
                        });*/
                    } else {
                        btn.before(imgEle);
                        /* 赋予新图片查看的实例属性 */
                        var parents = btn.parents('.img_md_box');
                        /*var count = parents.find('img').length;
                        var newImgEle = parents.find('img').eq(count - 1)[0];
                        parents[0].viewer.images.push(newImgEle);*/
                        // 销毁父元素
                        var img = parents.find('.img_item');
                        if (img.length > 1) {
                            parents[0].viewer.destroy();
                        }
                        viewLargeImage(parents[0]);
                        /*var viewer = new Viewer(parents[0], {
                            url: 'data-original',
                            interval : 2000,
                            loop : true
                        });*/
                    }
                } else {
                    $alert('图片上传失败，请重试');
                }
            },
            error : function () {
                $('#loading').hide();
                $alert('图片上传失败，请重试');
            }
        });
    }
}



/**
 * 查看图片跳转
 * @author Arley Joe 2017-11-2 11:33:18
 */
function viewImages () {
    var imagesParents = $('.docking_container');
    imagesParents.on('click', '.img_md_operate_box .view', function (e) {
        var e = e || window.event;
        e.stopPropagation();
        e.preventDefault();
        var _this = $(this);
        /*var url  = $.trim(_this.data('url'));
        window.open(url);*/
        var img = _this.parents('.img_md_operate_box').siblings('img');
        img.click();
    })
}
/**
 * 删除图片
 * @author Arley Joe 2017-11-2 11:38:04
 */
function deleteImages () {
    var imagesParents = $('.docking_container');
    imagesParents.on('click', '.img_md_operate_box .delete', function (e) {
        var e = e || window.event;
        e.stopPropagation();
        e.preventDefault();
        var _this = $(this);
        var parent = _this.parents('a.img_item');
        parent.remove();

    })
}


/**
 * 清除配偶或是直系亲属信息
 * @author Arley Joe 2018-1-10 13:53:31、
 *
 * @desc : 配偶信息：仅婚姻状况为‘已婚’状态下的时间填写，‘单身、丧偶、离异’均需填写直系亲属信息
 *         亲属信息：参照配偶信息说明。
 */
function clearSpouseOrParentInfo () {
    var spouseInfo = $('.spouse_info');     // 配偶部分
    var parentInfo = $('.parent_info');     // 直系亲属部分
    if (spouseInfo.length > 0 || parentInfo.length > 0) {
        var elem = null;
        if (spouseInfo.is(':hidden')) {
            elem = spouseInfo;
        } else if (parentInfo.is(':hidden')) {
            elem = parentInfo;
        }/* else {
            throw new Error('Bad change: Marriage status send a error. see the "isMarriage" function at docking-pingan.js.');
        }*/
        var input = elem.find('input');
        var select = elem.find('select');
        input.each(function () {
            $(this).val('').attr('disabled', 'disabled');
        });
        select.each(function () {
            $(this).val('').attr('disabled', 'disabled');
        });
    }

}



// 表单页注册提交并继续事件
function bindSubmitEvent () {
    var btn = $('#saveAndGoNext');
    btn.off('click').on('click', function () {
        var t = $(this);
        var nextStep = $.trim(t.data('next'));
        var url = $.trim(t.data('url'));
        saveAndGoNext(t, nextStep, url);
    });
}

// 提交逻辑
function saveAndGoNext (btn, nextPath, url) {
    var financeId = $.trim($('#financeId').val());
    var queryType = $.trim($('#queryType').val());
    var nextQueryType = $('#nextQueryType').val().trim().number();
    var preCode = $.trim($('#preCode').val());
    var navigation = $('#navigation').val().trim();
    var nodeUrl = $('#nodeUrl').val().trim();
    var userName = $('#userName').val().trim();
    var verifyPass = verifyEmpty();     // 是否填写完整
    if (!ISCARINFO || ISCARINFO === undefined) {
        var verifyAmountPass = true;
    } else {
        var verifyAmountPass = verifyAmount();      // 融资金额是否合法
    }
    if (verifyPass && verifyAmountPass) {
        btn.off('click');
        clearWorkInfo();    // 清除工作信息部分
        clearSpouseOrParentInfo();      // 清除配偶或是直系亲属信息
        var form = $('form[role="saveForm"]')[0];
        var data = new FormData(form);
        $.ajax({
            type: 'POST',
            url : url,
            data : data,
            contentType: false,
            processData: false,
            timeout : 10000,
            beforeSend : function () {
                $('#loading').show();
            },
            complete : function () {

            },
            success : function (res) {
                $('#loading').hide();
                if (res.error_code == 0) {
                    $toast('保存成功', function () {
                        locationTo({
                            action : nextPath,
                            param : {
                                finance_id : financeId,
                                query_type : nextQueryType,
                                preCode : preCode,
                                navigation : navigation,
                                nodeUrl : nodeUrl,
                                userName : userName
                            }
                        })
                    });
                } else {
                    $alert(res.error_msg);
                    bindSubmitEvent();
                }
            },
            error : function () {
                $('#loading').hide();
                $alert('提交保存失败，请稍后重试。');
                bindSubmitEvent();
            }
        });
    } else {
        $alert('该页面还有资料未填写完整或错误，请先更正后再保存');
    }
}

/**
 * 还款计划表计算
 * @author Arley Joe 2018-1-3 18:16:57
 * @desc :   还款计划表公式：
 *           每期租金（计划表中为：租金金额）=〔融资金额×月利率×(1＋月利率)^租赁期限〕÷〔(1＋月利率)^租赁期限-1〕
 *           利息金额 = 融资金额 × 月利率 × 〔(1+月利率)^租赁期限-(1+月利率)^(租金期次-1)〕÷〔(1+月利率)^租赁期限-1〕
 *           本金金额 = 融资金额×月利率×(1+月利率)^(租金期次-1)÷〔(1+月利率)^租赁期限-1〕
 *
 *           其中：328产品月利率=(11.21%÷12)；329产品月利率=(11.42%÷12)
 */

function calcRepaymentPlan (financeAmount, interestRate, rentDue) {
    /*var product = $('#productName');    // 产品元素
    var finance = $('#finance');    // 融资金额
    var rentDueE = $('#rentDue');    // 租赁期限

    var financeAmount = finance.val().number();        // 融资金额
    var interestRate = product.find('option:selected').data('interestRate').number();    // 年利率
    // var financeAmount = 10000;        // 融资金额
    // var interestRate = 0.1142;    // 年利率
    var rentDue = rentDueE.find('option:selected').val().number();    // 租赁期限
    // var rentDue = 12;*/

    interestRate = interestRate / 100;
    var data = {
        interestRateAmount : [],        // 利息金额
        principalAmount : []        // 本金金额
    };
    var monthRent = Number((interestRate / 12));
    data.eachRent = (financeAmount * monthRent * Math.pow((1 + monthRent), rentDue)  / (Math.pow((1 + monthRent), rentDue) - 1)).toFixed(2).number();
    for (var i = 1; i <= rentDue; i++) {
        // 每期利息金额
        var a = (financeAmount * monthRent * (Math.pow((1 + monthRent), rentDue) - Math.pow((1 + monthRent), (i - 1))) / (Math.pow((1 + monthRent), rentDue) - 1)).toFixed(2).number();
        // 本金金额
        var b = (financeAmount * monthRent * Math.pow((1 + monthRent), (i - 1)) / (Math.pow((1 + monthRent), rentDue) - 1)).toFixed(2).number();
        a = formatNum(a);
        b = formatNum(b);
        data.interestRateAmount.push(a);
        data.principalAmount.push(b);
    }
    return data;
}


/**
 * 创建还款计划表
 * @author Arley Joe 2018-1-3 19:45:41
 * @return {Object}
 */
function createRepaymentPlanTable (financeAmount, interestRate, rentDue) {
    var product = $('#productName');    // 产品元素
    var finance = $('#finance');    // 融资金额
    var rentDueE = $('#rentDue');    // 租赁期限
    var eachRentE = $('#eachRent');     // 每期租金
    var rentTime = $('#rentTime').val().trim();     //  还款开始时间

    /*var rentDue = rentDueE.find('option:selected').val().number();    // 租赁期限*/
    // var rentDue = 12;

    var data = calcRepaymentPlan(financeAmount, interestRate, rentDue);
    // 设置每期租金
    eachRentE.val(data.eachRent).siblings('.value_text').find('.value').text(data.eachRent);

    var ele = '';
    var timeArr = rentTime.split('-');
    timeArr[0] = timeArr[0].number();
    timeArr[1] = timeArr[1].number();
    var month = timeArr[1],
        year = timeArr[0];
    for (var i = 1; i <= rentDue; i++) {
        // 循环时间
        month += 1;     // 首个还款日为下个月的15号
        if (month == 12) {
            year += 1;
            month = 1;
        }
        ele += '<tr>\n' +
            '                                <td>'+ year + '-' + ((month < 10) ? ('0' + month) : month) +'-15</td>\n' +
            '                                <td>'+ i +'</td>\n' +
            '                                <td>'+ data.eachRent +'</td>\n' +
            '                                <td>'+ data.interestRateAmount[i-1] +'</td>\n' +
            '                                <td>'+ data.principalAmount[i-1] +'</td>\n' +
            '                            </tr>';

    }
    var table = $('#repaymentPlanTable');
    table.find('tbody').html(ele);
}


/**
 * 注册图片页面提交事件
 * @author Arley Joe 2018-1-5 10:51:23
 */
function bindImageSubmitEvent () {
    var btn = $('#fileConfirm');
    btn.off('click').on('click', function () {
        var t = $(this);
        var nextStep = $.trim(t.data('next'));
        var url = $.trim(t.data('url'));
        fileSaveAndGoNext(t, nextStep, url);
    });
}

/**
 * 校验图片是否上传完（必传）
 * @author Arley Joe 2018-1-5 10:51:23
 */
function verifyImgPass () {
    var isPass = true;
    var elem = $('.require_icon').not('.exp_require');       // 必需标识
    elem.each(function () {
        var _this = $(this);
        var imgs = _this.parents('.file_option_item').find('.img_item');
        if (imgs.length <= 0) {
            isPass = false;
            return false;
        }
    });

    if (groupId) {
        var groupIdArr = groupId.split(',');
        for(var i = 0, len = groupIdArr.length; i < len; i++){
            var groupNameArr = [];
            var groupElems = $('.file_option_item[group_id="'+ groupIdArr[i] +'"]');
            var imgFiles = 0 /*$('.file_option_item[data-group_id="'+ groupIdArr[i] +'"] .img_item')*/;
            groupElems.each(function () {
                var _this = $(this);
                var title = _this.data('name');
                var imgs = _this.find('.img_item').length;
                imgFiles += imgs;
                if (groupNameArr.indexOf(title) === -1) {
                    groupNameArr.push(title);
                }
            });
            if (imgFiles === 0) {
                $alert('【' + groupNameArr.join('、') + '】这'+ groupNameArr.length +'项必须填写一项。');
                isPass = false;
                break;
            }
        }
    }
    return isPass;
}

/**
 * 文件上传页面提交逻辑
 * @author Arley Joe 2018-1-5 10:51:23
 */
function fileSaveAndGoNext (btn, nextPath, url) {
    var queryType = $.trim($('#queryType').val());
    var nextQueryType = $('#nextQueryType').val().trim().number();
    var type = $.trim(btn.data('type')).number();
    var navigation = $('#navigation').val().trim();
    var nodeUrl = $('#nodeUrl').val().trim();
    var userName = $('#userName').val().trim();
    var fileData = getData(type);
    fileData = JSON.stringify(fileData);
    var isValidate = verifyImgPass();
    var financeId = $.trim($('#financeId').val());
    if (isValidate) {
        btn.off('click');
        $.ajax({
            type: 'POST',
            url : url,
            data : {
                finance_id : financeId,
                data : fileData
            },
            timeout : 10000,
            beforeSend : function () {
                $('#loading').show();
            },
            complete : function () {
            },
            success : function (res) {
                $('#loading').hide();
                if (res.error_code == 0) {
                    $toast('保存成功', function () {
                        locationTo({
                            action : nextPath,
                            param : {
                                finance_id : financeId,
                                query_type : nextQueryType,
                                navigation : navigation,
                                nodeUrl : nodeUrl,
                                userName : userName
                            }
                        })
                    });
                } else {
                    $alert(res.error_msg);
                    bindSubmitEvent();
                }
            },
            error : function () {
                $alert('提交保存失败，请稍后重试。');
                bindSubmitEvent();
            }
        });
    } else {
        $alert('该页面还有必传材料未上传，请先上传完再保存');
    }

    function getData (type) {
        var data = [];
        var form = $('form[role="fileSaveForm"]');
        var imgs = form.find('.img_md_box .img_item');      // 文件上传部分的图片集合
        var materials = form.find('.credit_info');      // 征信查询分类
        if (type === 1) {
            imgs.each(function () {
                var o = {};     // 当前图片数据对象
                var _this = $(this);
                var parentBox = _this.parent('.img_md_box');        // 父级容器
                o.file_id = $.trim(_this.data('id'));  // 图片主键
                o.file_type = $.trim(parentBox.data('file_type'));  // 图片类型主键
                o.file_name = $.trim(parentBox.data('file_name'));  // 图片类型名称
                o.material_type = $.trim(parentBox.data('material_type'));  // 图片系列主键
                o.material_name = $.trim(parentBox.data('material_name'));  // 图片系列名称
                data.push(o);
            });
        } else if (type === 2) {
            materials.each(function () {
                var _this = $(this);
                var o = {};
                var creditImg = _this.find('.credit_img .img_item');        // 征信图片
                var groupPhotoImg = _this.find('.group_img .img_item');     // 合照图片
                o.material_type = $.trim(_this.data('material_type'));  // 图片系列主键
                o.authFileUid = $.trim(creditImg.data('id'));  // 征信图片主键
                o.groupPhotoUid = $.trim(groupPhotoImg.data('id'));  // 合照图片主键
                data.push(o);
            });
        }

        return data;
    }
}


/**
 * 获取城市数据
 * @author Arley Joe 2018-1-7 10:34:53
 * @return {*}
 */
function getAddressData () {
    var data = null;
    redefineAjax({
        url : contextPath + '/api/pingan/listprovincecity',
        async : false,
        success : function (res) {
            if (res.error_code == 0) {
                data = res;
            } else {
                // throw new Error(res.error_msg);
            }
        },
        error : function (e) {
            // $toast('页面加载城市数据失败。');
            throw new Error('Get address data error.');
        }
    });
    return data;
}

/**
 * 获取职业数据并创建
 * @author Arley Joe 2018年1月8日10:38:46
 */
function getOccupation (data) {
    var empOccupation = $('select.occupation');
    var eleStr = '<option value="">请选择</option>';
    for (var i = 0, len = data.length; i < len; i++) {
        eleStr += '<option value="'+ data[i].id +'">'+ data[i].value +'</option>'
    }
    empOccupation.each(function () {
        var _this = $(this);
        _this.html(eleStr);
    });
}

function chooseSelectOccoupation () {
    var occupationKey = $('input.occupationKey');     // 职业选中项
    occupationKey.each(function () {
        var _this = $(this);
        var v = _this.val().trim();
        if (v) {
            var sOccupation = _this.siblings('select.occupation');
            sOccupation.val(v);
        }
    });
}

/**
 * 设置职业选中项的中文名称
 * @author Arley Joe 2018-1-18 16:57:21
 */
function setOccupationName () {
    var empOccupation = $('select.occupation');
    empOccupation.on('change', function () {
        var _this = $(this);
        var opt = _this.find('option:selected');
        var name = opt.text().trim();
        var nameInput = _this.siblings('.occupationName');
        nameInput.val(name);
    });
}


/**
 * 获取省份数据并创建
 * @author Arley Joe 2018年1月8日10:38:46
 */
function getProvince (data) {
    var province = $('select.province');
    var optStr = '<option value="">请选择</option>';
    for (var i = 0, len = data.length; i < len; i++) {
        optStr += '<option value="'+ data[i].p_id +'">'+ data[i].p_name +'</option>'
    }
    province.each(function () {
        var _this = $(this);
        _this.html(optStr);
    });
}

/**
 * 根据省份ID查询城市空数据
 * @author Arley Joe 2018-1-8 11:09:07
 * @param pid {Number} : 省份ID
 * @param data  {Json} : 城市数据
 * @return {string} ：城市数据元素
 */
function getCity (pid, data) {
    var cityList = jsonsql.query('select * from json where (p_id==' + pid + ')', data);  // 通过jsonsql查询城市数据
    var optStr = '<option value="">请选择</option>';
    for (var i = 0, len = cityList.length; i < len; i++) {
        optStr += '<option value="'+ cityList[i].c_id +'">'+ cityList[i].c_name +'</option>'
    }
    return optStr;
}


/**
 * 省市数据回显选中逻辑
 * @author Arley Joe 2018-1-12 16:33:32
 * @desc : 根据选中值操作对应的省市选择项进行选中值回显。
 */
function chooseSelectedCity () {
    var selectedProvince = $('.provinceKey');
    selectedProvince.each(function () {
        var _this = $(this);
        var v = _this.val().trim();
        if (v) {
            v = v.number();
            var pSelect = _this.siblings('.province');      // 对应的省份
            pSelect.val(v);
            // 创建城市数据并对选中项进行选中
            var provinceType = pSelect.data('type');
            var dataCity = cityData.data_city;
            var citys = getCity(v, dataCity);
            $('#'+ provinceType + 'City').html(citys);
            var selectedCityValue = _this.siblings('.cityKey').val().trim();     // 对应的城市选中主键
            var cSelect = _this.siblings('.city');      // 对应的城市
            cSelect.val(selectedCityValue);
        }
    });
}

/**
 * 根据省份ID获取对应城市列表
 * @author Arley Joe 2018-1-8 13:32:44
 */
function createCityList () {
    var province = $('select.province');
    var citys = '';
    var provinceType = '';
    province.on('change', function () {
        var _this = $(this);
        var option = _this.find('option:selected');
        var v = $.trim(option.val()).number();
        provinceType = _this.data('type');
        citys = getCity(v, cityData.data_city);
        $('#'+ provinceType + 'City').html(citys);
    });

}

/**
 * 设置省市的选中项中文名
 * @author  Arley Joe 2018-1-18 16:30:24
 */
function setAddressName () {
    var citySelect = $('select.province, select.city');
    citySelect.on('change', function () {
        var _this = $(this);
        var opt = _this.find('option:selected');
        var name = opt.text().trim();
        var type = _this.data('name');      // 是省份还是城市
        var nameInput = _this.siblings('.'+ type + 'Name');
        nameInput.val(name);
    });
}

/**
 * 跳转平安进件首页
 * @author Arley Joe 2018-1-8 13:50:47
 * @param selector {String} : 元素选择器
 * @return {*}
 */

function goDockingHome (selector) {
    var financeId = $.trim($('#financeId').val());
    var userName = $('#userName').val().trim();
    var homeUrl = $(selector).data('href');
    var navigation = $('#navigation').val().trim();
    var nodeUrl = $('#nodeUrl').val().trim();
    var userName = $('#userName').val().trim();
    $(selector).on('click', function () {
        locationTo({
            action : homeUrl,
            param : {
                finance_id : financeId,
                userName : userName,
                navigation : navigation,
                nodeUrl : nodeUrl,
                userName : userName
            }
        })
    });

}


$(function () {
    goOrderDetail();        // 跳转订单详情页
    goDockingHome('.go_docking_home');        // 跳转对接首页
    selectListener();
});