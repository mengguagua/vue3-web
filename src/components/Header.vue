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
  height: 70px;
  overflow: hidden;
  .nav {
    height: 70px;
    background: #262f3e;
    .logo {
      padding: 24px 0 0 10px;
      .title {
        color: #fff;
      }
    }
  }
}
</style>
