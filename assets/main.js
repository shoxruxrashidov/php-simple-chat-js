$(document).ready(function () {

    var preloadbg = document.createElement("img");
    preloadbg.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/timeline1.png";

    $("#searchfield").focus(function () {
        if ($(this).val() == "Search contacts...") {
            $(this).val("");
        }
    });
    $("#searchfield").focusout(function () {
        if ($(this).val() == "") {
            $(this).val("Search contacts...");

        }
    });

    $("#sendmessage input").focus(function () {
        if ($(this).val() == "Send message...") {
            $(this).val("");
        }
    });
    $("#sendmessage input").focusout(function () {
        if ($(this).val() == "") {
            $(this).val("Send message...");

        }
    });


        $('.friend').click(function(){
            var uid = $(this).attr('data-id');
            $.ajax({
                type: "POST",
                url: "https://localhost/php/simplechat/showdata.php",
                dataType: "JSON",
                data: {uid:uid},
                success: function (data) {
                    console.log(data);
                    var chatlist = '';
                    $.each(data.data,function(key,value){
                        console.log(uid);
                        var d = new Date(value.created_at);
                        var soat = d.getHours() +':'+ d.getMinutes();
                        var days = [
                            'Sunday',
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday'
                        ];
                        x = d.getDay();

                       if(value.created_at){
                           chatlist += '<label>'+days[x]+' '+d.getDate()+'</label>';
                       }else{
                           chatlist += '';
                       }
                        if (value.who == uid){ //agar uid == uid
                            chatlist +='<div class="message right">';
                        } else{
                            chatlist +='<div class="message">';
                        }
                        chatlist += '<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/1_copy.jpg" />';
                        chatlist += '<div class="bubble">';
                        chatlist += value.message;
                        chatlist += '<div class="corner"></div>';
                        chatlist += '<span>'+soat+'</span>';
                        chatlist += '</div></div>';
                    });
                    $('#chat-messages').html(chatlist);



                }
            });
        });

    $(".friend").each(function () {
        $(this).click(function () {
            var mid = $(this).attr('data-id');
            var childOffset = $(this).offset();
            var parentOffset = $(this).parent().parent().offset();
            var childTop = childOffset.top - parentOffset.top;
            var clone = $(this).find('img').eq(0).clone();
            var top = childTop + 12 + "px";

            $(clone).css({'top': top}).addClass("floatingImg").appendTo("#chatbox");

            setTimeout(function () {
                $("#profile p").addClass("animate");
                $("#profile").addClass("animate");
            }, 100);
            setTimeout(function () {
                $("#chat-messages").addClass("animate");
                $('.cx, .cy').addClass('s1');
                setTimeout(function () {
                    $('.cx, .cy').addClass('s2');
                }, 100);
                setTimeout(function () {
                    $('.cx, .cy').addClass('s3');
                }, 200);
            }, 150);

            $('.floatingImg').animate({
                'width': "68px",
                'left': '108px',
                'top': '20px'
            }, 200);

            var name = $(this).find("p strong").html();
            var email = $(this).find("p span").html();
            $("#profile p").html(name);
            $("#profile span").html(email);

            $(".message").not(".right").find("img").attr("src", $(clone).attr("src"));
            $('#friendslist').fadeOut();
            $('#chatview').fadeIn();


            $('#close').unbind("click").click(function () {
                $("#chat-messages, #profile, #profile p").removeClass("animate");
                $('.cx, .cy').removeClass("s1 s2 s3");
                $('.floatingImg').animate({
                    'width': "40px",
                    'top': top,
                    'left': '12px'
                }, 200, function () {
                    $('.floatingImg').remove()
                });

                setTimeout(function () {
                    $('#chatview').fadeOut();
                    $('#friendslist').fadeIn();
                }, 50);
            });


        });
    });

});