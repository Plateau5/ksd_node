
$(function(){

    // 所属机构
    /*$('.radio_applyto_business').click(function(){
        var url = contextPath + "/api/product/getOrganization";
        var applyto_business = $(this).val();
        $.ajax({
            type: "post",
            url: url,
            dataType: "json",
            data: {applyto_business: applyto_business},
            async: false,
            success: function (data) {
                var inner = '<option value="-1">请选择</option>';
                $.each(data.list, function (n, value) {
                    inner += '<option value=' + value.id + '>' + value.name + '</option>';
                });
                $('#parent_id option').remove();
                $('#parent_id').append(inner);
            }
        });
    });*/
    //二手车的隐藏域
    var carage_form = $('.radio_applyto_business').eq(0).prop('checked');
    if(carage_form){
        $('#ssess_desc_form').css('display','none');
        $('#carage_form').css('display','none');
    }else{
        $('#ssess_desc_form').css('display','block');
        $('#carage_form').css('display','block');
    }
    //新车二手车
    $('#new_car').click(function(){
        $('.applyto_business').val(0);
    });
    $('#old_car').click(function(){
        $('.applyto_business').val(1);
    });
    //产品来源
    $('#product_source_other').click(function(){
        $('.product_source').val(1);
    });
    $('#product_source_self').click(function(){
        $('.product_source').val(2);
    });


    $('#parent_id').change(function() {
        var formError = $(this).parent().parent().find('.formError').html();
        var val = $(this).children('option:selected').val();
        if(formError != ''){
            if(val != '-1'){
                $(this).parent().parent().find('.formError').html('');
            }
        }
    });

    //首付类型
    $('#downpayment_select').change(function(){
        var val = $(this).val();
        if(val == '1'){
            $('.downpayment_rate').css('display','block');
            $('.downpayment_money').css('display','none');
            $('#downpayment_select').parent().parent().find('.formError').html('');
        }else if(val == '2'){
            $('.downpayment_rate').css('display','none');
            $('.downpayment_money').css('display','block');
            $('#downpayment_select').parent().parent().find('.formError').html('');
        }else{
            $('.downpayment_rate').css('display','none');
            $('.downpayment_money').css('display','none');
        }
    });

    //首付比例
    $('.check_img').click(function(){
        var check_el = $(this);
        var checked = check_el.hasClass('icon_check');
        var unchecked = check_el.hasClass('icon_uncheck');
        if (checked) {
            check_el.removeClass('icon_check');
            check_el.addClass('icon_uncheck');
            return;
        }
        if (unchecked) {
            check_el.removeClass('icon_uncheck');
            check_el.addClass('icon_check');
            return;
        }
    });

    //添加首付金额
    var downpayment_arr = [];
    $('.downpayment_add_txt').click(function(){
        var num = $('.downpayment_add input').val();
        if(num == ''){
            var error = $(this).parent().find('.formError').html('请填写首付金额');
            return;
        }
        var error = $(this).parent().find('.formError').html();
        if(error == ''){
            var num = $('.downpayment_add input').val();
            var inner = '<div class="downpayment_box"><div class="downpayment_add_ready"><input type="text" readonly="readonly" id="" name="" value="' + num + '" style="width: 12%;padding-right: 10px;"/><span>元</span><span class="cursor downpayment_add_del">删除</span></div></div>';
            $('.downpayment_add').css('marginLeft',$('.column_name').width() + 'px');
            $('.downpayment_add').css('paddingLeft','30px');
            $('.downpayment_add').before(inner);
            $('.downpayment_add input').val("");
        }
        var del = $('.downpayment_add_del').length;
        if(del == '5'){
            $('.downpayment_add').css('display','none');
            $('.downpayment_box').eq(4).css('margin-bottom','0');
        }
    });

    $('input[name="downpayment_money_add"]').blur(function(){
        var num = $(this).val();
        if(parseFloat(num) > 10000000){
            $('input[name="downpayment_money_add"]').css('border-color','#FB2741');
            $(this).parent().parent().find('.formError').html('首付金额不能高于10000000元,请重新输入');
            return;
        }
        var downpayment_add_ready = $('.downpayment_add_ready');
        if(num && downpayment_add_ready.length > 0){
            for(var i = 0;i < downpayment_add_ready.length; i++){
                var val = $('.downpayment_add_ready').eq(i).find('input').val();
                if(num == val){
                    $('input[name="downpayment_money_add"]').css('border-color','#FB2741');
                    $(this).parent().parent().find('.formError').html('此首付金额已存在,请重新输入');
                    return;
                }
            }
        }
        $('#downpayment_money').val($('.downpayment_add input').val());
        $('input[name="downpayment_money_add"]').css('border-color','#ccc');
        $(this).parent().parent().find('.formError').html('');
    });

    //删除首付金额
    $(document).delegate(".downpayment_add_del","click",function(ev){
        ev.preventDefault();
        var num = $(this).parent().find('input').val();
        for(var i = 0; i < downpayment_arr.length; i++){
            if(num == downpayment_arr[i]){
                downpayment_arr.splice(i,1);
            }
        }
        $(this).parent().parent().remove();
        var del = $('.downpayment_add_del').length;
        if(del == '4'){
            $('.downpayment_add').css('display','block');
        }
        if(del =='0'){
            $('.downpayment_add').css('marginLeft','0px');
            $('.downpayment_add').css('paddingLeft','20px');
            $('input[name="downpayment_money_add"]').css('border-color','#ccc');
            $('.downpayment_add').parent().find('.formError').html('');
        }
        // $('.downpayment_box').eq(0).css('marginLeft','-40px');
    });

    //添加年利率
    var rate_arr = [];
    $('.rate_add_txt').click(function(){
        var num = $('.rate_add input').val();
        if(num == ''){
            //添加当前为空时状态的提示信息
            $('.rate_add').find("input").focus().end().parent().find(".formError").text("请先输入当前费率");
            return;
        }
        var error = $(this).parent().find('.formError').html();
        if(error == ''){
            var num = $('.rate_add input').val();
            var inner = '<div class="rate_box"><div class="rate_add_ready"><input type="text" class="form-control interest_rate_num interest_rate_txt" readonly="readonly" id="" name="interest_rate_date" value="' + num + '"  style="width: 12%;padding-right: 10px;"/><span>%</span><span class="cursor rate_add_del">删除</span></div></div>';
            $('.rate_add').css('marginLeft',$('.column_name').width() + 'px');
            $('.rate_add').css('paddingLeft','30px');
            $('.rate_add').before(inner);
            $('.rate_add input').val("");
        }
        var del = $('.rate_add_del').length;
        if(del == '5'){
            $('.rate_add').css('display','none');
            $('.rate_box').eq(4).css('margin-bottom','0');
        }
    });

    $('input[name="interest_rate_input"]').blur(function(){
        var num = Number($('.rate_add input').val());
        var reg = /^\d{1,2}(\.\d{1,2})?$/;
        if(num && !reg.test(num)){
            $(this).parent().parent().find('.formError').html('请输入正确的费率');
            $('input[name="interest_rate_input"]').css('border-color','#FB2741');
            return;
        }
        var  interest_rate_num = $('.interest_rate_num');
        if(interest_rate_num.length != '0'){
            for(var i = 0; i <  interest_rate_num.length; i++){
                var rate_arr = Number($('.interest_rate_num').eq(i).val());
                if(num == rate_arr){
                    $(this).parent().parent().find('.formError').html('此费率已存在，请重新输入');
                    $('input[name="interest_rate_input"]').css('border-color','#FB2741');
                    return;
                }
            }
        }
        $('input[name="interest_rate_input"]').css('border-color','#ccc');
        $(this).parent().parent().find('.formError').html('');

    });

    //删除年利率
    $(document).delegate(".rate_add_del","click",function(ev){
        ev.preventDefault();
        var num = $(this).parent().find('input').val();
        for(var i = 0; i < rate_arr.length; i++){
            if(num == rate_arr[i]){
                rate_arr.splice(i,1);
            }
        }
        $(this).parent().parent().remove();
        var del = $('.rate_add_del').length;
        if(del == '4'){
            $('.rate_add').css('display','block');
        }
        if(del =='0'){
            $('.rate_add').css('marginLeft','0px');
            $('.rate_add').css('paddingLeft','20px');
            // $('.rate_add').css('marginLeft','-40px');
            $('input[name="interest_rate_input"]').css('border-color','#ccc');
            $('.rate_add').parent().find('.formError').html('');
        }
        // $('.rate_box').eq(0).css('marginLeft','-40px');
    });


    //添加备注
    // $('.add_txt').click(function(){
    //     var remarks = $(this).parent().parent().find('.remarks_box').css('display');
    //     if(remarks == 'block'){
    //         return;
    //     }
    //     $(this).parent().parent().find('.remarks_box').css('display','block');
    // });

    //表单校验
    $('#name').blur(function(){
        var reg = /^[\u4E00-\u9FA5\w]+$/;
        var error_txt = '产品名称不能包含特殊字符';
        validate_form(1,$('#name'),reg,error_txt);
    });

    // $('input[type="radio"]').click(function(){
    //     $(this).prop('checked',true);
    //     $(this).parent().parent().parent().parent().find('.formError').html('');
    // });

    // $('.check_img').click(function(){
    //     $(this).parent().parent().parent().parent().find('.formError').html('');
    // });

    $('#financeamount_start').blur(function(){
        var reg = /^\d+(\.\d{1,2})?$/;
        var error_txt1 = '请输入正确的融资金额数';
        var error_txt2 = '请输入正确的融资金额范围';
        num_check($('#financeamount_start'),$('#financeamount_end'),reg,error_txt1,error_txt2);
    });

    $('#financeamount_end').blur(function(){
        var reg = /^\d+(\.\d{1,2})?$/;
        var error_txt1 = '请输入正确的融资金额数';
        var error_txt2 = '请输入正确的融资金额范围';
        num_check($('#financeamount_start'),$('#financeamount_end'),reg,error_txt1,error_txt2);
    });

    // $('#age_start').blur(function(){
    //     var val1 = $(this).val();
    //     var val2 = $('#age_end').val();
    //     if(val1 == '' && val2 == ''){
    //         $(this).parent().parent().find('.formError').html('');
    //         $(this).css('border-color','#ccc');
    //         return;
    //     }
    //     if(parseInt(val1) < 18){
    //         $(this).parent().parent().find('.formError').html('年龄不能低于18岁');
    //         $(this).css('border-color','#FB2741');
    //         return;
    //     }
    //     if(parseInt(val2) > 65){
    //         $(this).parent().parent().find('.formError').html('年龄不能高于65岁');
    //         $(this).css('border-color','#FB2741');
    //         return;
    //     }
    //     var reg = /^\d{1,2}$/;
    //     var error_txt1 = '请输入正确的年龄数';
    //     var error_txt2 = '请输入正确的年龄范围';
    //     num_check($('#age_start'),$('#age_end'),reg,error_txt1,error_txt2);
    // });
    //
    // $('#age_end').blur(function(){
    //     var val1 = $(this).val();
    //     var val2 = $('#age_start').val();
    //     if(val1 == '' && val2 == ''){
    //         $(this).parent().parent().find('.formError').html('');
    //         $(this).css('border-color','#ccc');
    //         return;
    //     }
    //     if(parseInt(val2) < 18){
    //         $(this).parent().parent().find('.formError').html('年龄不能低于18岁');
    //         $(this).css('border-color','#FB2741');
    //         return;
    //     }
    //     if(parseInt(val1) > 65){
    //         $(this).parent().parent().find('.formError').html('年龄不能高于65岁');
    //         $(this).css('border-color','#FB2741');
    //         return;
    //     }
    //     var reg = /^\d{1,2}$/;
    //     var error_txt1 = '请输入正确的年龄数';
    //     var error_txt2 = '请输入正确的年龄范围';
    //     num_check($('#age_start'),$('#age_end'),reg,error_txt1,error_txt2);
    // });
    //
    // $('#carage_start').blur(function(){
    //     var val1 = $(this).val();
    //     var val2 = $('#carage_end').val();
    //     if(val1 == '' && val2 == ''){
    //         $(this).parent().parent().find('.formError').html('');
    //         $(this).css('border-color','#ccc');
    //         return;
    //     }
    //     if(parseFloat(val1) < 0.5 || parseFloat(val2) < 0.5){
    //         $(this).parent().parent().find('.formError').html('车龄不能低于0.5年');
    //         $(this).css('border-color','#FB2741');
    //         return;
    //     }
    //     if(parseFloat(val1) > 15 ||parseFloat(val2) > 15){
    //         $(this).parent().parent().find('.formError').html('车龄不能超过15年');
    //         $(this).css('border-color','#FB2741');
    //         return;
    //     }
    //     var reg = /^[\d]+(\.\d)?$/;
    //     var error_txt1 = '请输入正确的车龄数';
    //     var error_txt2 = '请输入正确的车龄范围';
    //     num_check($('#carage_start'),$('#carage_end'),reg,error_txt1,error_txt2);
    // });
    //
    // $('#carage_end').blur(function(){
    //     var val1 = $(this).val();
    //     var val2 = $('#carage_start').val();
    //     if(val1 == '' && val2 == ''){
    //         $(this).parent().parent().find('.formError').html('');
    //         $(this).css('border-color','#ccc');
    //         return;
    //     }
    //     if(parseFloat(val1) < 0.5 || parseFloat(val2) < 0.5){
    //         $(this).parent().parent().find('.formError').html('车龄不能低于0.5年');
    //         $(this).css('border-color','#FB2741');
    //         return;
    //     }
    //     if(parseFloat(val1) > 15 || parseFloat(val2) > 15){
    //         $(this).parent().parent().find('.formError').html('车龄不能超过15年');
    //         $(this).css('border-color','#FB2741');
    //         return;
    //     }
    //     var reg = /^[\d]+(\.\d)?$/;
    //     var error_txt1 = '请输入正确的车龄数';
    //     var error_txt2 = '请输入正确的车龄范围';
    //     num_check($('#carage_start'),$('#carage_end'),reg,error_txt1,error_txt2);
    // });


});

//起始—结束
function num_check(obj1,obj2,reg,error_txt1,error_txt2){
    var val1 = obj1.val();
    if(val1 != ''){
        if(!reg.test(val1)){
            obj1.parent().parent().find('.formError').html(error_txt1);
            obj1.css('border-color','#FB2741');
            return;
        }
    }
    var val2 = obj2.val();
    if(val2 != ''){
        if(!reg.test(val2)){
            obj1.parent().parent().find('.formError').html(error_txt1);
            obj2.css('border-color','#FB2741');
            return;
        }
        if(parseInt(val1) >= parseInt(val2)){
            obj1.parent().parent().find('.formError').html(error_txt2);
            obj2.css('border-color','#FB2741');
            return;
        }
    }
    obj1.parent().parent().find('.formError').html('');
    obj1.css('border-color','#ccc');
    obj2.css('border-color','#ccc');
}


