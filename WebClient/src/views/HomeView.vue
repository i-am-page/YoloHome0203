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
          <form class="space-y-4 md:space-y-6" action="#">
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
            <!-- <button type="button" @click="showModal = true"
              class="w-60 block mx-auto text-white bg-black hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5">
              Authenticate
            </button> -->
          </form>

        </div>
      </div>
    </div>
    <!-- <div v-if="showModal" class="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
      <div class="flex items-center justify-center min-h-screen">
        <div
          class="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all">
          <video ref="video" autoplay style="transform: scaleX(-1);"></video>
          <button @click="turnoffcam"
            class="w-60 block mx-auto text-white bg-black hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5">
            Close</button>
          <button @click="loginwithface"
            class="w-60 block mx-auto text-white bg-black hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5">
            Login</button>
        </div>
      </div>
    </div> -->
  </section>

</template>


<script>

import axiosInstance from "../fetch/axios";
import axios from "axios";

export default {
  data() {
    return {
      //showModal: false,
      username: "",
      password: "",
    }
  },
  // watch: {
  //   showModal(val) {
  //     if (val) {
  //       this.authenticate();
  //     }
  //   },
  // },
  mounted() {
    localStorage.removeItem("token");
    console.log(localStorage)
  },
  methods: {
    // turnoffcam() {
    //   this.showModal = false;
    //   this.$refs.video.srcObject.getTracks().forEach((track) => {
    //     track.stop();
    //   });
    // },
    // async loginwithface() {
    //   const video = this.$refs.video;
    //   const canvas = document.createElement("canvas");
    //   const context = canvas.getContext("2d");
    //   canvas.width = video.videoWidth;
    //   canvas.height = video.videoHeight;
    //   context.drawImage(video, 0, 0, canvas.width, canvas.height);
    //   const data = canvas.toDataURL("image/png");
    //   var form = new FormData();
    //   form.append("image", data);
    //   await axios({
    //     url: "https://api.chooch.ai/predict/face?person_id_filter=-1&model_id=14&apikey=426e5c84-7d52-4d7a-b0b6-afdc078ca398",
    //     method: "POST",
    //     data: form,
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   })
    //     .then(response => {
    //       console.log(response);
    //     })
    //     .catch(error => {
    //       console.error(error);
    //     });
    // },
    // authenticate() {
    //   navigator.mediaDevices.getUserMedia({ video: true })
    //     .then((stream) => {
    //       this.$refs.video.srcObject = stream;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    async login() {
      try {
        //this.$router.push("/dashboard");
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
