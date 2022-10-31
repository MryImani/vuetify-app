<template>
  <v-app>
    <Navbar></Navbar>
    <v-main  class="mx-3">
      <router-view/>
    </v-main>
 
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'App',
  components:{
    Navbar
  },
  data: () => ({
     
  }),
};
</script>
<style>
#app{
  background-color: #f5f5f5 !important;
}
</style>
