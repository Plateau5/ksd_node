var RESETPHOTO = false;
//上传图片按钮的点击事件
function uploadPhoto (ele) {
    ele.off("click").on("click", function () {
        $("#upload_photo_file").click();
    });
}
//重新上传图片
uploadPhoto($(".choose_img"));
$(".large_photo>img").cropper({
    zoomable: true,
    viewMode: 1,
    preview: '#small_photo', //不同尺寸预览区
    aspectRatio: 1, //裁剪比例，NaN-自由选择区域
    autoCropArea: 0.8, //初始裁剪区域占图片比例
    modal : false
});
//选择图片后的事件
$("#upload_photo_file").on('change', function () {
    var file = this.files[0];
    var reader = new FileReader();
    //reader回调，重新初始裁剪区
    reader.onload = function(){
        // 通过 reader.result 来访问生成的 DataURL
        var url = reader.result;
        //选择图片后重新初始裁剪区
        $(".large_photo>img").cropper('reset', true).cropper('replace', url);
    };
    reader.readAsDataURL(file);
    $('#upload_photo_dialog').show();
    $(".mask").show();
});
//取消按钮的点击事件
$(".btn_box .cancel_upload").off("click").on("click", function () {
    $('#upload_photo_dialog').hide();
    $(".mask").hide();
});
//确定按钮的点击事件
$(".btn_box .submit_upload").off("click").on("click", function () {
    $('#upload_photo_dialog').hide();
    $(".mask").hide();
    var canVas = $(".large_photo>img").cropper("getCroppedCanvas", {});
    //将裁剪的图片加载到face_image
    $('#user_photo').attr('src', canVas.toDataURL());
    RESETPHOTO = true;
    var file = $('#user_photo').attr("src").slice(22);
    var form = new FormData();
    form.append('file',file);
    $.ajax({
        type:'post',
        timeout:20000,
        url : contextPath + "/api/file/base64/upload",
        data : form,
        processData : false,
        contentType :false,
        beforeSend : function () {
            $('#loading').show();
        },
        success : function (res) {
            $('#loading').hide();
            if (res.error_code == 0) {
                $('.teacher_img').val(res.data[0].image_url);
            } else {
                $alert(res.error_msg);
            }
        },
        error : function () {
            $('#loading').hide();
            $alert("上传失败，请稍后重试");
        }
    });
});
/************************搜索讲师姓名 start****************************/
//模糊查询
var hideInput = $('#orderCreatorId');
var btn = $('#createName');
var resBox = $(".search_result");
var resList = $(".search_list");
function searchTeacher () {
    $('.search_name').off("click").on("click", function (e) {
        var ev = e || window.event;
        ev.stopPropagation();
        ev.preventDefault();
        resBox.show();
        $('.customer_search').focus();
        $('.customer_search').on('input',function(e){
            var ev = e || window.event;
            ev.stopPropagation();
            var val = $.trim($(this).val());
            resList.html('');
            if (val) {
                resList.show();
                var queryObj = fuzzyQuery(emp_list);
                showSearchResult(queryObj);
                selectedCreate();
            } else{
                resList.hide();
            }
        });
        $(document).on('click',function (e) {
            var ev = e || window.event;
            ev.stopPropagation();
            var target = $(ev.target);
            var parent = target.parents('.search_result');
            if (target.hasClass('search_result')) {
                return false;
            } else if (parent.length <= 0) {
                resBox.hide().find('.search_list').html('').end().find('.customer_search').val('');
                resList.hide();
                return true;
            } else {
                return true;
            }
        });
    });
    // 订单所属人选中逻辑
    var selectedCreate = function () {
        $('.search_result .res_item').on('click', function () {
            var _this = $(this);
            var createName = $.trim(_this.data('name'));
            var orderCreatorId = $.trim(_this.data('id'));
            var image_url = $.trim(_this.data('image_url'));
            var email = $.trim(_this.data('email'));
            $('.search_name').val(createName);
            $('#teacher_account').val(email);
            $('#teacher_photo').val(image_url);
            btn.val(createName);
            hideInput.val(orderCreatorId);
            resBox.hide();
        });
    }
}
// 讲师的模糊查询功能
function fuzzyQuery (res) {
    var queryStr = $.trim($('.customer_search').val()),
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
        return $('.search_list').html('<li style="text-align: center;">没有匹配到任何结果</li>');
    } else {
        for (var i = 0, len = res.length; i < len; i++) {
            if (res[i].phone) {
                var tel_account = res[i].phone;
            } else if (res[i].account) {
                var tel_account = res[i].account;
            }
            var str = '';
            str = '<li class="res_item"  data-id="' + res[i].id + '" data-name="' + res[i].name + '" data-image_url="'+ res[i].image_url + '" data-email="'+ res[i].account + '" title="' + tel_account + '">\
                                <div class="name nowrap">' + res[i].name + '</div>\
                                <div class="p_dep nowrap">' + (tel_account ? tel_account : '没有匹配到任何结果') + '</div>\
                            </li>'
            html.push(str);
            $('.search_list').html(html.join(""));
        }
    }
}
/************************搜索讲师姓名 end****************************/







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
                    // var cityId = $.trim($('#businessCity').find('option:selected').val());
                    // var workCityList = jsonsql.query('select * from json where (work_city==' + cityId + ')', empList);  // 通过jsonsql查询匹配数据
                    var queryObj = fuzzyQuery(emp_list);
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

$(function () {
    addOwnPerson();
    deleteFollowPeople();
});






