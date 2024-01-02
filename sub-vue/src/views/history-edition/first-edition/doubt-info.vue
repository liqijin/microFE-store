<template>
  <div class="">
    <el-tabs v-model="active" @tab-click="handleClick" :before-leave="handleBefore">
      <el-tab-pane v-for="item in tabList" :key="item.id" :label="item.label" :name="item.type">
        <div slot="label">
          <span>{{ item.label }}</span>
          <span v-if="item.questionCount" class="ml5">({{ item.questionCount }})</span>
        </div>
      </el-tab-pane>
    </el-tabs>
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
        v-for="item in formItemList"
        :key="item.id"
        class="item-form mr10"
        :class="{ outLine: item.flex, notWidth: notWidth(item) }"
      >
        <!-- 填充组件 -->
        <component
          :is="item.component"
          v-if="item.component"
          :ref="`${item.name}Ref`"
          :infoType="infoType"
          :doubtInfo="doubtInfo"
          :subDetail="subDetail"
          :status="status"
          :field="item"
          :openMergeField="openMergeField"
          @doubt="handleOperate"
        />
        <!-- 遍历表单填充数据 -->
        <common-form-item
          v-if="!item.component"
          :doubtInfo.sync="doubtInfo"
          :infoType="infoType"
          :field="item"
          :notEdit="notEdit"
          :caseId="caseId"
          :caseResource="caseResource"
          @doubt="handleOperate"
        />
      </div>
    </el-form>
  </div>
</template>

<script>
import DoubtItem from './doubt-func/doubt-item.vue'
import RecordItem from './doubt-func/record-item.vue'
import CommonFormItem from './doubt-func/form-item.vue'

import IllnessHistory from './module/illness-history.vue'
import UsageDosage from './module/usage-dosage.vue'
import GeneralDosage from './module/general-dosage.vue'
import UntowardReaction from './module/untoward-reaction.vue'
import InspectionItem from './module/inspection-items.vue'
import TreatItems from './module/treat-items.vue'
import DrugEvaluation from './module/drug-evaluation.vue'
import TipTitle from './module/tip-title.vue'
import CaseHistory from './module/caseHistory.vue'
import MergeDrug from './module/merge-drug.vue'

