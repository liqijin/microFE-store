<script setup>
export default {
  name:'terrible-snail'
}
</script>

<template>
  <label class="switch">
    <input type="checkbox" />
    <span class="slider"></span>
  </label>
</template>

<style scoped lang="scss">
/* The switch - the box around the slider */
.switch {
  font-size: 15px;
  position: relative;
  display: inline-block;
  width: 4.5em;
  height: 2em;
}

/* Hide default HTML checkbox */
.switch input {
  background-color: transparent;
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(120deg, #234567, #781223);
  transition: 0.4s;
  border-top-left-radius: 13px;
  border-bottom-right-radius: 13px;
}

.slider:before {
  position: absolute;
  content: '';
  height: 1.4em;
  width: 1.4em;
  border-top-left-radius: 11px;
  border-bottom-right-radius: 11px;
  left: 0.3em;
  bottom: 0.3em;
  background-color: #dde4eb;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: transparent;
}

input:checked + .slider:before {
  transform: translateX(2.5em);
}
</style>
