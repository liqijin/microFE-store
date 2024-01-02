<template>
  <el-card>
    <div class="bar">
      <div class="wrapper" ref="wrapper" @scroll="onScroll">
        <div class="background" :style="{height:`${total_height}px`}"></div>
        <div class="list" ref="container">
            <template v-for="item in runList">
              <div :class="['line-load',getClass(item.data.type)]">
                <div class="item flex-row ag-cen lt">{{item.data.name}}</div>
                <div class="item flex-row ag-cen gt">{{item.data.value}}</div>
              </div>
            </template>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import city_data from './map/city.json'
export default {
  name: 'scrollLoad',
  props: {
    cache_screens: { // 缓冲的屏幕数量
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      list: [], // 源数据
      runList: [], // 运行时的列表
      total_height: 0, // 列表总高度
      maxNum: 0, // 一屏幕容纳的最大数量
      distance: 0, // 存储滚动的距离
      min_height: 50,
      scroll_scale: [],
      ticking: false
    }
  },
  mounted () {
    this.genData()
    this.init()
    this.getRunData()
    // // 禁止右键菜单
    // document.oncontextmenu = function(){ return false; };
    // // 禁止文字选择
    // document.onselectstart = function(){ return false; };
    // // 禁止复制
    // document.oncopy = function(){ return false; };
    // // 禁止剪切
    // document.oncut = function(){ return false; };
  },
  destroyed() {},
  methods: {
    getClass (type) {
      switch (type) {
        case 1: return 'one'
        case 2: return 'two'
        case 3: return 'three'
        default:
          return ''
      }
    },
    init () {
      const containerHeight = parseInt(getComputedStyle(this.$refs.wrapper).height)
      //一屏的最大数量
      this.maxNum = Math.ceil(containerHeight / this.min_height)
    },
    onScroll (e) {
      if (this.ticking) return
      this.ticking = true
      requestAnimationFrame(() => {
        this.ticking = false
      })
      const distance = e.target.scrollTop
      this.distance = distance
      this.getRunData(distance)
    },
    //二分法计算起始索引
    getStartIndex (scrollTop) {
      let start = 0, end = this.list.length - 1
      while (start < end) {
        const mid = Math.floor((start + end) / 2)
        const { top, height } = this.list[mid]
        if (scrollTop >= top && scrollTop < top + height) {
          start = mid
          break
        } else if (scrollTop >= top + height) {
          start = mid + 1
        } else if (scrollTop < top) {
          end = mid - 1
        }
      }
      return start
    },
    getRunData (distance = null) {
      //滚动的总距离
      const scrollTop = distance ? distance : this.$refs.container.scrollTop
      //在哪个范围内不执行滚动
      if (this.scroll_scale) {
        if (scrollTop > this.scroll_scale[0] && scrollTop < this.scroll_scale[1]) return
      }
      //起始索引
      let start_index = this.getStartIndex(scrollTop)
      start_index = start_index < 0 ? 0 : start_index
      //上屏索引
      let upper_start_index = start_index - this.maxNum * this.cache_screens
      upper_start_index = upper_start_index < 0 ? 0 : upper_start_index
      // 调整offset
      this.$refs.container.style.transform = `translate3d(0,${this.list[upper_start_index].top}px,0)`
      //中间屏幕的元素
      const mid_list = this.list.slice(start_index, start_index + this.maxNum)
      // 上屏
      const upper_list = this.list.slice(upper_start_index, start_index)
      // 下屏元素
      let down_start_index = start_index + this.maxNum
      down_start_index = down_start_index > this.list.length - 1 ? this.list.length : down_start_index
      this.scroll_scale = [this.list[Math.floor(upper_start_index + this.maxNum / 2)].top, this.list[Math.ceil(start_index + this.maxNum / 2)].top]
      const down_list = this.list.slice(down_start_index, down_start_index + this.maxNum * this.cache_screens)
      this.runList = [...upper_list, ...mid_list, ...down_list]

    },
    //生成数据
    genData () {
      let total_height = 0
      const list = city_data.map((data, index) => {
        const height = 50
        const ob = {
          index,
          height,
          top: total_height,
          data
        }
        total_height += height
        return ob
      })
      this.total_height = total_height //  列表总高度
      this.list = list
      this.min_height = 50 // 最小高度是50
    }
  }
}
</script>
<style lang="scss" scoped>
.bar {
  position: relative;
  height: calc(100vh - 40px);
  user-select: none;
}
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow-y: scroll;

  & .background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: -1;
  }

  & .list {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
}
.line-load {
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  background: #fff;

  & .item {
    height: 100%;
    color: #333;
    flex: 1;
    height: 50px;
  }
}
</style>
