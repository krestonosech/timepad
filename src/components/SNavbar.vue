<template>
  <div class="SNavbar">
    <ul class="SNavbar__ul">
      <div class="SNavbar__ul__li">
        <li class="SNavbar__ul__li__li">*ЛОГОТИП*</li>
        <li class="SNavbar__ul__li__li" @click="rotateToItems">Главная</li>
        <li class="SNavbar__ul__li__li" @click="userEvents">Мои мероприятия</li>
        <div class="modal-overlay" v-if="isEventsModalOpen">
          <div class="modal">
            <span
                class="mdi mdi-close modal__close"
                @click="closeModalEvents"
              ></span>
              <h2>Ваши мероприятия:</h2>
            <div v-for="(event, index) in filteredEvents" :key="index">
              <h3>Мероприятие №{{ index+1 }}</h3>
              <p>Заголовок: {{ event.title }}</p>
              <p>Название: {{ event.description }}</p>
              <p>Дата: {{ event.date }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="SNavbar__ul__authorization" v-if="!Store.state.isUserRegisterd">
        <li>
          <s-button
          class="SNavbar__ul__authorization__button"
          @click="openMovalAuth"
          >
            Войти
          </s-button>
        </li>
        <li>
          <s-button
            class="SNavbar__ul__authorization__button"
            type="primary"
            @click="openMovalRegistration"
          >
            Зарегистрироваться
          </s-button>
        </li>
      </div>
      <div class="SNavbar__ul__authorization" v-if="Store.state.isUserRegisterd" @click="openMiniModel">
        <li class="SNavbar__ul__authorization__true">
          <img :src="'https://avatars.mds.yandex.net/i?id=b27fed5ba3d58e8c69041e885f25cbf813a98a35-11540573-images-thumbs&n=13'" alt="" width="50">
          <h2 class="SNavbar__ul__authorization__true__h2">{{ Store.state.isUserRegisterd }}</h2>
        </li>
        <div class="modal-backdrop" v-if="isOpenMiniModel">
          <div class="modal-mini">
            <button>Имя пользователя: {{ Store.state.isUserRegisterd }}</button>
            <button @click="logout">Выйти</button>
          </div>
        </div>
      </div>
    </ul>
    <div class="modal-overlay" v-if="isOpenMovalAuth">
      <div class="modal">
        <span
          class="mdi mdi-close modal__close"
          @click="closeMovalAuth"
        ></span>
        <div class="modal__menu">
          <h2>Авторизация</h2>
          <h3>Введите логин</h3>
          <input class="modal__menu__input" type="text" placeholder="Логин" v-model="login">
          <p v-if="errors.userRegistered" class="error">*такой пользователь уже существует</p>
          <h3>Введите пароль</h3>
          <input class="modal__menu__input" type="password" placeholder="Пароль" v-model="password">
        </div>
        <div class="modal__buttons">
          <s-button @click="authorization">
            Отправить
          </s-button>
        </div>
      </div>
    </div>
    <div class="modal-overlay" v-if="isOpenMovalRegistration">
      <div class="modal">
        <span
          class="mdi mdi-close modal__close"
          @click="closeMovalRegistration"
        ></span>
        <div class="modal__menu">
          <h2>Регистрация</h2>
          <h3>Введите логин</h3>
          <input class="modal__menu__input" type="text" placeholder="Логин" v-model="login">
          <p v-if="errors.userRegistered" class="error">*такой пользователь уже существует</p>
          <h3>Введите пароль</h3>
          <input class="modal__menu__input" type="password" placeholder="Пароль" v-model="password">
        </div>
        <div class="modal__buttons">
          <s-button @click="registration">
            Отправить
          </s-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SButton from '@/components/SButton.vue'
import { axios } from '@/plugins/axios'
import { store } from '@/store/index'
import { useRouter, RouteLocationRaw } from 'vue-router'

const router = useRouter()
const isOpenMovalRegistration = ref(false)
const isOpenMovalAuth = ref(false)
const Store = store
const login = ref<string>('')
const password = ref<string>('')
const isOpenMiniModel = ref(false)
const isEventsModalOpen = ref(false)
const usersEvents = ref<any[]>([])
const events = ref<any[]>([])
const errors = {
  userRegistered: false
}
const searchQuery = ref('')

const filteredEvents = computed(() => {
  return events.value.filter(event =>
    event.title.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
    usersEvents.value.some(userEvent => userEvent.event_id === event.id)
  )
})

function closeModalEvents () {
  isEventsModalOpen.value = false
}

function openMovalRegistration () {
  isOpenMovalRegistration.value = true
}

function openMovalAuth () {
  isOpenMovalAuth.value = true
}

function closeMovalRegistration () {
  login.value = ''
  password.value = ''
  isOpenMovalRegistration.value = false
}

function closeMovalAuth () {
  login.value = ''
  password.value = ''
  isOpenMovalAuth.value = false
}

function openMiniModel () {
  isOpenMiniModel.value = !isOpenMiniModel.value
}

function logout () {
  Store.dispatch('setIsUserRegisterd', false)
  localStorage.setItem('accessToken', '')
  Store.dispatch('setAdmin', false)
}

function rotateToItems (item: string) {
  localStorage.setItem('savedTitle', item)
  router.push('/' as RouteLocationRaw)
}

async function userEvents () {
  try {
    const userResponse = await axios.get('http://127.0.0.1:8000/user-events/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json'
      }
    })

    usersEvents.value = userResponse.data

    const eventsResponse = await axios.get('http://127.0.0.1:8000/events/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json'
      }
    })
    isEventsModalOpen.value = true
    events.value = eventsResponse.data
  } catch (error) {
    console.error(error)
  }
}

