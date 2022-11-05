<template>
  <v-form ref="form">
    <v-text-field
      label="Name"
      type="text"
      prepend-icon="person"
      v-model="name"
      :rules="nameRules"
    ></v-text-field>
    <v-text-field
      label="Email"
      type="email"
      prepend-icon="email"
      v-model="email"
      :rules="emailRules"
    ></v-text-field>
    <v-text-field
      label="Password"
      type="password"
      prepend-icon="key"
      v-model="password"
      :rules="passwordRule"
    ></v-text-field>
    <div class="userImg">
      <v-file-input
        id="avatar"
        :rules="imageRules"
        accept="image/png, image/jpeg, image/bmp"
        placeholder="Pick an avatar"
        :prepend-icon="avatarIcon"
        label="Avatar"
        v-model="avatar"
        @change="PreviewImage"
        ref="avatar"
      ></v-file-input>
      <v-avatar v-if="avatar">
        <img
          id="uploadPreview"
          src="/DefaultAvatar.png"
          alt="DefaultAvatar"
          srcset=""
        />
      </v-avatar>
    </div>
    <v-select
      v-model="role"
      :items="roles"
      menu-props="auto"
      label="Role"
      hide-details
      prepend-icon="engineering"
      single-line
      :rules="RoleRule"
    ></v-select>
    <v-btn
      class="primary mt-5"
      color="white"
      @click="submitHandle"
      :loading="loading"
      >Sign Up</v-btn
    >
  </v-form>
</template>

<script>
import { app } from "@/firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { collection, addDoc, getFirestore } from "firebase/firestore";
export default {
  data: () => ({
    name: "",
    email: "",
    password: "",
    role: "",
    avatar: null,
    noImg: false,
    loading: false,
    roles: ["Web developer", "Grafic designer", "Ui/Ux designer", "Sales guru"],
    nameRules: [(v) => !!v || "Name is required"],
    avatarIcon: "account_circle",
    emailRules: [
      (v) => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    passwordRule: [
      (v) => !!v || "Password is required",
       v => v.length >=6 || 'Minimum Length is 6 characters',
    ],
    RoleRule: [
      (v) => !!v || "Role is required",
    
    ],
    imageRules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        "Avatar size should be less than 2 MB!",
    ],
  }),
  methods: {
    //preview image after select
    PreviewImage() {
      var oFReader = new FileReader();
      oFReader.readAsDataURL(document.getElementById("avatar").files[0]);
      oFReader.onload = function (oFREvent) {
        document.getElementById("uploadPreview").src = oFREvent.target.result;
      };
    },
    submitHandle() {
      if (this.$refs.form.validate()) {
        const imageUrl = '/' + document.getElementById("avatar").files[0].name;
        const user = {
          name: this.name,
          email: this.email,
          password: this.password,
          avatar: imageUrl,
          role: this.role,
        };
        this.loading = true;
        const auth = getAuth(app);
        const db = getFirestore(app);
        createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          updateProfile(auth.currentUser, {
            displayName: this.name,
            photoURL: imageUrl,
          })
          .then(() => {
           
          })
          .catch(() => {
           
          })
          
         
          addDoc(collection(db, "users"), user)
            .then(() => {
              this.loading = false;
          this.$emit('successSignUp') 
            })
            .catch((err) => {
             
            });
         
          
        })
        .catch((err) => {
         
        })
        
      }
    },
  },
};
</script>

<style>
.userImg {
  display: flex;
}
</style>