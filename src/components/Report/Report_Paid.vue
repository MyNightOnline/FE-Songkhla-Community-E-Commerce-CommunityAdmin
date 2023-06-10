<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div class="flex items-center justify-between p-4">
      <div class="">
        <h1>{{ dateStart + ' - ' + dateEnd }}</h1>
      </div>
      <div class="flex items-center">

        <div class="mr-6">
          <label for="underline_select" class="sr-only">Underline select</label>
          <select id="underline_select" @change="selectedProduct" v-model="selectedOption1"
            class="block py-2.5 px-0 w-full text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
            <option v-for="({ title, value }, index) in option1" :value="value" :key="index">{{ title }}</option>
          </select>
        </div>

        <!-- Modal toggle -->
        <button data-modal-target="staticModal" data-modal-toggle="staticModal"
          class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button">
          เลือกช่วงเวลา
        </button>

        <!-- Main modal -->
        <div id="staticModal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true"
          class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div class="relative w-full max-w-2xl max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <!-- Modal header -->
              <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  เลือกช่วงเวลา
                </h3>
                <button type="button"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="staticModal">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"></path>
                  </svg>
                </button>
              </div>
              <!-- Modal body -->
              <div class="p-6 space-y-6">
                <div>

                  <div class="flex items-center mb-4">
                    <input checked id="default-radio-0" type="radio" value="0" name="default-radio" @input="controlClass"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="default-radio-0" class="ml-2 font-medium text-gray-900 dark:text-gray-300">
                      ทั้งหมด
                    </label>
                  </div>
                  <div class="flex items-center mb-4">
                    <input id="default-radio-1" type="radio" value="1" name="default-radio" @input="controlClass"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="default-radio-1" class="ml-2 font-medium text-gray-900 dark:text-gray-300">
                      วัน/เดือน/ปี
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input id="default-radio-2" type="radio" value="2" name="default-radio" @input="controlClass"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="default-radio-2" class="ml-2 font-medium text-gray-900 dark:text-gray-300">
                      เดือน/ปี
                    </label>
                  </div>

                </div>
                <div id="divdatepicker1" class="hidden">
                  <div class="w-64 flex items-center">
                    <div>
                      <input class="border border-gray-300 rounded px-2 py-1" id="datepicker" type="date">
                    </div>
                    <p class="mx-2">-</p>
                    <div>
                      <input class="border border-gray-300 rounded px-2 py-1" id="datepicker2" type="date">
                    </div>
                  </div>
                </div>
                <div id="divdatepicker2" class="hidden">
                  <div class="w-64 flex items-center">
                    <div style="width: 240px;">
                      <input class="border border-gray-300 rounded px-2 py-1" id="datepicker3" type="month" required>
                    </div>
                    <p class="mx-2">-</p>
                    <div style="width: 240px;">
                      <input class="border border-gray-300 rounded px-2 py-1" id="datepicker4" type="month" required>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Modal footer -->
              <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button data-modal-hide="staticModal" type="button" @click="test"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  ยืนยัน
                </button>
                <button data-modal-hide="staticModal" type="button"
                  class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                  ปิด
                </button>
              </div>
            </div>
          </div>
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
            <tr v-for="({ order_id, name, date, order_details_price }, index) in orders" :key="index"
              class="bg-white dark:bg-gray-800">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                #{{ order_id }}
              </th>
              <td class="px-6 py-4">
                {{ name }}
              </td>
              <td class="px-6 py-4">
                {{ date }}
              </td>
              <td class="px-6 py-4">
                {{ order_details_price }}
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


<script lang="ts">
import axiosClient from '@/utils/axios'
import { OrderDetail } from '@/interfaces/OrderDetail'
import { defineComponent } from 'vue'
import { BuddhistDateFormatter } from '@/assets/functions/BuddhistDateFormatter'

