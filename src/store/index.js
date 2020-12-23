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
  },
  logout({ commit }) {
    commit("USER_INFO", {});
  }
};

// 就是公共的计算属性
const getters = {
  getterUserName(state) {
    return state.userInfo;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {}
});
