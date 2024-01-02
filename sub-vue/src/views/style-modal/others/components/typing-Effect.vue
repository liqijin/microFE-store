<script setup>
export default {
  name:'typing-Effect'
}
</script>

<template>
  <div class="wrapper">
    <div class="typing-demo">This is a typing demo.</div>
  </div>
</template>

<style scoped lang="scss">
.typing-demo {
  width: 22ch;
  animation: typing 8s steps(22) infinite, blink 0.5s step-end infinite
  alternate;
  white-space: nowrap;
  overflow: hidden;
  border-right: 3px solid;
  font-family: monospace;
  font-size: 2em;
}

@keyframes typing {
  0% {
    width: 0;
  }
  50% {
    width: 22ch;
  }
  100% {
    width: 0;
  }
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}
</style>
