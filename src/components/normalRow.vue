<template>
    <div :style="{'max-width':computedWidth(item)}" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;display:inline-block" @click="clickItem(text,record,item)" :class="{'openPageStyle':item.config && item.config.clickEvent}">
        <a-tooltip v-if="item.config && item.config.quickVisit" placement="right">
            <template #title>
                <div style="min-width:150px;text-align:center;overflow:hidden">
                    <div class="target-router" :style="{'textDecoration':target.name==$route.name?'line-through':'none'}" @click="openPage(target,targetIndex)" v-for="(target,targetIndex) in item.config.quickVisit" :key="target.routerName">
                        <vab-icon class="arrow arrow-left" icon="arrow-right-s-fill"></vab-icon>
                        查看 {{target.title}}
                        <vab-icon class="arrow arrow-right" icon="arrow-left-s-fill"></vab-icon>
                    </div>
                </div>
            </template>
            <span>{{text}}</span>
        </a-tooltip>
        <a-tooltip v-else placement="topLeft" :title="text">
            <span v-if="item.customData">{{item.customData}}</span>
            <span v-else>{{text}}</span>
        </a-tooltip>
    </div>    
</template>
<script>
import VabIcon from "@/layout/vab-icon";
export default {
    inject:["parentOpenPage"],
    components:{
        VabIcon
    },
    name: 'normalRow',
    props: {
        item: {
            type: [Array, Object],
            default: {}
        },
        record: {
            type: [Array, Object],
            default: {}
        },
        text: {
            type: [Array, Object,String,Number],
            default: ""
        },
        tableConfig:{
            type:[Object,Array],
            default:{},
        }
    },
    methods: {
        openPage(target,targetIndex){
            if(target.name===this.$route.name){
                return;
            }
            if(target.name){
                const config = {config:{openPageName: target.name,paramName: [target.paramName],paramValue: [this.item.dataIndex]}};
                this.parentOpenPage({config,value:this.record,text:this.text})
            }else{
                this.$message.info("暂无此页面！！！")
            }
        },
        clickItem(text,record,item){
            this.$emit('clickItem', text,record,item);
        },
        computedWidth(item){
            if(item.width){
                if(item.config && item.config.isEdit){
                    return item.width-40+"px";   
                }
                return item.width+"px";
            }
            if(item.title.indexOf('备注')!=-1){
                item.width = 120;
                return item.width+"px";
            }
            if(item.title.indexOf('关键')!=-1){
                item.width = 150;
                return 150+"px"
            }
            if(['店铺',"商品","商品ID"].includes(item.title)){
                item.width = 180;
                return 180+"px"
            }
            // if(!this.tableConfig.autoWidth){
            //     item.width = 200
            //     return 200+"px"
            // }
        }
    },
}
</script>
<style scoped>
.tipContent{
    display: flex;
    justify-content: space-between;
}
.arrow-left{
    transform:translate(-30px,0px);
}
.arrow-right{
    transform:translate(30px,0px);
}
.arrow{
    transition:all 0.2s;
    display: inline-block;
}
.target-router:hover{
    color:#40a9ff;
    cursor: pointer;
    font-size:16px;
}
.target-router:hover>.arrow-right{
    transform:translate(0px,0px)
}
.target-router:hover>.arrow-left{
    transform:translate(0px,0px)
}
.target-router{
    height:30px;
    line-height:30px;
    transition: all 0.2s;
}
</style>
