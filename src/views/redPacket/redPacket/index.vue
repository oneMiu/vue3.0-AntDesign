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
              isToday: false, //是否是今天
              isWeek:true,//是否搜索一周的时间范围
              selectInput: {
                //带输入框的下拉框配置
                width: 200,
                options: [
                  {
                      key: 'nick_name',
                      value: '微信昵称',
                      inputValue: '',
                      inputType: 'text',
                  },
                  {
                      key: 'verif_code',
                      value: '兑换码',
                      inputValue: '',
                      inputType: 'text',
                  },
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
                      key: 'note',
                      value: '备注',
                      inputValue: '',
                      inputType: 'text',
                  },
                ],
              },
              doubleSelect: {
                width: 200,
                options: [
                  {
                    selectKey: '生成客服',
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
                    selectType: 'refund_state__3',
                    selectValue: '全部',
                    selectenum:"",
                  },
                ],
              },
            },
            operationConfig: [
               {
                type: 'normal',
                icon: 'ri-close-line',
                clickEvent: 'addData',
                role:[201,301,302],
              },
              {
                type: 'export',
                float: 'right',
                icon: 'ri-close-line',
                clickEvent: 'exportData',
              },
            ],
            showSeletction:true,//是否显示左边的勾选框
            autoWidth: false, //平均分每列宽度
            ajaxInterface: 'redpacket', //接口
            openType: 'modal', //打开编辑或者添加的模式为 弹窗或者页面 "modal" ||"page"
          },
          tableData: [
            {
              //表格数据
              align:'center',
              title: '生成时间',
              rowType: 'text',
              showEditPage: false,
              required: true,
              ellipsis:true,
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
              title: '红包链接',
              dataIndex: 'red_packet_url',
              ruleType: 'string', //编辑时的类型
              rowType: 'img',
              showEditPage: false,
              ellipsis:true,
              required: true,
              config: {
                type: 'img',
                width: 60,
                height: 60,
                clickEvent: 'showImg',
                uploadUrl: '/uploadpictures',
                fileList: [],
                previewVisible: false,
                previewImage: '',
                showImgTip:true,
                accept: 'image/png,image/jpg,image/jpeg',
              },
              slots: {
                customRender: 'red_packet_url',
              },
            },
            {
              align:'center',
              title: '安全类型',
              ruleType: 'number',
              rowType: 'button',
              showEditPage: true,
              ellipsis:true,
              required: true,
              dataIndex: 'safe_mode',
              config: {
                isEdit: false,
                type: 'button',
                displayItem: ['mobile'],
                displayItemShow:[0],
                noStyle:true,
                buttonBg: 'green',
                enumType: 'safe_mode',
                defaultValue: 1,
                value: '',
              },
              slots: {
                customRender: 'safe_mode',
              },
            },
            {
              align:'center',
              title: '兑换码',
              rowType: 'editColumns',
              showEditPage: false,
              ellipsis:true,
              required: true,
              dataIndex: 'verif_code',
              config: {
                isEdit:false,
                type: 'text',
              },
              slots: {
                customRender: 'verif_code',
              },
            },
            {
              align:'center',
              title: '金额',
              rowType: 'editColumns',
              showEditPage: true,
              required: true,
              ellipsis:true,
              dataIndex: 'money',
              config: {
                isEdit:false,
                type: 'text',
                orderBy:"mobile",
              },
              slots: {
                customRender: 'money',
              },
            },
            {
              align:'center',
              title: '审核要求',
              ruleType: 'number',
              rowType: 'select',
              showEditPage: true,
              required: true,
              dataIndex: 'is_audit',
              config: {
                isEdit: true,
                type: 'select',
                size: 'default',
                buttonBg: 'green',
                enumType: 'is_audit',
                defaultValue: 0,
                value: '',
                orderBy:"type",
              },
              slots: {
                customRender: 'is_audit',
              },
            },
            {
              align:'center',
              title: '提现状态',
              ruleType: 'number',
              rowType: 'select',
              showEditPage: false,
              ellipsis:true,
              required: true,
              dataIndex: 'refund_state',
              config: {
                isEdit: false,
                type: 'select',
                width: '150',
                size: 'default',
                buttonBg: 'green',
                enumType: 'refund_state__3',
                defaultValue: 0,
                value: '',
              },
              slots: {
                customRender: 'refund_state',
              },
            },
            {
              align:'center',
              title: '头像',
              dataIndex: 'headimgurl',
              ruleType: 'string', //编辑时的类型
              rowType: 'img',
              showEditPage: false,
              ellipsis:true,
              required: true,
              config: {
                type: 'img',
                width: 60,
                height: 60,
                clickEvent: 'showImg',
                uploadUrl: '/uploadpictures',
                fileList: [],
                previewVisible: false,
                previewImage: '',
                showImgTip:true,
                accept: 'image/png,image/jpg,image/jpeg',
              },
              slots: {
                customRender: 'headimgurl',
              },
            },
            {
              align:'center',
              title: '微信昵称',
              rowType: 'text',
              showEditPage: false,
              ellipsis:true,
              required: true,
              width:100,
              dataIndex: 'nick_name',
              config: {
                type: 'text',
              },
              slots: {
                customRender: 'nick_name',
              },
            },
            {
              align:'center',
              title: '图片1',
              dataIndex: 'img_url1',
              ruleType: 'string', //编辑时的类型
              rowType: 'img',
              showEditPage: false,
              ellipsis:true,
              required: true,
              config: {
                type: 'img',
                width: 60,
                height: 60,
                clickEvent: 'showImg',
                uploadUrl: '/uploadpictures',
                fileList: [],
                previewVisible: false,
                previewImage: '',
                showImgTip:true,
                accept: 'image/png,image/jpg,image/jpeg',
              },
              slots: {
                customRender: 'img_url1',
              },
            },
            {
              align:'center',
              title: '图片2',
              dataIndex: 'img_url2',
              ruleType: 'string', //编辑时的类型
              rowType: 'img',
              showEditPage: false,
              ellipsis:true,
              required: true,
              config: {
                type: 'img',
                width: 60,
                height: 60,
                clickEvent: 'showImg',
                uploadUrl: '/uploadpictures',
                fileList: [],
                previewVisible: false,
                previewImage: '',
                showImgTip:true,
                accept: 'image/png,image/jpg,image/jpeg',
              },
              slots: {
                customRender: 'img_url2',
              },
            },
            {
              align:'center',
              title: '提现备注',
              ruleType: 'number',
              rowType: 'select',
              showEditPage: false,
              ellipsis:true,
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
              key: 'note',
              title: '备注',
              dataIndex: 'note',
              required: false,
              ellipsis:true,
              rowType: 'editColumns',
              showEditPage: true,
              config: {
                isEdit: true,
                orderBy:"is_activate",
                type: 'text',
                size: 'default',
                value: '',
              },
              slots: {
                customRender: 'note',
              },
            },
            {
              key: 'operation',
              align:'center',
              title: '操作',
              rowType: 'operation',
              dataIndex: 'operation',
              operation: true,
              operationList: [
                //操作列表（按钮啥的）
                {
                  text: '审核',
                  clickType: 'verify',
                  clickEvent: 'editRow',
                  ajaxInterface:"auditredpacket",
                  ajaxMethod:"post",
                  condition:"record['audit_state']==1",//这个字段等于1的时候，审核按钮不可用
                  extDataMode:'cover',//选择拓展数据的添加方式，cover：覆盖，push：继续加上去
                  extData:[
                    {
                      align:'center',
                      title: '状态',
                      ruleType: 'number',
                      rowType: 'button',
                      required: true,
                      showEditPage: true,
                      dataIndex: 'audit_state',
                      config: {
                        isEdit: false,
                        type: 'button',
                        width: '150',
                        noStyle:true,
                        size: 'default',
                        buttonBg: 'green',
                        enumType: 'audit_state__1',
                        defaultValue: 0,
                        value: '',
                      },
                    },
                    {
                      align:'center',
                      key: 'note',
                      title: '备注',
                      dataIndex: 'note',
                      required: false,
                      ellipsis:true,
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
                  ]
                },
                {
                  text: '删除',
                  clickType: 'delete',
                  needCustomDisable:true,
                  clickEvent: 'onDelete',
                  condition:"record['refund_state']!=0",
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
              title: '生成客服',
              rowType: 'text',
              showEditPage: false,
              ellipsis:true,
              required: true,
              dataIndex: 'service_name',
              config: {
                type: 'text',
              },
              slots: {
                customRender: 'service_name',
              },
            },
             {
              align:'center',
              title: '单号',
              rowType: 'text',
              showEditPage: false,
              ellipsis:true,
              required: true,
              dataIndex: 'unit_num',
              width:120,
              config: {
                type: 'text',
              },
              slots: {
                customRender: 'unit_num',
              },
            },
            {
              align:'center',
              title: '手机号',
              rowType: 'editColumns',
              showEditPage: true,
              required: true,
              ellipsis:true,
              width:100,
              dataIndex: 'mobile',
              config: {
                orderBy:"safe_mode",
                isEdit:false,
                type: 'number',
              },
              slots: {
                customRender: 'mobile',
              },
            },
            {
              align:'center',
              title: '红包类型',
              ruleType: 'number',
              rowType: 'button',
              showEditPage: true,
              required: true,
              ellipsis:true,
              dataIndex: 'type',
              config: {
                isEdit: false,
                type: 'button',
                width: '150',
                size: 'default',
                buttonBg: 'green',
                enumType: 'type__1',
                defaultValue: 0,
                noStyle:true,
                value: '',
              },
              slots: {
                customRender: 'type',
              },
            },
            {
              align:'center',
              title: '领取用户',
              rowType: 'text',
              showEditPage: false,
              required: true,
              dataIndex: 'user_id',
              config: {
                type: 'text',
                value: '',
              },
              slots: {
                customRender: 'user_id',
              },
            },
            {
              align:'center',
              title: '买家昵称',
              rowType: 'text',
              showEditPage: true,
              required: false,
              dataIndex: 'buyer_nick',
              width:90,
              config: {
                type: 'text',
                value: '',
                orderBy:"is_activate",
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
              required: false,
              dataIndex: 'tid',
              width:90,
              config: {
                type: 'text',
                orderBy:"is_activate",
              },
              slots: {
                customRender: 'tid',
              },
            },
            {
              align:'center',
              title: '激活状态',
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
                defaultValue: 1,
                value: '',
              },
              slots: {
                customRender: 'is_activate',
              },
            },
          ],
        },
      }
    },
  }
</script>
