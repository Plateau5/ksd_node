
$(function(){
    var questionType = $.trim($('#questionType').val());
    var question_id = $('#question_id').val();
    if (questionType == '0') {
        var url=contextPath + "/api/question/getHisList";
    } else if (questionType == '1') {
        var url=contextPath + "/api/merquestion/getHisList";
    } else if (questionType == '2') {
        var url=contextPath + "/api/merquestion/getHisList";
    }
    var eq;
    $.ajax({
        type:"post",
        url :url,
        dataType:"json",
        async:false,
        data:{question_id:question_id},
        error:function(xhr,status,err){
            alert("系统异常");
        },
        success:function(data){
            eq = data.data.length;
            if(data.error_code =='0'){
                $('.question_record_box').remove();
                var inner = "";
                var role = '创建人';
                $.each(data.data,function(n,value){
                    if(n != 0){
                        role = '修改人';
                    }
                    var image_url = value.image_url;
                    if(value.image_url == ''){
                        image_url = '/static/img/employee/perIcon.png';
                    }
                    var list_num = (n + 1) % 6;
                    if(list_num != 0){
                        var lines1 = Math.ceil((n + 1) / 6) % 2;
                        if(lines1 == 0){
                            //even偶left
                            inner = '<div class="question_record_box record_even"><div class="question_record_box_arrow_left arrow_left"></div><div class="question_record_box_left record_box_even"><div class="question_record_avatar"><img src="'+ image_url +'" alt=""></div><div class="question_record_txt"><span class="question_record_personal">' + role + '：'+ value.modify_name +'</span><span class="question_record_time">'+ value.modify_time +'</span></div></div></div>'
                        }else{
                            //odd奇right
                            inner = '<div class="question_record_box record_odd"><div class="question_record_box_left record_box_odd"><div class="question_record_avatar"><img src="'+ image_url +'" alt=""></div><div class="question_record_txt"><span class="question_record_personal">' + role + '：'+ value.modify_name +'</span><span class="question_record_time">'+ value.modify_time +'</span></div></div><div class="question_record_box_arrow_right arrow_right"></div></div>'
                        }
                    }else{
                        var lines2 = ((n + 1) / 6) % 2;
                        if(lines2 == 0){
                            //down even
                            inner = '<div class="question_record_box record_even record_last"><div class="question_record_box_left record_box_even"><div class="question_record_avatar"><img src="'+ image_url +'" alt=""></div><div class="question_record_txt"><span class="question_record_personal">' + role + '：'+ value.modify_name +'</span><span class="question_record_time">'+ value.modify_time +'</span></div><div class="question_record_box_arrow_down arrow_down"></div></div></div>'
                        }else{
                            //doem odd
                            inner = '<div class="question_record_box record_odd record_last"><div class="question_record_box_left record_box_odd"><div class="question_record_avatar"><img src="'+ image_url +'" alt=""></div><div class="question_record_txt"><span class="question_record_personal">' + role + '：'+ value.modify_name +'</span><span class="question_record_time">'+ value.modify_time +'</span></div><div class="question_record_box_arrow_down arrow_down"></div></div></div>'
                        }
                    }
                    $('.his_list').append(inner);
                });

            }else{
                alert(data.error_msg);
            }
        }
    });
    $('.question_record_box').eq(eq - 1).find('.arrow_down').remove();
    $('.question_record_box').eq(eq - 1).find('.arrow_left').css('background','#fff');
    $('.question_record_box').eq(eq - 1).find('.arrow_right').css('background','#fff');

});

