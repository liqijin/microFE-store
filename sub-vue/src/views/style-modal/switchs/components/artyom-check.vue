<script setup>
export default {
  name:'artyom-check'
}
</script>

<template>
  <div class="checkbox-wrapper-49">
    <div class="block">
      <input data-index="0" id="cheap-49" type="checkbox" />
      <label for="cheap-49"></label>
    </div>
  </div>
</template>

<style scoped lang="scss">
.checkbox-wrapper-49 input[type='checkbox'] {
  display: none;
  visibility: hidden;
}

.checkbox-wrapper-49 {
  --size: 90px;
}

.checkbox-wrapper-49 .block {
  position: relative;
  clear: both;
  float: left;
}

.checkbox-wrapper-49 label {
  width: var(--size);
  height: calc(var(--size) / 2);
  box-sizing: border-box;
  border: 3px solid;
  float: left;
  border-radius: 100px;
  position: relative;
  cursor: pointer;
  transition: 0.3s ease;
  color: black;
}
.checkbox-wrapper-49 input[type='checkbox']:checked + label {
  background: #55e868;
}
.checkbox-wrapper-49 input[type='checkbox']:checked + label:before {
  left: calc(var(--size) / 2);
}
.checkbox-wrapper-49 label:before {
  transition: 0.3s ease;
  content: '';
  width: calc((var(--size) / 2) - 10px);
  height: calc((var(--size) / 2) - 10px);
  position: absolute;
  background: white;
  left: 2px;
  top: 2px;
  box-sizing: border-box;
  border: 3px solid;
  color: black;
  border-radius: 100px;
}
</style>
