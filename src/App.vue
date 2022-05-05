<template>
    <a-config-provider :locale="locale">
        <router-view />
    </a-config-provider>
</template>

<script>
import {
    setCache,
    getCache,
    filterRouter,
} from '@/utils/index'
import { asyncRoutes } from '@/router'
import zhCN from 'ant-design-vue/es/locale/zh_CN';
export default {
    data() {
        return {
            locale: zhCN,
        };
    },
    created() {
        try{
            if(this.$route.path!="/login"){
                let userInfo = getCache("userInfo",localStorage);
                if(userInfo){
                    filterRouter(userInfo,asyncRoutes);
                }
            }
        }catch(ex){
            console.error("ooooooo0000OOOOOO",ex)
        }
        
        //在页面刷新时将vuex里的信息保存到localStorage里
        window.addEventListener("beforeunload", () => {
            let currentEditItem = this.$store.getters['customData/currentEditItem'];
            if (currentEditItem && typeof currentEditItem == "object") {
                setCache("currentEditItem", currentEditItem);
            }
            let pageCache = getCache("searchForm",sessionStorage)
            const curSearchParam = pageCache[this.$route.name];
            if(curSearchParam){
                pageCache = {[this.$route.name]:curSearchParam}
                setCache("searchForm",pageCache,sessionStorage);
            }
        })
    },
}
</script>

<style lang="less">
@import '~@/vab/styles/vab.less';
</style>
