<template>
<div class="vab-tabs" id="vabTabs" style="align-items:center;display: flex;">
    <div  style="font-size:30px;color:white;display: flex;">
        <menu-unfold-outlined v-if="collapse" class="trigger" @click="toggleCollapse" />
        <menu-fold-outlined v-else class="trigger" @click="toggleCollapse" />
    </div>
    <div class="vab-tabs-left-panel" :style="{'width':tabWidth}" style="align-items:center;display: flex;" >
        <a-tabs :tabBarStyle="{'borderBottom':'0px'}" @tab-click="handleTabClick" @edit="handleTabRemove" v-model:activeKey="tabActive" hide-add type="editable-card">
            <a-tab-pane v-for="item in visitedRoutes" :key="item.fullPath" :closable="!isAffix(item)" :tab="item.meta.title"></a-tab-pane>
        </a-tabs>
    </div>
    <div id="rightItem" style="position: fixed;right:20px;display: flex;align-items: center;">
        <a-dropdown  v-if="vabTabs>500">
            <template v-slot:overlay>
            <a-menu @click="handleClick">
                <a-menu-item key="closeOthersTabs">
                <a>关闭其他</a>
                </a-menu-item>
                <a-menu-item key="closeLeftTabs">
                <a>关闭左侧</a>
                </a-menu-item>
                <a-menu-item key="closeRightTabs">
                <a>关闭右侧</a>
                </a-menu-item>
                <a-menu-item key="closeAllTabs">
                <a>关闭全部</a>
                </a-menu-item>
            </a-menu>
            </template>
            <a-button style="margin-left: 8px">
            更多
            <DownOutlined />
            </a-button>
        </a-dropdown>
        <vab-avatar />
    </div>
    <a-modal v-model:visible="showPacket" centered title="通用二维码" :footer="null">
        <img style="display: flex;height: 500px;margin: auto;" :src="userInfo.red_packet_url" alt="">
        <a-button type="primary" style="margin: auto;display: flex;margin-top: 10px;justify-content: center;align-items: center;" @click="downLoad">下载二维码</a-button>
    </a-modal>
</div>
</template>

