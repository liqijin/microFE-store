<template>
  <div class="">
    <div class="input-temp" v-html="inputTemp"></div>
    <div class="mt10 mb20">H.1 是否使用此模板?</div>
    <div class="flex-row jus-end">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </div>
  </div>
</template>

<script>
import { getNarrativeInfo } from '@/api/case/summary'
export default {
  name: 'narrative-temp',
  props: {
    CaseId: {
      type: String,
      default: ''
    }
  },
  components: {},
  data() {
    return {
      inputTemp: ''
    }
  },
  created() {
    this.getNarrativeInfo()
  },
  methods: {
    getNarrativeInfo() {
      getNarrativeInfo({ CaseId: this.CaseId }).then(res => {
        this.inputTemp = res.Body.NarrativeInfo || ''
      })
    },
    handleSubmit() {
      this.$emit('resultInfo', this.inputTemp)
      this.$dialog.hide()
    },
    handleClose() {
      this.$dialog.hide()
    }
  }
}
</script>

<style lang="scss" scoped>
.input-temp {
  min-height: 250px;
  width: 100%;
  background: #f3f3f3;
  border: 1px solid #b3b3b3;
  padding: 10px;
}
</style>
