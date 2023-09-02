<script setup lang="ts">
import { ref } from 'vue';
import { ElTable, ElTableColumn } from 'element-plus';

import useHotKey from '../../hooks/useHotKey';

const message = ref<string>();

const copy = useHotKey(
  () => {
    message.value = '复制功能';
  },
  {
    key: 'c',
    ctrlKey: true,
    directions: '复制',
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
  action?: () => void;
}> = [
  {
    hotkey: copy.hotKey?.join('+'),
    label: copy.directions,
    action: copy,
  },
  {
    hotkey: paste.hotKey?.join('+'),
    label: paste.directions,
    action: paste,
  },
  {
    hotkey: undo.hotKey?.join('+'),
    label: undo.directions,
    action: undo,
  },
  {
    hotkey: redo.hotKey?.join('+'),
    label: redo.directions,
    action: redo,
  },
  {
    hotkey: subscribe.hotKey?.join('+'),
    label: subscribe.directions,
    action: subscribe,
  },
];
</script>

<template>
  <div class="container">
    <ElTable stripe :border="true" :data="hotkeyList">
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
</style>
