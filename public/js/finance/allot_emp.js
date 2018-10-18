$(function(){

    //去除底线
    var personBox_length = $(".personBox").length;
    var del = Math.floor(personBox_length % 5);
    if(del != 0){
        for(var i = 0; i < del; i++){
            $(".personBox").eq(personBox_length - i - 1).css("borderBottom","none");
        }
    }

    //选中状态
    $(".personBox").each(function(index){
        $(".personBox").eq(index).click(function(){
            $(".checked").remove();
            var innerHtml="<div class='checked'></div>";
            $(this).append(innerHtml);
            var audit_id = $(this).find('input[name="audit_id"]').val();
        	var audit_name = $(this).find('input[name="audit_name"]').val();
        	$("#audit_id").val(audit_id);
        	$("#audit_name").val(audit_name);
        	$("#allotBtnY").attr("disabled",false);
        })
    });

    var flag=0;
    //分配按钮
    $("#allotBtnY").click(function(){
        var aH=$('body').height();
        var wH=$(window).height();
        if(aH<wH){
            $("#delQ").css({
                "height":wH+"px",
                "display":"block"
            })
        }else{
            $("#delQ").css({
                "height":aH+"px",
                "display":"block"
            })
        }
        flag=$(".checked").length;
        if(flag=="0"){
            $(".unselected").css("display","block");
            $(".selected").css("display","none");
            $("#delQDBtn").click(function(){
                $("#delQ").css("display","none");
            });
        }else{
            $(".unselected").css("display","none");
            $(".selected").css("display","block");
        }
    });

    //确认分配
    $("#delQDBtn").click(function(){
        if ($('.list_url').val().indexOf( markUri + '/customer/loan/pendingAllot') != -1) {
            var url = contextPath + "/api/finance/allot";
        } else {
            var url = contextPath + "/api/compact/allot";
        }
    	var audit_id = $("#audit_id").val();
    	var audit_name = $("#audit_name").val();
    	var finance_id = $("#finance_id").val();
    	if(flag == '0'){
    		return;
    	}
    	if(!finance_id || !audit_name || !audit_id){
    		alert("请选择数据");
    		return;
    	}
    	$.post(url,{audit_id:audit_id,audit_name:audit_name,finance_id:finance_id},function(data){
    		if(data.error_code == '0'){
    			//传数据
    			$("#delQ").css("display","none");
    			var wH=$(window).height();
    			var sH=$('body').height();
    			if(sH<wH){
    				$("#delS").css({
    					"height":wH+"px",
    					"display":"block"
    				})
    			}else{
    				$("#delS").css({
    					"height":sH+"px",
    					"display":"block"
    				})
    			}
    		}else{
    			alert(data.error_msg);
    		}
    	});
    });
    
    //分配取消
    $("#delQXBtn").click(function(){
        $("#delQ").css("display","none");
    });

    //确认分配
    $("#delSBtn").click(function(){
        $("#delS").css("display","none");
    });
    
    //分配成功
    $("#success_allot").click(function(){
    	window.location.href= contextPath + markUri + "/customer/loan/pendingAllot";
    });

});
