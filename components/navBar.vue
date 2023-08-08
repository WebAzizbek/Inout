<template>
  <div class="nuxt-wrapper" id="navBar">
    <div class="overlay" @click="removeOverlay()" v-if="overlay"></div>
    <header>
      <div class="header-top" :style="{ backgroundColor: colors.data[0].color }">
        <div class="container">
          <div class="logo-wrapper">
            <button @click="openMenu = true, overlay = true" class="bars">
              <img src="~/assets/images/svg/bars.svg" alt="bars" width="20" height="25">
            </button>
            <NuxtLink class="logo" :to="localePath('/')">
              <img :src="store.setting?.data.logo" alt="in out" width="83" height="72">
            </NuxtLink>
            <div class="header-top-wrapper">
              <div class="advertasing">
                <a :href="store.setting?.data.url1" v-if="store.brand1"
                  :style="{ backgroundImage: 'url(' + store.setting?.data.brand1 + ')' }" class="advertasing-btn"></a>
                <a :href="store.setting?.data.url2" v-if="store.brand2"
                  :style="{ backgroundImage: 'url(' + store.setting?.data.brand2 + ')' }" class="advertasing-btn"></a>
                <a :href="store.setting?.data.url3" v-if="store.brand3"
                  :style="{ backgroundImage: 'url(' + store.setting?.data.brand3 + ')' }" class="advertasing-btn"></a>
              </div>
              <div class="link">
                <a :href="store.setting?.data.telegram_url" class="link-btn one">
                  <img src="~/assets/images/svg/telegram.svg" alt="telegram" width="20" height="20">
                  <p class="link-text">{{ $t("telegram") }}</p>
                </a>
                <!-- <a href="/images/myw3schoolsimage.jpg" download>777</a> -->
                <button @click="downloadFile()" class="link-btn three">
                  <img src="~/assets/images/svg/download.svg" alt="download" width="20" height="20">
                  <p class="link-text">{{ $t("presentation") }}</p>
                </button>
              </div>
            </div>
          </div>
          <div class="languages flex flex-col">
            <div class="flex flags">
              <label class="flag language-item cursor-pointer" v-for="(flag, index) in store.langFlag?.data"
                :key="'flag-' + index">
                <img :src="flag.img" alt="flag" @click="setLanguage(locales[index])">
              </label>
            </div>
            <div class="flex langNames">
              <div v-for="(item, index) in locales" :key="'locale-' + index" class="langName language-item cursor-pointer"
                @click="setLanguage(item)">
                {{ typeof item === 'object' ? item.name : item }}
              </div>
            </div>
          </div>
          <div class="number">
            <button class="num-btn">
              <img src="~/assets/images/svg/call.svg" alt="call" width="20" height="20">
              <a class="num-text" :href="'tel:' + store.setting?.data.phone">{{
                store.setting?.data.phone }}</a>
            </button>
            <button class="num-btn">
              <img src="~/assets/images/svg/schedule.svg" alt="schedule" width="20" height="20">
              <p class="num-text">{{ store.setting?.data.time }}</p>
            </button>
          </div>
        </div>
      </div>
      <div class="header-bottom " :style="{ backgroundColor: colors.data[1].color }">
        <div class="container">
          <div class="search-wrapper">
            <div class="header-bottom-nav">
              <div class="menu-item">
                <div class="header-bottom-nav-item">
                  <NuxtLink :to="localePath(store.menu?.data[0].to)"> {{ store.menu?.data[0].menuName }}</NuxtLink>
                </div>
              </div>
              <div class="menu-item">
                <div class="header-bottom-nav-item" @click="redirectToHome(store.menu?.data[1])">
                  <a> {{ store.menu?.data[1].menuName }}</a>
                </div>
              </div>
              <div class="menu-item">
                <div class="header-bottom-nav-item">
                  <NuxtLink :to="localePath(store.menu?.data[2].to)"> {{ store.menu?.data[2].menuName }}</NuxtLink>
                </div>
              </div>
              <div class="menu-item">
                <div class="header-bottom-nav-item" @click="redirectToHome(store.menu?.data[3])">
                  <a> {{ store.menu?.data[3].menuName }}</a>
                </div>
              </div>
              <div class="menu-item">
                <div class="header-bottom-nav-item">
                  <NuxtLink :to="localePath(store.menu?.data[4].to)"> {{ store.menu?.data[4].menuName }}</NuxtLink>
                </div>
              </div>
              <div class="menu-item" @click="redirectToHome(store.menu?.data[5])">
                <div class="header-bottom-nav-item">
                  <a> {{ store.menu?.data[5].menuName }}</a>
                </div>
              </div>
            </div>
            <div class="form-box">
              <form action="#" class="form">
                <label for="search">
                  <img src="~/assets/images/svg/search.svg" alt="search">
                </label>
                <input id="search" type="text" v-model="searchInfo" @input="sendSearch($event)"
                  :placeholder="$t('Search')">
              </form>
              <!-- v-if="searchSee" -->
              <div class="searchItem" v-if="isShow">
                <div v-for="searchIcone in search?.data" :key="searchIcone.id">
                  <img :src="searchIcone.icon" :alt="searchIcone.address"
                    @click="store.searchModal = true, store.blur = true">
                  <h1 class="text-white"
                    @click="store.searchModal = true, store.blur = true, clickedSearch = searchIcone, isShow = false, searchInput(), openMarkerModal(searchIcone)">
                    {{
                      searchIcone.address }}</h1>
                </div>
              </div>
              <div v-if="errorSearch" class="erroeSearch">
                <h1>Bunda malumot topilmadi</h1>
              </div>
            </div>
          </div>
          <div class="right-wrapper">
            <div class="number">
              <button class="num-btn">
                <img src="~/assets/images/svg/call.svg" alt="call" width="20" height="20">
                <a class="num-text" :href="'tel:' + store.setting?.data.phone">{{ store.setting?.data.phone
                }}</a>
              </button>
              <button class="num-btn">
                <img src="~/assets/images/svg/schedule.svg" alt="schedule" width="20" height="20">
                <p class="num-text">{{ store.setting?.data.time }}</p>
              </button>
            </div>
            <div class="btn-wrapper">
              <button class="btn-item " v-if="store.darkmode" @click="setDarkMode()">
                <img src="~/assets/images/444.png" alt="sun" width="18" height="18">
              </button>
              <button class="btn-item" v-else @click="setDarkMode()">
                <img src="~/assets/images/svg/moon.svg" alt="moon" width="18" height="18">
              </button>
              <NuxtLink :to="localePath('/savedMap')">
                <button class="btn-item" @click="store.sendMapId()">
                  <img src="~/assets/images/svg/favorite.svg" alt="favorite" width="21" height="19">
                  <div class="index">
                    <p v-if="store.localLength"> {{ store.localLength.length }} </p>
                    <p v-else>0</p>
                  </div>
                </button>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <transition name="menu">
        <div v-if="openMenu" class="menu">
          <button @click="openMenu = false, overlay = false" class="close-btn">
            <img src="~/assets/images/svg/x.svg" alt="x" width="30" height="30">
          </button>
          <div class="top">
            <div class="left">
              <img :src="store.setting?.data.logo" alt="logo">
            </div>
            <div class="right">
              <div class="menu-languages flex flex-col">
                <div class="flex flags">
                  <label class="flag language-item cursor-pointer" v-for="(flag, index) in store.langFlag?.data"
                    :key="'flag-' + index">
                    <img :src="flag.img" alt="flag" @click="setLanguage(locales[index])">
                  </label>
                </div>
                <div class="flex langNames">
                  <div v-for="(item, index) in locales" :key="'locale-' + index"
                    class="langName language-item cursor-pointer" @click="setLanguage(item)">
                    {{ typeof item === 'object' ? item.name : item }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="main">
            <div class="menu-ad">

              <button :style="{ backgroundImage: 'url(' + store.setting?.data.brand1 + ')' }" class="menu-ad-btn"><a
                  target="blank" :href="store.setting?.data.url1"></a></button>
              <button :style="{ backgroundImage: 'url(' + store.setting?.data.brand2 + ')' }" class="menu-ad-btn"><a
                  target="blank" :href="store.setting?.data.url1"></a></button>
              <button :style="{ backgroundImage: 'url(' + store.setting?.data.brand3 + ')' }" class="menu-ad-btn"><a
                  target="blank" :href="store.setting?.data.url1"></a></button>
            </div>
            <div class="menu-btn-wrapper">
              <div class="btn-item " v-if="store.darkmode" @click="setDarkMode()">
                <button>
                  <img src="~/assets/images/444.png" alt="sun" width="18" height="18">
                </button>
                <p>{{ $t('light') }}</p>
              </div>
              <div class="btn-item" v-else @click="setDarkMode()">
                <button>
                  <img src="~/assets/images/svg/moon.svg" alt="moon" width="18" height="18">
                </button>
                <p>{{ $t('night') }}</p>
              </div>
              <NuxtLink :to="localePath('/savedMap')">
                <button class="menu-btn-item" @click="store.sendMapId()
                  ">
                  <img src="~/assets/images/svg/favorite.svg" alt="favorite" width="21" height="19">
                  <div class="menu-index">
                    <p v-if="store.localLength"> {{ store.localLength.length }} </p>
                    <p v-else>0</p>
                  </div>
                </button>
              </NuxtLink>
            </div>
            <div class="menu-nav">
              <div class="menu-nav-item" @click="openMenu = false, overlay = false">
                <div class="header-bottom-nav-item">
                  <NuxtLink :to="localePath(store.menu?.data[2].to)"> {{ store.menu?.data[0].menuName }}</NuxtLink>
                </div>
              </div>
              <div class="menu-nav-item" @click="openMenu = false, overlay = false">
                <div class="header-bottom-nav-item" @click="redirectToHome(store.menu?.data[1])">
                  <a> {{ store.menu?.data[1].menuName }}</a>
                </div>
              </div>
              <div class="menu-nav-item" @click="openMenu = false, overlay = false">
                <div class="header-bottom-nav-item">
                  <NuxtLink :to="localePath(store.menu?.data[2].to)"> {{ store.menu?.data[2].menuName }}</NuxtLink>
                </div>
              </div>
              <div class="menu-nav-item" @click="openMenu = false, overlay = false">
                <div class="header-bottom-nav-item" @click="redirectToHome(store.menu?.data[3])">
                  <a> {{ store.menu?.data[3].menuName }}</a>
                </div>
              </div>
              <div class="menu-nav-item" @click="openMenu = false, overlay = false">
                <div class="header-bottom-nav-item">
                  <NuxtLink :to="localePath(store.menu?.data[4].to)"> {{ store.menu?.data[4].menuName }}</NuxtLink>
                </div>
              </div>
              <div class="menu-nav-item" @click="openMenu = false, overlay = false">
                <div class="header-bottom-nav-item" @click="redirectToHome(store.menu?.data[5])">
                  <a> {{ store.menu?.data[5].menuName }}</a>
                </div>
              </div>
            </div>
            <div class="menu-link">
              <a :href="store.setting?.data.telegram_url" class="menu-link-item">
                <img src="~/assets/images/svg/telegram.svg" alt="telegram" width="20" height="20">
                <p class="link-text">{{ $t("telegram") }}</p>
              </a>
              <button @click="downloadFile()" class="menu-link-item">
                <img src="~/assets/images/svg/download.svg" alt="download" width="20" height="20">
                <p class="link-text">{{ $t("presentation") }}</p>
              </button>
            </div>
            <div class="footer">
              <button class="num-btn">
                <img src="~/assets/images/svg/call.svg" alt="call" width="20" height="20">
                <a class="num-text" :href="'tel:' + store.setting?.data.phone">{{
                  store.setting?.data.phone }}</a>
              </button>
              <button class="num-btn">
                <img src="~/assets/images/svg/schedule.svg" alt="schedule" width="20" height="20">
                <p class="num-text">{{ store.setting?.data.time }}</p>
              </button>
            </div>
          </div>
        </div>
      </transition>
    </header>
  </div>

  <!-- map modal -->
  <div class="container modal-container flex items-center justify-center">
    <div class="modalMap  relative" v-if="store.searchModal">
      <cancel-modal @click="store.searchModal = false, store.blur = false" class="cancel"></cancel-modal>
      <button @click="store.searchModal, store.blur = true"
        class="open-modal-img w-11 h-11 bg-white rounded-full flex items-center justify-center absolute top-4 left-4 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
          <path
            d="M8.76967 10.75H7.57735C7.36485 10.75 7.18673 10.6781 7.043 10.5343C6.89925 10.3905 6.82737 10.2123 6.82737 9.99967C6.82737 9.78707 6.89925 9.60898 7.043 9.46539C7.18673 9.32181 7.36485 9.25002 7.57735 9.25002H8.76967V8.05769C8.76967 7.84519 8.84158 7.66707 8.9854 7.52332C9.1292 7.37959 9.3074 7.30772 9.52 7.30772C9.73258 7.30772 9.91066 7.37959 10.0542 7.52332C10.1978 7.66707 10.2696 7.84519 10.2696 8.05769V9.25002H11.4619C11.6744 9.25002 11.8526 9.32192 11.9963 9.46572C12.1401 9.60954 12.2119 9.78774 12.2119 10.0003C12.2119 10.2129 12.1401 10.391 11.9963 10.5346C11.8526 10.6782 11.6744 10.75 11.4619 10.75H10.2696V11.9423C10.2696 12.1548 10.1977 12.3329 10.0539 12.4767C9.91011 12.6204 9.73191 12.6923 9.51932 12.6923C9.30672 12.6923 9.12863 12.6204 8.98505 12.4767C8.84146 12.3329 8.76967 12.1548 8.76967 11.9423V10.75ZM9.51965 16.1153C7.81048 16.1153 6.36396 15.5236 5.1801 14.34C3.99623 13.1564 3.4043 11.7103 3.4043 10.0016C3.4043 8.29284 3.99608 6.84616 5.17965 5.66154C6.36321 4.47694 7.80936 3.88464 9.5181 3.88464C11.2268 3.88464 12.6735 4.47658 13.8581 5.66044C15.0427 6.84431 15.635 8.29083 15.635 9.99999C15.635 10.7141 15.5151 11.3961 15.2754 12.0461C15.0356 12.6961 14.7158 13.2615 14.3158 13.7423L20.0696 19.4961C20.2081 19.6346 20.2789 19.8087 20.2821 20.0183C20.2853 20.2279 20.2145 20.4051 20.0696 20.55C19.9248 20.6948 19.7491 20.7673 19.5427 20.7673C19.3363 20.7673 19.1607 20.6948 19.0158 20.55L13.2619 14.7961C12.7619 15.2089 12.1869 15.532 11.5369 15.7653C10.8869 15.9987 10.2145 16.1153 9.51965 16.1153ZM9.51965 14.6154C10.8081 14.6154 11.8995 14.1683 12.7937 13.274C13.6879 12.3798 14.135 11.2885 14.135 9.99999C14.135 8.71153 13.6879 7.62018 12.7937 6.72594C11.8995 5.83171 10.8081 5.38459 9.51965 5.38459C8.23118 5.38459 7.13983 5.83171 6.2456 6.72594C5.35138 7.62018 4.90427 8.71153 4.90427 9.99999C4.90427 11.2885 5.35138 12.3798 6.2456 13.274C7.13983 14.1683 8.23118 14.6154 9.51965 14.6154Z"
            fill="#4B5A5F" />
        </svg>
      </button>
      <div class="slide">
        <div class="site-banner-right-arrow">
          <img src="../assets/images/Arrowleft.png" alt="img">
        </div>
        <div class="site-banner-left-arrow">
          <img src="../assets/images/arrowright.png" alt="img">
        </div>
        <Swiper class="swiperMap" :slides-per-view="1" :modules="modules" :navigation="{
          nextEl: '.site-banner-right-arrow',
          prevEl: '.site-banner-left-arrow'
        }" :autoplay="{
  delay: 3000,
  disableOnInteraction: true,
}">
          <SwiperSlide class="swiperSlide" v-for="slide in 2" :key="slide">
            <img v-if="frontToward" :src="clickedSearch?.toward[0]?.img" class="map-modal-img" alt="img">
            <img v-else :src="clickedSearch?.toward[1]?.img" class="map-modal-img" alt="img">
          </SwiperSlide>
        </Swiper>
      </div>
      <div class="infoMap">
        <div class="nav">
          <p class="info item box cursor-pointer" @click="frontToward = true">{{ clickedSearch?.toward[0]?.toward }}</p>
          <p class="info item box cursor-pointer" @click="frontToward = false">{{ clickedSearch?.toward[1]?.toward }}</p>
        </div>
        <div class="banner">


          <div class="banner-info">
            <p class="name">{{ $t("manzil") }}</p>
            <p class="info"> {{ clickedSearch?.address }} </p>
          </div>
          <div class="banner-info">
            <p class="name">{{ $t("type") }}</p>
            <p class="info"> {{ clickedSearch?.tip }} </p>
          </div>
          <div class="banner-info">
            <p class="name">{{ $t("number") }}</p>
            <p class="info"> {{ clickedSearch?.number }} </p>
          </div>
          <div class="banner-info">
            <p class="name">{{ $t("size") }}</p>
            <p class="info"> {{ clickedSearch?.size }} </p>
          </div>
          <div class="banner-info">
            <p class="name">{{ $t("zone") }}</p>
            <p class="info"> {{ clickedSearch?.zone }} </p>
          </div>
          <div class="banner-info">
            <p class="name ">{{ $t("status") }}</p>
            <p v-if="!clickedSearch.busy" class="mapModalBusy"> {{ $t("busyTo") }} {{
              clickedSearch.end_date
            }} </p>
            <p v-else class="mapModalEmpty"> {{ $t("busy") }} </p>
          </div>
          <div class="banner-info">
            <p class="name">{{ $t("price") }}</p>
            <p class="info price"> {{ clickedSearch?.price }} {{ $t("sumDay") }} </p>
          </div>
        </div>
      </div>
      <div class="footer mapModal-media-btn">
        <transparent-btn @click="store.openMapMore1 = true, store.searchModal = false, store.blur = true" class="btn"
          :transparentBtnContent="$t('next')"></transparent-btn>
        <button v-if="isSaved" class="savedClear" @click="saveMarker(clickedSearch)">{{ $t('deleteSave') }}</button>
        <pr-button v-else class="btn" :content="$t('save')" @click="saveMarker(clickedSearch)"></pr-button>
      </div>
    </div>
  </div>

  <!-- v-if="store.store.openMapMore.." -->
  <div class="mapMore" v-if="store.openMapMore1">
    <cancel-modal @click="store.openMapMore1 = false, store.searchModal = true" class="cancel"></cancel-modal>
    <div class="nav">
      <div class="location">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 11.75C12.4859 11.75 12.899 11.5798 13.2394 11.2394C13.5798 10.899 13.75 10.4859 13.75 9.99998C13.75 9.51408 13.5798 9.10094 13.2394 8.76058C12.899 8.42019 12.4859 8.25 12 8.25C11.5141 8.25 11.1009 8.42019 10.7606 8.76058C10.4202 9.10094 10.25 9.51408 10.25 9.99998C10.25 10.4859 10.4202 10.899 10.7606 11.2394C11.1009 11.5798 11.5141 11.75 12 11.75ZM12 21.4615C11.8795 21.4615 11.7621 21.4413 11.648 21.4009C11.5339 21.3605 11.4301 21.3019 11.3365 21.225C8.95447 19.0814 7.17788 17.092 6.00672 15.2567C4.83557 13.4215 4.25 11.7359 4.25 10.2C4.25 7.77691 5.03012 5.84614 6.59037 4.40768C8.15062 2.96923 9.95382 2.25 12 2.25C14.0461 2.25 15.8493 2.96923 17.4096 4.40768C18.9698 5.84614 19.75 7.77691 19.75 10.2C19.75 11.7359 19.1644 13.4215 17.9932 15.2567C16.8221 17.092 15.0455 19.0814 12.6634 21.225C12.5762 21.3019 12.474 21.3605 12.3567 21.4009C12.2394 21.4413 12.1205 21.4615 12 21.4615Z"
            fill="" />
        </svg>
        <p class="info"> {{ clickedSearch?.address }} </p>
      </div>
    </div>
    <div class="banner">
      <div class="box price">
        <table class="table">
          <thead class="head">
            <tr>
              <th class="p-4">
                <p class="text"> {{ $t('mapText1') }}</p>
              </th>
              <th class="p-4">
                <p class="text">{{ $t('mapText2') }}</p>
              </th>
              <th class="p-4">
                <p class="text">{{ $t('mapText3') }}</p>
              </th>
            </tr>
          </thead>
          <!-- v-for="item in modalData?.tariffs" :key="item" -->
          <tbody class="body" v-for="item in clickedSearch?.tariffs" :key="item">
            <tr>
              <td class="p-4">
                <!-- {{ item.time }} -->
                <p class="text"> {{ item.time }} </p>
              </td>
              <td class="p-4">
                <!-- {{ item.count }} -->
                <p class="text"> {{ item.count }} </p>
              </td>
              <td class="p-4">
                <!-- {{ item.price }} -->
                <p class="text"><span> {{ item.price }}</span></p>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="card">
          <!-- v-for="item in modalData?.discount" :key="item" -->
          <div class="discount" v-for="item in clickedSearch?.discount" :key="item">
            <!-- {{ item.discount }} -->
            <p class="amount"> {{ item.discount }} </p>
            <!-- {{ item.title }} -->
            <p class="info"> {{ item.title }} </p>
          </div>
        </div>
      </div>
      <div class="box image">
        <img v-if="frontToward" :src="clickedSearch?.toward[0]?.img" class="h-60 w-full" alt="img">
        <img v-else :src="clickedSearch?.toward[1]?.img" class="h-60 w-full" alt="img">
      </div>
    </div>
    <div class="footer">
      <div class="card content">
        <div class="qr-code">
          <qrcode-vue :value="clickedSearch?.url" :size="141" level="H" />
        </div>
        <div class="littleMap">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3653.000509978452!2d71.7933048601032!3d40.374508914636486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb8584278d87e3%3A0x74bf8a1bcf8533ad!2z0JTQodCoINCz0LjQvNC90LDRgdGC0LjQutCw!5e1!3m2!1sru!2s!4v1689845471897!5m2!1sru!2s"
            style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
      <div class="card info">
        <div class="item">
          <p class="text">{{ $t('sizeLed') }}</p>
          <p class="info">{{ clickedSearch?.size }} </p>
        </div>
        <div class="item">
          <p class="text">{{ $t('timeLed') }}</p>
          <p class="info">{{ clickedSearch?.time }} </p>
        </div>
        <div class="item">
          <p class="text">{{ $t('featuresLed') }}</p>
          <p class="info" v-html="clickedSearch?.description"></p>
        </div>
      </div>
    </div>
    <div class="commanyName">
      <p>Inout group</p>
    </div>
  </div>
