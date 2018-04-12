
$(function(){

    ellipsis();

    //问题内容省略号
    function ellipsis() {
        $('.question-con').each(function(index){
            var val = $('.question-con').eq(index).html();
            var byte = getBt(val);
            if(byte >= 400){
                var new_inner = val.substring(0, 140) + "......";
                var inner = '<div class="detail-icon down-icon"></div>';
                $('.question-con').eq(index).html(new_inner);
                $('.question-con-box').append(inner);
            }
        });
    }

    //点击问题详细内容
    $('.question-con-box').off('click').on('click', '.detail-icon', function(){
        var class_name = $(this).attr('class');
        if(class_name.indexOf('down-icon') >= 0){
            var question_val = $(this).parent().find('.question-val').val();
            $('.question-con').eq(index).html(question_val);
            $(this).addClass('up-icon').removeClass('down-icon');
        }else{
            $(this).addClass('down-icon').removeClass('up-icon');
            ellipsis();
        }
    });

    //删除图片
    /*$(document).delegate('.del_img_item', 'click', function(e) {
        e.preventDefault();
        var num = $(this).attr('data_num');
        $('#file_select' + parseInt(num - 1)).remove();
        $(this).parent().parent().remove();
        var inner = '<input type="file" class="cursor file_input" id="file_select' + parseInt(num - 1) + '" name="file" onchange="select_allow(this);" accept="image/jpeg,image/jpg,image/png"/>';
        $('.img_item').append(inner);
    });*/
    var file_ids_arr = [];
    $(document).delegate('.del_img_item', 'click', function(e) {
        e.preventDefault();
        var file_item = $('.file_item');
        $(this).parents('.file_item').remove();
        var id = $(this).attr('file_id');
        if (!id) {
            //自添加
            var num = $(this).attr('data_num');
            $('#file_select' + parseInt(num - 1)).remove();
            if(file_item.length == 5){
                var div_last = $('div[class *= "file_input"]');
                var data_num = div_last.attr('id');
                div_last.remove();
                var inner = '<input type="file" class="cursor file_input" id="file_select' + parseInt(data_num.slice(11,data_num.length)) + '" name="file" onchange="select_allow(this);" accept="image/jpeg,image/jpg,image/png"/>';
                $('.img_item').append(inner);
            }
        }else{
            //原始
            file_ids_arr.push(id);
            $('#file_ids').val(file_ids_arr.join(','));
            if(file_item.length == 5){
                var div_last = $('div[class *= "file_input"]');
                var data_num = div_last.attr('id');
                div_last.remove();
                var inner = '<input type="file" class="cursor file_input" id="file_select' + parseInt(data_num.slice(11,data_num.length)) + '" name="file" onchange="select_allow(this);" accept="image/jpeg,image/jpg,image/png"/>';
                $('.img_item').append(inner);
            }
        }


    });

    //动态获取问题列表
    $('#question_classify_name').change(function(){
        var url = contextPath + "/api/getQuestionByClassifyId";
        var question_classify = $(this).val();
        var inner = '';
        $.ajax({
            type: "post",
            url: url,
            dataType: "json",
            data: {parent_id: question_classify},
            async: false,
            success: function (data) {
                $('.question_container').empty();
                if(data.data.length == 0){
                    inner = '<div class="question_container_prom">该分类暂无问题列表，请重新选择问题分类</div>';
                    $('.question_container').append(inner);
                    return;
                }
                $.each(data.data, function (n, value) {
                    inner += '<div class="question-con-box"><div class="check"><div class="check_img icon_uncheck" data_id="' + value.id + '"></div><span>' + value.value + '</span></div><input type="hidden" class="question-val" value="' + value.content +'"></div>';
                });
                $('.question_container').append(inner);
                ellipsis();
            }
        });
    });

    // 上传图片按钮
    $('input[type="file"]').hover(function() {
        $('.file_btn').css('color', '#1DC6BC');
        $('.file_btn').css('background', 'url(/static/img/question/upload_icon_hover.png) left center no-repeat');
    }, function() {
        $('.file_btn').css('color', '#535E6A');
        $('.file_btn').css('background', 'url(/static/img/question/upload_icon.png) left center no-repeat');
    });

    // 关于图片
    $(document).delegate('.file_item', 'mouseover', function(e) {
        e.stopPropagation();
        $(this).find('.file_item_txt_bg').css('display', 'block')
    });
    $(document).delegate('.file_item', 'mouseout', function(e) {
        e.stopPropagation();
        $(this).find('.file_item_txt_bg').css('display', 'none');
    });

    //通过与未通过内容显示
    $('#select_status').change(function(){
        var status = $(this).val();
        if(status == '0'){
            $('.pass').css('display','block');
            $('.unPass').css('display','none');
            $('.customer_check').css('display','block');
        }else{
            $('.pass').css('display','none');
            $('.unPass').css('display','block');
            $('.customer_check').css('display','none');
        }
        $('.form-item .file_box').empty();
    });

    $('.real_loan_amount').blur(function(){
        var val = $(this).val();
        if(!val){
            $('.loan_amount').html('请输入金额');
        }
        $('.loan_amount').html('');
    });

    //金额文本是否可输入
    $('input[type="radio"]').click(function(){
        $('.loan_amount').html('');
        var check = $('input[type="radio"]').eq(1).prop('checked');
        if(check){
            $('.real_loan_amount').removeAttr('readonly');
        }else{
            $('.real_loan_amount').val('');
            $('.real_loan_amount').attr('readonly','readonly');
        }
    });





});

var image_edit = '';
var num = 0;
function select_allow(file) {
    var length = $('.file_item').length;
    if (length == '5') {
        return;
    }
    if (length == '4') {
        var inner2 = '<div class="cursor file_input" id="file_select'
            + parseInt(num + 2) + '"></div>';
    } else {
        var inner2 = '<input type="file" class="cursor file_input" id="file_select'
            + parseInt(num + 2)
            + '" name="file" onchange="select_allow(this);" accept="image/jpeg,image/jpg,image/png"/>';
    }
    selectImage(file, inner2);
}
function selectImage(file, inner2) {
    if (!file.files || !file.files[0]) {
        return;
    }
    var filepath = file.value;
    var extname = filepath.substring(filepath.lastIndexOf(".") + 1,
        filepath.length);
    if (extname != 'jpg' && extname != 'jpeg' && extname != 'png') {
        alert('请使用正确格式的图片');
        $(this).parent().parent().parent().next().next().html("请使用正确格式的图片");
        if(file.outerHTML){
            file.outerHTML=file.outerHTML;
        } else{      //FF
            file.value="";
        }
        return;
    }
    var size = file.files[0].size;
    if (size > 5 * 1024 * 1024) {
        alert('图片大小超过5M');
        return;
    }
    num += 1;
    var name = file.files[0].name;
    var inner1 = '<div class="file_item"><img src="" alt="" class="input_img" id="img'
        + num
        + '"><div class="file_item_txt"><ul><li class="file_name">'
        + name
        + '</li><li class="file_size">'
        + (size / 1024 / 1024).toFixed(2)
        + 'M</li></ul></div><div class="file_item_txt_bg"><img src="/static/img/question/remove_icon.png" alt="" data_num="'
        + parseInt(num + 1) + '" class="cursor del_img_item"></div></div>';
    $('.file_box').append(inner1);
    $('.img_item').append(inner2);
    $('#file_select' + num).css('display', 'none');
    var reader = new FileReader();
    reader.onload = function(evt) {
        document.getElementById('img' + num).src = evt.target.result;
        image_edit = evt.target.result;
    };
    reader.readAsDataURL(file.files[0]);
}