<template>
  <div>
    <div class="blur" @click="store.removeBlur()" v-if="store.blur"></div>
    <div class="jobs-more mb-auto">
      <h2 class="jobs-more-title">{{ jobsMoreSplit?.title }}</h2>
      <div class="container">
        <NuxtLink :to="localePath('/jobs')" class="back-btn">
          <img src="~/assets/images/svg/arrow-left.svg" alt="arrow" width="24" height="24">
          <p class="back-text">{{ $t('back') }}</p>
        </NuxtLink>
        <div class="jobs-more-main">
          <div v-for="item in jobsMoreSplit?.jobs" :key="item" class="jobs-more-item">
            <h4 class="jobs-more-item-small-title">{{ item?.title }}</h4>
            <div class="jobs-more-item-list">
              <div v-for="check in item?.options" :key="check" class="jobs-more-item-list-item">
                <div class="box">
                  <img src="~/assets/images/svg/check.svg" alt="check" width="24" height="24">
                </div>
                <p class="jobs-more-item-list-item-text">{{ check?.title }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="jobs-more-right">
          <PrButton @click="store.openResume = true, store.blur = true" class="jobs-more-right-btn"
            :content="$t('jobsBtnContent1')">
          </PrButton>
          <div class="jobs-more-app">
            <h4 class="jobs-more-app-title">{{ $t('jobsLinksTitle') }}</h4>
            <div class="jobs-more-app-list">
              <a :href="socialImg.url" class="jobs-more-app-item" v-for="socialImg in socialMedia?.data" :key="socialImg">
                <img :src="socialImg.img" alt="icone" width="32" height="32">
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div :class="store.openResume == true ? 'resume-wrapper' : 'modalClose'">
      <div class="resume">
        <button @click="store.openResume = false, store.blur = false" class="close-btn">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.2852 20.7139L20.7132 11.2859M11.2852 11.2859L20.7132 20.7139" stroke="#2A3437" stroke-width="2"
              stroke-linecap="round" />
          </svg>
        </button>
        <div class="container">
          <h3 class="resume-title">{{ $t('jobsModalSend') }}</h3>
          <form class="resume-form" action="#">
            <div class="resume-name relative">
              <label class="resum-input-title" for="resume-fio">{{ $t('jobsModalname') }}</label>
              <input class="resum-input" type="text" id="resume-fio" v-model="formData.inputName"
                :placeholder="$t('namePlaceholder')">
              <p class="error" v-for="error in v$.inputName.$errors" :key="error.$uid">Maydon to`ldirilishi
                shart </p>
            </div>
            <div class="resume-item relative">
              <label class="resum-input-title" for="resume-el">{{ $t('email') }}</label>
              <input class="resum-input" type="text" id="resume-el" v-model="formData.email"
                :placeholder="$t('emailPlaceholder')" required>
              <p class="error" v-for="error in v$.email.$errors" :key="error.$uid">Maydon to`ldirilishi
                shart </p>
            </div>
            <div class="resume-item relative mt-3">
              <label class="resum-input-title" for="resume-num">{{ $t('phone') }}</label>
              <input class="resum-input" @input="inputNumber($event)" maxlength="19" id="phone" ref="phoneInput"
                type="text" v-model="phone">
              <p class="error" v-for="error in v$.phone.$errors" :key="error.$uid">Maydon to`ldirilishi
                shart </p>
            </div>
            <div class="resume-item relative">
              <label class="resum-input-title" for="">{{ $t('jobsModalLabel') }}</label>
              <select class="resum-input" v-model="formData.job">
                <option value="" disabled selected>{{ $t('jobsSelect') }}</option>
                <option class="resume-option__item" name="" id="" v-for="(positionItem, i) in position?.data" :key="i"
                  :value="positionItem.title">{{
                    positionItem.title }}</option>
              </select>
              <p class="error" v-for="error in v$.job.$errors" :key="error.$uid">Maydon to`ldirilishi shart
              </p>
            </div>
            <div class="resume-item mt-3">
              <label class="resum-input-title" for="resume-file">{{ $t('jobsResume') }}</label>
              <div class="resume-file__box">
                <div class="wrapper relative w-60 mb-2">
                  <label for="files" class="btn resume-input__file">
                    <p>{{ $t('jobsResumeSelect') }}</p>
                  </label>
                  <input id="files" @change="editFile($event)" style="display:none;" type="file">
                  <p class="error" v-if="positionFile === false">Maydon to`ldirilishi shart </p>
                </div>
                <label class="resum-input-title resume-input__file--title" for="files"><span>*</span> {{
                  $t('jobsWarning') }}</label>
              </div>
            </div>
            <div class="resume-input__checkbox relative">
              <input type="checkbox" name="" id="resume-check" v-model="formData.checkNumber">
              <label for="resume-check" class="resum-input-title">
                {{ $t('jobsText') }}
              </label>
              <p class="error chechError" v-if="checkNumber = false">Maydon to`ldirilishi shart </p>
            </div>
            <PrButton class="resume-btn" :content="$t('jobsBtnContent')" @click="sendResume()"></PrButton>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '~/stores/counter';
import { activeJob } from '../helper/activeJob.js';
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
// toastify
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const phoneInput = ref()
const inputName = ref('');
const email = ref('');
const job = ref('');
const positionFile = ref(undefined);
const phone = ref('+998(')
const checkNumber = ref(false)
const socialMedia = ref("")

const store = useStore()
const showNotify = () => {
  toast.success('muvaffaqqiyatli bajarildi');
};
// const { jobsMore } = defineProps({
//   jobsMore: {
//     required: true
//   }
// })
// console.log(jobsMore);

let jobsMoreSplit = ref()
onMounted(() => {
  jobsMoreSplit = store.activeJob || JSON.parse(localStorage.getItem('activeJob'))
  // jobsMoreSplit = JSON.parse(localStorage.getItem('activeJob'));

  getPosition()
  function onChange(event) {
    const fileName = event.files[0]?.name;
    const label = document.querySelector("label[for=files]");
    label.innerText = fileName ?? "Выберите файл";
  };
})


// const baseUrl = 'https://opendoc.uz/api'
const position = ref("")

async function getPosition() {
  position.value = await $fetch(store.baseUrl + "/position", {
    headers: {
      "Accept-Language": store.selectedLang,
    },
  })
}







const formData = reactive({
  inputName: '',
  email: '',
  phone: [],
  job: '',
  positionFile: '',
  checkNumber: false,

})

const rules = {
  inputName: { required },
  phone: { required, minLength: minLength(9) },
  email: { required },
  job: { required },
  positionFile: { required },
  checkNumber: { required },
}


const v$ = useVuelidate(rules, formData)


function editFile(event) {
  formData.positionFile = event.target.files[0];
  console.log(formData.positionFile);
}


async function sendResume() {
  const result = await v$.value.$validate()
  const formdata = new FormData()
  formdata.append('name', formData.inputName),
    formdata.append('email', formData.email),
    formdata.append('phone', formData.phone),
    formdata.append('resume_file', formData.positionFile),
    formdata.append('worker_step', formData.job),
    formdata.append('check', formData.checkNumber ? 1 : 0)

  if (result) {

    try {
      const response = await fetch("https://admin.opendoc.uz/api/contact/resume", {
        method: "POST",
        body: formdata,
        redirect: 'follow'
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error);
      }

      const data = await response.json();
      console.log(data)

      if (data.status === 200) {
        showNotify()
        store.openResume = false;
        store.blur = false;
      }
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    }
  }
}

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


async function getSocailMedia() {
  socialMedia.value = await $fetch(store.baseUrl + "/media")
}

getSocailMedia()



</script>


<style lang="scss">
.openresume-enter-active,
.openresume-leave-active {
  transition: all 0.5s ease;
  transform: translateY(0);
}

.openresume-enter-from,
.openresume-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}

