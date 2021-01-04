<template>
  <a-card :bordered="false" id="ipd-repository">
    <div class="ipd-repository-header">
      <h5>知识库管理</h5>
      <a-radio-group
        class="ipd-radio-group"
        :value="selectTab"
        @change="handleSizeChange"
      >
        <a-radio-button value="doc" class="ipd-radio">
          文件
        </a-radio-button>
        <a-radio-button value="text" class="ipd-radio">
          文本
        </a-radio-button>
        <a-radio-button value="link" class="ipd-radio">
          链接
        </a-radio-button>
        <a-radio-button value="list" class="ipd-radio">
          checklist
        </a-radio-button>
      </a-radio-group>
    </div>
    <div class="ipd-repository-body">
      <transition name="ipd-prj-fade" v-if="selectTab == 'doc'">
        <div>
          <a-button type="danger" icon="plus">
            新建文档
          </a-button>
          <a-input-search
            placeholder="搜索文档名称"
            style="width: 200px;margin-bottom: 10px;margin-left: 16px;"
          />
          <a-table
            size="small"
            :columns="columnsDoc"
            :data-source="data"
            :scroll="{ x: 1400, y: 'calc(100vh - 280px)' }"
          >
            <template slot="action">
              <a-tag color="green">
                <a-icon type="search" />
                <span>查看</span>
              </a-tag>
              <a-tag color="blue">
                <a-icon type="edit" />
                <span>修改</span>
              </a-tag>
              <a-tag color="red">
                <a-icon type="delete" />
                <span>删除</span>
              </a-tag>
            </template>
          </a-table>
        </div>
      </transition>
      <transition name="ipd-prj-fade" v-else-if="selectTab == 'text'">
        <div>
          <a-button type="danger" icon="plus">
            新建文本
          </a-button>
          <a-input-search
            placeholder="搜索文档名称"
            style="width: 200px;margin-bottom: 10px;margin-left: 16px;"
          />
          <a-table
            size="small"
            :columns="columnsText"
            :data-source="data"
            :scroll="{ x: 1400, y: 'calc(100vh - 280px)' }"
          >
            <template slot="action">
              <a-tag color="green">
                <a-icon type="search" />
                <span>查看</span>
              </a-tag>
              <a-tag color="blue">
                <a-icon type="edit" />
                <span>修改</span>
              </a-tag>
              <a-tag color="red">
                <a-icon type="delete" />
                <span>删除</span>
              </a-tag>
            </template>
          </a-table>
        </div>
      </transition>
      <transition name="ipd-prj-fade" v-else-if="selectTab == 'link'">
        <div>
          <a-button type="danger" icon="plus">
            新建链接
          </a-button>
          <a-input-search
            placeholder="搜索文档名称"
            style="width: 200px;margin-bottom: 10px;margin-left: 16px;"
          />
          <a-table
            size="small"
            :columns="columnsLink"
            :data-source="data"
            :scroll="{ x: 1400, y: 'calc(100vh - 280px)' }"
          >
            <template slot="action">
              <a-tag color="green">
                <a-icon type="search" />
                <span>查看</span>
              </a-tag>
              <a-tag color="blue">
                <a-icon type="edit" />
                <span>修改</span>
              </a-tag>
              <a-tag color="red">
                <a-icon type="delete" />
                <span>删除</span>
              </a-tag>
            </template>
          </a-table>
        </div>
      </transition>
      <transition name="ipd-prj-fade" v-else-if="selectTab == 'list'">
        <div>
          <a-button type="danger" icon="plus">
            新建checklist
          </a-button>
          <a-input-search
            placeholder="搜索文档名称"
            style="width: 200px;margin-bottom: 10px;margin-left: 16px;"
          />
          <a-table
            size="small"
            :columns="columnsList"
            :data-source="data"
            :scroll="{ x: 1400, y: 'calc(100vh - 280px)' }"
          >
            <template slot="action">
              <a-tag color="green">
                <a-icon type="search" />
                <span>查看</span>
              </a-tag>
              <a-tag color="blue">
                <a-icon type="edit" />
                <span>修改</span>
              </a-tag>
              <a-tag color="red">
                <a-icon type="delete" />
                <span>删除</span>
              </a-tag>
            </template>
          </a-table>
        </div>
      </transition>
    </div>
  </a-card>
