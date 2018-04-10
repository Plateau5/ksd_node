
$(function(){

    //判断是否为仓库中产品
    var judge_val = $('#judge').val();
    if(judge_val == '1'){
        $('.header_right').css('display','none');
        $('a[class="TS"]').click(function(){
            //window.location.href=contextPath+"/product/warehouseList";
            var parentId = $.trim($(this).data("id"));
            locationTo({
                action : contextPath + markUri + "/supplier/organization/unpublishedProducts",
                param : {
                    parent_id : parentId
                }
            });
        });
    }else{
        $('a[class="TS"]').click(function(){
            //window.location.href=contextPath+"/product/publishList";
            var parentId = $.trim($(this).data("id"));
            locationTo({
                // action : contextPath + "/product/publishList",
                action : contextPath + markUri + "/supplier/organization/publishedProducts",
                param : {
                    parent_id : parentId
                }
            });
        });
    }

    //弹出备注框
    $('.icon_remarks').click(function(){
        var inner_txt = $(this).prev().val();
        $('.detail_remarks_txt').html(inner_txt);
        var bg_h = document.body.scrollHeight;
        $('.bg_mask').css({
            'height' : bg_h + 'px',
            'display' : 'block'
        });
        $('#detail_remarks_box').css('display' , 'block');
        var detail_remarks_h =  $('.detail_remarks_txt').height() + 120;
        $('#detail_remarks_box').css('height' , detail_remarks_h + 'px');
    });

    //关闭备注框
    $('.bg_mask').click(function(){
        $('.bg_mask').css('display','none');
        $('#detail_remarks_box').css('display','none');
    });
    $('.detail_remarks_close').click(function(){
        $('.bg_mask').css('display','none');
        $('#detail_remarks_box').css('display','none');
    });

    //评估描述隐藏判断
    var old_car = $('.header_txt_bottom2').length;
    if(old_car == '0'){
        $('#assess_desc_box').css('display','none');
        $('#carage_box').css('display','none');
    }else{
        $('#assess_desc_box').css('display','block');
        $('#carage_box').css('display','block');
    }

    //比例隐藏域
    var downpayment_data = $('.downpayment_data .date_num2').length;
    var downpayment_data_width = (downpayment_data * 40) + (downpayment_data + 1) * 10 + 2;
    $('.downpayment_data').css('width',downpayment_data_width + 'px');

    //年利率隐藏域
    var interest_data = $('.interest_data .date_num2').length;
    var interest_data_width = (interest_data * 40) + (interest_data + 1) * 10 + 2;
    $('.interest_data').css('width',interest_data_width + 'px');


    var width = $('.product_detail_date').width();

    //隐藏域居中
    var downpayment_data_width = $('.downpayment_data').width();
    var downpayment_data_marginL = (width - downpayment_data_width) / 2;
    $('.downpayment_data').css('marginLeft',downpayment_data_marginL + 'px');

    var interest_data_width = $('.interest_data').width();
    var interest_data_marginL = (width - interest_data_width) / 2 + width;
    $('.interest_data').css('marginLeft',interest_data_marginL + 'px');

    //多个比例、利率框
    var downpayment_data = $('.downpayment_data').length;
    if(downpayment_data != '0'){
        shape_change_txt($('#downpayment_rate_box .date_title span'));
        shape_change_img($('#downpayment_rate_box img'));
    }
    var interest_data = $('.interest_data').length;
    if(interest_data != '0') {
        shape_change_txt($('#interest_rate_box .date_title span'));
        shape_change_img($('#interest_rate_box img'));
    }
    function shape_change_txt(obj){
        obj.hover(function(){
            obj.parent().parent().next().css('display','block');
            obj.next().attr('src','/static/img/product/icon_shape_down.png');
        },function(){
            obj.parent().parent().next().css('display','none');
            obj.next().attr('src','/static/img/product/icon_shape_up.png');
        });
    }
    function shape_change_img(obj){
        obj.hover(function(){
            obj.parent().parent().next().css('display','block');
            obj.attr('src','/static/img/product/icon_shape_down.png');
        },function(){
            obj.parent().parent().next().css('display','none');
            obj.attr('src','/static/img/product/icon_shape_up.png');
        });
    }

});