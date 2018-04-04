/**
 * Created by Arley Joe 2018-4-3 16:49:30
 */

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
        if (editType === 0) {
            /*var parentForm = _this.parents('.policy_form');
            var verify = validatePolicyEmpty(parentForm);
            if (verify) {
                submitEvent(parentForm, btn);
            }*/
        } else if (editType === 1) {
            _this.text('保存').siblings('.edit_cancel').show();
        }
        var parentForm = _this.parents('.policy_form');
        var verify = validatePolicyEmpty(parentForm);
        if (verify) {
            submitEvent(parentForm, btn);
        }
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
            $alert('返佣方式的金额或是比例不能为空');
            return false;
        }
    }

    // 业务城市校验
    var citys = form.find('.citySelectInput').val().trim();
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