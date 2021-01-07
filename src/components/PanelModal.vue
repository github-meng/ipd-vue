<template>
  <div>
    <a-modal
      :title="ModalData.pTitle"
      :width="'75%'"
      :bodyStyle="{ height: '480px', overflow: 'auto' }"
      :dialog-style="{ top: '48px' }"
      :visible="visible"
      :maskClosable="false"
      :confirm-loading="confirmLoading"
      cancelText="取消"
      okText="提交"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-card
        title="任务信息"
        class="ipd-modalCard"
        :loading="cardLoading"
        :bordered="false"
        :headStyle="headStyle"
      >
        <a-row type="flex">
          <a-col
            class="msg-col"
            v-for="(item, index) in cardGridData"
            :key="index"
            :span="item.mix === 1 ? 24 : 6"
          >
            <p class="msg-p1">{{ item.key }}：</p>
            <p class="msg-p2">{{ item.value }}</p>
          </a-col>
        </a-row>
      </a-card>

      <a-card
        title="输入文档"
        class="ipd-modalCard"
        :loading="cardLoading"
        :bordered="false"
        :headStyle="headStyle"
      >
        <ul class="ipd-docUl">
          <li class="ipd-docLi">
            <a-row type="flex">
              <a-col flex="150px" align="center">需求规划书</a-col>
              <a-col flex="auto">
                <a-icon type="file-excel" />
                需求规划书-模板.doc
              </a-col>
              <a-col flex="100px" class="hidden-col">
                <a-tooltip>
                  <template slot="title">
                    <span>下载</span>
                  </template>
                  <a-button type="link" size="small">
                    <a-icon type="arrow-down" />
                  </a-button>
                </a-tooltip>
                <a-divider type="vertical" />
                <a-tooltip>
                  <template slot="title">
                    <span>预览</span>
                  </template>
                  <a-button type="link" size="small">
                    <a-icon type="search" />
                  </a-button>
                </a-tooltip>
              </a-col>
            </a-row>
          </li>
          <li class="ipd-docLi">
            <a-row type="flex">
              <a-col flex="150px" align="center">需求规划书</a-col>
              <a-col flex="auto">
                <a-icon type="file-excel" />
                需求规划书-模板.doc
              </a-col>
              <a-col flex="100px" class="hidden-col">
                <a-tooltip>
                  <template slot="title">
                    <span>下载</span>
                  </template>
                  <a-button type="link" size="small">
                    <a-icon type="arrow-down" />
                  </a-button>
                </a-tooltip>
                <a-divider type="vertical" />
                <a-tooltip>
                  <template slot="title">
                    <span>预览</span>
                  </template>
                  <a-button type="link" size="small">
                    <a-icon type="search" />
                  </a-button>
                </a-tooltip>
              </a-col>
            </a-row>
          </li>
        </ul>
      </a-card>
    </a-modal>
  </div>
</template>
<script>
import { getPanelDetailLists } from "@/api/apis";
export default {
  name: "panelModal",
  props: ["dataToChild"],
  data() {
    return {
      ModalData: new Object(),
      visible: false,
      confirmLoading: false,
      cardLoading: true,
      headStyle: { minHeight: "40px", padding: "0 8px" },
      cardGridData: []
    };
  },
  watch: {
    dataToChild(newVal) {
      this.cardLoading = true;
      this.ModalData = newVal;
      getPanelDetailLists()
        .then(result => {
          if (result.code === "200") {
            this.cardGridData = result.data.taskMsg;
            this.cardLoading = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk() {
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel() {
      this.visible = false;
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.ant-modal-header {
  border-bottom: 0;
}
/deep/.ant-modal-body {
  padding-top: 12px;
}
/deep/.anticon-close {
  border: 1px solid #777777;
  border-radius: 10px;
}
.ipd-modalCard {
  box-shadow: 0 0 4px #dddddd;
  border-radius: 2px;
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 0;
  }
  p {
    margin: 0;
  }
  .msg-col {
    display: flex;
    padding: 5px 0;
  }
  .msg-p1 {
    flex: 0 0 95px;
    text-align: right;
    font-size: 13px;
  }
  .msg-p2 {
    padding: 0 8px 0 4px;
    color: #999999;
    font-size: 13px;
    flex: 1 1 auto;
    overflow: hidden;
  }
  /deep/.ant-card-head-title {
    padding: 0;
    line-height: 40px;
  }
  /deep/.ant-card-body {
    padding: 8px;
  }
}
.ipd-docUl {
  list-style: none;
  margin: 0;
  padding: 0;
  .ipd-docLi {
    list-style: none;
    border-radius: 20px;
    padding: 2px;
    line-height: 26px;
    font-size: 13px;
    &:nth-child(2n + 1) {
      background-color: #f5f5f5;
    }
    // .hidden-col {
    //   visibility: hidden;
    // }
    // &:hover .hidden-col {
    //   visibility: visible;
    // }
  }
}
</style>
