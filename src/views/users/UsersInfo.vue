<template>
  <div>
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1">
        <span slot="tab">
          <a-icon type="user-add" />
          用户管理
        </span>
        <div class="p-16">
          <a-table
            class="ipd-user-table"
            size="middle"
            :columns="columns"
            :data-source="data"
            :pagination="{ pageSize: 10 }"
          >
            <a-tag color="blue" slot="action" slot-scope="">
              <a-icon type="edit" />&nbsp;
              <a href="javascript:;">修改</a>
            </a-tag>
            <a-tag color="red" slot="action" slot-scope="">
              <a-icon type="delete" />&nbsp;
              <a href="javascript:;">删除</a>
            </a-tag>
          </a-table>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2">
        <span slot="tab">
          <a-icon type="usergroup-add" />
          分组管理
        </span>
        <div class="p-16">
          分组管理
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
const columns = [
  {
    title: "用户名",
    dataIndex: "name",
    key: "name",
    width: 150
  },
  {
    title: "电话",
    dataIndex: "phone",
    key: "phone",
    width: 150
  },
  {
    title: "角色权限",
    dataIndex: "authority",
    key: "authority"
  },
  {
    title: "操作",
    dataIndex: "action",
    key: "action",
    width: 200,
    scopedSlots: { customRender: "action" }
  }
];

const data = [
  {
    key: 1,
    name: "admin",
    phone: "18977153852",
    authority: "admin"
  },
  {
    key: 2,
    name: "user",
    phone: "18977153852",
    authority: "ordinary"
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
  // .ant-tabs-left-content {
  //   padding: 16px;
  //   border-left: 0;
  // }
  .ant-tabs-bar {
    margin: 0;
  }
}
.ipd-user-table {
  /deep/.ant-table-thead > tr > th {
    background: #ffffff;
  }
}
</style>
