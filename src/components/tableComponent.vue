<template>
<div id="tablePage">
    <!-- 搜索项 -->
    <div class="searchParams">
        <!--时间搜索-->
        <a-input-group compact class="searchItem" v-if="tableConfig.searchConfig.searchDate">
            <a-select value="时间" style="width:120px">
                <a-select-option value="时间">
                    时间
                </a-select-option>
            </a-select>
            <a-range-picker v-model:value="create_date" :ranges="pickerRanges" :style="{'color':create_date?'#40a9ff':'#bfbfc5'}" style="width:220px"  @change="create_dateChange" />
        </a-input-group>
        <!--下拉框和输入框搜索-->
        <a-input-group compact class="searchItem" v-if="tableConfig.searchConfig.selectInput">
            <a-select label-in-value style="width:120px" v-model:value="selectInputValue" @change="selectInputChange_search">
                <a-select-option :value="selectIndex" v-for="(selectItem,selectIndex) in tableConfig.searchConfig.selectInput.options" :key="selectItem.key">
                    {{selectItem.value}}
                </a-select-option>
            </a-select>

            <a-input v-model:value="currentSelectInput.inputValue"  style="width:220px" :style="{'color':currentSelectInput.inputValue?'#40a9ff':'#bfbfc5'}" :placeholder="'请输入'+currentSelectInput.value" @input="currentSelectInputChange(currentSelectInput)" />
        </a-input-group>

        <!--普通输入框-->
        <a-input-group class="searchItem" compact v-for="(itemValue,itemIndex) in tableConfig.searchConfig.inputText" :key="itemIndex">
            <a-input v-model:value="itemValue.value" readonly  style="width:120px"></a-input>
            <a-input v-model:value="itemValue.inputValue"  style="width:220px" :style="{'color':itemValue.inputValue?'#40a9ff':'#bfbfc5'}" :placeholder="itemValue.placeholder?itemValue.placeholder:'请输入'+itemValue.value" @blur="currentSelectInputChange(itemValue)" @input="currentSelectInputInput(itemValue)">
            </a-input>
        </a-input-group>
        <!--左右两边都是下拉框的搜索-->
        <a-input-group compact class="searchItem" v-if="tableConfig.searchConfig.doubleSelect">
            <a-select label-in-value style="width:120px" v-model:value="doubleSelectKey" @change="doubleSelectChange">
                <a-select-option :value="selectIndex" v-for="(selectItem,selectIndex) in tableConfig.searchConfig.doubleSelect.options" :key="selectItem.selectType">
                    {{selectItem.selectKey}}
                </a-select-option>
            </a-select>
           <a-select label-in-value style="width:220px" v-model:value="doubleSelectValue" placeholder="全部" :style="{'color':doubleSelectValue && doubleSelectValue.key!='全部'?'#40a9ff':'#bfbfc5'}" v-if="publicDataOver || !doubleSelectKey.requestKey" @change="(c,option)=>selectChange_search({changeData:c,itemValue:doubleSelectKey,option,doubleSelectValue:doubleSelectValue})" showSearch allowClear >
                <a-select-option :value="selectItem" v-for="(selectItem,selectIndex) in enumObj.Enum.enumType[doubleSelectKey.selectType]" :key="selectIndex">
                    {{selectItem}}
                </a-select-option>
            </a-select>
            <div v-else style='width:197px;text-align:left'><LoadingOutlined />{{doubleSelectKey.selectKey}}列表加载中...</div>
        </a-input-group>

        <!--普通下拉框搜索-->
        <a-input-group compact class="searchItem" v-for="(itemValue,itemIndex) in tableConfig.searchConfig.select" :key="itemIndex">
            <a-input v-model:value="itemValue.selectKey" readonly>
                <template v-slot:addonAfter>
                    <a-select style="width:220px" :style="{'color':itemValue.selectValue!='全部'?'#40a9ff':'#bfbfc5'}" v-if="publicDataOver || !itemValue.requestKey"
                     v-model:value="itemValue.selectValue" showSearch allowClear @change="(c,option)=>selectChange_search({changeData:c,itemValue,option})" placeholder="全部">
                        <a-select-option :value="selectItem" v-for="(selectItem,selectIndex) in enumObj.Enum.enumType[itemValue.selectType]" :key="selectIndex">
                            {{selectItem}}
                        </a-select-option>
                    </a-select>
                    <div v-else style='width:197px;text-align:left'><LoadingOutlined />{{itemValue.selectKey}}列表加载中...</div>
                </template>
            </a-input>
        </a-input-group>

        <a-input-group compact class="searchItem" v-if="tableConfig.searchConfig.searchDate || tableConfig.searchConfig.selectInput || tableConfig.searchConfig.inputText || tableConfig.searchConfig.select">
            <a-button type="primary" :loading='$store.getters["customData/loadingInstance"]' @click="search">
                搜索
            </a-button>
        </a-input-group>

    </div>
    <!-- 搜索列表显示 -->
    <div v-if="Object.keys(searchList).length>0">
        <div style="margin:0px -20px;background:#f0f2f5;height:20px"></div>
        <div style="margin:20px 0px;">
            <a-tag closable color="purple" v-for="(v,k) in searchList" :key="k" @close="closeTag(k)">
                {{k}}：{{v.value}}
            </a-tag>

            <a-tag color="red" @click="closeTag('','all')">
                清空
            </a-tag>
        </div>
        <div style="margin:0px -20px;background:#f0f2f5;height:20px"></div>
    </div>
    <!-- 操作列 -->
    <div class="operation_contains" v-if="tableConfig.operationConfig">
        <span class="operation" v-for="(item,index) in tableConfig.operationConfig" :key="index" :style="{'float':item.float?item.float:'left','margin':item.float == 'left' || !item.float ? '20px 20px 20px 0px': '20px 0px 20px 20px'}">
            <a-button
            type="primary" 
            v-if="(item.type==='normal' && (item.role && item.role.includes(userInfo.role) || (!item.role && (userInfo.role==201 || userInfo.role==301)))) || (item.type==='export' && (userInfo.role==201 || userInfo.role==301 || (item.role && item.role.includes(userInfo.role))))"
            size="large"
            @click="operationClick(item,index)">
                <span v-if="item.type=='normal'">
                    <EditOutlined />
                    {{item.text?item.text:'添加'+$route.meta.title}}
                </span>
                <span v-else-if="item.type=='export'">
                    <DownloadOutlined />
                    {{item.text?item.text:'导出'+$route.meta.title}}
                </span>
            </a-button>
        </span>
    </div>
    <!-- 审核按钮、只有红包页面有 -->
    <div style="display: inline-flex;padding: 0px 10px 20px 0px;" v-if="selectction.selectedRowKeys.length>0">
        <span style="margin-right:10px;">已选择<span style="color:#40a9ff;font-size:20px;">{{selectction.selectedRowKeys.length}}</span>项</span>
        <div>
            <a-button class="verifyBtn warning-btn" type="primary" @click="batchVerify(0,'faad14')">待提交</a-button>
            <a-button class="verifyBtn success-btn" type="primary" @click="batchVerify(2,'52c41a')">已通过</a-button>
            <a-button class="verifyBtn danger-btn" type="primary" @click="batchVerify(3,'ff4d4f')">未通过</a-button>
        </div>
    </div>
    <!-- 表格 -->
    <a-table id="aTable" bordered :data-source="dataSource" :rowSelection="tableConfig.showSeletction?selectction:undefined" :scroll="{ x: tableConfig.autoWidth?1:true}" :columns="columns" :pagination="pagination" :loading='$store.getters["customData/loadingInstance"]' @change="handleTableChange" :row-key="(record) => record.id">
        <template v-slot:[item.dataIndex]="{ text, record }" v-for="(item,index) in columns">
            <div :key="index"  @dblclick="copyText(item,record,$event)">
                <div v-if="item.slots" style="display: flex;justify-content: center;align-items: center;" :style="{'min-height':minHeight+'px'}">
                    <!-- 行内编辑的列 -->
                    <div v-if="item.rowType=='editColumns' || item.rowType=='select'">
                        <!-- 行内编辑组件 -->
                        <editable-cell :tableConfig="tableConfig" :style="{'white-space':'nowrap','overflow':'hidden'}" :item="item" :text="text" :record="record" @change="val => onCellChange(record.key, item.dataIndex, val)" @enter="edittableEnter" @click="clickItem(text,record,item)" />
                    </div>

                    <!--图片-->
                    <div v-else-if="item.rowType=='img'"  :style="{'height':item.config.height+20+'px','width':item.config.width+'px'}" class="asdasdasd">
                        <a-tooltip placement="top" v-model:visible="record[item.dataIndex+'ShowTip']" @visibleChange="visibleTip" style="width:auto">
                            <template #title v-if="$route.name==='myTask' || $route.name==='taskRoom'" @mouseout="imageOut(record,item.dataIndex)">
                                <p style="display: flex;justify-content: space-between;">店铺备注：{{record.shop_note}}&nbsp;&nbsp;<a-button v-if="record.shop_note" @click="clip(record.shop_note,$event)" size="small" type="primary">复制</a-button></p>
                                <p style="display: flex;justify-content: space-between;">商品备注：{{record.item_note}}&nbsp;&nbsp;<a-button v-if="record.item_note" @click="clip(record.item_note,$event)" size="small" type="primary">复制</a-button></p>
                                <p>插旗：{{enumObj.Enum.enumType["flag"][record.flag]}}</p>
                                <p style="display: flex;justify-content: space-between;">插旗备注：{{record.memo}}&nbsp;&nbsp;<a-button v-if="record.memo" @click="clip(record.memo,$event)" size="small" type="primary">复制</a-button></p>
                            </template>
                            <template #title v-else-if="item.config.showImgTip && text">
                                <img :src="text" @click="showBigImage(item.dataIndex+'Ref')" width="300" style="margin:10px;cursor: pointer;" alt="">
                            </template>
                            <ImagePreViewer :ref="item.dataIndex+'Ref'" :showMosaic="item.config.showMosaic" :src="text" :recordData="record" @changeTipShow="()=>record[item.dataIndex+'ShowTip']=false" @mouseover="imageOver(record,item.dataIndex)" :style="{'height':item.config.height+'px','width':item.config.width+'px'}" />
                        </a-tooltip>
                    </div>

                    <!--按钮-->
                    <div v-else-if="item.rowType=='button'">
                        <div v-if="item.config.noStyle || record.editAllTable" :style="{'background':enumObj.Enum.tableKewordColor[text]}" style="padding: 5px;color: white;border-radius: 5px;white-space: nowrap;">
                            {{enumObj.Enum.enumType[item.config.enumType][text]}}
                        </div>
                        <div v-else>
                            <a-popconfirm v-if="item.config.isEdit" :title="'是否将  '+item.title+'  修改为  '+enumObj.Enum.enumType[item.config.enumType][text==0?1:0]+'  ?'" ok-text="确定" cancel-text="取消" @confirm="rowButtonConfirm" @cancel="cancel">
                            <a-tag :color="text==0?null:item.config.buttonBg" style="cursor: pointer;" @click="clickItem(text,record,item)">
                                {{enumObj.Enum.enumType[item.config.enumType][text]}}
                            </a-tag>
                            </a-popconfirm>
                            <a-tag v-else :color="text==0?null:item.config.buttonBg" @click="clickItem(text,record,item)">
                                {{enumObj.Enum.enumType[item.config.enumType][text]}}
                            </a-tag>
                        </div>
                    </div>

                    <div v-else-if="item.rowType=='allRowEdit'">
                        <a-input v-if="record.editAllTable" style="margin: -5px 0;height:40px" :style="{'width':item.config.allRowEditWidth?item.config.allRowEditWidth+'px':'100px'}" size="small" :value="text" @change="e => editAllChange(e.target.value, record, index)" />
                        <template v-else>
                            <NormalRow :tableConfig="tableConfig" :item="item" :record="record" @clickItem="clickItem" :text="text" />
                        </template>
                    </div>

                    <!-- 右边的操作列 -->
                    <div v-else-if="!record.editAllTable && item.rowType=='operation'" style="display:flex">
                        <div v-for="(operation,oIndex) in item.operationList" :key="oIndex">
                            <!--编辑按钮-->
                            <div v-if="!operation.role || operation.role.includes(userInfo.role)">
                                <a-button v-if="operation.clickType=='edit'" style="margin-right: 5px;" size="small" @click="clickItem(text,record,item,operation)" type="primary" :disabled="operation.needCustomDisable===true && record.is_sub===1">
                                    {{operation.text}}
                                </a-button>
                                <!--删除按钮-->
                                <a-popconfirm v-if="operation.clickType=='delete'" :title="operation.title" @confirm="clickItem(text,record,item,operation)">
                                    <a-button size="small" type="danger">{{operation.text}}</a-button>
                                </a-popconfirm>

                                <a-button v-if="operation.clickType=='custom'" style="margin-left: 5px;" size="small" @click="clickItem(text,record,item,operation)" type="primary" :disabled="operation.needCustomDisable===true && record.is_sub===1">
                                    {{operation.text}}
                                </a-button>
                                <a-button v-if="operation.clickType=='verify'" style="margin-left: 5px;" size="small" @click="clickItem(text,record,item,operation)" type="primary" :disabled="operationBtnShow(record,operation)">
                                    {{operation.text}}
                                </a-button>
                            </div>
                        </div>
                    </div>

                    <!-- 右边的操作列 -->
                    <div v-else-if="record.editAllTable && item.rowType=='operation'" :style="{'width':(item.width-40)+'px'}">
                        <div style="display:inline">
                            <!--取消按钮-->
                            <!-- <a-popconfirm title="取消将不会保存所更改的内容！" @confirm="editAllCancel(record)"> -->
                                <a-button style="margin-right: 5px;" size="small" @click="editAllCancel(record)" type="dashed">取消</a-button>
                            <!-- </a-popconfirm> -->
                            <!--保存按钮-->
                            <a-button  size="small" @click="editAllSave(record,index)" type="primary">
                                保存
                            </a-button>
                        </div>
                    </div>
                    <NormalRow v-else :item="item" :tableConfig="tableConfig" :record="record" @clickItem="clickItem" :text="text" />
                </div>
            </div>

        </template>

        <template v-if="description.length>0" v-slot:expandedRowRender="{ text, record }">
            <a-row type="flex" justify="start">
                <a-col v-for="(value,key) in description" :key="key" :span="6">
                    <span style="color:rgba(0,0,0,.45);max-width: 300px;line-height: 30px;text-align: left;margin-right:50px;white-space: pre-line;" @dblclick="copyText(value,record,$event)">
                        <span style="font-weight: bold;">{{value.title}}: </span>
                        <span v-if="(record[value.dataIndex]===0 || record[value.dataIndex]) && value.config && record[value.dataIndex]!==''">
                            <span v-if="value.config.type=='switch'">
                                <a-tag color="orange" style="margin-right:5px;" v-for="(a,b) in computedData(value,record[value.dataIndex])" :key="b">
                                    {{a}}
                                </a-tag>
                            </span>
                            <span v-else-if="value.config.type=='button'">
                                <a-popconfirm v-if="value.config.isEdit" :title="'是否将  '+value.title+'  修改为  '+enumObj.Enum.enumType[value.config.enumType][text==0?1:0]+'  ?'" ok-text="确定" cancel-text="取消" @confirm="rowButtonConfirm" @cancel="cancel">
                                    <a-tag color="cyan" style="cursor: pointer;" @click="clickItem(text,record,value)">
                                        {{enumObj.Enum.enumType[value.config.enumType][record[value.dataIndex]] || record[value.dataIndex]}}
                                    </a-tag>
                                </a-popconfirm>
                                <span v-else>
                                    <span v-if='value.config.clickEvent==="openPage"' style="cursor: pointer;color:#13c2c2;text-decoration: underline;"  @click="clickItem(text,record,value)" >
                                        {{enumObj.Enum.enumType[value.config.enumType][record[value.dataIndex]] || record[value.dataIndex]}}
                                    </span>
                                    <a-tag color="cyan" @click="clickItem(text,record,value)" v-else>
                                        {{enumObj.Enum.enumType[value.config.enumType][record[value.dataIndex]] || record[value.dataIndex]}}
                                    </a-tag>
                                </span>
                                
                            </span>
                            <span v-else-if="value.config.type=='select'">
                                <a-tag color="cyan">
                                    {{enumObj.Enum.enumType[value.config.enumType][record[value.dataIndex]] || record[value.dataIndex]}}
                                </a-tag>
                            </span>
                            <span v-else-if="value.config.type=='img'">
                                <a-tooltip v-model:visible="record[value.dataIndex+'ShowTip']"  style="width:auto" placement="topLeft">
                                    <template #title>
                                        <img width=300 @click="showBigImage(value.dataIndex+'Ref')" style="cursor: pointer;" :src="record[value.dataIndex]" alt="">
                                    </template>
                                    <ImagePreViewer :ref="value.dataIndex+'Ref'" style="display: inline-flex;" :src="record[value.dataIndex]" :recordData="record" @changeTipShow="()=>record[value.dataIndex+'ShowTip']=false" @mouseover="imageOver(record,value.dataIndex)" :style="{'height':value.config.height+'px','width':value.config.width+'px'}" />
                                </a-tooltip>
                            </span>
                            <span v-else>
                                <a-tag color="cyan" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;max-width:200px;    display: inline-flex;">
                                    <NormalRow :item="value" :record="record" :text="record[value.dataIndex]" />
                                </a-tag>
                            </span>
                        </span>
                        <a-tag color="cyan" v-else> 
                            无
                        </a-tag>
                    </span>
                </a-col>
            </a-row>
        </template>
    </a-table>

    <Modal ref="modal"></Modal>
    <ModalForSearch ref="ModalForSearch"></ModalForSearch>
    <ModalForAction ref="ModalForAction"></ModalForAction>
