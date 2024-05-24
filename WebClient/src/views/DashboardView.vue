<script setup>
import Inputa from "../components/InputField.vue";
import Header from "../components/header.vue";
import Navigation from "../components/Navigation.vue";
</script>

<template>
  <div class="flex h-screen overflow-hidden p-0">
    <Navigation />
    <div class="flex flex-col flex-1">
      <Header />
      <main class="flex bg-mycolor flex-col flex-1 p-8 bg-gray-50">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="p-6 bg-white shadow rounded-lg my-bg">
            <label class="font-semibold text-lg text-center mb-4 text-white font-mono block">Temperature (°C)</label>
            <div class="gauge-container">
              <gauge :value="Data ? Data.temp : 0" :threshold="35" :min="0" :max="50" :decimals="0" :attr="'temperature'">
              </gauge>
            </div>
          </div>
          <div class="p-6 bg-white shadow my-bg rounded-lg">
            <label class="font-semibold text-lg text-white text-center mb-4 font-mono block">Humidity (%)</label>
            <div class="gauge-container">
              <gauge :value="Data ? Data.humidity : 0" :threshold="65" :min="0" :max="100" :decimals="0"
                :attr="'humidity'"></gauge>
            </div>
          </div>
          <div class="p-6 bg-white shadow my-bg rounded-lg">
            <label class="font-semibold text-lg text-white text-center mb-4 font-mono block">Luminosity (%)</label>
            <div class="gauge-container">
              <gauge :value="Data ? Data.lightvalue : 0" :threshold="75" :min="0" :max="100" :decimals="0"
                :attr="'luminosity'"></gauge>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <button @click="switchFan(isFanZero ? 100 : 0)"
            :class="[isFanZero ? 'bg-blue-100' : 'gradient1', 'flex flex-col items-center justify-center p-6 shadow rounded-lg transition-colors']">
            <label class="font-semibold text-lg font-mono">Fan</label>
            <div class="icon-container rounded-full p-4">
              <svg v-if="isFanZero" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 21v-9" />
              </svg>
            </div>
          </button>
          <button @click="switchLight(isLightZero ? 1 : 0)"
            :class="[isLightZero ? 'bg-red-100' : 'gradient2', 'flex flex-col items-center justify-center p-6 shadow rounded-lg transition-colors']">
            <label class="font-semibold text-lg font-mono">Light</label>
            <div class="icon-container rounded-full p-4">
              <svg v-if="isLightZero" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M12 12a3.75 3.75 0 0 0 0-7.5V12Z" />
              </svg>
            </div>
          </button>
          <button @click="startSpeechRecognition"
            :class="[isListening ? 'gradient3 text-white' : 'bg-yellow-100', 'flex flex-col items-center justify-center p-6 shadow rounded-lg transition-colors']">
            <label class="font-semibold text-lg font-mono">Assistant</label>
            <div class="icon-container rounded-full p-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
              </svg>
            </div>
          </button>
        </div>
        <div class="fixed bottom-4 right-4 space-y-2">
          <div v-for="(notification, index) in notifications" :key="index" class="bg-white p-4 rounded-lg shadow-lg">
            <p class="text-sm font-mono">{{ notification.text }}</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import axios from "../fetch/axios";
import Gauge from "../components/Gauge.vue";

