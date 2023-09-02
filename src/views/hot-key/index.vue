<script setup lang="ts">
import { ref } from 'vue';
import { ElTable, ElTableColumn } from 'element-plus';

import useHotKey from '../../hooks/useHotKey';

const message = ref<string>();

const hotKeyFactory = (keys: (string | string[])[]): string => {
  function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function processItem(item: string | string[]) {
    if (typeof item === 'string') {
      return capitalize(item);
    } else if (Array.isArray(item)) {
      return item.map((subItem) => capitalize(subItem)).join('/');
    }
  }

  if (Array.isArray(keys)) {
    return keys.map((item) => processItem(item)).join('+');
  }

  return capitalize(keys);
};

const copy = useHotKey(
  'c',
  () => {
    message.value = '复制功能';
  },
  {
    ctrlKey: true,
    directions: '复制',
  }
);

const paste = useHotKey(
  'v',
  () => {
    message.value = '粘贴功能';
  },
  {
    ctrlKey: true,
    directions: '粘贴',
  }
);

const undo = useHotKey(
  'z',
  () => {
    message.value = '撤销功能';
  },
  {
    ctrlKey: true,
    directions: '撤销',
  }
);

const redo = useHotKey(
  'z',
  () => {
    message.value = '重做功能';
  },
  {
    ctrlKey: true,
    shiftKey: true,
    exact: true,
    directions: '重做',
  }
);

const subscribe = useHotKey(
  'y',
  () => {
    message.value = 'Y消息';
    return () => {
      message.value = '';
    };
  },
  {
    directions: '按下设置消息，抬起清楚消息',
  }
);

const hotkeyList = [
  {
    hotkey: hotKeyFactory(copy.hotKey),
    label: copy.directions,
  },
  {
    hotkey: hotKeyFactory(paste.hotKey),
    label: paste.directions,
  },
  {
    hotkey: hotKeyFactory(undo.hotKey),
    label: undo.directions,
  },
  {
    hotkey: hotKeyFactory(redo.hotKey),
    label: redo.directions,
  },
  {
    hotkey: hotKeyFactory(subscribe.hotKey),
    label: subscribe.directions,
  },
];
</script>

<template>
  <div class="container">
    <ElTable stripe :border="true" :data="hotkeyList">
      <ElTableColumn prop="label" label="说明"></ElTableColumn>
      <ElTableColumn prop="hotkey" label="快捷键"></ElTableColumn>
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
