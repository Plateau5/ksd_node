$(function(){
    //finance交互
    $(".financeBox").hover(function(){
        $(this).css("background","#FF5722");
        $(this).find("span").css("color","#fff");
    },function(){
        $(this).css("background","#F5F5F5");
        $(this).find("span").css("color","#333");
    });


    //通知审核结果
    $(".reviewR").click(function(){
        var rH=document.body.scrollHeight;
        var wH=$(window).height();
        var finance_id = $(this).attr('lang');
        var name = $(this).attr('alt');
        $("input[name='finance_id']").val(finance_id);
        $("#daiqianname").html(name);
        if(rH<wH){
            $("#reviewResult").css({
                "height":wH+"px",
                "display":"block"
            });
        }else{
            $("#reviewResult").css({
                "height":rH+"px",
                "display":"block"
            })
        }
    });
    
    $("#reason").keyup(function(){
    	var $type = $("input[name=type]");
    	$type.attr("checked",false); 
    	$("#real_loan_amount").val(null);
    	$("#real_loan_amount").attr("disabled",true);
    	var val = $.trim($(this).val());
    	if(!val){
    		$("#tongzhiS").attr("disabled",true);
    	}else{
    		$("#tongzhiS").attr("disabled",false);
    	}
    });
    
    $("input[type='radio']").click(function(){
    	$("#reason").val('');
    	var id = $(this).attr('id');
    	if(id == 'type_a'){
    		$("#real_loan_amount").attr("disabled",false);
    		$("#tongzhiS").attr("disabled",true);
    	}else{
    		$("#real_loan_amount").attr("disabled",true);
    		$("#tongzhiS").attr("disabled",false);
    		$("#real_loan_amount").val(null);
    	}
    });
    
    $("#real_loan_amount").keyup(function () {
        var reg = $(this).val().match(/\d+\.?\d{0,2}/);
        var txt = '';
        var val = $(this).val();
        if (reg != null) {
            txt = reg[0];
        }
        $(this).val(txt);
        if(!val || val.endWith('.') || val>1000){
        	$("#tongzhiS").attr("disabled",true);
        }else if(val){
        	$("#tongzhiS").attr("disabled",false);
        }
    }).change(function () {
        $(this).keyup();
    })

    //通知关闭
    $("#tongzhiN").click(function(){
        $("#reviewResult").css("display","none");
        var $type = $("input[name=type]");
    	$type.attr("checked",false); 
    	$("#real_loan_amount").val(null);
    	$("#real_loan_amount").attr("disabled",true);
		$("#reviewResult").css("display","none");
		$("#reason").val('');
		$("#tongzhiS").attr("disabled",true);
        window.location.reload();
    });

    //确认通知
    $("#tongzhiS").click(function(){
        //数据
    	var type = $('#pass_form input[name="type"]:checked ').val();
    	var reason = $('#reason').val();
    	var real_loan_amount = $('#real_loan_amount').val();
    	if(!type && !reason && !real_loan_amount){
    		alert("请填写数据！");
    		return
    	}
    	var finance_id = $("#pass_form input[name='finance_id']").val();
    	if(type){
    		var url = contextPath+"/api/finance/pass";
    		$.post(url,{finance_id:finance_id,type:type,real_loan_amount:real_loan_amount},function(data){
    			if(data.error_code == '0'){
    				$("#reviewResult").css("display","none");
    		        var dH=$("body").height();
    		        var wH=$(window).height();
    		        if(dH<wH){
    		            $("#delS").css({
    		                "height":wH+"px",
    		                "display":"block"
    		            });
    		        }else{
    		            $("#delS").css({
    		                "height":dH+"px",
    		                "display":"block"
    		            })
    		        }
    			}else{
    				alert(data.error_msg);
    			}
    		});
    	}else{
    		var url = contextPath+"/api/finance/unpass";
    		$.post(url,{finance_id:finance_id,reason:reason},function(data){
    			if(data.error_code == '0'){
    				$("#reviewResult").css("display","none");
    		        var dH=$("body").height();
    		        var wH=$(window).height();
    		        if(dH<wH){
    		            $("#delS").css({
    		                "height":wH+"px",
    		                "display":"block"
    		            });
    		        }else{
    		            $("#delS").css({
    		                "height":dH+"px",
    		                "display":"block"
    		            })
    		        }
    			}else{
    				alert(data.error_msg);
    			}
    		});
    	}
    });

    String.prototype.endWith=function(s){
    	  if(s==null||s==""||this.length==0||s.length>this.length)
    	     return false;
    	  if(this.substring(this.length-s.length)==s)
    	     return true;
    	  else
    	     return false;
    	  return true;
    }
    //确定
    $("#delSBtn").click(function(){
        $("#delS").css("display","none");
        var $type = $("input[name=type]");
    	$type.attr("checked",false); 
    	$("#real_loan_amount").val(null);
    	$("#real_loan_amount").attr("disabled",true);
		$("#reviewResult").css("display","none");
		$("#reason").val('');
		$("#tongzhiS").attr("disabled",true);
        window.location.reload();
    })
});