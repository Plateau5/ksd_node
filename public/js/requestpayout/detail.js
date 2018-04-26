
$(function(){
    //var locationUrl = contextPath + "/requestPayout/waitList";
    var document_h = document.body.scrollHeight;
    $('.bgmask').css('height',document_h + 'px');

    //布局
    /*var length = $('.requestpayout_detail_remarks').length;
    for(var i = 0;i < length;i++){
        var height = $('.requestpayout_detail_txt').eq(i).height();
        if (height == 0) {
            $('.requestpayout_detail_label').eq(i).hide();
            $('.requestpayout_detail_remarks').eq(i).hide();
        }
        $('.requestpayout_detail_label').eq(i).css('height',height + 'px');
        $('.requestpayout_detail_remarks').eq(i).css('height',height + 'px');
    }*/

    var a = $(".gathering_info").siblings(".gathering_info_item");
    if (a.length == 0) {
        $(".gathering_info").hide();
    }
    var b = $(".payment_desc").siblings(".payment_desc_item");
    if (b.length == 0) {
        $(".payment_desc").hide();
    }
    var c = $(".payment_info").siblings(".payment_info_item");
    if (c.length == 0) {
        $(".payment_info").hide();
    }

    //期限提醒弹层
    $('#term_btn').on('click',function(){
        $('.bgmask').css('display','block');
        $('#term_container').css('display','block');
    });
    //确认归档弹层
    $('#flied_btn').on('click',function(){
        $('.bgmask').css('display','block');
        $('#flied_container').css('display','block');
    });

    //转交他人弹层
    /*$('#care_btn').on('click',function(){
        $('.bgmask').css('display','block');
        $('#care_container').css('display','block');
    });*/


    //关闭弹层
    function cancel_bg(){
        $('.bgmask').css('display','none');
        $('#term_container').css('display','none');
        $('#flied_container').css('display','none');
        $('#care_container').css('display','none');
    }
    $('.cancel_btn').on('click',function(){
        cancel_bg();
    });
    $('.bgmask').on('click',function(){
        cancel_bg();
    });

    //弹层操作
    function sub_btn(url, data, btn, locationUrl){
        $.ajax({
            type:"post",
            url :url,
            dataType:"json",
            async:false,
            data:data,
            error:function(xhr,status,err){
                $('#term_sub').attr('disabled',false);
                alert("系统异常");
            },
            success:function(data){
                if(data.error_code =='0'){
                    cancel_bg();
                    if(locationUrl) {
                        window.location.href = locationUrl;
                    }
                }else{
                    alert(data.error_msg);
                }
                btn.attr('disabled',false);

            }
        });
    }

    //期限提醒
    $('#term_sub').on('click',function(){
        var _this = $(this);
        var advance_id = $.trim(_this.data('advance_id'));
        var locationUrl = $(this).attr("data-url");
        $('#term_sub').attr('disabled',true);
        var url=contextPath + "/api/requestPayout/overdue";
        var finance_id = $('#finance_id').val();
        var day = $.trim($('#day').text());
        var data = {
            finance_id:finance_id,
            day:day,
            advance_id : advance_id
        };
        sub_btn(url, data, $('#term_sub'), locationUrl);//添加跳转
    });

    //确认归档
    $('#flied_sub').on('click',function(){
        var _this = $(this);
        var advance_id = $.trim(_this.data('advance_id'));
        var locationUrl = $(this).attr("data-url");
        $('#flied_sub').attr('disabled',true);
        var url=contextPath + "/api/requestPayout/pigeonhole";
        var finance_id = $('#finance_id').val();
        var data = {
            finance_id:finance_id,
            advance_id : advance_id
        };
        sub_btn(url, data, $('#flied_sub'), locationUrl);
    });

    //转交他人
    $('#care_sub').on('click',function(){
        var locationUrl = $(this).attr("data-url");
        $('#care_sub').attr('disabled',true);
        var url=contextPath + "/api/requestPayout/turnover";
        var finance_id = $('#finance_id').val();
        var advance_id = $('#care_sub').data('advance_id');
        var request_status = $('#request_status').val();
        var emp_id = $('#emp_id').val();
        if(emp_id == '0'){
            $('#care_sub').attr('disabled',false);
            alert('请选择转交人');
            return;
        }
        var data = {
            finance_id : finance_id,
            request_status : request_status,
            emp_id : emp_id,
            advance_id : advance_id
        };
        sub_btn(url, data, $('#care_sub'), locationUrl);
    });
    bindEvents("click", ".affirm_return_money", function (e) {
        var financeId = $(e.target).attr("lang");
        var advance_id = $(e.target).data("advance_id");
        dialog("open", {
            closeBtn : false,
            "title" : "确认回款",
            "button" : ["确认","取消"],
            "content" : "您确认将此订单已回款？",
            onConfirm : function (dia) {
                affirmReturnedMoney(dia, financeId, advance_id);
            }
        });
    });
    //确认回款逻辑
    function affirmReturnedMoney (dialog, fid, advance_id) {
        var url = contextPath + "/api/financial/return";
        var data = {
            finance_id : fid,
            advance_id : advance_id
        };
        if (fid) {
            $ajax("POST", url, data, function (res) {
                var data = eval(res);
                if (data.error_code == 0) {
                    dialog.close();
                    //window.location.href = document.referrer;
                    window.location.href = contextPath + markUri + "/customer/financial/pendingReturn";
                } else {
                    dialog.close();
                    $alert(res.error_msg);
                }
            }, function () {
                $alert("操作失败，请重新尝试");
            });
        }
    }
    affirmReturnedMoney();

});