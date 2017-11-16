<!--照片不合格-->
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="per" uri="com/mvc/web/common/tag/permissionTag"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>通知审核结果</title>
    {{include ("./../inc/metaData")}}
    <link rel="stylesheet" href="/static/css/employee/listCon.css"/>
    <link rel="stylesheet" href="/static/css/employee/invite.css"/>
    <link rel="stylesheet" href="/static/css/question/edit.css">
    <link rel="stylesheet" href="/static/css/requestpayout/disagree.css">
    <link rel="stylesheet" href="/static/css/finance/review_result.css">
    <link rel="stylesheet" href="/static/css/finance/imgUnpass.css">
    <script src="/static/js/finance/img_unpass.js"></script>
    <script src="/static/js/finance/get_file.js"></script>
    <script src="/static/js/finance/result.js"></script>
</head>
<style>
    body{
        overflow-x: hidden;
    }
</style>
<body>

<!--header start-->
{{include ('./../inc/header')}}
<!--header end-->

<!--container start-->

<div class="container minWidth">
    <div class="row section">
        <!--navLeft start-->
        {{include ('./../inc/sideNav')}}
        <!--navLeft end-->
        <form action="/finance/getFile" id="getFile" method="post">
			<input id="finance_id_file" value="" name="finance_id" type="hidden">
			<input id="active" value="" name="active" type="hidden">
			<input id="url" value="" name="url" type="hidden">
			<input id="navigation" value="" name="navigation" type="hidden">
		</form>
        <!--listCon start-->
        <div class=" listCon relative">
            <div class="listConHeader inviteCon" style="margin-bottom: 0;">
                <ul>
                    <li class="inline colorB"><a class="TS" href="/finance/system">贷款管理</a></li>
                    <li class="inline before"><a class="TS"  href="/finance/getReviewList" lang="${finance_id}">已录入</a></li>
                    <li class="inline before"><a class="TS"  href="javascript:;" id="goDetail" data-id="${finance_id}" data-url="${contextPath }/finance/getFile" lang="${finance_id}">${vo.user_name}</a></li>
                    <li class="inline before"><a href="javascript:;" style="cursor:default">通知审核结果</a></li>
                </ul>
            </div>

            <form class="formML" id="review_info" enctype="multipart/form-data" method="post">
                <input type="hidden" id="finance_id" name="finance_id" value="${finance_id }">
                <input type="hidden" id="request_status" name="request_status" value="${vo.request_status}">
                <input type="hidden" id="reason" name="reason" value="">
                <input type="hidden" id="question_ids" name="question_ids" value="">
                <div class="form-item" style="height:30px;">
                    <label>
                        <span class="need">*</span>是否通过：</label>
                    <div>
                        <select name="" id="select_status">
                            <option value="0">通过</option>
                            <option value="1">未通过</option>
                        </select>
                    </div>
                </div>
                <div class="form-item unPass" style="height:30px;">
                    <label>
                        <span class="need">*</span>问题分类：</label>
                    <div>
                        <select name="parent_id" id="question_classify_name">
                            <c:forEach items="${list }" var="bean">
                                <option value="${bean.id }">${bean.value}</option>
                            </c:forEach>
                        </select>
                    </div>
                </div>
                <div class="form-item unPass">
                    <label>
                        <span class="need">*</span>问题详情：</label>
                    <div class="question_container">
                    	<c:if test="${empty child_list }">
	                    	<div class="question_container_prom">该分类暂无问题详情，请重新选择问题分类</div>
	                    </c:if>
                        <c:forEach items="${child_list }" var="bean">
                            <div class="question-con-box">
                                <div class="check">
                                    <div class="check_img icon_uncheck" data_id="${bean.id }"></div>
                                    <span>${bean.value}</span>
                                </div>
                                <%--<p class="question-con">${bean.content}</p>--%>
                                <input type="hidden" class="question-val" value="${bean.content}">
                            </div>
                        </c:forEach>
                    </div>
                    <div class="error_prom"></div>
                    <div class="form-item" style="padding-top:20px;">
                        <label style="text-align: right;padding-right:20px;">备注：</label>
                        <textarea name="remark" id="remark" style="border:1px solid #e4e4e4;resize: none;margin-left:0;" placeholder="请输入内容(200字以内)" maxlength="200"></textarea>
                    </div>
                </div>
                <div class="form-item pass" style="height:60px;">
                    <label>
                        <span class="need">*</span>情况说明：</label>
                    <div>
                        <div class="pass_radio">
                            <input type="radio" value="1" name="type">
                            贷款金额有变化，变为
                            <input type="text" name="real_loan_amount" class="real_loan_amount" readonly="readonly" maxlength="8" onkeypress="IsNum(event,real_loan_amount);">
                            万元。
                        </div>
                        <div class="pass_radio">
                            <input type="radio" value="2" name="type" checked="checked">
                            金额无变化。
                        </div>
                    </div>
                    <div class="loan_amount error_prom" style="margin-left: 80px;"></div>
                </div>
                <div class="form-item" style="height:20px;">
                    <div class="img_item updata_img">
                        <div class="file_btn">上传图片</div>
                        <input type="file" id="file_select1" class="cursor file_input" name="file" onchange="select_allow(this);" accept="image/jpeg,image/jpg,image/png"/>
                        <span class="file_prom">(最多5张图片，每张大小不超过5M)</span>
                    </div>
                </div>
                <div class="form-item" style="margin-top:0;">
                    <div class="file_box">


                    </div>
                </div>
                <div class="error_prom error_msg" style="margin-left: 80px;"></div>
                <per:button code="1034">
                    <div class="form-item">
                        <div class="create_btn">
                            <input type="button" class="create_sub" id="review_sub" value="确认"/>
                            <a href="javascript:" class="go_detail" data-id="${finance_id}" data-url="/finance/getFile">
                                <input type="button" class="cancel_btn" value="取消">
                            </a>
                        </div>
                    </div>
                </per:button>
            </form>
        </div>

        <!--listCon end-->

    </div>


