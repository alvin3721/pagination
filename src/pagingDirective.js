/**
 * Created by wWX318801 on 2017/1/23.
 */
var POSITIVE_INTEGER_NUM_EXP = /^(0+)?[1-9]([0-9]+)?$/;

angular.module('paging.directive', []).directive('ngPagination', function () {
    return {
        restrict: 'E',
        // this should be replaced by the place where the 'paging.html' file  at.
        //在使用时，这个地址需要替换成paging.html在真实项目中的位置
        //templateUrl: '../src/paging.html',

        //this is particular use with my test,you may not necessary to do like this.Instead, in your own application , you can just config like above line.
        //此处的配置仅仅是用于直接打开文件的测试，在真实应用中，可以配置成上面的样子
        templateUrl:'pagingTemplate',
        replace: true,
        //introduction at test/index.html  <ng:pagination>
        //介绍在 test/index.html  的<ng:pagination>元素上方
        scope: {
            callback: '&',
            totalCount: '@',
            pageSize: "=",
            currentPage: "="
        },
        link: function ($scope, element, attr) {
            // pageSize options must be a Number array
            // 页尺寸选项必须是数字数组
            $scope.pageSizeOption = (attr.pageSizeOption || "10,20,50,100").split(",").map(function (item) {
                return Number(item);
            });
            $scope.pagingBtnNum = Number(attr.pagingBtnNum || 7);
            $scope.currentPage = $scope.currentPage || 1;
            $scope.pageSize = $scope.pageSize || 10;
            $scope.hasRecord = true;
            $scope.showPaging = false;
            // 1 ...5 6 7 ... 101 clicked
            $scope.pagingClicked = function () {
                //点击非 ... 有效
                // invalid click '...'
                if (this.page.index != "...") {
                    $scope.currentPage = this.page.index;
                    this.$parent.pages.forEach(function (page) {
                        page.clazz = "";
                        if (page.index == $scope.currentPage) {
                            page.clazz = "cur";
                        }
                    });
                    $scope.callback({"data": {"currentPage": $scope.currentPage, "pageSize": $scope.pageSize}});
                }
            };

            // jump to previous page
            // 上一页
            $scope.preClicked = function () {
                if ($scope.currentPage > 1) {
                    $scope.currentPage = Number($scope.currentPage) - 1;
                    renderPagingAndCallBack();
                }
            };
            // jump to next page
            // 下一页
            $scope.nextClicked = function () {
                if ($scope.currentPage < $scope.totalPage) {
                    $scope.currentPage = Number($scope.currentPage) + 1;
                    renderPagingAndCallBack();
                }
            };

            //GO button clicked
            //点击 GO 按钮是触发
            $scope.goClicked = function () {
                //goPage must be a positive integer number
                //goPage 必须是大于0的正整数
                if (!POSITIVE_INTEGER_NUM_EXP.test($scope.goPage)) {
                    $scope.goPage = "";
                }
                //如果要跳转的页面不等于当前页、输入符合规范、不大于最大页数
                if ($scope.goPage && $scope.goPage != $scope.currentPage && $scope.goPage <= $scope.totalPage) {
                    $scope.currentPage = $scope.goPage;
                    renderPagingAndCallBack();
                }
            };

            //jump to first page
            //跳到首页
            $scope.firstClicked = function () {
                if ($scope.currentPage > 1) {
                    $scope.currentPage = 1;
                    renderPagingAndCallBack();
                }
            };
            //jump to last page
            //跳到尾页
            $scope.lastClicked = function () {
                if ($scope.currentPage < $scope.totalPage) {
                    $scope.currentPage = $scope.totalPage;
                    renderPagingAndCallBack();
                }
            };

            //if pageSize option changed then set currentPage to 1 and pageSize to changedValue
            //页尺寸变化时，设置当前页为1并且将页尺寸设为改变后的值
            $scope.pageSizeChanged = function (changedValue) {
                $scope.currentPage = 1;
                $scope.pageSize = changedValue;
                renderPagingAndCallBack()
            };

            function renderPagingAndCallBack() {
                $scope.pages.forEach(function (page) {
                    page.clazz = "";
                });
                $scope.callback({"data": {"currentPage": $scope.currentPage, "pageSize": $scope.pageSize}});
            }

            function renderPageNumbers() {
                $scope.pages = [];
                var curPage = Number($scope.currentPage);
                var halfPages = Math.floor($scope.pagingBtnNum / 2);
                if ($scope.totalPage <= $scope.pagingBtnNum) {
                    initPages(1, $scope.totalPage, curPage);
                }
                else {
                    if (curPage <= halfPages) {
                        initPages(1, halfPages + 2, curPage);
                        $scope.pages.push({"index": "...", "clazz": ""});
                        $scope.pages.push({"index": $scope.totalPage, "clazz": ""});
                    }
                    else if (curPage > $scope.totalPage - halfPages) {
                        $scope.pages.push({"index": 1, "clazz": ""});
                        $scope.pages.push({"index": "...", "clazz": ""});
                        initPages($scope.totalPage - (halfPages + 1), $scope.totalPage, curPage);
                    }
                    else {
                        $scope.pages.push({"index": 1, "clazz": ""});
                        $scope.pages.push({"index": "...", "clazz": ""});
                        initPages(curPage - (halfPages - 2), curPage + (halfPages - 2), curPage);
                        $scope.pages.push({"index": "...", "clazz": ""});
                        $scope.pages.push({"index": $scope.totalPage, "clazz": ""});
                    }
                }
            }

            function initPages(start, end, currentPage) {
                for (var i = start; i <= end; i++) {
                    if (currentPage == i) {
                        $scope.pages.push({"index": i, "clazz": "cur"});
                    }
                    else {
                        $scope.pages.push({"index": i, "clazz": ""});
                    }
                }
            }

            //总数发生变更时刷新分页控件
            $scope.$watch("totalCount", function (newValue) {
                if (newValue > 0) {
                    $scope.showPaging = true;
                    $scope.hasRecord = true;
                    $scope.totalPage = Math.ceil($scope.totalCount / $scope.pageSize);
                    //当总数变更时，若总页数小于当前页，将当前页设为最后一页
                    if ($scope.totalPage < $scope.currentPage) {
                        $scope.currentPage = $scope.totalPage;
                    }
                    renderPageNumbers();
                } else if (newValue) {
                    $scope.hasRecord = false;
                    $scope.showPaging = false;
                }
            });
            //当前页或页尺寸变更时刷新分页控件
            $scope.$watchGroup(["currentPage", "pageSize"], function () {
                $scope.totalPage = Math.ceil($scope.totalCount / $scope.pageSize);
                renderPageNumbers();
            });
        }
    };
});