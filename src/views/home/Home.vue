<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">
    <a-row :gutter="12" class="ipd-prj-row">
      <a-col :md="6" :lg="6" class="ipd-prj-col">
        <div class="ipd-prj-left">
          <a-input-search
            style="padding: 8px;"
            placeholder="Search"
            @change="onChange"
          />

          <a-tree
            class="ipd-tree"
            :expanded-keys="expandedKeys"
            :auto-expand-parent="autoExpandParent"
            :tree-data="gData"
            @expand="onExpand"
          >
            <template slot="title" slot-scope="{ title }">
              <span v-if="title.indexOf(searchValue) > -1">
                {{ title.substr(0, title.indexOf(searchValue)) }}
                <span style="color: #f50">{{ searchValue }}</span>
                {{
                  title.substr(title.indexOf(searchValue) + searchValue.length)
                }}
              </span>
              <span v-else>{{ title }}</span>
            </template>
          </a-tree>
        </div>
      </a-col>
      <a-col :md="18" :lg="18" class="ipd-prj-col">
        <div class="ipd-prj-right">
          <div class="ipd-prj-r-header">
            <h5>项目信息</h5>
            <a-radio-group
              class="ipd-radio-group"
              :value="selectTab"
              @change="handleSizeChange"
            >
              <a-radio-button value="panel" class="ipd-radio">
                看板
              </a-radio-button>
              <a-radio-button value="info" class="ipd-radio">
                信息
              </a-radio-button>
              <a-radio-button value="doc" class="ipd-radio">
                文档
              </a-radio-button>
              <a-radio-button value="pro" class="ipd-radio">
                流程
              </a-radio-button>
            </a-radio-group>
          </div>
          <div class="ipd-prj-r-body">
            <transition name="ipd-prj-fade" v-if="selectTab == 'panel'">
              <div class="example" v-if="loading">
                <a-spin tip="Loading..." />
              </div>
              <a-space
                style="padding: 8px 16px;height: 100%;"
                size="middle"
                align="start"
                v-else
              >
                <a-card
                  v-for="item in cardLists"
                  :key="item.id"
                  :title="item.title"
                  :bordered="false"
                  size="small"
                  class="prj-r-card"
                >
                  <a slot="extra" href="#" style="color: rgba(0, 0, 0, 0.85)">
                    <a-icon type="menu-fold" />
                  </a>
                  <a-card
                    class="item-card"
                    v-for="chItem in item.subLists"
                    :key="chItem.id"
                    :bordered="false"
                    @click="toPanelFn(chItem)"
                  >
                    <h3>{{ chItem.name }}</h3>
                    <p>
                      <span>处理人：</span>
                      {{ chItem.assignee ? chItem.assignee : "暂无" }}
                    </p>
                    <p><span>处理时间：</span>{{ chItem.startTime }}</p>
                  </a-card>
                </a-card>
              </a-space>
            </transition>
            <transition name="ipd-prj-fade" v-else-if="selectTab == 'info'">
              <div class="example" v-if="loading">
                <a-spin tip="Loading..." />
              </div>
              <div class="ipd-info">
                <div class="info-left">
                  <a-list>
                    <transition
                      v-for="(item, index) in infoLeftLists"
                      :key="index"
                    >
                      <a-list-item class="info-list-item">
                        <p class="info-p">{{ item.key }}</p>
                        <p class="info-p">{{ item.value }}</p>
                      </a-list-item>
                      <!-- <a-list-item class="info-list-item" v-else>
                        <p class="info-p">{{ item.key }}</p>
                        <p class="info-p">{{ item.value }}</p>
                      </a-list-item> -->
                    </transition>
                  </a-list>
                  <a-button
                    type="danger"
                    shape="round"
                    size="small"
                    icon="delete"
                    :loading="endProLoading"
                  >
                    终止任务
                  </a-button>
                </div>
                <div style="flex: 0 0 32px;"></div>
                <div class="info-right">
                  <a-timeline>
                    <a-timeline-item
                      color="red"
                      v-for="line in infoRightLists"
                      :key="line.id"
                    >
                      <div class="info-tline-header">
                        <a-avatar
                          :size="32"
                          :src="require('@/assets/user-logo.png')"
                          style="flex: 0 0 32px;"
                        />
                        <p>{{ line.assignee }}</p>
                        <span class="info-htime">{{ line.creatTime }}</span>
                      </div>
                      <div class="info-tline-body">
                        <h6>【 {{ line.proName }} ｜提交】：</h6>
                        <p>{{ line.content }}</p>
                      </div>
                    </a-timeline-item>
                  </a-timeline>
                </div>
              </div>
            </transition>
            <transition name="ipd-prj-fade" v-else-if="selectTab == 'doc'">
              <div class="example" v-if="loading">
                <a-spin tip="Loading..." />
              </div>
              <div class="ipd-doc">
                <div class="ipd-doc-list" v-for="doc in docLists" :key="doc.id">
                  <div class="ipd-itemize">{{ doc.className }}</div>
                  <a-list style="flex: 0 0 80%;">
                    <a-list-item
                      class="doc-list-item"
                      v-for="subDoc in doc.classFile"
                      :key="subDoc.id"
                    >
                      <a-row class="ipd-list-row">
                        <a-col :span="10">{{ subDoc.inFileName }}</a-col>
                        <a-col :span="10">
                          <div class="flex align-center">
                            <a-icon
                              :type="subDoc.fileIcon"
                              :style="{
                                fontSize: '20px',
                                color: subDoc.fileColor
                              }"
                            />
                            <div class="pl-4" style="width: 100%">
                              <p class="doc-p">{{ subDoc.fileName }}</p>
                              <p class="doc-p">
                                文件大小: {{ subDoc.fileSize }}k
                              </p>
                            </div>
                          </div>
                        </a-col>
                        <a-col :span="4" align="right">
                          <a-tooltip>
                            <template slot="title">
                              <span>下载</span>
                            </template>
                            <a-button type="link" size="small">
                              <icon-font
                                type="icon-xiazai"
                                style="color: #2db7f5;"
                              />
                            </a-button>
                          </a-tooltip>
                          <a-divider type="vertical" />
                          <a-tooltip>
                            <template slot="title">
                              <span>预览</span>
                            </template>
                            <a-button type="link" size="small">
                              <icon-font
                                type="icon-search"
                                style="color: orange;"
                              />
                            </a-button>
                          </a-tooltip>
                        </a-col>
                      </a-row>
                    </a-list-item>
                  </a-list>
                </div>
              </div>
            </transition>
            <transition name="ipd-prj-fade" v-else-if="selectTab == 'pro'">
              <div class="ipd-pro">
                <img :src="require('@/assets/ipd.png')" alt="ipd流程图" />
              </div>
            </transition>
          </div>
        </div>
      </a-col>
    </a-row>
    <panel-modal ref="panelModalRef" :data-to-child="dataToChild" />
  </div>