export default {
  name: "Data",
  components: { Gauge },
  data() {
    return {
      Data: null,
      isListening: false,
      recognizedText: '',
      enspeech: [],
      light: 1,
      fan: 1,
      textnoti: "",
      notifications: [],
    };
  },
  mounted() {
    this.getData();
    this.interval = setInterval(() => {
      this.getData();
      this.notify();
    }, 30000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  computed: {
    isLightZero() {
      return this.Data ? this.Data.light == 0 : false;
    },
    isFanZero() {
      return this.Data ? this.Data.fan == 0 : false;
    },
  },
  methods: {
    notify() {
      if (this.Data.temp > 35) {
        this.textnoti = "Temperature is above 35°C";
        this.addNotification(this.textnoti)

      }
      if (this.Data.humidity > 65) {
        this.textnoti = "Humidity is above 65%";
        this.addNotification(this.textnoti)
      }
      if (this.Data.lightvalue > 75) {
        this.textnoti = "Luminosity is above 75%";
        this.addNotification(this.textnoti)
      }
      if (this.Data.lightvalue < 25) {
        this.textnoti = "Luminosity is below 25%";
        this.addNotification(this.textnoti)
      }
    },
    async getData() {
      try {
        const res = await axios.get("/record", {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        this.Data = res.data;
      } catch (error) {
        this.$router.push("/unauthorized");
      }
    },
    addNotification(text) {
      const notification = { text };
      this.notifications.push(notification);
      setTimeout(() => {
        this.notifications = this.notifications.filter(n => n.id !== notification.id);
      }, 5000);
    },
    async switchLight(value) {
      if (value == this.Data.light)
        alert("Light is already " + (value == 0 ? "off" : "on"));
      else {
        this.Data.light = value;
        await axios.post("/record/store", {
          light: value,
        });
        this.textnoti = "Light is turned " + (value == 0 ? "off" : "on");
        this.addNotification(this.textnoti);
      }
    },
    async switchFan(value) {
      if (value == this.Data.fan)
        alert("Fan is already " + (value == 0 ? "off" : "on"));
      else {
        this.Data.fan = value;
        await axios.post("/record/store", {
          fan: value,
        });
        this.textnoti = "Fan is turned " + (value == 0 ? "off" : "on");
        this.addNotification(this.textnoti)
      }
    },
    startSpeechRecognition() {
      this.isListening = true;
      const recognition =
        new window.webkitSpeechRecognition() || new window.SpeechRecognition();
      recognition.lang = "en-US";
      recognition.onresult = (event) => {
        this.recognizedText = event.results[0][0].transcript;
        const speech = this.recognizedText.toLowerCase();
        if (speech.includes('on')) {
          if (speech.includes('light')) {
            this.switchLight(1);
          } else if (speech.includes('fan')) {
            this.switchFan(100);
          } else if (speech.includes('everything')) {
            this.switchLight(1);
            this.switchFan(100);
          }
        } else if (speech.includes('off')) {
          if (speech.includes('light')) {
            this.switchLight(0);
          } else if (speech.includes('fan')) {
            this.switchFan(0);
          } else if (speech.includes('everything')) {
            this.switchLight(0);
            this.switchFan(0);
          }
        }
      };
      recognition.onend = () => {
        this.isListening = false;
      };
      recognition.start();
      this.textnoti = "Start listening..."
      this.addNotification(this.textnoti)
    },
  },
};
</script>

<style lang="scss" scoped>
.gauge-container {
  width: 100%;
  margin: 0 auto;
}

.icon-container {
  width: 4rem;
  height: 4rem;
  background-color: #f1f5f9;
  /* very light gray background */
  display: flex;
  align-items: center;
  justify-content: center;
}

button {
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
}

.bg-blue-100:hover {
  background-color: #dbeafe;
}

.bg-red-100:hover {
  background-color: #fee2e2;
}

.bg-yellow-100:hover {
  background-color: #fef3c7;
}

.bg-blue-500:hover {
  background-color: #2563eb;
}

.bg-red-500:hover {
  background-color: #ef4444;
}

.bg-yellow-500:hover {
  background-color: #f59e0b;
}

@keyframes gradient1 {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

@keyframes gradient2 {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

@keyframes gradient3 {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.gradient1 {
  background: linear-gradient(90deg,
      #6666ff,
      /* Medium Blue */
      #9999ff,
      /* Medium Light Blue */
    );

  background-size: 1500% 1500%;
  animation: gradient1 3s ease infinite;
}

.gradient2 {
  background: linear-gradient(270deg,
      #ff3333,
      /* Light Red */
      #ff6666,
      /* Soft Red */
    );

  background-size: 1500% 1500%;
  animation: gradient2 3s ease infinite;
}

.gradient3 {
  background: linear-gradient(270deg, #a1c4fd, #c2e9fb, #c2e9fb, #a1c4fd, #fda085, #f6d365, #ff9a9e, #fa709a);
  background-size: 1500% 1500%;
  animation: gradient3 15s ease infinite;
}

.bg-mycolor {
  background-color: #191924;
}

.my-bg {
  background-color: #27293B;
}
</style>
