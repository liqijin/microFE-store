<template>
  <div class="frosted-glass" @mousemove="handlemousemove($event)" @mouseleave="handlemouseleave">
    <div ref="element" id="element"></div>
  </div>
</template>

<script>
export default {
  name: 'frosted-glass',
  props: {},
  components: {},
  data() {
    return {}
  },
  created() {},
  mounted() {
  },
  methods: {
    handlemousemove(e) {
      const multiple = 25;
      const element = this.$refs.element

      function transformElement(x, y) {
        const box = element.getBoundingClientRect();
        const calcX = -(y - box.y - (box.height / 2)) / multiple;
        const calcY = (x - box.x - (box.width / 2)) / multiple;
        let angle = Math.floor(getMouseAngle((y - box.y - (box.height / 2)), (x - box.x - (box.width / 2))));

        element.style.transform  = "rotateX("+ calcX +"deg) " + "rotateY("+ calcY +"deg)";
        element.style.setProperty("--angle", `${-angle}deg`);
        element.style.setProperty("--color", 'rgba(255,255,255,.8)');
      }
      function getMouseAngle(x, y) {
        const radians = Math.atan2(y, x);
        let angle = radians * (180 / Math.PI);

        if (angle < 0) {
          angle += 360;
        }

        return angle;
      }
      requestAnimationFrame(function(){
        transformElement(e.clientX, e.clientY);
      });
    },
    handlemouseleave() {
      const element = this.$refs.element
      requestAnimationFrame(function(){
        element.style.transform = "rotateX(0) rotateY(0)";
        element.style.setProperty("--angle", `NAN`);
        element.style.setProperty("--color", 'rgba(255,255,255,1)');
      });
    }
  }
}
</script>

<style lang="scss" scoped>
// @property --angle {
//     syntax: "<angle>";
//     inherits: false;
//     initial-value: -45deg;
// }

// @property --color {
//     syntax: "<color>";
//     inherits: false;
//     initial-value: rgba(255, 255, 255, 1);
// }

.frosted-glass {
    width: 100%;
    height: 100vh;
    display: flex;
    transform-style: preserve-3d;
    perspective: 500px;
    cursor: pointer;
    background: url(https://picsum.photos/id/242/1920/1080);
    background-size: cover;
}

#element {
    margin: auto;
    width: 600px;
    height: 300px;
    transform-style: preserve-3d;
    backdrop-filter: blur(15px);
    // background: linear-gradient(var(--angle), rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.5));
    mask: linear-gradient(var(--angle), var(--color), #fff, #fff);
    box-shadow: 0 20px 40px 1px rgba(0, 0, 0, 0.12),
        inset 0 -10px 20px -5px rgba(0, 0, 0, 0.3),
        0 150px 100px -80px rgba(0, 0, 0, 0.4),
        inset 0 1px 4px hsla(0, 0%, 100%, 0.6),
        inset 0 -1px 1px 1px rgba(0, 0, 0, 0.2);
    transition: all 0.3s, --angle 0.3s;
}

</style>
