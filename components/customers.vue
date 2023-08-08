<template>
  <div>
    <Transition name="modal">
      <div v-if="store.openCustomer" class="customer-modal">
        <div class="container">
          <button @click="store.openCustomer = false, store.blur = false" class="close-btn">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.2852 20.7139L20.7132 11.2859M11.2852 11.2859L20.7132 20.7139" stroke="#2A3437" stroke-width="2"
                stroke-linecap="round" />
            </svg>
          </button>
          <h2 class="title">{{ $t('partnersBtn') }}</h2>
          <form action="" class="form">
            <div class="item">
              <label for="customer-name">{{ $t('name') }}</label>
              <input id="customer-name" type="text" :placeholder="$t('namePlaceholder')">
            </div>
            <div class="item">
              <label for="customer-email">{{ $t('email') }}</label>
              <input id="customer-email" type="email" :placeholder="$t('emailPlaceholder')">
            </div>
            <div class="item">
              <label for="customer-num">{{ $t('phone') }}</label>
              <input id="customer-num" type="number" placeholder="+998">
            </div>
            <div class="item">
              <label for="customer-com">{{ $t('company') }}</label>
              <input id="customer-com" type="text" :placeholder="$t('companyPlaceholder')">
            </div>
            <PrButton class="customer-button" :content="$t('employeSend')"></PrButton>
          </form>
        </div>
      </div>
    </Transition>
    <div class="partners">
      <div class="partners-nav">
        <div class="container">
          <div class="info">
            <p class="title">
              {{ $t('partnersTitle1') }}
            </p>

            <p class="text">
              {{ $t('partnersDesc1') }}
              {{ $t('partnersDesc2') }}
            </p>
          </div>
          <!-- <PrButton @click="store.openCustomer = true, store.blur = true" :content="$t('partnersBtn')"
            class="partnersBtn">
          </PrButton> -->
        </div>
      </div>
      <div class="content">
        <div class="container">
          <Swiper class="swiperWorks" :modules="modules" :autoplay="{
            delay: 3000,
            disableOnInteraction: true,
          }" :breakpoints="breakpointsPartners">>
            <SwiperSlide swiper-slide v-for="slide in trust?.data" :key="slide">
              <a :href="slide.url" style="display: block;" class="img">
                <img :src="slide.img" alt="">
              </a>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div class="container">
        <PrButton @click="store.openCustomer = true, store.blur = true" class="partnersBtnBottom"
          :content="$t('partnersBtn')"></PrButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '~/stores/counter';
import { Autoplay, Pagination, Navigation } from 'swiper';
const store = useStore()
const trust = ref()
let modules = [Autoplay, Pagination, Navigation];

onMounted(async () => {
  trust.value = await $fetch(store.baseUrl + '/trust')
})

const breakpointsPartners = {
  270: {
    slidesPerView: 1.2,
    spaceBetween: 12,
  },
  400: {
    slidesPerView: 1.4,
    spaceBetween: 12,
  },
  500: {
    slidesPerView: 1.8,
    spaceBetween: 12,
  },
  610: {
    slidesPerView: 2.2,
    spaceBetween: 15,
  },
  780: {
    slidesPerView: 2.8,
    spaceBetween: 20,
  },
  950: {
    slidesPerView: 3.2,
    spaceBetween: 20,
  },
  1100: {
    slidesPerView: 3.9,
    spaceBetween: 20,
  },
  1200: {
    slidesPerView: 4.2,
    spaceBetween: 20,
  },
  1500: {
    slidesPerView: 4.2,
    spaceBetween: 20,
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/var";
@import "@/assets/scss/main";

.partners {
  padding: 60px 10px 0;

  @include media(1400px) {
    padding-right: 0;
    padding-left: 0;
  }

  @include media(400px) {
    padding-top: 40px;
  }

  .partners-nav {
    .partnersBtn {
      @media (max-width: 660px) {
        display: none;
      }
    }

    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .info {
        p.title {
          font-size: 32px;
          font-weight: 700;
          line-height: 38px;
          color: var(--title);

          @media (max-width: 660px) {
            font-size: 24px;
            line-height: 28px;
          }
        }

        p.text {
          font-size: 20px;
          line-height: 38px;
          color: var(--text);

          span {
            color: var(--title);
            font-size: 20px;
            font-weight: 600px;
            color: var(--title);
            line-height: 24px;
          }

          @media (max-width: 660px) {
            font-size: 14px;
            line-height: 18px;

            span {
              font-size: 16px;
              font-weight: 600px;
            }
          }
        }
      }
    }
  }

  .content {
    margin-top: 30px;
    width: 100%;

    .container {
      @include media(1400px) {
        padding-right: 0;
      }

      .img {
        display: block;
        width: 100%;
        max-width: 320px;
        height: 168px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        border-radius: 12px;
        padding: 20px;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          mix-blend-mode: multiply;
        }
      }
    }
  }

  .container {
    .partnersBtnBottom {
      display: none;

      @media (max-width: 660px) {
        width: 100%;
        display: block;
        margin-top: 20px;
      }
    }
  }
}

.customer-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  z-index: 1510;
  padding: 40px;
  border-radius: 24px;
  background: var(--bgDark);
  box-shadow: var(--service);
  height: auto;
  overflow: auto;

  @include media(700px) {
    padding: 30px;
  }

  @include media(450px) {
    padding: 18px;
  }

  .container {
    position: relative;

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

      @include media(450px) {
        top: -2px;
        right: -2px;
      }

      svg path {
        stroke: var(--x-btn);
      }
    }

    .title {
      font-family: 'Unbounded';
      font-weight: 600;
      font-size: 28px;
      line-height: 30px;
      color: var(--title);
      margin-bottom: 24px;

      @include media(700px) {
        font-size: 24px;
        line-height: 26px;
      }

      @include media(450px) {
        font-size: 20px;
        line-height: 22px;
      }
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 24px;
      width: 478px;

      @include media(650px) {
        width: 70vw;
      }

      @include media(450px) {
        width: 75vw;
      }

      .item {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
        max-width: 100%;

        label {
          font-size: 16px;
          line-height: 18px;
          color: var(--modal-text);

          @include media(700px) {
            font-size: 14px;
            line-height: 16px;
          }
        }

        input {
          width: 100%;
          max-width: 100%;
          padding: 15px 18px;
          border-radius: 12px;
          border: 1px solid var(--modal-border);
          background: var(--bg-input);
          outline-color: var(--text);
          color: var(--title);

          @include media(700px) {
            padding: 14px 18px;
          }
        }

        input::placeholder {
          font-size: 16px;
          line-height: 18px;
          color: var(--modal-placeholder);

          @include media(700px) {
            font-size: 14px;
            line-height: 16px;
          }
        }
      }

      .item:nth-child(3) {
        input::placeholder {
          color: var(--title);
        }
      }

      .customer-button {
        margin-left: auto;
        padding: 14px 50px;

        @include media(700px) {
          font-size: 14px;
          line-height: 16px;
        }

        @include media(450px) {
          margin: 0;
        }
      }
    }
  }
}
</style>