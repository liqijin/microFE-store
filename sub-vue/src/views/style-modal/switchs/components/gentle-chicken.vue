<script setup>
export default {
  name:'gentle-chicken'
}
</script>

<template>
  <label class="switch">
    <input type="checkbox">
    <span class="slider">
        <span class="circle"></span>
    </span>
  </label>
</template>

<style scoped lang="scss">
/* Dark Mode Only ;) */

/* The switch - the box around the slider */
.switch {
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 3.5em;
  height: .5em;
}

/* Hide default HTML checkbox */
.switch input {
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
  background-color: #5B5B5B;
  transition: .4s;
  border-radius: 30px;
  display: flex;
  align-items: center;
}

.slider .circle {
  background-color: #212121;
  height: 3em;
  width: 3em;
  border-radius: 50%;
  position: absolute;
  left: 0;
  transform: translateX(-50%);
  transition: .4s;
}

.slider .circle::before {
  position: absolute;
  content: "";
  height: 2.3em;
  width: 2.3em;
  border-radius: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(182, 182, 182);
  transition: .4s;
}

.slider .circle::after {
  content: '';
  background-color: #212121;
  height: 1.7em;
  width: 1.7em;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: .4s;
}

input:checked + .slider .circle {
  transform: translateX(2em);
  transition: .4s;
}

input:checked + .slider .circle::before {
  background-color: #e1e1e1;
  transition: .4s;
}

input:checked + .slider .circle::after {
  width: 0;
  height: 0;
  transition: .4s;
}
</style>
