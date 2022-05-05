<template>
<div class="index-container">
    <a-row :gutter="[16,16]" type="flex" justify="start">
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6" v-for="(item,index) in cardArr" :key="index">
            <a-tag :color="item.background" style="border-top-left-radius:16px;
    border-top-right-radius:16px;font-size: 20px;font-weight:bold;height:50px;line-height:50px;width: 100%;text-align: center;">
                {{item.title}}
            </a-tag>
            <a-tag class="containersCard" :color="item.background">
                <a-row type="flex" justify="start">
                    <a-col :span="12" v-for="(t,i) in item.text" :key="i" style="margin:5px 0px;text-align:center">
                        {{t.label}}:
                        <a-tag color="#00000040" style="font-size: 18px;">
                            {{t.num}}
                        </a-tag>
                    </a-col>
                </a-row>
            </a-tag>
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12" v-for="(item,index) in antvArr" :key="index">
            <div class="containersContext">
                <span style="display: flex; justify-content: space-between;">
                    <span style="font-weight: bold; font-size: 18px;">
                        {{item.text}}</span>
                    <a-popconfirm :title="'是否导出'+item.text+'？'" ok-text="确定" cancel-text="取消" @confirm="exportExcelForAntV(item)">
                        <a-button>
                            <template #icon><DownloadOutlined /></template>导出{{item.text}}
                        </a-button>
                    </a-popconfirm>
                </span>
                <div class="containers" :id="item.selector"></div>
                <div v-if="item.typeStr==='Pie'" style="display: flex;flex-flow: wrap;">
                    <span style="padding:10px;" v-for="(t,i) in item.data" :key="i">
                        <i class="g2-legend-marker" :style="{'background-color':t.color}" style="width:20px;height:10px;display:inline-block;margin-right:5px;"></i>
                        {{t.type || 'null'}}：{{t.value}}
                    </span>
                </div>
            </div>
        </a-col>
    </a-row>

</div>
</template>

<style>
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
</style>

