<template>
    <div class="grid xl:grid-cols-3 gap-4">
        <div id="alert-additional-content-5"
            class="col-span-2 p-4 border border-gray-300 rounded-lg bg-gray-50 dark:border-gray-600 dark:bg-gray-800"
            role="alert">
            <div class="flex justify-between items-center">
                <div class="flex items-center">
                    <svg fill="currentColor" class="w-5 h-5 mr-2 text-green-800 dark:text-gray-300" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path clip-rule="evenodd" fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.536-4.464a.75.75 0 10-1.061-1.061 3.5 3.5 0 01-4.95 0 .75.75 0 00-1.06 1.06 5 5 0 007.07 0zM9 8.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S7.448 7 8 7s1 .672 1 1.5zm3 1.5c.552 0 1-.672 1-1.5S12.552 7 12 7s-1 .672-1 1.5.448 1.5 1 1.5z">
                        </path>
                    </svg>
                    <span class="sr-only">Info</span>
                    <h3 class="text-2xl font-medium text-gray-800 dark:text-gray-300">ยินดีต้อนรับ {{ full_name }}</h3>
                </div>
                <div class="flex items-center space-x-4">
                    <h1 class="text-xl">
                        สถานะ
                        <span v-if="dataCommunity.confirm_status == 0"
                            class="bg-gray-100 text-base text-gray-800 font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
                            ยังไม่อนุมัติ
                        </span>
                        <span v-else-if="dataCommunity.confirm_status == 1"
                            class="bg-green-100 text-green-800 text-base font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
                            อนุมัติแล้ว
                        </span>
                    </h1>
                    <button @click="goSettingCommu()">
                        <svg fill="none" class="text-gray-600 w-8 h-8" stroke="currentColor" stroke-width="1.5"
                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="mt-2 mb-4 text-base text-gray-800 dark:text-gray-300">
                <!-- <h1 class="text-lg">วิสาหกิจชุมชน <span>{{ dataCommu.name }}</span></h1>
                <h1 class="text-lg">รหัสทะเบียน <span>{{ dataCommu.regis_code }}</span></h1>
                <h1 class="text-lg">ที่อยู่ <span>{{ dataCommu.address }}</span></h1>
                <h1 class="text-lg">โทรศัพท์ <span>{{ dataCommu.mobile }}</span></h1> -->

                <dl class="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                    <div class="flex flex-col pb-3">
                        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">วิสาหกิจชุมชน</dt>
                        <dd class="text-lg font-semibold">{{ dataCommunity.name }}</dd>
                    </div>
                    <div class="flex flex-col py-3">
                        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">รหัสทะเบียน</dt>
                        <dd class="text-lg font-semibold">{{ formatRegisCode(dataCommunity.regis_code) }}</dd>
                    </div>
                    <div class="flex flex-col pt-3">
                        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">ที่อยู่</dt>
                        <dd class="text-lg font-semibold">{{ dataCommunity.address }}</dd>
                    </div>
                    <div class="flex flex-col pt-3">
                        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">โทรศัพท์</dt>
                        <dd class="text-lg font-semibold">{{ formatThaiMobileNumber(dataCommunity.mobile) }}</dd>
                    </div>
                </dl>

            </div>
        </div>
        <div v-if="length > 0">
            <a href="#"
                class="block justify-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div class="text-center" @click="toOrder()">
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
import { formatRegisCode } from '@/assets/functions/RegisCodeFormatter'
import { formatThaiMobileNumber } from '@/assets/functions/MobileFormatter'

export default defineComponent({
    setup() {
        const userStore = useUserStore()
        const full_name = userStore.user.full_name

        return {
            full_name,
            formatRegisCode,
            formatThaiMobileNumber
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
            length: 0,
            dataCommunity: {
                commu_id: 0,
                name: '',
                person: '',
                address: '',
                mobile: '',
                regis_code: '',
                amp: '',
                tam: '',
                confirm_status: 0,
                users_commu_id: 0,
            }
        }
    },
    methods: {
        toOrder() {
            location.href = '/manage-order'
        },
        async getFirst() {
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
        },
        async getDataCommu() {
            try {
                const data = JSON.parse(localStorage.getItem('user')!)
                const community = await axiosClient.get('/commu/' + data.commu_id)
                const dataCommu = community.data
                this.dataCommunity = dataCommu
                console.log(this.dataCommunity)
            } catch (error: any) {
                console.log(error)
            }
        },
        goSettingCommu() {
            location.href = '/setting/shop'
        }
    },
    mounted() {
        this.getFirst()
        this.getDataCommu()
    }
})
</script>

