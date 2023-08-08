<template>
  <div>
    <!-- hero qismi start  -->
    <div class="hero"
      :style="{ backgroundImage: 'url(' + (store.bgVar ? store.banner?.data[0].img : store.banner?.data[1].img) + ')' }">

      <div class="container flex justify-between items-center">
        <div class="info">
          <!-- <h1 class="title font-bold"><pre>{{ store.slider?.data }}</pre></h1> -->
          <div class="headerText">
            <Swiper class="swiperHero" ref="textSwiper"  :slides-per-view="1" :modules="modules"
              :autoplay="{
                delay: null,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }">>
              <SwiperSlide class="slideHero" v-for="(item, index) in store.slider?.data" :key="index">
                <h1 class="title font-bold">{{ item.text }}</h1>
              </SwiperSlide>
            </Swiper>
          </div>
          <!-- <prButton class="buttonPr" content="Поконсультироваться"></prButton>k -->
        </div>
        <div class="content">
          <img class="ustun" src="../assets/images/header-tv-ustun.png" alt="img">
          <div class="imageFrame">
            <Swiper :onSlideChange="change" ref="swiper" class="swiperHero" :slides-per-view="1" :modules="modules"
              :autoplay="{
                delay: null,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }">>
              <SwiperSlide class="slideHero" v-for="(item, index) in store.slider?.data" :key="index">
                <video @click="playVideo(index)" class="heroVid" ref="video" :src="item.video" :poster="item.img">
                </video>
                <Transition name="menu">
                  <div class="playBtn" @click="playVideo(index)" v-if="show">
                    <div>
                      <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M15.6442 27.2607C15.1672 27.5733 14.6836 27.5905 14.1933 27.3124C13.7031 27.0343 13.458 26.609 13.458 26.0366V11.9634C13.458 11.391 13.7031 10.9657 14.1933 10.6876C14.6836 10.4095 15.1672 10.4268 15.6442 10.7394L26.7214 17.7912C27.1557 18.0774 27.3729 18.4804 27.3729 19C27.3729 19.5197 27.1557 19.9226 26.7214 20.2088L15.6442 27.2607Z"
                          fill="white" />
                      </svg>
                    </div>
                  </div>
                </Transition>
                <a class="phoneBtn" :href="'tel:'" target="blank">
                  <button v-html="item.name">
                  </button>
                </a>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { Autoplay, Pagination, Navigation } from 'swiper';
import { useStore } from '@/stores/counter';
const store = useStore()
let modules = [Autoplay, Pagination, Navigation];
const video = ref(null);
const show = ref(true)
const swiper = ref('')
const textSwiper = ref('')
function playVideo(i) {
  if (video.value[i].paused) {
    video.value[i].play();
    show.value = false
  } else {
    video.value[i].pause();
    show.value = true
  }
}

// function stopSwiper() {
//   swiper.value.autoplay.delay = null
//   console.log(swiper.value.disableOnInteraction);
// }




function change() {
  video.value[0].pause();
  video.value[1].pause();
  show.value = true
}

onMounted(() => {
  swiper.value.autoplay.delay = store.delaySlide
  textSwiper.value.autoplay.delay = store.delaySlide
})

</script>
<style lang="scss" scoped>
@import "@/assets/scss/var";
@import "@/assets/scss/main";

// .textSwiper{
//   width: auto;
//   // max-width: 600px;
// }
.headerText{
  width: 100%;
  max-width: 600px;
  @media (max-width:1350px) {
    max-width: 500px;
  }
  @media (max-width:1150px) {
    max-width: 450px;
  }
  @media (max-width:1080px) {
    max-width: 400px;
  }
  @media (max-width:1040px) {
    max-width: 300px;
  }
  @media (max-width:940px) {
    max-width: 250px;
  }
  @media (max-width:890px) {
    max-width: 600px;
  }
}
.hero {
  padding: 140px 0;

  @media (max-width:660px) {
    padding: 60px 0;
  }



  .content {
    // position: relative;
    margin: 0 20px;
    perspective: 400px;
    transform-style: preserve-3d;

    .imageFrame {
      position: relative;
      // transform: rotateX(-3deg) rotateY(-5deg);
      // transform: scaleX(1) scaleY(1) scaleZ(1) rotateX(0deg) rotateY(-7deg) rotateZ(0deg) translateX(0px) translateY(0px) translateZ(0px) skewX(0deg) skewY(0deg);
      border: 12px solid #767676;
      overflow: hidden;
      width: 670px;
      height: 360px;

      .swiperHero,
      .slideHero {
        width: 100%;
        height: 100%;
      }

      video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      @media (max-width:1250px) {
        width: 625px;
        height: 325px;
      }

      @media (max-width:1180px) {
        width: 580px;
        height: 300px;
      }

      @media (max-width:660px) {
        width: 350px;
        height: 180px;
      }

      @media (max-width:360px) {
        width: 280px;
        height: 150px;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }

  }


  .phoneBtn {
    position: absolute;
    padding: 11px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background-color: #0ABC3C;
    z-index: 6;
    bottom: 5%;
    right: 5%;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    transition: .3s linear;

    &:hover {
      background-color: #1ae82b;
    }

    @media (max-width: 900px) {
      padding: 10px 16px;
      font-size: 14px;
      font-weight: 500;

      img {
        width: 10px;
      }
    }

    @media (max-width: 900px) {
      padding: 5px 8px;
      font-size: 12px;
      font-weight: 500;
      bottom: 8%;

      img {
        width: 10px;
      }
    }
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width:885px) {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 30px;
    }
  }

  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  .ustun {
    z-index: 999;
    position: absolute;
    bottom: 0%;
    left: 50%;
    transform: translate(-50%, 100%);
    // rotateY(-10deg)
  }

  .info {
    max-width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
  }

  h1.title {
    max-width: 500px;
    font-size: 52px;
    line-height: 60px;
    margin-right: 20px;
    color: #fff;
    text-align: center;
    @media (max-width: 660px) {
      text-align: center;
      font-size: 30px !important;
    }

    @media (max-width:1000px) {
      font-size: 43px;

    }

    @media (max-width:885px) {
      max-width: 600px;

    }

    @media (max-width:760px) {
      font-size: 43px;
    }

    @media (max-width:560px) {
      font-size: 35px;
      line-height: 40px;
    }
  }

  .playBtn {

    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.30);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;

    &::after {
      position: absolute;
      content: '';
      width: 80px;
      height: 80px;
      border-radius: 50%;
      z-index: -1;
      background: rgba(255, 255, 255, 0.4);
      animation: anim 1.5s ease infinite;
    }
  }

  @keyframes anim {
    0% {
      width: 40px;
      height: 40px;
      opacity: 1;
    }

    100% {
      width: 80px;
      height: 80px;
      opacity: 0;
    }
  }
}
</style>