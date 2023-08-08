<template>
  <div>
    <div class="comments" id="comments">
      <div class="container">
        <div class="navbar">
          <p class="title">
            <span>{{ $t('commentTitle') }}</span> {{ $t('inoutTitle1') }} {{ $t('inoutTitle2') }}
          </p>
          <PrButton class="btnTop" :content="$t('commentDesc')"
            @click=" store.openCompanyModal = true, store.blur = true">
          </PrButton>
          <!-- COMPANY MODAL -->
          <Transition name="modal">
            <div class="comanyModal" v-if="store.openCompanyModal">
              <div class="employee-header">
                <h2 class="employee-header-title"> {{ $t('commentDesc') }}</h2>
                <!-- @click=" store.openCompanyModal = false, store.blur = false" -->
                <cancel-modal  @click=" store.openCompanyModal = false, store.blur = false" class="cancel"></cancel-modal>
              </div>
              <div class="employee-stars">
                <div ref="reviewRating" class="rating" v-for="(index) in 5" :key="index" @click="addStars(index)">
                  <svg width="33" height="33" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg">
                    <path
                      d="m16.5 27.145-8.091 5.116c-.302.185-.604.262-.906.233a1.6 1.6 0 0 1-.822-.32 1.814 1.814 0 0 1-.568-.724c-.133-.298-.155-.627-.064-.988l2.148-9.632-7.144-6.483a1.62 1.62 0 0 1-.452-1.778c.112-.302.274-.549.484-.74.211-.192.5-.317.864-.376l9.428-.864 3.66-9.095c.132-.338.334-.589.605-.75C15.912.58 16.2.5 16.5.5c.301 0 .587.081.858.243.27.162.473.413.606.75l3.66 9.096 9.427.864c.365.059.653.184.864.376.21.191.371.438.483.74a1.62 1.62 0 0 1-.452 1.778l-7.143 6.483 2.148 9.632c.09.36.07.69-.064.988a1.813 1.813 0 0 1-.568.723 1.6 1.6 0 0 1-.822.321c-.302.03-.604-.048-.906-.233L16.5 27.145Z"
                      fill="var(--employee-star-bg)" />
                  </svg>
                </div>
              </div>
              <div class="employee-modal-yourMessage">
                <p class="employee-youMessage-desc">{{ $t('message') }}</p>
                <textarea class="employee-youMessage-textArea" :placeholder="$t('message')"
                  v-model="companyDesc"></textarea>
                <button class="employee-modal-btn" @click="companyGet()">{{ $t('employeSend') }}</button>
              </div>
            </div>
          </Transition>
          <!-- COMPANY MODAxcscsL -->
        </div>
        <div class="content">
          <Swiper class="swiperWorks" :modules="modules" :slides-per-view="2.2" :autoplay="{
            delay: 1000,
            disableOnInteraction: true,
          }" loop :breakpoints="breakpointsComments">
            <SwiperSlide class="swiper-slide" v-for="(comment, index) in commentInfo?.data" :key="index">
              <div class="nav-bar">
                <div class="user">
                  <div class="user-photo">
                    <img :src="comment.img" :alt="comment.name">
                  </div>

                  <div class="user-info">
                    <p class="name">{{ comment.name }}</p>
                    <p class="data">{{ comment.date }}</p>
                  </div>
                  <div class="stars-box">
                    <div class="" v-for="item in 5" :key="item" :class="{ 'highlight': item <= comment.number }">
                      <svg width="33" height="33" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="m16.5 27.145-8.091 5.116c-.302.185-.604.262-.906.233a1.6 1.6 0 0 1-.822-.32 1.814 1.814 0 0 1-.568-.724c-.133-.298-.155-.627-.064-.988l2.148-9.632-7.144-6.483a1.62 1.62 0 0 1-.452-1.778c.112-.302.274-.549.484-.74.211-.192.5-.317.864-.376l9.428-.864 3.66-9.095c.132-.338.334-.589.605-.75C15.912.58 16.2.5 16.5.5c.301 0 .587.081.858.243.27.162.473.413.606.75l3.66 9.096 9.427.864c.365.059.653.184.864.376.21.191.371.438.483.74a1.62 1.62 0 0 1-.452 1.778l-7.143 6.483 2.148 9.632c.09.36.07.69-.064.988a1.813 1.813 0 0 1-.568.723 1.6 1.6 0 0 1-.822.321c-.302.03-.604-.048-.906-.233L16.5 27.145Z"
                          fill="#E5EDEF" />
                      </svg>

                    </div>
                  </div>

                </div>
              </div>
              <div class="info">
                <p class="text line-clamp-4">{{ comment.comment }}</p>
              </div>
              <div class="media-stars">
                <div class="" v-for="item in 5" :key="item" :class="{ 'highlight': item <= comment.number }">
                  <svg width="33" height="33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="m16.5 27.145-8.091 5.116c-.302.185-.604.262-.906.233a1.6 1.6 0 0 1-.822-.32 1.814 1.814 0 0 1-.568-.724c-.133-.298-.155-.627-.064-.988l2.148-9.632-7.144-6.483a1.62 1.62 0 0 1-.452-1.778c.112-.302.274-.549.484-.74.211-.192.5-.317.864-.376l9.428-.864 3.66-9.095c.132-.338.334-.589.605-.75C15.912.58 16.2.5 16.5.5c.301 0 .587.081.858.243.27.162.473.413.606.75l3.66 9.096 9.427.864c.365.059.653.184.864.376.21.191.371.438.483.74a1.62 1.62 0 0 1-.452 1.778l-7.143 6.483 2.148 9.632c.09.36.07.69-.064.988a1.813 1.813 0 0 1-.568.723 1.6 1.6 0 0 1-.822.321c-.302.03-.604-.048-.906-.233L16.5 27.145Z"
                      fill="#E5EDEF" />
                  </svg>

                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <PrButton @click=" store.openCompanyModal = true, store.blur = true" class="btnBottom"
          :content="$t('commentDesc')">
        </PrButton>
      </div>


    </div>
  </div>
