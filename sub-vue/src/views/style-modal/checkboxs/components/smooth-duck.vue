<script setup>
export default {
  name: 'smooth-duck'
}
</script>

<template>
  <label>
    <input checked="" type="checkbox">
    <span class="checkbox"></span>
  </label>
</template>

<style scoped lang="scss">
label {
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

input[type='checkbox'] {
  position: absolute;
  transform: scale(0);
}

input[type='checkbox']:checked ~ .checkbox {
  transform: rotate(45deg);
  width: 14px;
  margin-left: 5px;
  border-color: #24c78e;
  border-width: 5px;
  border-top-color: transparent;
  border-left-color: transparent;
  border-radius: 0;
}

.checkbox {
  display: block;
  width: inherit;
  height: inherit;
  border: solid 3px #2a2a2ab7;
  border-radius: 6px;
  transition: all 0.375s;
}
</style>
