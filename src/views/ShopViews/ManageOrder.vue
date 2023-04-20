<script setup lang="ts">
import Table from '@/components/ManageOrder/Table.vue'

import { onMounted } from 'vue'
import { initTabs } from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
    initTabs()
})

const tabs = [
    { name: 'ทั้งหมด', id: 'all-tab', target: 'all', text: 'TAB 1' },
    { name: 'ชำระเงินแล้ว', id: 'paid-tab', target: 'paid', text: 'TAB 2' },
    { name: 'ยังไม่ชำระเงิน', id: 'unpaid-tab', target: 'alunpaidl', text: 'TAB 3' },
    { name: 'เตรียมผลิตภัณฑ์', id: 'prepare-the-product-tab', target: 'prepare', text: 'TAB 4' },
    { name: 'จัดส่งผลิตภัณฑ์', id: 'product-delivery-tab', target: 'product', text: 'TAB 5' },
]

</script>

<script lang="ts">
import axios from "axios"

export default {

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
                { name: 'ราคารวม' },
                { name: 'สถานะ' },
                { name: '' }
            ]
        }
    },

    methods: {
        getStatus(status_id: any) {
            if (status_id == 0) return 'ยังไม่ชำระเงิน'
            else if (status_id == 1) return 'ชำระเงินแล้ว'
            else if (status_id == 2) return 'เตรียมผลิตภัณฑ์'
            else if (status_id == 3) return 'จัดส่งผลิตภัณฑ์'
        },
        getColorStatus(status_id: any) {
            if (status_id == 0) return 'bg-blue-100 text-blue-800'
            else if (status_id == 1) return 'bg-orange-100 text-orange-800'
            else if (status_id == 2) return 'bg-green-100 text-green-800'
            else if (status_id == 3) return 'bg-green-100 text-green-800'
        },
        useFun(id: number) {

            if (id == 0) return ''
            else if (id == 1) {
                let count = this.orders.filter(order => order.order_status == id).length
                return (count == 0) ? '' : count
            }
            else if (id == 2) {
                let count = this.orders.filter(order => order.order_status == 0).length
                return (count == 0) ? '' : count
            }
            else if (id == 3) {
                let count = this.orders.filter(order => order.order_status == 2).length
                return (count == 0) ? '' : count
            }
            else if (id == 4) {
                let count = this.orders.filter(order => order.order_status == 3).length
                return (count == 0) ? '' : count
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
                    date: order.date,
                    order_status: order.order_status
                })
            }
        })
        this.orders.shift()

    },

}

</script>

<template>
    <div class="max-w-5xl container mx-auto mt-12">
        <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
            <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent"
                role="tablist">
                <li v-for="{ name, id, target }, index in tabs" class="mr-2" role="presentation">
                    <button class="inline-block p-4 border-b-2 rounded-t-lg" :id="id" :data-tabs-target="`#${target}`"
                        type="button" role="tab" :aria-controls="target" aria-selected="false">
                        {{ name }} <strong style="color:red">{{ useFun(index) }}</strong>
                    </button>
                </li>
            </ul>
        </div>
        <div id="myTabContent">
            <div v-for="({ name, id, target, text }, index) in tabs" :id="target" role="tabpanel" :aria-labelledby="id">

                <Table v-if="index == 0" :get-color-status="getColorStatus" :get-status="getStatus" :title="title"
                    :orders="orders" />

                <Table v-else-if="index == 1" :get-color-status="getColorStatus" :get-status="getStatus" :title="title"
                    :orders="orders.filter(order => order.order_status == 1)" />

                <Table v-else-if="index == 2" :get-color-status="getColorStatus" :get-status="getStatus" :title="title"
                    :orders="orders.filter(order => order.order_status == 0)" />

                <Table v-else-if="index == 3" :get-color-status="getColorStatus" :get-status="getStatus" :title="title"
                    :orders="orders.filter(order => order.order_status == 2)" />

                <Table v-else-if="index == 4" :get-color-status="getColorStatus" :get-status="getStatus" :title="title"
                    :orders="orders.filter(order => order.order_status == 3)" />


            </div>
        </div>
    </div>
</template>