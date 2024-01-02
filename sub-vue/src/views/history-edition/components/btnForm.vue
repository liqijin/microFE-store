<template>
  <div>
    <el-form
      ref="resultForm"
      :model="resultForm"
      :rules="resultRules"
      size="small"
      class="flex-row ag-cen jus-bet"
      label-position="left"
    >
      <el-form-item v-if="showPassed" label="是否通过:" prop="Passed" class="mr10 flex-row" style="margin-bottom: 0">
        <el-radio-group v-model="resultForm.Passed">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-if="isDoubtCheck"
        label="质疑接收人:"
        prop="ReceiverIds"
        class="flex-row"
        style="margin-bottom: 0"
      >
        <el-cascader
          :options="personList"
          v-model="resultForm.ReceiverIds"
          :show-all-levels="false"
          clearable
          :props="{ label: 'name', value: 'id', multiple: true, checkStrictly: true, emitPath: false }"
          filterable
          style="width: 270px"
        ></el-cascader>
      </el-form-item>
      <!-- <el-form-item v-if="showOperate" label="操作人:" prop="OperatorId" class="flex-row" style="margin-bottom: 0">
        <el-cascader
          :options="personList"
          v-model="resultForm.OperatorId"
          :props="{ label: 'name', value: 'id', checkStrictly: true, emitPath: false }"
          filterable
          style="width: 100%"
        ></el-cascader>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
import { CENTER_STATUS } from '../../enum'
import { translateDataToTree } from '@/utils'
import { getDepartmentSelect } from '@/api/system/department'
export default {
  name: 'btnForm',
  props: {
    // 表单绑定数据
    resultForm: {
      type: Object,
      default: () => ({})
    },
    // 案例状态
    status: Number,
    // 已选中tabs项
    fieldId: Number
  },
  components: {},
  data() {
    return {
      personList: [],
      resultRules: {
        Passed: [{ required: true, message: '请选择通过状态', trigger: 'change' }],
        OperatorId: [{ required: true, message: '请选择操作人', trigger: 'change' }],
        ReceiverIds: [{ required: true, message: '请选择操作人', trigger: 'change' }]
      }
    }
  },
  computed: {
    // 显示通过/未通过
    showPassed() {
      if (CENTER_STATUS[this.status] === 'DRUG_EVALUATE') return !(this.fieldId < 9)
      return ['DOUBT_QC', 'DOUBT_CHECK'].some(el => el === CENTER_STATUS[this.status])
    },
    // 显示操作人下拉
    showOperate() {
      if (CENTER_STATUS[this.status] === 'DOUBT_CHECK') return false
      // if (CENTER_STATUS[this.status] === 'DRUG_EVALUATE') return !(this.fieldId < 9)
      if (CENTER_STATUS[this.status] === 'DOUBT_INPUT') {
        return true
      } else {
        if (CENTER_STATUS[this.status] === 'DRUG_EVALUATE') {
          return this.resultForm.Passed && !(this.fieldId < 9)
        }
        return this.resultForm.Passed
      }
    },
    // 显示质疑操作人下拉
    isDoubtCheck() {
      if (this.resultForm.Passed === false) {
        return ['DOUBT_QC', 'DRUG_EVALUATE', 'DOUBT_CHECK'].includes(CENTER_STATUS[this.status])
      }
      return false
    }
  },
  created() {
    this.getDepartmentSelect()
  },
  methods: {
    // 获取操作人列表
    getDepartmentSelect() {
      getDepartmentSelect({ CompanyId: this.$_gMixin_companyId }).then(res => {
        const data = res.Body.DepartmentList || []
        const newOrgList = data.map(item => {
          const children = item.UserList.map(user => {
            return {
              id: user.UserId,
              name: user.UserName
            }
          })
          return {
            id: item.DepartmentId,
            parentId: item.ParentId,
            name: item.DepartmentName,
            sort: item.Sort,
            disabled: true,
            children
          }
        })
        this.personList = translateDataToTree(newOrgList, 'parentId', 'id')
      })
    },
    formValidate() {
      return new Promise((resolve, reject) => {
        this.$refs.resultForm
          .validate()
          .then(() => resolve(true))
          .catch(err => reject(err))
      })
    }
  }
}
</script>

<style lang="" scoped></style>