</template>
  
<script setup>
import { useStore } from '@/stores/counter';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import QrcodeVue from 'qrcode.vue';

const store = useStore();
const overlay = ref(false);
const openMenu = ref(false);
const { locales, locale, setLocale } = useI18n();

const showNotify = () => {
  toast.success('Saqlanganlarga muvaffaqqiyatli qo\'shildi!');
};

const showRemoveNotify = () => {
  toast.warning('Saqlanganlardan muvaffaqqiyatli o\'chirildi');
};

const language = computed({
  get: () => locale.value,
  set: (value) => {
    setLocale(value);
  },
});

const localePath = useLocalePath();
const router = useRouter();

const redirectToHome = (item) => {
  router.push(localePath(`/`) + item.to);
};

function downloadFile() {
  const link = document.createElement('a');
  link.href = store.setting?.data.file_url;
  link.setAttribute('download', 'file.pdf');
  link.setAttribute('target', '_blank');
  document.body.appendChild(link);
  link.click();
}

async function setLanguage(item) {
  localStorage.setItem('lang', item.iso);
  language.value = localStorage.getItem('lang');
  store.getLang();
  store.getData();
}

const colors = await $fetch(store.baseUrl + '/color')

function removeOverlay() {
  overlay.value = false;
  openMenu.value = false;
}

