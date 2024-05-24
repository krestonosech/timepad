<template>
  <div class="SItemsDetails">
    <s-navbar/>
    <div class="SItemsDetails__allcontent">
      <p class="h1">{{ savedTitle }}</p>
      <div class="SItemsDetails__content">
        <div v-for="(item, index) in items" :key="index" class="SItemsDetails__items">
          <div @click="rotateToItem(item.description, item)">
            <img class="SItemsDetails__items__img" :src="item.picture" alt="Изображение" width="300">
            <h2>{{ item.description }}</h2>
            <p>{{ item.date }}</p>
          </div>
        </div>
      </div>
    </div>
    <s-footer/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SNavbar from '@/components/SNavbar.vue'
import { useRouter, RouteLocationRaw } from 'vue-router'
import { axios } from '@/plugins/axios'
import SFooter from '@/components/SFooter.vue'

getItems()

const router = useRouter()
const items = ref()
const savedTitle = localStorage.getItem('savedTitle')

async function getItems () {
  try {
    const response = await axios.get('http://127.0.0.1:8000/events/', {
      headers: {
        access_token: localStorage.getItem('accessToken')
      }
    })
    const filteredItems = response.data.filter((item: { title: string|null }) => item.title === savedTitle)
    items.value = filteredItems
    console.log(items.value)
  } catch (error) {
    console.error(error)
  }
}

function rotateToItem (item: string, object: any) {
  localStorage.setItem('savedDescription', item)
  localStorage.setItem('savedObject', JSON.stringify(object))
  router.push(`/${localStorage.getItem('savedTitle')}/${item}` as RouteLocationRaw)
}
</script>

<style lang="scss">
.SItemsDetails {
  font-family: Arial, Helvetica, sans-serif;
  &__allcontent {
    margin-left: 20%;
    margin-right: 20%;
  }
  &__content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  &__items {
    width: 330px;
    margin-bottom: 70px;
    box-sizing: border-box;
    cursor: pointer;
    &__img {
      width: 330px;
      height: 200px;
      object-fit: cover;
    }
  }
}
.h1 {
  font-weight: bold;
  font-size: 40px;
}
</style>
