import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 从sessionStorage获取state初始值
const state = {
  token: window.sessionStorage.getItem("token"),
  role: window.sessionStorage.getItem("role"),
  username: window.sessionStorage.getItem("username"),
  password: window.sessionStorage.getItem("password"),
  userimage: window.sessionStorage.getItem("userimage"),
  phone: window.sessionStorage.getItem("phone"),
  email: window.sessionStorage.getItem("email")
};

const mutations = {
  // 设置或更新state值，并更新sessionStorage
  SET_TOKEN(state, param) {
    state.token = param;
    if (param) {
      window.sessionStorage.setItem("token", param);
    } else {
      window.sessionStorage.removeItem("token");
    }
  },
  SET_ROLE(state, param) {
    state.role = param;
    if (param) {
      window.sessionStorage.setItem("role", param);
    } else {
      window.sessionStorage.removeItem("role");
    }
  },
  SET_USERNAME(state, param) {
    state.username = param;
    if (param) {
      window.sessionStorage.setItem("username", param);
    } else {
      window.sessionStorage.removeItem("username");
    }
  },
  SET_PASSWORD(state, param) {
    state.password = param;
    if (param) {
      window.sessionStorage.setItem("password", param);
    } else {
      window.sessionStorage.removeItem("password");
    }
  },
  SET_USERIMAGE(state, param) {
    state.userimage = param;
    if (param) {
      window.sessionStorage.setItem("userimage", param);
    } else {
      window.sessionStorage.removeItem("userimage");
    }
  },
  SET_PHONE(state, param) {
    state.phone = param;
    if (param) {
      window.sessionStorage.setItem("phone", param);
    } else {
      window.sessionStorage.removeItem("phone");
    }
  },
  SET_EMAIL(state, param) {
    state.email = param;
    if (param) {
      window.sessionStorage.setItem("email", param);
    } else {
      window.sessionStorage.removeItem("email");
    }
  }
};

const actions = {
  // 保存vue状态信息到vuex中，调用mutations中的事件
  // saveToken({ commit }, token) {
  //   commit("SET_TOKEN", token);
  // },
  logout({ commit }) {
    commit("SET_TOKEN", null);
    commit("SET_ROLE", null);
    commit("SET_USERNAME", null);
    commit("SET_USERIMAGE", null);
    commit("SET_PHONE", null);
    commit("SET_EMAIL", null);
  }
};

// 就是公共的计算属性
const getters = {
  getterUserRole: state => {
    return state.role;
  },
  getterUserName: state => {
    return state.username;
  },
  getterUserImage: state => {
    return state.userimage;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {}
});
