/**
 * Created by Arley Joe 2017-08-03
 */

/**
 * 创建下拉选择（select）的内容
 *
 * @author Arley Joe 2017-8-7 14:43:16
 * @param target {string} ：目标select元素
 * @param list {Object} ：存储内容数据的数据对象
 * @param selectedValue {string} ：默认选中值
 * @param opt {Object} ：list的数据类型及取值key键
 *      type: list的数据类型：数组：‘array’, 对象(含Json) : 'object'
 *      key : type为必传项，取值字段的主键或值。
 *      name : type为‘Object’状态时必传，取值字段的字段名。
 */
function createOptions (target, list, selectedValue, opt) {
    var option = {
        type : 'Array',
        key : '',
        name : ''
    };
    var options = $.extend({}, option, opt);
    var optionEle = '';
    var keyStr = options.key;
    var nameStr = options.name;
    for (var i = 0, len = list.length; i < len; i++) {
        if (options.type.toLowerCase() === 'array') {
            optionEle += '<option '+ ((selectedValue == list[i]) && ' selected="selected" ') +' value="'+ list[i] +'">'+ list[i] +'</option>';
        } else if (options.type.toLowerCase() === 'object') {
            optionEle += '<option '+ ((selectedValue == list[i][keyStr]) && ' selected="selected" ') +' value="'+ list[i][keyStr] +'">'+ list[i][nameStr] +'</option>';
        } else {
            console.error('参数错误');  // 开发测试兼容
        }
    }
    $(target).html(optionEle);
}

/**
 * 格式化series的数据显示格式。
 * @param params {Array || Object} : echarts的官方提供参数
 * @returns {*}
 */
function formatterFn (params) {
    if(params.value == 0){
        return ''
    } else {
        return params.value = params.value + '单';
    }
}

/**
 * 柱状图
 * @{author} Arley Joe 2017-8-3 15:04:48
 * @param target {string} 图表目标元素
 * @param data {json} 数据
 */
function bussinessbBarChart (target, data) {
    var barChart = echarts.init(document.getElementById(target));
    barChart.showLoading({
        text : '数据获取中……',
        maskColor: 'rgba(0, 0, 0, 0.8)',
        effect: '',
        color: '#ffffff',
        textColor: '#fff'
    });
    var option = {
        title : {
            text: '业务量统计(单)',
            x : 30,
            y : 30,
            textStyle: {
                fontSize: 14,
                fontWeight: 'normal',
                color: '#535e4a'          // 主标题文字颜色
            }
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {
                show : true,
                type : 'cross'
            }
            //formatter : "{b0} <br />{a0}  :  {c0}  (单)<br />{a1}  :  {c1}  (单)"
        },
        legend: {
            data:['新车','二手车'],
            x: 850,
            y : 40
        },
        color: [
            '#82d5fb', '#d4b6f4', '#fad69c', '#b7e2aa'
        ],
        grid: {
            zlevel: 1000,
            left: 80,
            right: 50,
            bottom: 80,
            top: 80
        },
        toolbox: {
            show : true,
            right: 30,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                // restore : {show: false},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        valueAxis : {
            splitLine: {           // 分隔线
                show: false
            }
        },
        categoryAxis : {
            splitLine: {           // 分隔线
                show: false
            }
        },
        xAxis : [
            {
                type : 'category',
                data : data.xaxisdata,
                splitLine: {           // 分隔线
                    show: false
                },
                boundaryGap: true
            }
        ],
        yAxis : [
            {
                type : 'value',
                splitLine: {           // 分隔线
                    show: false
                }
            }
        ],
        series : [
            {
                name:'新车',
                type:'bar',
                data: data.new_count,
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter : function (params) {
                            return params.value = formatterFn(params);
                        }
                    }
                }
            },
            {
                name:'二手车',
                type:'bar',
                data: data.old_count,
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter : function (params) {
                            return params.value = formatterFn(params);
                        }
                    }
                }
            }
        ]
    };
    barChart.setOption(option);
    barChart.hideLoading();
}

