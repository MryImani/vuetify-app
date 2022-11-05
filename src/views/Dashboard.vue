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
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2 mx-2"
              v-bind="attrs"
              v-on="on"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title
              ><h2>{{ formTitle }}</h2></v-card-title
            >
            <v-card-text>
              <v-form class="px-3" ref="form">
                <v-text-field
                  label="Title"
                  v-model="editedItem.title"
                  prepend-icon="folder"
                  :rules="inputRule"
                ></v-text-field>
                <v-textarea
                  label="Information"
                  v-model="editedItem.content"
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
                      @click:clear="editedItem.due = null"
                      prepend-icon="date_range"
                      :rules="inputRule"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="editedItem.due"
                    @change="menu2 = false"
                  ></v-date-picker>
                </v-menu>
                <v-spacer></v-spacer>
                <v-btn
                  v-if="formTitle === 'New Item'"
                  flat
                  class="success mx-0 mt-3"
                  @click="addProject"
                  :loading="loading"
                  >Add Project</v-btn
                >
              </v-form>
            </v-card-text>
            <v-card-actions v-if="formTitle === 'Edit Item'">
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
      <v-data-table
        :headers="headers"
        :items="projects"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        class="elevation-1"
        @page-count="pageCount = $event"
      >
        <template
          v-slot:item.status="{ item }"
          :class="`pa-3 project ${item.status}`"
        >
          <div class="right">
            <v-chip small :class="`${item.status} white--text my-2 caption`">{{
              item.status
            }}</v-chip>
          </div>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
      <div class="text-center pt-3">
        <v-pagination v-model="page" :length="pageCount" circle></v-pagination>
      </div>
    </v-container>
  </div>
</template>

<script>
import { app } from "@/firebase/config";
import {
  getFirestore,
  onSnapshot,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { format, parseISO } from "date-fns";
import Navbar from "@/components/Navbar.vue";
import { getAuth } from '@firebase/auth';
export default {
  name: "Dashboard",
  components: {
    Navbar,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Project title", value: "title" , sortable: false },
      { text: "Person", value: "person" , sortable: false  },
      { text: "Due by", value: "due" , sortable: false  },
      { text: "Status", value: "status", align: "center", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
    ],
    projects: [],
    editedItem: {
      title: "",
      person: 0,
      due: 0,
      status: 0,
    },
    error: null,
    page: 1,
    pageCount: 0,
    itemsPerPage: 5,
    editedIndex: -1,
    deleteDoc:'',
    title: "",
    content: "",
    due: format(parseISO(new Date().toISOString()), "yyyy-MM-dd"),
    menu2: false,
    loading: false,
    error: null,
    inputRule: [
      (v) => !!v || "Input value is required",
      (v) => v.length >= 3 || "Minimum Length is 3 characters",
    ],
    projectAdded: false,
  }),
  methods: {
    sortBy(prop) {
      this.projects.sort((a, b) => {
        return a[prop] < b[prop] ? -1 : 1;
      });
    },
    addProject() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const db = getFirestore(app);
        const project = {
          title: this.title,
          person: "Mry Imn",
          content: this.content,
          due: format(parseISO(this.due), "do MMMM  yyyy"),
          status: "ongoing",
        };
        addDoc(collection(db, "projects"), project)
          .then(() => {
            this.loading = false;
            this.dialog = false;
            this.$emit("projectAdded");
          })
          .catch((err) => {
            this.error = err.message;
          });
      }
    },
    editItem(item) {
      this.editedIndex = this.projects.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.projects.indexOf(item);
      this.deleteDoc = this.projects.at(this.editedIndex);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
      
    },

    deleteItemConfirm() {
      const db = getFirestore(app);
      deleteDoc(doc(db, "projects" , this.deleteDoc.id )).then(() => {
       this.projects.splice(this.editedIndex, 1);
        this.closeDelete();
      });
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.projects[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
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
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  computed: {
    computedDateFormattedDatefns() {
      return this.due ? format(parseISO(this.due), "do MMMM  yyyy") : "";
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
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

