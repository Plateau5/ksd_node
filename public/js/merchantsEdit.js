/**
 *  Created by Arley Joe on 2017-11-1 14:37:01
 */

/**
 * 根据业务类型切换店面类型视图
 * @author Arley Joe 2017-11-1 16:11:48
 */
function switchStoreType () {
    var bType = $('#businessType').find('#carType');     // 业务类型select
    bType.off("change").on("change", function () {
        var opt = $(this).find('option:selected');
        var id = $.trim(opt.val());
        renderStore(id);
    });
    // 切换店面类型的视图更新  v：业务类型ID
    var renderStore = function (v) {
        var storeCont = $('#storeType').find('.column_val');        // 店面类型容器
        if (v == '0') {
            var elemStr = getRenderStr(storeType.newType, v);
        } else if (v == '1') {
            var elemStr = getRenderStr(storeType.oldType, v);
        } else if (v == '2') {
            var elemStr = getRenderStr(storeType.allType, v);
        }
        storeCont.html(elemStr);
    };
    // 获取渲染HTML代码片段：list：源数据 {Array}；businessType：业务类型ID
    var getRenderStr = function (list, businessType) {
        var elem = '';
        //选中状态说明：新车(id:0)/新车&二手车(id:2)选中4S店(id:4)、二手车(id:1)选中展厅（id:9）
        for (var i = 0, len = list.length; i < len; i++) {
            elem += '<div class="form_group mar6">\n' +
                '         <input id="store_type_'+ (i + 1) +'" type="radio" '+ ((((businessType == '1' && list[i].id == 9) ? ('checked="checked"') : '')) || (((businessType != '1' && list[i].id == 4) ? ('checked="checked"') : ''))) +'class="" name="type" value="'+ list[i].id +'" />\n' +
                '         <label for="store_type_'+ (i + 1) +'" class="checked">'+ list[i].value +'</label>\n' +
                '    </div>';
        }
        return elem;
    }
}

/**
 * 获取拥有者
 * @author Arley Joe 2017-11-1 17:35:23
 * @returns {Array}
 */
function getFollowPeople () {
    var followArr = [];
    var fpElem = $('.person_list .person');
    fpElem.each(function () {
        var _this = $(this);
        var id = $.trim(_this.data('id'));
        followArr.push(id);
    });
    return followArr;
}

/**
 * 根据拥有类型校验拥有者人数
 * @author Arley Joe 2017-11-1 16:36:51
 */
function switchOwnPerson () {
    var ownType = $('#ownType').find('#ownTypeS');      // 拥有类型的select
    var ownPerson = $('#ownPerson').find('#ownPersonInput');        // 拥有者数据存储input
    ownType.off("change").on("change", function () {
        var opt = $(this).find('option:selected');
        var id = $.trim(opt.val());
        if (id == '1') {    // 私海
            $('#ownPerson').show();
            var ids = getFollowPeople();
            ownPerson.val(ids.join(','));
        } else if (id == '2') {     // 公海
            $('#ownPerson').hide();
            ownPerson.val('');
        }
    });
}

/**
 * 添加拥有者
 * @author Arley Joe 2017-11-1 16:37:30
 */
function addOwnPerson () {
    var setObj = {
        "depName" : $(".department_name"),
        "mName" : $(".manager_name .p_name"),
        "btn" : $("#addOwnPersonBtn"),
        "sBox" : $(".search_box"),
        "input" : $(".m_search "),
        "resBox" : $(".search_result"),
        "personList" : $('.person_list')
    };
    //负责人的模糊查询功能
    function searchManagers () {
        setObj.btn.off("click").on("click", function (e) {
            var e = e || window.event;
            e.stopPropagation();
            var allFollow = getFollowPeople();
            if (allFollow.length >= 20){
                $alert('最多添加20个拥有者');
                return false;
            }
            setObj.sBox.is(':hidden') ? setObj.sBox.show() : setObj.sBox.hide();
            setObj.input.focus();
            setObj.input.off("input click").on("input click", function (e) {
                var e = e || window.event;
                e.stopPropagation();
                var val = $.trim($(this).val());
                if (val) {
                    var cityId = $.trim($('#businessCity').find('option:selected').val());
                    //var workCityList = jsonsql.query('select * from json where (work_city==' + cityId + ')', empList);  // 通过jsonsql查询匹配数据
                    var queryObj = fuzzyQuery(empList);
                    //var queryObj = emp_list;
                    //console.log(queryObj);
                    showSearchResult(queryObj);
                }
            });

        })
    }

    // 注册点击其他区域关闭弹出层
    $(document).on('click', function (e) {
        var e = e || window.event;
        e.stopPropagation();
        setObj.sBox.is(':hidden') ? false : setObj.sBox.hide();
    });
    //模糊查询逻辑
    function fuzzyQuery (res) {
        var queryStr = $.trim(setObj.input.val()),
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
        }
        return resArr;
    }
    //创建模糊查询结果展示并绑定事件
    function showSearchResult (res) {
        var html = [];
        if (res.length == 0 || res.length == undefined) {
            return setObj.resBox.html('<li class="res_item" style="text-align: center;">暂无数据</li>');
        } else {
            for (var i = 0, len = res.length; i < len; i++) {
                var str = '';
                str =   '<li class="res_item" title="">' +
                    '<span class="name nowrap" title="" data-lId="'+ res[i].id +'">' + res[i].name + '</span> ' +
                    '<span class="p_dep nowrap" title="">' + (res[i].department_name ? res[i].department_name : '暂无部门') + '</span> ' +
                    '</li>';
                html.push(str);
            }
        }


        setObj.resBox.html(html.join(""));

        var item = setObj.resBox.find(".res_item");
        item.each(function () {
            var t = $(this);
            t.off("click").on("click", function (e) {
                var e = e || window.event;
                e.stopPropagation();
                var _this = $(this);
                var leaderEle = _this.find(".name"),
                    pName = leaderEle.text(),
                    lId = leaderEle.attr("data-lId");

                setObj.input.val("");
                setObj.resBox.html("");
                setObj.sBox.hide();
                // 创建拥有者展示数据
                var ownStr = '<li class="person" data-id="'+ lId +'">'+ pName +'<em class="delete_btn"></em></li>';
                setObj.personList.find('.choose_box').before(ownStr);
                var endPerson = getFollowPeople().join(',');
                $('#ownPersonInput').val(endPerson);
            });
        });
    }
    searchManagers();
}

