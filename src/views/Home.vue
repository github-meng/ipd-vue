<template>
  <div class="home">
    <HelloWorld msg="欢迎学习vue.js，祝您愉快" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>
