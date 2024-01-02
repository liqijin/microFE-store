<template>
  <el-card class="steps-progress mb20">
    <div class="flex-row ag-start jus-cen">
      <div v-for="(item, index) in fixedSteps" :key="index" class="flex-col jus-start ag-start">
        <div class="flex-row jus-start ag-cen mg8">
          <div class="item-num flex-row ag-cen jus-cen color-gray" :class="{ 'active-text': item.isActive }">
            <span v-if="!item.isActive">{{ index + 1 }}</span>
            <span v-else class="el-icon-check" />
          </div>
          <div class="item-text color-gray" :class="{ 'active-text': item.isActive }">{{ item.label }}</div>
          <div v-if="index < 4" class="line" :class="{ 'active-text': item.isActive }" />
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { summaryState } from '../../enum'
export default {
  props: {
    // 案例状态
    state: {
      type: Number || String,
      default: 0
    }
  },
  computed: {
    fixedSteps() {
      let num = summaryState.length
      return summaryState
        .map((key, index) => {
          if (key.value === this.state) num = index
          return {
            ...key,
            isActive: num >= index
          }
        })
        .filter(el => el.value < 5)
    }
  }
}
</script>

<style lang="scss" scoped>
$active-color: #409eff;
$color-gray: #909399;

.item-num {
  width: 28px;
  height: 28px;
  border: 1px solid $color-gray;
  font-size: 16px;
  border-radius: 50%;
  margin-right: 8px;
  color: $color-gray;
}

.color-gray {
  color: $color-gray;
}

.el-icon-check {
  font-size: 22px;
}

.item-num.active-text {
  border-color: $active-color;
  color: $active-color;
}

.item-text {
  font-size: 14px;
  position: relative;
}

.item-text.active-text {
  color: $active-color;
  font-weight: 700;
}

.line {
  width: 130px;
  height: 1px;
  margin: 0 8px;
  background: rgba(0, 0, 0, 0.2);
}

.line.active-text {
  background: $active-color;
}

.item-time {
  padding-left: 36px;
  font-size: 14px;
}

.mg8 {
  margin: 8px 0;
}
</style>