/**
 * 删除拥有者
 * @author Arley Joe 2017-11-1 18:23:34
 */
function deleteFollowPeople () {
    var delBtnParent = $('.person_list');   // 拥有者数据列表元素
    delBtnParent.off('click').on('click', '.delete_btn', function () {
        var _this = $(this);
        _this.parents('.person').remove();
        var endPerson = getFollowPeople().join(',');
        $('#ownPersonInput').val(endPerson);
    });
}


/**
 * 删除联系人或是账户信息
 * @author Arley Joe 2017-11-1 16:36:51
 */
function deleteLinkOrRecord () {
    var addBtnParents = $('.merchants_edit');   // 创建商户的主容器
    // 删除联系人数据保留
    var deleteLinkList = [];
    // 删除账户信息数据保留
    var deleteRecordList = [];
    addBtnParents.on('click', '.delete_sm_btn', function (e) {
        var e = e || window.event;
        e.stopPropagation();
        e.preventDefault();
        var _this = $(this);
        var id = $.trim(_this.data('id'));  // 联系人ID
        var type = $.trim(_this.data('type'));    // 删除类型：联系人：1，账户信息：2
        var linkCount = Number($.trim($('#linkCount').val()));  // 联系人总数
        var recordCount = Number($.trim($('#recordCount').val()));  // 账户总数
        if (type == 1) {    // 联系人
            if (linkCount > 1) {
                if (_this.parents('.link_option').hasClass('his_link')){
                    var t = _this.parents('.link_option');  // 联系人container
                    var link = {
                        id : $.trim(t.find('.link_name').data('id')),
                        name : $.trim(t.find('.link_name').val()),
                        status : 0,
                        phone : $.trim(t.find('.link_phone').val()),
                        position_id : $.trim(t.find('.position_id option:selected').val()),
                        wechat : $.trim(t.find('.wechat').val()),
                        gender : $.trim(t.find('.gender option:selected').val()),
                        birthday : $.trim(t.find('.birthday').val()),
                        remark : $.trim(t.find('.remark').val())
                    };
                    deleteLinkList.push(link);
                    var oldDeleteLink = $('#deleteLinkList').val();     // 已经删除的联系人
                    $.merge(oldDeleteLink, deleteLinkList);     // 最终删除的联系人
                    $('#deleteLinkList').val(JSON.stringify(deleteLinkList));
                }

                _this.parents('.link_option').remove();
                linkCount -= 1;
                $('#linkCount').val(linkCount);
                if (linkCount <= 1) {
                    settingBtn('.link_option');
                    $('.link_option').eq(0).find('.delete_sm_btn').remove();
                } else {
                    settingBtn('.link_option');
                }
            }
        } else if (type == 2) {    // 账户信息
            if (recordCount > 1) {
                if (_this.parents('.record_option').hasClass('his_record')){
                    var t = _this.parents('.record_option');    // 当前账户信息container
                    var accountUse = t.find('input.account_use[type="checkbox"][checked="checked"]');
                    var accountUseArr = [];
                    accountUse.each(function () {
                        var _this = $(this);
                        var v = _this.val().trim();
                        accountUseArr.push(v);
                    });
                    var record = {
                        id : $.trim(t.find('.account_name').data('id')),
                        account_name : $.trim(t.find('.account_name').val()),
                        status : 0,
                        bank_no : $.trim(t.find('.bank_no').val()),
                        open_bank : $.trim(t.find('.open_bank').val()),
                        account_type : $.trim(t.find('.account_type option:selected').val()),
                        account_use : accountUseArr.join(',')
                    };
                    deleteRecordList.push(record);
                    var oldDeleteRecord = $('#deleteLinkList').val();     // 已经删除的账户信息
                    $.merge(oldDeleteRecord, deleteRecordList);     // 最终删除的账户信息
                    $('#deleteRecordList').val(JSON.stringify(deleteRecordList));
                }


                _this.parents('.record_option').remove();
                recordCount -= 1;
                $('#recordCount').val(recordCount);
                if (recordCount <= 1) {
                    settingBtn('.record_option');
                    $('.record_option').eq(0).find('.delete_sm_btn').remove();
                } else {
                    settingBtn('.record_option');
                }
            }
        }
    });

    var settingBtn = function (target) {
        var item = $(target);   // 账户|联系人容器
        var len = item.length;  // 总个数
        if (len < 0) {
            item.find('.delete_sm_btn').remove();
        } else {
            item.each(function (i) {
                var _this = $(this);
                var addBtnCount = Number(_this.find('.btn_box').find('.add_sm_btn').length);   // 添加按钮个数
                if (target == '.link_option') {
                    _this.attr('id', 'linkPeople'+ (i + 1));
                    // 设置title文本及id
                    if (i == 0) {
                        _this.find('.options_title').text('联系人信息');
                    } else {
                        _this.find('.options_title').text('联系人信息('+ (i + 1) +')');
                    }
                    // 增加删除按钮
                    if (addBtnCount < 1) {
                        var id = _this.find('.delete_sm_btn').data('id');
                        if (i == len - 1) {
                            _this.find('.btn_box').find('.delete_sm_btn').before('<a href="javascript:" class="add_sm_btn" data-type="1" data-id="'+ id +'">添加联系人</a>');
                        }
                    }

                } else if (target == '.record_option') {
                    _this.attr('id', 'recordInfo'+ (i + 1));
                    // 设置title文本及id
                    if (i == 0) {
                        _this.find('.options_title').text('账户信息');
                    } else {
                        _this.find('.options_title').text('账户信息('+ (i + 1) +')');
                    }
                    // 增加删除按钮
                    if (addBtnCount < 1) {
                        var id = _this.find('.delete_sm_btn').data('id');
                        if (i == len - 1) {
                            _this.find('.btn_box').find('.delete_sm_btn').before('<a href="javascript:" class="add_sm_btn" data-type="2" data-id="'+ id +'">添加账户</a>');
                        }
                    }
                }
            });
        }
    }
}

