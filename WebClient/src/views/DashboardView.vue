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

            <main>
                <div class="max-w-screen-2xl mx-auto p-4 md:p-6 2xl:p-10 bg-gray-100">
                    <!-- ------ -->
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                        <h1 class="text-2xl uppercase font-bold">
                            Dashboard
                        </h1>

                    </div>
                    <!-- ------------------------------------------------- -->

                    <div class="flex flex-col gap-10">
                        <div>
                            <label class="font-semibold">Temperature:</label>
                            <span>{{ Data ? Data.temp : 'Loading...' }}</span>
                        </div>
                        <div>
                            <label class="font-semibold">Humidity:</label>
                            <span>{{ Data ? Data.humidity : 'Loading...' }}</span>
                        </div>
                        <div>
                            <label class="font-semibold">Luminosity:</label>
                            <span>{{ Data ? Data.lightvalue : 'Loading...' }}</span>
                        </div>
                        <div>
                            <label class="font-semibold">Fan Condition:</label>
                            <span>{{ Data ? (Data.fan == 0 ? 'Off' : 'On') : 'Loading...' }}</span>
                            <button @click="switchFan"
                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Switch</button>
                        </div>
                        <div>
                            <label class="font-semibold">Light Condition:</label>
                            <span>{{ Data ? (Data.light == 1 ? 'On' : 'Off') : 'Loading...' }}</span>
                            <button @click="switchLight"
                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Switch</button>
                        </div>
                        <div>
                            <button @click="startSpeechRecognition"
                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Start</button>
                            <label class="font-semibold">Assistant:</label>
                            <span>{{ recognizedText }}</span>
                        </div>
                    </div>

                </div>
            </main>



        </div>
    </div>
</template>

<script>
import axios from "../fetch/axios";

export default {
    name: "Data",
    data() {
        return {
            Data: null,
            isListening: false,
            recognizedText: '',
            enspeech: [],
        };
    },

    mounted() {
        this.getData();
        this.interval = setInterval(() => {
            this.getData();
        }, 2000);
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
            } catch (error) {
                this.$router.push("/unauthorized");
            }

        },
        async switchLight() {
            const val = this.Data.light == 0 ? 1 : 0;
            console.log(val);
            const res = await axios.post("/record/store", {
                light: val
            });
        },
        async switchFan() {
            const val = this.Data.fan == 0 ? 100 : 0;
            console.log(val);
            const res = await axios.post("/record/store", {
                fan: val
            });
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
        }

    },
};
</script>
