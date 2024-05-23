<script setup>
import Inputa from "../components/InputField.vue";
import Header from "../components/Header.vue";
import Navigation from "../components/Navigation.vue";
</script>

<template>
    <div class="flex h-screen overflow-hidden bg-gray-100 bg-mycolor">
        <div>
            <Navigation />
        </div>
        <div class="flex flex-col flex-1 relative overflow-x-hidden overflow-y-auto">
            <div>
                <Header />
            </div>
            <main class="flex-1 h-full">
                <div class="h-full mx-auto p-6 md:p-8 2xl:p-12 bg-gray-50 my-bg">
                    <div class="h-full container flex flex-col gap-8 bg-gray-50 rounded-lg">
                        <form @submit.prevent="exportExcel"
                            class="flex flex-col sm:flex-row justify-between items-center p-4 bg-white shadow-lg rounded-lg">
                            <div class="flex flex-col sm:flex-row items-center gap-4 mb-4 sm:mb-0">
                                <label for="start-date" class="font-bold font-mono text-gray-700">Start Date</label>
                                <div class="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#0175F8" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M8 7V3H6v4H3v2h18V7h-3V3h-2v4H8zM3 21v-2h18v2H3zm0-4v-2h18v2H3zm0-4v-2h18v2H3zm0-4v-2h18v2H3z" />
                                    </svg>
                                    <input type="date" id="start-date"
                                        class="border border-gray-300 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200">
                                </div>
                            </div>
                            <div class="flex flex-col sm:flex-row items-center gap-4 mb-4 sm:mb-0">
                                <label for="end-date" class="font-bold font-mono text-gray-700">End Date</label>
                                <div class="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#0175F8" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M8 7V3H6v4H3v2h18V7h-3V3h-2v4H8zM3 21v-2h18v2H3zm0-4v-2h18v2H3zm0-4v-2h18v2H3zm0-4v-2h18v2H3z" />
                                    </svg>
                                    <input type="date" id="end-date"
                                        class="border border-gray-300 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200">
                                </div>
                            </div>
                            <div
                                class="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200">
                                <button type="submit"
                                    class="focus:outline-none flex items-center font-mono justify-center h-10 w-32">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                                    </svg>
                                    Export
                                </button>
                            </div>
                        </form>
                        <div class="flex flex-col justify-center items-center">
                            <div class="arrow-container flex items-center">
                                <i class="fas fa-arrow-left text-gray-600 hover:text-gray-800 cursor-pointer mx-4"
                                    @click="prevChart"></i>
                                <div class="chart-container flex-grow bg-white shadow-lg rounded-lg p-6">
                                    <Line v-if="currentChart === 'temp' && loaded" :data="chartData_temp"
                                        class="chart m-4" />
                                    <Line v-if="currentChart === 'humid' && loaded" :data="chartData_humid"
                                        class="chart m-4" />
                                    <Line v-if="currentChart === 'lumin' && loaded" :data="chartData_lumin"
                                        class="chart m-4" />
                                </div>
                                <i class="fas fa-arrow-right text-gray-600 hover:text-gray-800 cursor-pointer mx-4"
                                    @click="nextChart"></i>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    </div>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css';
