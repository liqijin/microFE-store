<script setup>
export default {
  name: 'swift-bullfrog'
}
</script>

<template>
  <button>click me</button>
</template>

<style scoped lang="scss">
button {
  padding: 0.5rem 2.5rem 0.5rem 2.5rem;
  box-shadow: 0px 0px 0px 3px black;
  border: 0;
  border-radius: 0.5rem;
  font-size: 1rem;
  background-color: #ffc83d;
  color: black;
  font-weight: bolder;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  position: relative;
  transition: all 0.9s ease-in-out;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
}

button:hover {
  background-color: #f03a17;
  color: white;
}

button::before {
  content: '😍';
  position: absolute;
  left: -0rem;
  top: 0rem;
  opacity: 1;
  font-size: 1.55rem;
  transition: all 0.9s ease-in-out;
  transform: rotate(0deg);
}

button:hover::before {
  content: '😘';
  opacity: 1;
  visibility: visible;
  transform: rotate(40deg);
  font-size: 2.5rem;
  top: -0.75rem;
  transition: all 0.9s ease-in-out;
  animation: rightRun 2s forwards;
}

button:active::before {
  content: '🥰';
}

@keyframes rightRun {
  100% {
    transform: translateX(140px);
  }
}
</style>
