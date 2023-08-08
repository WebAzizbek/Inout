<template>
  <div>
    <div class="numbers">
      <div class="container">
        <div class="content">
          <h1 class="title">{{ $t('numberTitle1') }}<span>{{ $t('numberTitle2') }}</span></h1>
          <div class="info-wrapper">
            <div class="info">
              <h1 class="number">{{ store.number?.data.num_1 }}<span>+</span></h1>
              <p class="text">{{ store.number?.data.text_1 }}</p>
            </div>
            <div class="info">
              <h1 class="number">{{ store.number?.data.num_2 }}<span>+</span></h1>
              <p class="text">{{ store.number?.data.text_2 }}</p>
            </div>
            <div class="info">
              <h1 class="number">{{ store.number?.data.num_3 }}<span>+</span></h1>
              <p class="text">{{ store.number?.data.text_3 }}</p>
            </div>
          </div>

        </div>
        <div class="image">
          <img :src="store.number?.data.img" alt="img">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '@/stores/counter';
const store = useStore()
</script>

<style lang="scss" scoped>
@import "@/assets/scss/var";
@import "@/assets/scss/main";

.numbers {
  margin: 0 12px;

  span {
    color: var(--prColor);
  }

  .container {
    padding: 50px;
    background-color: var(--bgLight);
    border-radius: 24px;
    box-shadow: var(--number-shadow);
    display: flex;
    align-items: center;
    justify-content: space-between;

    @include media(1300px) {
      flex-direction: column;
    }

    @include media(1100px) {
      padding: 35px;
    }

    @include media(900px) {
      padding: 24px;
    }

    @include media(800px) {
      padding: 50px;
      align-items: flex-start;
    }

    @include media(600px) {
      padding: 35px;
    }

    @include media(450px) {
      padding: 24px;
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: 30px;

      @include media(1100px) {
        gap: 24px;
      }

      @include media(1300px) {
        width: 100%;
      }

      @include media(800px) {
        gap: 30px;
      }

      @include media(600px) {
        gap: 24px;
      }

      .title {
        font-family: 'Unbounded';
        font-size: 32px;
        font-weight: 700;
        line-height: 38px;
        color: var(--title);

        @include media(1100px) {
          font-size: 28px;
          line-height: 34px;
        }

        @media (max-width: 900px) {
          font-size: 24px;
          line-height: 28px;
        }

        @include media(800px) {
          font-size: 32px;
          font-weight: 700;
          line-height: 38px;
        }

        @include media(600px) {
          font-size: 28px;
          line-height: 34px;
        }

        @include media(450px) {
          font-size: 24px;
          line-height: 28px;
        }

      }

      .info-wrapper {
        display: flex;
        align-items: center;
        gap: 80px;

        @include media(1300px) {
          justify-content: space-between;
        }

        @include media(1100px) {
          gap: 40px;
        }

        @include media(900px) {
          gap: 30px;
        }

        @include media(800px) {
          align-items: flex-start;
          flex-direction: column;
          gap: 40px;
        }

        @include media(600px) {
          gap: 40px;
        }

        @include media(450px) {
          gap: 30px;
        }

        .info {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          flex-direction: column;

          h1.number {
            font-family: 'Unbounded';
            font-size: 90px;
            font-weight: 500;
            line-height: 100px;
            color: var(--title);
            display: flex;
            justify-content: center;
            align-items: center;

            @include media(1100px) {
              font-size: 80px;
              line-height: 90px;
            }

            @include media(900px) {
              font-size: 60px;
              line-height: 70px;
            }

            @include media(800px) {
              font-size: 90px;
              font-weight: 500;
              line-height: 100px;
            }

            @include media(600px) {
              font-size: 60px;
              line-height: 70px;
            }

            @include media(450px) {
              font-size: 50px;
              line-height: 60px;
            }
          }

          p.text {
            width: 100%;
            max-width: 287px;
            font-family: 'Unbounded';
            font-weight: 400;
            font-size: 18px;
            line-height: 22px;
            color: var(--text);

            @include media(1100px) {
              font-size: 16px;
              line-height: 20px;
            }

            @include media(900px) {
              font-size: 14px;
              line-height: 18px;
            }

            @include media(800px) {
              font-size: 18px;
              line-height: 22px;
            }

            @include media(600px) {
              font-size: 14px;
              line-height: 18px;
            }

            @include media(450px) {
              max-width: 100%;
            }
          }
        }
      }


    }

    .image {
      max-width: 220px;

      @include media(450px) {
        max-width: 170px;
        margin: 0 auto;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>