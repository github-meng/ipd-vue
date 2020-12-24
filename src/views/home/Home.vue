<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">
    <a-row :gutter="12" style="height: 100%">
      <a-col :md="24" :lg="6">
        <a-card title="Card left" :bordered="false" :loading="loading">
          <h1>分析页面</h1>
          <a-button @click="handle">测试接口</a-button>
        </a-card>
      </a-col>
      <a-col :md="24" :lg="18">
        <a-card
          style="width:100%"
          title="Card title"
          :bordered="false"
          :loading="loading"
        >
          <div slot="extra">
            <a-button key="3">
              Operation
            </a-button>
            <a-button key="2">
              Operation
            </a-button>
            <a-button key="1" type="primary">
              Primary
            </a-button>
          </div>
          myj
        </a-card>
        <br />
        <!-- <a-card title="Card right" >
          <a-page-header title="Title" sub-title="This is a subtitle">
            <template slot="extra">
              <a-button key="3">
                Operation
              </a-button>
              <a-button key="2">
                Operation
              </a-button>
              <a-button key="1" type="primary">
                Primary
              </a-button>
            </template>
          </a-page-header>
        </a-card> -->
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getTestData } from "@/api/apis";
export default {
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  },
  data() {
    return {
      loading: true
    };
  },
  methods: {
    handle() {
      getTestData()
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          alert(err);
        });
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
}
</style>
