<template>
  <div class="">
    <el-table :data="doubtList">
      <el-table-column label="质疑内容" prop="QuestionContent"></el-table-column>
      <el-table-column label="质疑人" prop="QuestionUser"></el-table-column>
      <el-table-column label="质疑时间" prop="QuestionTime"></el-table-column>
      <el-table-column v-if="itemType !== 'back'" label="反馈内容" prop="FeedbackContent"></el-table-column>
      <el-table-column v-if="itemType !== 'back'" label="反馈人" prop="FeedbackUser"></el-table-column>
      <el-table-column v-if="itemType !== 'back'" label="反馈时间" prop="FeedbackTime"></el-table-column>
      <el-table-column label="状态" prop="State">
        <template #default="{ row }">
          <sd-state
            :stateText="infoStateFilter(row.State, 'text')"
            :stateType="infoStateFilter(row.State, 'type')"
          ></sd-state>
        </template>
      </el-table-column>
      <el-table-column v-if="itemType === 'back'" label="操作">
        <template #default="{ row }">
          <el-button v-if="!row.State" type="text" @click="handleFeedBack(row)">反馈</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex-row jus-end mt10">
      <el-button type="" @click="handleClose">取消</el-button>
    </div>
  </div>
</template>

<script>
import DoubtForm from './doubt-item.vue'
import { getFieldQuestionList } from '@/api/case/question'
import { stateFilter } from '@/utils'
export default {
  name: 'record-item',
  props: {
    // 面板显示状态，back-反馈，doubt-质疑，record-质疑列表
    itemType: {
      type: String,
      default: ''
    },
    // 表单项数据
    fieldItem: {
      type: Object,
      default: () => {}
    },
    CaseId: String
  },
  data() {
    return {
      doubtList: [],
      infoStateList: [
        {
          label: '待反馈',
          type: 'info',
          value: 0
        },
        {
          label: '已反馈',
          type: 'success',
          value: 1
        }
      ]
    }
  },
  computed: {
    infoStateFilter() {
      return stateFilter(this.infoStateList)
    }
  },
  created() {
    this.getFieldQuestionList()
  },
  methods: {
    // 获取质疑列表
    getFieldQuestionList() {
      if (this.fieldItem?.ElementId && this.fieldItem?.BusinessId) {
        const params = {
          CaseId: this.CaseId,
          ElementId: this.fieldItem.ElementId,
          BusinessId: this.fieldItem.BusinessId
        }
        getFieldQuestionList(params).then(res => {
          this.doubtList = res.Body.QuestionList || []
        })
      }
    },
    handleClose() {
      this.$dialog.hide()
    },
    // 打开反馈弹窗
    handleFeedBack(row) {
      const props = {
        fieldItem: { ...this.fieldItem, ...row },
        itemType: 'back',
        CaseId: this.CaseId
      }
      this.$store.dispatch('app/setIsClose', false)
      this.$dialog.invoke({
        title: '反馈',
        width: '60vw',
        render: h =>
          h(DoubtForm, {
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
