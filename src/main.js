import { createApp } from 'vue'
import {
  Button,
  Input,
  Form,
  Layout,
  Row,
  Col,
  Dropdown,
  Menu,
  DatePicker,
  Table,
  Tabs,
  Tag,
  Modal,
  Select,
  InputNumber,
  Radio,
  Popconfirm,
  Progress,
  Upload,
  ConfigProvider,
  Checkbox,
  Tooltip,
  Slider,
  Descriptions,
  Empty,
  Badge,
  Alert,
  Card,
  Divider,
  Skeleton,
  message,
} from 'ant-design-vue'
// import Antd from 'ant-design-vue'
import App from './App'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css'
import '@/vab'
import {mockURL} from '@/config'
if(mockURL){
  const { mockXHR } = require('@/utils/static')
  mockXHR()
}
let v = createApp(App)
v.use(store)
v.use(router)

// v.use(Antd)

v.use(Button)
v.use(Input)
v.use(Form)
v.use(Layout)
v.use(Row)
v.use(Col)
v.use(Dropdown)
v.use(Menu)
v.use(DatePicker)
v.use(Table)
v.use(Tabs)
v.use(Tag)
v.use(Modal)
v.use(Select)
v.use(InputNumber)
v.use(Radio)
v.use(Popconfirm)
v.use(Progress)
v.use(Upload)
v.use(ConfigProvider)
v.use(Checkbox)
v.use(Tooltip)
v.use(Slider)
v.use(Descriptions)
v.use(Empty)
v.use(Badge)
v.use(Card)
v.use(Divider)
v.use(Alert)
v.use(Skeleton)
v.config.globalProperties.$message = message;
v.config.globalProperties.$confirm = Modal.confirm;
v.config.globalProperties.$info = Modal.info;
v.mount('#app')

