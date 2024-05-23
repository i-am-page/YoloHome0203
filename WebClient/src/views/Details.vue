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
            <main class="flex flex-col flex-1 p-8 bg-mycolor">
                <div class="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
                    <div class="p-6 bg-white shadow rounded-lg my-bg col-span-1">
                        <label class="font-semibold text-lg text-center mb-4 text-white font-mono block">
                            {{ title }}
                        </label>
                        <div class="gauge-container">
                            <gauge :custom="false" :value="Data ? Data : 0" :threshold="thhold" :min="0" :max="max"
                                :decimals="0"></gauge>
                        </div>
                    </div>
                    <div class="p-6 bg-white shadow rounded-lg my-bg col-span-4">
                        <div class="overflow-auto h-full">
                            <data-stream :dataStream="DataS"></data-stream>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50 p-4 shadow-lg rounded-lg h-72 ">
                    <Line v-if="loaded" :data="chartData" :options="chartOptions" class="m-4" />
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import DataStream from "../components/DataStream.vue";
import axios from "../fetch/axios";
import Gauge from "../components/Gauge.vue";
import moment from "moment";
import { Line } from 'vue-chartjs';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend, Title,
    Filler,
);
export default {
    name: "Data",
    components: { Gauge, DataStream, Line },
    data() {
        return {
            Data: null,
            DataS: null,
            stringtype: "abc",
            loaded: false,
            chartData: null,
            chartOptions: null,
            thhold: 0,
            max: 100,
            row: null,
            bgcl: null,
            bdcl: null,
            pbgcl: null,
            pbdcl: null,
        };
    },
    mounted() {
        if (this.$route.query.type === "temperature") {
            this.stringtype = "tempx";
            this.title = "Temperature (°C)";
        }
        else if (this.$route.query.type === "humidity") {
            this.stringtype = "humidx";
            this.title = "Humidity (%)";
        }
        else if (this.$route.query.type === "luminosity") {
            this.stringtype = "lightx";
            this.title = "Luminosity (%)";
        }
        this.getData();
        this.getChartData();
        this.interval = setInterval(() => {
            this.getData();
            this.getChartData();
        }, 60000);
    },
    beforeDestroy() {
        clearInterval(this.interval);
    },
    methods: {
        async getData() {
            try {

                const res = await axios.get("/record", {
                    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
                });

                if (this.stringtype === "tempx") {
                    this.Data = res.data.temp;
                    this.thhold = 35;
                    this.max = 50;
                } else if (this.stringtype === "humidx") {
                    this.Data = res.data.humidity;
                    this.thhold = 65;
                    this.max = 100;
                } else if (this.stringtype === "lightx") {
                    this.Data = res.data.lightvalue;
                    this.thhold = 75;
                    this.max = 100;
                }

                const ares = await axios.get("https://io.adafruit.com/api/v2/thanhdanh2754/feeds/" + this.stringtype + "/data/chart")
                this.DataS = ares.data.data;

            } catch (error) {
                this.$router.push("/unauthorized");
            }
        },

        async getChartData() {
            try {
                const bres = await axios.get("/statistics");

                if (this.stringtype === "tempx") {
                    this.row = bres.data.map(row => row.temp);
                    this.bgcl = 'rgba(248, 121, 121, 0.2)';
                    this.bdcl = '#f87979';
                    this.pbgcl = 'red';
                    this.pbdcl = '#f87979';
                } else if (this.stringtype === "humidx") {
                    this.row = bres.data.map(row => row.humidity);
                    this.bgcl = 'rgba(0, 191, 255, 0.2)';
                    this.bdcl = '#00BFFF';
                    this.pbgcl = '#00BFFF';
                    this.pbdcl = '#00BFFF';
                } else if (this.stringtype === "lightx") {
                    this.row = bres.data.map(row => row.lightvalue);
                    this.bgcl = 'rgba(50, 205, 50, 0.2)';
                    this.bdcl = '#32CD32';
                    this.pbgcl = '#32CD32';
                    this.pbdcl = '#32CD32';
                }

                this.chartData = {
                    labels: bres.data.map(row => moment(row.time).utcOffset(0).format("h:mm:ss a")),
                    datasets: [
                        {
                            label: this.title,
                            data: this.row,
                            backgroundColor:this.bgcl,
                            fill: true,
                            borderColor: this.bdcl,
                            borderWidth: 2,
                            pointRadius: 5,
                            pointBackgroundColor: this.pbgcl,
                            pointBorderColor: this.bdcl,
                            tension: 0.3
                        }
                    ]
                };

                this.chartOptions = {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                };
                this.loaded = true;
            } catch (e) {
                console.log(e);
            }
        }
    },
};
</script>


<style>
.bg-mycolor {
    background-color: #191924;
}

.my-bg {
    background-color: #27293B;
}
</style>