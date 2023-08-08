<template>
  <div>
    <div class="inout">
      <div class="container">
        <div class="inout__img-wrapper">
          <img :src="store.about?.data.img" alt="inout" width="593" height="453">
        </div>
        <div class="inout__text-wrapper">
          <div class="inout__nav">
            <h3 class="inout__title">{{ $t('inoutTitle1') }} <span>{{ $t('inoutTitle2') }}</span></h3>
            <PrButton class="inout__top-btn" :to="localePath('/about')" @click="store.filterMenu = true"
              :content="$t('inoutDesc')">
            </PrButton>
          </div>
          <div class="inout__list">
            <div v-for="box in store.about?.data.blocks" :key="box" class="inout__item">
              <p class="inout__number">{{ box.num }}</p>
              <p class="inout__number-text">{{ box.title }}</p>
              <p class="inout__text">{{ box.text }}</p>
            </div>
          </div>
          <PrButton class="inout__bottom-btn" :to="localePath('/about')" @click="store.filterMenu = true"
            :content="$t('inoutDesc')">
          </PrButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '~/stores/counter';
const store = useStore()

onMounted(() => {
  let inoutItem = document.querySelector('.inout__list')
})
</script>

<style lang="scss" scoped>
@import "@/assets/scss/var";
@import "@/assets/scss/main";

.inout {
  .inout__top-btn {
    display: block;

    @media (max-width: 660px) {
      display: none;
    }
  }

  .inout__bottom-btn {
    display: none;

    @media (max-width: 660px) {
      display: block;
    }
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    @include media(1100px) {
      flex-direction: column;
    }
  }

  &__img-wrapper {
    width: 100%;
    max-width: 593px;

    img {
      width: 100%;
    }

    @include media(700px) {
      max-width: 100%;
      height: auto;
    }
  }

  &__text-wrapper {
    padding: 35px 40px;
    background: var(--bgLight);
    box-shadow: var(--number-shadow);
    border-radius: 24px;
    width: 100%;

    @include media(1200px) {
      padding: 25px 30px;
    }

    @include media(1100px) {
      padding: 35px 40px;
    }

    @include media(500px) {
      padding: 24px;
    }
  }

  &__nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;

    @include media(1200px) {
      margin-bottom: 20px;
    }

    @include media(1100px) {
      margin-bottom: 30px;
    }

    @include media(500px) {
      margin-bottom: 18px;
    }
  }

  &__title {
    font-family: 'Unbounded';
    font-weight: 700;
    font-size: 32px;
    line-height: 34px;
    color: var(--title);

    @include media(1200px) {
      font-size: 28px;
      line-height: 30px;
    }

    @include media(1100px) {
      font-size: 32px;
      line-height: 34px;
    }

    @include media(500px) {
      font-size: 24px;
      line-height: 26px;
    }
  }

  &__top-btn {
    padding: 14px 30px;
    white-space: nowrap;

    @include media(1200px) {
      padding: 12px 28px;
    }

    @include media(1100px) {
      padding: 14px 30px;
    }

    @include media(650px) {
      display: none;
    }
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(145px, 1fr));
    // gap: 30px;
    row-gap: 30px;
    column-gap: 89px;

    @include media(1400px) {
      row-gap: 30px;
      column-gap: 50px;
    }

    @include media(1300px) {
      row-gap: 30px;
      column-gap: 30px;
    }

    @include media(1200px) {
      grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
    }

    @include media(1100px) {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      row-gap: 30px;
      column-gap: 89px;
    }

    @include media(800px) {
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      row-gap: 30px;
      column-gap: 69px;
    }

    @include media(700px) {
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
      row-gap: 20px;
      column-gap: 40px;
    }

    @include media(650px) {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }

    @include media(500px) {
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
      gap: 18px;
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
  }

  &__number {
    font-family: 'Unbounded';
    font-weight: 500;
    font-size: 48px;
    line-height: 50px;
    color: var(--num);

    @include media(1200px) {
      font-size: 42px;
      line-height: 44px;
    }

    @include media(1100px) {
      font-size: 48px;
      line-height: 50px;
    }

    @include media(500px) {
      font-size: 38px;
      line-height: 40px;
    }
  }

  &__item:first-child {

    .inout__number::after {
      content: '+';
      color: var(--prColor);
    }

  }


  &__number-text {
    font-family: 'Unbounded';
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
    color: var(--num);
    margin-bottom: 18px;

    @include media(1200px) {
      font-size: 14px;
      line-height: 16px;
    }

    @include media(1100px) {
      font-size: 16px;
      line-height: 18px;
    }

    @include media(500px) {
      font-size: 14px;
      line-height: 16px;
    }
  }

  &__text {
    width: 100%;
    max-width: 152px;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    color: var(--num);

    @include media(1200px) {
      font-size: 12px;
      line-height: 14px;
    }

    @include media(1100px) {
      font-size: 14px;
      line-height: 19px;
    }
  }

  &__bottom-btn {
    display: none;

    @include media(650px) {
      display: inline-block;
      margin-top: 30px;
    }

    @include media(400px) {
      width: 100%;
    }
  }
}
</style>