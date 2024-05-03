<template>
    <aside
        class="bg-gray-x absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-gr duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0">
        <!-- SIDEBAR HEADER -->
        <div class="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5 mt-10">
            <img
                src="data:image/jpeg;base64,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" />
        </div>
        <!-- SIDEBAR HEADER -->

        <div class="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
            <!-- Sidebar Menu -->
            <nav class="mt-5 py-4 px-4 lg:mt-9 lg:px-6" x-data="{selected: $persist('Dashboard')}">
                <!-- Menu Group -->
                <div>
                    <h3 class="mb-4 ml-4 text-sm font-medium text-black">
                        MENU
                    </h3>

                    <ul class="mb-6 flex flex-col gap-1.5">
                        <!-- Menu Item Dashboard -->
                        <li>
                            <a class="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-black duration-300 ease-in-out"
                                href="/dashboard">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round"
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

                        <!-- Menu Item Tables -->
                    </ul>
                </div>
                <div>
                    <ul class="mb-6 flex flex-col gap-1.5">
                        <!-- Menu Item Auth Pages -->
                        <li>
                            <a class="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-black duration-300 ease-in-out"
                                href="/statistics">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                                </svg>
                                Statistics
                            </a>
                        </li>
                        <!-- Menu Item Auth Pages -->
                    </ul>
                </div>
                <!-- Others Group -->
                <div>
                    <ul class="mb-6 flex flex-col gap-1.5">
                        <!-- Menu Item Auth Pages -->
                        <li>
                            <a class="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-black duration-300 ease-in-out"
                                href="/">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M16 17l5-5-5-5M19.8 12H9M13 22a10 10 0 1 1 0-20" />
                                </svg>

                                Log out
                            </a>
                        </li>
                        <!-- Menu Item Auth Pages -->
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
            const res = await axios.get("/logout");
            this.$router.push("/login");
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

.bg-gr {
    background-color: rgb(235, 240, 245);
}
</style>
