<template>
  <div class="flex-row ag-start">
    <div class="box-first flex-1 mr10">
      <sd-title title="MedDRA数据" />
      <el-card>
        <TreeNode :treeList="treeList" treeType="list" @checkNode="handleNode" />
      </el-card>
    </div>
    <div class="box-second flex-col flex-1 jus-bet">
      <sd-title title="搜索选项" />
      <el-card class="ml10 mr10 flex-1">
        <el-form :model="searchData">
          <el-form-item label="">
            <el-checkbox-group v-model="searchData.checkBox" class="flex-row jus-cen">
              <el-checkbox v-for="item in treeLevelState" :key="item.value" :label="item.type">{{
                item.label
              }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="">
            <div class="flex-row ag-cen">
              <el-input
                v-model="searchData.SearchKey"
                @keyup.enter.native="handleSearch"
                placeholder="键入关键字"
                class="mr10"
              />
              <el-button type="primary" @click="handleSearch">搜索</el-button>
            </div>
          </el-form-item>
        </el-form>
        <div class="tabs-list">
          <!-- <sd-title title="查询结果" /> -->
          <el-tabs v-model="active" type="" @tab-click="handleClick">
            <el-tab-pane v-for="item in tabsList" :key="item.value" :label="item.label" :name="item.type" />
          </el-tabs>
          <TreeNode :treeList="selectList" :treeType="active" @checkNode="handleNode" />
        </div>
      </el-card>
    </div>
    <div class="box-third flex-1 ml10">
      <sd-title title="详细信息" />
      <el-card v-if="Object.keys(nodeData).length" class="select-item">
        <el-form :model="nodeData" disabled>
          <el-form-item :label="`${terms}术语:`">
            <el-input v-model="nodeData.TypeName" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="MedDRA名称:">
            <el-input v-model="nodeData.Name" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="MedDRA编码:">
            <el-input v-model="nodeData.Code" placeholder=""></el-input>
          </el-form-item>
          <el-form-item v-if="nodeData.IsActiveText" label="是否现行:">
            <el-input v-model="nodeData.IsActiveText" placeholder=""></el-input>
          </el-form-item>
        </el-form>
        <div class="flex-row jus-end">
          <el-button type="primary" @click="handleConfirm">确认</el-button>
        </div>
      </el-card>
      <sd-title title="历史记录" />
      <el-card v-if="historyList.length" class="history-list">
        <div class="flex-col">
          <el-tag
            v-for="item in historyList"
            :key="item.MeddraCode"
            class="cur-pot mb5 mr5"
            @click="handleNode(item, 'tag')"
            >{{ item.MeddraName }} -- {{ item.Version }}</el-tag
          >
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { InputMeddraHistory, GetMeddraQueryList } from '@/api/case/meddra'
import { treeLevelState } from '../map'
import TreeNode from './treeNode.vue'
export default {
  name: 'dictionaryCenter',
  props: {
    // 树形列表数据
    treeList: {
      type: Array,
      default: () => ({})
    },
    // 历史列表
    historyList: {
      type: Array,
      default: () => ({})
    },
    // 版本名称
    VersionName: {
      type: String,
      default: ''
    },
    // 版本id
    VersionId: {
      type: String,
      default: ''
    },
    // 表单回显集合
    relate: {
      type: Array,
      default: () => []
    }
  },
  components: { TreeNode },
  data() {
    return {
      treeLevelState,
      searchList: {}, // 搜索结果列表
      active: 'soc',
      nodeData: {}, // 选中项
      // 搜索入参
      searchData: {
        checkBox: ['soc', 'hlgt', 'hlt', 'pt', 'llt'],
        SearchKey: ''
      },
      // 搜索meddra列表
      selectList: [],
      checkType: '',
      terms: ''
    }
  },
  computed: {
    tabsList() {
      if (!Object.keys(this.searchList).length) return treeLevelState
      return treeLevelState.filter(el => this.searchList[el.listName].length)
    }
  },
  methods: {
    // 选择meddra项
    handleNode(val, type) {
      this.terms = treeLevelState.find(el => el.label === val.TypeName).name
      this.checkType = type
      if (type === 'tag') {
        const { Version, TypeName, MeddraName, MeddraCode } = val
        this.$emit('update:VersionName', Version)
        return (this.nodeData = {
          Name: MeddraName,
          Code: MeddraCode,
          TypeName
        })
      }
      this.nodeData = { ...val }
      if (val.TypeName === 'LLT') this.nodeData.IsActiveText = val.IsActive ? '是' : '否'
    },
    // 切换搜索结果tabs
    handleClick(val) {
      this.active = val.name
      const str = treeLevelState.find(el => el.type === this.active).listName
      this.selectList = this.searchList[str]
      if (this.active === 'llt') {
        this.selectList = this.selectList.map(el => {
          return { ...el, leaf: true }
        })
      }
    },
    // 搜索
    handleSearch() {
      const { checkBox, SearchKey } = this.searchData
      const params = {
        VersionId: this.VersionId,
        SearchKey
      }
      checkBox.forEach(el => {
        const key = el.replace(el[0], el[0].toLocaleUpperCase())
        params[`Query${key}`] = true
      })
      const bool = SearchKey === '' || !checkBox.length
      if (this.VersionId === '' || bool) return (this.searchList = {})
      GetMeddraQueryList(params).then(res => {
        this.searchList = res.Body
        const list = treeLevelState.filter(el => this.searchList[el.listName].length)
        if (!list.length) return
        const str = list[0].listName
        this.active = list[0].type
        this.selectList = this.searchList[str]
      })
    },
    // 确认选择
    async handleConfirm() {
      if (!Object.keys(this.nodeData).length) return
      const result = {
        [`${this.relate[0]}`]: this.VersionName,
        [`${this.relate[1]}`]: this.nodeData.Code
      }
      if (this.relate.length === 3) result[`${this.relate[2]}`] = this.nodeData.Name
      this.$emit('resultData', { ...result })
      const { Code, Name, TypeName } = this.nodeData
      const params = {
        TypeName,
        MeddraCode: Code,
        MeddraName: Name,
        VersionId: this.VersionId
      }
      this.handleClose()
      if (this.checkType === 'tag') return
      await InputMeddraHistory(params)
    },
    // 关闭
    handleClose() {
      this.$dialog.hide()
    }
  }
}
</script>

<style lang="scss">
.box-second,
.box-first,
.box-third {
  max-width: calc(100% / 3 - 20px);
  overflow: hidden;
}
.line {
  width: 100%;
  height: 0;
  padding: 1px;
  border-radius: 1px;
  border: 1px solid #eee;
  background: #eee;
}
.line-col {
  width: 2px;
  min-height: 100%;
  background: #eee;
}
.box-third .el-input .el-input__inner {
  background: #fff;
  border-radius: 0;
  border-width: 0;
  border-bottom-width: 1px;
  text-align: center;
  outline: none;
}
</style>
