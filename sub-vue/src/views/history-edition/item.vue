<template>
  <div class="flex-col jus-bet operate">
    <div class="flex-col jus-bet flex-1 center-box pr10">
      <div class="flex-col jus-bet step-main">
        <div>
          <!-- 状态进度 -->
          <StepsBox :state="status" />
        </div>
        <el-card class="flex-1 center-box mb10">
          <!-- <div v-if="inputShow" class="flex-row jus-end">
            <el-button type="primary" v-permission="['inputCaseCenter']" size="" @click="handleEnter">
              <span v-if="doubtForm.State" class="el-icon-star-off"></span>
              <span>保存</span>
            </el-button>
          </div> -->

          <!-- tabs主体信息 -->
          <doubt-info
            ref="doubtInfo"
            :infoType="infoType"
            :caseId="caseId"
            :doubtForm="doubtForm"
            :status="status"
            :subDetail="subDetail"
            :caseResource="caseResource"
            :subInfoChange="subInfoChange"
            :IsAuditBack="IsAuditBack"
            @refresh="getCaseDetail"
            @checkTab="getCaseDetail"
            @tabChange="val => (fieldId = val)"
          />
        </el-card>
      </div>
    </div>
    <el-card class="btn-footer p20">
      <div class="flex-row ag-cen jus-bet btx-box">
        <div v-if="btnConfirm" class="flex-row ag-cen jus-bet flex-1 mr10">
          <!-- 入参表单 -->
          <BtnForm ref="resultBox" :fieldId="fieldId" :resultForm.sync="resultForm" :status="status" />
          <div class="flex-row">
            <!-- <div v-if="status === 3" class="flex-row">
              <el-button type="" class="ml10 mr10" @click="handleOperate('e2b')">E2B校验</el-button>
              <div v-if="Object.keys(verifyInfo).length">
                <el-tag v-if="verifyInfo.e2bPassed" type="success">校验通过</el-tag>
                <el-button v-else type="info" class="ml10" @click="handlePass">检验不通过</el-button>
              </div>
            </div> -->
            <!-- 状态组 -->
            <div v-for="(item, index) in tableBtnText" :key="index" class="ml10">
              <el-button
                v-if="item.show(fieldId)"
                v-permission="item.permission"
                type="primary"
                size=""
                @click="handleOperate(item.type)"
              >
                {{ item.label }}
              </el-button>
            </div>
          </div>
        </div>
        <!-- 占位标签 -->
        <span v-else />
        <el-button type="" size="" @click="$router.replace({ name: 'CaseSummaryManage' })">返回</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import VerifyInfo from './components/verifyInfo.vue'
