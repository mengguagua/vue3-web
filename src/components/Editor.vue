<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
    />
    <Editor
        style="height: 300px; overflow-y: hidden;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
        @onChange="handleChange"
    />
  </div>
</template>
<script>
// 文档地址https://www.wangeditor.com/v5/for-frame.html#%E4%BD%BF%E7%94%A8-1
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted,toRefs } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { DomEditor } from '@wangeditor/editor';


export default {
  components: { Editor, Toolbar },
  props: {
    valueData: {
      type: String,
      default: '',
    },
  },
  setup(props, {emit}) {
    // 将 `props` 转为一个其中全是 ref 的对象，然后解构
    let { valueData } = toRefs(props)
    // 内容 HTML
    let valueHtml = valueData
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    onMounted(() => {
    })
    const toolbarConfig = {}
    toolbarConfig.excludeKeys = [
      'insertVideo',
      'fullScreen',
      'group-image',
    ]
    const editorConfig = { placeholder: '请输入内容...' }
    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })
    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }
    const handleChange = (editor) => {
      // 打印配置项key
      // const toolbar = DomEditor.getToolbar(editor);
      // const curToolbarConfig = toolbar.getConfig();
      // console.log(curToolbarConfig.toolbarKeys); // 当前菜单排序和分组
      emit('handleChange', editor.getHtml());
    };
    return {
      editorRef,
      valueHtml,
      mode: 'simple', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      handleChange,
    };
  }
}
</script>