</template>
<script>
import Mock from "mockjs";
const Random = Mock.Random;
const columnsDoc = [
  { title: "序号", dataIndex: "key", key: "key", width: 80 },
  { title: "名称", dataIndex: "name", key: "name", width: 300 },
  { title: "标签", dataIndex: "tag", key: "tag", width: 200 },
  { title: "应用类型", dataIndex: "type", key: "type", width: 100 },
  { title: "文件名", dataIndex: "docName", key: "docName", width: 200 },
  { title: "文件大小", dataIndex: "docSize", key: "docSize", width: 100 },
  { title: "创建时间", dataIndex: "createTime", key: "createTime", width: 200 },
  {
    title: "操作",
    key: "action",
    width: 220,
    scopedSlots: { customRender: "action" }
  }
];
const columnsText = [
  { title: "序号", dataIndex: "key", key: "key", width: 80 },
  { title: "名称", dataIndex: "name", key: "name", width: 300 },
  { title: "标签", dataIndex: "tag", key: "tag", width: 200 },
  { title: "应用类型", dataIndex: "type", key: "type", width: 100 },
  { title: "创建时间", dataIndex: "createTime", key: "createTime", width: 200 },
  {
    title: "操作",
    key: "action",
    width: 220,
    scopedSlots: { customRender: "action" }
  }
];
const columnsLink = [
  { title: "序号", dataIndex: "key", key: "key", width: 80 },
  { title: "名称", dataIndex: "name", key: "name", width: 300 },
  { title: "标签", dataIndex: "tag", key: "tag", width: 200 },
  { title: "应用类型", dataIndex: "type", key: "type", width: 100 },
  { title: "链接", dataIndex: "link", key: "link", width: 150 },
  { title: "创建时间", dataIndex: "createTime", key: "createTime", width: 200 },
  {
    title: "操作",
    key: "action",
    width: 220,
    scopedSlots: { customRender: "action" }
  }
];
const columnsList = [
  { title: "序号", dataIndex: "key", key: "key", width: 80 },
  { title: "名称", dataIndex: "name", key: "name", width: 300 },
  { title: "标签", dataIndex: "tag", key: "tag", width: 200 },
  { title: "应用类型", dataIndex: "type", key: "type", width: 100 },
  { title: "创建时间", dataIndex: "createTime", key: "createTime", width: 200 },
  {
    title: "操作",
    key: "action",
    width: 220,
    scopedSlots: { customRender: "action" }
  }
];

const data = [];
const dataNum = Random.integer(11, 100);
for (let i = 0; i < dataNum; i++) {
  data.push({
    key: `${i + 1}`,
    name: Random.ctitle(5, 45),
    tag: Random.ctitle(3, 10),
    type: Random.ctitle(4),
    docName: Random.ctitle(5, 15),
    docSize: Random.natural(10, 500),
    createTime: Random.datetime(),
    link: Random.url()
  });
}

export default {
  data() {
    return {
      selectTab: "doc",
      data,
      columnsDoc,
      columnsText,
      columnsLink,
      columnsList
    };
  },
  methods: {
    handleSizeChange(e) {
      this.selectTab = e.target.value;
    }
  }
};
</script>

<style lang="less" scoped>
#ipd-repository {
  height: calc(100vh - 80px);
  /deep/.ant-card-body {
    padding: 12px;
  }
}
.ipd-repository-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
  h5 {
    margin: 0;
    font-size: 15px;
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
.ant-tag:last-child {
  margin: 0;
}
/deep/.ant-table-content .ant-table-header {
  background-color: #001529;
  margin-bottom: -17px !important;
}
/deep/.ant-table-fixed tr th {
  color: #ffffff;
}
</style>
