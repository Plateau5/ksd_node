/**
 * Created by Arley Joe on 2018-5-17 10:11:46
 * @copyright Arley Joe   arleyjoe@163.com
 * @desc 选择类型：单选、复选
 *       数据类型：省市二级联动、省市区三级联动、市区二级联动
 * @return {Object} 返回数据为子父级嵌套数据类型，如：[{"id":101,"name":"北京市","code":"","checked":2,"city_list":[{"id":1001,"name":"北京市","code":"","checked":2,"city_list":[{"id":110101,"name":"东城区","code":"","checked":2},{"id":110102,"name":"西城区","code":"","checked":2},{"id":110105,"name":"朝阳区","code":"","checked":2},{"id":110106,"name":"丰台区","code":"","checked":2},{"id":110107,"name":"石景山区","code":"","checked":2},{"id":110108,"name":"海淀区","code":"","checked":2},{"id":110109,"name":"门头沟区","code":"","checked":2},{"id":110111,"name":"房山区","code":"","checked":2},{"id":110112,"name":"通州区","code":"","checked":2},{"id":110113,"name":"顺义区","code":"","checked":2},{"id":110114,"name":"昌平区","code":"","checked":2},{"id":110115,"name":"大兴区","code":"","checked":2},{"id":110116,"name":"怀柔区","code":"","checked":2},{"id":110117,"name":"平谷区","code":"","checked":2},{"id":110228,"name":"密云县","code":"","checked":2},{"id":110229,"name":"延庆县","code":"","checked":2}]}]},{"id":122,"name":"重庆市","code":"","checked":1,"city_list":[{"id":1234,"name":"重庆市","code":"","checked":1,"city_list":[{"id":500101,"name":"万州区","code":"","checked":2},{"id":500102,"name":"涪陵区","code":"","checked":2},{"id":500104,"name":"大渡口区","code":"","checked":2},{"id":500105,"name":"江北区","code":"","checked":2},{"id":500106,"name":"沙坪坝区","code":"","checked":2},{"id":500107,"name":"九龙坡区","code":"","checked":2},{"id":500108,"name":"南岸区","code":"","checked":2},{"id":500109,"name":"北碚区","code":"","checked":2},{"id":500110,"name":"綦江区","code":"","checked":2},{"id":500111,"name":"大足区","code":"","checked":2},{"id":500112,"name":"渝北区","code":"","checked":2},{"id":500113,"name":"巴南区","code":"","checked":2},{"id":500114,"name":"黔江区","code":"","checked":2},{"id":500115,"name":"长寿区","code":"","checked":2},{"id":500116,"name":"江津区","code":"","checked":2},{"id":500117,"name":"合川区","code":"","checked":2},{"id":500118,"name":"永川区","code":"","checked":2},{"id":500119,"name":"南川区","code":"","checked":2},{"id":500120,"name":"璧山区","code":"","checked":2},{"id":500151,"name":"铜梁区","code":"","checked":2},{"id":500200,"name":"市区","code":"","checked":2},{"id":500223,"name":"潼南县","code":"","checked":2},{"id":500226,"name":"荣昌县","code":"","checked":2},{"id":500228,"name":"梁平县","code":"","checked":2},{"id":500229,"name":"城口县","code":"","checked":2},{"id":500230,"name":"丰都县","code":"","checked":2},{"id":500231,"name":"垫江县","code":"","checked":2},{"id":500232,"name":"武隆县","code":"","checked":2},{"id":500233,"name":"忠县","code":"","checked":2},{"id":500234,"name":"开县","code":"","checked":2},{"id":500235,"name":"云阳县","code":"","checked":2},{"id":500236,"name":"奉节县","code":"","checked":2},{"id":500237,"name":"巫山县","code":"","checked":2},{"id":500238,"name":"巫溪县","code":"","checked":2},{"id":500240,"name":"石柱土家族自治县","code":"","checked":2},{"id":500241,"name":"秀山土家族苗族自治县","code":"","checked":2},{"id":500242,"name":"酉阳土家族苗族自治县","code":"","checked":2},{"id":500243,"name":"彭水苗族土家族自治县","code":"","checked":2}]}]},{"id":113,"name":"福建省","code":"","checked":2,"city_list":[{"id":1115,"name":"福州市","code":"","checked":2,"city_list":[{"id":350102,"name":"鼓楼区","code":"","checked":2},{"id":350103,"name":"台江区","code":"","checked":2},{"id":350104,"name":"仓山区","code":"","checked":2},{"id":350105,"name":"马尾区","code":"","checked":2},{"id":350111,"name":"晋安区","code":"","checked":2},{"id":350121,"name":"闽侯县","code":"","checked":2},{"id":350122,"name":"连江县","code":"","checked":2},{"id":350123,"name":"罗源县","code":"","checked":2},{"id":350124,"name":"闽清县","code":"","checked":2},{"id":350125,"name":"永泰县","code":"","checked":2},{"id":350128,"name":"平潭县","code":"","checked":2},{"id":350181,"name":"福清市","code":"","checked":2},{"id":350182,"name":"长乐市","code":"","checked":2}]},{"id":1116,"name":"厦门市","code":"","checked":2,"city_list":[{"id":350203,"name":"思明区","code":"","checked":2},{"id":350205,"name":"海沧区","code":"","checked":2},{"id":350206,"name":"湖里区","code":"","checked":2},{"id":350211,"name":"集美区","code":"","checked":2},{"id":350212,"name":"同安区","code":"","checked":2},{"id":350213,"name":"翔安区","code":"","checked":2}]},{"id":1117,"name":"莆田市","code":"","checked":2,"city_list":[{"id":350302,"name":"城厢区","code":"","checked":2},{"id":350303,"name":"涵江区","code":"","checked":2},{"id":350304,"name":"荔城区","code":"","checked":2},{"id":350305,"name":"秀屿区","code":"","checked":2},{"id":350322,"name":"仙游县","code":"","checked":2}]},{"id":1118,"name":"三明市","code":"","checked":2,"city_list":[{"id":350402,"name":"梅列区","code":"","checked":2},{"id":350403,"name":"三元区","code":"","checked":2},{"id":350421,"name":"明溪县","code":"","checked":2},{"id":350423,"name":"清流县","code":"","checked":2},{"id":350424,"name":"宁化县","code":"","checked":2},{"id":350425,"name":"大田县","code":"","checked":2},{"id":350426,"name":"尤溪县","code":"","checked":2},{"id":350427,"name":"沙县","code":"","checked":2},{"id":350428,"name":"将乐县","code":"","checked":2},{"id":350429,"name":"泰宁县","code":"","checked":2},{"id":350430,"name":"建宁县","code":"","checked":2},{"id":350481,"name":"永安市","code":"","checked":2}]},{"id":1119,"name":"泉州市","code":"","checked":2,"city_list":[{"id":350502,"name":"鲤城区","code":"","checked":2},{"id":350503,"name":"丰泽区","code":"","checked":2},{"id":350504,"name":"洛江区","code":"","checked":2},{"id":350505,"name":"泉港区","code":"","checked":2},{"id":350521,"name":"惠安县","code":"","checked":2},{"id":350524,"name":"安溪县","code":"","checked":2},{"id":350525,"name":"永春县","code":"","checked":2},{"id":350526,"name":"德化县","code":"","checked":2},{"id":350527,"name":"金门县","code":"","checked":2},{"id":350581,"name":"石狮市","code":"","checked":2},{"id":350582,"name":"晋江市","code":"","checked":2},{"id":350583,"name":"南安市","code":"","checked":2}]},{"id":1120,"name":"漳州市","code":"","checked":2,"city_list":[{"id":350602,"name":"芗城区","code":"","checked":2},{"id":350603,"name":"龙文区","code":"","checked":2},{"id":350622,"name":"云霄县","code":"","checked":2},{"id":350623,"name":"漳浦县","code":"","checked":2},{"id":350624,"name":"诏安县","code":"","checked":2},{"id":350625,"name":"长泰县","code":"","checked":2},{"id":350626,"name":"东山县","code":"","checked":2},{"id":350627,"name":"南靖县","code":"","checked":2},{"id":350628,"name":"平和县","code":"","checked":2},{"id":350629,"name":"华安县","code":"","checked":2},{"id":350681,"name":"龙海市","code":"","checked":2}]},{"id":1121,"name":"南平市","code":"","checked":2,"city_list":[{"id":350702,"name":"延平区","code":"","checked":2},{"id":350721,"name":"顺昌县","code":"","checked":2},{"id":350722,"name":"浦城县","code":"","checked":2},{"id":350723,"name":"光泽县","code":"","checked":2},{"id":350724,"name":"松溪县","code":"","checked":2},{"id":350725,"name":"政和县","code":"","checked":2},{"id":350781,"name":"邵武市","code":"","checked":2},{"id":350782,"name":"武夷山市","code":"","checked":2},{"id":350783,"name":"建瓯市","code":"","checked":2},{"id":350784,"name":"建阳市","code":"","checked":2}]},{"id":1122,"name":"龙岩市","code":"","checked":2,"city_list":[{"id":350802,"name":"新罗区","code":"","checked":2},{"id":350821,"name":"长汀县","code":"","checked":2},{"id":350822,"name":"永定县","code":"","checked":2},{"id":350823,"name":"上杭县","code":"","checked":2},{"id":350824,"name":"武平县","code":"","checked":2},{"id":350825,"name":"连城县","code":"","checked":2},{"id":350881,"name":"漳平市","code":"","checked":2}]},{"id":1123,"name":"宁德市","code":"","checked":2,"city_list":[{"id":350902,"name":"蕉城区","code":"","checked":2},{"id":350921,"name":"霞浦县","code":"","checked":2},{"id":350922,"name":"古田县","code":"","checked":2},{"id":350923,"name":"屏南县","code":"","checked":2},{"id":350924,"name":"寿宁县","code":"","checked":2},{"id":350925,"name":"周宁县","code":"","checked":2},{"id":350926,"name":"柘荣县","code":"","checked":2},{"id":350981,"name":"福安市","code":"","checked":2},{"id":350982,"name":"福鼎市","code":"","checked":2}]}]}]。
 *
 * 调用方法：
 * 必传项：1.调用类型type；2.数据类型dataType；3.原始数据data；4.默认选中数据defaultData
 * 编辑回显必传项：1.默认选中数据defaultData
 */