import { getCaseQuestionCount } from '@/api/case/question'
import { getCaseDoubtSelect, getCaseBadReactionSelect } from '@/api/case/summary'
import {
  doubtTabsList,
  formItemListMap,
  collectTimeList,
  selectRadioItem,
  boolTransformStrRadio,
  arrayToStringListMap
} from '../enum/doubt'
import { commonField } from '../enum/tabItems'
import { deepClone, changeTimeFormat, uniqueArrayByKey } from '@/utils'
import { mapGetters } from 'vuex'
export default {
  name: 'doubt-info',
  props: {
    // 输入框尺寸
    inputSize: {
      type: String,
      default: 'small'
    },
    // label长度
    labelWidth: {
      type: String,
      default: '120'
    },
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
    // 详情数据
    doubtForm: {
      type: Object,
      default: () => ({})
    },
    // 详情表格数据
    subDetail: {
      type: Array,
      default: () => []
    },
    subInfoChange: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    CommonFormItem,
    IllnessHistory,
    TipTitle,
    UsageDosage,
    GeneralDosage,
    UntowardReaction,
    InspectionItem,
    TreatItems,
    DrugEvaluation,
    CaseHistory,
    MergeDrug
  },
  data() {
    return {
      formItemList: [],
      tabList: [],
      active: 'CASE_CONFIRM',
      doubtInfo: {},
      doubtRules: {},
      labelPosition: 'top',
      changeNum: 0,
      openMergeField: true,
      formItemListDeep: [],
      theFirst: {}
    }
  },
  watch: {
    doubtForm: {
      handler: function (val, old) {
        if (!val) return
        const otherName = ['FileList', 'FeedbackCode']
        this.doubtInfo = deepClone({ ...this.doubtForm, active: this.active })
        for (const key in this.doubtInfo) {
          if (otherName.includes(key)) {
            this.doubtInfo.FieldList.push({
              FieldName: key,
              FieldValue: val[key]
            })
          }
        }
        this.getFormItem(this.active)
      },
      deep: true
    },
    // 是否刷新数据
    isClose: {
      handler: function (val, old) {
        if (val) this.getCaseQuestionCount()
      }
    },
    doubtInfo: {
      handler: function (val, old) {
        if (val) {
          if (this.changeNum === 0) this.theFirst = val
          if (this.changeNum > 0) {
            let num = 0
            for (const key in val) {
              if (val[key] !== this.theFirst[key]) num++
            }
            if (num > 0) {
              this.changeNum++
            } else {
              this.changeNum = 0
            }
          }
          this.changeNum++
        }
      },
      deep: true
    },
    subInfoChange: {
      handler: function (val, old) {
        if (!val) return
        const { subFieldList, Id } = val
        this.formItemList = this.formItemList.map(el => {
          if (subFieldList.map(it => it.FieldName).includes(el.dataName)) {
            const item = subFieldList.find(it => it.FieldName === el.dataName)
            this.doubtInfo[`${el.name}`] = item.FieldValue
            this.processData(el)
            el.BusinessId = item.BusinessId
            el.ElementId = item.ElementId
            el.QuestionList = item.QuestionList
          }
          return el
        })
        this.setFeedBackVal()
        this.doubtInfo.Id = Id
        this.doubtInfo.FieldList = uniqueArrayByKey([...subFieldList, ...this.doubtForm.FieldList], 'FieldName')
        this.$nextTick(() => (this.changeNum = 0))
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
    },
    ...mapGetters(['isClose'])
  },
  created() {
    this.getCaseQuestionCount()
  },
  methods: {
    // 获取绑定元素
    getBindSelect(list) {
      const arr = []
      doubtTabsList.forEach((val, i) => {
        if (this.status < 2) {
          if (i !== 9) arr.push({ ...val, id: i })
        } else {
          arr.push({ ...val, id: i })
        }
      })
      if (list.length) {
        this.tabList = arr.map(el => {
          el.questionCount = list[el.id].QuestionCount
          return el
        })
      } else {
        this.tabList = arr
      }
      this.$emit('checkTab', this.tabList, this.active)
    },
    // 获取案例质疑数量
    getCaseQuestionCount() {
      getCaseQuestionCount({ State: 0, CaseId: this.caseId }).then(res => {
        this.getBindSelect(res.Body.CountList || [])
      })
    },
    // tab项内容处理
    getFormItem(val) {
      const list = formItemListMap[val]
      const FieldList = this.doubtInfo.FieldList
      const ShowFieldList = this.doubtForm.ShowFieldList
      // 表单项填充
      const item = list.find(el => el.dataName === 'Remark')
      if (item) FieldList.push({ FieldName: item.name, FieldValue: this.doubtInfo.Remark, QuestionList: [] })
      this.formItemList = list.map((it, index) => {
        const obj = typeof it === 'string' ? { ...commonField.get(it), id: index } : { ...it, id: index }
        if (ShowFieldList && ShowFieldList.map(el => el.FieldName).includes(it.dataName)) {
          const field = ShowFieldList.find(el => el.FieldName === it.dataName)
          obj.code = field.FieldNumber
        }
        return obj
      })
      // 元素和表单项匹配
      this.formItemList = this.formItemList
        .map(el => this.fillData(el, FieldList))
        .filter(el => el.isShow || el.component)
      this.toggerTabTip()
      this.getOptionList()
      this.setFeedBackVal()
      this.changeNum = 0
      this.$refs.doubtInfo.resetFields()
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
      return el
    },
    setFeedBackVal() {
      this.formItemList.forEach(el => {
        if (this.status === 0) {
          el.feedBack = true
        } else if (this.status === 2) {
          if (this.active === 'MEDICAL_EVALUATE') {
            el.feedBack = this.doubtInfo.IsAuditBack === '1' || (el.QuestionList && el.QuestionList.length)
          } else {
            el.feedBack = false
          }
        } else {
          el.feedBack = false
        }
      })
    },
    // 医学评估下，获取不良反应和怀疑用药列表
    getOptionList() {
      this.formItemList.forEach(async el => {
        if (el.name && el.prop) {
          if (el.name !== el.prop) {
            const apiServe = {
              getCaseDoubtSelect: getCaseDoubtSelect,
              getCaseBadReactionSelect: getCaseBadReactionSelect
            }[el.prop]
            const res = await apiServe({ CaseId: this.caseId })
            if (el.prop === 'getCaseDoubtSelect') {
              el.option = res.Body.DoubtList.map(el => {
                return { value: el.DoubtDetailId, label: el.DrugName }
              })
            } else {
              el.option = res.Body.BadReactionList.map(el => {
                return { value: el.BadReactionDetailId, label: el.BadReactionName }
              })
            }
          }
        }
      })
    },
    // 回显处理
    processData(val) {
      const continuous = ['IsContinuous']
      if (boolTransformStrRadio.includes(val.name)) {
        if (this.doubtInfo[val.name] !== undefined && this.doubtInfo[val.name] !== null) {
          this.doubtInfo[val.name] = this.doubtInfo[val.name] ? 1 : 2
        }
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
    // 标识符文字显示, sd-title组件的title显示
    toggerTabTip() {
      let tipList = []
      doubtTabsList.forEach((value, i) => {
        if (value.type === this.active) tipList = value.tip
      })
      const tipTotal = this.formItemList
        .filter(el => el.name === 'tipTitle')
        .map((el, index) => {
          el.label = tipList[index]
          return el
        })
      this.formItemList = this.formItemList.map(el => {
        if (tipTotal.map(data => data.id).includes(el.id)) {
          const item = tipTotal.find(data => data.id === el.id)
          el = { ...item }
        }
        return el
      })
    },
    // tab切换
    handleClick(val) {
      this.formItemList = []
      // this.getFormItem(val.name)
    },
    // 反馈/反馈记录
    handleRecord(val, type, props) {
      const title = { back: '反馈', record: '质疑列表' }[type]
      const compon = { doubt: DoubtItem, back: RecordItem, record: RecordItem }[type]
      this.visibleDislog(props, title, compon)
    },
    // 质疑
    handleOperate(val, type) {
      const { label: fieldDesc, id: tabId } = this.tabList.find(el => el.type === this.active)
      // const BusinessItem = this.doubtInfo.FieldList.find(el => el.FieldName === val.dataName)
      const BusinessId = val.usage ? val.usageId : val.BusinessId
      // console.log(val, BusinessId)
      // if (val.usage) BusinessId = val.usageId
      // if (BusinessItem) BusinessId = BusinessItem.BusinessId
      const props = {
        fieldItem: {
          ...val,
          status: this.status,
          fieldDesc,
          tabId,
          BusinessId
        },
        itemType: type,
        CaseId: this.caseId
      }
      if (type !== 'doubt') return this.handleRecord(val, type, props)
      this.visibleDislog(props, '质疑', DoubtItem)
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
              resultDoubt: () => this.getCaseQuestionCount(),
              resultFeedBack: () => {}
            }
          })
      })
    },
    // 判断是否需要弹窗提醒用户保存
    handleBefore(val, old) {
      if (val && old) {
        const copyDoubt = deepClone(this.doubtInfo)
        const copyList = deepClone(this.formItemList)
        if (this.changeNum > 1) {
          return this.returnTip(val, copyList, copyDoubt)
        } else {
          this.$emit('checkTab', this.tabList, val)
          return true
        }
      }
    },
    returnTip(val, copyList, copyDoubt) {
      return new Promise((resolve, reject) => {
        this.$confirm('该页面内容未保存，若是切换则内容会流失，确定要切换页面吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.getFormItem(val)
            this.$emit('checkTab', this.tabList, val)
            resolve()
          })
          .catch(() => {
            reject(new Error('err'))
            this.formItemList = copyList.map(el => el)
            this.doubtInfo = deepClone({ ...copyDoubt })
          })
      })
    },
    // return表单内容值
    getFormInfo(name) {
      // name: 获取主体表单/子集表单
      return new Promise((resolve, reject) => {
        const item = {}
        const formItem = {}
        const { id } = this.tabList.find(el => el.type === this.active)
        const list = this.formItemList.filter(el => el.subName === name).map(el => el.name)
        list.forEach(el => (item[`${el}`] = this.doubtInfo[el]))
        // 校验汇总
        const require = this.formItemList
          .filter(el => el.subName === name)
          .filter(el => el.rules && el.rules.length)
          .map(el => el.name)
        this.$refs.doubtInfo.validateField(list)
        require.forEach(key => {
          if (item[key] === '' || item[key] === undefined || item[key] === null) {
            formItem[key] = item[key]
          }
        })
        list.forEach(el => {
          if (el === 'ReportSource' && this.doubtInfo[el] !== 1) delete formItem.FeedbackCode
        })
        this.comChildrenModal(item, name)
        this.calculateCompareVal(item, reject)
        if (!Object.keys(formItem).length) {
          resolve({ ...item, type: id })
        } else {
          this.$message.error('请完善信息！')
          reject(new Error('err'))
        }
      })
    },
    comChildrenModal(item, name) {
      // 是否存在子集
      const durgCom = ['generalDosage', 'mergeDrug']
      if (durgCom.includes(name)) {
        item.UsageList = this.$refs.usageDosageRef[0].submitData().map(al => {
          const usage = {}
          for (const val in al) {
            if (al[val] !== null && al[val] !== '') usage[val] = al[val]
          }
          return usage
        })
      }
    },
    calculateCompareVal(item, reject) {
      for (const key in item) {
        if (arrayToStringListMap.includes(key)) {
          if (item[key]) item[key] = item[key].join(',')
        }
        if (['MinValue', 'MaxValue'].includes(key)) {
          if (item.MinValue && item.MaxValue && Number(item.MinValue) > Number(item.MaxValue)) {
            this.$message.error('最高值不能低于最小值')
            return reject(new Error('err'))
          }
        }
        if (item[key] === '' || item[key] === null) {
          delete item[key]
          if (key === 'DrugMeasures') item[key] = -1
        }
      }
    }
  }
}
</script>

<style lang="scss">
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
