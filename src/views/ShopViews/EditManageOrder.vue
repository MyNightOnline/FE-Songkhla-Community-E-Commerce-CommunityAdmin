<style>
.required:after {
    content: " *";
    color: red;
}
</style>
<template>
    <div class="container mx-auto">
        <div class="grid gap-4 md:grid-cols-2">
            <div class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <!-- Modal toggle -->
                <div class="flex justify-between">
                    <h5 class="mb-5 text-base lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        รายละเอียดคำสั่งซื้อ #{{ $route.params.id }}
                    </h5>
                    <h5 class="text-base lg:text-lg">
                        สถานะ <span
                            class="text-sm lg:text-base font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
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
                            <tr v-for="({ name, quantity, price }, index) in arr_detail" :key="index"
                                class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row"
                                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {{ name }}
                                </th>
                                <td class="px-6 py-4">
                                    {{ quantity }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ price.toLocaleString('en-US') }}
                                </td>
                            </tr>
                        </tbody>
                        <tfoot class="border-y-2">
                            <tr class="font-semibold text-gray-900 dark:text-white">
                                <th scope="row" class="px-6 py-3 text-base">รวม</th>
                                <td class="px-6 py-3">{{ allQty }}</td>
                                <td class="px-6 py-3">{{ allPrice.toLocaleString('en-US') }}</td>
                            </tr>
                            <tr class="font-semibold text-gray-900 dark:text-white">
                                <th scope="row" class="px-6 py-3 text-base">ค่าจัดส่ง</th>
                                <td class="px-6 py-3"></td>
                                <td class="px-6 py-3">{{ allPriceDelivery.toLocaleString('en-US') }}</td>
                            </tr>
                            <tr class="font-semibold text-gray-900 dark:text-white">
                                <th scope="row" class="px-6 py-3 text-base">ชำระเงินทั้งหมด</th>
                                <td class="px-6 py-3"></td>
                                <td class="px-6 py-3">{{ (Number(allPrice) +
                                    Number(allPriceDelivery)).toLocaleString('en-US') }}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div class="flex justify-between mt-5">
                    <div class="flex items-end">
                        <Modal v-if="urlSlip && orderStatus != 0" :urlSlip="urlSlip" :orderId="$route.params.id" />
                    </div>
                    <div v-if="orderStatus > 1 && orderStatus != 4">
                        <label for="default-input"
                            class="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            หมายเลขพัสดุ
                        </label>
                        <input type="text" id="default-input-track" v-model="customer.tracking_number"
                            v-if="customer.tracking_number" disabled
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <input type="text" id="default-input" v-model="tracking" v-else
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                </div>


            </div>
            <div class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div class="flex justify-between">
                    <h5 class="mb-5 text-base lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        รายละเอียดผู้ซื้อ
                    </h5>
                    <h5 class="mb-5 text-base lg:text-lg font-medium tracking-tight text-gray-900 dark:text-white">
                        วันที่สั่งซื้อ {{ dateFormat(customer.date) }}
                    </h5>
                </div>

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
            <button v-if="orderStatus + 1 != 4 && orderStatus != 0 && orderStatus != 4" type="button"
                @click="(orderStatus == 2) ? submitStatus(2) : submitStatus(0)"
                class="w-full lg:w-1/3 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                {{ getStatus(orderStatus + 1) }}
            </button>
            <button v-else-if="orderStatus == 0" type="button" @click="cancelOrder($route.params.id, orderStatus)"
                class="w-full lg:w-1/3 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                ยกเลิกการสั่งซื้อ
            </button>
        </div>

    </div>
</template>

<script lang="ts">
import axiosClient from "@/utils/axios"
import { defineComponent } from 'vue'
import Modal from '@/components/EditManageOrder.vue/Modal.vue'
import { BuddhistDateFormatter } from '@/assets/functions/BuddhistDateFormatter'

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
    tracking_number: string,
}

