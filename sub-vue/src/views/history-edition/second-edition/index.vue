<template>
  <div class="">
    <div v-if="inputShowBtn" class="flex-row jus-end">
      <el-button type="primary" v-permission="['inputCaseCenter']" size="" @click="handleEnter">
        <span v-if="checkDataSave" class="el-icon-star-off"></span>
        <span>保存</span>
      </el-button>
    </div>
    <el-tabs v-model="active" @tab-click="handleClick" :before-leave="handleBefore">
      <el-tab-pane v-for="item in tabList" :key="item.id" :label="item.label" :name="item.type">
        <div slot="label">
          <span>{{ item.label }}</span>
          <span v-if="item.questionCount" class="ml5">({{ item.questionCount }})</span>
        </div>
      </el-tab-pane>
    </el-tabs>

    <component
      :is="isComModal"
      ref="comModalEl"
      :infoType="infoType"
      :caseId="caseId"
      :active="active"
      :caseResource="caseResource"
      :status="status"
      :IsAuditBack="IsAuditBack"
      @isCheckSave="val => (checkDataSave = val)"
      @refreshData="getCaseQuestionCount"
    />
  </div>
</template>

<script>
import BadReaction from './components/badReaction.vue'
import Discernment from './components/discernment.vue'
import Evaluate from './components/evaluate.vue'
import Gestation from './components/gestation.vue'
import Inspect from './components/inspect.vue'
import Medication from './components/medication.vue'
import Merge from './components/merge.vue'
import Patient from './components/patient.vue'
import Reporter from './components/reporter.vue'
import Sender from './components/sender.vue'

import { inputCaseCenter } from '@/api/case/summary'
import { getCaseQuestionCount } from '@/api/case/question'
import { doubtTabsList } from '../../enum/doubt'
// import { deepClone } from '@/utils'
export default {
  name: 'operate',
  props: {
    // 操作状态：view-查看，edit-编辑
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
    IsAuditBack: String,
    caseResource: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      tabList: [],
      active: 'CASE_CONFIRM',
      fieldId: '',
      checkDataSave: false
    }
  },
  computed: {
    isComModal() {
      return {
        CASE_CONFIRM: Discernment,
        PATIENT_INFO: Patient,
        DOUBT_DRUG: Medication,
        MERGE_DRUG: Merge,
        REACTION_INFO: BadReaction,
        CHECK_INFO: Inspect,
        GRAVIDITY_INFO: Gestation,
        REPORT_USER: Reporter,
        SEND_USER: Sender,
        MEDICAL_EVALUATE: Evaluate
      }[this.active]
    },
    inputShowBtn() {
      if (this.status === 0) {
        return this.fieldId < 9
      } else if (this.status === 2) {
        return this.fieldId === 9
      } else {
        return false
      }
    }
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
      this.tabList = list.length ? arr.map(el => ({ ...el, questionCount: list[el.id].QuestionCount })) : arr
      this.fieldId = this.tabList.find(el => el.type === this.active).id
    },
    // 获取案例质疑数量
    getCaseQuestionCount() {
      getCaseQuestionCount({ State: 0, CaseId: this.caseId }).then(res => {
        this.getBindSelect(res.Body.CountList || [])
      })
    },
    // tab切换
    handleClick(val) {
      // this.getCaseDetail()
      this.fieldId = Number(val.index)
      this.$emit('tabChange', Number(val.index))
    },
    // 入参数据
    async getOperateParams(name) {
      const info = await this.$refs.comModalEl.getFormInfo(name)
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
    // 提交录入
    async handleEnter() {
      const data = await this.getOperateParams('')
      const params = { ...data }
      const res = {}
      delete params.FieldList
      for (const key in params) {
        if (params[key] !== '' && params[key] !== null) res[key] = params[key]
      }
      await inputCaseCenter(res, doubtTabsList.get(params.type).state)
      this.$message.success('保存成功！')
      this.$refs.comModalEl.getCaseDetail()
      this.$store.dispatch('summary/setTableItemInfo', {})
    },
    // 判断是否需要弹窗提醒用户保存
    handleBefore(val, old) {
      if (val && old) {
        if (this.$refs.comModalEl.changeNum > 1) {
          return this.returnTip()
        } else {
          return true
        }
      }
    },
    returnTip() {
      return new Promise((resolve, reject) => {
        this.$confirm('该页面内容未保存，若是切换则内容会流失，确定要切换页面吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            resolve()
          })
          .catch(() => {
            reject(new Error('err'))
          })
      })
    }
  }
}
</script>

<style lang="" scoped></style>
