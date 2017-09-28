/**
 * this is main javascript file for strong website project.
 */

$(document).ajaxStart(function() {
    if ($('#ajaxLoading').length < 1) {
        var html = generateAjaxTemplate();
        $(html).appendTo('body');
    }

    $('#ajaxLoading').center();
    $('#ajaxLoading').show();
});

$(document).ajaxComplete(function() {
    $('#ajaxLoading').hide();
});

$(document).ajaxError(function(event, jqxhr, settings, exception) {
    if(jqxhr.status == 0) return;
    var html = generateModal('ajaxError', jqxhr.status + ' - '
            + jqxhr.statusText, jqxhr.responseText);

    $('#ajaxError').remove();
    $(html).appendTo($('body'));

    bsModalShow('ajaxError');

});

var menuMove = function (con) {
    con = (typeof con === 'number' ? con : 400);
    var $lis = $('.header-nav>ul>li'), $h = $('#backgroundLi');
    var $hasActive = $lis.hasClass('active');

    if(!$hasActive) {
        var concp = con;
        $('.header-nav ul').hover(function(){
            con = concp;
        }, function() {
//            con = 0;
            $h.stop(true);
            $('#backgroundLi').hide();
        });
    }
    $lis.hover(function () {
        $h.stop().animate({
            'left': $(this).offsetParent().context.offsetLeft,
        }, con, function(){
            $("#backgroundLi").css('display', 'block');
        });
    }, function () {
        var left = 0;
        $('.header-nav>ul>li').each(function(i, e){
            if($(this).prop('class').indexOf('active') != -1) {
                left = $(this).offsetParent().context.offsetLeft;
                $h.stop().animate({
                    'left': left
                }, con);
                return false;
            }
        });
    });
};

setMenu = function(ctl, action){
    var menu = {
        'default:*':'default',
        'game:*':'game',
        'activity:*':'activity',
        'shop:*':'shop',
        'pubnews:*':'pubnews',
        'recharge:*':'recharge',
        'parental:*':'hparental'
    };
    $(document).ready(function(){
        $('.header-nav li').removeClass('active');

        for(var p in menu) {
            key = p.split(":");
            //console.log(key);
            if (ctl == key[0] && key[1] == '*') {
                v = menu[p];
                $('.header-nav li.' + v).addClass('active');
            };
        }

        $(".header-nav li").each(function(i, e){
            if($(this).prop('class').indexOf('active') != -1) {
                var left = $(this).offsetParent().context.offsetLeft;
                $("#backgroundLi").css('left', left);
                $("#backgroundLi").css('display', 'block');
            }
        });

        menuMove(300);
    });
};

$(document).ready(function(){
    if($('#return-top').length > 0) {
        var obj = $('.mainbody>div');
        var o1 = $('.splash-mainbody .sub-container');
        if(obj.length > 0) {

        }else if(o1.length > 0){
            if(o1.children('div').length > 0){
                obj = o1.children('div');
            }
        }

        if(typeof(obj) != 'undefined'){
            var left = obj.eq(0).position().left;
            $('#return-top').animate({
                left: left + 1010
            }, 300);
        }

    }

    $(window).scroll(function(){
        if($(window).scrollTop() > 700)
            $("#return-top").fadeIn(1000);
        else
            $("#return-top").fadeOut(1000);
    });


    $("#return-top").click(function(){
        $("body,html").animate({scrollTop:0}, '500');
    });

    $('.download-btn .erweima').hover(function(){
        $('#footer-nav .erweima-img-field').show();
    }, function() {
        $('#footer-nav .erweima-img-field').hide();
    });

    $('input, textarea').placeholder();

});
