<script setup>
export default {
  name: 'aaron-lker'
}
</script>

<template>
  <div class="checkbox-wrapper-44">
    <label class="toggleButton">
      <input type="checkbox" />
      <div>
        <svg viewBox="0 0 44 44">
          <path
            d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758"
            transform="translate(-2.000000, -2.000000)"
          ></path>
        </svg>
      </div>
    </label>
  </div>
</template>

<style scoped lang="scss">
.checkbox-wrapper-44 input[type='checkbox'] {
  display: none;
  visibility: hidden;
}

.checkbox-wrapper-44 *,
.checkbox-wrapper-44 *::before,
.checkbox-wrapper-44 *::after {
  box-sizing: border-box;
}

.checkbox-wrapper-44 .toggleButton {
  cursor: pointer;
  display: block;
  transform-origin: 50% 50%;
  transform-style: preserve-3d;
  transition: transform 0.14s ease;
}
.checkbox-wrapper-44 .toggleButton:active {
  transform: rotateX(30deg);
}
.checkbox-wrapper-44 .toggleButton input + div {
  border: 3px solid rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  position: relative;
  width: 44px;
  height: 44px;
}
.checkbox-wrapper-44 .toggleButton input + div svg {
  fill: none;
  stroke-width: 3.6;
  stroke: #000;
  stroke-linecap: round;
  stroke-linejoin: round;
  width: 44px;
  height: 44px;
  display: block;
  position: absolute;
  left: -3px;
  top: -3px;
  right: -3px;
  bottom: -3px;
  z-index: 1;
  stroke-dashoffset: 124.6;
  stroke-dasharray: 0 162.6 133 29.6;
  transition: all 0.4s ease 0s;
}
.checkbox-wrapper-44 .toggleButton input + div:before,
.checkbox-wrapper-44 .toggleButton input + div:after {
  content: '';
  width: 3px;
  height: 16px;
  background: #000;
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 5px;
}
.checkbox-wrapper-44 .toggleButton input + div:before {
  opacity: 0;
  transform: scale(0.3) translate(-50%, -50%) rotate(45deg);
  -webkit-animation: bounceInBefore-44 0.3s linear forwards 0.3s;
  animation: bounceInBefore-44 0.3s linear forwards 0.3s;
}
.checkbox-wrapper-44 .toggleButton input + div:after {
  opacity: 0;
  transform: scale(0.3) translate(-50%, -50%) rotate(-45deg);
  -webkit-animation: bounceInAfter-44 0.3s linear forwards 0.3s;
  animation: bounceInAfter-44 0.3s linear forwards 0.3s;
}
.checkbox-wrapper-44 .toggleButton input:checked + div svg {
  stroke-dashoffset: 162.6;
  stroke-dasharray: 0 162.6 28 134.6;
  transition: all 0.4s ease 0.2s;
}
.checkbox-wrapper-44 .toggleButton input:checked + div:before {
  opacity: 0;
  transform: scale(0.3) translate(-50%, -50%) rotate(45deg);
  -webkit-animation: bounceInBeforeDont-44 0.3s linear forwards 0s;
  animation: bounceInBeforeDont-44 0.3s linear forwards 0s;
}
.checkbox-wrapper-44 .toggleButton input:checked + div:after {
  opacity: 0;
  transform: scale(0.3) translate(-50%, -50%) rotate(-45deg);
  -webkit-animation: bounceInAfterDont-44 0.3s linear forwards 0s;
  animation: bounceInAfterDont-44 0.3s linear forwards 0s;
}

@-webkit-keyframes bounceInBefore-44 {
  0% {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%) rotate(45deg);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.1) translate(-50%, -50%) rotate(45deg);
  }
  80% {
    opacity: 1;
    transform: scale(0.89) translate(-50%, -50%) rotate(45deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%) rotate(45deg);
  }
}

@keyframes bounceInBefore-44 {
  0% {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%) rotate(45deg);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.1) translate(-50%, -50%) rotate(45deg);
  }
  80% {
    opacity: 1;
    transform: scale(0.89) translate(-50%, -50%) rotate(45deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%) rotate(45deg);
  }
}
@-webkit-keyframes bounceInAfter-44 {
  0% {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%) rotate(-45deg);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.1) translate(-50%, -50%) rotate(-45deg);
  }
  80% {
    opacity: 1;
    transform: scale(0.89) translate(-50%, -50%) rotate(-45deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%) rotate(-45deg);
  }
}
@keyframes bounceInAfter-44 {
  0% {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%) rotate(-45deg);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.1) translate(-50%, -50%) rotate(-45deg);
  }
  80% {
    opacity: 1;
    transform: scale(0.89) translate(-50%, -50%) rotate(-45deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%) rotate(-45deg);
  }
}
@-webkit-keyframes bounceInBeforeDont-44 {
  0% {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%) rotate(45deg);
  }
  100% {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%) rotate(45deg);
  }
}
@keyframes bounceInBeforeDont-44 {
  0% {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%) rotate(45deg);
  }
  100% {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%) rotate(45deg);
  }
}
@-webkit-keyframes bounceInAfterDont-44 {
  0% {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%) rotate(-45deg);
  }
  100% {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%) rotate(-45deg);
  }
}
@keyframes bounceInAfterDont-44 {
  0% {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%) rotate(-45deg);
  }
  100% {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%) rotate(-45deg);
  }
}
</style>
