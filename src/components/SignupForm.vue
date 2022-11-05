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
      <v-avatar v-if="avatar">
          <img
            id="uploadPreview"
            src="/DefaultAvatar.png"
            alt="DefaultAvatar"
            srcset=""
          />
          
        </v-avatar>
        <v-file-input
        id="avatar"
        :rules="imageRules"
        accept="image/png, image/jpeg, image/bmp"
        placeholder="Pick an avatar"
        prepend-icon="mdi-camera"
        label="Avatar"
        v-model="avatar"
        @change="PreviewImage"
      ></v-file-input>  
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
    <v-btn class="primary mt-5" color="white" @click="submitHandle"
      >Sign Up</v-btn
    >
  </v-form>
</template>

<script>
export default {
  data: () => ({
    name: "",
    email: "",
    password: "",
    role: "",
    avatar: null,
    roles: ["Web developer", "Grafic designer", "Ui/Ux designer", "Sales guru"],
    nameRules: [(v) => !!v || "Name is required"],
    emailRules: [
      (v) => !!v || "E-mail is required",
      //  v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    passwordRule: [
      (v) => !!v || "Password is required",
      // v => v.length >=6 || 'Minimum Length is 6 characters',
    ],
    RoleRule: [
      (v) => !!v || "Role is required",
      // v => v.length >=6 || 'Minimum Length is 6 characters',
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
        document.getElementsByClassName("mdi-camera")[0].remove();
        document.getElementById("uploadPreview").src = oFREvent.target.result;
      };
    },
    submitHandle() {
      if (this.$refs.form.validate()) {
        console.log();
      }
    },
  },
};
</script>

<style>
.userImg{
  display: flex;
}
</style>