/**
 * 添加联系人或是账户信息
 * @author Arley Joe 2017-11-2 11:31:27
 */
function addLinkOrRecord () {
    var addBtnParents = $('.merchants_edit');   // 创建商户的主容器
    addBtnParents.on('click', '.add_sm_btn', function (e) {
        var e = e || window.event;
        e.stopPropagation();
        e.preventDefault();
        var _this = $(this);
        var id = $.trim(_this.data('id'));  // 联系人|账户ID
        var type = $.trim(_this.data('type'));    // 删除类型：联系人：1，账户信息：2
        var linkCount = Number($.trim($('#linkCount').val()));  // 联系人总数
        var recordCount = Number($.trim($('#recordCount').val()));  // 账户总数
        if (type == 1) {    // 联系人
            var timestamp = new Date().getTime();
            var linkStr = '<div class="form_content form_options merchants_create link_option new_link" id="linkPeople'+ (linkCount + 1) +'">\n' +
                '                    <form action="" class="basic_info_edit">\n' +
                '                        <!-- 联系人信息 Begin -->\n' +
                '                        <div class="options_title">联系人信息('+ (Number(linkCount) + 1) +')</div>\n' +
                '                        <div class="option_item">\n' +
                '                            <div class="column_name">\n' +
                '                                <span class="options_name"><span class="require_icon">*</span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span>\n' +
                '                            </div>\n' +
                '                            <div class="column_val">\n' +
                '                                <input type="text"   class="requireTrue link_name" data-text="联系人姓名" maxlength="20"  value="" placeholder="请输入联系人姓名"  />\n' +
                '                                <span class="tips_info">(*请输入联系人名称)</span>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div class="option_item">\n' +
                '                            <div class="column_name">\n' +
                '                                <span class="options_name"><span class="require_icon">*</span>手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机：</span>\n' +
                '                            </div>\n' +
                '                            <div class="column_val">\n' +
                '                                <input type="text"  oninput="checkNum($(this));" class="requireTrue link_phone" data-text="手机" maxlength="11" value="" placeholder="请输入手机号码"  />\n' +
                '                                <span class="tips_info">(*请输入手机号)</span>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div class="option_item">\n' +
                '                            <div class="column_name">\n' +
                '                                <span class="options_name"><span class="require_icon">*</span>职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;务：</span>\n' +
                '                            </div>\n' +
                '                            <div class="column_val">\n' +
                '                                <select name=""  class="position_id">\n' +
                '                                    <option value="8" selected="selected">店长</option>\n' +
                '                                    <option value="6">门店经理</option>\n' +
                '                                    <option value="7">销售主管</option>\n' +
                '                                    <option value="9">销售专员</option>\n' +
                '                                </select>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div class="option_item">\n' +
                '                            <div class="column_name">\n' +
                '                                <span class="options_name">微&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;信：</span>\n' +
                '                            </div>\n' +
                '                            <div class="column_val">\n' +
                '                                <input type="text"  class="wechat"  maxlength="30" value="" placeholder="请输入微信号"  />\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div class="option_item">\n' +
                '                            <div class="column_name">\n' +
                '                                <span class="options_name">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span>\n' +
                '                            </div>\n' +
                '                            <div class="column_val">\n' +
                '                                <select name=""  class="gender">\n' +
                '                                    <option value="1" selected="selected">男</option>\n' +
                '                                    <option value="0">女</option>\n' +
                '                                </select>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div class="option_item">\n' +
                '                            <div class="column_name">\n' +
                '                                <span class="options_name">生&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日：</span>\n' +
                '                            </div>\n' +
                '                            <div class="column_val">\n' +
                '                                <input type="text" class="birthday new_birthday wicon" name="" value="" placeholder="请选择联系人生日" readonly="readonly" />\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div class="option_item whole_line remark_item">\n' +
                '                            <div class="column_name">\n' +
                '                                <span class="options_name">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>\n' +
                '                            </div>\n' +
                '                            <div class="column_val">\n' +
                '                                <textarea name="" maxlength="300" cols="30" rows="10" class="remark" placeholder="请输入备注内容"></textarea>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </form>\n' +
                '                    <div class="btn_box text_left clearfix">\n' +
                '                        <a href="javascript:" class="add_sm_btn" data-type="1" data-id="'+ timestamp +'">添加联系人</a>\n' +
                '                        <a href="javascript:" class="delete_sm_btn" data-type="1" data-id="'+ timestamp +'">删除联系人</a>\n' +
                '                    </div>\n' +
                '                </div>';
            $('#linkPeople'+ linkCount).after(linkStr);
            linkCount += 1;
            $('#linkCount').val(linkCount);
            initDateAll('.birthday.new_birthday');      // 加载日期插件
            settingBtn('.link_option');
        } else if (type == 2) {    // 账户信息
            var timestamp = new Date().getTime();
            var recordStr = '<div class="form_content form_options merchants_create record_option new_record" id="recordInfo'+ (recordCount + 1) +'">\n' +
                '                    <form action="" class="basic_info_edit">\n' +
                '                        <!-- 证件信息 Begin -->\n' +
                '                        <div class="options_title">账户信息('+ (Number(recordCount) + 1) +')</div>\n' +
                '                        <div class="option_item">\n' +
                '                            <div class="column_name">\n' +
                '                                <span class="options_name"><span class="require_icon">*</span>账户类型：</span>\n' +
                '                            </div>\n' +
                '                            <div class="column_val">\n' +
                '                                <select name=""  class="account_type">\n' +
                '                                    <option value="1" selected="selected">公户</option>\n' +
                '                                    <option value="2">法人</option>\n' +
                '                                    <option value="3">其他合伙人</option>\n' +
                '                                    <option value="4">其他人员</option>\n' +
                '                                </select>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div class="option_item">\n' +
                '                            <div class="column_name">\n' +
                '                               <em class="require_icon">*</em>\n' +
                '                                <span class="options_name">账户用途：</span>\n' +
                '                            </div>\n' +
                '                               <div class="column_val">\n' +
                '                                    <div class="form_group">\n' +
                '                                        <input id="account_use1" type="checkbox" class="account_use" name="account_use"  value="1" />\n' +
                '                                        <label for="account_use1">车款</label>\n' +
                '                                    </div>\n' +
                '                                    <div class="form_group">\n' +
                '                                        <input id="account_use2" type="checkbox" class="account_use" name="account_use" value="2" />\n' +
                '                                        <label for="account_use2">返点</label>\n' +
                '                                    </div>\n' +
                '                                    <div class="form_group">\n' +
                '                                        <input id="account_use3" type="checkbox" class="account_use" name="account_use" value="3" />\n' +
                '                                        <label for="account_use3">杂费</label>\n' +
                '                                    </div>\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        <div class="option_item">\n' +
                '                            <div class="column_name">\n' +
                '                                <span class="options_name"><span class="require_icon">*</span>账&nbsp;户&nbsp;名：</span>\n' +
                '                            </div>\n' +
                '                            <div class="column_val">\n' +
                '                                <input type="text" value="" class="requireTrue account_name" data-text="账户名" maxlength="30" placeholder="请输入账户名" />\n' +
                '                                <span class="tips_info">(*请输入账户名)</span>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div class="option_item">\n' +
                '                            <div class="column_name">\n' +
                '                                <span class="options_name"><span class="require_icon">*</span>银行卡号：</span>\n' +
                '                            </div>\n' +
                '                            <div class="column_val">\n' +
                '                                <input type="text" onkeyup="this.value=this.value.replace(/\\D/g,\'\')" class="requireTrue bank_no" data-text="银行卡号" maxlength="30" value="" placeholder="请输入银行卡号" />\n' +
                '                                <span class="tips_info">(*请输入银行卡号)</span>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div class="option_item">\n' +
                '                            <div class="column_name">\n' +
                '                                <span class="options_name"><span class="require_icon">*</span>开&nbsp;户&nbsp;行：</span>\n' +
                '                            </div>\n' +
                '                            <div class="column_val">\n' +
                '                                <input type="text"  class="requireTrue open_bank" data-text="开户行" maxlength="30" value="" placeholder="请输入开户行" />\n' +
                '                                <span class="tips_info">(*请输入开户行)</span>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </form>\n' +
                '                    <div class="btn_box text_left clearfix">\n' +
                '                        <a href="javascript:" class="add_sm_btn" data-type="2" data-id="'+ timestamp +'">添加账户</a>\n' +
                '                        <a href="javascript:" class="delete_sm_btn" data-type="2" data-id="'+ timestamp +'">删除账户</a>\n' +
                '                    </div>\n' +
                '                </div>';
            $('#recordInfo'+ recordCount).after(recordStr);
            recordCount += 1;
            $('#recordCount').val(recordCount);
            settingBtn('.record_option');
        }
    });

    var settingBtn = function (target) {
        var item = $(target);
        var len = item.length;
        if (len > 1) {
            item.each(function (i){
                var _this = $(this);
                if (i == 0) {
                    var delBtnCount = Number(_this.find('.btn_box').find('.delete_sm_btn').length);   // 删除按钮个数
                    if (delBtnCount < 1) {
                        var id = _this.find('.add_sm_btn').data('id');
                        if (target == '.record_option') {
                            _this.find('.btn_box').append('<a href="javascript:" class="delete_sm_btn" data-type="2" data-id="'+ id +'">删除账户</a>');
                        } else if (target == '.link_option') {
                            _this.find('.btn_box').append('<a href="javascript:" class="delete_sm_btn" data-type="1" data-id="'+ id +'">删除联系人</a>');
                        }
                    }
                    _this.find('.add_sm_btn').remove();
                } else if (i != (len - 1)) {
                    _this.find('.add_sm_btn').remove();
                }
            });
        }
    }
}