export default defineComponent({

  data() {
    let orders: OrderDetail[] = []
    let defaultOrders: OrderDetail[] = []
    return {
      title: [
        { name: 'รหัสคำสั่งซื้อ' },
        { name: 'ชื่อผลิตภัณฑ์' },
        { name: 'วันที่' },
        { name: 'ราคา' },
      ],
      orders,
      defaultOrders,
      totalAll: 0,
      selectedOption1: '-1',
      option1: [
        { value: '-1', title: 'ผลิตภัณฑ์ทั้งหมด' },
      ],
      dateStart: '',
      dateEnd: '',
    }
  },
  methods: {
    async getOrder() {
      const dataUser = JSON.parse(localStorage.getItem('user')!)
      const response = await axiosClient.get('/orders/commu-paid/' + dataUser.users_commu_id)
      this.defaultOrders = response.data.filter((order: any) => {
        const date = new Date(order.date)
        const formattedDate = date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        })
        order['date'] = formattedDate
        return order.order_status == 3
      })
      this.defaultOrders.forEach((item: any, index: any) => {
        this.option1.push({
          value: `${index + 1}`,
          title: item.name
        })
      })
      this.option1 = this.removeDuplicatesByProperty(this.option1, "title")
      this.orders = this.defaultOrders
      this.orders.map((order: any) => {
        this.totalAll += order.order_details_price
      })
      console.log(this.orders)
    },
    removeDuplicatesByProperty(arr: any, property: any) {
      const uniqueValues = new Set()
      const result = []

      for (const item of arr) {
        if (!uniqueValues.has(item[property])) {
          uniqueValues.add(item[property])
          result.push(item)
        }
      }

      return result
    },

    selectedProduct(event: any) {
      let wordSelect = event.target.options[event.target.options.selectedIndex].text
      this.totalAll = 0
      if (this.selectedOption1 == '-1') {
        this.orders = this.defaultOrders.filter((order: any) => {
          if (order.order_status == 3) {
            this.totalAll += order.order_details_price
            return order
          }
        })
      } else if (this.selectedOption1 != '-1') {
        this.orders = this.defaultOrders.filter((order: any) => {
          if (order.name == wordSelect && order.order_status == 3) {
            this.totalAll += order.order_details_price
            return order
          }
        })
      }
    },
    dateFormat(oldDate: any) {
      const formatter = new BuddhistDateFormatter(oldDate)
      const formattedDate = formatter.format()
      return formattedDate
    },
    test() {
      const inputRadio0 = document.querySelector('#default-radio-0') as HTMLInputElement
      const inputRadio1 = document.querySelector('#default-radio-1') as HTMLInputElement
      const inputRadio2 = document.querySelector('#default-radio-2') as HTMLInputElement

      const inputDate = document.querySelector('#datepicker') as HTMLInputElement
      const inputDate2 = document.querySelector('#datepicker2') as HTMLInputElement
      const inputDate3 = document.querySelector('#datepicker3') as HTMLInputElement
      const inputDate4 = document.querySelector('#datepicker4') as HTMLInputElement

      const dateVal = inputDate.value
      const dateVal2 = inputDate2.value
      const dateVal3 = inputDate3.value
      const dateVal4 = inputDate4.value

      const date = new Date(dateVal)
      const date2 = new Date(dateVal2)
      const date3 = new Date(dateVal3)
      const date4 = new Date(dateVal4)

      this.orders = this.defaultOrders
      this.totalAll = 0

      if (inputRadio0.checked) {
        this.orders = this.defaultOrders.filter((order: any) => {
          this.totalAll += order.order_details_price
          return order
        })
      } else if (inputRadio1.checked) {
        console.log('checked 1')
        this.dateStart = date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        })
        this.dateEnd = date2.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        })

        const dStart = (this.dateStart).toString()
        const dEnd = (this.dateEnd).toString()

        const datePartsdStart = dStart.split("/")
        const daydStart = parseInt(datePartsdStart[0], 10)
        const monthdStart = parseInt(datePartsdStart[1], 10) - 1
        const yeardStart = parseInt(datePartsdStart[2], 10)
        const datedStart = new Date(yeardStart, monthdStart, daydStart)

        const datePartsdEnd = dEnd.split("/")
        const daydEnd = parseInt(datePartsdEnd[0], 10)
        const monthdEnd = parseInt(datePartsdEnd[1], 10) - 1
        const yeardEnd = parseInt(datePartsdEnd[2], 10)
        const datedStartdEnd = new Date(yeardEnd, monthdEnd, daydEnd)

        console.log(dStart)
        console.log(dEnd)

        if (dStart && dEnd == 'Invalid Date') {
          console.log('in1')
          this.orders = this.orders.filter((order: any) => {
            if (order.date == dStart) {
              this.totalAll += order.order_details_price
              return order
            }
          })
        } else if (dEnd && dStart == 'Invalid Date') {
          console.log('in2')
          this.orders = this.orders.filter((order: any) => {
            if (order.date == dEnd) {
              this.totalAll += order.order_details_price
              return order
            }
          })
        } else if (dStart && dEnd) {
          console.log('in3')
          this.orders = this.orders.filter((order: any, index: any) => {
            const orderDate = (order.date).toString()
            const dateParts = orderDate.split("/")

            const day = parseInt(dateParts[0], 10)
            const month = parseInt(dateParts[1], 10) - 1 // Months in JavaScript are zero-based
            const year = parseInt(dateParts[2], 10)

            const date = new Date(year, month, day)

            if (date >= datedStart && date <= datedStartdEnd) {

              this.totalAll += order.order_details_price
              return order

            }

          })
        } else {
          console.log('in4')
          this.orders = this.defaultOrders
        }
      } else if (inputRadio2.checked) {
        console.log('checked 2')
        const in3 = date3.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        })
        const in4 = date4.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        })

        const dStart = (in3).toString()
        const dEnd = (in4).toString()

        if (dStart && dEnd == 'Invalid Date') {
          const dateString = dStart
          const [day, month, year] = dateString.split("/")
          const check1 = `${month}-${year}`

          this.orders = this.orders.filter((order: any) => {
            const [day2, month2, year2] = order.date.split("/")
            const check2 = `${month2}-${year2}`
            if (check1 == check2) {
              this.totalAll += order.order_details_price
              return order
            }
          })
        } else if (dEnd && dStart == 'Invalid Date') {
          const dateString = dEnd
          const [day, month, year] = dateString.split("/")
          const check1 = `${month}-${year}`

          this.orders = this.orders.filter((order: any) => {
            const [day2, month2, year2] = order.date.split("/")
            const check2 = `${month2}-${year2}`
            if (check1 == check2) {
              this.totalAll += order.order_details_price
              return order
            }
          })
        } else if (dStart && dEnd) {
          console.log('in hear')
          const dateString1 = dStart
          const [day1, month1, year1] = dateString1.split("/")
          const check1 = `${month1}-${year1}`

          const dateString2 = dEnd
          const [day2, month2, year2] = dateString2.split("/")
          const check2 = `${month2}-${year2}`

          this.orders = this.defaultOrders.filter((order: any) => {
            const [day3, month3, year3] = order.date.split("/")
            const check3 = `${month3}-${year3}`
            console.log(check3)
            if (check3 >= check1 && check3 <= check2) {
              this.totalAll += order.order_details_price
              return order
            }
          })
        } else {
          this.orders = this.defaultOrders
        }
      }

    },
    controlClass() {
      const inputRadio1 = document.querySelector('#default-radio-1') as HTMLInputElement
      const inputRadio2 = document.querySelector('#default-radio-2') as HTMLInputElement

      const div1 = document.querySelector('#divdatepicker1') as HTMLDivElement
      const div2 = document.querySelector('#divdatepicker2') as HTMLDivElement
      if (inputRadio1.checked) {
        div1.classList.remove('hidden')
        div1.classList.add('block')
        div2.classList.remove('block')
        div2.classList.add('hidden')
      } else if (inputRadio2.checked) {
        div1.classList.remove('block')
        div1.classList.add('hidden')
        div2.classList.remove('hidden')
        div2.classList.add('block')
      }
    }
  },
  mounted() {
    this.getOrder()
  }
})
</script>

