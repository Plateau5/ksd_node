/**
 * Created by Arley Joe 2018-4-3 16:49:30
 */

/**
 * 锁定或解锁输入状态
 * @author Arley 2018年4月5日17:45:36
 * @param policy {Object}
 */
function initDisabledOrReset (policy) {
    var policiesList = policy || $('.form_options').not('.policies_temp');
    policiesList.each(function () {
        var _this = $(this);
        var inputs = _this.find('input');
        var select = _this.find('select');
        inputs.each(function () {
            var _that = $(this);
            // 获取输入框的默认状态：1-默认展示 2-展示解锁 3-默认disabled
            var _status = _that.data('status');
            if (_status === 1 || !_status) {
                _that.attr('disabled', 'disabled').data('status', 2);
            } else if (_status === 2) {
                _that.removeAttr('disabled').data('status', 1);
            }
        });

        select.each(function () {
            var t = $(this);
            if (t.attr('disabled') == 'disabled') {
                t.removeAttrs('disabled');
            } else {
                t.attr('disabled', 'disabled');
            }
        });
    });
}






/**
 * 绑定政策编辑提交
 * @author Arley Joe 2018-4-3 16:52:01
 * @return {}
 */
function bindPolicySubmit () {
    var btn = $('.edit_confirm');
    btn.off('click').on('click', function () {
        var _this = $(this);
        // 获取编辑状态：新建：0  编辑：1
        var editType = _this.parents('.form_options').data('edit_type');
        var parentForm = _this.parents('.policies_item');
        var verify = null;
        if (editType === 0) {
            verify = validatePolicyEmpty(parentForm);
            if (verify) {
                submitEvent(parentForm, btn);
            }
        } else if (editType === 1) {
            // 获取编辑按钮的状态：0-编辑（锁定）  1-提交（更改后）
            var editStatus = _this.data('status');
            if (editStatus === 0) {
                var editing = $('.edit_confirm.editing').not('.new');
                if (editing.length > 0) {
                    $alert('有其他政策正在编辑状态');
                } else {
                    _this.text('保存').addClass('editing').siblings('.edit_cancel').show();
                    parentForm.find('.disabled_mask').hide();
                    _this.data('status', 1);
                }
            } else {
                verify = validatePolicyEmpty(parentForm);
                var unrepeat = checkPoliciesRepeat(parentForm);     // 是否重复
                if (verify && unrepeat) {
                    submitEvent(parentForm, _this);
                }
            }
        }
    });
}

/**
 * 取消政策的编辑
 * @author Arley 2018年4月5日18:06:34
 */
function cancelEdit () {
    var btn = $('.edit_cancel');
    btn.off('click').on('click', function () {
        var _this = $(this);
        var form = _this.parents('.policy_form');
        window.location.reload();
    });
}

/**
 * 政策创建提交事件逻辑
 * @param form : 当前政策的提交form元素
 * @param type {Number} : 当前政策的提交类型  1：新建 2：提交
 * @param btn {Object} : 当前政策的提交按钮（jQuery对象）
 */
function submitEvent (form, btn) {
    var cityBtn = btn.parents('.policy_form').find('.add_city_btn');
    var checkedCity = getCheckedCitys(cityBtn);
    var submitIds = $('.cityIds');      // 提交的城市id隐藏数据
    var submitNames = $('.cityNames');     // 提交的城市名称隐藏数据
    btn.off('click');
    var editType = form.find('input.edit_type').val().trim().number();
    var tipText = '';
    if (editType === 1) {
        tipText = '新建';
    } else if (editType === 2) {
        tipText = '编辑';
    }
    // 处理城市数据
    submitIds.val(checkedCity.cityIds);
    submitNames.val(checkedCity.cityName);

    var data = new FormData(form[0]);
    $.ajax({
        type : 'post',
        url : contextPath + '/api/organization/rebate/save',
        data : data,
        timeout : 5000,
        contentType: false,
        processData: false,
        success : function (res) {
            if (res.error_code == 0) {
                $alert('政策' + tipText + '成功！', function () {
                    window.location.reload();
                });
            } else {
                $alert(res.error_msg);
                bindPolicySubmit();
            }
        },
        error : function () {
            $alert('政策' + tipText + '失败，请重新提交。');
            bindPolicySubmit();
        }
    })
}

