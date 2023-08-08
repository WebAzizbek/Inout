<template>
  <div>
    <div class="registration" id="registration">
      <div class="container">
        <div class="banner">
          <div class="register">
            <h1 class="title">
              {{ $t('registerTitle1') }}
            </h1>
            <form>
              <div class="relative w-full mb-4">
                <label for="name">{{ $t('name') }}</label>
                <input type="text" v-model="formData.name" id="state.name" :placeholder="$t('namePlaceholder')">
                <p class="error" v-for="error in v$.name.$errors" :key="error.$uid">Maydon to`ldirilishi shart </p>
              </div>
              <div class="relative w-full mb-4">
                <label for="email">{{ $t('email') }}</label>
                <input type="text" id="email" v-model="formData.email" :placeholder="$t('emailPlaceholder')">
                <p class="error" v-for="error in v$.email.$errors" :key="error.$uid">Maydon to`ldirilishi shart </p>
              </div>
              <div class="relative w-full mb-4">
                <label for="phone">{{ $t('phone') }}</label>
                <input @input="inputNumber($event)" maxlength="19" id="phone" placeholder="+998(__) ___ __ __"
                  ref="phoneInput" type="text" v-model="phone">
                <p class="error" v-for="error in v$.phone.$errors" :key="error.$uid">Maydon to`ldirilishi shart </p>
              </div>
              <div class="relative w-full mb-4">
                <label for="message">{{ $t('message') }}</label>
                <textarea id="message" v-model="formData.message" rows="4" :placeholder="$t('message')"></textarea>
                <p class="error" v-for="error in v$.message.$errors" :key="error.$uid">Maydon to`ldirilishi shart </p>
              </div>

            </form>
          </div>
          <PrButton class="send" :content="$t('employeSend')" @click="sendRegister()"></PrButton>
        </div>
        <div class="content">
          <img src="../assets/images/registerImg.png" alt="img">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '@/stores/counter';
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const store = useStore()
const phoneInput = ref()

const showNotify = () => {
  toast.success('Muvaffaqiyatli yuborildi!');
};


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

const phone = ref('+998(');



const formData = reactive({
  name: '',
  email: '',
  phone: [],
  message: '',

})

const rules = {
  name: { required },
  email: { required },
  phone: { required, minLength: minLength(9) },
  message: { required },
}


const v$ = useVuelidate(rules, formData)

async function sendRegister() {
  const result = await v$.value.$validate()
  const requestBody = {
    "name": formData.name,
    "telegram": formData.email,
    "phone": toString(formData.phone),
    "comment": formData.message,

  };

  if (result) {
    console.log(1);
    // API-ga i yuborish
    fetch("https://admin.opendoc.uz/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => response.json())
      .then(data => {
        // API javobini ishlatish
        v$.value.$reset()
        showNotify()
        formData.name = '';
        formData.email = '';
        phone.value = '+998(';
        formData.phone = []
        formData.message = '';

      })
      .catch(error => {
        console.error("Xatolik yuz berdi:", error);
      });
  } else {
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/var";

.error {
  color: red;
  bottom: -15px;
  position: absolute;
}

.registration {
  .container {
    margin: 60px auto;
    background-color: var(--bgLight);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 24px;
    padding: 0;
    overflow: hidden;

    @media (max-width: 900px) {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column-reverse;
    }

    .banner {
      padding: 50px;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      flex-direction: column;
      width: 100%;
      max-width: 660px;

      @media (max-width: 660px) {
        padding: 10px;
      }

      .register {
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        flex-direction: column;
        width: 100%;

        h1.title {
          font-size: 32px;
          line-height: 38px;
          font-weight: 700;
          color: var(--title);

          span {
            color: #12CEFF;
          }

          @media (max-width: 660px) {
            font-size: 24px;
            line-height: 28px;
          }
        }

        form {
          margin-top: 30px;
          max-width: 650px;
          width: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
          flex-direction: column;

          label {
            font-size: 14px;
            line-height: 18px;
            color: var(--text);
            margin-top: 24px;
          }

          input,
          textarea {
            padding: 14px 18px;
            width: 100%;
            margin-top: 10px;
            border: 1px solid rgba(255, 255, 255, 0.30);
            border-radius: 12px;
            background-color: var(--bgDark);
            color: var(--title);

            &:focus {
              outline: 1px solid #0A97BC;
            }
          }
        }
      }

      .send {
        margin-top: 24px;

        @media (max-width: 660px) {
          width: 100%;
        }
      }
    }

    .content {
      // max-width: 700px;
      width: 100%;
      height: 100%;
      
      img {
        min-height: 710px;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>