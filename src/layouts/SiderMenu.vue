<template>
  <div style="margin: 10px 0">
    <a-menu
      :default-selected-keys="selectKeys"
      :selectedKeys="selectKeys"
      mode="inline"
      theme="dark"
    >
      <a-menu-item
        v-for="item in menuData"
        :key="item.path"
        title=""
        @click="handelClickLink"
      >
        <a-icon :type="item.meta.icon" />
        <p>{{ item.name }}</p>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
import router from "../router";
export default {
  data() {
    this.selectKeysMap = {};
    const menuData = this.getMenuData(this.$router.options.routes);
    const defaultKeys = this.selectKeysMap[this.$route.path]
      ? this.selectKeysMap[this.$route.path]
      : this.selectKeysMap["/home"];
    return {
      menuData,
      selectKeys: defaultKeys
    };
  },
  watch: {
    $route(to) {
      if (this.selectKeysMap[to.path]) {
        this.selectKeys = this.selectKeysMap[to.path];
      }
    }
  },
  methods: {
    handelClickLink(item) {
      router.push(item.key);
    },
    getMenuData(routes, selectKey) {
      const finalMenuData = [];
      const currentAuth = this.$store.getters.getterUserRole; // 获取当前登录用户的菜单权限
      routes.forEach(item => {
        if (item.showInMenu) {
          item.children.forEach(menu => {
            if (menu.name && menu.meta.authority.includes(currentAuth)) {
              this.selectKeysMap[menu.path] = [menu.path || selectKey];
              const newMenu = { ...menu };
              finalMenuData.push(newMenu);
            }
          });
        }
      });
      return finalMenuData;
    }
  }
};
</script>

<style lang="less" scoped>
.ant-menu-item {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 60px;
  .anticon {
    font-size: 20px;
    line-height: 20px;
  }
  p {
    line-height: 20px;
    margin: 0;
    font-size: 12px;
  }
}
</style>
