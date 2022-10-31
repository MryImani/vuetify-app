<template>
    <div class="team">
      <h1 class="subtitle-1 grey--text">Team</h1>
      <v-container class="my-5">
      
        <v-layout row wrap>
          <v-flex xs12 sm6 md4 lg3 v-for="person in team" :key="person.name">
           <v-card class="ma-3 text-center">
             <v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-4">
                <img :src="person.avatar">
              </v-avatar>
             </v-responsive>
             <v-card-text>
              <div class="subtitle-1">{{ person.name }}</div>
              <div class="grey--text">{{ person.role }}</div>
             </v-card-text>
             <v-card-actions>
              <v-btn depressed class="grey--text white">
                <v-icon left small >message</v-icon>
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
  
    export default {
      name: 'Team',
      data:() => ({
        team: [
        { name: 'Mry Imn', role: 'Web developer', avatar: '/avatar-1.png' },
        { name: 'Ryu', role: 'Graphic designer', avatar: '/avatar-2.png' },
        { name: 'Chun Li', role: 'Web developer', avatar: '/avatar-3.png' },
        { name: 'Gouken', role: 'Social media maverick', avatar: '/avatar-4.png' },
        { name: 'Yoshi', role: 'Sales guru', avatar: '/avatar-5.png'}
      ]
      })
  
    }
  </script>
  