<template>
  <el-card class="">
    <ul class="flex-row ag-cen flex-wrap">
      <li v-for="(item, index) in svgNameList" :key="index" class="flex-col ag-cen" @click="handleCopy(item, $event)">
        <svg-icon :icon-class="item" />
        <div class="name mt10">{{ item }}</div>
      </li>
    </ul>
  </el-card>
</template>

<script>
const requireComponent = require.context('../../icons/svg', true, /\w+\.svg$/)
const isModalComObj = {}
requireComponent.keys().forEach(fileName => {
  const names = fileName
    .split('/')
    .pop()
    .replace(/\.\w+$/, '')
  const componentConfig = requireComponent(fileName)
  isModalComObj[names] = componentConfig.default || componentConfig
})
export default {
  name: 'svgPages',
  props: {},
  components: {},
  data() {
    return {
      svgNameList: []
    }
  },
  created() {
    // console.log(isModalComObj)
    for (const key in isModalComObj) this.svgNameList.push(key)
  },
  methods: {
    handleCopy(val, e) {
      // console.log(e)
      navigator.clipboard.writeText(val)
      this.$message.success('copy success')
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
}
li {
  cursor: pointer;
  // flex: 1;
  padding: 10px;
  margin: 10px;
  width: 100px;
  transition: all .5s;
  & .svg-icon {
    font-size: 24px;
  }
  .name {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
    text-align: center;
  }

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
}
</style>
