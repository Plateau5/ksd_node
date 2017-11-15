<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="per" uri="com/mvc/web/common/tag/permissionTag"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%
	String contextPath = request.getContextPath();
	request.setAttribute("contextPath", contextPath);
%>
<script type="text/javascript">
	var contextPath = '${contextPath}';
</script>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<link rel="shortcut icon" type="image/x-icon" href="${contextPath}/static/icon/favicon.ico"/>
	<link rel="icon" type="image/x-icon" href="${contextPath}/static/icon/favicon.ico" />
	<title>打印详情</title>
	<style>
		*{padding:0;margin:0;list-style:none;font-family:"宋体"}@media screen and (min-width: 1366px){.detail_content{width:60%;height:auto;margin:auto;padding-bottom:100px;font-size:14px}}@media screen and (max-width: 1366px){.detail_content{width:90%;height:auto;margin:auto;padding-bottom:100px;font-size:14px}}@media print{.detail_content{width:100%;height:auto;margin:auto;font-size:14px}}.content_box{width:100%;margin:0 auto;border-collapse:collapse}table{table-layout:fixed}table td{word-break:break-word}table.content_box tr td{padding:0 6px;border:2px solid #666}table tr{height:30px;line-height:30px}.title{width:100%;height:60px;line-height:60px;font-size:24px;font-weight:bolder;text-align:center;font-family:"microsoft yahei"}.title_info{width:100%;height:28px;line-height:28px;margin:0 auto 5px}.title_info > div{display:inline-block;height:inherit}.title_info .apply_time{margin-left:30px}table.content_box > tbody > tr > td:first-child{width:12%}.content_box .card_num{width:5%}.approval_box{height:auto}.content_box tr td.approval_flow{padding:0}.flow_lists{width:100%;border-collapse:collapse;font-size:12px}.flow_lists tbody tr{line-height:22px}table.flow_lists tbody tr td{border:0;border-bottom:2px solid #666}table.flow_lists tbody tr:last-child td{border:0}
	</style>
</head>
<body>
<div class="wrapper" id="wrapper">
	<div class="detail_content">
		<div class="title">
			<span class="title_name">${vo.city_name}${vo.car_type_value}</span><span>请款审批</span>
		</div>
		<div class="title_info">
			<div class="company">${company_name}</div>
			<div class="apply_time">
				<span>申请日期：</span>
				<span class="time">${vo.create_time}</span>
			</div>
		</div>
		<table class="content_box">
			<tbody>
			<tr>
				<td>订单编号</td>
				<td colspan="8">${vo.order_no}</td>
			</tr>
			<tr>
				<td>申请人</td>
				<td colspan="3">${vo.create_name}</td>
				<td>上牌抵押城市</td>
				<td colspan="4">${vo.pledge_city}</td>
			</tr>
			<tr>
				<td>申请人部门</td>
				<td colspan="3">${vo.dpartment_name}</td>
				<td>上牌方</td>
				<td colspan="4">${vo.regist_type_value}</td>
				<%-- <c:if test="${vo.car_type eq 0 }">
				</c:if>
				<c:if test="${vo.car_type eq 1 }">
					<td>保险是否完成</td>
					<td colspan="3"><c:if test="${vo.insurance_isfinish eq 1 }">是</c:if><c:if test="${vo.insurance_isfinish eq 0 }">否</c:if></td>
				</c:if> --%>
			</tr>
			<tr>
				<td>客户姓名</td>
				<td colspan="3">${vo.user_name}</td>
				<td>抵押方</td>
				<td colspan="4">${vo.pledge_type_value}</td>
				<%-- <c:if test="${vo.car_type eq 0 }">
				</c:if>
				<c:if test="${vo.car_type eq 1 }">
					<td>上牌是否完成</td>
					<td colspan="3"><c:if test="${vo.regist_isfinish eq 1 }">是</c:if><c:if test="${vo.regist_isfinish eq 0 }">否</c:if></td>
				</c:if> --%>
			</tr>
			<tr>
				<td>放款类型</td>
				<td colspan="3">${vo.risk_type_value }</td>
				<td>车辆款型</td>
				<td colspan="4">${vo.brand_name }${vo.series_name }</td>
			</tr>
			<tr>
				<td>车架号</td>
				<td colspan="8">${vo.vin }</td>
			</tr>

			<tr>
				<td>金融产品</td>
				<td colspan="8">${vo.product_name}</td>
			</tr>
			<!--付款明细1 begin-->
			<tr>
				<td rowspan="2">商户付款明细</td>
				<td>车价贷款(元)</td>
				<td>服务费返点(元)</td>
				<td >GPS安装费(元)</td>
				<td>保险(元)</td>
				<td>购置税(元)<%-- <c:if test="${vo.car_type eq 0 }"></c:if><c:if test="${vo.car_type eq 1 }">服务费返点(元)</c:if> --%></td>
				<td>融资返点(元)</td>
				<td>保险返点(元)<%-- <c:if test="${vo.car_type eq 0 }">征信查询费(元)</c:if><c:if test="${vo.car_type eq 1 }">保险费返点(元)</c:if> --%></td>
				<td>GPS返点</td>
			</tr>
			<tr>
				<td>${vo.car_loan_charge}</td>
				<td>${vo.service_charge }</td>
				<td>${vo.gps_charge }</td>
				<td>${vo.insurance }</td>
				<td>${vo.purchase_tax }<%-- <c:if test="${vo.car_type eq 0 }">${vo.purchase_tax }</c:if><c:if test="${vo.car_type eq 1 }">${vo.service_charge_rebate } </c:if>--%></td>
				<%-- 重新补数据 --%>
				<td>${vo.financed_charge_rebate}</td>
				<td>${vo.insurance_rebate}<%-- <c:if test="${vo.car_type eq 0 }">${vo.credit_charge }</c:if><c:if test="${vo.car_type eq 1 }">${vo.insurance_rebate }</c:if> --%></td>
				<td>${vo.gps_rebate}</td>
			</tr>
			<!--付款明细1 end-->
			<!--付款信息 begin-->
			<tr>
				<td rowspan="3">商户收款信息</td>
				<td>付款总额(元)</td>
				<td>付款户名</td>
				<td>付款开户行</td>
				<td  colspan="2">付款账号</td>
				<td colspan="2">商户名称</td>
				<td>商户是否备案</td>
			</tr>
			<tr>
				<td>${vo.total_charge }</td>
				<td>${vo.pay_name }</td>
				<td>${vo.pay_open_bank }</td>
				<td class="card_num"  colspan="2">${vo.pay_account }</td>
				<td colspan="2">${vo.supplier_name }</td>
				<td><c:if test="${vo.record_count>0 }">是</c:if><c:if test="${vo.record_count eq 0 }">否</c:if></td>
			</tr>
			<tr>
				<td colspan="8">总付款总额(元)：${vo.total_charge }(${total_charge_cn})</td>
			</tr>
			<!--付款信息 end-->
			<tr>
				<td>备注说明</td>
				<td colspan="8">${vo.request_payout_remark }</td>
			</tr>
			<!--审批流程 begin-->
			<tr class="approval_box">
				<td rowspan="1000">审批人</td>
				<td colspan="8" class="approval_flow">
					<table class="flow_lists">
						<tbody>
						<c:forEach items="${list }" var="bean">
							<tr>
								<td colspan="8">${bean.modify_name } ${bean.status_value} <c:if test="${not empty bean.remark }">添加评论 (${bean.remark})</c:if> ${bean.modify_time}</td>
							</tr>
						</c:forEach>
						</tbody>
					</table>
				</td>
			</tr>
			<!--审批流程 begin-->
			</tbody>
		</table>
		<div class="title_info">
			<div class="company"><span>打印日期：</span><span>${date}</span></div>
			<div class="apply_time">
				<span>打印人：</span>
				<span class="time">${user_name}</span>
			</div>
		</div>
	</div>
</div>
</body>
<script type="text/javascript">
	(function () {
		/**
		*	获取查询字符串的参数值（value）
		* @param name  		参数名   string
		* @param queryArr	查询数组 array
		* @returns {null}
		*/
		function getQuerystringParam (name, queryArr) {
			var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
			var r = queryArr || window.location.search.substr(1).match(reg);
			if (r != null) {
				return unescape(r[2]);
			}
			return null;
		}

		var printType = getQuerystringParam("print_type");
		window.onload = function () {
			window.print();
			if (printType == 'current') {
				var href = contextPath + "/financial/getWaitList";
				setTimeout(function () {
					window.location.href = href;
				}, 0);
			} else {
				setTimeout("window.close();", 0);
			}
		}
	})(window,undefined)

</script>
</html>
