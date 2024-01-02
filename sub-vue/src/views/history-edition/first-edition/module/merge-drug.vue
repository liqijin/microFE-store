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
import { fieldC } from '@/views/case-manage/case-operate/backup/enum/compare'
import { deepClone } from '@/utils'
export default {
  name: 'mergeDrug',
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
      type: 3,
      columnLabel: ['批准文号', '通用名称', '规格', '上市许可持有人', '用法用量', '治疗疾病', '针对药物采取的措施'],
      colnumsVal: [
        'approval_number',
        'drug_generic_name',
        'drug_spec_text',
        'holder_name',
        'TipListText',
        'report_adapt',
        'drug_measures_text'
      ],
      columns: [],
      subName: 'mergeDrug'
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
            let width = ''
            if (this.colnumsVal[i] === 'TipListText') width = '380'
            return { ...deepClone(tableTemplate), width, label: el, prop: this.colnumsVal[i], id: i }
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
          const field = { drug_measures_text: '', drug_spec_text: '' }
          el.FieldList.forEach(it => {
            if (it.FieldValue !== undefined) {
              field[`${it.FieldName}`] = it.FieldValue
              if (it.FieldName === 'drug_measures' && it.FieldValue !== null && it.FieldValue !== undefined) {
                field.drug_measures_text = fieldC.measure.find(el => el.value === it.FieldValue).label
              }
              if (it.FieldName === 'drug_spec' && it.FieldValue !== null && it.FieldValue !== undefined) {
                field.drug_spec_text = it.FieldValue
              }
              if (it.FieldName === 'drug_spec_unit' && it.FieldValue !== null && it.FieldValue !== undefined) {
                field.drug_spec_text = `${field.drug_spec_text} ${it.FieldValue}`
              }
            }
          })
          const TipListText = el.TipList.map(el => {
            return `${el.UsageInfo}, 失效日期: ${el.ExpireTime}`
          })
          return { ...el, ...field, TipListText }
        })
      }
    }
  }
}
</script>