+function ($) {
    function citySelect (elem, option, callback) {
        this.elem = elem;
        this.option = option;
        this.callback = callback;

        this.config = {
            id : new Date().getTime(),
            type : 2,       // 调用类型 : 1|'single'-单选，2|'multiple'-复选
            dataType : 2,       // 数据类型：1-两级数据、2-三级数据
            container : $('#citySelectContainer'),      // 容器
            provinces : $('.province-list-item'),       // 省份列表容器
            cities : $('.city-list-item'),              // 城市列表容器
            counties : $('.county-list-item'),          // 县/区列表容器
            data : [],       // 城市源数据
            defaultData : [],       // 默认选中数据
        };

        this.options = $.extend(true, {}, this.config, this.option);

        this.init();
        // console.log(JSON.stringify(this.options.data));

    }

    $.fn.citySelect = function (options, callback) {
        // 注册目标元素调用插件的事件
        // Todo 根据项目需要扩展其他事件的注册
        return this.each(function () {
            var t = $(this);
            t.on('click', function () {
                return new citySelect(
                    t,
                    options || {},
                    callback || function () {return false;}
                );
            });

        });

        /*this.elem.off('click').on('click', function (e) {
            var ev = e || event;
            ev.stopPropagation();
            ev.preventDefault();

        });*/
    };

    var win = window;
    var doc = $(document);
    var body = $('body');
    var CSP = citySelect.prototype;

    CSP.init = function () {
        var that = this;
        this.formatData(this.options.data, this.options.defaultData);
        // 初始化容器
        if ($('#citySelectContainer').length <= 0) {
            var container = that.initContainer();
            body.append(container);
            that.options.container = $('#citySelectContainer');
            that.options.provinces = $('.province-list-item');
            that.options.cities = $('.city-list-item');
            that.options.counties = $('.county-list-item');
        }

        that.createDom(that.options.data);
        if (that.options.type === 1 || that.options.type === "single") {
            that.selectCitySingle();
        } else if (that.options.type === 2 || that.options.type === "multiple") {
            that.selectCityMultiple();
        }
        that.options.container.show();
        that.bindEvent();

    };

    CSP.initContainer = function () {
        var container = '<div id="citySelectContainer" class="city-select-container" style="display: none;">\n' +
            '        <div class="mask-layer"></div>\n' +
            '        <div class="city-select-wrapper '+ (this.options.type === 1 ? 'single ' : 'multiple ') + (this.options.dataType === 1 ? 'p-c' : 'p-c-c') +'">\n' +
            '            <div class="title">选择城市</div>\n' +
            '            <div class="content">\n' +
            '                <div class="city-select-item province-list-item">\n' +
            '                    <div class="item-name">省份</div>\n' +
            '                    <ul class="city-select-list">\n' +
            '\n' +
            '                    </ul>\n' +
            '                </div>\n' +
            '                <div class="city-select-item city-list-item">\n' +
            '                    <div class="item-name">城市</div>\n' +
            '\n' +
            '                </div>\n' +
            (this.options.dataType === 2 ? '<div class="city-select-item county-list-item"><div class="item-name">县/区</div></div>' : '') +
            '            </div>\n' +
            '            <div class="error-tips-box">\n' +
            '               <div class="error-tips">*您还未选择任何城市，请先选择城市</div>\n' +
            '            </div>\n' +
            '            <div class="city-select-btn">\n' +
            '                <a href="javascript:;" id="citySelectConfirm" class="btn city-select-confirm">确认</a>\n' +
            '                <a href="javascript:;" id="citySelectCancel" class="btn city-select-cancel">取消</a>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>';
        return container;
    };

    /**
     * 创建Dom元素
     * @param data {Object} ：城市数据源数据
     */
    CSP.createDom = function (data) {
        var that = this;
        var provinceDom = '';
        for (var i = 0, provinceLen = data.length; i < provinceLen; i++) {
            provinceDom += '<li class="list-item '+ (((that.options.type === 1 || that.options.type === "single") && data[i].checked === 2 ) ? 'active' : '') +'" data-type="province" data-checked="'+ data[i].checked +'" data-code="'+ data[i].code +'" data-id="'+ data[i].id +'" data-name="'+ data[i].name +'">\n' +
                '                            <input id="" type="checkbox" name="" value="'+ data[i].id +'" '+ (data[i].checked !== 0 ? "checked" : "") +'>\n' +
                ((that.options.type === 1 || that.options.type === "single") ? '' : '') +
                ((that.options.type === 2 || that.options.type === "multiple") ? ('<label for="" class="'+ (data[i].checked === 0 ? "" : (data[i].checked === 1 ? "check" : "checked")) +'"></label>\n') : '') +
                '                            <span>'+ data[i].name +'</span>\n' +
                '                        </li>';
            if (data[i].city_list && data[i].city_list.length > 0) {
                createCitiesDom(data[i].city_list, data[i].id, data[i].name, data[i].code);
            }
        }
        this.options.provinces.find('.city-select-list').html(provinceDom);
        // 设置默认选中项
        var checkedCities, checkedCounties;
        if (this.options.type === 1 || this.options.type === 'single') {
            checkedCities = that.options.cities.find('.list-item.active');
            checkedCounties = that.options.counties.find('.list-item.active');
        } else if (this.options.type === 2 || this.options.type === 'multiple') {
            checkedCities = that.options.cities.find('.list-item label.check, .list-item label.checked');
            checkedCounties = that.options.counties.find('.list-item label.checked');
        }

        if (checkedCities.length > 0) {
            checkedCities.eq(0).parents('.city-select-list').show();
        } else {
            that.options.cities.find('.city-select-list').eq(0).show();
        }

        if (checkedCounties.length > 0) {
            checkedCounties.eq(0).parents('.city-select-list').show();
        } else {
            that.options.counties.find('.city-select-list').eq(0).show();
        }
        // 创建城市列表DOM树
        function createCitiesDom (citiesData, pid, pname, pcode) {
            var citiesDom = '<ul id="city'+ pid +'" class="city-select-list" style="display: none;" data-pid="'+ pid +'" data-pname="'+ pname +'" data-pcode="'+ pcode +'">';
            for (var j = 0, citiesLen = citiesData.length; j < citiesLen; j++) {
                citiesDom += '<li class="list-item '+ (((that.options.type === 1 || that.options.type === "single") && citiesData[j].checked === 2 ) ? 'active' : '') +'" data-type="city"  data-code="'+ citiesData[j].code +'" data-checked="'+ citiesData[j].checked +'" data-id="'+ citiesData[j].id +'" data-name="'+ citiesData[j].name +'">\n' +
                    '                            <input id="" type="checkbox" name="" value="'+ citiesData[j].id +'" '+ (citiesData[j].checked !== 0 ? "checked" : "") +'>\n' +
                    ((that.options.type === 1 || that.options.type === "single") ? '' : '') +
                    ((that.options.type === 2 || that.options.type === "multiple") ? ('<label for="" class="'+ (citiesData[j].checked === 0 ? "" : (citiesData[j].checked === 1 ? "check" : "checked")) +'"></label>\n') : '') +
                    '                            <span>'+ citiesData[j].name +'</span>\n' +
                    '                        </li>';
                if (citiesData[j].city_list && citiesData[j].city_list.length > 0 && that.options.dataType === 2) {
                    createCountiesDom(citiesData[j].city_list, citiesData[j].id, citiesData[j].name, citiesData[j].code, pid, pname, pcode);
                }
            }
            citiesDom += '</ul>';
            that.options.cities.append(citiesDom);

        }
        // 创建县/区列表DOM树
        function createCountiesDom (countiesData, cid, cname, ccode, pid, pname, pcode) {
            var countiesDom = '<ul id="county'+ cid +'" class="city-select-list" style="display: none;" data-cid="'+ cid +'" data-cname="'+ cname +'" data-ccode="'+ ccode +'" data-pid="'+ pid +'" data-pname="'+ pname +'" data-pcode="'+ pcode +'">';
            for (var k = 0, countiesLen = countiesData.length; k < countiesLen; k++) {
                countiesDom += '<li class="list-item '+ (((that.options.type === 1 || that.options.type === "single") && countiesData[k].checked === 2 ) ? 'active' : '') +'" data-type="county" data-code="'+ countiesData[k].code +'" data-checked="'+ countiesData[k].checked +'" data-id="'+ countiesData[k].id +'" data-name="'+ countiesData[k].name +'">\n' +
                    '                            <input id="" type="checkbox" name="" value="'+ countiesData[k].id +'" '+ (countiesData[k].checked !== 0 ? "checked" : "") +'>\n' +
                    ((that.options.type === 1 || that.options.type === "single") ? '' : '') +
                    ((that.options.type === 2 || that.options.type === "multiple") ? ('<label for="" class="'+ (countiesData[k].checked === 0 ? "" : (countiesData[k].checked === 1 ? "check" : "checked")) +'"></label>\n') : '') +
                    '                            <span>'+ countiesData[k].name +'</span>\n' +
                    '                        </li>';
            }
            countiesDom += '</ul>';
            that.options.counties.append(countiesDom);

        }
    };

    CSP.selectCityMultiple = function () {
        var that = this;

        var cityItem = this.options.container.find('.city-select-item').find('.list-item');         // 所有的城市数据列表项
        var checkbox = this.options.container.find('.city-select-item').find('label');      // 所有数据的label元素
        // 点击复选框逻辑
        checkbox.off('click').on('click', function (e) {
            var ev = e || window.event;
            ev.stopPropagation();
            ev.preventDefault();
            var _this = $(this);
            var clickItem = _this.parents('.list-item');       // 当前点击数据的父元素（li）
            var type = clickItem.data('type');         // 当前点击数据的类型
            var pid = '', cid = '';     // 当前省份的ID
            var cChecked = 0;       // 当前选择地区所在城市的选中状态：0-未选中、1-半选中、2-选中
            var provinceItem = null;     // 当前选中城市的父级省份元素
            var citiesCheckedAll = 0;       // 当前省份下所有城市是否全部选中 0-全部未选、1-部分、2-全部选中
            var provinceLabel = null;     // 当前选中城市的父级省份元素的label元素
            // 隐藏提示框
            that.options.container.find('.error-tips').removeClass('show').addClass('hide');

            if (type === 'province') {
                pid = clickItem.data('id');
            } else {
                pid = clickItem.parents('.city-select-list').data('pid');
            }
            var citiesList = that.options.cities.find('.city-select-list[data-pid="'+ pid +'"]');           // 选中省份下的城市列表
            var cities = citiesList.find('.list-item');        // 选中省份下的所有城市
            var countiesList = that.options.counties.find('.city-select-list[data-pid="'+ pid +'"]');           // 选中省份下的县区列表
            var counties = countiesList.find('.list-item');        // 选中省份下的所有县区
            // 设置当前选中城市的选中状态
            clickItem.removeClass('active').addClass('active').siblings('.list-item').removeClass('active');
            if (type === 'province') {      // 点击省份
                that.options.cities.find('.list-item.active').removeClass('active');
                that.options.counties.find('.list-item.active').removeClass('active');
                var pChecked = false;
                if (_this.hasClass('checked')) {
                    _this.removeClass('checked check').end().siblings('input[type="checked"]').prop('checked', false);
                    pChecked = false;
                } else {
                    _this.removeClass('checked check').addClass('checked').end().siblings('input[type="checked"]').prop('checked', false).prop('checked', true);
                    pChecked = true;
                }
                // 设置当前选中省份下的城市选中状态
                cities.each(function () {
                    var target = $(this);
                    var label = target.find('label');       // 当前城市的label
                    if (pChecked) {
                        label.removeClass('checked check').addClass('checked').end().siblings('input[type="checked"]').prop('checked', false).prop('checked', true);
                    } else {
                        label.removeClass('checked check').end().siblings('input[type="checked"]').prop('checked', false);
                    }
                });
                citiesList.eq(0).show().siblings('.city-select-list').hide();
                // 设置当前选中省份下的县区选中状态：默认展示第一个城市的县区
                counties.each(function () {
                    var target = $(this);
                    var label = target.find('label');       // 当前县区的label
                    if (pChecked) {
                        label.removeClass('checked check').addClass('checked').end().siblings('input[type="checked"]').prop('checked', false).prop('checked', true);
                    } else {
                        label.removeClass('checked check').end().siblings('input[type="checked"]').prop('checked', false);
                    }
                });
                countiesList.eq(0).show().siblings('.city-select-list').hide();
            } else if (type === 'city') {       // 点击城市
                that.options.counties.find('.list-item.active').removeClass('active');
                cid = clickItem.data('id');     // 当前点击城市的ID值
                countiesList = that.options.counties.find('.city-select-list[data-cid="'+ cid +'"]');           // 当前点击城市下的县区列表
                counties = countiesList.find('.list-item');        // 当前点击城市下的所有县区
                // var cChecked = false;
                if (_this.hasClass('checked')) {
                    _this.removeClass('checked check').end().siblings('input[type="checked"]').prop('checked', false);
                    cChecked = 0;
                } else {
                    _this.removeClass('checked check').addClass('checked').end().siblings('input[type="checked"]').prop('checked', false).prop('checked', true);
                    cChecked = 2;
                }
                /**
                 * 设置当前城市所在省份的选中状态。
                 *
                 * */
                provinceItem = that.options.provinces.find('.list-item[data-id="'+ pid +'"]');     // 当前选中城市的父级省份元素
                // var citiesCheckedAll = 0;       // 当前省份下所有城市是否全部选中 0-全部未选、1-部分、2-全部选中
                cities.each(function () {
                    var target = $(this);
                    var label = target.find('label');
                    if (cChecked === 2) {
                        if (!label.hasClass('checked') && !label.hasClass('check')) {
                            citiesCheckedAll = 1;
                            return false;
                        } else if (label.hasClass('check')) {
                            citiesCheckedAll = 1;
                            return false;
                        } else {
                            citiesCheckedAll = 2;
                        }
                    } else {
                        if (label.hasClass('checked')) {
                            citiesCheckedAll = 1;
                            return false;
                        } else if (label.hasClass('check')) {
                            citiesCheckedAll = 1;
                            return false;
                        } else {
                            citiesCheckedAll = 0;
                        }
                    }
                });
                provinceLabel = provinceItem.find('label');     // 当前选中城市的父级省份元素的label元素
                if (citiesCheckedAll === 0) {
                    provinceLabel.removeClass('checked check');
                    provinceLabel.siblings('input[type="checked"]').prop('checked', false);
                } else if (citiesCheckedAll === 1) {
                    provinceLabel.removeClass('checked check').addClass('check');
                    provinceLabel.siblings('input[type="checked"]').prop('checked', true);
                } else {
                    provinceLabel.removeClass('checked check').addClass('checked');
                    provinceLabel.siblings('input[type="checked"]').prop('checked', true);
                }
                /**
                 * 设置当前选中城市下的所有县/区
                 */
                counties.each(function () {
                    var target = $(this);
                    var label = target.find('label');
                    if (cChecked) {
                        label.removeClass('checked check').addClass('checked');
                        label.siblings('input[type="checked"]').prop('checked', true);
                    } else {
                        label.removeClass('checked check');
                        label.siblings('input[type="checked"]').prop('checked', false);
                    }
                });
                countiesList.show().siblings('.city-select-list').hide();
            } else if (type === 'county') {     // 点击县区
                countiesList = clickItem.parents('.city-select-list');           // 当前点击县区的父级元素（ul）
                counties = countiesList.find('.list-item');        // 当前点击城市下的所有县区
                cid = countiesList.data('cid');     // 当前点击县区的父级城市的ID值
                var countyChecked = false;
                if (_this.hasClass('checked')) {
                    _this.removeClass('checked check').end().siblings('input[type="checked"]').prop('checked', false);
                    countyChecked = false;
                } else {
                    _this.removeClass('checked check').addClass('checked').end().siblings('input[type="checked"]').prop('checked', false).prop('checked', true);
                    countyChecked = true;
                }
                /**
                 * 设置当前县区所在城市的选中状态。
                 *
                 * */
                var cityItem = that.options.cities.find('.list-item[data-id="'+ cid +'"]');     // 当前选中县区的父级城市元素
                var countiesCheckedAll = 0;       // 当前县区所有城市是否全部选中 0-全部未选、1-部分、2-全部选中
                counties.each(function () {
                    var target = $(this);
                    var label = target.find('label');
                    if (countyChecked) {
                        if (!label.hasClass('checked') && !label.hasClass('check')) {
                            countiesCheckedAll = 1;
                            return false;
                        } else if (label.hasClass('check')) {
                            countiesCheckedAll = 1;
                            return false;
                        } else {
                            countiesCheckedAll = 2;
                        }
                    } else {
                        if (label.hasClass('checked')) {
                            countiesCheckedAll = 1;
                            return false;
                        } else if (label.hasClass('check')) {
                            countiesCheckedAll = 1;
                            return false;
                        } else {
                            countiesCheckedAll = 0;
                        }
                    }
                });
                var cityLabel = cityItem.find('label');
                cChecked = false;
                if (countiesCheckedAll === 0) {
                    cityLabel.removeClass('checked check');
                    cityLabel.siblings('input[type="checked"]').prop('checked', false);
                    cChecked = 0;
                } else if (countiesCheckedAll === 1) {
                    cityLabel.removeClass('checked check').addClass('check');
                    cityLabel.siblings('input[type="checked"]').prop('checked', true);
                    cChecked = 1;
                } else {
                    cityLabel.removeClass('checked check').addClass('checked');
                    cityLabel.siblings('input[type="checked"]').prop('checked', true);
                    cChecked = 2;
                }
                /**
                 * 设置当前县区所在省份的选中状态。
                 *
                 * */
                provinceItem = that.options.provinces.find('.list-item[data-id="'+ pid +'"]');     // 当前选中城市的父级省份元素
                provinceLabel = provinceItem.find('label');     // 当前选中城市的父级省份元素的label元素
                // var citiesCheckedAll = 0;       // 当前省份下所有城市是否全部选中 0-全部未选、1-部分、2-全部选中
                if (cChecked === 1) {
                    citiesCheckedAll = 1;
                } else {
                    cities.each(function () {
                        var target = $(this);
                        var label = target.find('label');
                        if (cChecked === 2) {
                            if (!label.hasClass('checked') && !label.hasClass('check')) {
                                citiesCheckedAll = 1;
                                return false;
                            } else if (label.hasClass('check')) {
                                citiesCheckedAll = 1;
                                return false;
                            } else {
                                citiesCheckedAll = 2;
                            }
                        } else if (cChecked === 0) {
                            if (label.hasClass('checked')) {
                                citiesCheckedAll = 1;
                                return false;
                            } else if (label.hasClass('check')) {
                                citiesCheckedAll = 1;
                                return false;
                            } else {
                                citiesCheckedAll = 0;
                            }
                        }
                    });
                }
                if (citiesCheckedAll === 0) {
                    provinceLabel.removeClass('checked check');
                    provinceLabel.siblings('input[type="checked"]').prop('checked', false);
                } else if (citiesCheckedAll === 1) {
                    provinceLabel.removeClass('checked check').addClass('check');
                    provinceLabel.siblings('input[type="checked"]').prop('checked', true);
                } else {
                    provinceLabel.removeClass('checked check').addClass('checked');
                    provinceLabel.siblings('input[type="checked"]').prop('checked', true);
                }
            }
        });

        // 点击列表项逻辑
        cityItem.off('click').on('click', function (e) {
            var ev = e || window.event;
            ev.stopPropagation();
            ev.preventDefault();
            var _this = $(this);
            // var parent = _this.parents('.list-item');       // 当前点击数据的父元素
            // 设置提示信息展示
            that.options.container.find('.error-tips').removeClass('show').addClass('hide');
            var type = _this.data('type');     // 当前点击数据的类型
            // 设置城市展示
            var pid = '';     // 当前省份的ID
            if (type === 'province') {
                pid = _this.data('id');
            } else {
                pid = _this.parents('.city-select-list').data('pid');
            }
            var citiesList = that.options.cities.find('.city-select-list[data-pid="'+ pid +'"]');           // 选中省份下的城市列表
            // var cities = citiesList.find('.list-item');        // 选中省份下的所有城市
            var countiesList = that.options.counties.find('.city-select-list[data-pid="'+ pid +'"]');           // 选中省份下的县区列表
            // var counties = countiesList.find('.list-item');        // 选中省份下的所有县区
            _this.removeClass('active').addClass('active').siblings('.list-item').removeClass('active');
            if (type === 'province') {       // 点击省份
                that.options.cities.find('.list-item.active').removeClass('active');
                that.options.counties.find('.list-item.active').removeClass('active');
                citiesList.eq(0).show().siblings('.city-select-list').hide();
                countiesList.eq(0).show().siblings('.city-select-list').hide();
            } else if (type === 'city') {       // 点击城市
                that.options.counties.find('.list-item.active').removeClass('active');
                var cid = _this.data('id');     // 当前点击城市的ID值
                countiesList = that.options.counties.find('.city-select-list[data-cid="'+ cid +'"]');           // 当前点击城市下的县区列表
                countiesList.eq(0).show().siblings('.city-select-list').hide();
            } else if (type === 'county') {     // 点击县区

            }
        });
    };
    // 单选状态的选择事件句柄
    CSP.selectCitySingle = function () {
        var that = this;

        var cityItem = this.options.container.find('.city-select-item').find('.list-item');         // 所有的城市数据列表项
        cityItem.off('click').on('click', function (e) {
            var ev = e || window.event;
            ev.stopPropagation();
            ev.preventDefault();

            var _this = $(this);        // 当前点击数据的父元素（li）
            var type = _this.data('type');         // 当前点击数据的类型
            var pid = '', cid = '';     // 当前省份的ID
            // 设置提示信息展示
            that.options.container.find('.error-tips').removeClass('show').addClass('hide');
            if (type === 'province') {
                pid = _this.data('id');
            } else {
                pid = _this.parents('.city-select-list').data('pid');
            }
            var citiesList = that.options.cities.find('.city-select-list[data-pid="'+ pid +'"]');           // 选中省份下的城市列表
            var countiesList = that.options.counties.find('.city-select-list[data-pid="'+ pid +'"]');           // 选中省份下的县区列表

            // 设置当前选中省份的选中状态
            _this.removeClass('active').addClass('active').siblings('.list-item').removeClass('active').find('input[type="checked"]').prop('checked', false);
            _this.find('input[type="checked"]').prop('checked', true);
            if (type === 'province') {   //点击省份
                // 设置省份数据
                var checkedProvince = _this.siblings('.list-item.active');
                checkedProvince.find('input[type="checked"]').prop('checked', false);
                // 设置城市数据
                citiesList.show().siblings('.city-select-list').hide();
                that.options.cities.find('.list-item.active').removeClass('active').find('input[type="checked"]').prop('checked', false);
                // 设置县区数据（默认展示第一个城市的县区）
                countiesList.eq(0).show().siblings('.city-select-list').hide();
                that.options.counties.find('.list-item.active').removeClass('active').find('input[type="checked"]').prop('checked', false);
            } else if (type === 'city') {   //点击城市
                // 设置城市数据
                var checkedCity = _this.siblings('.list-item.active');
                checkedCity.find('input[type="checked"]').prop('checked', false);
                // 设置县区数据
                cid = _this.data('id');         // 当前城市的id值
                that.options.counties.find('.list-item.active').removeClass('active').find('input[type="checked"]').prop('checked', false);
                countiesList = that.options.counties.find('.city-select-list[data-cid="'+ cid +'"]');           // 选中城市下的县区列表
                countiesList.show().siblings('.city-select-list').hide();
            } else if (type === 'county') {   //点击县/区
                // 设置县区数据
                // todo When the user is needed, anything that needs to be done can be written here.
            } else {
                throw new Error ('The parameter "type" is not defined.');
            }
        });
    };

    /**
     * 获取选中数据
     */
    CSP.getCheckedData = function () {
        var checkedProvinces, checkedCities, checkedCounty, parentItem,
            pid, pname, pcode, cid, cname, ccode, countiesId, countiesName, countiesCode, checked;
        var data = [];
        //  单选类型
        if (this.options.type === 1 || this.options.type === 'single') {
            if (this.options.dataType === 1) {      // 两级联动
                checkedCities = this.options.cities.find('.list-item.active');
                if (checkedCities.length > 0) {
                    pid = checkedCities.parents('.city-select-list').data('pid');       // 省份ID
                    pname = checkedCities.parents('.city-select-list').data('pname');       // 省份名称
                    pcode = checkedCities.parents('.city-select-list').data('pcode');       // 省份code
                    cid = checkedCities.data('id');       // 城市ID
                    cname = checkedCities.data('name');       // 城市名称
                    ccode = checkedCities.data('code');       // 城市code
                    if (pcode === 'undefined') {
                        pcode = '';
                    }
                    if (ccode === 'undefined') {
                        ccode = '';
                    }
                    data = [
                        {
                            id : pid,
                            name : pname,
                            code : pcode,
                            checked : 2,
                            city_list : [{
                                id : cid,
                                name : cname,
                                code : ccode,
                                checked : 2
                            }]
                        }
                    ];
                    return data;
                } else {
                    return false;
                }
            } else if (this.options.dataType === 2) {       // 三级联动
                checkedCounty = this.options.counties.find('.list-item.active');
                if (checkedCounty.length > 0) {
                    parentItem = checkedCounty.parents('.city-select-list');
                    countiesId = checkedCounty.data('id');       // 县区ID
                    countiesName = checkedCounty.data('name');       // 县区名称
                    countiesCode = checkedCounty.data('code');       // 县区名称
                    pid = parentItem.data('pid');       // 省份ID
                    pname = parentItem.data('pname');       // 省份名称
                    pcode = parentItem.data('pcode');       // 省份code
                    cid = parentItem.data('cid');       // 城市ID
                    cname = parentItem.data('cname');       // 城市名称
                    ccode = parentItem.data('ccode');       // 城市code
                    if (pcode === 'undefined') {
                        pcode = '';
                    }
                    if (ccode === 'undefined') {
                        ccode = '';
                    }
                    if (countiesCode === 'undefined') {
                        countiesCode = '';
                    }
                    data = [
                        {
                            id : pid,
                            name : pname,
                            code : pcode,
                            checked : 2,
                            city_list : [{
                                id : cid,
                                name : cname,
                                code : ccode,
                                checked : 2,
                                city_list : [{
                                    id : countiesId,
                                    name : countiesName,
                                    code : countiesCode,
                                    checked : 2
                                }]
                            }]
                        }
                    ];
                    return data;
                } else {
                    return false;
                }
            }
            // 复选类型
        } else if (this.options.type === 2 || this.options.type === 'multiple') {
            var that = this;
            checkedProvinces = this.options.provinces.find('.list-item').find('label.checked, label.check');        // 当前省份数据
            checkedProvinces.each(function () {
                var _this = $(this);
                var _parent = _this.parents('.list-item');
                var pObject = {};       // 存储省份数据
                pid = _parent.data('id');       // 省份id
                pname = _parent.data('name');       // 省份名称
                pcode = _parent.data('code');       // 省份code
                if (_this.hasClass('check')) {
                    checked = 1;
                } else if (_this.hasClass('checked')) {
                    checked = 2;
                }
                if (pcode === 'undefined') {
                    pcode = '';
                }
                pObject.id = pid;
                pObject.name = pname;
                pObject.code = pcode;
                pObject.checked = checked;
                pObject.city_list = [];

                // 获取城市数据
                var checkedCitiesList = that.options.cities.find('.city-select-list[data-pid="'+ pid +'"]');        // 当前省份下的城市列表
                var checkedCities = checkedCitiesList.find('.list-item').find('label.checked, label.check');       // 当前省份下选中的城市数据
                checkedCities.each(function () {
                    var target = $(this);
                    var targetParent = target.parents('.list-item');
                    var cObject = {};       // 存储城市数据
                    cid = targetParent.data('id');      // 城市id
                    cname = targetParent.data('name');      // 城市名称
                    ccode = targetParent.data('code');      // 城市code
                    if (target.hasClass('check')) {
                        checked = 1;
                    } else if (target.hasClass('checked')) {
                        checked = 2;
                    }
                    if (ccode === 'undefined') {
                        ccode = '';
                    }
                    cObject.id = cid;
                    cObject.name = cname;
                    cObject.code = ccode;
                    cObject.checked = checked;
                    if (that.options.dataType === 2) {
                        cObject.city_list = [];
                        // 获取县区数据
                        var checkedCountiesList = that.options.counties.find('.city-select-list[data-cid="'+ cid +'"]');        // 当前城市下的县区列表
                        var checkedCounties = checkedCountiesList.find('.list-item').find('label.checked, label.check');       // 当前城市下选中的县区数据
                        checkedCounties.each(function () {
                            var $this = $(this);
                            var $Parent = $this.parents('.list-item');
                            var countyObject = {};       // 存储县区数据
                            countiesId = $Parent.data('id');        // 县区id
                            countiesName = $Parent.data('name');        // 县区名称
                            countiesCode = $Parent.data('code');        // 县区code
                            if ($this.hasClass('check')) {
                                checked = 1;
                            } else if ($this.hasClass('checked')) {
                                checked = 2;
                            }
                            if (countiesCode === 'undefined') {
                                countiesCode = '';
                            }
                            countyObject.id = countiesId;
                            countyObject.name = countiesName;
                            countyObject.code = countiesCode;
                            countyObject.checked = checked;
                            cObject.city_list.push(countyObject);
                        });
                    }
                    pObject.city_list.push(cObject);
                });
                data.push(pObject);
            });
            return data;
        }
    };

    CSP.getCheckedDom = function () {
        var data = {};
        var province, cities, counties;
        if (this.options.type === 1 || this.options.type === 'single') {
            province = this.options.provinces.find('.list-item.active');
            cities = this.options.cities.find('.list-item.active');
            counties = this.options.counties.find('.list-item.active');
        } else if (this.options.type === 2 || this.options.type === 'multiple') {
            province = this.options.provinces.find('label.checked, label.check');
            cities = this.options.cities.find('label.checked, label.check');
            counties = this.options.counties.find('label.checked');
        } else {
            return false;
        }
        data.province = province.length;
        data.cities = cities.length;
        data.counties = counties.length;
        return data;
    };

    CSP.bindEvent = function () {
        var that = this;
        var confirmBtn = $('#citySelectConfirm');
        var cancelBtn = $('#citySelectCancel');

        confirmBtn.off('click').on('click', function (e) {
            var ev = e || window.event;
            ev.stopPropagation();
            ev.preventDefault();
            var checkedDom = that.getCheckedDom();
            if (checkedDom === false) {
                that.options.container.find('.error-tips').text('*您还未选择任何城市，请选择。').removeClass('hide').addClass('show');
            } else {
                if (checkedDom.province <= 0 || checkedDom.cities <= 0) {
                    that.options.container.find('.error-tips').text('*您还未选择任何城市，请选择。').removeClass('hide').addClass('show');
                } else if ( that.dataType === 2 && checkedDom.counties <= 0) {
                    that.options.container.find('.error-tips').text('*您还未选择任何县/区，请选择。').removeClass('hide').addClass('show');
                } else {
                    var data = that.getCheckedData();
                    // console.log(JSON.stringify(data));
                    if (data.length > 0) {
                        that.callback(data);
                        // 设置默认数据
                        that.option.defaultData = data;
                        that.options.container.remove();
                        // window.location.reload();
                    } else if (data.length <= 0) {
                        return false;
                    } else {
                        return false;
                    }
                }
            }
        });
        cancelBtn.off('click').on('click', function (e) {
            var ev = e || window.event;
            ev.stopPropagation();
            ev.preventDefault();
            that.options.container.remove();
        });
    };

    CSP.formatData = function (sourceData, checkedData) {
        // var data = sourceData;       // 源数据
        // var checked = checkedData;         // 默认选中数据
        if (!(sourceData instanceof Array)) {
            throw new Error ("Data's type must be array. Check it.");
        }
        if (sourceData.length <= 0) {
            return [];
        }
        var checkedObj = {};        // 存储默认选中数据组合
        var pid, cid, countyId, cityList, countiesList;
        if (this.options.type === 1 || this.options.type === 'single') {
            if (checkedData.length <= 0) {
                pid = -1;
                cid = -1;
                countyId = -1;
            } else {
                pid = checkedData[0].id;
                cid = checkedData[0].city_list[0].id;
                if (checkedData[0].city_list[0].city_list) {
                    countyId = checkedData[0].city_list[0].city_list[0].id;
                }
            }
            for (var x = 0, lx = sourceData.length; x < lx; x++) {
                sourceData[x].checked = (sourceData[x].id == pid) ? 2 : 0;
                cityList = sourceData[x].city_list;
                for (var y = 0, ly = cityList.length; y < ly; y++) {
                    cityList[y].checked = (cityList[y].id == cid) ? 2 : 0;
                    countiesList = cityList[y].city_list;
                    if (countiesList && countiesList.length > 0) {
                        for (var z = 0, lz = countiesList.length; z < lz; z++) {
                            countiesList[z].checked = (countiesList[z].id == countyId) ? 2 : 0;
                        }
                    }
                }
            }
        } else if (this.options.type === 2 || this.options.type === 'multiple') {
            for (var a = 0, la = checkedData.length; a < la; a++) {
                pid = checkedData[a].id.toString();
                cityList = checkedData[a].city_list;
                checkedObj[pid] = {};
                checkedObj[pid].count = 0;
                for (var b = 0, lb = cityList.length; b < lb; b++) {
                    cid = cityList[b].id.toString();
                    countiesList = cityList[b].city_list;
                    if (countiesList && countiesList.length > 0) {
                        var o = {};
                        o.count = 0;
                        for (var c = 0, lc = countiesList.length; c < lc; c++) {
                            countyId = countiesList[c].id.toString();
                            o[countyId] = true;
                            o.count += 1;
                        }
                        checkedObj[pid][cid] = o;
                    } else {
                        checkedObj[pid][cid] = true;
                    }
                    checkedObj[pid].count += 1;
                }
            }
            // console.log(JSON.stringify(checkedObj));
            // console.log(checkedObj['101'].length);


            for (var e = 0, le = sourceData.length; e < le; e++) {
                pid = sourceData[e].id.toString();
                cityList = sourceData[e].city_list;
                if (checkedObj[pid]) {
                    for (var f = 0, lf = cityList.length; f < lf; f++) {
                        cid = cityList[f].id.toString();
                        var checkedCities = checkedObj[pid].count;
                        if (lf > checkedCities) {
                            // sourceData[e].city_list[f].checked = 1;
                            sourceData[e].checked = 1;
                        } else if (lf === checkedCities) {
                            // sourceData[e].city_list[f].checked = 2;
                            sourceData[e].checked = 2;
                        }
                        countiesList = cityList[f].city_list;
                        if (countiesList && countiesList.length > 0) {        // 三级数据时间
                            if (checkedObj[pid][cid]) {
                                for (var g = 0, lg = countiesList.length; g < lg; g++) {
                                    countyId = countiesList[g].id.toString();
                                    var checkedCounties = checkedObj[pid][cid].count;
                                    if (lg > checkedCounties) {
                                        cityList[f].checked = 1;
                                        sourceData[e].checked = 1;
                                    } else if (lg === checkedCounties) {
                                        cityList[f].checked = 2;
                                    }
                                    if (checkedObj[pid][cid][countyId]) {
                                        countiesList[g].checked = 2;
                                    } else {
                                        countiesList[g].checked = 0;
                                    }
                                }
                            } else {
                                cityList[f].checked = 0;
                            }
                        } else {        // 两级数据时间
                            // cityList[f].checked = 2;
                            for (var n in checkedObj[pid]) {
                                if (n == cid) {
                                    cityList[f].checked = 2;
                                    break;
                                } else {
                                    cityList[f].checked = 0;
                                }
                            }
                        }
                    }
                } else {
                    sourceData[e].checked = 0;
                    for (var h = 0, lh = cityList.length; h < lh; h++) {
                        countiesList = cityList[h].city_list;
                        cityList[h].checked = 0;
                        if (countiesList && countiesList.length > 0) {
                            for (var k = 0, lk = countiesList.length; k < lk; k++) {
                                countiesList[k].checked = 0;
                            }
                        }
                    }
                }
            }
        }

    }


} (jQuery, window);