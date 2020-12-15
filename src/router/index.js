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
    component: () =>
      import(
        /* webpackChunkName: "basicLayout" */ "../layouts/BasicLayout.vue"
      ),
    children: [
      // 重定向-首页
      {
        path: "/",
        redirect: "/dashboard/analysis"
      },
      // dashboard
      {
        path: "/dashboard",
        name: "dashboard",
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/dashboard",
            redirect: "/dashboard/analysis"
          },
          {
            path: "/dashboard/analysis",
            name: "analysis",
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/dashboard/Analysis.vue"
              )
          }
        ]
      },
      // tasks
      {
        path: "/tasks",
        name: "tasks",
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/tasks",
            redirect: "/tasks/task1"
          },
          {
            path: "/tasks/task1",
            name: "task1",
            component: () =>
              import(/* webpackChunkName: "tasks" */ "../views/tasks/Task1.vue")
          },
          {
            path: "/tasks/task2",
            name: "task2",
            component: () =>
              import(/* webpackChunkName: "tasks" */ "../views/tasks/Task2.vue")
          }
        ]
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
