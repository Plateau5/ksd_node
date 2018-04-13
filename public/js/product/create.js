
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

    $('.radio_applyto_business').eq(0).click(function(){
        $('#ssess_desc_form').css('display','none');
        $('#carage_form').css('display','none');
    });

    $('.radio_applyto_business').eq(1).click(function(){
        $('#ssess_desc_form').css('display','block');
        $('#carage_form').css('display','block');
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
        var checked = $(this).prev().prop('checked');
        if(!checked){
            $(this).prev().prop('checked',true);
            $(this).parent().parent().parent().find('.formError').html('');
            return;
        }
        $(this).prev().prop('checked',false);
    });

    //添加首付金额
    var downpayment_arr = [];
    $('.downpayment_add_txt').click(function(){
        var num = $('.downpayment_add input').val();
        if(num == ''){
            var error = $(this).parent().parent().find('.formError').html('请填写首付金额');
            return;
        }
        var error = $(this).parent().parent().find('.formError').html();
        if(error == ''){
            var num = $('.downpayment_add input').val();
            var inner = '<div class="col-xs-10 downpayment_box"><div class="col-xs-6 downpayment_add_ready"><input type="text" class="form-control" readonly="readonly" id="" name="" value="' + num + '" /><span>元</span><span class="cursor downpayment_add_del">删除</span></div></div>';
            $('.downpayment_add').css('marginLeft',left - 5 + 'px');
            $('.downpayment_add').before(inner);
            $('.downpayment_box').css('marginLeft',left - 5 + 'px');
            $('.downpayment_box').eq(0).css('marginLeft' , '');
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
            $('.downpayment_add').css('marginLeft','-40px');
            $('input[name="downpayment_money_add"]').css('border-color','#ccc');
            $('.downpayment_add').parent().find('.formError').html('');
        }
        $('.downpayment_box').eq(0).css('marginLeft','-40px');
    });

    //添加年利率
    var rate_arr = [];
    $('.rate_add_txt').click(function(){
        var num = $('.rate_add input').val();
        if(num == ''){
            //添加当前为空时状态的提示信息
            $('.rate_add').find("input").focus().end().siblings(".e_tip_info").find(".formError").text("请先输入当前费率");
            return;
        }
        var error = $(this).parent().parent().find('.formError').html();
        if(error == ''){
            var num = $('.rate_add input').val();
            var inner = '<div class="col-xs-10 rate_box"><div class="col-xs-6 rate_add_ready"><input type="text" class="form-control interest_rate_num interest_rate_txt" readonly="readonly" id="" name="interest_rate_date" value="' + num + '" /><span>%</span><span class="cursor rate_add_del">删除</span></div></div>';
            $('.rate_add').css('marginLeft',left - 5 + 'px');
            $('.rate_add').before(inner);
            $('.rate_box').css('marginLeft',left - 5 + 'px');
            $('.rate_box').eq(0).css('marginLeft' , '');
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
            $('.rate_add').css('marginLeft','-40px');
            $('input[name="interest_rate_input"]').css('border-color','#ccc');
            $('.rate_add').parent().find('.formError').html('');
        }
        $('.rate_box').eq(0).css('marginLeft','-40px');
    });


    //添加备注
    $('.add_txt').click(function(){
        var remarks = $(this).parent().parent().find('.remarks_box').css('display');
        if(remarks == 'block'){
            return;
        }
        $(this).parent().parent().find('.remarks_box').css('display','block');
    });

    //选择所需材料
    $('#material .check_img').click(function(){
        $('#material').find('.formError').html('');
        $('.form_left').css('display','none');
    });

    //省份、城市切换
    var scroll_height = document.body.scrollHeight;
    $('.mask').css('height', scroll_height + 'px');
    $('.city').click(function(){
        outsettling_btn();
    });
    $('.city_img').click(function(){
        outsettling_btn();
    });
    //省按钮
    $('.province_btn').click(function(){
        $(this).addClass('cur_city');
        $('.city_btn').removeClass('cur_city');
        $('.box_middle_left_container').addClass('display');
        $('.box_middle_right_container').removeClass('display');
    });
    //选择省
    $('#outsettling_province').off('.click').on('click', '.check_img', function(e){
        e.preventDefault();
        e.stopPropagation();
        var id = $(this).attr('id');
        var className = $(this).attr('class');
        if(className.indexOf('icon_check') > '-1'){
            $(this).removeClass('icon_check').addClass('icon_uncheck');
            $('#outsettling_city .city_box[id="' + id + '"]').removeClass('display');
            $('#outsettling_city .city_box[id="' + id + '"]').find('.check_img').addClass('icon_uncheck');
            $('#outsettling_city .city_box[id="' + id + '"]').find('.check_img').removeClass('icon_check');

        }else{
            $(this).removeClass('icon_uncheck').addClass('icon_check');
            $('#outsettling_city .city_box[id="' + id + '"]').addClass('display');
            $('#outsettling_city .city_box[id="' + id + '"]').find('.check_img').removeClass('icon_uncheck');
            $('#outsettling_city .city_box[id="' + id + '"]').find('.check_img').addClass('icon_check');
        }
        $('#outsettling .formError').html('');
    });
    //市按钮
    $('.city_btn').click(function(){
        var province = $('.box_middle_left_container').find('.icon_check').length;
        if(province == '0'){
            $('#outsettling').find('.formError').html('请选择可抵押省份');
            return;
        }
        //显示城市
        var pro_check = $('#outsettling_province .icon_check');
        var city_display = $('#outsettling_city .city_box');
        for(var i = 0; i < pro_check.length; i++){
            var pro_id = $('#outsettling_province .icon_check').eq(i).attr('id');
            $('#outsettling_city .city_box[id=' + pro_id + ']').addClass('display');
        }
        $('#outsettling').find('.formError').html('');
        $(this).addClass('cur_city');
        $('.province_btn').removeClass('cur_city');
        $('.box_middle_right_container').addClass('display');
        $('.box_middle_left_container').removeClass('display');
    });
    //选择市
    $('#outsettling_city').off('click').on('click', '.check_img', function(e){
        e.preventDefault();
        e.stopPropagation();
        var className = $(this).attr('class');
        if(className.indexOf('icon_check') > '-1'){
            $(this).removeClass('icon_check').addClass('icon_uncheck');
        }else{
            $(this).removeClass('icon_uncheck').addClass('icon_check');
        }
        var  has_city = $(this).parent().parent().find('.icon_check').length;
        if(has_city == '0'){
            $(this).parent().parent().parent().removeClass('display');
            $(this).parent().parent().parent().find('.check_img').addClass('icon_check');
            $(this).parent().parent().parent().find('.check_img').removeClass('icon_uncheck');
            var id = $(this).parent().parent().parent().attr('id');
            var pro_check = $('#outsettling_province .icon_check');
            for(var i = 0; i < pro_check.length; i++){
                var pro_check_id = $('#outsettling_province .icon_check').eq(i).attr('id');
                if(pro_check_id = id){
                    $('#outsettling_province .check_img[id=' + id + ']').removeClass('icon_check');
                    $('#outsettling_province .check_img[id=' + id + ']').addClass('icon_uncheck');
                }
            }
        }
    });


    //取消
    $('.box_bottom_n_btn').click(function(){
        outsettling_cancel();
        $('.city').val('');
        $('#outsettling_province .check_img').removeClass('icon_check');
        $('#outsettling_province .check_img').addClass('icon_uncheck');
        $('#outsettling_city .check_img').removeClass('icon_uncheck');
        $('#outsettling_city .check_img').addClass('icon_check');
        $('#outsettling_city .city_box').removeClass('display');
    });

    $('.mask').click(function(){
        outsettling_cancel();
        $('.city').val('');
        $('#outsettling_province .check_img').removeClass('icon_check');
        $('#outsettling_province .check_img').addClass('icon_uncheck');
        $('#outsettling_city .check_img').removeClass('icon_uncheck');
        $('#outsettling_city .check_img').addClass('icon_check');
        $('#outsettling_city .city_box').removeClass('display');
    });

    //确定
    $('.box_bottom_y_btn').click(function(){
        outsettling_cancel();
        if($('#outsettling_province .icon_check').length == '0'){
            $('.city').val('');
            $('#outsettling_city .check_img').addClass('icon_check');
            $('#outsettling_city .check_img').removeClass('icon_uncheck');
            return;
        }
        var pro_txt = $('#outsettling_province .icon_check').eq(0).next().text();
        var pro_length = $('#outsettling_province .icon_check').length;
        var pro_input = pro_txt + '等' + pro_length + '个省份';
        $('.city').val(pro_input);
    });


    //表单校验
    $('#name').blur(function(){
        var reg = /^[\u4E00-\u9FA5\w]+$/;
        var error_txt = '产品名称不能包含特殊字符';
        validate_form(1,$('#name'),reg,error_txt);
    });

    $('input[type="radio"]').click(function(){
        $(this).prop('checked',true);
        $(this).parent().parent().parent().parent().find('.formError').html('');
    });

    $('.check_img').click(function(){
        $(this).parent().parent().parent().parent().find('.formError').html('');
    });

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

    $('#age_start').blur(function(){
        var val1 = $(this).val();
        var val2 = $('#age_end').val();
        if(val1 == '' && val2 == ''){
            $(this).parent().parent().find('.formError').html('');
            $(this).css('border-color','#ccc');
            return;
        }
        if(parseInt(val1) < 18){
            $(this).parent().parent().find('.formError').html('年龄不能低于18岁');
            $(this).css('border-color','#FB2741');
            return;
        }
        if(parseInt(val2) > 65){
            $(this).parent().parent().find('.formError').html('年龄不能高于65岁');
            $(this).css('border-color','#FB2741');
            return;
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
            $(this).parent().parent().find('.formError').html('');
            $(this).css('border-color','#ccc');
            return;
        }
        if(parseInt(val2) < 18){
            $(this).parent().parent().find('.formError').html('年龄不能低于18岁');
            $(this).css('border-color','#FB2741');
            return;
        }
        if(parseInt(val1) > 65){
            $(this).parent().parent().find('.formError').html('年龄不能高于65岁');
            $(this).css('border-color','#FB2741');
            return;
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
            $(this).parent().parent().find('.formError').html('');
            $(this).css('border-color','#ccc');
            return;
        }
        if(parseFloat(val1) < 0.5 || parseFloat(val2) < 0.5){
            $(this).parent().parent().find('.formError').html('车龄不能低于0.5年');
            $(this).css('border-color','#FB2741');
            return;
        }
        if(parseFloat(val1) > 15 ||parseFloat(val2) > 15){
            $(this).parent().parent().find('.formError').html('车龄不能超过15年');
            $(this).css('border-color','#FB2741');
            return;
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
            $(this).parent().parent().find('.formError').html('');
            $(this).css('border-color','#ccc');
            return;
        }
        if(parseFloat(val1) < 0.5 || parseFloat(val2) < 0.5){
            $(this).parent().parent().find('.formError').html('车龄不能低于0.5年');
            $(this).css('border-color','#FB2741');
            return;
        }
        if(parseFloat(val1) > 15 || parseFloat(val2) > 15){
            $(this).parent().parent().find('.formError').html('车龄不能超过15年');
            $(this).css('border-color','#FB2741');
            return;
        }
        var reg = /^[\d]+(\.\d)?$/;
        var error_txt1 = '请输入正确的车龄数';
        var error_txt2 = '请输入正确的车龄范围';
        num_check($('#carage_start'),$('#carage_end'),reg,error_txt1,error_txt2);
    });

   //发布成功确定
    $('#delSBtn').click(function(){
        $('#delS').css('display','none');
        $('.bg_mask').css('display' , 'none');
        var val = $('#url_flag').val();
        if(val == '0'){
            //window.location.href = contextPath+"/product/warehouseList";
            locationTo({
                action : contextPath+ markUri + "/supplier/organization/unpublishedProducts",
                param : {
                    parent_id : PARENTID
                }
            });
        }else{
            //window.location.href = contextPath+"/product/publishList";
            locationTo({
                // action : contextPath+"/product/publishList",
                action : contextPath + markUri + "/supplier/organization/publishedProducts",
                param : {
                    parent_id : PARENTID
                }
            });
        }
    });

    $('.bg_mask').click(function(){
        $('#delS').css('display','none');
        $('.bg_mask').css('display' , 'none');
    })




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

