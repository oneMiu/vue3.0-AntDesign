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
              searchDate: false, //是否显示事件
              isToday: false, //是否是今天
              inputText: [
                {
                  key: 'merchant_name',
                  value: '微信公众号',
                  inputType: 'text',
                  inputValue: '',
                },
              ],
            },
            operationConfig: [
              //操作栏配置
              {
                type: 'normal',
                icon: 'ri-close-line',
                clickEvent: 'addData',
              },
              // {
              //   type: 'normal',
              //   text: '批量修改',
              //   icon: 'ri-close-line',
              //   ajaxInterface: 'user',
              //   clickEvent: 'blacklist',
              //   ajaxMethod: 'POST',
              //   extData: [
              //     {
              //       title: '状态',
              //       ruleType: 'number',
              //       required: true,
              //       dataIndex: 'is_black',
              //       rowType: 'button',
              //       showEditPage: true,
              //       config: {
              //         isEdit: true,
              //         type: 'button',
              //         width: '150',
              //         size: 'default',
              //         buttonBg: 'green',
              //         enumType: 'is_black__1',
              //         defaultValue: 0,
              //         value: '',
              //       },
              //     },
              //     {
              //       title: '用户',
              //       showEditPage: true,
              //       ruleType: 'number', //编辑时的类型
              //       required: true,
              //       rowType: 'editColumns',
              //       dataIndex: 'uuid',
              //       config: {
              //         type: 'number',
              //         width: '100',
              //         size: 'default',
              //         // min: 0,
              //         // max: 1000,
              //       },
              //     },
              //     {
              //       title: '几级',
              //       showEditPage: true,
              //       ruleType: 'number', //编辑时的类型
              //       required: true,
              //       rowType: 'editColumns',
              //       dataIndex: 'level',
              //       config: {
              //         isEdit: false, //是否可以修改
              //         type: 'number',
              //         width: '100',
              //         size: 'default',
              //         min: 0,
              //         max: 1000,
              //       },
              //     },
              //     {
              //       key: 'mobile',
              //       title: '备注',
              //       rowType: 'text',
              //       showEditPage: true,
              //       ruleType: 'text', //编辑时的类型
              //       dataIndex: 'note',
              //       config: {
              //         type: 'text',
              //       },
              //     },
              //   ],
              // },
              {
                type: 'export',
                float: 'right',
                icon: 'ri-close-line',
                clickEvent: 'exportData',
                extData: [
                  {
                    title: '状态',
                    ruleType: 'number',
                    required: true,
                    dataIndex: 'is_black',
                    rowType: 'button',
                    showEditPage: true,
                    config: {
                      isEdit: true,
                      type: 'button',
                      width: '150',
                      size: 'default',
                      buttonBg: 'green',
                      enumType: 'is_black__1',
                      // defaultValue: 0,
                      value: '',
                    },
                  },
                  {
                    title: '用户',
                    showEditPage: true,
                    ruleType: 'number', //编辑时的类型
                    required: true,
                    rowType: 'editColumns',
                    dataIndex: 'uuid',
                    config: {
                      type: 'number',
                      width: '100',
                      size: 'default',
                      min: 0,
                      max: 1000,
                    },
                  },
                  {
                    title: '几级',
                    showEditPage: true,
                    ruleType: 'number', //编辑时的类型
                    required: true,
                    rowType: 'editColumns',
                    dataIndex: 'level',
                    config: {
                      isEdit: false, //是否可以修改
                      type: 'number',
                      width: '100',
                      size: 'default',
                      min: 0,
                      max: 1000,
                    },
                  },
                  {
                    key: 'mobile',
                    title: '备注',
                    rowType: 'text',
                    showEditPage: true,
                    ruleType: 'text', //编辑时的类型
                    dataIndex: 'note',
                    config: {
                      type: 'text',
                    },
                  },
                ],
              },
            ],
            autoWidth: false, //平均分每列宽度
            ajaxInterface: 'user', //接口
            openType: 'modal', //打开编辑或者添加的模式为 弹窗或者页面 "modal" ||"page"
          },
          tableData: [
            {
              title: '客户',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'customer',
              config: {
                type: 'text',
              },
              slots: {
                customRender: 'customer',
              },
            },
            {
              title: '昵称',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'nick_name ',
              config: {
                type: 'text',
              },
              slots: {
                customRender: 'nick_name ',
              },
            },
            {
              title: '头像',
              dataIndex: 'headimgurl',
              ruleType: 'string', //编辑时的类型
              rowType: 'img',
              showEditPage: true,
              required: true,
              config: {
                type: 'img',
                width: 40,
                height: 40,
                clickEvent: 'showImg',
                uploadUrl: '/uploadpictures',
                fileList: [],
                previewVisible: false,
                previewImage: '',
                accept: 'image/png,image/jpg,image/jpeg',
              },
              slots: {
                customRender: 'headimgurl',
              },
            },
            {
              title: '公众号类型',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'service_type_info',
              config: {
                type: 'text',
              },
              slots: {
                customRender: 'service_type_info',
              },
            },
            {
              title: '公众号认证类型',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'verify_type_info',
              config: {
                type: 'text',
              },
              slots: {
                customRender: 'verify_type_info',
              },
            },
            {
              title: '原始 ID',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'user_name',
              config: {
                type: 'text',
              },
              slots: {
                customRender: 'user_name',
              },
            },
            {
              title: 'authorizer_appid',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'authorizer_appid',
              config: {
                type: 'text',
              },
              slots: {
                customRender: 'authorizer_appid',
              },
            },
            {
              title: 'authorizer_refresh_token',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'authorizer_refresh_token',
              config: {
                type: 'text',
              },
              slots: {
                customRender: 'authorizer_refresh_token',
              },
            },
            {
              title: '主体名称',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'principal_name',
              config: {
                type: 'text',
              },
              slots: {
                customRender: 'principal_name',
              },
            },
            {
              title: '公众号所设置的微信号，可能为空',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'alias',
              config: {
                type: 'text',
              },
              slots: {
                customRender: 'alias',
              },
            },
            {
              title: '用以了解功能的开通状况',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'business_info',
              config: {
                type: 'text',
              },
              slots: {
                customRender: 'business_info',
              },
            },
            {
              title: '二维码',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'qrcode_url',
              config: {
                type: 'text',
              },
              slots: {
                customRender: 'qrcode_url',
              },
            },
            {
              title: '权限集列表',
              rowType: 'text',
              showEditPage: false,
              dataIndex: 'func_info',
              config: {
                type: 'text',
              },
              slots: {
                customRender: 'func_info',
              },
            },
            {
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
            {
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
          description: [
            //额外拓展数据
          ],
        },
      }
    },
  }
</script>
