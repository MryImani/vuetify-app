<template>
  <div class="login">
    <v-form ref="form">
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
      <v-btn
        class="primary"
        color="white"
        @click="submitHandle"
        :loading="loading"
        >Login</v-btn
      >
    </v-form>
  </div>
</template>
  
  <script>
import { app } from "@/firebase/config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
  data: () => ({
    email: "",
    password: "",
    loading: false,
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    passwordRule: [
      (v) => !!v || "Password is required",
       v => v.length >=6 || 'Minimum Length is 6 characters',
    ],
  }),
  methods: {
    submitHandle() {
      if (this.$refs.form.validate()) {
        this.$emit("login");
        this.loading = true;
        const auth = getAuth(app);
        const email = this.email;
        const password = this.password;
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            this.$router.push({ name: "dashboard"});
            this.loading = false;
          })
          .catch((err) => {
            this.$emit("login", err.message + 'try again!');
            setTimeout(() => {
              this.$refs.form.reset();
              this.loading = false;
            }, 4000);
          });
      }
    },
  },
};
</script>
  
  <style>
</style>