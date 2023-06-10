<script setup lang="ts">
import { ref } from 'vue'

import EditTable from './components/EditTable.vue'
import EditTableColumn from './components/EditTableColumn.vue'

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

const loadData = async () => tableData

const addEditTableRef = ref()
const formEditTableRef = ref()
const resultEditTableRef = ref()
</script>

<template>
  <main class="wrapper">
    <section>
      <h1>无编辑效果</h1>
      <EditTable class="edit-table" :data-source="tableData">
        <EditTableColumn prop="date" label="时间"> </EditTableColumn>
        <EditTableColumn prop="name" label="姓名"> </EditTableColumn>
        <EditTableColumn prop="address" label="地址"> </EditTableColumn>
      </EditTable>
    </section>
    <section>
      <h1>可编辑效果</h1>
      <EditTable class="edit-table" :data-source="tableData">
        <EditTableColumn prop="date" label="时间">
          <template #edit="{ row }">
            <input v-model="row.date" />
          </template>
        </EditTableColumn>
        <EditTableColumn prop="name" label="姓名">
          <template #edit="{ row }">
            <input v-model="row.name" />
          </template>
        </EditTableColumn>
        <EditTableColumn prop="address" label="地址">
          <template #edit="{ row }">
            <input v-model="row.address" />
          </template>
        </EditTableColumn>
        <EditTableColumn label="修改">
          <template #default="{ actions, $index }">
            <el-button @click="actions.startEditable($index)">修改</el-button>
          </template>
          <template #edit="{ actions, $index }">
            <el-button @click="actions.saveEditable($index)">保存</el-button>
            <el-button @click="actions.cancelEditable($index)">取消</el-button>
          </template>
        </EditTableColumn>
      </EditTable>
    </section>
    <section>
      <h1>删除效果</h1>
      <EditTable class="edit-table" :data-source="tableData">
        <EditTableColumn prop="date" label="时间">
          <template #edit="{ row }">
            <input v-model="row.date" />
          </template>
        </EditTableColumn>
        <EditTableColumn prop="name" label="姓名">
          <template #edit="{ row }">
            <input v-model="row.name" />
          </template>
        </EditTableColumn>
        <EditTableColumn prop="address" label="地址">
          <template #edit="{ row }">
            <input v-model="row.address" />
          </template>
        </EditTableColumn>
        <EditTableColumn label="修改">
          <template #default="{ actions, $index }">
            <el-button @click="actions.startEditable($index)">修改</el-button>
            <el-button @click="actions.deleteRow($index)">删除</el-button>
          </template>
          <template #edit="{ actions, $index }">
            <el-button @click="actions.saveEditable($index)">保存</el-button>
            <el-button @click="actions.cancelEditable($index)">取消</el-button>
            <el-button @click="actions.deleteRow($index)">删除</el-button>
          </template>
        </EditTableColumn>
      </EditTable>
    </section>
    <section>
      <h1>新增效果</h1>
      <EditTable ref="addEditTableRef" class="edit-table" :data-source="tableData">
        <EditTableColumn prop="date" label="时间">
          <template #edit="{ row }">
            <input v-model="row.date" />
          </template>
        </EditTableColumn>
        <EditTableColumn prop="name" label="姓名">
          <template #edit="{ row }">
            <input v-model="row.name" />
          </template>
        </EditTableColumn>
        <EditTableColumn prop="address" label="地址">
          <template #edit="{ row }">
            <input v-model="row.address" />
          </template>
        </EditTableColumn>
        <EditTableColumn label="修改">
          <template #default="{ actions, $index }">
            <el-button @click="actions.startEditable($index)">修改</el-button>
            <el-button @click="actions.deleteRow($index)">删除</el-button>
          </template>
          <template #edit="{ actions, $index }">
            <el-button @click="actions.saveEditable($index)">保存</el-button>
            <el-button @click="actions.cancelEditable($index)">取消</el-button>
            <el-button @click="actions.deleteRow($index)">删除</el-button>
          </template>
        </EditTableColumn>
      </EditTable>
      <el-button @click="addEditTableRef?.editActions.addRow()">新增</el-button>
    </section>
    <section>
      <h1>表单校验效果</h1>
      <EditTable ref="formEditTableRef" class="edit-table" :data-source="tableData">
        <EditTableColumn
          prop="date"
          label="时间"
          :rules="[{ required: true, message: '时间是必填项', trigger: 'blur' }]"
        >
          <template #edit="{ row }">
            <input v-model="row.date" />
          </template>
        </EditTableColumn>
        <EditTableColumn
          prop="name"
          label="姓名"
          :rules="[{ required: true, message: '姓名是必填项', trigger: 'blur' }]"
        >
          <template #edit="{ row }">
            <input v-model="row.name" />
          </template>
        </EditTableColumn>
        <EditTableColumn
          prop="address"
          label="地址"
          :rules="[{ required: true, message: '地址是必填项', trigger: 'blur' }]"
        >
          <template #edit="{ row }">
            <input v-model="row.address" />
          </template>
        </EditTableColumn>
        <EditTableColumn label="修改">
          <template #default="{ actions, $index }">
            <el-button @click="actions.startEditable($index)">修改</el-button>
            <el-button @click="actions.deleteRow($index)">删除</el-button>
          </template>
          <template #edit="{ actions, $index }">
            <el-button @click="actions.saveEditable($index)">保存</el-button>
            <el-button @click="actions.cancelEditable($index)">取消</el-button>
            <el-button @click="actions.deleteRow($index)">删除</el-button>
          </template>
        </EditTableColumn>
      </EditTable>
      <el-button @click="formEditTableRef?.editActions.addRow()">新增</el-button>
    </section>
    <section>
      <h1>获取编辑结果</h1>
      <EditTable ref="resultEditTableRef" class="edit-table" :data-source="tableData">
        <EditTableColumn
          prop="date"
          label="时间"
          :rules="[{ required: true, message: '时间是必填项', trigger: 'blur' }]"
        >
          <template #edit="{ row }">
            <input v-model="row.date" />
          </template>
        </EditTableColumn>
        <EditTableColumn
          prop="name"
          label="姓名"
          :rules="[{ required: true, message: '姓名是必填项', trigger: 'blur' }]"
        >
          <template #edit="{ row }">
            <input v-model="row.name" />
          </template>
        </EditTableColumn>
        <EditTableColumn
          prop="address"
          label="地址"
          :rules="[{ required: true, message: '地址是必填项', trigger: 'blur' }]"
        >
          <template #edit="{ row }">
            <input v-model="row.address" />
          </template>
        </EditTableColumn>
        <EditTableColumn label="操作">
          <template #default="{ actions, $index }">
            <el-button @click="actions.startEditable($index)">操作</el-button>
            <el-button @click="actions.deleteRow($index)">删除</el-button>
          </template>
          <template #edit="{ actions, $index }">
            <el-el-button @click="actions.saveEditable($index)">保存</el-el-button>
            <el-button @click="actions.cancelEditable($index)">取消</el-button>
            <el-button @click="actions.deleteRow($index)">删除</el-button>
          </template>
        </EditTableColumn>
      </EditTable>
      <el-button @click="resultEditTableRef?.editActions.addRow()">新增</el-button>
      <div class="result-wrapper">获取数据:{{ resultEditTableRef?.resultData }}</div>
    </section>
    <section>
      <h1>另一种数据源配置</h1>
      <EditTable class="edit-table" :request="loadData">
        <EditTableColumn prop="date" label="时间"> </EditTableColumn>
        <EditTableColumn prop="name" label="姓名"> </EditTableColumn>
        <EditTableColumn prop="address" label="地址"> </EditTableColumn>
      </EditTable>
    </section>
  </main>
</template>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(35, 35, 126);
  color: rgba(255, 255, 255, 0.87);

  & section {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 100px;
  }
}
.edit-table {
  width: 90%;
}
.result-wrapper {
  width: 90%;
}
</style>
