$(function(){

	var img1=$("#img1").attr("src");
	if(img1==""){
		$(".img1").prev().css("visibility","visible");
		$(".img1").css("visibility","visible");
	}else{
		$(".img1").prev().css("visibility","hidden");
		$(".img1").css("visibility","hidden");
	}

	var img2=$("#img2").attr("src");
	if(img2==""){
		$(".img2").prev().css("visibility","visible");
		$(".img2").css("visibility","visible");
	}else{
		$(".img2").prev().css("visibility","hidden");
		$(".img2").css("visibility","hidden");
	}

	var img3=$("#img3").attr("src");
	if(img3==""){
		$(".img3").css("visibility","visible");
	}else{
		$(".img3").css("visibility","hidden");
	}

   var flag;

    //基本信息
    $("#infO").on('click',function(){
		$("body").css("height","");
        $(this).addClass("inforLActive");
		$(this).removeClass("colorM");
        $("#infT").removeClass("inforLActive");
		$("#infT").addClass("colorM");
		$("#infTh").removeClass("inforLActive");
		$("#infTh").addClass("colorM");
        $("#inforOne").css("display","block");
        $("#inforTwo").css("display","none");
		$("#gangwei_form").css("display","none");
		$(".jibenBtn").css("display","block");
		$(".gerenBtn").css("display","none");
		$(".gangweiBtn").css("display","none");
		$("#jibenForm").val("0");
		$("#gerenForm").val("");
		$("#gangweiForm").val("");
		var img1=$("#img1").attr("src");
		if(img1==""){
			$(".img1").prev().css("visibility","visible");
			$(".img1").css("visibility","visible");
		}else{
			$(".img1").prev().css("visibility","hidden");
			$(".img1").css("visibility","hidden");
		}

		var img2=$("#img2").attr("src");
		if(img2==""){
			$(".img2").css("visibility","visible");
		}else{
			$(".img2").css("visibility","hidden");
		}


    });

    //个人信息
    $("#infT").on('click',function(){
		$("body").css("height","");
		$(this).removeClass("colorM");
        $(this).addClass("inforLActive");
        $("#infO").removeClass("inforLActive");
		$("#infO").addClass("colorM");
		$("#infTh").removeClass("inforLActive");
		$("#infTh").addClass("colorM");
        $("#inforTwo").css("display","block");
        $("#inforOne").css("display","none");
		$("#gangwei_form").css("display","none");
		$(".jibenBtn").css("display","none");
		$(".gerenBtn").css("display","block");
		$(".gangweiBtn").css("display","none");
		$("#jibenForm").val("");
		$("#gerenForm").val("0");
		$("#gangweiForm").val("");
		var img3=$("#img3").attr("src");
		if(img3==""){
			$(".img3").css("visibility","visible");
		}else{
			$(".img3").css("visibility","hidden");
		}
    });

	//岗位信息
	$("#infTh").on('click',function() {
		$(this).removeClass("colorM");
		$(this).addClass("inforLActive");
		$("#infO").removeClass("inforLActive");
		$("#infO").addClass("colorM");
		$("#infT").removeClass("inforLActive");
		$("#infT").addClass("colorM");
		$("#inforTwo").css("display", "none");
		$("#inforOne").css("display", "none");
		$("#gangwei_form").css("display", "block");
		$(".jibenBtn").css("display", "none");
		$(".gerenBtn").css("display", "none");
		$(".gangweiBtn").css("display", "block");
		$("#jibenForm").val("");
		$("#gerenForm").val("");
		$("#gangweiForm").val("0");
	});

	//按钮交互
	$("#jibenBtnY").hover(function(){
        $(this).css("background","#0B9C94");
	},function(){
		$(this).css("background","#1DC6BC");
	});
	$("#gerenBtnY").hover(function(){
		$(this).css("background","#0B9C94");
	},function(){
		$(this).css("background","#1DC6BC");
	});
	$("#jibenBtnN").hover(function(){
		$(this).css("background","#B4B4B4");
	},function(){
		$(this).css("background","#A0A0A0");
	});
	$("#gerenBtnN").hover(function(){
		$(this).css("background","#B4B4B4");
	},function(){
		$(this).css("background","#A0A0A0");
	});
    
    //城市联动
    $("#domicile_province").on('change',function(){
		var province_id = $("#domicile_province option:selected").val();
		$.ajax({
			type : 'get',
			url : contextPath +"/employee/listCity",
			data :{province_id : province_id},
			async : false,
			dataType : 'json',
			error:function(xhr,status,err){
				alert("系统异常");
			},
			success : function(data) {
				$("#domicile_city").empty();
				var select = $("<option/>").text("全部").attr("value","0");
				$("#domicile_city").append(select);
				$.each(data.data, function(n, value) {
					var opt = $("<option/>").text(value.name).attr("value", value.id);  
					$("#domicile_city").append(opt);
				});
			}
		});
	});

	//基本信息校验
	$("#name").blur(function(){
		var val=$("#name").val();
		var reg=/^[\u4E00-\u9FA5]{1,10}$/;
		if(val==''){
			$("#name").parent().next().css("display","");
			$("#name").parent().next().next().css("display","none");
			$("#name").parent().next().next().next().css("display","");
			$("#name").parent().next().next().next().html("请输入姓名");
			$("#name").css("border","1px solid #FB2741");
			$("#inforVail").val("1");
		}else{
			if(!reg.test(val)){
				$("#name").parent().next().css("display","");
				$("#name").parent().next().next().css("display","none");
				$("#name").parent().next().next().next().html("只支持汉字，且最多可填10个");
				$("#name").parent().next().next().next().css("display","");
				$("#inforVail").val("1");
				$("#name").css("border","1px solid #FB2741");
			}else{
				$("#name").parent().next().css("display","none");
				$("#name").parent().next().next().css("display","inline-block");
				$("#name").parent().next().next().next().css("display","none");
				$("#name").parent().next().next().next().html("");
				$("#inforVail").val("0");
				$("#name").css("border","1px solid #ccc");
			}
		}

	});
	$("#gender").blur(function(){
		var val=$("#gender").val();
		if(val=="-1"){
			$("#gender").parent().next().next().html("请选择");
			$("#gender").parent().next().css("display","none");
			$("#inforVail").val("1");
			$("#gender").css("border","1px solid #FB2741");
		}else{
			$("#gender").parent().next().next().html("");
			$("#gender").parent().next().css("display","inline-block");
			$("#inforVail").val("0");
			$("#gender").css("border","1px solid #ccc");
		}
	});
	$("#phone").blur(function(){
		var val=$("#phone").val();
		var reg=/^1[3|4|5|8|7]\d{9}$/;
		if(val==''){
			$("#phone").parent().next().next().next().html("请输入11位数字的手机号");
			$("#phone").parent().next().next().css("display","none");
			$("#inforVail").val("1");
			$("#phone").css("border","1px solid #FB2741");
		}else{
			if(!reg.test(val)){
				$("#phone").parent().next().next().next().html("请输入11位数字的手机号");
				$("#phone").parent().next().next().css("display","none");
				$("#inforVail").val("1");
				$("#phone").css("border","1px solid #FB2741");
			}else{
				$("#phone").parent().next().next().next().html("");
				$("#phone").parent().next().next().css("display","inline-block");
				$("#inforVail").val("0");
				$("#phone").css("border","1px solid #ccc");
			}
		}

	});
	$("#card_no").blur(function(){
		var val=$("#card_no").val();
		var reg1=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/; //15位
		var reg2=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([\d|X]{1})$/;  //18位
		if(val==""){
			$("#card_no").parent().next().html("");
			$("#card_no").parent().next().next().css("display","");
			$("#card_no").parent().next().next().next().html("");
			$("#inforVail").val("0");
			$("#card_no").css("border","1px solid #ccc");
		}else{
			if((!reg1.test(val))&&(!reg2.test(val))){
				$("#card_no").parent().next().next().next().html("请输入正确有效的身份证号");
				$("#card_no").parent().next().next().css("display","none");
				$("#inforVail").val("1");
				$("#card_no").css("border","1px solid #FB2741");
			}else{
				$("#card_no").parent().next().html("");
				$("#card_no").parent().next().next().css("display","inline-block");
				$("#card_no").parent().next().next().next().html("");
				$("#inforVail").val("0");
				$("#card_no").css("border","1px solid #ccc");
			}
		}

	});
	$("#bank_no").blur(function(){
		var val=$("#bank_no").val();
		var reg=/^(\d{16}|\d{19})$/;
		if(val==""){
			$("#bank_no").parent().next().html("");
			$("#bank_no").parent().next().next().css("display","");
			$("#bank_no").parent().next().next().next().html("");
			$("#inforVail").val("0");
			$("#bank_no").css("border","1px solid #ccc");
		}else{
			if(!reg.test(val)){
				$("#bank_no").parent().next().next().next().html("请输入正确格式的银行卡号");
				$("#bank_no").parent().next().next().css("display","none");
				$("#inforVail").val("1");
				$("#bank_no").css("border","1px solid #FB2741");
			}else{
				$("#bank_no").parent().next().html("");
				$("#bank_no").parent().next().next().css("display","inline-block");
				$("#bank_no").parent().next().next().next().html("");
				$("#inforVail").val("0");
				$("#bank_no").css("border","1px solid #ccc");
			}
		}

	});
	$("#bank_address").blur(function(){
		var val=$("#bank_address").val();
		var reg=/^[\u4E00-\u9FA5]+$/;
		if(val==""){
			$("#bank_address").parent().next().html("");
			$("#bank_address").parent().next().next().css("display","");
			$("#bank_address").parent().next().next().next().html("");
			$("#inforVail").val("0");
			$("#bank_address").css("border","1px solid #ccc");
		}else{
			if(!reg.test(val)){
				$("#bank_address").parent().next().next().next().html("只支持中文字符");
				$("#bank_address").parent().next().next().css("display","none");
				$("#inforVail").val("1");
				$("#bank_address").css("border","1px solid #FB2741");
			}else{
				$("#bank_address").parent().next().html("");
				$("#bank_address").parent().next().next().css("display","inline-block");
				$("#bank_address").parent().next().next().next().html("");
				$("#inforVail").val("0");
				$("#bank_address").css("border","1px solid #ccc");
			}
		}

	});

	//个人信息校验
	$("#en_name").blur(function(){
		var val=$("#en_name").val();
		var reg=/^[a-zA-Z]{1,10}$/;
		if(val==""){
			$("#en_name").parent().next().css("display","none");
			$("#en_name").parent().next().next().css("display","");
			$("#en_name").parent().next().next().next().css("display","none");
			$("#en_name").css("border","1px solid #ccc");
		}else{
			if(!reg.test(val)){
				$("#en_name").parent().next().next().next().html("只支持英文字母，且最多10个");
				$("#en_name").parent().next().css("display","");
				$("#en_name").parent().next().next().css("display","none");
				$("#en_name").parent().next().next().next().css("display","");
				$("#en_name").css("border","1px solid #FB2741");
			}else{
				$("#en_name").parent().next().css("display","none");
				$("#en_name").parent().next().next().css("display","inline-block");
				$("#en_name").parent().next().next().next().css("display","none");
				$("#en_name").css("border","1px solid #ccc");
			}
		}

	});
	$("#is_marry").blur(function(){
		var val=$("#is_marry").val();
		if(val=="-1"){
			//$("#is_marry").parent().next().next().html("请选择");
			$("#is_marry").parent().next().css("display","none");
		}else{
			$("#is_marry").parent().next().next().html("");
			$("#is_marry").parent().next().css("display","inline-block");
		}
	});
	$("#nation").blur(function(){
		var val=$("#nation").val();
		var reg=/^[\u4E00-\u9FA5]{1,10}$/;
		if(val==""){
			$("#nation").parent().next().css("display","none");
			$("#nation").parent().next().next().css("display","");
			$("#nation").parent().next().next().next().css("display","none");
			$("#nation").css("border","1px solid #ccc");
		}else{
			if(!reg.test(val)){
				$("#nation").parent().next().next().next().html("只支持汉字，且最多10个");
				$("#nation").parent().next().css("display","");
				$("#nation").parent().next().next().css("display","none");
				$("#nation").parent().next().next().next().css("display","");
				$("#nation").css("border","1px solid #FB2741");
			}else{
				$("#nation").parent().next().css("display","none");
				$("#nation").parent().next().next().css("display","inline-block");
				$("#nation").parent().next().next().next().css("display","none");
				$("#nation").css("border","1px solid #ccc");
			}
		}

	});
	$("#birthday").blur(function(){
		var val=$("#birthday").val();
		var reg=/^(19|20)\d{2}-(1[0-2]|0?[1-9])-(0?[1-9]|[1-2][0-9]|3[0-1])$/;
		if(!val){
			$("#birthday").parent().next().next().html("格式错误，请重新选择");
			$("#birthday").parent().next().css("display","");
		}else{
			$("#birthday").parent().next().next().html("");
			$("#birthday").parent().next().css("display","inline-block");
		}

	});
	$("#constellation").blur(function(){
		var val=$("#constellation").val();
		if(val=="0"||val==""){
			$("#constellation").parent().next().css("display","none");
		}else{
			$("#constellation").parent().next().next().html("");
			$("#constellation").parent().next().css("display","inline-block");
		}
	});
	$("select[data='city1']").blur(function(){
		var val=$("select[data='city1']").val();
		if(val=="0"||val==""){
			$("select[data='city1']").parent().next().css("display","none");
		}else{
			$("select[data='city1']").parent().next().next().html("");
			$("select[data='city1']").parent().next().css("display","inline-block");
		}
	});
	$("#address").blur(function(){
		var val=$("#nation").val();
		var reg=/^[0-9a-zA-Z\u4E00-\u9FA5]{1,100}$/;
		if(val==""){
			$("#address").parent().next().css("display","none");
			$("#address").parent().next().next().css("display","");
			$("#address").parent().next().next().next().css("display","none");
			$("#address").css("border","1px solid #ccc");
		}else{
			if(!reg.test(val)){
				$("#address").parent().next().next().next().html("最多100个字符");
				$("#address").parent().next().css("display","");
				$("#address").parent().next().next().css("display","none");
				$("#address").parent().next().next().next().css("display","");
				$("#address").css("border","1px solid #FB2741");
			}else{
				$("#address").parent().next().css("display","none");
				$("#address").parent().next().next().css("display","inline-block");
				$("#address").parent().next().next().next().css("display","none");
				$("#address").css("border","1px solid #ccc");
			}
		}

	});
	$("select[data='city2']").blur(function(){
		var val=$("select[data='city2']").val();
		if(val=="0"||val==""){
			$("select[data='city2']").parent().next().css("display","none");
		}else{
			$("select[data='city2']").parent().next().next().html("");
			$("select[data='city2']").parent().next().css("display","inline-block");
		}
	});
	$("#email_personal").blur(function(){
		var val=$("#email_personal").val();
		var reg= /^(([0-9a-zA-Z]+)|([0-9a-zA-Z]+[_.0-9a-zA-Z-]*[0-9a-zA-Z]+))@([a-zA-Z0-9-]+[.])+([a-zA-Z]){2}|net|NET|com|COM|gov|GOV|mil|MIL|org|ORG|edu|EDU|int|INT|cn|CN$/;
		if(val==""){
			$("#email_personal").parent().next().css("display","none");
			$("#email_personal").parent().next().next().css("display","");
			$("#email_personal").parent().next().next().next().css("display","none");
			$("#email_personal").css("border","1px solid #ccc");
		}else{
			if(!reg.test(val)){
				$("#email_personal").parent().next().next().next().html("请输入有效邮箱地址");
				$("#email_personal").parent().next().css("display","");
				$("#email_personal").parent().next().next().css("display","none");
				$("#email_personal").parent().next().next().next().css("display","");
				$("#email_personal").css("border","1px solid #FB2741");
			}else{
				$("#email_personal").parent().next().css("display","none");
				$("#email_personal").parent().next().next().css("display","inline-block");
				$("#email_personal").parent().next().next().next().css("display","none");
				$("#email_personal").css("border","1px solid #ccc");
			}
		}

	});
	$("#emergency_contact").blur(function(){
		var val=$("#emergency_contact").val();
		var reg=/^[a-zA-Z\u4E00-\u9FA5]{1,10}$/;
		if(val==""){
			$("#emergency_contact").parent().next().css("display","none");
			$("#emergency_contact").parent().next().next().css("display","");
			$("#emergency_contact").parent().next().next().next().css("display","none");
			$("#emergency_contact").css("border","1px solid #ccc");
		}else{
			if(!reg.test(val)){
				$("#emergency_contact").parent().next().next().next().html("只支持字母、汉字，且最多可填10个");
				$("#emergency_contact").parent().next().css("display","");
				$("#emergency_contact").parent().next().next().css("display","none");
				$("#emergency_contact").parent().next().next().next().css("display","");
				$("#emergency_contact").css("border","1px solid #FB2741");
			}else{
				$("#emergency_contact").parent().next().css("display","none");
				$("#emergency_contact").parent().next().next().css("display","inline-block");
				$("#emergency_contact").parent().next().next().next().css("display","none");
				$("#emergency_contact").css("border","1px solid #ccc");
			}
		}

	});
	$("#emergency_phone").blur(function(){
		var val=$("#emergency_phone").val();
		var reg=/^1[3|4|5|8|7]\d{9}$/;
		if(val==""){
			$("#emergency_phone").parent().next().next().next().html("");
			$("#emergency_phone").parent().next().html("");
			$("#emergency_phone").parent().next().next().css("display","");
			$("#emergency_phone").css("border","1px solid #ccc");
		}else{
			if(!reg.test(val)){
				$("#emergency_phone").parent().next().next().next().html("请输入11位数字的手机号");
				$("#emergency_phone").parent().next().next().css("display","none");
				$("#emergency_phone").css("border","1px solid #FB2741");
			}else{
				$("#emergency_phone").parent().next().next().next().html("");
				$("#emergency_phone").parent().next().html("");
				$("#emergency_phone").parent().next().next().css("display","inline-block");
				$("#emergency_phone").css("border","1px solid #ccc");
			}
		}

	});
	$("#graduation_school").blur(function(){
		var val=$("#graduation_school").val();
		var reg=/^[\u4E00-\u9FA5]{1,10}$/;
		if(val==""){
			$("#graduation_school").parent().next().css("display","none");
			$("#graduation_school").parent().next().next().css("display","");
			$("#graduation_school").parent().next().next().next().css("display","none");
			$("#graduation_school").css("border","1px solid #ccc");
		}else{
			if(!reg.test(val)){
				$("#graduation_school").parent().next().next().next().html("请按正确格式输入");
				$("#graduation_school").parent().next().css("display","");
				$("#graduation_school").parent().next().next().css("display","none");
				$("#graduation_school").parent().next().next().next().css("display","");
				$("#graduation_school").css("border","1px solid #FB2741");
			}else{
				$("#graduation_school").parent().next().css("display","none");
				$("#graduation_school").parent().next().next().css("display","inline-block");
				$("#graduation_school").parent().next().next().next().css("display","none");
				$("#graduation_school").css("border","1px solid #ccc");
			}
		}


	});
	$("#education").blur(function(){
		var val=$("#education").val();
		if(val=="0"||val==""){
			$("#education").parent().next().css("display","none");
		}else{
			$("#education").parent().next().next().html("");
			$("#education").parent().next().css("display","inline-block");
		}
	});

	$("#profession").blur(function(){
		var val=$("#profession").val();
		if(val=="0"||val==""){
			$("#profession").parent().next().css("display","none");
		}else{
			$("#profession").parent().next().next().html("");
			$("#profession").parent().next().css("display","inline-block");
		}
	});

	//职务
	$(".domicile").click(function(){
		var delH = $('body').height();
		var wH=$(window).height();
		if(delH > wH){
			$("#position_back").css({
				"height" : (delH + ((wH * 40) / 100)) + "px",
				"display" : "block"
			});
			$("body").css("height",(delH + ((wH * 40) / 100)) + "px");
			$(".position_mask").css("height",(delH + ((wH * 40) / 100)) + "px");
		}else{
			$("#position_back").css({
				"height" : (wH + ((wH * 40) / 100)) + "px",
				"display" : "block"
			});
			$("body").css("height",(wH + ((wH * 40) / 100)) + "px");
			$(".position_mask").css("height",(wH + ((wH * 40) / 100)) + "px");
		}

		$(".tr").each(function(){
			var tr_str = $(this).find(".tr_right").css("height");
			var new_str = tr_str.substring(0,tr_str.length-1);
			$(this).css("height", parseInt(new_str)+ "px");
		});
	});

	$(".position_mask").click(function(){
		$("body").css("height","1008px");
		$("#position_back").css("display","none");
	});

	$(".tr_right>span").on("click",function(){
		$("body").css("height","1008px");
		$("#position_back").css("display","none");
		var html1 = $.trim($(this).parent().prev().html());
		var position_parent_id = $(this).parent().prev().attr("lang");
		var html2 = $.trim($(this).html());
		var position_id = $(this).attr("lang");
		var html = html1 + "-" + html2;
		$("#position .span").html(html);
		$("#position_name").val(html2);
		$("#position_parent_id").val(position_parent_id);
		$("#position_id").val(position_id);
		$("#position_desc").val(html2);
		$("#position").parent().next().css('display','inline-block');
		$("#position").parent().next().next().html("");
	});

	var length = $(".position_box .tr").length;
	$(".position_box .tr").eq(length - 1).find(".tr_right").removeClass("tr_right_bottom");




	//更新
	$("#jibenBtnY").click(function(){
		if(!$("#name").val()){
			$("#name").parent().next().next().next().html("必填项");
			return;
		}
		if(!$("#gender").val()){
			$("#gender").parent().next().next().next().html("必填项");
			return;
		}
		if(!$("#phone").val()){
			$("#phone").parent().next().next().next().html("必填项");
			return;
		}
		if($("#inforVail").val()=="1"){
			return;
		}else{
			flag="1";
			var delH=$("body").height();
			var wH=$(window).height();
			if(delH<wH){
				$("#delQ").css({
					"height":wH+"px",
					"display":"block"
				})
			}else{
				$("#delQ").css({
					"height":delH+"px",
					"display":"block"
				})
			}

		}
	});

	$("#gerenBtnY").click(function(){
		flag="2";
		var delH=$("body").height();
		var wH=$(window).height();
		$("#delQ").css({
			"height":delH+"px",
			"display":"block"
		});
	});

	$("#gangweiBtnY").click(function(){
		var demo1 = $("#demo1").val().replace(/-/g,'');
		var demo2 = $("#demo2").val().replace(/-/g,'');
		if((demo2 != "") && (demo1>demo2)){
			alert("入职日期应晚于转正日期");
			return;
		}
		var position = $("#position .span").html();
		if(position == ""){
			$("#position").parent().next().next().html("必填项");
			return;
		}
		flag="3";
		$("#position").parent().next().css('display','inline-block');
		$("#demo2").parent().next().next().next().html("");
		var delH=$("body").height();
		var wH=$(window).height();
		$("#delQ").css({
			"height":delH+"px",
			"display":"block"
		});
	});

	//信息提交
	$("#delQDBtn").on('click',function(){
		var inputForm1=$("#jibenForm").val();
		var id=$("input[lang='delLang']").val();
		var delH=$("body").height();
		var wH=$(window).height();
		//基本信息提交
		if(flag == "1"){
			var url = contextPath + "/api/employee/updateBaseInfo";
			var vFD = new FormData(document.getElementById('baseInfo'));
			var oXHR = new XMLHttpRequest();
			oXHR.addEventListener('load', function(e) {
				var response = e.target.responseText;
				var data = JSON.parse(response);
				//成功
				if (data.error_code == '0') {
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
					$(".formProm").html("");
					$(".formError").html("");
					$(".trueImg").css("display","none");
				} else {
					alert(data.error_msg);
				}

			}, false);
			oXHR.addEventListener('error', function(e) {
				alert("输入参数异常");
				return;
			}, false);
			oXHR.addEventListener('abort', function() {
			}, false);
			oXHR.open('POST', url);
			oXHR.send(vFD);
		}else{
			if(flag == "2"){
				// 个人信息提交
				var url = contextPath + "/api/employee/updatePersonalInfo";
				var vFD = new FormData(document.getElementById('personalInfo'));
				var oXHR = new XMLHttpRequest();
				oXHR.addEventListener('load', function(e) {
					var response = e.target.responseText;
					var data = JSON.parse(response);
					if (data.error_code == '0') {
						//alert("创建用户成功");
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
						$(".formProm").html("");
						$(".formError").html("");
						$(".trueImg").css("display","none");
					} else {
						alert(data.error_msg);
					}

				}, false);
				oXHR.addEventListener('error', function(e) {
					alert("输入参数异常");
					return;
				}, false);
				oXHR.addEventListener('abort', function() {
				}, false);
				oXHR.open('POST', url);
				oXHR.send(vFD);
			}else{
				// 岗位信息提交
				var url = contextPath + "/api/employee/updateWorkInfo";
				var vFD = new FormData(document.getElementById('gangwei_form'));
				var oXHR = new XMLHttpRequest();
				oXHR.addEventListener('load', function(e) {
					var response = e.target.responseText;
					var data = JSON.parse(response);
					if (data.error_code == '0') {
						if(data.company_age !='' && data.company_age != null){
							$('#company_age').val(data.company_age);
						}
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
						$("#position").parent().next().css('display','none');
						$(".formProm").html("");
						$(".formError").html("");
						$(".trueImg").css("display","none");
					} else {
						alert(data.error_msg);
					}

				}, false);
				oXHR.addEventListener('error', function(e) {
					alert("输入参数异常");
					return;
				}, false);
				oXHR.addEventListener('abort', function() {
				}, false);
				oXHR.open('POST', url);
				oXHR.send(vFD);
			}

		}

	});


	$("#delQXBtn").click(function(){
		$("#delQ").css({
			"height":"",
			"display":"none"
		})
	});

	$("#delSBtn").on('click',function(){
		$("#delS").css({
			"display":"none",
			"height":""
		})
	});



});
var image = '';
function selectImage1(file) {
	if (!file.files || !file.files[0]) {
		return;
	}
	var filepath=file.value;
	var extname = filepath.substring(filepath.lastIndexOf(".")+1,filepath.length);
	if(extname != 'jpg' && extname != 'jpeg' && extname != 'png'){
		alert('请使用正确格式的图片');
		$(this).parent().parent().parent().next().next().html("请使用正确格式的图片");
        if(file.outerHTML){
            file.outerHTML=file.outerHTML;
        } else{      //FF
            file.value="";
        }
		return;
	}
	var size = file.files[0].size;
	if(size > 2048*1024){
		alert('图片大小超过2M');
		return;
	}
	var reader = new FileReader();
	reader.onload = function(evt) {
		document.getElementById('img1').src = evt.target.result;
		image = evt.target.result;
	};
	$(".img1").css("visibility","hidden");
	$(".img1").prev().css("visibility","hidden");
	reader.readAsDataURL(file.files[0]);
}
function selectImage2(file) {
	if (!file.files || !file.files[0]) {
		return;
	}
	var filepath=file.value;
	var extname = filepath.substring(filepath.lastIndexOf(".")+1,filepath.length);
	if(extname != 'jpg' && extname != 'jpeg' && extname != 'png'){
		alert('请使用正确格式的图片');
		$(this).parent().parent().parent().next().next().html("请使用正确格式的图片");
        if(file.outerHTML){
            file.outerHTML=file.outerHTML;
        } else{      //FF
            file.value="";
        }
		return;
	}
	var size = file.files[0].size;
	if(size > 2048*1024){
		alert('图片大小超过2M');
		return;
	}
	var reader = new FileReader();
	reader.onload = function(evt) {
		document.getElementById('img2').src = evt.target.result;
		image = evt.target.result;
	};
	$(".img2").css("visibility","hidden");
	$(".img2").prev().css("visibility","hidden");
	reader.readAsDataURL(file.files[0]);
}
function selectImage3(file) {
	if (!file.files || !file.files[0]) {
		return;
	}
	var filepath=file.value;
	var extname = filepath.substring(filepath.lastIndexOf(".")+1,filepath.length);
	if(extname != 'jpg' && extname != 'jpeg' && extname != 'png'){
		alert('请使用正确格式的图片');
		$(this).parent().parent().parent().next().next().html("请使用正确格式的图片");
        if(file.outerHTML){
            file.outerHTML=file.outerHTML;
        } else{      //FF
            file.value="";
        }
		return;
	}
	var size = file.files[0].size;
	if(size > 2048*1024){
		alert('图片大小超过2M');
		return;
	}
	var reader = new FileReader();
	reader.onload = function(evt) {
		document.getElementById('img3').src = evt.target.result;
		image = evt.target.result;
	};
	$(".img3").css("visibility","hidden");
	reader.readAsDataURL(file.files[0]);
};

