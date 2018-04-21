
//切换城市显示隐藏
$('.province_ul_li').off('click').on('click',function () {
    var _this = $(this);
    var province_id = _this.find('input').attr('id');
    var city_box = $('.city .city_box');
    city_box.each(function () {
        var _this = $(this);
        if (_this.hasClass('display')) {
            _this.removeClass('display');
        }
    });
    $('.city .city_box[id="'+province_id+'"]').addClass('display');
});

//取消按钮
$('.province_cancle').off('click').on('click',function () {
    $('.province_city_box').css('display','none');
});

//确认按钮
$('.province_confirm').off('click').on('click',function () {
    $('.province_city_box').css('display','none');
})

//省市复选框事件
$('.province_ul_li label').on('click',function () {
    var _this = $(this);
    var cur_province_id = _this.prev().attr('id');
    var cur_citys = $('.city .city_box[id="'+cur_province_id+'"]').find('label');
    if (_this.hasClass('checked') || _this.hasClass('part')) {//全选所有城市
        _this.attr('class','checked');
        cur_citys.each(function () {
            var _cur = $(this);
            if (_cur.hasClass('checked')) {
                _cur.removeClass('checked');
            }
        });
    } else {//取消选中的城市
        _this.attr('class','');
        cur_citys.each(function () {
            var _cur = $(this);
            if (!_cur.hasClass('checked')) {
                _cur.addClass('checked');
            }
        });
    }
});

//城市复选框事件
$('.city_ul_li label').on('click',function () {
    var _this = $(this);
    var province_id = _this.parents('.city_box').attr('id');
    var cur_province = $('.province_ul input[id="'+province_id+'"]').next();
    var cur_citys = _this.parents('.city_ul').find('label');
    var nums = 0;
    cur_citys.each(function () {
        var _cur_city = $(this);
        if (_cur_city.hasClass('checked')) {
            nums++;
        }
    });
    if (cur_province.hasClass('part')) {
        cur_province.removeClass('part');
    }
    if (!_this.hasClass('checked')) {
        if (nums == cur_citys.length - 1) {//全选
            cur_province.addClass('checked');
        } else {//部分选
            cur_province.addClass('part');
        }
    } else {
        if (nums != 1) {//部分选
            cur_province.addClass('part');
        } else {//全没选
            cur_province.removeClass('checked');
        }
    }
});


