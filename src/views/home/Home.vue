<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">
    <a-row :gutter="12" class="ipd-prj-row">
      <a-col :md="24" :lg="6" class="ipd-prj-col">
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
      <a-col :md="24" :lg="18" class="ipd-prj-col">
        <div class="ipd-prj-right">
          <div class="ipd-prj-r-header">
            <h5>title</h5>
            <a-radio-group
              class="ipd-radio-group"
              :value="size"
              @change="handleSizeChange"
            >
              <a-radio-button value="large" class="ipd-radio">
                Large
              </a-radio-button>
              <a-radio-button value="default" class="ipd-radio">
                Default
              </a-radio-button>
              <a-radio-button value="small" class="ipd-radio">
                Small
              </a-radio-button>
            </a-radio-group>
          </div>
          <div class="ipd-prj-r-body">
            <a-space>
              <a-card
                size="small"
                title="Small size card"
                style="width: 250px;margin: 10px;box-shadow: 0 0 5px #cccccc;"
                :bordered="false"
              >
                <a slot="extra" href="#">more</a>
                <p>card content</p>
                <p>card content</p>
                <p>card content</p>
              </a-card>
              <a-card
                size="small"
                title="Small size card"
                style="width: 250px;margin: 10px;box-shadow: 0 0 5px #cccccc;"
                :bordered="false"
              >
                <a slot="extra" href="#">more</a>
                <p>card content</p>
                <p>card content</p>
                <p>card content</p>
              </a-card>
              <a-card
                size="small"
                title="Small size card"
                style="width: 250px;margin: 10px;box-shadow: 0 0 5px #cccccc;"
                :bordered="false"
              >
                <a slot="extra" href="#">more</a>
                <p>card content</p>
                <p>card content</p>
                <p>card content</p>
              </a-card>
            </a-space>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
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
  data() {
    return {
      size: "large",
      expandedKeys: [],
      searchValue: "",
      autoExpandParent: true,
      gData
    };
  },
  methods: {
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
      this.size = e.target.value;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.page-header-wrapper-grid-content-main {
  width: 100%;
  height: 100%;
  min-height: 100%;
  transition: 0.3s;
  .ipd-prj-row {
    height: 100%;
  }
  .ipd-prj-col {
    height: 100%;
  }
}
.ipd-prj-right,
.ipd-prj-left {
  width: 100%;
  height: 100%;
  background: #ffffff;
  // padding: 10px;
  border-radius: 2px;
  // overflow: auto;
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
  padding: 8px;
}
</style>
