<!-- 头部 -->
<template lang="pug">
section.head
  div.nav
    div.logo
      span.title VUE3管理后台模板
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      user: {}
    };
  },
  mounted() {
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
    background: #5480f6;
    //background: linear-gradient(to right,#5480f6, #5490f6);
    .logo {
      padding: 24px 0 0 10px;
      .title {
        color: #fff;
        //opacity: 0.8;
        font-weight: 500;
      }
    }
  }
}
</style>
