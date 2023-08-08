<template>
  <div class="map-wrapper">
    <h1 class="map__title">{{ $t("map_title1") }} <span class="text-btn">{{ $t("map_title2") }}</span>...</h1>

    <!-- map modal -->
    <div class="container modal-container flex items-center justify-center">
      <div class="modalMap  relative" v-if="store.openMapModal">
        <cancel-modal @click="store.openMapModal = false, store.blur = false" class="cancel"></cancel-modal>
        <button @click="store.openMapModal = false, store.imageModal = true, store.blur = true"
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
              <img v-if="frontToward" :src="modalData?.toward[0]?.img" class="map-modal-img" alt="img">
              <img v-else :src="modalData?.toward[1]?.img" class="map-modal-img" alt="img">
            </SwiperSlide>
          </Swiper>
        </div>
        <div class="infoMap">
          <div class="nav">
            <p class="info item box cursor-pointer" @click="frontToward = true">{{ modalData?.toward[0]?.toward }}</p>
            <p class="info item box cursor-pointer" @click="frontToward = false">{{ modalData?.toward[1]?.toward }}</p>
          </div>
          <div class="banner">


            <div class="banner-info">
              <p class="name">{{ $t("manzil") }}</p>
              <p class="info"> {{ modalData?.address }} </p>
            </div>
            <div class="banner-info">
              <p class="name">{{ $t("type") }}</p>
              <p class="info"> {{ modalData?.tip }} </p>
            </div>
            <div class="banner-info">
              <p class="name">{{ $t("number") }}</p>
              <p class="info"> {{ modalData?.number }} </p>
            </div>
            <div class="banner-info">
              <p class="name">{{ $t("size") }}</p>
              <p class="info"> {{ modalData?.size }} </p>
            </div>
            <div class="banner-info">
              <p class="name">{{ $t("zone") }}</p>
              <p class="info"> {{ modalData?.zone }} </p>
            </div>
            <div class="banner-info">
              <p class="name ">{{ $t("status") }}</p>
              <p v-if="!modalData.busy" class="mapModalBusy"> Занято до: {{
                modalData.end_date
              }} </p>
              <p v-else class="mapModalEmpty"> {{ $t("busy") }} </p>
            </div>
            <div class="banner-info">
              <p class="name">{{ $t("price") }}</p>
              <p class="info price"> {{ modalData?.price }} {{ $t("sumDay") }} </p>
              {{ modalData.saved }}
            </div>
          </div>
        </div>
        <div class="footer mapModal-media-btn">
          <transparent-btn @click="store.openMapMore = true, store.openMapModal = false, store.blur = true" class="btn"
            :transparentBtnContent="$t('next')"></transparent-btn>
          <button v-if="isSaved" @click="saveMarker(modalData)" class="savedClear">{{ $t('deleteSave') }}</button>
          <pr-button v-else @click="saveMarker(modalData)" class="btn" :content="$t('save')"></pr-button>
        </div>
      </div>
    </div>

    <!-- map image modal -->
    <div v-if="store.imageModal" class="contentModal">
      <div class="container">
        <div class="slideModal">
          <div class="slideModal-nav">
            <div class="right-arrow">
              <img src="../assets/images/Arrowleft.png" alt="img">
            </div>
            <div class="left-arrow">
              <img src="../assets/images/arrowright.png" alt="img">
            </div>
          </div>
          <Swiper :slides-per-view="1" :modules="modules" :navigation="{
            nextEl: '.right-arrow',
            prevEl: '.left-arrow'
          }" :breakpoints="breakpointsHeroSlider">
            <SwiperSlide v-for="slide in 2" :key="slide">
              <cancel-modal @click="store.imageModal = false, store.openMapModal = true" class="cancel"></cancel-modal>
              <img v-if="frontToward" :src="modalData?.toward[0]?.img" class="map-img" alt="img">
              <img v-else :src="modalData?.toward[1]?.img" class="map-img" alt="img">
              <div class="slideModal-location">
                <img src="../assets/images/svg/location.svg" alt="">
                <p class="info">{{ modalData?.address }} </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>

    <!-- map modal moree -->
    <!-- v-if="store.openMapMore" -->
    <div class="mapMore" v-if="store.openMapMore">
      <cancel-modal @click="store.openMapMore = false, store.openMapModal = true" class="cancel"></cancel-modal>
      <div class="nav">
        <div class="location">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 11.75C12.4859 11.75 12.899 11.5798 13.2394 11.2394C13.5798 10.899 13.75 10.4859 13.75 9.99998C13.75 9.51408 13.5798 9.10094 13.2394 8.76058C12.899 8.42019 12.4859 8.25 12 8.25C11.5141 8.25 11.1009 8.42019 10.7606 8.76058C10.4202 9.10094 10.25 9.51408 10.25 9.99998C10.25 10.4859 10.4202 10.899 10.7606 11.2394C11.1009 11.5798 11.5141 11.75 12 11.75ZM12 21.4615C11.8795 21.4615 11.7621 21.4413 11.648 21.4009C11.5339 21.3605 11.4301 21.3019 11.3365 21.225C8.95447 19.0814 7.17788 17.092 6.00672 15.2567C4.83557 13.4215 4.25 11.7359 4.25 10.2C4.25 7.77691 5.03012 5.84614 6.59037 4.40768C8.15062 2.96923 9.95382 2.25 12 2.25C14.0461 2.25 15.8493 2.96923 17.4096 4.40768C18.9698 5.84614 19.75 7.77691 19.75 10.2C19.75 11.7359 19.1644 13.4215 17.9932 15.2567C16.8221 17.092 15.0455 19.0814 12.6634 21.225C12.5762 21.3019 12.474 21.3605 12.3567 21.4009C12.2394 21.4413 12.1205 21.4615 12 21.4615Z"
              fill="" />
          </svg>
          <p class="info"> {{ modalData?.address }} </p>
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
            <tbody class="body" v-for="item in modalData?.tariffs" :key="item">
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
            <div class="discount" v-for="item in modalData?.discount" :key="item">
              <!-- {{ item.discount }} -->
              <p class="amount"> {{ item.discount }} </p>
              <!-- {{ item.title }} -->
              <p class="info"> {{ item.title }} </p>
            </div>
          </div>
        </div>
        <div class="box image">
          <img v-if="frontToward" :src="modalData?.toward[0]?.img" class="h-60 w-full" alt="img">
          <img v-else :src="modalData?.toward[1]?.img" class="h-60 w-full" alt="img">
        </div>
      </div>
      <div class="footer">
        <div class="card content">
          <div class="qr-code">
            <qrcode-vue :value="modalData?.url" :size="141" level="H" />
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
            <p class="info">{{ modalData?.size }} </p>
          </div>
          <div class="item">
            <p class="text">{{ $t('timeLed') }}</p>
            <p class="info">{{ modalData?.time }} </p>
          </div>
          <div class="item">
            <p class="text">{{ $t('featuresLed') }}</p>
            <p class="info" v-html="modalData?.description"></p>
          </div>
        </div>
      </div>
      <div class="commanyName">
        <p>Inout group</p>
      </div>
    </div>


    <!-- map -->
    <div class="google-map map">
      <main>
        <l-map ref="map" v-model:zoom="zoom" v-model:center="center" :useGlobalLeaflet="false" v-bind:min-zoom="10"
          :options="interactionOptions">
          <l-tile-layer url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}" :subdomains="subdomains"
            :visible="true"></l-tile-layer>
          <!-- <l-tile-layer url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}" :subdomains="subdomains"></l-tile-layer> -->
          <!-- <l-tile-layer url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}" :subdomains="subdomains"></l-tile-layer> -->
          <!-- <l-tile-layer url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" :subdomains="subdomains"></l-tile-layer> -->
          <!-- <l-tile-layer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" :subdomains="subdomains"></l-tile-layer> -->
          <div v-if="!filteredData">
            <l-marker v-for="marker in markers" :key="marker" :lat-lng="[marker.latitude, marker.longitude]"
              @click="openMarkerModal(marker)">
              <l-icon :icon-url="marker.icon">
              </l-icon>
              <!-- :icon-size="dynamicSize" :icon-anchor="dynamicAnchor" -->
            </l-marker>
          </div>
          <div v-else>
            <l-marker v-for="marker in filteredData?.data" :key="marker" :lat-lng="[marker.latitude, marker.longitude]"
              @click="openMarkerModal(marker)">
              <l-icon :icon-url="marker.icon">
              </l-icon>
              <!-- :icon-size="dynamicSize" :icon-anchor="dynamicAnchor" -->
            </l-marker>
          </div>
        </l-map>
      </main>
    </div>

    <!-- map buttons -->
    <div class="map-buttons">
      <!-- static buttons -->
      <button class="map-button animate active" style="animation-delay: .4s;" @click="filterMap($event, 'all')"
        ref="button">
        <div class="map-button__img">
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="1">
              <circle id="Ellipse 2" cx="19" cy="19" r="19" fill="#EEF4F8" />
              <g id="12">
                <path id="Rectangle 20"
                  d="M8 12.1864C8 10.9789 8.9789 10 10.1864 10H27.8136C29.0211 10 30 10.9789 30 12.1864V23.2712C30 24.4787 29.0211 25.4576 27.8136 25.4576H20.0908C19.404 25.4576 18.757 25.7804 18.344 26.3291L16.3333 29L14.1565 26.2784C13.7415 25.7596 13.1133 25.4576 12.449 25.4576H10.1864C8.9789 25.4576 8 24.4787 8 23.2712V12.1864Z"
                  fill="#00ff00" />
                <g id="1_2">
                  <path id="Vector 2"
                    d="M17 17.9696V21.7774C17 21.883 17.0856 21.9685 17.1911 21.9685H18.0186C18.1241 21.9685 18.2096 21.883 18.2096 21.7774V18.3095L18.2098 18.3031C18.2139 18.2215 18.3398 16.1612 20.4399 16.1612C22.6448 16.1612 22.7529 18.2537 22.7552 18.3047L22.7553 18.308L22.8032 21.8115C22.8047 21.916 22.8898 22 22.9943 22H23.8065C23.913 22 23.9989 21.913 23.9976 21.8065L23.9494 17.9708L23.9494 17.9663C23.9504 17.8968 23.9697 15 20.354 15C17.0891 15 17.0012 17.9227 17 17.967L17 17.9696Z"
                    fill="white" />
                  <g id="Union">
                    <path
                      d="M13.1163 13C13.0521 13 13 13.0464 13 13.1035V14.1539C13 14.211 13.0521 14.2574 13.1163 14.2574H14.2958C14.36 14.2574 14.4121 14.211 14.4121 14.1539V13.1035C14.4121 13.0464 14.36 13 14.2958 13H13.1163Z"
                      fill="white" />
                    <path
                      d="M13.0319 15.0446V16.9078C13.0223 17.5825 13.0064 18.9335 13.2727 19.5922C13.6402 20.5008 14.1724 21.151 14.91 21.5132C15.4867 21.7964 15.8632 21.9785 16.8062 21.9999C16.9132 22.0024 17 21.9248 17 21.8295V21.0512C17 20.9559 16.9133 20.8787 16.8064 20.8734C16.5967 20.8631 16.2842 20.8332 16.0273 20.7499C14.9946 20.4155 14.4423 19.1295 14.423 18.6277C14.3887 17.7345 14.4009 15.9659 14.4079 15.0457C14.4086 14.95 14.3217 14.872 14.2141 14.872H13.2258C13.1187 14.872 13.0319 14.9493 13.0319 15.0446Z"
                      fill="white" />
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
        <p class="map-button__text"> Barcha afishalar </p>
      </button>
      <button class="map-button animate" style="animation-delay: .8s;" @click="filterMap($event, 'empty')" ref="button">
        <div class="map-button__img">
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="1">
              <circle id="Ellipse 2" cx="19" cy="19" r="19" fill="#EEF4F8" />
              <g id="12">
                <path id="Rectangle 20"
                  d="M8 12.1864C8 10.9789 8.9789 10 10.1864 10H27.8136C29.0211 10 30 10.9789 30 12.1864V23.2712C30 24.4787 29.0211 25.4576 27.8136 25.4576H20.0908C19.404 25.4576 18.757 25.7804 18.344 26.3291L16.3333 29L14.1565 26.2784C13.7415 25.7596 13.1133 25.4576 12.449 25.4576H10.1864C8.9789 25.4576 8 24.4787 8 23.2712V12.1864Z"
                  fill="#0000ff" />
                <g id="1_2">
                  <path id="Vector 2"
                    d="M17 17.9696V21.7774C17 21.883 17.0856 21.9685 17.1911 21.9685H18.0186C18.1241 21.9685 18.2096 21.883 18.2096 21.7774V18.3095L18.2098 18.3031C18.2139 18.2215 18.3398 16.1612 20.4399 16.1612C22.6448 16.1612 22.7529 18.2537 22.7552 18.3047L22.7553 18.308L22.8032 21.8115C22.8047 21.916 22.8898 22 22.9943 22H23.8065C23.913 22 23.9989 21.913 23.9976 21.8065L23.9494 17.9708L23.9494 17.9663C23.9504 17.8968 23.9697 15 20.354 15C17.0891 15 17.0012 17.9227 17 17.967L17 17.9696Z"
                    fill="white" />
                  <g id="Union">
                    <path
                      d="M13.1163 13C13.0521 13 13 13.0464 13 13.1035V14.1539C13 14.211 13.0521 14.2574 13.1163 14.2574H14.2958C14.36 14.2574 14.4121 14.211 14.4121 14.1539V13.1035C14.4121 13.0464 14.36 13 14.2958 13H13.1163Z"
                      fill="white" />
                    <path
                      d="M13.0319 15.0446V16.9078C13.0223 17.5825 13.0064 18.9335 13.2727 19.5922C13.6402 20.5008 14.1724 21.151 14.91 21.5132C15.4867 21.7964 15.8632 21.9785 16.8062 21.9999C16.9132 22.0024 17 21.9248 17 21.8295V21.0512C17 20.9559 16.9133 20.8787 16.8064 20.8734C16.5967 20.8631 16.2842 20.8332 16.0273 20.7499C14.9946 20.4155 14.4423 19.1295 14.423 18.6277C14.3887 17.7345 14.4009 15.9659 14.4079 15.0457C14.4086 14.95 14.3217 14.872 14.2141 14.872H13.2258C13.1187 14.872 13.0319 14.9493 13.0319 15.0446Z"
                      fill="white" />
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
        <p class="map-button__text"> Bo'sh </p>
      </button>
      <button class="map-button animate" style="animation-delay: 1.2s;" @click="filterMap($event, 'busy')" ref="button">
        <div class="map-button__img">
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="1">
              <circle id="Ellipse 2" cx="19" cy="19" r="19" fill="#EEF4F8" />
              <g id="12">
                <path id="Rectangle 20"
                  d="M8 12.1864C8 10.9789 8.9789 10 10.1864 10H27.8136C29.0211 10 30 10.9789 30 12.1864V23.2712C30 24.4787 29.0211 25.4576 27.8136 25.4576H20.0908C19.404 25.4576 18.757 25.7804 18.344 26.3291L16.3333 29L14.1565 26.2784C13.7415 25.7596 13.1133 25.4576 12.449 25.4576H10.1864C8.9789 25.4576 8 24.4787 8 23.2712V12.1864Z"
                  fill="#ff0000" />
                <g id="1_2">
                  <path id="Vector 2"
                    d="M17 17.9696V21.7774C17 21.883 17.0856 21.9685 17.1911 21.9685H18.0186C18.1241 21.9685 18.2096 21.883 18.2096 21.7774V18.3095L18.2098 18.3031C18.2139 18.2215 18.3398 16.1612 20.4399 16.1612C22.6448 16.1612 22.7529 18.2537 22.7552 18.3047L22.7553 18.308L22.8032 21.8115C22.8047 21.916 22.8898 22 22.9943 22H23.8065C23.913 22 23.9989 21.913 23.9976 21.8065L23.9494 17.9708L23.9494 17.9663C23.9504 17.8968 23.9697 15 20.354 15C17.0891 15 17.0012 17.9227 17 17.967L17 17.9696Z"
                    fill="white" />
                  <g id="Union">
                    <path
                      d="M13.1163 13C13.0521 13 13 13.0464 13 13.1035V14.1539C13 14.211 13.0521 14.2574 13.1163 14.2574H14.2958C14.36 14.2574 14.4121 14.211 14.4121 14.1539V13.1035C14.4121 13.0464 14.36 13 14.2958 13H13.1163Z"
                      fill="white" />
                    <path
                      d="M13.0319 15.0446V16.9078C13.0223 17.5825 13.0064 18.9335 13.2727 19.5922C13.6402 20.5008 14.1724 21.151 14.91 21.5132C15.4867 21.7964 15.8632 21.9785 16.8062 21.9999C16.9132 22.0024 17 21.9248 17 21.8295V21.0512C17 20.9559 16.9133 20.8787 16.8064 20.8734C16.5967 20.8631 16.2842 20.8332 16.0273 20.7499C14.9946 20.4155 14.4423 19.1295 14.423 18.6277C14.3887 17.7345 14.4009 15.9659 14.4079 15.0457C14.4086 14.95 14.3217 14.872 14.2141 14.872H13.2258C13.1187 14.872 13.0319 14.9493 13.0319 15.0446Z"
                      fill="white" />
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
        <p class="map-button__text"> Band qilingan </p>
      </button>
      <button class="map-button animate" style="animation-delay: 1.6s;" @click="filterMap($event, 'district')"
        ref="button">
        <div class="map-button__img">
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="1">
              <circle id="Ellipse 2" cx="19" cy="19" r="19" fill="#EEF4F8" />
              <g id="12">
                <path id="Rectangle 20"
                  d="M8 12.1864C8 10.9789 8.9789 10 10.1864 10H27.8136C29.0211 10 30 10.9789 30 12.1864V23.2712C30 24.4787 29.0211 25.4576 27.8136 25.4576H20.0908C19.404 25.4576 18.757 25.7804 18.344 26.3291L16.3333 29L14.1565 26.2784C13.7415 25.7596 13.1133 25.4576 12.449 25.4576H10.1864C8.9789 25.4576 8 24.4787 8 23.2712V12.1864Z"
                  fill="#6d9eeb" />
                <g id="1_2">
                  <path id="Vector 2"
                    d="M17 17.9696V21.7774C17 21.883 17.0856 21.9685 17.1911 21.9685H18.0186C18.1241 21.9685 18.2096 21.883 18.2096 21.7774V18.3095L18.2098 18.3031C18.2139 18.2215 18.3398 16.1612 20.4399 16.1612C22.6448 16.1612 22.7529 18.2537 22.7552 18.3047L22.7553 18.308L22.8032 21.8115C22.8047 21.916 22.8898 22 22.9943 22H23.8065C23.913 22 23.9989 21.913 23.9976 21.8065L23.9494 17.9708L23.9494 17.9663C23.9504 17.8968 23.9697 15 20.354 15C17.0891 15 17.0012 17.9227 17 17.967L17 17.9696Z"
                    fill="white" />
                  <g id="Union">
                    <path
                      d="M13.1163 13C13.0521 13 13 13.0464 13 13.1035V14.1539C13 14.211 13.0521 14.2574 13.1163 14.2574H14.2958C14.36 14.2574 14.4121 14.211 14.4121 14.1539V13.1035C14.4121 13.0464 14.36 13 14.2958 13H13.1163Z"
                      fill="white" />
                    <path
                      d="M13.0319 15.0446V16.9078C13.0223 17.5825 13.0064 18.9335 13.2727 19.5922C13.6402 20.5008 14.1724 21.151 14.91 21.5132C15.4867 21.7964 15.8632 21.9785 16.8062 21.9999C16.9132 22.0024 17 21.9248 17 21.8295V21.0512C17 20.9559 16.9133 20.8787 16.8064 20.8734C16.5967 20.8631 16.2842 20.8332 16.0273 20.7499C14.9946 20.4155 14.4423 19.1295 14.423 18.6277C14.3887 17.7345 14.4009 15.9659 14.4079 15.0457C14.4086 14.95 14.3217 14.872 14.2141 14.872H13.2258C13.1187 14.872 13.0319 14.9493 13.0319 15.0446Z"
                      fill="white" />
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
        <p class="map-button__text"> Tumanlar bo'yicha </p>
      </button>
      <!-- dynamic buttons -->
      <button class="map-button" v-for="(button, index) in store.mapButtons?.data" :key="button"
        @click="filterMap($event, 'dynamic', button.id)" ref="button">
        <div class="map-button__img">
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="1">
              <circle id="Ellipse 2" cx="19" cy="19" r="19" fill="#EEF4F8" />
              <g id="12">
                <path id="Rectangle 20"
                  d="M8 12.1864C8 10.9789 8.9789 10 10.1864 10H27.8136C29.0211 10 30 10.9789 30 12.1864V23.2712C30 24.4787 29.0211 25.4576 27.8136 25.4576H20.0908C19.404 25.4576 18.757 25.7804 18.344 26.3291L16.3333 29L14.1565 26.2784C13.7415 25.7596 13.1133 25.4576 12.449 25.4576H10.1864C8.9789 25.4576 8 24.4787 8 23.2712V12.1864Z"
                  :fill="button.color" />
                <g id="1_2">
                  <path id="Vector 2"
                    d="M17 17.9696V21.7774C17 21.883 17.0856 21.9685 17.1911 21.9685H18.0186C18.1241 21.9685 18.2096 21.883 18.2096 21.7774V18.3095L18.2098 18.3031C18.2139 18.2215 18.3398 16.1612 20.4399 16.1612C22.6448 16.1612 22.7529 18.2537 22.7552 18.3047L22.7553 18.308L22.8032 21.8115C22.8047 21.916 22.8898 22 22.9943 22H23.8065C23.913 22 23.9989 21.913 23.9976 21.8065L23.9494 17.9708L23.9494 17.9663C23.9504 17.8968 23.9697 15 20.354 15C17.0891 15 17.0012 17.9227 17 17.967L17 17.9696Z"
                    fill="white" />
                  <g id="Union">
                    <path
                      d="M13.1163 13C13.0521 13 13 13.0464 13 13.1035V14.1539C13 14.211 13.0521 14.2574 13.1163 14.2574H14.2958C14.36 14.2574 14.4121 14.211 14.4121 14.1539V13.1035C14.4121 13.0464 14.36 13 14.2958 13H13.1163Z"
                      fill="white" />
                    <path
                      d="M13.0319 15.0446V16.9078C13.0223 17.5825 13.0064 18.9335 13.2727 19.5922C13.6402 20.5008 14.1724 21.151 14.91 21.5132C15.4867 21.7964 15.8632 21.9785 16.8062 21.9999C16.9132 22.0024 17 21.9248 17 21.8295V21.0512C17 20.9559 16.9133 20.8787 16.8064 20.8734C16.5967 20.8631 16.2842 20.8332 16.0273 20.7499C14.9946 20.4155 14.4423 19.1295 14.423 18.6277C14.3887 17.7345 14.4009 15.9659 14.4079 15.0457C14.4086 14.95 14.3217 14.872 14.2141 14.872H13.2258C13.1187 14.872 13.0319 14.9493 13.0319 15.0446Z"
                      fill="white" />
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
        {{ button.title }}
      </button>
    </div>

    <!-- map swiper buttons -->
    <Swiper class="map-swiper" :modules="modules" :autoplay="{
      delay: 2000,
      disableOnInteraction: true,
    }" :breakpoints="breakpoints">
      <SwiperSlide class="swiper-slide">
        <button class="map-button" style="animation-delay: .4s;" @click="filterMap($event, 'all')" ref="button">
          <div class="map-button__img">
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="1">
                <circle id="Ellipse 2" cx="19" cy="19" r="19" fill="#EEF4F8" />
                <g id="12">
                  <path id="Rectangle 20"
                    d="M8 12.1864C8 10.9789 8.9789 10 10.1864 10H27.8136C29.0211 10 30 10.9789 30 12.1864V23.2712C30 24.4787 29.0211 25.4576 27.8136 25.4576H20.0908C19.404 25.4576 18.757 25.7804 18.344 26.3291L16.3333 29L14.1565 26.2784C13.7415 25.7596 13.1133 25.4576 12.449 25.4576H10.1864C8.9789 25.4576 8 24.4787 8 23.2712V12.1864Z"
                    fill="#00ff00" />
                  <g id="1_2">
                    <path id="Vector 2"
                      d="M17 17.9696V21.7774C17 21.883 17.0856 21.9685 17.1911 21.9685H18.0186C18.1241 21.9685 18.2096 21.883 18.2096 21.7774V18.3095L18.2098 18.3031C18.2139 18.2215 18.3398 16.1612 20.4399 16.1612C22.6448 16.1612 22.7529 18.2537 22.7552 18.3047L22.7553 18.308L22.8032 21.8115C22.8047 21.916 22.8898 22 22.9943 22H23.8065C23.913 22 23.9989 21.913 23.9976 21.8065L23.9494 17.9708L23.9494 17.9663C23.9504 17.8968 23.9697 15 20.354 15C17.0891 15 17.0012 17.9227 17 17.967L17 17.9696Z"
                      fill="white" />
                    <g id="Union">
                      <path
                        d="M13.1163 13C13.0521 13 13 13.0464 13 13.1035V14.1539C13 14.211 13.0521 14.2574 13.1163 14.2574H14.2958C14.36 14.2574 14.4121 14.211 14.4121 14.1539V13.1035C14.4121 13.0464 14.36 13 14.2958 13H13.1163Z"
                        fill="white" />
                      <path
                        d="M13.0319 15.0446V16.9078C13.0223 17.5825 13.0064 18.9335 13.2727 19.5922C13.6402 20.5008 14.1724 21.151 14.91 21.5132C15.4867 21.7964 15.8632 21.9785 16.8062 21.9999C16.9132 22.0024 17 21.9248 17 21.8295V21.0512C17 20.9559 16.9133 20.8787 16.8064 20.8734C16.5967 20.8631 16.2842 20.8332 16.0273 20.7499C14.9946 20.4155 14.4423 19.1295 14.423 18.6277C14.3887 17.7345 14.4009 15.9659 14.4079 15.0457C14.4086 14.95 14.3217 14.872 14.2141 14.872H13.2258C13.1187 14.872 13.0319 14.9493 13.0319 15.0446Z"
                        fill="white" />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <p class="map-button__text"> Barcha afishalar </p>
        </button>
      </SwiperSlide>
      <SwiperSlide class="swiper-slide">
        <button class="map-button" style="animation-delay: .8s;" @click="filterMap($event, 'empty')" ref="button">
          <div class="map-button__img">
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="1">
                <circle id="Ellipse 2" cx="19" cy="19" r="19" fill="#EEF4F8" />
                <g id="12">
                  <path id="Rectangle 20"
                    d="M8 12.1864C8 10.9789 8.9789 10 10.1864 10H27.8136C29.0211 10 30 10.9789 30 12.1864V23.2712C30 24.4787 29.0211 25.4576 27.8136 25.4576H20.0908C19.404 25.4576 18.757 25.7804 18.344 26.3291L16.3333 29L14.1565 26.2784C13.7415 25.7596 13.1133 25.4576 12.449 25.4576H10.1864C8.9789 25.4576 8 24.4787 8 23.2712V12.1864Z"
                    fill="#0000ff" />
                  <g id="1_2">
                    <path id="Vector 2"
                      d="M17 17.9696V21.7774C17 21.883 17.0856 21.9685 17.1911 21.9685H18.0186C18.1241 21.9685 18.2096 21.883 18.2096 21.7774V18.3095L18.2098 18.3031C18.2139 18.2215 18.3398 16.1612 20.4399 16.1612C22.6448 16.1612 22.7529 18.2537 22.7552 18.3047L22.7553 18.308L22.8032 21.8115C22.8047 21.916 22.8898 22 22.9943 22H23.8065C23.913 22 23.9989 21.913 23.9976 21.8065L23.9494 17.9708L23.9494 17.9663C23.9504 17.8968 23.9697 15 20.354 15C17.0891 15 17.0012 17.9227 17 17.967L17 17.9696Z"
                      fill="white" />
                    <g id="Union">
                      <path
                        d="M13.1163 13C13.0521 13 13 13.0464 13 13.1035V14.1539C13 14.211 13.0521 14.2574 13.1163 14.2574H14.2958C14.36 14.2574 14.4121 14.211 14.4121 14.1539V13.1035C14.4121 13.0464 14.36 13 14.2958 13H13.1163Z"
                        fill="white" />
                      <path
                        d="M13.0319 15.0446V16.9078C13.0223 17.5825 13.0064 18.9335 13.2727 19.5922C13.6402 20.5008 14.1724 21.151 14.91 21.5132C15.4867 21.7964 15.8632 21.9785 16.8062 21.9999C16.9132 22.0024 17 21.9248 17 21.8295V21.0512C17 20.9559 16.9133 20.8787 16.8064 20.8734C16.5967 20.8631 16.2842 20.8332 16.0273 20.7499C14.9946 20.4155 14.4423 19.1295 14.423 18.6277C14.3887 17.7345 14.4009 15.9659 14.4079 15.0457C14.4086 14.95 14.3217 14.872 14.2141 14.872H13.2258C13.1187 14.872 13.0319 14.9493 13.0319 15.0446Z"
                        fill="white" />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <p class="map-button__text"> Bo'sh </p>
        </button>
      </SwiperSlide>
      <SwiperSlide class="swiper-slide">
        <button class="map-button" style="animation-delay: 1.2s;" @click="filterMap($event, 'busy')" ref="button">
          <div class="map-button__img">
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="1">
                <circle id="Ellipse 2" cx="19" cy="19" r="19" fill="#EEF4F8" />
                <g id="12">
                  <path id="Rectangle 20"
                    d="M8 12.1864C8 10.9789 8.9789 10 10.1864 10H27.8136C29.0211 10 30 10.9789 30 12.1864V23.2712C30 24.4787 29.0211 25.4576 27.8136 25.4576H20.0908C19.404 25.4576 18.757 25.7804 18.344 26.3291L16.3333 29L14.1565 26.2784C13.7415 25.7596 13.1133 25.4576 12.449 25.4576H10.1864C8.9789 25.4576 8 24.4787 8 23.2712V12.1864Z"
                    fill="#ff0000" />
                  <g id="1_2">
                    <path id="Vector 2"
                      d="M17 17.9696V21.7774C17 21.883 17.0856 21.9685 17.1911 21.9685H18.0186C18.1241 21.9685 18.2096 21.883 18.2096 21.7774V18.3095L18.2098 18.3031C18.2139 18.2215 18.3398 16.1612 20.4399 16.1612C22.6448 16.1612 22.7529 18.2537 22.7552 18.3047L22.7553 18.308L22.8032 21.8115C22.8047 21.916 22.8898 22 22.9943 22H23.8065C23.913 22 23.9989 21.913 23.9976 21.8065L23.9494 17.9708L23.9494 17.9663C23.9504 17.8968 23.9697 15 20.354 15C17.0891 15 17.0012 17.9227 17 17.967L17 17.9696Z"
                      fill="white" />
                    <g id="Union">
                      <path
                        d="M13.1163 13C13.0521 13 13 13.0464 13 13.1035V14.1539C13 14.211 13.0521 14.2574 13.1163 14.2574H14.2958C14.36 14.2574 14.4121 14.211 14.4121 14.1539V13.1035C14.4121 13.0464 14.36 13 14.2958 13H13.1163Z"
                        fill="white" />
                      <path
                        d="M13.0319 15.0446V16.9078C13.0223 17.5825 13.0064 18.9335 13.2727 19.5922C13.6402 20.5008 14.1724 21.151 14.91 21.5132C15.4867 21.7964 15.8632 21.9785 16.8062 21.9999C16.9132 22.0024 17 21.9248 17 21.8295V21.0512C17 20.9559 16.9133 20.8787 16.8064 20.8734C16.5967 20.8631 16.2842 20.8332 16.0273 20.7499C14.9946 20.4155 14.4423 19.1295 14.423 18.6277C14.3887 17.7345 14.4009 15.9659 14.4079 15.0457C14.4086 14.95 14.3217 14.872 14.2141 14.872H13.2258C13.1187 14.872 13.0319 14.9493 13.0319 15.0446Z"
                        fill="white" />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <p class="map-button__text"> Band qilingan </p>
        </button>
      </SwiperSlide>
      <SwiperSlide class="swiper-slide">
        <button class="map-button" @click="filterMap($event, 'district')"
          ref="button">
          <div class="map-button__img">
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="1">
                <circle id="Ellipse 2" cx="19" cy="19" r="19" fill="#EEF4F8" />
                <g id="12">
                  <path id="Rectangle 20"
                    d="M8 12.1864C8 10.9789 8.9789 10 10.1864 10H27.8136C29.0211 10 30 10.9789 30 12.1864V23.2712C30 24.4787 29.0211 25.4576 27.8136 25.4576H20.0908C19.404 25.4576 18.757 25.7804 18.344 26.3291L16.3333 29L14.1565 26.2784C13.7415 25.7596 13.1133 25.4576 12.449 25.4576H10.1864C8.9789 25.4576 8 24.4787 8 23.2712V12.1864Z"
                    fill="#6d9eeb" />
                  <g id="1_2">
                    <path id="Vector 2"
                      d="M17 17.9696V21.7774C17 21.883 17.0856 21.9685 17.1911 21.9685H18.0186C18.1241 21.9685 18.2096 21.883 18.2096 21.7774V18.3095L18.2098 18.3031C18.2139 18.2215 18.3398 16.1612 20.4399 16.1612C22.6448 16.1612 22.7529 18.2537 22.7552 18.3047L22.7553 18.308L22.8032 21.8115C22.8047 21.916 22.8898 22 22.9943 22H23.8065C23.913 22 23.9989 21.913 23.9976 21.8065L23.9494 17.9708L23.9494 17.9663C23.9504 17.8968 23.9697 15 20.354 15C17.0891 15 17.0012 17.9227 17 17.967L17 17.9696Z"
                      fill="white" />
                    <g id="Union">
                      <path
                        d="M13.1163 13C13.0521 13 13 13.0464 13 13.1035V14.1539C13 14.211 13.0521 14.2574 13.1163 14.2574H14.2958C14.36 14.2574 14.4121 14.211 14.4121 14.1539V13.1035C14.4121 13.0464 14.36 13 14.2958 13H13.1163Z"
                        fill="white" />
                      <path
                        d="M13.0319 15.0446V16.9078C13.0223 17.5825 13.0064 18.9335 13.2727 19.5922C13.6402 20.5008 14.1724 21.151 14.91 21.5132C15.4867 21.7964 15.8632 21.9785 16.8062 21.9999C16.9132 22.0024 17 21.9248 17 21.8295V21.0512C17 20.9559 16.9133 20.8787 16.8064 20.8734C16.5967 20.8631 16.2842 20.8332 16.0273 20.7499C14.9946 20.4155 14.4423 19.1295 14.423 18.6277C14.3887 17.7345 14.4009 15.9659 14.4079 15.0457C14.4086 14.95 14.3217 14.872 14.2141 14.872H13.2258C13.1187 14.872 13.0319 14.9493 13.0319 15.0446Z"
                        fill="white" />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <p class="map-button__text"> Tumanlar bo'yicha </p>
        </button>
      </SwiperSlide>
      <SwiperSlide class="swiper-slide" v-for="button in store.mapButtons?.data" :key="button">
        <div class="map-button" @click="filterMap($event, 'dynamic', button.id)">
          <div class="map-button__img">
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="1">
                <circle id="Ellipse 2" cx="19" cy="19" r="19" fill="#EEF4F8" />
                <g id="12">
                  <path id="Rectangle 20"
                    d="M8 12.1864C8 10.9789 8.9789 10 10.1864 10H27.8136C29.0211 10 30 10.9789 30 12.1864V23.2712C30 24.4787 29.0211 25.4576 27.8136 25.4576H20.0908C19.404 25.4576 18.757 25.7804 18.344 26.3291L16.3333 29L14.1565 26.2784C13.7415 25.7596 13.1133 25.4576 12.449 25.4576H10.1864C8.9789 25.4576 8 24.4787 8 23.2712V12.1864Z"
                    :fill="button.color" />
                  <g id="1_2">
                    <path id="Vector 2"
                      d="M17 17.9696V21.7774C17 21.883 17.0856 21.9685 17.1911 21.9685H18.0186C18.1241 21.9685 18.2096 21.883 18.2096 21.7774V18.3095L18.2098 18.3031C18.2139 18.2215 18.3398 16.1612 20.4399 16.1612C22.6448 16.1612 22.7529 18.2537 22.7552 18.3047L22.7553 18.308L22.8032 21.8115C22.8047 21.916 22.8898 22 22.9943 22H23.8065C23.913 22 23.9989 21.913 23.9976 21.8065L23.9494 17.9708L23.9494 17.9663C23.9504 17.8968 23.9697 15 20.354 15C17.0891 15 17.0012 17.9227 17 17.967L17 17.9696Z"
                      fill="white" />
                    <g id="Union">
                      <path
                        d="M13.1163 13C13.0521 13 13 13.0464 13 13.1035V14.1539C13 14.211 13.0521 14.2574 13.1163 14.2574H14.2958C14.36 14.2574 14.4121 14.211 14.4121 14.1539V13.1035C14.4121 13.0464 14.36 13 14.2958 13H13.1163Z"
                        fill="white" />
                      <path
                        d="M13.0319 15.0446V16.9078C13.0223 17.5825 13.0064 18.9335 13.2727 19.5922C13.6402 20.5008 14.1724 21.151 14.91 21.5132C15.4867 21.7964 15.8632 21.9785 16.8062 21.9999C16.9132 22.0024 17 21.9248 17 21.8295V21.0512C17 20.9559 16.9133 20.8787 16.8064 20.8734C16.5967 20.8631 16.2842 20.8332 16.0273 20.7499C14.9946 20.4155 14.4423 19.1295 14.423 18.6277C14.3887 17.7345 14.4009 15.9659 14.4079 15.0457C14.4086 14.95 14.3217 14.872 14.2141 14.872H13.2258C13.1187 14.872 13.0319 14.9493 13.0319 15.0446Z"
                        fill="white" />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <p class="map-button__text"> {{ button.title }} </p>
        </div>
      </SwiperSlide>
    </Swiper>
    <!-- <h1>{{ store.savedMapSend }}</h1> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// leaflet css for google map
