<template>
  <div class="mainContent">
    <s-navbar/>
    <div class="mainContent__events">
      <s-main v-if="isOnHomePage"/>
      <s-items-details v-if="!isOnHomePage"/>
    </div>
    <s-footer/>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import SNavbar from '../components/SNavbar.vue'
import SMain from '@/components/SMain.vue'
import SItemsDetails from '@/components/SItemsDetails.vue'
import SFooter from '@/components/SFooter.vue'

const route = useRoute()
const isOnHomePage = route.path === '/'
</script>

<style lang="scss">
.mainContent {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
