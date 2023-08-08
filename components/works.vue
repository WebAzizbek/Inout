<template>
  <div>
    <Transition name="modal">
      <div class="service" v-if="store.openService">
        <div class="container">
          <cancel-modal @click="store.openService = false, store.blur = false" class="cancel"></cancel-modal>
          <NuxtLink class="logo" :to="localePath('/')">
            <div class="logo-wrapper">
              <img src="~/assets/images/service-logo.png" alt="LoGo" width="79" height="79">
            </div>
          </NuxtLink>
          <div class="text-wrapper">
            <h2 class="title">{{ modalWorks.info }}</h2>
            <p class="text">{{ modalWorks.text }}</p>
          </div>
          <div v-for="item in modalWorks.blocks" :key="item" class="list">
            <div class="item">
              <div class="box">
                <img src="~/assets/images/svg/check.svg" alt="check" width="24" height="24">
              </div>
              <div class="item-text">{{ item.title }}</div>
            </div>
          </div>
          <div class="service-world">
            <img src="~/assets/images/earth.png" alt="earth" width="80" height="80">
            <p class="service-world-text">{{ $t('modalWorksInfo') }}</p>
          </div>
          <ul class="social">
            <a :href="modalWorks.telegram_url" class="social-item">
              <img src="~/assets/images/svg/telegram-social.svg" alt="telgram" width="24" height="24">
              <p class="social-item-text">{{ $t('worksTg') }}</p>
            </a>
            <a class="social-item" href="#map" @click="store.openService = false, store.removeBlur()">
              <img src="~/assets/images/svg/done.svg" alt="done" width="24" height="24">
              <div class="social-item-text">{{ $t('worksOrder') }}</div>
            </a>
            <a href="tel:${modalWorks.phone_url}" class="social-item">
              <img src="~/assets/images/svg/call-social.svg" alt="call" width="20" height="20">
              <p class="social-item-text">{{ $t('worksCall') }}</p>
            </a>
            <a download :href="modalWorks.file_url" class="social-item">
              <img src="~/assets/images/svg/download-social.svg" alt="download" width="24" height="24">
              <p class="social-item-text">{{ $t('worksDownload') }}</p>
            </a>
          </ul>
        </div>
      </div>
    </Transition>
    <div class="works">
      <div class="container">
        <div class="works-nav">
          <p>{{ $t('worksTitle1') }}</p>
        </div>
        <div class="content">
          <Swiper class="swiperWorks" :modules="modules" :autoplay="{
            delay: 3000,
            disableOnInteraction: true,
          }"  :breakpoints="breakpointsWork">>
            <SwiperSlide swiper-slide v-for="item in store.work?.data" :key="item.id">
              <div class="img">
                <img :src="item.img" alt="img">
              </div>
              <div class="info">
                <p class="title">{{ item.info }}</p>
                <p class="text line-clamp-5" v-html="item.text"></p>
                <transparentBtn @click="store.openService = true, getItem(item), store.blur = true" class="btn"
                  :transparentBtnContent="$t('next')">
                </transparentBtn>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Autoplay, Pagination, Navigation } from 'swiper';
import { useStore } from '@/stores/counter';
let modules = [Autoplay, Pagination, Navigation];
const store = useStore()
const modalWorks = ref()
const breakpointsWork = {
  700: {
    slidesPerView: 1,
    spaceBetween: 10,
  },
  900: {
    slidesPerView: 1.7,
    spaceBetween: 15,
  },
  1200: {
    slidesPerView: 2,
    spaceBetween: 15,
  },

};

