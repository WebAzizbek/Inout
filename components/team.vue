<template>
  <div>
    <div class="comanda">
      <div class="container">
        <div class="comanda-nav">
          <div class="comanda-nav__text">
            <p class="title">{{ $t('our') }} <span>{{ $t('team') }}</span></p>
            <p class="text">{{ $t('team_text1') }}<span>{{ $t('team_text2') }}</span>, <span>{{
              $t('team_text3')
            }}</span>{{ $t('team_text4') }}
              <span>{{ $t('team_text5') }}</span>
            </p>
          </div>
          <div>
            <PrButton :to="localePath('/listComanda')" @click="store.filterMenu = true" class="btnTop"
              :content="$t('all_comand')">
            </PrButton>
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
          <Swiper class="swiperComanda" :modules="modules" :autoplay="{
            delay: 3000,
            disableOnInteraction: true,
          }" :navigation="{
  nextEl: '.site-banner-right-arrow',
  prevEl: '.site-banner-left-arrow'
}" :breakpoints="breakpointsComanda">
            <SwiperSlide class="swiperSlideComanda" v-for="user in comandaInfo?.data" :key="user.id">
              <div class="img">
                <img class="team-user-img" :src="user.img" :alt="user.job">
                <button class="team-icone__btn" @click="getTeamImg(user), store.teamModal = true, store.blur = true">
                  <img class="team-icone__img" src="../assets/images/svg/comanda-icone.svg" alt="icone">
                </button>

              </div>
              <div class="info">
                <p class="title">{{ user.name }}</p>
                <p class="job-name">{{ user.job }}</p>
                <!-- s? -->
                <div class="icons">
                  <a :href="user.instagram" class="instagram">
                    <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="32" height="32" rx="7" fill="#CF11D2" />
                      <path
                        d="M13.19 16.097a2.913 2.913 0 1 1 5.825.001 2.913 2.913 0 0 1-5.826 0Zm-1.576 0a4.488 4.488 0 0 0 4.489 4.487 4.488 4.488 0 1 0 0-8.973 4.488 4.488 0 0 0-4.49 4.486Zm8.107-4.664a1.048 1.048 0 0 0 1.79.742 1.048 1.048 0 0 0-.74-1.79h-.001a1.05 1.05 0 0 0-1.05 1.048Zm-7.15 11.776c-.852-.039-1.316-.18-1.624-.3a2.717 2.717 0 0 1-1.005-.654 2.695 2.695 0 0 1-.654-1.004c-.12-.308-.262-.771-.3-1.623-.043-.92-.052-1.198-.052-3.53 0-2.334.01-2.61.051-3.532.039-.852.182-1.314.3-1.622.16-.408.349-.7.655-1.005a2.694 2.694 0 0 1 1.005-.654c.308-.12.772-.262 1.624-.3.921-.043 1.198-.051 3.532-.051 2.333 0 2.61.009 3.533.05.852.04 1.315.182 1.623.301.409.158.7.348 1.006.654.306.305.495.597.654 1.005.12.307.262.77.3 1.622.043.922.051 1.198.051 3.531s-.008 2.61-.05 3.531c-.04.852-.182 1.315-.301 1.623a2.706 2.706 0 0 1-.654 1.004 2.716 2.716 0 0 1-1.006.654c-.307.12-.77.261-1.623.3-.922.042-1.198.05-3.533.05s-2.61-.008-3.532-.05Zm-.072-15.796c-.931.042-1.567.19-2.123.406a4.289 4.289 0 0 0-1.548 1.007 4.268 4.268 0 0 0-1.009 1.548c-.216.556-.363 1.19-.406 2.12-.043.933-.053 1.23-.053 3.603s.01 2.67.053 3.602c.043.93.19 1.566.406 2.121a4.27 4.27 0 0 0 1.009 1.548 4.3 4.3 0 0 0 1.548 1.008c.557.216 1.192.363 2.123.405.932.043 1.23.053 3.604.053s2.672-.01 3.604-.052c.931-.043 1.566-.19 2.122-.406a4.3 4.3 0 0 0 1.549-1.008 4.282 4.282 0 0 0 1.008-1.548c.216-.555.365-1.19.406-2.12.043-.933.053-1.23.053-3.603s-.01-2.67-.053-3.602c-.042-.93-.19-1.566-.406-2.12a4.297 4.297 0 0 0-1.008-1.549A4.278 4.278 0 0 0 21.83 7.82c-.556-.216-1.192-.365-2.122-.406-.932-.043-1.23-.053-3.604-.053-2.375 0-2.673.01-3.605.053Z"
                        fill="#fff" />
                    </svg>
                  </a>
                  <a :href="user.telegram" class="telegram">
                    <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#a)">
                        <rect width="32" height="32" rx="7" fill="#fff" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M87.516 0H0v87.516h87.516V0ZM16.103 24.845a8.742 8.742 0 1 0 0-17.485 8.742 8.742 0 0 0 0 17.485Zm-4.995-8.934s4.33-1.842 5.832-2.491c.576-.26 2.529-1.09 2.529-1.09s.9-.363.826.519c-.018.262-.128.998-.263 1.905v.002l-.163 1.103-.626 4.074s-.05.597-.475.7c-.426.105-1.127-.363-1.252-.466-.021-.017-.122-.085-.273-.188-.545-.369-1.745-1.182-2.255-1.629-.175-.155-.375-.467.025-.83a97.16 97.16 0 0 0 2.628-2.595c.3-.312.601-1.038-.65-.156a213.846 213.846 0 0 1-3.53 2.465s-.4.26-1.152.026a50.707 50.707 0 0 1-1.627-.545s-.6-.389.426-.804Z"
                          fill="#34AADF" />
                      </g>
                      <defs>
                        <clipPath id="a">
                          <rect width="32" height="32" rx="7" fill="#fff" />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                  <a :href="user.phone" class="phone">
                    <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="32" height="32" rx="7" fill="#0A97BC" />
                      <path
                        d="M23.002 23.887c-1.702 0-3.387-.404-5.056-1.212a16.35 16.35 0 0 1-4.47-3.177 16.45 16.45 0 0 1-3.181-4.465c-.81-1.666-1.216-3.35-1.216-5.052a.89.89 0 0 1 .263-.656.89.89 0 0 1 .656-.262h2.854c.226 0 .424.07.593.209.169.14.273.32.314.541l.501 2.574c.035.216.031.412-.01.588a.902.902 0 0 1-.278.46l-2.012 1.968a15.565 15.565 0 0 0 2.472 3.18c.957.947 2.04 1.773 3.249 2.477l1.955-1.989c.143-.142.311-.244.506-.304s.394-.072.598-.037l2.43.494c.22.05.401.157.54.32.14.165.21.36.21.587v2.837a.89.89 0 0 1-.262.657.89.89 0 0 1-.656.262ZM11.33 14.161l1.561-1.494a.157.157 0 0 0 .055-.093.204.204 0 0 0-.004-.11l-.38-1.954a.18.18 0 0 0-.06-.101.17.17 0 0 0-.109-.034h-1.871a.114.114 0 0 0-.118.118 11.194 11.194 0 0 0 .926 3.668Zm7.578 7.512c.58.27 1.185.477 1.815.62.63.143 1.219.228 1.766.255a.115.115 0 0 0 .118-.118v-1.841a.17.17 0 0 0-.034-.11.18.18 0 0 0-.1-.058l-1.838-.374a.139.139 0 0 0-.089-.004.214.214 0 0 0-.08.055l-1.558 1.575Z"
                        fill="#fff" />
                    </svg>
                  </a>
                </div>
                <TransparentBtn @click=" store.openEmployee = true, employeeInfoModal(user), store.blur = true"
                  class="trBtn" :transparentBtnContent="$t('baholash')"></TransparentBtn>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <PrButton :to="localePath('/listComanda')" @click="store.filterMenu = true" class="prBtnBottom"
          :content="$t('all_comand')"></PrButton>
      </div>
    </div>

    <!--TEAM MODAL -->
    <div class="team-modal" :class="store.teamModal == true ? 'team-icone' : 'teamModalClose'">
      <button class="team-modal__close" @click="store.teamModal = false, store.blur = false">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.2852 20.7139L20.7132 11.2859M11.2852 11.2859L20.7132 20.7139" stroke="#fff" stroke-width="2"
            stroke-linecap="round" />
        </svg>

      </button>
      <img class="team-modal__img" :src="teamModalImg">
    </div>

    <Transition name="modal">
      <div class="employee-modal" v-if="store.openEmployee">
        <div class="employee-header">
          <h2 class="employee-header-title">{{ $t("employeTitle") }}</h2>
          <cancel-modal @click=" store.openEmployee = false, store.blur = false" class="cancel"></cancel-modal>
        </div>
        <div class="employee-modal-user">
          <img class="employe-user-img" :src="employeModalInfo.img" alt="icone">
          <div class="employee-user-info">
            <h3>{{ employeModalInfo.name }}</h3>
            <span>{{ employeModalInfo.job }}</span>
          </div>
        </div>
        <div class="employee-modal-stars">
          <p class="employee-stars-desc">{{ $t("employeStar") }}</p>
          <div class="employee-stars">
            <div ref="reviewRating" class="rating" v-for="(index) in 5" :key="index" @click="addStars(index)">
              <svg width="33" height="33" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg">
                <path
                  d="m16.5 27.145-8.091 5.116c-.302.185-.604.262-.906.233a1.6 1.6 0 0 1-.822-.32 1.814 1.814 0 0 1-.568-.724c-.133-.298-.155-.627-.064-.988l2.148-9.632-7.144-6.483a1.62 1.62 0 0 1-.452-1.778c.112-.302.274-.549.484-.74.211-.192.5-.317.864-.376l9.428-.864 3.66-9.095c.132-.338.334-.589.605-.75C15.912.58 16.2.5 16.5.5c.301 0 .587.081.858.243.27.162.473.413.606.75l3.66 9.096 9.427.864c.365.059.653.184.864.376.21.191.371.438.483.74a1.62 1.62 0 0 1-.452 1.778l-7.143 6.483 2.148 9.632c.09.36.07.69-.064.988a1.813 1.813 0 0 1-.568.723 1.6 1.6 0 0 1-.822.321c-.302.03-.604-.048-.906-.233L16.5 27.145Z"
                  fill="var(--employee-star-bg)" />
              </svg>
            </div>
          </div>
        </div>
        <div class="employee-modal-yourMessage">
          <p class="employee-youMessage-desc">{{ $t("employeMessage") }}</p>
          <textarea class="employee-youMessage-textArea" :placeholder="$t('employeMessage')"
            v-model="employeeModalComment"></textarea>
        </div>
        <button class="employee-modal-btn" @click="employeeGet(index, employeModalInfo)">{{ $t("employeSend") }}</button>
      </div>
    </Transition>

    <Transition name="modal">
      <div class="employee-modal" v-if="store.done">
        <div class="contentDone">
          <cancel-modal @click="store.done = false, store.blur = false" class="cancel"></cancel-modal>
          <div class="done">
            <img src="../assets/images/doneimg.png" alt="icon">
          </div>
          <p class="title">{{ $t('doneTitle') }}</p>
          <p class="text">{{ $t('doneText') }}</p>
          <PrButton @click="store.done = false, store.blur = false" :content="$t('doneBack')" class="btnPr"></PrButton>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { Autoplay, Pagination, Navigation } from 'swiper';
