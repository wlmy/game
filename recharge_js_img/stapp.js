/**
 *
 * @type StApp
 */

//it's angular global app variable
StApp = angular.module('StApp', ['$httpProvider', function($httpProvider){
    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    /**
     * The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */
    var param = function(obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

        for(name in obj) {
            value = obj[name];

            if(value instanceof Array) {
                for(i=0; i<value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if(value instanceof Object) {
                for(subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if(value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function(data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
}]);
angular.extend(StApp.requires, StApp.requires, ['utilityProvider', 'modalProvider', 'ngSanitize']);

StApp.filter('imageSize', function(){
    return function(input, size){
        if(typeof(size) == 'undefined')
            return '';

        var getImageByMode = function($orginalUrl, $model){
            //如果是空头像，则直接返回空的。
            if($orginalUrl == '') return $orginalUrl;

            //如果是外部的地址，直接返回.
            var g1 = /gamexhb\.com/i;
            var g2 = /hdurl\.me/i;
            if(g1.test($orginalUrl) !== true && g2.test($orginalUrl) !== true){
                return $orginalUrl;
            }

            $pos = $orginalUrl.lastIndexOf('.');
            $before = $orginalUrl.substr(0, $pos);
            $after = $orginalUrl.substr($pos);

            return $before + '_' + $model + $after;
        };

        var getAvatar = function($orginalUrl){
            $avatar = getImageByMode($orginalUrl, 's');
            if($avatar == ''){
                $avatar = _staticBaseUrl + '/images/avatar/01.jpg';
            }

            return $avatar;
        };

        return size == 'A' ? getAvatar(input) : getImageByMode(input, size);
    };
});
