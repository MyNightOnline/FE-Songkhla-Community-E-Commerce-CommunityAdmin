<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div class="flex items-center justify-center p-4">
      <div class="w-64">
        <VueDatePicker locale="th" lang="th" :format="test" :format-locale="th" position="left" v-model="date" range
          :preset-ranges="presetRanges" :partial-range="false" :enable-time-picker="false" cancelText="ปิด"
          selectText="บันทึก" @update:model-value="test($event)">
          <template #year="{ year }">
            {{ year + 543 }}
          </template>
          <template #year-overlay-value="{ value }">
            {{ value + 543 }}
          </template>
        </VueDatePicker>
      </div>
    </div>

    <div class="relative overflow-x-auto">
      <div class="pb-52">
        <table class="w-full text-left text-gray-500 dark:text-gray-400 mb-98">
          <thead class="text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th v-for="({ name }, index) in title" :key="index" scope="col" class="px-6 py-3">
                {{ name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="({ order_id, name, date, total }, index) in orders" :key="index" class="bg-white dark:bg-gray-800">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {{ order_id }}
              </th>
              <td class="px-6 py-4">
                {{ name }}
              </td>
              <td class="px-6 py-4">
                {{ dateFormat(date) }}
              </td>
              <td class="px-6 py-4">
                {{ total }}
              </td>
            </tr>
          </tbody>
          <tfoot class="border-t-2">
            <tr class="font-semibold text-gray-900 dark:text-white">
              <th scope="row" class="px-6 py-3 text-base">รวม</th>
              <td class="px-6 py-3"></td>
              <td class="px-6 py-3"></td>
              <td class="px-6 py-3">{{ totalAll }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import { th } from 'date-fns/locale'
import { endOfMonth, endOfYear, startOfMonth, startOfYear, subMonths } from 'date-fns'
import '@vuepic/vue-datepicker/dist/main.css'

let date = ref(new Date(2023, 4, 30).toLocaleDateString('th-TH', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}))

console.log(date.value)

const presetRanges = ref([
  { label: 'วันนี้', range: [new Date(), new Date()] },
  { label: 'เดือนนี้', range: [startOfMonth(new Date()), endOfMonth(new Date())] },
  {
    label: 'เดือนที่แล้ว',
    range: [startOfMonth(subMonths(new Date(), 1)), endOfMonth(subMonths(new Date(), 1))],
  },
])
</script>

<script lang="ts">
import { defineComponent } from 'vue'
import { BuddhistDateFormatter } from '@/assets/functions/BuddhistDateFormatter'
import { OrderDetail } from '@/interfaces/OrderDetail'
import axios from 'axios'

export default defineComponent({
  components: {
    VueDatePicker,
  },
  data() {
    const title = [
      { name: 'รหัสคำสั่งซื้อ' },
      { name: 'ชื่อผลิตภัณฑ์' },
      { name: 'วันที่' },
      { name: 'ราคา' },
    ]
    let orders: OrderDetail[] = []
    let defaultOrders: OrderDetail[] = []
    return {
      orders,
      defaultOrders,
      title,
      totalAll: 0,
    }
  },
  async mounted() {
    const dataUser = JSON.parse(localStorage.getItem('user')!)
    const response = await axios.get('http://localhost:3001/api/orders/detail/users_commu_id/' + dataUser.users_commu_id)
    this.orders = response.data
    this.defaultOrders = response.data
    this.orders.map((item: any) => {
      this.totalAll += item.total
    })
  },
  methods: {
    dateFormat(oldDate: any) {
      const formatter = new BuddhistDateFormatter(oldDate)
      const formattedDate = formatter.format()
      return formattedDate
    },
    test(v: any) {
      const date1 = new Date(v[0])
      const date2 = new Date(v[1])

      const day1 = date1.getDate().toString().padStart(2, '0')
      const month1 = (date1.getMonth() + 1).toString().padStart(2, '0')
      const year1 = date1.getFullYear()

      const day2 = date2.getDate().toString().padStart(2, '0')
      const month2 = (date2.getMonth() + 1).toString().padStart(2, '0')
      const year2 = date2.getFullYear()

      const text = `${day1}/${month1}/${year1} - ${day2}/${month2}/${year2}`

      const dstart = `${day1}-${month1}-${year1 + 543}`
      const dend = `${day2}-${month2}-${year2 + 543}`

      console.log('date start: ' + dstart)
      console.log('date end: ' + dend)

      if (text) {
        this.orders = this.defaultOrders.filter((order: any) => (this.dateFormat(order.date) >= dstart && this.dateFormat(order.date) <= dend))
      }

      return dstart + ' - ' + dend

    }
  },
})
</script>
