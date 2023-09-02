## EditTable

阅读[《极致舒适的 Vue 可编辑表格》](https://juejin.cn/post/7242140832379584567)获取更多 EditTable 的信息

### 效果演示

#### 无编辑效果

![无编辑效果](https://cdn.staticaly.com/gh/JessYan0913/picx-images-hosting@master/Snipaste_2023-09-02_11-21-52.3r5pp82rg660.webp)

#### 可编辑效果

![可编辑效果](https://cdn.staticaly.com/gh/JessYan0913/picx-images-hosting@master/Kapture-2023-09-02-at-11.30.59.2nhe801q0e60.gif)

#### 删除效果

![删除效果](https://cdn.staticaly.com/gh/JessYan0913/picx-images-hosting@master/Kapture-2023-09-02-at-11.33.51.oj8lh5vmwqo.gif)

#### 新增效果

![新增效果](https://cdn.staticaly.com/gh/JessYan0913/picx-images-hosting@master/Kapture-2023-09-02-at-11.37.56.5ile0v6cw2s0.gif)

#### 表单校验效果

![表单校验效果](https://cdn.staticaly.com/gh/JessYan0913/picx-images-hosting@master/Kapture-2023-09-02-at-11.39.47.5qsl1p1kbo80.gif)

#### 获取编辑结果

![获取编辑结果](https://cdn.staticaly.com/gh/JessYan0913/picx-images-hosting@master/Kapture-2023-09-02-at-11.42.26.6ugb99gesy80.gif)

### 配置说明

#### EditTable 属性

| 属性名      | 说明                                                                      | 类型     | 可选值 | 默认值 |
| ----------- | ------------------------------------------------------------------------- | -------- | ------ | ------ |
| data-source | 显示的数据                                                                | array    | —      | —      |
| request     | 动态数据，如果同时配置了 data-source 和 request，则最终渲染为两个数据的和 | function | —      | —      |

其他属性参考：[ElementPlusTable](https://element-plus.gitee.io/zh-CN/component/table.html#table-%E5%B1%9E%E6%80%A7)

#### EditTable 方法

| 方法名                     | 说明                                                               | 参数   |
| -------------------------- | ------------------------------------------------------------------ | ------ |
| editActions.addRow         | 增加一行可编辑态的行                                               | row    |
| editActions.deleteRow      | 删除指定行，不论该行是编辑态还是非编辑态都会被删除                 | $index |
| editActions.startEditable  | 指定行变为编辑态                                                   | $index |
| editActions.saveEditable   | 保存编辑态并触发表单校验，如果校验通过，编辑数据会被更新到表格中。 | $index |
| editActions.cancelEditable | 指定行取消编辑态                                                   | $index |

其他方法参考: [ElementPlusTable](https://element-plus.gitee.io/zh-CN/component/table.html#table-%E6%96%B9%E6%B3%95)

#### EditTableColumn 插槽

| 插槽名  | 说明                   | 作用域                                                                                                           |
| ------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------- |
| default | 自定义列的内容         | `{$index, row, column, actions}`，actions 包括了`addRow, deleteRow, startEditable, saveEditable, cancelEditable` |
| edit    | 编辑态的自定义列的内容 | 同上                                                                                                             |
