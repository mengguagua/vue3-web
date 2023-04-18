<template>
  <div class="search-panel">
    <el-form
      :inline="true"
      class="search-form-inline"
      :label-width="lableWidth ? lableWidth + 'px' : ''"
    >
      <slot></slot>
    </el-form>
    <div class="search-btns">
      <el-button
        @click="submit"
        v-show="needSubmit"
        size="default"
        type="primary"
        icon="Search"
      >
        查询
      </el-button>
      <el-button
        @click="reset"
        class="search-form-btn"
        v-show="needReset"
        size="default"
        icon="RefreshLeft"
      >
        重置
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "search-group",
  data() {
    return {
      formItemMarginRight: 16,
    };
  },
  props: {
    needSubmit: {
      type: Boolean,
      default: true,
    },
    needReset: {
      type: Boolean,
      default: false,
    },
    isGrid: {
      type: Boolean,
      default: true,
    },
    narmalWidth: {
      default: 230,
    },
    lableWidth: null,
  },
  methods: {
    submit() {
      this.$emit("submit");
    },
    reset() {
      this.$emit("reset");
    },
  },
  mounted() {
    if (this.isGrid) {
      // todo vue3 this.$slots.condition不存在
      // console.log('this.$slots',this.$slots)
      // console.log('this.$slots.default',this.$slots.default())
      // let parentNode = this.$slots.condition[0].elm;
      // for (let i = 0; i < parentNode.children.length; i++) {
      //   let el = parentNode.children[i];
      //   el.style.marginRight = this.formItemMarginRight + "px";
      //   let contentDom = el.querySelector(".el-form-item__content");
      //   if (el.attributes.isLong) {
      //     contentDom.style.width =
      //       Number(this.narmalWidth) * 2 +
      //       Number(this.lableWidth) +
      //       Number(this.formItemMarginRight) +
      //       "px";
      //   } else {
      //     contentDom.style.width = this.narmalWidth + "px";
      //   }
      // }
    }
  },
  watch: {},
};
</script>
<style lang="less" scoped>
.search-panel {
  background-color: #fff;
  padding: 8px;
  border-bottom: 1px solid #dce4e6;
}
.search-form-inline {
  line-height: 34px;
  overflow: hidden;
  /deep/.el-form-item {
    float: left;
    margin-bottom: 8px;
    line-height: 34px;
    height: 34px;
    .el-form-item__label,
    .el-form-item__content {
      height: 34px;
      line-height: 34px;
    }
  }
  /deep/.el-date-editor {
    width: 100%;
    .el-range-separator {
      padding: 0;
    }
  }
  /deep/.el-select {
    width: 100%;
  }
}
.search-btns {
  margin-top: 4px;
  text-align: center;
  .search-form-btn {
    margin-left: 12px;
  }
}
</style>
