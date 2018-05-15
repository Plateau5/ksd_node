$(function(){
    //finance交互
    $(".financeBox").hover(function(){
        $(this).css("background","#FF5722");
        $(this).find("span").css("color","#fff");
    },function(){
        $(this).css("background","#F5F5F5");
        $(this).find("span").css("color","#333");
    });

    //未通过原因查看
    $(".reasonDetail").click(function(){
        var rdH=document.body.scrollHeight;
        var wH=$(window).height();
        var reason = $(this).attr('lang');
        $("#reason").html(reason);
        if(rdH<wH){
            $("#unReason").css({
                "height":wH+"px",
                "display":"block"
            });
        }else{
            $("#unReason").css({
                "height":rdH+"px",
                "display":"block"
            })
        }
        var br_length = $(".reasonText br").length;
        var reasonBox_H = 30 * (br_length + 1) + 120;
        $(".reasonBox").css("height",reasonBox_H+"px");
    });

    //关闭查看页
    $("#unReasonClose").click(function(){
        $("#unReason").css("display","none");
    })
});