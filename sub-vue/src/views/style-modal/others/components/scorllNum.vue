<template>
  <div class="flex-row m40">
    <div class="flex-row jus-cen mr10 num">
      <ul v-if="show" class="flex-row">
        <ScrollNum v-for="(num, idx) of numArr" :key="idx" as="li" :i="num || 0" :delay="idx + 1" />
      </ul>
    </div>
    <el-button type="primary" class="" @click="handleStart">Start</el-button>
  </div>
</template>

<script>
import ScrollNum from '../model/scrollItem.vue'

export default {
  name: 'scorllNum',
  components: { ScrollNum },
  data() {
    return {
      num: 9999,
      show: true
    }
  },
  computed: {
    numArr() {
      const str = this.num.toString()
      const arr = []
      for (let i = 0; i < str.length; i++) {
        arr.push(parseInt(str[i]))
      }
      return arr
    }
  },
  methods: {
    handleStart() {
      let str = [1, 1, 1, 1].map(() => Math.round(Math.random() * 9))
      // for(let i = 0; i < str.length; i++) {
      //   if (str[0] !== str[i]) return this.handleStart()
      // }
      this.num = Number(str.join(''))
      this.show = false
      setTimeout(() => {
        this.show = true
      }, 0)
    }
  }
}
</script>

<style scoped>
ul {
  padding: 0;
  margin: 0;
  list-style: none;
  height: 100%;
  box-shadow: 0px 1px 5px #858585;
  border-radius: 4px;
}
.num{
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  height: 45px;
}
</style>

