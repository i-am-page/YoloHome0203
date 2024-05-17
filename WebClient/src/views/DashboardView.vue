<script setup>
import Inputa from "../components/InputField.vue";
import Header from "../components/header.vue";
import Navigation from "../components/Navigation.vue";
</script>

<template>
    <div class="flex h-screen overflow-hidden">
        <div>
            <Navigation />
        </div>

        <div class="flex flex-col flex-1 relative overflow-x-hidden overflow-y-auto">
            <div>
                <Header />
            </div>

            <main class="flex flex-col flex-1 relative overflow-x-hidden overflow-y-auto">
                <div class="bg-gray-100 flex flex-col flex-1 relative overflow-x-hidden overflow-y-auto ">
                    <!-- ------ -->
                    <div>
                        <h1 class="text-2xl uppercase font-bold ">
                            Dashboard
                        </h1>
                    </div>
                    <!-- ------------------------------------------------- -->


                    <div class="flex flex-col gap-8">

                        <div class="flex-1 flex flex-col justify-center ">
                            <div class="flex flex-1 md:flex-row gap-10 items-center">
                                <div class="flex flex-1 flex-col mt-6 border border-2 border-solid bg-slate-50">
                                    <label class="font-semibold text-xl text-center ">Temperature</label>
                                    <div class="gauge-container">
                                        <gauge :value="Data ? Data.temp : 0" :threshold="35" :min="0" :max="50"
                                            :decimals="0"></gauge>
                                    </div>


                                </div>


                                <div class="flex flex-1 flex-col mt-6 border border-2 border-solid bg-slate-50">
                                    <label class="font-semibold text-xl text-center ">Humidity</label>
                                    <div class="gauge-container">
                                        <gauge :value="Data ? Data.humidity : 0" :threshold="60" :min="0" :max="100"
                                            :decimals="0"></gauge>
                                    </div>
                                </div>
                                <div class="flex flex-1 flex-col mt-6 border border-2 border-solid bg-slate-50">
                                    <label class="font-semibold text-xl text-center ">Luminosity</label>
                                    <div class="gauge-container">
                                        <gauge :value="Data ? Data.lightvalue : 0" :threshold="75" :min="0" :max="100"
                                            :decimals="0"></gauge>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex-1 flex flex-col justify-center">
                            <div class="flex flex-row flex-1 gap-10 items-center">

                                <div class="flex flex-1 flex-col gap-5">
                                    <div class="flex-1 flex justify-center">
                                        <button @click="switchFan(isFanZero ? 100 : 0)"
                                            :class="{ 'bg-blue-100': isFanZero, 'bg-blue-400': isFanOne }" class="justify-center justify-center items-center hover:bg-blue-200
                                            text-blue font-bold rounded px-10 py-10 shadow-md flex flex-col gap-5">
                                            <label class="font-semibold text-xl text-center text-">Fan</label>
                                            <div class="icon-container bg-blue-300 rounded-full px-4 py-4 shadow-md">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="2.0" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                <div class="flex flex-1 flex-col gap-5">
                                    <div class="flex-1 flex justify-center">
                                        <button @click="switchLight(isLightZero ? 1 : 0)"
                                            :class="{ 'bg-red-100': isLightZero, 'bg-red-400': isLightOne }"
                                            class="hover:bg-red-200
                                            text-blue font-bold rounded px-10 py-10 shadow-md justify-center items-center flex flex-col gap-5">
                                            <label class="font-semibold text-xl text-center">Light</label>
                                            <div class="icon-container bg-red-300 rounded-full px-4 py-4 shadow-md">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <div class="flex flex-1 flex-col gap-5">
                                    <div class="flex-1 flex justify-center">
                                        <button @click="startSpeechRecognition"
                                            :class="{ 'bg-amber-100': isListening == false, 'bg-amber-400': isListening == true }"
                                            class="justify-center items-center  hover:bg-amber-200 
                                            text-blue font-bold rounded px-10 py-10 shadow-md flex flex-col gap-5">
                                            <label class="font-semibold text-xl text-center ">Assistant</label>
                                            <div class="icon-container bg-amber-300 rounded-full px-4 py-4 shadow-md">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
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
        };
    },
    mounted() {
        this.getData();
        console.log(this.Data);
        this.interval = setInterval(() => {
            this.getData();
        }, 60000);
        this.notifyInterval = setInterval(() => {
            this.notify();
        }, 1000);
    },
    beforeDestroy() {
        clearInterval(this.interval);
    },
    computed: {
        isLightZero() {
            return this.Data ? this.Data.light == 0 : false;
        },
        isLightOne() {
            return this.Data ? this.Data.light == 1 : false;
        },
        isFanZero() {
            return this.Data ? this.Data.fan == 0 : false;
        },
        isFanOne() {
            console.log(this.Data? this.Data.fan : -999);
            return this.Data ? this.Data.fan == 100 : false;
        },
    }
    ,
    methods: {
        notify(){
            if (this.Data.temp > 35)
            {
                alert("You need to turn on the fan");
            }
            if (this.Data.humidity > 60)
            {
                alert("Humidity is above 60%");
            }
            if (this.Data.lightvalue > 75)
            {
                alert("Luminosity is above 75");
            }
        },
        async getData() {
            try {
                const res = await axios.get("/record",
                    { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } });
                this.Data = await res.data;
                console.log(this.Data)
            } catch (error) {
                console.log(error);
                this.$router.push("/unauthorized");
            }

        },
        async switchLight(value) {
            if (value == this.Data.light)
                alert("Light is already " + (value == 0 ? "off" : "on"));
            else {
            this.Data.light = value;
            alert("Light is turned " + (value == 0 ? "off" : "on"));
            const res = await axios.post("/record/store", {
                light: value
            });
            }
        },
        async switchFan(value) {
            if (value == this.Data.fan)
                alert("Fan is already " + (value == 0 ? "off" : "on"));
            else {
            this.Data.fan = value;
            alert("Fan is turned " + (value == 0 ? "off" : "on"));
            const res = await axios.post("/record/store", {
                fan: value
            });
            }
        },
        startSpeechRecognition() {
            this.isListening = true;
            const recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
            recognition.lang = 'en-US';
            console.log(recognition.lang);
            recognition.onresult = (event) => {
                console.log("working")
                this.recognizedText = event.results[0][0].transcript;
                console.log(this.recognizedText);
                // Processing logic moved inside onresult event handler
                const enspeech = this.recognizedText.split(" ");
                console.log(enspeech);
                if (enspeech[0] == "turn" || enspeech[0] == "Turn") {
                    console.log("turn");
                    if (enspeech[1] == "on") {
                        console.log("on");
                        if (enspeech[3] == "light") {
                            console.log("light");
                            this.switchLight(1);
                        } else if (enspeech[3] == "fan") {
                            console.log("fan");
                            this.switchFan(100);
                        }
                    } else if (enspeech[1] == "off") {
                        console.log("off");
                        if (enspeech[3] == "light") {
                            console.log("light");
                            this.switchLight(0);
                        } else if (enspeech[3] == "fan") {
                            console.log("fan");
                            this.switchFan(0);
                        }
                    }
                }
            };
            recognition.onend = () => {
                this.isListening = false;
            };
            recognition.start();

            //this.isListening = this.isListening === false ? true : false;

        }
    },
};
</script>


<style lang="scss" scoped>
.gauge-container {
    width: 100%;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
}

.icon-container {
    width: 4rem;
    height: 4rem;
}
</style>
