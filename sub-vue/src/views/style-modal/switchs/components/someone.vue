<script setup>
export default {
  name:'someone'
}
</script>

<template>
  <div class="switch">
    <input type="checkbox" />
    <div>
      <span class="line-1"></span>
      <span class="line-2"></span>
      <span class="line-3"></span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.switch {
  position: relative;
  cursor: pointer;
  width: 40px;
  height: 40px;
  background: linear-gradient(
      45deg,
      rgb(183, 0, 255) 20%,
      rgb(255, 0, 170) 100%
  );
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.363);
  border-radius: 5px;
}

.switch input {
  opacity: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  cursor: pointer;
  position: absolute;
}

.switch div {
  width: 80%;
  height: 80%;
  margin: 10%;
  position: absolute;
}

.switch span {
  background: #fff;
  width: 100%;
  height: 2px;
  border-radius: 5px;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.5s, width 0.5s;
}

.switch .line-1 {
  width: 50%;
  transform: translate(-100%, -10px);
  transform-origin: 0 0;
}

.switch .line-3 {
  width: 50%;
  left: auto;
  right: 0;
  transform: translate(0, 10px);
  transform-origin: 100% 0;
}

input:checked + div span.line-1 {
  transform: translate(0, 0) rotate(-45deg);
}

input:checked + div span.line-3 {
  transform: translate(-100%, 0) rotate(-45deg);
}

input:checked + div span.line-2 {
  transform: translate(-50%, -50%) rotate(45deg);
}
</style>
