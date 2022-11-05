<template>
  <v-app>
    <v-main  class="mx-3">
      <router-view/>
    </v-main>
 
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
     
  }),
};
</script>
<style>
#app{
  background-color: #f5f5f5 !important;
}
</style>
