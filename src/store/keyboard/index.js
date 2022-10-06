const state = () => ({
  keyPressed: "",
});

const mutations = {
  set_key_pressed(state, payload) {
    state.keyPressed = "";
    setTimeout(() => {
      state.keyPressed = payload;
    }, 100);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
