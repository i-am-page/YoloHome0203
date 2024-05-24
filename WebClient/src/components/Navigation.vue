<template>
    <aside
        class="bg-gradient-light  absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden transition-all duration-300 ease-linear dark:bg-gray-800 lg:static lg:translate-x-0">
        <!-- SIDEBAR HEADER -->
        <div class="flex items-center justify-between gap-2 px-6 py-6 mt-10">
            <img src="" alt="">
        </div>
        <!-- SIDEBAR HEADER -->

        <div class="h-full no-scrollbar flex flex-col overflow-y-auto transition-all duration-300 ease-linear">
            <!-- Sidebar Menu -->
            <nav class="h-80 mt-5 py-4 px-4 lg:mt-9 lg:px-6" x-data="{selected: $persist('Dashboard')}">
                <!-- Menu Group -->
                <div>
                    <h3 class="mb-4 ml-4 text-sm font-medium text-white font-mono">
                        MENU
                    </h3>
                    <ul class="mb-6 flex flex-col gap-1.5">
                        <!-- Menu Item Dashboard -->
                        <li>
                            <a class="group font-mono relative flex items-center gap-2.5 rounded-lg py-2 px-4 font-medium text-white transition duration-300 ease-in-out hover:bg-blue-100 dark:hover:bg-gray-700"
                                @click="changetodb">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <rect x="3" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="14" width="7" height="7"></rect>
                                    <rect x="3" y="14" width="7" height="7"></rect>
                                </svg>
                                Dashboard
                            </a>
                        </li>
                        <!-- Menu Item Dashboard -->

                        <!-- Menu Item Statistics -->
                        <li>
                            <a class="group font-mono relative flex items-center gap-2.5 rounded-lg py-2 px-4 font-medium text-white transition duration-300 ease-in-out hover:bg-blue-100 dark:hover:bg-gray-700"
                                @click="changetostatistics">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path
                                        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                                </svg>
                                Statistics
                            </a>
                        </li>
                        <!-- Menu Item Statistics -->
                    </ul>
                </div>
                <!-- Others Group -->
                <div class="h-96 relative">
                    <ul class="absolute bottom-0 w-full mb-6 flex flex-col gap-1.5">
                        <!-- Menu Item Logout -->
                        <li>
                            <a class="group font-mono relative flex items-center gap-2.5 rounded-lg py-2 px-4 font-medium text-white transition duration-300 ease-in-out hover:bg-blue-100 dark:hover:bg-gray-700"
                                @click="logout">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M16 17l5-5-5-5M19.8 12H9M13 22a10 10 0 1 1 0-20" />
                                </svg>
                                Log out
                            </a>
                        </li>
                        <!-- Menu Item Logout -->
                    </ul>
                </div>

            </nav>
            <!-- Sidebar Menu -->
        </div>
    </aside>
</template>


<script setup>
import { RouterView, RouterLink } from "vue-router";
import axios from "../fetch/axios";
</script>

<script>
export default {
    methods: {
        async logout() {
            //const res = await axios.get("/logout");
            this.$router.push("/");
        },
        changetodb() {
            this.$router.push("/dashboard");
        },
        changetostatistics() {
            this.$router.push("/statistics");
        },
    },
};
</script>


<style scoped>
.group:hover,
.group:active {
    background-color: #d7eff9;
    /* Màu D7EFF9 khi hover hoặc focus */
}

.bg-blue {
    background-color: #d7eff9;
}

.bg-gray-50 {
    background-color: #f9fafb;
}

.bg-gray-800 {
    background-color: #2d3748;
}

.text-gray-700 {
    color: #4a5568;
}

.text-gray-300 {
    color: #e2e8f0;
}

.hover\:bg-blue-100:hover {
    background-color: #ebf8ff;
}

.dark\:hover\:bg-gray-700:hover {
    background-color: #4a5568;
    color: #e2e8f0;
}

/* Add gradient background for the navbar */
.bg-gradient-light {
    background: #5FAB7E
}
</style>