import { useStore } from '@/stores/counter';
const store = useStore()
let modules = [Autoplay, Pagination, Navigation];
const teamModalImg = ref()
const employeModalInfo = ref("");
const employeeModalComment = ref("")
const employeeIndex = ref("")
const comandaInfo = ref("")
let reviewRating = ref()

const breakpointsComanda = {
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

function employeeInfoModal(user) {
  employeModalInfo.value = user
}



function addStars(i) {
  employeeIndex.value = i
  reviewRating.value?.forEach((item, index) => {
    if (i - 1 >= index) {
      item.classList.add("active-star-btn");
    } else {
      item.classList.remove("active-star-btn");
    }
  });
}
function getTeamImg(user) {
  teamModalImg.value = user.img
}
async function employeeGet(i, employeModalInfo) {
  const requestBody = {
    "id": employeModalInfo.id,
    "comment": employeeModalComment.value,
    "number": employeeIndex.value.toString()
  };

  // API-ga i yuborish
  fetch(store.baseUrl + "/team/review", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  })
    .then(response => response.json())
    .then(data => {
      if (data.status == 200) {
        store.done = true
        store.openEmployee = false
      }
    })
    .catch(error => {
      console.error("Xatolik yuz berdi:", error, i);
    });
}

onMounted(async () => {
  comandaInfo.value = await $fetch(store.baseUrl + '/team')
})
</script>

