
<template>
    <div v-if="getStar > 0" class="flex items-center">
        <!-- <span
            class="flex items-center bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-lg dark:bg-gray-700 dark:text-gray-300">
            <svg v-for="item in getStar" :key="item" aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor"
                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>First star</title>
                <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                </path>
            </svg>
        </span> -->
        <span
            class="text-base bg-red-100 text-red-800 font-medium mr-2 px-2.5 py-0.5 rounded-lg dark:bg-gray-700 dark:text-gray-300">
            OTOP {{ getStar }} ดาว
        </span>
    </div>

    <div v-else>
        <span
            class="text-base bg-gray-100 text-gray-800 font-medium mr-2 px-2.5 py-0.5 rounded-lg dark:bg-gray-700 dark:text-gray-300">
            ทั่วไป
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    props: [
        "getStar"
    ],
})

</script>