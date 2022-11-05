<template>
  
  <div class="team">
    <Navbar></Navbar>
    <h1 class="subtitle-1 grey--text">Team</h1>
    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="person in team" :key="person.name">
          <v-card class="ma-3 text-center">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-4">
                <img :src="person.avatar" />
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subtitle-1">{{ person.name }}</div>
              <div class="grey--text">{{ person.role }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn depressed class="grey--text white">
                <v-icon left small>message</v-icon>
                <span>Message</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
  
  <script>
import { app } from "@/firebase/config";
import { getFirestore, onSnapshot, collection } from "firebase/firestore";
import Navbar from '@/components/Navbar.vue'
export default {
  name: "Team",
  components:{
    Navbar
  },
  data: () => ({
    team: [],
    error:null
  }),
  mounted() {
    const db = getFirestore(app);
    onSnapshot(
        collection(db, 'users'),
        (snapshot) => {
            const result = [];
            snapshot.docs.forEach((doc) => {
               result.push({ ...doc.data(), id: doc.id });
            })
            this.team = result;
        },
        (err) => {
            this.error = err.message
        });
  },
};
</script>
  