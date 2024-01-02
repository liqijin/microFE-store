<template>
  <div class="link-hover">
    <ol class="content">
      <li class="content__item">
        <a href="#" class="link link--metis">About us</a>
      </li>
      <li class="content__item">
        <a href="#" class="link link--io">Shop the look</a>
      </li>
      <li class="content__item">
        <a href="#" class="link link--thebe">Track package</a>
      </li>
      <li class="content__item">
        <a href="#" class="link link--leda" data-text="Our Philosophy">
          <span>Our Philosophy</span>
        </a>
      </li>
      <li class="content__item">
        <a href="#" class="link link--ersa">
          <span>Downloads</span>
        </a>
      </li>
      <li class="content__item">
        <a href="#" class="link link--elara">
          <span>Studio</span>
        </a>
      </li>
      <li class="content__item">
        <a href="#" class="link link--dia">Portfolio</a>
      </li>
      <li class="content__item">
        <a href="#" class="link link--kale">Explore more</a>
      </li>
      <li class="content__item">
        <a href="#" class="link link--carpo">Blog</a>
      </li>
      <li class="content__item">
        <a href="#" class="link link--helike"><span>Discover</span></a>
      </li>
      <li class="content__item">
        <a href="#" class="link link--mneme">Inquiries</a>
      </li>
      <li class="content__item">
        <a href="#" class="link link--iocaste">
          <span>Learn more</span>
          <svg class="link__graphic link__graphic--slide" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
            <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"></path>
          </svg>
        </a>
      </li>
      <li class="content__item">
        <a href="#" class="link link--herse">
          <span>Sign up</span>
          <svg class="link__graphic link__graphic--stroke link__graphic--arc" width="100%" height="18" viewBox="0 0 59 18"><path d="M.945.149C12.3 16.142 43.573 22.572 58.785 10.842" pathLength="1"/></svg>
        </a>
      </li>
      <li class="content__item">
        <a href="#" class="link link--carme">
          <span>Writings</span>
          <svg class="link__graphic link__graphic--stroke link__graphic--scribble" width="100%" height="9" viewBox="0 0 101 9"><path d="M.426 1.973C4.144 1.567 17.77-.514 21.443 1.48 24.296 3.026 24.844 4.627 27.5 7c3.075 2.748 6.642-4.141 10.066-4.688 7.517-1.2 13.237 5.425 17.59 2.745C58.5 3 60.464-1.786 66 2c1.996 1.365 3.174 3.737 5.286 4.41 5.423 1.727 25.34-7.981 29.14-1.294" pathLength="1"/></svg>
        </a>
      </li>
      <li class="content__item">
        <a href="#" class="link link--eirene"><span>Contact</span></a>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'linkHoverStyle',
  props: {},
  components: {},
  data() {
    return {
    }
  },
  created() {
    // 匹配特殊字符
    // const regexpStr = /[^0-9a-zA-Z\u4e00-\u9fa5]/
    // console.log(regexpStr.test('!'))
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
p:hover  {
  animation-play-state: running;
}

p {
  position: relative;
  width: 24ch;
  color: #000;
  font-size: 48px;
  animation: typing 3s steps(15, end);
  animation-fill-mode: both;
  animation-play-state: paused;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;

  &::before {
    position: absolute;
    content: "";
    width: 4px;
    top: 0;
    bottom: 0;
    right: 0;
    animation: blink .8s infinite;
  }
}

@keyframes blink {
  0%, 50% {
    border-right: 4px solid transparent;
  }
  50%, 100% {
    border-right: 4px solid #000;
  }
}

@keyframes typing {
  from {
    width: 11ch;
  }
  to {
    width: 24ch;
  }
}

.g-container {
  --s: 6;
  --h: 36;
  --w: 300;
  --speed: .8s;
  width: 300px;
  margin: auto;
  height: calc(var(--h) * 1px);
  line-height: calc(var(--h) * 1px);
  font-size: 20px;
  background: #673ab7;
  color: #fff;
  overflow: hidden;
}
.g-container-2 {
  --s: 6;
  --h: 36;
  --w: 300;
  --speed: 1s;
  width: 300px;
  margin: 20px auto;
  height: 36px;
  line-height: 36px;
  font-size: 20px;
  background: #673ab7;
  color: #fff;
  overflow: hidden;
  border: 2px solid #000;
}
.liMove-2 {
  display: flex;
  flex-wrap: nowrap;

  li {
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-left: 10px;
    box-sizing: border-box;
  }

  animation: move2 calc(var(--speed) * var(--s)) steps(var(--s)) infinite;

  li {
    white-space: nowrap;
    cursor: pointer;
    animation: liMove2 calc(var(--speed)) infinite;
  }
}
@keyframes move2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(calc(var(--s) * var(--w) * -1px), 0);
  }
}

@keyframes liMove2 {
  0% {
    transform: translate(0, 0px);
  }
  80%,
  100%  {
    transform: translate(calc(var(--w) * -1px), 0);
  }
}
.liMove {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  li {
    flex-shrink: 0;
    width: 100%;
    padding-left: 10px;
    box-sizing: border-box;
  }

  animation: move calc(var(--speed) * var(--s)) steps(var(--s)) infinite;

  li {
    white-space: nowrap;
    cursor: pointer;
    animation: liMove calc(var(--speed)) infinite;
  }
}

@keyframes move {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(0, calc(var(--s) * var(--h) * -1px));
  }
}

@keyframes liMove {
  0% {
    transform: translate(0, 0);
  }
  80%,
  100%  {
    transform: translate(0, calc(var(--h) * -1px));
  }
}
</style>
