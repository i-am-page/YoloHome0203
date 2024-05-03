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
                <!-- <div class="max-w-screen-2xl mx-auto p-4 md:p-6 2xl:p-10 bg-gray-100">
                    <div class="container">
                        <form @submit.prevent="exportExcel">
                            <input type="date" id="start-date">
                            <input type="date" id="end-date">
                            <button type="submit">Export Excel</button>
                        </form>
                        <Line v-if="loaded" :data="chartData" />
                    </div>
                </div> -->
                <div class="max-w-screen-2xl mx-auto bg-gray-100">
                    <div class="container flex flex-col gap-8">
                        <form @submit.prevent="exportExcel"
                            class="flex flex-row justify-center bg-slate-200 gap-10 border pb-4 pt-4">
                            <div class="flex flex-row items-center gap-2">
                                <label class="font-bold"> Start Date </label>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#0175F8" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-7 h-7 text-white">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                                </svg>
                                <input type="date" id="start-date" class="border border-gray-300 py-1 px-1">
                            </div>
                            <div class="flex flex-row items-center gap-2">
                                <label class="font-bold"> End Date </label>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-7 h-7 text-white">
                                    <path stroke-linecap="round" stroke-linejoin="round" fill="#0175F8"
                                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                                </svg>
                                <input type="date" id="end-date" class="border border-gray-300 py-1 px-1">
                            </div>
                            <div class="flex flex-row bg-green-400 hover:bg-green-300 p-2 rounded gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="2.0" stroke="currentColor" class="w-6 h-6 text-white">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                </svg>

                                <button type="submit" class=" text-white">Export Excel</button>
                            </div>
                        </form>
                        <Line v-if="loaded" :data="chartData" class="m-4" />
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import axios from "../fetch/axios";
import { Line } from 'vue-chartjs'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,

} from 'chart.js'
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)
export default {
    name: 'LineChart',
    components: { Line },
    data() {
        return {
            loaded: false,
            chartData: null,
        };
    },
    mounted() {
        this.updateData();
        this.getData();
        this.interval = setInterval(() => {
            this.updateData();
            this.getData();
        }, 60000);
    },
    methods: {
        async exportExcel() {
            try {
                const startDate = document.getElementById("start-date").value;
                const endDate = document.getElementById("end-date").value;

                const res = await axios.get(`/export?start=${startDate}&end=${endDate}`,
                    {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem("token")}`,
                            Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                        }, responseType: 'blob'
                    });
                const url = URL.createObjectURL(new Blob([res.data], {
                    type: 'application/vnd.ms-excel'
                }))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', 'data.xlsx')
                document.body.appendChild(link)
                link.click()
            } catch (error) {
                console.error(error)
            }
        },
        async updateData() {
            try {
                const res = await axios.get("/record",
                    { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } });
            } catch (error) {
                this.$router.push("/unauthorized");
            }
        },
        async getData() {
            try {
                const res = await axios.get("/statistics");
                console.log(res.data)
                this.chartData = {
                    labels: res.data.map(row => moment(row.time).utcOffset(0).format("h:mm:ss a")),
                    datasets: [
                        {
                            label: 'Temperature',
                            backgroundColor: '#f87979',
                            data: res.data.map(row => row.temp),
                            pointRadius: 0,
                            tension: 0.3,
                            borderColor: '#f87979',
                            fill: true,
                            borderWidth: 4
                        },
                        {
                            label: 'Humidity',
                            backgroundColor: '#00BFFF',
                            data: res.data.map(row => row.humidity),
                            pointRadius: 0,
                            tension: 0.3,
                            borderColor: '#00BFFF',
                            borderWidth: 4

                        },
                        {
                            label: 'Luminosity',
                            backgroundColor: '#32CD32',
                            data: res.data.map(row => row.lightvalue),
                            pointRadius: 0,
                            tension: 0.3,
                            borderColor: '#f8f879',
                            borderWidth: 4
                        }
                    ]
                }

                this.loaded = true
            } catch (e) {
                console.error(e)
            }
        },
        beforeDestroy() {
            clearInterval(this.interval);
        }
    }
}

</script>