function cityBarChart (target, data) {
    var barChart = echarts.init(document.getElementById(target));
    barChart.showLoading({
        text : '数据获取中……',
        maskColor: 'rgba(0, 0, 0, 0.8)',
        effect: '',
        color: '#ffffff',
        textColor: '#fff'
    });
    var option = {
        title : {
            text: '城市统计(单)',
            x : 30,
            y : 30,
            textStyle: {
                fontSize: 14,
                fontWeight: 'normal',
                color: '#535e4a'          // 主标题文字颜色
            }
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {
                show : true,
                type : 'cross'
            }
        },
        legend: {
            data:['进件','通过','回款','归档'],
            x: 860,
            y : 40
        },
        color: [
            '#82d5fb', '#d4b6f4', '#fad69c', '#b7e2aa'
        ],
        dataZoom: {
            show: true,
            start : 0,
            end: 7 / data.xaxisdata.length * 100,
            bottom : 20,
            left: 80,
            right: 80,
        },
        grid: {
            zlevel: 1000,
            left: 80,
            right: 50,
            bottom: 80,
            top: 80
        },
        toolbox: {
            show : true,
            right: 30,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                // restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : data.xaxisdata,
                axisLabel:{
                    interval:0
                },
                splitLine: {           // 分隔线
                    show: false
                },
                boundaryGap: true
            }
        ],
        yAxis : [
            {
                type : 'value',
                splitLine: {           // 分隔线
                    show: false
                }
            }
        ],
        series : [
            {
                name: '进件',
                type:'bar',
                data: data.order_count,
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter : function (params) {
                            return params.value = formatterFn(params);
                        }
                    }
                }
            },
            {
                name: '通过',
                type:'bar',
                data: data.pass_count,
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter : function (params) {
                            return params.value = formatterFn(params);
                        }
                    }
                }
            },
            {
                name: '回款',
                type:'bar',
                data: data.return_count,
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter : function (params) {
                            return params.value = formatterFn(params);
                        }
                    }
                }
            },
            {
                name: '归档',
                type:'bar',
                data: data.pigeonhole_count,
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter : function (params) {
                            return params.value = formatterFn(params);
                        }
                    }
                }
            }
        ]
    };
    barChart.setOption(option);
    barChart.hideLoading();
}


/**
 * 机构统计数据折线图
 * @param target
 * @param data
 */
function orgLineChart (target, data) {
    var lineChart = echarts.init(document.getElementById(target));
    lineChart.showLoading({
        text : '数据获取中……',
        maskColor: 'rgba(0, 0, 0, 0.8)',
        effect: '',
        color: '#ffffff',
        textColor: '#fff'
    });
    var option = {
        title : {
            text: '产品统计(单)',
            x : 30,
            y : 0,
            textStyle: {
                fontSize: 14,
                fontWeight: 'normal',
                color: '#535e4a'          // 主标题文字颜色
            }
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {
                show : true,
                type : 'cross'
            }
        },
        /*legend: {
            data:['新车','二手车']
        },*/
        dataZoom: {
            show: true,
            start : 0,
            end: 100,
            bottom : 30,
            left: 100,
            right: 100
        },
        grid: {
            zlevel: 1000,
            left: 80,
            right: 50,
            bottom: 150,
            top: 40
        },
        color: ['#82d5fb'],
        toolbox: {
            show : true,
            right: 30,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                // restore : {show: false},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                splitNumber:1,
                boundaryGap : false,
                data : data.xaxisdata,
                axisLabel:{
                    interval:0,
                    rotate:-70
                },
                splitLine: {           // 分隔线
                    show: false
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                splitLine: {           // 分隔线
                    show: false
                }
            }
        ],
        series : [
            {
                name:data.legend,
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: data.data,
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter : function (params) {
                            return params.value = formatterFn(params);
                        }
                    }
                }
            }
        ]
    };

    lineChart.setOption(option);
    lineChart.hideLoading();
}

/**
 * 进件统计折线图
 * @param target
 * @param data
 */
function personIncomingLineChart (target, data) {
    var lineChart = echarts.init(document.getElementById(target));
    lineChart.showLoading({
        text : '数据获取中……',
        maskColor: 'rgba(0, 0, 0, 0.8)',
        effect: '',
        color: '#ffffff',
        textColor: '#fff'
    });
    var option = {
        title : {
            text: '进件统计(单)',
            x : 10,
            y : 0,
            textStyle: {
                fontSize: 14,
                fontWeight: 'normal',
                color: '#535e4a'          // 主标题文字颜色
            }
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {
                show : true,
                type : 'cross'
            }
        },
        legend: {
            data:[data.startDate,data.endDate],
            /*x: 860,
            y : 40*/
        },
        grid: {
            zlevel: 1000,
            left: 60,
            right: 50,
            bottom: 40,
            top: 40
        },
        color: [
            '#1ec7ca', '#b6a1e0'
        ],
        toolbox: {
            show : true,
            right: 30,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                // restore : {show: false},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : data.xaxisdata,
                axisLabel:{
                    interval:0
                    // rotate:-70
                },
                splitLine: {           // 分隔线
                    show: false
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                splitLine: {           // 分隔线
                    show: false
                }
            }
        ],
        series : [
            {
                name:data.startDate,
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: data.list1,
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter : function (params) {
                            return params.value = formatterFn(params);
                        }
                    }
                }
            },
            {
                name:data.endDate,
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: data.list2,
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter : function (params) {
                            return params.value = formatterFn(params);
                        }
                    }
                }
            }
        ]
    };

    lineChart.setOption(option);
    lineChart.hideLoading();
}


