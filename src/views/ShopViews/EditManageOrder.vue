<template>
    <div class="container mx-auto">

        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
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
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
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
                <br>
                <tfoot>
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


    </div>
</template>

<script lang="ts">
import axios from 'axios'

interface Detail {
    product_id: number,
    name: string,
    quantity: number,
    price: number
}

export default {

    data(): { arr_detail: Detail[], allQty: Number, allPrice: Number, allPriceDelivery: Number } {
        return {
            arr_detail: [
                { product_id: 0, name: 's', quantity: 0, price: 0 },
            ],
            allQty: 0,
            allPrice: 0,
            allPriceDelivery: 0,
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
                        price: order.price
                    })
                    this.allQty += order.quantity
                    this.allPrice += order.price
                }
            })

        })
        const order = await axios.get('http://localhost:3001/api/orders/' + this.$route.params.id)
        this.allPriceDelivery = order.data[0].delivery_price

        console.log(this.arr_detail)


    }

}

</script>