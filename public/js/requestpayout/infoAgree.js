//确认
$('#argee_sub').off("click").on("click", function(){
    //var finance_id = $('#finance_id').val();
    $('#argee_sub').attr('disabled',true);
    var url = contextPath + '/api/loan/agree';
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
                            window.location.href = contextPath + markUri + "/loan/waitList";
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