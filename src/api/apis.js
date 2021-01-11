// import { fetch } from "./fetch";
import { get } from "./http";

// 本地mock数据，在public文件夹>mock
export function getLoginData(params) {
  if (params.username == "admin" && params.password == "ipd_vue") {
    return get("/mock/login_a.json");
  } else if (params.username == "user" && params.password == "ipd_vue") {
    return get("/mock/login_u.json");
  } else {
    return get("/mock/login_err.json");
  }
}
export function getCardLists() {
  return get("/mock/home_panel.json");
  // if (params == "panel") {
  //   return get("/mock/home_panel.json");
  // } else if (params == "info") {
  //   return get("/mock/home_panel.json");
  // } else if (params == "doc") {
  //   return get("/mock/home_panel.json");
  // } else {
  //   return get("/mock/home_panel.json");
  // }
}

// fastmock在线平台模拟接口
// export function getTestData() {
//   return fetch({
//     url: "/api/test",
//     methoh: "get"
//   });
// }

// export function getLoginData(params) {
//   return fetch({
//     url: "/api/login",
//     method: "post",
//     data: params
//   });
// }

//登录
// export function getLogin(data) {
//   return post("/api/login", data);
// }

//获取home页看板数据
// export function getCardLists(query) {
//   const url = "/api/getCardLists?name=" + query;
//   return get(url);
// }

//获取home页看板detail数据
export function getPanelDetailLists() {
  const url = "/api/getPanelDetail";
  return get(url);
}

//获取workbench页工作台数据
export function getWorkbenchLists() {
  return get("/api/workbench");
}

//获取process页新建流程数据
export function getProcessLists() {
  return get("/api/process");
}
