<template>
  <div>
    <a-modal
      :title="ModalData.pTitle"
      :width="'75%'"
      :bodyStyle="{ height: '480px', overflow: 'auto' }"
      :dialog-style="{ top: '60px', padding: 0 }"
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
          <li
            class="ipd-docLi"
            v-for="inItem in inDocListData"
            :key="inItem.id"
          >
            <a-row type="flex">
              <a-col flex="150px" align="center">
                {{ inItem.docClassify }}
              </a-col>
              <a-col flex="auto">
                <a-icon
                  :type="inItem.fileIcon"
                  :style="{
                    fontSize: '14px',
                    color: inItem.fileColor
                  }"
                />
                {{ inItem.docName }}
              </a-col>
              <a-col flex="100px" class="hidden-col">
                <a-tooltip>
                  <template slot="title">
                    <span>下载</span>
                  </template>
                  <a-button type="link" size="small">
                    <icon-font type="icon-xiazai" style="color: #2db7f5;" />
                  </a-button>
                </a-tooltip>
                <a-divider type="vertical" />
                <a-tooltip>
                  <template slot="title">
                    <span>预览</span>
                  </template>
                  <a-button type="link" size="small">
                    <icon-font type="icon-search" style="color: orange;" />
                  </a-button>
                </a-tooltip>
              </a-col>
            </a-row>
          </li>
        </ul>
      </a-card>

      <div class="ipd-madolWirte">
        <a-card
          title="输出文档"
          class="ipd-modalCard m-write"
          :loading="cardLoading"
          :bordered="false"
          :headStyle="headStyle"
        >
          <ul class="ipd-docUl">
            <li
              class="outDoc-li"
              v-for="inItem in outDocListData"
              :key="inItem.id"
            >
              <a-row>
                <a-col :span="8" class="col-left">
                  {{ inItem.docClassify }}
                </a-col>
                <a-col :span="16">
                  <!-- <a-upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    :multiple="true"
                    :file-list="fileList"
                    @change="handleUpLoad"
                  >
                    <a-button size="small" style="font-size: 12px;">
                      <a-icon type="upload" /> 点击上传
                    </a-button>
                  </a-upload> -->
                  <a-upload-dragger
                    name="file"
                    :multiple="true"
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    @change="handleChange"
                  >
                    <p class="ant-upload-drag-icon">
                      <a-icon type="upload" style="font-size: 14px;" />
                      点击或拖拽上传
                    </p>
                  </a-upload-dragger>
                </a-col>
              </a-row>
            </li>
          </ul>
        </a-card>

        <a-card
          title="批注信息"
          class="ipd-modalCard m-write"
          :loading="cardLoading"
          :bordered="false"
          :headStyle="headStyle"
        >
          <a-row class="mb-1">
            <a-col :span="4" class="col-left pt-5">
              批注
            </a-col>
            <a-col :span="20">
              <a-textarea
                placeholder="请输入批注信息..."
                :rows="3"
                class="m-textarea"
              />
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="4" class="col-left pt-5">
              抄送
            </a-col>
            <a-col :span="20">
              <a-select
                mode="multiple"
                :default-value="['a1', 'b2']"
                style="width: 100%"
                placeholder="请选择抄送人"
              >
                <a-select-option
                  v-for="i in 25"
                  :key="(i + 9).toString(36) + i"
                >
                  {{ (i + 9).toString(36) + i }}
                </a-select-option>
              </a-select>
            </a-col>
          </a-row>
        </a-card>
      </div>
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
      headStyle: { minHeight: "40px", padding: "0 8px", borderBottom: 0 },
      cardGridData: [],
      inDocListData: [],
      outDocListData: [],
      fileList: []
    };
  },
  watch: {
    dataToChild(newVal) {
      this.cardLoading = true;
      this.ModalData = newVal;
      getPanelDetailLists()
        .then(result => {
          if (result.code == "200") {
            this.cardGridData = result.data.taskMsg;
            this.inDocListData = result.data.inDocLists;
            this.outDocListData = result.data.outDocLists;
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
    },
    handleUpLoad(info) {
      let fileList = [...info.fileList];

      // 1. Limit the number of uploaded files
      //    Only to show two recent uploaded files, and old ones will be replaced by the new
      fileList = fileList.slice(-2);

      // 2. read from response and show file link
      fileList = fileList.map(file => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.url;
        }
        return file;
      });

      this.fileList = fileList;
    },
    handleChange(info) {
      const status = info.file.status;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        this.$message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
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
.ipd-modalCard {
  box-shadow: 0 0 5px #dddddd;
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
    font-size: 14px;
    font-weight: 600;
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
  .outDoc-li {
    list-style: none;
    padding: 10px 0;
    line-height: 26px;
    font-size: 13px;
    border-radius: 2px;
    border-bottom: 1px solid #f5f5f5;
    &:first-child {
      padding-top: 0;
    }
    &:last-child {
      border-bottom: 0;
    }
    /deep/.ant-upload-list-item {
      margin-top: 4px;
    }
    /deep/.ant-upload.ant-upload-drag .ant-upload {
      padding: 4px;
      p {
        margin: 0;
      }
    }
    /deep/.ant-upload-list-item-info {
      font-size: 12px;
      padding-top: 4px;
    }
    .ant-upload-drag-icon {
      font-size: 12px;
    }
  }
}
.ipd-madolWirte {
  display: flex;
  justify-content: space-between;
  .m-write {
    margin: 0;
    flex: 0 0 calc(50% - 8px);
    &:first-child {
      margin-right: 8px;
    }
    &:last-child {
      margin-left: 8px;
    }
  }
  .col-left {
    text-align: right;
    padding-right: 8px;
    font-size: 13px;
  }
  .m-textarea {
    // border: 0;
    background-color: #f5f5f5;
  }
}
</style>
