<template>
  <div id="ipd-wb-box">
    <a-card :bordered="false" :loading="loading">
      <a-row class="ipd-wb-row">
        <a-col :span="8">
          <p class="wb-col-p">我的待办</p>
          <h2>{{ myTagNum }}个任务</h2>
        </a-col>
        <a-col :span="8" class="col-center">
          <p class="wb-col-p">本周任务平均处理时间</p>
          <h2>32分钟</h2>
        </a-col>
        <a-col :span="8">
          <p class="wb-col-p">本周完成任务数</p>
          <h2>{{ myFinishNum }}个任务</h2>
        </a-col>
      </a-row>
    </a-card>
    <a-card
      :bordered="false"
      :loading="loading"
      title="我的任务"
      class="wb-card"
    >
      <a-list class="demo-loadmore-list" item-layout="horizontal">
        <a-list-item v-for="(item, index) in workLists.wbLists" :key="index">
          <a slot="actions" href="#"> <a-icon type="arrow-right" />前往 </a>
          <a-list-item-meta :description="item.proName">
            <span slot="title">{{ item.subtask }}</span>
            <a-avatar slot="avatar" :src="require('@/assets/tag.png')" />
          </a-list-item-meta>
          <div style="width: 30%">
            <p class="wb-list-p">结束时间</p>
            <p class="wb-list-p">{{ item.endTime }}</p>
          </div>
        </a-list-item>
      </a-list>
    </a-card>
  </div>
</template>

<script>
import { getWorkbenchLists } from "@/api/apis";
export default {
  created() {
    getWorkbenchLists(this.selectTab)
      .then(res => {
        if (res.code === "200") {
          this.workLists = res.data;
          this.myTagNum = res.data.wbLists.length;
          this.myFinishNum = res.data.finishTotal;
          this.loading = false;
        }
      })
      .catch(err => console.log(err));
  },
  data() {
    return {
      workLists: {},
      myTagNum: 0,
      myFinishNum: 0,
      loading: true
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#ipd-wb-box {
  display: flex;
  flex-flow: column;
  height: 100%;
}
p {
  margin: 0;
}
.wb-card {
  margin-top: 16px;
  flex: 1;
  /deep/.ant-card-head-title {
    font-weight: normal;
  }
  /deep/.ant-card-body {
    overflow: auto;
    height: calc(100vh - 252px);
  }
  .wb-list-p {
    color: rgba(0, 0, 0, 0.45);
  }
  .demo-loadmore-list {
    /deep/.ant-list-item-meta-title {
      margin: 0;
    }
    /deep/.ant-list-item {
      border-bottom: 1px solid #f5f5f5;
    }
    /deep/.ant-list-item-meta {
      align-items: center;
    }
  }
}
.ipd-wb-row {
  /deep/.ant-col {
    text-align: center;
  }
  .col-center {
    border-left: 1px solid #f0f0f0;
    border-right: 1px solid #f0f0f0;
  }
  .wb-col-p {
    line-height: 20px;
  }
  h2 {
    font-weight: 400;
    line-height: 32px;
    margin: 0;
  }
}
</style>
