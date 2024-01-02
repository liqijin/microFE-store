<template>
  <div>
    <sd-title :title="comName" />
    <el-form
      ref="doubtInfo"
      class="doubt-info flex-row flex-warp"
      :size="inputSize"
      :model="doubtInfo"
      :label-position="labelPosition"
      :label-width="labelWidth"
    >
      <div
        v-for="(item, index) in formItemList"
        :key="index"
        class="item-form mr10"
        :class="{ outLine: item.flex, notWidth: notWidth(item) }"
      >
        <!-- 遍历表单填充数据 -->
        <common-form-item
          :doubtInfo.sync="doubtInfo"
          :infoType="infoType"
          :field="item"
          :status="status"
          :notEdit="notEdit"
          :caseResource="caseResource"
          :IsAuditBack="IsAuditBack"
          @doubt="handleOperate"
        />
      </div>
    </el-form>
  </div>
</template>

<script>
import CommonFormItem from '../form-item/index.vue'
import DoubtItem from '../doubt-form/doubt-item.vue'
import RecordItem from '../doubt-form/record-item.vue'

import { collectTimeList, selectRadioItem, boolTransformStrRadio } from '../../../enum/doubt'
import { CASE_CONFIRM } from '../../../enum/tabItems'
import { changeTimeFormat } from '@/utils'
import { getCaseDetail } from '@/api/case/summary'
export default {
  // 案例识别
  name: 'discernment',
  props: {
    // 入口状态：view-查看，edit-编辑
    infoType: {
      type: String,
      default: ''
    },
    // 案例id
    caseId: String,
    // 案例状态，8-为不存在
    status: {
      type: Number,
      default: 8
    },
    caseResource: {
      type: Number,
      default: 1
    },
    IsAuditBack: String
  },
  components: { CommonFormItem },
  data() {
    return {
      inputSize: 'small',
      labelWidth: '120',
      labelPosition: 'top',
      formItemList: [],
      doubtInfo: {},
      doubtRules: {},
      comName: '案例识别',
      fieldListElement: [],
      detailId: '',
      changeNum: 0
    }
  },
  watch: {
    doubtInfo: {
      handler: function (val, old) {
        if (val) {
          this.changeNum++
        }
      },
      deep: true
    }
  },
  computed: {
    // 是否可以编辑
    notEdit() {
      return this.infoType === 'view' || [3, 4, 5].includes(this.doubtInfo.pageState)
    },
    // 隐藏元素
    notWidth() {
      return function (item) {
        if (item.isSelect === undefined || item.isSelect === null) return false
        if (item.isSelect === 'DrugEffectFeatures') {
          return this.doubtInfo[item.isSelect] === Number(item.select)
        } else {
          return this.doubtInfo[item.isSelect] !== item.select
        }
      }
    }
  },
  created() {
    this.getCaseDetail()
  },
  methods: {
    getCaseDetail() {
      const params = {
        Type: 0,
        CaseId: this.caseId,
        AdrId: '0'
      }
      getCaseDetail(params).then(res => {
        const field = res.Body || {}
        this.detailId = res.Body.Id
        const triggerField = ['CaseNumber', 'FeedbackCode', 'FileList']
        triggerField.forEach(el => {
          field.FieldList.push({ FieldName: el, FieldValue: res.Body[el], QuestionList: [] })
        })
        field.FieldList = field.FieldList.map(el => ({ ...el, BusinessId: res.Body.Id }))
        this.formItemList = this.getFormItem(field)
        this.$emit('isCheckSave', res.Body.State)
        this.changeNum = 0
      })
    },
    // tab项内容处理
    getFormItem(val) {
      const list = CASE_CONFIRM
      const FieldList = val.FieldList
      this.fieldListElement = FieldList
      return list.map(el => this.fillData(el, FieldList)).filter(el => el.isShow)
    },
    // 填充回显数据
    fillData(el, FieldList) {
      // 线上数据和表单匹配
      if (FieldList && FieldList.map(it => it.FieldName).includes(el.dataName)) {
        const item = FieldList.find(it => it.FieldName === el.dataName)
        el = { ...item, ...el, isShow: true }
        this.doubtInfo = {
          ...this.doubtInfo,
          [`${el.name}`]: item.FieldValue
        }
        this.processData(el)
        if (el.subName !== '') el.isShow = true
      } else {
        el = { ...el, isShow: el.subName !== '' }
        this.doubtInfo = {
          ...this.doubtInfo,
          [`${el.name}`]: ''
        }
      }
      el.feedBack = this.status === 0
      return el
    },
    // 回显处理
    processData(val) {
      const continuous = ['IsContinuous']
      if (boolTransformStrRadio.includes(val.name)) {
        if (this.doubtInfo[val.name] !== undefined) this.doubtInfo[val.name] = this.doubtInfo[val.name] ? 1 : 2
      }
      if (continuous.includes(val.name)) {
        if (this.doubtInfo[val.name] !== undefined) this.doubtInfo[val.name] = this.doubtInfo[val.name] ? 2 : 1
      }
      if (selectRadioItem.includes(val.name)) {
        if (this.doubtInfo[val.name] !== undefined) this.doubtInfo[val.name] = this.doubtInfo[val.name] ? 1 : 0
      }
      if (collectTimeList.includes(val.name)) {
        if (this.doubtInfo[val.name] !== undefined) {
          this.doubtInfo[val.name] = this.doubtInfo[val.name] ? changeTimeFormat(this.doubtInfo[val.name]) : ''
        }
      }
    },
    // 质疑
    handleOperate(val, type) {
      const BusinessItem = this.fieldListElement.find(el => el.FieldName === val.dataName)
      const BusinessId = BusinessItem.BusinessId || ''
      const props = {
        fieldItem: {
          ...val,
          status: this.status,
          fieldDesc: this.comName,
          tabId: 0,
          BusinessId
        },
        itemType: type,
        CaseId: this.caseId
      }
      if (type !== 'doubt') return this.handleRecord(type, props)
      this.visibleDislog(props, '质疑', DoubtItem)
    },
    // 反馈/反馈记录
    handleRecord(type, props) {
      const title = { back: '反馈', record: '质疑列表' }[type]
      const compon = { doubt: DoubtItem, back: RecordItem, record: RecordItem }[type]
      this.visibleDislog(props, title, compon)
    },
    // 打开弹窗
    visibleDislog(props, title, component) {
      this.$dialog.invoke({
        title: title,
        width: '60vw',
        render: h =>
          h(component, {
            props,
            on: {
              resultDoubt: () => {
                this.getCaseDetail()
                this.$emit('refreshData')
              },
              resultFeedBack: () => {}
            }
          })
      })
    },
    getFormInfo() {
      return new Promise((resolve, reject) => {
        this.$refs.doubtInfo
          .validate()
          .then(() => {
            resolve({ ...this.doubtInfo, type: 0, Id: this.detailId })
          })
          .catch(err => reject(err))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.doubt-info {
  flex-wrap: wrap;
  width: 100%;
  .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before,
  .el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap > .el-form-item__label:before {
    position: absolute;
    left: 0;
  }
  .item-form {
    width: calc(100% / 3 - 20px);
  }
  .outLine {
    width: 100%;
  }

  .notWidth {
    width: 0;
    margin-right: 0 !important;
  }
  .custom-label,
  .el-form-item__label {
    position: relative;
  }
}
</style>