function setDarkMode() {
  document.body.classList.toggle('dark-mode');
  store.darkmode = !store.darkmode;
  localStorage.setItem('darkMode', store.darkmode);
  store.checkDark();
}

onMounted(() => {
  var newBgDarkValue = store.colors.data[2].color;
  // CSS-stilga o'zgarishlarni qo'llash
  document.documentElement.style.setProperty("--prColor", newBgDarkValue);
  language.value = localStorage.getItem('lang');
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('.header-bottom');
    nav.classList.toggle('sticky', window.scrollY > 0);
  });
});

onMounted(async () => {
  await store.getData();
  store.savedMapSend = JSON.parse(localStorage.getItem('savedMarkers')) || [];
  store.savedLength();
});


function openMarkerModal(marker) {
  let savedMarkers = JSON.parse(localStorage.getItem('savedMarkers')) || []

  if (savedMarkers.includes(marker.id)) {
    isSaved.value = true
  } else {
    isSaved.value = false
  }
}

const searchInfo = ref('');
const search = ref('');
const errorSearch = ref(false);
const isShow = ref(false);
let clickedSearch = ref('');

async function sendSearch(event) {
  const data = JSON.stringify({
    search: searchInfo.value,
  });

  search.value = await $fetch('https://admin.opendoc.uz/api/search', {
    method: 'POST',
    headers: {
      "Accept-Language": store.selectedLang,
    },
    body: data,

  });

  if (searchInfo.value.length > 0) {
    isShow.value = true;
  } else {
    isShow.value = false;
    errorSearch.value = false;
  }

  if (search.value.status === 404) {
    isShow.value = false;
    errorSearch.value = true;
  }
}

