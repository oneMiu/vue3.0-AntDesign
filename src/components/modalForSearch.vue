<template>
<a-modal :title="modalTitle" v-model:visible="visible" :footer="null" :width="modalWidth" @cancel="modalcancel" :destroyOnClose="true">
    <div style="text-align:center;">
        <a-input-group compact style="margin-bottom:20px" v-for="(col,index) in extData" :key="index">
            <a-input :addon-before="col.label?col.label:null" style="width:300px" v-model:value="col.value" :placeholder="col.placeholder" />
            <a-button @click="onSearch(col)" :loading="searchLoading" type="primary">搜索</a-button>
        </a-input-group>
        <div v-if="isRequest">
            <!-- 工具的淘客查询 -->
            <div v-if="ajaxInterface==='checktaoke'">
                 <a-descriptions title="查询结果：" style="margin-bottom:10px" bordered>
                    <a-descriptions-item v-for="(d,di) in checktaokeResult" :label="mapLabel[di] || di" :key="di">
                        <span :style="customColor(di,d)">{{typeof d ==='number'?customMap[di][d]:d}}</span>
                    </a-descriptions-item>
                </a-descriptions>
            </div>
            <!-- 工具的淘宝打标的打标 -->
            <div v-else-if="ajaxInterface==='mark'">

            </div>
            <!-- 我的任务、查询信息 -->
            <div v-else-if="ajaxInterface==='queryinfo'">
                  <a-tabs >
                    <a-tab-pane :key="index"  v-for="(item,index) in descriptions">
                        <template #tab >
                            <a-badge :count="item.columns.length" v-if="item.columns.length>0">
                                <div style="width: 100px;">
                                    {{item.title}}
                                </div>
                            </a-badge>
                            <div style="width: 100px;" v-else>
                                {{item.title}}    
                            </div>
                        </template>
                        <span  v-if="item.columns.length==0">
                            <a-empty />
                        </span>
                        <table v-else class="ant-table-bordered" style="width: 100%;margin: 0 auto;text-align: center;border-left: 1px solid #f2f2f2;">
                            <thead class="ant-table-thead">
                                <tr>
                                    <th class="ant-table-align-center" style="text-align:center" v-for="(hitem,hindex) in item.tableTitle" :key="hindex">{{item.titleMap[hindex]}}</th>
                                </tr>
                            </thead>
                            <tbody class="ant-table-tbody">
                                <tr class="ant-table-row" v-for="(titem,tindex) in item.columns" :key="tindex">
                                    <td style="max-width:300px" v-for="(ditem,dindex) in titem" :key="dindex">
                                        <div v-if="dindex==='headimgurl'">
                                            <ImagePreViewer :src="ditem" />
                                        </div>
                                        <div v-else-if="dindex==='is_black' || dindex==='wxsex'">
                                            {{enumObj.Enum.enumType[dindex][ditem]}}
                                        </div>
                                        <div v-else>
                                            {{ditem}}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </a-tab-pane>
                </a-tabs>
            </div>
            <div style="text-align:left;" v-else-if="ajaxInterface==='querbuyernick'">
                <a-descriptions  bordered>
                    <a-descriptions-item v-for="(d,di) in querbuyernick" :label="mapLabel[di] || di" :key="di">
                        {{d[di]}}
                    </a-descriptions-item>
                </a-descriptions>
            </div>
        </div>
    </div>
</a-modal>
</template>

