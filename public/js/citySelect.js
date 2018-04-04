function citySelect (opt, callback) {
    var defaultOpt = {
        target : ''
    };
    var options = $.extend({}, defaultOpt, opt);


    var strVarCity = '';
    strVarCity += '<div class="aui_state_box"><div class="aui_state_box_bg"></div>';
    strVarCity += '  <div class="aui_alert_zn aui_outer">';
    strVarCity += '    <table class="aui_border" style="border:2px solid #fff;">';
    strVarCity += '      <tbody>';
    strVarCity += '        <tr>';
    strVarCity += '          <td class="aui_c">';
    strVarCity += '            <div class="aui_inner">';
    strVarCity += '              <table class="aui_dialog">';
    strVarCity += '                <tbody>';
    strVarCity += '                  <tr>';
    strVarCity += '                    <td class="aui_header" colspan="2"><div class="aui_titleBar">';
    strVarCity += '                      <div class="aui_title">选择城市信息</div>';
    strVarCity += '                        <a href="javascript:;" class="aui_close">×</a>';
    strVarCity += '                      </div>';
    strVarCity += '                    </td>';
    strVarCity += '                  </tr>';
    strVarCity += '                  <tr>';
    strVarCity += '                  <tr>';
    strVarCity += '                    <td class="aui_icon" style="display: none;">';
    strVarCity += '                     <div class="aui_iconBg" style="background: transparent none repeat scroll 0% 0%;"></div></td>';
    strVarCity += '                       <td class="aui_main" style="width: auto; height: auto;">';
    strVarCity += '                        <div class="aui_content" style="padding: 0px; position:relative">';
    strVarCity += '                          <div id="" style="width: 680px; position:relative;">';
    strVarCity += '                            <div class="data-result"><em>最多选择 <strong>2000</strong> 项</em></div>';
    strVarCity += '                            <div class="data-error" style="display: none;">最多只能选择 3 项</div>';
    strVarCity += '                            <div class="data-search" id="searchRun"><input class="run" style="display: none;" placeholder="请输入城市名搜索" style="text-indent:0.6em;" name="searcharea"/><div class="searchList run"></div></div>';
    strVarCity += '                            <div class="data-tabs">';
    strVarCity += '                              <ul>';
    strVarCity += '                                <li data-selector="tab-all" class="active"><a href="javascript:;"><span>全部</span><em></em></a></li>';
    strVarCity += '                              </ul>';
    strVarCity += '                            </div>';
    strVarCity += '                            <div class="data-container data-container-city">';
    strVarCity += '                            </div>';
    strVarCity += '                          </div>';
    strVarCity += '                        </div>';
    strVarCity += '                      </div>';
    strVarCity += '                    </td>';
    strVarCity += '                  </tr>';
    strVarCity += '                  <tr>';
    strVarCity += '                    <td class="aui_footer" colspan="2">';
    strVarCity += '                      <div class="aui_buttons">';
    strVarCity += '                      <button class="aui-btn aui-btn-primary aui-confirm" type="button">确定</button>';
    strVarCity += '                        <button class="aui-btn aui-btn-light aui-cancel" type="button">取消</button>';
    strVarCity += '                      </div>';
    strVarCity += '                    </td>';
    strVarCity += '                  </tr>';
    strVarCity += '                </tbody>';
    strVarCity += '              </table>';
    strVarCity += '            </div></td>';
    strVarCity += '        </tr>';
    strVarCity += '      </tbody>';
    strVarCity += '    </table>';
    strVarCity += '  </div>';
    strVarCity += '</div>';

// 全局变量
    var datatype        = "";
    var dataCityinput   = null;
    var searchValue     = searchdata();
// 绑定事件
    $(document).on('click', '.multiple-choice', function () {
        appendCity(this, 'duoxuan');
    });

    $(document).on('click', '.single-choice', function () {
        appendCity(this, 'danxuan');
    });

    $(document).on('click', '.aui_close', function () {
        Close();
    });
    $(document).on('click', 'li[data-selector="tab-all"]', function () {
        var _this = $(this);
        removenode_area(_this);
    });
    $(document).on('click', '.aui-confirm', function () {
        save_City();
    });
    $(document).on('click', '.aui-cancel', function () {
        Close();
    });
    $(document).on('click', '.save_box.aui-titlespan', function () {
        var _this = $(this);
        removespan_area(_this);
    });
    $(document).on('click', '.data-list-provinces .d-item', function () {
        var _this = $(this);
        selectProvince('sub',_this,'');
    });
    $(document).on('click', '.data-tabs ul .tabs-li', function () {
        var _this = $(this);
        removenode_area(_this);
    });
    $(document).on('click', '.data-all-click', function () {
        var _this = $(this);
        selectitem_area(_this);
    });
    $(document).on('click', '.d-item-city', function () {
        var _this = $(this);
        selectProvince('sub',_this,'');
    });
    $(document).on('click', '.area_menu', function () {
        var _this = $(this);
        selectProvince('sub',_this,'');
    });

    function appendCity(thiscon, Cityxz) {
        dataCityinput = thiscon;
        datatype = Cityxz;
        $('body').append(strVarCity);
        if (datatype == "danxuan") {
            $('.data-result').find('strong').text('1');
        } else {
            $('.data-result').html('<em>可选择多项</em>');
        }
        if ($(dataCityinput).data("clear") == true) {
            $(dataCityinput).data("value", '');
            $(dataCityinput).data("pid", '');
            $(dataCityinput).data("pname", '');
            $(dataCityinput).val('');
        }
        if ($(dataCityinput).data("value") != "") {
            var inputarry = $(dataCityinput).data("value").split(',');
            var inputarryname = $(dataCityinput).val().split(',');
            var inputpid = $(dataCityinput).data("pid").split(',');
            var inputpname = $(dataCityinput).data("pname").split(',');
            if (inputarry.length > 0) {
                for (var i = 0, len = inputarry.length; i < len; i++) {
                    var cityName = inputarryname[i].substring(inputarryname[i].lastIndexOf('-') + 1);
                    $('.data-result').append('<span class="save_box aui-titlespan" data-pname="'+ inputpname[i] +'" data-pid="'+ inputpid[i] +'" data-code="' + inputarry[i] + '" data-name="' + cityName + '">' + cityName + '<i>×</i></span>');
                }
            }
        }

        var minwid = document.documentElement.clientWidth;
        /*$('.aui_outer .aui_header').on("mousedown", function (e) {
            /!*$(this)[0].onselectstart = function(e) { return false; }*!///防止拖动窗口时，会有文字被选中的现象(事实证明不加上这段效果会更好)
            $(this)[0].oncontextmenu = function (e) { return false; } //防止右击弹出菜单
            var getStartX = e.pageX;
            var getStartY = e.pageY;
            var getPositionX = (minwid / 2) - $(this).offset().left,
                    getPositionY = $(this).offset().top;
            $(document).on("mousemove", function (e) {
                var getEndX = e.pageX;
                var getEndY = e.pageY;
                $('.aui_outer').css({
                    left: getEndX - getStartX - getPositionX,
                    top: getEndY - getStartY + getPositionY
                });

            });
            $(document).on("mouseup", function () {
                $(document).unbind("mousemove");
            })
        });*/
        selectProvince('all', null, '');
        auto_area.run();
    }

    var dataarrary = __LocalDataCities.list;
    function selectProvince(type, con, isremove) {
        //显示省级
        var strVarCity = "";
        if (type == "all") {
            var dataCityxz      = __LocalDataCities.category.provinces;
            // 加载热门城市和省份
            strVarCity += '<div class="view-all" id="">';

            strVarCity += '    <p class="data-title">全部省份</p>';
            strVarCity += '   <div class="data-list data-list-provinces">';
            strVarCity += '  <ul class="clearfix">';
            for (var i = 0, len = dataCityxz.length; i< len; i++) {
                if (dataarrary[dataCityxz[i]][0].length > 3) {
                    strVarCity += '<li><a href="javascript:;" data-code="' + dataCityxz[i] + '" data-pname="' + dataarrary[dataCityxz[i]][0] + '" data-pid="' + dataarrary[dataCityxz[i]][3] + '" data-name="' + dataarrary[dataCityxz[i]][0] + '" class="d-item"><span class="c-name" title="'+ dataarrary[dataCityxz[i]][0] +'">' + dataarrary[dataCityxz[i]][0] + '</span><label>0</label></a></li>';
                } else {
                    strVarCity += '<li><a href="javascript:;" data-code="' + dataCityxz[i] + '" data-pname="' + dataarrary[dataCityxz[i]][0] + '" data-pid="' + dataarrary[dataCityxz[i]][3] + '" data-name="' + dataarrary[dataCityxz[i]][0] + '" class="d-item"><span class="c-name">' + dataarrary[dataCityxz[i]][0] + '</span><label>0</label></a></li>';
                }
            }
            strVarCity += ' </ul>';
            strVarCity += '</div>';
            $('.data-container-city').html(strVarCity);

            $('.data-result span').each(function (index) {
                if ($('a[data-code=' + $(this).data("code") + ']').length > 0) {
                    $('a[data-code=' + $(this).data("code") + ']').addClass('d-item-active');
                    if ($('a[data-code=' + $(this).data("code") + ']').attr("class").indexOf('data-all') > 0) {
                        $('a[data-code=' + $(this).data("code") + ']').parent('li').nextAll('li').find('a').css({ 'color': '#ccc', 'cursor': 'not-allowed' });
                        // $('a[data-code=' + $(this).data("code") + ']').parent('li').nextAll("li").find('a').attr("onclick", "");
                        $('a[data-code=' + $(this).data("code") + ']').parent('li').nextAll("li").find('a').off('click');
                    } else {
                        if ($('.data-list-provinces a[data-pid=' + $(this).data("pid").toString() + ']').length > 0) {
                            var numlabel = $('.data-list-provinces a[data-pid=' + $(this).data("pid").toString() + ']').find('label').text();
                            $('.data-list-provinces a[data-pid=' + $(this).data("pid").toString() + ']').find('label').text(parseInt(numlabel) + 1).show();
                        }
                    }
                } else {
                    var numlabel = $('.data-list-provinces a[data-pid=' + $(this).data("pid").toString() + ']').find('label').text();
                    $('.data-list-provinces a[data-pid=' + $(this).data("pid").toString() + ']').find('label').text(parseInt(numlabel) + 1).show();
                }
            });
        }
        //显示下一级
        else {
            var dataCityxz = __LocalDataCities.category.provinces;
            var relations  = __LocalDataCities.relations;
            if (typeof (relations[$(con).data("code")]) != "undefined") {
                //添加标题
                if (isremove != "remove") {
                    $('.data-tabs li').each(function () {
                        $(this).removeClass('active');
                    });
                    $('.data-tabs ul').append('<li data-code=' + $(con).data("code") + ' data-name=' + $(con).data("name") + ' class="active tabs-li"><a href="javascript:;"><span>' + $(con).data("name") + '</span><em></em></a></li>');
                }
                //添加内容
                strVarCity += '<ul class="clearfix">';
                if (datatype == "danxuan") {
                    strVarCity += '<li class="li-disabled" style="width:100%" ><a href="javascript:;" class="d-item data-all"  data-code="' + $(con).data("code") + '"  data-name="' + $(con).data("name") + '">' + $(con).data("name") + '<label>0</label></a></li>';
                } else {
                    strVarCity += '<li class="li-disabled" style="width:100%"><a href="javascript:;" class="d-item data-all data-all-click"  data-code="' + $(con).data("code") + '"  data-name="' + $(con).data("name") + '">' + $(con).data("name") + '<label>0</label></a></li>';
                }
                var _thisArr = relations[$(con).data("code")];
                for (var i = 0, len = _thisArr.length; i < len; i++ ) {
                    if (dataarrary[relations[$(con).data("code")][i]][0].length > 6) {

                        strVarCity += '<li><a href="javascript:;" class="d-item d-item-city" data-code="' + relations[$(con).data("code")][i] + '" data-pname="'+ dataarrary[relations[$(con).data("code")][i]][4] +'" data-pid="'+ dataarrary[relations[$(con).data("code")][i]][3] +'"  data-name="' + dataarrary[relations[$(con).data("code")][i]][0] + '"><span class="c-name" title="'+ dataarrary[relations[$(con).data("code")][i]][0] +'">' + dataarrary[relations[$(con).data("code")][i]][0] + '</span><label>0</label></a></li>';
                    } else {
                        strVarCity += '<li><a href="javascript:;" class="d-item d-item-city" data-code="' + relations[$(con).data("code")][i] + '" data-pname="'+ dataarrary[relations[$(con).data("code")][i]][4] +'" data-pid="'+ dataarrary[relations[$(con).data("code")][i]][3] +'"  data-name="' + dataarrary[relations[$(con).data("code")][i]][0] + '"><span class="c-name">' + dataarrary[relations[$(con).data("code")][i]][0] + '</span><label>0</label></a></li>';
                    }
                }
                strVarCity += '</ul>';
                $('.data-container-city').html(strVarCity);
            } else {
                if (datatype == "duoxuan") {
                    if (typeof $(con).data('flag') != 'undefined') {
                        if($('.data-result span[data-code="' + $(con).data("code") + '"]').length > 0) {
                            return false;
                        }
                    }
                    if ($(con).attr("class").indexOf('d-item-active') > 0) {
                        $('.data-result span[data-code="' + $(con).data("code") + '"]').remove();
                        $(con).removeClass('d-item-active');
                        // 省份显示城市数量减一,当为0时不显示
                        if ($('.data-list-provinces a[data-code=' + $(con).data("code").toString().substring(0, 3) + ']').length > 0) {
                            var numlabel = $('.data-list-provinces a[data-code=' + $(con).data("code").toString().substring(0, 3) + ']').find('label').text();
                            if (parseInt(numlabel) == 1) {
                                $('.data-list-provinces a[data-code=' + $(con).data("code").toString().substring(0, 3) + ']').find('label').text(0).hide();
                            } else {
                                $('.data-list-provinces a[data-code=' + $(con).data("code").toString().substring(0, 3) + ']').find('label').text(parseInt(numlabel) - 1);
                            }
                        }
                        return false;
                    } else {
                        // 已全选省份,不可再选
                        if ($('.data-list-provinces a[data-code=' + $(con).data("code").toString().substring(0, 3) + ']').hasClass('d-item-active')) {
                            $('.data-error').text('已全选省份,不可再选');
                            $('.data-error').slideDown();
                            setTimeout("$('.data-error').text('最多只能选择 2000 项').hide()", 1000);
                            return false;
                        }
                    }
                    if ($('.data-result span').length > 2000) {
                        $('.data-error').slideDown();
                        setTimeout("$('.data-error').hide()", 1000);
                        return false;
                    } else {
                        $('.data-result').append('<span class="save_box aui-titlespan" data-pname="'+ $(con).data("pname") +'" data-pid="'+ $(con).data("pid") +'" data-code="' + $(con).data("code") + '" data-name="' + $(con).data("name") + '">' + $(con).data("name") + '<i>×</i></span>');
                        $(con).addClass('d-item-active');
                    }
                } else {
                    //单选
                    $('.data-result span').remove();
                    // 消除搜索影响
                    $('.data-list-hot li').siblings('li').find('a').removeClass('d-item-active');
                    $('.data-container-city li').siblings('li').find('a').removeClass('d-item-active');

                    $('.data-result').append('<span class="save_box aui-titlespan" data-pname="'+ $(con).data("pname") +'" data-pid="'+ $(con).data("pid") +'" data-code="' + $(con).data("code") + '" data-name="' + $(con).data("name") + '">' + $(con).data("name") + '<i>×</i></span>');
                    $(con).parent('li').siblings('li').find('a').removeClass('d-item-active')
                    $(con).addClass('d-item-active');

                    $('.data-list-provinces a[data-code=' + $(con).data("code").toString().substring(0, 3) + ']').removeClass('d-item-active');
                    $('.data-list-provinces a[data-code=' + $(con).data("code").toString().substring(0, 3) + ']').find('label').text(0).hide();
                }
            }
            $('.data-result span').each(function () {
                $('.data-list-provinces a[data-pid=' + $(this).data("pid").toString() + ']').find('label').text(0).hide();
            });
            $('.data-result span').each(function () {
                if ($('a[data-code=' + $(this).data("code") + ']').length > 0) {
                    $('a[data-code=' + $(this).data("code") + ']').addClass('d-item-active');
                    if ($('a[data-code=' + $(this).data("code") + ']').attr("class").indexOf('data-all') > 0) {
                        if (datatype == "duoxuan") {
                            $('a[data-code=' + $(this).data("code") + ']').parent('li').nextAll('li').find('a').css({ 'color': '#ccc', 'cursor': 'not-allowed' });
                            // $('a[data-code=' + $(this).data("code") + ']').parent('li').nextAll("li").find('a').attr("onclick", "");
                            $('a[data-code=' + $(this).data("code") + ']').parent('li').nextAll("li").find('a').off('click');
                        }
                    } else {
                        if (datatype == "danxuan") {
                            $('.data-list-provinces a').each(function () {
                                $(this).find('label').text(0).hide();
                            });
                        }
                        if ($('.data-list-provinces a[data-pid=' + $(this).data("pid").toString().substring(0, 3) + ']').length > 0) {
                            var numlabel = $('.data-list-provinces a[data-pid=' + $(this).data("pid").toString() + ']').find('label').text();
                            $('.data-list-provinces a[data-pid=' + $(this).data("pid").toString() + ']').find('label').text(parseInt(numlabel) + 1).show();
                        }
                    }
                } else {
                    var numlabel = $('.data-list-provinces a[data-pid=' + $(this).data("pid").toString() + ']').find('label').text();
                    $('.data-list-provinces a[data-pid=' + $(this).data("pid").toString() + ']').find('label').text(parseInt(numlabel) + 1).show();
                }
            });
        }
    }

    function selectitem_area(con) {
        if (datatype == "duoxuan") {
            //多选
            if ($('.data-result span').length > 2000) {
                $('.data-error').slideDown();
                setTimeout("$('.data-error').hide()", 1000);
                return false;
            } else {
                $('.data-result span').each(function () {
                    if ($(this).data("code").toString().substring(0, $(con).data("code").toString().length) == $(con).data("code").toString()) {
                        $(this).remove();
                    }
                })
                $(con).parent('li').siblings('li').find("a").removeClass("d-item-active");

                if ($(con).attr("class").indexOf("d-item-active") == -1) {
                    $(con).parent('li').nextAll("li").find('a').css({ 'color': '#ccc', 'cursor': 'not-allowed' })
                    // $(con).parent('li').nextAll("li").find('a').attr("onclick", "");
                    $(con).parent('li').nextAll("li").find('a').off('click');
                } else {
                    $(con).parent('li').nextAll("li").find('a').css({ 'color': '#0077b3', 'a.d-item-active:hover': '#fff', 'cursor': 'pointer' })
                    // $(con).parent('li').nextAll("li").find('a').attr("onclick", 'selectProvince("sub",this,"")');
                    $(con).parent('li').nextAll("li").find('a').on("click", 'selectP');
                }
                if ($(con).attr("class").indexOf('d-item-active') > 0) {
                    $('.data-result span[data-code="' + $(con).data("code") + '"]').remove();
                    $(con).removeClass('d-item-active');
                    return false;
                }
                $('.data-result').append('<span class="save_box aui-titlespan" data-pname="'+ $(con).data("pname") +'" data-pid="'+ $(con).data("pid") +'" data-code="' + $(con).data("code") + '" data-name="' + $(con).data("name") + '">' + $(con).data("name") + '<i>×</i></span>');
                $(con).addClass('d-item-active');
            }
        } else {
            //单选
            $('.data-result span').remove();
            $('.data-result').append('<span class="save_box aui-titlespan" data-pname="'+ $(con).data("pname") +'" data-pid="'+ $(con).data("pid") +'" data-code="' + $(con).data("code") + '" data-name="' + $(con).data("name") + '">' + $(con).data("name") + '<i>×</i></span>');
            $(con).parent('li').siblings('li').find('a').removeClass('d-item-active')
            $(con).addClass('d-item-active');
        }
    }
    var selectP = function () {
        var _this = $(this);
        selectProvince("sub",_this,"")
    }
    function removenode_area(lithis) {
        $(lithis).siblings().removeClass('active');
        $(lithis).addClass('active');
        if ($(lithis).nextAll('li').length == 0) {
            return false;
        }
        $(lithis).nextAll('li').remove();
        if ($(lithis).data("selector") == "tab-all") {
            selectProvince('all', null, '');
        } else {
            selectProvince('sub', lithis, 'remove');
        }
    }

    function removespan_area(spanthis) {
        $('a[data-code=' + $(spanthis).data("code") + ']').removeClass('d-item-active');
        if ($('a[data-code=' + $(spanthis).data("code") + ']').length > 0) {
            if ($('a[data-code=' + $(spanthis).data("code") + ']').attr("class").indexOf('data-all') > 0) {
                $('a[data-code=' + $(spanthis).data("code") + ']').parent('li').nextAll('li').find('a').css({ 'color': '#0077b3', 'a.d-item-active:hover': '#fff', 'cursor': 'pointer' });
                // $('a[data-code=' + $(spanthis).data("code") + ']').parent('li').nextAll("li").find('a').attr("onclick", 'selectProvince("sub",this,"")');
                $('a[data-code=' + $(spanthis).data("code") + ']').parent('li').nextAll("li").find('a').on("click", 'selectP');
            }
        }
        if ($('.data-list-provinces a[data-code=' + $(spanthis).data("code").toString().substring(0, 3) + ']').length > 0) {
            var numlabel = $('.data-list-provinces a[data-code=' + $(spanthis).data("code").toString().substring(0, 3) + ']').find('label').text();
            if (parseInt(numlabel) == 1) {
                $('.data-list-provinces a[data-code=' + $(spanthis).data("code").toString().substring(0, 3) + ']').find('label').text(0).hide();
            } else {
                $('.data-list-provinces a[data-code=' + $(spanthis).data("code").toString().substring(0, 3) + ']').find('label').text(parseInt(numlabel) - 1);
            }
        }
        $(spanthis).remove();
    }

//确定选择
    function save_City() {
        var val = '';   // 城市id（&集合）
        var Cityname = '';  // 城市名称（&集合）
        var pid = '';    // 省份主键id集合
        var pname = '';    // 省份名称集合
        if ($('.save_box').length > 0) {
            $('.save_box').each(function () {
                var provinceId = $(this).data("pid");   // 省份ID
                var provinceName = $(this).data("pname");   // 省份名称
                pname += provinceName + ',';
                pid += provinceId + ',';
                val += $(this).data("code") + ',';
                Cityname += $(this).data("name") + ',';
            });
        }
        if (val != '') {
            val = val.substring(0, val.lastIndexOf(','));
        }
        if (pid != '') {
            pid = pid.substring(0, pid.lastIndexOf(','));
        }
        if (pname != '') {
            pname = pname.substring(0, pname.lastIndexOf(','));
        }
        if (Cityname != '') {
            Cityname = Cityname.substring(0, Cityname.lastIndexOf(','));
        }

        $(dataCityinput).data("value", val);
        $(dataCityinput).val(Cityname);
        $(dataCityinput).data("pid", pid);
        $(dataCityinput).data("pname", pname);

        Close();
        callback && callback($(dataCityinput));
    }

    function Close() {
        $('.aui_state_box').remove();
    }

    function searchdata() {
        var list    = __LocalDataCities.list;
        var dataArr = [];
        for (var i in list) {
            if (i.length == 3 && i != '010' && i != '020' && i != '030' && i != '040') {
                continue;
            }
            if (i.length > 6 || i == 'hwgat') {
                continue;
            }
            if (parseInt(i.toString().substring(0, 2)) >= 32) {
                continue;
            }
            var temp = {};
            temp.code   = i;
            temp.name   = list[i][0];
            temp.pinyin = list[i][1];
            temp.py     = list[i][2];
            temp.pid     = list[i][3];
            temp.pname     = list[i][4];
            dataArr.push(temp);
        }
        return dataArr;
    }

// 搜索
    var auto_area = {
        run: function () {// 运行应用
            var run = $('.data-search input[name=searcharea]'), runList = $('.searchList'), ac_menu = $('.searchList .area_menu');
            var def_text = '请输入城市名搜索';
            // run.val(def_text);
            run.focus(function () {
                if (this.value == def_text) this.value = '';
            }).blur(function () {
                // if (this.value == '') this.value = def_text;
                auto_area.delay(function () { runList.hide() }, 300);//延时，等待选择事件执行完成
            }).bind('keyup', function () {
                auto_area.appRunList(runList, run.val());
            }).keydown(function (e) {
                if (e.keyCode == 13) setTimeout(auto_area.appRunExec, 200);
            });
        },
        delay: function (f, t) {
            { if (typeof f != "function") return; var o = setTimeout(f, t); this.clear = function () { clearTimeout(o) } }
        },
        appRunList: function (runList, v) {//自动搜索应用
            if (v == '') {
                runList.hide();
                return;
            }
            var i, temp = '', n = 0, loaded = {};
            //搜索以关键词开头的应用
            for (i in searchValue) {
                if (isNaN(i) || loaded[i] || !searchValue[i].name) {
                    continue;
                }
                runSearchCode = searchValue[i].code
                runSearchName = searchValue[i].name;
                runSearchPinyin = searchValue[i].pinyin;
                runSearchPy = searchValue[i].py;
                runSearchPid = searchValue[i].pid;
                runSearchPname = searchValue[i].pname;
                if (runSearchName.indexOf(v) >= 0 || runSearchPinyin.indexOf(v) >= 0 || runSearchPy.indexOf(v) >= 0 || runSearchPinyin.toLowerCase().indexOf(v) >= 0 || runSearchPy.toLowerCase().indexOf(v) >= 0) {
                    loaded[i] = 1;
                    temp += '<a class="area_menu" href="javascript:;" data-flag=1 data-pname="'+ runSearchPname +'" data-pid="'+ runSearchPid +'" data-code="' + runSearchCode + '" data-name="' + runSearchName + '"><em>' + runSearchPinyin.replace(v, "<b>" + v + "</b>") + '</em>' + runSearchName.replace(v, "<b>" + v + "</b>") + '</a>';
                    if (++n > 10) break;
                }
            }
            if (temp) {// 搜索到应用则显示
                runList.show().html(temp);
            } else {
                runList.hide().html('');
            }
        },

        appRunExec: function () {// 运行按纽点击
            ac_menu = $('.searchList .area_menu');
            if (ac_menu.length > 0) {
                ac_menu.eq(0).trigger('click');
            }
        }
    };
}
