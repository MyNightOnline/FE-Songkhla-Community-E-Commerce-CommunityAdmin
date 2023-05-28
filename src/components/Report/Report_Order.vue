<template>
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
                <tr v-for="({ order_id, full_name, total, date, order_status }, index) in orderByUsersCommuId" :key="index"
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
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { BuddhistDateFormatter } from '@/assets/functions/BuddhistDateFormatter'
import axiosClient from '@/utils/axios'

export default defineComponent({
    data() {
        return {
            orderByUsersCommuId: [
                {
                    "order_id": 101,
                    "full_name": "บวรรัช สุรศักดิ์อุดม",
                    "mobile": "0123456678",
                    "address": "3110 Mustang Rd Alvin TX 77511-4898 USA",
                    "details": "",
                    "date": "2023-05-22T17:00:00.000Z",
                    "order_status": 4,
                    "total_price": 500,
                    "delivery_price": 45,
                    "tracking_number": null,
                    "total": 545,
                    "users_id": 13,
                    "users_commu_id": 24,
                    "payment_id": 0
                }
            ],
            defaultOrderByUsersCommuId: [
                {
                    "order_id": 101,
                    "full_name": "บวรรัช สุรศักดิ์อุดม",
                    "mobile": "0123456678",
                    "address": "3110 Mustang Rd Alvin TX 77511-4898 USA",
                    "details": "",
                    "date": "2023-05-22T17:00:00.000Z",
                    "order_status": 4,
                    "total_price": 500,
                    "delivery_price": 45,
                    "tracking_number": null,
                    "total": 545,
                    "users_id": 13,
                    "users_commu_id": 24,
                    "payment_id": 0
                }
            ],
            title: [
                { name: 'รหัสคำสั่งซื้อ' },
                { name: 'ชื่อผู้ซื้อ' },
                { name: 'วันที่' },
                { name: 'ราคารวม' },
                { name: 'สถานะ' },
            ],
            lengthOrders: 0,
            selected1: '-1',
            option1: [
                { value: '-1', title: 'ทั้งหมด' },
                { value: '0', title: 'ยังไม่ชำระเงิน' },
                { value: '1', title: 'ชำระเงินแล้ว' },
                { value: '2', title: 'เตรียมผลิตภัณฑ์' },
                { value: '3', title: 'จัดส่งผลิตภัณฑ์' },
                { value: '4', title: 'ยกเลิก' },
            ],
            search: '',

        }
    },
    methods: {
        async getOrder() {
            this.orderByUsersCommuId.pop()
            this.defaultOrderByUsersCommuId.pop()
            const dataUser = JSON.parse(localStorage.getItem('user') || '[]')

            const order = await axiosClient.get('/orders')
            const dataOrder = order.data.sort((a: any, b: any) => b.order_id - a.order_id)

            const orderShop = dataOrder.filter((iOrder: any) => {
                return iOrder.users_commu_id == dataUser.users_commu_id
            })
            this.orderByUsersCommuId = orderShop
            this.defaultOrderByUsersCommuId = orderShop
            this.lengthOrders = orderShop.length

            // console.log(this.orderByUsersCommuId)
        },
        formatDate(date: any) {
            const _date = new Date(date)
            _date.setDate(_date.getDate() + 1)
            const formattedDate = _date.toISOString().split('T')[0]
            return formattedDate
        },
        getStatus(status_id: any) {
            if (status_id == 0) return 'ยังไม่ชำระเงิน'
            else if (status_id == 1) return 'ชำระเงินแล้ว'
            else if (status_id == 2) return 'เตรียมผลิตภัณฑ์'
            else if (status_id == 3) return 'จัดส่งผลิตภัณฑ์'
            else if (status_id == 4) return 'ยกเลิก'
        },
        getColorStatus(status_id: any) {
            if (status_id == 0) return 'bg-blue-100 text-blue-800'
            else if (status_id == 1) return 'bg-orange-100 text-orange-800'
            else if (status_id == 2) return 'bg-green-100 text-green-800'
            else if (status_id == 3) return 'bg-green-100 text-green-800'
            else if (status_id == 4) return 'bg-red-100 text-red-800'
        },
        dateFormat(oldDate: any) {
            const formatter = new BuddhistDateFormatter(oldDate)
            const formattedDate = formatter.format()
            return formattedDate
        },
        updateSelect1() {
            if (this.selected1 == '-1') {
                this.orderByUsersCommuId = this.defaultOrderByUsersCommuId
            } else {
                this.orderByUsersCommuId = this.defaultOrderByUsersCommuId.filter((order) => order.order_status == Number(this.selected1))
            }
        },
        searchInput() {

        }
    },
    mounted() {
        this.getOrder()
    }
})
</script>