/**
 * 合同统计饼图
 * @param target
 * @param data
 */
function personCompactPieChart (target, data) {
    var pieChart = echarts.init(document.getElementById(target));
    pieChart.showLoading({
        text : '数据获取中……',
        maskColor: 'rgba(0, 0, 0, 0.8)',
        effect: '',
        color: '#ffffff',
        textColor: '#fff'
    });
    var option = {
        title : {
            text: '合同统计(单)',
            x: 10,
            y : 0,
            textStyle: {
                fontSize: 14,
                fontWeight: 'normal',
                color: '#535e4a'          // 主标题文字颜色
            }
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} ({d}%)"
        },
        /*legend: {
            x : 'right',
            y : 'top',
            data:data.xaxisdata
        },*/
        toolbox: {
            show : true,
            right: 20,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {
                    show: true,
                    type: ['pie', 'funnel']
                },
                // restore : {show: false},
                saveAsImage : {show: true}
            }
        },
        color : [
            '#1ec7ca', '#b6a1e0'
        ],
        calculable : true,
        series : [
            {
                name:'合同统计',
                type:'pie',
                radius : [30, 80],
                center : ['50%', '50%'],
                roseType : 'radius',
                data : [
                    data.count2,
                    data.count1
                ]
            }
        ]
    };

    pieChart.setOption(option);
    pieChart.hideLoading();
}

/**
 * 请款统计饼图
 * @param target
 * @param data
 */
function personRequestpayoutPieChart (target, data) {
    var pieChart = echarts.init(document.getElementById(target));
    pieChart.showLoading({
        text : '数据获取中……',
        maskColor: 'rgba(0, 0, 0, 0.8)',
        effect: '',
        color: '#ffffff',
        textColor: '#fff'
    });
    var option = {
        title : {
            text: '请款统计(单)',
            x: 10,
            y : 0,
            textStyle: {
                fontSize: 14,
                fontWeight: 'normal',
                color: '#535e4a'          // 主标题文字颜色
            }
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} ({d}%)"
        },
        /*legend: {
            x : 'right',
            y : 'top',
            data:data.xaxisdata
        },*/
        toolbox: {
            show : true,
            right: 20,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {
                    show: true,
                    type: ['pie', 'funnel']
                },
                // restore : {show: false},
                saveAsImage : {show: true}
            }
        },
        color : [
                '#1ec7ca', '#b6a1e0'
        ],
        calculable : true,
        series : [
            {
                name:'请款统计',
                type:'pie',
                radius : [30, 80],
                center : ['50%', '50%'],
                roseType : 'radius',
                data : [
                        data.count2,
                        data.count1
                ]
            }
        ]
    };

    pieChart.setOption(option);
    pieChart.hideLoading();
}

/**
 * 归档统计饼图
 * @param target
 * @param data
 */
function personPigeonholePieChart (target, data) {
    var pieChart = echarts.init(document.getElementById(target));
    pieChart.showLoading({
        text : '数据获取中……',
        maskColor: 'rgba(0, 0, 0, 0.8)',
        effect: '',
        color: '#ffffff',
        textColor: '#fff'
    });
    var option = {
        title : {
            text: '归档统计(单)',
            x: 10,
            y : 0,
            textStyle: {
                fontSize: 14,
                fontWeight: 'normal',
                color: '#535e4a'          // 主标题文字颜色
            }
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} ({d}%)"
        },
        /*legend: {
            x : 'right',
            y : 'top',
            data:data.xaxisdata
        },*/
        toolbox: {
            show : true,
            right: 20,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {
                    show: true,
                    type: ['pie', 'funnel']
                },
                // restore : {show: false},
                saveAsImage : {show: true}
            }
        },
        color : [
            '#1ec7ca', '#b6a1e0'
        ],
        calculable : true,
        series : [
            {
                name:'归档统计',
                type:'pie',
                radius : [30, 80],
                center : ['50%', '50%'],
                roseType : 'radius',
                data : [
                    data.count2,
                    data.count1
                ]
            }
        ]
    };

    pieChart.setOption(option);
    pieChart.hideLoading();
}