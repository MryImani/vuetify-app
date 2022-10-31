<template>
  <v-dialog max-width="600px">
    <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="success"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Add new project
        </v-btn>
       
      </template>
      <v-card>
            <v-card-title><h2>New Project</h2></v-card-title>
        </v-card>
  </v-dialog>
</template>

<script>
export default {

}
</script>

<style>

</style>