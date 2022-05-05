<template>
    <div class="index-container">
        <a-divider orientation="left">网站提示</a-divider>
        <table class="ant-table-bordered" style="width: 100%;margin: 0 auto;text-align: center;border-left: 1px solid #f2f2f2;">
            <thead class="ant-table-thead">
                <tr>
                    <th  style="text-align:center">标题</th>
                    <th  style="text-align:center">内容</th>
                    <th  style="text-align:center">发布时间</th>
                </tr>
            </thead>
            <tbody class="ant-table-tbody">
                <tr class="ant-table-row" style="height: 50px;" v-for="(titem,tindex) in gethomemessage.data" :key="tindex">
                    <td style="max-width:300px;padding:16px 5px;" v-html="titem['title']"></td>
                    <td style="max-width:300px;padding:16px 5px;" v-html="titem['content']"></td>
                    <td style="max-width:300px;padding:16px 5px;" v-html="titem['update_date']"></td>
                </tr>
            </tbody>
        </table>
        <a-row style="margin-top:40px" :gutter="[16,16]" type="flex" justify="start">
            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6" v-for="(item,index) in cardArr" :key="index">
                <div :style="{background:item.background}" class="card">
                    <div>
                        <div style="font-weight:bold">
                            {{item.value}}
                        </div>
                        <div>
                            {{item.title}}
                        </div>
                    </div>
                    <div>
                        <vab-icon style="font-size:30px" :icon="item.icon"></vab-icon>
                    </div>
                </div>
            </a-col>
        </a-row>
        <a-modal v-model:visible="getremindermessage.show" title="通知" @ok="()=>getremindermessage.show=false">
            <div>
                <p v-for="(message,index) in getremindermessage.data">{{message.content}}</p>
            </div>
        </a-modal>
    </div>
</template>
<script>
import { h } from 'vue';
import VabIcon from '@/layout/vab-icon'
import {deepCopy} from '@/utils/validate'
import {getList} from '@/api/table'
import {
    setCache,
    getCache,
} from '@/utils/index'
import {
    DownloadOutlined,
} from '@ant-design/icons-vue';
export default {
    components:{
        DownloadOutlined,
        VabIcon
    },
    name: 'index',
    data() {
        return {
            cardArr:[
                {
                    title:"账号总余额",
                    value:1110,
                    icon:"coins-line",
                    prop:"surplus_money",
                    background:"linear-gradient(45deg, #81c3e8, #009f95)"
                },
                {
                    title:"充值总金额",
                    value:1110,
                    icon:"exchange-cny-fill",
                    prop:"money",
                    background:"linear-gradient(45deg, #a8d5f9,#58c5d4)"
                },
                {
                    title:"一周总金额",
                    value:1110,
                    icon:"creative-commons-nc-fill",
                    prop:"week_money",
                    background:"linear-gradient(45deg, #98d2ec,#03A9F4)"
                },
                {
                    title:"计费总余额",
                    icon:"currency-fill",
                    value:1110,
                    prop:"bill_surplus_money",
                    background:"linear-gradient(45deg, #e8a1a1,#ec7474)"
                },
                {
                    title:"淘客订单查询",
                    value:1110,
                    icon:"file-list-3-fill",
                    prop:"surplus_taoke_num",
                    background:"linear-gradient(45deg, rgba(211, 43, 241, 0.56),rgba(156, 39, 176, 0.5))"
                },
                {
                    title:"旺旺账号查询",
                    value:1110,
                    icon:"file-search-fill",
                    prop:"surplus_query_num",
                    background:"linear-gradient(45deg, rgba(139, 195, 74, 0.74),#009688)"
                },
                {
                    title:"旺旺账号打标",
                    value:1110,
                    prop:"surplus_mark_num",
                    icon:"git-branch-fill",
                    background:"linear-gradient(45deg, #81c3e8, #009f95)"
                },
                {
                    title:"最大红包金额",
                    value:1110,
                    prop:"max_money",
                    icon:"exchange-dollar-fill",
                    background:"linear-gradient(45deg, #a8d5f9,#58c5d4)"
                },
                {
                    title:"今日红包金额",
                    value:1110,
                    icon:"coupon-2-fill",
                    prop:"today_money",
                    background:"linear-gradient(45deg, #98d2ec,#03A9F4)"
                },
                {
                    title:"昨日红包金额",
                    value:1110,
                    icon:"coupon-4-fill",
                    prop:"yester_money",
                    background:"linear-gradient(45deg, #e8a1a1,#ec7474)"
                },
                {
                    title:"今日红包笔数",
                    value:1110,
                    prop:"today_count",
                    icon:"coupon-5-fill",
                    background:"linear-gradient(45deg, rgba(211, 43, 241, 0.56),rgba(156, 39, 176, 0.5))"
                },
                {
                    title:"昨日红包笔数",
                    value:1110,
                    prop:"yester_count",
                    icon:"coupon-fill",
                    background:"linear-gradient(45deg, rgba(139, 195, 74, 0.74),#009688)"
                },
            ],
            gethomemessage:{},
            getremindermessage:{
                show:false,
                data:[]
            },
        }
    },
    methods: {
        async init(){
            this.gethomemessage =await getList("gethomemessage");
            const getmyinfo =await getList("getmyinfo");
            this.showMessage();
            for(let i=0;i<this.cardArr.length;i++){
                this.cardArr[i].value = getmyinfo.data[this.cardArr[i].prop];
            }
        },
        async showMessage(){
            //冒泡排序
            for(let i=0;i<this.getremindermessage.data.length;i++){
                for(let j=0;j<this.getremindermessage.data.length;j++){
                    if(this.getremindermessage.data[j].order_by>this.getremindermessage.data[i].order_by){
                        let temp = this.getremindermessage.data[j];
                        this.getremindermessage.data[j] = this.getremindermessage.data[i];
                        this.getremindermessage.data[i] = temp;
                    }
                }
            }
            const isExp = getCache("isExp",sessionStorage);
            if(!isExp){
                this.getremindermessage =await getList("getremindermessage");
                if(this.getremindermessage.data.length>0){
                    setCache("isExp",{isExp:false},sessionStorage);
                    this.getremindermessage.show = true;
                }
            }
        }
    },
    mounted() {
        this.init();
    },
}
</script>
<style>
.card{
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 20px;
    font-size: 20px;
    font-weight:lighter;
    width: 100%;
    text-align: center;
    color:white;
    border-radius: 5px;
}
.containersContext {
    background: #fafafa;
    padding: 20px;
    min-height: 500px;
    text-align: center;
    border-radius: 20px;
    border: 1px solid #f0f0f0;
}

.containersCard {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    border-bottom-left-radius:20px;
    border-bottom-right-radius:20px;
    border-top: 1px solid #f0f0f0;
    color: white;
    font-size: 16px;
    padding: 20px 20px;
    width: 100%;
}

.containers {
    /* height: 400px; */
}
.g2-tooltip-marker,.g2-tooltip-name{
    float: left;
}
.g2-tooltip-value{
    margin-left:0px
}
.g2-tooltip-list-item{
    text-align:left;
}
</style>