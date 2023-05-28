<template>
    <div class="grid xl:grid-cols-3 gap-4">
        <div id="alert-additional-content-5"
            class="col-span-2 p-4 border border-gray-300 rounded-lg bg-gray-50 dark:border-gray-600 dark:bg-gray-800"
            role="alert">
            <div class="flex items-center">
                <svg fill="currentColor" class="w-5 h-5 mr-2 text-gray-800 dark:text-gray-300" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path clip-rule="evenodd" fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.536-4.464a.75.75 0 10-1.061-1.061 3.5 3.5 0 01-4.95 0 .75.75 0 00-1.06 1.06 5 5 0 007.07 0zM9 8.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S7.448 7 8 7s1 .672 1 1.5zm3 1.5c.552 0 1-.672 1-1.5S12.552 7 12 7s-1 .672-1 1.5.448 1.5 1 1.5z">
                    </path>
                </svg>
                <span class="sr-only">Info</span>
                <h3 class="text-2xl font-medium text-gray-800 dark:text-gray-300">ยินดีต้อนรับ {{ full_name }}</h3>
            </div>
            <div class="mt-2 mb-4 text-sm text-gray-800 dark:text-gray-300">
                More info about this info dark goes here. This example text is going to run a bit longer so that you can see
                how
                spacing within an alert works with this kind of content.
            </div>
            <div class="flex">
                <button type="button"
                    class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-800">
                    <svg aria-hidden="true" class="-ml-0.5 mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                        <path fill-rule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clip-rule="evenodd"></path>
                    </svg>
                    View more
                </button>
                <button type="button"
                    class="text-gray-800 bg-transparent border border-gray-700 hover:bg-gray-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-800 dark:text-gray-300 dark:hover:text-white"
                    data-dismiss-target="#alert-additional-content-5" aria-label="Close">
                    Dismiss
                </button>
            </div>
        </div>
        <div>
            <a href="#"
                class="block justify-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div class="text-center">
                    <h5 class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        คุณมีคำสั่งซื้อใหม่ <span style="color: red;">{{ length }}</span>
                    </h5>
                    <button type="button"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        ดูรายการสั่งซื้อ
                    </button>
                </div>
            </a>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from '@/store/user'
import axiosClient from '@/utils/axios'

export default defineComponent({
    setup() {
        const userStore = useUserStore()
        const full_name = userStore.user.full_name

        return {
            full_name
        }
    },
    data() {
        return {
            orders: [{
                order_id: null,
                full_name: null,
                total: null,
                date: '',
                order_status: 0,
            }],
            length: 0
        }
    },
    async mounted() {
        const data = JSON.parse(localStorage.getItem('user')!)

        const getOrders = await axiosClient.get('/orders')
        const ordersData = getOrders.data.sort((a: any, b: any) => b.order_id - a.order_id)


        ordersData.map((order: any) => {
            if (order.users_commu_id == data.users_commu_id) {
                const date = order.date
                const date2 = new Date(date)
                const formattedDate = date2.toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                })
                const dateParts = formattedDate.split("/")
                const formattedDate2 = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
                this.orders.push({
                    order_id: order.order_id,
                    full_name: order.full_name,
                    total: order.total,
                    date: formattedDate2,
                    order_status: order.order_status
                })
                if (order.order_status == 0 || order.order_status == 1) {
                    this.length++
                }
            }
        })
        this.orders.shift()
    }
})
</script>

