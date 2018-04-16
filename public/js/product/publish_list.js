$(function(){

	//toAdd操作
	$('.toAdd').hover(function(){
		$(this).find('img').attr('src','/static/img/product/icon_edit_hover.png');
		$(this).find('span').css('color','#1DC6BC');
	},function(){
		$(this).find('img').attr('src','/static/img/product/icon_edit.png');
		$(this).find('span').css('color','#808891');
	});

	$('#toAdd').click(function(){
		window.location.href=contextPath+ markUri + "/product/toAdd";
	});

	//筛选
	$('.select_condition').change(function() {
		$('#form_search').submit();
	});

	//warehouse操作
	$('.warehouse').hover(function(){
		$(this).find('img').attr('src','/static/img/product/icon_warehouse_hover.png');
		$(this).find('span').css('color','#1DC6BC');
	},function(){
		$(this).find('img').attr('src','/static/img/product/icon_warehouse.png');
		$(this).find('span').css('color','#808891');
	});
	$('#warehouse').click(function(){
		window.location.href=contextPath+ markUri + "/supplier/organization/unpublishedProducts";
	});
	
	$('.detail').click(function(){
		var id = $(this).attr('lang');
		var data_num = $(this).attr('data_num');
		window.location.href=contextPath+ markUri + "/supplier/organization/productDetail?id="+id+"&data_num="+data_num;
	});
	
	
	$('.shelves').click(function(){
		var shelves_H = document.body.scrollHeight;
		var product_id = $(this).attr('lang');
		$('.shelves_reason #id').val(product_id);
		$('.background_shelves').css({
			'display' : 'block',
			'height' : shelves_H + 'px'
		});
		$('.shelves_reason').css('display','block');
	});

	//下架原因
	$('.shelves_btn_y').click(function(){
		$('.shelves_btn_y').attr('disabled',true);
		var reason = $('#unShelve_reason').val();
		if(reason == ''){
			$('.reason_error').css('display','block');
			$('.shelves_btn_y').attr('disabled',false);
			return;
		}
		$('.reason_error').css('display','none');
		var url = contextPath + "/api/product/unShelve";
		var vFD = new FormData(document.getElementById('unShelve_reason_info'));
		var oXHR = new XMLHttpRequest();
		oXHR.addEventListener('load', function(e) {
			var response = e.target.responseText;
			var data = JSON.parse(response);
			//成功
			if (data.error_code == '0') {
				var h = document.body.scrollHeight;
				$('.shelves_reason').css('display','none');
				$('#delS').css('display','block');
				$('.bg_mask').css({
					'display' : 'block',
					'height' : h + 'px'
				});
			} else {
				alert(data.error_msg);
			}
		}, false);
		oXHR.addEventListener('error', function(e) {
			alert("输入参数异常");
			return;
		}, false);
		oXHR.addEventListener('abort', function() {}, false);
		oXHR.open('POST', url);
		oXHR.send(vFD);
	});

	$('.background_shelves').click(function(){
		clean_display();
	});
	$('.shelves_btn_n').click(function(){
		clean_display();
	});
	$('#delSBtn').click(function(){
		clean_display();
		$('#delS').css('display','none');
		window.location.reload();
	});

});

function clean_display(){
	$('.background_shelves').css('display','none');
	$('.shelves_reason').css('display','none');
}