import "leaflet/dist/leaflet.css"
// leaflet components
import { LMap, LTileLayer, LMarker, LIcon } from "@vue-leaflet/vue-leaflet"
// toastify
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
// swiper
import { Autoplay } from 'swiper';
// store
import { useStore } from '@/stores/counter'
// for qr code
import QrcodeVue from 'qrcode.vue'

// base url
const baseUrl = 'https://admin.opendoc.uz/api';

const showNotify = () => {
  toast.success('Saqlanganlarga muvaffaqqiyatli qo\'shildi!');
};
const showRemoveNotify = () => {
  toast.warning('Saqlanganlardan muvaffaqqiyatli o\'chirildi');
};

const markersClear = ref(false)


// variables
let modules = [Autoplay];
const store = useStore()
// map options
const subdomains = ['mt0', 'mt1', 'mt2', 'mt3']
// const subdomains = ['mt0', 'mt1', 'mt2', 'mt3']
let zoom = ref(13)
let center = ref([41.30261461450302, 69.2384965222238])
const interactionOptions = {
  doubleClickZoom: true,
  closePopupOnClick: false,
  dragging: true,
  zoomSnap: true,
  zoomDelta: true,
  trackResize: false,
  touchZoom: true,
  scrollWheelZoom: true
}


const markers = ref()
let modalData = ref()
let savedMarkers = ref([])
const frontToward = ref(true)
const isMarkerSaved = ref(false)