function searchInput() {
  searchInfo.value = '';
}

const frontToward = ref(true);
let isSaved = ref(false);

function saveMarker(clickedSearch) {
  let savedMarkers = JSON.parse(localStorage.getItem('savedMarkers')) || [];

  if (savedMarkers.length !== 0) {
    const item = savedMarkers.findIndex((item) => item === clickedSearch.id);

    if (item === -1) {
      savedMarkers.push(clickedSearch.id);
      changeIsSaved(clickedSearch);
      showNotify();
      closeMarkerModal();
      localStorage.setItem('savedMarkers', JSON.stringify(savedMarkers));
      store.savedLength();
    } else {
      savedMarkers.splice(item, 1);
      showRemoveNotify();
      localStorage.setItem('savedMarkers', JSON.stringify(savedMarkers));
      closeMarkerModal();
      store.savedLength();
    }
  } else {
    savedMarkers.push(clickedSearch.id);
    changeIsSaved(clickedSearch);
    showNotify();
    closeMarkerModal();
    localStorage.setItem('savedMarkers', JSON.stringify(savedMarkers));
    store.savedLength();
  }
}

function changeIsSaved(clickedSearch) {
  let savedMarkers = JSON.parse(localStorage.getItem('savedMarkers')) || [];

  savedMarkers.forEach((id) => {
    if (clickedSearch.id === id) {
      isSaved.value = true;
    } else {
      isSaved.value = false;
    }
  });
}
console.log(isSaved.value);

