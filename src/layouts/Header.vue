<template>
  <div class="header">
    <a-dropdown v-model="visible" class="ant-dropdown-user">
      <a class="ant-dropdown-link" @click="e => e.preventDefault()">
        <a-avatar
          class="dropdown-avatar"
          :src="
            require(role == 'admin'
              ? '@/assets/admin.png'
              : '@/assets/user.png')
          "
          alt="头像"
        />
        {{ username }}
        <a-icon type="down" />
      </a>
      <a-menu slot="overlay">
        <a-menu-item key="1" @click="handleAccountClick">
          <a-icon type="user" />
          个人中心
        </a-menu-item>
        <a-menu-item key="2" @click="handleModifyClick">
          <a-icon type="key" />
          修改密码
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="3" @click="handleMenuClick">
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
          <icon-font type="icon-ipd-news" />
        </a-badge>
      </a>
      <a-menu slot="overlay" class="menu-tabs">
        <a-menu-item key="tabs">
          <div class="tabs-news">
            <a-tabs default-active-key="1">
              <a-tab-pane key="1" tab="消息">
                <a-list item-layout="horizontal" :data-source="noticesData">
                  <div slot="footer">
                    <a-row>
                      <a-col :span="12" class="br-1">
                        <a-button type="link" block class="footer-btn">
                          清空通知
                        </a-button>
                      </a-col>
                      <a-col :span="12">
                        <a-button type="link" block class="footer-btn">
                          查看更多
                        </a-button>
                      </a-col>
                    </a-row>
                  </div>
                  <a-list-item slot="renderItem" slot-scope="item">
                    <a-list-item-meta>
                      <p slot="title" class="item-meta m-0">
                        {{ item.projectName }}
                        <a-divider type="vertical" />
                        提到了你
                      </p>
                      <div slot="description" class="description">
                        {{ item.noticesDes }}
                        <br />
                        <span>
                          {{ item.dataTime }}
                        </span>
                      </div>
                      <a-avatar
                        slot="avatar"
                        style="color: #f5222d; backgroundColor: #ffdcdc"
                      >
                        <icon-font type="icon-guangbo" />
                      </a-avatar>
                    </a-list-item-meta>
                  </a-list-item>
                </a-list>
              </a-tab-pane>
              <a-tab-pane key="2" tab="待办">
                <a-list item-layout="horizontal" :data-source="noticesData">
                  <div slot="footer">
                    <a-row>
                      <a-col :span="12" class="br-1">
                        <a-button type="link" block class="footer-btn">
                          清空待办
                        </a-button>
                      </a-col>
                      <a-col :span="12">
                        <a-button type="link" block class="footer-btn">
                          查看更多
                        </a-button>
                      </a-col>
                    </a-row>
                  </div>
                  <a-list-item slot="renderItem" slot-scope="item">
                    <a-list-item-meta>
                      <p slot="title" class="item-meta m-0">
                        {{ item.projectName }}
                        <a-divider type="vertical" />
                        你有一个待办任务
                      </p>
                      <div slot="description" class="description">
                        {{ item.noticesDes }}
                        <br />
                        <span>
                          {{ item.dataTime }}
                        </span>
                      </div>
                      <a-avatar
                        slot="avatar"
                        style="color: #f56a00; backgroundColor: #fde3cf"
                      >
                        <icon-font type="icon-daiban" />
                      </a-avatar>
                    </a-list-item-meta>
                  </a-list-item>
                </a-list>
              </a-tab-pane>
            </a-tabs>
          </div>
        </a-menu-item>
      </a-menu>
    </a-dropdown>

    <div class="drawer-btn" @click="openDrawer">
      <a-badge dot :count="5" class="icons-list">
        <icon-font type="icon-ipd-chart" />
      </a-badge>
    </div>
    <a-drawer
      :title="'流程分组区'"
      placement="right"
      width="300"
      class="drawer-chart"
      :closable="true"
      :keyboard="true"
      :visible="visibleDrawer"
      :get-container="false"
      @close="onClose"
    >
      <a-list item-layout="horizontal" :data-source="data">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-list-item-meta
            :description="item.description"
            @click="showChildrenDrawer"
          >
            <p slot="title" class="m-0">
              <a-badge :status="index > 2 ? 'default' : 'error'" />
              {{ item.title }}
              <sub class="sub">{{ item.createTime }}</sub>
            </p>
            <div
              slot="avatar"
              class="avt-box"
              v-for="(avt, index) in item.avatar"
              :key="index"
            >
              <a-avatar :src="avt.img" />
            </div>
            <span slot="avatar" class="avt-tips">
              ...等{{ item.avatar.length }}人
            </span>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
      <a-drawer
        title="交流讨论区"
        width="320"
        :closable="true"
        :visible="childrenDrawer"
        @close="onChildrenDrawerClose"
      >
        <div>这是聊天区</div>
        <div class="mentions-box">
          <a-mentions
            class="mentions"
            v-model="value"
            @change="onChange"
            @select="onSelect"
          >
            <a-mentions-option value="admin">
              admin
            </a-mentions-option>
            <a-mentions-option value="user">
              user
            </a-mentions-option>
            <a-mentions-option value="myj">
              myj
            </a-mentions-option>
          </a-mentions>
          <a-button type="primary" class="mentions-btn">
            <icon-font type="icon-send" />
          </a-button>
        </div>
      </a-drawer>
    </a-drawer>
  </div>
</template>