</template>

<script setup>
import { Autoplay, Pagination, Navigation } from 'swiper';
import { useStore } from '@/stores/counter';
const store = useStore()
const commentInfo = ref([]);
const companyDesc = ref("")
const employeeIndex = ref("")
let reviewRating = ref()
let modules = [Autoplay, Pagination, Navigation];
const breakpointsComments = {
  270: {
    slidesPerView: 1,
    spaceBetween: 15,
  },
  560: {
    slidesPerView: 2.1,
    spaceBetween: 20,
  },
};
onMounted(async () => {
  commentInfo.value = await $fetch(store.baseUrl + "/review")
})

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

async function companyGet() {
  const requestBody = {
    "comment": companyDesc.value,
    "number": employeeIndex.value.toString()
  };

  // API-ga i yuborish
  fetch(store.baseUrl + "/team/companyreview", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  })
    .then(response => response.json())
    .then(data => {
      // API javobini ishlatish
      if (data.status == 200) {
        store.done = true
        store.openCompanyModal = false
      }
      // API javobini ishlatish
    })
    .catch(error => {
      console.error("Xatolik yuz berdi:", error);
    });
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/var";
@import "@/assets/scss/companyModal";

.cancel{
  position: fixed;
  top: 1%;
  right: 1%;
}
.comments {
  padding: 60px 0;

  .container {

    .employee-modal {
      position: fixed;
      top: 50%;
      left: 50%;
      translate: -50% -50%;
      width: 100%;
      max-width: 558px;
      height: 495px;
      border-radius: 24px;
      padding: 24px;
      background: var(--bgDark);
      z-index: 1510;
    }

    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 1360px;


      .employee-header {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        margin-bottom: 24px;
      }

      .employee-header-title {
        font-size: 28px;
        line-height: 34px;
        font-weight: 600;
        color: var(--title);
      }

      .employee-header-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 38px;
        height: 38px;
        margin-bottom: 20px;
        background: var(--bgDark);
        border-radius: 50%;
      }

      .employee-modal-user {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 24px;
      }

      .employe-user-img {
        display: flex;
        width: 47px;
        height: 47px;
        object-fit: contain;
        border-radius: 50%;
      }

      .employee-user-info {
        display: flex;
        flex-direction: column;
        gap: 4px;

      }

      .employee-user-info h3 {
        font-size: 16px;
        line-height: 19px;
        font-weight: 600;
        color: var(--title);
      }

      .employee-user-info span {
        color: var(--title);
      }

      .employee-modal-stars {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .employee-stars-desc {
        font-size: 16px;
        line-height: 19px;
        color: var(--title);
      }

      .employee-stars {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 24px;
      }


      .rating {
        cursor: pointer;

        svg {
          pointer-events: none;
        }
      }

      .active-star-btn {
        svg {
          path {
            fill: var(--prColor) !important;
          }
        }
      }


      .employee-stars button {
        display: flex;
        width: 45px;
        height: 45px;
      }

      .employee-modal-yourMessage {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .employee-youMessage-desc {
        font-size: 16px;
        line-height: 19px;
        font-weight: 400;
        color: var(--title);
      }

      .employee-youMessage-textArea {
        display: flex;
        width: 100%;
        height: 89px;
        border-radius: 12px;
        border: 1px solid #E5EDEF;
        background: var(--bgLight);
        color: var(--title);
        padding: 12px;
      }

      .employee-modal-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        max-width: 246px;
        height: 47px;
        background: var(--prColor);
        color: #fff;
        border-radius: 12px;
        margin-top: 24px;
        margin-left: auto;
        transition: 0.1s linear;
      }

      .employee-modal-btn:hover {
        background: var(--prColor);
      }

      @media(max-width:600px) {
        .employee-modal {
          max-width: 500px;
        }
      }

      @media(max-width:528px) {
        .employee-modal {
          max-width: 450px;
        }
      }

      @media(max-width:470px) {
        .employee-modal {
          max-width: 400px;
        }

        .employee-modal-btn {
          width: 100%;
          max-width: 400px;

        }
      }

      @media(max-width:430px) {
        .employee-modal {
          max-width: 348px;
        }
      }

      @media(max-width:430px) {
        .employee-modal {
          max-width: 300px;
        }
      }

      @media(max-width:280px) {
        .employee-modal {
          max-width: 230px;
        }
      }

      @media(max-width: 1400px) {
        width: 100%;
        max-width: 1000px;
        margin: 0 auto;
      }

      .btnTop {
        @media (max-width: 660px) {
          display: none;
        }
      }

      p.title {
        font-size: 32px;
        font-weight: 700;
        line-height: 38px;
        color: var(--title);

        span {
          color: var(--prColor);
        }

        @media (max-width: 660px) {
          font-size: 24px;
          line-height: 28px;
        }
      }
    }
  }

  .content {
    margin-top: 30px;

    .swiper-slide {
      padding: 24px;
      background-color: var(--bgLight);
      height: auto;
      border-radius: 24px;
      display: flex;
      flex-direction: column;

      .nav-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .user {
          .user-photo {
            width: 100%;
            max-width: 50px;
            border-radius: 50%;
            overflow: hidden;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          .user-info {
            p.name {
              font-size: 18px;
              font-weight: 700;
              line-height: 24px;
              color: var(--title);
            }

            p.data {
              font-size: 14px;
              line-height: 20px;
              color: var(--title);
            }
          }
        }

        .stars {
          display: flex;
          gap: 5px;
          width: 100px;

          .star {
            cursor: pointer;
            width: 20px;
            height: 20px;
            background-color: var(--bgDark);
            border-radius: 50%;
            background-color: yellow;
          }
        }
      }

      .info {
        margin-bottom: auto;

        p.text {
          font-size: 16px;
          color: var(--text);
          max-width: 612px;
          margin-top: 18px;
        }
      }
    }
  }

  .btnBottom {
    display: none;
    margin-top: 20px;

    @media (max-width: 660px) {
      display: block;
      width: 100%;
    }
  }
}
</style>