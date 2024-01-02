<template>
  <div class="step">
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="item in stepListEnum" :key="item.value" :name="item.documentType">
        <span slot="label" class="pane-item" :class="{ isActive: activeName === item.documentType }"
          ><i class="el-icon-date" :class="{ isSaved: activeName === item.documentType }"></i>
          {{ item.label }}</span
        >
      </el-tab-pane>
    </el-tabs>
    </el-card>
    <!-- <components :is="isActiveComName" /> -->
  </div>
</template>

<script>
const isModalComObj = {}
const requireComponent = {
  buttonsComponent: require.context('./buttons', true, /\w+\.vue$/),
  checkboxsComponent: require.context('./checkboxs', true, /\w+\.vue$/),
  inputsComponent: require.context('./inputs', true, /\w+\.vue$/),
  loadersComponent: require.context('./loaders', true, /\w+\.vue$/),
  othersComponent: require.context('./others', true, /\w+\.vue$/),
  switchsComponent: require.context('./switchs', true, /\w+\.vue$/)
}
for (const key in requireComponent) {
  requireComponent[key].keys().forEach(fileName => {
    const names = fileName
      .split('/')
      .pop()
      .replace(/\.\w+$/, '')
    const componentConfig = requireComponent[key](fileName)
    isModalComObj[names] = componentConfig.default || componentConfig
  })
}
// console.log(isModalComObj)
export default {
  name: 'styleModal',
  props: {},
  components: Object.assign({}, isModalComObj),
  data() {
    return {
      activePaneName: '',
      activeName: 'buttons',
      stepListEnum: [
        {
          label: '按钮',
          value: '0',
          documentType: 'buttons'
        },
        {
          label: '复选框',
          value: '1',
          documentType: 'checkboxs'
        },
        {
          label: '输入框',
          value: '2',
          documentType: 'inputs'
        },
        {
          label: '加载',
          value: '3',
          documentType: 'loaders'
        },
        {
          label: '开关',
          value: '5',
          documentType: 'switchs'
        },
        {
          label: '其他',
          value: '4',
          documentType: 'others'
        }
      ]
    };
  },
  computed: {
    // isActiveComName () {
    //   return isModalComObj[this.activePaneName].name
    // }
  },
  created () {},
  methods: {
    handleClick() {}
  }
};
</script>

<style lang="scss" scoped>
.step {
  ::v-deep .el-tabs__nav {
    .el-tabs__item {
      padding: 0;
      height: 50px;
      line-height: 48px;
      &:nth-last-child(5) .pane-item {
        border-radius: 6px 0 0 0;
      }
      &:last-child .pane-item {
        border-radius: 0 6px 0 0;
      }
    }
  }
  .pane-item {
    padding: 0 20px;
    display: inline-block;
    height: 100%;
    width: 100%;
    font-size: 16px;
    color: #2c2c2c;

    & i.isSaved {
      color: #45b787;
    }
    &:hover {
      color: #303133;
    }
  }
  .isActive {
    color: #409eff;
    &:hover {
      color: #409eff;
    }
  }
}
</style>
