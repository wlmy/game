//添加回车事件
StApp.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});
StApp.controller('searchInfo',['$scope', '$http', '$q', '$compile', '$timeout', function($scope, $http, $q, $compile, $timeout) {
    $scope.key = '';
    $scope.showInfo = false;
    $(document).bind("click",function(e){
        var target = $(e.target);
        if (target.closest("#show-search").length == 0 && target.closest("#header-search").length == 0 || (target.attr("href") !== undefined || target.closest('a').length > 0) ) {
            $("#show-search").addClass('hidden');
            $(".search-icon").animate({left: "81px"}, 200);
            $("#header-search").animate({
                width: "80px"
            }, 200, function () {
                $scope.model.search.keyword = '';
                $scope.$apply();
            });
        }
    });

    $("#show-search").delegate('#show-search','click',function(){
        $(this).addClass('hidden');
    });

    var searchTimeOut;
    var searchFrame = false;
    $scope.$watch('model.search.keyword', function (keyword) {
        if (searchTimeOut) {
            $timeout.cancel(searchTimeOut);
        }
        if (keyword != '') {
            searchTimeOut = $timeout(function () {
                var deferred = $q.defer();
                var deferred1 = $q.defer();
                var promise = deferred.promise;
                var promise1 = deferred1.promise;
                promise.then(function () {
                    $scope.getSearchInfo();
                    deferred1.reject();
                }, function () {

                    $http({method: "GET", url: "/box/searchQuick"}).success(function (data) {
                        var searchDom = angular.element(data.data.html);
                        searchDom = $compile(searchDom)($scope);
                        searchDom.appendTo($(".search-form"));
                        searchFrame =true;
                        deferred1.resolve();
                    });
                });
                $q.when(promise1, function () {
                    $scope.getSearchInfo();
                }, function () {
                    return false;
                });
                if ($('#show-search').length == 0 && searchFrame == false)
                    deferred.reject();
                else
                    deferred.resolve();
                if(keyword == '')
                    $scope.showInfo = false;
            }, 350);
        }else {
            $scope.showInfo = false;
        }
    });

    $scope.start = function(){
        if($scope.model.search.keyword == ''){
            Utility.showMsgBox('请填搜索关键字');
            $('#header-search').addClass('search-form-error');
        }else{
            $.post('/game/searchGame',$scope.model.search, function(data) {
                data = JSON.parse(data);
                if (data.code != 0) {
                    Utility.showMsgBox('请填搜索关键字');
                    $('#header-search').addClass('search-form-error');
                    return;
                }
                var k = encodeURIComponent($scope.model.search.keyword);
                self.location.href = "/game/searchgame/key/" + k;
            })
        }
    };

    $scope.getFocus = function(){
        //$(".search-form").addClass("search-focus");
        $(".search-icon").animate({left:"161px"}, 200);
        $("#header-search").animate({
            width:"160px"
        }, 200, function(){

        });
    };

    $scope.getSearchInfo = function () {
        $.post("/game/searchQuick", $scope.model.search, function(data){
            $scope.infos = data.data;
            $('#header-search').removeClass('search-form-error');
            $scope.showInfo = true;
            $scope.$apply();
            $("#show-search").removeClass('hidden');
        },"json");
    }
}]);
