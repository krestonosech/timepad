<template>
  <div class="SMain">
    <div class="SMain__editor">
      <p v-if="Store.state.isAdmin" @click="openEditor">Добавить мероприятие</p>
      <div v-if="isOpenEditor" class="SMain__editor__all">
        <div class="SMain__editor__all__first">
          <p>Тайтл</p>
          <select v-model="title">
            <option value="Искусство">Искусство</option>
            <option value="Фестивали">Фестивали</option>
            <option value="Экскурсии">Экскурсии</option>
          </select>
          <p>Название</p>
          <input type="text" placeholder="Название" v-model="description">
          <p>Выберите дату</p>
          <input placeholder="Дата" readonly v-model="meetDateResult">
        </div>
        <div class="modal-overlay" v-if="isOpenDatePicker">
          <div class="modal">
            <span
              class="mdi mdi-close modal__close"
              @click="openDatePicker"
            ></span>
            <div class="modal__content">
              <v-date-picker
                v-model="meetDate"
              >
              </v-date-picker>
              <s-button @click="formattedMeetDate">Подтвердить</s-button>
            </div>
          </div>
        </div>
        <div class="SMain__editor__all__first">
          <p>Вставьте url картинки мероприятия</p>
          <input type="text" placeholder="url" v-model="pictureURL">
          <p>Напишите краткое описание мероприятия</p>
          <input type="text" placeholder="Описание" v-model="itemDescription">
        </div>
        <div class="SMain__editor__all__lastButtons">
          <s-button class="buttons, SMain__editor__all__first" @click="clearInputs">Очистить поля</s-button>
          <s-button class="buttons, SMain__editor__all__first" @click="openDatePicker">Выбрать дату</s-button>
          <s-button class="buttons, SMain__editor__all__first" @click="closeEditor">Закрыть редактирование</s-button>
          <s-button type="primary" class="buttons, SMain__editor__all__first" @click="setItems">Отправить</s-button>
        </div>
      </div>
      <p v-if="Store.state.isAdmin" @click="openEventEditor">Редактировать мероприятие</p>
      <div v-if="isOpenEventEditor" class="SMain__editor__all">
        <div class="SMain__editor__all__first">
          <p>Id мероприятия</p>
          <input v-model="eventId">
          <p>Тайтл</p>
          <select v-model="title">
            <option value="Искусство">Искусство</option>
            <option value="Фестивали">Фестивали</option>
            <option value="Экскурсии">Экскурсии</option>
          </select>
          <p>Название</p>
          <input type="text" placeholder="Название" v-model="description">
          <p>Выберите дату</p>
          <input placeholder="Дата" readonly v-model="meetDateResult">
        </div>
        <div class="modal-overlay" v-if="isOpenDatePicker">
          <div class="modal">
            <span
              class="mdi mdi-close modal__close"
              @click="openDatePicker"
            ></span>
            <div class="modal__content">
              <v-date-picker
                v-model="meetDate"
              >
              </v-date-picker>
              <s-button @click="formattedMeetDate">Подтвердить</s-button>
            </div>
          </div>
        </div>
        <div class="SMain__editor__all__first">
          <p>Вставьте url картинки мероприятия</p>
          <input type="text" placeholder="url" v-model="pictureURL">
          <p>Напишите краткое описание мероприятия</p>
          <input type="text" placeholder="Описание" v-model="itemDescription">
        </div>
        <div class="SMain__editor__all__lastButtons">
          <s-button class="buttons, SMain__editor__all__first" @click="clearInputs">Очистить поля</s-button>
          <s-button class="buttons, SMain__editor__all__first" @click="openDatePicker">Выбрать дату</s-button>
          <s-button class="buttons, SMain__editor__all__first" @click="closeEventEditor">Закрыть редактирование</s-button>
          <s-button type="primary" class="buttons, SMain__editor__all__first" @click="changeItems">Отправить</s-button>
        </div>
      </div>
      <p v-if="Store.state.isAdmin" @click="openEventDeliter">Удалить мероприятие</p>
      <div v-if="isOpenEventDeliter" class="SMain__editor__all">
        <p>Id мероприятия</p>
        <input v-model="eventId">
        <div class="SMain__editor__all__lastButtons">
          <s-button class="buttons, SMain__editor__all__first" @click="closeEventDeliter">Закрыть редактирование</s-button>
          <s-button type="primary" class="buttons, SMain__editor__all__first" @click="deleteItems">Отправить</s-button>
        </div>
      </div>
    </div>
    <p class="SMain__h1">Категории</p>
    <div  class="SMain__selections">
      <div v-for="(item, index) in itemsSegments" :key="index" class="SMain__selections__items">
        <div @click="rotateToItems(item.title)">
          <img class="SMain__selections__items__img" :src="item.picture" alt="Изображение">
          <h2>{{ item.title }}</h2>
        </div>
      </div>
    </div>
    <p class="SMain__h1">Все события в Москве</p>
    <div  class="SMain__selections">
      <div v-for="(item, index) in itemsAll" :key="index" class="SMain__selections__items">
        <div @click="rotateToItem(item.title, item.description, item)">
          <img class="SMain__selections__items__img" :src="item.picture" alt="Изображение">
          <h2>{{ item.title }}</h2>
          <h4>{{ item.description }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, RouteLocationRaw } from 'vue-router'
