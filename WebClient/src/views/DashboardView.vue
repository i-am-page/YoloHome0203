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
                                        <gauge :value="this.Data.temp" :threshold=" 75 " :min=" 0 "
                                            :max=" 100 " :decimals=" 0 "></gauge>
                                    </div>


                                </div>


                                <div class="flex flex-1 flex-col mt-6 border border-2 border-solid bg-slate-50">
                                    <label class="font-semibold text-xl text-center ">Humidity</label>
                                    <div class="gauge-container">
                                        <gauge :value="this.Data.humid" :threshold=" 75 " :min=" 0 " :max=" 100 " :decimals=" 0 "></gauge>
                                    </div>
                                </div>
                                <div class="flex flex-1 flex-col mt-6 border border-2 border-solid bg-slate-50">
                                    <label class="font-semibold text-xl text-center ">Luminosity</label>
                                    <div class="gauge-container">
                                        <gauge :value="this.Data.luminosity" :threshold=" 75 " :min=" 0 " :max=" 100 " :decimals=" 0 "></gauge>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex-1 flex flex-col justify-center">
                            <div class="flex flex-row flex-1 gap-10 items-center">

                                <div class="flex flex-1 flex-col gap-5">
                                    <div class="flex-1 flex justify-center">
                                        <button @click=" switchFan "
                                            :class=" { 'bg-blue-100': fan === 0, 'bg-blue-400': fan === 1 } " class="justify-center justify-center items-center hover:bg-blue-200
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
                                        <button @click=" switchLight "
                                            :class=" { 'bg-red-100': light === 0, 'bg-red-400': light === 1 } "
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
                                        <button @click=" startSpeechRecognition "
                                            :class=" { 'bg-amber-100': isListening === false, 'bg-amber-400': isListening === true } "
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
        // this.interval = setInterval(() => {
        //     this.getData();
        // }, 60000);
    },
    beforeDestroy() {
        clearInterval(this.interval);
    },

    methods: {
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
        async switchLight() {
            const val = this.Data.light == 0 ? 1 : 0;
            console.log(val);
            const res = await axios.post("/record/store", {
                light: val
            });

            //this.light = this.light === 1 ? 0 : 1; 
        },
        async switchFan() {
            const val = this.Data.fan == 0 ? 100 : 0;
            console.log(val);
            const res = await axios.post("/record/store", {
                fan: val
            });

            this.fan = this.fan === 1 ? 0 : 1;
        },
        startSpeechRecognition() {
            this.isListening = true;
            const recognition = new window.webkitSpeechRecognition();
            recognition.lang = 'en-US';

            recognition.onresult = (event) => {
                this.recognizedText = event.results[0][0].transcript;
                console.log(this.recognizedText);
                // Processing logic moved inside onresult event handler
                const enspeech = this.recognizedText.split(" ");
                console.log(enspeech);
                if (enspeech[0] == "Turn") {
                    console.log("Turn");
                    if (enspeech[1] == "on") {
                        console.log("on");
                        if (enspeech[3] == "light") {
                            console.log("light");
                            this.switchLight();
                        } else if (enspeech[3] == "fan") {
                            console.log("fan");
                            this.switchFan();
                        }
                    } else if (enspeech[1] == "off") {
                        console.log("off");
                        if (enspeech[3] == "light") {
                            console.log("light");
                            this.switchLight();
                        } else if (enspeech[3] == "fan") {
                            console.log("fan");
                            this.switchFan();
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
