<template>
  <div class="github-bishwajeet">
    <div class="card">
      <label class="avatar"></label>
      <label class="info">
        <span class="info-1"></span>
        <span class="info-2"></span>
      </label>
      <div class="content-1"></div>
      <div class="content-2"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'github-bishwajeet',
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
.card {
  width: 190px;
  height: 190px;
  border-radius: 44px;
  background: lightgrey;
  background: linear-gradient(145deg, #ff6b6b, #d43636);
  box-shadow: 2px 3px 3px #ba2f2f, 2px 3px 3px #ff4949;
}

.avatar {
  width: 45px;
  height: 45px;
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.9);
  margin: 30px 15px 20px 25px;
  border-radius: 14px;
}

.info {
  display: inline-block;
  vertical-align: top;
  margin-top: 33px;
  width: 85px;
}

.info-1,
.info-2 {
  display: inline-block;
  height: 20px;
  width: 100%;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.9);
}

.info-2 {
  height: 11px;
  width: 50%;
  border-radius: 3px;
}

.content-1 {
  width: 80%;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  height: 40px;
  margin: auto;
}

.content-2 {
  width: 60%;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.9);
  height: 18px;
  margin: 10px 0 0 20px;
}
</style>
