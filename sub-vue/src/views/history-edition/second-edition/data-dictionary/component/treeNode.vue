<template>
  <el-tree
    :data="treeList"
    :load="loadNode"
    :props="props"
    lazy
    node-key="Code"
    highlight-current
    @node-click="nodeClick"
  >
    <span class="custom-tree-node eli-over" slot-scope="{ node, data }">
      <span class="mr8 tag" :style="{ color: nodeType(data) }">{{ data.TypeName }}</span>
      <span class="eli-over">{{ node.label }}</span>
    </span>
  </el-tree>
</template>

<script>
import { GetMeddraList } from '@/api/case/meddra'
import { treeLevelState } from '../map'
export default {
  name: 'treeNode',
  props: {
    // 树形数据
    treeList: {
      type: Array,
      default: () => []
    },
    // 树形数据类型，list-列表，其他-搜索
    treeType: String
  },
  components: {},
  data() {
    return {
      props: {
        label: 'Name',
        children: 'children',
        isLeaf: 'leaf'
      }
    }
  },
  computed: {
    nodeType() {
      return function (val) {
        return {
          SOC: '#409EFF',
          HLGT: '#67C23A',
          HLT: '#909399',
          PT: '#E6A23C',
          LLT: '#F56C6C'
        }[val.TypeName]
      }
    }
  },
  created() {},
  methods: {
    loadNode(node, resolve) {
      let len = 4
      if (!this.treeList.length) return resolve(this.treeList)
      if (node.level === 0) return resolve(this.treeList)
      const { TypeName } = node.data
      const index = treeLevelState.find(el => el.label === TypeName).value
      if (this.treeType !== 'list') {
        len = treeLevelState.find(el => this.treeType === el.type).level
      }
      if (node.level > len) return resolve([])
      const { code: treeCode, type, listName } = treeLevelState[index]
      const { Id } = node.data
      GetMeddraList({ [`${treeCode}`]: Id }, type).then(res => {
        const list = res.Body[listName].map(el => {
          if (el.TypeName === 'LLT') el = { ...el, leaf: true }
          return el
        })
        resolve(list)
      })
    },
    nodeClick(val) {
      this.$emit('checkNode', val, 'tree')
    }
  }
}
</script>

<style lang="scss">
.custom-tree-node .tag {
  white-space: nowrap;
  font-size: 12px;
}
</style>
