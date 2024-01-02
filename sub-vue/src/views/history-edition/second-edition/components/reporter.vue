<template>
  <div>
    <el-form
      ref="doubtInfo"
      class="doubt-info flex-row flex-warp"
      :size="inputSize"
      :rules="doubtRules"
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
import { REPORT_USER } from '../../../enum/tabItems'
import { changeTimeFormat } from '@/utils'
import { getCaseDetail } from '@/api/case/summary'
export default {
  // 报告者
  name: 'report',
  props: {
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
      comName: '报告者',
      detailId: '',
      doubtRules: {},
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
        Type: 7,
        CaseId: this.caseId,
        AdrId: '0'
      }
      getCaseDetail(params).then(res => {
        const field = res.Body || {}
        this.detailId = res.Body.Id
        field.FieldList = field.FieldList.map(el => ({ ...el, BusinessId: res.Body.Id }))
        this.formItemList = this.getFormItem(field)
        this.changeNum = 0
        this.$emit('isCheckSave', res.Body.State)
      })
    },
    // tab项内容处理
    getFormItem(val) {
      const list = REPORT_USER
      const FieldList = val.FieldList
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
      const BusinessItem = this.doubtInfo.FieldList.find(el => el.FieldName === val.dataName)
      let BusinessId = null
      if (val.usage) BusinessId = val.usageId
      if (BusinessItem) BusinessId = BusinessItem.BusinessId
      const props = {
        fieldItem: {
          ...val,
          status: this.status,
          fieldDesc: this.comName,
          tabId: 7,
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
            resolve({ ...this.doubtInfo, type: 7, Id: this.detailId })
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
