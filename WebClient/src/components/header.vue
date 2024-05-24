<template>
    <header class="sticky top-0 z-50 flex w-full bg-gray-50 bg-mybg ">
        <div class="flex flex-grow items-center justify-between py-4 px-4 md:px-6 2xl:px-11">
            <div class="flex items-center gap-2 sm:gap-4">
                <button
                    class="z-50 block rounded border border-gray-300 bg-white p-2 shadow-sm dark:border-gray-700 dark:bg-gray-800 lg:hidden"
                    @click.stop="sidebarToggle = !sidebarToggle">
                    <span class="relative block h-5 w-5 cursor-pointer">
                        <span class="block absolute right-0 h-full w-full">
                            <span
                                class="relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-gray-700 transition-all duration-300 ease-in-out dark:bg-gray-300"
                                :class="{ '!w-full delay-200': !sidebarToggle }"></span>
                            <span
                                class="relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-gray-700 transition-all duration-300 ease-in-out dark:bg-gray-300"
                                :class="{ '!w-full delay-300': !sidebarToggle }"></span>
                            <span
                                class="relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-gray-700 transition-all duration-300 ease-in-out dark:bg-gray-300"
                                :class="{ '!w-full delay-400': !sidebarToggle }"></span>
                        </span>
                        <span class="block absolute right-0 h-full w-full rotate-45">
                            <span
                                class="absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-gray-700 transition-all duration-300 ease-in-out dark:bg-gray-300"
                                :class="{ '!h-0 delay-200': !sidebarToggle }"></span>
                            <span
                                class="absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-gray-700 transition-all duration-300 ease-in-out dark:bg-gray-300"
                                :class="{ '!h-0 delay-300': !sidebarToggle }"></span>
                        </span>
                    </span>
                </button>
            </div>

            <div class="hidden sm:block w-full max-w-md mx-auto">
                <form action="https://formbold.com/s/unique_form_id" method="POST">
                    <div class="relative">
                        <input type="text" placeholder="Search..." class="w-full bg-transparent pl-9 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500" />
                    </div>
                </form>
            </div>

            <div class="flex items-center gap-3 2xsm:gap-7">
                <ul class="flex items-center gap-2 2xsm:gap-4"></ul>

                <!-- User Area -->
                <div class="relative">
                    <a class="flex items-center gap-4" href="#">
                        <span class="hidden text-right lg:block">
                            <span class="block text-sm font-medium text-white font-mono ">SAIGON-SOFTWARE</span>
                            <span class="block text-xs font-medium text-white font-mono ">DADN-YoloHome0203</span>
                        </span>

                        <span class="h-12 w-12 overflow-hidden rounded-full">
                            <img src="../assets/img/ss_logo.png" alt="User" class="h-full w-full object-cover" />
                        </span>
                    </a>
                </div>
                <!-- User Area -->
            </div>
        </div>
    </header>
</template>

<script>
export default {
    data() {
        return {
            sidebarToggle: false,
        };
    },
};
</script>

<style scoped>
/* Custom styles for better visualization */
.bg-gray-50 {
    background-color: #f9fafb;
}

.dark\:bg-gray-800 {
    background-color: #2d3748;
}

.border-gray-300 {
    border-color: #d1d5db;
}

.dark\:border-gray-700 {
    border-color: #4a5568;
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

.bg-mybg {
    background-color: #191924;
}
</style>
