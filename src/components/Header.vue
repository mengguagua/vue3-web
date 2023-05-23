<!-- 头部 -->
<template lang="pug">
section.head
  div.nav
    div.logo
      img(src="/public/images/logo.svg")
      span.title vue3+vite+antdv管理后台系统
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      user: {}
    };
  },
  mounted: function() {
    // this.Api.queryUserInfo().then(resp => {
    //   this.user = resp || {};
    // });
  },
  computed: {
  },
  methods: {
  }
};
</script>

<style lang="less" scoped>
.head {
  position: relative;
  z-index: 99;
  height: 70px;
  overflow: hidden;
  .nav {
    height: 70px;
    background: #1d2430;
    .logo {
      display: flex;
      align-items: center;
      margin-left: 20px;
      height: 70px;
      .title {
        margin-left: 10px;
        color: #fff;
        font-size: 20px;
      }
    }
  }
}
</style>
