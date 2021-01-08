import Vue from "vue";
import VueRouter from "vue-router";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import NoFound from "../views/404.vue";
import store from "../store";
// import { getToken } from "@/cookies/cookie";

Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    component: () =>
      import(/* webpackChunkName: "layouts" */ "../layouts/UserLayout.vue"),
    children: [
      {
        path: "/user",
        redirect: "/user/login"
      },
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/user/Login.vue")
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/user/Register.vue")
      }
    ]
  },
  {
    path: "/",
    showInMenu: true,
    component: () =>
      import(
        /* webpackChunkName: "basicLayout" */ "../layouts/BasicLayout.vue"
      ),
    children: [
      // 重定向-首页
      {
        path: "/",
        redirect: "/home"
      },
      // home
      {
        path: "/home",
        name: "项目管理",
        meta: {
          icon: "project",
          needLogin: true,
          authority: ["admin", "ordinary"]
        },
        component: () =>
          import(/* webpackChunkName: "home" */ "../views/home/Home.vue")
      },
      // workbench
      {
        path: "/workbench",
        name: "工作台",
        meta: {
          icon: "profile",
          needLogin: true,
          authority: ["admin", "ordinary"]
        },
        component: () =>
          import(
            /* webpackChunkName: "workbench" */ "../views/workbench/Workbench.vue"
          )
      },
      // process
      {
        path: "/process",
        name: "新建项目",
        meta: {
          icon: "plus-square",
          needLogin: true,
          authority: ["admin", "ordinary"]
        },
        component: () =>
          import(
            /* webpackChunkName: "process" */ "../views/process/AddProcess.vue"
          )
      },
      // repository
      {
        path: "/repository",
        name: "知识库",
        meta: {
          icon: "wallet",
          needLogin: true,
          authority: ["admin", "ordinary"]
        },
        component: () =>
          import(
            /* webpackChunkName: "repository" */ "../views/repository/Repository.vue"
          )
      },
      // settings
      {
        path: "/settings",
        name: "设置",
        meta: {
          icon: "setting",
          needLogin: true,
          authority: ["admin"]
        },
        component: () =>
          import(
            /* webpackChunkName: "settings" */ "../views/settings/Settings.vue"
          )
      },
      // usersInfo
      {
        path: "/usersInfo",
        name: "用户管理",
        meta: {
          icon: "team",
          needLogin: true,
          authority: ["admin"]
        },
        component: () =>
          import(
            /* webpackChunkName: "usersInfo" */ "../views/users/UsersInfo.vue"
          )
      },
      // help
      {
        path: "/help",
        name: "帮助",
        meta: { icon: "question-circle", authority: ["admin", "ordinary"] },
        component: () =>
          import(/* webpackChunkName: "help" */ "../views/help/Help.vue")
      }
    ]
  },
  {
    path: "*",
    name: "404",
    component: NoFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// 调用全局的 beforeEach 路由守卫
router.beforeEach((to, form, next) => {
  // const hasToken = getToken();
  // 获取登录状态-token
  const hasToken = store.state.token
    ? store.state.token
    : window.sessionStorage.getItem("token");
  // 路由进度条
  Nprogress.start();
  // 判断当前路由是否需要登录
  if (to.meta.needLogin) {
    if (hasToken && to.path === "/user/login") {
      next({ path: "/home" });
    } else if (hasToken && to.path !== "/user/login") {
      next();
    } else if (!hasToken && to.path !== "/user/login") {
      next({ path: "/user/login" });
    }
    return;
  } else {
    if (hasToken && to.path === "/user/login") {
      next({ path: "/home" });
    } else {
      next();
    }
  }
});

// 调用全局的 afterEach 路由钩子
router.afterEach(() => {
  Nprogress.done();
});

export default router;
