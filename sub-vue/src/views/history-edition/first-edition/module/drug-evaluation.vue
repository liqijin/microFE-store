<template>
  <div class="">
    <common-table
      :isHandle="isHandle"
      :columns="columns"
      :subType="type"
      :tableData.sync="tableData"
      :subName="subName"
    />
  </div>
</template>

<script>
import CommonTable from './commonTable.vue'
import { tableTemplate } from '@/views/case-manage/enum'
import { deepClone } from '@/utils'
import { fieldF } from '../../../enum/compare'
export default {
  name: 'drugEvaluation',
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
      type: 9,
      columnLabel: [
        '怀疑用药',
        '不良反应',
        '是否非预期',
        '停药或减量后，反应是否消失或减轻',
        '再次使用可疑药品后，是否再次出现同样反应'
      ],
      colnumsVal: ['DrugName', 'BadReactionName', 'is_unexpected_text', 'event_disappear_text', 'event_again'],
      columns: [],
      subName: 'drugEvaluation'
    }
  },
  computed: {
    isHandle() {
      return this.infoType !== 'view' && this.status === 2
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
          const field = { is_unexpected_text: '', event_disappear_text: '', event_again: '' }
          el.FieldList.forEach(it => {
            if (it.FieldValue !== undefined) {
              field[`${it.FieldName}`] = it.FieldValue
              if (it.FieldName === 'is_unexpected' && it.FieldValue !== null && it.FieldValue !== undefined) {
                field.is_unexpected_text = it.FieldValue ? '是' : '否'
              }
              if (it.FieldName === 'event_disappear' && it.FieldValue !== null && it.FieldValue !== undefined) {
                field.event_disappear_text = fieldF.result[it.FieldValue - 1].label
              }
              if (it.FieldName === 'event_again' && it.FieldValue !== null && it.FieldValue !== undefined) {
                field.event_again = fieldF.reaction[it.FieldValue - 1].label
              }
            }
          })
          return { ...el, ...field }
        })
      }
    }
  }
}
</script>
