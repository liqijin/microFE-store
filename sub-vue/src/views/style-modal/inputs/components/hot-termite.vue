<script setup>
export default {
  name: 'hot-termite'
}
</script>

<template>
  <section>
    <div class="input-group">
      <input class="input" autocomplete="off" name="text" type="text" required="">
      <label class="user-label">Full Name</label>
    </div>
  </section>
</template>

<style scoped lang="scss">
.input-group {
  position: relative;
}

.input {
  border: 3px solid #000;
  background: none;
  padding: 1rem;
  font-size: 1rem;
  color: black;
}

.user-label {
  position: absolute;
  left: 15px;
  color: #000;
  pointer-events: none;
  transform: translateY(1rem);
  transition: 350ms;
}

.input:focus,
input:valid {
  outline: none;
  --angle: 0deg;
  border-bottom: 3px solid;
  border-image: conic-gradient(from var(--angle), red, yellow, lime, aqua, blue, magenta, red) 1;
  animation: 3s rotate9234 linear infinite;
}

@keyframes rotate9234 {
  to {
    --angle: 360deg;
  }
}

@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.input:focus~label,
input:valid~label {
  transform: translateY(235%) scale(1);
  background-color: #e8e8e8;
  padding: 0 .2em;
  color: #2196f3;
}
</style>
