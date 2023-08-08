<template>
  <div id="DivIdToPrint" ref="divToPrint">
    <div class="blur" @click="store.removeBlur()" v-if="store.blur"></div>
    <!-- map -->
    <!-- map -->
    <!-- <div id="map" class="map"></div> -->
    <div class="mapNav" id="mapNav">
      <div class="container">
        <p class="mapNav-title">{{ $t('mapPrint') }}</p>
        <div class="mapNav-hero">
          <div class="mapNav-logo"><img :src="store.setting?.data.logo" alt="logo"></div>
          <div class="mapNav-contact">
            <p>{{ store.setting?.data.phone }}</p>
            <p>{{ store.setting?.data.email }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="google-map map">
      <main>
        <l-map ref="map" v-model:zoom="zoom" v-model:center="center" :useGlobalLeaflet="false" scrollWheelZoom="false"
          :options="interactionOptions">
          <l-tile-layer url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}" :subdomains="subdomains"></l-tile-layer>
          <l-marker v-for="marker in savedMarkers" :key="marker" :lat-lng="[marker.latitude, marker.longitude]"
            @click="openMarkerModal(marker)">
            <l-icon :icon-url="marker.icon">
            </l-icon>
            <!-- :icon-size="dynamicSize" :icon-anchor="dynamicAnchor" -->
          </l-marker>
        </l-map>
      </main>
    </div>

    <div class="map-tables">
      <div class="container">
        <div class="map-header" id="noPrint">
          <h1 class="map-tables__title">{{ $t("saved") }}</h1>
          <div class="map-btn-box">
            <button @click="printDiv">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                <path fill="#0A97BC"
                  d="M16 8.308v-3H8v3H6.5v-3.6c0-.256.086-.47.26-.642a.877.877 0 0 1 .643-.258h9.189a.88.88 0 0 1 .908.9v3.6H16Zm1.807 4c.284 0 .521-.096.713-.288a.967.967 0 0 0 .287-.713.968.968 0 0 0-.287-.712.968.968 0 0 0-.713-.288.968.968 0 0 0-.712.288.968.968 0 0 0-.288.712c0 .284.096.521.288.713.191.192.429.287.712.287ZM8.307 19h7.385a.3.3 0 0 0 .221-.087.3.3 0 0 0 .087-.22V14.73H8v3.961a.3.3 0 0 0 .086.221.3.3 0 0 0 .221.087Zm0 1.5a1.74 1.74 0 0 1-1.276-.531 1.74 1.74 0 0 1-.531-1.277V16.5H3.692a.875.875 0 0 1-.644-.26.875.875 0 0 1-.26-.644v-4.789c0-.708.242-1.302.726-1.78.484-.48 1.075-.72 1.774-.72h13.423c.708 0 1.302.24 1.781.72.48.478.719 1.072.719 1.78v4.789c0 .256-.087.47-.26.644a.875.875 0 0 1-.644.26H17.5v2.192c0 .497-.177.923-.532 1.277a1.74 1.74 0 0 1-1.276.53H8.307ZM19.711 15v-4.193a.968.968 0 0 0-.287-.712.968.968 0 0 0-.713-.287H5.288a.968.968 0 0 0-.712.287.968.968 0 0 0-.288.712V15H6.5v-1.77h11V15h2.211Z" />
              </svg>
              <p>
                {{ $t('print') }}
              </p>
            </button>
            <a href="https://t.me/share/?url=https://inout-isoft.netlify.app/savedMap">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
                <g clip-path="url(#a)">
                  <rect width="20" height="20" fill="#fff" rx="10" />
                  <path fill="#34AADF" fill-rule="evenodd"
                    d="M87.516 0H0v87.516h87.516V0ZM10.065 15.528a5.464 5.464 0 1 0 0-10.928 5.464 5.464 0 0 0 0 10.928Zm-3.388-5.08s-.376-.244.266-.504c0 0 2.707-1.151 3.645-1.557.36-.162 1.58-.68 1.58-.68s.564-.228.517.324c-.012.164-.08.624-.164 1.19-.033.219-.068.452-.102.69-.188 1.217-.391 2.547-.391 2.547s-.032.373-.298.438-.704-.227-.782-.292l-.17-.117c-.341-.23-1.092-.739-1.41-1.018-.11-.097-.235-.292.016-.52.563-.534 1.236-1.2 1.642-1.62.188-.196.376-.65-.406-.098-1.111.794-2.206 1.54-2.206 1.54s-.25.163-.72.017c-.47-.146-1.017-.34-1.017-.34Z"
                    clip-rule="evenodd" />
                </g>
                <defs>
                  <clipPath id="a">
                    <rect width="20" height="20" fill="#fff" rx="10" />
                  </clipPath>
                </defs>
              </svg>
              <p>
                {{ $t("sendTg") }}
              </p>
            </a>

            <button @click="deleteAllMarkers()">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                <path fill="red"
                  d="M7.308 20.5c-.505 0-.933-.175-1.283-.525a1.745 1.745 0 0 1-.525-1.283V6h-.25a.726.726 0 0 1-.535-.216.726.726 0 0 1-.215-.534c0-.213.072-.391.215-.535A.726.726 0 0 1 5.25 4.5H9a.84.84 0 0 1 .263-.63.889.889 0 0 1 .64-.255h4.193c.251 0 .465.085.64.254A.84.84 0 0 1 15 4.5h3.75c.213 0 .391.073.535.216a.726.726 0 0 1 .215.535.726.726 0 0 1-.215.534.726.726 0 0 1-.535.216h-.25v12.692c0 .505-.175.933-.525 1.283-.35.35-.778.525-1.283.525H7.308ZM7 6v12.692a.3.3 0 0 0 .087.221.3.3 0 0 0 .22.087h9.385a.3.3 0 0 0 .221-.087.3.3 0 0 0 .087-.22V6H7Zm2.404 10.25c0 .213.072.39.215.534a.726.726 0 0 0 .535.216.726.726 0 0 0 .534-.216.726.726 0 0 0 .216-.534v-7.5a.726.726 0 0 0-.216-.535.726.726 0 0 0-.534-.215.726.726 0 0 0-.535.215.726.726 0 0 0-.215.535v7.5Zm3.692 0c0 .213.072.39.216.534a.726.726 0 0 0 .534.216.726.726 0 0 0 .535-.216.726.726 0 0 0 .215-.534v-7.5a.726.726 0 0 0-.215-.535.726.726 0 0 0-.535-.215.726.726 0 0 0-.534.215.726.726 0 0 0-.216.535v7.5ZM7 6v12.692a.3.3 0 0 0 .087.221.3.3 0 0 0 .22.087H7V6Z" />
              </svg>
              <p>
                {{ $t("deleteAll") }}
              </p>
            </button>
          </div>
        </div>


        <div class="map-table" id="map-table">
          <table>
            <thead>
              <tr class="map-table-head">
                <th>
                  <div>
                    <input id="checkbox-table-search-2" type="checkbox" @click="checkAll($event)"
                      class="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="checkbox-table-search-2" class="sr-only">checkbox</label>
                  </div>
                </th>
                <th>
                  №
                </th>
                <th>
                  {{ $t("adress") }}
                </th>
                <th>
                  {{ $t("Savedtype") }}
                </th>
                <th>
                  {{ $t("SavedSize") }}
                </th>
                <th>
                  {{ $t("SavedStr") }}
                </th>
                <th>
                  {{ $t('SavedPrice') }}
                </th>
                <th>
                  {{ $t("SavedStatus") }}
                </th>
                <th id="bron">
                  {{ $t('SavedBron') }}
                </th>
                <th id="saved">
                  {{ $t("saved") }}
                </th>
              </tr>
            </thead>
            <tbody class="map-table-body">
              <tr class="map-table-body-tr" v-for="(info, i) in savedMarkers" :key="i">
                <td>
                  <div>
                    <input ref="checkBoxs" id="checkbox-table-search-3" @click="checkItem(info, $event)" type="checkbox"
                      :checked="info.checked"
                      class="cursor-pointer check text-blue-600 bg-red-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="checkbox-table-search-3" class="sr-only">checkbox</label>
                  </div>
                </td>
                <td>
                  {{ i + 1 }}
                </td>
                <td>
                  {{ info.address }}
                </td>
                <td>
                  {{ info.tip }}
                </td>
                <td>
                  {{ info.size }}
                </td>
                <td>
                  А
                </td>
                <td>
                  {{ info.price }} {{ $t("sumDay") }}
                </td>
                <td>
                  <span v-if="info.busy" class="map-table-booking-span">
                    {{ $t("busy") }}
                  </span>
                  <span v-else class="map-table-booking-span active">
                   {{ $t("busyTo") }} {{ info.end_date }} </span>
                </td>
                <td id="bronAll">
                  <button @click="buyOne(info)" class="map-table-booking">
                    {{ $t("order") }}
                  </button>
                </td>
                <td id="trash" class="map-table-trush" @click="deleteMarker(info)">
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                      <path fill="#000"
                        d="M7.308 20.5c-.505 0-.933-.175-1.283-.525a1.745 1.745 0 0 1-.525-1.283V6h-.25a.726.726 0 0 1-.535-.216.726.726 0 0 1-.215-.534c0-.213.072-.391.215-.535A.726.726 0 0 1 5.25 4.5H9a.84.84 0 0 1 .263-.63.889.889 0 0 1 .64-.255h4.193c.251 0 .465.085.64.254A.84.84 0 0 1 15 4.5h3.75c.213 0 .391.073.535.216a.726.726 0 0 1 .215.535.726.726 0 0 1-.215.534.726.726 0 0 1-.535.216h-.25v12.692c0 .505-.175.933-.525 1.283-.35.35-.778.525-1.283.525H7.308ZM7 6v12.692a.3.3 0 0 0 .087.221.3.3 0 0 0 .22.087h9.385a.3.3 0 0 0 .221-.087.3.3 0 0 0 .087-.22V6H7Zm2.404 10.25c0 .213.072.39.215.534a.726.726 0 0 0 .535.216.726.726 0 0 0 .534-.216.726.726 0 0 0 .216-.534v-7.5a.726.726 0 0 0-.216-.535.726.726 0 0 0-.534-.215.726.726 0 0 0-.535.215.726.726 0 0 0-.215.535v7.5Zm3.692 0c0 .213.072.39.216.534a.726.726 0 0 0 .534.216.726.726 0 0 0 .535-.216.726.726 0 0 0 .215-.534v-7.5a.726.726 0 0 0-.215-.535.726.726 0 0 0-.535-.215.726.726 0 0 0-.534.215.726.726 0 0 0-.216.535v7.5ZM7 6v12.692a.3.3 0 0 0 .087.221.3.3 0 0 0 .22.087H7V6Z" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="media-tables" id="media-table">
          <div class="media-table" v-for="(mediaInfo, i) in savedMarkers" :key="i">
            <div class="media-table-header">
              <div>
                <input type="checkbox" :checked="mediaInfo.checked" @click="checkItem(mediaInfo, $event)">
                <p class="media--table-desc">№ {{ mediaInfo.id }}</p>
              </div>
              <button @click="deleteMarker(mediaInfo)" class="media-table-header-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                  <path fill="#000"
                    d="M7.308 20.5c-.505 0-.933-.175-1.283-.525a1.745 1.745 0 0 1-.525-1.283V6h-.25a.726.726 0 0 1-.535-.216.726.726 0 0 1-.215-.534c0-.213.072-.391.215-.535A.726.726 0 0 1 5.25 4.5H9a.84.84 0 0 1 .263-.63.889.889 0 0 1 .64-.255h4.193c.251 0 .465.085.64.254A.84.84 0 0 1 15 4.5h3.75c.213 0 .391.073.535.216a.726.726 0 0 1 .215.535.726.726 0 0 1-.215.534.726.726 0 0 1-.535.216h-.25v12.692c0 .505-.175.933-.525 1.283-.35.35-.778.525-1.283.525H7.308ZM7 6v12.692a.3.3 0 0 0 .087.221.3.3 0 0 0 .22.087h9.385a.3.3 0 0 0 .221-.087.3.3 0 0 0 .087-.22V6H7Zm2.404 10.25c0 .213.072.39.215.534a.726.726 0 0 0 .535.216.726.726 0 0 0 .534-.216.726.726 0 0 0 .216-.534v-7.5a.726.726 0 0 0-.216-.535.726.726 0 0 0-.534-.215.726.726 0 0 0-.535.215.726.726 0 0 0-.215.535v7.5Zm3.692 0c0 .213.072.39.216.534a.726.726 0 0 0 .534.216.726.726 0 0 0 .535-.216.726.726 0 0 0 .215-.534v-7.5a.726.726 0 0 0-.215-.535.726.726 0 0 0-.535-.215.726.726 0 0 0-.534.215.726.726 0 0 0-.216.535v7.5ZM7 6v12.692a.3.3 0 0 0 .087.221.3.3 0 0 0 .22.087H7V6Z" />
                </svg>
              </button>
            </div>
            <div class="media-table-location">
              <p class="media-table-desc">{{ $t('adress') }}</p>
              <h3 class="media-table-title">{{ mediaInfo.address }}</h3>
            </div>
            <ul class="media-table-list">
              <li class="media-table-list-item">
                <p class="media-table-desc">{{ $t('Savedtype') }}</p>
                <h3 class="media-table-title">{{ mediaInfo.tip }}</h3>
              </li>
              <li class="media-table-list-item">
                <p class="media-table-desc">{{ $t('SavedSize') }}</p>
                <h3 class="media-table-title">{{ mediaInfo.size }}</h3>
              </li>
              <li class="media-table-list-item">
                <p class="media-table-desc">{{ $t('SavedStr') }}</p>
                <h3 class="media-table-title">А</h3>
              </li>
            </ul>
            <div class="media-table-booking">
              <span v-if="mediaInfo.busy" class="map-table-booking-span">
                {{ $t('busy') }}
              </span>
              <span v-else class="map-table-booking-span active">
                {{ $t('busyTo') }} {{ mediaInfo.end_date }} </span>
              <p class="media-table-desc">{{ $t('price') }} <span>{{ mediaInfo.price }}</span></p>
            </div>
            <button class="media-btn" @click="buyOne(mediaInfo)">{{ $t('order') }}</button>
          </div>
        </div>
      </div>
    </div>


    <div class="container">
      <div class="map-pice-btn justify-end my-7 gap-2">
        <div class="flex mr-4">
          <p>{{ $t("AllPrice") }}</p>
          <h1> {{ total }} {{ $t("sum") }}</h1>
        </div>
        <PrButton v-if="!isSelected" @click="buyAll" :content="$t('order')" class="map-open-modal">
        </PrButton>
      </div>
    </div>


    <div class="printInfo" id="mapMore">
      <div class="mapMore" v-for="item in savedMarkers" :key="item">
        <div class="container">
          <div class="nav">
            <!-- <h1 class="title">{{ $t('mapModalTitle') }}</h1> -->
            <div class="location">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 11.75C12.4859 11.75 12.899 11.5798 13.2394 11.2394C13.5798 10.899 13.75 10.4859 13.75 9.99998C13.75 9.51408 13.5798 9.10094 13.2394 8.76058C12.899 8.42019 12.4859 8.25 12 8.25C11.5141 8.25 11.1009 8.42019 10.7606 8.76058C10.4202 9.10094 10.25 9.51408 10.25 9.99998C10.25 10.4859 10.4202 10.899 10.7606 11.2394C11.1009 11.5798 11.5141 11.75 12 11.75ZM12 21.4615C11.8795 21.4615 11.7621 21.4413 11.648 21.4009C11.5339 21.3605 11.4301 21.3019 11.3365 21.225C8.95447 19.0814 7.17788 17.092 6.00672 15.2567C4.83557 13.4215 4.25 11.7359 4.25 10.2C4.25 7.77691 5.03012 5.84614 6.59037 4.40768C8.15062 2.96923 9.95382 2.25 12 2.25C14.0461 2.25 15.8493 2.96923 17.4096 4.40768C18.9698 5.84614 19.75 7.77691 19.75 10.2C19.75 11.7359 19.1644 13.4215 17.9932 15.2567C16.8221 17.092 15.0455 19.0814 12.6634 21.225C12.5762 21.3019 12.474 21.3605 12.3567 21.4009C12.2394 21.4413 12.1205 21.4615 12 21.4615Z"
                  fill="" />
              </svg>
              <p class="info"> {{ item?.address }} </p>
            </div>
          </div>
          <div class="banner">
            <div class="box price">
              <table class="table p-6">
                <thead class="head">
                  <tr>
                    <th class="p-2">
                      <p class="text"> {{ $t('mapText1') }}</p>
                    </th>
                    <th class="p-2">
                      <p class="text">{{ $t('mapText2') }}</p>
                    </th>
                    <th class="p-2">
                      <p class="text">{{ $t('mapText3') }}</p>
                    </th>
                  </tr>
                </thead>
                <!-- v-for="item in item?.tariffs" :key="item" -->
                <tbody class="body" v-for="data in item?.tariffs" :key="data">
                  <tr>
                    <td class="p-2">
                      <!-- {{ item.time }} -->
                      <p class="text"> {{ data.time }} </p>
                    </td>
                    <td class="p-2">
                      <!-- {{ item.count }} -->
                      <p class="text"> {{ data.count }} </p>
                    </td>
                    <td class="p-2">
                      <!-- {{ item.price }} -->
                      <p class="text"><span> {{ data.price }}</span></p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="card">
                <!-- v-for="item in item?.discount" :key="item" -->
                <div class="discount" v-for="d in item?.discount" :key="d">
                  <!-- {{ item.discount }} -->
                  <p class="amount"> {{ d.discount }} </p>
                  <!-- {{ item.title }} -->
                  <p class="info"> {{ d.title }} </p>
                </div>
              </div>
            </div>
            <div class="box image">
              <img v-if="frontToward" :src="item?.toward[0]?.img" class="h-60 w-full" alt="img">
              <img v-else :src="item?.toward[1]?.img" class="h-60 w-full" alt="img">
            </div>
          </div>
          <div class="footer">
            <div class="card content">
              <div class="qr-code">
                <qrcode-vue :value="item?.url" :size="141" level="H" />
              </div>
              <div class="littleMap">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3653.000509978452!2d71.7933048601032!3d40.374508914636486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb8584278d87e3%3A0x74bf8a1bcf8533ad!2z0JTQodCoINCz0LjQvNC90LDRgdGC0LjQutCw!5e1!3m2!1sru!2s!4v1689845471897!5m2!1sru!2s"></iframe>
              </div>
            </div>
            <div class="card info">
              <div class="item">
                <p class="text">{{ $t('sizeLed') }}</p>
                <p class="info">{{ item?.size }} </p>
              </div>
              <div class="item">
                <p class="text">{{ $t('timeLed') }}</p>
                <p class="info">{{ item?.time }} </p>
              </div>
              <div class="item">
                <p class="text">{{ $t('featuresLed') }}</p>
                <p class="info" v-html="item?.description"></p>
              </div>
            </div>
          </div>
        </div>
        <div class="modalMap  relative">
          <div class="container">
            <div class="images">
              <img :src="item.toward[0]?.img" alt="">
              <img :src="item.toward[1]?.img" alt="">
            </div>
            <div class="infoMap">
              <div class="bannerd">
                <div class="banner-info">
                  <p class="name">{{ $t("manzil") }}</p>
                  <p class="info"> {{ item.address }} </p>
                </div>
                <div class="banner-info">
                  <p class="name">{{ $t("type") }}</p>
                  <p class="info"> {{ item.tip }} </p>
                </div>
                <div class="banner-info">
                  <p class="name">{{ $t("number") }}</p>
                  <p class="info"> {{ item.number }} </p>
                </div>
                <div class="banner-info">
                  <p class="name">{{ $t("size") }}</p>
                  <p class="info"> {{ item.size }} </p>
                </div>
                <div class="banner-info">
                  <p class="name">{{ $t("zone") }}</p>
                  <p class="info"> {{ item.zone }} </p>
                </div>
                <div class="banner-info">
                  <p class="name">{{ $t("price") }}</p>
                  <p class="info price"> {{ item.price }} {{ $t('sumDay') }} </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="inout" id="inout">
      <div class="container">
        <div class="inout__text-wrapper">
          <div class="inout__nav">
            <h3 class="inout__title">{{ $t('inoutTitle1') }} <span>{{ $t('inoutTitle2') }}</span></h3>
          </div>
          <div class="inout__list">
            <div v-for="box in store.about?.data.blocks" :key="box" class="inout__item">
              <p class="inout__number">{{ box.num }}</p>
              <p class="inout__number-text">{{ box.title }}</p>
              <p class="inout__text">{{ box.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>



    <!-- tegmanglar -->
    <!-- <button @click="exportToPDF('my-pdf-file.pdf', pdfSection)">
      print card
    </button> -->



    <!-- saved modal -->
    <div :class="store.openSaved == true ? 'saved-modal' : 'modalClose'" v-for="savedId in savedMarkers"
      :key="savedId.id">
      <div class="container">
        <button @click="store.openSaved = false, store.blur = false, checkNone(), buyedOne = false" class="close-btn">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.2852 20.7139L20.7132 11.2859M11.2852 11.2859L20.7132 20.7139" stroke="#2A3437" stroke-width="2"
              stroke-linecap="round" />
          </svg>
        </button>
        <h2 class="title">{{ $t('order') }}</h2>
        <div class="text-wrapper">.
          <h3 class="small-title">{{ $t("AllPrice") }}</h3>
          <h1 class="price" v-if="buyedOne">{{ onePrice }} so`m</h1>
          <h1 class="price" v-else>{{ total }} so`m</h1>
        </div>
        <form action="" class="form">
          <div class="item">
            <label for="saved-name">{{ $t("name") }}</label>
            <input id="saved-name" type="text" v-model="formData.name" :placeholder="$t('namePlaceholder')">
            <p class="error1" v-for="error in v$.name.$errors" :key="error.$uid">{{ $t("validate") }} </p>
          </div>
          <div class="item">
            <label for="saved-email">{{ $t("email") }}</label>
            <input id="saved-email" v-model="formData.email" type="email" :placeholder="$t('emailPlaceholder')">
            <p class="error1" v-for="error in v$.email.$errors" :key="error.$uid">{{ $t("validate") }} </p>
          </div>
          <div class="item">
            <label for="saved-num">{{ $t("phone") }}</label>
            <input @input="inputNumber($event)" maxlength="19" id="phone" ref="phoneInput" type="text" v-model="phone">
            <p class="error1" v-for="error in v$.phone.$errors" :key="error.$uid">{{ $t("validate") }} </p>
          </div>
          <div class="item">
            <label for="saved-com">{{ $t("company") }}</label>
            <input id="saved-com" v-model="formData.company" type="text" :placeholder="$t('companyPlaceholder')">
            <p class="error1" v-for="error in v$.company.$errors" :key="error.$uid">{{ $t("validate") }} </p>
          </div>
        </form>
        <button class="sendDataBtn" @click="sendData()">{{ $t("order") }}</button>
        <!-- <PrButton class="saved-button" content="Забронировать" @click="sendData()"></PrButton> -->
      </div>
    </div>
  </div>
</template> 

<script setup>
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer, LMarker, LIcon } from "@vue-leaflet/vue-leaflet"
import { DatePicker } from 'v-calendar';
import 'v-calendar/dist/style.css';
import { format, toDate, subMilliseconds } from 'date-fns';
import { useStore } from '@/stores/counter'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import jsPDF from 'jspdf';
import { exportToPDF } from '#imports'
// toastify
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
// for qr code
import QrcodeVue from 'qrcode.vue'
const pdfSection = ref < HTMLElement | null > (null)
const store = useStore()
const baseUrl = 'https://admin.opendoc.uz/api';
const phoneInput = ref();
const modalData = ref();
const frontToward = ref(true)

const showNotify = () => {
  toast.success('muvaffaqqiyatli bajarildi');
};
// maska phone
function inputNumber(event) {
  let numbers = ref([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  // let lastNum = ref(event.key) 
  for (let number in numbers.value) {
    if (event.data === number.toString() && formData.phone.length < 13) {
      if (formData.phone.length === 0) {
        formData.phone.push('+998 (' + event.data)
      } else if (formData.phone.length === 2) {
        formData.phone.push(') ' + event.data)
      } else if (formData.phone.length === 4 || formData.phone.length === 6) {
        formData.phone.push(event.data + '-')
      } else {
        formData.phone.push(event.data)
      }
    }
  }

  if (event.inputType === 'deleteContentBackward') {
    formData.phone.pop()
  }

  phone.value = formData.phone.join("")
}

// map options
const subdomains = ['mt0', 'mt1', 'mt2', 'mt3']
let zoom = ref(13)
let center = ref([41.30261461450302, 69.2384965222238])
const interactionOptions = {
  doubleClickZoom: true,
  closePopupOnClick: false,
  dragging: true,
  zoomSnap: true,
  zoomDelta: true,
  trackResize: false,
  touchZoom: false,
  scrollWheelZoom: false
}


// const mapInfo = ref([]);

const phone = ref('+998(');


// validate
const formData = reactive({
  name: '',
  email: '',
  phone: [],
  company: '',

})

const rules = {
  name: { required },
  email: { required },
  phone: { required, minLength: minLength(9) },
  company: { required },
}


const v$ = useVuelidate(rules, formData)


let total = ref(0)
let days = ref(1)


const divToPrint = ref(null);
function printDiv() {
  window.print();
}


const isSelected = ref(true)
const checkedItems = ref([])
const itemChecked = ref([])


function checkItem(item, event) {
  const savedMarkersData = JSON.parse(localStorage.getItem('savedMarkersData')) || [];
  savedMarkersData.forEach(el => {
    if (item.id == el.id && el.checked == 0) {
      el.checked = 1
      checkedItems.value.push(item.id)

    } else if (item.id == el.id && el.checked == 1) {
      el.checked = 0

    }
    localStorage.setItem("savedMarkersData", JSON.stringify(savedMarkersData))

  })

  const savedItems = savedMarkersData.find(savedItem => savedItem.checked == 1)

  if (savedItems) {
    isSelected.value = false

  } else {
    isSelected.value = true

  }

  getSavedMarkers()
}







async function checkAll(event) {
  const savedMarkersData = JSON.parse(localStorage.getItem('savedMarkersData')) || [];
  savedMarkersData.forEach(el => {
    if (event.target.checked) {
      el.checked = 1
      checkedItems.value.push(el.id)
      isSelected.value = false
      localStorage.setItem("savedMarkersData", JSON.stringify(savedMarkersData))
    } else if (!event.target.checked) {
      el.checked = 0
      isSelected.value = true
      localStorage.setItem("savedMarkersData", JSON.stringify(savedMarkersData))
    }
  })
  await getSavedMarkers()
}


async function deleteMarker(marker) {
  const savedMarkersData = JSON.parse(localStorage.getItem('savedMarkersData')) || [];
  const savedMarkers = JSON.parse(localStorage.getItem("savedMarkers"))
  if (savedMarkersData.length !== 0) {
    const itemIndex = savedMarkersData.findIndex(item => item.id === marker.id);
    if (itemIndex !== -1) {
      savedMarkersData.splice(itemIndex, 1)
      localStorage.setItem("savedMarkersData", JSON.stringify(savedMarkersData))
      savedMarkers.splice(itemIndex, 1)
      localStorage.setItem("savedMarkers", JSON.stringify(savedMarkers))
      await getSavedMarkers()
      await store.savedLength()
    }
  }
}

async function deleteAllMarkers() {
  const checkbox = document.getElementById("checkbox-table-search-2")

  localStorage.setItem("1", JSON.stringify([]));
  localStorage.setItem("savedMarkersData", JSON.stringify([]));
  localStorage.setItem("savedMarkers", JSON.stringify([]));

  await getSavedMarkers()
  await store.savedLength()
  showNotify()
  checkbox.checked = false
}



let onePrice = ref(0)
let buyedOne = ref(false)

async function buyOne(marker) {
  buyedOne.value = true
  store.openSaved = true
  store.blur = true
  checkedItems.value.push(marker.id)
  marker.checked = 1
  onePrice.value = marker.price


  localStorage.setItem('markerBusy', marker.checked.toString());
  console.log(marker.checked);
}

function buyAll() {
  buyedOne.value = false
  store.openSaved = true
  store.blur = true

}





async function sendData() {
  const result = await v$.value.$validate()
  const totalPrice = total.value._value
  const checkbox = document.getElementById("checkbox-table-search-2")
  if (result) {
    const res = await $fetch(baseUrl + "/order", {
      method: 'POST',
      body: {
        name: formData.name,
        email: formData.email,
        phone: phone.value,
        company: formData.company,
        ids: checkedItems.value,
        price: totalPrice
      }
    });

    // clear input data
    console.log(res);
    const data = await $fetch(baseUrl + "/order/saved-map", {
      method: "POST",
      body: {
        ids: JSON.parse(localStorage.getItem('savedMarkers')),
      },
    });
    localStorage.setItem("savedMarkersData", JSON.stringify(data.data));

    if (res.status === 200) {
      formData.name = ''
      formData.email = ''
      formData.phone = []
      phone.value = '+998('
      formData.company = ''
      store.openSaved = false
      store.blur = false
      await store.sendMapId()
      savedMarkers.value = await JSON.parse(localStorage.getItem("savedMarkersData"))
      showNotify()
      checkbox.checked = false
      v$.value.$reset()

    } else {
      console.log(res);
    }
  }
}

let savedMarkers = ref();

async function getSavedMarkers() {
  savedMarkers.value = await JSON.parse(localStorage.getItem("savedMarkersData")) || []
}


onMounted(async () => {
  await store.sendMapId()
  await getSavedMarkers()
  total.value = computed(() => {
    let price = 0
    savedMarkers.value.forEach(item => item.checked ? price += item.price : 0)
    return price
  });



  const markerBusy = localStorage.getItem('markerBusy');


})







</script>

<style scoped lang="scss">
@import "@/assets/scss/var";
@import "@/assets/scss/main";

@media print {

  #noPrint,
  #bron,
  #saved,
  #media-table,
  #trash,
  #bronAll {
    display: none !important;
  }

  #map-table,
  #mapNav,
  #inout,
  #mapMore,
  #modalMap {
    display: block !important;
  }
}
.error1{
  color: red;
}
.sendDataBtn {
  width: 246px;
  height: 47px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0A97BC;
  border-radius: 12px;
  margin-top: 24px;
  margin-left: auto;
}

.closeSendTelegram {
  pointer-events: none;
}

.sendTelegram-modal {
  width: 100%;
  max-width: 500px;
  height: 250px;
  padding: 30px;
  border-radius: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  background: var(--bgLight);
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 1510;
  overflow: hidden;
  transition: 0.3s linear;


  &__btn {
    background: #0AAE1B;
    color: #fff;
    width: 100%;
    max-width: 200px;
    margin: 0 auto;
    padding: 10px 15px;
    border-radius: 10px;

  }

  &__header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0 20px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background: #0AAE1B;

    button {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: red;
    }

  }

}