//从小到大排序
function num_sort(arr){
    var arr = arr;
    for(var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                var tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;
            }
        }
    }
    return arr;
}

//取消可抵押城市选择
function outsettling_cancel(){
    $('.select_city_box').removeClass('display');
    $('.mask').css('display', 'none');
    $('#outsettling_province').addClass('display');
    $('#outsettling_city').removeClass('display');
    $('.province_btn').addClass('cur_city');
    $('.city_btn').removeClass('cur_city');
}

//选择省市按钮
function outsettling_btn(){
    $('.select_city_box').addClass('display');
    $('.mask').css('display', 'block');
}


//按钮操作
function send_product_form(url,save){
    $('#add_btn_y').attr('disabled',true);
    $('#add_btn_n').attr('disabled',true);
    var name = $('#name').val();
    if(!name){
        $('#name').parent().parent().find('.formError').html('产品名称不能为空');
        $('#name').css('border-color','#FB2741');
        $('#add_btn_y').attr('disabled',false);
        $('#add_btn_n').attr('disabled',false);
        return;
    }
    //适用业务
    var applyto_business1 = $('#applyto_business input').eq(0).prop('checked');
    var applyto_business2 = $('#applyto_business input').eq(1).prop('checked');
    if(!applyto_business1 && !applyto_business2){
        $('#applyto_business').find('.formError').html('请选择产品的适用业务');
        $('#add_btn_y').attr('disabled',false);
        $('#add_btn_n').attr('disabled',false);
        return;
    }
    /*//所属机构
    var parent_id = $('#parent_id').val();
    if(parent_id == '-1'){
        $('#parent_id').parent().parent().find('.formError').html('请选择产品所属机构');
        $('#add_btn_y').attr('disabled',false);
        $('#add_btn_n').attr('disabled',false);
        return;
    }*/
    //适用城市
    if (!TYPE) {
        var applyto_city  = $('#applyto_city input[name="applyto_city"]:checked ').val();
        if(!applyto_city){
            $('#applyto_city').find('.formError').html('请选择适用城市');
            $('#add_btn_y').attr('disabled',false);
            $('#add_btn_n').attr('disabled',false);
            return;
        }
    }
    if (TYPE) {
        var cityIds = [];
        var citys = $('#cityIdsCont .icon_check');
        for(var i = 0; i < citys.length; i++){
            var text = $.trim($('#cityIdsCont .icon_check').eq(i).parents('.check').data('id'));
            cityIds.push(text);
        }
        $('input[name="city_ids"]').val(cityIds.join(','));
        if(cityIds.length == 0){
            $('#applyto_city').find('.formError').html('请选择适用城市');
            $('#add_btn_y').attr('disabled',false);
            $('#add_btn_n').attr('disabled',false);
            return;
        }
    }

    //首付金额
    var downpayment_add_ready = $('.downpayment_add_ready');
    var downpayment_money_arr = [];
    for(var i = 0; i < downpayment_add_ready.length; i++){
        var val = downpayment_add_ready.eq(i).find('input').val();
        downpayment_money_arr.push(val);
    }
    var downpayment_add = $('.downpayment_add input').val();
    if(downpayment_add != ''){
        downpayment_money_arr.push(downpayment_add);
    }
    $('#downpayment_money').val(downpayment_money_arr.join(','));
    //首付比例
    var downpayment_rate_arr_obj = $('#downpayment_rate').parent().find('.icon_check');
    var downpayment_rate_arr = [];
    for(var i = 0; i < downpayment_rate_arr_obj.length; i++){
        var num = $('#downpayment_rate').parent().find('.icon_check').eq(i).parent().find('.downpayment_rate_date').html();
        downpayment_rate_arr.push(num);
    }
    $('#downpayment_rate').val(downpayment_rate_arr.join(','));
    //产品特点
    var special_check = $('#special .icon_check');
    var special_arr = [];
    for(var i = 0; i < special_check.length; i++){
        var special_txt = $('#special .icon_check').eq(i).next().text();
        special_arr.push(special_txt);
    }
    $('input[name="special"]').val(special_arr.join(','));
    //年利率
    var  interest_rate_num = $('.interest_rate_txt');
    var  interest_rate_arr = [];
    for(var i = 0; i <  interest_rate_num.length; i++){
        var num = $('.interest_rate_txt').eq(i).val();
        if(num != ''){
            interest_rate_arr.push(parseFloat(num));
        }
    }
    num_sort(interest_rate_arr);
    $('#interest_rate').val(interest_rate_arr.join(","));
    //融资期限
    var term_arr = [];
    var term = $('#term .icon_check');
    for(var i = 0; i < term.length; i++){
        var text = $('#term .icon_check').eq(i).next().text();
        term_arr.push(text);
    }
    $('input[name="term"]').val(term_arr.join(','));
    //附加可融项目
    var addition_finance_arr = [];
    var addition_finance = $('#addition_finance .icon_check');
    for(var i = 0; i < addition_finance.length; i++){
        var id = $('#addition_finance .icon_check').eq(i).next().text();
        addition_finance_arr.push(id);
    }
    $('input[name="addition_finance"]').val(addition_finance_arr.join(','));
    //所需材料
    var material_arr = [];
    var check = $('#material .icon_check');
    if(check.length != '0'){
        for(var i = 0; i < check.length; i++){
            var id = $('#material .icon_check').eq(i).attr('id');
            material_arr.push(id);
        }
        num_sort(material_arr);
        var material_str = material_arr.join(",");
        $('input[name="material"]').val(material_str);
    }
    //可抵押省
    var pro_arr = [];
    var pro = $('#outsettling_province .icon_check');
    for(var i = 0; i < pro.length; i++){
        var id = $('#outsettling_province .icon_check').eq(i).attr('id');
        pro_arr.push(id);
    }
    $('input[name="outsettling_province"]').val(pro_arr.join(','));
    //抵押市
    var city_arr = [];
    var city = $('#outsettling_city .display');
    for(var j = 0; j < city.length; j++){
        var city_check = $('#outsettling_city .display').eq(j).find('.icon_check');
        for(var k = 0; k < city_check.length; k++){
            var id = $('#outsettling_city .display').eq(j).find('.icon_check').eq(k).attr('id');
            city_arr.push(id);
        }
    }
    $('input[name="outsettling_city"]').val(city_arr.join(','));

    //车龄限制
    var carage_start = $('#carage_start').val();
    var carage_end = $('#carage_end').val();
    if((carage_start != '' && carage_end == '') || (carage_start == '' && carage_end != '')){
        $('#carage_start').parent().parent().find('.formError').html('请输入正确的车龄范围');
        $('#carage_start').css('border-color','#FB2741');
        $('#add_btn_y').attr('disabled',false);
        $('#add_btn_n').attr('disabled',false);
        return;
    }

    //融资金额范围
    var financeamount_start = $('#financeamount_start').val();
    var financeamount_end = $('#financeamount_end').val();
    if((financeamount_start == '' && financeamount_end != '') || (financeamount_start != '' && financeamount_end == '')){
        $('#financeamount_start').parent().parent().find('.formError').html('请输入正确的金额范围');
        $('#financeamount_start').css('border-color','#FB2741');
        $('#add_btn_y').attr('disabled',false);
        $('#add_btn_n').attr('disabled',false);
        return;
    }

    //年龄范围
    var age_start = $('#age_start').val();
    var age_end = $('#age_end').val();
    if((age_start == '' && age_end != '') || (age_start != '' && age_end == '')){
        $('#age_start').parent().parent().find('.formError').html('请输入正确的年龄范围');
        $('#age_start').css('border-color','#FB2741');
        $('#add_btn_y').attr('disabled',false);
        $('#add_btn_n').attr('disabled',false);
        return;
    }

    if(save == '1'){
        //有无错误提示
        var str = '';
        var formError = $('.formError');
        for(var i = 0; i < formError.length; i++){
            var text = $('.formError').eq(i).text();
            str += text;
        }
        if(str != ''){
            $('#add_btn_y').attr('disabled',false);
            $('#add_btn_n').attr('disabled',false);
            return;
        }

        //首付类型
        var downpayment_select = $('#downpayment_select').val();
        if(downpayment_select == '-1'){
            $('#downpayment_select').parent().parent().find('.formError').html('请选择首付类型');
            $('#add_btn_y').attr('disabled',false);
            $('#add_btn_n').attr('disabled',false);
            return;
        }
        //首付金额
        var downpayment_select = $('#downpayment_select').val();
        if((downpayment_select == '2') && (downpayment_money_arr.length == 0)){{
            $('.downpayment_add').next().find('.formError').html('请输入首付金额');
            $('#add_btn_y').attr('disabled',false);
            $('#add_btn_n').attr('disabled',false);
               return;
        }}
        if(downpayment_select == '2'){
            $('input[name="downpayment_rate"]').val('');
        }
        //首付比例
        if((downpayment_select == '1') && (downpayment_rate_arr.length == 0)){
            $('.downpayment_rate').find('.formError').html('请选择首付比例');
            $('#add_btn_y').attr('disabled',false);
            $('#add_btn_n').attr('disabled',false);
            return;
        }
        if(downpayment_select == '1'){
            $('input[name="downpayment_money"]').val('');
        }


        //年利率
        if(interest_rate_arr.length == '0'){
            $('#interest_rate').parent().find('.formError').html('费率不能为空');
            $('input[name="interest_rate_input"]').css('border-color','#FB2741');
            $('#add_btn_y').attr('disabled',false);
            $('#add_btn_n').attr('disabled',false);
            return;
        }

        //融资金额范围
        if(financeamount_start == ''){
            $('#financeamount_start').parent().parent().find('.formError').html('请输入正确的金额范围');
            $('#financeamount_start').css('border-color','#FB2741');
            $('#add_btn_y').attr('disabled',false);
            $('#add_btn_n').attr('disabled',false);
            return;
        }
        if(financeamount_end == ''){
            $('#financeamount_start').parent().parent().find('.formError').html('请输入正确的金额范围');
            $('#financeamount_end').css('border-color','#FB2741');
            $('#add_btn_y').attr('disabled',false);
            $('#add_btn_n').attr('disabled',false);
            return;
        }
        if(financeamount_start == '' && financeamount_end == ''){
            $('#financeamount_start').parent().parent().find('.formError').html('请输入正确的金额范围');
            $('#financeamount_start').css('border-color','#FB2741');
            $('#financeamount_end').css('border-color','#FB2741');
            $('#add_btn_y').attr('disabled',false);
            $('#add_btn_n').attr('disabled',false);
            return;
        }
        //分期范围
        if(term.length == '0'){
            $('#term').find('.formError').html('请选择分期范围');
            $('#add_btn_y').attr('disabled',false);
            $('#add_btn_n').attr('disabled',false);
            return;
        }

        //所需材料
        if(check.length == '0'){
            $('#material').find('.formError').html('请选择所需材料');
            $('.form_left').css('display','block');
            $('#add_btn_y').attr('disabled',false);
            $('#add_btn_n').attr('disabled',false);
            return;
        }

        //车龄限制
        var have_carage = $('#carage_form').css('display');
        if(have_carage == 'block'){
            if(carage_start == ''){
                $('#carage_start').parent().parent().find('.formError').html('请输入正确的车龄范围');
                $('#carage_start').css('border-color','#FB2741');
                $('#add_btn_y').attr('disabled',false);
                $('#add_btn_n').attr('disabled',false);
                return;
            }
            if(carage_end == ''){
                $('#carage_start').parent().parent().find('.formError').html('请输入正确的车龄范围');
                $('#financeamount_end').css('border-color','#FB2741');
                $('#add_btn_y').attr('disabled',false);
                $('#add_btn_n').attr('disabled',false);
                return;
            }
            if(carage_start == '' && carage_end == ''){
                $('#carage_start').parent().parent().find('.formError').html('请输入正确的车龄范围');
                $('#carage_start').css('border-color','#FB2741');
                $('#carage_end').css('border-color','#FB2741');
                $('#add_btn_y').attr('disabled',false);
                $('#add_btn_n').attr('disabled',false);
                return;
            }
        }
    }
    var vFD = new FormData(document.getElementById('product_info_create'));
    var oXHR = new XMLHttpRequest();
    oXHR.addEventListener('load', function(e) {
        var response = e.target.responseText;
        var data = JSON.parse(response);
        //成功
        if (data.error_code == '0') {
            var h = document.body.scrollHeight;
            $('#delS').css('display','block');
            $('.bg_mask').css({
                'display' : 'block',
                'height' : h + 'px'
            });
            $(".formProm").html("");
            $(".formError").html("");
            $(".trueImg").css("display","");
        } else {
            alert(data.error_msg);
        }
        $('#add_btn_y').attr('disabled',false);
        $('#add_btn_n').attr('disabled',false);

    }, false);
    oXHR.addEventListener('error', function(e) {
        alert("输入参数异常");
        return;
    }, false);
    oXHR.addEventListener('abort', function() {}, false);
    oXHR.open('POST', url);
    oXHR.send(vFD);
}
