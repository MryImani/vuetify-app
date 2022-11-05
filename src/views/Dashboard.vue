<template>
  <div class="dashboard">
    <Navbar></Navbar>
    <h1 class="subtitle-1 grey--text">Dashboard</h1>
    <v-container class="my-5">
      <v-layout row class="mb-5">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              small
              depressed
              color="grey--text"
              @click="sortBy('title')"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon small left>folder</v-icon>
              <span class="caption text-lowercase">By Project</span>
            </v-btn>
          </template>

          <span>Sort projects by project title</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              small
              depressed
              color="grey--text"
              @click="sortBy('person')"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon small left>person</v-icon>
              <span class="caption text-lowercase">By Person</span>
            </v-btn>
          </template>

          <span>Sort projects by person create this</span>
        </v-tooltip>
      </v-layout>
      <v-data-table :headers="headers" :items="projects"  :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      class="elevation-1"
      @page-count="pageCount = $event">
        <template v-slot:item.status="{ item }" :class="`pa-3 project ${item.status}`">
          <div class="right">
              <v-chip
                small
                :class="`${item.status} white--text my-2 caption`"
                >{{ item.status }}</v-chip
              >
            </div>
    </template>
      </v-data-table>
      <!-- <v-card id="projects" flat v-for="project in projects" :key="project.title" :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      class="elevation-1"
      @page-count="pageCount = $event">
        <v-layout row wrap :class="`pa-3 project ${project.status}`">
          <v-flex xs12 md6>
            <div class="caption grey--text">Project title</div>
            <div>{{ project.title }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Person</div>
            <div>{{ project.person }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Due by</div>
            <div>{{ project.due }}</div>
          </v-flex>
          <v-flex xs2 sm4 md2>
            <div class="right">
              <v-chip
                small
                :class="`${project.status} white--text my-2 caption`"
                >{{ project.status }}</v-chip
              >
            </div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card> -->
      <div class="text-center pt-3">
        <v-pagination
          v-model="page"
        :length="pageCount"
          circle
        ></v-pagination>
      </div>
    </v-container>
  </div>
</template>

<script>
import { app } from "@/firebase/config";
import { getFirestore, onSnapshot, collection } from "firebase/firestore";
import Navbar from "@/components/Navbar.vue";
export default {
  name: "Dashboard",
  components: {
    Navbar,
  },
  data: () => ({
    headers : [ { text: 'Project title', value: 'title' },
          { text: 'Person', value: 'person' },
          { text: 'Due by', value: 'due' },
          { text: 'Status', value: 'status' ,align: 'center',
            sortable: false, },
          ],
    projects: [],
    error: null,
    page: 1,
    pageCount: 0,
    itemsPerPage: 5,
  }),
  methods: {
    sortBy(prop) {
      this.projects.sort((a, b) => {
        return a[prop] < b[prop] ? -1 : 1;
      });
    },
  },
  mounted() {
    const db = getFirestore(app);
    onSnapshot(
      collection(db, "projects"),
      (snapshot) => {
        const result = [];
        snapshot.docs.forEach((doc) => {
          doc.data().due && result.push({ ...doc.data(), id: doc.id });
        });
        this.projects = result;
        
      },
      (err) => {
        this.error = err.message;
      }
    );
  },
};
</script>
<style>
.project {
  margin: 0;
}
.project.complete {
  border-left: 4px solid #3cd1c2;
}
.project.ongoing {
  border-left: 4px solid #ffaa2c;
}
.project.overdue {
  border-left: 4px solid #f83e70;
}
.v-chip.complete {
  background: #3cd1c2 !important;
}
.v-chip.ongoing {
  background: #ffaa2c !important;
}
.v-chip.overdue {
  background: #f83e70 !important;
}
</style>