.jobs-more {
  min-height: 70vh;
}

.h-full {
  overflow: auto;
}

.resum-input {
  display: flex;
  border: 1px solid #FFFFFF4D;
  border-radius: 12px;
  background: var(--bg-input);
  padding: 15px 18px;
  color: var(--title);
  margin-top: 5px;
  outline: none;
  width: 100%;
}

.resum-input-title {
  font-size: 16px;
  line-height: 19px;
  font-weight: 400;
  color: var(--title);
  margin-bottom: 10px;
}

.resume-file__box {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
}

.resume-input__file {
  p {
    padding: 14px 27px;
    background: #0ABC3C;
    color: white;
    border-radius: 12px;
    cursor: pointer;
    text-align: center;

    @media (max-width:660px) {
      padding: 5px 5px;
    }
  }


}

.resume-input__file--title {
  width: 100%;
  max-width: 276px;
}

.resume-input__checkbox {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.resume-input__checkbox input {
  display: flex;
  width: 24px;
  height: 24px;
  background: #334248;
  border-radius: 4px;
  border: 1px solid #FFFFFF4D;
}

.resume-input__checkbox label {
  width: 100%;
  max-width: 437px;
}

.modalClose {
  display: none;
}

.error {
  position: absolute;
  bottom: -25px;
  color: red;
}

.resumSelect {
  display: block;
  position: absolute;
  top: 65px;
  left: 30px;
  color: var(--title);
  font-size: 18px;
}
</style>
