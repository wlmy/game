checkBrowser = function (){
    var checkHtml = '<div id="browser-support">'+
                    '<span>对不起，暂时不支持您所使用的浏览器</span>'+
                    '<div class="close close-prompt pull-right">' +
                    '<i class="fa fa-close"></i> </div>' +
                    '<div class="clearfix"></div>' +
                    '</div>';
    var name = $.browser.name;
    var version = $.browser.versionNumber;
    //console.log(name, version);

    var isAlert = true;
    if (name == 'msie' && version >= 9) {
        isAlert = false;
    }

    if((name == 'mozilla' || name == 'firefox')  && version >= 22){
        isAlert = false;
    }

    if(name == 'safari' && version >= 5){
        isAlert = false;
    }

    if(name == 'chrome' && version >= 20){
        isAlert = false;
    }

    if(isAlert){
        $("body").prepend(checkHtml);
    }

    $("#browser-support .close-prompt").click(function(){
        $("#browser-support").addClass('sr-only');
    });
};
$(document).ready(function(){
    checkBrowser();//检测浏览器版本
});
