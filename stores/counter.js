import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
export const useStore = defineStore("store ", () => {
  const darkmode = ref(null);
  const openMapMore = ref(false);
  const openMapMore1 = ref(false);
  const openMapModal = ref(false);
  const openVideoModal = ref(false);
  const videoModalMore = ref(false);
  const openSlideHeader = ref(false);
  const openResume = ref(false);
  const openEmployee = ref(false);
  const openEmployeeMore = ref(false);
  const openCompanyModal = ref(false);
  const done = ref(false);
  const doneMore = ref(false);
  const blur = ref(false);
  const openService = ref(false);
  const openSaved = ref(false);
  const openCustomer = ref(false);
  const slider = ref();
  const banner = ref();
  const media = ref();
  const menu = ref();
  const position = ref();
  const jobs = ref();
  const mapData = ref();
  const mapButtons = ref();
  const setting = ref();
  const work = ref();
  const team = ref("");
  const number = ref();
  const activeJob = ref();
  const mapModalForPrint = ref();
  const about = ref();
  const savedMarkers = ref();
  const selectedLang = ref();
  const filterMenu = ref(false);
  const baseUrl = "https://admin.opendoc.uz/api";
  let bgVar = ref(false);
  const teamModal = ref(false);
  const savedMapSend = ref([]);
  const isLoading = ref(true);
  const localLength = ref(0)
  const langFlag = ref()
  const imageModal = ref(false)
  const brand1 = ref(true)
  const brand2 = ref(true)
  const brand3 = ref(true)
  const delaySlide = ref()
  const colors = ref()
  const searchModal = ref(false);
  async function getLang() {
    // selectedLang.value = jsj
    if (localStorage.getItem("lang")) {
      selectedLang.value = localStorage.getItem("lang").slice(0 , 2)
    }else{
      selectedLang.value = "uz"
    }
  }

  function removeBlur() {
    (blur.value = false),
      (openResume.value = false),
      (openSlideHeader.value = false),
      (openVideoModal.value = false),
      (videoModalMore.value = false),
      (openMapModal.value = false),
      (openMapMore.value = false),
      (openMapMore1.value = false),
      (openService.value = false),
      (openEmployee.value = false),
      (openEmployeeMore.value = false),
      (openSaved.value = false),
      (openCustomer.value = false);
    openCompanyModal.value = false;
    done.value = false;
    doneMore.value = false;
    teamModal.value = false;
    imageModal.value = false;
    searchModal.value = false;
  }

  function getDark() {
    darkmode.value = localStorage.getItem("darkMode");
    if (darkmode.value === null) {
      darkmode.value = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (darkmode.value === null) {
        darkmode.value = true;
      }
      localStorage.setItem("darkMode", darkmode.value);
    } else {
      darkmode.value = darkmode.value.toLowerCase() == "true" ? true : false;
    }
    if (Boolean(darkmode.value)) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }



  async function getData() {
    colors.value = await $fetch(baseUrl + '/color')
    banner.value = await $fetch(baseUrl + "/banner");
    setting.value = await $fetch(baseUrl + "/site-setting", {
      headers: {
        "Accept-Language": selectedLang.value,
      },
    });
    if (setting.value.data.brand1.length === 24) {
      brand1.value = false
    }
    if (setting.value.data.brand2.length === 24) {
      brand2.value = false
    }
    if (setting.value.data.brand3.length === 24) {
      brand3.value = false
    }
    langFlag.value = await $fetch(baseUrl + "/lang-flag");
    menu.value = await $fetch(baseUrl + "/menu", {
      headers: {
        "Accept-Language": selectedLang.value,
      },
    });
    slider.value = await $fetch(baseUrl + "/slider", {
      headers: {
        "Accept-Language": selectedLang.value,
      },
    });
    isLoading.value = false

    delaySlide.value = slider.value.data[0].speed





    mapData.value = await $fetch(baseUrl + "/map", {
      headers: {
        "Accept-Language": selectedLang.value,
      },
    });


    mapButtons.value = await $fetch(baseUrl + "/category-map", {
      headers: {
        "Accept-Language": selectedLang.value,
      },
    });

    about.value = await $fetch(baseUrl + "/about", {
      headers: {
        "Accept-Language": selectedLang.value,
      },
    });

    number.value = await $fetch(baseUrl + "/statistic", {
      headers: {
        "Accept-Language": selectedLang.value,
      },
    });

    work.value = await $fetch(baseUrl + "/service", {
      headers: {
        "Accept-Language": selectedLang.value,
      },
    });

    jobs.value = await $fetch(baseUrl + "/jobs", {
      headers: {
        "Accept-Language": selectedLang.value,
      },
    });

    team.value = await $fetch(baseUrl + "/team", {
      headers: {
        "Accept-Language": selectedLang.value,
      },
    });
    position.value = await $fetch(baseUrl + "/position", {
      headers: {
        "Accept-Language": selectedLang.value,
      },
    });

    media.value = await $fetch(baseUrl + "/media");
    langFlag.value = await $fetch(baseUrl + "/lang-flag");
    isLoading.value = await false
  }

  function checkDark() {
    if (document.body.classList.contains("dark-mode")) {
      bgVar.value = true;
    } else {
      bgVar.value = false;
    }
  }

  async function sendMapId() {
    const ids = JSON.parse(localStorage.getItem('savedMarkers'))

    const data = await $fetch(baseUrl + "/order/saved-map", {
      method: "POST",
      headers: {
        "Accept-Language": selectedLang.value,
      },
      body: {
        ids: ids
      },
    });
    savedMarkers.value = data
    if (data.status == 200) {
      localStorage.setItem("savedMarkersData", JSON.stringify(data.data));
    }
  }

  async function savedLength() {
    localLength.value = JSON.parse(localStorage.getItem('savedMarkers')) || 0
  }



  onMounted(async () => {
    getDark()
    checkDark();
    await getLang()
    await getData();
    await savedLength()
  });
  return {
    getDark,
    checkDark,
    getLang,
    getData,
    removeBlur,
    team,
    savedMarkers,
    jobs,
    langFlag,
    brand1,
    searchModal,
    brand2,
    colors,
    brand3,
    mapData,
    delaySlide,
    mapButtons,
    filterMenu,
    setting,
    activeJob,
    menu,
    openMapMore,
    openMapMore1,
    openMapModal,
    position,
    darkmode,
    selectedLang,
    bgVar,
    banner,
    openVideoModal,
    openSlideHeader,
    openResume,
    openService,
    baseUrl,
    videoModalMore,
    done,
    doneMore,
    openEmployee,
    openEmployeeMore,
    media,
    openCompanyModal,
    openSaved,
    openCustomer,
    mapModalForPrint,
    blur,
    slider,
    number,
    about,
    work,
    teamModal,
    savedMapSend,
    sendMapId,
    isLoading,
    localLength,
    savedLength,
    imageModal,
    
  };
});
