<template>
  <div>
    <div class="blur" @click="store.removeBlur()" v-if="store.blur"></div>
    <the-banner />
    <div class="map pt-24">
      <div class="container flex justify-center items-center flex-col">
        <div class="custom-loader" v-if="store.isLoading"></div>
        <GoogleMap v-else id="map"></GoogleMap>
      </div>
    </div>
    <videos></videos>
    <works></works>
    <team></team>
    <numbers></numbers>
    <customers></customers>
    <register></register>
    <about-index></about-index>
    <comments></comments>
  </div>
</template>

<script setup>
import { useStore } from '@/stores/counter';
const store = useStore()
</script>

<style lang="scss">
@import "@/assets/scss/var";

.custom-loader {
  width: 50px;
  height: 50px;
  display: grid;
  border-radius: 50%;
  -webkit-mask: radial-gradient(farthest-side, #0000 40%, #000 41%);
  background: linear-gradient(0deg, #766DF480 50%, #766DF4FF 0) center/4px 100%,
    linear-gradient(90deg, #766DF440 50%, #766DF4BF 0) center/100% 4px;
  background-repeat: no-repeat;
  animation: s3 1s infinite steps(12);
}

.custom-loader::before,
.custom-loader::after {
  content: "";
  grid-area: 1/1;
  border-radius: 50%;
  background: inherit;
  opacity: 0.915;
  transform: rotate(30deg);
}

.custom-loader::after {
  opacity: 0.83;
  transform: rotate(60deg);
}

@keyframes s3 {
  100% {
    transform: rotate(1turn)
  }
}

.highlight {
  svg {
    path {
      fill: var(--prColor);
    }
  }
}



.gsap-box {
  width: 100px;
  height: 100px;
  background: blue;
}
</style>
