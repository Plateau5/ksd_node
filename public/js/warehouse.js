/**
 * Created by Arley on 2017/7/5.
 */
/**
 * GPS订单审核结果页的逻辑
 * @author Arley Joe 2017/07/05
 * RECEIVETYPE {Number} 领取类型：1：当面交付 2：快递邮寄 3：不同意
 * <input type="hidden" value="${delData}" id="delSnStr">
 <input type="hidden" value="${data}" id="sendSn">
 <input type="hidden" value="{{gps_apply_id}}" id="applyOrder">
 */
function getAuditData () {
    var data = {};
    data.id = $.trim($('#applyOrder').val());
    data.gps_ids = $.trim($('#sendSn').val());
    data.delGps_ids = $.trim($('#delSnStr').val());
    try {
        if (RECEIVETYPE === 1) {
            var receiptor = $.trim($('#receiptor').val());
            if (receiptor == '') {
                $alert('请填写领取人');
                return false;
            } else {
                var remark = $.trim($('#remark').val());
                data.receiver = receiptor;
                data.remark = remark;
                return data;
            }
        } else if (RECEIVETYPE === 2) {
            var expressCompany = $.trim($("#expressCompany option:selected").val());
            var courierNumber = $.trim($('#courierNumber').val());
            var remark = $.trim($('#remark').val());
            if (expressCompany == '') {
                $alert('请先选择快递公司');
                return false;
            } else if (courierNumber == '') {
                $alert('请填写快递单号');
                return false;
            } else {
                data.express_id = expressCompany;
                data.express_code = courierNumber;
                data.remark = remark;
                return data;
            }
        } else if (RECEIVETYPE === 3) {
            var reason = $.trim($('#reason').val());
            data.reason = reason;
            return data;
        }
    } catch (e) {
        console.log(e.description);
    }
}
// 确定按钮的事件绑定
function bindSubmitEvent () {
    var btn = $("#submitBtn");
    btn.off('click').on('click', function () {
        submitEvent(btn);
    });
}
// 提交逻辑
function submitEvent (b) {
    var msg = '';
    if (RECEIVETYPE === 1 || RECEIVETYPE === 2) {
        msg = '发送成功';
    } else if (RECEIVETYPE === 3) {
        msg = '操作成功';
    }
    var data = getAuditData();
    if (data) {
        b.off('click');
        var url = contextPath + '/api/gps/apply/confirm';
        $.ajax({
            type:'post',
            timeout:50000,
            url : url,
            data : data,
            beforeSend : function () {
                $('#loading').show();
            },
            success : function (res) {
                $('#loading').hide();
                if (res.error_code == 0) {
                    $alert(msg, function () {
                        locationTo({
                            action : contextPath + markUri + "/gps/apply/list",
                            param : reqParamsStr
                        })
                    })
                } else {
                    bindSubmitEvent();
                    $alert(res.error_msg);
                }
            },
            error : function () {
                $('#loading').hide();
                bindSubmitEvent();
                $alert('网络异常，请稍后重试');
            }
        });
    } else {
        return;
    }
}

function checkRepeat (newStr, oldValue, tips) {
    if ($.inArray(newStr, oldValue) != -1) {
        $alert(tips);
        return true;
    } else {
        return false;
    }
}

// 使用人员的模糊查询功能
function fuzzyQuery (res) {
    var queryStr = $.trim($('#user').val()),
            queryArr = queryStr.split(""),
            data = res,
            resArr;
    if(queryStr) {
        for (var i = 0, len = queryArr.length; i < len; i++) {
            resArr = [];
            for (var k = 0; k < data.length; k++) {
                if (data[k].name.indexOf(queryArr[i]) != -1) {
                    resArr.push(data[k]);
                }
            }
            data = resArr;
        }
        return resArr;
    }
}
//创建模糊查询结果展示并绑定事件
function showSearchResult (res) {
    var html = [];
    if (res == undefined || res.length == 0 || res.length == undefined) {
        return $('.user_list').html('<li class="res_item" style="text-align: center;">暂无数据</li>');
    } else {
        for (var i = 0, len = res.length; i < len; i++) {
            var str = '';
            /*str = '<li class="res_item" title="">' +
             '<span class="name nowrap" title="" data-lId="' + res[i].id + '">' + res[i].name + '</span> ' +
             '<span class="p_dep nowrap" title="">' + (res[i].department_name ? res[i].department_name : '暂无部门') + '</span> ' +
             '</li>';*/
            str = '<li class="user_item"  data-id="' + res[i].id + '" data-name="' + res[i].name + '">\
                                <div class="name inline_block nowrap">' + res[i].name + '</div>\
                                <div class="user_mark inline_block nowrap">' + (res[i].account ? res[i].account : '暂无部门') + '</div>\
                            </li>'
            html.push(str);
            $('.user_list').html(html.join(""));
        }
    }
}

//注册全局隐藏人员列表项
function registerHideEmployeeList () {
    $("body").on('click', function (e) {
        var targetId = e.target.id;
        if (targetId != 'user') {
            if (!$('.set_box').is(":hidden")){
                $('.set_box').hide();
            }
        }
    });
}