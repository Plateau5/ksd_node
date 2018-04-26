
$(function(){
    //新车二手车
    $('#usedCars').click(function(){
        var status = $('#usedCars').attr('checked');
        if (status == 'checked') {
            $('.carage_limit').css('display','block');
        } else {
            $('.carage_limit').css('display','none');
        }
    });
    have_system_url();
    //选择机构logo
    $('.organization_logo').click(function(){
        $('.organization_logo').find('.icon_check').remove();
        $('.organization_logo input').prop('checked','false');
        $(this).find('input').prop('checked','true');
        var inner = '<div class="icon_check logo_check"></div>';
        $(this).append(inner);
        $('.logo_error').css('display','none');
        $('.logo_error').html('');
    });

    //单选有无系统
    $('#have_system input').click(function(){
        var have_system = $('#have_system').parent().find('.formError').html();
        if(have_system != ''){
            $('#have_system').parent().find('.formError').html('');
        }
        have_system_url();
    });

    //添加备注
    $('.add_txt').click(function(){
        var remarks = $(this).parent().parent().find('.remarks_box').css('display');
        if(remarks == 'block'){
            return;
        }
        $(this).parent().parent().find('.remarks_box').css('display','block');
    });

    //表单校验
    $('#name').blur(function(){
        var reg = /^[\u4E00-\u9FA5\w]+$/;
        var error_txt = '机构名称不能包含特殊字符';
        validate_form(1,$('#name'),reg,error_txt);
    });

    $('#system_url').blur(function(){
        //var reg = /^(http|https|ftp)\:\/\/([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&%\$\-]+)*@)?((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.[a-zA-Z]{2,4})(\:[0-9]+)?(\/[^\/][a-zA-Z0-9\.\,\?\'\/\/\+&%\$\=~_\-@]*)*$/;
        var regStr = "(ht|f)tp(s?)\\:\\/\\/[0-9a-zA-Z]([-.\\w]*[0-9a-zA-Z])*(:(0-9)*)*(\\/?)([a-zA-Z0-9\\-\\.\\?\\,\\'\\/\\\\\\+&amp;%\\$#_]*)?";
        var reg = new RegExp(regStr);
        var error_txt = '请输入有效的系统地址';
        validate_form(0,$('#system_url'),reg,error_txt);
    });

    $('#mobile').blur(function(){
        var reg = /^((\d{7,8})|(\d{4}|\d{3})(\d{7,8})|(\d{4}|\d{3})(\d{7,8})(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})(\d{4}|\d{3}|\d{2}|\d{1}))$/;
        var error_txt = '请输入正确格式的电话号码';
        validate_form(0,$('#mobile'),reg,error_txt);
    });

    $('#link_name').blur(function(){
        var reg = /^[\u4E00-\u9FA5a-zA-Z]+$/;
        var error_txt = "请输入中文、英文、中文+英文字符";
        validate_form(0,$('#link_name'),reg,error_txt);
    });

    $('#link_phone').blur(function(){
        var reg = /^1[3|4|5|8|7]\d{9}$/;
        var error_txt = "请输入11位数字";
        validate_form(0,$('#link_phone'),reg,error_txt);
    });

    $('#link_mobile').blur(function(){
        var reg = /^((\d{7,8})|(\d{4}|\d{3})(\d{7,8})|(\d{4}|\d{3})(\d{7,8})(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})(\d{4}|\d{3}|\d{2}|\d{1}))$/;
        var error_txt = '请输入正确格式的电话号码';
        validate_form(0,$('#link_mobile'),reg,error_txt);
    });
    applyto_business_change($('#applyto_business_name'));
});


//适用业务有无改变
function applyto_business_change(obj){
    var applyto_business_name0 = $('input[name="applyto_business"]').eq(0).prop('checked');
    var applyto_business_name1 = $('input[name="applyto_business"]').eq(1).prop('checked');
    var applyto_business_str = '';
    if(applyto_business_name0){
        applyto_business_str += $('input[name="applyto_business"]').eq(0).val();
    }
    if(applyto_business_name1){
        applyto_business_str += $('input[name="applyto_business"]').eq(1).val();
    }
    obj.val(applyto_business_str);
}

//系统地址有无显示函数
function have_system_url(){
    var checked = $('#have_system').find('input[type="radio"]').eq(0).prop('checked');
    if(checked){
        $('#have_system').parent().next().css('display','block');
        $('#have_sys_input').val(1);
    }else{
        $('#have_system').parent().next().css('display','none');
        $('#have_sys_input').val(0);
    }
}

//校验函数
function validate_form(required,obj,reg,error_txt){
    var val = obj.val();
    var reg = reg;
    if(required == '1'){
        if(!val){
            obj.parent().find('.trueImg').css('display','');
            obj.parent().find('.formError').html('此项内容不能为空');
            obj.css('border-color','#FB2741');
            return;
        }
    }else{
        if(!val){
            obj.parent().find('.trueImg').css('display','');
            obj.parent().find('.formError').html('');
            obj.css('border-color','#ccc');
            return;
        }
    }
    if(!reg.test(val)){
        obj.parent().find('.trueImg').css('display','');
        obj.parent().find('.formError').html(error_txt);
        obj.css('border-color','#FB2741');
        return;
    }
    obj.parent().find('.trueImg').css('display','inline-block');
    obj.parent().find('.formError').html('');
    obj.css('border-color','#ccc');
}
