/**
 *  Created by Arley Joe on 2017-10-30 17:15:21
 */

/**
 *  商户列表筛选逻辑
 *  Created by Arley on 2017-10-30 17:56:37.
 */
function searchMerchants () {
    var confirmBtn = $('.merchants_search_confirm');
    var cancelBtn = $('.merchants_search_cancel');
    confirmBtn.off('click').on('click', function () {
        var checkedLetter = getCheckedFirstLetter();
        searchBusinessList(checkedLetter);
    });
    cancelBtn.off('click').on('click', function () {
        var form = $('form[role="form"]');
        form.submit();
    });
}

/**
 *  跳转商户详情页
 *  Created by Arley on 2017-10-30 17:56:37.
 */
function goMerchantDetail () {
    var target = $('#merchantsList tbody tr, .crumbs_item.merchant_name, .edit_cancel');
    target.off('click').on('click', function () {
        var _this = $(this);
        if (!_this.hasClass('no_data')) {
            var mid = $.trim(_this.data('id'));
            locationTo({
                action : contextPath + markUri + '/merchants/detail',
                param : {
                    supplier_id : mid,
                    url : LOCALURL
                }
            });
        }
    });
}
/**
 *  跳转商户放款管理详情页
 *  Created by qichunmei  on 2018年4月13日13:31:56.
 */
function goLoanDetail () {
    var target = $('#loanList tbody tr');
    target.off('click').on('click', function () {
        var _this = $(this);
        if (!_this.hasClass('no_data')) {
            var mid = $.trim(_this.data('id'));
            var pay = $.trim(_this.data('pay_account'));
            var timeorder = $.trim(_this.data('timeorder_type'));
            var receipt = $.trim(_this.data('receipt_type'));
            var order = $.trim(_this.data('orderby_type'));
            var currentPage = $.trim(_this.data('current_page'));
            var diySupplier_name = $.trim(_this.data('supplier_name'));
            locationTo({
                action : contextPath + markUri + '/loan/detailsInfo',
                param : {
                    supplier_id : mid,
                    pay_account: pay,
                    timeorder_type: timeorder,
                    receipt_type: receipt,
                    orderby_type: order,
                    current_page: currentPage,
                    diySupplier_name : diySupplier_name,
                    url : LOCALURL
                }
            });
        }
    });
}


/**
 * 标签管理
 * @author Arley Joe 2017-11-6 17:12:57
 */