</div>
</template>

<script>
import {
    getTableList,
    getList,
    addData,
    doEdit,
    doDelete,
    exportTable,
} from '@/api/table'
import moment from 'moment';
import enumObj from '@/utils/enum.js'
import {exportExcel} from '@/utils/excelHelper'
import {
    replaceNum,
    deepCopy,
    isChina
} from '@/utils/validate'
import {
    formatTime,
    parseTime,
    setCache,
    getCache,
    removeCache
} from '@/utils/index'
import {
    DownloadOutlined,
    EditOutlined,
    LoadingOutlined,
} from '@ant-design/icons-vue';
import ImagePreViewer from './ImagePreViewer.vue'
import NormalRow from './normalRow.vue'
import ModalForAction from './modalForAction.vue'
import EditableCell from './editTableCell.vue'
import Modal from './modal.vue'
import ModalForSearch from './modalForSearch.vue'
import {mapGetters} from 'vuex'
let oldRecord_G;
import clip from '@/utils/clipboard'
export default {
    name: 'tableComponent',
    provide () {
      return {
          parentOpenPage:this.openPage
      }
    },
    components: {
        LoadingOutlined,
        EditableCell,
        DownloadOutlined,
        EditOutlined,
        Modal,
        ImagePreViewer,
        NormalRow,
        ModalForSearch,
        ModalForAction
    },
    props: {
        tableMessage: {
            type: [Array, Object],
            default: {}
        },
    },
    data() {
        return {
            searchList:{},
            doubleSelectKey:{},
            doubleSelectValue:{key:"全部"},
            selectction:{
                selections: [
                    {
                        key: 'reset',
                        text: '重新选择',
                        onSelect: () => {
                        this.selectction.selectedRowKeys = [];
                        },
                    },
                ],
                selectedRowKeys: [],
                onChange:(key)=>{
                    this.selectction.selectedRowKeys = key
                },
                getCheckboxProps: record => ({
                    name: record.title,
                }),
            },
            minHeight:64,
            pickerRanges:{ 
                '今天': [moment(), moment()], 
                '最近一周': [moment().subtract(7, 'day'), moment()],
                '最近一个月': [moment().subtract(1, 'month'), moment()],
                // '最近两个月': [moment().subtract(2, 'month'), moment()],
                // '最近三个月': [moment().subtract(3, 'month'), moment()],
            },
            moment,
            isChina,
            enumObj,
            dataSource: [],
            pagination: {
                current:1,
                each_page_num: 10,
                page: 1,
                // showLessItems: true,
                showQuickJumper: true,
                showSizeChanger: true,
                showTotal:function(total, range){
                    return "共"+total+"条  "
                }
            },
            columns: [{}, ],
            description: [],
            create_date: [],
            tableConfig: {
                searchConfig: {
                    searchDate: true,
                    isToday: true,
                },
            },
            selectInputValue: {},
            currentSelectInput: {
                key: 'user_id',
                value: '做单用户',
                inputType: 'number',
                inputValue: "",
            },
            selectTitle: "状态",
            searchForm: {
                create_date: "",
            },
            currentRow: {}, //当前点击的行
            timeStamp: 0, //鼠标滚动的系数
            isAddData: false, //点添加或者编辑的标识
            editAllFormData: {}, //点击编辑行的时候提交的表单
            userInfo:getCache("userInfo"),
            clip,
            showImageList:{

            },
            pageCache:{},
        };
    },
    watch:{
        publicDataOver(n,o){
            if(n==true){
                this.init();
            }
        }
    },
    mounted() {
        this.initSearchForm();
        if(this.publicDataOver){
            this.init();
        }
        let isImgCol = this.columns.find(x => x.rowType == "img")
        let table = document.getElementById("aTable");
        let tablePage = document.getElementById("tablePage");
        // var antTableBody = document.getElementsByClassName("ant-table-body")[0];
        // setTimeout(() => {
        //     if (antTableBody.offsetWidth != antTableBody.scrollWidth) {
        //         let operation = this.columns.find(x => x.rowType == "operation");
        //         //处理有图片时候取消左右滚动
                if (isImgCol) {
                    // table.addEventListener('DOMMouseScroll', this.handlerMouserScroll, false)
                    // table.addEventListener('mousewheel', this.handlerMouserScroll, false)
                    this.minHeight = 80;
                }
        //         //处理固定右侧操作列表时有缝隙
        //         if (operation) {
        //             operation.fixed = "right";
        //         }
        //     }
        // }, 400)
        tablePage.onkeyup = (ev)=>{
            if(ev.keyCode===13){
                this.search();
            }
            return false;
        }
        // table.oncontextmenu = (event) => {event.preventDefault()}
        table.onmousedown=(e)=>{ 
            if(e.which==3){
                if(this.currentRow.record && this.currentRow.record.editAllTable){
                    this.currentRow.record.editAllTable = false;
                    return false;
                }
            }
        }
    },
    computed: {
        ...mapGetters({
            visitedRoutes: 'tagsBar/visitedRoutes',
            publicDataOver:"customData/publicDataOver",
        }),
    },
    methods: {
        batchVerify(state,color){
            if(this.selectction.selectedRowKeys.length>0){
                this.$confirm({
                    title: "提示",
                    content: (
                        <div>
                            <div>是否将【<span style="font-size:20px;" class="keyword">{this.selectction.selectedRowKeys.length}</span>】条数据修改为【<span style="font-size:20px" class="keyword">{this.enumObj.Enum.enumType['audit_state__1'][state]}</span>】？</div>
                            <div style="padding: 20px 10px 10px 0px">
                                备注 <input id="h_note" />
                            </div>
                        </div>
                    ),
                    okText: '确认',
                    cancelText: '取消',
                    maskClosable: true,
                    onOk: () => {
                        let param = {};
                        const idList = this.selectction.selectedRowKeys.join();
                        const h_note = document.getElementById("h_note");
                        if(h_note.value){
                            param.note = h_note.value
                        }
                        param.audit_state = state;
                        param.id = idList;
                        addData('auditredpacket',param).then(res=>{
                            this.$message.success(res.msg);
                            this.fetch();
                            this.selectction.selectedRowKeys = [];
                        })
                    }
                })
                setTimeout(()=>{
                    const keyword = document.getElementsByClassName("keyword");
                    for(let i=0;i<keyword.length;i++){
                        keyword[i].style.color = "#"+color
                    }
                })
            }else{
                this.$message.info("请先选择审核的数据！")
            }
        },
        operationBtnShow(record,item){
            if(eval(item.condition)){
                return false;
            }else{
                return true;
            }
        },
        showBigImage(imageRef){
            this.$refs[imageRef].showImageModal()
        },
        imageOut(record,item){
            if(item.config && item.config.showImgTip && text){
                record[item.dataIndex+'ShowTip'] = false;
            }else if(this.$route.name==='myTask' || this.$route.name==='taskRoom'){
                record[item.dataIndex+'ShowTip'] = false;
            }
            return false;
        },
        imageOver(record,item){
            if(item.config && item.config.showImgTip && text){
                record[item.dataIndex+'ShowTip'] = true;
            }else if(this.$route.name==='myTask' || this.$route.name==='taskRoom'){
                record[item.dataIndex+'ShowTip'] = true;
            }
            return false;
        },
        selectDropdown(open,itemValue){
            if(open){
                //console.log(this.enumObj.Enum.enumType[itemValue.selectType])
            }
        },
        edittableEnter({data,params,clickType,rollback}){
            this.enter({data,params,clickType})
            .then(res=>{
                this.search();
            })
            .catch(e=>{
                rollback();
                // this.currentRow.Text = a;
            })
        },
        selectDataTurnArray(json){
            let tempArr = [];
            for(let item in json){
                tempArr.push({name:json[item],key:item})
            }
            return tempArr;
        },
        copyText(item,record){
            if(item.config && item.config.enumType && !item.config.requestKey){
                let enumText = this.enumObj.Enum.enumType[item.config.enumType][record[item.dataIndex]]
                clip(enumText || record[item.dataIndex], event);
            }else{
                clip(record[item.dataIndex], event);
            }
        },
        editAllChange(value, record, index) {
            record[this.columns[index]["dataIndex"]] = value;
            if(this.editAllFormData[record.id]){
                this.editAllFormData[record.id][this.columns[index]["dataIndex"]]=value;
            }else{
                this.editAllFormData[record.id]={[this.columns[index]["dataIndex"]]:value}
            }
        },
        editAll({text, record, item, ext}) {
            record.editAllTable = true;
        },
        editAllSave(record) {
            console.log("点击保存",this.editAllFormData,"record",record)
            this.currentRow.record = record;
            if (!this.editAllFormData[record.id] || Object.keys(this.editAllFormData[record.id]).length < 1) {
                this.cancel("")
                record.editAllTable = false;
                return;
            }
            this.enter({
                params: this.editAllFormData[record.id]
            }).then(res => {
                for(let i=0;i<oldRecord_G.length;i++){
                    if(oldRecord_G[i].id===record.id){
                        oldRecord_G[i] = record;
                        break;
                    }
                }
                this.editAllFormData[record.id] = {};
                record.editAllTable = false;
            })
        },
        editAllCancel(newRecord) {
            const curRecord = oldRecord_G.find(x=>newRecord.id===x.id);
            for (let item in newRecord) {
                newRecord[item] = curRecord[item];
            }
            newRecord.editAllTable = false;
        },
        computedData(config, value) {
            let storeData = this.$store.getters['customData/' + config.config.pubAPI];
            if (typeof value == "string") {
                let returnValue = [];
                if (value.indexOf("[") != -1) {
                    value = eval(value)
                } else {
                    value = value.split(',');
                }
                for (let i = 0; i < value.length; i++) {
                    for (let j = 0; j < storeData.length; j++) {
                        if (storeData[j].id == value[i]) {
                            console.log(storeData[j].id)
                            returnValue.push(storeData[j].val_name);
                            break;
                        }
                    }
                }
                return returnValue
            } else {
                return value
            }

        },
        operationClick(item, index) {
            this[item.clickEvent](item, index)
        },
        custom_export({ text, value, config, ext }){
            console.log("呵呵",{text, value, config, ext})
            let exportData = {};
            if(ext.params){
                for(let key in ext.params){
                    exportData[key] = value[ext.params[key]]
                }
            }
            this.exportData(null,0,exportData,ext.ajaxInterface,ext.extData);
        },
        exportData(item, index,exportData,ajaxInterface,otherCol) {
            console.log("导出数据", item)
            this.$confirm({
                title: "提示",
                content: "是否导出" + this.$route.meta.title + "表？",
                okText: '确认',
                cancelText: '取消',
                maskClosable: true,
                onOk: () => {
                    if(!exportData){
                        exportData = deepCopy(this.searchForm);
                        delete exportData.each_page_num;
                        delete exportData.page;
                    }
                    if(!ajaxInterface){
                        ajaxInterface = this.tableConfig.ajaxInterface
                    }
                    console.log("导出提交参数",exportData)
                    exportTable(ajaxInterface, exportData).then(({
                        data
                    }) => {
                        console.log("下载的数据",data)
                        this.exportExcel(data,otherCol);
                    }).catch(e => {
                        console.log(e)
                    })
                }
            })
        },
        //导出表格方法
        exportExcel(exportData,otherCol) {
            let excelTitle = [];
            let arry_dataindex = [];
            let tempData;
            if(!otherCol){
                tempData =this.columns;
                if (this.description.length > 0) {
                    tempData = tempData.concat(this.description);
                }
            }else{
                tempData = otherCol;
            }
            tempData.forEach(element => {
                if (element.title != "操作") {
                    excelTitle.push(element.title)
                    arry_dataindex.push(element.dataIndex)
                }
            });
            console.log("最终数据",tempData)
            exportExcel({excelTitle,titleField:arry_dataindex,exportData,fileName:this.$route.meta.title,auxData:tempData});
        },
        blacklist(item, index) {
            this.$store.commit('customData/setCurrentEditItem', {
                columns: item.extData,
                ajaxInterface: item.ajaxInterface,
                ajaxMethod: item.ajaxMethod,
                paramsType:item.paramsType,
                extParams:item.extParams,
            })
            this.editOrAdd({
                isAddData: true,
                modalTitle: item.text,
                modalWidth: item.modalWidth || 700,
                openType: "modal",
                ajaxInterface: item.ajaxInterface,
                ajaxMethod: item.ajaxMethod || "POST",
                paramsType:item.paramsType,
                extParams:item.extParams,
            })
        },
        searchModal(item, index){
            this.$refs.ModalForSearch.showModal({isAddData:true, modalTitle: item.text, modalWidth: item.modalWidth || 700, ajaxInterface: item.ajaxInterface, ajaxMethod: item.ajaxMethod || "POST",extData:{item, index}});
        },
        actionWhat({text, value, config,ext}){
            this.$refs.ModalForAction.showModal({isAddData:true, modalTitle: ext.modalTitle, modalWidth: ext.modalWidth || 700, ajaxInterface: ext.ajaxInterface, ajaxMethod: ext.ajaxMethod || "POST",extData:{text, value, config,ext}});
        },
        //鼠标横向滚动处理
        handlerMouserScroll(event) {
            var antTableBody = document.getElementsByClassName("ant-table-body")[0];
            let tableContent = document.getElementsByClassName("ant-table-fixed")[0];
            let bodyWidth = document.body.clientWidth - 300;
            if (tableContent.offsetWidth > bodyWidth) {
                let detail = event.wheelDelta || event.detail
                let moveForwardStep = -1
                let moveBackStep = 1
                let tempTime = detail > 0 ? moveForwardStep * 50 : moveBackStep * 50
                this.timeStamp += tempTime;
                let needScroll = tableContent.offsetWidth - bodyWidth;
                if (this.timeStamp > needScroll) {
                    this.timeStamp = needScroll
                }
                if (this.timeStamp < 0) {
                    this.timeStamp = 0;
                }
                antTableBody.scrollTo(this.timeStamp, 0)
                if (event.preventDefault) {
                    event.preventDefault();
                }
                return false;
            }
        },
        init() {
            const operation = this.tableMessage.tableData[this.tableMessage.tableData.length-1]
            if(operation.role && !operation.role.includes(this.userInfo.role)){
                this.tableMessage.tableData.splice(this.tableMessage.tableData.length-1,1);
            }
            this.columns = this.tableMessage.tableData;
            this.description = this.tableMessage.description || [];
            // this.selectTitle = this.enumObj.Enum.enumTypeName[this.tableConfig.searchConfig.select.selectType];
            this.fetch()
        },
        initSearchForm() {
            this.tableConfig = this.tableMessage.config;
            if(this.tableConfig.searchConfig.isToday){//默认今天
                this.create_date = [moment().format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")]
            }else if(this.tableConfig.searchConfig.isWeek){//默认一周
                this.create_date = [moment().subtract(7, 'day').format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")]
            }else{//默认无
                this.create_date = []
            }
            this.searchForm.create_date = this.create_date.length > 0 ? this.create_date.join(",") : "";
            if (this.tableConfig.searchConfig.selectInput) {
                let firstOption = deepCopy(this.tableConfig.searchConfig.selectInput.options[0]);
                firstOption.key = firstOption.value;
                this.selectInputValue = firstOption;
                this.currentSelectInput = this.tableConfig.searchConfig.selectInput.options[0]
                this.searchForm[this.tableConfig.searchConfig.selectInput.options[0]["key"]] = "";
            }
            
            if(this.tableConfig.searchConfig.doubleSelect){
                this.doubleSelectKey = deepCopy(this.tableConfig.searchConfig.doubleSelect.options[0]);
                this.doubleSelectKey.key = this.doubleSelectKey.selectKey;
            }
            this.searchForm.each_page_num = this.pagination.each_page_num;
            this.searchForm.page = this.pagination.page;
        },
        selectChange_search({itemValue,changeData,option,doubleSelectValue}) {
            console.log("呵呵呵呵",{itemValue,changeData,option,doubleSelectValue})
            if(changeData===undefined ){//清空内容
                if(this.tableConfig.searchConfig.doubleSelect){
                    delete this.searchList[this.tableConfig.searchConfig.doubleSelect.options[itemValue.value || 0].selectKey];
                }else{
                    delete this.searchList[itemValue.selectKey];
                }
            }
            changeData = changeData && changeData.value!=undefined?changeData.value:changeData
            itemValue.selectValue = changeData
            let tempKeyName = itemValue.selectType.indexOf("__")==-1?itemValue.selectType:itemValue.selectType.split("__")[0];
            if(this.tableConfig.searchConfig.doubleSelect && option){
                this.tableConfig.searchConfig.doubleSelect.options[itemValue.value || 0].selectenum = option.key
            }
            if(itemValue.requestKey){
                tempKeyName = itemValue.requestKey
            }
            this.searchForm[tempKeyName] = option ? parseInt(option.key) : "";
            this.pageCache[this.$route.name] = this.searchForm
            setCache("searchForm",this.pageCache,sessionStorage)
            console.log(this.searchForm,"搜索内容")
        },
        doubleSelectChange(value, option){
            const reqKey = this.tableConfig.searchConfig.doubleSelect.options[value.key].requestKey;
            if(reqKey){
                value.requestKey = reqKey
            }
            if(option.key.indexOf("__")!=-1){
                option.TempKey = option.key.split("__")[0]
            }else if(value.requestKey){
                option.TempKey = value.requestKey;
            }else{
                option.TempKey = option.key
            }
            this.doubleSelectKey.selectType = option.key;
            if(this.searchForm[option.TempKey]!==undefined && this.searchForm[option.TempKey]!==""){
                this.doubleSelectValue = {key:this.enumObj.Enum.enumType[option.key][this.searchForm[option.TempKey]]}
            }else{
                this.doubleSelectValue = {key:"全部"}
            }
        },
        closeTag(k,all){
            if(all){
                for(let kk in this.searchList){
                    this.searchForm[this.searchList[kk].key] = "";
                    delete this.searchList[kk]
                    this.currentSelectInput.inputValue = ""
                }
                if(this.tableConfig.searchConfig.select){
                    for(var q=0;q<this.tableConfig.searchConfig.select.length;q++){
                        this.tableConfig.searchConfig.select[q].selectValue = "全部"
                    }
                }
                if(this.tableConfig.searchConfig.inputText){
                    for(var bb=0;bb<this.tableConfig.searchConfig.inputText.length;bb++){
                        var bbb = this.tableConfig.searchConfig.inputText[bb];
                        bbb.inputValue = "";
                    }
                }
                 this.doubleSelectValue = {key:"全部"};
            }else{
                this.searchForm[this.searchList[k]["key"]] = "";
                if(this.searchList[k].type=="selectInput" && this.searchList[k].value == this.currentSelectInput.inputValue){
                    this.currentSelectInput.inputValue = ""
                }
                if(this.searchList[k].type=="doubleSelect"){
                    const reqKey = this.doubleSelectKey.requestKey || this.doubleSelectKey.selectType
                    if(reqKey == this.searchList[k].key){
                        this.doubleSelectValue = {key:"全部"};
                    }
                }
                if(this.searchList[k].type=="inputText"){
                    for(var bb=0;bb<this.tableConfig.searchConfig.inputText.length;bb++){
                        var bbb = this.tableConfig.searchConfig.inputText[bb];
                        if(bbb.value===k){
                            bbb.inputValue = "";
                            break;
                        }
                    }
                }
                if(this.searchList[k].type=="select"){
                    for(var q=0;q<this.tableConfig.searchConfig.select.length;q++){
                        let tempKey = this.tableConfig.searchConfig.select[q].requestKey || this.tableConfig.searchConfig.select[q].selectType;
                        if(tempKey.indexOf("__")!=-1){
                            tempKey = tempKey.split("__")[0];
                        }
                        if(tempKey==this.searchList[k].key){
                            this.tableConfig.searchConfig.select[q].selectValue = "全部";
                            break;
                        }
                    }
                }
                delete this.searchList[k];
            }
            this.pageCache[this.$route.name] = this.searchForm
            setCache("searchForm",this.pageCache,sessionStorage)
            this.fetch();
        },
        handlerSearchList(){
            const notInclude = ['create_date','each_page_num','page','sort'];
            console.log("搜索内容",this.searchForm)
            console.log("搜索配置",this.tableConfig.searchConfig)
            for(let key in this.searchForm){
                if(notInclude.indexOf(key)===-1 && this.searchForm[key]!==""&& this.searchForm[key]!==undefined){
                    if(this.tableConfig.searchConfig.select){
                        for(var i=0;i<this.tableConfig.searchConfig.select.length;i++){
                            let temp = this.tableConfig.searchConfig.select[i]
                            if(parseInt(temp.selectValue).toString()!="NaN"){
                                temp.selectValue = this.enumObj.Enum.enumType[temp.selectType][this.searchForm[key]]
                            }
                            if(temp.requestKey){
                                if(temp.requestKey == key){
                                    console.log("liuyuongshan",temp)
                                    if(temp.selectValue===undefined){
                                        temp.selectValue = this.enumObj.Enum.enumType[temp.selectType][this.searchForm[key]]
                                    }
                                    this.searchList[temp.selectKey] = {value:temp.selectValue,type:"select",key};
                                    break;
                                }
                            }else if(temp.selectType){
                                if(temp.selectType.indexOf("__")!=-1){
                                    if(temp.selectType.split("__")[0]== key){
                                        this.searchList[temp.selectKey] = {value:temp.selectValue,type:"select",key};
                                        break;
                                    }
                                }else{
                                    if(temp.selectType== key){
                                        this.searchList[temp.selectKey] = {value:temp.selectValue,type:"select",key};
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    if(this.tableConfig.searchConfig.selectInput){
                        for(var i=0;i<this.tableConfig.searchConfig.selectInput.options.length;i++){
                            if(this.tableConfig.searchConfig.selectInput.options[i].key == key){
                                this.searchList[this.tableConfig.searchConfig.selectInput.options[i].value] = {
                                    value:this.searchForm[key],
                                    type:"selectInput",
                                    key,
                                }
                            }
                        }
                    }
                    if(this.tableConfig.searchConfig.inputText){
                        for(var i=0;i<this.tableConfig.searchConfig.inputText.length;i++){
                            if(this.tableConfig.searchConfig.inputText[i].key == key){
                                this.searchList[this.tableConfig.searchConfig.inputText[i].value] = {
                                    value:this.searchForm[key],
                                    type:"inputText",
                                    key,
                                }
                                
                            }
                        }
                    }
                    if(this.tableConfig.searchConfig.doubleSelect){
                        for(let z=0;z<this.tableConfig.searchConfig.doubleSelect.options.length;z++){
                            var temp = this.tableConfig.searchConfig.doubleSelect.options[z]
                            if(temp.selectType.indexOf("__")!=-1){
                                temp.tempKey = temp.selectType.split("__")[0];
                            }
                            if(temp.requestKey === key || temp.selectType === key || temp.tempKey === key){
                                if(temp.requestKey){
                                    temp.selectValue = this.enumObj.Enum.enumType[temp.selectType][this.searchForm[key]]
                                }else{
                                    console.log("是不是没有",temp)
                                    temp.selectValue = this.enumObj.Enum.enumType[temp.selectType][temp.selectenum]
                                }
                                this.searchList[temp.selectKey] = {value:temp.selectValue,type:"doubleSelect",key,};
                                break;
                            }
                        }
                    }
                }
            }
            console.log("this.searchList",this.searchList)
        },
        currentSelectInputChange(item) {
            this.searchForm[item.key] = item.inputValue;
            this.currentSelectInputInput(this.currentSelectInput);
            console.log("此时提交表单的内容", this.searchForm)
        },
        currentSelectInputInput(item) {
            if (item.inputType == "number") {
                this.currentSelectInput.inputValue = replaceNum(item.inputValue)
            }
            if (item.inputValue === "") {
                delete this.searchList[item.value];
            }
        },
        selectInputChange_search(value, option) {
            // delete this.searchForm[this.currentSelectInput["key"]]
            this.currentSelectInput.inputValue = ""
            this.currentSelectInput = this.tableConfig.searchConfig.selectInput.options[value.key]
            this.searchForm[this.currentSelectInput.key] = this.currentSelectInput.inputValue;
            this.pageCache[this.$route.name] = this.searchForm
            setCache("searchForm",this.pageCache,sessionStorage)
            console.log("下拉框改变：", this.currentSelectInput)
        },
        enter({data,params,clickType}) {
            return new Promise((resolve, reject) => {
                if (params) {
                    params = params
                } else {
                    params = {
                        [this.currentRow.config.dataIndex]: data,
                    };
                    if (data == this.currentRow.record[this.currentRow.config.dataIndex] && clickType == "select") {
                        this.cancel("无修改")
                        return;
                    }
                }
                params.id = this.currentRow.record.uuid || this.currentRow.record.id
                doEdit(this.tableConfig.ajaxInterface, params).then(res => {
                    if (res.code == 1) {
                        this.$message.success(res.msg)
                        resolve(res.code);
                    } else {
                        reject(res.code)
                        this.$message.error(res.msg)
                    }
                }).catch(e=>{
                    reject(e)
                })
            })
        },
        onCellChange(key, dataIndex, value) {
            // console.log("行内编辑变化", key, dataIndex, value)
            // const dataSource = [...this.dataSource];
            // const target = dataSource.find(item => item.key === key);
        },
        onDelete(text, value, config) {
            let params = {};
            params.id = this.currentRow.record.uuid || this.currentRow.record.id
            doDelete(this.tableConfig.ajaxInterface, params).then(res => {
                this.$message.success(res.msg)
                this.search();
            }).catch(e=>{
                // this.$message.error(e)
            })
        },
        editRow({text, value, config, ext}) {
            let obj = {
                text,
                value,
                config,
                ext,
                columns: this.columns,
                isAddData: false,
                text: ext.text || "编辑",
                ajaxMethod:"PUT",
            }
            this.handleColumns(obj);
        },
        addData(item, index) {
            this.isAddData = true;
            this.handleColumns({
                columns: this.columns,
                isAddData: true,
                text: "添加",
                item,
                ajaxMethod:"POST",
            });
        },
        //对某些数据进行特殊处理之后，再变成可以编辑的状态！
        handleColumns(obj) {
            console.log("对某些数据进行特殊处理之后，再变成可以编辑的状态！",obj)
            if (this.description.length > 0) {
                obj.columns = obj.columns.concat(this.description)
            }
            //添加时候填充extData
            if(obj.item && obj.item.extData){
                if(obj.item.extDataMode=='cover'){
                    obj.columns = obj.item.extData
                }else{
                    obj.columns = obj.columns.concat(obj.item.extData)
                }
            }
            //修改时候填充extData
            if(obj.ext && obj.ext.extData){
                if(obj.ext.extDataMode=='cover'){
                    obj.columns = obj.ext.extData
                }else{
                    obj.columns = obj.columns.concat(obj.ext.extData)
                }
            }
            if (obj.columns && !obj.isAddData) {
                for (let i = 0; i < obj.columns.length; i++) {
                    if (obj.columns[i].config && obj.columns[i].showEditPage) {
                        //重新导入枚举类
                        // this.enumObj = require('@/utils/enum.js').default
                        //下拉框、单选框
                        if (obj.columns[i].config.type == 'select' || obj.columns[i].config.type == 'button') {
                            if (obj.columns[i].config.requestKey) {
                                obj.columns[i].config.value = obj.value[obj.columns[i].dataIndex]
                            } else {
                                try{
                                    obj.columns[i].config.value = this.enumObj.Enum.enumType[obj.columns[i].config.enumType][obj.value[obj.columns[i].dataIndex]];
                                }catch(e){
                                    this.$message.error("匹配枚举出错，请检查enum.js文件是否缺少  |"+obj.columns[i].title+" : "+obj.columns[i].dataIndex+"|  的枚举类！");
                                    return;
                                }
                            }
                        }
                        //多选框的处理
                        if (obj.columns[i].config.type == 'switch') {
                            if (typeof obj.value[obj.columns[i].dataIndex] == "string") {
                                if (obj.value[obj.columns[i].dataIndex].indexOf('[') != -1) {
                                    obj.columns[i].config.value = obj.value[obj.columns[i].dataIndex]
                                } else {
                                    obj.columns[i].config.value = obj.value[obj.columns[i].dataIndex].split(',');
                                }

                            }
                        }
                    }
                }
            }
            this.$store.commit('customData/setCurrentEditItem', obj)
            this.editOrAdd({
                isAddData: obj.isAddData,
                modalTitle: obj.text,
                modalWidth: obj.modalWidth || 700,
                openType: this.tableConfig.openType,
                paramsType:obj.item && obj.item.paramsType?obj.item.paramsType:'json',
                ajaxInterface: obj.ext && obj.ext.ajaxInterface?obj.ext.ajaxInterface:this.tableConfig.ajaxInterface,
                ajaxMethod:obj.ext && obj.ext.ajaxMethod?obj.ext.ajaxMethod:obj.ajaxMethod,
            })
        },
        editOrAdd({isAddData,modalTitle,modalWidth,openType,ajaxInterface,ajaxMethod,paramsType,extParams}) {
            if (openType == "modal") {
                this.$refs.modal.showModal({isAddData, modalTitle, modalWidth, ajaxInterface, ajaxMethod,paramsType,extParams});
            } else {
                this.$router.push({
                    name: "editComponent",
                    query: {
                        "addData": isAddData,
                        text,
                    }
                });
            }
        },
        create_dateChange(date, dateString) {
            if (dateString[0] && dateString[1]) {
                this.searchForm["create_date"] = dateString.join(",")
            } else {
                this.searchForm["create_date"] = ""
            }
        },
        handleTableChange(pagination) {
            this.pagination.current=pagination.current
            this.pagination.each_page_num = pagination.pageSize
            this.pagination.page=pagination.current
            this.searchForm.each_page_num = pagination.pageSize
            this.searchForm.page = pagination.current
            this.pageCache[this.$route.name] = this.searchForm;
            setCache("searchForm",this.pageCache,sessionStorage);
            this.fetch();
        },
        search() {
            this.pageCache[this.$route.name] = this.searchForm;
            setCache("searchForm",this.pageCache,sessionStorage);
            this.fetch()
        },
        handlerCacheSearch(){
            this.pageCache = getCache("searchForm",sessionStorage) || {};
            if(this.pageCache && this.pageCache[this.$route.name] && (this.$route.query.cache || this.visitedRoutes.length===2)){
                this.searchForm = this.pageCache[this.$route.name]
                //1.处理selectInput
                if(this.tableConfig.searchConfig.selectInput){
                    if(this.tableConfig.searchConfig.selectInput.options){
                        let option = this.tableConfig.searchConfig.selectInput.options
                        for(let i=0;i<option.length;i++){
                            if(this.searchForm[option[i].key]){
                                this.tableConfig.searchConfig.selectInput.options[i].inputValue = this.searchForm[option[i].key];
                                this.selectInputValue = {"key":i,"label": option[i].value }
                                this.currentSelectInput = this.tableConfig.searchConfig.selectInput.options[i]
                                break;
                            }
                        }
                    }
                }
                //2.处理select
                if(this.tableConfig.searchConfig.select){
                    let option = this.tableConfig.searchConfig.select
                    for(let i=0;i<option.length;i++){
                        let key = option[i].requestKey || option[i].selectType;
                        if(key.indexOf("__")!=-1){
                            key = key.split("__")[0];
                        }
                        if(this.searchForm[key] || this.searchForm[key]===0){
                            let a = parseInt(this.searchForm[key]);
                            this.tableConfig.searchConfig.select[i].selectValue = enumObj.Enum.enumType[option[i].selectType][a];
                        }
                    }
                }
                 //处理两边都是下拉框
                if(this.tableConfig.searchConfig.doubleSelect){
                    for(var ky in this.searchForm){
                        if(this.searchForm[ky]!=="" && this.searchForm[ky]!==undefined){
                            for(let ss=0;ss<this.tableConfig.searchConfig.doubleSelect.options.length;ss++){
                                var tt = this.tableConfig.searchConfig.doubleSelect.options[ss];
                                if(tt.selectType.indexOf("__")!=-1){
                                    tt.tempKey = tt.selectType.split("__")[0];
                                }
                                if(tt.selectType == ky ||tt.tempKey==ky){
                                    tt.selectenum = this.searchForm[ky];
                                }
                            }
                        }
                    }
                    let haha = this.tableConfig.searchConfig.doubleSelect.options[0];
                    if(haha.selectType.indexOf("__")!=-1){
                        haha.tempKey = haha.selectType.split("__")[0];
                    }
                    var aaa = haha.requestKey || haha.tempKey || haha.selectType
                    if((this.searchForm[aaa] || this.searchForm[aaa]===0) && this.doubleSelectKey.selectType==haha.selectType){
                        setTimeout(()=>{
                            this.doubleSelectValue = {key:haha.selectValue}
                        },1000)
                    }
                }
                //3.处理分页器
                this.pagination.current = this.searchForm.page
                //4.时间处理
                if(!this.searchForm.create_date){
                    this.create_date = [];
                }
                //5.普通输入框处理
                if(this.tableConfig.searchConfig.inputText){
                    let option = this.tableConfig.searchConfig.inputText
                    for(let i=0;i<option.length;i++){
                        if(this.searchForm[option[i].key]){
                            this.tableConfig.searchConfig.inputText[i].inputValue = this.searchForm[option[i].key]
                        }
                    }
                }
            }
        },
        fetch() {
            this.handlerCacheSearch();
            getTableList(this.tableConfig.ajaxInterface, this.searchForm).then(({
                data,
                sum_count
            }) => {
                const pagination = {
                    ...this.pagination
                }
                pagination.total = sum_count;
                this.dataSource = data;
                oldRecord_G = deepCopy(this.dataSource)
                this.pagination = pagination;
                this.handlerSearchList();
            })
        },
        clickItem(text, value, config, ext) {
            this.currentRow.Text = text;
            this.currentRow.record = value;
            this.currentRow.config = config;
            if (ext) {
                this[ext.clickEvent]({ text, value, config, ext, dataSource: this.dataSource});
            } else if (config.config && config.config.clickEvent) {
                this[config.config.clickEvent]({text,value,config,dataSource: this.dataSource});
            }
        },
        openPage({text, value, config}){
            if(config.config.openPageName.indexOf('http')!=-1){
                let pageUrl = config.config.openPageName;
                if(config.config.paramName){
                    pageUrl = config.config.openPageName+config.config.paramName[0]+"="+value[config.config.paramValue[0]]
                }
                window.open(pageUrl,"_blank");
            }else{
                if(value[config.config.openPageName]){
                    if(value[config.config.openPageName].indexOf('http')==-1){
                        value[config.config.openPageName] = "http://"+ value[config.config.openPageName]
                    }
                    window.open(value[config.config.openPageName],"_blank"); 
                }else{
                    if(config.config.paramName){
                        this.pageCache[config.config.openPageName] = {
                            each_page_num:10,
                            page:1
                        }
                        for(let i=0;i<config.config.paramName.length;i++){
                            this.pageCache[config.config.openPageName][config.config.paramName[i]] = value[config.config.paramValue[i]];
                        }
                        setCache("searchForm",this.pageCache,sessionStorage)
                    }
                    this.$router.push({
                        path:config.config.openPageName,
                        query:{cache:1},
                    })
                }
            }
        },
        showImg(src, value, config) {
        },
        rowButtonConfirm(e) {
            this.currentRow.record[this.currentRow.config.dataIndex] = this.currentRow.record[this.currentRow.config.dataIndex] == 0 ? 1 : 0
            this.enter({
                data: this.currentRow.record[this.currentRow.config.dataIndex]
            }).then(res=>{
                // this.search();
            }).catch(e=>{
                console.log(e)
                try{
                    let json = JSON.parse(e);
                    if(json.code===0){
                        this.currentRow.record[this.currentRow.config.dataIndex] = this.currentRow.record[this.currentRow.config.dataIndex] == 0 ? 1 : 0
                    }
                }catch(ex){
                    console.error("报错啦报错啦！！！json字符串转换出错-->",ex)
                }
            })
        },
        cancel(e) {
            console.log(e);
            this.$message.info('未修改数据');
        },
        visibleTip(visible){
            console.log(visible)
        }
    },
};
</script>

<style scoped>
.verifyBtn{
    margin-right:10px;
}
.asdasdasd{
    display: flex;
    align-items: center;
}
.openPageStyle{
    color: #40a9ff;
    cursor: pointer;
    text-decoration: underline;
}
.operation_contains {
    height: 60px;
    /* margin-top:20px; */
}

.operation {
    margin-bottom: 20px;
    margin-right: 20px;
}

.searchItem {
    max-width: 340px;
    display: inline-block !important;
    margin-right: 20px;
    margin-bottom: 20px;
}

.flex {
    display: flex;
}

.ant-table td {
    white-space: nowrap;
}
.ant-table-tbody > tr > td > div > div > div{
    text-align: center !important;
}

.ant-table .ant-tag {
    margin: 0px;
}
</style>
<style>
#h_note{
    width: 180px;
    margin-left: 20px;
    height: 35px;
    padding: 10px;
    border-radius: 3px;
    border: 1px solid #bfbfbf;
}
.warning-btn{
    background:#faad14;
    color:white;
    border-color:#faad14;
}
.danger-btn{
    background:#ff4d4f;
    color:white;
    border-color:#ff4d4f;
}
.success-btn{
    background:#52c41a;
    color:white;
    border-color:#52c41a;
}
.warning-btn:hover,.warning-btn:focus,.warning-btn:active{
    background:#f7c665;
    border-color:#f7c665;
    color:white;
}
.danger-btn:hover,.danger-btn:focus,.danger-btn:active{
    background:#fb8687;
    border-color:#fb8687;
    color:white;
}
.success-btn:hover,.success-btn:focus,.success-btn:active{
    background:#7bde49;
    border-color:#7bde49;
    color:white;
}
.ant-input-group-addon{
    text-align:left;
    border:0
}
.ant-select-single:not(.ant-select-customize-input) .ant-select-selector{
    background-color:inherit;
}
.ant-table-tbody > tr > td{
    padding: 2px 5px;
}
.ant-tooltip{
    max-width: 350px;
}
.ant-tooltip-inner{
    width:100%;
}
.searchValueForParmas {
   width:220px;
}

.selectWForParmas {
    width: 120px;
}
</style>
