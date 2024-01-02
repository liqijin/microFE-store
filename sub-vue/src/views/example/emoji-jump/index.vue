<template>
  <div class="emoji-jump">
    <div ref="body">
      <div ref="container" class="g-container fall">
        <div ref="emoji" class="g-emoji">
          <div class="g-foo"></div>
          <div class="g-bar"></div>
          <div class="g-baz"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'emoji-jump',
  props: {},
  components: {},
  data() {
    return {}
  },
  created() {},
  mounted() {
    this.$nextTick(() => this.init())
  },
  methods: {
    init() {
      const body = this.$refs.body
      const container = this.$refs.container
      const emoji = this.$refs.emoji
      const bgArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k']

      let curTranslate = 0
      let lastTranslate = 0
      let diff = 0

      function aniFun() {
        curTranslate =
          window
            .getComputedStyle(emoji, null)
            .getPropertyValue('translate')
            .split(' ')[1]
            .slice(0, -2) - 0

        // 翻转
        if (diff > 0 && curTranslate - lastTranslate < 0) {
          emoji.style = `--emoji: "${generateRandomEmoji()}"`
          body.style = `--bg: ${generateRandomColor()}`
          body.setAttribute('class', bgArr[Math.floor(Math.random() * bgArr.length)])
        }

        window.requestAnimationFrame(aniFun)
        diff = curTranslate - lastTranslate
        lastTranslate = curTranslate
      }

      function generateRandomColor() {
        var red = Math.floor(Math.random() * 256)
        var green = Math.floor(Math.random() * 256)
        var blue = Math.floor(Math.random() * 256)

        var color = 'rgb(' + red + ', ' + green + ', ' + blue + ')'

        return color
      }

      function generateRandomEmoji() {
        // 开始的 Emoji 编码
        var emojiStart = 0x1f600
        var emojiStart2 = 0x1f900
        // 结束的 Emoji 编码
        var emojiEnd = 0x1f64f
        var emojiEnd2 = 0x1f9ff

        var randomCode =
          Math.random() > 0.5
            ? Math.floor(Math.random() * (emojiEnd - emojiStart + 1)) + emojiStart
            : Math.floor(Math.random() * (emojiEnd2 - emojiStart2 + 1)) + emojiStart2
        var emoji = String.fromCodePoint(randomCode)

        return emoji
      }

      requestAnimationFrame(aniFun)
    }
  }
}
</script>

<style lang="scss" scoped>
.emoji-jump  {
  min-width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg, #333);
}

