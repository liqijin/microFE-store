<template>
  <div class="">
    <span class="loading">
      <span class="loading-inner"></span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'load-item-1',
  props: {},
  components: {},
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
/* loading.css */
.loading {
  display: inline-block;
  width: 30px;
  height: 30px;
  position: relative;
  border: 4px solid #e04960;
  animation: loader 4s infinite ease;
}
.loading-inner {
  vertical-align: top;
  display: inline-block;
  width: 100%;
  background-color: #e04960;
  animation: loader-inner 4s infinite ease-in;
}
@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(180deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes loader-inner {
  0% {
    height: 0%;
  }
  25% {
    height: 0%;
  }
  50% {
    height: 100%;
  }
  75% {
    height: 100%;
  }
  100% {
    height: 0%;
  }
}

</style>
