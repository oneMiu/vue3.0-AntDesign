<template>
  <ATable :tableMessage="tableMessage"></ATable>
</template>

<script>
  import ATable from '@/components/tableComponent.vue'
  export default {
    components: {
      ATable,
    },
    data() {
      return {
        tableMessage: {
          config: {
            //总配置
            autoWidth: false, //平均分每列宽度
            ajaxInterface: 'evaluatetask', //接口
            openType: 'modal', //打开编辑或者添加的模式为 弹窗或者页面 "modal" ||"page"
            searchConfig: {
              //搜索配置
              searchDate: true, //是否显示事件
              isToday: false, //是否是今天
              selectInput: {
                //带输入框的下拉框配置
                width: 200,
                options: [
                  {
                    key: 'item_name',
                    value: '商品名',
                    inputType: 'text',
                    inputValue: '',
                  },
                  {
                    key: 'task_id',
                    value: '任务ID',
                    inputValue: '',
                    inputType: 'number',
                  },
                ],
              },
              select: [
                 {
                  selectKey: '店铺',
                  selectType: 'shopapi',
                  requestKey:"shop_id",
                  selectValue: '全部',
                },
              ],
            },
            operationConfig: [
              {
                type: 'normal',
                icon: 'ri-close-line',
                clickEvent: 'addData',
                role:[201,301,302],
                extData:[
                  {
                    title: '上传主评图片',
                    dataIndex:"upload_comments",
                    ruleType: 'string', //编辑时的类型
                    rowType: 'img',
                    showEditPage: true,
                    config: {
                      orderBy:"comments",
                      type: 'imgList',
                      width: 30,
                      height: 30,
                      showImgTip:true,
                      clickEvent: 'showImg',
                      uploadUrl: '/uploadpictures',
                      imgList:[
                        {key:"comments1_url",value:""},
                        {key:"comments2_url",value:""},
                        {key:"comments3_url",value:""},
                        {key:"comments4_url",value:""},
                        {key:"comments5_url",value:""},
                        {key:"comments6_url",value:""},
                      ],
                      fileList: [],
                      previewVisible: false,
                      previewImage: '',
                      accept: 'image/png,image/jpg,image/jpeg',
                    },
                  },
                  {
                    title: '上传追评图片',
                    dataIndex: "upload_add_comments",
                    ruleType: 'string', //编辑时的类型
                    rowType: 'img',
                    showEditPage: true,
                    config: {
                      type: 'imgList',
                      orderBy:"add_comments",
                      width: 30,
                      height: 30,
                      showImgTip:true,
                      clickEvent: 'showImg',
                      uploadUrl: '/uploadpictures',
                      imgList:[
                        {key:"add_comments1_url",value:""},
                        {key:"add_comments2_url",value:""},
                        {key:"add_comments3_url",value:""},
                        {key:"add_comments4_url",value:""},
                        {key:"add_comments5_url",value:""},
                        {key:"add_comments6_url",value:""},
                      ],
                      fileList: [],
                      previewVisible: false,
                      previewImage: '',
                      accept: 'image/png,image/jpg,image/jpeg',
                    },
                  },
                ]
              },
              // {
              //   type: 'normal',
              //   text: '上传文件',
              //   float: 'right',
              //   icon: 'ri-close-line',
              //   ajaxInterface: 'order',
              //   clickEvent: 'blacklist',
              //   ajaxMethod: 'POST',
              //   paramsType:"file",
              //   role:[201,301,302],
              //   extData: [
              //     {
              //       align:'center',
              //       title: '店铺',
              //       rowType: 'number',
              //       ruleType:"number",
              //       showEditPage: true,
              //       required: true,
              //       dataIndex: 'shop_name',
              //       config: {
              //         displayItem: ['item_name'], //选择完之后显示谁！以这个属性判断某个属性是否需要与其联动！
              //         changeRequestAPI: { item_name: 'itemapi' }, //下拉改变时，数据也以这个名字存放在store、enum的地方
              //         type: 'select',
              //         enumType: 'shopapi',
              //         requestKey: 'shop_id',
              //         value: '',
              //       },
              //     },
              //     {
              //       align:'center',
              //       title: '商品',
              //       rowType: 'number',
              //       ruleType:'number',
              //       showEditPage: true,
              //       required: true,
              //       dataIndex: 'item_name',
              //       config: {
              //         hidden: true, //是否显示,true=>隐藏 else false =>显示
              //         type: 'select',
              //         enumType: 'itemapi',
              //         requestKey: 'item_id',
              //         value: '',
              //       },
              //     },
              //     {
              //       key: 'mobile',
              //       title: '上传文件',
              //       rowType: 'uploadFile',
              //       ruleType:"file",
              //       required: true,
              //       showEditPage: true,
              //       dataIndex: 'file',
              //       config: {
              //         fileList:[],
              //         type: 'uploadFile',
              //         uploadUrl: '/order/',
              //         accept:
              //           'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv',
              //         acceptType: 'excel',
              //       },
              //     },
              //   ],
              // },
              {
                type: 'export',
                role:[201,301,302],
                float: 'right',
                icon: 'ri-close-line',
                clickEvent: 'exportData',
                extData: [],
              },
            ]
          },
          tableData: [
            {
              align:'center',
              title: '时间',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'create_time',
              width:150,
              config: {
                type: 'datetime',
                value: '',
              },
              slots: {
                customRender: 'create_time',
              },
            },
            {
              align:'center',
              title: '店铺',
              rowType: 'number',
              ruleType:"number",
              showEditPage: true,
              required: true,
              dataIndex: 'shop_name',
              width:100,
              config: {
                displayItem: ['item_name'], //选择完之后显示谁！以这个属性判断某个属性是否需要与其联动！
                changeRequestAPI: { item_name: 'itemapi' }, //下拉改变时，数据也以这个名字存放在store、enum的地方
                type: 'select',
                enumType: 'shopapi',
                requestKey: 'shop_id',
                value: '',
              },
              slots: {
                customRender: 'shop_name',
              },
            },
            {
              align:'center',
              title: '商品',
              rowType: 'number',
              ruleType:'number',
              showEditPage: true,
              required: true,
              dataIndex: 'item_name',
              width:100,
              sliceNum:5,
              config: {
                hidden: true, //是否显示,true=>隐藏 else false =>显示
                type: 'select',
                enumType: 'itemapi',
                requestKey: 'item_id',
                value: '',
              },
              slots: {
                customRender: 'item_name',
              },
            },
            {
              align:'center',
              title: 'SKU',
              rowType: 'text',
              showEditPage: true,
              dataIndex: 'sku_id',
              width:60,
              config: {
                type: 'text',
              },
              slots: {
                customRender: 'sku_id',
              },
            },
            {
              align:'center',
              title: '任务ID',
              rowType: 'text',
              showEditPage: false,
              required: true,
              dataIndex: 'id',
              config: {
                type: 'text',
              },
              slots: {
                customRender: 'id',
              },
            },
            {
              align:'center',
              title: '买家昵称',
              rowType: 'text',
              showEditPage: true,
              dataIndex: 'buyer_nick',
              width:100,
              config: {
                orderBy:"sku_id",
                type: 'textarea',
                question:"一行一个买家昵称",
                placeholder:"一行一个买家昵称",
              },
              slots: {
                customRender: 'buyer_nick',
              },
            },
             {
              align:'center',
              title: '主评语',
              rowType: 'text',
              showEditPage: true,
              required: true,
              width:100,
              dataIndex: 'comments',
              config: {
                orderBy:"buyer_nick",
                type: 'textarea',
              },
              slots: {
                customRender: 'comments',
              },
            },
            {
              align:'center',
              title: '评价1',
              dataIndex: 'comments1_url',
              ruleType: 'string', //编辑时的类型
              rowType: 'img',
              showEditPage: false,
              required: true,
              config: {
                type: 'img',
                width: 60,
                height: 60,
              showImgTip:true,
                clickEvent: 'showImg',
                uploadUrl: '/uploadpictures',
                fileList: [],
                previewVisible: false,
                previewImage: '',
                accept: 'image/png,image/jpg,image/jpeg',
              },
              slots: {
                customRender: 'comments1_url',
              },
            },
            {
              align:'center',
              title: '评价2',
              dataIndex: 'comments2_url',
              ruleType: 'string', //编辑时的类型
              rowType: 'img',
              showEditPage: false,
              required: true,
              config: {
                type: 'img',
                width: 60,
                height: 60,
              showImgTip:true,
                clickEvent: 'showImg',
                uploadUrl: '/uploadpictures',
                fileList: [],
                previewVisible: false,
                previewImage: '',
                accept: 'image/png,image/jpg,image/jpeg',
              },
              slots: {
                customRender: 'comments2_url',
              },
            },
            {
              align:'center',
              title: '评价3',
              dataIndex: 'comments3_url',
              ruleType: 'string', //编辑时的类型
              rowType: 'img',
              showEditPage: false,
              required: true,
              config: {
                type: 'img',
                width: 60,
                height: 60,
              showImgTip:true,
                clickEvent: 'showImg',
                uploadUrl: '/uploadpictures',
                fileList: [],
                previewVisible: false,
                previewImage: '',
                accept: 'image/png,image/jpg,image/jpeg',
              },
              slots: {
                customRender: 'comments3_url',
              },
            },
            {
              align:'center',
              title: '评价4',
              dataIndex: 'comments4_url',
              ruleType: 'string', //编辑时的类型
              rowType: 'img',
              showEditPage: false,
              required: true,
              config: {
                type: 'img',
                width: 60,
                height: 60,
              showImgTip:true,
                clickEvent: 'showImg',
                uploadUrl: '/uploadpictures',
                fileList: [],
                previewVisible: false,
                previewImage: '',
                accept: 'image/png,image/jpg,image/jpeg',
              },
              slots: {
                customRender: 'comments4_url',
              },
            },
            {
              align:'center',
              title: '评价5',
              dataIndex: 'comments5_url',
              ruleType: 'string', //编辑时的类型
              rowType: 'img',
              showEditPage: false,
              required: true,
              config: {
                type: 'img',
                width: 60,
                height: 60,
              showImgTip:true,
                clickEvent: 'showImg',
                uploadUrl: '/uploadpictures',
                fileList: [],
                previewVisible: false,
                previewImage: '',
                accept: 'image/png,image/jpg,image/jpeg',
              },
              slots: {
                customRender: 'comments5_url',
              },
            },
            {
              align:'center',
              title: '评价6',
              dataIndex: 'comments6_url',
              ruleType: 'string', //编辑时的类型
              rowType: 'img',
              showEditPage: false,
              required: true,
              config: {
                type: 'img',
                width: 60,
                height: 60,
              showImgTip:true,
                clickEvent: 'showImg',
                uploadUrl: '/uploadpictures',
                fileList: [],
                previewVisible: false,
                previewImage: '',
                accept: 'image/png,image/jpg,image/jpeg',
              },
              slots: {
                customRender: 'comments6_url',
              },
            },            
             {
              align:'center',
              title: '佣金',
              rowType: 'number',
              ruleType:'number',
              showEditPage: true,
              required: true,
              dataIndex: 'commission',
              config: {
                type: 'number',
              },
              slots: {
                customRender: 'commission',
              },
            },
            {
              align:'center',
              title: '状态',
              ruleType: 'number',
              rowType: 'button',
              showEditPage: false,
              required: true,
              dataIndex: 'state',
              config: {
                isEdit: true,
                type: 'button',
                width: '150',
                size: 'default',
                noStyle:true,
                buttonBg: 'green',
                enumType: 'state__4',
                defaultValue: 0,
                value: '',
              },
              slots: {
                customRender: 'state',
              },
            },
            {
              align:'center',
              title: '备注',
              dataIndex: 'note',
              required: false,
              width:80,
              rowType: 'editColumns',
              showEditPage: true,
              config: {
                orderBy:"last_time",
                isEdit: true,
                type: 'text',
                size: 'default',
                value: '',
              },
              slots: {
                customRender: 'note',
              },
            },
            {
              align:'center',
              title: '激活',
              ruleType: 'number',
              rowType: 'button',
              showEditPage: false,
              required: true,
              dataIndex: 'is_activate',
              config: {
                isEdit: true,
                type: 'button',
                width: '150',
                size: 'default',
                buttonBg: 'green',
                enumType: 'is_activate',
                defaultValue: 0,
                value: '',
              },
              slots: {
                customRender: 'is_activate',
              },
            },
            {
              align:'center',
              // fixed: 'right',
              title: '操作',
              width: 150,
              rowType: 'operation',
              dataIndex: 'operation',
              operation: true,
              operationList: [
                //操作列表（按钮啥的）
                {
                  text: '编辑',
                  clickType: 'edit',
                  clickEvent: 'editRow',
                  extData:[
                    {
                      title: '上传图片',
                      dataIndex:"upload_comments",
                      ruleType: 'string', //编辑时的类型
                      rowType: 'img',
                      showEditPage: true,
                      config: {
                        orderBy:"comments",
                        type: 'imgList',
                        width: 30,
                        height: 30,
                        showImgTip:true,
                        clickEvent: 'showImg',
                        uploadUrl: '/uploadpictures',
                        imgList:[
                          {key:"comments1_url",value:""},
                          {key:"comments2_url",value:""},
                          {key:"comments3_url",value:""},
                          {key:"comments4_url",value:""},
                          {key:"comments5_url",value:""},
                          {key:"comments6_url",value:""},
                        ],
                        fileList: [],
                        previewVisible: false,
                        previewImage: '',
                        accept: 'image/png,image/jpg,image/jpeg',
                      },
                    },
                    {
                      title: '上传追评图片',
                      dataIndex: "upload_add_comments",
                      ruleType: 'string', //编辑时的类型
                      rowType: 'img',
                      showEditPage: true,
                      config: {
                        orderBy:"add_comments",
                        type: 'imgList',
                        width: 30,
                        height: 30,
                        showImgTip:true,
                        clickEvent: 'showImg',
                        uploadUrl: '/uploadpictures',
                        imgList:[
                          {key:"add_comments1_url",value:""},
                          {key:"add_comments2_url",value:""},
                          {key:"add_comments3_url",value:""},
                          {key:"add_comments4_url",value:""},
                          {key:"add_comments5_url",value:""},
                          {key:"add_comments6_url",value:""},
                        ],
                        fileList: [],
                        previewVisible: false,
                        previewImage: '',
                        accept: 'image/png,image/jpg,image/jpeg',
                      },
                    },
                  ]
                },
                {
                  text: '删除',
                  clickType: 'delete',
                  clickEvent: 'onDelete',
                  title: '确定要删除此条信息吗？？',
                },
              ],
              slots: {
                customRender: 'operation',
              },
            },
          ],
          description:[        
            {
              align:'center',
              title: '间隔分钟',
              rowType: 'number',
              showEditPage: true,
              required: true,
              dataIndex: 'receive_minute',
              config: {
                orderBy:"commission",
                type: 'number',
                defaultValue:1440,
              },
              slots: {
                customRender: 'receive_minute',
              },
            },
            {
              align:'center',
              title: '达标比例',
              rowType: 'number',
              ruleType:"number",
              showEditPage: true,
              required: true,
              dataIndex: 'rate',
              config: {
                orderBy:"receive_minute",
                type: 'number',
                defaultValue:5,
                min:0,
                max:8,
              },
              slots: {
                customRender: 'rate',
              },
            },
            {
              align:'center',
              title: '使用次数',
              dataIndex: 'receive_count',
              required: true,
              rowType: 'number',
              showEditPage: true,
              config: {
                orderBy:"receive_minute",
                type: 'number',
                size: 'default',
                defaultValue:3,
                value: '',
              },
              slots: {
                customRender: 'receive_count',
              },
            },
             {
              align:'center',
              title: '最后时间',
              rowType: 'text',
              showEditPage: false,
              required: true,
              dataIndex: 'last_time',
              config: {
                type: 'text',
              },
              slots: {
                customRender: 'last_time',
              },
            },
            {
              align:'center',
              title: '追评状态',
              ruleType: 'number',
              rowType: 'button',
              showEditPage: true,
              required: true,
              dataIndex: 'add_state',
              config: {
                orderBy:"upload_comments",
                displayItem: ['upload_add_comments','add_comments'],
                isEdit: false,
                type: 'button',
                width: '150',
                size: 'default',
                noStyle:true,
                buttonBg: 'green',
                enumType: 'add_state',
                defaultValue: 0,
                value: '',
              },
              slots: {
                customRender: 'add_state',
              },
            },
            {
              align:'center',
              title: '追加评语',
              rowType: 'text',
              showEditPage: true,
              required: false,
              dataIndex: 'add_comments',
              config: {
                orderBy:"add_state",
                type: 'textarea',
              },
              slots: {
                customRender: 'add_comments',
              },
            },
            {
              align:'center',
              title: '追加图片1',
              dataIndex: 'add_comments1_url',
              ruleType: 'string', //编辑时的类型
              rowType: 'img',
              showEditPage: false,
              required: true,
              config: {
                type: 'img',
                width: 60,
                height: 60,
              showImgTip:true,
                clickEvent: 'showImg',
                uploadUrl: '/uploadpictures',
                fileList: [],
                previewVisible: false,
                previewImage: '',
                accept: 'image/png,image/jpg,image/jpeg',
              },
              slots: {
                customRender: 'add_comments1_url',
              },
            },
            {
              align:'center',
              title: '追加图片2',
              dataIndex: 'add_comments2_url',
              ruleType: 'string', //编辑时的类型
              rowType: 'img',
              showEditPage: false,
              required: true,
              config: {
                type: 'img',
                width: 60,
                height: 60,
              showImgTip:true,
                clickEvent: 'showImg',
                uploadUrl: '/uploadpictures',
                fileList: [],
                previewVisible: false,
                previewImage: '',
                accept: 'image/png,image/jpg,image/jpeg',
              },
              slots: {
                customRender: 'add_comments2_url',
              },
            },
            {
              align:'center',
              title: '追加图片3',
              dataIndex: 'add_comments3_url',
              ruleType: 'string', //编辑时的类型
              rowType: 'img',
              showEditPage: false,
              required: true,
              config: {
                type: 'img',
                width: 60,
                height: 60,
              showImgTip:true,
                clickEvent: 'showImg',
                uploadUrl: '/uploadpictures',
                fileList: [],
                previewVisible: false,
                previewImage: '',
                accept: 'image/png,image/jpg,image/jpeg',
              },
              slots: {
                customRender: 'add_comments3_url',
              },
            },
            {
              align:'center',
              title: '追加图片4',
              dataIndex: 'add_comments4_url',
              ruleType: 'string', //编辑时的类型
              rowType: 'img',
              showEditPage: false,
              required: true,
              config: {
                type: 'img',
                width: 60,
                height: 60,
              showImgTip:true,
                clickEvent: 'showImg',
                uploadUrl: '/uploadpictures',
                fileList: [],
                previewVisible: false,
                previewImage: '',
                accept: 'image/png,image/jpg,image/jpeg',
              },
              slots: {
                customRender: 'add_comments4_url',
              },
            },
            {
              align:'center',
              title: '追加图片5',
              dataIndex: 'add_comments5_url',
              ruleType: 'string', //编辑时的类型
              rowType: 'img',
              showEditPage: false,
              required: true,
              config: {
                type: 'img',
                width: 60,
                height: 60,
              showImgTip:true,
                clickEvent: 'showImg',
                uploadUrl: '/uploadpictures',
                fileList: [],
                previewVisible: false,
                previewImage: '',
                accept: 'image/png,image/jpg,image/jpeg',
              },
              slots: {
                customRender: 'add_comments5_url',
              },
            },
            {
              align:'center',
              title: '追加图片6',
              dataIndex: 'add_comments6_url',
              ruleType: 'string', //编辑时的类型
              rowType: 'img',
              showEditPage: false,
              required: true,
              config: {
                type: 'img',
                width: 60,
                height: 60,
              showImgTip:true,
                clickEvent: 'showImg',
                uploadUrl: '/uploadpictures',
                fileList: [],
                previewVisible: false,
                previewImage: '',
                accept: 'image/png,image/jpg,image/jpeg',
              },
              slots: {
                customRender: 'add_comments6_url',
              },
            },
          ]
        },
      }
    },
  }
</script>
