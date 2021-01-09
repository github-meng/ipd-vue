<template>
  <div class="nothing">
    <icon-font type="icon-404" class="icon-font" />
    <p>Sorry, the page you visited does not exist.</p>
    <p>
      <a-button @click="backHome">Back Home</a-button>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    backHome() {
      this.$router.push("/home");
    }
  }
};
</script>

<style lang="less" scoped>
.nothing {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -200px;
  margin-left: -150px;
}
.icon-font {
  font-size: 300px;
  width: 100%;
  margin: 0 auto;
}
p {
  text-align: center;
}
button {
  text-align: center;
}
</style>
