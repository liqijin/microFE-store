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
  name: 'treatItems',
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
      type: 8,
      columnLabel: ['药物名称', '开始日期', '结束日期', '治疗疾病'],
      colnumsVal: ['report_drug_name', 'drug_start_time', 'drug_end_time', 'DrugMeddraName'],
      columns: [],
      subName: 'treatItems'
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
          const field = {}
          el.FieldList.forEach(it => {
            if (it.FieldValue !== undefined) {
              field[`${it.FieldName}`] = it.FieldValue
            }
          })
          return { ...el, ...field }
        })
      }
    }
  }
}
</script>
