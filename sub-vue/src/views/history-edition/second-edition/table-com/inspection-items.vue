<template>
  <div class="">
    <common-table
      :columns="columns"
      :isHandle="isHandle"
      :subType="type"
      :tableData.sync="tableData"
      :subName="subName"
    />
  </div>
</template>

<script>
import CommonTable from './commonTable.vue'
import { tableTemplate } from '@/views/case-manage/enum'
import { fieldE } from '../../../enum/compare'
import { deepClone } from '@/utils'
export default {
  name: 'inspectionItem',
  props: {
    subDetail: {
      type: Array,
      default: () => []
    },
    infoType: String,
    status: Number
  },
  components: { CommonTable },
  data() {
    return {
      tableData: [],
      type: 6,
      columnLabel: ['检查项目', '检查日期', '结果', '正常值范围'],
      colnumsVal: ['check_item', 'check_date', 'check_result_mod', 'value_range'],
      columns: [],
      subName: 'inspectionItem'
    }
  },
  watch: {
    subDetail: {
      handler: function (val, old) {
        if (val) {
          this.columns = this.columnLabel.map((el, i) => {
            return { ...deepClone(tableTemplate), label: el, prop: this.colnumsVal[i], id: i }
          })
          this.getTableData()
        }
      },
      deep: true
    }
  },
  computed: {
    isHandle() {
      return this.infoType !== 'view' && this.status === 0
    }
  },
  created() {},
  methods: {
    getTableData() {
      if (!this.subDetail.length) return (this.tableData = [])
      const subList = this.subDetail.find(el => el.subName === this.subName)
      if (subList) this.type = subList.SubType
      if (subList && subList.SubList.length) {
        this.tableData = subList.SubList.map(el => {
          const field = { value_range: '', check_result_mod: '' }
          el.FieldList.forEach(it => {
            if (it.FieldValue !== undefined) {
              field[`${it.FieldName}`] = it.FieldValue
              if (it.FieldName === 'min_value' && it.FieldValue !== null && it.FieldValue !== undefined) {
                field.value_range = it.FieldValue
              } else if (it.FieldName === 'max_value' && it.FieldValue !== null && it.FieldValue !== undefined) {
                field.value_range = `${field.value_range} - ${it.FieldValue}`
              }
              if (it.FieldName === 'ResultType' && it.FieldValue !== null && it.FieldValue !== undefined) {
                field.check_result_mod = fieldE.resSelect.find(el => el.value === it.FieldValue).label || ''
              }
            }
          })
          return { ...el, ...field }
        })
        this.tableData = this.tableData.map(el => {
          if (el.value_range.split('-').length) {
            const name = el.value_range.split('-').filter(el => el !== ' ')
            el.value_range = name.join('-')
          }
          switch (el.ResultType) {
            case 1:
              el.check_result_mod = `${el.check_result_mod} - ${
                fieldE.result.find(it => it.value === el.check_result_code).label || ''
              }`
              break
            case 2:
              el.check_result_mod = `${el.check_result_mod} - ${el.check_result} ${el.check_result_unit}`
              break
            case 3:
              el.check_result_mod = `${el.check_result_mod} - ${el.check_result_text}`
              break
          }
          return el
        })
      }
    }
  }
}
</script>
