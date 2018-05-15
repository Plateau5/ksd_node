$(function(){
    //finance交互
    $(".financeBox").hover(function(){
        $(this).css("background","#FF5722");
        $(this).find("span").css("color","#fff");
    },function(){
        $(this).css("background","#F5F5F5");
        $(this).find("span").css("color","#333");
    });


    //申请贷款
    $(".allotM").click(function(){
    	var product_name = $(this).attr('alt');
    	$("#product_name").html(product_name);
    	var finance_id = $(this).attr('lang');
    	$("#sub_apply").attr('lang',finance_id);
        var alH=$('body').height();
        var wH=$(window).height();
        console.log(alH);
        if(alH<wH){
            $("#allotAlert").css({
                "display":"block",
                "height":wH+"px"
            })
        }else{
            $("#allotAlert").css({
                "display":"block",
                "height":alH+"px"
            })
        }
    });

    //取消申请贷款
    $("#allotN").click(function(){
        $("#allotAlert").css("display","none");
    });

    //确认申请贷款
    /*$("#sub_apply").click(function(){
    	var finance_id = $(this).attr('lang');
    	var url = contextPath + "/api/finance/applyloan";
    	$.post(url,{finance_id:finance_id},function(data){
    		if(data.error_code == '0'){
    			$("#allotAlert").css("display","none");
    			window.location.reload();
    		}else{
    			alert(data.error_msg);
    		}
    	});
    })*/

});