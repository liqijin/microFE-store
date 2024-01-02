<script setup>
export default {
  name: 'curvy-crab'
}
</script>

<template>
  <div style="width: 100%; height: 100%; background: #000" class="flex-row ag-cen jus-cen">
    <button>
      HOVER ME
    </button>
  </div>
</template>

<style scoped lang="scss">
button {
  color: white;
  text-decoration: none;
  font-size: 25px;
  border: none;
  background: none;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
}

button::before {
  margin-left: auto;
}

button::after, button::before {
  content: '';
  width: 0%;
  height: 2px;
  background: #f44336;
  display: block;
  transition: 0.5s;
}

button:hover::after, button:hover::before {
  width: 100%;
}
</style>
