<script setup>
export  default {
  name: 'fluffy-vampirebat'
}
</script>

<template>
  <div>
    <input type="text" name="text" class="input" />
    <input type="text" name="text" class="input" />
    <input type="text" name="text" class="input" />
  </div>
</template>

<style scoped lang="scss">
.input {
  max-width: 190px;
  width: 40px;
  height: 40px;
  outline: none;
  margin: 5px;
  transition: 0.5s;
  border: none;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  transform: rotate(90deg);
}

input:focus {
  width: 150px;
  transform: rotate(0);
}
</style>
