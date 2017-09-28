/**
 * Author: Daniel Qin<xin.qin@qinx.org>
 * Created 14/10/28 下午1:24.
 */

StApp.filter('dateformat', function(){
    return function(input){
        var current = Date.parse(input);
        if(isNaN(current)) return input;
        var cObj = new Date(current);

        var today = (new Date()).valueOf();
        var yestoday = (new Date()).valueOf() - 3600*24;
        var tObj = new Date(today);
        var yObj = new Date(yestoday);

        var month = cObj.getMonth() < 9 ? '0'+(cObj.getMonth()+1)+'' : cObj.getMonth();
        var day = cObj.getDate() < 10 ? '0'+cObj.getDate()+'' : cObj.getDate();
        var hours = cObj.getHours() < 10 ? '0'+cObj.getHours()+'' : cObj.getHours();
        var minutes = cObj.getMinutes() < 10 ? '0'+cObj.getMinutes()+'' : cObj.getMinutes();

        if(cObj.toLocaleDateString() == tObj.toLocaleDateString()){
            return '今天 ' + hours + ':' + minutes;
        }else if(cObj.toLocaleDateString() == yObj.toLocaleDateString()) {
            return '昨天 ' + hours + ':' + minutes;
        }else{
            return cObj.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + minutes;
        }

        return input;
    };
});

StApp.controller('BodyCtl', ['$scope', '$compile', 'Modal', '$timeout', '$sce',
    function($scope, $compile, Modal, $timeout, $sce){
        $timeout(function(){
            $scope.switchCategoryGame(null, 0);
        });

        //modal definition
        $scope.modal = {
            login: null,
            reg: null,
            forgotPwd: null,
            pwdOk: null,
            gamelink: null,
            buyitem: null,
            buyfail: null,
            buysuccess: null,
            phoneRegister1:null,
            phoneRegister2:null,
            phoneRegister3:null,
            postPhoneFindPwd:null
        };

        //model definition
        $scope.model = {
            isloaded : false,
            token: _token,
            timestamp: _timestamp,

            staticBaseUrl: _staticBaseUrl,
            fileBaseuUrl : _fileBaseUrl,
            baseUrl: _baseUrl,
            accountid: _accountid,
            loginRefresh: true, // 这个标志表示用loginbox登陆/注册后，是刷新还是ajax更新，默认是刷新，更好的帮助数据更新.
            reg: {
                name: '',
                password: '',
                confirmPassword: '',
                nickname: '',
                verifyCode: '',
                agree: 1,
                ckbAgree: true
            },
            errors: error, //list 格式的错误信息

            login: {
                name: '',
                password: '',
                verifyCode: '',
                autoLogin: 1,
                ckbAgree: true
            },

            pwd: {
                name: '',
                verifyCode: '',
                token : '',
                type : '',
                passwd : '',
                checkToken: '',
                timestamp:'',
                captcha:''
            },
            phone: {
                name:'',
                number: '',
                verifycode: '',
                token:'',
                type:'',
                checkToken: '',
                timestamp:'',
                captcha:''
            },

            changePwd: {
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
                oldErrMsg: '6~16个字符',
                newErrMsg: '6~16个字符',
                confirmErrMsg: '两次输入密码不匹配',
                isOldError: true,
                isNewError: true,
                isConfirmError : true
            },

            profile: {
                username: '',
                nickname: '',
                gender: ''
            },

            star: {
                gameid : 0,
                star : 0,
                content : '',
                attachment: ''
            },
            stars: [],
            posts: [],
            postPlugins: null,
            post: { //发帖时的内容
                content: '',
                attachment: '',
                tagid: 0,
                gameid: 0
            },
            postView: { // post/view page
                resid: '',
                countlikes: 0,
                isliked: 0
            },
            consumption: {//消费认证时的内容
                gameid: 0,
                currency: '',
                boardid: 8,
                attachment: '',
                content: '',
                star: 0
            },
            postImgs: [], //发帖时的图片
            starImgs: [], //发帖时的图片
            game: {
                gameid: 0,
                favorited: 0,
                isadd: 0
            },
            categorygames:[], //同类游戏推荐
            comments: [],
            loadcomments: {
                resid: '',
                seq: '',
                count: 0,
                lastpage: 0
            },
            comment: {
                content: '',
                reply: '',
                resid: '',
                atid: '',
                isre: 0
            },

            search: {
                keyword: ''
            }


        };

        //global method
        $scope.getModal = function($childScope, options){
            $childScope.model.errors = [];
            var modal = new Modal(options);

            modal.create($compile, $childScope);
            modal.show();

            $('input, textarea').placeholder();

            return modal;
        };

        $scope.showLoginBox = function(){
            $scope.model.errors = [];
            angular.element('#header-login').triggerHandler('click');
        };

        $scope.showMenu = function(){
            $("#user-center").addClass("open");
        };

        $scope.hiddenMenu = function(){
            $("#user-center").removeClass("open");
        };

        //同类游戏的换一批
        $scope.switchCategoryGame = function($event, gameid){
            if(gameid == 0 && typeof(_gameid) != 'undefined'){
                gameid = _gameid;
            } 
        }

    }
]);