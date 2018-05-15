$(function(){

    /*$(".financeBox").hover(function(){
        $(this).css("background","#FF5722");
        $(this).find("span").css("color","#fff");
    },function(){
        $(this).css("background","#F5F5F5");
        $(this).find("span").css("color","#333");
    });*/

    $(".financeBox").hover(function(){
        $(this).addClass('financeActive');
    },function(){
        $(this).removeClass('financeActive');
    });

    $(".header_img1").hover(function(){
        $(this).find("img").attr("src","/static/img/requestpayout/approval_pending_n_icon.png");
    },function(){
        $(this).find("img").attr("src","/static/img/requestpayout/approval_pending_icon.png");
    });

    $(".header_img2").hover(function(){
        $(this).find("img").attr("src","/static/img/requestpayout/approved_n_icon.png");
    },function(){
        $(this).find("img").attr("src","/static/img/requestpayout/approved_icon.png");
    });

    $(".finance11").hover(function(){
        $(this).find("img").attr("src","/static/img/finance/financeIcon1.png");
    },function(){
        $(this).find("img").attr("src","/static/img/finance/financeHIcon1.png");
    });
    $(".finance1").hover(function(){
        $(this).find("img").attr("src","/static/img/requestpayout/approval_pending_n_icon.png");
    },function(){
        $(this).find("img").attr("src","/static/img/requestpayout/approval_pending_icon.png");
    });

    $(".finance2").hover(function(){
        $(this).find("img").attr("src","/static/img/finance/financeIcon2.png");
    },function(){
        $(this).find("img").attr("src","/static/img/finance/financeHIcon2.png");
    });


    $(".finance3").hover(function(){
        $(this).find("img").attr("src","/static/img/finance/financeIcon3.png");
    },function(){
        $(this).find("img").attr("src","/static/img/finance/financeHIcon3.png");
    });

    $(".finance4").hover(function(){
        $(this).find("img").attr("src","/static/img/finance/financeIcon4.png");
    },function(){
        $(this).find("img").attr("src","/static/img/finance/financeHIcon4.png");
    });

    $(".finance5").hover(function(){
        $(this).find("img").attr("src","/static/img/finance/financeIcon5.png");
    },function(){
        $(this).find("img").attr("src","/static/img/finance/financeHIcon5.png");
    });

    $(".finance6").hover(function(){
        $(this).find("img").attr("src","/static/img/finance/financeIcon6.png");
    },function(){
        $(this).find("img").attr("src","/static/img/finance/financeHIcon6.png");
    });

    $(".finance7").hover(function(){
        $(this).find("img").attr("src","/static/img/finance/financeIcon7.png");
    },function(){
        $(this).find("img").attr("src","/static/img/finance/financeHIcon7.png");
    });

    $(".finance8").hover(function(){
        $(this).find("img").attr("src","/static/img/finance/financeHIcon8.png");
    },function(){
        $(this).find("img").attr("src","/static/img/finance/financeIcon8.png");
    });

    $(".finance9").hover(function(){
        $(this).find("img").attr("src","/static/img/finance/financeIcon9.png");
    },function(){
        $(this).find("img").attr("src","/static/img/finance/financeHIcon9.png");
    });

    $(".finance10").hover(function(){
        $(this).find("img").attr("src","/static/img/finance/financeIcon10.png");
    },function(){
        $(this).find("img").attr("src","/static/img/finance/financeHIcon10.png");
    });

    //待通过鼠标悬停效果
    $(".finance_pending_pass").hover(function(){
        $(this).find("img").attr("src","/static/img/pending_pass_h.png");
    },function(){
        $(this).find("img").attr("src","/static/img/pending_pass.png");
    });


    /*$("div[class='city']").find(".city_search").each(function(index){
        $("div[class='city']").find(".city_search").eq(index).off("click").on("click", function(){
            $(this).addClass('city_active').siblings('.city_search').removeClass('city_active');
        });
    });*/

    $("div[class='city day name']").find(".city_search").each(function(index){
        $("div[class='city day name']").find(".city_search").eq(index).off("click").on("click", function(){
            $(this).addClass('city_active').siblings('.city_search').removeClass('city_active');
        });
    });
});