<script>
import ImagePreViewer from './ImagePreViewer.vue'
import {getList} from '@/api/table'
import {deepCopy} from '@/utils/validate'
export default {
    components: {
        ImagePreViewer,
    },
    data() {
        return {
            searchLoading:false,
            visible: false,
            modalTitle: "",
            modalWidth: 700,
            ajaxInterface: "",
            ajaxMethod: "POST",
            isChangePassword:false,
            searchValue:"",
            descriptions:{
                account_merchant_area_data:{
                    title:"订单信息",
                    titleMap:{
                        create_date:"创建时间",
                        merchant_name:"商家名字",
                        shop_name:"店铺名字",
                        buyer_nick:"买家昵称",
                        mobile:"手机号",
                        receiver_mobile:"收货手机号",
                        receiver_name:"收货姓名",
                        all_address:"详细地址"
                    },
                    tableTitle:{
                        "create_date":"",
                        "merchant_name":"",
                        "shop_name":"",
                        "buyer_nick":"", 
                        "mobile":"", 
                        "receiver_mobile":"", 
                        "receiver_name":"",
                        "all_address":"" 
                    },
                    columns:[
                    ],
                },
                user_data:{
                    title:"用户信息",
                    titleMap:{
                        create_date:"创建时间",
                        headimgurl:"用户头像",
                        uuid:"用户",
                        mobile:"手机号",
                        nick_name:"微信号",
                        area_state:"地区状态",
                        wxprovince:"微信省份",
                        wxsex:"微信性别",
                        note:"备注",
                        is_black:"黑名单",
                    },
                    tableTitle:{
                        "create_date":"",
                        "headimgurl":"",
                        "uuid":"",
                        "mobile":"",
                        "nick_name":"",
                        "area_state":"",
                        "wxprovince":"",
                        "wxsex":"",
                        "note":"",
                        "is_black":""
                    },
                    columns:[
                    ]
                },
                black_list_data:{
                    title:"黑号数据",
                    titleMap:{
                        "create_date":"日期",
                        "buyer_nick":"买家昵称",
                        "mobile":"手机号",
                        "username":"姓名",
                        "idcard_code":"身份证号",
                        "wechat_qq":"微信/QQ",
                        "note":"备注",
                    },
                    tableTitle:{
                        "create_date":"",
                        "buyer_nick":"",
                        "mobile":"",
                        "username":"",
                        "idcard_code":"",
                        "wechat_qq":"",
                        "note":"",
                    },
                    columns:[
                    ]
                }
            },
            isRequest:false,
            enumObj:{},
            extData:[],
            checktaokeResult:{

            },
            querbuyernick:{
                buyer_nick:"",
                buyer_level: "",
                seller_credit:"",
                real_name:"",
                regist_day: "",
                sex: "",
                buyer_avg:"",
                paodan_count:"",
                black_count:"",
                down_num: "",
                platform_type: "",
                quy_last_week: "",
                quy_near_week: "",
                update_date:"",
            },
            mapLabel:{
                is_success:"请求状态",
                message:"信息",
                is_taoke:"淘客状态",
                buyer_nick:"买家昵称",
                tid:"订单号",
                is_mark:"打标状态",
                coupon_fee:"订单红包",
                seller_flag:"订单旗子",
                status:"订单状态",
                receiver_address:"收货地址",
                num_list:"支付列表",
                sku_id_list:"sku列表",
                receiver_mobile:"收货手机号",
                receiver_name:"收货姓名",
                advances:"付款金额",
                created:"创建时间",
                all_address:"收货区域",
                pay_time:"支付时间",
                seller_memo:"备注信息",
                num_iid_list:"商品列表",
                info:"提示",
                paodan_count:"账号跑单",
                black_count:"账号黑号",
                buyer_avg: "账号周单",
                buyer_level: "买家等级",
                real_name:"实名认证",
                regist_day: "注册天数",
                down_num: "账号降权",
                platform_type: "平台类型",
                quy_last_week: "上周查询",
                quy_near_week: "本周查询",
                seller_credit:"卖家等级",
                sex: "账号性别",
                update_date:"查询时间",
                create_date:"创建时间",
                idcard_code:"身份证",
                is_activate:"激活",
                mobile:"手机号",
                note:"备注",
                username:"用户名",
                wechat_qq:"微信号",
                state:"状态",
            },
            customMap:{
                is_mark:{
                    0:"失败",
                    1:"成功",
                },
                is_success:{
                    0:"失败",
                    1:"成功",
                },
                is_taoke:{
                    0:"非淘客",
                    1:"淘客",
                },
            },
            keyupEvent:function(){},
        }
    },
    created() {
        this.enumObj = require('@/utils/enum.js').default
    },
    methods: {
        modalcancel(){
            this.checktaokeResult = {};
            this.isRequest = false;
            this.extData.forEach(x=>{
                x.value = "";
            })
            window.onkeyup = this.keyupEvent;
        },
        customColor(key,value){
            var styleJson = {
                color:"",
                fontWeight:"bold"
            };
            if(this.customMap[key]){
                if(value===1){
                    styleJson.color="#52c41a"
                    return styleJson
                }else{
                    styleJson.color="red"
                    return styleJson
                }
            }
        },
        onSearch(col) {
            if(!col.value){
                this.$message.error("请先输入值！");
                return;
            }
            this.searchLoading=true;
            getList(this.ajaxInterface,{[col.key]:col.value}).then(res=>{
                this[col.callback](res);
                this.isRequest = true;
            }).finally(re=>{
                this.searchLoading=false;
            })
        },
        querbuyernickCallback(res){
            for(let key in this.querbuyernick){
                this.querbuyernick[key] = res.data;
            }
        },
        queryinfoCallback(res){
            for(let item in res.data){
                if(this.descriptions[item]){
                    this.descriptions[item].columns = [];
                    for(let i=0;i<res.data[item].length;i++){
                        for(let key in this.descriptions[item].tableTitle){
                            this.descriptions[item].tableTitle[key] = res.data[item][i][key];
                        }
                        var j = deepCopy(this.descriptions[item].tableTitle);
                        this.descriptions[item].columns.push(j)
                    }
                }
            }
        },
        markCallback(res){
            alert("markCallback请求成功")
        },
        checktaokeCallback(res){
            this.checktaokeResult = res.data
        },
        showModal({isAddData, modalTitle="", modalWidth, ajaxInterface, ajaxMethod = "POST",isChangePassword=false,paramsType="json",extData={}}) {
            if(modalTitle.length>=4){
                this.modalTitle = modalTitle
            }else{
                this.modalTitle = modalTitle+ this.$route.meta.title;
            }
            this.modalWidth = modalWidth;
            this.isAddData = isAddData;
            this.ajaxInterface = ajaxInterface;
            this.ajaxMethod = ajaxMethod || "POST"
            this.isChangePassword = isChangePassword?true:false
            this.paramsType =paramsType;
            this.visible = true
            this.extData = extData.item.extData;
            if(window.onkeyup){
                this.keyupEvent = window.onkeyup;
                window.onkeyup = null;
            }
        },
    },
}
</script>

<style>
.ant-modal-body {
    max-height: 600px;
    overflow: scroll;
}
</style>