</div>

<!--container end-->


</body>
<script>
    $(function(){
        $('body').off('click').on('click','.check_img',function(e){
            var e = e || window.event;
            e.preventDefault();
            e.stopPropagation();
            var class_name = $(this).attr('class');
            if(class_name.indexOf('icon_uncheck') >= 0){
                $(this).removeClass('icon_uncheck').addClass('icon_check');
            }else{
                $(this).removeClass('icon_check').addClass('icon_uncheck');
            }

        });

        //提交数据
        $('#review_sub').click(function(){
            var url;
            $('#review_sub').attr('disabled',true);
            var status = $('#select_status').val();
            if(status == '0'){
                var check1 = $('input[type="radio"]').eq(0).prop('checked');
                var check2 = $('input[type="radio"]').eq(1).prop('checked');
                if(!check1 && !check2){
                    $('.loan_amount').html('请选择情况说明');
                    $('#review_sub').attr('disabled',false);
                    return;
                }
                if(check1){
                    var money = $('.real_loan_amount').val();
                    if(!money){
                        $('.loan_amount').html('请输入金额');
                        $('#review_sub').attr('disabled',false);
                        return;
                    } else if (money > 1000) {
                        $('.loan_amount').html('输入金额不能超过1000万元');
                        $('#review_sub').attr('disabled',false);
                        return;
                    }
                }
                url = contextPath+"/api/finance/pass";
            }else{
                var reason_arr = [];
                var ids_arr = [];
                var icon_check = $('.icon_check');
                for(var i = 0, len = icon_check.length; i < len; i++){
                    var inner = icon_check.eq(i).next().html();
                    var ids = icon_check.eq(i).attr('data_id');
                    reason_arr.push(inner);
                    ids_arr.push(ids);
                }
                if(reason_arr.length == 0){
                    $('.error_msg').show().html('(请先选择问题详情)');
                    $('#review_sub').attr('disabled',false);
                    return;
                }
                $('#reason').val(reason_arr.join(','));
                $('#question_ids').val(ids_arr.join(','));
                url = contextPath+"/api/finance/unpass";
            }
            $('.error_msg').html('');
            var vFD = new FormData(document.getElementById('review_info'));
            var oXHR = new XMLHttpRequest();
            oXHR.addEventListener('load', function(e) {
                var response = e.target.responseText;
                var data = JSON.parse(response);
                //成功
                if (data.error_code == '0') {
                    window.location.href = contextPath + '/finance/getReviewList'
                } else {
                    alert(data.error_msg);
                }

            }, false);
            oXHR.addEventListener('error', function(e) {
                alert("输入参数异常");
                return;
            }, false);
            oXHR.addEventListener('abort', function() {}, false);
            oXHR.open('POST', url);
            oXHR.send(vFD);
            $('#review_sub').attr('disabled',false);
        });
        // 上传图片按钮
        $('.updata_img_mask').hover(function() {
            var count = $(".file_item").length;  //已上传的图片的个数
            if(count != 5) {
                $(this).css("cursor","pointer");
                $('.file_btn').css('color', '#1DC6BC');
                $('.file_btn').css('background', 'url(/static/img/question/upload_icon_hover.png) left center no-repeat');
            } else {
                $(this).css("cursor","default");
            }
        }, function() {
            $('.file_btn').css('color', '#535E6A');
            $('.file_btn').css('background', 'url(/static/img/question/upload_icon.png) left center no-repeat');
        });


        pageJump("#goDetail, .go_detail");

    })

</script>

</html>