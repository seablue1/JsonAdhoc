

<!-- <template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
  <json-editor-vue class="editor" v-model="data" style="width: 1000px;height: 1000px;" @selectionChange="ttt" ref="editor" currentMode="tree" />
</template> -->

<!-- <script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import JsonEditorVue from 'json-editor-vue3'
import { ref } from 'vue';
import vueJsonEditor from 'vue-json-editor'


const editor = ref(null)

const data = ref({
  hello: 'vue123'
});

const ttt = (aaa,bbb,ccc)=>{
  console.log(bbb)
}
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style> -->

<!-- ========================== -->
<template>
  <vue-monaco-editor
    v-model:value="code"
    theme="vs-dark"
    :options="MONACO_EDITOR_OPTIONS"
    @mount="handleMount"
    language="json"
  />
</template>

<script lang="ts" setup>
import { VueMonacoEditor } from '@guolao/vue-monaco-editor'
import { ref, shallowRef } from 'vue'

const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
}

const ttt = '{"name":"vue-project","version":"0.0.0","private":true,"type":"module","scripts":{"dev":"vite","build":"vite build","preview":"vite preview"},"dependencies":{"@guolao/vue-monaco-editor":"^1.5.4","@originjs/vite-plugin-commonjs":"^1.0.3","json-editor-vue3":"^1.1.1","vue":"^3.5.13","vue-json-editor":"^1.4.3"},"devDependencies":{"@vitejs/plugin-vue":"^5.2.1","vite":"^6.0.1","vite-plugin-vue-devtools":"^7.6.5"}}'
const code = ref(JSON.stringify(JSON.parse(ttt), null, 2))
const editor = shallowRef()
const handleMount = editorInstance => (editor.value = editorInstance)

// your action
function formatCode() {
  editor.value?.getAction('editor.action.formatDocument').run()
}
</script>

