<template>
    <table class="w-full text-base text-left text-gray-500 dark:text-gray-400">
        <thead class="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th v-for="({ name }, index) in title" scope="col" class="px-6 py-3">
                    {{ name }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="({ order_id, full_name, total, date, order_status }, index) in orders"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    #{{ order_id }}
                </th>
                <td class="px-6 py-4">
                    {{ full_name }}
                </td>
                <td class="px-6 py-4">
                    {{ date }}
                </td>
                <td class="px-6 py-4">
                    <span class="text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                        :class="getColorStatus(order_status)">
                        {{ getStatus(order_status) }}
                    </span>
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
                date: null,
                order_status: 0,
            }],
            title: [
                { name: 'รหัสคำสั่งซื้อ' },
                { name: 'ชื่อผู้ซื้อ' },
                { name: 'วันที่' },
                { name: 'สถานะ' },
                { name: 'ราคารวม' },
                { name: '' }
            ]
        }
    },

    methods: {
        getStatus(status_id: any) {
            if (status_id == 0) return 'รอยืนยัน'
            else if (status_id == 1) return 'เตรียมจัดส่ง'
            else if (status_id == 2) return 'กำลังจัดส่ง'
            else if (status_id == 3) return 'จัดส่งสำเร็จ'
            else if (status_id == 4) return 'ยกเลิก'
        },
        getColorStatus(status_id: any) {
            if (status_id == 0) return 'bg-blue-100 text-blue-800'
            else if (status_id == 1) return 'bg-orange-100 text-orange-800'
            else if (status_id == 2) return 'bg-green-100 text-green-800'
            else if (status_id == 3) return 'bg-green-100 text-green-800'
            else if (status_id == 4) return 'bg-red-100 text-red-800'
        },

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
                    date: order.date,
                    order_status: order.order_status
                })
            }
        })
        this.orders.shift()

    },

}

</script>