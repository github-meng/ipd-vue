import Axios from "axios";
// import { getToken } from "../cookies/cookie";
// import router from "../router/index";
// import { Message } from "ant-design-vue";

//http request 拦截器
Axios.interceptors.request.use(
  config => {
    // const token = getToken(); // 注意使用的时候需要引入cookie方法，推荐js-cookie
    const token = window.sessionStorage.getItem("token"); // 注意使用的时候需要引入cookie方法，推荐js-cookie
    // config.data = JSON.stringify(config.data);
    if (token) {
      // config.params = { token: token };
      config.headers = {
        Authorization: token
      };
    }
    // if (store.getters.token) {
    //   // 让每个请求携带token-- ['XN-Auth']为自定义Header key
    //   config.headers["XN-Auth"] = getToken();
    // }
    console.log("config拦截器=", config);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//http response 拦截器
Axios.interceptors.response.use(
  response => {
    // if (!response.data.data.verifySuccess) {
    // Message.error("登录已失效，请重新登录！");
    //   setTimeout(() => {
    //     router.push({
    //       path: "/user/login"
    //     });
    //   }, 3500);
    // }
    console.log("response拦截器=", response);
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

//  封装get方法,返回promise对象
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    Axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// 封装post请求
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    Axios.post(url, data).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}
