<template lang="pug">
div
  SearchLine(@submit="search" @reset="reset" :hasSecondLine="true")
    template(v-slot:firstLine)
      a-form-item(label="文章标题" name="title")
        a-input( v-model:value="searchData.title" allowClear)
      a-form-item(label="关键字" name="username")
        a-input( v-model:value="searchData.keyword" allowClear)
      a-form-item(label="发布时间段" name="username")
        a-range-picker(v-model:value="searchData.time")
      a-form-item(label="栏目分类" name="username")
        a-select(v-model:value="searchData.type" style="width: 200px" allowClear)
          a-select-option(value="0") 栏目1
          a-select-option(value="1") 栏目2
          a-select-option(value="2") 栏目3
    template(v-slot:secondLine)
      a-form-item(label="文章分类" name="username")
        a-select(v-model:value="searchData.type1" style="width: 200px" allowClear)
          a-select-option(value="0") 文章分类1
          a-select-option(value="1") 文章分类2
          a-select-option(value="2") 文章分类3
  a-button(@click="add" type="primary" size="small") 新增
  a-table(:columns="columns" :data-source="tableData")
    template(#bodyCell="{ column, record }")
      template(v-if="column.dataIndex === 'updateTime'")
        div {{ formatDate(new Date(record.updateTime)) }}
      template(v-else-if="column.dataIndex === 'releaseTime'")
        div {{ record.releaseTime ? formatDate(new Date(record.releaseTime)) : ''}}
      template(v-else-if="column.dataIndex === 'isTop'")
        div {{isTopDic[record.isTop]}}
      template(v-else-if="column.dataIndex === 'isHot'")
        div {{isHotDic[record.isHot]}}
      template(v-else-if="column.dataIndex === 'edit'")
        div
          a-button(type="primary" size="small" @click="edit(record)") 编辑
          a-button(v-if="record.status == 0" type="primary" size="small" @click="doPublish(record)") 发布
          a-button(type="primary" size="small" danger, @click="doDelete(record)") 删除
  a-modal(
    v-model:visible="visible"
    :title="visibleTitle"
    :footer="null"
    width="900px"
    :maskClosable="false"
    @ok="handleOk"
  )
    a-descriptions(style="margin-top: 20px" bordered :column="2" size="small" :labelStyle="labelStyle")
      a-descriptions-item(label="文章标题" :span="2")
        a-input( v-model:value="modalData.title" allowClear)
      a-descriptions-item(label="栏目分类")
        a-select(v-model:value="modalData.type" style="width: 100%" allowClear)
          a-select-option(value="0") 栏目1
          a-select-option(value="1") 栏目2
          a-select-option(value="2") 栏目3
      a-descriptions-item(label="文章分类")
        a-select(v-model:value="modalData.type1" style="width: 100%; min-width: 180px" allowClear)
          a-select-option(value="0") 文章分类1
          a-select-option(value="1") 文章分类2
          a-select-option(value="2") 文章分类3
      a-descriptions-item(label="设置关键词")
        a-input( v-model:value="modalData.keyword" allowClear)
      a-descriptions-item(label="是否置顶")
        a-select(v-model:value="modalData.isTop" style="width: 100%" allowClear)
          a-select-option(:value="true") 是
          a-select-option(:value="false") 否
      a-descriptions-item(label="是否热点")
        a-select(v-model:value="modalData.isHot" style="width: 100%" allowClear)
          a-select-option(:value="true") 是
          a-select-option(:value="false") 否
      a-descriptions-item(label="编辑时间")
        span {{modalData.updateTime ? formatDate(new Date(modalData.updateTime)) : ''}}
      a-descriptions-item(label="编辑人")
        span {{user.userName}}
      a-descriptions-item(label="发布状态")
        span {{modalData.status}}
      a-descriptions-item(label="上传图片")
        a-upload(:file-list="fileList" :before-upload="beforeUpload" @remove="handleRemove" :maxCount="1")
          a-button
            upload-outlined
            span 上传图片
        a {{modalData.photo}}
    div
      div(style="color: rgba(0, 0, 0, 0.85)") 文章内容：
      Editor(:valueData="htmlContent" @handleChange="handleChange")
    div.footer
      a-button(@click="save" type="primary" size="small") 保存
      a-button(@click="doPublish(modalData)" type="primary" size="small") 发布
      a-button(@click="closeModal" size="small") 取消
</template>

<script>
import SearchLine from "/src/components/SearchLine.vue";
import { selectPageList, partyLearnSave, partyLearnDelete, partyLearnRelease, uploadFile } from '/src/service/interface.js';
import { message } from 'ant-design-vue';
import { Modal } from 'ant-design-vue';
export default {
  name: "study",
  components: {SearchLine},
  data() {
    return {
      htmlContent: '',
      fileList: [],
      user: {},
      searchData: {
        time: [],
      },
      modalData: {
        isTop: false,
        isHot: false,
        content: '',
        photo: '',
      },
      isTopDic: {
        'true': '置顶',
        'false': '未置顶',
      },
      isHotDic: {
        'true': '是',
        'false': '否',
      },
      tableData: [],
      columns: [
        {
          title: '文章标题',
          dataIndex: 'title',
        }, {
          title: '设置关键词',
          dataIndex: 'keyword',
        }, {
          title: '栏目分类',
          dataIndex: 'typeName',
        }, {
          title: '文章分类',
          dataIndex: 'type1Name',
        },
        // {
        //   title: '图片上传',
        //   dataIndex: 'name5',
        // }, {
        //   title: '正文内容',
        //   dataIndex: 'name7',
        // },
        {
          title: '编辑时间',
          dataIndex: 'updateTime',
        }, {
          title: '编辑人',
          dataIndex: 'updateName',
        }, {
          title: '发布状态',
          dataIndex: 'statusName',
        }, {
          title: '发布时间',
          dataIndex: 'releaseTime',
        }, {
          title: '是否置顶',
          dataIndex: 'isTop',
        }, {
          title: '是否热点',
          dataIndex: 'isHot',
        }, {
          title: '操作',
          dataIndex: 'edit',
        },
      ],
      form: {},
      visible: false,
      visibleTitle: '',
      labelStyle: {
        width: '180px',
      },
    };
  },
  methods: {
    search() {
      let data = {};
      if (this.searchData && this.searchData.time.length) {
        data.startTime = this.formatDate(new Date(this.searchData.time[0]))
        data.endTime = this.formatDate(new Date(this.searchData.time[1]))
      }
      data.title = this.searchData.title;
      data.keyword = this.searchData.keyword;
      // selectPageList(data).then((resp) => {
        this.tableData = [{"id":8,"type":"0","type1":"0","title":"ewtw","keyword":"8989","photo":"https://minidt.chinabeston.com/party/2023/5/139a8e04-95d0-4fce-8776-9b57b992ca1a.jpg","status":"0","releaseMan":null,"releaseTime":null,"isTop":true,"isHot":true,"remark":null,"version":0,"deletedFlag":false,"createId":"qilei","createTime":1684822220000,"updateId":"qilei","updateTime":1684830489000,"updateName":"李四","content":"<p>123131</p>","typeName":"最新理论","type1Name":"图片新闻","statusName":"未发布"},{"id":9,"type":"0","type1":"0","title":"test11","keyword":"key11","photo":"https://minidt.chinabeston.com/party/2023/5/37bb3dae-3630-4525-8ea6-5047d6e05427.jpg","status":"0","releaseMan":null,"releaseTime":null,"isTop":true,"isHot":false,"remark":null,"version":0,"deletedFlag":false,"createId":"qilei","createTime":1684829704000,"updateId":"qilei","updateTime":1684830525000,"updateName":"李四","content":"<p>这是文章</p>","typeName":"最新理论","type1Name":"图片新闻","statusName":"未发布"},{"id":4,"type":"0","type1":"0","title":"我们的歌1","keyword":"test","photo":"https://minidt.chinabeston.com/hotspotOnline/2023/5/687ba69f-cb01-4246-a209-0c8d54e96b5e.jpg","status":"1","releaseMan":"qilei","releaseTime":1684822141000,"isTop":false,"isHot":false,"remark":null,"version":0,"deletedFlag":false,"createId":"qilei","createTime":1684820822000,"updateId":"qilei","updateTime":1684822141000,"updateName":"李四","content":"<p>1111</p>","typeName":"最新理论","type1Name":"图片新闻","statusName":"已发布"},{"id":3,"type":"2","type1":"0","title":"长征之路学习","keyword":"长征之路","photo":"https://minidt.chinabeston.com/hotspotOnline/2023/5/687ba69f-cb01-4246-a209-0c8d54e96b5e.jpg","status":"1","releaseMan":"qilei","releaseTime":1684821262000,"isTop":false,"isHot":false,"remark":null,"version":0,"deletedFlag":false,"createId":null,"createTime":1683794207000,"updateId":null,"updateTime":1683794207000,"updateName":"张三","content":"1933年9月～1934年夏，中央苏区红军第五次反“围剿”作战，由于中共中央领导人博古（秦邦宪）和共产国际派来的军事顾问李德（德国共产党党员），先是实行冒险主义的进攻战略，后又实行保守主义的防御战略，致使红军屡战失利，苏区日渐缩小。\n\n\n\n1934年4月，中央红军（1月由红一方面军改称）在江西省广昌与国民党军进行决战，损失严重，形势危殆。7月，中华苏维埃共和国中央革命军事委员会（简称中革军委）命令红军第7军团组成北上抗日先遣队，向闽浙皖赣边挺进，建立新的苏区；命令红军第6军团从湘赣苏区突围西征，到湘中发展游击战争。中革军委派出两个军团分别北上、西征，意在调动国民党“围剿”军，以减轻中央苏区的压力。但未能达到目的。","typeName":"党史学习","type1Name":"图片新闻","statusName":"已发布"},{"id":2,"type":"1","type1":"0","title":"习大大重要讲话","keyword":"习大大","photo":"https://minidt.chinabeston.com/hotspotOnline/2023/5/94a9c102-5704-43c2-82b1-ace448791c3f.jpg","status":"1","releaseMan":null,"releaseTime":1683880607000,"isTop":false,"isHot":false,"remark":null,"version":0,"deletedFlag":false,"createId":null,"createTime":1683794207000,"updateId":null,"updateTime":1683794207000,"updateName":"张三","content":"此前，党中央已下发了关于开展主题教育的《意见》，就抓好这次主题教育作出安排，提出明确要求。这里，我讲3个问题。\n\n　　一、深刻认识开展这次主题教育的重大意义\n\n　　以县处级以上领导干部为重点在全党深入开展学习贯彻新时代中国特色社会主义思想主题教育，是贯彻落实党的二十大精神的重大举措，对于统一全党思想、解决党内存在的突出问题、始终保持党同人民群众血肉联系、推动党和国家事业发展，具有重要意义。\n\n　　第一，这是统一全党思想意志行动、始终保持党的强大凝聚力、战斗力的必然要求。团结统一是党的生命，是党的力量所在。思想上的统一是党的团结统一最深厚最持久最可靠的保证。我们这么大一个党，领导着这么大一个国家，肩负着带领全国各族人民实现国家强盛、民族复兴这个艰巨任务，全党必须统一思想、统一意志、统一行动。怎么实现全党思想、意志、行动的统一？最根本的就是用党的基本理论武装全党。\n\n　　我们党始终高度重视理论武装，每逢重大历史关头，都要用党的创新理论统一全党思想，每次党内集中教育也都坚持把理论学习作为首要任务并贯穿始终，为全党团结统一奠定坚实思想基础。今天，我们党带领全国各族人民迈上了全面建设社会主义现代化国家、全面推进中华民族伟大复兴的新征程，要更好肩负起新时代新征程党的使命任务，迫切需要用新时代中国特色社会主义思想武装头脑、指导实践、推动工作。","typeName":"重要讲话","type1Name":"图片新闻","statusName":"已发布"},{"id":1,"type":"0","type1":"0","title":"党的最新理论","keyword":"理论","photo":"https://minidt.chinabeston.com/hotspotOnline/2023/5/687ba69f-cb01-4246-a209-0c8d54e96b5e.jpg","status":"1","releaseMan":null,"releaseTime":1683794207000,"isTop":false,"isHot":false,"remark":null,"version":0,"deletedFlag":false,"createId":null,"createTime":1683794207000,"updateId":null,"updateTime":1683794207000,"updateName":"张三","content":"新华社北京10月24日电 10月24日，国务院总理、党组书记李克强主持召开国务院党组会议，深入学习贯彻党的二十大精神。\n\n会议指出，党的二十大回顾总结了过去五年的工作和新时代十年的伟大变革，阐述了开辟马克思主义中国化时代化新境界、中国式现代化的中国特色和本质要求等重大问题，对全面建设社会主义现代化国家、全面推进中华民族伟大复兴进行了战略部署。党的二十大报告，是党团结带领全国各族人民夺取中国特色社会主义新胜利的政治宣言和行动纲领。党的二十届一中全会选举产生新一届中央领导机构，习近平总书记作了重要讲话。国务院党组和国务院部门要深入学习领会会议精神，认真贯彻落实。\n\n会议指出，要深刻认识十年来党和国家事业取得举世瞩目成就，是在以习近平同志为核心的党中央坚强领导下、在习近平新时代中国特色社会主义思想指引下全党全国各族人民团结奋斗取得的。要深刻领悟“两个确立”的决定性意义，坚决维护习近平同志党中央的核心、全党的核心地位，全面贯彻习近平新时代中国特色社会主义思想。要牢牢把握新时代新征程党的使命、党的中心任务，全面建设社会主义现代化国家、全面推进中华民族伟大复兴。\n\n会议指出，贯彻好党的二十大精神，要准确把握未来一个时期党和国家事业发展的目标任务和战略部署，落实统筹推进“五位一体”总体布局、协调推进“四个全面”战略布局。坚持发展是党执政兴国的第一要务，完整、准确、全面贯彻新发展理念，加快构建新发展格局，着力推动高质量发展。坚定不移推进改革开放，坚持和完善社会主义基本经济制度，坚持社会主义市场经济改革方向，毫不动摇巩固和发展公有制经济，毫不动摇鼓励、支持、引导非公有制经济发展。持续推进简政放权、放管结合、优化服务改革，优化营商环境，更大激发市场活力和社会创造力。推进高水平对外开放，扩大规则、规制、管理、标准等制度型开放。在发展中保障和改善民生。当前稳经济政策效应进一步显现，三季度经济持续恢复、明显好于二季度，要发挥中央和地方两个积极性，紧抓时间窗口推动经济进一步回稳向上。深入落实稳经济一揽子政策措施，着力稳就业稳物价，保障交通物流畅通和能源稳定供应。共同努力，保持经济运行在合理区间、实现合理增长，力争更好结果。\n\n会议指出，国务院党组和国务院部门要更加紧密地团结在以习近平同志为核心的党中央周围，增强“四个意识”、坚定“四个自信”、做到“两个维护”。更加自觉地学习党章、遵守党章、贯彻党章、维护党章。落实全面从严治党要求，清廉行政。牢记空谈误国、实干兴邦，恪尽职守，推动经济社会持续健康发展。\n\n韩正、孙春兰、胡春华、刘鹤、王勇、王毅、肖捷、赵克志出席。","typeName":"最新理论","type1Name":"图片新闻","statusName":"已发布"}]
      // });
    },
    reset() {
      this.searchData = {time: []};
    },
    handleOk() {

    },
    add() {
      this.visible = true;
      this.modalData = {
        isTop: false,
        isHot: false,
        content: '',
        photo: '',
      };
      this.fileList = [];
    },
    edit(row) {
      this.modalData = {...row}
      this.fileList = [];
      this.visible = true;
    },
    doPublish(row) {
      let _this = this;
      Modal.confirm({
        title: '提示',
        content: '确认发布吗?',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          partyLearnRelease({id:  row.id}).then((resp) => {
            message.success( '操作成功');
            _this.search();
          })
        },
      });
    },
    doDelete(row) {
      let _this = this;
      Modal.confirm({
        title: '提示',
        content: '确认删除吗?',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          partyLearnDelete({id: row.id}).then((resp) => {
            message.success( '操作成功');
            _this.search();
          })
        },
      });
    },
    handleChange(value) {
      console.log('change-value:', value);
      this.htmlContent = value;
    },
    save() {
      let data = {...this.modalData};
      partyLearnSave(data).then((resp) => {
        message.success( '操作成功');
        this.search();
        // this.modalData
        // this.closeModal();
      });
    },
    closeModal() {
      this.visible = false;
    },
    beforeUpload(file) {
      let limitSize = 10 * 1024 * 1024; // 图片最大大小M
      if (file.size > limitSize) {
        message.warning( '图片最大为10M');
        return false;
      }
      this.fileList = [file];
      let param = new FormData() // 创建form对象
      param.append('file', file) // 通过append向form对象添加数据
      param.append('businessDir', 'PARTY')
      uploadFile(param).then((resp) => {
        this.modalData.photo = resp;
        message.success( '上传成功');
      });
    },
    handleRemove() {

    },
  },
  mounted() {
    this.search();
    this.user = JSON.parse(localStorage.getItem('zjUser'));
  }
}
</script>

<style scoped>
.footer {
  margin-top: 20px;
  text-align: center;
}
</style>
