$(function(){


    //开始录入
    $('#entering').on('click', function(){
        var _this = $(this);
        var is_docking = _this.data('is_docking');
        var sign_ids = _this.data('sign_ids').toString();
        var finance_id = $('#finance_id').val();
        var user_name = $('#userName').val().trim();
        var locationUrl = LOCALURL;
        var navigation = $('#navigation').val().trim();
        var nodeUrl = $('#nodeUrl').val().trim();
        var auditTime = $('#auditTime').val();
        var carType = $.trim($('#carType').val());
        is_docking = 1;
        // if (is_docking == 1 && (sign_ids && sign_ids.indexOf('10') != -1)) {
        if (is_docking == 1) {
            var action  = contextPath + markUri + '/docking/pingan/home';
            if (auditTime != 0) {
                locationTo({
                    action : action,
                    param : {
                        finance_id : finance_id,
                        active : 'active',
                        url : locationUrl,
                        userName : user_name,
                        navigation : navigation,
                        nodeUrl : nodeUrl,
                        car_type : carType
                    }
                });
            } else {
                $.ajax({
                    type:"post",
                    url :contextPath + '/api/finance/startApplyloan',
                    dataType:"json",
                    data:{finance_id: finance_id},
                    async:false,
                    error:function(xhr,status,err){
                        alert("系统异常");
                    },
                    success:function(data){
                        if(data.error_code =='0'){
                            locationTo({
                                action : action,
                                param : {
                                    finance_id : finance_id,
                                    active : 'active',
                                    url : locationUrl,
                                    userName : user_name,
                                    navigation : navigation,
                                    nodeUrl : nodeUrl,
                                    car_type : carType
                                }
                            })
                        }else{
                            alert(data.error_msg);
                        }
                    }
                });
            }
        } else {
            var action = contextPath + markUri + '/customer/loan/detail';
            $.ajax({
                type:"post",
                url :contextPath + '/api/finance/startApplyloan',
                dataType:"json",
                data:{finance_id: finance_id},
                async:false,
                error:function(xhr,status,err){
                    alert("系统异常");
                },
                success:function(data){
                    if(data.error_code =='0'){
                        locationTo({
                            action : action,
                            param : {
                                finance_id : finance_id,
                                active : 'active',
                                url : locationUrl,
                                userName : user_name,
                                navigation : navigation,
                                nodeUrl : nodeUrl,
                                car_type : carType
                            }
                        })
                    }else{
                        $alert(data.error_msg);
                    }
                }
            });
        }
    });

    //确认申请
    $('#requestpayout_apply').on('click', function(){
        $(this).attr("disabled", true);
        var finance_id = $(this).attr('lang');
        $.ajax({
            type:"post",
            url :contextPath + '/api/finance/applyloan',
            dataType:"json",
            data:{finance_id: finance_id},
            async:false,
            error:function(xhr,status,err){
                $(this).attr("disabled", false);
                alert("系统异常");
            },
            success:function(data){
                if(data.error_code =='0'){
                    window.location.href = contextPath + markUri + '/customer/loan/alreadyAllot';
                }else{
                    $(this).attr("disabled", true);
                    alert(data.error_msg);
                }
            }
        });
    });

    /*$(".imgMask").click(function(){
        $("#imgZoom").css("display","none");
        $('.imgZoomBox').css('display' , 'none');
        $(".rotate").css('display' , 'none');
        $('#unQualified').css('display','none');
        $(this).css("display","none");
    });
    //查看大图
    var inner = "";  //单张不合格内容

    $(".detailImgBox").each(function(index){
        $(".detailImgBox").eq(index).click(function(){
            $('#deg').val('0');
            $("#imgDetail").css({
                'transform' :'rotate(0deg)',
                '-webkit-transform' :'rotate(0deg)',
                '-moz-transform' :'rotate(0deg)',
                '-ms-transform' :'rotate(0deg)',
                '-o-transform' :'rotate(0deg)'
            });
            $("#imgDetail").attr("src",$(".thumbnail_800_600").eq(index).val());
            var htmlStr = $(".thumbnail_800_600").eq(index).attr("name");
            var indexOf = htmlStr.indexOf(".");
            var html = htmlStr.substring(0,indexOf);
            $("#img_name").val(html);
            $("#listIndex").val(index);
            var dH=document.body.scrollHeight;
            $("#imgZoom").css({
                "height":dH+"px",
                "display":"block"
            });
            $('.imgZoomBox').css({
                'height' : dH + 'px',
                'display' : 'block'
            });
            $('.imgMask').css({
                'height' : dH + 'px',
                'display' : 'block'
            });
        })
    });



    //大图左右按钮交互
    $(".imgForward").hover(function(){
        $(this).find("img").attr("src","/static/img/finance/imgHfor.png");
    },function(){
        $(this).find("img").attr("src","/static/img/finance/imgFor.png");
    });

    $(".imgNext").hover(function(){
        $(this).find("img").attr("src","/static/img/finance/imgHNext.png");
    },function(){
        $(this).find("img").attr("src","/static/img/finance/imgNext.png");
    });

    //关闭大图
    $(".imgClose").click(function(){
        $("#imgZoom").css("display","none");
        $('.imgZoomBox').css('display' , 'none');
        $(".imgMask").css('display' , 'none');
        $(".rotate").css('display' , 'none');
        $('#unQualified').css('display','none');
    });*/

    //下载
    $(".download_file").click(function(){
    	var material_type = $(this).attr('alt');
    	$('#material_type').val(material_type);
    	$('#finance_download').submit();
    });

    /*$(".detail_btn1").hover(function(){
        $(this).find('input').css('color','#1DC6BC');
    },function(){
        $(this).find('input').css('color','#808891')
    });

    $(".detail_btn2").hover(function(){
        $(this).find('input').css('color','#1DC6BC');
    },function(){
        $(this).find('input').css('color','#808891')
    });*/


    //照片不合格
    $("#picture_reason").click(function(){
        var finance_id = $(this).attr('lang');
        var user_name = $(this).attr('alt');
        var create_name = $(this).attr('create_name');
        $("#picture_reason_form #finance_id_picture_reason").val(finance_id);
        $("#picture_reason_form").submit();
    });

    //大图左右切换
    /*$(".imgForward").click(function(){
        var val=parseInt($("#listIndex").val())-1;
        if( val <= 0){
            val = 0;
        }
        $("#listIndex").val(val);
        var src = $('.thumbnail_800_600').eq(val).val();
        var htmlStr = $('.thumbnail_800_600').eq(val).attr("name");
        var indexOf = htmlStr.indexOf(".");
        var html = htmlStr.substring(0,indexOf);
        $("#img_name").val(html);
        $('.zoomImg').find('img:nth-child(2)').attr('src',src);
    });
    $(".imgNext").click(function() {
        var val = parseInt($("#listIndex").val()) + 1;
        var i = $(".thumbnail_800_600").length - 1;
        if (val >= i) {
            val = i;
        }
        $("#listIndex").val(val);
        var src = $('.thumbnail_800_600').eq(val).val();
        var htmlStr = $('.thumbnail_800_600').eq(val).attr("name");
        var indexOf = htmlStr.indexOf(".");
        var html = htmlStr.substring(0,indexOf);
        $("#img_name").val(html);
        $('.zoomImg').find('img:nth-child(2)').attr('src', src);
    });

    //大图旋转
    $('.rotate_left').click(function(){
        var rotate_deg = -90;
        rotate(rotate_deg);
    });

    $('.rotate_right').click(function(){
        var rotate_deg = 90;
        rotate(rotate_deg);
    });

    //单张不合格原因
    $(".imgZoomBox").hover(function(){
        $(".rotate").css("display","block");
    },function(){
        $(".rotate").css("display","none");
    });
    $("#sub_btn").click(function(){
        var val2 = $("#reason").val();
        if(!val2){
            alert("请填写不合格原因");
            return;
        }
        var val1 = $("#img_name").val();
        var num = [];
        var replaceStr;
        var indexOf1= inner.indexOf(val1);
        inner += val1 + "：" + val2 + "<br>";
        for (var i = 0; i < inner.length; i++) {
            if(inner.substr(i,4) == "<br>"){
                num.push(i);
            }
        }
        if(indexOf1 >= "0"){
            var index = indexOf1 - 4;
            var indexOf2;
            if(index > "0"){
                for (var j = 0; j < num.length; j++) {
                    if(num[j] == index ){
                        indexOf2 = num[j+1] + 4;
                    }
                }
            }else{
                indexOf2 = num[0] + 4;
            }
            replaceStr = inner.substring(indexOf1,indexOf2);
            inner = inner.replace(replaceStr,"");
        }
        $("#reason_inner").val(inner);
        $('#unQualified').css('display','none');
        $("#reason").val("");
    });

    $('.unQualified').click(function(){
        $('#unQualified').css('display','block');
    });

    $('#cancel_btn').click(function(){
        $('#unQualified').css('display','none');
    });*/

});

