<template>
    <div style="display: flex;flex-wrap: wrap;" v-if="fileListC">
        <div  v-for="(item,index) in fileListC" :key="index">
            <div v-if="item.src"  class="imgList">
                <vab-icon :style="{'opacity':item.showDel?1:0}" @click="removeImg(item)" @mouseover="imgOver(item)" @mouseout="imgLeave(item)" class="imgIcon" icon="delete-bin-6-fill" />
                <img  width="100" height="100" class="imgContain" :src="item.src">
            </div>
        </div>
        <div v-if="col.config.hasImage<fileListC.length" style="border:1px solid darkgrey;background:#f5f5f5" @click="uploadFile" class="imgList">
            <plus-outlined style="font-size:30px;color: darkgrey;line-height: 100px;" />
            <input style="display: none;" @change="fileChange" :id="colC.dataIndex+'_file'" type="file" multiple>
        </div>
    </div>
</template>
<script>
import {
    PlusOutlined,
} from '@ant-design/icons-vue';
import VabIcon from '@/layout/vab-icon'
export default {
    components: {
        PlusOutlined,
        VabIcon
    },
    name:"uploadForBatch",
    props: {
        fileList: {
            type: [Array, Object],
            default: []
        },
        count:{
            type:Number,
            default:1
        },
        col:{
            type: [Array, Object],
            default:{}
        },
    },
    date(){
        return {
            fileListC:[],
            countC:1,
            colC:{}
        }
    },
    methods: {
        getObjectURL(file) {
            var url = null ;
            if (window.createObjectURL!=undefined) { // basic
                url = window.createObjectURL(file) ;
            } else if (window.URL!=undefined) { // mozilla(firefox)
                url = window.URL.createObjectURL(file) ;
            } else if (window.webkitURL!=undefined) { // webkit or chrome
                url = window.webkitURL.createObjectURL(file) ;
            }
            return url ;
        },
        removeImg(item){
            for(let x=0;x<this.fileListC.length;x++){
                if(this.fileListC[x].uid===item.uid){
                    delete this.fileListC[x].uid
                    delete this.fileListC[x].src
                    delete this.fileListC[x].file
                    this.col.config.hasImage--;
                    this.$emit("fileRemove",{file:this.fileListC[x],fileList:this.fileListC})
                    break;
                }
            }
        },
        imgOver(item){
            item.showDel = true;
            return false;
        },
        imgLeave(item){
            item.showDel = false;
            return false;
        },
        uploadFile(){
            var fileDom = document.getElementById(this.colC.dataIndex+'_file');
            fileDom.click();
        },
        fileChange(file){
            let files = file.target.files;
            let noIdList = this.fileListC.filter(x=>!x.uid)
            if(noIdList.length<1){
                this.$message.error(`最多只能上传${this.countC}张图片！`)
                return;
            }
            for(let i=0;i<noIdList.length;i++){
                if(files[i]){
                    if(!/image+/.test(files[i].type)) {
                        this.$message.error("上传格式必须为图片");
                    }else{
                        noIdList[i].src = this.getObjectURL(files[i]);
                        noIdList[i].uid = "sok_"+files[i].name+"_"+Date.now();
                        noIdList[i].file = files[i];
                        this.$emit("fileChange",{file:noIdList[i],fileList:this.fileListC})
                        this.col.config.hasImage++;
                    }
                }
            }
        },
    },
    created() {
        this.fileListC = this.fileList;
        this.countC = this.count;
        if(this.col.config.hasImage===undefined){
            this.col.config.hasImage = 0;
        }
        this.colC = this.col;
        console.log("fileListC",this.fileListC)
        console.log("countC",this.countC)
        console.log("colC",this.colC)
    },
}
</script>
<style scoped>
.imgList{
    position: relative;
    margin: 10px;
    width: 100px;
    height: 100px;
    border-radius: 5px;
    text-align:center;
}
.imgContain{
    border-radius: 5px;
    position: absolute;
    left: 0;
    top: 0;
}
.imgIcon{
    transition: opacity 0.5s;
    cursor: pointer;
    position: absolute;
    color: white;
    z-index: 2;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    font-size:25px;
}
</style>