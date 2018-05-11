
$(function(){
    //新车二手车
    $('#newCars').click(function(){
        var status = $('#newCars').attr('checked');
        var status1 = $('#usedCars').attr('checked');
        if (status == 'checked') {
            if (status1 == 'checked') {
                $('#applyto_business_input').val('0,1');
            } else {
                $('#applyto_business_input').val('0');
            }
        } else {
            $('#applyto_business_input').val('1');
        }
    });
    $('#usedCars').click(function(){
        var status1 = $('#newCars').attr('checked');
        var status = $('#usedCars').attr('checked');
        if (status == 'checked') {
            $('.carage_limit').css('display','block');
            if (status1 == 'checked') {
                $('#applyto_business_input').val('0,1');
            } else {
                $('#applyto_business_input').val('1');
            }
        } else {
            $('.carage_limit').css('display','none');
            $('#applyto_business_input').val('0');
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
        var remarks = $(this).parents('.column_val').find('.remarks_box').css('display');
        if(remarks == 'block'){
            $(this).parents('.column_val').find('.remarks_box').css('display','none');
        } else {
            $(this).parents('.column_val').find('.remarks_box').css('display','block');
        }
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
    $('#age_start').blur(function(){
        var val1 = $(this).val();
        var val2 = $('#age_end').val();
        if(val1 == '' && val2 == ''){
            $(this).parents('.option_item').find('.formError').html('');
            $(this).css('border-color','#ccc');
            return;
        }
        if(parseInt(val1) < 18){
            $(this).parent().find('.formError').html('年龄不能低于18岁');
            $(this).css('border-color','#FB2741');
            return;
        } else {
            $(this).parent().find('.formError').html('');
        }
        if(parseInt(val2) > 65){
            $(this).parent().find('.formError').html('年龄不能高于65岁');
            $(this).css('border-color','#FB2741');
            return;
        } else {
            $(this).parent().find('.formError').html('');
        }
        var reg = /^\d{1,2}$/;
        var error_txt1 = '请输入正确的年龄数';
        var error_txt2 = '请输入正确的年龄范围';
        num_check($('#age_start'),$('#age_end'),reg,error_txt1,error_txt2);
    });

    $('#age_end').blur(function(){
        var val1 = $(this).val();
        var val2 = $('#age_start').val();
        if(val1 == '' && val2 == ''){
            $(this).parent().find('.formError').html('');
            $(this).css('border-color','#ccc');
            return;
        }
        if(parseInt(val2) < 18){
            $(this).parent().find('.formError').html('年龄不能低于18岁');
            $(this).css('border-color','#FB2741');
            return;
        } else {
            $(this).parent().find('.formError').html('');
        }
        if(parseInt(val1) > 65){
            $(this).parent().find('.formError').html('年龄不能高于65岁');
            $(this).css('border-color','#FB2741');
            return;
        } else {
            $(this).parent().find('.formError').html('');
        }
        var reg = /^\d{1,2}$/;
        var error_txt1 = '请输入正确的年龄数';
        var error_txt2 = '请输入正确的年龄范围';
        num_check($('#age_start'),$('#age_end'),reg,error_txt1,error_txt2);
    });

    $('#carage_start').blur(function(){
        var val1 = $(this).val();
        var val2 = $('#carage_end').val();
        if(val1 == '' && val2 == ''){
            $(this).parent().find('.formError').html('');
            $(this).css('border-color','#ccc');
            return;
        }
        if(parseFloat(val1) < 0.5 || parseFloat(val2) < 0.5){
            $(this).parent().find('.formError').html('车龄不能低于0.5年');
            $(this).css('border-color','#FB2741');
            return;
        } else {
            $(this).parent().find('.formError').html('');
        }
        if(parseFloat(val1) > 15 ||parseFloat(val2) > 15){
            $(this).parent().find('.formError').html('车龄不能超过15年');
            $(this).css('border-color','#FB2741');
            return;
        } else {
            $(this).parent().find('.formError').html('');
        }
        var reg = /^[\d]+(\.\d)?$/;
        var error_txt1 = '请输入正确的车龄数';
        var error_txt2 = '请输入正确的车龄范围';
        num_check($('#carage_start'),$('#carage_end'),reg,error_txt1,error_txt2);
    });

    $('#carage_end').blur(function(){
        var val1 = $(this).val();
        var val2 = $('#carage_start').val();
        if(val1 == '' && val2 == ''){
            $(this).parent().find('.formError').html('');
            $(this).css('border-color','#ccc');
            return;
        }
        if(parseFloat(val1) < 0.5 || parseFloat(val2) < 0.5){
            $(this).parent().find('.formError').html('车龄不能低于0.5年');
            $(this).css('border-color','#FB2741');
            return;
        } else {
            $(this).parent().find('.formError').html('');
        }
        if(parseFloat(val1) > 15 || parseFloat(val2) > 15){
            $(this).parent().find('.formError').html('车龄不能超过15年');
            $(this).css('border-color','#FB2741');
            return;
        } else {
            $(this).parent().find('.formError').html('');
        }
        var reg = /^[\d]+(\.\d)?$/;
        var error_txt1 = '请输入正确的车龄数';
        var error_txt2 = '请输入正确的车龄范围';
        num_check($('#carage_start'),$('#carage_end'),reg,error_txt1,error_txt2);
    });


    $('#mobile').blur(function(){
        // var reg = /^((\d{7,8})|(\d{4}|\d{3})(\d{7,8})|(\d{4}|\d{3})(\d{7,8})(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})(\d{4}|\d{3}|\d{2}|\d{1}))$/;
        var reg = /^$|(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+((\-[0-9]{1,6})|(\([0-9]{1,6}\))|(\（[0-9]{1,6}\）))?$/;
        var error_txt = '请输入正确格式的电话号码';
        validate_form(0,$('#mobile'),reg,error_txt);
    });

    $('#link_name').blur(function(){
        var reg = /^[\u4E00-\u9FA5a-zA-Z]+$/;
        var error_txt = "请输入中文、英文、中文+英文字符";
        validate_form(0,$('#link_name'),reg,error_txt);
    });

    $('#link_phone').blur(function(){
        var reg = /^1[3|4|5|6|9|8|7]\d{9}$/;
        var error_txt = "请输入11位数字";
        validate_form(0,$('#link_phone'),reg,error_txt);
    });

    $('#link_mobile').blur(function(){
        // var reg = /^((\d{7,8})|(\d{4}|\d{3})(\d{7,8})|(\d{4}|\d{3})(\d{7,8})(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})(\d{4}|\d{3}|\d{2}|\d{1}))$/;
        var reg = /^$|(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+((\-[0-9]{1,6})|(\([0-9]{1,6}\))|(\（[0-9]{1,6}\）))?$/;
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

//选择城市
function selectCity (flag) {
    var btn = $('.select_city_input');
    btn.off('click').on('click', function () {
        $('.province_city_box .title').html('选择可抵押城市');
        if (flag == 1) {//编辑回显
            var select_province_ids = $('.select_province_ids');
            var pro_ids = select_province_ids.val();
            var select_city_ids = $('.select_city_ids');
            var citys_ids = select_city_ids.val();
            if (pro_ids && citys_ids) {
                //先选中城市
                if (citys_ids.indexOf(',') != -1) {
                    var city_id_arr = citys_ids.split(',');
                    for (var i = 0, len = city_id_arr.length;i < len;i++) {
                        if (i == 0) {
                            $('.city #'+city_id_arr[i]).parents('.city_box').addClass('display');
                        }
                        $('.city #'+city_id_arr[i]).siblings('label').addClass('checked');
                    }
                } else {
                    $('.city #'+citys_ids).siblings('label').addClass('checked');
                    $('.city #'+citys_ids).parents('.city_box').addClass('display')
                }
                //再选择省市
                if (pro_ids.indexOf(',') != -1) {
                    var pro_ids_arr = pro_ids.split(',');
                    for (var i = 0, len = pro_ids_arr.length;i < len;i++) {
                        var cur_city = $('.city').find('#' + pro_ids_arr[i]).find('label');
                        var sel_city_num = 0;
                        if (cur_city.length == 1) {
                            if(cur_city.hasClass('checked')){
                                sel_city_num++;
                            }
                        } else {
                            for (var j = 0, lens = cur_city.length;j < lens;j++) {
                                if(cur_city[j].className == 'checked'){
                                    sel_city_num++;
                                }
                            }
                        }
                        $('#'+pro_ids_arr[i]).siblings('label').attr('class','');
                        if (sel_city_num == cur_city.length) {
                            $('#'+pro_ids_arr[i]).siblings('label').addClass('checked');
                        } else {
                            $('#'+pro_ids_arr[i]).siblings('label').addClass('checked part');
                        }
                        if (i == 0) {
                            $('#' + pro_ids_arr[i]).parents('.province_ul_li').addClass('select_pro');
                        }
                    }
                } else {
                    var cur_city = $('#' + pro_ids).find('label');
                    var sel_city_num = 0;
                    for (var i = 0, len = cur_city.length;i < len;i++) {
                        if(cur_city[i].hasClass('checked')){
                            sel_city_num++;
                        }
                    }
                    if (sel_city_num == cur_city.length) {
                        $('#'+pro_ids).siblings('label').addClass('checked');
                    } else {
                        $('#'+pro_ids).siblings('label').addClass('checked part');
                    }
                }
            }
        }
        $( ".province_city_box" ).css('display','block');
    });
}

//主贷人征信
function getPrincipal () {
    var principal_need = $('#principal_need');
    principal_need.off('click').on('click', function () {
        var _this = $(this)[0];
        if (_this.checked) {
            $('.borrower_credit').val(1);
        } else {
            $('.borrower_credit').val(2);
        }
    });
    var principal_noneed = $('#principal_noneed');
    principal_noneed.off('click').on('click', function () {
        var _this = $(this)[0];
        if (_this.checked) {
            $('.borrower_credit').val(2);
        } else {
            $('.borrower_credit').val(1);
        }
    });
}
//配偶征信
function getPartner () {
    var partner_need = $('#partner_need');
    partner_need.off('click').on('click', function () {
        var _this = $(this)[0];
        if (_this.checked) {
            $('.spouse_credit').val(1);
        } else {
            $('.spouse_credit').val(2);
        }
    });
    var partner_noneed = $('#partner_noneed');
    partner_noneed.off('click').on('click', function () {
        var _this = $(this)[0];
        if (_this.checked) {
            $('.spouse_credit').val(2);
        } else {
            $('.spouse_credit').val(1);
        }
    });
}
//背户情况
function getBackDoor () {
    var back_door_need = $('#back_door_need');
    back_door_need.off('click').on('click', function () {
        var _this = $(this)[0];
        if (_this.checked) {
            $('.bei_hu').val(1);
        } else {
            $('.bei_hu').val(2);
        }
    });
    var back_door_noneed = $('#back_door_noneed');
    back_door_noneed.off('click').on('click', function () {
        var _this = $(this)[0];
        if (_this.checked) {
            $('.bei_hu').val(2);
        } else {
            $('.bei_hu').val(1);
        }
    });
}

//起始—结束
function num_check(obj1,obj2,reg,error_txt1,error_txt2){
    var val1 = obj1.val();
    if(val1 != ''){
        if(!reg.test(val1)){
            obj1.parent().find('.formError').html(error_txt1);
            obj1.css('border-color','#FB2741');
            return;
        }
    }
    var val2 = obj2.val();
    if(val2 != ''){
        if(!reg.test(val2)){
            obj1.parent().find('.formError').html(error_txt1);
            obj2.css('border-color','#FB2741');
            return;
        }
        if(parseInt(val1) >= parseInt(val2)){
            obj1.parent().find('.formError').html(error_txt2);
            obj2.css('border-color','#FB2741');
            return;
        }
    }
    obj1.parent().find('.formError').html('');
    obj1.css('border-color','#ccc');
    obj2.css('border-color','#ccc');
}









