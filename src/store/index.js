import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  userInfo: null,
  title: ""
};

const mutations = {
  USER_INFO(state, param) {
    state.userInfo = param.userInfo;
  }
};

const actions = {
  saveUserInfo({ commit }, dataFromLogin) {
    commit("USER_INFO", dataFromLogin); // 保存登录信息到vuex中
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {}
});