<script>
import {h } from 'vue';
import {
    DownOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons-vue'
import {
    mapActions,
    mapGetters
} from 'vuex'
import VabAvatar from '../vab-avatar'
import {
    setCache,
    getCache,
    removeCache
} from '@/utils/index'
const config = require('@/config')
export default {
    name: 'VabTabs',
    components: {
        DownOutlined,
        MenuUnfoldOutlined,
        MenuFoldOutlined,
        VabAvatar,
    },
    data() {
        return {
            showPacket:false,
            affixTabs: [],
            tabActive: null,
            created: false,
            rightItemWidth:0,
            vabTabs:0,
        }
    },
    computed: {
        tabWidth(){
            if(this.vabTabs<500){
                return '0px'
            }
            return this.vabTabs-this.rightItemWidth+'px';
        },
        ...mapGetters({
            visitedRoutes: 'tagsBar/visitedRoutes',
            routes: 'routes/routes',
            collapse: 'settings/collapse',
        }),
        userInfo(){
        if(!this.userInfo){
          let userInfo = getCache("userInfo",localStorage);
          if(userInfo){
            return userInfo;
          }else{
            return {};
          }
        }else{
          return this.userInfo;
        }
      }
    },
    watch: {
        $route: {
            handler(route) {
                this.addTabs(route)
            },
        },
        collapse(old,n){
            if(n){
                this.vabTabs -=100;
            }else{
                this.vabTabs +=100;
            }
        }
    },
    created() {
        this.initAffixTabs(this.routes)
        this.addTabs(this.$route)
    },
    mounted(){
        this.computeWidth();
        this.listenWindowChange();
    },
    methods: {
        downLoad(){
            fetch(this.userInfo.red_packet_url).then(res => res.blob().then(blob => {  
                var a = document.createElement('a');  
                var url = window.URL.createObjectURL(blob);  
                var filename = '二维码.jpg';  
                a.href = url;  
                a.download = filename;
                a.click();  
                window.URL.revokeObjectURL(url);  
            }))
        },
        listenWindowChange(){
            window.onresize = ()=>{
                this.computeWidth();
            }
        },
        computeWidth(){
            let vabTabs = document.getElementById('vabTabs').offsetWidth;
            console.log("vabTabs",vabTabs)
            this.vabTabs = vabTabs- 200
            if(!this.collapse){
                this.vabTabs -=100;
            }
            this.rightItemWidth = document.getElementById('rightItem').offsetWidth;
        },
        ...mapActions({
            addVisitedRoute: 'tagsBar/addVisitedRoute',
            delVisitedRoute: 'tagsBar/delVisitedRoute',
            delOthersVisitedRoutes: 'tagsBar/delOthersVisitedRoutes',
            delLeftVisitedRoutes: 'tagsBar/delLeftVisitedRoutes',
            delRightVisitedRoutes: 'tagsBar/delRightVisitedRoutes',
            delAllVisitedRoutes: 'tagsBar/delAllVisitedRoutes',
            toggleCollapse: 'settings/toggleCollapse',
        }),
        initAffixTabs(routes) {
            routes.forEach((route) => {
                if (route.meta && route.meta.affix) this.addTabs(route)
                if (route.children) this.initAffixTabs(route.children)
            })
        },
        async addTabs(tag) {
            if (tag.name && tag.meta && tag.meta.tagHidden !== true && tag.name!="login") {
                let matched = [tag.name]
                if (tag.matched) matched = tag.matched.map((item) => item.name)
                await this.addVisitedRoute({
                    path: tag.path,
                    fullPath: tag.fullPath,
                    query: tag.query,
                    name: tag.name,
                    matched: matched,
                    meta: {
                        ...tag.meta
                    },
                })
                this.tabActive = tag.fullPath
            }
        },
        isActive(route) {
            return route.path === this.$route.path
        },
        isAffix(tag) {
            return tag.meta && tag.meta.affix
        },
        handleTabClick(tab) {
            const tabArr = tab.split("/");
            this.$emit("tabChange",tabArr)
            const route = this.visitedRoutes.filter((item) => item.path === tab.split("?")[0])[0]
            let to = {name:route.name,query:{cache:1}}
            if(!config.pageCache){
                delete to.query
            }
            if (this.$route.fullPath !== route.fullPath) this.$router.push(to)
        },
        async handleTabRemove(fullPath) {
            let searchCache = getCache("searchForm",sessionStorage)
            if(searchCache){
                let routerName = fullPath.split("/")[2];
                if(routerName.indexOf("?")!=-1){
                    routerName = split("?")[0];
                }
                delete searchCache[routerName]
                setCache("searchForm",searchCache,sessionStorage)
            }
            const view = this.visitedRoutes.find((item) => {
                return fullPath === item.fullPath
            })
            await this.delVisitedRoute(view)
            if (this.isActive(view)) this.toLastTag()
        },
        handleClick({
            key
        }) {
            let pageCache = getCache("searchForm",sessionStorage)
            let route = this.toThisTag();
            switch (key) {
                case 'closeOthersTabs':
                    const curSearchParam = pageCache[this.$route.name];
                    pageCache = {[this.$route.name]:curSearchParam}
                    setCache("searchForm",pageCache,sessionStorage);
                    this.closeOthersTabs(route)
                    break
                case 'closeLeftTabs':
                    this.closeLeftTabs({route,pageCache,setCache})
                    break
                case 'closeRightTabs':
                    this.closeRightTabs({route,pageCache,setCache})
                    break
                case 'closeAllTabs':
                    pageCache = {}
                    setCache("searchForm",pageCache,sessionStorage);
                    this.closeAllTabs(route)
                    break
            }
        },
        async closeSelectedTag(view) {
            await this.delVisitedRoute(view)
            if (this.isActive(view)) {
                this.toLastTag()
            }
        },
        async closeOthersTabs(thisTag) {
            await this.delOthersVisitedRoutes(thisTag)
        },
        async closeLeftTabs({route,pageCache,setCache}) {
            await this.delLeftVisitedRoutes({route,pageCache,setCache})
        },
        async closeRightTabs({route,pageCache,setCache}) {
            await this.delRightVisitedRoutes({route,pageCache,setCache})
        },
        async closeAllTabs(thisTag) {
            await this.delAllVisitedRoutes()
            if (this.affixTabs.some((tag) => tag.path === thisTag.path))
                return
            this.toLastTag()
        },
        toLastTag() {
            const latestView = this.visitedRoutes.slice(-1)[0]
            if (latestView) this.$router.push(latestView)
            else this.$router.push('/')
        },
        toThisTag() {
            const view = this.visitedRoutes.find(
                (item) => item.fullPath === this.$route.fullPath
            )
            if (this.$route.path !== view.path) this.$router.push(view)
            return view
        },
    },
}
</script>
<style>
.tabRightButton{
    background: #23262E !important;
    color: white !important;
    border: 1px solid #5a5959 !important;
    border-radius: 0px;margin-left:20px !important;
}
.ant-dropdown-trigger.ant-btn{
    background: #23262E;
    color:white;
    border: 1px solid #5a5959;
    border-radius:0px;
}
.ant-dropdown-link.ant-dropdown-trigger{
    background: #23262E;
    color:white;
}
.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-nav-container{
    line-height: 40px;
    display: flex;
    align-items: center;
}
/* .ant-tabs-bar {
    border-bottom:0px !important
} */
.ant-tabs-tab>div>.anticon.anticon-close.ant-tabs-close-x{
    color:white !important;
}
</style>
<style lang="less">
.vab-tabs {
    // padding: 0 @vab-margin;
    background: #ffffff;

    &-left-panel {
        float: left;
    }

    &-right-panel {
        float: left;
        // width: 52px;
    }

    .ant-tabs {
        &-bar {
            margin: 0 !important;
        }

        &-tab {
            height: 32px !important;
            margin-right: 5px !important;
            line-height: 32px !important;
            background: #23262E !important;
            color:white !important;
            border: 1px solid #5a5959  !important;
            border-radius: 0px !important;
        }

        &-tab-prev,
        &-tab-next {
            color:white!important;
            height: 32px !important;
            line-height: 32px !important;
        }

        &-tab-active {
            border: 1px solid #1890ff !important;

            .ant-tabs-close-x {
                color: #1890ff !important;
            }
        }
    }
}
</style>
