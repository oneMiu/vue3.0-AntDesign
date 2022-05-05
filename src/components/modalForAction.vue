<template>
<a-modal :zIndex="5000" :title="modalTitle" v-model:visible="visible" :confirm-loading="confirmLoading" @cancel="cancel" @ok="saveAction" :width="modalWidth"  :destroyOnClose="true">
    <div v-if="orderDescriptShow" style="display: block;border: 1px solid #d9d9d9;padding: 20px;margin: 10px 0px;">
        <a-descriptions  bordered >
            <a-descriptions-item :label="mapLabel[di] || di" v-for="(d,di) in this.orderDescript" :key="di">
                <span :style="customColor(di,d)" style="color:#000000;font-weight:bold">
                    {{typeof d ==='number'?customMap[di]?customMap[di][d]:enumType[di]?enumType[di][d]:d:d}}
                    <span v-if="currentButton.text === '订单信息' && (di=='tid' || di=='advances' ||di=='commission' ||di=='gift_code' || di=='buyer_nick' || di=='receiver_mobile')">
                        <a-button size="small" :disabled="!d" :loading="fillLoading[di]" @click="fillData({[di]:d},di,d)" type="primary">
                            替换
                        </a-button>
                    </span>
                </span>
            </a-descriptions-item>
        </a-descriptions>
    </div>
    <div v-else-if="currentButton.text==='查黑号'"  style="display: block;border: 1px solid #d9d9d9;padding: 20px;margin: 10px 0px;max-height:800px">
    <span  v-if="currentButton.columns.length==0">
        <a-empty />
    </span>
    <table v-else class="ant-table-bordered" style="width: 100%;margin: 0 auto;text-align: center;border-left: 1px solid #f2f2f2;">
        <thead class="ant-table-thead">
            <tr>
                <th class="ant-table-align-center" style="text-align:center" v-for="(hitem,hindex) in currentButton.tableTitle" :key="hindex">{{mapLabel[hindex] || hindex}}</th>
            </tr>
        </thead>
        <tbody class="ant-table-tbody">
            <tr class="ant-table-row" style="height: 50px;" v-for="(titem,tindex) in currentButton.columns" :key="tindex">
                <td style="max-width:300px;padding:16px 5px;" v-for="(ditem,dindex) in currentButton.tableTitle" :key="dindex">
                    {{enumType[dindex]?enumType[dindex][titem[dindex]]:titem[dindex]}}
                </td>
            </tr>
        </tbody>
    </table>
    </div>
    <div>
        <a-input-group compact style="margin-bottom:20px" v-for="(item,index) in showData" :key="index">
            <span  v-if="item.name && item.button">
                <a-input @input="updateReplaceData(item.key,item.value)" :addon-before="item.name" v-model:value="item.value" style="width:300px"  />    
                <a-button-group >
                    <a-button v-for="(b,i) in item.button" :key="i" @click="clickItem(item,b,i)" :loading="b.isloading" type="primary">
                        {{b.text}}</a-button>
                </a-button-group>
            </span>
            <a-input @input="updateReplaceData(item.extInput.key,item.extInput.value)" :addon-before="item.extInput.name" v-if="item.extInput" v-model:value="item.extInput.value" style="width:300px;float: right;"  />
            <span v-if="item.isRequest && Object.keys(item.descript).length==1">
                <span style="margin-left:20px;line-height:32px" v-for="(d,di) in item.descript" :key="di">
                    <span style="font-weight:bold">
                        {{mapLabel[di] || di}}
                    </span>&nbsp;：&nbsp;
                    <span :style="customColor(di,d)">
                        {{typeof d ==='number'?customMap[di]?customMap[di][d]:enumType[di][d]:d}}
                    </span>
                </span>
            </span>
        </a-input-group>
    </div>
</a-modal>
</template>