/**
 * 查看图片跳转
 * @author Arley Joe 2017-11-2 11:33:18
 */
function viewImages () {
    var imagesParents = $('.merchants_edit');
    imagesParents.on('click', '.img_md_operate_box .view', function (e) {
        var e = e || window.event;
        e.stopPropagation();
        e.preventDefault();
        var _this = $(this);
        /*var url  = $.trim(_this.data('url'));
        window.open(url);*/
        var img = _this.parents('.img_md_operate_box').siblings('img');
        img.click();
    })
}

/**
 * 删除图片
 * @author Arley Joe 2017-11-2 11:38:04
 */
function deleteImages () {
    var imagesParents = $('.merchants_edit');
    imagesParents.on('click', '.img_md_operate_box .delete', function (e) {
        var e = e || window.event;
        e.stopPropagation();
        e.preventDefault();
        var _this = $(this);
        var id  = $.trim(_this.data('id'));
        /*var ids = [];
        ids.push(id);
        ids = JSON.stringify(ids);*/
        redefineAjax({
            data : {
                file_ids : id
            },
            url : contextPath + '/api/supplier/file/delete',
            success : function (res) {
                if (res.error_code == 0) {
                    $alert('图片删除成功', function () {
                        // 获取父元素
                        var parents = _this.parents('.img_md_box');
                        // 销毁父元素的viewer实例
                        parents[0].viewer.destroy();
                        _this.parents('.img_item').remove();
                        // 删除图片后从新实例化
                        /*var viewer = new Viewer(parents[0], {
                            url: 'data-original',
                            interval : 2000,
                            loop : true
                        });*/
                        viewLargeImage(parents[0]);
                    });
                } else {
                    $alert(res.error_msg);
                }
            },
            error : function () {
                $alert('图片删除异常，请稍后重试');
            }
        })
    })
}


/**
 * 图片上传功能
 * @author Arley Joe 2017-11-2 11:44:28
 */