.input-box {
  position: relative;
  width: 100%;

}

.input-box-first {
  margin-top: 30px;
}

.input-box input {
  width: 100%;
  padding: 10px;
  border: 1px solid #4B5A5F;
  border-radius: 5px;
  background: transparent;
  color: var(--title);
  font-size: 1em;
  outline: none;
}

.input-box span {
  position: absolute;
  left: 0;
  padding: 10px;
  pointer-events: none;
  font-size: 1em;
  color: var(--title);
  text-transform: uppercase;
  transition: 0.3s linear;

}

.input-box input:valid~span,
.input-box input:focus~span {
  color: var(--title);
  transform: translateX(10px) translateY(-7px);
  font-size: 18px;
  padding: 0 10px;
  background: var(--bgLight);
}

.close-telegram-modal {
  opacity: 0;
  pointer-events: none;
  height: 0px;
  overflow: hidden;
  bottom: -100px;
}

.map {
  width: 100%;
  height: 746px;


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



.picker {
  position: absolute;
}

.dateInput {
  height: 200px;
}


.saved-modal-enter-active,
.saved-modal-leave-active {
  transition: all 0.5s ease;
  transform: translateY(0);
}

.saved-modal-enter-from,
.saved-modal-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}

.modalClose {
  display: none;
}

