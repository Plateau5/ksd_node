<!--材料库-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    {{include ("./../inc/cssSources")}}
    <link rel="stylesheet" href="{{markUri}}/static/dialog/dialog-layer.css">
    <link rel="stylesheet" href="{{markUri}}/static/css/customerService.css">
    <title>快收单</title>
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
        <div id="main" class="main org_product">
            <div class="crumbs_nav">
                <a href="{{markUri}}/customerService/organization/list" class="crumbs_item">材料管理</a>
                <a href="javascript:;" class="crumbs_item">${vo.parent_name }-${vo.name }</a>
            </div>
            <div class="material_store">
                <div class="form_item material_list">
                    <div class="material_text lf">所需材料：</div>
                    <div class="form_container material_detail lf">
                        <c:forEach items="${list }" var="bean">
                            <div class="form_group lf">
                                <input type="checkbox"
                                    <!--<c:if test="${fn:contains(vo.resuest_material,bean.id)}"></c:if>
                                   checked="checked"-->
                                       <c:if test="${fn:contains(vo.resuest_material,bean.id)}">checked="checked"</c:if>
                                       class="" name="{{this.name}}" value="${bean.id }" />
                                <label class="nor_wrap <c:if test="${fn:contains(vo.resuest_material,bean.id)}">checked</c:if>" >{{this.name}}</label>
                            </div>
                        </c:forEach>
                    </div>
                    <div class="check_all_box clearfix">
                        <div class="form_group lf">
                            <input  type="checkbox" class="check_all" name="全选" value="全选" />
                            <label class="check_all">全选</label>
                        </div>
                    </div>
                </div>
                <!--增加部分-->
                <div class="form_item apply_business clearfix">
                    <div class="material_text lf">适用业务：</div>
                    <div class="form_container  business_detail lf">
                        <div class="form_group lf">
                            <input type="radio" class="" name="car_type" value="新车" checked="checked" />
                            <label class="nor_wrap radio_label">新车</label>
                        </div>
                        <div class="form_group lf">
                            <input type="radio" class="" name="car_type" value="二手车" />
                            <label class="nor_wrap radio_label">二手车</label>
                        </div>
                    </div>
                </div>
                <div class="form_item apply_product clearfix">
                    <div class="material_text lf">适用产品：</div>
                    <div class="form_container drop_down product_detail new_car lf">
                        <div class="form_group lf">
                            <input type="checkbox" class="" name="" value="1" />
                            <label class="nor_wrap" >产品一</label>
                        </div>

                    </div>
                    <div class="form_container drop_down product_detail used_car lf">
                        <div class="form_group lf">
                            <input type="checkbox" class="" name="" value="1" />
                            <label class="nor_wrap" >产品一</label>
                        </div>
                    </div>
                    <div class="check_all_box clearfix">
                        <div class="form_group lf">
                            <input type="checkbox" class="check_all" name="全选" value="全选" />
                            <label class="check_all">全选</label>
                        </div>
                    </div>
                </div>

                <div class="btn_box clearfix ">
                    <!--<a href="javascript:;" class="btn orange_btn confirm edit_confirm" lang="${product_id}">保存修改</a>
                    <a href="javascript:;" class="btn bg_btn edit_cancel">取消</a>-->
                    <per:button code="1094">
                        <a href="javascript:;" class="btn orange_btn confirm edit_confirm">保存修改</a>
                        <a href="javascript:;" class="btn bg_btn edit_cancel">取消</a>
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
<script src="{{markUri}}/static/dialog/dialog-layer.js" type="text/javascript" charset="UTF-8"></script>
<script src="{{markUri}}/static/js/customerService.js" type="text/javascript" charset="UTF-8"></script>
<script>
    (function ($) {
        //保存修改按钮的事件绑定
        var elem = {
            saveBtn : $(".edit_confirm"),
            cancelBtn : $(".edit_cancel")
        };
        const URL = contextPath + "/api/product/material/edit";
        /*获取页面加载时选中的数据*/
        var currentMaterial = []; //页面加载时选中的材料
        currentMaterial = getCheckedFormItem(currentMaterial, ".material_detail");
        /*var currentBusiness = []; //页面加载时选中的适用业务类型
        currentBusiness = getCheckedFormItem(currentBusiness, ".business_detail");*/
        var currentProducts = []; //页面加载时选中的适用业务类型
        currentProducts = getCheckedFormItem(currentProducts, ".product_detail");


        //适用业务切换
        var carTypeBtn = $(".apply_business input[type='radio]");
        carTypeBtn.off("click").on("click", function () {
            var t = $(this);
        });



        //获取选中材料ID值 参数为存放ID值的数组
        function getCheckedFormItem (arr, selector) {
            var checkedInput = $(selector).find("input[type='checkbox']");
            checkedInput.each(function () {
                var t = $(this);
                if (t.attr("checked") == 'checked') {
                    var materialId = t.val();
                    arr.push(materialId);
                }
            });
            return arr;
        }
        //修改按钮的事件绑定
        function saveEdit () {
            disabled('.edit_confirm', "click", saveEdit);
            //var productId = $(this).attr("lang");
            editMaterials();
        }
        /*elem.saveBtn.off("click").on("click", function () {

         });*/
        rebind('.edit_confirm', "click", saveEdit);
        //修改逻辑
        function editMaterials (productId) {
            /*获取修改后的选中数据*/
            var checkedMaterial = [];
            checkedMaterial = getCheckedFormItem(checkedMaterial, ".material_detail");
            /*var checkedBusiness = []; //页面加载时选中的适用业务类型
            checkedBusiness = getCheckedFormItem(checkedBusiness, ".business_detail");*/
            var checkedProducts = []; //页面加载时选中的适用业务类型
            checkedProducts = getCheckedFormItem(checkedProducts, ".product_detail");
            //提交数据
            var data = {
                //product_id : productId,
                resuest_material : checkedMaterial.join(","),
                //business_type : checkedBusiness.join(","),
                product_id : checkedProducts.join(",")
            };
            var currentMaterialStr = currentMaterial.join(","),
                    newMaterialStr = checkedMaterial.join(",");
           /* var currentBusinessStr = currentBusiness.join(","),
                    newBusinessStr = checkedBusiness.join(",");*/
            var currentProductsStr = currentProducts.join(","),
                    newProductsStr = checkedProducts.join(",");
            if (currentMaterialStr != newMaterialStr || currentProductsStr != newProductsStr /*|| currentBusinessStr != newBusinessStr*/) {
                $ajax("POST", URL, data, function (res) {
                    var datas = eval(res);
                    if (datas.error_code == 0) {
                        //成功逻辑
                        //rebind('.edit_confirm', "click", saveEdit);
                        $alert("请款材料更改操作成功", function () {
                            window.history.back();
                        });
                    } else {
                        //失败逻辑
                        $alert("网络延迟，请稍后重试");
                        rebind('.edit_confirm', "click", saveEdit);
                    }
                }, function () {
                    $alert("网络通信异常，请稍后重试或联系技术支持");
                    rebind('.edit_confirm', "click", saveEdit);
                })
            } else {
                $alert("您未选择材料或产品，或者您未做任何更改");
                rebind('.edit_confirm', "click", saveEdit);
            }

        }
        elem.cancelBtn.off("click").on("click", function () {
            window.history.back();
        });


        //页面回显时监听是否全选
        checkboxMonitor($(".form_container"));
        $(function() {
            resetCheckboxAndRadio('checkbox', ".form_group label", ".checked");
            checkAll(".check_all");
            dropDownIcon(".drop_down");
        });
    })(jQuery,undefined);
</script>
</html>