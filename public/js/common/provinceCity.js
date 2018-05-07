
//切换城市显示隐藏
$('.province_ul_li').off('click').on('click',function () {
    var _this = $(this);
    var prolis = $('.province_ul_li');
    var province_id = _this.find('input').attr('id');
    var city_box = $('.city .city_box');
    city_box.each(function () {
        var _this = $(this);
        if (_this.hasClass('display')) {
            _this.removeClass('display');
        }
    });
    $('.city .city_box[id="'+province_id+'"]').addClass('display');
    prolis.each(function () {
        var cur_proli = $(this);
        if (cur_proli.hasClass('select_pro')) {
            cur_proli.removeClass('select_pro');
        }
    });
    _this.addClass('select_pro');
});

//取消按钮
$('.province_cancle').off('click').on('click',function () {
    $('.province_city_box').css('display','none');
});

//确认按钮
$('.province_confirm').off('click').on('click',function () {
    var province_ul_li = $('.province_ul_li');
    var check_pros = 0;
    var pro_ids = [];
    // var check_val = '';
    province_ul_li.each(function () {
       var _this = $(this);
       if (_this.find('label').hasClass('checked') || _this.find('label').hasClass('part')) {
           var proid = _this.find('input').attr('id');
           pro_ids.push(proid);
           // if (check_pros == 0) {
           //     check_val = _this.find('span').text();
           // }
           check_pros++;
       }
    });
    if (check_pros != 0) {
        $('.select_province_ids').val(pro_ids.join(','));
        $('.select_city_input').val(check_pros + "个省份");
    } else {
        $('.select_province_ids').val('');
        $('.select_city_input').val('');
    }
    var city_ul = $('.city_ul');
    var city_ids = [];
    city_ul.each(function () {
       var _this = $(this);
       var city_ul_li = _this.find('.city_ul_li');
       city_ul_li.each(function () {
          var cur_li = $(this);
          if (cur_li.find('label').hasClass('checked')){
              var id = cur_li.find('input').val();
              city_ids.push(id);
          }
       });
    });
    $('.select_city_ids').val(city_ids.join(','));
    $('.province_city_box').css('display','none');
});
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