let isSaved = ref(false)


function openMarkerModal(marker) {
  let savedMarkers = JSON.parse(localStorage.getItem('savedMarkers')) || []

  if (savedMarkers.includes(marker.id)) {
    isSaved.value = true
  } else {
    isSaved.value = false
  }

  store.openMapModal = true
  store.blur = true
  modalData.value = marker
  store.mapModalForPrint = marker
}

function closeMarkerModal() {
  store.openMapModal = false
  store.blur = false
}

let savedItems = ref([])


function saveMarker(marker) {
  let savedMarkers = JSON.parse(localStorage.getItem('savedMarkers')) || []
  // changeIsSaved(marker)
  // const isMarker = savedMarkers.find(item => item.id === marker.id)

  // if (isMarker) {
  //   isSaved.value = true
  // } else {
  //   isSaved.value = false
  // }

  if (savedMarkers.length !== 0) {
    const index = savedMarkers.findIndex(item => item === marker.id)
    if (index === -1) {
      savedMarkers.push(marker.id)
      showNotify()
      closeMarkerModal()
      localStorage.setItem("savedMarkers", JSON.stringify(savedMarkers))
      store.savedLength()

    } else {
      savedMarkers.splice(index, 1)
      showRemoveNotify()
      localStorage.setItem('savedMarkers', JSON.stringify(savedMarkers))
      closeMarkerModal()
      store.savedLength()
    }


  } else {
    savedMarkers.push(marker.id)
    showNotify()
    closeMarkerModal()
    localStorage.setItem("savedMarkers", JSON.stringify(savedMarkers))
    store.savedLength()
  }

}




