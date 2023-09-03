<script setup lang="ts">
import { ref } from 'vue';
import { ElTable, ElTableColumn } from 'element-plus';

import useHotKey from '../../hooks/useHotKey';

const hotkeyRef = ref<HTMLElement | null>(null);
const isVisible = ref<boolean>(true);
const message = ref<string>();

const copy = useHotKey(
  () => {
    message.value = '复制功能';
  },
  {
    key: 'c',
    ctrlKey: true,
    directions: '复制',
    target: hotkeyRef,
  }
);

const cut = useHotKey(
  () => {
    message.value = '剪切功能';
  },
  {
    key: 'x',
    ctrlKey: true,
    directions: '剪切',
    target: hotkeyRef,
  }
);

const paste = useHotKey(
  () => {
    message.value = '粘贴功能';
  },
  {
    key: 'v',
    ctrlKey: true,
    directions: '粘贴',
    target: hotkeyRef,
  }
);

const undo = useHotKey(
  () => {
    message.value = '撤销功能';
  },
  {
    key: 'z',
    ctrlKey: true,
    directions: '撤销',
  }
);

const redo = useHotKey(
  () => {
    message.value = '重做功能';
  },
  {
    key: 'z',
    ctrlKey: true,
    shiftKey: true,
    exact: true,
    directions: '重做',
  }
);

const subscribe = useHotKey(
  () => {
    message.value = 'Y消息';
    return () => {
      message.value = '';
    };
  },
  {
    key: 'y',
    directions: '按下设置消息，抬起清楚消息',
  }
);

const hotkeyList: Array<{
  hotkey?: string;
  label?: string;
  target?: string;
  action?: () => void;
}> = [
  {
    hotkey: copy.hotKey?.join('+'),
    label: copy.directions,
    target: 'Input',
    action: copy,
  },
  {
    hotkey: cut.hotKey?.join('+'),
    label: cut.directions,
    target: 'Input',
    action: cut,
  },
  {
    hotkey: paste.hotKey?.join('+'),
    label: paste.directions,
    target: 'Input',
    action: paste,
  },
  {
    hotkey: undo.hotKey?.join('+'),
    label: undo.directions,
    target: 'Window',
    action: undo,
  },
  {
    hotkey: redo.hotKey?.join('+'),
    label: redo.directions,
    target: 'Window',
    action: redo,
  },
  {
    hotkey: subscribe.hotKey?.join('+'),
    label: subscribe.directions,
    target: 'Window',
    action: subscribe,
  },
];
</script>

<template>
  <div class="container">
    <button @click="isVisible = !isVisible">切换</button>
    <div v-if="isVisible" class="hotkey">
      <h1>快捷键绑定区域</h1>
      <input ref="hotkeyRef" />
    </div>
    <ElTable stripe :border="true" :data="hotkeyList">
      <ElTableColumn prop="target" label="绑定区域"></ElTableColumn>
      <ElTableColumn prop="label" label="说明"></ElTableColumn>
      <ElTableColumn prop="hotkey" label="快捷键"></ElTableColumn>
      <ElTableColumn prop="option" label="操作" v-slot="{ row }">
        <button @click="row.action">立即执行</button>
      </ElTableColumn>
    </ElTable>
    <h2>快捷键消息</h2>
    <h1>{{ message }}</h1>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: 20px;
}
.hotkey {
  width: 100%;
  background-color: bisque;
  color: rgb(82, 73, 73);
}
</style>
