<template>
    <div v-if="errorMessage"
        class="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"></path>
        </svg>
        <span class="sr-only">Info</span>
        <div>
            <span class="font-medium">{{ errorMessage }}</span>
        </div>
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        <div class="w-[980px] sm:w-[1000px] xl:w-[99%] flex items-center justify-end pb-4 bg-white dark:bg-gray-900">
            <label for="table-search" class="sr-only">Search</label>
            <div class="relative mt-1">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor"
                        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd"></path>
                    </svg>
                </div>
                <input type="text" id="table-search" v-model="search" @input="searchInput"
                    class="block p-2 pl-10 text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="ค้นหา">
            </div>
            <div class="ml-5">
                <label for="underline_select" class="sr-only">Underline select</label>
                <select id="underline_select" v-model="selected1" @change="updateSelect1"
                    class="block py-2.5 px-0 w-full text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                    <option v-for="({ value, title }, index) in option1" :key="index" :value="value">{{ title }}</option>
                </select>
            </div>
        </div>
        <div v-if="lengthOrders == 0">
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
                        {{ date }}
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
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { Order } from '@/interfaces/Orders'
import { BuddhistDateFormatter } from '@/assets/functions/BuddhistDateFormatter'

export default defineComponent({
    setup() {
        let selected1 = ref('-1')
        const option1 = [
            { value: '-1', title: 'ทั้งหมด' },
            { value: '0', title: 'ยังไม่ชำระเงิน' },
            { value: '1', title: 'ชำระเงินแล้ว' },
            { value: '2', title: 'เตรียมผลิตภัณฑ์' },
            { value: '3', title: 'จัดส่งผลิตภัณฑ์' },
        ]

        const title = [
            { name: 'รหัสคำสั่งซื้อ' },
            { name: 'ชื่อผู้ซื้อ' },
            { name: 'วันที่' },
            { name: 'ราคารวม' },
            { name: 'สถานะ' },
        ]

        let orders = ref<Order[]>([])
        const defaultOrders = ref<Order[]>([])
        const errorMessage = ref('')
        let lengthOrders = ref(0)
        let search = ref('')

        const loadOrders = async () => {

            try {
                const response = await fetch('http://localhost:3001/api/orders')
                if (!response.ok) {
                    throw new Error('Failed to load orders')
                }
                const data = await response.json()
                orders.value = data

                orders.value = orders.value.map((order: Order) => {
                    order.date = dateFormat(order.date)
                    return order
                })

                defaultOrders.value = data
                lengthOrders.value = orders.value.length
            } catch (error: any) {
                errorMessage.value = error.message
            }
        }
        const getStatus = (status_id: any) => {
            if (status_id == 0) return 'ยังไม่ชำระเงิน'
            else if (status_id == 1) return 'ชำระเงินแล้ว'
            else if (status_id == 2) return 'เตรียมผลิตภัณฑ์'
            else if (status_id == 3) return 'จัดส่งผลิตภัณฑ์'
        }
        const getColorStatus = (status_id: any) => {
            if (status_id == 0) return 'bg-blue-100 text-blue-800'
            else if (status_id == 1) return 'bg-orange-100 text-orange-800'
            else if (status_id == 2) return 'bg-green-100 text-green-800'
            else if (status_id == 3) return 'bg-green-100 text-green-800'
        }
        const dateFormat = (oldDate: any) => {
            const formatter = new BuddhistDateFormatter(oldDate)
            const formattedDate = formatter.format()
            return formattedDate
        }
        const updateSelect1 = () => {
            if (selected1.value == '-1') {
                lengthOrders.value = 1
                return funcDefaultOrders()
            }
            orders.value = defaultOrders.value.filter(order => order.order_status == selected1.value)
            lengthOrders.value = orders.value.length
        }
        const searchInput = () => {
            let word = search.value
            if (word.length) {
                orders.value = defaultOrders.value.filter((order: Order) => {
                    let result = (
                        order.order_id.toString().includes(word) ||
                        order.full_name.includes(word) ||
                        order.date.includes(word) ||
                        order.total.toString().includes(word) ||
                        order.order_status.toString().includes(word)
                    )
                    return result
                })
            } else {
                funcDefaultOrders()
            }
        }

        const funcDefaultOrders = () => {
            return orders.value = defaultOrders.value
        }

        onMounted(() => {
            loadOrders()
        })

        return {
            getStatus,
            getColorStatus,
            dateFormat,
            updateSelect1,
            searchInput,
            orders,
            errorMessage,
            selected1,
            option1,
            title,
            lengthOrders,
            search,
        }
    },
})
</script>