onMounted(async () => {
  await store.getData()
  markers.value = store.mapData?.data
  store.savedMapSend = JSON.parse(localStorage.getItem("savedMarkers")) || []
  filteredData.value.data = store.mapData?.data

})




const filteredData = ref({})

async function filterMap(event, type, id) {
  const buttons = document.querySelectorAll('.map-button')
  buttons.forEach(button => {
    if (button !== event.target) {
      button.classList.remove('active')
    }
  })
  //nima gap eee chort
  if (type === 'dynamic') {
    filteredData.value = await $fetch(baseUrl + `/category-map/filter?id=${id}`)

  } else if (type === 'all') {
    filteredData.value.data = markers.value

  } else if (type === 'empty') {
    filteredData.value = await $fetch('https://admin.opendoc.uz/api/map/empty')

  } else if (type === 'busy') {
    filteredData.value = await $fetch('https://admin.opendoc.uz/api/map/busy')

  } else if (type === 'district') {
    filteredData.value = await $fetch('https://admin.opendoc.uz/api/map/district')
    console.log(filteredData.value);
  }
  event.target.classList.add('active')
}

// swiper breakpoints
const breakpoints = {
  270: {
    slidesPerView: 1.8,
    spaceBetween: 12,
  },
  560: {
    slidesPerView: 3,
    spaceBetween: 15,
  },
  660: {
    slidesPerView: 5,
    spaceBetween: 15,
  },
};

