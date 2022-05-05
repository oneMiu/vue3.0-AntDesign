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
            ajaxInterface: 'mytask', //接口
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
                    selectKey: '提交状态',
                    selectType: 'is_sub',
                    selectValue: '全部',
                    selectenum:"",
                  },
                ],
              },
            },
            operationConfig: [
              {
                type: 'normal',
                text: '查询信息',
                modalWidth:1200,
                float: 'left',
                icon: 'file-search-line',
                ajaxInterface: 'queryinfo',
                clickEvent: 'searchModal',
                ajaxMethod: 'POST',
                role:[201,301,302],
                extData: [
                  {
                    key:"kd",
                    placeholder:"请输入手机号或者买家昵称进行查询",
                    value:"",
                    callback:"queryinfoCallback",
                  }
                ],
              },
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
              title: '店铺',
              rowType: 'number',
              ruleType:"number",
              showEditPage: false,
              ellipsis: true,
              width:120,
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
              width:120,
              rowType: 'number',
              ruleType:'number',
              showEditPage: false,
              ellipsis: true,
              required: true,
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
              ellipsis: true,
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
            // {
            //   align:'center',
            //   title: '安排客服',
            //   rowType: 'text',
            //   showEditPage: false,
            //   required: true,
            //   dataIndex: 'arrange_service',
            //   config: {
            //     type: 'text',
            //   },
            //   slots: {
            //     customRender: 'arrange_service',
            //   },
            // },
            // {
            //   align:'center',
            //   title: '任务客服',
            //   rowType: 'text',
            //   showEditPage: false,
            //   required: true,
            //   dataIndex: 'task_service',
            //   config: {
            //     type: 'text',
            //   },
            //   slots: {
            //     customRender: 'task_service',
            //   },
            // },
            {
              align:'center',
              title: '时段',
              showEditPage: true,
              required: true,
              ellipsis: true,
              ruleType:"number",
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
              title: '关键字',
              width:150,
              required: true,
              showEditPage: true,
              ellipsis: true,
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
              title: '买家昵称',
              rowType: 'allRowEdit',
              showEditPage: true,
              ellipsis: true,
              required: true,
              dataIndex: 'buyer_nick',
              config: {
                showTaskTip:true,
                type: 'text',
              },
              slots: {
                customRender: 'buyer_nick',
              },
            },
            {
              align:'center',
              title: '订单号',
              rowType: 'allRowEdit',
              ruleType:"orderType",
              required: true,
              showEditPage: true,
              ellipsis: true,
              dataIndex: 'tid',
              config: {
                showTaskTip:true,
                type: 'text',
              },
              slots: {
                customRender: 'tid',
              },
            },
            {
              align:'center',
              title: '手机号',
              rowType: 'allRowEdit',
              required: true,
              ellipsis: true,
              showEditPage: true,
              dataIndex: 'mobile',
              sliceNum:3,
              config: {
                showTaskTip:true,
                type: 'text',
              },
              slots: {
                customRender: 'mobile',
              },
            },
            {
              align:'center',
              title: '本金',
              rowType: 'allRowEdit',
              showEditPage: true,
              required: true,
              ellipsis: true,
              dataIndex: 'advances',
              config: {
                type: 'text',
                value: '',
                allRowEditWidth:50,
              },
              slots: {
                customRender: 'advances',
              },
            },
            {
              align:'center',
              title: '佣金',
              rowType: 'allRowEdit',
              showEditPage: true,
              ellipsis: true,
              required: true,
              dataIndex: 'commission',
              config: {
                type: 'text',
                allRowEditWidth:50,
              },
              slots: {
                customRender: 'commission',
              },
            },
            {
              align:'center',
              title: '礼品代号',
              rowType: 'allRowEdit',
              ellipsis: true,
              showEditPage: true,
              dataIndex: 'gift_code',
              required: false,
              config: {
                type: 'text',
                allRowEditWidth:50,
              },
              slots: {
                customRender: 'gift_code',
              },
            },
            {
              align:'center',
              title: '微信/QQ',
              rowType: 'allRowEdit',
              showEditPage: true,
              ellipsis: true,
              dataIndex: 'wechat_qq',
              required: false,
              config: {
                type: 'text',
              },
              slots: {
                customRender: 'wechat_qq',
              },
            },
            {
              align:'center',
              title: '备注',
              dataIndex: 'note',
              ellipsis: true,
              required: false,
              rowType: 'allRowEdit',
              width:120,
              showEditPage: true,
              config: {
                isEdit: true,
                type: 'text',
                width: '150',
                size: 'default',
                value: '',
              },
              slots: {
                customRender: 'note',
              },
            },
            {
              align:'center',
              title: '提交状态',
              ruleType: 'number',
              rowType: 'button',
              ellipsis: true,
              showEditPage: false,
              required: true,
              dataIndex: 'is_sub',
              config: {
                isEdit: true,
                type: 'button',
                width: '150',
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
              key: 'operation',
              // fixed: 'right',
              title: '操作',
              width:150,
              rowType: 'operation',
              dataIndex: 'operation',
              operation: true,
              operationList: [
                //操作列表（按钮啥的）
                {
                  text: '编辑',
                  clickType: 'edit',
                  clickEvent: 'editAll',
                  needCustomDisable:true,
                },
                {
                  text: '操作',
                  modalTitle:"操作列表",
                  clickType: 'custom',
                  clickEvent: 'actionWhat',
                  type: 'normal',
                  modalWidth:1200,
                  ajaxInterface: 'mytask',
                  ajaxMethod: 'POST',
                  needCustomDisable:false,
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
          // description: [
          //   {
          //     align:'center',
          //     title: '日期',
          //     rowType: 'text',
          //     showEditPage: false,
          //     sliceNum:0, //显示多长，0为显示所有，没有这个属性则按照默认数值截断
          //     dataIndex: 'create_date',
          //     config: {
          //       type: 'datetime',
          //       value: '',
          //     },
          //     slots: {
          //       customRender: 'create_date',
          //     },
          //   },
          // ],
        },
      }
    },
  }
</script>
