/**
 * utility js
 *
 * @author Daniel Qin <xin.qin@qinx.org>
 */
Utility = {
    /**
     * @param callback 回调函数
     * @param cId  内容div的主id
     */
    overlay : function(callback, cId) {
        var id = 'overlay-'+cId;
        var html = '<div class="overlay" id="'+id+'"></div>';
        $(html).css({
            'width': $(window).width(),
            'height': $(document).height()
        }).click(function(){
            $('#'+id).remove();
            if($.isFunction(callback)){
                callback(id);
            }
            // console.log('clicked');
        }).appendTo($('body'));

        var reset = function(){
            $('#'+id).css({
                'width': $(window).width(),
                'height': $(document).height()
            });
        };

        $(window).resize(function(){
            reset();
        });

        $(window).scroll(function(){
            reset();
        });
    },

    /**
     * 显示提示信息
     */
    showMsgBox : function(body){
        var id = 'showMsgBox';
        var obj = $('#' + id);
        obj.remove();
        var html = '<div id="'+id+'" class="error-box"><div class="">'+body+'</div></div>';
        $(html).appendTo($('body'));
        obj = $('#' + id);
        obj.center();
        obj.delay(3000).animate({
            opacity:0
        }, 1000, function(){
            $('#'+id).remove();
        });
    },

    /**
     * 显示错误信息
     */
    showErrorMsgBox : function(body){
        Utility.showMsgBox(body);
    },

    /**
     * 解析yii CFormModel 生成的错误信息.
     * @param data
     *         格式必须是CFormModel的格式，否则会解析失败
     * @return string html will
     *         <ul>
     *         <li>message</li>
     *         </ul>
     */
    parseFormModelError : function(data) {
        var html = '<ul>';
        $.each(data, function(k, v) {
            $.each(v, function(k1, v1) {
                html += '<li>' + v1 + '</li>';
            });
        });

        html += '</ul>';

        return html;
    }
};

Utility.msg = {
    getErrorHtml: function(error){
        var html = '<div class="error-info"> \
            <div class="textcontent">'+error+'</div> \
            <div class="red-triangle"></div> \
        </div>';

        return html;
    },

    /**
     * msg 格式: {'fieldName':['error1','error2'],'field2':['error22','error33']}
     * @param msg
     * @param isAppend
     * @param insertNext
     */
    show: function(msg, isAppend, insertNext){
        var _isAppend = false,
            _insertNext = false;
        if(typeof(isAppend) != 'undefined' && isAppend == true){
            _isAppend = true;
        }
        if(typeof(insertNext) != 'undefined' && insertNext == true){
            _insertNext = true;
        }
        for(var k in msg){
            var html = Utility.msg.getErrorHtml(msg[k][0]);
            if(k == 'verifyCode'){
                if($('#'+k).parent().children().last().attr('id') == k)
                    $(html).attr('id', 'error-'+k).insertAfter($('#'+k));
                else
                    $(html).attr('id', 'error-'+k).insertAfter($('#'+k).parent().children().last().prev());
                break;
            }

            if(_isAppend)
                if(_insertNext)
                    $(html).attr('id', 'error-'+k).insertAfter($('#'+k).next());
                else
                    $(html).attr('id', 'error-'+k).insertAfter($('#'+k));
            else{
                var position = $('#'+k).offset();
                var height = $('#'+k).outerHeight();
                var p = {};
                p.left = position.left;
                p.top = position.top + height;

                $(html).attr('id', 'error-'+k).appendTo($('body')).css({
                    'position':'absolute',
                    'top': p.top,
                    'left': p.left,
                    'z-index': 1000
                });

                $('<div class="close-icon-16"></div>')
                    .prependTo($('#error-'+k+' .textcontent').eq(0))
                    .css({
                        'top':'12px',
                        'right':'2px',
                        'cursor':'pointer'
                    }).click(function(){
                        $('#error-'+k).fadeOut(400, function(){
                            $('#error-'+k).remove();
                        });
                    });
            }

            break;
        }
    },

    remove : function(){
        $("[id^='error-']").remove();
        $('.error-info').remove();
    }
};

/**
 * 居中生成的modal
 */
centerModal = function() {
    var $dialog = $(this).find(".modal-dialog");
    var offset = ($(window).height() - $dialog.height()) / 2 - 50;

    // Center modal vertically in window
    $dialog.css({
        // 'transform': 'translateY(' + offset + 'px) !important',
        'margin-top' : offset
    });
};

/**
 * 生成modal的模版
 *
 * @param id
 *         modal的id
 * @param title
 *         modal显示的title
 * @param body
 *         modal主题展示的内容， html格式或者纯文本。
 * @return html modal完整结构的html
 */
generateModal = function(id, title, body) {
    var html = '<div class="modal" id="'
        + id
        + '" tabindex="-1" role="dialog" aria-labelledby="'
        + id
        + 'Label" aria-hidden="false">\
	    <div class="modal-dialog"> \
	      <div class="modal-content"> \
	        <div class="modal-header"> \
	          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> \
	          <h4 class="modal-title">'
        + title
        + '</h4> \
	        </div> \
	        <div class="modal-body">'
        + body + '</div> \
	      </div> \
	    </div> \
	  </div>';
    return html;
};

/**
 * @deprecated use Utility.showMsgBox(body) directly.
 */
showMsgBox = function(body){
    Utility.showMsgBox(body);
};

/**
 * @deprecated use Utility.showErrorMsgBox(body) directly.
 */
showErrorMsgBox = function(body){
    Utility.showErrorMsgBox(body);
};

/**
 * 显示指定id的modal
 */
bsModalShow = function(id) {
    $('#' + id).on('shown.bs.modal', centerModal);
    $('#' + id).modal({
        'keyboard' : false
    });

    $(window).on("resize", function() {
        $('.modal').each(centerModal);
    });
};

generateAjaxTemplate = function() {
    var html = '<div style="display: none; z-index: 9999; position: absolute;" id="ajaxLoading"> \
					<img alt="" src="'
        + _staticBaseUrl  + '/images/ajax-loader.gif" /> \
			     </div> ';

    return html;
};

/**
 * 解析yii CFormModel 产生的错误.
 * @deprecated use Utility.parseFormModelError(data) directly.
 */
parseFormModelError = function(data) {
    return Utility.parseFormModelError(data);
};

//操作前检查, 阻塞式
checkIsLogin = function(){
    var isLoggedin = false;
    $.ajax(_isLoginUrl, {
        'async':false,
        'dataType':'json',
        'cache': false,
        'success': function(data){
            isLoggedin = data.isLoggedin;
        }
    });

    if(!isLoggedin){
        loginbox.show();
    }

    return isLoggedin;
};

//操作后，检查返回数据
checkLoginAfter = function(data){
    try{
        if(data.code == -9999){
            self.location.href = _loginUrl;
            return false;
        }
    }catch(exc){}

    return true;
};

headerSearch = function(){
    var abc = $.trim($('#header-search').val());
    if(abc != '')
        self.location.href = _globalSearchUrl + '/n/'+encodeURIComponent(abc);
};