function uploadImage () {
    fileUpload({
        maxCount : 1,
        filesSize : 2,
        imgFormat : ['png', 'jpg', 'jpeg', 'svg', 'gif', 'bmp', 'raw', 'cdr'],
        needThumbnails : false,
        callback : function (btn) {
            onChoose(btn);
        }
    });
    // 上传逻辑
    var onChoose = function (btn) {
        var type = $.trim(btn.data('type'));
        var data = (btn.parents('.file_upload').find('.file_upload_btn')[0]).files[0];
        var fileExtension = data.name.substring(data.name.lastIndexOf('.'));    // 上传的文件的后缀名
        var fileCount = btn.parents('.img_md_box').find('.img_item').length;    // 该备案字段下现有图片总数
        var filingName = $.trim(btn.parents('.option_item').find('.options_name').text()).replace(/[*:：]/ig, '');   // 字段名称
        var fileName = filingName + '_' + (fileCount + 1) + fileExtension;
        var merchantId = $.trim($('#supplierId').val());
        var form = new FormData();
        form.append("file", data);
        form.append("file_type", type);
        form.append("supplier_id", merchantId);
        form.append("file_name", fileName);     // 用于后台重命名图片物理名字
        var url = contextPath + '/api/supplier/file/upload';
        $.ajax({
            type : "post",
            url : url,
            data : form,
            async : false,
            timeout : 300000,
            processData: false,
            contentType: false,
            beforeSend : function () {
                //elem.loading.show();
                btn.removeClass('disabled');
                btn.parents('.img_md_box').find('.file_upload_btn').replaceWith('<input type="file" class="file_upload_btn" name="file"  value="上传图片" style="display: none" />');
            },
            success : function (res) {
                //elem.loading.hide();
                if (res.error_code == 0) {
                    $alert('图片上传成功');
                    var imgEle = '<a href="javascript:;" class="img_item head_photo" data-type="imgBox">\n' +
                        '             <img data-original="'+ res.image_url +'" src="'+ res.thumbnail +'" alt="'+ fileName +'"/>\n' +
                        '             <div class="img_md_operate_box">\n' +
                        '             <em class="img_md_operate_btn view" data-url="'+ res.image_url +'" style="margin-right: 0" title="查看"></em>\n' +
                        ((type != '99') ?('<em class="img_md_operate_btn delete" data-id="'+ res.file_id +'" title="删除"></em>') : '') +
                        '             </div>\n' +
                        '             </a>';
                    if (type == '99') {
                        btn.parents('.img_md_box').find('.head_photo').replaceWith(imgEle);
                        $('#image_url').val(res.image_url);
                        var parents = btn.parents('.img_md_box');
                        var img = parents.find('.img_item');
                        if (img.length >= 1) {
                            parents[0].viewer.destroy();
                        }
                        viewLargeImage(parents[0]);
                        /*var viewer = new Viewer(parents[0], {
                            url: 'data-original',
                            interval : 2000,
                            loop : true
                        });*/
                    } else {
                        btn.before(imgEle);
                        /* 赋予新图片查看的实例属性 */
                        var parents = btn.parents('.img_md_box');
                        /*var count = parents.find('img').length;
                        var newImgEle = parents.find('img').eq(count - 1)[0];
                        parents[0].viewer.images.push(newImgEle);*/
                        // 销毁父元素
                        var img = parents.find('.img_item');
                        if (img.length > 1) {
                            parents[0].viewer.destroy();
                        }
                        viewLargeImage(parents[0]);
                        /*var viewer = new Viewer(parents[0], {
                            url: 'data-original',
                            interval : 2000,
                            loop : true
                        });*/
                    }
                } else {
                    $alert('图片上传失败，请重试');
                }
            },
            error : function () {
                $alert('图片上传失败，请重试');
            }
        });
    }
}

/**
 * 地图选址功能——高德地图
 * @author Arley Joe 2017-11-3 11:53:40
 */