export default defineComponent({

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
        tracking: string,
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
                tracking_number: '',
            },
            allQty: 0,
            allPrice: 0,
            allPriceDelivery: 0,

            urlSlip: '',
            allStatus: [
                { 0: 'ยังไม่ชำระเงิน' },
                { 1: 'ชำระเงินแล้ว' },
                { 2: 'เตรียมผลิตภัณฑ์' },
                { 3: 'จัดส่งผลิตภัณฑ์' },
            ],
            orderStatus: 0,
            tracking: '',
        }
    },

    methods: {
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
        async submitStatus(num: number) {
            if (num == 2) {
                if (this.tracking.length < 10) {
                    return alert('โปรดกรอกหมายเลขพัสดุให้ครบ')
                }
                if (confirm('หมายเลขพัสดุของคุณคือ ' + this.tracking)) {
                    const result = await axiosClient.put('/orders/' + this.$route.params.id, {
                        order_status: this.orderStatus + 1,
                        tracking_number: this.tracking
                    })
                    if (result) return this.$router.go(0)
                }
            } else {
                const detailsOrder = await axiosClient.get('/orders/detail/' + this.$route.params.id)
                const dataDetails = detailsOrder.data
                dataDetails.forEach(async (detail: any) => {
                    console.log(detail)
                    const getProduct = await axiosClient.get('/products/' + detail.product_id)
                    const qtyProduct = await getProduct.data.quantity
                    if (detail.quantity > qtyProduct) {
                        alert('มีผลิตภัณฑ์ไม่เพียงพอ ระบบจะยกเลิกคำสั่งซื้ออัตโนมัติ')
                        await axiosClient.put('/orders/' + this.$route.params.id, {
                            order_status: 4,
                        })
                        return this.$router.go(0)
                    }
                    await axiosClient.put('/products/qty/' + detail.product_id, {
                        "quantity": qtyProduct - detail.quantity
                    })
                })
                const result = await axiosClient.put('/orders/' + this.$route.params.id, {
                    order_status: this.orderStatus + 1,
                })
                if (result) return this.$router.go(0)
            }
        },
        dateFormat(oldDate: any) {
            const formatter = new BuddhistDateFormatter(oldDate)
            const formattedDate = formatter.format()
            return formattedDate
        },
        async cancelOrder(id: any, orderStatus: any) {
            console.log(orderStatus)
            if (orderStatus == 0) {
                await axiosClient.put('/orders/' + id, {
                    order_status: 4
                })
            } else {
                let order_details = await axiosClient.get('/orders/detail/' + id)
                await order_details.data.forEach(async (order_detail: any) => {
                    let getProduct = await axiosClient.get('/products/' + order_detail.product_id)
                    let updateQty = await axiosClient.put('/products/qty/' + getProduct.data.product_id, {
                        quantity: order_detail.quantity + getProduct.data.quantity
                    })
                    console.log(updateQty)
                    console.log(`** Update Qty Success.`)
                })
                await axiosClient.put('/orders/' + id, {
                    order_status: 4
                })
            }
            this.$router.go(0)
        },
    },

    async mounted() {

        const dataUser = JSON.parse(localStorage.getItem('user')!)
        // console.log(dataUser.users_commu_id)
        let checkPage = false
        let orderId = await axiosClient.get('/orders/' + this.$route.params.id)
        if (orderId.data.length > 0) {
            orderId.data.forEach((item: any) => {
                if (item.users_commu_id != dataUser.users_commu_id) {
                    checkPage = true
                }
            })
        }

        if (orderId.data.length == 0 || checkPage) {
            this.$router.push('/')
            alert('คุณไม่มีสิทธิ์เข้าถึง')
        }

        this.arr_detail.shift()
        const order_detail = await axiosClient.get('/orders/detail/' + this.$route.params.id)
        order_detail.data.map(async (order: any) => {
            const { data } = await axiosClient.get('/products')
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
        const order = await axiosClient.get('/orders/' + this.$route.params.id)
        this.allPriceDelivery = order.data.delivery_price
        this.orderStatus = order.data.order_status

        this.customer.full_name = order.data.full_name
        this.customer.mobile = order.data.mobile
        this.customer.address = order.data.address
        this.customer.details = order.data.details
        this.customer.date = order.data.date

        this.customer.tracking_number = order.data.tracking_number

        const payment = await axiosClient.get('/orders/payment/' + this.$route.params.id)
        this.urlSlip = payment.data.payment_image

    }

})

</script>