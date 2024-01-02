<template>
  <el-form-item
    v-if="isToggle"
    :ref="`field${field.name}`"
    :label="field.label"
    :prop="field.prop"
    :rules="field.rules"
    class="custom-label"
  >
    <div slot="label" class="flex-row ag-cen ml5">
      <div class="break-line">
        {{ field.label }} <span class="ml5" style="color: #a5a5a5">{{ field.code }}</span>
      </div>
      <span v-if="field.QuestionList && field.QuestionList.length" class="angle ml5"
        ><i class="el-icon-star-on"
      /></span>
      <span
        v-if="doubtInfo.pageState === 0 && field.name === 'ResultInformation'"
        class="temp-icon ml10"
        @click="handleResultTemp"
      >
        <svg-icon icon-class="coin" />
      </span>
    </div>
    <div class="flex-row ag-cen">
      <div v-if="field.type === 'select'" class="flex-1">
        <el-select
          v-model="doubtInfo[field.name]"
          style="width: 100%"
          :multiple="field.multiple"
          filterable
          clearable
          :placeholder="field.placeholder"
          :disabled="isDisabledFunc"
          @change="handleFidle"
        >
          <el-option v-for="(item, ss) in field.option" :key="ss" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div v-else-if="field.type === 'radio'" class="">
        <el-radio-group v-model="doubtInfo[field.name]" :disabled="isDisabledFunc" @change="handleFidle">
          <el-radio v-for="(item, ss) in field.option" :key="ss" :label="item.type">{{ item.name }}</el-radio>
        </el-radio-group>
      </div>
      <div v-else-if="field.type === 'time'" class="flex-1">
        <el-date-picker
          v-model="doubtInfo[field.name]"
          style="width: 100%"
          :type="field.dataType"
          :placeholder="field.placeholder"
          :picker-options="{
            disabledDate: diabledDateFunc
          }"
          value-format="yyyy-MM-dd"
          :disabled="isDisabledFunc"
          @change="handleFidle"
        />
      </div>
      <div v-else-if="field.type === 'radioFile'" class="">
        <div class="flex-row ag-cen">
          <el-radio-group v-model="doubtInfo[field.name]" :disabled="isDisabledFunc" @change="handleFidle" class="mr10">
            <el-radio v-for="(item, ss) in field.option" :key="ss" :label="item.type">{{ item.name }}</el-radio>
          </el-radio-group>
          <sd-upload
            v-if="doubtInfo[field.name] === 1"
            ref="uploadProduceFile"
            list-type="text"
            :multiple="true"
            :defaultFileList="defaultFileList"
            :disabled="isDisabledFunc"
            @success="handleSuccess(field)"
            @remove="handleRemove"
          >
            <el-button plain>附件上传</el-button>
          </sd-upload>
        </div>
      </div>
      <div
        v-else-if="['text', 'textarea'].includes(field.type)"
        v-outSide="() => (isTrigger = false)"
        class="flex-1 product-relevance"
      >
        <el-input
          v-model.trim="doubtInfo[field.name]"
          :type="field.type"
          :placeholder="field.placeholder"
          :show-word-limit="field.fieldLimit"
          :maxlength="field.maxLen"
          :disabled="isDisabledFunc"
          @blur="handleFidle"
          @focus="handleMedDraData"
          @input="handleSearchProduct"
          @keyup.enter.native="handleSearchProduct"
        />
        <div v-if="productList.length && isTrigger" class="product-list">
          <ul>
            <li v-for="(dl, i) in productList" :key="i" @click="handleCheckSel(dl)">
              {{ dl[field.name] }}
            </li>
          </ul>
        </div>
      </div>
      <div v-else-if="field.type === 'number'" v-outSide="() => (isTrigger = false)" class="flex-1 product-relevance">
        <el-input
          v-model.number="doubtInfo[field.name]"
          v-decimal.zz
          :placeholder="field.placeholder"
          :show-word-limit="field.fieldLimit"
          :maxlength="field.maxLen"
          :disabled="isDisabledFunc"
          @blur="handleFidle"
          @focus="handleMedDraData"
          @input="handleSearchProduct"
          @keyup.enter.native="handleSearchProduct"
        ></el-input>
        <div v-if="productList.length && isTrigger" class="product-list">
          <ul>
            <li v-for="(dl, i) in productList" :key="i" @click="handleCheckSel(dl)">
              {{ dl[field.name] }}
            </li>
          </ul>
        </div>
      </div>
      <el-dropdown v-if="isShowOperate" trigger="click" class="ml5" @command="handleCommand">
        <span class="el-dropdown-link">
          <i class="el-icon-more rotate"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="doubt" icon="">
            <el-button v-if="questionBool" v-permission="['ApplyQuestion']" type="text">质疑</el-button>
          </el-dropdown-item>
          <el-dropdown-item command="back" icon="">
            <el-button v-if="field.feedBack" v-permission="['FeedbackQuestion']" type="text">反馈</el-button>
          </el-dropdown-item>
          <el-dropdown-item command="record" icon="">
            <el-button type="text">质疑记录</el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-form-item>
