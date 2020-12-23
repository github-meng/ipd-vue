import { fetch } from "./fetch";
import { post } from "./http";

// 本地mock数据，在public文件夹>mock
export function getUserData() {
  return fetch({
    url: "/api/user.json",
    methoh: "get"
  });
}

// fastmock在线平台模拟接口
export function getTestData() {
  return fetch({
    url: "/api/test",
    methoh: "get"
  });
}

export function getLoginData(params) {
  return fetch({
    url: "/api/login",
    method: "post",
    data: params
  });
}

//登录
export function getLogin(data) {
  return post("/api/login", data);
}
