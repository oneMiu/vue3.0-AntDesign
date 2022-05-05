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
            searchConfig: {
              //搜索配置
              searchDate: true, //是否显示事件
              isToday: true, //是否是今天
              selectInput: {
                //带输入框的下拉框配置
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
                      key: 'unit_num',
                      value: '单号',
                      inputValue: '',
                      inputType: 'text',
                  },
                  {
                      key: 'mobile',
                      value: '手机号',
                      inputValue: '',
                      inputType: 'number',
                  },
                  {
                      key: 'user_id',
                      value: '领取用户',
                      inputValue: '',
                      inputType: 'number',
                  },
                  {
                      key: 'preside_user_id',
                      value: '提交用户',
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
                    selectKey: '订单来源',
                    selectType: 'is_source',
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
                    selectKey: '提现备注',
                    selectType: 'order_state',
                    selectValue: '全部',
                    selectenum:"",
                  },
                  {
                    selectKey: '提现状态',
                    selectType: 'refund_state',
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
                text: '添加订单',
                icon: 'ri-close-line',
                clickEvent: 'blacklist',
                ajaxInterface: 'order',
                ajaxMethod: 'POST',
                extData:[
                  {
                    align:'center',
                    title: '登记日期',
                    rowType: 'text',
                    showEditPage: true,
                    dataIndex: 'create_date',
                    config: {
                      type: 'date',
                      value: '',
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
                    rowType: 'text',
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
                    title: '买家昵称',
                    rowType: 'text',
                    showEditPage: true,
                    required: true,
                    dataIndex: 'buyer_nick',
                    sliceNum:5,
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
                    showEditPage: true,
                    required: true,
                    dataIndex: 'tid',
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
                    rowType: 'number',
                    showEditPage: true,
                    required: true,
                    dataIndex: 'mobile',
                    config: {
                      type: 'number',
                    },
                    slots: {
                      customRender: 'mobile',
                    },
                  },
                  {
                    align:'center',
                    title: '金额',
                    rowType: 'text',
                    showEditPage: true,
                    required: true,
                    dataIndex: 'advances',
                    config: {
                      type: 'text',
                    },
                    slots: {
                      customRender: 'advances',
                    },
                  },
                  {
                    align:'center',
                    title: '提现金额',
                    rowType: 'text',
                    showEditPage: false,
                    required: true,
                    dataIndex: 'refund_advances',
                    config: {
                      type: 'text',
                    },
                    slots: {
                      customRender: 'refund_advances',
                    },
                  },
                  {
                    align:'center',
                    title: '佣金',
                    rowType: 'text',
                    showEditPage: true,
                    required: true,
                    dataIndex: 'commission',
                    config: {
                      type: 'text',
                    },
                    slots: {
                      customRender: 'commission',
                    },
                  },
                  {
                    align:'center',
                    title: '订单状态',
                    ruleType: 'number',
                    rowType: 'select',
                    showEditPage: true,
                    required: true,
                    dataIndex: 'state',
                    config: {
                      isEdit: true,
                      orderBy:"note",
                      type: 'select',
                      size: 'default',
                      enumType: 'state',
                      defaultValue: 0,
                      value: '',
                    },
                    slots: {
                      customRender: 'state',
                    },
                  },
                  {
                    align:'center',
                    title: '好评状态',
                    ruleType: 'number',
                    rowType: 'button',
                    showEditPage: false,
                    required: true,
                    dataIndex: 'buyer_rate',
                    config: {
                      isEdit: true,
                      type: 'button',
                      width: '150',
                      size: 'default',
                      buttonBg: 'green',
                      enumType: 'buyer_rate',
                      defaultValue: 0,
                      value: '',
                    },
                    slots: {
                      customRender: 'buyer_rate',
                    },
                  },
                  {
                    align:'center',
                    title: '确认状态',
                    ruleType: 'number',
                    rowType: 'button',
                    showEditPage: false,
                    required: true,
                    dataIndex: 'is_affirm',
                    config: {
                      isEdit: true,
                      type: 'button',
                      width: '150',
                      size: 'default',
                      buttonBg: 'green',
                      enumType: 'is_affirm',
                      defaultValue: 0,
                      value: '',
                    },
                    slots: {
                      customRender: 'is_affirm',
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
                    title: '提现备注',
                    ruleType: 'number',
                    rowType: 'select',
                    showEditPage: true,
                    required: true,
                    dataIndex: 'order_state',
                    config: {
                      isEdit: true,
                      type: 'select',
                      size: 'default',
                      buttonBg: 'green',
                      enumType: 'order_state',
                      defaultValue: 0,
                      value: '',
                    },
                    slots: {
                      customRender: 'order_state',
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
                      allRowEditwidth:50,
                    },
                    slots: {
                      customRender: 'wechat_qq',
                    },
                  },
                ]
              },
              
              {
                type: 'normal',
                text: '上传订单',
                float: 'right',
                icon: 'ri-close-line',
                ajaxInterface: 'order',
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
                      uploadUrl: '/order/',
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
              },
            ],
            autowidth: false, //平均分每列宽度
            ajaxInterface: 'order', //接口
            openType: 'modal', //打开编辑或者添加的模式为 弹窗或者页面 "modal" ||"page"
          },
          tableData: [
            {
              align:'center',
              title: '登记时间',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'create_time',
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
              rowType: 'text',
              showEditPage: false,
              required: true,
              width:110,
              dataIndex: 'shop_name',
              config: {
                type: 'text',
              },
              slots: {
                customRender: 'shop_name',
              },
            },
            {
              align:'center',
              title: '商品',
              width:110,
              rowType: 'text',
              showEditPage: false,
              required: true,
              dataIndex: 'item_name',
              config: {
                type: 'text',
              },
              slots: {
                customRender: 'item_name',
              },
            },
            {
              align:'center',
              title: '买家昵称',
              rowType: 'text',
              showEditPage: true,
              required: true,
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
              showEditPage: true,
              required: true,
              dataIndex: 'tid',
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
              showEditPage: true,
              required: true,
              dataIndex: 'mobile',
              config: {
                type: 'text',
              },
              slots: {
                customRender: 'mobile',
              },
            },
            {
              align:'center',
              title: '金额',
              rowType: 'number',
              showEditPage: true,
              required: true,
              dataIndex: 'advances',
              config: {
                type: 'number',
              },
              slots: {
                customRender: 'advances',
              },
            },
            {
              align:'center',
              title: '提现',
              rowType: 'number',
              showEditPage: false,
              required: true,
              dataIndex: 'refund_advances',
              config: {
                type: 'number',
              },
              slots: {
                customRender: 'refund_advances',
              },
            },
            {
              align:'center',
              title: '佣金',
              rowType: 'number',
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
              title: '提现状态',
              ruleType: 'number',
              rowType: 'select',
              showEditPage: false,
              required: true,
              dataIndex: 'refund_state',
              config: {
                isEdit: false,
                type: 'select',
                width: '150',
                size: 'default',
                buttonBg: 'green',
                enumType: 'refund_state',
                defaultValue: 0,
                value: '',
              },
              slots: {
                customRender: 'refund_state',
              },
            },
            {
              align:'center',
              title: '提现备注',
              ruleType: 'number',
              rowType: 'select',
              showEditPage: false,
              required: true,
              dataIndex: 'order_state',
              config: {
                isEdit: true,
                type: 'select',
                size: 'default',
                buttonBg: 'green',
                enumType: 'order_state',
                defaultValue: 0,
                value: '',
              },
              slots: {
                customRender: 'order_state',
              },
            },
            {
              align:'center',
              title: '订单状态',
              ruleType: 'number',
              rowType: 'select',
              showEditPage: true,
              required: true,
              dataIndex: 'state',
              config: {
                isEdit: true,
                orderBy:"note",
                type: 'select',
                size: 'default',
                enumType: 'state',
                defaultValue: 0,
                value: '',
              },
              slots: {
                customRender: 'state',
              },
            },
            {
              align:'center',
              title: '好评状态',
              ruleType: 'number',
              rowType: 'button',
              showEditPage: false,
              required: true,
              dataIndex: 'buyer_rate',
              config: {
                isEdit: true,
                type: 'button',
                width: '150',
                size: 'default',
                buttonBg: 'green',
                enumType: 'buyer_rate',
                defaultValue: 0,
                value: '',
              },
              slots: {
                customRender: 'buyer_rate',
              },
            },
            {
              align:'center',
              title: '确认状态',
              ruleType: 'number',
              rowType: 'button',
              showEditPage: false,
              required: true,
              dataIndex: 'is_affirm',
              config: {
                isEdit: true,
                type: 'button',
                width: '150',
                size: 'default',
                buttonBg: 'green',
                enumType: 'is_affirm',
                defaultValue: 0,
                value: '',
              },
              slots: {
                customRender: 'is_affirm',
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
              key: 'operation',
              // fixed: 'right',
              title: '操作',
              rowType: 'operation',
              dataIndex: 'operation',
              operation: true,
              operationList: [
                //操作列表（按钮啥的）
                {
                  text: '编辑',
                  clickType: 'edit',
                  clickEvent: 'editRow',
                },
                // {
                //   text: '删除',
                //   clickType: 'delete',
                //   clickEvent: 'onDelete',
                //   title: '确定要删除此条信息吗？？',
                // },
              ],
              slots: {
                customRender: 'operation',
              },
            },
          ],
          description: [
            //额外拓展数据
            {
              align:'center',
              title: '关键字词',
              rowType: 'text',
              showEditPage: false,
              required: true,
              dataIndex: 'kd',
              config: {
                type: 'text',
              },
            },
             {
              title: '领取用户',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'user_id',
              config: {
                type: 'text',
              },
            },
            {
              title: '提交用户',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'preside_user_id',
              config: {
                type: 'text',
              },
            },
            {
              title: '提交客服',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'sub_service',
              config: {
                type: 'text',
              },
            },
            {
              title: '修改客服',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'change_service',
              config: {
                type: 'text',
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
                allRowEditwidth:50,
              },
              slots: {
                customRender: 'wechat_qq',
              },
            },
            {
              title: '主持佣金',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'preside_comm',
              config: {
                type: 'text',
              },
            },
            {
              title: '礼品名称',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'gift_name',
              config: {
                type: 'text',
              },
            },
            {
              title: '礼品金额',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'gift_money',
              config: {
                type: 'text',
              },
            },
            {
              title: '礼品代号',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'gift_code',
              config: {
                type: 'text',
              },
            },
            {
              title: '数量列表',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'num_list',
              config: {
                type: 'text',
              },
            },
            {
              title: '商品列表',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'num_iid_list',
              config: {
                type: 'text',
              },
            },
            {
              title: 'sku列表',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'sku_id_list',
              config: {
                type: 'text',
              },
            },
            {
              title: '收货姓名',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'receiver_name',
              config: {
                type: 'text',
              },
            },
            {
              title: '收货手机',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'receiver_mobile',
              config: {
                type: 'text',
              },
            },
            {
              title: '所有地址',
              rowType: 'text',
              showEditPage: false,
              white:120,
              dataIndex: 'all_address',
              config: {
                type: 'text',
              },
            },
            {
              title: '详情地址',
              rowType: 'text',
              showEditPage: false,
              white:120,
              dataIndex: 'receiver_address',
              config: {
                type: 'text',
              },
            },
            {
              title: '买家插旗',
              ruleType: 'number',
              rowType: 'button',
              showEditPage: false,
              required: true,
              dataIndex: 'seller_flag',
              config: {
                isEdit: false,
                type: 'button',
                width: '150',
                size: 'default',
                buttonBg: 'green',
                enumType: 'flag',
                autoColor:true,
                defaultValue: 0,
                value: '',
              },
            },
            {
              title: '插旗备注',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'seller_memo',
              config: {
                type: 'text',
              },
            },
            {
              title: '支付时间',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'pay_time',
              config: {
                type: 'text',
              },
            },
            {
              title: '创建时间',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'created',
              config: {
                type: 'text',
              },
            },
            // {
            //   title: '提交时间',
            //   rowType: 'text',
            //   showEditPage: false,
            //   dataIndex: 'sub_time',
            //   config: {
            //     type: 'text',
            //   },
            // },
            {
              title: '订单来源',
              ruleType: 'number',
              rowType: 'button',
              showEditPage: false,
              required: true,
              dataIndex: 'is_source',
              config: {
                isEdit: false,
                type: 'button',
                width: '150',
                size: 'default',
                buttonBg: 'cyan',
                enumType: 'is_source',
                defaultValue: 0,
                value: '',
              },
            },
            {
              title: '支付时段',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'pay_time_frame',
              config: {
                type: 'text',
              },
            },
            {
              title: '登记时段',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'sub_time_frame',
              config: {
                type: 'text',
              },
            },
            {
              align:'center',
              title: '红包金额',
              rowType: 'text',
              showEditPage: false,
              required: true,
              dataIndex: 'coupon_fee',
              config: {
                type: 'text',
              },
              slots: {
                customRender: 'coupon_fee',
              },
            },
             {
              align:'center',
              title: '订单单号',
              rowType: 'text',
              showEditPage: false,
              required: true,
              dataIndex: 'unit_num',
              config: {
                type: 'text',
              },
              slots: {
                customRender: 'unit_num',
              },
            },
            {
              align:'center',
              title: '达标状态',
              ruleType: 'number',
              rowType: 'button',
              showEditPage: false,
              required: true,
              dataIndex: 'is_standards',
              config: {
                isEdit: false,
                type: 'button',
                width: '150',
                size: 'default',
                buttonBg: 'cyan',
                enumType: 'is_standards',
                defaultValue: 0,
                value: '',
              },
            },
             {
              align:'center',
              title: '淘客查询',
              ruleType: 'number',
              rowType: 'button',
              showEditPage: false,
              required: true,
              dataIndex: 'is_taoke',
              config: {
                isEdit: false,
                type: 'button',
                width: '150',
                size: 'default',
                buttonBg: 'cyan',
                enumType: 'is_taoke__1',
                defaultValue: 0,
                value: '',
              },
              slots: {
                customRender: 'is_taoke',
              },
            },
            // {
            //   align:'center',
            //   title: '物流状态',
            //   ruleType: 'number',
            //   rowType: 'button',
            //   showEditPage: false,
            //   required: true,
            //   dataIndex: 'is_logistics',
            //   config: {
            //     isEdit: false,
            //     type: 'button',
            //     width: '150',
            //     size: 'default',
            //     buttonBg: 'green',
            //     enumType: 'is_logistics',
            //     defaultValue: 0,
            //     value: '',
            //   },
            // },
          ],
        },
      }
    },
  }
</script>
