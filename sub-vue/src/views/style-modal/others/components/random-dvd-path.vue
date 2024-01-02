<template>
  <div class="random-dvd-path">
    <div class="dvd-path"></div>
  </div>
</template>

<script>
export default {
  name: 'random-dvd-path',
  props: {},
  components: {},
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.random-dvd-path {
  min-width: 100%;
  height: 100%;
}
.dvd-path {
    position: relative;
    width: 20%;
    height: 20%;
    background: linear-gradient(#f00, #f00), url(https://s1.ax1x.com/2023/08/15/pPQm9oT.jpg);
    background-blend-mode: lighten;
    background-size: contain;
    animation: horizontal 3.7s infinite -1.4s linear alternate,
            vertical 4.1s infinite -2.1s linear alternate,
            colorX 37s infinite -1.4s steps(10),
            colorY 28.7s infinite -2.1s steps(7);
    animation-composition: accumulate;

}
@keyframes horizontal {
    from { transform: translateX(0); }
    to { transform: translateX(calc(400%)); }
}
@keyframes vertical {
    from { transform: translateY(0); }
    to { transform: translateY(calc(400%)); }
}
@keyframes colorX {
    to {
        filter: hue-rotate(2185deg);
    }
}
@keyframes colorY {
    to {
        filter: hue-rotate(1769deg);
    }
}
</style>
