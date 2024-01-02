<template>
  <div class="anchor">
    <div class="g-container">
      <ul class="for">
        <li>下</li>
        <li>划</li>
        <li>线</li>
        <li>跟</li>
        <li>随</li>
        <li>动</li>
        <li>画</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'anchor',
  props: {},
  components: {},
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.anchor {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: conic-gradient(#fff, #fff 90deg, #ddd 90deg, #ddd 180deg, #fff 180deg, #fff 270deg, #ddd 270deg);
  // background-size: 50px 50px;
}

.g-container {
  margin: auto;
}

ul {
  position: relative;
  width: 700px;
  height: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  resize: horizontal;
  overflow: hidden;

  li {
    flex-grow: 1;
    height: 100px;
    cursor: pointer;
    color: #000;
    font-size: 48px;
    line-height: 100px;
    text-align: center;
    // anchor-name: var(--anchor-name);
  }

  &::before {
    position: absolute;
    content: '';
    height: 5px;
    background: transparent;
    bottom: 0;
    left: anchor(var(--target) left);
    right: anchor(var(--target) right);
    transition: 0.3s all;
    transform: scaleX(5);
  }
}
ul:hover::before {
  background: #000;
  transform: scaleX(1);
}

@for $i from 1 to 100 {
  ul:has(li:nth-child(#{$i}):hover) {
    --target: --anchor-#{$i};
  }
  li:nth-child(#{$i}) {
    anchor-name: --anchor-#{$i};
  }
}
</style>
