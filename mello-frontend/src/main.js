import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import store from "./store";

const app = createApp(App);

app.use(router);
app.use(store);

const axiosInstance = axios.create({
  baseURL: "http://localhost/api/",
});

app.config.globalProperties.$http = axiosInstance;

app.mount("#app");
