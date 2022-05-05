# vue3.0+ant design of vue前端后台管理框架模板

#### 介绍
vue3.0+ant design of vue2.0搭建的后台管理模板，接口按照RESTful API规范请求。
表格只需json配置配置配置就完事，内置表格内各种组件修改，基本满足大部分需求。

#### 软件架构
软件架构说明


#### 安装教程

1.  npm install
2.  cd xxx 
3.  npm run serve

#### 使用说明
```
mock数据的开关在config里面
开了就可以登录了，mock返回的数据在mock/controller文件里面
公共请求数据在store/modules/customData.js里面，把publicAPI等于[]则不会请求数据，主要功能为动态获取枚举值
```
#### 在线地址：
http://mrgreenz.cn:8081/

#### table组件里面的相关配置字段说明（可能有遗漏）

```

tableMessage: {
     config: { //总配置
         autoWidth: false,           //是否平均分每列宽度（true为是，false未否，少列建议自动分配宽度）
         ajaxInterface: 'shoparea', //每个table的请求接口( **必填** )
         openType: 'modal',         //打开编辑或者添加的模式为 弹窗或者页面（后期已经取消page，全部都是modal）,( **必填** )
         searchConfig: {            //搜索配置
           searchDate: true,        //是否显示时间搜索
           isToday: false,          //是否默认按照今天搜索时间
           inputText: [             //普通的文字搜索
             {
               key: 'shop_name',     //接口发送的字段名字
               value: '店铺',        //输入框左边的label文字
               inputType: 'text',    //输入的类型可选（text | number）
               inputValue: '',       //输入的值
             },
           ],
           select: [                     //下拉框搜索
             {
               selectKey: '商家',         //下拉框左边的label文字
               selectType: 'merchantapi', //下拉框内容的key值，动态生成在utils/enum.js里面，生成规则在utils/index.js里面的setPublicData方法
               requestKey:"merchant_id",   //请求的字段名字
               selectValue: '全部',        //请求的字段的值，默认是全部的时候，发送的值为''
             },
           ],
            selectInput: {               //带输入框的下拉框配置(左边为下拉框，右边为输入框)
              width: 200,                //整体宽度（不知道会不会生效，忘记了）
              options: [                 //左边下拉框的内容
                {
                  key: 'buyer_nick',     //请求发送的字段
                  value: '买家昵称',      //字段的label显示
                  inputValue: '',         //请求的字段的值
                  inputType: 'text',      //字段的类型可选（text | number）
                 },
               ],
             },
             doubleSelect: {              //两边都是下拉框的搜索（2021.05.07新增内容）
                width: 200,
                options: [                //内容和select一致
                  {
                    selectKey: '商家',
                    selectType: 'merchantapi',
                    requestKey:"merchant_id"
                    selectValue: '全部',
                    selectenum:"",
                  },
                ],
              },
         },
         operationConfig: [                        //位于搜索栏和表格的中间的那些操作类的东西（一般都是按钮，比如添加、导出之类的操作）
           //操作栏配置
           {
             type: 'normal',                       //操作的类型可选（normal：普通按钮（除了导出都是选这个） | export：导出按钮（导出文件选这个））
             text："按钮的文字",                    //按钮的文字（1.不填默认'添加'+页面title；2.text内容<=2时:'添加'+内容；3.长度>=4则=text）
             float: 'left',                        //按钮的位置（添加按钮在 左边，导出按钮在右边）；不填默认在左边；
             icon: 'ricloseline',                //按钮文字前面的图标
             clickEvent: 'addData',                //按钮的事件，添加都是addData，导出都是exportData，自定义的用blacklist（名字起得草率了）
             role:[301,201],                       //什么角色可以看见这个操作按钮
             ajaxInterface: 'order',               //弹出框最终提交的接口，（自定义弹框时用到，默认都是当前表格的接口）
             ajaxMethod: 'POST',                   //提交的方法，添加默认是post，导出默认是get，自定义弹框时用到
             paramsType:"file",                    //提交参数的类型，默认是json，只有在上传文件时才需要定义为file，一般不需要填写这个参数。
             specialKeys:{shop_id:"searchKey"},    //特殊参数：弹出框提交时固定的一个参数，searchKey表示从缓存中的取字段，目前只有searchKey可填
             modalWidth:1200,                      //弹出框的宽度，默认850px
             extData:[],                           //拓展数据：当表格的某些字段没有时，需要额外加在extData里面才会显示在弹框上面.内容格式参考tableData
             extDataMode:'cover',                  //选择拓展数据的添加方式，cover：覆盖，push：追加上去，默认push
                 ...不知道还有没有遗漏
             ]
           },
         ],
       },
     tableData: [                                   //表格数据，添加和编辑时弹出框内容基本都是由tableData提供的，除了一些特殊弹框。
       {
          align:'center',                           //默认值：left，可选 center | left | right,(ant自带)
          title: '追评状态',                         //表头,(ant自带)( **必填** )
          ruleType: 'number',                       //最终提交时检测内容类型，可选（number | text | dateRange|string）,dateRange:时间范围,string=text
          rowType: 'button',                        //数据类型，可选（editColumns | select | img | button | allRowEdit | operation）( **必填** )
          showEditPage: true,                       //是否展示在编辑或者添加时候展示出来
          required: true,                           //表单内是否必填（ant自带）
          dataIndex: 'add_state',                   //字段名（ant自带，注意：请不要使用 title 作为dataIndex，已经有同名的title插槽了。）( **必填** )
          operation:true                            //是否为操作列，（ant自带）
          operationList: [                          //操作列表：编辑、删除之类的按钮，通常在表格的最后面
            {                                       
              text: '删除',                          //按钮内容文字
              clickType: 'delete',                   //按钮的事件类型（edit|delete|verify|custom）,常用edit和delete，自定义为custom
              clickEvent: 'onDelete',                //事件名字，需要在tableComponent里面定义
              title: '确定要删除此条信息吗？？',       //删除需要使用的弹窗提示内容信息，其他类型不需要
              condition:"record['state']==0",        //类似sql语句判断按钮是否可点击
              ajaxInterface:"auditredpacket",        //参考operationConfig
              ajaxMethod:"post",                     //参考operationConfig
              role:[201,301,302],                    //用户角色在此权限集之中则显示，不设置role则默认显示
              extData:[],                            //参考operationConfig
            },
          ],
          role:[201,301,302],              //与config.isEdit字段挂钩，用户角色的权限在此role权限集之中，并且isEdit为true。 不写role则默认所有角色都可以访问
          config: {                                 //# 自定义配置内容，主要配置弹出框的内容，大部分为编辑和添加时 ( **除了operation，其他必填** )
            orderBy:"upload_comments",              //自定义排序，当前表示添加或者编辑时排序在upload_comoments下面
            displayItem: ['refund_days'],           //选择完之后显示谁，以这个属性判断某个属性是否需要与其联动，当type为button || select时有效,默认1显示0隐藏
            displayItemShow:[{refund_days:[3]}],    //可选[number | object],如果有多个单选框要显示同一个东西，应该使用数组套json模式，number时覆盖默认
            changeRequestAPI:{shop_name:'shopapi'}, //下拉改变时，数据也以这个名字存放在store、enum的地方,即动态添加枚举，与displayItem配合使用
            isEdit: false,                          //控制表格内容是否可编辑状态。（内容旁边会多出一个编辑的图标，不是在弹出框里面哦）
            type: 'button', //当前数据在弹出框展示的类型，可选(button|select|number|text|datetime|date|dateRange|datetimeRange|img|imgList|uploadFile)
( **必填** )
            width: '150',                           //宽度，默认400px;(建议不修改)
            noStyle:true,                           //表格展示的样式，type为button时生效，1为绿色，0为灰色，主要是与可编辑状态区分开来（写急了，可优化去掉）
            buttonBg: 'green',                      //背景颜色，和noStyle只取一个，type为button时生效；
            enumType: 'add_state',                  //枚举类型，需要在enum.js里面定义，否则没有会报错，type为button和select使用，其他类型不需要此字段
            requestKey：'shop_id',                  //请求的字段，覆盖掉dataIndex，type为button和select使用，其他类型不需要此字段，和enumType配合使用
            defaultValue: 0,                        //默认值，所有类型适用，button或者select都是数字类型
            value: '',                              //存的值，type=(select|button|dateRange|switch)类型使用
            showMosaic：false,                      // # 图片类型相关字段，是否显示马赛克编辑
            width：50,                              // # 图片类型相关字段，图片展示在表格里面的宽度，type决定width为谁所用
            height：50,                             // # 图片类型相关字段，图片展示在表格里面的高度
            showImgTip：true,                       // # 图片类型相关字段，鼠标移动到图片上时是否放大缩略图
            fileList：[],                           // # 图片类型相关字段，存放图片的数组
            previewVisible：false,                  // # 图片类型相关字段，存放图片上传后点击放大和缩小的状态
            previewImage:'',                        // # 图片类型相关字段，存放图片上传后点击放大和缩小的图片资源
            uploadUrl:'/uploadImage/'               // # 图片类型相关字段，上传图片的接口
            accept：'application/vnd.msexcel'      // # 图片类型相关字段，限制上传文件时选取文件的类型
            acceptType：'excel'                     // # 图片类型相关字段，上传文件时检查文件的格式
           },
           slots: {                                 //表格的自定义插槽，tableData必需要添加，添加、编辑 和 description 里面可去掉
             customRender: 'add_state',             //自定义插槽名字，必须与dataIndex保持一致
           },
         },
         description:[]                             //参考tableData
       ],
     },
```


```
//一些类型字段解释：
{
    button:单选框,
    select:下拉框,
    number:数字,
    text:文字,
    datetime:时间,
    date:日期,
    dateRange:日期范围,
    datetimeRange:时间范围,
    img:图片类型,
    imgList:批量上传图片类型,
    uploadFile:文件类型,
}
```
# vue3.0-AntDesign-
# vue3.0-AntDesign-
# vue3.0-AntDesign
