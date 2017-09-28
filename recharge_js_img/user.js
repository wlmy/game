//box/forgetPwd 中renderPartial processOutput参数设置true无法正常
jQuery(document).on('click', '#findpwd-captcha', function(){
    jQuery.ajax({
        url: "/box/captcha/refresh/1",
        dataType: 'json',
        cache: false,
        success: function(data) {
            jQuery('#findpwd-captcha').attr('src', data['url']);
            jQuery('body').data('captcha.hash', [data['hash1'], data['hash2']]);
        }
    });
    return false;
});
jQuery(document).on('click', '#register-captcha', function(){
    jQuery.ajax({
        url: "/box/captcha/refresh/1",
        dataType: 'json',
        cache: false,
        success: function(data) {
            jQuery('#register-captcha').attr('src', data['url']);
            jQuery('body').data('captcha.hash', [data['hash1'], data['hash2']]);
        }
    });
    return false;
});
// user service
angular.module('userService', ['ngResource'])
    .factory('User', ['$resource', function($resource){
        return $resource('/test/index', {}, {
            postReg: {url: '/user/postReg', method: 'POST', params:{}, isArray: false}
        });
    }]);
angular.module('loginBoxService', ['ngResource'])
    .factory('LoginBox', ['$resource', function($resource){
        return $resource('/test/index', {}, {
            getLogin: {url: '/box/login', method: 'get', params:{}, isArray: false},
            getRegister: {url: '/box/register', method: 'get', params:{}, isArray: false},
            getForgotPwd: {url: '/box/forgotPwd', method: 'get', params:{}, isArray: false},
            updateHeaderUser: {url: '/box/update', method: 'get', params:{}, isArray: false},
            getPhoneRegister1: {url: '/box/phoneRegister1', method: 'get', params:{}, isArray: false},
            getPhoneRegister2: {url: '/box/phoneRegister2', method: 'get', params:{}, isArray: false},
            getPhoneRegister3: {url: '/box/phoneRegister3', method: 'get', params:{}, isArray: false},
            postPhoneFindPwd: {url: '/box/postPhoneFindPwd', method: 'get', params:{}, isArray: false}
        });
    }]);

