$(function(){
	
	$('#toAdd').click(function(){
		window.location.href=contextPath+ markUri + "/supplier/organization/create";
	});
	
	$('.detail').click(function(){
		var id = $(this).attr('lang');
		window.location.href=contextPath+markUri + "/supplier/organization/detail?id="+id;
	});
	
	$('.toEdit').click(function(){
		var id = $(this).attr('lang');
		window.location.href=contextPath + markUri + "/supplier/organization/edit?id="+id;
		var toAdd_id = $('#toAdd_id').val(id);
	});
	
	
	$('.delete').click(function(){
		var del_lang = $(this).attr('lang');
		var del_H = document.body.scrollHeight;
		$('#del_lang').val(del_lang);
		$("#delQ").css({
			'display' : 'block',
			'height' : del_H + 'px'
		})
	});

	//确定删除
	$('#delQDBtn').click(function(){
        var id = $('#del_lang').val();
		var url = contextPath + "/api/organization/delete";
		$.ajax({
			type:"post",
			url :url,
			dataType:"json",
			data:{id:id},
			async:false,
			error:function(xhr,status,err){
				alert("系统异常");
			},
			success:function(data){
				if(data.error_code =='0'){
					var h = document.body.scrollHeight;
		            $('#delQ').css('display','none');
					$('#delS').css({
						'display' : 'block',
						'height' : h + 'px'
					});
				}else{
					alert(data.error_msg);
				}
			}
		});
	});

	//取消删除
	$('#delQXBtn').click(function(){
		$('#delQ').css('display','none');
	});
	$('#delSBtn').click(function(){
		$('#delS').css('display','none');
		window.location.reload();
	});

});