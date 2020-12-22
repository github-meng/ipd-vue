<template>
  <div>
    <h1>分析页面</h1>
    <a-button @click="handle">测试接口</a-button>
  </div>
</template>

<script>
import { getTestData } from "@/api/apis";
export default {
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
<style scoped lang="less"></style>
