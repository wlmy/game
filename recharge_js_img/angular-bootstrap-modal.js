/**
 * Author: Daniel Qin<xin.qin@qinx.org>
 * Created 14/10/24 上午11:29.
 */

angular.module('modalProvider', [])
    .factory('Modal', function(){
        return function(options) {
            var defaults = {
                width: 400,
                height: 300,
                id:'absModal',
                title:'',
                body:''
            };

            var o = {};

            $.extend(o, defaults, options);

            var obj = {

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
                _generateModal: function () {
                    var id = o.id, title = o.title, body = o.body;
                    var html = '<div class="modal fade" id="' + id + '" tabindex="-1" role="dialog" aria-labelledby="' + id + 'Label" aria-hidden="false"> \
                        <div class="modal-dialog"> \
                          <div class="modal-content">';

                    if (title != '' || typeof(title) == undefined)
                        html += '<div class="modal-header"> \
                              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> \
                              <h4 class="modal-title">' + title + '</h4> \
                            </div>';
                    else
                        html += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';

                    html += '<div class="modal-body">' + body + '</div> \
                          </div> \
                        </div> \
                      </div>';

                    return html;
                },

                //@todo should be refactor via angular way
                create: function ($compile, $scope) {
                    var id = o.id, title = o.title, body = o.body;
                    var force = o.force;
                    if (force == true) {
                        $('#' + id).remove();
                    }

                    if ($('#' + id).length > 0) return;

                    var html = obj._generateModal(id, title, body);
                    var a = $compile(html)($scope);
                    a.appendTo($('body'));

                    var $this = $('#'+id);
                    $this.modal({
                        'keyboard': false
                    });
                    $this.on('shown.bs.modal', function(){
                        obj.center();
                    });

                    $(window).on("resize", function () {
                        $('.modal').each(obj.center);
                    });
                },

                /**
                 * 显示指定id的modal
                 */
                show: function () {
                    var id = o.id;
                    var $this = $('#'+id);

                    //$this.css({'width':o.width, 'min-height':o.height, 'padding': 0});
                    $('#'+id+' .modal-content').css({'width':o.width, 'height':o.height});

                    //if($this.attr('data-fancybox-type') == 'iframe'){
                    //    var src = $this.attr('href');
                    //    html = '<iframe src="'+src+'" height="100%" width="100%" frameborder="0"></iframe>';
                    //}

                    $('#'+id+' .modal-close').click(function(event){
                        event.preventDefault();
                        $this.modal('hide');
                    });

                    $this.modal('show');
                    obj.center();
                },

                hide : function(){
                    var $this = $('#'+ o.id);
                    $this.modal('hide');
                },

                center : function(){
                    var id = o.id;
                    var $this = $('#'+id);
                    var __interval = setInterval(function(){
                        var $dialog = $this.find('.modal-dialog').eq(0);
                        var h = $dialog.height();
                        if(h > 0){
                            obj._center();
                            clearInterval(__interval);
                        }
                    }, 10);
                },

                /**
                 * 居中生成的modal
                 */
                _center: function () {
                    var $dialog = $('#' + o.id).find(".modal-dialog").eq(0);
                    var mTop = parseInt($dialog.css('marginTop'));
                    var mBottom = parseInt($dialog.css('marginBottom'));
                    var realHeight = $dialog.height() + mTop + mBottom;
                    var top = ($(window).height() - realHeight) / 2;
                    //var left = ($(window).width() - $dialog.width()) / 2;

                    // Center modal vertically in window
                    $dialog.css({
                        //'transform': 'translateY(' + offset + 'px) !important',
                        'margin-top': top
                    });
                }

            };

            return obj;
        }
    });