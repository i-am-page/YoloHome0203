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
                <!-- Hamburger Toggle BTN -->
                <a class="block flex-shrink-0 lg:hidden" href="index.html">
                    <img src="https://via.placeholder.com/150" alt="Logo" class="w-8 h-8" />
                </a>
            </div>

            <div class="hidden sm:block w-full max-w-md mx-auto">
                <form action="https://formbold.com/s/unique_form_id" method="POST">
                    <div class="relative">
                        <!-- <button class="absolute top-1/2 left-0 transform -translate-y-1/2">
                            <svg class="fill-current text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                                    fill="currentColor" />
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                                    fill="currentColor" />
                            </svg>
                        </button> -->

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
