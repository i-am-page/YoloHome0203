<script setup>
import Inputa from "../components/InputField.vue";
</script>

<template>
  <section class="login-section bg-cover bg-center w-full h-screen">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div
        class="w-100 h-100 w-full rounded-lg bg-opacity-50 backdrop-blur-md bg-white shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold text-center leading-tight tracking-tight md:text-2xl">
            Smart Home Mangement
          </h1>
          <form class="space-y-4 md:space-y-6" action="#" @keyup.enter="login">
            <div>
              <Inputa label="" type="text" placeholder="Username" v-model="username" />
            </div>
            <div>
              <Inputa label="" type="password" placeholder="Password" v-model="password" />
            </div>
            <button type="button" @click="login"
              class="w-60 block mx-auto text-white bg-black hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5">
              Sign in
            </button>
            <button type="button" @click="authenticate"
              class="w-60 block mx-auto text-white bg-black hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5">
              Authenticate
            </button>
            <button type="button" @click="register"
              class="w-60 block mx-auto text-white bg-black hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5">
              Register
            </button>

          </form>
          <AuthenticationComponent />
        </div>
      </div>
    </div>
  </section>

</template>

<script>
import axiosInstance from "../fetch/axios";
export default {
  data() {
    return {
      //showModal: false,
      username: "",
      password: "",
    }
  },
  mounted() {
    localStorage.removeItem("token");
    console.log(localStorage)
  },
  methods: {
    authenticate() {
      window.faceio.authenticate({
        "locale": "auto" // Default user locale
      }).then(userData => {
        this.user = userData.payload.whoami
        this.username = userData.facialId;
        this.password = "123";
        this.login();
      }).catch(errCode => {
        console.log(errCode)
      })
    },
    register() {
      window.faceio.enroll({
        "locale": "auto",
        "payload": {
          "whoami": 123456,
          "email": "john.doe@example.com"
        }
      }).then(userInfo => {
        // User Successfully Enrolled! 
        alert(
          `User Successfully Enrolled! Details:
           Unique Facial ID: ${userInfo.facialId}
           Enrollment Date: ${userInfo.timestamp}
           Gender: ${userInfo.details.gender}
           Age Approximation: ${userInfo.details.age}`
        );
        console.log(userInfo);
        const res = axiosInstance.post("/account/register", {
          username: userInfo.facialId,
          password: "123",
        });
      }).catch(errCode => {
        
        console.log(errCode);
      })
    },
    async login() {
      try {
        const res = await axiosInstance.post("/account/authenticate", {
          username: this.username,
          password: this.password,
        });
        if (res.data && res.data.token) {
          localStorage.setItem("token", res.data.token);
          //axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
          this.$router.push("/dashboard");
        } else {
          alert("Something wrong!");
        }
      }
      catch (error) {
        if (error.response && error.response.status === 400) {
          alert("Invalid username or password");
        }
      }
    },
  },
};
</script>

<style src='../assets/main.css'></style>
