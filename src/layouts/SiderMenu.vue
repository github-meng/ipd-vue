<template>
  <div>
    <a-menu
      :default-selected-keys="['1']"
      mode="inline"
      theme="dark"
      :inlineCollapsed="collapsed"
    >
      <a-menu-item key="1" title="第一部分">
        <a-icon type="pie-chart" />
        <p>看板</p>
      </a-menu-item>
      <a-menu-item key="2" title="第二部分">
        <a-icon type="desktop" />
        <p>工作台</p>
      </a-menu-item>
      <a-menu-item key="3" title="第三部分">
        <a-icon type="inbox" />
        <p>任务</p>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false
    };
  }
};
</script>

<style lang="less" scoped>
.ant-menu-item {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 60px;
  .anticon {
    font-size: 20px;
    line-height: 20px;
  }
  p {
    line-height: 20px;
    margin: 0;
    font-size: 12px;
  }
}
</style>
