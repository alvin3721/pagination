/**
 * Created by wWX318801 on 2017/1/23.
 */
angular.module("index.controller", []).controller('indexController',
    function ($scope) {
        $scope.totalCount = 1001;
        resultChanged();
        $scope.counter = 0;
        $scope.paging = function (data) {
            data = data || {pageSize: $scope.pageSize || 10, currentPage: $scope.currentPage || 1};

            //while totalCount changed but pageSize and currentPage are invariant，paging should be rendered again. To observe this case,click one button 5 times.
            //这是为了单独测试在pageSize和currentPage无变化时，totalCount变化导致的分页控件刷新,要观察这个效果，可以点击同一个按钮5次
            if (!(++$scope.counter % 5)) {
                $scope.totalCount += 10;
                resultChanged();
            }

            //what code beneath do is to simulate real table data. table data should be changed , while pageSize or currentPage changed.
            //以下代码是为了模拟真实的表格数据刷新情况，当页尺寸或当前页变化时，表格数据也需要变化，这样才更容易观察效果。
            $scope.results = $scope.allResult.filter(function (item) {
                return item >= (data.currentPage - 1) * data.pageSize && item < data.currentPage * data.pageSize;
            });
        };
        $scope.paging();

        //init all table data
        function resultChanged() {
            $scope.allResult = [];
            for (var i = 0; i < $scope.totalCount; i++) {
                $scope.allResult.push(i);
            }
        }
    });