function settingAddress () {
    var addrElem = $('#businessAddress');    // 地址查询点击区域
    var addrResBox = $('.addr_result_box');     // 地址查询弹出层
    var searchTarget = $('#mapSearch');     // 地址检索输入框（弹出层内部）
    var mapBox = $('.map_box');     // 地图展示区域
    var listBox = $('.addr_list');      // 联想查询结果项
    var kmap = new AMap.Map('map');     // 实例化高德地图
    var noDataEle = '<li class="addr_item text_center no_data">该地址下无查询数据</li>';     // 查询结果无数据展示UI
    kmap.setZoom(16);   // 设置地图级别
    kmap.setCenter([116.341078,39.914231]);     //初始化设置地图中心点：默认为公司
    // 地图标记点设置
    var marker = new AMap.Marker({
        position: [116.341078,39.914231],//marker所在的位置
        map: kmap//创建时直接赋予map属性
    });
    marker.setMap(kmap);    // 设置Mark标记点地图位置
    // 注册地图插件：工具条，联想查询，逆地理位置查询
    AMap.plugin(['AMap.ToolBar','AMap.Autocomplete','AMap.PlaceSearch'],function(){
        //创建并添加工具条控件
        var toolBar = new AMap.ToolBar();
        kmap.addControl(toolBar);
        // 自动联想功能参数设置
        var autoOptions = {
            city: '', //城市，默认全国
            map: kmap,  //创建时直接赋予map属性,
        };
        autocomplete= new AMap.Autocomplete(autoOptions);   // 实例化自动查询

        // 输入框输入联想查询
        searchTarget.on('input', function (e) {
            var e = e || window.event;
            e.stopPropagation();
            var _this = $(this);
            // _this.data('location', '');
            var keywords = $.trim(_this.val());
            if (keywords == '') {
                mapBox.hide();
                listBox.hide();
                return;
            } else {
                addrElem.siblings('.tips_info').hide();
            }
            // 自动联想查询结果
            autocomplete.search(keywords, function(status, result){
                addrResBox.show().find('.addr_list').show().end().find('map_box').hide();  // 展示地图位置
                if (status == 'complete') {
                    var data = result.tips;
                    var listEle = '';
                    for (var i = 0, len = data.length; i < len; i++) {
                        if (data[i].address != '' && data[i].address != undefined && data[i].location != '' && data[i].location != undefined) {
                            listEle += '<li class="addr_item nowrap" data-name="'+ data[i].name +'" data-lat="'+ data[i].location.lat +'" data-lng="'+ data[i].location.lng +'">\n' +
                                '           <div class="addr_name">'+ data[i].name + '</div>\n' +
                                '           <div class="addr_desc">'+ data[i].district + data[i].address + '</div>\n' +
                                '       </li>';
                        }
                    }

                    if (listEle != '') {
                        mapBox.hide();
                        listBox.html('').append(listEle).show();
                    } else {
                        mapBox.hide();
                        listBox.html(noDataEle).show();
                    }

                } else if (status == 'error') {
                    // $alert('获取数据失败');
                    mapBox.hide();
                    listBox.html(noDataEle).show();
                } else if (status == 'no_data') {
                    // $alert('该地址下无数据');
                    mapBox.hide();
                    listBox.html(noDataEle).show();
                }
            });
        });


    });

    // 联想结果的点击事件
    listBox.off('click').on('click', '.addr_item', function (e) {
        var e = e || window.event;
        e.stopPropagation();
        e.preventDefault();
        var _this = $(this);
        // 屏蔽无数据项
        if (_this.hasClass('no_data')) {
            return false;
        }
        var isSuccess = true;      // 是否匹配选中城市
        var name = _this.data('name');
        var lat = _this.data('lat');
        var lng = _this.data('lng');
        var addrResult = _this.find('.addr_desc').text();
        var newLocation = [lng, lat];    // 选中地址的location

        AMap.service('AMap.Geocoder',function(){//回调函数
            //实例化Geocoder
            geocoder = new AMap.Geocoder({
                city: "",   //城市，默认：“全国”
                map: kmap   //创建时直接赋予map属性
            });
            geocoder.getAddress(newLocation, function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    //获得了有效的地址信息:
                    var cityCode = result.regeocode.addressComponent.citycode;      // 逆地理位置解析的城市code值（高德配置）
                    var selectCityCode = $("#businessCity option:selected").data("code");      // 获取后台传输的城市高德地图id
                    if (geoCode.indexOf(cityCode) === -1) {
                        $alert("当前城市还未开通展业，请重新定位！");
                        isSuccess = false;
                        return;
                    } else if (cityCode != selectCityCode) {
                        $alert("详细地址与城市不匹配，请重新定位！");
                        isSuccess = false;
                        return;
                    }
                    // 当匹配成功时间更改页面地址数据
                    if (isSuccess) {
                        addrElem.val(addrResult).data('geoCode', cityCode);   // 对地址输入进行赋值
                        searchTarget.val(name);   // 搜索框赋值
                        // 设置选中位置地图回显展示
                        // var newLocation = [lng, lat];    // 选中地址的location
                        $('#longitude').val(lng);
                        $('#latitude').val(lat);
                        mapBox.show();
                        listBox.hide();
                        //获得了有效的地址信息:
                        //即，result.regeocode.formattedAddress
                        marker.setPosition(newLocation);
                        kmap.setCenter(newLocation);
                    }
                }else{
                    //获取地址失败
                }
            });


        })

    });

    // 隐藏或是关系地图层
    $(document).on('click', function (e) {
        var e = e || window.event;
        e.stopPropagation();
        var target = e.target;
        ($(target).attr('id') == 'businessAddress') ? false : $('.addr_result_box').hide();
    });
    $(document).on('click', '.map_box,.addr_list', function (e) {
        var e = e || window.event;
        e.stopPropagation();
        e.preventDefault();
    });

    searchTarget.on('focus click', function (e) {
        var e = e || window.event;
        e.stopPropagation();
    });

    // 注册输入框显示事件
    addrElem.on('click', function (e) {
        var e = e || window.event;
        e.stopPropagation();
        e.preventDefault();
        var _this = $(this);
        var oldLocation = _this.data('location');       // 原始地址位置location
        marker.setPosition(oldLocation);        // 设置地图标记点
        kmap.setCenter(oldLocation);        // 设置地图中心点
        addrResBox.show().find('.addr_list').hide().end().find('.map_box').show();
    });
}

/**
 * 证件类型切换后清空证件号码
 * @author Arley Joe 2017-11-4 16:08:39
 */
function resetLicenseNum () {
    var s = $('#recordType');       // 证件类型
    var n = $('#licenseNum');     // 证件号码
    s.on('change', function () {
        n.val('').attr('verify', 1).siblings('.tips_info').hide();
    });
}

/**
 * 证件号码校验
 * @author Arley Joe 2017年11月3日14:21:59
 * @desc 1.校验证件号码的合法性：身份证类型校验长度及字符规范
 *       2.校验证件号码的唯一性。
 */
function verifyLicenseNumber () {
    var ele = $('#licenseNum');     // 证件号码
    // 身份证校验规则（注：含15位和19位，闰年不能禁止29+天数）
    // var IDReg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9]$)/;
    var IDReg = IDPATTERN;s
    ele.on('focus', function (){
        var t = $(this);
        var isChecked = t.data('isChecked');    // 唯一性是否已经校验过。1：校验过，2：未校验
        if (isChecked == 1) {
            t.data('isChecked', '0');   //获取焦点后重置为0（注：获取焦点后即被视为更改且未校验）
            t.attr('verify', 1);
        }
        t.siblings('.tips_info').hide();
    });
    ele.on('blur', function (){
        var t = $(this);
        var v = $.trim(t.val());   // 证件号码
        var licenseType = $.trim($('#recordType option:selected').val());     // 证件类型
        if (licenseType == 2) {     // 身份证先校验合法性（指：数字与末位识别码'X'）
            if (v == '') {
                t.siblings('.tips_info').text('(*证件号码不能为空)').show();
                t.attr('verify', 0);
            } else {
                if (!IDReg.test(v)) {
                    t.siblings('.tips_info').text('(*请输入有效证件号码)').show();
                    t.attr('verify', 0);
                } else {
                    t.siblings('.tips_info').hide();
                    t.attr('verify', 1);
                    validateIdNum(v);    // 校验唯一性

                }
            }
        } else if (licenseType == 1) {  // 营业执照直接校验唯一性
            validateIdNum(t);    // 校验唯一性
        }
    });
}
// 证件号码校验逻辑
function validateIdNum (t) {
    var elem = $('#licenseNum');
    var lNum = $.trim(elem.val());   // 证件号码
    if (lNum == '') {
        return false;
    } else {
        var isOnly = true;  // 是否唯一
        redefineAjax({
            async : false,
            data : {
                supplier_id : merchantId,
                id_num : lNum
            },
            url : contextPath + '/api/supplier/validate/num',
            success : function (res){
                if (res.error_code != 0) {
                    isOnly = false;
                    $alert(res.error_msg, function () {
                        elem.focus();
                    });
                } else {
                    t.data('isChecked', '1');   // 校验完成且唯一性校验通过后更改为已经校验过状态。
                }
            },
            error : function () {
                console.error('Document number uniqueness verification failed.');
            }
        });
        return isOnly;
    }
}