import { axios } from '@/plugins/axios'
import { ref } from 'vue'
import { store } from '@/store/index'
import { dayjsLib } from '@/plugins/dayjs'
import SButton from '@/components/SButton.vue'

const router = useRouter()
const itemsSegments = ref()
const itemsAll = ref()
const Store = store
const title = ref('')
const description = ref('')
const meetDate = ref()
const meetDateResult = ref('')
const pictureURL = ref('')
const itemDescription = ref('')
const isOpenEditor = ref(false)
const isOpenDatePicker = ref(false)
const isOpenEventEditor = ref(false)
const isOpenEventDeliter = ref(false)
const eventId = ref<number>()

getItems()

function openDatePicker () {
  isOpenDatePicker.value = !isOpenDatePicker.value
}
const formattedMeetDate = () => {
  const formattedDate = dayjsLib(String(meetDate.value)).format('YYYY-MM-DD')
  meetDateResult.value = dayjsLib(formattedDate).format('DD-MM-YYYY')
  openDatePicker()
}

function openEditor () {
  isOpenEditor.value = true
  isOpenEventEditor.value = false
  isOpenEventDeliter.value = false
}

function closeEditor () {
  isOpenEditor.value = false
}

function openEventEditor () {
  isOpenEventEditor.value = true
  isOpenEditor.value = false
  isOpenEventDeliter.value = false
}

function closeEventEditor () {
  isOpenEventEditor.value = false
}

function openEventDeliter () {
  isOpenEventDeliter.value = true
  isOpenEditor.value = false
  isOpenEventEditor.value = false
}

function closeEventDeliter () {
  isOpenEventDeliter.value = false
}

function checkData () {
  if (title.value === '' || description.value === '' || meetDateResult.value === '' || pictureURL.value === '' || itemDescription.value === '') {
    return false
  }
}

function clearInputs () {
  eventId.value = undefined
  title.value = ''
  description.value = ''
  meetDateResult.value = ''
  pictureURL.value = ''
  itemDescription.value = ''
}

async function deleteItems () {
  try {
    if (eventId.value === undefined) {
      alert('Не все пункты выбрали')
      return
    }

    await axios.delete(`http://127.0.0.1:8000/events/${eventId.value}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    clearInputs()
    closeEventDeliter()
  } catch (error) {
    console.error(error)
  }
}

async function changeItems () {
  try {
    const checkdata = checkData()
    if (checkdata === false) {
      alert('Не все пункты выбрали')
      return
    }
    const data = {
      title: title.value,
      description: description.value,
      date: meetDateResult.value,
      picture: pictureURL.value,
      item_description: itemDescription.value
    }
    await axios.put(`http://127.0.0.1:8000/events/${eventId.value}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    clearInputs()
    closeEventEditor()
  } catch (error) {
    console.error(error)
  }
}

async function setItems () {
  try {
    const checkdata = checkData()
    if (checkdata === false) {
      alert('Не все пункты выбрали')
      return
    }
    const data = {
      title: title.value,
      description: description.value,
      date: meetDateResult.value,
      picture: pictureURL.value,
      item_description: itemDescription.value
    }
    await axios.post('http://127.0.0.1:8000/events/', data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    const uniqueItems = itemsSegments.value.filter((item: { title: string }, index: number, self: any[]) => {
      return index === self.findIndex((t) => (
        t.title === item.title
      ))
    })
    itemsSegments.value = uniqueItems
    clearInputs()
    closeEditor()
  } catch (error) {
    console.error(error)
  }
}

async function getItems () {
  try {
    const response = await axios.get('http://127.0.0.1:8000/events/', {
      headers: {
        access_token: localStorage.getItem('accessToken')
      }
    })

    itemsAll.value = response.data
    const uniqueItems = itemsAll.value.filter((item: { title: string }, index: number, self: any[]) => {
      return index === self.findIndex((t) => (
        t.title === item.title
      ))
    })
    itemsSegments.value = uniqueItems
  } catch (error) {
    console.error(error)
  }
}

function rotateToItems (item: string) {
  localStorage.setItem('savedTitle', item)
  router.push(`/${item}` as RouteLocationRaw)
}

function rotateToItem (title: string, description: string, item: any) {
  localStorage.setItem('savedObject', JSON.stringify(item))
  router.push(`/${title}/${description}` as RouteLocationRaw)
}

</script>

<style lang="scss">
.SMain {
    margin-left: 20%;
    margin-right: 20%;
    &__editor {
      cursor: pointer;
      &__all {
        display: flex;
        flex-direction: row;
        &__first {
          margin-left: 50px;
          height: 300px;
        }
        &__lastButtons {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }
      }
    }
  &__h1 {
    font-weight: bold;
    font-size: 40px;
  }
  &__selections {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    &__items {
      width: 330px;
      height: 200px;
      cursor: pointer;
      margin-bottom: 70px;
      &__img {
        width: 330px;
        height: 200px;
      }
    }
  }
}
input {
  width: 200px;
  border: none;
  border-bottom: 1px solid black;
}
.buttons {
  margin-top: 20px;
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
  height: 530px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 2;
  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
}

select {
  width: 200px;
}
</style>
