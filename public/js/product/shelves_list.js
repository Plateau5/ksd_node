$(function(){
	
	$('#publish_list_btn').click(function(){
		window.location.href=contextPath+"/product/publishList";
	});
	/*$('.detail').click(function(){
		var id = $(this).attr('lang');
		var data_num = $(this).attr('data_num');
		window.location.href=contextPath+ markUri + "/supplier/organization/productDetail?id="+id+"&data_num="+data_num;
	});*/
    $(".view_detail_icon").off("click").on("click", function () {
        var _this = $(this);
        var id = _this.attr('lang');
        var data_num = _this.attr('data_num');
        locationTo({
            action : contextPath + markUri + "/supplier/organization/productDetail",
            param : {
                id : id,
                data_num : data_num
            }
        });
    });
    $(".edit_detail_icon").off("click").on("click", function () {
        var _this = $(this);
        var id = _this.attr('lang');
        locationTo({
            action : contextPath + markUri + "/supplier/organization/productEdit",
            param : {
                id : id
            }
        });
    });


    //筛选
	$('.select_condition').change(function() {
		$('#form_search').submit();
	});
	

    //操作按钮交互
    btn_hover($('.select_all_btn'));
    btn_hover($('.delete_btn'),'delete');
    btn_hover($('.update_btn'),'update');
    btn_hover($('.publish_list_btn'),'shelves');


    //全选按钮
    $('.select_all_btn').click(function(e){
        var e = e || window.event;
        e.stopPropagation();
        e.preventDefault();
        select_all();
    });
    $('.select_all_btn .check_img').off("click").on("click",function(e){
        var e = e || window.event;
        e.stopPropagation();
        e.preventDefault();
        return select_all();
    });

    $('.product_table .check').click(function(){
        var className = $('.product_table .check .check_img').attr('class');
        if(className.indexOf('icon_check') < '0'){
            var check_length = $('.product_table').find('icon_uncheck');
            if(check_length != '0'){
                $('.select_all_btn .check_img').removeClass('icon_check');
                $('.select_all_btn .check_img').addClass('icon_uncheck');
            }
            return;
        }
        var check_img = $('.product_table .icon_uncheck').length;
        if(check_img == '0'){
            $('.select_all_btn .check_img').addClass('icon_check');
            $('.select_all_btn .check_img').removeClass('icon_uncheck');
        }
    });

    //上架按钮
    $('.update_btn').click(function(){
        var check = $('.icon_check').length;
        var del_H = document.body.scrollHeight;
        $('.invSText div').html('上架提醒');
        $("#delQ").css({
            'display' : 'block',
            'height' : del_H + 'px'
        });
        if(check == '0'){
            $('.del_txt1').html('未选中产品');
            $('.del_txt2').html('请选择需要上架的产品！');
            $('#delQXBtn').css('display','none');
            $('#delQDBtn').css('marginLeft','35%');
            $('#flag').val('shelves');
            return;
        }
        var shelves_num = $('.icon_check').parent().parent().parent().find('.shelves_name').length;//未填写完整标识
        if(shelves_num != "0"){
            var product_name = $('.shelves_name').eq(0).prev().html();
            $('.del_txt1').html('您选择上架的产品中，<span style="color:#1DC6BC;">' + product_name + '</span>等' + shelves_num + '个产品必填信息填写不完整');
            $('.del_txt2').html('导致其产品不能正常上架，请填写完整后再次上架！');
            $('#delQXBtn').css('display','');
            $('#delQDBtn').css('marginLeft','20%');
            $('#flag').val('shelves');
            return;
        }
        $('.del_txt1').html('选中产品将发布上架');
        $('.del_txt2').html('确认继续上架？');
        $('#delQXBtn').css('display','');
        $('#delQDBtn').css('marginLeft','20%');
        $('#flag').val('shelves');
    });

    //删除按钮
    $('.delete_btn').click(function(){
        var del_H = document.body.scrollHeight;
        $('.invSText div').html('删除提醒');
        var check = $('.icon_check').length;
        $("#delQ").css({
            'display' : 'block',
            'height' : del_H + 'px'
        });
        if(check == '0'){
            $('.del_txt1').html('未选中产品');
            $('.del_txt2').html('请选择需要删除的产品！');
            $('#delQXBtn').css('display','none');
            $('#delQDBtn').css('marginLeft','35%');
            $('#flag').val('delete');
            return;
        }
        $('.del_txt1').html('删除后产品将不可恢复，');
        $('.del_txt2').html('确认继续删除？');
        $('#delQXBtn').css('display','');
        $('#delQDBtn').css('marginLeft','20%');
        $('#flag').val('delete');
    });

    //取消删除
    $('#delQXBtn').click(function(){
        $('#delQ').css('display','none');
    });

    //确定按钮
    $('#delQDBtn').click(function(){
        var display = $('#delQXBtn').css('display');
        if(display == 'none'){
            $('#delQ').css('display','none');
            return;
        }
        var delLang = $('#delLang').val();
        if(delLang == ''){
            var h = document.body.scrollHeight;
            $('#delQ').css('display','none');
            $('#delS').css({
                'height' : h + 'px',
                'display' : 'display'
            });
        }
        var flag = $('#flag').val();
        if(flag == 'shelves'){
            //进行产品上架操作
            var product_check = $('table .icon_check');
            var product_arr = [];
            for(var i = 0; i < product_check.length; i++){
                var shelves_name = $('table .icon_check').eq(i).parent().parent().parent().find('.shelves_name');
                if(shelves_name.length == '0'){
                    var id = $('table .icon_check').eq(i).attr('id');
                    product_arr.push(id);
                }

            }
            if(product_arr.length == '0'){
                return;
            }
            $('#shelves_id').val(product_arr.join(','));
            var vFD = new FormData(document.getElementById('shelves_info'));
            var oXHR = new XMLHttpRequest();
            var url = contextPath+"/api/product/shelve";
            oXHR.addEventListener('load', function(e) {
                var response = e.target.responseText;
                var data = JSON.parse(response);
                //成功
                if (data.error_code == '0') {
                    var h = document.body.scrollHeight;
                    $('#delQ').css('display','none');
                    $('#delS').css({
                        'height' : h + 'px',
                        'display' : 'display'
                    });
                    window.location.reload();
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
        }else{
            //进行产品删除操作
            var delete_check = $('table .icon_check');
            var delete_arr = [];
            for(var i = 0; i < delete_check.length; i++){
                var id = $('table .icon_check').eq(i).attr('id');
                    delete_arr.push(id);
            }
            if(delete_arr.length == '0'){
                return;
            }
            $('#delete_id').val(delete_arr.join(','));
            var vFD = new FormData(document.getElementById('delete_info'));
            var oXHR = new XMLHttpRequest();
            var url = contextPath+"/api/product/delete";
            oXHR.addEventListener('load', function(e) {
                var response = e.target.responseText;
                var data = JSON.parse(response);
                //成功
                if (data.error_code == '0') {
                    var h = document.body.scrollHeight;
                    $('#delQ').css('display','none');
                    $('#delS').css({
                        'height' : h + 'px',
                        'display' : 'display'
                    });
                    window.location.reload();
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
        }
    });
});

//操作按钮交互
function btn_hover(obj,img_name){
    obj.hover(function(){
        if(img_name) {
            $(this).find('img').attr('src','/static/img/product/icon_' + img_name + '_hover.png');
        }
        $(this).css('color','#1DC6BC');
    },function(){
        if(img_name) {
            $(this).find('img').attr('src', '/static/img/product/icon_' + img_name + '.png');
        }
        $(this).css('color','#808891');
    });
}

//全选操作
function select_all(){
    var check_img_length = $('.product_table .check').length;
    if(check_img_length == '0'){
        $('.select_all_btn .check_img').removeClass('icon_check');
        $('.select_all_btn .check_img').addClass('icon_uncheck');
        return;
    }
    var check = $('.select_all_btn').find('.icon_check').length;
    if(check == '0'){
       return $('.check_img').removeClass('icon_uncheck').addClass('icon_check');
    }else{
       return $('.check_img').removeClass('icon_check').addClass('icon_uncheck');
    }
}