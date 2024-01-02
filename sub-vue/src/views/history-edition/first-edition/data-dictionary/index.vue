<template>
  <div>
    <div class="header-box flex-row ag-cen jus-bet">
      <div class="version flex-row ag-cen mr10">
        <span class="mr5">版本选择:</span>
        <el-select v-model="VersionId" placeholder="" @change="handleChange">
          <el-option
            v-for="item in versionList"
            :key="item.VersionId"
            :label="item.VersionNumber"
            :value="item.VersionId"
          >
            <span class="mr10">{{ item.VersionNumber }}</span>
            <span class="">{{ item.ReleaseInfo }}</span>
          </el-option>
        </el-select>
      </div>
      <div class="status-api flex-row ag-cen">
        <el-tag :type="infoStateFilter(apiInfo.State, 'type')">{{ infoStateFilter(apiInfo.State, 'text') }}</el-tag>
        <span class="ml10">{{ authState[apiInfo.AuthState] }}/</span>
        <span>{{ apiInfo.Tips }}</span>
      </div>
    </div>
    <div class="line mt10 mb10" />
    <DictionaryCenter
      :VersionName.sync="Version"
      :VersionId="VersionId"
      :treeList="treeList"
      :historyList="historyList"
      :relate="relate"
      @resultData="res => $emit('resultData', { ...res })"
    />
    <div class="mt10 flex-row jus-end">
      <el-button type="" @click="handleClose">关闭</el-button>
    </div>
  </div>
</template>

<script>
import DictionaryCenter from './component/mainCenter.vue'

import { getMedDraApiState, GetMeddraVersionList, GetMeddraList, GetMeddraHistoryList } from '@/api/case/meddra'
import { apiState, authState } from './map'
import { stateFilter } from '@/utils'
export default {
  name: 'dataDictionary',
  props: {
    // 表单回显集合
    relate: {
      type: Array,
      default: () => []
    }
  },
  components: { DictionaryCenter },
  data() {
    return {
      VersionId: '',
      Version: '',
      apiInfo: {}, // 接口信息
      apiState,
      authState,
      versionList: [], // 版本列表
      treeList: [], // meddra树形列表
      historyList: [] // 历史记录列表
    }
  },
  computed: {
    infoStateFilter() {
      const arr = []
      for (const key in this.apiState) {
        let type = 'success'
        if (key === '0') type = 'danger'
        arr.push({ type, value: key, label: this.apiState[key] })
      }
      return stateFilter(arr)
    }
  },
  created() {
    this.getApiState()
    this.getVersionList()
    this.GetMeddraHistoryList()
  },
  methods: {
    // 获取meddra接口状态
    getApiState() {
      getMedDraApiState().then(res => {
        this.apiInfo = res.Body
      })
    },
    // 获取meddra版本列表
    getVersionList() {
      GetMeddraVersionList().then(res => {
        this.versionList = res.Body.VersionList || []
      })
    },
    // 选择版本
    handleChange() {
      this.Version = this.versionList.find(el => el.VersionId === this.VersionId).VersionNumber
      this.getMeddraList('soc')
    },
    // 获取历史记录
    GetMeddraHistoryList() {
      GetMeddraHistoryList().then(res => {
        this.historyList = res.Body.MeddraList || []
      })
    },
    // 获取meddra属性tree列表
    getMeddraList(type) {
      GetMeddraList({ VersionId: this.VersionId }, type).then(res => {
        this.treeList = res.Body.SocList || []
      })
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
