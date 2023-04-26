

<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 pb-96">

        <div>
            <form @submit.prevent="myMethod">
                <VueDatePicker locale="th" lang="th" format="dd/MM/yyyy" position="left" v-model="date" range
                    :preset-ranges="presetRanges" :partial-range="false" :enable-time-picker="false" cancelText="ปิด"
                    selectText="บันทึก" @update:model-value="handleDate" />
                <input type="submit" value="Submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            </form>
            <button @click="test" type="button"
                class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                Purple
            </button>
            <button @click="reset" type="button"
                class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                Reset
            </button>
        </div>

        <table class="w-[980px] sm:w-[1000px] xl:w-full text-base text-left text-gray-500 dark:text-gray-400">
            <thead class="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th v-for="({ name }, index) in title" :key="index" scope="col" class="px-6 py-3">
                        {{ name }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="({ order_id, full_name, total, date, order_status }, index) in newOrders" :key="index"
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
                    <td class="px-6 py-4 text-center">
                        <a :href="'/manage-order/' + order_id"
                            class="font-medium text-blue-600 dark:text-blue-500 hover:underline">รายละเอียด</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- <table class="w-full text-base text-left text-gray-500 dark:text-gray-400">
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
                    {{ total }}
                </td>
                <td class="px-6 py-4">
                    <span class="text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                        :class="getColorStatus(order_status)">
                        {{ getStatus(order_status) }}
                    </span>
                </td>
                <td class="px-6 py-4 text-center">
                    <a :href="'/manage-order/' + order_id"
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline">รายละเอียด</a>
                </td>
            </tr>
        </tbody>
    </table> -->
</template>

<script lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
// import { format } from 'date-fns'
import { ref } from 'vue'
import { endOfMonth, endOfYear, startOfMonth, startOfYear, subMonths } from 'date-fns'
import '@vuepic/vue-datepicker/dist/main.css'
import axios from 'axios'
export default {
    props: [
        "getColorStatus",
        "getStatus",
        "title",
        "orders",
        "index",
    ],
    components: {
        VueDatePicker
    },
    setup() {
        let ds = ``
        let de = ``

        const date = ref()
        const presetRanges = ref([
            { label: 'วันนี้', range: [new Date(), new Date()] },
            { label: 'เดือนนี้', range: [startOfMonth(new Date()), endOfMonth(new Date())] },
            {
                label: 'เดือนที่แล้ว',
                range: [startOfMonth(subMonths(new Date(), 1)), endOfMonth(subMonths(new Date(), 1))],
            },
        ])

        const formatDate = (dateString: any) => {
            if (!dateString || typeof dateString !== 'string') {
                return ''
            }
            const dateParts = dateString.split('-')
            const year = dateParts[0]
            const month = dateParts[1]
            const day = dateParts[2]

            const formattedDate = `${day}-${month}-${year}`
            return formattedDate
        }

        return {
            presetRanges,
            date,
            formatDate,
            ds,
            de,
        }
    },
    data() {
        return {
            newOrders: [{
                order_id: null,
                full_name: null,
                total: null,
                date: null,
                order_status: 0,
            }],
            _ds: '',
            _de: '',
        }
    },
    created() {
        this.newOrders.pop()
        this.newOrders = this.orders
    },
    methods: {
        test() {
            this.reset()
            const startDate = this._ds
            const endDate = this._de
            let count = 0
            const filteredOrders = this.newOrders.filter((order: any) => {
                count++
                console.log(count)
                console.log(order.date)
                console.log(`${startDate} - ${endDate}`)
                return order.date >= startDate && order.date <= endDate
            })
            this.newOrders = filteredOrders
        },
        reset() {
            this.newOrders = this.orders
        },
        handleDate(modelData: any) {
            const date = ref()
            date.value = modelData
            // do something else with the data
            const day1 = date.value[0].getDate()
            const month1 = date.value[0].getMonth() + 1
            const year1 = date.value[0].getFullYear()

            const day2 = date.value[1].getDate()
            const month2 = date.value[1].getMonth() + 1
            const year2 = date.value[1].getFullYear()

            let month11 = month1.toString().padStart(2, "0")
            let month22 = month2.toString().padStart(2, "0")
            let day11 = day1.toString().padStart(2, "0")
            let day22 = day2.toString().padStart(2, "0")

            this._ds = `${year1}-${month11}-${day11}`
            this._de = `${year2}-${month22}-${day22}`
            console.log(this._ds)
            console.log(this._de)
            // return `${ds} - ${de}`
        },
        async myMethod() {
            let { data } = await axios.post('http://localhost:3001/api/orders', {
                "full_name": "รดิศ ลำสุณีกาญ",
                "mobile": "0622199310",
                "address": "146/5",
                "order_status": "1",
                "total_price": "200",
                "delivery_price": "45",
                "total": "245",
                "users_id": "3",
                "users_commu_id": "24",
                "payment_id": "1",
                "date": this._ds
            })
            console.log(await data)
        }
    }
}

</script>