<template>
    <div class="container mx-auto">
        <div class="grid gap-4 md:grid-cols-2">
            <div class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <!-- Modal toggle -->
                <div class="flex justify-between">
                    <h5 class="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        รายละเอียดคำสั่งซื้อ
                    </h5>
                    <h5>
                        สถานะ <span
                            class="text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                            :class="getColorStatus(orderStatus)">
                            {{ getStatus(orderStatus) }}
                        </span>
                    </h5>
                </div>

                <div class="relative overflow-x-auto">
                    <table class="w-full text-base text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-base text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3 rounded-l-lg">
                                    ชื่อผลิตภัณฑ์
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    จำนวน
                                </th>
                                <th scope="col" class="px-6 py-3 rounded-r-lg">
                                    ราคา
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="({ product_id, name, quantity, price }, index) in arr_detail" :key="product_id"
                                class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row"
                                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {{ name }}
                                </th>
                                <td class="px-6 py-4">
                                    {{ quantity }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ price }}
                                </td>
                            </tr>
                        </tbody>
                        <tfoot class="border-y-2">
                            <tr class="font-semibold text-gray-900 dark:text-white">
                                <th scope="row" class="px-6 py-3 text-base">รวม</th>
                                <td class="px-6 py-3">{{ allQty }}</td>
                                <td class="px-6 py-3">{{ allPrice }}</td>
                            </tr>
                            <tr class="font-semibold text-gray-900 dark:text-white">
                                <th scope="row" class="px-6 py-3 text-base">ค่าจัดส่ง</th>
                                <td class="px-6 py-3"></td>
                                <td class="px-6 py-3">{{ allPriceDelivery }}</td>
                            </tr>
                            <tr class="font-semibold text-gray-900 dark:text-white">
                                <th scope="row" class="px-6 py-3 text-base">ชำระเงินทั้งหมด</th>
                                <td class="px-6 py-3"></td>
                                <td class="px-6 py-3">{{ Number(allPrice) + Number(allPriceDelivery) }}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div class="flex justify-between mt-5">
                    <h5 class="mb-5 text-base font-bold tracking-tight text-gray-900 dark:text-white">
                        ช่องทางการชำระเงิน : {{ (urlSlip) ? 'ธนาคาร' : 'ปลายทาง' }}
                    </h5>
                    <Modal v-if="urlSlip" :urlSlip="urlSlip" />
                </div>
            </div>
            <div class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h5 class="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    รายละเอียดผู้ซื้อ
                </h5>

                <dl class="w-full text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                    <div class="flex flex-col pb-3">
                        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">ชื่อ-สกุล</dt>
                        <dd class="text-lg font-semibold">{{ customer.full_name }}</dd>
                    </div>
                    <div class="flex flex-col py-3">
                        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">ที่อยู่</dt>
                        <dd class="text-lg font-semibold">{{ customer.address }}</dd>
                    </div>
                    <div class="flex flex-col pt-3">
                        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">เบอร์โทร</dt>
                        <dd class="text-lg font-semibold">{{ customer.mobile }}</dd>
                    </div>
                    <div class="flex flex-col pt-3">
                        <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">รายละเอียดจากผู้ซื้อ</dt>
                        <dd class="text-lg font-semibold">{{ (!customer.details) ? '-' : customer.details }}</dd>
                    </div>
                </dl>
            </div>

        </div>

        <div class="flex justify-center my-5">
            <button v-if="orderStatus + 1 != 4" type="button" @click="submitStatus"
                class="w-full lg:w-1/3 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                {{ getStatus(orderStatus + 1) }}
            </button>
        </div>

    </div>
</template>

<script lang="ts">
import axios from 'axios'

import Modal from '@/components/EditManageOrder.vue/Modal.vue'

interface Detail {
    product_id: number,
    name: string,
    quantity: number,
    price: number,
}

interface Customer {
    full_name: string,
    mobile: string,
    address: string,
    details: string,
    date: string,
}

export default {

    components: {
        Modal
    },

    data(): {
        arr_detail: Detail[],
        customer: Customer,
        allQty: Number,
        allPrice: Number,
        allPriceDelivery: Number,
        urlSlip: string,
        allStatus: {},
        orderStatus: number,
    } {
        return {
            arr_detail: [
                { product_id: 0, name: 's', quantity: 0, price: 0 },
            ],
            customer: {
                full_name: '',
                mobile: '',
                address: '',
                details: '',
                date: '',
            },
            allQty: 0,
            allPrice: 0,
            allPriceDelivery: 0,

            urlSlip: '',
            allStatus: [
                { 0: 'รอยืนยัน' },
                { 1: 'เตรียมจัดส่ง' },
                { 2: 'กำลังจัดส่ง' },
                { 3: 'จัดส่งสำเร็จ' },
                { 4: 'ยกเลิก' },
            ],

            orderStatus: 0,
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

        async submitStatus() {
            const result = await axios.put('http://localhost:3001/api/orders/' + this.$route.params.id, {
                order_status: this.orderStatus + 1
            })
            if (result) return this.$router.go(0)
        }
    },

    async mounted() {
        this.arr_detail.shift()
        const order_detail = await axios.get('http://localhost:3001/api/orders/detail/' + this.$route.params.id)
        order_detail.data.map(async (order: any) => {
            const { data } = await axios.get('http://localhost:3001/api/products')
            data.map((item: any) => {
                if (order.product_id == item.product_id) {
                    this.arr_detail.push({
                        product_id: order.product_id,
                        name: item.name,
                        quantity: order.quantity,
                        price: order.price,
                    })
                    this.allQty += order.quantity
                    this.allPrice += order.price
                }
            })

        })
        const order = await axios.get('http://localhost:3001/api/orders/' + this.$route.params.id)
        this.allPriceDelivery = order.data[0].delivery_price
        this.orderStatus = order.data[0].order_status

        this.customer.full_name = order.data[0].full_name
        this.customer.mobile = order.data[0].mobile
        this.customer.address = order.data[0].address
        this.customer.details = order.data[0].details
        this.customer.date = order.data[0].date

        const payment = await axios.get('http://localhost:3001/api/orders/payment/' + order.data[0].payment_id)
        this.urlSlip = payment.data[0].payment_image

    }

}

</script>