var RESETPHOTO = false;
//上传图片按钮的点击事件
function uploadPhoto (ele) {
    ele.off("click").on("click", function () {
        $("#upload_photo_file").click();
    });
}
//重新上传图片
uploadPhoto($(".choose_img"));
//选择图片后的事件
$("#upload_photo_file").on('change', function () {
    var file = this.files[0];
    var file_type = file.type.split('/')[1];
    if (file_type == 'jpg' || file_type == 'jpeg' || file_type == 'png' || file_type == 'gif') {

    } else {
        $alert('上传的图片格式不正确，仅支持JPG、PNG、GIF图片文件');
        return;
    }
    var file_size5M = 1024*1024*5;//5M
    if (file.size > file_size5M) {
        $alert('上传的图片大小不可大于5M');
        return;
    }
    var reader = new FileReader();
    //reader回调，重新初始裁剪区
    reader.onload = function(){
        // 通过 reader.result 来访问生成的 DataURL
        var url = reader.result;
        //选择图片后重新初始裁剪区
        $(".large_photo>img").cropper('reset', true).cropper('replace', url);
    };
    reader.readAsDataURL(file);
    $('#upload_photo_dialog').show();
    $(".mask").show();
});
//取消按钮的点击事件
$(".btn_box .cancel_upload").off("click").on("click", function () {
    $("#upload_photo_file").val('');
    $('#upload_photo_dialog').hide();
    $(".mask").hide();
});
//确定按钮的点击事件
$(".btn_box .submit_upload").off("click").on("click", function () {
    var _this = $(this);
    $("#upload_photo_file").val('');
    $('#upload_photo_dialog').hide();
    $(".mask").hide();
    if ($('.upload_btn_mask').length != 0) {
        $('.upload_btn_mask').show();
    }
    var canVas = $(".large_photo>img").cropper("getCroppedCanvas", {});
    //将裁剪的图片加载到face_image
    $('#user_photo').attr('src', canVas.toDataURL());
    RESETPHOTO = true;
    var file = $('#user_photo').attr("src").slice(22);
    if (file == '') {
        $('.teacher_img').val('');
        if (_this.hasClass('course_icon')) {
            $('#user_photo').attr('src','/ksd/static/img/create_course.png');
            $('.upload_btn_mask').hide();
        } else {
            $('#user_photo').attr('src','/ksd/static/img/personIcon.png');
        }
        return false;
    }
    var form = new FormData();
    form.append('file',file);
    $.ajax({
        type:'post',
        timeout:20000,
        url : contextPath + "/api/file/base64/upload",
        data : form,
        processData : false,
        contentType :false,
        beforeSend : function () {
            $('#loading').show();
        },
        success : function (res) {
            $('#loading').hide();
            if (res.error_code == 0) {
                $('.teacher_img').val(res.data[0].image_url);
            } else {
                $alert(res.error_msg);
            }
        },
        error : function () {
            $('#loading').hide();
            $alert("上传失败，请稍后重试");
        }
    });
});