<script>
// import { Icon } from "ant-design-vue";
// import { removeToken } from "@/cookies/cookie";
import router from "@/router/index";
import Mock from "mockjs";
const Random = Mock.Random;
const mockArrLength = Random.integer(1, 10);
const noticesData = [
  {
    projectName: "开发流程",
    noticesDes: "@管理员 此功能预计什么时候可以完成？",
    dataTime: "2020-02-03 14:09:34"
  },
  {
    projectName: "测试流程",
    noticesDes: "@管理员 此功能现在的进度如何？",
    dataTime: "2020-02-03 08:00:59"
  },
  {
    projectName: "采购流程",
    noticesDes: "@管理员 多抽些时间完成相关基础功能吧",
    dataTime: "2020-02-04 16:29:34"
  },
  {
    projectName: "普通流程",
    noticesDes: "@管理员 不要让我催你了，重要的事情不要让我重复。",
    dataTime: "2020-02-04 14:09:34"
  }
];
export default {
  data() {
    const data = [];
    return {
      visible: false,
      childrenDrawer: false,
      visibleDrawer: false,
      newsVisible: false,
      value: "",
      data,
      noticesData
    };
  },
  created() {
    for (let index = 0; index < mockArrLength; index++) {
      this.data.push(
        Mock.mock({
          title: Random.ctitle(),
          name: Random.cname(),
          avatar: this.getDynamicImg(),
          description: Random.cparagraph(1),
          createTime: Random.datetime()
        })
      );
    }
  },
  computed: {
    username() {
      return this.$store.getters.getterUserName;
    },
    userimage() {
      return this.$store.getters.getterUserImage;
    },
    role() {
      return this.$store.getters.getterUserRole;
    }
  },
  methods: {
    // mock动态获取用户头像
    getDynamicImg() {
      const newImg = [];
      const newImgNum = Random.integer(2, 10);
      for (let j = 0; j < newImgNum; j++) {
        newImg.push({
          img: Random.image("32x32", Random.color(), "User@increment")
        });
      }
      return newImg;
    },
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
    showChildrenDrawer() {
      this.childrenDrawer = true;
    },
    onChildrenDrawerClose() {
      this.childrenDrawer = false;
    },
    handleMenuClick() {
      this.visible = false;
      var self = this;
      this.$confirm({
        title: "退出管理平台",
        content: "您确定要退出吗?",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        maskClosable: true,
        onOk() {
          return new Promise(() => {
            // removeToken(); // 移除cookie
            self.$store.dispatch("logout");
            router.push("/user/login");
            this.destroyAll();
          }).catch(() => console.log("confirm errors!"));
        },
        onCancel() {}
      });
    },
    handleModifyClick() {
      this.visible = false;
      if (this.$route.path == "/modifyInfo") return;
      this.$router.push({ path: "/modifyInfo" });
    },
    handleAccountClick() {
      this.visible = false;
      if (this.$route.path == "/accountInfo") return;
      this.$router.push({ path: "/accountInfo" });
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

.mentions-box {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 54px;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  left: 0;
  background: #ffffff;
  border-radius: 0 0 4px 4px;
  display: flex;
  flex: 1 1 0%;
  .mentions {
    border-radius: 0;
    height: 34px;
  }
}
/deep/.ant-mentions > textarea {
  padding: 5px 10px;
}
.mentions-btn {
  border-radius: 0;
  padding: 0 6px;
  font-size: 18px;
  height: 34px;
}

.tabs-news {
  width: 300px;
  max-width: 300px;
  /deep/.ant-list-items {
    max-height: 400px;
    overflow: auto;
  }
  /deep/.ant-list-footer {
    padding: 0;
    border-top: 1px solid #e8e8e8;
  }
  .footer-btn {
    color: #333333;
  }
  /deep/.ant-list-item {
    cursor: context-menu;
    padding: 8px 0;
    &:last-child {
      border-bottom: 0 !important;
    }
    .ant-list-item-meta {
      align-items: center;
      &:hover {
        background-color: #e6f7ff;
        cursor: pointer;
      }
    }
    .ant-list-item-meta-avatar {
      margin-left: 16px;
    }
    .ant-list-item-meta-content {
      flex: auto;
      white-space: normal;
      padding-right: 12px;
      .ant-list-item-meta-description {
        font-size: 12px;
      }
    }
  }
  /deep/.ant-tabs-nav-wrap {
    text-align: center;
  }
  .item-meta {
    font-size: 14px;
    color: #333333;
    font-weight: 500;
  }
  .description {
    font-size: 12px;
    color: #999;
    line-height: 20px;
  }
}

.menu-tabs > .ant-dropdown-menu-item:hover {
  background-color: transparent;
}
.menu-tabs {
  padding: 0;
  .ant-dropdown-menu-item {
    padding: 0;
  }
}

/deep/.ant-drawer-content {
  .ant-drawer-header {
    height: 54px;
  }
  .ant-drawer-body {
    padding: 8px;
    height: calc(100vh - 54px);
    overflow: auto;
  }
  .ant-list-item-meta {
    align-items: normal;
    flex-flow: column-reverse;
    .ant-list-item-meta-avatar {
      margin-top: 8px;
      display: flex;
      align-items: center;
      .avt-box {
        margin-left: -16px;
        &:first-child {
          margin-left: 0;
        }
        .ant-avatar-image:hover {
          box-shadow: 0 0 3px #333;
        }
      }
      .avt-tips {
        font-size: 12px;
        color: #999;
      }
    }
  }
}
.drawer-chart {
  /deep/.ant-list-item:hover {
    background-color: #e6f7ff;
    cursor: pointer;
  }
}

.sub {
  color: #999;
  font-weight: normal;
  font-size: 12px;
}
/deep/.ant-tabs-bar {
  margin: 0;
}
</style>
