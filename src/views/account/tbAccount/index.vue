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
              inputText: [
                {
                  key: 'buyer_nick',
                  value: '买家昵称',
                  inputType: 'text',
                  inputValue: '',
                },
              ],
            },
            operationConfig: [
              {
                type: 'normal',
                text: '查询账号',
                modalWidth:1200,
                float: 'left',
                icon: 'file-search-line',
                ajaxInterface: 'querbuyernick',
                clickEvent: 'searchModal',
                ajaxMethod: 'POST',
                role:[201,301,302],
                extData: [
                  {
                    key:"buyer_nick",
                    placeholder:"请输入买家昵称进行查询",
                    value:"",
                    callback:"querbuyernickCallback",
                  }
                ],
              },
              {
                type: 'normal',
                text: '上传账号',
                float: 'right',
                icon: 'ri-close-line',
                ajaxInterface: 'taobaoaccount',
                clickEvent: 'blacklist',
                ajaxMethod: 'POST',
                paramsType:"file",
                role:[201,301,302],
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
                      uploadUrl: '/taobaoaccount/',
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
            autoWidth: false, //平均分每列宽度
            ajaxInterface: 'taobaoaccount', //接口
            openType: 'modal', //打开编辑或者添加的模式为 弹窗或者页面 "modal" ||"page"
          },
          tableData: [
            {
              //表格数据
              align:'center',
              title: '查询时间',
              rowType: 'text',
              showEditPage: false,
              ellipsis: true,
              dataIndex: 'liveness_query_date',
              config: {
                type: 'datetime',
                value: '',
              },
              slots: {
                customRender: 'liveness_query_date',
              },
            },
            {
              align:'center',
              title: '买家昵称',
              ellipsis: true,
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'buyer_nick',
              config: {
                type: 'text',
              },
              slots: {
                customRender: 'buyer_nick',
              },
            },
            {
              //表格数据
              align:'center',
              title: '注册时间',
              ellipsis: true,
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'created',
              config: {
                type: 'datetime',
                value: '',
              },
              slots: {
                customRender: 'created',
              },
            },
            {
              align:'center',
              title: '周单',
              rowType: 'text',
              showEditPage: false,
              ellipsis: true,
              dataIndex: 'buyer_avg',
              config: {
                type: 'number',
              },
              slots: {
                customRender: 'buyer_avg',
              },
            },
            {
              align:'center',
              title: '降权',
              rowType: 'text',
              ellipsis: true,
              showEditPage: false,
              dataIndex: 'down_num',
              config: {
                type: 'number',
              },
              slots: {
                customRender: 'down_num',
              },
            },
            {
              align:'center',
              title: '差评',
              rowType: 'text',
              ellipsis: true,
              showEditPage: false,
              dataIndex: 'bad_num',
              config: {
                type: 'number',
              },
              slots: {
                customRender: 'bad_num',
              },
            },
            {
              align:'center',
              title: '买家等级',
              ruleType: 'number',
              ellipsis: true,
              rowType: 'button',
              showEditPage: true,
              dataIndex: 'buyer_level',
              config: {
                isEdit: false,
                type: 'button',
                noStyle:true,
                size: 'default',
                buttonBg: 'green',
                enumType: 'buyer_level',
                defaultValue: 0,
                value: '',
              },
              slots: {
                customRender: 'buyer_level',
              },
            },
            {
              align:'center',
              title: '注册天数',
              ellipsis: true,
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'regist_day',
              config: {
                type: 'number',
              },
              slots: {
                customRender: 'regist_day',
              },
            },
            {
              align:'center',
              title: '好评率',
              ellipsis: true,
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'good_rate',
              config: {
                type: 'number',
                defaultValue: 100,
              },
              slots: {
                customRender: 'good_rate',
              },
            },
             {
              align:'center',
              title: '性别',
              ellipsis: true,
              ruleType: 'number',
              rowType: 'button',
              showEditPage: true,
              dataIndex: 'sex',
              config: {
                isEdit: false,
                type: 'button',
                noStyle:true,
                width: '150',
                size: 'default',
                buttonBg: 'green',
                enumType: 'sex',
                defaultValue: 0,
                value: '',
              },
              slots: {
                customRender: 'sex',
              },
            },
            {
              align:'center',
              title: '本周查询次数',
              rowType: 'text',
              ellipsis: true,
              showEditPage: false,
              dataIndex: 'quy_near_week',
              config: {
                type: 'number',
              },
              slots: {
                customRender: 'quy_near_week',
              },
            },
            {
              align:'center',
              title: '上周查询次数',
              rowType: 'text',
              showEditPage: false,
              ellipsis: true,
              dataIndex: 'quy_last_week',
              config: {
                type: 'number',
              },
              slots: {
                customRender: 'quy_last_week',
              },
            },
             {
              align:'center',
              title: '卖家等级',
              ruleType: 'number',
              rowType: 'select',
              ellipsis: true,
              showEditPage: true,
              dataIndex: 'seller_credit',
              config: {
                isEdit: false,
                type: 'select',
                width: '150',
                size: 'default',
                buttonBg: 'green',
                enumType: 'seller_credit',
                defaultValue: 0,
                value: '',
              },
              slots: {
                customRender: 'seller_credit',
              },
            },
            {
              align:'center',
              title: '实名认证',
              ruleType: 'number',
              ellipsis: true,
              rowType: 'select',
              showEditPage: true,
              dataIndex: 'real_name',
              config: {
                isEdit: false,
                type: 'select',
                width: '150',
                size: 'default',
                buttonBg: 'green',
                enumType: 'real_name',
                defaultValue: 0,
                value: '',
              },
              slots: {
                customRender: 'real_name',
              },
            },
            {
              align:'center',
              title: '活跃点',
              rowType: 'text',
              showEditPage: false,
              ellipsis: true,
              dataIndex: 'liveness',
              config: {
                type: 'number',
              },
              slots: {
                customRender: 'liveness',
              },
            },
            {
              align:'center',
              title: '活跃等级',
              rowType: 'text',
              ellipsis: true,
              showEditPage: false,
              dataIndex: 'liveness_level',
              config: {
                type: 'number',
              },
              slots: {
                customRender: 'liveness_level',
              },
            },
            {
              align:'center',
              title: '优质',
              ruleType: 'number',
              rowType: 'button',
              ellipsis: true,
              showEditPage: true,
              dataIndex: 'is_quality',
              config: {
                isEdit: false,
                type: 'button',
                width: '150',
                noStyle:true,
                size: 'default',
                buttonBg: 'green',
                enumType: 'is_quality',
                defaultValue: 0,
                value: '',
              },
              slots: {
                customRender: 'is_quality',
              },
            },
            {
              align:'center',
              title: '状态',
              ruleType: 'number',
              rowType: 'button',
              ellipsis: true,
              showEditPage: true,
              dataIndex: 'is_activate',
              config: {
                isEdit: true,
                type: 'button',
                width: '150',
                size: 'default',
                buttonBg: 'green',
                enumType: 'is_activate__1',
                defaultValue: 0,
                value: '',
              },
              slots: {
                customRender: 'is_activate',
              },
            },
            // {
            //   title: '买家身份',
            //   rowType: 'text',
            //   showEditPage: false,
            //   dataIndex: 'seller_credit',
            //   config: {
            //     type: 'number',
            //   },
            //   slots: {
            //     customRender: 'seller_credit',
            //   },
            // },
            // {
            //   title: '活跃等级查询时间',
            //   rowType: 'text',
            //   showEditPage: false,
            //   dataIndex: 'liveness_query_date',
            //   config: {
            //     type: 'datetime',
            //     value: '',
            //   },
            //   slots: {
            //     customRender: 'liveness_query_date',
            //   },
            // },
            
            // {
            //   title: '上周查询_状态',
            //   rowType: 'text',
            //   showEditPage: false,
            //   dataIndex: 'down_state',
            //   config: {
            //     type: 'number',
            //   },
            //   slots: {
            //     customRender: 'down_state',
            //   },
            // },
            // {
            //   title: '是否白名单',
            //   rowType: 'text',
            //   showEditPage: false,
            //   dataIndex: 'is_white',
            //   config: {
            //     type: 'number',
            //   },
            //   slots: {
            //     customRender: 'is_white',
            //   },
            // },
            // {
            //   title: '平台类型',
            //   rowType: 'text',
            //   showEditPage: false,
            //   dataIndex: 'platform_type',
            //   config: {
            //     type: 'number',
            //   },
            //   slots: {
            //     customRender: 'platform_type',
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
            // {
            //   key: 'operation',
            //   // fixed: 'right',
            //   title: '操作',
            //   rowType: 'operation',
            //   dataIndex: 'operation',
            //   operation: true,
            //   operationList: [
            //     //操作列表（按钮啥的）
            //     {
            //       text: '编辑',
            //       clickType: 'edit',
            //       clickEvent: 'editRow',
            //     },
            //     {
            //       text: '删除',
            //       clickType: 'delete',
            //       clickEvent: 'onDelete',
            //       title: '确定要删除此条信息吗？？',
            //     },
            //   ],
            //   slots: {
            //     customRender: 'operation',
            //   },
            // },
          ],
          description: [
            //额外拓展数据
            {
              title: '兔子',
              ruleType: 'number',
              rowType: 'text',
              showEditPage: true,
              dataIndex: 'type1',
              config: {
                isEdit: false,
                type: 'text',
              },
            },
            {
              title: '蜜獾',
              ruleType: 'number',
              rowType: 'text',
              showEditPage: true,
              dataIndex: 'type2',
              config: {
                isEdit: false,
                type: 'text',
              },
            },
            {
              title: '狐狸',
              ruleType: 'number',
              rowType: 'text',
              showEditPage: true,
              dataIndex: 'type3',
              config: {
                isEdit: false,
                type: 'text',
              },
            },
            {
              title: '鳄鱼',
              ruleType: 'number',
              rowType: 'text',
              showEditPage: true,
              dataIndex: 'type4',
              config: {
                isEdit: false,
                type: 'text',
              },
            },
            {
              title: '野狗',
              ruleType: 'number',
              rowType: 'text',
              showEditPage: true,
              dataIndex: 'type5',
              config: {
                isEdit: false,
                type: 'text',
              },
            },
            {
              title: '老鼠',
              ruleType: 'number',
              rowType: 'text',
              showEditPage: true,
              dataIndex: 'type6',
              config: {
                isEdit: false,
                type: 'text',
              },
            },
          ],
        },
      }
    },
  }
</script>