function closeMarkerModal() {
  store.searchModal.value = false;
  store.blur = false;
}
</script>
  
<style lang="scss" scoped>
@import '../assets/scss/var';

.mapMore {
  width: 100%;
  max-width: 1324px;
  background-color: var(--bgDark);
  border-radius: 18px;
  padding: 40px;
  height: 100%;
  max-height: 800px;
  position: fixed;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  z-index: 1510;
  overflow: auto;

  @media (max-width:1350px) {
    width: 100%;
    max-width: 1300px;
    padding: 10px;
  }

  @media (max-width:1310px) {
    width: 100%;
    max-width: 1250px;
    padding: 10px;
  }

  @media (max-width:1270px) {
    width: 100%;
    max-width: 1200px;
    padding: 10px;
  }

  @media (max-width:1225px) {
    width: 100%;
    max-width: 1160px;
    padding: 10px;
  }

  @media (max-width:1190px) {
    width: 100%;
    max-width: 1100px;
    padding: 10px;
  }

  @media (max-width:1130px) {
    width: 100%;
    max-width: 1050px;
    padding: 10px;
  }

  @media (max-width:1070px) {
    width: 100%;
    max-width: 900px;
    padding: 10px;
  }

  @media (max-width:930px) {
    width: 100%;
    max-width: 800px;
    padding: 10px;
  }

  @media (max-width:830px) {
    width: 100%;
    max-width: 700px;
    padding: 10px;
  }

  @media (max-width:730px) {
    width: 100%;
    max-width: 600px;
    padding: 10px;
  }

  @media (max-width:630px) {
    width: 100%;
    max-width: 500px;
    padding: 10px;
  }

  @media (max-width:530px) {
    width: 100%;
    max-width: 400px;
    padding: 10px;
  }

  @media (max-width:420px) {
    width: 100%;
    max-width: 350px;
    padding: 10px;
  }

  @media (max-width:660px) {
    padding: 10px;
  }

  .cancel {
    z-index: 1511;
    position: fixed;
    top: 1%;
    right: 1%;
  }

  .nav {
    h1.title {
      font-size: 28px;
      font-weight: 600;
      line-height: 33px;
      color: var(--title);
    }

    .location {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 10px;

      svg {
        fill: var(--title);
      }

      p.info {
        font-size: 16px;
        font-weight: 500;
        line-height: 22px;
        color: var(--title);

        @media (max-width: 660px) {
          font-size: 14px;
          font-weight: 500;
          line-height: 18px;
        }
      }
    }
  }

  p.info {
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
    color: var(--title);

    @media (max-width: 660px) {
      font-size: 14px;
      font-weight: 500;
      line-height: 18px;
    }
  }

  p.text {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: var(--title);

    @media (max-width: 660px) {
      font-size: 12px;
      font-weight: 500;
      line-height: 16px;
    }
  }

  .banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 30px;
    gap: 20px;

    @media (max-width:900px) {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column-reverse;
    }

    .box.price {
      width: 100%;
      max-width: 600px;
      background: var(--bgLight);
      border-radius: 18px;
      height: 100%;
      min-height: 350px;


      table {
        width: 100%;
        padding: 12px 18px;

        thead,
        tbody {
          border-bottom: 1px solid rgba(255, 255, 255, 0.10);
          text-align: left;
        }
      }

      .card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 25px;
        margin-top: 20px;
        padding: 20px 18px;

        @media (max-width: 1100px) {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
        }

        .discount {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          background-color: var(--bgDark);
          padding: 10px;
          border-radius: 18px;

          p.amount {
            padding: 27px 20px;
            border-radius: 18px;
            background-color: #FF5353;
            font-size: 16px;
            font-weight: 500;
            line-height: 22px;
            color: var(--title);

            @media (max-width: 660px) {
              font-size: 14px;
              font-weight: 500;
              line-height: 18px;
            }
          }

          p.info {
            width: 100%;
            max-width: 170px;
          }
        }
      }
    }

    .box.image {
      width: 100%;
      max-width: 600px;
      border-radius: 18px;
      overflow: hidden;
      height: 100%;
      min-height: 350px;

      img {
        width: 100%;
        height: 100%;
        min-height: 350px;
        object-fit: cover;
        object-position: center;
      }
    }
  }

  .footer {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    width: 100%;

    @media (max-width:660px) {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column-reverse;
    }

    .card.content {
      width: 100%;
      max-width: 600px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--bgLight);
      border-radius: 18px;
      overflow: hidden;
      gap: 20px;
      height: 100%;
      min-height: 180px;

      @media (max-width:500px) {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column-reverse;
      }

      .qr-code {
        padding-left: 20px;
      }

      .littleMap {
        width: 100%;
        height: 100%;

        iframe {
          width: 100%;
          height: 100%;
          min-height: 180px;
        }
      }
    }

    .card.info {
      width: 100%;
      background: var(--bgLight);
      border-radius: 18px;
      overflow: hidden;
      padding: 24px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin: 0 auto;
      height: 100%;
      min-height: 180px;

      .item:nth-child(2) {
        border-left: 1px solid #FFFFFF1A;
        border-right: 1px solid #FFFFFF1A;
      }

      .item {
        padding: 30px 20px;

        p.text {
          width: 100%;
          max-width: 170px;
        }

        p.info {
          width: 100%;
          margin-top: 8px;
          max-width: 220px;
        }
      }

    }
  }

  .commanyName {
    width: 100px;
    margin: 0px auto;

    p {
      margin-top: 50px;
      font-size: 16px;
      font-weight: normal;
      line-height: normal;
      color: #89999E;
    }
  }
}

