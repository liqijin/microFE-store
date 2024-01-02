<template>
  <div>
    <div class="flex-row jus-start record-list">
      <el-tabs v-model="activeNames" :tab-position="tabPosition" style="height: 400px" @tab-click="handleClick">
        <el-tab-pane v-for="item in tabList" :key="item.id" :label="item.label" :name="item.id" />
      </el-tabs>

      <el-card class="flex-1">
        <el-table :data="fieldList">
          <el-table-column label="" type="index" align="center" prop=""></el-table-column>
          <el-table-column label="名称" align="center" prop="FieldName"></el-table-column>
          <el-table-column label="描述" align="center" prop="FieldDesc"></el-table-column>
          <el-table-column label="内容" prop="FieldValue" align="center"></el-table-column>
        </el-table>
      </el-card>
    </div>
    <div class="flex-row jus-end mt10">
      <el-button type="" @click="handleClose">关闭</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'verifyInfo',
  props: {
    // 校验数据
    infoForm: {
      type: Object,
      default: () => {}
    }
  },
  components: {},
  data() {
    return {
      recordForm: [],
      activeNames: 0,
      tabPosition: 'left'
    }
  },
  computed: {
    tabList() {
      if (!this.infoForm?.DetialList) return []
      return this.infoForm.DetialList.map((el, i) => {
        return { label: el.TypeName, id: i, FieldList: el.FieldList }
      })
    },
    fieldList() {
      if (!this.tabList.length) return []
      return this.tabList[this.activeNames].FieldList || []
    }
  },
  created() {},
  methods: {
    // tabs切换
    handleClick(val) {
      this.activeNames = val.name
    },
    handleClose() {
      this.$dialog.hide()
    }
  }
}
</script>

<style lang="scss">
.record-list {
  .el-form-item--small .el-form-item__label {
    width: 100%;
  }
  .el-form-item--small.el-form-item {
    margin-bottom: 10px;
  }
}
</style>
