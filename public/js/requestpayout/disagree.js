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

//动态获取问题列表
/*$('#question_classify_name').change(function(){
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
});*/

//消除错误提示
$('#remark').focus(function(){
    $('.error').text('');
});
$('#remark').blur(function(){
    var text = $(this).val();
    if(!text){
        $('.error').text('备注框不能为空');
    }else{
        $('.error').text('');
    }
});

//删除图片
/*$(document).delegate('.del_img_item', 'click', function(e) {
    e.preventDefault();
    var num = $(this).attr('data_num');
    $('#file_select' + parseInt(num - 1)).remove();
    $(this).parent().parent().remove();
    var inner = '<input type="file" class="cursor file_input" id="file_select' + parseInt(num - 1) + '" name="file" onchange="select_allow(this);"  accept="image/jpeg,image/jpg,image/png"/>';
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


// 上传图片按钮
$('input[type="file"]').hover(function() {
    $('.file_btn').css('color', '#1DC6BC');
    $('.file_btn').css('background', 'url(/static/img/question/upload_icon_hover.png) left center no-repeat');
}, function() {
    $('.file_btn').css('color', '#333');
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


//确认
$('#disagree_sub').click(function() {
    $('#disagree_sub').attr('disabled', true);
    var localUrl = $(this).attr("data-url");
    // OPERATIONTYPE：1：请款客服；2：合同客服；3：商户审核
    if (OPERATIONTYPE === 2) {
        var url = contextPath + '/api/compact/disagree';
    } else if (OPERATIONTYPE === 1) {
        var url = contextPath + '/api/requestPayout/disagree';
    } else if (OPERATIONTYPE === 3) {
        var url = contextPath + '/api/supplier/records/check';
    }
    var check_obj = $('.icon_check');
    var question_id_arr = [];
    var reason_arr = [];
    for (var i = 0; i < check_obj.length; i++) {
        var check_id = check_obj.eq(i).attr('data_id');
        var check_inner = check_obj.eq(i).next().html();
        question_id_arr.push(check_id);
        reason_arr.push(check_inner);
    }
    if (question_id_arr.length == 0) {
        $('.error_prom').text('(请先选择问题详情)');
        $('#disagree_sub').attr('disabled', false);
        return;
    } else {
        $('.error_prom').text('');
    }
    $('#select_question_ids').val(question_id_arr.join(','));
    $('#select_reason').val(reason_arr.join(','));
    var vFD = new FormData(document.getElementById('select_info'));
    var oXHR = new XMLHttpRequest();
    oXHR.addEventListener('load', function(e) {
        var response = e.target.responseText;
        var data = JSON.parse(response);
        //成功
        if (data.error_code == '0') {
            //window.location.href = contextPath + '/requestPayout/waitList';
            $alert('提交成功', function (){
                window.location.href = localUrl;
            });
        } else {
            $alert(data.error_msg);
        }

    }, false);
    oXHR.addEventListener('error', function(e) {
        alert("输入参数异常");
        return;
    }, false);
    oXHR.addEventListener('abort', function() {}, false);
    oXHR.open('POST', url);
    oXHR.send(vFD);
    $('#disagree_sub').attr('disabled', false);
});

    //输入提交
    $("#sendBtn").off("click").on("click", function(){
        var _this = $(this);
        $("#sendBtn").attr('disabled',true);
        var localUrl = $.trim($(this).attr("data-url"));
        var remark = $.trim($('#remark').val());
        var advance_id = $.trim(_this.data('advance_id'));
        if(!remark){
            $("#sendBtn").attr('disabled',false);
            $('.error').text('备注不能为空');
            return;
        }
        $('.error').text('');
        var url = contextPath + "/api/requestPayout/disagree";
        var vFD = new FormData(document.getElementById('send_info'));
        var oXHR = new XMLHttpRequest();
        oXHR.addEventListener('load', function(e) {
            var response = e.target.responseText;
            var data = JSON.parse(response);
            //成功
            if (data.error_code == '0') {
                //window.location.href = contextPath + '/requestPayout/waitList'
                window.location.href = localUrl;
            } else {
                alert(data.error_msg);
            }

        }, false);
        oXHR.addEventListener('error', function(e) {
            alert("输入参数异常");
            return;
        }, false);
        oXHR.addEventListener('abort', function() {}, false);
        oXHR.open('POST', url);
        oXHR.send(vFD);
        $("#sendBtn").attr('disabled',false);
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
    var extname = (filepath.substring(filepath.lastIndexOf(".") + 1,filepath.length)).toLocaleLowerCase();
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