</script>

<style lang="scss" scoped>
@import '../assets/scss/var';

.mapModalEmpty {
  padding: 10px 18px;
  border-radius: 18px;
  background: var(--mapModalEmpty);
  color: #0AAE1B;
  font-size: 16px;
  line-height: 22px;
  font-weight: 600;
}

.mapModalBusy {
  padding: 10px 18px;
  border-radius: 18px;
  background: var(--mapModalBusy);
  color: #D24242;
  font-size: 16px;
  line-height: 22px;
  font-weight: 600;
}

.savedClear {
  padding: 14px 18px;
  background: #D24242;
  color: #fff;
  border-radius: 12px;
}

.swiperMap {
  .swiperSlide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.modalMap {
  background-color: var(--bgDark);
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 18px;
  padding: 30px;
  position: fixed;
  height: auto;
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

.banner-info {
  .info {
    @media (max-width:360px) {
      max-width: 150px;
      text-align: right;
    }
  }

}

.map-wrapper {
  width: 100%;
  overflow: hidden;
}

.map {
  width: 100%;
  height: 746px;
  border-radius: 24px;
  overflow: hidden;

  main {
    width: 100%;
    height: 100%;
  }

  &__title {
    font-size: 32px;
    color: var(--title);
    font-weight: 700;
    line-height: 38px;
    margin-bottom: 30px;
  }


  @media (max-width: 1300px) {
    height: 700px;
  }

  @media (max-width: 1200px) {
    height: 600px;
  }

  @media (max-width: 992px) {
    height: 500px;
  }

  @media (max-width: 786px) {
    height: 460px;
  }
}

.save-btn-disabled {
  cursor: default;
  text-align: center;
  background-color: transpaent;
  border: 3px solid #2d6371;
  padding: 14px 20px;
  color: #2a3437;
  font-size: 16px;
  font-weight: 600px;
  border-radius: 12px;
  transition: 0.3s linear;
  display: inline-block;
}

.modalMap {
  height: auto;
  border-radius: 18px;
  height: 100%;
  max-height: 900px;
  overflow: auto;
}

.map-buttons {
  width: 100%;
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;

  @media (max-width: 1200px) {
    display: none;
  }
}

.map-swiper {
  width: 100%;
  // min-width: 1000px;
  margin-top: 30px;

  @media (min-width: 1200px) {
    display: none;
  }
}

.swiper-slide {
  cursor: pointer;

  // width: auto;
  .map-button {
    // width: 180px
    width: 100%;
    max-width: 100%;
  }
}

.map-button {
  // width: 208px;
  margin-left: 10px;
  height: 57px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  gap: 12px;
  border-radius: 12px;
  background: var(--bgLight);
  box-shadow: var(--number-shadow);
  color: var(--title);
  font-size: 16px;
  font-family: Inter;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  display: flex;

  &.active {
    // background-color: #fff;
    background: var(--prColor) !important;
    box-shadow: 0 0 30px var(--prColor);
    transition: 0.1s;
  }



  &.animate {
    align-items: center;
    gap: 8px;
    padding: 9px 24px 9px 18px;
    // background-color: rgba(228, 0, 0, 0.2);
    border-radius: 12px;
    -webkit-animation: glowing2 2500ms infinite;
    -moz-animation: glowing2 2500ms infinite;
    animation: glowing2 2500ms infinite;
  }

  @media (max-width: 992px) {
    font-size: 14px;
    gap: 8px;
  }

  &__img {
    width: 38px;
    height: 38px;

    svg g circle {
      fill: var(--map-btn);
    }
  }

  &__text {
    position: relative;
    z-index: 1;
  }

}


@keyframes glowing2 {
  0% {
    background-color: rgba(255, 255, 255, 0.2);
  }

  50% {
    background-color: var(--prColor);
    box-shadow: 0 0 10px var(--prColor);
  }

  100% {
    background-color: rgba(255, 255, 255, 0.2);
  }
}

.map-img {
  width: 100%;
  max-width: 1160px;
  height: 772px;
  object-fit: contain;
  display: flex;
  border-radius: 18px;
  margin: 0 auto;
}

.map-modal-img {
  display: flex;
  width: 100%;
  max-width: 463px;
  height: 269px;
  border-radius: 18px;
}

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

.slideModal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 1160px;
  height: 722px;
  z-index: 10000;

  &-location {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 30px;
    left: 63px;

    img {
      display: flex;
      width: 24px;
    }
  }

  .info {

    color: var(--title);
  }

  .cancel {
    position: absolute;
    top: 30px;
    right: 50px;
  }

  .slideModal-nav {
    width: 100%;

    .left-arrow,
    .right-arrow {
      z-index: 20;
      position: absolute;
      top: 50%;


    }

    .left-arrow {
      left: -24px;
    }

    .right-arrow {
      right: -24px;
    }


  }
}
</style>