<script>
import {
    Line,
    Column,
    Pie
} from '@antv/g2plot';
import {deepCopy} from '@/utils/validate'
import {getList} from '@/api/table'
import color618 from '@/utils/randomColor.js'
import {exportExcel} from '@/utils/excelHelper'
import {
    DownloadOutlined,
} from '@ant-design/icons-vue';
var cardArr = [
    {
        title:"当天用户数据",
        interface:"dayuserdatastatistics",
        interface2:"userinfosum",
        text: [{
                label: "新增用户",
                key:"user_add_count",
                num: 0,
            },
            {
                label: "活跃人数",
                key:"today_user_activate_count",
                num: 0,
            },
            {
                label: "总用户量",
                key:"user_sum_count",
                num: 0,
            },
            // {
            //     label: "总账号数",
            //     key:"account_sum_count",
            //     num: 0,
            // },
             {
                label: "一周总量",
                key:"week_count",
                num: 0,
            },
             {
                label: "昨天总量",
                key:"yester_count",
                num: 0,
            },
             {
                label: "月份总量",
                key:"month_count",
                num: 0,
            },
            {
                label: "今天总量",
                key:"today_count",
                num: 0,
            },
             {
                label: "全部总量",
                key:"sum_count",
                num: 0,
            },
        ],
        background: "#f3a100",
    },
    {
        title:"当日资金数据",
        interface:"daymoneydatastatistics",
        text: [
            {
                label: "笔数",
                key:"count",
                num: 0,
            },
            // {
            //     label: "水金",
            //     key:"mer_comm",
            //     num: 0,
            // },
            {
                label: "佣金",
                key:"commission",
                num: 0,
            },
            {
                label: "主持",
                key:"preside_comm",
                num: 0,
            },
            {
                label: "本金",
                key:"advances",
                num: 0,
            },
            {
                label: "礼金",
                key:"gift_money",
                num: 0,
            },
        ],
        background: "#40a9ff",
    },
    {
        title:"当天提现数据",
        interface:"daywithdrawaldatastatistics",
        text: [
            {
                label: "笔数",
                key:"count",
                num: 0,
            },
            {
                label: "佣金",
                key:"commission",
                num: 0,
            },
            {
                label: "评金",
                key:"comments_money",
                num: 0,
            },
            {
                label: "工资",
                key:"salary_money",
                num: 0,
            },
             {
                label: "本金",
                key:"advances",
                num: 0,
            },
             {
                label: "消费",
                key:"consumer_money",
                num: 0,
            },
            {
                label: "总金",
                key:"money",
                num: 0,
            },
        ],
        background: "#ab6dab",
    },
    {
        title:"当日订单数据",
        interface:"dayordertaskstatistics",
        text: [
            {
                label: "登记订单",
                key:"order_count",
                num: 0,
            },
            {
                label: "客服订单",
                key:"user_task_count",
                num: 0,
            },
        ],
        background: "darkseagreen",
    }
]
var data = []
var pieData1 = []
var pieData2 = []
var pieData3 = []
var antvArr = [
    {
        type: Line,
        typeStr: "Line",
        selector: "container0",
        text: "用户数据",
        excelTitle:["类型","时间","金额"],
        interface:"userdatastatistics",
        data,
    },
    {
        type: Line,
        typeStr: "Line",
        selector: "container4",
        text: "订单数据",
        excelTitle:["类型","时间","数量"],
        interface:"orderdatastatistics",
        data
    },
    {
        type: Line,
        typeStr: "Line",
        selector: "container3",
        text: "订单金额",
        excelTitle:["类型","时间","金额"],
        interface:"withdrawaldatastatistics",
        data,
    },
    {
        type: Line,
        typeStr: "Line",
        selector: "container2",
        text: "提现数据",
        excelTitle:["类型","时间","金额"],
        interface:"moneydatastatistics",
        data,
    },
    {
        type: Pie,
        typeStr: "Pie",
        selector: "container1",
        text: "微信地区",
        interface:"userwxareastatistics",
        excelTitle:["地区","人数"],
        data:pieData1,
    },
    {
        type: Pie,
        typeStr: "Pie",
        selector: "container6",
        text: "账号地区",
        excelTitle:["地区","人数"],
        interface:"areastatistics",
        data: pieData2
    },
    {
        type: Pie,
        typeStr: "Pie",
        selector: "container5",
        text: "用户地区",
        excelTitle:["地区","人数"],
        interface:"userareastatistics",
        data: pieData3
    },  
]
export default {
    components:{
        DownloadOutlined
    },
    name: 'index',
    data() {
        return {
            antvArr,
            cardArr,
        }
    },
    methods: {
        initAntV(item){
            let colorItem = [];
            let colorIndex = 0;
            for(let i=0,len=item.data.length;i<len;i++){
                if(!item.data[i].type){
                    item.data[i].type="未识别地区"
                }
                colorItem[i]=color618.color618.colorArr[colorIndex]
                item.data[i].color = colorItem[i];
                if(colorIndex>=color618.color618.colorArr.length-1){
                    colorIndex = 0;
                }else{
                    colorIndex++;
                }
            }
            let option = {
                isGroup: true,
                data: item.data,
                xField: 'date',
                yField: 'value',
                yAxis: {
                    label: {
                        // 数值格式化为千分位
                        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
                    },
                },
                seriesField: 'type',
                animation: {
                    appear: {
                        animation: 'path-in',
                        duration: 3000,
                    },
                },
            }
            if (item.typeStr == 'Pie') {
                option.radius = 0.8;
                option.appendPadding = 10;
                option.angleField = 'value'
                option.color = colorItem;
                option.colorField = 'type'
                option.isGroup = false;
                option.height = 550;
                option.label = {
                    type: 'inner',
                    content: '{name} {value}',
                };
                option.legend = false
            }
            const line = new item.type(item.selector, option);
            line.render();
        },
        initStatisticsToAntV(indexI=0) {
            getList(this.antvArr[indexI].interface).then(res=>{
                this.antvArr[indexI].data = res.data
                this.initAntV(this.antvArr[indexI])
                indexI++;
                if(indexI<this.antvArr.length){
                    this.initStatisticsToAntV(indexI)
                }
            })
        },
        initStatistics(index=0){
            if(this.cardArr[index].interface2){
                getList(this.cardArr[index].interface2).then(res=>{
                    for(let j=0;j<this.cardArr[index].text.length;j++){
                        if(res.data[this.cardArr[index].text[j].key]){
                            this.cardArr[index].text[j].num = res.data[this.cardArr[index].text[j].key]
                        }
                    }
                })
            }
            getList(this.cardArr[index].interface).then(res=>{
                for(let j=0;j<this.cardArr[index].text.length;j++){
                    if(res.data[this.cardArr[index].text[j].key]){
                        this.cardArr[index].text[j].num = res.data[this.cardArr[index].text[j].key]
                    }
                }
                index++;
                if(index<this.cardArr.length){
                    this.initStatistics(index);
                }
                if(index===this.cardArr.length){
                    this.initStatisticsToAntV()
                }
            })
        },
        exportExcelForAntV(item){
            console.log(item)
            let itemCopy = deepCopy(item.data)
            let datasource = itemCopy.map(x=>{
                delete x.color;
                return x;
            });
            exportExcel(
                {
                    excelTitle:item.excelTitle,
                    exportData:datasource,
                    fileName:item.text,
                }
            );
        }
    },
    mounted() {
        this.initStatistics();
    },
}
</script>
<style>
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