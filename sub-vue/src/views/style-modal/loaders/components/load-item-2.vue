<template>
  <div class="">
    <div class="loader">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'load-item-2',
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
.loader {
  width: 175px;
  height: 100px;
}
.loader span {
  display: block;
  background: #e04960;
  width: 7px;
  height: 100%;
  border-radius: 14px;
  margin-right: 5px;
  float: left;
}
.loader span:last-child {
  margin-right: 0px;
}
.loader span:nth-child(1) {
  animation: load 2.5s 1.4s infinite linear;
}
.loader span:nth-child(2) {
  animation: load 2.5s 1.2s infinite linear;
}
.loader span:nth-child(3) {
  animation: load 2.5s 1s infinite linear;
}
.loader span:nth-child(4) {
  animation: load 2.5s 0.8s infinite linear;
}
.loader span:nth-child(5) {
  animation: load 2.5s 0.6s infinite linear;
}
.loader span:nth-child(6) {
  animation: load 2.5s 0.4s infinite linear;
}
.loader span:nth-child(7) {
  animation: load 2.5s 0.2s infinite linear;
}
.loader span:nth-child(8) {
  animation: load 2.5s 0s infinite linear;
}
.loader span:nth-child(9) {
  animation: load 2.5s 0.2s infinite linear;
}
.loader span:nth-child(10) {
  animation: load 2.5s 0.4s infinite linear;
}
.loader span:nth-child(11) {
  animation: load 2.5s 0.6s infinite linear;
}
.loader span:nth-child(12) {
  animation: load 2.5s 0.8s infinite linear;
}
.loader span:nth-child(13) {
  animation: load 2.5s 1s infinite linear;
}
.loader span:nth-child(14) {
  animation: load 2.5s 1.2s infinite linear;
}
.loader span:nth-child(15) {
  animation: load 2.5s 1.4s infinite linear;
}
@keyframes load {
  0% {
    // background: #531430;
    transform: scaleY(0.08);
  }
  50% {
    // background: #e04960;
    transform: scaleY(1);
  }
  100% {
    // background: #531430;
    transform: scaleY(0.08);
  }
}

</style>
