<script setup>
export default {
  name: 'quick-elephant'
}
</script>

<template>
  <div class="mini-loader-content">
    <svg
      viewBox="0 0 500.00001 500.00001"
      height="100"
      width="100"
      xmlns="http://www.w3.org/2000/svg"
      id="mini-loader"
    >
      <g>
        <path
          d="M66.734 66.734v366.533h366.532V66.734H66.734zm15 15h336.532v336.533H81.734V81.734z"
          id="b0"
        ></path>
        <path
          d="M354.16 2.5v143.34H497.5V2.5H354.16zm10 10H487.5v123.34H364.16V12.5z"
          id="b2"
        ></path>
        <path
          d="M0 2.5v143.34h143.34V2.5H0zm10 10h123.34v123.34H10V12.5z"
          id="b1"
        ></path>
        <path
          d="M354.16 356.66V500H497.5V356.66H354.16zm10 10H487.5V490H364.16V366.66z"
          id="b3"
        ></path>
        <path
          d="M0 356.66V500h143.34V356.66H0zm10 10h123.34V490H10V366.66z"
          id="b4"
        ></path>
      </g>
    </svg>
  </div>
</template>

<style scoped lang="scss">
#b0 {
  animation: b0 4s infinite ease;
  transform-origin: 250px 250px;
}

#b1 {
  animation: b1 4s infinite ease;
}

#b2 {
  animation: b2 4s infinite ease;
}

#b3 {
  animation: b3 4s infinite ease;
}

#b4 {
  animation: b4 4s infinite ease;
}

@keyframes b0 {
  0% {
    transform: rotate(0);
  }

  25% {
    transform: rotate(-90deg);
  }

  50% {
    transform: rotate(-180deg);
  }

  75% {
    transform: rotate(-270deg);
  }

  100% {
    transform: rotate(-360deg);
  }
}

@keyframes b1 {
  0% {
    transform: translate(0, 0);
  }

  25% {
    transform: translate(0, 355px);
  }

  50% {
    transform: translate(355px, 355px);
  }

  75% {
    transform: translate(355px, 0);
  }

  100% {
    transform: translate(0, 0);
  }
}

@keyframes b2 {
  0% {
    transform: translate(0, 0);
  }

  25% {
    transform: translate(-355px, 0);
  }

  50% {
    transform: translate(-355px, 355px);
  }

  75% {
    transform: translate(0, 355px);
  }

  100% {
    transform: translate(0, 0);
  }
}

@keyframes b3 {
  0% {
    transform: translate(0, 0);
  }

  25% {
    transform: translate(0, -355px);
  }

  50% {
    transform: translate(-355px, -355px);
  }

  75% {
    transform: translate(-355px, 0);
  }

  100% {
    transform: translate(0, 0);
  }
}

@keyframes b4 {
  0% {
    transform: translate(0, 0);
  }

  25% {
    transform: translate(355px, 0);
  }

  50% {
    transform: translate(355px, -355px);
  }

  75% {
    transform: translate(0, -355px);
  }

  100% {
    transform: translate(0, 0);
  }
}
</style>
