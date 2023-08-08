<template>
  <div>

    <div class="about">
      <div class="container">
        <NuxtLink :to="localePath('/')" @click="store.filterMenu = false" class="back-btn">
          <img src="@/assets/images/svg/arrow-left.svg" alt="arrow" width="24" height="24">
          <p class="back-text">{{ $t('back') }}</p>
        </NuxtLink>
        <div class="about-main">
          <div class="img-wrapper">
            <img :src="store.about?.data.img" alt="in-out" width="714" height="403">
          </div>
          <div class="about-main-text-wrapper">
            <h3 class="about-main-title">{{ $t('inoutTitle1') }} <span>{{ $t('inoutTitle2') }}</span></h3>
            <p class="about-main-text" v-html="store.about?.data.text"></p>
          </div>
          <div class="about-main-bottom">
            <h3 class="about-main-bottom-title">{{ $t('our') }} <span>{{ $t('aboutDesc') }}</span></h3>
            <div class="about-main-bottom-list">
              <div class="about-main-botton-item" v-for="(aboutInfo, i) in store.about?.data.blocks" :key="i">
                <p class="about-main-bottom-num">{{ aboutInfo.num }}</p>
                <p class="about-main-bottom-item-bottom-text" v-html="aboutInfo.text"></p>
              </div>
            </div>
          </div>
        </div>
        <div class="about-app">
          <h4 class="about-app-title">{{ $t('aboutApp') }}</h4>
          <div class="about-app-list">
            <a :href="socialImg.url" target="blank" class="about-app-item" v-for="socialImg in socialMedia?.data"
              :key="socialImg">
              <img :src="socialImg.img" alt="icone" width="32" height="32">
            </a>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { useStore } from '@/stores/counter'
const store = useStore()
const baseUrl = 'https://admin.opendoc.uz/api'
const socialMedia = ref("")



async function getSocailMedia() {
  socialMedia.value = await $fetch(baseUrl + "/media")
}
onMounted(async () => {
  await getSocailMedia()
})


</script>

<style scoped>
#load {
  position: absolute;
  width: 700px;
  height: 36px;
  left: 50%;
  top: 40%;
  margin-left: -300px;
  overflow: visible;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: default;
}

#load div {
  position: absolute;
  width: 50px;
  height: 56px;
  opacity: 0;
  font-size: 30px;
  font-family: Helvetica, Arial, sans-serif;
  animation: move 2s linear infinite;
  -o-animation: move 2s linear infinite;
  -moz-animation: move 2s linear infinite;
  -webkit-animation: move 2s linear infinite;
  transform: rotate(180deg);
  -o-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  color: #35C4F0;
}

#load div:nth-child(2) {
  animation-delay: 0.2s;
  -o-animation-delay: 0.2s;
  -moz-animation-delay: 0.2s;
  -webkit-animation-delay: 0.2s;
}

#load div:nth-child(3) {
  animation-delay: 0.4s;
  -o-animation-delay: 0.4s;
  -webkit-animation-delay: 0.4s;
  -webkit-animation-delay: 0.4s;
}

#load div:nth-child(4) {
  animation-delay: 0.6s;
  -o-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  -webkit-animation-delay: 0.6s;
}

#load div:nth-child(5) {
  animation-delay: 0.8s;
  -o-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  -webkit-animation-delay: 0.8s;
}

#load div:nth-child(6) {
  animation-delay: 1s;
  -o-animation-delay: 1s;
  -moz-animation-delay: 1s;
  -webkit-animation-delay: 1s;
}

#load div:nth-child(7) {
  animation-delay: 1.2s;
  -o-animation-delay: 1.2s;
  -moz-animation-delay: 1.2s;
  -webkit-animation-delay: 1.2s;
}

@keyframes move {
  0% {
    left: 0;
    opacity: 0;
  }

  35% {
    left: 41%;
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    opacity: 1;
  }

  65% {
    left: 59%;
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    opacity: 1;
  }

  100% {
    left: 100%;
    -moz-transform: rotate(-180deg);
    -webkit-transform: rotate(-180deg);
    -o-transform: rotate(-180deg);
    transform: rotate(-180deg);
    opacity: 0;
  }
}

@-moz-keyframes move {
  0% {
    left: 0;
    opacity: 0;
  }

  35% {
    left: 41%;
    -moz-transform: rotate(0deg);
    transform: rotate(0deg);
    opacity: 1;
  }

  65% {
    left: 59%;
    -moz-transform: rotate(0deg);
    transform: rotate(0deg);
    opacity: 1;
  }

  100% {
    left: 100%;
    -moz-transform: rotate(-180deg);
    transform: rotate(-180deg);
    opacity: 0;
  }
}

@-webkit-keyframes move {
  0% {
    left: 0;
    opacity: 0;
  }

  35% {
    left: 41%;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    opacity: 1;
  }

  65% {
    left: 59%;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    opacity: 1;
  }

  100% {
    left: 100%;
    -webkit-transform: rotate(-180deg);
    transform: rotate(-180deg);
    opacity: 0;
  }
}

@-o-keyframes move {
  0% {
    left: 0;
    opacity: 0;
  }

  35% {
    left: 41%;
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    opacity: 1;
  }

  65% {
    left: 59%;
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    opacity: 1;
  }

  100% {
    left: 100%;
    -o-transform: rotate(-180deg);
    transform: rotate(-180deg);
    opacity: 0;
  }
}
</style>