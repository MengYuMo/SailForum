import { createApp } from "vue";
import "./style.css";
import "./assets/style/reset.less";
import "element-plus/es/components/notification/style/css.mjs";
import "element-plus/es/components/message/style/css.mjs";
import App from "./App.vue";
import { router } from "./router/index.js";
import globalComponent from "./components/index.js";
import { request } from "./utils/http/request.js";

// 创建 Vue 实例
const app = createApp(App);

// 使用 vue 路由
app.use(router);

// 将封装的 axios 请求方法挂载到全局
app.config.globalProperties.$http = request;

// 注册全局自定义组件
app.use(globalComponent);

// 挂载
app.mount("#app");
