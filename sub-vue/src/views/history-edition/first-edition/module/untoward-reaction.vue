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
import { fieldD } from '../../../enum/compare'
export default {
  name: 'untowardReaction',
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
      type: 5,
      columnLabel: [
        '不良反应术语',
        '不良反应发生时间',
        '不良反应持续时间',
        '不良反应结束时间',
        '不良反应严重性标准',
        '结果'
      ],
      colnumsVal: [
        'MeddraName',
        'event_start_time',
        'event_duration_text',
        'event_end_time',
        'reporter_term_text',
        'last_outcome_text'
      ],
      columns: [],
      subName: 'untowardReaction',
      itemList: [
        'cause_death',
        'endanger_life',
        'cause_hospitalization',
        'function_loss',
        'birth_defect',
        'important_medical_events'
      ]
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
        const { situation } = fieldD
        this.tableData = subList.SubList.map(el => {
          const field = { last_outcome_text: '', reporter_term_text: '', event_duration_text: '' }
          el.FieldList.forEach(it => {
            if (it.FieldValue !== undefined) {
              field[`${it.FieldName}`] = it.FieldValue
              if (it.FieldName === 'last_outcome' && it.FieldValue !== null && it.FieldValue !== undefined) {
                field.last_outcome_text = situation.find(el => el.value === it.FieldValue).label
              }
              if (this.itemList.includes(it.FieldName)) {
                if (field.reporter_term_text !== '') {
                  field.reporter_term_text = `${field.reporter_term_text}, ${it.FieldDesc}: ${
                    it.FieldValue ? '是' : '不完整信息'
                  }`
                } else {
                  field.reporter_term_text = `${it.FieldDesc}: ${it.FieldValue ? '是' : '不完整信息'}`
                }
              }
              if (it.FieldName === 'event_duration' && it.FieldValue !== null && it.FieldValue !== undefined) {
                field.event_duration_text = it.FieldValue
              }
              if (it.FieldName === 'event_duration_unit' && it.FieldValue !== null && it.FieldValue !== undefined) {
                field.event_duration_text = `${field.event_duration_text} ${it.FieldValue}`
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
