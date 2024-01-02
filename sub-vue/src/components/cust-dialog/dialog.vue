<template>
  <el-dialog
    :visible.sync="visible"
    :title="title"
    :width="width"
    :close-on-click-modal="closeOnClickModal"
    :custom-class="`global-dialog${plain ? ' plain_dialog' : ''}`"
    :show-close="showClose"
    :append-to-body="true"
    @close="close"
    @open="open"
  >
    <render v-if="visible" :params="params" :render="render" />
  </el-dialog>
</template>
<script>
const functionalComponent = {
  functional: true,
  props: {
    render: Function,
    params: Object
  },
  render (h, ctx) {
    const params = { ...ctx.props.params }
    return ctx.props.render(h, params)
  }
}
const noop = () => {}
export default {
  components: {
    render: functionalComponent
  },
  data () {
    return {
      title: '',
      width: '50%',
      customClass: '',
      showClose: true,
      closeOnClickModal: false,
      render: noop,
      open: noop, // 'el-dialog中的close&open事件,可以扩展'
      close: noop,
      visible: false,
      resolver: {},
      params: {},
      plain: false
    }
  },
  watch: {
    $route: function () {
      this.hide()
    }
  },
  methods: {
    invoke (config) {
      this.visible = true
      this.title = config.title
      this.width = config.width
      this.customClass = config.customClass
      this.closeOnClickModal = config.closeOnClickModal
      this.showClose = config.showClose
      this.render = config.render
      this.open = config.open
      this.close = config.close
      this.params = config.params
      this.plain = config.plain
      return new Promise((resolve, reject) => {
        this.resolver = { resolve, reject }
      })
    },
    hide () {
      this.visible = false
    },
    resolve (v) {
      this.resolver.resolve(v)
    },
    reject (err) {
      this.resolver.reject(new Error(err))
    }
  }
}
</script>
<style>
.plain_dialog .el-dialog__header {
  display: none !important;
}

.plain_dialog .el-dialog__body {
  padding: 0;
  min-height: 100px;
}
</style>
