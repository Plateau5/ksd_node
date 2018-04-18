
$(function(){
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

    //多选适用业务
    $('.check_img').click(function(){
        var checked = $(this).prev().prop('checked');
        if(!checked){
            $(this).prev().prop('checked',true);
            $('#applyto_business').parent().parent().find('.formError').html('');
            return;
        }
        $(this).prev().prop('checked',false);
    });

    //单选有无系统
    $('#have_system input').click(function(){
        var have_system = $('#have_system').parent().parent().find('.formError').html();
        if(have_system != ''){
            $('#have_system').parent().parent().find('.formError').html('');
        }
        have_system_url();

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

    $('.mask').click(function(){
        $('.mask').css('display','none');
        $('#delS').css('display','none');
        $('#delQ').css('display','none');
    });

    $('#delSBtn').click(function(){
        $('.mask').css('display','none');
        $('#delS').css('display','none');
        window.location.href=contextPath+ markUri + "/supplier/organization/list";
    });

    applyto_business_change($('#applyto_business_name'));

});

//适用业务改变提醒框
function porm_box(){
    var h = document.body.scrollHeight;
    $('.mask').css({
        'height' : h + 'px',
        'display' : 'block'
    });
    $('#delQ').css('display','block');
}

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
    var checked = $('input[name="have_system"]').eq(0).prop('checked');
    if(checked){
        $('#have_system').parent().parent().next().css('display','block');
    }else{
        $('#have_system').parent().parent().next().css('display','none');
    }
}

//保存更新函数
function send_organization_form(url){
    $('#add_btn_y').attr('disabled',true);
    //有无错误提示
    var str = '';
    var formError = $('.formError');
    for(var i = 0; i < formError.length; i++){
        var text = $('.formError').eq(i).text();
        str += text;
    }
    if(str != ''){
        $('#add_btn_y').attr('disabled',false);
        return;
    }
    var name = $('#name').val();
    if(!name){
        $('#name').parent().parent().find('.formError').html('机构名称不能为空');
        $('#name').css('border-color','#FB2741');
        $('#add_btn_y').attr('disabled',false);
        return;
    }
    //适用业务
    var applyto_business1 = $('#applyto_business input').eq(0).prop('checked');
    var applyto_business2 = $('#applyto_business input').eq(1).prop('checked');
    if(!applyto_business1 && !applyto_business2){
        $('#applyto_business').parent().parent().find('.formError').html('请选择机构的适用业务');
        $('#add_btn_y').attr('disabled',false);
        return;
    }
    //有无机构LOGO
    var have_logo = $('#image_url .icon_check').length;
    if(have_logo == '0'){
        $('.logo_error').css('display','block');
        $('.logo_error').html('请选择机构LOGO');
        $('#add_btn_y').attr('disabled',false);
        return;
    }
    //有无系统
    var have_system1 = $('#have_system input').eq(0).prop('checked');
    var have_system2 = $('#have_system input').eq(1).prop('checked');
    if(!have_system1 && !have_system2){
        $('#have_system').parent().parent().find('.formError').html('请选择机构有无系统');
        $('#add_btn_y').attr('disabled',false);
        return;
    }
    //有无系统地址
    var have_system_url = $('.have_system_url').css('display');
    if(have_system_url == 'block'){
        var have_system_url_val = $('#system_url').val();
        if(!have_system_url_val){
            $('#system_url').parent().parent().find('.formError').html('系统地址不能为空');
            $('#add_btn_y').attr('disabled',false);
            return;
        }
    }
    var vFD = new FormData(document.getElementById('organization_info_create'));
    var oXHR = new XMLHttpRequest();
    oXHR.addEventListener('load', function(e) {
        var response = e.target.responseText;
        var data = JSON.parse(response);
        //成功
        if (data.error_code == '0') {
            var h = document.body.scrollHeight;
            $('#delS').css('display','block');
            $('.mask').css({
                'display' : 'block',
                'height' : h + 'px'
            });
            $('#delQ').css('display','none');
            $(".formProm").html("");
            $(".formError").html("");
            $(".trueImg").css("display","");
        } else {
            alert(data.error_msg);
        }
        $('#add_btn_y').attr('disabled',false);

    }, false);
    oXHR.addEventListener('error', function(e) {
        alert("输入参数异常");
        return;
    }, false);
    oXHR.addEventListener('abort', function() {
    }, false);
    oXHR.open('POST', url);
    oXHR.send(vFD);
}