/**
 * 返佣政策创建/编辑的提交空值校验
 * @author Arley 2018年4月4日14:21:17
 * @param form {Object} : 当前保存政策的form提交元素（jQuery对象）
 * @return {boolean}
 */
function validatePolicyEmpty (form) {
    // 融资期限模块
    var checkedPeirods = form.find('.financing_period').find('input[type="checkbox"]:checked');
    if (checkedPeirods.length <= 0) {
        $alert('请选择融资期限');
        return false;
    }

    // 费率模块
    var checkedRates = form.find('.policy_rates').find('input[type="checkbox"]:checked');
    if (checkedRates.length <= 0) {
        $alert('请选择费率');
        return false;
    }

    // 返佣方式校验
    var rebateType = form.find('select.rebate_type');
    var selectedTypee = rebateType.find('option:selected').val().number();
    if (selectedTypee == '') {
        $alert('请选择返佣方式');
        return false;
    } else {
        var rebateDetailValue = rebateType.siblings('.rebate_detail_value').find('input').not('[disabled="disabled"]');
        var isDetailEmpty = false;
        rebateDetailValue.each(function () {
            var _this = $(this);
            var v = _this.val().trim();
            if (v == '') {
                isDetailEmpty = true;
            }
        });
        if (isDetailEmpty) {
            $alert('返佣方式的金额或是比例不能为空。');
            return false;
        }
    }

    // 验证比例不能超过100%
    var proportionE = form.find('.proportion_input').not('[disabled="disabled"]');
    if (proportionE.length > 0) {
        var proportion = proportionE.val().number();
        if (proportion) {
            if (proportion > 100) {
                $alert('比例不能超过100%。');
                return false;
            }
        } else {
            $alert('请先填写比例，比例不能为空。');
            return false;
        }
    }


    // 超出金额验证(7位整数或加两位小数)
    var excessAmountE = form.find('.excess_amount_input').not('[disabled="disabled"]');
    if (excessAmountE.length > 0) {
        var excessAmount = excessAmountE.val().number();
        if (excessAmount > 9999999.99) {
            $alert('超出金额不能大于9999999.99。');
            return false;
        }
    }

    // 验证超出金额返固定金额的数值（7位整数或加两位小数 && 不能大于超出金额）
    var returnAmountE = form.find('.return_amount').not('[disabled="disabled"]');
    if (returnAmountE.length > 0) {
        var returnAmount = returnAmountE.val().number();
        if (returnAmount > excessAmount || returnAmount > 9999999.99) {
            $alert('返还金额不能大于超出金额且不能大于超出金额。');
            return false;
        }
    }



    // 业务城市校验
    var _thisBtn = form.find('.add_city_btn');
    getCheckedCitys(_thisBtn);
    var citys = form.find('.city_ids').val();
    if (citys == '') {
        $alert('请选择至少一个城市');
        return false;
    }

    // 生效日期
    var effectiveDate = form.find('.effective_date').val();
    if (effectiveDate == '') {
        $alert('请选择生效时间');
        return false;
    }
    return true;
}


/**
 * 获取选中的城市IDS
 * @author Arley 2018年4月4日16:19:40
 * @param btn {Object} : 当前城市插件的点击按钮（jQuery对象）
 */
function getCheckedCitys (btn) {
    var citys = btn.parents('.city_box').find('.city_list .city');
    var cityObj = {
        cityIds : [],
        cityName : []
    };
    citys.each(function () {
        var _this = $(this);
        var v = _this.data('id');
        var name = _this.data('name');
        cityObj.cityIds.push(v);
        cityObj.cityName.push(name);
    });
    return cityObj;
}

/**
 * 获取创建政策的数据（费率、融资期限、城市）
 * @param form {Object} : 当前编辑政策的form提交元素（jQuery对象）
 * @return {Object} : 政策数据
 */
function getEditPolicyData (form) {
    var policyData = {
        rates : [],
        rebatePeriods : [],
        citys : []
    };

    var ratesEle = form.find('.policy_rates').find('input[type="checkbox"]:checked');   // 费率元素
    var peridosEle = form.find('.policy_periods').find('input[type="checkbox"]:checked');       // 期限元素
    ratesEle.each(function () {
        var _this = $(this);
        var value = _this.val().trim().number();
        policyData.rates.push(value);
    });
    peridosEle.each(function () {
        var _this = $(this);
        var value = _this.val().trim().number();
        policyData.rebatePeriods.push(value);
    });
    var _thisBtn = form.find('.add_city_btn');
    policyData.citys = getCheckedCitys(_thisBtn);

    return policyData;
}

