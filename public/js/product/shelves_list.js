$(function(){
	
	$('#publish_list_btn').click(function(){
		// window.location.href=contextPath+"/product/publishList";
        window.location.href = contextPath + markUri + "/supplier/organization/publishedProducts";
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
                data_num : data_num,
                page_flag : 0
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
    // btn_hover($('.delete_btn'),'delete');
    btn_hover($('.update_btn'),'update');
    btn_hover($('.publish_list_btn'),'shelves');


    //全选按钮
    // $('.select_all_btn').click(function(e){
    //     var e = e || window.event;
    //     e.stopPropagation();
    //     e.preventDefault();
    //     select_all();
    // });
    // $('.select_all_btn .check_img').off("click").on("click",function(e){
    //     var e = e || window.event;
    //     e.stopPropagation();
    //     e.preventDefault();
    //     return select_all();
    // });

    //全选
    $('.table_header_tr .check_img').click(function(){
        var _this = $(this);
        if (_this.hasClass('icon_uncheck')) {
            _this.addClass('icon_check');
            _this.removeClass('icon_uncheck');
            var product_tr = $('.product_tr');
            product_tr.each(function () {
                var check_tr = $(this).find('.check_img');
                if (check_tr.hasClass('icon_uncheck')) {
                    check_tr.removeClass('icon_uncheck');
                    check_tr.addClass('icon_check');
                }
            });
        } else {
            _this.removeClass('icon_check');
            _this.addClass('icon_uncheck');
            var product_tr = $('.product_tr');
            product_tr.each(function () {
                var check_tr = $(this).find('.check_img');
                if (check_tr.hasClass('icon_check')) {
                    check_tr.removeClass('icon_check');
                    check_tr.addClass('icon_uncheck');
                }
            });
        }
    });
    //单个选中
    $('.product_tr .check_img').click(function(){
        var _this = $(this);
        if (_this.hasClass('icon_uncheck')) {
            _this.addClass('icon_check');
            _this.removeClass('icon_uncheck');
            var nums = 0;
            var product_tr = $('.product_tr');
            product_tr.each(function () {
                var check_tr = $(this).find('.check_img');
                if (check_tr.hasClass('icon_check')) {
                    nums++;
                }
            });
            if (nums == product_tr.length) {
                $('.selectall_check').addClass('icon_check');
                $('.selectall_check').removeClass('icon_uncheck');
            } else {
                $('.selectall_check').addClass('icon_uncheck');
                $('.selectall_check').removeClass('icon_check');
            }
        } else {
            _this.removeClass('icon_check');
            _this.addClass('icon_uncheck');
            $('.selectall_check').addClass('icon_uncheck');
            $('.selectall_check').removeClass('icon_check');
        }
    });

    //上架按钮
    $(".update_btn").off("click").on("click", function () {
        var check = $('.product_tr .icon_check').length;
        if (check == '0') {
            $alert('未选中产品，请选择需要上架的产品！');
            return;
        }
        var shelves_num = $('.icon_check').parent().parent().parent().find('.shelves_name').length;//未填写完整标识
        if(shelves_num != "0"){
            var product_name = $('.shelves_name').eq(0).prev().html();
            $alert('您选择上架的产品中，' + product_name + '等' + shelves_num + '个产品必填信息填写不完整，导致其产品不能正常上架，请填写完整后再次上架！');
            return;
        }
        var product_arr = [];
        var product_check = $('table .product_tr');
        product_check.each(function () {
            var _this = $(this);
            if (_this.find(".check_img").hasClass('icon_check')) {
                var id = _this.find(".check_img").attr('id');
                product_arr.push(id);
            }
        });

        // for(var i = 0; i < product_check.length; i++){
        //     var shelves_name = $('table .icon_check').eq(i).parent().parent().parent().find('.shelves_name');
        //     if(shelves_name.length == '0'){
        //         var id = $('table .icon_check').eq(i).attr('id');
        //         product_arr.push(id);
        //     }
        //
        // }
        if(product_arr.length == '0'){
            return;
        }
        $('#shelves_id').val(product_arr.join(','));
        var data = new FormData(document.getElementById('shelves_info'));
        dialog('open', {
            title : '上架提醒',
            content : '<div style="padding: 20px 0 20px;line-height:30px;font-size: 14px;"><span>选中产品将发布上架，确认继续上架？</span></div>',
            onConfirm : function (d) {
                d.close();
                $.ajax({
                    type:'post',
                    timeout:3000,
                    url : contextPath + "/api/product/shelve",
                    data : data,
                    processData : false,      //序列化参数为String类型，默认：true。
                    contentType : false,      //内容编码，文件上传时设为FALSE
                    success : function (res) {
                        if (res.error_code == 0) {
                            $alert('上架成功', function () {
                                window.location.reload();
                            });
                        } else {
                            $alert(res.error_msg);
                        }
                    },
                    error : function () {
                        $alert('上架失败，请重新尝试');
                    }
                });
            },
            onCancel : function (d) {
                d.close();
            }
        });
    });

    //删除按钮
    $(".delete_btn").off("click").on("click", function () {
        var check = $('.icon_check').length;
        if(check == '0'){
            $alert('未选中产品，请选择需要删除的产品！');
            return;
        }
        var delete_check = $('.product_tr .icon_check');
        var delete_arr = [];
        for(var i = 0; i < delete_check.length; i++){
            var id = delete_check.eq(i).attr('id');
            delete_arr.push(id);
        }
        if(delete_arr.length == '0'){
            return;
        }
        $('#delete_id').val(delete_arr.join(','));
        var data = new FormData(document.getElementById('delete_info'));
        dialog('open', {
            title : '删除提醒',
            content : '<div style="padding: 20px 0 20px;line-height:30px;font-size: 14px;"><span>删除后产品将不可恢复，确认继续删除？</span></div>',
            onConfirm : function (d) {
                d.close();
                $.ajax({
                    type:'post',
                    timeout:3000,
                    url : contextPath + "/api/product/delete",
                    data : data,
                    processData : false,      //序列化参数为String类型，默认：true。
                    contentType : false,      //内容编码，文件上传时设为FALSE
                    success : function (res) {
                        if (res.error_code == 0) {
                            $alert('删除成功', function () {
                                window.location.reload();
                            });
                        } else {
                            $alert(res.error_msg);
                        }
                    },
                    error : function () {
                        $alert('删除失败，请重新尝试');
                    }
                });
            },
            onCancel : function (d) {
                d.close();
            }
        });
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
// function select_all(){
//     var check_img_length = $('.product_table .check').length;
//     if(check_img_length == '0'){
//         $('.select_all_btn .check_img').removeClass('icon_check');
//         $('.select_all_btn .check_img').addClass('icon_uncheck');
//         return;
//     }
//     var check = $('.select_all_btn').find('.icon_check').length;
//     if(check == '0'){
//        return $('.check_img').removeClass('icon_uncheck').addClass('icon_check');
//     }else{
//        return $('.check_img').removeClass('icon_check').addClass('icon_uncheck');
//     }
// }