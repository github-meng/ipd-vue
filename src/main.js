import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  Button,
  Layout,
  Icon,
  Menu,
  Avatar,
  Space,
  Dropdown,
  Badge,
  Drawer,
  Mentions,
  Tabs,
  Form,
  Input,
  Checkbox,
  Select,
  Row,
  Col,
  Message,
  Notification,
  Modal,
  Spin,
  Card,
  PageHeader,
  Radio,
  Tree,
  Affix,
  Empty,
  List,
  Timeline,
  Divider,
  Collapse,
  Table,
  Tooltip,
  Tag,
  Upload
} from "ant-design-vue";

Vue.prototype.$message = Message;
Vue.prototype.$notification = Notification;
Vue.prototype.$confirm = Modal.confirm;

Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Menu);
Vue.use(Avatar);
Vue.use(Space);
Vue.use(Dropdown);
Vue.use(Badge);
Vue.use(Drawer);
Vue.use(Mentions);
Vue.use(Tabs);
Vue.use(Form);
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(Select);
Vue.use(Row);
Vue.use(Col);
Vue.use(Modal);
Vue.use(Spin);
Vue.use(Card);
Vue.use(PageHeader);
Vue.use(Radio);
Vue.use(Tree);
Vue.use(Affix);
Vue.use(Empty);
Vue.use(List);
Vue.use(Timeline);
Vue.use(Divider);
Vue.use(Collapse);
Vue.use(Table);
Vue.use(Tag);
Vue.use(Tooltip);
Vue.use(Upload);
Vue.config.productionTip = false;

// 引入阿里iconfont图标库中的图标
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2275690_9zs0i0c145.js"
});
Vue.component("IconFont", IconFont);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