//register user service module into StApp
StApp.requires.push('userService');
StApp.requires.push('loginBoxService');
var sendMsg = function(boxClass){
    if($("#"+boxClass).length > 0){
        var startTime =  Date.parse(new Date())  + 59000;
        $("#"+boxClass).countdown(startTime)
        .on('update.countdown',function(event) {
            $(this).val('重新发送短信').attr('disabled', true);
            $(this).val(event.strftime('%Ss后重新获取'));
        })
        .on('finish.countdown', function(){
            $(this).val('重新发送短信').attr('disabled', false);
        });
    }
};
//导航条头部的用户登陆
StApp.controller('UserHeaderCtl', ['$scope', '$http', '$compile', 'User', 'Utility', 'LoginBox', 'Modal', '$timeout',
    function($scope, $http, $compile, User, Utility, LoginBox, Modal, $timeout){
        $timeout(function() {
            var query = window.location.search.substring(1);
            var vars = query.split('&');
            var params = {};
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split('=');
                params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
            }
            if(typeof(params.error) != 'undefined')
                $scope.model.errors = [params.error];

            var hash = self.location.hash;
            if(hash == '#login') {
                //angular.element('#header-login').triggerHandler('click');
                $scope.showLoginBox();
            }
        }, 100);

        $scope.login = function(){
            var box = LoginBox.getLogin({}, function(){
                if(box.code != 0){
                    //@todo error
                    console.log(box.message);
                    return;
                }
                var html = box.data.html;
                $scope.model.errors = [];
                $scope.modal.login = $scope.getModal($scope, {
                    width: 550,
                    height: 420,
                    id: 'box-login',
                    body: html
                });
            });

        };

        $scope.register = function(){
            var box = LoginBox.getRegister({}, function() {
                if (box.code != 0) {
                    //@todo error
                    console.log(box.message);
                    return;
                }
                var html = box.data.html;
                $scope.model.errors = [];
                $scope.modal.reg = $scope.getModal($scope, {
                    width: 550,
                    height: 420,
                    id: 'box-register',
                    body: html
                });
            });
        };
        $scope.phoneRegister1 = function(){
            var box = LoginBox.getPhoneRegister1({}, function() {
                if (box.code != 0) {
                    //@todo error
                    console.log(box.message);
                    return;
                }
                var html = box.data.html;
                $scope.model.errors = [];
                $scope.modal.phoneRegister1 = $scope.getModal($scope, {
                    width: 550,
                    height: 320,
                    id: 'box-phoneRegister',
                    body: html
                });
            });
        };
        $scope.phoneRegister2 = function(){
            var box = LoginBox.getPhoneRegister2({}, function() {
                if (box.code != 0) {
                    //@todo error
                    console.log(box.message);
                    return;
                }
                var html = box.data.html;
                $scope.model.errors = [];
                $scope.modal.phoneRegister2 = $scope.getModal($scope, {
                    width: 550,
                    height: 320,
                    id: 'box-phoneRegister2',
                    body: html
                });
                sendMsg("reg-send");
            });
        };
        /**
         * 请求box/phoneRegister 会有302现象，则以次形式操作
         * @param flag
         */
        $scope.phoneRegister3 = function(flag){
            if(flag){
                var box = LoginBox.getPhoneRegister3({}, function() {
                    if (box.code != 0) {
                        //@todo error
                        console.log(box.message);
                        return;
                    }
                    var html = box.data.html;
                    $scope.modal.phoneRegister3 = html;
                });
            }else{
                    $scope.model.errors = [];
                    $scope.modal.phoneRegister3 = $scope.getModal($scope, {
                        width: 550,
                        height: 320,
                        id: 'box-phoneRegister3',
                        body: $scope.modal.phoneRegister3
                    });
                }
        };

        $scope.postPhoneFindPwd = function () {
            var box = LoginBox.postPhoneFindPwd({}, function() {
                if (box.code != 0) {
                    //@todo error
                    console.log(box.message);
                    return;
                }
                var html = box.data.html;
                $scope.model.errors = [];
                $scope.model.pwd.verifyCode = '';
                $scope.model.pwd.passwd= '';
                $scope.modal.postPhoneFindPwd = $scope.getModal($scope, {
                    width: 550,
                    height: 320,
                    id: 'box-postPhoneFindPwd',
                    body: html
                });
                sendMsg("pwd-send");
            });
        }
    }
]);

