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
              selectInput: {
                //带输入框的下拉框配置
                width: 200,
                options: [
                  {
                    key: 'buyer_nick',
                    value: '买家昵称',
                    inputType: 'text',
                    inputValue: '',
                  },
                  {
                    key: 'tid',
                    value: '订单号',
                    inputType: 'number',
                    inputValue: '',
                  },
                  {
                    key: 'user_id',
                    value: '用户',
                    inputType: 'number',
                    inputValue: '',
                  },
                   {
                    key: 'mobile',
                    value: '手机号',
                    inputType: 'number',
                    inputValue: '',
                  },
                  {
                    key: 'nick_name',
                    value: '微信昵称',
                    inputType: 'text',
                    inputValue: '',
                  },
                  {
                    key: 'openid',
                    value: 'openid',
                    inputType: 'text',
                    inputValue: '',
                  },
                ],
              },
              select: [
                {
                  //下拉框配置
                  selectKey: '状态',
                  selectType: 'state__1',
                  selectValue: '全部',
                },
              ]
            },
            operationConfig: [
              {
                type: 'export',
                float: 'right',
                icon: 'ri-close-line',
                clickEvent: 'exportData',
              },
            ],
            autoWidth: false, //平均分每列宽度
            ajaxInterface: 'useraccount', //接口
            openType: 'modal', //打开编辑或者添加的模式为 弹窗或者页面 "modal" ||"page"
          },
          tableData: [
            {
              align:'center',
              title: '时间',
              rowType: 'text',
              showEditPage: false,
              sliceNum:0, //显示多长，0为显示所有，没有这个属性则按照默认数值截断
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
              title: '用户',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'user_id',
              config:{
                quickVisit:[
                  {title:"用户列表",name:"userList",paramName:"user_id"},
                  {title:"用户坐标",name:"userCoord",paramName:"user_id"},
                ]
              },
              slots: {
                customRender: 'user_id',
              },
            },
            {
              align:'center',
              title: '买家昵称',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'buyer_nick',
              slots: {
                customRender: 'buyer_nick',
              },
            },
            // {
            //   title: '平台类型',
            //   rowType: 'text',
            //   showEditPage: false,
            //   dataIndex: 'type',
            //   slots: {
            //     customRender: 'type',
            //   },
            // },
            // {
            //   title: '年龄段',
            //   rowType: 'text',
            //   showEditPage: false,
            //   dataIndex: 'age_range',
            //   slots: {
            //     customRender: 'age_range',
            //   },
            // },
            {
              align:'center',
              title: '收货姓名',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'receiver_name',
              slots: {
                customRender: 'receiver_name',
              },
            },
            {
              align:'center',
              title: '收货手机号',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'receiver_mobile',
              slots: {
                customRender: 'receiver_mobile',
              },
            },
            {
              align:'center',
              title: '所有地址',
              rowType: 'text',
              showEditPage: false,
              width:200,
              dataIndex: 'all_address',
              slots: {
                customRender: 'all_address',
              },
            },
            {
              align:'center',
              title: '收货地址',
              rowType: 'text',
              showEditPage: false,
              width:200,
              dataIndex: 'receiver_address',
              slots: {
                customRender: 'receiver_address',
              },
            },
            {
              align:'center',
              title: 'IP地址',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'ip_area_state',
              slots: {
                customRender: 'ip_area_state',
              },
            },
            {
              align:'center',
              title: '激活状态',
              ruleType: 'number',
              rowType: 'button',
              showEditPage: true,
              dataIndex: 'is_activate',
              config: {
                isEdit: false,
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
            // {
            //   title: '状态',
            //   ruleType: 'number',
            //   rowType: 'button',
            //   showEditPage: true,
            //   dataIndex: 'state',
            //   config: {
            //     isEdit: false,
            //     type: 'button',
            //     width: '150',
            //     size: 'default',
            //     buttonBg: 'green',
            //     enumType: 'state',
            //     defaultValue: 0,
            //     value: '',
            //   },
            //   slots: {
            //     customRender: 'state',
            //   },
            // },
            // {
            //   title: '信息',
            //   rowType: 'text',
            //   showEditPage: false,
            //   dataIndex: 'message',
            //   slots: {
            //     customRender: 'message',
            //   },
            // },
            // {
            //   key: 'note',
            //   title: '备注',
            //   dataIndex: 'note',
            //   required: true,
            //   rowType: 'editColumns',
            //   showEditPage: true,
            //   config: {
            //     isEdit: true,
            //     type: 'text',
            //     width: '150',
            //     size: 'default',
            //     value: '',
            //   },
            //   slots: {
            //     customRender: 'note',
            //   },
            // },
          ],
        },
      }
    },
  }
</script>
