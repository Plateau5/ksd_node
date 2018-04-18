
function sub_btn(url,data,btn,location_url,callback) {
    $.ajax({
        type: "post",
        url: url,
        dataType: "json",
        async: false,
        data: data,
        error: function (xhr, status, err) {
            alert("系统异常");
        },
        success: function (data) {
            if (data.error_code == '0') {
                if (location_url !== '') {
                    window.location.href = location_url;
                } else {
                    callback && callback();
                }
            } else {
                alert(data.error_msg);
            }
            // btn.attr('disabled', false);
        }
    });
}