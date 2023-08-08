<template>
  <div>
   <Transition name="modal">
    <div v-if="store.openVideoModal" class="contentModal">
      <div class="container">
        <div class="slideModal">
          <div class="right-arrow" @click="closeModalWindow()">
            <img src="../assets/images/Arrowleft.png" alt="img">
          </div>
          <div class="left-arrow" @click="closeModalWindow()">
            <img src="../assets/images/arrowright.png" alt="img">
          </div>
          <Swiper  :slides-per-view="1" :modules="modules" :navigation="{
            nextEl: '.right-arrow',
            prevEl: '.left-arrow'
          }" :breakpoints="breakpointsModalVideo">>
            <SwiperSlide v-for="slide in homeVideo?.data" :key="slide">
              <cancel-modal @click="store.openVideoModal = false, store.blur = false" class="cancel"></cancel-modal>
              <video class="heroVid" @click="pauseVideo($event)" ref="videoSlide" :src="slide.video" controls>
              </video>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
   </Transition>
    <div class="video" id="works">
      <div class="container">
        <div class="video-nav">
          <div class="title">{{ $t("video") }}</div>
          <div>
            <PrButton @click="store.filterMenu = true" :to="localePath('/videosMore')" class="prButton" :content="$t('all_video')" />
          </div>
          <div class="arrows">
            <div class="site-banner-right-arrow">
              <img src="../assets/images/Arrowleft.png" alt="img">
            </div>
            <div class="site-banner-left-arrow">
              <img src="../assets/images/arrowright.png" alt="img">
            </div>
          </div>
        </div>
        <div class="content">
          <div class="site-banner-right-arrow">
            <img src="../assets/images/Arrowleft.png" alt="img">
          </div>
          <div class="site-banner-left-arrow">
            <img src="../assets/images/arrowright.png" alt="img">
          </div>
          <Swiper class="swiperVideo" :slides-per-view="4" :modules="modules" :navigation="{
            nextEl: '.site-banner-right-arrow',
            prevEl: '.site-banner-left-arrow'
          }" :autoplay="{
            delay: 3000,
            disableOnInteraction: true,
          }" :breakpoints="breakpoints">
            <SwiperSlide v-for="(slide, index) in homeVideo?.data" :key="slide">
              <img :src="slide.img" alt="img">
              <div class="playBtn">
                <div @click="store.openVideoModal = true, store.blur = true, setFirstSlide(index)">
                  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M15.6442 27.2607C15.1672 27.5733 14.6836 27.5905 14.1933 27.3124C13.7031 27.0343 13.458 26.609 13.458 26.0366V11.9634C13.458 11.391 13.7031 10.9657 14.1933 10.6876C14.6836 10.4095 15.1672 10.4268 15.6442 10.7394L26.7214 17.7912C27.1557 18.0774 27.3729 18.4804 27.3729 19C27.3729 19.5197 27.1557 19.9226 26.7214 20.2088L15.6442 27.2607Z"
                      fill="white" />
                  </svg>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <PrButton class="prButton bottom" content="Все видео" @click="store.filterMenu = true" :to="localePath('/videosMore')"></PrButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Autoplay, Pagination, Navigation } from 'swiper';
import { useStore } from '@/stores/counter';
let modules = [Autoplay, Pagination, Navigation];
const store = useStore()
const homeVideo = ref()
const video = ref(null);
const videoSlide = ref(null)


onMounted(async () => {
  homeVideo.value = await $fetch(store.baseUrl + '/video')
})


function setFirstSlide(index) {
  const spliced = homeVideo?.value.data.splice(index, 1)
  homeVideo?.value.data.unshift(spliced[0])
}

let playedVideo = ref()
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
const breakpoints = {
  70: {
    slidesPerView: 1,
    spaceBetween: 12,
  },
  270: {
    slidesPerView: 1.2,
    spaceBetween: 12,
  },
  560: {
    slidesPerView: 2,
    spaceBetween: 15,
  },
  660: {
    slidesPerView: 3,
    spaceBetween: 15,
  },

  990: {
    slidesPerView: 4,
    spaceBetween: 20,
  },
};
const breakpointsModalVideo = {
  270: {
    slidesPerView: 1,
    spaceBetween: 15,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/var";

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
      }
    }
  }
}

.video {
  padding: 60px 0;

  .video-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .arrows {
      display: none;

      @media (max-width: 560px) {
        display: flex;
        flex-direction: row-reverse;
      }
    }

    @media (max-width: 560px) {
      .prButton {
        display: none;
      }
    }

    .title {
      font-size: 32px;
      font-weight: 700;
      color: var(--title);

      @media (max-width: 660px) {
        font-size: 24px;
        line-height: 28px;
      }
    }
  }

  .content {
    margin: 0 10px;
    position: relative;

    .site-banner-right-arrow {
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

      @media (max-width: 560px) {
        display: none;
      }
    }

    .site-banner-left-arrow {
      position: absolute;
      border-radius: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: 0.2s ease-in;

      @media (max-width: 560px) {
        display: none;
      }
    }

    .swiperVideo {
      margin-top: 30px;

      .swiper-slide {
        position: relative;
        border-radius: 18px;
        overflow: hidden;
        width: 100%;
        height: 100%;


        img {
          height: 225px;
          width: 100%;
          object-fit: cover;
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
  }

  .prButton.bottom {
    display: none;
    width: 100%;
    margin-top: 18px;
  }

  @media (max-width: 560px) {
    .prButton.bottom {
      display: block;
    }
  }
}
</style>