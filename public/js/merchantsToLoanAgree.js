
$(function(){
    var firmType = $('#firmType');
    var set_account = $('.set_account');
    var payee_bank = $('.payee_bank');
    var payee_address1 = $('.payee_address1');
    var payee_address2 = $('.payee_address2');
    var payee_bank_address = $('.payee_bank_address');
    var payee_bank_num = $('.payee_bank_num');
    var payment_account = $("#payment_account");
    var payment_city = $("#payment_city");
    var receipt_account_name = $("#receipt_account_name");
    var receipt_bank = $("#receipt_bank");
    var receipt_bank_address = $("#receipt_bank_address");
    var receipt_address = $("#receipt_address");
    var financial_use = $("#financial_use");
    var receipt_phone = $("#receipt_phone");

    //付方账户切换
    payment_account.change(function (){
        var payment_account = $("#payment_account option:selected").data('id');
        payment_city.val(payment_account);
    });
    //业务类型切换
    firmType.change(function(){
        var checked = $('.bank_type').find('input[type="radio"]').eq(1).prop('checked');
        if($(this).val() === '1'){
            set_account.hide();
            if (checked) {
                payee_address2.hide();
                payee_bank_address.hide();
                payee_bank_num.hide();
                payee_address1.show();
            }
        }else{
            set_account.show();
            if (checked) {
                payee_address2.show();
                payee_bank_address.show();
                payee_bank_num.show();
                payee_address1.hide();
            }
        }
    });

    //银行类型切换
    $('.bank_type input').off('click').on('click', function () {
        var checked = $('.bank_type').find('input[type="radio"]').eq(1).prop('checked');
        if(checked){
            payee_bank.show();
            if($('#firmType').val() === '1'){
                payee_address1.show();
            }else{
                payee_address2.show();
                payee_bank_address.show();
                payee_bank_num.show();
            }
        }else{
            payee_bank.hide();
            payee_address1.hide();
            payee_address2.hide();
            payee_bank_address.hide();
            payee_bank_num.hide();
        }
    });

    //表单校验
    receipt_account_name.blur(function(){
        var reg = /^[\u4E00-\u9FA5\w]+$/;
        var error_txt = '收方账户名不能包含特殊字符';
        validate_form(1,receipt_account_name,reg,error_txt);
    });

    receipt_bank.blur(function(){
        var reg = /^[\u4E00-\u9FA5\w]+$/;
        var error_txt = '收方开户行不能包含特殊字符';
        validate_form(1,receipt_bank,reg,error_txt);
    });

    receipt_bank_address.blur(function(){
        var reg = /^[\u4E00-\u9FA5\w]+$/;
        var error_txt = '收方开户地不能包含特殊字符';
        validate_form(1,receipt_bank_address,reg,error_txt);
    });

    receipt_address.blur(function(){
        var reg = /^[\u4E00-\u9FA5\w]+$/;
        var error_txt = '收方行地址不能包含特殊字符';
        validate_form(1,receipt_address,reg,error_txt);
    });

    financial_use.blur(function(){
        var reg = /^[\u4E00-\u9FA5\w]+$/;
        var error_txt = '用途不能包含特殊字符';
        validate_form(1,financial_use,reg,error_txt);
    });

    receipt_phone.blur(function(){
        // var reg = /^((\d{7,8})|(\d{4}|\d{3})(\d{7,8})|(\d{4}|\d{3})(\d{7,8})(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})(\d{4}|\d{3}|\d{2}|\d{1}))$/;
        var reg = /^$|(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+((\-[0-9]{1,6})|(\([0-9]{1,6}\))|(\（[0-9]{1,6}\）))?$/;
        var error_txt = '请输入正确格式的电话号码';
        validate_form(0,receipt_phone,reg,error_txt);
    });
});

//校验函数
function validate_form(required,obj,reg,error_txt){
    var val = obj.val();
    var reg = reg;
    if(required == '1'){
        if(!val){
            obj.parent().find('.formError').html('此项内容不能为空');
            obj.css('border-color','#FB2741');
            return;
        }
    }else{
        if(!val){
            obj.parent().find('.formError').html('');
            obj.css('border-color','#ccc');
            return;
        }
    }
    if(!reg.test(val)){
        obj.parent().find('.formError').html(error_txt);
        obj.css('border-color','#FB2741');
        return;
    }
    obj.parent().find('.formError').html('');
    obj.css('border-color','#ccc');
}


//城市选中
function getSelectedCitys () {
    $('.select_city_input').citySelect({
        data : city_list,
        defaultData : [],
        dataType : 1,
        type : 1
    }, function (data) {
        console.log(data);
        var provinceName = data[0].name;
        var cityNmae = data[0].city_list.name;
        var receipt_city =  data[0].city_list.code;
        var receipt_province_city = provinceName + cityNmae;
        $("#receipt_province_city").val(receipt_province_city);
        $(".select_city_input").val(receipt_province_city);
        $("#receipt_city").val(receipt_city);
    });
}







