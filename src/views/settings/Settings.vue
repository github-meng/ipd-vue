<template>
  <div>
    <a-tabs default-active-key="1" tabPosition="left" @change="callback">
      <a-tab-pane key="1" tab="流程管理">
        <a-table :columns="columns" :data-source="data">
          <span slot="customTitle">Name</span>
          <span slot="tags" slot-scope="tags">
            <a-tag
              v-for="tag in tags"
              :key="tag"
              :color="
                tag === 'loser'
                  ? 'volcano'
                  : tag.length > 5
                  ? 'geekblue'
                  : 'green'
              "
            >
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
          <span slot="action" slot-scope="text, record">
            <a>{{ record.name }}</a>
            <a-divider type="vertical" />
            <a>Delete</a>
          </span>
        </a-table>
      </a-tab-pane>
      <a-tab-pane key="2" tab="模板管理">
        模板管理
      </a-tab-pane>
      <a-tab-pane key="3" tab="实例管理">
        实例管理
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
const columns = [
  {
    dataIndex: "name",
    key: "name",
    slots: { title: "customTitle" }
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    scopedSlots: { customRender: "tags" }
  },
  {
    title: "Action",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  }
];

export default {
  data() {
    return {
      data,
      columns
    };
  },
  methods: {
    callback(key) {
      console.log(key);
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.ant-tabs {
  background-color: #ffffff;
  height: calc(100vh - 80px);
  overflow: auto;
  border-radius: 2px;
  .ant-tabs-left-content {
    padding: 16px;
    border-left: 0;
  }
}
</style>
