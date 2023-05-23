<template>
<div style="border-bottom: 1px solid #efefef; padding-bottom: 0px;margin-bottom: 10px">
  <a-form :label-col="labelCol">
    <div class="search-line">
      <slot name="firstLine"></slot>
    </div>
    <div v-show="hasSecondLine && showSecondLine" class="search-line">
      <slot name="secondLine"></slot>
    </div>
  </a-form>
  <div class="btn-line">
    <a-button @click="submit" size="small" type="primary" style="margin-left: 10px">{{searchText}}</a-button>
    <a-button v-if="showResetBtn" @click="reset" size="small">{{resetText}}</a-button>
    <Icon v-if="hasSecondLine && showSecondLine == false" @click="showSecondLine = true" style="margin: 0 0 10px 2px" icon="material-symbols:double-arrow" :color="arrowColor" width="24" :rotate="1" />
    <Icon v-if="hasSecondLine && showSecondLine == true" @click="showSecondLine = false" style="margin: 0 0 10px 2px" icon="material-symbols:double-arrow" :color="arrowColor" width="24" :rotate="3" />
  </div>
</div>

</template>

<script>
import { Icon } from '@iconify/vue';
export default {
  name: "SearchLine",
  components: {
    Icon,
  },
  props: {
    resetText: {
      type: String,
      default: '重置',
    },
    searchText: {
      type: String,
      default: '查询',
    },
    // 文字宽度
    labelCol: {
      type: Object,
      default: {
        style: { width: '100px' }
      },
    },
    // 多行默认是展开还是隐藏
    showSecondLine: {
      type: Boolean,
      default: true,
    },
    // 是否显示多行
    hasSecondLine: {
      type: Boolean,
      default: false,
    },
    showResetBtn: {
      type: Boolean,
      default: true,
    },
    // 显示和隐藏的箭头颜色
    arrowColor: {
      type: String,
      default: '#1785ff',
    },
  },
  data() {
    return {
      username: '',
    };
  },
  methods: {
    submit () {
      this.$emit('submit');
    },
    reset () {
      this.$emit('reset');
    },
  },
}
</script>

<style scoped>
.search-line {
  display: flex;
  height: 42px;
}
.btn-line {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -4px;
}
.ant-btn-sm {
  padding: 0 14px;
}
</style>
