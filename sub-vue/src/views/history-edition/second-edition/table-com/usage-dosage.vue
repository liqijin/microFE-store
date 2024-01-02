<template>
  <div class="mb10 mt10">
    <el-table :data="tableData" :span-method="arraySpanMethod" :row-class-name="rowClassName" border>
      <el-table-column label="" type="index" width="50">
        <template #default="{ row, $index }">
          <header v-if="row.cellType === 'add'" class="flex-row ag-cen jus-cen">
            <el-button type="text" :disabled="!notEdit" style="width: 100%" @click="handleCreatRowTable"
              >添加</el-button
            >
          </header>
          <header v-else>{{ $index + 1 }}</header>
        </template>
      </el-table-column>
      <el-table-column
        v-for="item in columns"
        :key="item.id"
        :label="item.label"
        :align="item.align"
        :width="item.width"
      >
        <template slot="header" style="font-weight: 500"
          >{{ item.label }} <span style="color: #a5a5a5">{{ item.code }}</span></template
        >
        <template slot-scope="scope">
          <div class="flex-row ag-cen">
            <div v-if="item.inputType === 'time'">
              <el-date-picker
                v-model="scope.row[item.prop]"
                style="width: 100%"
                type="date"
                :disabled="isShowOperate"
                placeholder=""
                @change="handleTimeChange(scope.row, item)"
              />
            </div>
            <div v-else-if="item.inputType === 'text'">
              <el-input v-model="scope.row[item.prop]" :disabled="isShowOperate" placeholder="" />
            </div>
            <div v-else-if="item.inputType === 'number'">
              <el-input v-model.number="scope.row[item.prop]" :disabled="isShowOperate" v-decimal.zz placeholder="" />
            </div>
            <div v-else-if="item.inputType === 'select'">
              <el-select v-model="scope.row[item.prop]" filterable placeholder="" :disabled="isShowOperate">
                <el-option v-for="(dd, i) in item.option" :key="i" :label="dd" :value="dd"></el-option>
              </el-select>
            </div>
            <span v-if="handleDoubtList(scope.row, item)" class="" style="color: red; font-size: 16px">*</span>
            <el-dropdown
              v-if="isShowOperate(scope.row)"
              trigger="click"
              class="ml5"
              @command="handleCommand(scope.row, item.prop, $event)"
            >
              <span class="el-dropdown-link">
                <i class="el-icon-more rotate" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="doubt" icon="">
                  <el-button v-if="questionBool" v-permission="['ApplyQuestion']" type="text">质疑</el-button>
                </el-dropdown-item>
                <el-dropdown-item command="back" icon="">
                  <el-button v-if="feedBack" v-permission="['FeedbackQuestion']" type="text">反馈</el-button>
                </el-dropdown-item>
                <el-dropdown-item command="record" icon="">
                  <el-button type="text">质疑记录</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80" align="center">
        <template #default="{ row, $index }">
          <el-button v-if="isDel(row)" type="text" @click="handleDel(row, $index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { DeleteSubDetail } from '@/api/case/summary'