.form-box {
  position: relative;

  .searchItem {
    position: absolute;
    bottom: -210px;
    left: 0;
    width: 300px;
    height: 200px;
    padding: 5px;
    background: white;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    overflow: auto;
    gap: 10px;
    border-radius: 12px;
    z-index: 10;

    div {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    h1 {
      color: #12CEFF;
      cursor: pointer;
    }

    img {
      cursor: pointer;
    }


  }
}

.erroeSearch {
  position: absolute;
  padding: 10px;
  bottom: -60px;
  margin-left: 20px;
  background: white;
  border-radius: 10px;

}

@media print {
  #navBar {
    display: none !important;
  }
}

.download {
  display: none;
}

.menu-enter-active,
.menu-leave-active {
  transition: all 0.5s ease;
  transform: translateX(0);
}

.menu-enter-from,
.menu-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}



.main {
  flex-grow: 1;
}

.search {
  position: fixed;
  top: 200px;
  right: 400px;
  z-index: 100;
}

.map-wrapper {
  width: 100%;
  overflow: hidden;
}

.modal-container {
  height: 100%;
  overflow: auto;
}

.modalMap {
  background-color: var(--bgDark);
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 18px;
  padding: 30px;
  position: fixed;
  overflow: auto;
  height: 100%;
  z-index: 1510;
  position: fixed;
  top: 1%;

  @media(max-width: 640px) {
    width: 100%;
    max-width: 600px;
    margin: 0 20px;
  }

  @media(max-width: 615px) {
    width: 100%;
    max-width: 550px;
    margin: 0 20px;
  }

  @media(max-width: 570px) {
    width: 100%;
    max-width: 520px;
    margin: 0 20px;
  }

  @media(max-width: 540px) {
    width: 100%;
    max-width: 500px;
    margin: 0 20px;
  }

  @media(max-width: 510px) {
    width: 100%;
    max-width: 450px;
    margin: 0 20px;
  }

  @media(max-width: 470px) {
    width: 100%;
    max-width: 430px;
    margin: 0 20px;
  }

  @media(max-width: 440px) {
    width: 100%;
    max-width: 380px;
    margin: 0 20px;
  }


  ::-webkit-scrollbar {
    display: none;
  }

  .cancel {
    position: absolute;
    top: 1%;
    right: 1%;
  }

  p.info {
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
    color: var(--title);
    width: 100%;
    max-width: 300px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    @media (max-width: 660px) {
      font-size: 14px;
    }
  }

  p.info.price {
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
    color: #12CEFF;

    @media (max-width: 660px) {
      font-size: 14px;
    }
  }

  p.info.status {
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
    color: var(--title);
    background-color: var(--status);
    padding: 10px;
    border-radius: 18px;

    @media (max-width: 660px) {
      font-size: 14px;
    }
  }

  p.name {
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
    color: var(--text);

    @media (max-width: 660px) {
      font-size: 14px;
    }
  }

  .slide {
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
    }

    .site-banner-left-arrow {
      position: absolute;
      border-radius: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 100;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: 0.2s ease-in;
    }
  }

  .infoMap {
    margin-top: 24px;

    .nav {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;

      .item {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 225px;
        background: var(--bgLight);
        border-radius: 18px;
        padding: 8px 0;
      }

    }

    .banner {
      .banner-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #FFFFFF1A;
        padding: 16px 0;
      }

    }

  }


  .footer {
    margin-top: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 18px;

    .btn {
      width: 100%;
      max-width: 222px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .mapModal-media-btn {
    @media(max-width:510px) {
      display: flex;
      flex-direction: column;

      .btn {
        width: 100%;
        max-width: 490px;
      }
    }
  }
}

.savedClear {
  padding: 14px 18px;
  background: #D24242;
  color: #fff;
  border-radius: 12px;
}
</style>

