<template>
  <div class="">
    <common-table
      :columns="columns"
      :subType="type"
      :isHandle="isHandle"
      :tableData.sync="tableData"
      :subName="subName"
    />
  </div>
</template>

<script>
import CommonTable from './commonTable.vue'
import { tableTemplate } from '@/views/case-manage/enum'
import { deepClone } from '@/utils'
export default {
  name: 'illnessHistory',
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
      type: 7,
      columnLabel: ['疾病名称', '开始日期', '结束日期'],
      colnumsVal: ['MeddraName', 'start_time', 'end_time'],
      columns: [],
      subName: 'illnessHistory'
    }
  },
  computed: {
    isHandle() {
      return this.infoType !== 'view' && this.status === 0
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
  created() {},
  methods: {
    getTableData() {
      if (!this.subDetail.length) return (this.tableData = [])
      const subList = this.subDetail.find(el => el.subName === this.subName)
      if (subList) this.type = subList.SubType
      if (subList && subList.SubList.length) {
        this.tableData = subList.SubList.map(el => {
          const field = { continuous: '' }
          el.FieldList.forEach(it => {
            if (it.FieldValue !== null && it.FieldValue !== undefined) {
              field[`${it.FieldName}`] = it.FieldValue
              if (it.FieldName === 'is_continuous') field.continuous = it.FieldValue ? '是' : '否'
            }
          })
          return { ...el, ...field }
        })
        // console.log(this.tableData)
      }
    }
  }
}
</script>
