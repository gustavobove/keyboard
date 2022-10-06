import { createStore } from "vuex";

import keyboard from "./keyboard";

const store = createStore({
  modules: {
    keyboard,
  },
});

export default store;