/**
 * 手机号输入校验
 * @author Arley Joe 2017-11-4 17:04:00
 */
function validatePhoneNum () {
    var elem = $('.link_option');
    var phonePattern = /^1[3|4|5|8|7]\d{9}$/;    // 手机号校验正则
    elem.on('blur', '.link_phone', function () {
        var _this = $(this);
        var phoneNum = $.trim(_this.val());
        var tips = _this.siblings('.tips_info');
        if (phoneNum == '') {
            tips.text('(*手机号不能为空)').show();
            _this.attr('verify', 0);
        } else if (!phonePattern.test(phoneNum)) {
            tips.text('(*请输入正确的手机号)').show();
            _this.attr('verify', 0);
        } else {
            tips.hide();
            _this.attr('verify', 1);
        }
    });
}

/**
 * 加载日期插件
 * @author Arley Joe 2017-11-4 17:33:34
 * @param target {elem} 触发元素
 */
function initDateAll (target) {
    $(target).jeDate({
        isinitVal : false,
        festival : false,
        ishmsVal : false,
        format : "YYYY-MM-DD",
        zIndex : 3000,
        isClear : true
    });
    $(target).addClass('datainp wicon');
}

/**
 * 输入框焦点离开非空校验
 * @author Arley Joe 2017年11月3日14:33:06
 * @desc 所有必传项的input必须含有requireTrue类（class）,同时必须含有兄弟元素’tips_info‘
 */
function validateBlurEmpty () {
    $('.merchants_edit').on('blur', '.requireTrue', function () {
        var t = $(this);
        var v = $.trim(t.val());
        if (v == '') {
            var tipText = t.data('text');
            t.siblings('.tips_info').show().text('(*' + tipText + '不能为空)');
            return false;
        }
    });
    $('.merchants_edit').on('input', '.requireTrue', function () {
        var t = $(this);
        var v = $.trim(t.val());
        if (v != '') {
            t.siblings('.tips_info').hide();
        }
    });
}
/**
 * 输入框非空校验逻辑
 * @author Arley Joe 2017年11月3日14:33:06
 * @desc 所有必传项的input必须含有requireTrue类（class）
 */
function validateEmpty () {
    var requireInput = $('.requireTrue');
    var isVerify = false;
    requireInput.each(function () {
        var t = $(this);
        var v = $.trim(t.val());
        if (v == '') {
            var tipText = t.data('text');
            $alert(tipText + '不能为空');
            isVerify = false;
            return false;
        } else {
            isVerify = true;
        }
    });
    // 校验拥有者数据：公海：0，私海：>=1
    var ownType = $('#ownTypeS option:selected').val();
    if (ownType == 1) {
        var ownPerson = getFollowPeople();
        if (ownPerson.length == 0) {
            isVerify = false;
            $alert('请至少添加一个拥有者');
        }
    }

    // 校验手机号是否正确
    var phones = $('.link_option .link_phone');
    phones.each(function () {
        var _this = $(this);
        var checked = _this.attr('verify');
        if (checked == 0) {
            $alert('请输入正确的手机号码');
            isVerify = false;
            return false;
        }
    });

    // 校验证件号码格式是否正确
    var licenseNum = $('#licenseNum');
    var checkedLicenseNum = licenseNum.attr('verify');
    if (checkedLicenseNum == 0) {
        $alert('请输入正确的证件号码');
        isVerify = false;
    }

    // todo 此地方的证件号码不能做重复校验。
    /*// 校验是否证件号已经校验过
    var licenseIsChecked = $.trim($('#licenseNum').data('isChecked'));
    if (licenseIsChecked == 0) {
        var validateRes = validateIdNum($('#licenseNum'));
        if (!validateRes) {
            isVerify = false;
            $alert('拥有类型为私海时间，拥有者必须至少有一个');
        }
    }*/

    // 校验签约机构列表是否为空
    var isSign = $('input.isSign[type="radio"]:checked').val();    // 是否签约
    var signOrg = $('.option_item.sign_org');       // 签约机构
    if (isSign == 1) {
        var checkedOrg = signOrg.find('input.sign_org[type="checkbox"]:checked');
        if (checkedOrg.length <= 0) {
            isVerify = false;
            $alert('签约机构必须选择一个。');
        }
    }

    // 校验城市与地址是否匹配
    var checkedCityGeoCode = $("#businessCity option:selected").data("code");      // 获取后台传输的城市高德地图id
    var addrGeoCode = addrElem.data('geoCode');
    if (checkedCityGeoCode != addrGeoCode) {
        $alert("详细地址与城市不匹配，请重新定位！");
        isVerify = false;
    }

    return isVerify;
}

/**
 * 提交时间的非空校验
 * @author Arley Joe 2017-11-3 16:42:07
 */
function updateValidate () {
    var isVerify = null;
    isVerify = validateEmpty();
    getLinkOrRecordInfo();  // 获取账户信息、联系人信息等字段值
    return isVerify;
}

/**
 * 获取联系人及备案信息字段数据
 * @author Arley Joe 2017-11-3 17:20:55
 * @desc 删除联系人字段值在删除联系人/备案信息部分获取（此部分的值需要实时更新获取）
 */
