<!--通知待处理-->
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>我的通知</title>
    {{include('./../inc/metaData')}}
    <!--<link rel="stylesheet" href="{{markUri}}/static/css/employee/listCon.css"/>-->
    <link rel="stylesheet" href="{{markUri}}/static/css/employee/invite.css"/>
    <link rel="stylesheet" href="{{markUri}}/static/css/employee/listCon.css"/>
    <link rel="stylesheet" href="{{markUri}}/static/css/finance/allot_emp_list.css"/>
    <link rel="stylesheet" href="{{markUri}}/static/css/message/message.css"/>
    <script src="{{markUri}}/static/js/employee/invite.js"></script>
    <script src="{{markUri}}/static/js/message/message.js"></script>
	<script>
		if(window.name != "bencalie"){
			location.reload();
			window.name = "bencalie";
		}
		else{
			window.name = "";
		}
	</script>
</head>
<body>

<!--header start-->
{{include('./../inc/header')}}
<!--header end-->

<!--container start-->

<div class="container minWidth">
    <div class="row section">
        <!--navLeft start-->
        {{include('./../inc/message_left_nav')}}
        <!--navLeft end-->


        <!--inviteCon start-->

        <div class=" listCon relative" style="padding-bottom:200px;">
            <div class="inviteCon messageCon" style="margin-bottom:0;">
                <ul style="position:relative;">
                    <li class="count_message inline"><a href="javascript:;" style="color:#333;">
                        全部
                    </a></li>
                    <li class="count_message inline messageRight"><a href="javascript:;" style="color:#333;">
                        共
                        <span>${count}</span>
                        个通知
                    </a></li>
                </ul>
            </div>
            <!--form start-->
            	<c:choose>
            		<c:when test="${count >0}">
            		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 message">
			            <form action="/message/getList" method="post" id="form_search" role='form'>
			            </form>
						<!--点击跳转详情页-->
						<form action="" method="get" id="message_to_detail">
							<input type="hidden" name="finance_id" id="finance_id" value="">
						</form>
		            	<c:forEach items="${list}" var="bean">
							<a href="javascript:;" lang="${bean.msg_id}" status="${bean.status}" financeId="${bean.finance_id}" class="callback_msg" alt="${bean.next_step}">
				                <div class="messageTr message_clean_bottom">
				                <c:if test="${bean.status eq 0}">
		                            <div class="ready"></div>
				                </c:if>
				                    <div class="messageImg">
				                        <c:choose>
				            				<c:when test="${empty bean.image_url}">
						                        <img src="{{markUri}}/static/img/employee/perIcon.png" alt="">
				            				</c:when>
				            				<c:otherwise>
						                        <img src="${bean.image_url}" alt="">
				            				</c:otherwise>
				            			</c:choose>
				                    </div>
				                    <div class="messageText">
				                        <p class="messageEmp">${bean.title}</p>
				                        <p class="messageCon1">${bean.description}</p>
				                        <c:if test="${bean.product_remark != null && bean.product_remark != ''}">
											<p class="messageCon2">${bean.product_remark}</p>
				                        </c:if>
				                    </div>
				                    <div class="messageTime">
				                        <span>${bean.create_time}</span>
				                    </div>

				                </div>
							</a>
						</c:forEach>
				      </div>
            		</c:when>
            		<c:otherwise>
            			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no_message">
			                <div>目前没有通知</div>
			            </div>
            		</c:otherwise>
            	</c:choose>
			<!--pages start-->
			{{include('./../inc/paginition')}}
			<!--pages end-->
        </div>



    </div>
</div>
</body>
</html>