<template>
  <div class="header">
    <a-dropdown v-model="visible" class="ant-dropdown-user">
      <a class="ant-dropdown-link" @click="e => e.preventDefault()">
        <a-avatar
          class="dropdown-avatar"
          :src="require('../assets/ipd-logo.png')"
          alt="头像"
        />
        Admin
        <a-icon type="down" />
      </a>
      <a-menu slot="overlay" @click="handleMenuClick">
        <a-menu-item key="1">
          <a-icon type="user" />
          个人信息
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="key" />
          修改密码
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="3">
          <a-icon type="logout" />
          退出登录
        </a-menu-item>
      </a-menu>
    </a-dropdown>

    <a-dropdown
      :trigger="['click']"
      v-model="newsVisible"
      class="ant-dropdown-news"
    >
      <a class="ant-dropdown-link" @click="newsDropdown">
        <a-badge :count="99" class="icons-list">
          <icon-font type="icon-tongzhi1" />
        </a-badge>
      </a>
      <a-menu slot="overlay" class="menu-tabs">
        <a-menu-item key="tabs">
          <div class="tabs-news">
            <a-tabs default-active-key="1" :tabBarGutter="70">
              <a-tab-pane key="1" tab="消息">
                消息提示区
              </a-tab-pane>
              <a-tab-pane key="2" tab="待办">
                任务待办区
              </a-tab-pane>
            </a-tabs>
          </div>
        </a-menu-item>
      </a-menu>
    </a-dropdown>

    <div class="drawer-btn" @click="openDrawer">
      <a-badge dot :count="5" class="icons-list">
        <icon-font type="icon-liaotian" />
      </a-badge>
    </div>
    <a-drawer
      :title="'讨论区'"
      placement="right"
      :closable="true"
      :keyboard="true"
      :visible="visibleDrawer"
      :get-container="false"
      @close="onClose"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <div
        :style="{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e8e8e8',
          padding: '10px 16px',
          left: 0,
          background: '#fff',
          borderRadius: '0 0 4px 4px',
          display: 'flex',
          flex: '1 1 0%'
        }"
      >
        <a-mentions
          class="mentions"
          v-model="value"
          @change="onChange"
          @select="onSelect"
        >
          <a-mentions-option value="afc163">
            afc163
          </a-mentions-option>
          <a-mentions-option value="zombieJ">
            zombieJ
          </a-mentions-option>
          <a-mentions-option value="yesmeck">
            yesmeck
          </a-mentions-option>
        </a-mentions>
        <a-button type="primary" class="mentions-btn">
          <icon-font type="icon-send" />
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import { Icon } from "ant-design-vue";

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2275690_pturnat813s.js"
});
export default {
  data() {
    return {
      visible: false,
      visibleDrawer: false,
      newsVisible: false,
      value: ""
    };
  },
  components: {
    IconFont
  },
  methods: {
    onSelect(option) {
      console.log("select", option);
    },
    onChange(value) {
      console.log("Change:", value);
    },
    openDrawer() {
      this.visibleDrawer = true;
    },
    onClose() {
      this.visibleDrawer = false;
    },
    newsDropdown() {
      this.newsVisible = !this.newsVisible;
    },
    handleMenuClick(e) {
      console.log(e);
      if (e.key === "3") {
        this.visible = false;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .ant-dropdown-user {
    margin-right: 12px;
    color: #333333;
  }
  .ant-dropdown-news {
    padding: 0 12px;
    margin-right: 12px;
    span {
      padding: 0 3px 0 0;
    }
  }
  .ant-dropdown-news:hover,
  .drawer-btn:hover,
  .ant-dropdown-user:hover {
    background: rgba(0, 0, 0, 0.025);
    cursor: pointer;
  }
  .drawer-btn {
    padding: 0 12px;
    margin-right: 12px;
  }
}

.dropdown-avatar {
  margin-bottom: 6px;
}

#components-badge-demo-dot .anticon-notification {
  width: 16px;
  height: 16px;
  line-height: 16px;
  font-size: 16px;
}

.badge-notification {
  padding: 0 12px;
  line-height: 26px;
}

.icons-list .anticon {
  font-size: 20px;
  color: #333333;
}

.mentions {
  border-radius: 0;
}

.mentions-btn {
  border-radius: 0;
  padding: 0 6px;
  font-size: 18px;
}

.tabs-news {
  width: 260px;
  max-width: 260px;
}

.menu-tabs > .ant-dropdown-menu-item:hover {
  background-color: transparent;
}
</style>
