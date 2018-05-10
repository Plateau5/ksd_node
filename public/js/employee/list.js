$(function(){

	var initial = $("#initial").val();
	$("#"+initial).addClass("color");
	
	$("#zimucondition .inline").click(function(){
		var initial = $(this).html();
		if(initial == '全部'){
			//$("#initial").val(null);
            $("#form_search").find('#initial').remove();
            $('allEmp').removeClass('liC').addClass('liC');
		}else{
			//$("#initial").val(initial);
            $("#form_search").find('#initial').remove().end().append('<input type="hidden" id="initial" name="initial" value="'+ initial + '" />');
            $('#allEmp').removeClass('liC');
		}
		$("#form_search").submit();
	});
	
	$("#toInvite").click(function(){
		window.location.href=contextPath + "/employee/toInvite";
	});

	$(".dangan").click(function(){
		var id = $(this).attr('lang');
        locationTo({
            action : contextPath + "/employee/getDetail",
            param : {
                id : id
            }
        });
		//window.location.href=contextPath + "/employee/getDetail?id="+id;
        var img1=$("#img1").attr("src");
        if(img1==""){
            $(".img1").css("visibility","hidden");
        }else{
            $(".img1").css("visibility","visible");
        }

        var img2=$("#img2").attr("src");
        if(img2==""){
            $(".img2").css("visibility","hidden");
        }else{
            $(".img2").css("visibility","visible");
        }
	});


    $(".xinxiDel").each(function(index){
       $(".xinxiDel").eq(index).on('click',function(){
           var id = $(this).attr('lang');
           $("#delQ input[name='delLang']").val(id);
           var delH=$("body").height();
           var wH=$(window).height();
           if(delH<wH){
               $("#delQ").css({
                   "display":"block",
                   "height":wH+"px"
               });
           }else{
               $("#delQ").css({
                   "display":"block",
                   "height":delH+"px"
               });
           }

       });
    });

    //删除信息
    $("#delQDBtn").on('click',function(){
        var id=$("#delQ input[name='delLang']").val();
        var delH=$("body").height();
        var wH=$(window).height();
        var url = contextPath + "/api/employee/leaveOffice";
        $.ajax({
            type:"post",
            url :url,
            dataType:"json",
            data    :{id:id},
            async:false,
            error:function(xhr,status,err){
                alert("系统异常");
            },
            success:function(data){
                if(data.error_code =='0'){
                    $("#delQ").css({
                        "display":"none",
                         "height":""
                    });
                    if(delH<wH){
                        $("#delS").css({
                            "display":"block",
                            "height":wH+"px"
                        });
                    }else{
                        $("#delS").css({
                            "display":"block",
                            "height":delH+"px"
                        });
                    }
                    window.location.reload();
                }else{
                    alert(data.error_msg);
                }
            }
        });
    });
    $("#delQXBtn").on('click',function(){
        $("#delQ input[name='delLang']").val("");
        $("#delQ").css({
            "height":"",
            "display":"none"
        })
    });
    $("#delSBtn").on('click',function(){
        var id=$("#delQ input[name='delLang']").val();
        var delH=$("body").height();
        var wH=$(window).height();
        var url = contextPath + "/api/employee/leaveOffice";
        $.ajax({
            type:"post",
            url :url,
            dataType:"json",
            data    :{id:id},
            async:false,
            error:function(xhr,status,err){
                alert("系统异常");
            },
            success:function(data){
                if(data.error_code =='0'){
                    $("#delS").css({
                        "display":"none",
                        "height":delH+"px"
                    });
                 }else{
                    alert(data.error_msg);
                }
                window.location.reload();
            }
        });

    });

    //字母查询

    $(".liC").click(function(){
        $(".zimu>form>ul>li[class*='zimuLi']").css("color","#333");
    });

});