//register UserController into StApp
StApp.controller('UserCtl', ['$scope', '$http', 'User', 'LoginBox', '$timeout',
    function($scope, $http, User, LoginBox, $timeout){
        //init section
        $timeout(function(){
            //var href = self.location.href;
            //if(href.indexOf('/uc/user') !== -1) {
            //    $scope.loadUser();
            //}
        });

        $timeout(function(){
            $('#error-s1').fadeOut();
        }, 3000);


        //model error msg
        $scope.modelErrMsg = [];

        $scope.autoLoginCheck = function(){
            $scope.model.login.autoLogin = $scope.model.login.ckbAgree ? 1 : 0;
        };

        $scope.agreeCheck = function(){
            $scope.model.reg.agree = $scope.model.reg.ckbAgree ? 1 : 0;
        };

        $scope.updateHeaderUser = function(){
            if($scope.model.loginRefresh){
                self.location.reload();
                return;
            }

            var box = LoginBox.updateHeaderUser({}, function(){
                if(box.code != 0) return;
                $('#header-user').html(box.data.html);
                if($scope.modal.login != null)
                    $scope.modal.login.hide();

                if($scope.modal.reg != null)
                    $scope.modal.reg.hide();

                $scope.model.loginRefresh = true;
            });
        };

        $scope.postReg = function(){
            $.post('/user/postReg', $scope.model.reg, function(data){
                if(data.code != 0 && data.data.msg.length > 0){
                    $scope.model.errors = data.data.msg;
                    $scope.$apply();
                    return;
                }
                $scope.updateHeaderUser();
            }, 'json');
        };

        $scope.postLogin = function(){
            $.post('/user/postLogin', $scope.model.login, function(data){
                //console.log(data);
                if(data.code != 0) {
                    if (data.data.msg.length > 0){
                        $scope.model.errors = data.data.msg;
                        $scope.$apply();
                    }

                    return;
                }

                $scope.updateHeaderUser();
            }, 'json');

        };

        $scope.switchRegister = function(){
            if(angular.isObject($scope.modal.login))
                $scope.modal.login.hide();

            $scope.model.errors = [];
            if(angular.isObject($scope.modal.reg))
                $scope.modal.reg.show();
            else{
                $scope.register();
            }
        };

        $scope.switchPhoneRegister1 = function(){
            if(angular.isObject($scope.modal.reg))
                $scope.modal.reg.hide();

            $scope.model.errors = [];
            $scope.model.phone.number = '';
            $scope.model.phone.captcha = '';
            if(angular.isObject($scope.modal.phoneRegister1))
                $scope.modal.phoneRegister1.show();
            else{
                $scope.phoneRegister1();
            }
        };

        $scope.postPhoneCode = function(resend) {
            var data = new FormData();
            data.append('timestamp', _timestamp);
            data.append('type', 1);
            data.append('number', $scope.model.phone.number);
            data.append('token', _token);
            data.append('captcha', $scope.model.phone.captcha);
            $.ajax({
                type:"POST",
                url:'/box/getToken',
                data:data,
                processData: false,
                contentType : false
            }).done(function (data) {
                $scope.model.errors = [];
                var data = jQuery.parseJSON(data);
                if (data.code == 0) {
                    $scope.model.phone.token = data.data.s;
                    $scope.model.phone.checkToken =  _token;
                    $scope.model.phone.type =  1;
                    $scope.model.phone.timestamp =  _timestamp;
                    $.post('/user/queryVerifyCode', $scope.model.phone)
                    .done(function (data) {
                        var data = jQuery.parseJSON(data);
                        $scope.model.errors = [];
                        if (data.code == 0) {
                            if (resend !== undefined) {
                                sendMsg("reg-send");
                                return;
                            }

                            if (angular.isObject($scope.modal.phoneRegister1))
                                $scope.modal.phoneRegister1.hide();

                            if (angular.isObject($scope.modal.phoneRegister2)) {
                                $scope.modal.phoneRegister2.show();
                                sendMsg("reg-send");
                            } else
                                $scope.phoneRegister2();

                            $scope.phoneRegister3(true);
                        } else {
                            if (data.data.msg != undefined)
                                $scope.model.errors = data.data.msg;
                            else
                                $scope.model.errors.push(data.message);
                            $scope.$apply();
                            return;
                        }
                    });
                } else {
                    $("#register-captcha").click();
                    $scope.model.phone.captcha = '';
                    $scope.model.errors = data.data.msg;
                    $scope.$apply();
                    return;
                }
            });
        };

        $scope.checkCapture = function(){
            var data = new FormData();
            data.append('timestamp', _timestamp);
            data.append('type', 1);
            data.append('name', $scope.model.phone.number);
            data.append('verifycode', $scope.model.phone.verifycode);
            data.append('token', _token);
            $.ajax({
                type:"POST",
                url:'/user/phoneRegister',
                data:data,
                processData: false,
                contentType : false
            }).done(function (data) {
                var data = jQuery.parseJSON(data);
                $scope.model.errors = [];
                if(data.code == 0){
                    if (angular.isObject($scope.modal.phoneRegister2))
                        $scope.modal.phoneRegister2.hide();
                    $scope.phoneRegister3();
                    $scope.model.changePwd.oldPassword = data.data.randPwd;
                }else{
                    if(typeof data.message.msg != 'undefined'){
                        $scope.model.errors.push(data.message.msg);
                    }else if(typeof data.data.msg != 'undefined'){
                        $scope.model.errors = data.data.msg;
                    }else{
                        $scope.model.errors.push(data.message);
                    }
                }
                $scope.$apply();
                return;
            });
        };
        $scope.phoneChangePwd = function(){
            $.post('/user/changePassword', $scope.model.changePwd, function(data){
                var data = $.parseJSON(data);
                $scope.model.errors = [];
                if(data.code != 0){
                    $scope.model.errors.push(data.message);
                    $scope.$apply();
                    return ;
                }
                $scope.updateHeaderUser();
            });
        };


        $scope.switchLogin = function(){
            if(angular.isObject($scope.modal.reg))
                $scope.modal.reg.hide();

            $scope.model.errors = [];
            if(angular.isObject($scope.modal.login))
                $scope.modal.login.show();
            else{
                $scope.login();
            }
        };

        $scope.forgotPwd = function(){
            $scope.model.pwd.name = '';
            $scope.model.pwd.captcha = '';
            if($("#phone-findpwd").length>0){
                $("#phone-findpwd").addClass('sr-only');
            }

            if(angular.isObject($scope.modal.login))
                $scope.modal.login.hide();

            if(angular.isObject($scope.modal.forgotPwd)) {
                $scope.model.errors = [];
                $scope.modal.forgotPwd.show();
                return;
            }

            var box = LoginBox.getForgotPwd({}, function() {
                if (box.code != 0) {
                    //@todo error
                    console.log(box.message);
                    return;
                }
                var html = box.data.html;
                $scope.model.errors = [];
                $scope.modal.forgotPwd = $scope.getModal($scope, {
                    width: 550,
                    height: 320,
                    id: 'box-forgotpwd',
                    body: html
                });
            });
        };

        $scope.backToLogin = function(){

            if(angular.isObject($scope.modal.forgotPwd))
                $scope.modal.forgotPwd.hide();

            $scope.model.errors = [];
            if(angular.isObject($scope.modal.login))
                $scope.modal.login.show();
            else{
                $scope.login();
            }
        };

        $scope.postFindPwd = function(){
            $.post('/user/postFindPwd', $scope.model.pwd, function(data){
                if(data.code != 0) {
                    if (data.data.msg.length > 0){
                        $scope.model.errors = data.data.msg;
                        $scope.$apply();
                    }

                    return;
                }

                $scope.modal.pwdOk = $scope.getModal($scope, {
                    width: 450,
                    height: 180,
                    id: 'box-pwdok',
                    body: '<div style="text-align: center;">重置密码的连接已被发送到你的邮箱，请耐心等待<br /><button class="button button-rounded button-flat-primary" ng-click="pwdOK()">确定</button></div>',
                    title: '提示'
                });
                $scope.modal.forgotPwd.hide();

            }, 'json');
        };

        $scope.pwdOK = function(){
            $scope.modal.pwdOk.hide();
        };

        $scope.enter = function($event, _type){
            if($event.which == 13){
                if(_type == 'login'){
                    $scope.postLogin();
                }

                if(_type == 'register'){
                    $scope.postReg();
                }
            }
        };
        
        $scope.showUcProfile = function() {
            if(!$.isEmptyObject($scope.model.changePwd)){
                $('.uc-user-profile').removeClass('sr-only');
                return true;
            }

            return false;
        };

        $scope.changePwd = function() {
            var model = $scope.model.changePwd;
            if(!model.isOldError || !model.isNewError || !model.isConfirmError){
                return;
            }

            $.post('/user/postChangePwd', $scope.model.changePwd, function(data){
                if(data.code != 0){
                    if(typeof(data.data.msg) != 'undefined'){
                        var msg = data.data.msg;
                        for(var p in msg){
                            if(p == 'oldPassword'){
                                model.isOldError = false;
                                model.oldErrMsg = msg[p][0];
                            }else if(p == 'newPassword'){
                                model.isNewError = false;
                                model.newErrMsg = msg[p][0];
                            }else if(p == 'confirmPassword'){
                                model.isConfirmError = false;
                                model.confirmErrMsg = msg[p][0];
                            }
                        }
                        $scope.model.changePwd = model;
                        //$scope.model.errors = msg;
                        $scope.$apply();
                    }

                    return ;
                }

                $scope.model.changePwd = {
                    isOldError: true,
                    isNewError: true,
                    isConfirmError: true,
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                };
                $scope.$apply();
                Utility.showMsgBox('密码修改成功');

            }, 'json');
        };

        $scope.findPwd = function(){
            if($scope.model.pwd.name == ''){
                $scope.model.errors = ['请填写邮箱或者手机'];
                return;
            }

            if(isNaN($scope.model.pwd.name)){
                $scope.model.errors = [];
                $("#phone-findpwd").addClass('sr-only');
                $scope.postFindPwd();
            }else{
                if($scope.model.pwd.captcha == ''){
                    $("#phone-findpwd").removeClass('sr-only');
                    $scope.model.errors = ['请填写验证码'];
                    return;
                }
                $scope.phoneFindPwd();
            }

        }

        $scope.phoneFindPwd = function(resend){
                var data = new FormData();
                data.append('timestamp', _timestamp);
                data.append('type', 2);
                data.append('number', $scope.model.pwd.name);
                data.append('token', _token);
                data.append('captcha', $scope.model.pwd.captcha);
                $.ajax({
                    type:"POST",
                    url:'/box/getToken',
                    data:data,
                    processData: false,
                    contentType : false
                }).done(function (data) {
                    $scope.model.errors = [];
                    var data = jQuery.parseJSON(data);
                    if(data.code == 0) {
                        $scope.model.pwd.token = data.data.s;
                        $scope.model.pwd.type = 2;
                        $scope.model.pwd.checkToken =  _token;
                        $scope.model.pwd.timestamp =  _timestamp;
                        $scope.model.pwd.number = $scope.model.pwd.name;
                        $.post('/user/queryVerifyCode', $scope.model.pwd)
                        .done(function(data){
                            var data = jQuery.parseJSON(data);
                            $scope.model.errors = [];
                            if(data.code == 0) {
                                if(angular.isObject($scope.modal.forgotPwd)) {
                                    $scope.modal.forgotPwd.hide();
                                }

                                if (angular.isObject($scope.modal.postPhoneFindPwd))
                                    $scope.modal.postPhoneFindPwd.show();
                                else {
                                    $scope.postPhoneFindPwd();
                                };
                            }else{
                                $scope.model.errors.push(data.message);
                                $scope.model.pwd.captcha = '';
                                $scope.$apply();
                                return ;
                            }
                        });
                    }else{
                        $scope.model.pwd.captcha = '';
                        $('#findpwd-captcha').click();
                        $scope.model.errors = data.data.msg;
                        $scope.$apply();
                        return ;
                    }
                });
        };

        $scope.phoneUpdatePwd = function () {
            var data = new FormData();
            data.append('timestamp', _timestamp);
            data.append('type', 2);
            data.append('token', _token);
            data.append('number', $scope.model.pwd.name);
            data.append('verifyCode', $scope.model.pwd.verifyCode);
            data.append('passwd', $scope.model.pwd.passwd);
            $.ajax({
                type:"POST",
                url:'/user/updateNewPassword',
                data:data,
                processData: false,
                contentType : false
            }).done(function (data) {
                var data = jQuery.parseJSON(data);
                $scope.model.errors = [];
                if(data.code == 0) {
                    Utility.showMsgBox('密码修改成功');
                    if(angular.isObject($scope.modal.postPhoneFindPwd)) {
                        $scope.modal.postPhoneFindPwd.hide();
                    }

                    $scope.model.errors = [];
                    if(angular.isObject($scope.modal.login))
                        $scope.modal.login.show();
                    else{
                        $scope.login();
                    }
                }else{
                    if(data.data.msg != undefined)
                        $scope.model.errors = data.data.msg;
                    else
                        $scope.model.errors.push(data.message);
                    $scope.$apply();
                    return ;
                }
            });
            data.append('token', _token);
        }
        $scope.inputBlur = function($event) {
            var target = $($event.target);
            var inputId = target.attr('id');
            var strlen = target.val().length;

            var model = $scope.model.changePwd;
            if (inputId == 'oldpassword') {
                if(target.val() != '' && strlen >= 6 && strlen <= 16 ) {
                    model.isOldError = true;
                } else {
                    model.oldErrMsg = '6~16个字符';
                    model.isOldError = false;
                }
            } else if (inputId == 'newpassword') {
                if(target.val() != '' && strlen >= 6 && strlen <= 16)
                    model.isNewError = true;
                else {
                    model.newErrMsg = '6~16个字符';
                    model.isNewError = false;
                    return;
                }
                if($('#confirmpassword').val() != '' && $('#confirmpassword').val() != target.val()) {
                    model.confirmErrMsg = '两次输入新密码不匹配';
                    model.isConfirmError = false;
                }
            } else if (inputId == 'confirmpassword') {
                if(target.val() != '' && target.val() == $('#newpassword').val())
                    model.isConfirmError = true;
                else
                    model.isConfirmError = false;
            }

            $scope.model.changePwd = model;
        };

        $scope.loadUser = function() {
            $.post('/user/getProfile', {}, function(data) {
                if(data.code == 0) {
                    $scope.model.profile = {
                        username: data.data.msg.userName,
                        nickname: data.data.msg.nickname,
                        gender: data.data.msg.gender
                    }
                }
            }, 'json');
        };

        $scope.initUploadify = function(){
            $allowSubmitChilds = {};
            $('.uploadify-queue-item').remove();

            if(typeof($.fn.uploadify) == 'undefined')
                return;

            $('#btn-upload').uploadify({
                'multi': false,
                'auto': true,
                'height': 41,
                'width': 105,
                'fileSizeLimit': '500KB',
                'fileTypeExts' : '*.gif; *.jpg; *.png',
                'buttonText': '',
                'buttonClass': 'avatar-uploadify-button',
                'removeCompleted': true,
                'removeTimeout' : 0,
                'checkExisting' : false,
                'queueSizeLimit': 1,
                'queueID'  : 'user_upload_avatar',
                'buttonImage': _staticBaseUrl + '/images/avatar-upload-icon.png',
                'swf'      : _baseUrl + '/uploadify/uploadify.swf',
                'uploader' : _baseUrl + '/file/upload',
                'formData' : {
                    'timestamp': $scope.model.timestamp,
                    'token' : $scope.model.token,
                    'type' : '{"Filedata": 1}',
                    'uploadimgetype': 2,
                    'withfullurl': 0,
                    'withtag': 0
                },

                'onUploadSuccess' : function(file, data, response) {
                    var jobj = $.parseJSON(data);
                    if(jobj.code == -3 ){
                        $scope.showLoginBox();
                        return;
                    }

                    if(jobj.code == 0 ){
                        var avatarUrl = $scope.model.fileBaseuUrl + jobj.data.files[0].path;
                        $.post('/user/postChangeAvatar', {'avatar':avatarUrl}, function(result) {
                            if(result.code == 0) {
                                //change avatar img on html
                                $('.nav .login-user img').attr('src', avatarUrl);
                                $('.uc-avatar .avatar img').attr('src', avatarUrl);
                            } else {
                                Utility.showMsgBox(result.message);
                            }
                        }, 'json')


                    }else{
                        Utility.showMsgBox(jobj.message);
                    }
                },

                // Customized event, it's not uploadify event
                'onBeforeSelect' : function(file, queueData){
                    var setings = this.settings;
                    if($scope.model.postImgs.length >= setings.queueSizeLimit){
                        this.cancelUpload(file.id);
                        return false;
                    }

                    return true;
                },

                // Customized event, it's not uploadify event
                'onBeforeUploadStart' : function(queueData, file){
                    if(typeof(queueData.files) == 'undefined')
                        return true;

                    if(queueData.files[file.id]){
                        this.cancelUpload(file.id);
                        return false;
                    }

                    return true;
                },

                'onUploadStart': function(file){
                    $allowSubmitChilds[file.id] = false;
                },

                'onUploadComplete': function(file){
                    $allowSubmitChilds[file.id] = true;
                },

                'onUploadError' : function(file, errorCode, errorMsg, errorString) {
                    Utility.showMsgBox(errorString);
                }
            });
        };

        if($scope.initUploadify != null && $('#btn-upload').length > 0) {
            $scope.initUploadify();
        }

        $scope.changeProfile = function() {
            var param = {};
            param.nickname = $('#nickname').val();
            param.gender = $('input[type="radio"]:checked').val();

            $.post('/user/postChangeProfile', param, function(data) {
                if(data.code == 0) {
                    Utility.showMsgBox('修改个人资料成功');
                    $scope.model.errors = [];
                    $scope.$apply();
                } else {
                    if (data.data.msg.length > 0){
                        $scope.model.errors = data.data.msg;
                        $scope.$apply();
                    }
                    return false;
                }
            }, 'json');

            return false;
        };
    }
]);