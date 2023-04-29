<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        <div v-if="orders.length === 0">
            <div class="flex items-center p-4 mb-4 text-lg max-w-sm ml-8 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert">
                <svg aria-hidden="true" class="flex-shrink-0 inline w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clip-rule="evenodd"></path>
                </svg>
                <span class="sr-only">Info</span>
                <div>
                    <span class="font-medium">ไม่มีข้อมูล</span>
                </div>
            </div>
        </div>
        <table v-else class="w-[980px] sm:w-[1000px] xl:w-full text-base text-left text-gray-500 dark:text-gray-400">
            <thead class="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th v-for="({ name }, index) in title" :key="index" scope="col" class="px-6 py-3">
                        {{ name }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="({ order_id, full_name, total, date, order_status }, index) in orders" :key="index"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        #{{ order_id }}
                    </th>
                    <td class="px-6 py-4">
                        {{ full_name }}
                    </td>
                    <td class="px-6 py-4">
                        {{ dateFormat(date) }}
                    </td>

                    <td class="px-6 py-4">
                        {{ total }}
                    </td>
                    <td class="px-6 py-4">
                        <span class="text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                            :class="getColorStatus(order_status)">
                            {{ getStatus(order_status) }}
                        </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                        <a :href="'/manage-order/' + order_id"
                            class="font-medium text-blue-600 dark:text-blue-500 hover:underline">รายละเอียด</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BuddhistDateFormatter } from '@/assets/functions/BuddhistDateFormatter'

interface Order {
    date: string
    full_name: string
    order_id: number
    order_status: number
    total: number
}

export default defineComponent({
    props: [
        "getColorStatus",
        "getStatus",
        "title",
        "orders",
        "index",
    ],
    data() {
        return {

        }
    },
    methods: {
        dateFormat(oldDate: any) {
            const formatter = new BuddhistDateFormatter(oldDate)
            const formattedDate = formatter.format()
            return formattedDate
        },
    },
    mounted() {
    }
})
</script>