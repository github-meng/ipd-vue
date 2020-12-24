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
  Spin
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
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
