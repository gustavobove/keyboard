import { createApp } from "vue";
import App from "./App.vue";

import "./assets/index.css";
import "./assets/tailwind.css";

import store from "./store";

const app = createApp(App);

app.mount("#app");
app.use(store);
