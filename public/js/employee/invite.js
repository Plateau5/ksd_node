$(function(){
    var mailDomain = $.trim($("#mail_domain").val()).replace(/@/ig, '');
    //console.log(mailDomain);

    //按钮交互
    $("input[id='invBtnY']").hover(function(){
        $(this).css({
            "color":"#fff",
            "background":"#0B9C94"
        });
    },function(){
        $(this).css({
            "color":"#fff",
            "background":"#1DC6BC"
        });
    });

    $("input[id='invBtnN']").hover(function(){
        $(this).css({
            "color":"#fff",
            "background":"#B4B4B4"
        });
    },function(){
        $(this).css({
            "color":"#fff",
            "background":"#A0A0A0"
        });
    });

    //职务弹层
    $("#position_desc").click(function(){
        var delH = $('body').height();
        var wH=$(window).height();
        if(delH > wH){
            $("#position_back").css({
                "height" : (delH + ((wH * 40) / 100)) + "px",
                "display" : "block"
            });
            $(".position_mask").css("height",(delH + ((wH * 40) / 100)) + "px");
        }else{
            $("#position_back").css({
                "height" : (wH + ((wH * 40) / 100)) + "px",
                "display" : "block"
            });
            $(".position_mask").css("height",(wH + ((wH * 40) / 100)) + "px");
        }

        $(".tr").each(function(){
            var tr_str = $(this).find(".tr_right").css("height");
            var new_str = tr_str.substring(0,tr_str.length-1);
            $(this).css("height", parseInt(new_str)+ "px");
        });

    });

    $(".position_mask").click(function(){
        $("#position_back").css("display","none");
    });

    $(".tr_right>span").on("click",function(){
        $("#position_back").css("display","none");
        var html1 = $.trim($(this).parent().prev().html());
        var position_parent_id = $(this).parent().prev().attr("lang");
        var html2 = $.trim($(this).html());
        var position_id = $(this).attr("lang");
        var html = html1 + "-" + html2;
        $("#position_desc").val(html);
        $("#position_name").val(html2);
        $("#position_parent_id").val(position_parent_id);
        $("#position_id").val(position_id);
        $("#position_desc").parent().next().next().css('display','inline-block');
        $("#position_desc").parent().next().next().next().html("");
    });

    var length = $(".position_box .tr").length;
    $(".position_box .tr").eq(length - 1).find(".tr_right").removeClass("tr_right_bottom");

    //邀请
    $("#invBtnY").on('click',function(){
        if(!$("#name").val()){
            $("#name").parent().next().next().next().html("请输入姓名");
            return;
        }
        if(!$('#position_desc').val()){
            $("#position_desc").parent().next().next().next().html("请选择职务");
            return;
        }
        if(!$("#phone").val()){
            $("#phone").parent().next().next().next().html("请输入手机号");
            return;
        }
        var reg=/^1[3|4|5|8|7|6|9]\d{9}$/;
        if(!reg.test($("#phone").val())){
            $("#phone").parent().next().next().next().html("请输入11位数字的手机号");
            return;
        }
        if(!$("#account").val()){
            $("#account").parent().next().next().next().html("请输入邮箱地址");
            return;
        }
        if($("#valite").val()=="1"){
            return;
        }else {
            $('.formError').html("");
            var invH = $('body').height();
            var wH = $(window).height();
            if (invH < wH) {
                $("#inviteS").css({
                    "height": wH + "px",
                    "display": "block"
                });
            } else {
                $("#inviteS").css({
                    "height": invH + "px",
                    "display": "block"
                });
            }
            $("#invName").html($("#name").val());
            $("#invPhone").html($("#phone").val());
            $("#invEmail").html($("#account").val());
        }
    });



    $("#inviteSBtn").on('click',function(){

        $("#inviteS").css({
            "height":"",
            "display":"none"
        });
        $("#inviteSuccess").css({
           "display":"none"
        });
        $("#invB").css({
            "display":"block"
        });
    });

    //邀请取消
    $("#invNo").on('click',function(){
        $("#inviteS").css({
            "height":"",
            "display":"none"
        })
    });

    //邀请校验
    $("#name").blur(function(){
        var val=$("#name").val();
        var reg=/^[\u4E00-\u9FA5]{1,10}$/;
        if(!reg.test(val)){
            $("#name").parent().next().next().next().html("只支持中文字符，且最多可填10个");
            $("#name").parent().next().css("display","");
            $("#name").parent().next().next().css("display","none");
            $("#name").parent().next().next().next().css("display","");
            $("#valite").val("1");
            $("#name").css("border","1px solid #FB2741");
        }else{
            $("#name").parent().next().css("display","none");
            $("#name").parent().next().next().css("display","inline-block");
            $("#name").parent().next().next().next().css("display","none");
            $("#valite").val("0");
            $("#name").css("border","1px solid #ccc");
        }
    });
    $("#phone").blur(function(){
        var val=$("#phone").val();
        var reg=/^1[3|4|5|8|7|6|9]\d{9}$/;
        if(!reg.test(val)){
            $("#phone").parent().next().next().next().html("请输入11位数字的手机号");
            $("#phone").parent().next().next().css("display","none");
            $("#valite").val("1");
            $("#phone").css("border","1px solid #FB2741");
        }else{
            $("#phone").parent().next().next().next().html("");
            $("#phone").parent().next().html("");
            $("#phone").parent().next().next().css("display","inline-block");
            $("#valite").val("0");
            $("#phone").val(val);
            $("#phone").css("border","1px solid #ccc");
        }
    });
    //$("input[name='role.id']").
    $("#account").blur(function(){
        var val=$("#account").val();
        var reg= /^(([0-9a-zA-Z]+)|([0-9a-zA-Z]+[_.0-9a-zA-Z-]*[0-9a-zA-Z]+))@([a-zA-Z0-9-]+[.])+([a-zA-Z]){2}|net|NET|com|COM|gov|GOV|mil|MIL|org|ORG|edu|EDU|int|INT|cn|CN$/;
        //var reg= eval("/^(([0-9a-zA-Z]+)|([0-9a-zA-Z]+[_.0-9a-zA-Z-]*[0-9a-zA-Z]+))@"+ mailDomain + "/");
        //console.log(reg);
        if(!reg.test(val)){
            $("#account").parent().next().next().next().html("请输入有效的邮箱地址");
            $("#account").parent().next().next().css("display","");
            $("#valite").val("1");
            $("#account").css("border","1px solid #FB2741");
        }else{
            $("#account").parent().next().next().next().html("");
            $("#account").parent().next().next().css("display","inline-block");
            $("#valite").val("0");
            $("#account").css("border","1px solid #ccc");
        }
    });


    $("input:radio[name='role_id']").click(function(){
    	$(".radioMargin").parent().next().next().next().html("");
    });
    
    //邀请确认
    $("#invSure").on('click',function(){
    	$('#invSure').attr('disabled',true);
        var url = contextPath + "/api/employee/create";
        var name=$("#name").val();
        var phone=$("#phone").val();
        var account=$("#account").val();
        var work_city=$("#work_city").val();
        var position_parent_id = $('#position_parent_id').val();
        var position_id = $('#position_id').val();
        var position_desc = $('#position_name').val();
        $.ajax({
            type:"post",
            url :url,
            dataType:"json",
            data:{
                name:name,
                phone:phone,
                account:account,
                work_city:work_city,
                position_parent_id: position_parent_id,
                position_id: position_id,
                position_desc: position_desc
            },
            async:false,
            error:function(xhr,status,err){
                alert("系统异常");
            },
            success:function(data){
                if(data.error_code =='0'){
                    $("#inviteSuccess").css({
                        "display":"block"
                    });
                    $("#invB").css({
                        "display":"none"
                    });
                    $("#inviteSBtn").attr('lang',data.uid);
                }else{
                    alert(data.error_msg);
                    $('#invSure').attr('disabled',false);
                }
            }
        });
    });
    //创建成功确认跳转到档案信息
    $("#inviteSBtn").click(function(){
    	var uid = $(this).attr('lang'); 
    	window.location.href=contextPath + "/employee/getDetail?id="+uid; 
    });

});