function getLinkOrRecordInfo () {
    var updateLinkList = [];    // 更新联系人
    var insertLinkList = [];    // 增加联系人
    var deleteLinkList = [];    // 删除联系人
    var updateRecordList = [];    // 更新账户
    var deleteRecordList = [];    // 删除账户
    var insertRecordList = [];    // 增加账户
    // 新增联系人
    $('.link_option.new_link').each(function (){
        var t = $(this);
        var link = {
            supplier_id : merchantId,
            name : $.trim(t.find('.link_name').val()),
            status : 1,
            phone : $.trim(t.find('.link_phone').val()),
            position_id : $.trim(t.find('.position_id option:selected').val()),
            wechat : $.trim(t.find('.wechat').val()),
            gender : $.trim(t.find('.gender option:selected').val()),
            birthday : $.trim(t.find('.birthday').val()),
            remark : $.trim(t.find('.remark').val())
        };
        insertLinkList.push(link);
    });
    if (insertLinkList.length != 0) {
        $('#insertLinkList').val(JSON.stringify(insertLinkList));
    }
    // 更新联系人
    $('.link_option.his_link').each(function (){
        var t = $(this);
        var link = {
            id : $.trim(t.find('.link_name').data('id')),
            name : $.trim(t.find('.link_name').val()),
            status : 1,
            phone : $.trim(t.find('.link_phone').val()),
            position_id : $.trim(t.find('.position_id option:selected').val()),
            wechat : $.trim(t.find('.wechat').val()),
            gender : $.trim(t.find('.gender option:selected').val()),
            birthday : $.trim(t.find('.birthday').val()),
            remark : $.trim(t.find('.remark').val())
        };
        updateLinkList.push(link);
    });
    if (updateLinkList.length != 0) {
        $('#updateLinkList').val(JSON.stringify(updateLinkList));
    }


    // 新增账户信息
    $('.record_option.new_record').each(function (){
        var t = $(this);
        var accountUse = t.find('input.account_use[type="checkbox"][checked="checked"]');
        var accountUseArr = [];
        accountUse.each(function () {
            var _this = $(this);
            var v = _this.val().trim();
            accountUseArr.push(v);
        });
        var record = {
            supplier_id : merchantId,
            account_name : $.trim(t.find('.account_name').val()),
            status : 1,
            bank_no : $.trim(t.find('.bank_no').val()),
            open_bank : $.trim(t.find('.open_bank').val()),
            account_type : $.trim(t.find('.account_type option:selected').val()),
            account_use : accountUseArr.join(',')
        };
        insertRecordList.push(record);
    });
    if (insertRecordList.length != 0) {
        $('#insertRecordList').val(JSON.stringify(insertRecordList));
    }

    // 更新账户信息
    $('.record_option.his_record').each(function (){
        var t = $(this);
        var accountUse = t.find('input.account_use[type="checkbox"][checked="checked"]');
        var accountUseArr = [];
        accountUse.each(function () {
            var _this = $(this);
            var v = _this.val().trim();
            accountUseArr.push(v);
        });
        var record = {
            id : $.trim(t.find('.account_name').data('id')),
            account_name : $.trim(t.find('.account_name').val()),
            status : 1,
            bank_no : $.trim(t.find('.bank_no').val()),
            open_bank : $.trim(t.find('.open_bank').val()),
            account_type : $.trim(t.find('.account_type option:selected').val()),
            account_use : accountUseArr.join(',')
        };
        updateRecordList.push(record);
    });
    if (updateRecordList != 0) {
        $('#updateRecordList').val(JSON.stringify(updateRecordList));
    }
}

/**
 * 编辑保存按钮的创建逻辑
 * @author Arley Joe 2017-11-4 15:36:08
 */
function onUpdate () {
    var btn = $('.edit_confirm');
    btn.off('click').on('click', function () {
        submitEvent(btn);
    });
}

/**
 * 编辑保存的提交逻辑
 * @author Arley Joe 2017-11-4 15:36:45
 * @param btn {Object} : 保存按钮元素的jQuery对象
 */
function submitEvent (btn) {
    btn.off('click');
    var isVerify = updateValidate();
    if (isVerify) {
        var data = new FormData(document.getElementById("merchantsEdit"));
        $.ajax({
            type: 'post',
            data : data,
            url : contextPath + '/api/supplier/edit',
            timeout : 600000,
            processData: false,
            contentType: false,
            beforeSend : function () {
                $('#loading').show();
            },
            success : function (res) {
                $('#loading').hide();
                if (res.error_code == 0) {
                    $alert('商户编辑成功', function () {
                        locationTo({
                            action : contextPath + markUri + '/merchants/detail',
                            param : {
                                supplier_id : merchantId,
                                url : LOCALURL
                            }
                        })
                    })
                } else {
                    $alert(res.error_msg);
                    onUpdate();
                }
            },
            error : function () {
                $alert("商户编辑保存失败，请稍后重试");
                onUpdate();
            }
        })
    } else {
        onUpdate();
    }
}


$(function () {
    switchStoreType();      // 根据业务类型切换店面类型视图
    switchOwnPerson();      // 根据拥有类型检测拥有者（公海：无拥有者，私海（至少一个拥有者））
    addOwnPerson();     // 设置拥有者
    // var endPerson = getFollowPeople().join(',');
    /*$('#ownPersonInput').val(getFollowPeople().join(','));    // 初始化拥有者数据源信息*/
    deleteFollowPeople();   // 注册拥有者删除事件
    deleteLinkOrRecord();   // 删除联系人|账户信息
    addLinkOrRecord();   // 添加联系人|账户信息
    viewLargeImage('.img_md_box');
    viewImages();       // 查看大图
    deleteImages();     // 图片删除
    uploadImage();      // 图片上传注册
    settingAddress();    // 获取地址
    validatePhoneNum();     // 手机号校验
    resetLicenseNum();    // 备案类型更改后重置证件号码
    // verifyLicenseNumber();      // 证件号码失去焦点校验唯一性
    validateBlurEmpty();        // 输入框焦点离开非空校验
    onUpdate();     // 提交逻辑
    initDateAll('.birthday');      // 加载日期插件
});