</template>

<script>
import { getCardLists } from "@/api/apis";
import PanelModal from "@/components/PanelModal.vue";
const x = 3;
const y = 2;
const z = 1;
const gData = [];

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || "0";
  const tns = _tns || gData;

  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key, scopedSlots: { title: "title" } });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);

const dataList = [];
const generateList = data => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.key;
    dataList.push({ key, title: key });
    if (node.children) {
      generateList(node.children);
    }
  }
};
generateList(gData);

const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};
export default {
  components: { PanelModal },
  created() {
    getCardLists()
      .then(res => {
        if (res.code == "200") {
          this.cardLists = res.data.homePanel.list;
          this.infoLeftLists = res.data.homeInfo.list;
          this.infoRightLists = res.data.homeInfo.chart;
          this.loading = false;
        }
      })
      .catch(err => console.log(err));
  },
  data() {
    return {
      selectTab: "panel",
      loading: true,
      cardLists: [],
      infoLeftLists: [],
      infoRightLists: [],
      docLists: [],
      endProLoading: false,
      listData: [],
      expandedKeys: [],
      searchValue: "",
      autoExpandParent: true,
      gData,
      dataToChild: new Object()
    };
  },
  methods: {
    toPanelFn(item) {
      this.dataToChild = item;
      this.$refs.panelModalRef.showModal();
    },
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onChange(e) {
      const value = e.target.value;
      const expandedKeys = dataList
        .map(item => {
          if (item.title.indexOf(value) > -1) {
            return getParentKey(item.key, gData);
          }
          return null;
        })
        .filter((item, i, self) => item && self.indexOf(item) === i);
      Object.assign(this, {
        expandedKeys,
        searchValue: value,
        autoExpandParent: true
      });
    },
    handleSizeChange(e) {
      this.selectTab = e.target.value;
      // if (this.selectTab == "panel") {
      //   if (this.cardLists && this.cardLists.length > 0) {
      //     this.loading = false;
      //     return;
      //   }
      // } else if (this.selectTab == "info") {
      //   if (this.infoLeftLists && this.infoLeftLists.length > 0) {
      //     this.loading = false;
      //     return;
      //   }
      // } else if (this.selectTab == "doc") {
      //   if (this.docLists && this.docLists.length > 0) {
      //     this.loading = false;
      //     return;
      //   }
      // }
      // this.getInfoMsg(this.selectTab);
    }
    // getInfoMsg(selectTab) {
    // this.loading = true;
    // getCardLists()
    //   .then(res => {
    //     if (res.code === "200") {
    //       switch (selectTab) {
    //         case "panel":
    //           this.cardLists = res.data.homePanel.list;
    //           break;
    //         case "info":
    //           this.infoLeftLists = res.data.homeInfo.list;
    //           this.infoRightLists = res.data.homeInfo.chart;
    //           break;
    //         case "doc":
    //           this.docLists = res.data;
    //           break;
    //         case "pro":
    //           break;
    //         default:
    //           this.cardLists = res.data.list;
    //       }

    //       this.loading = false;
    //     }
    //   })
    //   .catch(err => console.log(err));
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.ipd-prj-fade-enter-active {
  transition: all 0.3s ease;
}
.ipd-prj-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.ipd-prj-fade-enter, .ipd-prj-fade-leave-to
/* .ipd-prj-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.page-header-wrapper-grid-content-main {
  width: 100%;
  height: 100%;
  min-height: 100%;
  transition: 0.3s;
  .ipd-prj-row {
    height: 100%;
  }
  .ipd-prj-col {
    height: calc(100vh - 80px);
  }
}
.prj-r-card {
  width: 250px;
  height: 100%;
  display: flex;
  flex-flow: column;
  // box-shadow: 0 0 5px #cccccc;
  background: #f5f5f5;
  /deep/.ant-card-head-title {
    font-weight: normal;
  }
  .item-card {
    box-shadow: 0 0 5px #dddddd;
    border-radius: 2px;
    margin-bottom: 4px;
    &:last-child {
      margin-bottom: 0;
    }
    &:hover {
      z-index: 9;
      cursor: pointer;
      box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16),
        0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
    }
    /deep/.ant-card-body {
      padding: 12px;
    }
    h3 {
      margin: 0 0 8px 0;
      color: #333333;
      font-size: 14px;
      font-weight: normal;
    }
    p {
      margin: 0;
      color: #999999;
      font-size: 12px;
      span {
        font-weight: 500;
      }
    }
  }
}
.ipd-prj-right,
.ipd-prj-left {
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 2px;
}
.ipd-tree {
  overflow: auto;
}
.ipd-prj-left {
  display: flex;
  flex-flow: column;
}
.ipd-prj-r-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 16px;
  h5 {
    margin: 0;
    font-size: 14px;
    font-weight: bold;
  }
  .ipd-radio-group {
    background: #f5f5f5;
    border-radius: 20px;
    padding: 5px;
  }
  .ipd-radio {
    background: transparent;
    border-radius: 20px;
    border: none;
    height: 30px;
  }
  /deep/.ant-radio-button-wrapper-checked:hover {
    box-shadow: 0 0 5px #cccccc;
  }
  /deep/.ant-radio-button-wrapper:hover {
    color: #999999;
  }
  /deep/.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
    border: none;
    background: #ffffff;
    box-shadow: 0 0 5px #cccccc;
    color: rgba(0, 0, 0, 0.65);
  }
  /deep/.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):first-child {
    box-shadow: 0 0 5px #cccccc !important;
    color: rgba(0, 0, 0, 0.65);
  }
  /deep/.ant-radio-button-wrapper:not(:first-child)::before {
    display: none !important;
  }
  /deep/.ant-radio-button-wrapper:focus-within {
    outline: none;
  }
}
.ipd-prj-r-body {
  display: flex;
  align-items: flex-start;
  overflow: auto;
  height: calc(-50px + 100%);
  .ant-space-item {
    height: 100%;
  }
  /deep/.ant-card-body {
    flex: 1;
    overflow: auto;
  }
}
/deep/.ant-card-body::-webkit-scrollbar {
  width: 6px;
}
/deep/::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}
/deep/::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background: #f0f0f0;
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);
}
/deep/::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(24, 144, 255, 0.3);
}
/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 10px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #f0f0f0;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
}
::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(24, 144, 255, 0.3);
}
// loading...
.example {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
// common css
.flex {
  display: flex;
}
.align-center {
  align-items: center;
}
.ipd-span {
  color: #999999;
}
p {
  margin: 0;
}
.pl-4 {
  padding-left: 4px;
}
.info-list-item {
  background: #f5f5f5;
  border-radius: 30px;
  padding: 8px 0;
  border: none;
  &:nth-child(2n) {
    background: #ffffff;
  }
  p.info-p {
    margin: 0;
    &:first-child {
      width: 35%;
      text-align: right;
      padding-right: 14px;
      font-size: 13px;
      font-weight: 600;
    }
    &:last-child {
      width: 65%;
      text-align: left;
      line-height: 16px;
      font-size: 13px;
    }
  }
}
// 项目信息tab
.ipd-info {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 16px;
  justify-content: space-between;
  .info-left,
  .info-right {
    flex: 0 0 calc(-16px + 50%);
  }
  .info-last-item {
    flex-flow: column;
    align-items: normal;
    p {
      &:first-child {
        width: 35%;
        text-align: right;
        padding-right: 14px;
        padding-bottom: 6px;
        font-size: 13px;
        font-weight: 600;
      }
      &:last-child {
        margin: 0;
        padding: 14px;
        border: 1px dashed #dddddd;
        border-radius: 4px;
        font-size: 13px;
        color: #999999;
      }
    }
  }
  .info-right {
    background-color: #f5f5f5;
    border-radius: 2px;
    padding: 12px;
    overflow: auto;
    .info-tline-header {
      display: flex;
      align-items: center;
      p {
        margin: 0 8px;
        font-size: 14px;
        line-height: 32px;
        font-weight: normal;
        color: #000000a6;
      }
      span.info-htime {
        font-size: 12px;
        color: #999999;
      }
    }
    .info-tline-body {
      padding-left: 40px;
      h6 {
        margin: 0;
        font-size: 12px;
        color: #999999;
      }
      p {
        margin: 0;
        font-size: 13px;
      }
    }
  }
}
// 文档样式
.ipd-doc {
  width: 100%;
  padding: 12px;
  .ipd-doc-list {
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #f5f5f5;
  }
  .ipd-itemize {
    flex: 0 0 20%;
    text-align: center;
  }
  .ipd-list-row {
    width: 100%;
    padding: 0 12px;
    font-size: 12px;
    display: flex;
    align-items: center;
  }
  .doc-list-item {
    background: #f5f5f5;
    border-radius: 30px;
    padding: 8px 0;
    border: none;
    &:nth-child(2n) {
      background: #ffffff;
    }
    p.doc-p {
      line-height: 14px;
      &:last-child {
        color: #999999;
        font-size: 11px;
      }
    }
  }
}
// 流程突css
.ipd-pro {
  img {
    width: 100%;
    display: inline;
    margin: 50px auto;
  }
}
</style>
