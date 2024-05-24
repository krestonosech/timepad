<template>
  <div class="SItemDetail">
    <s-navbar />
    <div class="SItemDetail__content">
      <img class="SItemsDetails__items__img" :src="parsedObject.picture" alt="Изображение" width="400">
      <h2>{{ parsedObject.description }}</h2>
      <h2>{{ parsedObject.item_description }}</h2>
      <h2>Дата: {{ formattedMeetDate }}</h2>
      <s-button @click="getItems" class="button">Пойду</s-button>
    </div>
    <s-footer/>
  </div>
</template>

<script setup lang="ts">
import SNavbar from '@/components/SNavbar.vue'
import { axios } from '@/plugins/axios'
import { computed } from 'vue'
import { dayjsLib } from '@/plugins/dayjs'
import SButton from '@/components/SButton.vue'
import SFooter from '@/components/SFooter.vue'

const savedObject = localStorage.getItem('savedObject')
const parsedObject = JSON.parse(savedObject)

const formattedMeetDate = computed(() => {
  const formattedDate = dayjsLib(String(parsedObject.date)).format('YYYY-MM-DD')
  return dayjsLib(formattedDate).format('DD.MM.YYYY')
})

getuser()

async function getuser () {
  try {
    const response = await axios.get('http://127.0.0.1:8000/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json'
      }
    })

    localStorage.setItem('userData', response.data.id)
  } catch (error) {
    console.error(error)
  }
}

async function getItems () {
  try {
    const userId = localStorage.getItem('userData')

    const response = await axios.get('http://127.0.0.1:8000/user-events/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json'
      }
    })

    const userEvents = response.data
    const isAlreadyRegistered = userEvents.some(event => event.event_id === parsedObject.id)

    if (isAlreadyRegistered) {
      alert('Вы уже зарегистрированы на это мероприятие.')
    } else {
      const data = {
        user_id: userId,
        event_id: parsedObject.id
      }

      await axios.post('http://127.0.0.1:8000/user-events/', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json'
        }
      })
      alert('Вы успешно зарегистрировались на мероприятие.')
    }
  } catch (error) {
    console.error(error)
  }
}

</script>

<style lang="scss">
.SItemDetail {
  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
}
.button {
  margin-bottom: 150px;
}
</style>