/**
 * 校验政策的重复性
 * @author Arley 2018年4月5日13:05:08
 * @param form {Object} : 当前编辑政策的form提交元素（jQuery对象）
 * @return {Boolean}
 */
function checkPoliciesRepeat (form) {
    var editPolicyData = getEditPolicyData(form);
    var index = form.data('policy_index');      // 当前政策的下标（页面循环下标）
    rebatePolicies.remove(rebatePolicies[index]);   // 除去老数据的当前政策
    for (var i = 0, len = rebatePolicies.length; i < len; i++) {
        var oldRates = rebatePolicies[i].rate.split(',');
        var oldPeriods = rebatePolicies[i].rebate_period.split(',');
        var oldCitys = rebatePolicies[i].city_ids.split(',');
        for (var a = 0, l1 = oldRates.length; a < l1; a++) {
            if (editPolicyData.rates.indexOf(oldRates[a]) !== -1) {
                for (var b = 0, l2= oldPeriods.length; b < l2; b++) {
                    if (editPolicyData.rebatePeriods.indexOf(oldPeriods[b]) !== -1) {
                        for (var c = 0, l3 = oldCitys.length; c < l3; c++) {
                            if (editPolicyData.citys.cityIds.indexOf(oldCitys[c]) !== -1) {
                                // 万元系数=（费率*1000*(融资期限➗12)+10000）➗融资期限
                                var millionCoefficient = parseInt(((oldRates[a] * 1000 * (oldPeriods[b] / 12)) / oldPeriods[b]) * 1000) / 1000;
                                if (millionCoefficient.toString().indexOf('.') !== -1) {
                                    if (millionCoefficient.toString().split('.')[1].number() > 445) {
                                        millionCoefficient = millionCoefficient.toString().split('.')[0].number() + 1;
                                    } else {
                                        millionCoefficient = millionCoefficient.toString().split('.')[0].number();
                                    }
                                }
                                var cityName = editPolicyData.citys.cityName[c];        // 当前重复政策的城市名称
                                $alert('当前政策下'+ cityName +'万元系数'+ millionCoefficient +'已存在！');
                                return false;
                            }
                        }
                    }
                }
            }
        }
    }
    return true;
}

// 创建新返点政策
function createNewPolicy () {
    var temp = $('.policies_temp');
    var firstPolicy = $('.first_policy');

    var createBtn = $('.create_policy_btn');
    createBtn.off('click').on('click', function () {
        firstPolicy.before(temp);
        var newPolicy = $('.policies_temp').eq(0);
        newPolicy.show();
        newPolicy.find('.edit_delete').show();
    });
}


/**
 * 删除政策按钮绑定点击事件
 * @author Arley 2018年4月5日17:09:07
 * @param btn {Object} : 当前的删除按钮（jQuery对象）
 */
function deletePolicy () {
    var btn = $('.edit_delete');
    btn.off('click').on('click', function () {
        var _this = $(this);
        var btnBox = _this.parents('.btn_box');
        // 按钮的状态类型  新建：0 编辑状态：1
        var btnType = btnBox.data('btn_type');      // 按钮的状态类型
        var policyE = _this.parents('.form_options');
        if (btnType === 0) {
            policyE.remove();
        } else if (btnType === 1) {
            deleteOldPolicies();    // 调用接口删除政策
        }
    });


}


/**
 * 删除历史政策数据
 * @author Arley 2018年4月5日17:29:51
 * @param btn {Object} : 当前的删除按钮（jQuery对象）
 */
function deleteOldPolicies (btn) {
    btn.off('click');
    var policyE = btn.parents('.form_options');
    var policyId = policyE.data('id');

    redefineAjax({
        url : contextPath + '',
        data : {
            rebate_id : policyId
        },
        success : function (res) {
            if (res.error_code == 0) {
                $alert('政策删除成功。');
            } else {
                $alert(res.error_msg);
                deletePolicy();
            }
        },
        error : function () {
            $alert('政策删除失败，请重新提交！');
            deletePolicy();
        }
    })
}