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
            var parentForm = _this.parents('.policy_form');
            validatePolicyEmpty(parentForm);
            parentForm.submit();
        } else if (editType === 1) {
            _this.text('保存').siblings('.edit_cancel').show();
        }
    });
}

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
        $alert('请选择利率');
        return false;
    }
};
