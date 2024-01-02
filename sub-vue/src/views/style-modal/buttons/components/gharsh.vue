<template>
  <div class="">
    <button class="gharsh">
      Button
    </button>
  </div>
</template>

<script>
export default {
  name: 'gharsh',
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
.gharsh {
  position: relative;
  width: 120px;
  height: 40px;
  background-color: #000;
  display: flex;
  align-items: center;
  color: white;
  flex-direction: column;
  justify-content: center;
  border: none;
  padding: 12px;
  gap: 12px;
  border-radius: 8px;
  cursor: pointer;
  z-index: 100;
}

.gharsh::before {
  content: '';
  position: absolute;
  inset: 0;
  left: -4px;
  top: -1px;
  margin: auto;
  width: 128px;
  height: 48px;
  border-radius: 10px;
  background: linear-gradient(-45deg, #e81cff 0%, #40c9ff 100% );
  z-index: -10;
  pointer-events: none;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.gharsh::after {
  content: "";
  z-index: -1;
  position: absolute;
  inset: 0;
  background: linear-gradient(-45deg, #fc00ff 0%, #00dbde 100% );
  transform: translate3d(0, 0, 0) scale(0.95);
  filter: blur(20px);
}

.gharsh:hover::after {
  filter: blur(30px);
}

.gharsh:hover::before {
  transform: rotate(-180deg);
}

.gharsh:active::before {
  scale: 0.7;
}


</style>
