<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo">
        <a href="/">
          <img src="../assets/logo.png" alt="logo" />
          <h1>流程系统</h1>
        </a>
      </div>
      <SiderMenu />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <!-- <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        /> -->
        <Header />
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <transition>
          <router-view></router-view>
        </transition>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        <Footer />
      </a-layout-footer>
    </a-layout>
  </a-layout>
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
.logo {
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    overflow: hidden;
    img {
      display: inline;
      width: 50px;
      height: 50px;
      margin: 7px;
    }
    h1 {
      font-size: 16px;
      font-weight: 600;
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
