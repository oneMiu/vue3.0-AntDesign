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
                    key: 'item_name',
                    value: '商品名',
                    inputType: 'text',
                    inputValue: '',
                  },
                  {
                    key: 'num_iid',
                    value: '商品id',
                    inputType: 'number',
                    inputValue: '',
                  },
                ],
              },
              select:[
                {
                  selectKey: '店铺',
                  selectType: 'shopapi',
                  requestKey:"shop_id",
                  selectValue: '全部',
                },
              ]
            },
            operationConfig: [
              //操作栏配置
              {
                type: 'normal',
                icon: 'ri-close-line',
                clickEvent: 'addData',
                role:[301,201]
              },
              {
                type: 'normal',
                text: '获取商品',
                icon: 'ri-close-line',
                ajaxInterface: 'shopiteminfo',
                clickEvent: 'blacklist',
                ajaxMethod: 'POST',
                extData: [
                  {
                    title: '店铺',
                    ruleType:"number",
                    showEditPage: true,
                    required: false,
                    dataIndex: 'shop_name',
                    config: {
                      // displayItem: ['item_name'], //选择完之后显示谁！以这个属性判断某个属性是否需要与其联动！
                      // changeRequestAPI: { item_name: 'itemapi' }, //下拉改变时，数据也以这个名字存放在store、enum的地方
                      type: 'select',
                      enumType: 'shopapi',
                      requestKey: 'shop_id',
                      value: '',
                    },
                  },
                ],
              },
              {
                type: 'normal',
                text: '上传商品',
                float: 'right',
                icon: 'ri-close-line',
                ajaxInterface: 'item',
                clickEvent: 'blacklist',
                ajaxMethod: 'POST',
                paramsType:"file",
                role:[201,301,302],
                extData: [
                  {
                    key: 'mobile',
                    title: '上传商品',
                    rowType: 'uploadFile',
                    ruleType:"file",
                    required: true,
                    showEditPage: true,
                    dataIndex: 'file',
                    config: {
                      fileList:[],
                      type: 'uploadFile',
                      uploadUrl: '/item/',
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
            ajaxInterface: 'item', //接口
            openType: 'modal', //打开编辑或者添加的模式为 弹窗或者页面 "modal" ||"page"
          },
          tableData: [
            {
              align:'center',
              title: '日期',
              rowType: 'text',
              showEditPage: false,
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
              showEditPage: true,
              required: true,
              dataIndex: 'shop_name',
              config: {
                // displayItem: ['item_name'], //选择完之后显示谁！以这个属性判断某个属性是否需要与其联动！
                // changeRequestAPI: { item_name: 'itemapi' }, //下拉改变时，数据也以这个名字存放在store、enum的地方
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
              showEditPage: true,
              required: true,
              width:180,
              dataIndex: 'item_name',
              config: {
                type: 'text',
                value: '',
                question:'商品名字'
              },
              slots: {
                customRender: 'item_name',
              },
            },
            {
              align:'center',
              title: '商品ID',
              rowType: 'text',
              ruleType:"number",
              required: true,
              dataIndex: 'num_iid',
              showEditPage:true,
              config: {
                question:"输入商品ID点击获取数据自动填充商品主图和标题内容",
                type: 'number',
                width:"297",
                clickEvent:"openPage",
                openPageName:"https://detail.tmall.com/item.htm?",
                paramName:["id"],
                paramValue:["num_iid"],
                showGetItem:true,
              },
              slots: {
                customRender: 'num_iid',
              },
            },
            {
              align:'center',
              title: '主图',
              dataIndex: 'pic_url',
              ruleType: 'img', //编辑时的类型
              rowType: 'img',
              showEditPage: true,
              required: true,
              width:150,
              config: {
                orderBy:"num_iid",
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
              title: '标题内容',
              rowType: 'text',
              required: true,
              showEditPage:true,
              dataIndex: 'item_title',
              width:180,
              config: {
                type: 'textarea',
                textareaConfig:{ minRows: 5, maxRows: 5 }
              },
              slots: {
                customRender: 'item_title',
              },
            },
            {
              align:'center',
              title: '淘客',
              ruleType: 'number',
              rowType: 'button',
              showEditPage: true,
              required: true,
              dataIndex: 'is_taoke',
              config: {
                isEdit: true,
                type: 'button',
                width: '150',
                // noStyle:true,
                size: 'default',
                buttonBg: 'green',
                enumType: 'is_taoke',
                defaultValue: 0,
                value: '',
              },
              slots: {
                customRender: 'is_taoke',
              },
            },
            {
              align:'center',
              title: '同类商品',
              rowType: 'text',
              showEditPage: false,
              required: true,
              dataIndex: 'customData',
              sliceNum:0,
              customData:"跳转",
              config: {
                type: 'text',
                clickEvent:"openPage",
                openPageName:"similarCommodity",
                paramName:["item_id"],
                paramValue:["id"],
                value: '',
              },
              slots: {
                customRender: 'customData',
              },
            },
            {
              align:'center',
              title: '商品备注',
              dataIndex: 'item_note',
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
                customRender: 'item_note',
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
          ],
        },
      }
    },
  }
</script>
