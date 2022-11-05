<template>
  <div class="welcome">
    <v-container class="mt-5">
      <v-layout row align-center justify-center class="ma-5 text-center">
        <div v-if="text">
          <v-snackbar v-model="snackbar" :timeout="4000" top>
            {{ text }}

            <template v-slot:action="{ attrs }">
              <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </div>
        <div v-if="showLogin">
          <v-card class="mt-5 py-3">
            <v-card-title class="justify-center">
              <h2>Login</h2>
            </v-card-title>
            <v-card-text>
              <login @login="showSnackbar" class="my-5"></login>
              <p class="my-3 subtitle-1 grey--text">
                No Account Yet?
                <v-btn
                  @click="showLogin = !showLogin"
                  class="blue--text lighten-3"
                  depressed
                  >Sign Up</v-btn
                >
              </p>
            </v-card-text>
          </v-card>
        </div>
        <div v-else>
          <v-card class="mt-5 py-3">
            <v-card-title class="justify-center">
              <h2>Sign Up</h2>
            </v-card-title>
            <v-card-text>
              <sign-up class="my-5"></sign-up>
              <p class="my-3 subtitle-1 grey--text">
                Already Registered?
                <v-btn
                  @click="showLogin = !showLogin"
                  class="blue--text lighten-3"
                  depressed
                  >Login</v-btn
                >
              </p>
            </v-card-text>
          </v-card>
        </div>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import SignUp from "@/components/SignupForm.vue";
import Login from "@/components/LoginForm.vue";
export default {
  components: {
    SignUp,
    Login,
  },
  data: () => ({
    showLogin: true,
    snackbar: false,
    text: "",
  }),
  methods: {
    showSnackbar(errorMessage) {
      this.text = errorMessage;
      this.snackbar = true;
  
    },
  },
};
</script>

<style>
.welcome form {
  width: 400px;
}
</style>