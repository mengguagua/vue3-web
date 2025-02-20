<template>
  <a-config-provider :locale="locale">
    <router-view></router-view>
  </a-config-provider>
</template>

<script>
// 解决日期选择器英文问题
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import locale from "ant-design-vue/es/locale/zh_CN";
dayjs.locale('zh-cn');
export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      locale: locale,
      dayjs: dayjs,
    };
  },
  methods: {
  },
  mounted() {

  },

}
</script>

<style>
<!-- 全局默认样式 -->
.ant-table-thead > tr > th, .ant-table-tbody > tr > td, .ant-table tfoot > tr > th, .ant-table tfoot > tr > td {
  padding: 12px 16px !important;
}
.ant-table-tbody > tr > td {
  padding: 6px 16px !important;
}
.ant-form-item-label > label {
  font-size: 13px !important;
}
.ant-btn-sm {
  margin-bottom: 10px!important;
  padding: 12px 14px!important;
  border-radius: 3px !important;
  margin-left: 2px !important;
  line-height: 0 !important;
}
.ant-table-tbody > tr > td .ant-btn-sm {
  padding: 12px 4px!important;
  margin-bottom: 0px !important;
}
.ant-form-item-control-input-content {
  min-width: 200px !important;
}
.ant-modal-confirm-body > .anticon {
  margin-top: 4px !important;
}
.ant-modal-confirm-body > .anticon + .ant-modal-confirm-title + .ant-modal-confirm-content {
  margin-left: 29px !important;
}
* {
  font-size: 13px;
}
</style>