async function registration () {
  try {
    const data = {
      email: login.value,
      password: password.value
    }
    const response = await axios.post('http://127.0.0.1:8000/users/', data)

    Store.dispatch('setAdmin', response.data.is_admin)
    await authorization()
    closeMovalRegistration()
  } catch (error) {
    console.error(error)
  }
}

async function authorization () {
  try {
    const data = new URLSearchParams()
    data.append('username', login.value)
    data.append('password', password.value)

    const response = await axios.post('http://127.0.0.1:8000/token', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    if (login.value === 'admin') {
      Store.dispatch('setAdmin', true)
    }
    Store.dispatch('setIsUserRegisterd', login.value)
    login.value = ''
    password.value = ''
    localStorage.setItem('accessToken', response.data.access_token)
    closeMovalAuth()
  } catch (error) {
    console.error(error)
  }
}
</script>

<style lang="scss">
.SNavbar {
  &__ul {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    list-style: none;
    width: 98%;
    align-items: center;
    &__li {
      display: flex;
      flex-direction: row;
      font-size: 18px;
      color: #404040;
      &__li {
        margin-left: 20px;
        cursor: pointer;
      }
      &__input {
        border: none;
        border-bottom: solid black 1px;
        margin: 10px 0;
        width: 200px;
      }
    };
    &__authorization {
      cursor: pointer;
      float: right;
      display: flex;
      justify-content: end;
      &__button {
        margin-right: 40px;
      }
      &__true {
        display: flex;
        align-items: center;
        margin-right: 45px;
        &__h2 {
          margin: 0 0 0 10px;
        }
      }
    }
  }
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Затемненный фон */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}

.modal {
  width: 600px;
  height: 500px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 2;
  &__close {
    font-size: 32px;
    cursor: pointer;
    float: right;
  }
  &__menu {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    &__input {
      border: none;
      border-bottom: solid black 1px;
      margin: 10px 0 10px 0;
      width: 300px;
      height: 50px;
    }
    &__input:focus {
      outline: none;
      border-bottom: solid black 3px;
      margin-top: 10px;
      width: 300px;
      height: 50px;
    }
  }
  &__buttons {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
.error {
    display: flex;
    justify-content: left;
    margin-top: 15px;
    color: red;
  }

.modal-backdrop {
    float: right;
    position: fixed;
    right: 0;
    bottom: 0;
    top: 50px;
    width: 200px;
    margin-top: 25px;
  }

  .modal-mini {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }
</style>