<style lang="scss" scoped>
@import "@/assets/scss/var";
@import "@/assets/scss/employeeModal";

.comanda {
  padding: 60px 0;


  .container {
    .comanda-nav {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      .arrows {
        display: none;

        @media (max-width: 660px) {
          display: flex;
          flex-direction: row-reverse;
          gap: 7px;

          img {
            max-width: 32px;
          }
        }
      }

      .comanda-nav__text {
        p.title {
          font-size: 32px;
          font-weight: 700;
          color: var(--title);
          line-height: 38px;

          @media (max-width: 660px) {
            font-size: 24px;
            line-height: 28px;
          }
        }

        p.text {
          font-size: 20px;
          color: var(--text);
          line-height: 26px;
          margin-top: 20px;

          @media (max-width: 660px) {
            font-size: 14px;
            line-height: 18px;
          }
        }

        span {
          color: #0A97BC;
        }
      }

      .btnTop {
        @media (max-width: 660px) {
          display: none;
        }
      }
    }

    .content {

      cursor: pointer;
      position: relative;
      margin: 30px 10px;

      .swiperComanda {
        padding: 0 1px;
        height: 600px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

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

        @media (max-width: 660px) {
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

        @media (max-width: 660px) {
          display: none;
        }
      }

      .swiperSlideComanda {
        background-color: var(--bgLight);
        padding: 36px;
        max-width: 320px;
        max-height: 412px;
        position: relative;
        margin-top: 10%;
        box-shadow: 0px 9px 18px var(--dark-shadow);
        border-radius: 18px;


        @media (max-width: 1000px) {
          margin-top: 12%;
        }

        @media (max-width: 800px) {
          margin-top: 15%;
        }

        @media (max-width: 660px) {
          margin-top: 18%;
        }

        @media (max-width: 560px) {
          margin-top: 28%;
        }

        @media (max-width: 460px) {
          margin-top: 32%;
        }

        .img {
          position: absolute;
          border-radius: 50%;
          background: var(--bgDark);
          top: -120px;
          left: 50%;
          transform: translateX(-50%);
          width: 258px;
          height: 258px;
          overflow: hidden;
          padding: 5px;

          .team-user-img {
            transition: .3s linear;
            padding: 15px;
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: relative;
            border-radius: 50%;

            &::after {
              position: absolute;
              content: "assa";
              color: red;
              top: 50%;
              left: 50%;
              width: 50px;
              height: 50px;
              background-color: #fff;
            }
          }
        }

        .info {
          margin-top: calc(50% + 5px);
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;

          p.title {
            font-size: 20px;
            font-weight: 600;
            line-height: 24px;
            color: var(--title);

            @media (max-width: 660px) {
              font-size: 16px;
              line-height: 22px;
            }
          }

          p.job-name {
            font-size: 14px;
            color: var(--text);
            line-height: 18px;

            @media (max-width: 660px) {
              font-size: 14px;
              line-height: 18px;
            }
          }

          .icons {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 12px;
            margin-top: 20px;
          }

          .trBtn {
            margin-top: 20px;
          }

        }

      }
    }

    .prBtnBottom {
      display: none;

      @media (max-width: 660px) {
        display: block;
        width: 100%;
      }
    }
  }
}

.employee-modal {
  background: var(--bgDark);
  .contentDone {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .cancel {
      position: absolute;
      top: 1%;
      right: 1%;
    }

    .done {
      margin: 40px auto;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: var(--bgDark);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    p.title {
      font-size: 28px;
      font-weight: 700;
      line-height: 35px;
      text-align: center;
      color: var(--title);
    }

    p.text {
      color: var(--text);
      font-size: 16px;
      font-weight: 400;
      line-height: 22px;
      text-align: center;
      max-width: 380px;
      margin-top: 24px;
    }

    .btnPr {
      margin-top: 24px;
    }
  }
}

.team-icone__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px;
  background: #fff;

}

.team-icone__img {
  display: flex;
  width: 28.5px;
  height: 28.5px;
  object-fit: contain;
}

.team-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  width: 100%;
  max-width: 500px;
  height: 500px;
  z-index: 1510;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s linear;
}

.team-modal__img {
  display: flex;
  width: 100%;
  max-width: 400px;
  height: 400px;
  object-fit: contain;

  @media(max-width: 410px) {
    width: 350px;

  }
}

.teamModalClose {
  opacity: 0;
  pointer-events: none;
}

.team-modal__close {
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
}
</style>