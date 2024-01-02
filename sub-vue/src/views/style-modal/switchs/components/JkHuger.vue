<template>
  <div class="JkHuger">
    <div class="container">
      <input class="label-check" id="label-check" type="checkbox" />
      <label for="label-check" class="hamburger-label">
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
        <label></label
      ></label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JkHuger',
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
.label-check {
  display: none;
}

.hamburger-label {
  width: 70px;
  height: 58px;
  display: block;
  cursor: pointer;
}

.hamburger-label div {
  width: 70px;
  height: 6px;
  background-color: #fff;
  position: absolute;
}

.line1 {
  transition: all 0.3s;
}

.line2 {
  margin: 18px 0 0 0;
  transition: 0.3s;
}

.line3 {
  margin: 36px 0 0 0;
  transition: 0.3s;
}

#label-check:checked + .hamburger-label .line1 {
  transform: rotate(35deg) scaleX(0.55) translate(39px, -4.5px);
  border-radius: 50px 50px 50px 0;
}

#label-check:checked + .hamburger-label .line3 {
  transform: rotate(-35deg) scaleX(0.55) translate(39px, 4.5px);
  border-radius: 0 50px 50px 50px;
}

#label-check:checked + .hamburger-label .line2 {
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  width: 45px;
}
</style>
