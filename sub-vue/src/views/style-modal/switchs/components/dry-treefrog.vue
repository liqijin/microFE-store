<script setup>
export default {
  name:'dry-treefrog'
}
</script>

<template>
  <div class="love">
    <input id="switch" type="checkbox" />
    <label class="love-heart" for="switch">
      <i class="left"></i>
      <i class="right"></i>
      <i class="bottom"></i>
      <div class="round"></div>
    </label>
  </div>
</template>

<style scoped lang="scss">
.love-heart:before,
#switch {
  display: none;
}

.love-heart,
.love-heart::after {
  border-color: #D1D4E5FF;
  border: 1px solid;
  border-top-left-radius: 100px;
  border-top-right-radius: 100px;
  width: 10px;
  height: 8px;
  border-bottom: 0;
}

.round {
  position: absolute;
  z-index: 1;
  width: 8px;
  height: 8px;
  background: #FFFFFFFF;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 0px 4px 0px;
  //box-shadow: rgba(0 0 0, 24%) 0px 0px 4px 0px;
  border-radius: 100%;
  left: 0px;
  bottom: -1px;
  transition: all 0.5s ease;
  animation: check-animation2 0.5s forwards;
}

input:checked + label .round {
  transform: translate(0px, 0px);
  animation: check-animation 0.5s forwards;
  background-color: #FFFFFFFF;
}

@keyframes check-animation {
  0% {
    transform: translate(0px, 0px);
  }

  50% {
    transform: translate(0px, 7px);
  }

  100% {
    transform: translate(7px, 7px);
  }
}

@keyframes check-animation2 {
  0% {
    transform: translate(7px, 7px);
  }

  50% {
    transform: translate(0px, 7px);
  }

  100% {
    transform: translate(0px, 0px);
  }
}

.love-heart {
  box-sizing: border-box;
  position: relative;
  transform: rotate(-45deg) translate(-50%, -33px) scale(4);
  display: block;
  border-color: #D1D4E5FF;
  cursor: pointer;
  top: 0;
}

input:checked + .love-heart,
input:checked + .love-heart::after,
input:checked + .love-heart .bottom {
  border-color: #EC4B6EFF;
  box-shadow: inset 6px -5px 0px 2px #FE7190FF;
}

.love-heart::after,
.love-heart .bottom {
  content: '';
  display: block;
  box-sizing: border-box;
  position: absolute;
  border-color: #D1D4E5FF;
}

.love-heart::after {
  right: -9px;
  transform: rotate(90deg);
  top: 7px;
}

.love-heart .bottom {
  width: 11px;
  height: 11px;
  border-left: 1px solid;
  border-bottom: 1px solid;
  border-color: #D1D4E5FF;
  left: -1px;
  top: 5px;
  border-radius: 0px 0px 0px 5px;
}
</style>
