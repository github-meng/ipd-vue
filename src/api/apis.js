import { fetch } from "./fetch";

export function getUserData() {
  return fetch({
    url: "/api/user.json",
    methoh: "get"
  });
}

export function getTestData() {
  return fetch({
    url: "/api/test",
    methoh: "get"
  });
}