function merchantsAddTag () {
    var merchantId = $.trim($('#supplierId').val());
    var btn = $('.tag_manage_btn');
    var tagsWarehouse = btn.find('.tags_warehouse');    // 公库标签列表
    var newBtn = tagsWarehouse.find('.create_tag_btn');     // 新增确定按钮
    var newInput = tagsWarehouse.find('#addTag');       // 新增输入框
    var merchantTags = $('#merchantTags');     // 商户标签列表
    btn.off('click').on('click', function (e) {
        var e = e || window.event;
        e.stopPropagation();
        var _this = $(this);
        (tagsWarehouse.is(':hidden')) ? tagsWarehouse.show() : tagsWarehouse.hide();
    });
    // 阻断弹出层的时间冒泡
    tagsWarehouse.off('click').on('click', function (e) {
        var e = e || window.event;
        e.stopPropagation();
        e.preventDefault();
    });
    // 点击页面其他区域时间关闭标签选择弹出层
    $(document).on('click', function (e) {
        var e = e || window.event;
        e.stopPropagation();
        (tagsWarehouse.is(':hidden')) ? false : tagsWarehouse.hide();
    });

    // 标签增加事件逻辑
    // type: 1：商户标签删除，2：标签库标签删除，3：标签库及商户同时新增，4：从标签库增加到商户
    var addTags = function (label, type, text) {
        redefineAjax({
            data : {
                supplier_id : merchantId,
                label : label,
                type : type
            },
            url : contextPath + '/api/supplier/label/vindicate',
            success : function (res){
                if (res.error_code == 0) {
                    $alert('标签'+ text +'成功', function () {
                        // window.location.reload();
                        if (type == 1) {    // 商户标签删除
                            merchantTags.find('.tag[data-id="'+ label +'"]').remove();
                            tagsWarehouse.find('.tag_item[data-id="'+ label +'"]').removeClass('active');
                        } else if (type == 2) {
                            tagsWarehouse.find('.tag_item[data-id="'+ label +'"]').remove();
                            merchantTags.find('.tag[data-id="'+ label +'"]').remove();
                            tagsWarehouse.hide();
                        } else if (type == 3) {
                            var mlabel = '<li class="tag nowrap lf" data-id="'+ res.label_id +'">\n' +
                            '                                        <span>'+ res.label_name +'</span>\n' +
                            '                                       <em class="delete_btn"></em>\n' +
                            '                                    </li>';
                            merchantTags.find('.tag_manage_btn').before(mlabel);
                            var wlabel = '<li class="tag_item nowrap active" title="'+ res.label_name +'" data-id="'+ res.label_id +'" data-name="'+ res.label_name +'">\n' +
                                '              <span>'+ res.label_name +'</span>' +
                                '              <a href="javascript:" class="delete_tag_btn"></a>' +
                                '        </li>';
                            tagsWarehouse.find('.warehouse_list').append(wlabel).end().hide();
                            newInput.val('');
                        } else if (type == 4) {
                            var tagEle = tagsWarehouse.find('.tag_item[data-id="'+ label +'"]');
                            var name = tagEle.data('name');
                            var mlabel = '<li class="tag nowrap lf" data-id="'+ label +'">\n' +
                                '                                        <span>'+ name +'</span>\n' +
                                '                                       <em class="delete_btn"></em>\n' +
                                '                                    </li>';
                            merchantTags.find('.tag_manage_btn').before(mlabel);
                            tagEle.addClass('active');
                            tagsWarehouse.hide();
                        }
                    });
                } else {
                    $alert(res.error_msg);
                }
            },
            error : function () {
                $alert('标签'+ text +'失败，请重新尝试');
            }
        })
    };

    // 商户标签删除
    $('#merchantTags').on('click', '.delete_btn', function () {
        var _this = $(this);
        var tagId = $.trim(_this.parents('.tag').data('id'));
        addTags(tagId, 1, '删除');
    });

    // 标签库标签删除
    tagsWarehouse.on('click', '.tag_item .delete_tag_btn', function (e) {
        var e = e || window.event;
        e.stopPropagation();
        e.preventDefault();
        var _this = $(this);
        var tagId = $.trim(_this.parents('.tag_item').data('id'));
        dialog('open', {
            title : '删除提醒',
            content : '<div style="padding: 20px 0 20px;line-height:30px;font-size: 14px;"><span>标签删除后将不可恢复，其他已使用该标签的商户将无此标签，</span><br><span>确认继续删除？</span></div>',
            onConfirm : function (d) {
                d.close();
                addTags(tagId, 2, '删除');
            },
            onCancel : function (d) {
                d.close();
                tagsWarehouse.hide();
            }
        });
    });

    // 商户及标签库同时新增标签
    newBtn.off('click').on('click', function (e) {
        var e = e || window.event;
        e.stopPropagation();
        e.preventDefault();
        var tagName = newInput.val();
        if (tagName == '') {
            $alert('标签名称不能为空', function () {
                newInput.focus().attr('placeholder', '请先输入标签名称');
            });
            return;
        } else {
            addTags(tagName, 3, '添加');
        }
    });

    // 从标签库增加到商户
    tagsWarehouse.on('click', '.tag_item', function (e) {
        var e = e || window.event;
        e.stopPropagation();
        e.preventDefault();
        var _this = $(this);
        var tagId = $.trim(_this.data('id'));
        if (_this.hasClass('active')) {
            $alert('该商户已经有此标签，请选择其他标签');
            return;
        } else {
            addTags(tagId, 4, '添加');
        }
    });
}


$(function () {
    searchMerchants();  // 商户列表筛选
});