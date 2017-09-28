StApp.controller('RechargeCtl',['$scope', '$compile',
    function($scope, $compile){
        $scope.recharges = [
            {
                'filterId': 1,
                'recharge': '6元'
            },
            {
                'filterId': 2,
                'recharge': '12元'
            },
            {
                'filterId': 3,
                'recharge': '30元'
            },
            {
                'filterId': 4,
                'recharge': '68元'
            },
            {
                'filterId': 5,
                'recharge': '98元'
            },
            {
                'filterId': 5,
                'recharge': '998元'
            }
        ];
        $scope.rechargeSelected = 0;
        $scope.select= function(index) {
            $scope.rechargeSelected = index;
        };

        $scope.payTips = function() {
            Utility.showMsgBox("网站充值功能暂未开通，请前往游戏内进行充值");
        }
    }
]);