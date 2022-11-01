<template>
  <v-dialog max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="success" dark v-bind="attrs" v-on="on">
        Add new project
      </v-btn>
    </template>
    <v-card>
      <v-card-title><h2>New Project</h2></v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field
            label="Title"
            v-model="title"
            prepend-icon="folder"
            :rules="inputRule"
          ></v-text-field>
          <v-textarea
            label="Information"
            v-model="content"
            prepend-icon="edit"
            :rules="inputRule"
          ></v-textarea>
          <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          max-width="290"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="computedDateFormattedDatefns"
              clearable
              label="Due date"
              readonly
              v-bind="attrs"
              v-on="on"
              @click:clear="due = null"
              prepend-icon="date_range"
              :rules="inputRule"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="due"
            @change="menu2 = false"
          ></v-date-picker>
        </v-menu>
        <v-spacer></v-spacer>
          <v-btn flat class="success mx-0 mt-3" @click="addProject"
            >Add Project</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { format, parseISO } from 'date-fns'
export default {
  data: () => ({
    title: "",
    content: "",
    due: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
    menu2: false,
    inputRule : [
    v => !!v || 'Input value is required',
        v => v.length >=3 || 'Minimum Length is 3 characters',
    ]
  }),
  methods: {
    addProject() {
      if(this.$refs.form.validate()){
        console.log(this.title, this.content);
      }
      
    }
  },
  computed:{
    computedDateFormattedDatefns(){
      return this.due ? format(parseISO(this.due), 'do MMMM  yyyy') : ''
    }
  }
};
</script>

<style>
</style>