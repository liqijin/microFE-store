<script setup>
export default {
  name: 'dull-owl'
}
</script>

<template>
  <label class="lock-checkbox">
    <input id="lock" type="checkbox" />
    <span class="lock-icon">
    <svg viewBox="0 0 24 24">
      <path
        d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6z"
      ></path>
    </svg>
  </span>
  </label>
</template>

<style scoped lang="scss">
.lock-checkbox {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.lock-checkbox input[type='checkbox'] {
  opacity: 0;
  width: 0;
  height: 0;
}

.lock-icon {
  fill: #00ff40;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 34px;
  height: 34px;
  transition: all 0.3s;
  cursor: pointer;
}

.lock-checkbox input[type='checkbox']:checked + .lock-icon {
  fill: #ff0000;
}
</style>
