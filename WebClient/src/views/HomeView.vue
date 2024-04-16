<script setup>
import Inputa from "../components/InputField.vue";
</script>

<template>
  <section class="bg-gray-50">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl text-center leading-tight tracking-tight text-gray-700 md:text-2xl ">
            Smart Printing Service Management
          </h1>
          <div class="">
            <img class="container mx-auto max-w-full h-auto scale-50" src="../images/user/hcmut.png" alt="">
          </div>
          <form class="space-y-4 md:space-y-6" action="#">
            <div>
              <Inputa label="" type="text" placeholder="Username" v-model="username" />
            </div>
            <div>
              <Inputa label="" type="password" placeholder="Password" v-model="password" />
            </div>
            <button type="button" @click="login"
              class="text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Sign in
            </button>

          </form>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import axios from "../fetch/axios";

export default {
  username: "",
  password: "",
  methods: {
    async login() {
      try {
        const res = await axios.post("/account/authenticate", {
          username: this.username,
          password: this.password,
        });
        if (res.data && res.data.token) {
          //localStorage.setItem("token", res.data);
          axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
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
