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
                    <div class="container">
                        <Line v-if="loaded" :data="chartData" />
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
        }, 15000);
    },
    methods: {
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
                            fill : true,
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
