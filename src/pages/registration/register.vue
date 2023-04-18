<template lang="pug">
div
  SearchGroup(:needReset="true")
    el-form-item(label="Activity name")
      el-input(v-model="name")
  Icon(icon="svg-spinners:3-dots-rotate")
</template>

<script>
import {
  aa, bb
} from '/src/service/interface.js';
import SearchGroup from "../../components/SearchGroup.vue";
import { Icon } from '@iconify/vue';
export default {
  components: {
    SearchGroup,
    Icon,
  },
  data() {
    return {
      name: '',
    };
  },
  methods: {

  },
  mounted() {
    // 使用mixin方法
    // this.tipMessage();
    // this.confirmDialog();
    aa();
  }
};
</script>

<style lang="less" scoped>

</style>