import { usageDosageTableColList, collectTimeList } from '../../../enum/doubt'
import { changeTimeFormat } from '@/utils'
export default {
  name: 'usageDosage',
  props: {
    // 表格数据
    subDetail: {
      type: Array,
      default: () => []
    },
    // 表单数据
    doubtInfo: {
      type: Object,
      default: () => ({})
    },
    active: String,
    IsAuditBack: String,
    // 操作是否可用
    infoType: String,
    // 案例状态
    status: Number
  },
  data() {
    return {
      columns: usageDosageTableColList,
      tableData: [{ cellType: 'add', id: 0 }],
      type: null,
      subName: 'usageDosage'
    }
  },
  watch: {
    subDetail: {
      handler: function (val, old) {
        if (val) this.getTableData()
      },
      deep: true
    }
  },
  computed: {
    isShowOperate() {
      return function (row) {
        return this.infoType !== 'view' && row.Id && [0, 1, 2, 3].includes(this.status)
      }
    },
    notEdit() {
      return this.status === 0 && this.infoType !== 'view'
    },
    isDel() {
      return function (row) {
        return row.cellType !== 'add' && this.notEdit
      }
    },
    // 显示质疑操作
    feedBack() {
      if (this.status === 0) {
        return true
      } else if (this.status === 2) {
        if (this.active === 'MEDICAL_EVALUATE') {
          return this.IsAuditBack === '1' || (this.field.QuestionList && this.field.QuestionList.length)
        }
        return false
      } else {
        return false
      }
    },
    // 显示反馈操作
    questionBool() {
      if ([1, 3].includes(this.status)) {
        return true
      } else if (this.status === 2) {
        if (this.active === 'MEDICAL_EVALUATE') {
          return false
        } else {
          return this.IsAuditBack === '0'
        }
      } else {
        return false
      }
    }
  },
  created() {},
  methods: {
    getTableData() {
      if (this.subDetail && !this.subDetail.length) return (this.tableData = [{ cellType: 'add', id: 0 }])
      const subList = this.subDetail.find(el => el.subName === this.subName)
      if (subList) this.type = subList.SubType
      if (subList && subList.SubList && subList.SubList.length) {
        this.tableData = subList.SubList.map(el => {
          return { ...this.setData(el.FieldList), Id: el.Id, cellType: 'edit' }
        })
        this.tableData.push({ cellType: 'add', id: 0 })
      }
    },
    setData(arr) {
      const val = {}
      arr.forEach(el => {
        if (usageDosageTableColList.map(it => it.dataName).includes(el.FieldName)) {
          const item = usageDosageTableColList.find(it => it.dataName === el.FieldName)
          val[`${item.prop}`] = el.FieldValue || ''
          if (collectTimeList.includes(item.prop)) {
            if (val[item.prop] !== undefined) {
              val[item.prop] = val[item.prop] ? changeTimeFormat(val[item.prop]) : ''
            }
          }
        }
      })
      return val
    },
    // 合并列
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      let array = []
      if (row.cellType === 'add') {
        array = [1, 19]
      } else {
        array = [1, 1]
      }
      return array
    },
    // 自定义列类名
    rowClassName({ row }) {
      return `class-${row.cellType}`
    },
    // 新增列
    handleCreatRowTable() {
      const rowItem = { cellType: 'edit' }
      usageDosageTableColList.forEach(el => {
        rowItem[`${el.prop}`] = ''
      })
      this.tableData.splice(this.tableData.length - 1, 0, rowItem)
    },
    // 删除
    async handleDel(row, index) {
      if (!row.Id) return this.tableData.splice(index, 1)
      const params = { SubType: this.type, Id: row.Id }
      await DeleteSubDetail(params, this.type)
      this.tableData.splice(index, 1)
      this.$message.success('操作成功！')
    },
    handleTimeChange(row, val) {
      const { DrugLastTime, DrugStartTime } = row
      if (DrugStartTime && DrugLastTime) {
        const startTime = new Date(DrugStartTime)
        const startEnd = new Date(DrugLastTime)
        if (startTime > startEnd) {
          row.DrugLastTime = ''
          this.$message.warning('结束时间早于开始时间')
        } else {
          row.DrugDuration = (DrugLastTime.getTime() - DrugStartTime.getTime()) / (24 * 60 * 60 * 1000) + 1
          row.DrugDurationUnit = '天'
        }
      }
    },
    handleDoubtList(row, item) {
      if (!row.Id) return false
      const { dataName } = usageDosageTableColList.find(el => el.prop === item.prop)
      const subList = this.subDetail.find(el => el.subName === this.subName)
      if (!subList || !subList.SubList.length) return false
      const { FieldList } = subList.SubList.find(el => el.Id === row.Id)
      const keyItem = FieldList.find(el => el.FieldName === dataName)
      return keyItem.QuestionList ? keyItem.QuestionList.length : false
    },
    handleCommand(row, name, command) {
      const { dataName, label } = usageDosageTableColList.find(el => el.prop === name)
      const subList = this.subDetail.find(el => el.subName === this.subName)
      const { FieldList } = subList.SubList.find(el => el.Id === row.Id)
      const item = FieldList.find(el => el.FieldName === dataName)
      this.$emit('doubt', { ...item, label, usageId: row.Id, usage: 1 }, command)
    },
    // 返回数据
    submitData() {
      return this.tableData
        .filter(el => el.cellType === 'edit')
        .map(el => {
          const { cellType, ...reset } = el
          for (const key in reset) {
            const type = Object.prototype.toString.call(reset[key])
            if (type === '[object Date]') {
              const year = reset[key].getFullYear()
              let month = reset[key].getMonth() + 1
              let day = reset[key].getDate()
              if (month < 10) month = `0${month}`
              if (day < 10) day = `0${day}`
              reset[key] = year + '-' + month + '-' + day
            }
          }
          reset.Id = reset.Id || '0'
          return reset
        })
    }
  }
}
</script>

<style lang="scss">
.class-add .is-center {
  display: none;
}
.class-edit {
  .el-input .el-input__inner {
    border-radius: 0;
    border-width: 0;
    border-bottom-width: 1px;
  }
}
.rotate {
  transform: rotate(-90deg);
}
</style>
