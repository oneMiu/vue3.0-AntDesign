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
            ajaxInterface: 'task', //接口
            openType: 'modal', //打开编辑或者添加的模式为 弹窗或者页面 "modal" ||"page"
            searchConfig: {
              //搜索配置
              searchDate: true, //是否显示事件
              isToday: true, //是否是今天
              selectInput: {
                //带输入框的下拉框配置
                width: 200,
                options: [
                  {
                    key: 'buyer_nick',
                    value: '买家昵称',
                    inputValue: '',
                    inputType: 'text',
                  },
                  {
                    key: 'tid',
                    value: '订单号',
                    inputValue: '',
                    inputType: 'number',
                  },
                  {
                    key: 'item_name',
                    value: '商品名',
                    inputType: 'text',
                    inputValue: '',
                  },
                  {
                    key: 'num_iid',
                    value: '商品ID',
                    inputValue: '',
                    inputType: 'number',
                  },
                  {
                    key: 'kd',
                    value: '关键字',
                    inputValue: '',
                    inputType: 'text',
                  },
                  {
                    key: 'mobile',
                    value: '手机号',
                    inputValue: '',
                    inputType: 'number',
                  },
                ],
              },
              doubleSelect: {
                width: 200,
                options: [
                  {
                    selectKey: '店铺',
                    selectType: 'shopapi',
                    requestKey:"shop_id",
                    selectValue: '全部',
                    selectenum:"",
                  },
                  {
                    selectKey: '客服',
                    selectType: 'serviceapi',
                    requestKey:"service_id",
                    selectValue: '全部',
                    selectenum:"",
                  },
                  {
                    selectKey: '提交状态',
                    selectType: 'is_sub',
                    selectValue: '全部',
                    selectenum:"",
                  },
                ],
              },
            },
            operationConfig: [
              //操作栏配置
              {
                type: 'normal',
                text: '添加任务',
                float: 'left',
                icon: 'ri-close-line',
                ajaxInterface: 'task',
                clickEvent: 'blacklist',
                ajaxMethod: 'POST',
                extData:[
                  {
                    align:'center',
                    title: '店铺',
                    rowType: 'number',
                    ruleType:"number",
                    showEditPage: true,
                    required: true,
                    dataIndex: 'shop_name',
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
                    title: '任务客服',
                    rowType: 'number',
                    ruleType:"number",
                    showEditPage: true,
                    required: true,
                    dataIndex: 'task_service',
                    config: {
                      type: 'select',
                      enumType: 'serviceapi',
                      requestKey: 'service_id',
                      value: '',
                    },
                    slots: {
                      customRender: 'task_service',
                    },
                  },
                  {
                    align:'center',
                    title: '时段',
                    rowType: 'text',
                    showEditPage: true,
                    required: true,
                    ruleType:"number",
                    dataIndex: 'time_frame',
                    config: {
                      type: 'number',
                      orderBy:"first",
                    },
                    slots: {
                      customRender: 'time_frame',
                    },
                  },
                  {
                    align:'center',
                    title: '关键字',
                    width:150,
                    rowType: 'text',
                    required: true,
                    showEditPage: true,
                    dataIndex: 'kd',
                    config: {
                      type: 'text',
                    },
                    slots: {
                      customRender: 'kd',
                    },
                  },
                  {
                    align:'center',
                    title: '本金',
                    rowType: 'text',
                    ruleType:"number",
                    showEditPage: true,
                    required: true,
                    dataIndex: 'advances',
                    config: {
                      type: 'number',
                      value: '',
                    },
                    slots: {
                      customRender: 'advances',
                    },
                  },
                  {
                    align:'center',
                    title: '佣金',
                    rowType: 'text',
                    ruleType:"number",
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
                    title: '单量',
                    rowType: 'text',
                    ruleType:"number",
                    showEditPage: true,
                    required: true,
                    dataIndex: 'count',
                    config: {
                      type: 'number',
                    },
                    slots: {
                      customRender: 'count',
                    },
                  },  
                  {
                    align:'center',
                    title: '备注',
                    dataIndex: 'note',
                    required: false,
                    rowType: 'editColumns',
                    showEditPage: true,
                    config: {
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
                    showEditPage: true,
                    required: true,
                    dataIndex: 'is_activate',
                    config: {
                      isEdit: true,
                      type: 'button',
                      width: '150',
                      size: 'default',
                      buttonBg: 'green',
                      enumType: 'is_activate',
                      defaultValue: 1,
                      value: '',
                    },
                    slots: {
                      customRender: 'is_activate',
                    },
                  },
                ]
              },
              {
                type: 'normal',
                text: '批量删除',
                float: 'left',
                icon: 'ri-close-line',
                ajaxInterface: 'task',
                clickEvent: 'blacklist',
                ajaxMethod: 'POST',
                extParams:{
                  methods_type:1
                },
                extData: [
                  {
                    title: '日期',
                    ruleType: 'number',
                    required: true,
                    dataIndex: 'date',
                    rowType: 'button',
                    showEditPage: true,
                    config: {
                      isEdit: true,
                      type: 'button',
                      width: '150',
                      size: 'default',
                      buttonBg: 'green',
                      enumType: 'date',
                      defaultValue: 0,
                      value: '',
                    },
                  },
                  {
                      title: '店铺',
                      rowType: 'number',
                      ruleType:"number",
                      showEditPage: true,
                      required: true,
                      dataIndex: 'shop_name',
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
                      title: '商品',
                      rowType: 'number',
                      ruleType:'number',
                      showEditPage: true,
                      required: false,
                      dataIndex: 'item_name',
                      config: {
                        hidden: true, //是否显示,true=>隐藏 else false =>显示
                        type: 'select',
                        enumType: 'itemapi',
                        requestKey: 'item_id',
                        value: '',
                      },
                    },
                    {
                      title: '任务客服',
                      ruleType:'number',
                      showEditPage: true,
                      required: false,
                      dataIndex: 'service_id',
                      config: {
                        type: 'select',
                        enumType: 'serviceapi',
                        requestKey: 'service_id',
                        value: '',
                      },
                    },
                    {
                      title: '时段',
                      showEditPage: true,
                      required: false,
                      ruleType:"number",
                      dataIndex: 'time_frame',
                      config: {
                        multiple:true,//是否多选
                        type: 'select',
                        enumType: 'time_range',
                        requestKey: 'time_frame',
                        value: '',
                      },
                    },
                    {
                      title: '删除数量',
                      showEditPage: true,
                      required: false,
                      ruleType:"number",
                      dataIndex: 'num',
                      config: {
                        type: 'number',
                      },
                    },
                ],
              },
              {
                type: 'normal',
                text: '时段转移',
                float: 'left',
                icon: 'ri-close-line',
                ajaxInterface: 'task',
                clickEvent: 'blacklist',
                ajaxMethod: 'POST',
                extParams:{
                  methods_type:2
                },
                extData: [
                  {
                    title: '日期',
                    ruleType: 'number',
                    required: true,
                    dataIndex: 'date',
                    rowType: 'button',
                    showEditPage: true,
                    config: {
                      isEdit: true,
                      type: 'button',
                      width: '150',
                      size: 'default',
                      buttonBg: 'green',
                      enumType: 'date',
                      defaultValue: 0,
                      value: '',
                    },
                  },
                  {
                      title: '店铺',
                      rowType: 'number',
                      ruleType:"number",
                      showEditPage: true,
                      required: false,
                      dataIndex: 'shop_name',
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
                      title: '商品',
                      rowType: 'number',
                      ruleType:'number',
                      showEditPage: true,
                      required: false,
                      dataIndex: 'item_name',
                      config: {
                        hidden: true, //是否显示,true=>隐藏 else false =>显示
                        type: 'select',
                        enumType: 'itemapi',
                        requestKey: 'item_id',
                        value: '',
                      },
                    },
                    {
                      title: '转移任务客服',
                      ruleType:'number',
                      showEditPage: true,
                      required: true,
                      dataIndex: 'service_id',
                      config: {
                        type: 'select',
                        enumType: 'serviceapi',
                        requestKey: 'service_id',
                        value: '',
                      },
                    },
                    {
                      title: '接受任务客服',
                      ruleType:'number',
                      showEditPage: true,
                      required: true,
                      dataIndex: 'accept_service_id',
                      config: {
                        type: 'select',
                        enumType: 'serviceapi',
                        requestKey: 'accept_service_id',
                        value: '',
                      },
                    },
                    {
                      title: '时段',
                      showEditPage: true,
                      required: false,
                      ruleType:"number",
                      dataIndex: 'time_frame',
                      config: {
                        multiple:true,//是否多选
                        type: 'select',
                        enumType: 'time_range',
                        requestKey: 'time_frame',
                        value: '',
                      },
                    },
                    {
                      title: '数量',
                      showEditPage: true,
                      required: false,
                      ruleType:"number",
                      dataIndex: 'num',
                      config: {
                        type: 'number',
                      },
                    },
                ],
              },
              {
                type: 'normal',
                text: '上传任务',
                float: 'right',
                icon: 'ri-close-line',
                ajaxInterface: 'task',
                clickEvent: 'blacklist',
                ajaxMethod: 'POST',
                paramsType:"file",
                extData: [
                  {
                    key: 'mobile',
                    title: '上传文件',
                    rowType: 'uploadFile',
                    ruleType:"file",
                    required: true,
                    showEditPage: true,
                    dataIndex: 'file',
                    config: {
                      fileList:[],
                      type: 'uploadFile',
                      uploadUrl: '/task/',
                      accept:
                        'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv',
                      acceptType: 'excel',
                    },
                  },
                ],
              },
              {
                type: 'export',
                float: 'right',
                icon: 'ri-close-line',
                clickEvent: 'exportData',
                extData: [],
              },
            ],
          },
          tableData: [
            {
              align:'center',
              title: '日期',
              rowType: 'text',
              showEditPage: false,
              ellipsis: true,
              sliceNum:0, //显示多长，0为显示所有，没有这个属性则按照默认数值截断
              dataIndex: 'create_date',
              config: {
                type: 'datetime',
                value: '',
              },
              slots: {
                customRender: 'create_date',
              },
            },
            {
              align:'center',
              title: '店铺',
              rowType: 'number',
              ruleType:"number",
              ellipsis: true,
              width:100,
              showEditPage: false,
              required: true,
              dataIndex: 'shop_name',
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
              width:100,
              showEditPage: false,
              required: true,
              ellipsis: true,
              dataIndex: 'item_name',
              config: {
                hidden: true, //是否显示,true=>隐藏 else false =>显示
                type: 'select',
                enumType: 'itemapi',
                requestKey: 'item_id',
                value: '',
                clickEvent:"openPage",
                openPageName:"https://detail.tmall.com/item.htm?",
                paramName:["id"],
                paramValue:["num_iid"],
              },
              slots: {
                customRender: 'item_name',
              },
            },
            {
              align:'center',
              title: '主图',
              dataIndex: 'pic_url',
              ruleType: 'string', //编辑时的类型
              rowType: 'img',
              showEditPage: false,
              required: true,
              config: {
                showMosaic:true,
                type: 'img',
                width: 60,
                height: 60,
                clickEvent: 'showImg',
                uploadUrl: '/uploadpictures',
                fileList: [],
                previewVisible: false,
                previewImage: '',
                accept: 'image/png,image/jpg,image/jpeg',
              },
              slots: {
                customRender: 'pic_url',
              },
            },
            {
              align:'center',
              title: '时段',
              showEditPage: true,
              required: true,
              ruleType:"number",
              ellipsis: true,
              dataIndex: 'time_frame',
              config: {
                type: 'number',
              },
              slots: {
                customRender: 'time_frame',
              },
            },
            {
              align:'center',
              title: '安排客服',
              rowType: 'text',
              ellipsis: true,
              showEditPage: false,
              required: true,
              dataIndex: 'arrange_service',
              config: {
                type: 'text',
              },
              slots: {
                customRender: 'arrange_service',
              },
            },
            {
              align:'center',
              title: '任务客服',
              rowType: 'number',
              ruleType:"number",
              showEditPage: false,
              ellipsis: true,
              required: true,
              dataIndex: 'task_service',
              config: {
                type: 'select',
                enumType: 'serviceapi',
                requestKey: 'service_id',
                value: '',
              },
              slots: {
                customRender: 'task_service',
              },
            },
            {
              align:'center',
              title: '买家昵称',
              rowType: 'text',
              showEditPage: true,
              required: false,
              ellipsis: true,
              dataIndex: 'buyer_nick',
              config: {
                type: 'text',
              },
              slots: {
                customRender: 'buyer_nick',
              },
            },
            {
              align:'center',
              title: '订单号',
              rowType: 'text',
              ruleType:"orderType",
              ellipsis: true,
              required: false,
              showEditPage: true,
              dataIndex: 'tid',
              sliceNum:3, //显示多长，0为显示所有，没有这个属性则按照默认数值截断
              config: {
                type: 'text',
              },
              slots: {
                customRender: 'tid',
              },
            },
            {
              align:'center',
              title: '手机号',
              rowType: 'text',
              ruleType:"number",
              required: false,
              ellipsis: true,
              showEditPage: true,
              dataIndex: 'mobile',
              sliceNum:3, //显示多长，0为显示所有，没有这个属性则按照默认数值截断
              config: {
                type: 'number',
              },
              slots: {
                customRender: 'mobile',
              },
            },
            {
              align:'center',
              title: '本金',
              rowType: 'text',
              ruleType:"number",
              showEditPage: true,
              ellipsis: true,
              required: true,
              dataIndex: 'advances',
              config: {
                type: 'number',
                value: '',
              },
              slots: {
                customRender: 'advances',
              },
            },
            {
              align:'center',
              title: '佣金',
              rowType: 'text',
              ruleType:"number",
              showEditPage: true,
              ellipsis: true,
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
              title: '提交状态',
              ruleType: 'number',
              rowType: 'button',
              showEditPage: false,
              ellipsis: true,
              required: true,
              dataIndex: 'is_sub',
              config: {
                isEdit: false,
                type: 'button',
                width: '150',
                noStyle:true,
                size: 'default',
                buttonBg: 'green',
                enumType: 'is_sub',
                defaultValue: 0,
                value: '',
              },
              slots: {
                customRender: 'is_sub',
              },
            },
            {
              align:'center',
              title: '备注',
              dataIndex: 'note',
              required: false,
              ellipsis: true,
              rowType: 'editColumns',
              width:120,
              showEditPage: true,
              config: {
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
              showEditPage: true,
              required: true,
              ellipsis: true,
              dataIndex: 'is_activate',
              config: {
                isEdit: true,
                type: 'button',
                width: '150',
                size: 'default',
                buttonBg: 'green',
                enumType: 'is_activate',
                defaultValue: 1,
                value: '',
              },
              slots: {
                customRender: 'is_activate',
              },
            },
            {
              align:'center',
              key: 'operation',
              // fixed: 'right',
              title: '操作',
              rowType: 'operation',
              dataIndex: 'operation',
              operation: true,
              operationList: [
                //操作列表（按钮啥的）
                // {
                //   text: '编辑',
                //   clickType: 'edit',
                //   clickEvent: 'editRow',
                // },
                {
                  text: '删除',
                  needCustomDisable:true,
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
          description: [
            {
              align:'center',
              title: '关键字',
              rowType: 'allRowEdit',
              showEditPage: true,
              dataIndex: 'kd',
              required: false,
              config: {
                type: 'text',
              },
              slots: {
                customRender: 'kd',
              },
            },
            {
              align:'center',
              title: '微信/QQ',
              rowType: 'allRowEdit',
              showEditPage: true,
              dataIndex: 'wechat_qq',
              required: false,
              config: {
                type: 'text',
              },
              slots: {
                customRender: 'wechat_qq',
              },
            },
          ],
        },
      }
    },
  }
</script>
