<template>
  <div>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <div class="logo">
          <a href="/">
            <img src="../assets/ipd-logo.png" alt="logo" />
            <h1>流程系统</h1>
          </a>
        </div>
        <SiderMenu />
      </a-layout-sider>
      <a-layout>
        <a-layout-header class="layout-header">
          <!-- <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        /> -->
          <Header />
        </a-layout-header>
        <a-layout-content style="margin: 16px">
          <transition>
            <router-view></router-view>
          </transition>
        </a-layout-content>
        <a-layout-footer style="text-align: center;padding: 16px 50px;">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
import SiderMenu from "./SiderMenu";
export default {
  components: {
    Header,
    Footer,
    SiderMenu
  },
  data() {
    return {
      collapsed: true
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.layout-header {
  background: #fff;
  padding: 0;
  height: 48px;
  line-height: 48px;
}
.logo {
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    overflow: hidden;
    img {
      display: inline;
      width: 40px;
      height: 40px;
      margin: 4px;
    }
    h1 {
      font-size: 14px;
      line-height: 20px;
      font-weight: 600;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      color: #ffffff;
      margin: 0;
    }
  }
}
.trigger {
  line-height: 64px;
  padding: 0 20px;
}
.trigger:hover {
  background-color: #cccccc;
}
</style>