</template>

<script>
import DataDictionary from '../data-dictionary'
import NarrativeTemp from './narrative-temp.vue'
// import { formItemListMap } from '../../../enum/doubt'
import { deepClone, formatFileList } from '@/utils'
import { getProductSelect } from '@/api/product/list'
export default {
  name: 'CommonFormItem',
  props: {
    // form-item文案数据
    field: {
      type: Object,
      default: () => ({})
    },
    // 表单绑定数据
    doubtInfo: {
      type: Object,
      default: () => ({})
    },
    // 显示状态：view-禁用，edit-启用
    infoType: String,
    caseId: String,
    caseResource: {
      type: Number,
      default: 1
    },
    notEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      productList: [],
      isTrigger: false,
      isGender: false
    }
  },
  watch: {
    field: {
      handler: function (val, old) {
        if (val) {
          if (this.field.name === 'ParentsGender') {
            this.$nextTick(() => this.handleRelateGender())
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    // 是否显示当前表单项
    isToggle() {
      if (this.field.isSelect) {
        return this.doubtInfo[this.field.isSelect] === this.field.select
      }
      return true
    },
    isShowOperate() {
      const list = [
        'DoubtDetailId',
        'BadReactionDetailId',
        'MeddraName',
        'DrugMeddraName',
        'ResultType',
        'Remark',
        'CaseNumber',
        'FeedbackCode'
      ]
      return (
        this.infoType !== 'view' &&
        [0, 1, 2, 3].includes(this.doubtInfo.pageState) &&
        this.field.type !== '' &&
        !list.includes(this.field.name)
      )
    },
    // 显示反馈操作
    feedBack() {
      if (this.doubtInfo.pageState === 0) {
        return true
      } else if (this.doubtInfo.pageState === 2) {
        if (this.doubtInfo.active === 'MEDICAL_EVALUATE') {
          const len = this.field.QuestionList && this.field.QuestionList.length
          const bool = this.doubtInfo.IsAuditBack === '1' || len
          return bool
        }
        return false
      } else {
        return false
      }
    },
    // 显示质疑操作
    questionBool() {
      if (this.field.QuestionList && this.field.QuestionList.length) return false
      if ([1, 3].includes(this.doubtInfo.pageState)) {
        return true
      } else if (this.doubtInfo.pageState === 2) {
        if (this.doubtInfo.active === 'MEDICAL_EVALUATE') {
          return false
        } else {
          return this.doubtInfo.IsAuditBack === '0'
        }
      } else {
        return false
      }
    },
    defaultFileList() {
      if (this.doubtInfo.FileList) {
        return this.doubtInfo.FileList.length ? formatFileList(this.doubtInfo.FileList) : []
      } else {
        return []
      }
    },
    isDisabledFunc() {
      if (this.field.disabled || this.notEdit || this.isGender) return true
      return this.caseResource === 0 && this.field.isAdr
    }
  },
  methods: {
    // 时间选择器控价禁用方法
    diabledDateFunc(dt) {
      return dt.getTime() > Date.now()
    },
    handleSearchProduct() {
      if ([0, 1, 2].includes(this.field.productRelevance)) {
        this.isTrigger = true
        const params = {
          SearchType: this.field.productRelevance,
          SearchKey: this.doubtInfo[this.field.name],
          CompanyId: this.$_gMixin_companyId || ''
        }
        getProductSelect(params).then(res => {
          this.productList =
            res.Body.ProductList.map(el => {
              return { ...el, ReportDrugName: el.DrugName }
            }) || []
          // this.productList.push({
          //   ApprovalNumber: '批准文号',
          //   DrugGenericName: '药品通用名称',
          //   DrugName: '商品名',
          //   ReportDrugName: '商品名',
          //   DrugSpec: 123,
          //   DrugSpecUnit: '规格单位',
          //   HolderName: '上市许可持有人'
          // })
          this.isTrigger = true
        })
      }
    },
    handleCheckSel(val) {
      this.isTrigger = false
      this.$emit('update:doubtInfo', { ...this.doubtInfo, ...val })
      this.$parent.clearValidate(this.field.prop)
    },
    // 更新表单数据
    handleFidle(e) {
      let value = null
      if (e === '' || e === null) return
      const type = Object.prototype.toString.call(e)
      if (['[object Date]', '[object Array]'].includes(type)) {
        value = e
      } else {
        value = typeof e === 'object' ? e.target.value : e
      }
      this.$refs[`field${this.field.name}`].clearValidate()
      this.$emit('update:doubtInfo', { ...this.setDrugEffectFeature(value) })
      if (this.field.respondTime && this.field.respondTime.length) this.handleRespondTime(e)
      if (this.field.name === 'ParentsGender') this.handleRelateGender()
    },
    handleRelateGender() {
      const list = this.$refs[`field${this.field.name}`].$parent.$parent.$children
      this.field.relateGender.forEach(el => {
        list.forEach(it => {
          if (it?.field?.name === el) it._data.isGender = this.doubtInfo[this.field.name] === 1
        })
      })
    },
    handleRespondTime(e) {
      const start = this.doubtInfo[this.field.respondTime[0]]
      const end = this.doubtInfo[this.field.respondTime[1]]
      if (![null, '', 0].includes(start) && ![null, '', 0].includes(end)) {
        const startTime = new Date(start).getTime()
        const endTime = new Date(end).getTime()
        if (startTime > endTime) {
          this.$nextTick(() => {
            this.$emit('update:doubtInfo', { ...this.doubtInfo, [`${this.field.name}`]: '' })
          })
          this.$message.warning('结束时间不能小于开始时间')
        } else {
          this.$emit('update:doubtInfo', { ...this.doubtInfo, [`${this.field.name}`]: e })
        }
        if (this.field.respondField && this.field.respondField.length) {
          const dayVal = this.field.respondField[0]
          const unitVal = this.field.respondField[1]
          this.$emit('update:doubtInfo', {
            ...this.doubtInfo,
            [`${dayVal}`]: startTime > endTime ? '' : (endTime - startTime) / (24 * 60 * 60 * 1000) + 1,
            [`${unitVal}`]: startTime > endTime ? '' : '天'
          })
        }
      }
    },
    setDrugEffectFeature(value) {
      const obj = deepClone({ ...this.doubtInfo })
      // 合并用药-药物作用特征选择未用药时，清空其它选项内容
      // if (this.field.name === 'DrugEffectFeatures' && Number(value) === 4) {
      //   this.doubtInfo.FieldList.forEach(el => {
      //     formItemListMap[this.doubtInfo.active].forEach(item => {
      //       if (item.dataName === el.FieldName) obj[item.name] = ''
      //     })
      //   })
      // }
      obj[`${this.field.name}`] = value
      return obj
    },
    // 打开medDRA弹窗
    handleMedDraData() {
      if (!this.field.isPanel) return false
      const props = {
        relate: this.field.relate
      }
      this.$dialog.invoke({
        title: 'MedDRA字典',
        width: '80vw',
        render: h =>
          h(DataDictionary, {
            props,
            on: {
              resultData: res => {
                this.$emit('update:doubtInfo', { ...this.doubtInfo, ...res })
                for (const key in res) this.$parent.clearValidate(key)
              }
            }
          })
      })
    },
    // 字段质疑、反馈、反馈记录
    handleCommand(type) {
      this.$emit('doubt', { ...this.field }, type)
    },
    // 添加文件成功展示
    handleSuccess() {
      const FileList = this.$refs.uploadProduceFile.getUploadFileNameAndIdList()
      const SenderFileName = FileList.map(el => el.FileName).join(',')
      this.$emit('update:doubtInfo', { ...this.doubtInfo, FileList, SenderFileName })
    },
    handleRemove(file) {
      const FileList = this.doubtInfo.FileList.map(el => el)
      FileList.forEach((item, index) => {
        if (item.ResourceId === file.id) {
          FileList.splice(index, 1)
        }
      })
      this.$emit('update:doubtInfo', { ...this.doubtInfo, FileList })
    },
    handleResultTemp() {
      const props = { CaseId: this.caseId }
      this.$dialog.invoke({
        title: '导入信息',
        width: '60vw',
        render: h =>
          h(NarrativeTemp, {
            props,
            on: {
              resultInfo: res => this.$emit('update:doubtInfo', { ...this.doubtInfo, [`${this.field.name}`]: res })
            }
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  cursor: pointer;
}
.angle {
  color: #f56c6c;
}
.break-line {
  word-break: break-all;
  word-wrap: break-word;
  line-break: anywhere;
  max-width: 100%;
}
.product-relevance {
  position: relative;
}
.product-list {
  position: absolute;
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  background: #fff;
  border-radius: 4px;
  z-index: 9;
  top: 40px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  & li {
    padding: 5px 10px;
    cursor: pointer;
    &:hover {
      background: #f5f7fa;
    }
  }
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.temp-icon {
  cursor: pointer;
}
</style>
