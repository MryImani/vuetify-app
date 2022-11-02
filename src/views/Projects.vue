<template>
  <div class="projects">
    <h1 class="subtitle-1 grey--text">Projects</h1>
    <v-container class="my-5">
      <v-expansion-panels>
        <v-expansion-panel v-for="project in myProjects" :key="project.title">
          <v-expansion-panel-header>{{
            project.title
          }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card flat>
              <v-card-text class="px-4 grey--text">
                <div class="font-weight-bold">due by {{ project.due }}</div>
            <div>{{ project.content }}</div>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
import { app } from "@/firebase/config";
import {  getFirestore, onSnapshot, collection} from "firebase/firestore";
export default {
  name: "Projects",
  data: () => ({
    projects: [],
    error:null
  }),
  computed: {
    myProjects() {
      return this.projects.filter((project) => {
        return project.person === "Mry Imn";
      });
    },
  },
  mounted(){
    const db = getFirestore(app);
    onSnapshot(
        collection(db, 'projects'),
        (snapshot) => {
            const result = [];
            snapshot.docs.forEach((doc) => {
                doc.data().due && result.push({ ...doc.data(), id: doc.id });
            })
            this.projects = result;
        },
        (err) => {
            this.error = err.message
        });
  }
};
</script>
<style>
.project.complete {
  border-left: 4px solid #3cd1c2;
}
.project.ongoing {
  border-left: 4px solid #ffaa2c;
}
.project.overdue {
  border-left: 4px solid #f83e70;
}
</style>
