<template>
  <div class="">
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
          @doubt="handleOperate"
        />
        <!-- 遍历表单填充数据 -->
        <common-form-item
          v-if="!item.component"
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
import DoubtItem from '../doubt-form/doubt-item.vue'
import RecordItem from '../doubt-form/record-item.vue'
import CommonFormItem from '../form-item/index.vue'

import InspectionItem from '../table-com/inspection-items.vue'
import TipTitle from '../table-com/tip-title.vue'

import {
  doubtTabsList,
  formItemListMap,
  collectTimeList,
  selectRadioItem,
  boolTransformStrRadio,
  arrayToStringListMap,
  otherNameMap
} from '../../../enum/doubt'
import { commonField } from '../../../enum/tabItems'
import { getCaseSubDetail, getCaseDetail, AddSubDetail, ModifySubDetail, DeleteSubDetail } from '@/api/case/summary'
import { deepClone, changeTimeFormat, uniqueArrayByKey } from '@/utils'
import { mapGetters } from 'vuex'
export default {
  name: 'inspect',
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
    IsAuditBack: String,
    active: String,
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
    }
  },
  components: {
    CommonFormItem,
    TipTitle,
    InspectionItem
  },
  data() {
    return {
      formItemList: [],
      doubtForm: [],
      subDetail: [],
      subInfoChange: {},
      tabList: [],
      doubtInfo: {},
      doubtRules: {},
      labelPosition: 'top',
      changeNum: 0,
      fieldId: 5
    }
  },
  watch: {
    doubtForm: {
      handler: function (val, old) {
        if (!val) return
        this.doubtInfo = deepClone({ ...this.doubtForm, active: this.active })
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
    },
    // 子集表格数据
    tableItemInfo: {
      handler: function (val, old) {
        if (val) {
          if (!Object.keys(val).length) return
          this.operateSubDetailServe(val)
        }
      }
    }
  },
  computed: {
    // 是否可以编辑
    notEdit() {
      return this.infoType === 'view' || [3, 4, 5].includes(this.status)
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
    ...mapGetters(['isClose', 'tableItemInfo'])
  },
  created() {
    this.getCaseDetail()
  },
  methods: {
    // 获取案例详情
    getCaseDetail() {
      const { tipType } = doubtTabsList.get(this.fieldId)
      const params = {
        Type: this.fieldId,
        CaseId: this.caseId,
        AdrId: '0'
      }
      getCaseDetail(params).then(res => {
        this.detailId = res.Body.Id
        this.doubtForm = {
          ...this.doubtForm,
          ...res.Body,
          IsAuditBack: this.IsAuditBack,
          FieldList: res.Body.FieldList.map(el => {
            el.BusinessId = res.Body.Id
            return el
          })
        }
        this.subDetail = []
        this.$emit('isCheckSave', res.Body.State)
        if (tipType.length) this.getCaseSubDetail({ tipType, Type: this.fieldId, ParentId: res.Body.Id })
      })
    },
    // 获取案例子集详情
    getCaseSubDetail(val) {
      const { tipType, Type, ParentId } = val
      this.subDetail = []
      tipType.forEach(async el => {
        const res = await getCaseSubDetail({ ParentId, Type, SubType: el.id, CaseId: this.caseId })
        let subList = res.Body.SubList || []
        // 子集列表处理
        if (subList.length) {
          // 去除null值
          subList = subList.map(el => {
            const obj = {}
            for (const key in el) {
              if (el[key] !== null) obj[key] = el[key]
            }
            return obj
          })
          subList.forEach((it, i) => {
            // 额外的字段插入
            for (const key in it) {
              if (otherNameMap.includes(key)) {
                it.FieldList.push({ FieldName: key, FieldValue: it[key], QuestionList: [] })
              }
            }
            // 字符转集合处理
            it.FieldList = it.FieldList.map(el => {
              if (arrayToStringListMap.includes(el.FieldName)) {
                if (el.FieldValue !== null && el.FieldValue !== undefined) {
                  el.FieldValue = el.FieldValue.length ? el.FieldValue.split(',').map(el => Number(el)) : []
                }
              }
              el.BusinessId = it.Id
              return el
            })
            if (i === 0) this.ViewSubDetail({ ...it, SubType: el.id, subName: el.name, ParentId })
          })
        }
        this.subDetail.push({ ParentId, SubType: el.id, subName: el.name, SubList: subList })
      })
    },
    // tab项内容处理
    getFormItem(val) {
      const list = formItemListMap[val]
      const FieldList = this.doubtInfo.FieldList
      // 表单项填充
      const item = list.find(el => el.dataName === 'Remark')
      if (item) FieldList.push({ FieldName: item.name, FieldValue: this.doubtInfo.Remark, QuestionList: [] })
      this.formItemList = list.map((it, index) => {
        return typeof it === 'string' ? { ...commonField.get(it), id: index } : { ...it, id: index }
      })
      // 元素和表单项匹配
      this.formItemList = this.formItemList
        .map((el, i) => this.fillData(el, FieldList, i))
        .filter(el => el.isShow || el.component)
      this.toggerTabTip()
      this.setFeedBackVal()
      this.changeNum = 0
      this.$refs.doubtInfo.resetFields()
    },
    // 填充回显数据
    fillData(el, FieldList, i) {
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
            el.feedBack = this.IsAuditBack === '1' || (el.QuestionList && el.QuestionList.length)
          } else {
            el.feedBack = false
          }
        } else {
          el.feedBack = false
        }
      })
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
    // 反馈/反馈记录
    handleRecord(val, type, props) {
      const title = { back: '反馈', record: '质疑列表' }[type]
      const compon = { doubt: DoubtItem, back: RecordItem, record: RecordItem }[type]
      this.visibleDislog(props, title, compon)
    },
    // 入参数据
    async getOperateParams(name) {
      const info = await this.getFormInfo(name)
      const params = { ...info }
      if (info.type === -1) return this.$message.warning('不能为空！')
      delete params.FieldList
      for (const key in params) {
        const type = Object.prototype.toString.call(params[key])
        if (type === '[object Date]') {
          const DD = String(params[key].getDate()).padStart(2, '0')
          const MM = String(params[key].getMonth() + 1).padStart(2, '0')
          const yyyy = params[key].getFullYear()
          params[key] = yyyy + '-' + MM + '-' + DD
        }
      }
      return params
    },
    async operateSubDetailServe(val) {
      const data = await this.getOperateParams(val.subName)
      if (val.operateType === 'view') return this.ViewSubDetail(val)
      const operateServe = new Map([
        ['creat', [{ ...data, ParentId: this.detailId }, AddSubDetail]],
        ['del', [{ SubType: val.subType, Id: val.Id }, DeleteSubDetail]],
        ['edit', [{ ...data, Id: val.Id }, ModifySubDetail]]
      ])
      const [params, funApi] = operateServe.get(val.operateType)
      await funApi(params, val.subType)
      this.$message.success('操作成功！')
      this.getCaseSubDetail({
        tipType: doubtTabsList.get(this.fieldId).tipType,
        Type: this.fieldId,
        ParentId: this.detailId
      })
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
          fieldDesc: '实验室检查',
          tabId: 5,
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
              resultDoubt: () => {
                this.getCaseDetail()
                this.$emit('refreshData')
              },
              resultFeedBack: () => {}
            }
          })
      })
    },
    // 子集查看
    ViewSubDetail(val) {
      this.subInfoChange = { subFieldList: deepClone(val.FieldList), Id: val.Id }
    },
    // return表单内容值
    getFormInfo(name) {
      // name: 获取主体表单/子集表单
      return new Promise((resolve, reject) => {
        const item = {}
        const formItem = {}
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
        this.calculateCompareVal(item, reject)
        if (!Object.keys(formItem).length) {
          resolve({ ...item, type: this.fieldId, Id: this.detailId })
        } else {
          this.$message.error('请完善信息！')
          reject(new Error('err'))
        }
      })
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
