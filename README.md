# pagination
angularJs分页指令(angularJs paging/pagination directive/plugin)

How to run example:

    download and open test/index.html with your browser.

Usage:

    <ng:pagination callback="paging(data)" total-count="{{totalCount}}" page-size="pageSize" current-page="currentPage" page-size-option="10,15,20,50" paging-btn-num="11"></ng:pagination>
    
      callback is function binding. It binds your own business implements.(required) 
      callback 绑定一个函数，函数为你自定义的实现 .(必须)

      page-size/current-page are two-way binding attributes. (required)
      page-size/current-page 是双向绑定属性. (required)

      total-count is a one-way binding attributes,because it's used to render paging directive and it's value invariant inside the directive
      total-count 是一个单向绑定属性，因为它仅用与刷新分页控件，在分页内部，其值不会变化

      page-size-option allows you define your pageSize selector options. It must separated by ','.(optional) (default:10,20,50,100)
      page-size-option 属性用于定义pageSize下拉框的选项，必须用，分开，且必须都为数字，默认10,20,50,100

      paging-btn-num allows you define the button number you want. It must be a positive integer num.(optional) (default:7)
      paging-btn-num 可以指定展示多少个分页按钮，默认7个.(optional).


    Notices :

        1.  test/index.html

                <!-- module attribute is set by angular module name witch is defined by yourself. -->
                <!-- module属性是自定义的属性，其值为要引入的angularJs模块名,该值用于最终在bootstrapApp.js中启动多个自定义模块 -->
                <script src="../src/pagingDirective.js" module="paging.directive"></script>
                <script src="../test/index-controller.js" module="index.controller"></script>


                <!-- defer here is to bootstrap Angular Modules later. the reason of importing this file is to load modules whatever you want.-->
                <!-- bootstrapApp.js中启动多个自定义模块,实际应用中，你可以不必这么做 -->
                <script src="../bootstrapApp.js" defer async="true"></script>

        2.  src/pagingDirective.js

                        // this should be replaced by the place where the 'paging.html' file  at.
                        //在使用时，这个地址需要替换成paging.html在真实项目中的位置
                        //templateUrl: '../src/paging.html',

                        //this is particular use with my test,you may not necessary to do like this.Instead, in your own application , you can just config like above line.
                        //此处的配置仅仅是用于直接打开文件的测试，在真实应用中，可以配置成上面的样子
                        templateUrl:'pagingTemplate',

    For all introductions and notices,you can click 'clone or download' to get this directive. Any feedback or questions, you can post you issue or email me at wusihang9@gmail.com
    想查看详细介绍和注意点，可以点击'clone or download'获取这个指令。有任何的反馈或问题，可以在issue板块上留言或发送邮件到wusihang9@gmail.com


