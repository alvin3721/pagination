# 分页指令

##关键字

angularJs/分页指令

如何跑示例:

    下载并在浏览器中打开test/index.html.

用法:

    <ng:pagination callback="paging(data)" total-count="{{totalCount}}" page-size="pageSize" current-page="currentPage" page-size-option="10,15,20,50" paging-btn-num="11"></ng:pagination>
    
      callback 绑定一个函数，函数为你自定义的实现 .(必须)

      page-size/current-page 是双向绑定属性. (required)

      total-count 是一个单向绑定属性，因为它仅用与刷新分页控件，在分页内部，其值不会变化

      page-size-option 属性用于定义pageSize下拉框的选项，必须用，分开，且必须都为数字，默认10,20,50,100

      paging-btn-num 可以指定展示多少个分页按钮，默认7个.(optional).


    注意事项 :

        1.  test/index.html

                <!-- module属性是自定义的属性，其值为要引入的angularJs模块名,该值用于最终在bootstrapApp.js中启动多个自定义模块 -->
                <script src="../src/pagingDirective.js" module="paging.directive"></script>
                <script src="../test/index-controller.js" module="index.controller"></script>


                <!-- bootstrapApp.js中启动多个自定义模块,实际应用中，你可以不必这么做 -->
                <script src="../bootstrapApp.js" defer async="true"></script>

        2.  src/pagingDirective.js

                        //在使用时，这个地址需要替换成paging.html在真实项目中的位置
                        //templateUrl: '../src/paging.html',

                        //此处的配置仅仅是用于直接打开文件的测试，在真实应用中，可以配置成上面的样子
                        templateUrl:'pagingTemplate',

   查看看详细介绍和注意点，可以点击'clone or download'获取这个指令。有任何的反馈或问题，可以在issue板块上留言或发送邮件到wusihang9@gmail.com