#mapNav {
  display: none;
}

.mapNav {
  padding: 20px;

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .mapNav-title {
    font-size: 20px;
    line-height: 26px;
    color: var(--title);
  }

  .mapNav-hero {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.mapNav-logo {
  width: 100%;
  max-width: 150px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.mapNav-contact {
  p {
    font-size: 26px;
    line-height: 33px;
    color: var(--title);
  }
}

#inout,
#mapMore,
#modalMap {
  display: none;
}

.inout {
  margin-top: 0 auto;
  box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.25);

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    @include media(1100px) {
      flex-direction: column;
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
    margin-bottom: 10px;

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
    color: var(--title);

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

  &__number-text {
    font-family: 'Unbounded';
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
    color: var(--title);
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
    color: var(--title);

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

.mapMore {
  background-color: var(--bgDark);
  border-radius: 18px;
  padding: 40px;

  .nav {
    margin: 0 auto;
    width: 100%;
    max-width: 900px;

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
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column-reverse;
    width: 100%;
    margin-top: 30px;
    gap: 20px;
    max-width: 900px;

    .box.price {
      width: 100%;
      max-width: 900px;
      background: var(--bgLight);
      border-radius: 18px;
      height: auto;

      table {
        padding: 12px 18px;
        width: 100%;

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
        flex-wrap: wrap;
        gap: 25px;
        margin-top: 20px;
        padding: 20px 18px;

        // @media (max-width: 1100px) {
        //   display: flex;
        //   justify-content: space-between;
        //   align-items: center;
        //   flex-wrap: wrap;
        // }

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
      max-width: 900px;
      border-radius: 18px;
      overflow: hidden;
      height: 100%;
      min-height: 350px;
      max-height: 500px;

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
    margin: 30px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 900px;

    .card.content {
      width: 100%;
      max-width: 900px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--bgLight);
      border-radius: 18px;
      overflow: hidden;
      gap: 20px;
      height: auto;


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
}

.modalMap {
  background-color: var(--bgDark);
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  border-radius: 18px;
  padding: 20px;

  ::-webkit-scrollbar {
    display: none;
  }

  .images {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    gap: 10px;

    img {
      width: 100%;
      max-width: 50%;
      height: 400px;
      object-fit: cover;
      object-position: center;
      border-radius: 15px;
    }
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

  .infoMap {
    margin-top: 4px;

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
        padding: 2px 0;
      }

    }

    .bannerd {
      .banner-info {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #FFFFFF1A;
        padding: 14px 0;
      }

      .mapModalEmpty {
        color: var(--title);
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

.map {
  width: 100%;
  height: 746px;
  // border-radius: 24px;
  // overflow: hidden;

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

.map-tables {
  // padding: 27px 0;
  margin: 27px;
  background: var(--bgDark);
}



.map-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 21px;
}

.map-tables__title {
  font-size: 28px;
  line-height: 34.27px;
  font-weight: 700;
  color: var(--title);
}

.map-btn-box {
  display: flex;
}

.map-btn-box button,
a {
  background: var(--bgLight);
  color: var(--title);
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 16px;
  line-height: 19px;
  font-weight: 400;
  border: 1px solid #CBD9F3;
  transition: 0.1s linear;
}

.map-btn-box button:first-child {
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}

.map-btn-box button:last-child {
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}

.map-btn-box button:hover {
  opacity: 0.6;
}

.map-table {
  width: 100%;
  margin: 0 auto;
  padding: 0;

  table {
    width: 100%;
    border-radius: 18px;
    background: var(--table-checkbox);
  }
}

.map-table-head {
  border: 1px solid #CBD9F3;
  color: var(--title);
  width: 100%;

  th {
    color: var(--title);
    padding: 20px;
    text-align: left;

    @media (max-width:1120px) {
      padding: 20px 10px;
    }

    @media (max-width:800px) {
      padding: 10px 2px;
    }
  }
}


.map-table-trush {
  display: flex;
  justify-content: center;
  align-items: center;
}

.map-table-trush button svg path,
.media-table-header-btn svg path {
  fill: var(--map-table-trush);
}

.map-table-body-tr {
  border: 1px solid #CBD9F3;
  background: var(--bgLight);
  border-radius: 18px;

  td {
    padding: 20px;

    @media (max-width:1120px) {
      padding: 20px 10px;
    }

    @media (max-width:800px) {
      padding: 10px 2px;
    }


  }
}


.map-table-booking {
  padding: 14px 18px;
  border-radius: 12px;
  background: var(--table-checkbox);
  border: 1px solid var(--table-btn-border);
  color: #0A97BC;

  @media (max-width:1120px) {
    padding: 10px 15px;
  }

  @media (max-width:800px) {
    padding: 2px 2px;
  }
}


.map-table-booking-span {
  background: #0AAE1B1A;
  color: #0AAE1B;
  padding: 10px 18px;
  border-radius: 18px;

  @media (max-width:1120px) {
    padding: 5px 9px;
  }

  @media (max-width:800px) {
    padding: 2px 2px;
  }
}

.active {
  background: #FBF0F0;
  color: #D24242;
  display: flex;
}


.map-table-body {
  width: 100%;
  // max-width: 1390px;
  background: var(--bgDark);
  color: var(--title);
}



.media-tables {
  display: flex;
  align-items: center;
  gap: 12px;
}

.media-table {
  width: calc(100% / 2);
  margin: 0 auto;
  background: var(--bgLight);
  border-radius: 12px;
  padding: 12px;
  display: none;
  color: var(--title);
}

.media-table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
}

.map-table-body {
  width: 100%;
  max-width: 1341px;
  background: var(--bgDark);
  color: var(--title);
}

.media-table-header div {
  display: flex;
  align-items: center;
  gap: 10px;
}

.media-table-header div input {
  display: flex;
  width: 24px;
  height: 24px;
}

.media-table-header-btn {
  display: flex;
  width: 24px;
  height: 24px;
}

.media-table-header-btn:hover {
  opacity: 0.2s linear;
}

.media-table-location {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 4px;
  margin-bottom: 18px;
}

.media-table-title {
  // color: var(--title);
  font-weight: 700;
}

.media-table-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.media-table-list-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.media-table-list-item:not(:first-child) {
  align-items: center;
}

.media-table-booking {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.media-table-booking-span {
  display: flex;
  padding: 6px 12px;
  background: #D242420A;
  border-radius: 50px;
  color: #D24242;
}

.empty {
  background: #0AAE1B1A;
  color: #0AAE1B;

}

.media-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #E5EDEF;
  width: 327px;
  height: 42px;
  margin: 0 auto;
  color: #0A97BC;
  border-radius: 12px;
  background: linear-gradient(0deg, #F5FBFD, #F5FBFD),
    linear-gradient(0deg, #E5EDEF, #E5EDEF);
  cursor: pointer;

}

.map-table-booking-span {
  background: #0AAE1B1A;
  color: var(--mapModalEmptyColor);
  padding: 10px 18px;
  border-radius: 18px;



}

.active {
  background: #FBF0F0;
  color: #D24242;
  display: flex;
}




@media(max-width:875px) {
  .map-table {
    display: none;
  }

  .media-tables {
    display: flex;
    flex-direction: column;
  }


  .media-table {
    display: block;
    width: 100%;

  }
}



.empty {
  background: #0AAE1B1A;
  color: #0AAE1B;

}


// @media(max-width:1229px) {
//   .map-table {
//     display: none;
//   }

//   .media-table {
//     display: block;
//   }
// }

@media(max-width:1285px) {
  .map-btn-box button {
    padding: 20px;
    gap: 10px;
  }
}

@media(max-width:1230px) {
  .map-btn-box button {
    padding: 20px 10px;
    gap: 8px;

  }
}

@media(max-width:1138px) {
  .map-header {
    flex-direction: column;
    align-items: flex-start;
    margin-right: auto;
    gap: 12px;
  }
}

@media(max-width:976px) {}

@media(max-width:910px) {
  .map-btn-box {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    width: 369px;

    a {
      border-radius: 12px;
    }
  }

  .map-btn-box button {
    width: 313px;
    height: 56px;
    display: flex;
    align-items: center;
    border-radius: 12px;
    font-size: 14px;
  }

  .map-btn-box button p {
    width: 130px;
  }

}

@media(max-width:830px) {
  .media-tables {
    flex-direction: column;
  }

  .media-table {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    background: var(--bgLight);
    border-radius: 12px;
    padding: 12px;
  }
}

@media(max-width:498px) {
  .media-btn {
    width: 100%;
    max-width: 450px;
  }

  .media-table-booking-span {
    font-size: 12px;
  }

  .media-table-desc {
    font-size: 12px;
  }

}

@media(max-width:415px) {
  .map-tables {
    padding: 0;
  }

  .media-table {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }
}

.map-open-modal {
  padding: 14px 24px;
  background: #0A97BC;
  border-radius: 12px;
  color: #fff;

}

.map-open-modal-disabled {
  display: none;
}

.map-pice-btn {
  display: flex;
  align-items: center;
}

.map-pice-btn div {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.map-pice-btn p {
  font-size: 14px;
  line-height: 17px;
  font-weight: 400;
  color: var(--title);
}

.map-pice-btn h1 {
  font-size: 16px;
  line-height: 19px;
  font-weight: 600;
  color: #4B5A5F;
}
</style>