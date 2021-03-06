
$(function(){

    //二手车的隐藏域
    // var carage_form = $('.radio_applyto_business').eq(0).prop('checked');
    var carage_form = $('#old_car').siblings('label').hasClass('checked');
    if(carage_form){
        $('#ssess_desc_form').css('display','block');
    }else{
        $('#ssess_desc_form').css('display','none');
    }
    //新车二手车
    $('#new_car').click(function(){
        $('#ssess_desc_form').css('display','none');
        $('.applyto_business').val(0);
    });
    $('#old_car').click(function(){
        $('.applyto_business').val(1);
        $('#ssess_desc_form').css('display','block');
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
            $('.downpayment_add').css('padding-left','20px');
            $('.downpayment_add').css('margin-left','0px');
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
        } else {
            var downpayment_add_ready = $('.downpayment_add_ready');
            if(num && downpayment_add_ready.length > 0){
                for(var i = 0;i < downpayment_add_ready.length; i++){
                    var val = $('.downpayment_add_ready').eq(i).find('input').val();
                    if(num == val){
                        $(this).parent().find('.formError').html('此首付金额已存在,请重新输入');
                        return;
                    } else {
                        $(this).parent().find('.formError').html('');
                    }
                }
            } else {
                $(this).parent().find('.formError').html('');
            }
        }
        var error = $(this).parent().find('.formError').html();
        if(error == ''){
            var num = $('.downpayment_add input').val();
            var inner = '<div class="downpayment_box"><div class="downpayment_add_ready"><input type="text" readonly="readonly" id="" name="downpayment_money" value="' + num + '" style="width: 95px;padding-right: 10px;"/><span>元</span><span class="cursor downpayment_add_del">删除</span></div></div>';
            $('.downpayment_add').css('marginLeft',$('.column_name').width() + 'px');
            $('.downpayment_add').css('paddingLeft','30px');
            $('.downpayment_add').before(inner);
            $('.downpayment_add input').val("");

            var del = $('.downpayment_add_del').length;
            if (del == '4') {
                var last = '<div class="downpayment_box"><div class="downpayment_add_ready"><input type="text" id="" name="downpayment_money" value="" placeholder="请输入首付金额" maxlength="7" onKeyPress="if ((event.keyCode <48 || event.keyCode>57)) event.returnValue=false" onpaste="return false;" style="width: 95px;padding-right: 10px;"/><span>元</span><span class="cursor downpayment_add_del">删除</span></div></div>';
                $('.downpayment_add').before(last);
                $('.downpayment_add').hide();
            }
        }
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
        var del = $('.downpayment_add_ready').length;
        if(del =='0'){
            $('.downpayment_add').css('marginLeft','0px');
            $('.downpayment_add').css('paddingLeft','20px');
            $('input[name="downpayment_money_add"]').css('border-color','#ccc');
            $('.downpayment_add').parent().find('.formError').html('');
        } else if (del == '4') {
            var cur_num = $('.downpayment_add_ready').eq(3).find('input').val();
            $('.downpayment_add_ready').eq(3).parents('.downpayment_box').remove();
            $('.downpayment_add').show();
            $('.downpayment_add').find('input').val(cur_num);
        }
    });

    //添加费率
    var rate_arr = [];
    $('.rate_add_txt').click(function(){
        var num = $('.rate_add input').val();
        if(num == ''){
            //添加当前为空时状态的提示信息
            $(this).parent().find('.formError').html("请先输入当前费率");
            return;
        } else {
            var  interest_rate_num = $('.interest_rate_num');
            if(interest_rate_num.length != '0'){
                for(var i = 0; i <  interest_rate_num.length; i++){
                    var rate_arr = Number($('.interest_rate_num').eq(i).val());
                    if(num == rate_arr){
                        $(this).parent().find('.formError').html('此费率已存在，请重新输入');
                        return;
                    } else {
                        $(this).parent().find('.formError').html("");
                    }
                }
            } else {
                $(this).parent().find('.formError').html("");
            }
        }
        var error = $(this).parent().find('.formError').html();
        if(error == ''){
            var num = $('.rate_add input').val();
            var inner = '<div class="rate_box"><div class="rate_add_ready"><input type="text" class="form-control interest_rate_num interest_rate_txt" readonly="readonly" id="" name="interest_rate" value="' + num + '"  style="width: 90px;"/><span>%</span><span class="cursor rate_add_del">删除</span></div></div>';
            $('.rate_add').css('marginLeft',$('.column_name').width() + 'px');
            $('.rate_add').css('paddingLeft','30px');
            $('.rate_add').before(inner);
            $('.rate_add input').val("");

            var del = $('.rate_add_del').length;
            if (del == '4') {
                var last = '<div class="rate_box"><div class="rate_add_ready"><input type="text" class="form-control interest_rate_num interest_rate_txt" name="interest_rate" value="" placeholder="请输入费率" maxlength="5" onpaste="return false;" onkeyup="clearNoNum(this)" style="width: 90px;"/><span>%</span><span class="cursor rate_add_del">删除</span></div></div>';
                $('.rate_add').before(last);
                $('.rate_add').hide();
            }
        }
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
        var del = $('.rate_add_ready').length;
        if(del =='0'){
            $('.rate_add').css('marginLeft','0px');
            $('.rate_add').css('paddingLeft','20px');
            $('input[name="interest_rate_input"]').css('border-color','#ccc');
            $('.rate_add').parent().find('.formError').html('');
        } else if (del == '4') {
            var cur_num = $('.rate_add_ready').eq(3).find('input').val();
            $('.rate_add_ready').eq(3).parents('.rate_box').remove();
            $('.rate_add').show();
            $('.rate_add').find('input').val(cur_num);
        }
    });

    //表单校验
    $('#name').blur(function(){
        var reg = /^[\u4E00-\u9FA5\w]+$/;
        var error_txt = '产品名称不能包含特殊字符';
        validate_form(1,$('#name'),reg,error_txt);
    });

});
//文本框校验
//只可输入数字，两位整数，小数点后保留两位，超出不可输入
function clearNoNum(obj){
    obj.value = obj.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
    obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
    obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数
    if(obj.value.indexOf(".")< 0 && obj.value !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        obj.value= parseFloat(obj.value);
    }
    if(obj.value > 99.99){
        obj.value = obj.value.slice(0,obj.value.length-1);
        return;
    }
}
//只可输入数字，三位整数，小数点后保留三位，超出不可输入
function clearNoNum3(obj){
    obj.value = obj.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
    obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
    obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d\d).*$/,'$1$2.$3');//只能输入三个小数
    if(obj.value.indexOf(".")< 0 && obj.value !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        obj.value= parseFloat(obj.value);
    }
    if(obj.value > 999.99){
        obj.value = obj.value.slice(0,obj.value.length-1);
        return;
    }
}


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



