<template>
  <div id="ipd-process">
    <a-card
      :bordered="false"
      :loading="loading"
      class="pro-card"
      v-for="pro in processLists"
      :key="pro.id"
    >
      <a-collapse activeKey="1" :bordered="false">
        <template #expandIcon="props">
          <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
        </template>
        <a-collapse-panel
          key="1"
          :header="pro.processName"
          :style="customStyle"
        >
          <a-space size="middle" style="flex-wrap: wrap">
            <div
              class="pro-card-space"
              v-for="subPro in pro.children"
              :key="subPro.id"
            >
              <icon-font :type="subPro.proIcon" style="font-size: 64px" />
              <p class="space-p">{{ subPro.proChName }}</p>
            </div>
            <div class="pro-card-space">
              <div class="add-pro-header">
                <a-icon
                  type="plus"
                  style="color: #ffffff;font-size: 32px;margin: 16px auto;"
                />
              </div>
              <p class="space-p">添加流程</p>
            </div>
          </a-space>
        </a-collapse-panel>
      </a-collapse>
    </a-card>
  </div>
</template>

<script>
import { getProcessLists } from "@/api/apis";
export default {
  name: "ipdProcess",
  created() {
    getProcessLists(this.selectTab)
      .then(res => {
        if (res.code === "200") {
          this.processLists = res.data;
          this.loading = false;
        }
      })
      .catch(err => console.log(err));
  },
  data() {
    return {
      processLists: [],
      loading: true,
      customStyle: "background: #ffffff;border: 0;overflow: hidden"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.pro-card {
  /deep/.ant-card-body {
    padding: 0;
  }
}
.pro-card:not(:first-child) {
  margin-top: 16px;
}
.pro-card-space {
  width: 100px;
  text-align: center;
  margin: 8px 0;
  p.space-p {
    margin: 0;
    padding: 8px 0;
  }
  .add-pro-header {
    width: 64px;
    height: 64px;
    background-color: #eeeeee;
    border: 2px dashed #dddddd;
    margin: 0 auto;
    border-radius: 8px;
  }
}
.add-pro-header:hover {
  cursor: pointer;
}
</style>
