<template>
  <div class="">
    <el-card class="">
      <ul class="prereview__content">
        <li v-for="(item, index) in modalComList" :key="index">
          <span class="title-name">{{ item }}</span>
          <article class="com-card">
            <components :is="item" />
          </article>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
const requireComponent = require.context('./components', true, /\w+\.vue$/)
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
  name: 'switchs',
  props: {},
  components: Object.assign({}, isModalComObj),
  data() {
    return {
      modalComList: []
    }
  },
  created() {
    for (const key in isModalComObj) {
      this.modalComList.push(isModalComObj[key].name)
    }
    // console.log(this.modalComList)
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.prereview__content {
  display: grid;
  grid-gap: 20px 14px;
  align-content: start;
  justify-content: center;
  align-items: start;
  grid-template-columns: repeat(auto-fill,minmax(274px,1fr));
  & li {
    position: relative;

    & .title-name {
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 10;
    }
  }
}
.com-card {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: 250px;
  font-family: Arial,Helvetica,sans-serif;
  background-color: var(--light);
  border-radius: 8px;
  transition: box-shadow .25s ease,transform .25s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 10px 5px rgba(0,0,0,.12);
    transition: box-shadow .25s;
  }
}
</style>
