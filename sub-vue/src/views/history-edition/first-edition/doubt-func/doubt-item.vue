<template>
  <div class="">
    <el-form ref="caseForm" :model="form" :rules="fieldItemRules" label-width="110px" class="medium-form">
      <el-form-item label="" prop="">
        <div class="flex-row jus-bet flex-wrap">
          <span class="mr20">{{ check }}信息：{{ fieldItem.fieldDesc }}---{{ fieldItem.label }}</span>
          <span> 阶段：{{ stateText }} <i class="mr10" /> </span>
          <span v-if="this.itemType !== 'doubt'" class=""
            >填写人/日期: {{ fieldItem.QuestionUser }} {{ fieldItem.QuestionTime }}</span
          >
        </div>
      </el-form-item>
      <el-form-item :label="`${check}内容`" prop="Content">
        <el-input
          v-model="form.Content"
          type="textarea"
          placeholder=""
          maxlength="200"
          max="200"
          show-word-limit
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="flex-row jus-end">
      <el-button type="primary" @click="handleSubmit">提交</el-button>
      <el-button @click="handleClose">取消</el-button>
    </div>
  </div>
</template>

<script>
import RecordItem from './record-item.vue'
import { applyQuestion } from '@/api/case/question'
import { summaryState } from '../../../enum'
export default {
  name: 'doubt-item',
  props: {
    // 表单项数据
    fieldItem: {
      type: Object,
      default: () => {}
    },
    // 面板显示状态，back-反馈，doubt-质疑，record-质疑列表
    itemType: {
      type: String,
      default: ''
    },
    // 案例id
    CaseId: String
  },
  data() {
    return {
      form: { Content: '' },
      fieldItemRules: {
        Content: [{ required: true, message: '请填写内容', trigger: 'blur' }]
      },
      check: { doubt: '质疑', back: '反馈' }[this.itemType]
    }
  },
  computed: {
    stateText() {
      const { status } = this.fieldItem
      if (status >= 0 && status < 6) return summaryState.find(el => el.value === status).label
      return ''
    }
  },
  created() {},
  methods: {
    handleSubmit() {
      const params = {
        doubt: {
          Content: this.form.Content,
          BusinessId: this.fieldItem.BusinessId,
          CaseId: this.CaseId,
          ElementId: this.fieldItem.ElementId,
          Type: this.fieldItem.tabId
        },
        back: { QuestionId: this.fieldItem.QuestionId, Content: this.form.Content }
      }[this.itemType]
      this.$refs.caseForm.validate().then(async res => {
        await applyQuestion(params, this.itemType)
        this.$message.success('提交成功！')
        this.$emit('resultDoubt')
        this.$dialog.hide()
      })
    },
    handleClose() {
      if (this.itemType === 'doubt') return this.$dialog.hide()
      this.handleRecord()
    },
    // 打开反馈面板
    handleRecord() {
      const props = {
        fieldItem: { ...this.fieldItem },
        itemType: 'back',
        CaseId: this.CaseId
      }
      this.$dialog.invoke({
        title: '反馈',
        width: '60vw',
        render: h =>
          h(RecordItem, {
            props,
            on: {
              resultDoubt: () => {
                this.$store.dispatch('app/setIsClose', true)
              }
            }
          })
      })
    }
  }
}
</script>

<style lang="" scoped></style>
