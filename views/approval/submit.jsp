<!-- 通知回款结果 -->
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="per" uri="com/mvc/web/common/tag/permissionTag"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    {{include ("./../inc/cssSources")}}
    <link rel="stylesheet" href="${contentPath}/static/dialog/dialog-layer.css">
    <link rel="stylesheet" href="${contentPath}/static/css/manufacturing.css">
    <title>客户-同意</title>
</head>
<body>
<div id="wrapper" class="wrapper">
    <!-------- Part of header Begin -------->
    {{include ('./../inc/header')}}
    <!-------- Part of header End -------->

    <!-------- Part of main Begin -------->
    <div id="section" class="section normal_width">
        <!---- Part of slide nav Begin ---->
        {{include ('./../inc/sideNav')}}
        <!---- Part of slide na End ---->

        <!---- Part of Main info Begin ---->
        <div id="main" class="main">
            <div class="crumbs_nav">
                <a href="/operation/system" class="crumbs_item">审批管理</a>
                <a href="/operation/getWaitList" class="crumbs_item">待审批</a>
                <a href="javascript:window.history.back();" class="crumbs_item">{{vo.user_name}}</a>
                <a href="javascript:;" class="crumbs_item">确认提交</a>
            </div>
            <div class="cashed_mark">
                <form action="" method="post" id="returnResult">
                    <input type="hidden" name="finance_id" value="{{finance_id}}">
                    <input type="hidden"  name="advance_id" value="{{vo.advance_id}}" />
                    <div class="form_row">
                        <div class="column_l" style="width: 10%;"><span class="asterisk">*</span>确认风险类型：</div>
                        <div class="column_r risk_type_box">
                            <input type="radio" name="risk_type" value="3" id="risk_type1"  /><label for="risk_type1" style="margin-right: 10px;">风险等级C（请款中）</label>
                            <input type="radio" name="risk_type" value="4" id="risk_type2" /><label for="risk_type2" style="margin-right: 10px;">风险等级D（请款已通过）</label>
                            <input type="radio" name="risk_type" value="5" id="risk_type3" /><label for="risk_type3">风险等级E（已回款）</label>
                        </div>
                    </div>
                    <div class="form_row amount_type" style="display: none;">
                        <div class="column_l" style="width: 10%;"><span class="asterisk">*</span>款项类型：</div>
                        <div class="column_r">
                            <select name="is_allReturn" id="is_allReturn">
                                <option value="-1">全部</option>
                                <option value="1">全部到我司</option>
                                <option value="0">部分到我司</option>
                            </select>
                        </div>
                    </div>
                    <div class="form_row amount_count"  style="display: none;">
                        <div class="column_l"  style="width: 10%;"><span class="asterisk">*</span>款项金额：</div>
                        <div class="column_r">
                            <input type="text" name='return_money' class="" id="cashed_check" value="" placeholder="如：10000" style="width: 60px; ime-mode: disabled;"  maxlength="12" />
                            <label>元</label>
                        </div>
                    </div>
                    <div class="form_row textarea_container">
                        <div class="column_l"  style="width: 10%;">备注：</div>
                        <div class="column_r">
                            <textarea name="remark" id="remark" placeholder="请输入备注信息"></textarea>
                        </div>
                    </div>
                    <div class="img_upload"  style="padding-left: 13%;">
                        <div class="img_upload_layer"><span class="text">上传图片</span><span class="text_tip">（最多5张图片，每张大小不超过5M）</span></div>
                        <input type="file" class="img_upload_btn" name="file" accept="image/jpeg,image/jpg,image/png" value="上传图片" style="display: none" />
                        <div class="img_box">
                            <!-- 上传图片缩略图 -->

                        </div>

                    </div>
                    <div class="error_msg risk_type_error" style="padding-left: 13%;height:auto;line-height: normal;">(请先确认风险类型)</div>
                </form>
                <div class="btn_box clearfix text_left"   style="padding-left: 13%;">
                    {{#if (verifyCode(1213)) }}
                        <a href="javascript:" class="btn orange_btn confirm submit_confirm">确认</a>
                        <a href="javascript:" class="btn bg_btn submit_cancel">取消</a>
                    {{/if}}
                </div>
            </div>

        </div>
        <!---- Part of Main info End ---->
    </div>
</div>
</body>
{{include ('./../inc/jsSources')}}
<script src="/static/dialog/dialog-layer.js"></script>
<script>
    (function ($) {
        //只允许输入数字或者输入两位小数
        function checkNum (ele) {
            ele.on("keyup input", function () {
                var reg = /^\d{0,7}(\.\d{0,2})?$/g;
                var _this = $(this);
                var val = _this.val();
                if (reg.test(val)) {
                    $(".error_msg").hide();
                    return true;
                } else {
                    val = Number(val);
                    if (!isNaN(val) && val != 0) {
                        val = (/\d+(\.\d{1,2})?/g.exec(val))[0];
                        _this.val(val);
                        $(".error_msg").hide().text("");
                    } else {
                        _this.val("");
                        $(".error_msg").show().text("只允许输入数字或两位小数");
                    }
                }
                if (val > 99999999) {
                    $(".error_msg").show().text("最大可输入数值为99999999.");
                } else {
                    $(".error_msg").hide().text("");
                }
            });
        }

        //监听风险类型选择：如果是选择E类型，则出现款项类型选择项
        function listenRiskType () {
            var ele = $(".risk_type_box").find("input[type='radio']");
            ele.on("click", function () {
                var val = $(this).val();
                if (val == 5) {
                    $(".amount_type").show();
                } else {
                    $(".amount_type, .amount_count").hide();
                    $(".amount_type").find("select[name='is_allReturn'] option:selected").attr('selected', false);
                    $(".amount_count").find("input[name='return_money']").val("");
                }
            });
        }
        //监听款项类型选择：如果是选择部分回款，则出现款项金额项
        function listenAmountType () {
            var ele  = $("#is_allReturn");
            ele.on("change", function () {
                var val = $(this).find("option:selected").val();
                if (val === "0") {
                    $(".amount_count").show();
                } else {
                    $(".error_msg").hide().text("");
                    $(".amount_count").hide();
                    $(".amount_count").find('input[name="return_money"]').val("");
                }
            });
        }


        //监听是否选择风险类型
        function valiChecked () {
            var ele = $(".risk_type_box");
            var checkedRiskType = ele.find("input[type='radio']:checked").val();
            if (checkedRiskType) {
                if (checkedRiskType == 5) {
                    //判断是否选择款项类型和款项金额
                    var returnType = $(".amount_type").find("select[name='is_allReturn']  option:selected").val();
                    var returnMoney = $(".amount_count").find("input[name='return_money']").val();
                    if (returnType === "1" || (returnType === "0" && returnMoney))  {
                        return true;
                    } else {
                        $(".risk_type_error").show().text("请先选择款项类型和款项金额。");
                        return false;
                    }
                } else {
                    return true;
                }
            } else {
                $(".risk_type_error").show().text("请先选择风险类型。");
                return false;
            }
        }
        //注册单选按钮的监听事件
        function bindRadio () {
            var ele  = $(".risk_type_box").find("label, input[type='radio']");
            ele.each(function () {
                var t = $(this);
                t.on("click", function () {
                    $(".risk_type_error").hide();
                });
            });
        }


        //绑定确定按钮的点击事件
        rebind(".submit_confirm", "click", returnSubmit);
        //确定按钮的点击事件逻辑
        function returnSubmit () {
            var isCheck = valiChecked();
            if (isCheck) {
                disabled(".submit_confirm", "click", returnSubmit);//禁用按钮
                var url = contextPath + "/api/operation/affirm/submit";
                var data = new FormData(document.getElementById("returnResult"));
                $.ajax({
                    type : "post",
                    url : url,
                    data : data,
                    async : true,
                    processData: false,
                    contentType: false,
                    success : function (req) {
                        var res = eval(req);
                        if (res.error_code == 0) {
                            window.location.href = contextPath + "/operation/getWaitList";
                        } else {
                            dialog("alert",{
                                closeBtn : false,
                                title : "提醒",
                                content : res.error_msg,
                                button : ['确定',''],
                                maskClose : false,
                                //css : 'font-size: 16px',
                                onConfirm : function () {
                                    window.location.href = contextPath + "/operation/getWaitList";
                                }
                            });
                        }
                    },
                    error : function () {
                        $alert("网络错误，请稍后重试");
                        rebind( ".submit_confirm", "click", returnSubmit);
                    }
                });
            } else {
                return;
            }
        }

        //取消按钮的点击逻辑
        bindEvents("click", ".submit_cancel", function () {
            window.history.back();
        });




        $(function() {
            imgUpload();
            bindRadio();
            listenRiskType();
            listenAmountType();
            checkNum($("#cashed_check"));
        });
    })(jQuery,undefined);
</script>
</html>