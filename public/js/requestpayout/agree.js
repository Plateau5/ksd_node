var isFinancial = false;//判断是否为财务的标识

function strlen(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        // 单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            len++;
        } else {
            len += 2;
        }
    }
    return len;
}
// 原因框自动增高
function textarea_show(event){
    var val_length= parseInt(strlen($('#content').val())) / 102;
    var val = $('#content').val();
    var r=$('#content').val().match( /\s/gi);
    if(r){
        val_length=val_length+r.length;
    }
    var val_height = $('#content').height();
    var textarea_height = Math.floor(val_length) * 25 + 9;
    var textarea_flag;
    if(val_length <= 3){
        textarea_flag = 0;
    }else{
        textarea_flag = textarea_height;
    }
    if(textarea_height >= 300){
        $('#content').css('overflow-y','auto');
        textarea_flag = 300;
    }else{
        textarea_flag = 0;
    }
    if(textarea_flag == 0){
        $('#content').css('overflow-y','hidden');
        if(val_height > 3){
            $('#content').css('height' , textarea_height + 'px');
        }else{
            $('#content').css('height' , '86px');
        }
    }else if(textarea_flag == 300){
        $('#content').css({
            'height' : '300px',
            'overflow-y' : 'auto'
        })
    }
}

//原因内容
$('#content').focus(function() {
    $(document).off("keyup input").on("keyup input",function(event) {
        textarea_show(event);
    });
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
    e.preventDefault();
    $(this).find('.file_item_txt_bg').css('display', 'block')
});
$(document).delegate('.file_item', 'mouseout', function(e) {
    e.preventDefault();
    $(this).find('.file_item_txt_bg').css('display', 'none');
});

//删除图片
/*$(document).delegate('.del_img_item', 'click', function(e) {
    e.preventDefault();
    var num = $(this).attr('data_num');
    $('#file_select' + parseInt(num - 1)).remove();
    $(this).parent().parent().remove();
    var img_length = $('.del_img_item').length;
    if(img_length == 0){
        var inner = '<input type="file" class="cursor file_input" id="file_select' + parseInt(num - 1) + '" name="file" onchange="select_allow(this);"  accept="image/jpeg,image/jpg,image/png"/>';
        $('.img_item').append(inner);
    }

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



//确认
$('#argee_sub').off("click").on("click", function(){
	//var finance_id = $('#finance_id').val();
    $('#argee_sub').attr('disabled',true);
    var url = contextPath + '/api/requestPayout/agree';
    var vFD = new FormData(document.getElementById('request_info_agree'));
    var location_url = $.trim($(this).data("url"));

    if (isFinancial) {
        $.ajax({
            type : "post",
            url : url,
            data : vFD,
            async : true,
            processData: false,
            contentType: false,
            success : function (datas) {
                var res = eval(datas);
                if (res.error_code == "0") {
                    dialog("open", {
                        closeBtn : false,
                        "title" : "打印提醒",
                        "button" : ["立即打印","稍后再说"],
                        "content" : "是否现在打印该车请款审批材料？",
                        "maskClose" : false,
                        onConfirm : function (d) {
                            d.close();
                            window.location.replace(location_url);
                        },
                        onCancel : function (d) {
                            d.close();
                            window.location.href = contextPath + markUri + "/customer/financial/pendingAudit";
                        }
                    });
                } else {
                    alert(res.error_msg);
                    $('#argee_sub').attr('disabled',false);
                }
            },
            error : function () {
                alert("输入参数异常");
                $('#argee_sub').attr('disabled',false);
            }
        });
    } else {
        send_form(url,vFD,location_url,0,function(){
        	$('#argee_sub').attr('disabled',false);
        });
        /*$('#argee_sub').attr('disabled',false);*/
    }

});

//图片添加
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