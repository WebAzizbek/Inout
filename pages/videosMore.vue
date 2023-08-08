<template>
  <div>
    <div class="blur" @click="store.removeBlur()" v-if="store.blur"></div>
    <the-banner />

    <!-- Video Modal More -->
    <div v-if="store.videoModalMore" class="contentModal">
      <div class="container">
        <div class="slideModal">
          <div class="right-arrow" @click="closeModalWindow()">
            <img src="../assets/images/Arrowleft.png" alt="img">
          </div>
          <div class="left-arrow" @click="closeModalWindow()">
            <img src="../assets/images/arrowright.png" alt="img">
          </div>
          <Swiper :slides-per-view="1" :modules="modules" :navigation="{
            nextEl: '.right-arrow',
            prevEl: '.left-arrow'
          }">>
            <SwiperSlide v-for="slide in video?.data" :key="slide">
              <cancel-modal @click="store.videoModalMore = false, store.blur = false" class="cancel"></cancel-modal>
              <video class="heroVid vidios-more__vidio" @click="pauseVideo($event)" ref="videoSlide" :src="slide?.video"
                controls>
              </video>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>


    <div class="video">
      <div class="container">
        <div class="video-nav">
          <div class="title">{{ $t("video") }}</div>
        </div>
        <div class="content">
          <div class="element" swiper-slide v-for="(slide, index) in video?.data" :key="index">
            <div class="poster">
              <img :src="slide?.img" alt="img">
            </div>
            <div class="playBtn">
              <div @click="store.videoModalMore = true, store.blur = true, setFirstSlide(index)">
                <svg class="playBtn" width="38" height="38" viewBox="0 0 38 38" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.6442 27.2607C15.1672 27.5733 14.6836 27.5905 14.1933 27.3124C13.7031 27.0343 13.458 26.609 13.458 26.0366V11.9634C13.458 11.391 13.7031 10.9657 14.1933 10.6876C14.6836 10.4095 15.1672 10.4268 15.6442 10.7394L26.7214 17.7912C27.1557 18.0774 27.3729 18.4804 27.3729 19C27.3729 19.5197 27.1557 19.9226 26.7214 20.2088L15.6442 27.2607Z"
                    fill="white" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <!-- <PrButton class="prButton bottom" content="Все видео"></PrButton> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Autoplay, Pagination, Navigation } from 'swiper';
import { useStore } from '@/stores/counter'
const store = useStore()

let modules = [Autoplay, Pagination, Navigation];
const baseUrl = 'https://admin.opendoc.uz/api'

const video = ref();
const videoSlide = ref(null)
let playedVideo = ref()


onMounted(async () => {
  video.value = await $fetch(baseUrl + '/video')
})

function setFirstSlide(index) {
  console.log(video?.value);
  const spliced = video?.value.data.splice(index, 1)
  console.log(spliced);
  video?.value.data.unshift(spliced[0])
}

function pauseVideo(event) {
  playedVideo.value = event.target
  if (!event.target.paused) {
    event.target.play()
  } else {
    event.target.pause();
  }
}

function closeModalWindow(id) {
  if (playedVideo.value != undefined) {
    playedVideo.value.pause()
  }
}







</script>

<style lang="scss" scoped>
@import "@/assets/scss/var";

.video-nav {
  padding: 20px 0;

  .title {
    color: var(--title);
    font-size: 38px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    @media (max-width: 660px) {
      font-size: 24px;
    }
  }
}

.vidios-more__vidio {
  width: 100%;
  height: 722px !important;
  object-fit: contain !important;
  object-position: center;
  margin: 0 auto;
}

.video {
  // min-height: 80vh;
  margin: 30px auto;

  .content {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;

    @media (max-width: 1000px) {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }

    @media (max-width: 800px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }

    @media (max-width: 500px) {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 20px;
    }

    .element {
      position: relative;

      .poster {
        width: 100%;
        max-width: 320px;
        height: 100%;
        max-height: 225px;
        border-radius: 24px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
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

}

.contentModal {
  width: 100%;
  max-width: 1360px;
  height: 100%;
  max-height: 720px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1510;

  .container {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 0 20px;

    .right-arrow {
      position: absolute;
      border-radius: 50%;
      top: 50%;
      right: 0;
      transform: translate(50%, -50%);
      z-index: 10;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: 0.2s ease-in;
    }

    .left-arrow {
      position: absolute;
      border-radius: 50%;
      top: 50%;
      left: 0;
      transform: translate(-50%, -50%);
      z-index: 10;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: 0.2s ease-in;
    }

    .slideModal {
      width: 100%;
      position: relative;

      .cancel {
        position: absolute;
        top: 1%;
        right: 1%;
      }

      video,
      .heroVid {
        cursor: pointer;
        width: 100%;
        max-width: 1440px;
        height: 100%;
        max-height: 722px;
        object-fit: cover;
        object-position: center;
      }
    }
  }
}
</style>