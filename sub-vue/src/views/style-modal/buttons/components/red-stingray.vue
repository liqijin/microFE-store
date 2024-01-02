<script setup>
export default {
  name: 'red-stingray'
}
</script>

<template>
  <div class="flex-row jus-cen ag-cen">
    <button class="red-stingray" data-title="Hover me">Hover me</button>
  </div>
</template>

<style scoped lang="scss">
.red-stingray {
  font-size: 17px;
  background: transparent;
  border: none;
  padding: 1em 1.5em;
  color: #1e1e2b;
  text-transform: uppercase;
  position: relative;
  transition: 0.5s ease;
  cursor: pointer;
  z-index: 1;
}

.red-stingray::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  width: 0;
  background-color: #ffc506;
  transition: 0.5s ease;
}

.red-stingray:hover {
  color: #1e1e2b;
  transition-delay: 0.5s;
}

.red-stingray:hover::before {
  width: 100%;
}

.red-stingray::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 0;
  width: 100%;
  background-color: #ffc506 !important;
  transition: 0.4s ease;
  z-index: -1;
}

.red-stingray:hover::after {
  height: 100%;
  // content: attr(data-title);
  transition-delay: 0.4s;
  color: aliceblue;
}

</style>
