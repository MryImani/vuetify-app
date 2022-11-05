<template>
  <nav>
    <v-snackbar
      v-model="snackbar" :timeout="4000" color="success" top
    >
    <span>Your Project Added successfully!</span>

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-app-bar app flat>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title class="grey--text text-uppercase">
        <span class="font-weight-light">best</span>
        <span>web</span>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            depressed
            color="grey--text"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon left>expand_more</v-icon>
            <span>Menu</span>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="link in links"
            :key="link.text"
            router
            :to="link.route"
          >
            <v-list-item-title>
              {{ link.text }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn depressed color="grey--text" @click="dialogDelete = !dialogDelete">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
      <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to sign out ?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogDelete = !dialogDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="signOut" 
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" class="primary">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img :src="userAvatar" />
          </v-avatar>
          <p class="white--text mt-1 subtitle-1 text-center">{{ userName}}</p>
        </v-flex>
        <v-flex class="mt-4 mb-3">
          <Popup @projectAdded="snackbar = true"></Popup>
        </v-flex>
      </v-layout>
      <v-list>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          class="white--text"
          router
          :to="link.route"
        >
          <v-list-item-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> {{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Popup from '@/components/Popup.vue'
import { app } from "@/firebase/config";
import {getAuth, signOut} from "firebase/auth";

export default {
  components:{
  Popup
  },
  data: () => ({
    drawer: false,
    userName : '',
    userAvatar : '',
    dialogDelete : false,
    links: [
      { icon: "dashboard", text: "Dashboard", route: "/dashboard" },
      { icon: "folder", text: "My Projects", route: "/projects" },
      { icon: "person", text: "Team", route: "/team" },
    ],
    snackbar:false
  }),
  methods:{
    signOut(){
      const auth = getAuth(app);
      signOut(auth)
      .then(() => {
        this.$router.push('/');
      })
      .catch()
    }
  },
  mounted(){
    const auth = getAuth(app);
    const user = auth.currentUser;
    this.userName = user.displayName;
    this.userAvatar = user.photoURL 
  }
};
</script>

<style>
</style>