.emoji-jump .a {
  background-image: conic-gradient(#fff, #fff 90deg, #ddd 90deg, #ddd 180deg, #fff 180deg, #fff 270deg, #ddd 270deg);
  background-size: 50px 50px;
}
.emoji-jump .b {
  background-image: linear-gradient(
      0deg,
      transparent 9%,
      rgba(255, 255, 255, 0.2) 10%,
      rgba(255, 255, 255, 0.2) 12%,
      transparent 13%,
      transparent 29%,
      rgba(255, 255, 255, 0.1) 30%,
      rgba(255, 255, 255, 0.1) 31%,
      transparent 32%,
      transparent 49%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0.1) 51%,
      transparent 52%,
      transparent 69%,
      rgba(255, 255, 255, 0.1) 70%,
      rgba(255, 255, 255, 0.1) 71%,
      transparent 72%,
      transparent 89%,
      rgba(255, 255, 255, 0.1) 90%,
      rgba(255, 255, 255, 0.1) 91%,
      transparent 92%,
      transparent
    ),
    linear-gradient(
      90deg,
      transparent 9%,
      rgba(255, 255, 255, 0.2) 10%,
      rgba(255, 255, 255, 0.2) 12%,
      transparent 13%,
      transparent 29%,
      rgba(255, 255, 255, 0.1) 30%,
      rgba(255, 255, 255, 0.1) 31%,
      transparent 32%,
      transparent 49%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0.1) 51%,
      transparent 52%,
      transparent 69%,
      rgba(255, 255, 255, 0.1) 70%,
      rgba(255, 255, 255, 0.1) 71%,
      transparent 72%,
      transparent 89%,
      rgba(255, 255, 255, 0.1) 90%,
      rgba(255, 255, 255, 0.1) 91%,
      transparent 92%,
      transparent
    );
  background-size: 50px 50px;
}
.emoji-jump .c {
  background-image: linear-gradient(rgba(0, 255, 0, 0.7) 0.1em, transparent 0.1em),
    linear-gradient(90deg, rgba(0, 255, 0, 0.7) 0.1em, transparent 0.1em);
  background-size: 3em 3em;
}
.emoji-jump .d {
  background: repeating-linear-gradient(45deg, #444 0 20px, #c0466f 0 40px);
}
.emoji-jump .e {
  background: repeating-radial-gradient(
    circle at 50% 50%,
    #fff,
    #9c27b0 20px,
    #ff5722 21px,
    #9c27b0 40px,
    #000000 41px,
    #256b8f 60px,
    #fff 61px
  );
}
.emoji-jump .f {
  background: conic-gradient(#333 0 45deg, #fff 0 360deg);
  background-position: -50% -50%;
  background-size: 30px 30px;
}
.emoji-jump .g {
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 3s ease infinite;
  }
}
.emoji-jump .h {
  background: linear-gradient(30deg, #000 0, #000 49.9%, #fff 50%);
}
.emoji-jump .i {
  background: #000;
  &::before,
  &::after {
    content: '';
    position: absolute;
    inset: 0 50% 0 0;
    background: linear-gradient(
      45deg,
      #00f376 10%,
      transparent 10%,
      transparent 50%,
      #00f376 50%,
      #00f376 60%,
      transparent 60%,
      transparent 100%
    );
    background-size: 40px 40px;
    animation: move 0.3s linear infinite;
  }
  &::after {
    inset: 0 0 0 50%;
    transform: rotateY(180deg);
  }
}
.emoji-jump .j {
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: conic-gradient(#fff 0, transparent 30%, #fff);
  }
}
.emoji-jump .k {
  &::before {
    content: '';
    position: absolute;
    inset: -100vmax;
    background: conic-gradient(#fff 0, transparent 45%, #fff);
    animation: bgrotate 2s infinite linear;
  }
}
.g-container {
  position: relative;
  margin: auto;
  width: 200px;
  height: 200px;
  transform: translate(0, -150px);
  transform-style: preserve-3d;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    width: 100px;
    height: 10px;
    border-radius: 50%;
    left: 50%;
    translate: -50% 330px;
    background-color: rgba(0, 0, 0, 0.5);
    filter: blur(2px);
    animation: shadow 0.6s infinite alternate ease, rotateShadow 2.3s alternate infinite ease-in-out;
  }
}

.g-emoji {
  position: relative;
  width: 200px;
  height: 200px;
  perspective: 2000px;
  transform-style: preserve-3d;
  font-size: 200px;
  animation: rotate 2.3s alternate infinite ease-in-out,
    fall 0.6s alternate infinite cubic-bezier(0.22, 0.16, 0.04, 0.99) forwards;

  &::before,
  &::after {
    content: var(--emoji, '😀');
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
  }
  &::after {
    transform: translate(-50%, -50%) translateZ(-4px);
  }

  .g-foo,
  .g-bar,
  .g-baz {
    position: absolute;
    inset: 0;
    transform-style: preserve-3d;
  }

  .g-foo::before,
  .g-foo::after,
  .g-bar::before,
  .g-bar::after,
  .g-baz::before,
  .g-baz::after {
    content: var(--emoji, '😀');
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
  }
  .g-foo::before {
    transform: translate(-50%, -50%) translateZ(-8px);
    opacity: 0.95;
  }
  .g-foo::after {
    transform: translate(-50%, -50%) translateZ(-12px);
    opacity: 0.9;
  }
  .g-bar::before {
    transform: translate(-50%, -50%) translateZ(-16px);
    opacity: 0.85;
  }
  .g-bar::after {
    transform: translate(-50%, -50%) translateZ(-20px);
    opacity: 0.8;
  }
  .g-baz::before {
    transform: translate(-50%, -50%) translateZ(-24px);
    opacity: 0.75;
  }
  .g-baz::after {
    transform: translate(-50%, -50%) translateZ(-28px);
    opacity: 0.7;
  }
}

@keyframes rotateShadow {
  0% {
    rotate: y -30deg;
  }
  100% {
    rotate: y 30deg;
  }
}

@keyframes rotate {
  0% {
    rotate: 0 1 1 45deg;
  }
  100% {
    rotate: 0 1 1 -45deg;
  }
}

@keyframes rotateZ {
  0% {
    rotate: z 0;
  }
  100% {
    rotate: z 360deg;
  }
}

@keyframes fall {
  0% {
    scale: 1.25 0.75;
    translate: 0 150px;
  }
  25% {
    scale: 1 1;
  }
  100% {
    scale: 1 1;
    translate: 0 0;
  }
}

@keyframes shadow {
  0% {
    scale: 1.2;
  }
  40% {
    opacity: 0.7;
  }
  100% {
    scale: 0.5;
    opacity: 0.4;
  }
}
@keyframes gradient {
  100% {
    filter: hue-rotate(360deg);
  }
}
@keyframes move {
  0% {
    background-position: 0;
  }
  100% {
    background-position: -40px;
  }
}
@keyframes bgrotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>