import StepsBox from './components/steps.vue'
// import DoubtInfo from './modal/doubt-info.vue'
import DoubtInfo from './operate/index.vue'
import BtnForm from './components/btnForm.vue'
import {
  inputCaseCenter,
  applyQualityCheck,
  checkCase,
  evaluateCase,
  verifyCase,
  auditCase,
  getCaseDetail,
  getCaseSubDetail,
  AddSubDetail,
  ModifySubDetail,
  DeleteSubDetail
} from '@/api/case/summary'
import { caseBtnOperate, CENTER_STATUS } from '../enum'
import { doubtTabsList, arrayToStringListMap, otherNameMap } from '../enum/doubt'
import { mapGetters } from 'vuex'
import {
  // uniqueArrayByKey,
  deepClone
} from '@/utils'
export default {
  name: 'caseOperate',
  components: { StepsBox, DoubtInfo, BtnForm },
  data() {
    return {
      status: 1, // 案例状态
      caseId: '',
      doubtForm: {}, // tabs项数据
      fieldId: 0, // tabs项id
      // 入参表单
      resultForm: {
        Passed: null,
        OperatorId: '',
        ReceiverIds: []
      },
      // 是否是审核状态下打回
      IsAuditBack: '0',
      verifyInfo: {},
      // 子集详情集合
      subDetail: [],
      infoType: 'edit',
      detailId: '',
      subDetailInfo: {},
      caseResource: null,
      subInfoChange: {}
    }
  },
  watch: {
    // 子集表格数据
    tableItemInfo: {
      handler: function (val, old) {
        if (val) {
          if (!Object.keys(val).length || this.$refs.doubtInfo.getFormInfo === undefined) return
          const operate = {
            creat: 'AddSubDetail',
            del: 'DeleteSubDetail',
            edit: 'EditSubDetail',
            view: 'ViewSubDetail'
          }[val.operateType]
          this[operate](val)
        }
      }
    }
  },
  computed: {
    // this.fieldId为tabs项id，10=医学评估
    // 按钮组文案
    tableBtnText() {
      return caseBtnOperate.get(this.status) || []
    },
    // 显示录入操作
    inputShow() {
      if (CENTER_STATUS[this.status] === 'DOUBT_INPUT') {
        return this.fieldId < 9
      } else if (CENTER_STATUS[this.status] === 'DRUG_EVALUATE') {
        return this.fieldId === 9
      } else {
        return false
      }
    },
    // 显示底部栏操作按钮组
    btnConfirm() {
      return ['DOUBT_INPUT', 'DOUBT_QC', 'DRUG_EVALUATE', 'DOUBT_CHECK'].includes(CENTER_STATUS[this.status])
    },
    ...mapGetters(['tableItemInfo'])
  },
  created() {
    this.status = Number(this.$route.query.state)
    this.caseId = this.$route.query.id
    this.caseResource = Number(this.$route.query.CaseResource)
    this.IsAuditBack = this.$route.query.IsAuditBack || '0'
    this.doubtForm = {
      pageState: this.status
    }
  },
  methods: {
    // 获取案例详情
    getCaseDetail(list, val = 'CASE_CONFIRM') {
      const { id, tipType } = list.find(el => el.type === val)
      this.fieldId = id
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
        if (this.fieldId === 9) {
          this.doubtForm.FieldList.push({ FieldName: 'Remark', FieldValue: res.Body.Remark, QuestionList: [] })
        }
        if (this.fieldId === 0) {
          this.doubtForm.FieldList.push({ FieldName: 'CaseNumber', FieldValue: res.Body.CaseNumber, QuestionList: [] })
        }
        this.subDetail = []
        if (tipType.length) this.getCaseSubDetail({ tipType, Type: id, ParentId: res.Body.Id })
      })
    },
    // 获取案例子集详情
    getCaseSubDetail(val) {
      const { tipType, Type, ParentId } = val
      this.subDetailInfo = deepClone({ ...val })
      this.subDetail = []
      tipType.forEach(async el => {
        // 在状态为怀疑、合并用药的情况下，用法用量无需获取数据
        if (el.name !== 'usageDosage') {
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
        }
      })
    },
    // 操作组方法
    async handleOperate(type) {
      const serveApi = {
        audit: auditCase,
        e2b: verifyCase,
        check: checkCase,
        evaluate: evaluateCase,
        saveCheck: applyQualityCheck
      }[type]
      const params = await this.getParams(type)
      const res = await serveApi(params)
      this.$message.success('提交成功！')
      if (type === 'e2b') {
        this.verifyInfo = { ...res.Body }
        return false
      }
      this.$router.replace({ name: 'CaseSummaryManage' })
    },
    // e2b校验面板
    handlePass() {
      const props = {
        dataInfo: this.verifyInfo
      }
      this.$dialog.invoke({
        title: '校验信息',
        width: '60vw',
        render: h =>
          h(VerifyInfo, {
            props
          })
      })
    },
    // 操作组入参
    async getParams(type) {
      // const info = await this.$refs.doubtInfo.getFormInfo('')
      if (type !== 'e2b') {
        await this.$refs.resultBox.formValidate()
      }
      const CaseId = this.caseId
      const resultInfo = { ...this.resultForm, ReceiverIds: this.resultForm.ReceiverIds.join(',') }
      const params = {
        audit: { CaseId, ...resultInfo },
        e2b: { CaseId },
        check: { CaseId, ...resultInfo },
        evaluate: { CaseId, ...resultInfo },
        saveCheck: { CaseId }
      }[type]
      const obj = {}
      for (const key in params) {
        if (params[key] !== '') obj[key] = params[key]
      }
      return obj
    },
    // 刷新数据
    receview() {
      this.$refs.doubtInfo.getCaseQuestionCount()
    },
    restoreData() {
      this.getCaseSubDetail(this.subDetailInfo)
    },
    // 提交录入
    async handleEnter() {
      const data = await this.getOperateParams('')
      const params = { ...data, Id: this.detailId }
      const res = {}
      delete params.FieldList
      for (const key in params) {
        if (params[key] !== '') res[key] = params[key]
      }
      await inputCaseCenter(res, doubtTabsList.get(params.type).state)
      this.$message.success('保存成功！')
      this.receview()
      this.$store.dispatch('summary/setTableItemInfo', {})
    },
    // 入参数据
    async getOperateParams(name) {
      const info = await this.$refs.doubtInfo.getFormInfo(name)
      const params = { ...info }
      if (info.type === -1) return this.$message.warning('不能为空！')
      delete params.FieldList
      for (const key in params) {
        const type = Object.prototype.toString.call(params[key])
        if (type === '[object Date]') {
          const year = params[key].getFullYear()
          let month = params[key].getMonth() + 1
          let day = params[key].getDate()
          if (month < 10) month = `0${month}`
          if (day < 10) day = `0${day}`
          params[key] = year + '-' + month + '-' + day
        }
      }
      return params
    },
    // 子集添加
    async AddSubDetail(val) {
      const data = await this.getOperateParams(val.subName)
      const params = { ...data, ParentId: this.detailId }
      for (const key in params) {
        if (key === 'IsUnexpected' && params[key] === '') params[key] = -1
      }
      await AddSubDetail(params, val.subType)
      this.$message.success('操作成功！')
      this.restoreData()
      this.$store.dispatch('summary/setTableItemInfo', {})
    },
    // 子集删除
    async DeleteSubDetail(val) {
      const params = { SubType: val.subType, Id: val.Id }
      await DeleteSubDetail(params, val.subType)
      this.$message.success('操作成功！')
      this.receview()
      this.$store.dispatch('summary/setTableItemInfo', {})
    },
    // 子集修改
    async EditSubDetail(val) {
      const data = await this.getOperateParams(val.subName)
      const params = { ...data, Id: val.Id }
      for (const key in params) {
        if (key === 'IsUnexpected' && params[key] === '') params[key] = -1
      }
      await ModifySubDetail(params, val.subType)
      this.$message.success('操作成功！')
      this.restoreData()
      this.$store.dispatch('summary/setTableItemInfo', {})
    },
    // 子集查看
    ViewSubDetail(val) {
      this.subInfoChange = { subFieldList: deepClone(val.FieldList), Id: val.id }
      if (['generalDosage', 'mergeDrug'].includes(val.subName)) this.subChildrenDetailView(val)
    },
    subChildrenDetailView(val) {
      const id = { generalDosage: 2, mergeDrug: 4 }[val.subName]
      const params = { Type: this.fieldId, ParentId: val.Id, SubType: id, CaseId: this.caseId }
      this.subDetail = this.subDetail
        .filter(el => el.SubType !== id)
        .map(el => {
          if (el.subName !== 'usageDosage' && el.SubList.length) {
            el.SubList.map(it => {
              it.cellName = ''
              if (it.Id === val.Id) it.cellName = 'edit'
              return it
            })
          }
          return el
        })
      getCaseSubDetail(params).then(res => {
        this.subDetail.push({
          ParentId: val.Id,
          SubType: id,
          subName: 'usageDosage',
          SubList: res.Body.SubList || []
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.operate {
  height: calc(100vh - 69px);
  overflow: hidden;
}
.btn-footer {
  background: #fff;
  margin-right: 10px;

  ::v-deep .el-card__body {
    padding: 0;
  }
}
.center-box {
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}
.step-main {
  height: calc(100vh - 150px);
}
</style>
