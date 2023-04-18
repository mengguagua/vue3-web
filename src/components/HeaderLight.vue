<!-- 头部 -->
<template lang="pug">
section.head
  div.nav
    div.logo
      span.title VUE2管理后台模板
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
  height: 66px;
  overflow: hidden;
  margin-bottom: 4px;
  .nav {
    height: 70px;
    background: #fff;
    .logo {
      padding: 24px 0 0 10px;
      .title {
        color: #262f3e;
        opacity: 0.8;
        font-weight: 500;
      }
    }
  }
}
</style>
