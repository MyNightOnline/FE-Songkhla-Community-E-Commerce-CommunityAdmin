<template>
    <div class="max-w-5xl container mx-auto mt-12">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-base text-left text-gray-500 dark:text-gray-400">
                <thead class="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            รหัสคำสั่งซื้อ
                        </th>
                        <th scope="col" class="px-6 py-3">
                            ชื่อผู้ซื้อ
                        </th>
                        <th scope="col" class="px-6 py-3">
                            วันที่
                        </th>
                        <th scope="col" class="px-6 py-3">
                            สถานะ
                        </th>
                        <th scope="col" class="px-6 py-3">
                            ราคารวม
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <span class="sr-only">รายละเอียด</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="({ order_id, full_name, total, order_status }, index) in orders"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            #{{ order_id }}
                        </th>
                        <td class="px-6 py-4">
                            {{ full_name }}
                        </td>
                        <td class="px-6 py-4">
                            05/04/2565
                        </td>
                        <td class="pt-7">
                            <!-- {{ orderStatus(Number(order_status)) }} -->
                            <select id="small" v-model="orders[index].order_status" @change="changeStatus($event, order_id)"
                                class="block p-2 mb-6 text-sm text-gray-900 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                :class="orderStatus(Number(order_status))" :disabled="(orders[index].order_status >= 3)">
                                <option value="0">รอยืนยัน</option>
                                <option value="1">เตรียมจัดส่ง</option>
                                <option value="2">กำลังจัดส่ง</option>
                                <option value="3">จัดส่งสำเร็จ</option>
                                <option value="4">ยกเลิก</option>
                            </select>
                        </td>
                        <td class="px-6 py-4">
                            {{ total }}
                        </td>
                        <td class="px-6 py-4 text-center">
                            <a :href="'/manage-order/' + order_id"
                                class="font-medium text-blue-600 dark:text-blue-500 hover:underline">รายละเอียด</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script lang="ts">

import { useUserStore } from "@/store/index"
import axios from "axios"

export default {

    setup() {
        const userStore = useUserStore()
        return { userStore }
    },

    data() {
        return {
            orders: [{
                order_id: null,
                full_name: null,
                total: null,
                order_status: 0,
            }],

        }
    },

    methods: {
        orderStatus(statusId: Number) {
            if (statusId == 0) return 'border-blue-600 bg-blue-50'
            else if (statusId == 1 || statusId == 2) return 'border-orange-300 bg-orange-100'
            else if (statusId == 3) return 'border-lime-600 bg-lime-50'
            else if (statusId == 4) return 'border-red-600 bg-red-50'
        },
        async changeStatus(event: any, order_id: any) {
            // event.target.value
            // event.target.options[event.target.options.selectedIndex].text

            if (!confirm('OK ?')) {
                const data = JSON.parse(localStorage.getItem('user')!)

                const getOrders = await axios.get('http://localhost:3001/api/orders')
                const ordersData = getOrders.data
                this.orders = []
                ordersData.map((order: any) => {
                    if (order.users_commu_id == data.users_commu_id) {
                        this.orders.push({
                            order_id: order.order_id,
                            full_name: order.full_name,
                            total: order.total,
                            order_status: order.order_status
                        })
                    }
                })
            } else {
                const result_changeStatus = await axios.put('http://localhost:3001/api/orders/' + order_id, {
                    order_status: event.target.value
                })
            }
        }
    },

    async mounted() {
        const data = JSON.parse(localStorage.getItem('user')!)

        const getOrders = await axios.get('http://localhost:3001/api/orders')
        const ordersData = getOrders.data

        ordersData.map((order: any) => {
            if (order.users_commu_id == data.users_commu_id) {
                this.orders.push({
                    order_id: order.order_id,
                    full_name: order.full_name,
                    total: order.total,
                    order_status: order.order_status
                })
            }
        })
        this.orders.shift()

    },

}

</script>