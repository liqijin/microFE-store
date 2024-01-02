<template>
  <div class="mb20">
    <div v-if="isHandle" class="flex-row jus-end mb10">
      <el-button v-if="tableDataHandle.length" type="primary" @click="handleOperate({}, 'edit')">修改</el-button>
      <el-button type="primary" @click="handleOperate({}, 'creat')">添加</el-button>
    </div>
    <el-table
      ref="mutipleTable"
      highlight-current-row
      border
      :row-class-name="handleRowClass"
      @row-click="(row, column, event) => handleNodeClick(row, column, event, 'mutipleTable')"
      :data="tableDataHandle"
    >
      <template>
        <el-table-column
          v-for="column in columns"
          :key="column.label"
          :prop="column.prop"
          :label="column.label"
          :align="column.align"
          :width="column.width"
          :sortable="column.sortable"
          :class-name="column.className"
          :label-class-name="column.labelClassName"
          :show-overflow-tooltip="column.overToolTip"
        >
          <template slot-scope="scope">
            <span v-if="typeof scope.row[column.prop] === 'string'">{{ scope.row[column.prop] }}</span>
            <span v-else-if="typeof scope.row[column.prop] === 'number'">{{ scope.row[column.prop] }}</span>
            <div v-else>
              <p v-for="(item, index) in scope.row[column.prop]" :key="index">{{ item }}</p>
            </div>
          </template>
        </el-table-column>
      </template>
      <el-table-column label="是否存在质疑" prop="isDoubt" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-button v-if="isHandle" type="text" @click="handleOperate(row, 'del')">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { changeTimeFormat } from '@/utils'
export default {
  name: 'commonTable',
  props: {
    // 表格循环列表
    columns: {
      type: Array,
      default: () => []
    },
    // 表格数据
    tableData: {
      type: Array,
      default: () => []
    },
    // 获取表格详情类型
    subType: {
      type: Number,
      default: -1
    },
    // 组件名称
    subName: {
      type: String,
      default: ''
    },
    // 是否显示操作
    isHandle: Boolean
  },
  data() {
    return {
      rowItem: {},
      timeList: [
        'end_time',
        'start_time',
        'event_start_time',
        'event_end_time',
        'check_date',
        'drug_start_time',
        'drug_end_time'
      ]
    }
  },
  computed: {
    ...mapGetters(['tableItemInfo']),
    tableDataHandle() {
      return this.tableData.map(el => {
        const { FieldList } = el
        const bool = FieldList.some(el => el.QuestionList && el.QuestionList.length)
        for (const key in el) {
          if (this.timeList.includes(key)) {
            el[key] = el[key] ? changeTimeFormat(el[key]) : ''
          }
        }
        return { ...el, isDoubt: bool ? '是' : '否' }
      })
    }
  },
  methods: {
    handleOperate(row, type, index) {
      let item = {}
      if (type === 'edit') {
        if (Object.keys(this.rowItem).length) {
          item.Id = this.rowItem.Id
        } else {
          item = { ...this.tableDataHandle[0] }
        }
      }
      const params = {
        operateType: type,
        ...row,
        ...item,
        subName: this.subName,
        subType: this.subType
      }
      this.$store.dispatch('summary/setTableItemInfo', params)
    },
    handleRowClass({ row }) {
      return `row-class-${row.cellName}`
    },
    handleNodeClick(row, colnum, e, ref) {
      this.rowItem = { ...row }
      this.handleOperate(row, 'view')
      const $table = this.$refs[ref]
      const haveHeightLight = [...e.path].some(el => {
        if (el.classList) {
          return [...el.classList].indexOf('el-table__row') !== -1 && [...el.classList].indexOf('current-row') !== -1
        }
      })
      try {
        $table[0].setCurrentRow(haveHeightLight ? '' : row)
      } catch (e) {
        $table.setCurrentRow(haveHeightLight ? '' : row)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .row-class-edit > td {
  background-color: #c8d5fb;
}
::v-deep .current-row > td {
  background: #c8d5fb;
}
</style>
