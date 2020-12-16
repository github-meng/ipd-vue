import Vue from "vue";
import VueRouter from "vue-router";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import NoFound from "../views/404.vue";

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
        meta: { icon: "project" },
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "../views/home/Home.vue")
      },
      // workbench
      {
        path: "/workbench",
        name: "工作台",
        meta: { icon: "profile" },
        component: () =>
          import(
            /* webpackChunkName: "tasks" */ "../views/workbench/Workbench.vue"
          )
      },
      // process
      {
        path: "/process",
        name: "新建项目",
        meta: { icon: "plus-square" },
        component: () =>
          import(
            /* webpackChunkName: "tasks" */ "../views/process/AddProcess.vue"
          )
      },
      // repository
      {
        path: "/repository",
        name: "知识库",
        meta: { icon: "wallet" },
        component: () =>
          import(
            /* webpackChunkName: "tasks" */ "../views/repository/Repository.vue"
          )
      },
      // settings
      {
        path: "/settings",
        name: "设置",
        meta: { icon: "setting" },
        component: () =>
          import(
            /* webpackChunkName: "tasks" */ "../views/settings/Settings.vue"
          )
      },
      // usersInfo
      {
        path: "/usersInfo",
        name: "用户管理",
        meta: { icon: "team" },
        component: () =>
          import(/* webpackChunkName: "tasks" */ "../views/users/UsersInfo.vue")
      },
      // help
      {
        path: "/help",
        name: "帮助",
        meta: { icon: "question-circle" },
        component: () =>
          import(/* webpackChunkName: "tasks" */ "../views/help/Help.vue")
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
  Nprogress.start();
  next();
});

// 调用全局的 afterEach 路由钩子
router.afterEach(() => {
  Nprogress.done();
});

export default router;
