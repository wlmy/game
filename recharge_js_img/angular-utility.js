/**
 * Author: Daniel Qin<xin.qin@qinx.org>
 * Created 14/10/24 上午10:37.
 */

angular.module('utilityProvider', [])
    .factory('Utility', function(){
        var obj = {
            test: function(){
                console.log('test');
            }
        };

        return obj;
    });