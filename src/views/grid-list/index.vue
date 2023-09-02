<script setup lang="ts">
import GridList, { RequestFunc } from '../../components/GridList.vue';

const data: RequestFunc<number> = ({ page, limit }) => {
  return new Promise((resolve) => {
    console.log('开始加载啦', page, limit);

    setTimeout(() => {
      resolve({
        data: Array.from({ length: limit }, (_, index) => index + (page - 1) * limit),
        total: 300,
      });
    }, 1000);
  });
};
</script>

<template>
  <GridList :request="data" :column-gap="20" :row-gap="20" :limit="10000" :item-min-width="200" class="grid-list">
    <template #empty>
      <p>暂无数据</p>
    </template>
    <template #default="{ item }">
      <div class="item">{{ item }}</div>
    </template>
    <template #loading>
      <p>加载中...</p>
    </template>
    <template #noMore>
      <p>没有更多了</p>
    </template>
  </GridList>
</template>

<style scoped lang="scss">
.grid-list {
  width: 100%;
  height: 100%;
}

.item {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(42, 129, 100);
  color: aliceblue;
  font-size: 48px;
  font-weight: 400;
}
</style>
