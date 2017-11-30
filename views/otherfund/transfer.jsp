<%@ page import="java.lang.reflect.Field"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="per" uri="com/mvc/web/common/tag/permissionTag"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>




<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    {{include ("./../inc/cssSources")}}
    <link rel="stylesheet" href="/static/css/transfer.css">
    <title>转交他人</title>
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
            <input type="hidden" id="advance_id" value="{{vo.advance_id}}">
            <input type="hidden" id="finance_id" name="finance_id" value="{{finance_id}}">
            <input type="hidden" id="emp_id" value="">
            <div class="crumbs_nav">
                <a href="/otherfund/system" class="crumbs_item">其他款项</a>
                <a href="/otherfund/pending/list" class="crumbs_item">待审批</a>
                <a href="javascript:window.history.back();" data-url="/otherfund/getFile" data-id="{{finance_id}}" class="crumbs_item">{{vo.user_name}}</a>
                <a href="javascript:;" class="crumbs_item">转交他人</a>
            </div>

            <div class="dialog_box">
                <div class="add_principal_dialog">
                    <div class="content">
                        <ul class="principal_list">
                            <c:forEach items="${role_list }" var="bean">
                                <li class="list_item character_item" lang="${bean.id}">${bean.name}</li>
                            </c:forEach>
                        </ul>
                        <ul class="employee_list">
                            <c:forEach items="${emp_list }" var="bean">
                                <li class="list_item employee_item" lang="${bean.role_id }" style="display:none;">
                                    <c:choose>
                                        <c:when test="${empty bean.image_url}">
                                            <img src="/static/img/employee/perIcon.png" alt="">
                                        </c:when>
                                        <c:otherwise>
                                            <img src="${bean.image_url}" alt="">
                                        </c:otherwise>
                                    </c:choose>
                                    <span class="employee_name" lang="${bean.id}">${bean.name }</span>
                                </li>
                            </c:forEach>
                        </ul>
                    </div>
                    <div class="transfer-remark">
                        <textarea id="transfer-remark" name="" value="" placeholder="请输入转交原因（必填）" maxlength="200"></textarea>
                    </div>
                    <div class="error"></div>
                    <per:button code="1340">
                        <div class="btn_box">
                            <a href="javascript:" class="btn orange_btn confirm dialog_confirm" data-advance_id="{{vo.advance_id}}" data-id="{{finance_id}}" id="dialog_confirm">确定</a>
                            <a href="javascript:window.history.back();" data-url="/financial/getFile" data-id="{{finance_id}}" class="btn bg_btn cancel">取消</a>
                        </div>
                    </per:button>
                </div>
            </div>

        </div>






        <!---- Part of Main info End ---->
    </div>
    <!-------- Part of main End -------->

    <!-------- Part of footer Begin -------->
    <!--<div id="footer" class="footer"></div>-->
    <!-------- Part of footer End -------->
</div>
</body>
{{include ('./../inc/jsSources')}}

<script>
    $(function(){
        //页面初始化
        $('.principal_list .list_item').eq(0).addClass('active');

        var langFirst = $('.principal_list .list_item').eq(0).attr('lang');
        $('.employee_list .list_item[lang="' + langFirst + '"]').css('display','block');
        clearBorder(langFirst);

        //角色选择
        $('.principal_list .list_item').each(function(index){
            $('.principal_list .list_item').eq(index).click(function(){
                var lang_val = $(this).attr('lang');
                $(this).addClass('active').siblings('.list_item').removeClass('active');
                $('.employee_list .list_item').each(function(index){
                    $('.employee_list .list_item').eq(index).css('display','none');
                });
                $('.employee_list .list_item[lang="' + lang_val + '"]').css('display','block');
                clearBorder(lang_val);
            })
        });

        //人员选择
        $('.employee_list .list_item').each(function(index){
            $('.employee_list .list_item').eq(index).click(function(){
                var emp_id = $(this).find('.employee_name').attr('lang');
                $('#emp_id').val(emp_id);
                $(this).addClass('active').siblings('.employee_item').removeClass('active');
                var id = $('#emp_id').val();
                if(!id){
                    $('.error').text('请选择要转交的人员');
                    $('.error').css('display','block');
                    $('#dialog_confirm').attr('disabled','false');
                    return;
                }
                $('.error').text('');
                $('.error').css('display','none');

            });
        });

        //转交原因校验
        $('#transfer-remark').blur(function(){
            var remark = $('#transfer-remark').val();
            if(!remark){
                $('.error').text('请填写转交原因');
                $('.error').css('display','block');
                $('#dialog_confirm').attr('disabled','false');
                return;
            }
            $('.error').text('');
            $('.error').css('display','none');
        });

        //转交确定
        $('#dialog_confirm').click(function(){
            var _this = $(this);
            $('#dialog_confirm').attr('disabled','true');
            var id = $('#emp_id').val();
            if(!id){
                $('.error').text('请选择要转交的人员');
                $('.error').css('display','block');
                $('#dialog_confirm').attr('disabled','false');
                return;
            }
            var remark = $('#transfer-remark').val();
            if(!remark){
                $('.error').text('请填写转交原因');
                $('.error').css('display','block');
                $('#dialog_confirm').attr('disabled','false');
                return;
            }
            $('.error').text('');
            $('.error').css('display','none');
            var finance_id = $.trim($('#finance_id').val());
            var advanceId = $.trim(_this.data('advance_id'));
            $.ajax({
                type:"post",
                url :contextPath + "/api/requestPayout/turnover",
                dataType:"json",
                data:{
                    finance_id: finance_id,
                    advance_id : advanceId,
                    emp_id: id,
                    remark: remark
                },
                async:false,
                error:function(xhr,status,err){
                    alert("系统异常");
                },
                success:function(data){
                    if(data.error_code =='0'){
                        window.location.href = contextPath + "/otherfund/pending/list";
                    }else{
                        $('.error').text(data.error_msg);
                        $('.error').css('display','block');
                    }
                    $('#dialog_confirm').attr('disabled','false');
                }
            });

        });

        //去除边线
        function clearBorder(lang){
            var emp_length = $('.employee_list .list_item[lang="' + lang + '"]').length;
            if(emp_length > 5){
                var border_bottom = parseFloat(emp_length % 5);
                if(border_bottom > 0){
                    for(var i = 0; i < border_bottom; i++){
                        $('.employee_list .list_item[lang="' + lang + '"]').eq(emp_length - i - 1).css('border-bottom','none');
                    }
                }
            }else{
                $('.employee_list .list_item[lang="' + lang + '"]').css('border-bottom','none');
            }

        }

        pageJump(".go_forward",{
            url : "/financial/getWaitList",
            active : "wait"
        });

    });

</script>

</html>