function getItem(item) {
  modalWorks.value = item
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/var";
@import "@/assets/scss/main";



.service {
  overflow: auto !important;
  position: fixed;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  background: var(--bgDark);
  z-index: 1510;
  padding: 40px;
  border-radius: 18px;
  box-shadow: var(--service);

  @include media(650px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }

  @include media(600px) {
    padding: 20px;
  }

  @include media(400px) {
    padding: 27px 12px 17px;
  }

  .container {
    position: relative;
    padding: 0;

    .close-btn {
      position: absolute;
      top: -11px;
      right: -11px;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: var(--bgDark);

      @include media(400px) {
        top: 0;
        right: 0;
      }

      svg path {
        stroke: var(--x-btn);
      }
    }

    .logo {
      display: flex;

      @include media(500px) {
        justify-content: center;
      }

      margin-bottom: 18px;

      .logo-wrapper {
        width: 79px;
        height: 79px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          min-width: 81px;
          min-height: 81px;
          object-fit: cover;
          object-position: center;
        }
      }
    }

    .text-wrapper {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 30px;

      @include media(500px) {
        margin-bottom: 24px;
      }

      .title {
        font-family: 'Unbounded';
        font-weight: 600;
        line-height: 30px;
        color: var(--title);
        font-size: 28px;

        @include media(500px) {
          font-size: 20px;
          line-height: 22px;
          text-align: center;
        }
      }

      .text {
        width: 100%;
        max-width: 612px;
        font-size: 16px;
        line-height: 22px;
        color: var(--num);

        @include media(500px) {
          font-size: 14px;
          line-height: 18px;
          text-align: center;
          margin: 0 auto;
        }
      }
    }

    .list {
      display: flex;
      flex-direction: column;
      gap: 18px;
      margin-bottom: 30px;

      @include media(500px) {
        margin-bottom: 24px;
      }

      .item {
        display: flex;
        align-items: center;
        gap: 18px;

        .box {
          min-width: 28px;
          min-height: 28px;
          border-radius: 50%;
          background: rgba(10, 151, 188, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .item-text {
          font-weight: 500;
          font-size: 16px;
          line-height: 21px;
          color: var(--title);
        }
      }
    }

    .service-world {
      width: 735px;
      padding: 18px;
      box-shadow: 0px 6px 12px 0px var(--shadow-service);
      background: var(--jobs-item);
      border-radius: 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 30px;

      @include media(870px) {
        width: 600px;
      }

      @include media(750px) {
        width: 500px;
      }

      @include media(650px) {
        width: 100%;
      }

      @include media(500px) {
        flex-direction: column;
        justify-content: center;
        gap: 30px;
      }

      .service-world-text {
        width: 100%;
        max-width: 589px;
        font-weight: 400;
        font-size: 16px;
        line-height: 21px;
        color: var(--num);

        @include media(500px) {
          text-align: center;
        }
      }
    }

    .social {
      padding: 10px;
      display: flex;
      align-items: center;
      gap: 18px;
      box-shadow: 0px 6px 12px 0px var(--shadow-service);
      background: var(--jobs-item);
      border-radius: 18px;
      flex-wrap: wrap;

      @include media(660px) {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-bottom: 24px;
      }

      .social-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 14px 18px;
        border-radius: 12px;

        @include media(660px) {
          width: 100%;
        }

        .social-item-text {
          color: #fff;
          font-weight: 600;
          font-size: 16px;
          line-height: 18px;
        }
      }

      .social-item:first-child {
        background: var(--prColor);
        flex-grow: 1;
      }

      .social-item:nth-child(2) {
        background: var(--prColor);
        flex-grow: 1;
      }

      .social-item:nth-child(3) {
        flex-grow: 1;
        background: #0abc3c;
      }

      .social-item:last-child {
        background: #9da008;
        flex-grow: 1;
      }
    }
  }
}

.works {
  padding: 60px 0;

  .container {
    .works-nav {
      p {
        font-size: 32px;
        color: var(--title);
        font-weight: 700;
        line-height: 38px;

        @media (max-width: 660px) {
          font-size: 24px;
          line-height: 28px;
        }

        span {
          color: var(--prColor);
        }
      }
    }

    .content {
      margin-top: 30px;

      .swiperWorks {
        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: center;
          height: max-content;

          @media (max-width: 660px) {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            gap: 20px;
            padding: 0 10px;
          }


          .img {
            width: 100%;
            max-width: 376px;
            height: 100%;
            max-height: 224px;
            border-radius: 12px;
            overflow: hidden;


            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          .info {
            width: 100%;
            padding: 10px 18px;
            background-color: var(--bgDark);
            border-radius: 18px;

            @media (max-width: 660px) {
              max-width: 440px;
            }

            .title {
              font-size: 18px;
              font-weight: 700;
              color: var(--title);
              max-width: 200px;
              line-height: 22px;

              @media (max-width: 660px) {
                max-width: 400px;
                font-size: 16px;
                line-height: 22px;
              }
            }

            .text {
              font-size: 14px;
              color: var(--text);
              max-width: 260px;
              line-height: 18px;
              margin-top: 12px;

              @media (max-width: 660px) {
                max-width: 400px;
                font-size: 14px;
                line-height: 18px;
              }
            }

            .btn {
              margin-top: 33px;

              @media (max-width: 660px) {
                width: 100%;

              }
            }
          }
        }
      }
    }
  }

}</style>