import moment from "moment";
import axios from "../fetch/axios";
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
    name: 'LineChart',
    components: { Line },
    data() {
        return {
            loaded: false,
            currentChart: null,
            chartData_temp: null,
            chartData_humid: null,
            chartData_lumin: null,
        };
    },
    mounted() {
        this.updateData();
        this.getData();
        this.interval = setInterval(() => {
            this.updateData();
            this.getData();
        }, 60000);
        this.currentChart = 'temp';
        console.log(this.chartData_temp);
    },
    methods: {
        nextChart() {
            if (this.currentChart === 'temp') {
                this.currentChart = 'humid';
            } else if (this.currentChart === 'humid') {
                this.currentChart = 'lumin';
            } else {
                this.currentChart = 'temp';
            }
        },
        prevChart() {
            if (this.currentChart === 'temp') {
                this.currentChart = 'lumin';
            } else if (this.currentChart === 'lumin') {
                this.currentChart = 'humid';
            } else {
                this.currentChart = 'temp';
            }
        },
        async exportExcel() {
            try {
                const startDate = document.getElementById("start-date").value;
                const endDate = document.getElementById("end-date").value;

                const res = await axios.get(`/export?start=${startDate}&end=${endDate}`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`,
                        Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    }, responseType: 'blob'
                });
                const url = URL.createObjectURL(new Blob([res.data], {
                    type: 'application/vnd.ms-excel'
                }));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'data.xlsx');
                document.body.appendChild(link);
                link.click();
            } catch (error) {
                console.error(error);
            }
        },
        async updateData() {
            try {
                const res = await axios.get("/record", {
                    headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
                });
            } catch (error) {
                this.$router.push("/unauthorized");
            }
        },
        async getData() {
            try {
                const res = await axios.get("/statistics");
                this.chartData_temp = {
                    labels: res.data.map(row => moment(row.time).utcOffset(0).format("h:mm:ss a")),
                    datasets: [
                        {
                            label: 'Temperature',
                            data: res.data.map(row => row.temp),
                            backgroundColor: 'rgba(248, 121, 121, 0.2)',
                            fill: true,
                            borderColor: '#f87979',
                            borderWidth: 2,
                            pointRadius: 5,
                            pointBackgroundColor: 'red',
                            pointBorderColor: '#f87979',
                            tension: 0.3
                        }
                    ]
                };

                this.chartData_humid = {
                    labels: res.data.map(row => moment(row.time).utcOffset(0).format("h:mm:ss a")),
                    datasets: [
                        {
                            label: 'Humidity',
                            backgroundColor: 'rgba(0, 191, 255, 0.2)',
                            data: res.data.map(row => row.humidity),
                            pointRadius: 5,
                            pointBackgroundColor: '#00BFFF',
                            pointBorderColor: '#00BFFF',
                            tension: 0.3,
                            borderColor: '#00BFFF',
                            borderWidth: 2,
                            fill: true
                        }
                    ],

                };
                this.chartData_lumin = {
                    labels: res.data.map(row => moment(row.time).utcOffset(0).format("h:mm:ss a")),
                    datasets: [
                        {
                            label: 'Luminosity',
                            backgroundColor: 'rgba(50, 205, 50, 0.2)',
                            data: res.data.map(row => row.lightvalue),
                            pointRadius: 5,
                            pointBackgroundColor: '#32CD32',
                            pointBorderColor: '#32CD32',
                            tension: 0.3,
                            borderColor: '#32CD32',
                            borderWidth: 2,
                            fill: true
                        }
                    ]
                };

                this.loaded = true;
            } catch (e) {
                console.error(e);
            }
        },
        beforeDestroy() {
            clearInterval(this.interval);
        }
    }
};
</script>

<style scoped>
/* Custom styles for better visualization */
.bg-gray-100 {
    background-color: #f7fafc;
}

.border-gray-300 {
    border-color: #d1d5db;
}

.text-gray-700 {
    color: #4a5568;
}

.dark\:text-gray-300 {
    color: #e2e8f0;
}

.text-gray-500 {
    color: #6b7280;
}

.dark\:text-gray-400 {
    color: #9ca3af;
}

.fill-current {
    fill: currentColor;
}

.hover\:text-blue-500:hover {
    color: #3b82f6;
}

.dark\:hover\:text-blue-400:hover {
    color: #60a5fa;
}

.shadow-md {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.transition-colors {
    transition: background-color 0.2s, color 0.2s;
}

.bg-mycolor {
    background-color: #191924;
}

.my-bg {
    background-color: #27293B;
}

.arrow-container {
    display: flex;
    justify-content: space-between;
    padding: 10px;
}

.arrow-container i {
    cursor: pointer;
    font-size: 24px;
}

.chart-container {
    width: 800px;
    height: 400px;
}

.chart {
    width: 100%;
    height: 100%;
}
</style>
