<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div class="flex items-center justify-between p-4">
      <div>
        <h1>Text</h1>
      </div>
      <div class="flex items-center ">
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
        <div class="ml-5">
          <label for="underline_select" class="sr-only">Underline select</label>
          <select id="underline_select" @change="selectedProduct" v-model="selectedOption1"
            class="block py-2.5 px-0 w-full text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
            <option v-for="({ title, value }, index) in option1" :value="value" :key="index">{{ title }}</option>
          </select>
        </div>
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
                #{{ order_id }}
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
import { ref, onMounted } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import { th } from 'date-fns/locale'
import { endOfMonth, endOfYear, startOfMonth, startOfYear, subMonths } from 'date-fns'
import '@vuepic/vue-datepicker/dist/main.css'

let date = ref()

onMounted(async () => {
  const dataUser = JSON.parse(localStorage.getItem('user')!)
  const response = await axios.get('http://localhost:3001/api/orders/detail/users_commu_id/' + dataUser.users_commu_id)
  const lenReponse = response.data.filter((order: any) => order.order_status == 3).length

  date.value = [response.data[0].date, response.data[lenReponse - 1].date]
})

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

      selectedOption1: '-1',
      option1: [
        { value: '-1', title: 'ผลิตภัณฑ์ทั้งหมด' },
      ],

      sSelectedDate: '',
      eSelectedDate: '',
    }
  },
  async mounted() {
    const dataUser = JSON.parse(localStorage.getItem('user')!)
    const response = await axios.get('http://localhost:3001/api/orders/detail/users_commu_id/' + dataUser.users_commu_id)
    this.orders = response.data.filter((order: any) => order.order_status == 3)
    this.defaultOrders = response.data.filter((order: any) => order.order_status == 3)
    this.defaultOrders.forEach((item: any, index: any) => {
      this.option1.push({
        value: `${index + 1}`,
        title: item.name
      })
    })

    this.orders.map((order: any) => {
      this.totalAll += order.total
    })
    console.log(response.data.filter((order: any) => order.order_status == 3))

  },
  methods: {
    dateFormat(oldDate: any) {
      const formatter = new BuddhistDateFormatter(oldDate)
      const formattedDate = formatter.format()
      return formattedDate
    },
    selectedProduct(event: any) {
      let wordSelect = event.target.options[event.target.options.selectedIndex].text
      this.totalAll = 0
      console.log(this.totalAll)
      if (this.selectedOption1 == '-1') {
        this.orders = this.defaultOrders.filter((order: any) => {
          if (order.order_status == 3) {
            this.totalAll += order.total
            return order
          }
        })
      } else if (this.selectedOption1 != '-1') {
        this.orders = this.defaultOrders.filter((order: any) => {
          if (order.name == wordSelect && order.order_status == 3) {
            this.totalAll += order.total
            return order
          }
        })
      }

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

      // console.log(dstart)
      // console.log('ss:' + this.defaultOrders[0])

      if (text) {
        this.orders = this.defaultOrders.filter((order: any) => {
          return (this.dateFormat(order.date) > dstart)
        })
      } else {
        return ''
      }

      return dstart + ' - ' + dend

    }
  },
})
</script>