<script>
import ImagePreViewer from './ImagePreViewer.vue'
import {
    getList,
    doEdit
} from '@/api/table'
export default {
    components: {
        ImagePreViewer,
    },
    data() {
        return {
            currentButton:{},
            confirmLoading:false,
            searchLoading:false,
            visible: false,
            modalTitle: "",
            modalWidth: 700,
            ajaxInterface: "",
            ajaxMethod: "POST",
            isChangePassword:false,
            searchValue:"",
            fillLoading:{
                buyer_nick:false,
                tid:false,
            },
            mapLabel:{
                buyer_nick:"买家昵称",
                tid:"订单号",
                is_success:"请求状态",
                message:"信息",
                is_mark:"打标状态",
                is_taoke:"淘客状态",
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
                is_taoke:{
                    0:"非淘客",
                    1:"淘客",
                },
            },
            showData:[
                {
                    key:"buyer_nick",
                    value:"",
                    name:"买家昵称",
                    isRequest:false,
                    button:[
                        {text:"自动打标",isloading:false,interface:"automark",resultShow:false,},
                        {text:"订单信息",desc:true,isloading:false,interface:"querytidinfo",resultShow:false,context:{tid:"",
                            buyer_nick:"",
                            receiver_mobile:"",
                            status:"",
                            advances:"",
                            coupon_fee:"",
                            created:"",
                            pay_time:"",
                            seller_flag:"",
                            seller_memo:"",
                            receiver_name:"",
                            all_address:"",
                            receiver_address:"",
                            num_iid_list:"",
                            sku_id_list:"",
                            num_list:"",
                            info:"",
                        }
                    },
                        {text:"查账号",desc:true,isloading:false,interface:"querbuyernick",resultShow:false,
                            context:{
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
                            }
                        },
                    ],
                    descript:{
                        is_mark:"",
                    },
                    extInput: {
                        key:"advances",
                        value:"",
                        name:"本金",
                        isRequest:false,
                    },
                },
                {
                    key:"tid",
                    value:"",
                    name:"订单号",
                    isRequest:false,
                    button:[
                        {text:"检测淘客",isloading:false,interface:"checktaoke",resultShow:false,},
                        {text:"订单信息",desc:true,isloading:false,interface:"querytidinfo",resultShow:false,
                            context:{tid:"",
                                buyer_nick:"",
                                receiver_mobile:"",
                                status:"",
                                advances:"",
                                coupon_fee:"",
                                created:"",
                                pay_time:"",
                                seller_flag:"",
                                seller_memo:"",
                                receiver_name:"",
                                all_address:"",
                                receiver_address:"",
                                num_iid_list:"",
                                sku_id_list:"",
                                num_list:"",
                                info:"",
                            }
                        },
                    ],
                    descript: {
                        is_taoke:"",
                    },
                    extInput:{
                        key:"commission",
                        value:"",
                        name:"佣金",
                        isRequest:false,
                    },
                },
                {
                    key:"mobile",
                    value:"",
                    name:"手机号",
                    isRequest:false,
                    button:[
                        {text:"查黑号",isloading:false,interface:"querymobile",tableTitle:{
                            "buyer_nick":"",
                            "create_date":"",
                            "id":"",
                            "idcard_code":"", 
                            "is_activate":"", 
                            "mobile":"", 
                            "note":"",
                            "username":"",
                            "wechat_qq":"",
                            "state":""
                        },
                        columns:[],
                    }
                    ],
                    extInput:{
                        key:"gift_code",
                        value:"",
                        name:"礼品代号",
                        isRequest:false,
                    },
                },
            ],
            orderDescript: {
                tid:"",
                buyer_nick:"",
                receiver_mobile:"",
                status:"",
                advances:"",
                coupon_fee:"",
                created:"",
                pay_time:"",
                seller_flag:"",
                seller_memo:"",
                receiver_name:"",
                all_address:"",
                receiver_address:"",
                num_iid_list:"",
                sku_id_list:"",
                num_list:"",
                info:"",
            },
            orderDescriptShow:false,
            extData:{},
            enumType:{},
            keyupEvent:function(){},
            replaceData:{

            },
        }
    },
    created() {
        this.enumType = require('@/utils/enum.js').default.Enum.enumType
    },
    methods: {
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
            if(key==='info'){
                styleJson.color="red"
                return styleJson
            }
        },
        cancel(){
            this.showData.forEach(x=>{
                x.isRequest = false;
                if(x.descript){
                    for(var s in x.descript){
                        x.descript[s] = ""
                    }
                }
            })
            for(var s in this.orderDescript){
                this.orderDescript[s] = ""
            }
            for(var r in this.replaceData){
                delete this.replaceData[r];
            }
            this.orderDescriptShow = false;
            window.onkeyup = this.keyupEvent;
        },
        updateReplaceData(key,value){
            this.replaceData[key] = value;
        },
        clickItem(item,b,buttonI,needLoading) {
            if(!item.value){
                this.$message.error("内容不能为空！")
                return;
            }
            let param = {
                id:this.extData.id,
                [item.key]:item.value
            }
            b.isloading=true;
            this.currentButton = b
            if(needLoading){
                this.$store.commit('customData/setLoadingSp', true);
            }
            getList(b.interface,param).then(res=>{
                this.visible = true
                if(needLoading){
                    this.extData.buyer_nickShowTip = false;
                    this.extData.tidShowTip = false;
                    this.extData.mobileShowTip = false;
                }
                if(b.desc){
                    this.orderDescript = b.context;
                    for(let k in this.orderDescript){
                        this.orderDescript[k] = res.data[k]
                    }
                    this.orderDescriptShow=true;
                }else if(b.tableTitle){
                    b.columns =[] // res.data
                }else{
                    for(let k in item.descript){
                        item.descript[k] = res.data[k]
                    }
                    item.isRequest = true;
                }
                this.$message.info(res.msg)
            }).finally(err=>{
                if(!b.desc){
                    this.orderDescriptShow = false;
                }
                b.isloading=false;
                if(needLoading){
                    this.$store.commit('customData/setLoadingSp', false);
                }
            })
        },
        fillData(opt,key,value){
            if(value){
                if(key=='receiver_mobile'){
                    delete opt.receiver_mobile;
                    opt.mobile = value
                    key = "mobile"
                }
                this.replaceData[key] = value;
                this.showData.forEach(x=>{
                    if(x.key==key){
                        x.value=value;
                    }
                    if(x.extInput){
                        if(x.extInput.key==key){
                            x.extInput.value=value;
                        }
                    }
                })
            }
        },
        saveAction(){
            if(Object.keys(this.replaceData).length==0){
                this.$message.info("数据无改动！")
                this.visible = false;
                return;
            }
            this.replaceData.id=this.extData.id;
            this.confirmLoading = true;
            doEdit(this.ajaxInterface,this.replaceData).then(res=>{
                for(var o in this.replaceData){
                    this.extData[o] = this.replaceData[o];
                }
                this.visible = false;
                this.$message.success("保存成功！")
            }).finally(err=>{
                this.confirmLoading = false;
            })
        },
        showModal({isAddData, modalTitle="", modalWidth, ajaxInterface, ajaxMethod = "POST",isChangePassword=false,paramsType="json",extData={},config}) {
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
            this.extData = extData.value;
            this.showData.forEach(x=>{
                x.value = this.extData[x.key]
                if(x.extInput){
                    x.extInput.value = this.extData[x.extInput.key]
                }
            })
            if(window.onkeyup){
                this.keyupEvent = window.onkeyup;
                window.onkeyup = null;
            }
            this.replaceData = {};
            if(config){
                this.PE(config)
            }else{
                this.visible = true
            }
        },
        PE(config){
            console.log("PE",config)
            let item = this.showData.find(x=>x.key == config.field)
            let buttonI
            let b
            item.button.forEach((x,i)=>{
                if(x.interface == config.interfaces){
                    b=x;
                    buttonI=i
                }
            })
            this.clickItem(item,b,buttonI,true)
        }
    },
}
</script>

<style>
.ant-modal-body {
    max-height: 600px;
    overflow: scroll;
}
</style>
