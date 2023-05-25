<template>
    <div v-if="check_alert"
        class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
        <span class="font-medium">
            {{ check_alert }}
        </span>
    </div>

    <h5 class="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
        ช่องทางการชำระเงิน
    </h5>

    <div class="relative overflow-x-auto mb-10">
        <table class="w-full text-base text-left text-gray-500 dark:text-gray-400">
            <thead class="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        ชื่อธนาคาร
                    </th>
                    <th scope="col" class="px-6 py-3">
                        เลขบัญชี
                    </th>
                    <th scope="col" class="px-6 py-3">
                        ชื่อบัญชี
                    </th>
                    <th scope="col" class="px-6 py-3 text-right">
                        <!-- <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline"></a> -->
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="({ bank_id, bank_name, back_account, account_name }, index) in banks" :key="index"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ bank_name }}
                    </th>
                    <td class="px-6 py-4">
                        {{ back_account }}
                    </td>
                    <td class="px-6 py-4">
                        {{ account_name }}
                    </td>
                    <td class="px-6 py-4 text-right flex">
                        <button type="button" @click="editPayment(`/setting/payment/edit/${bank_id}`)"
                            class="mr-3 inline-flex items-center px-3 py-2 text-xs font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true">
                                <path
                                    d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z">
                                </path>
                            </svg>
                            แก้ไข
                        </button>
                        <button @click="deletePayment(bank_id)"
                            class="flex items-center font-medium text-red-600 dark:text-red-500 hover:underline">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true">
                                <path clip-rule="evenodd" fill-rule="evenodd"
                                    d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z">
                                </path>
                            </svg>
                            ลบ
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <a href="/setting/payment/add"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        เพิ่มข้อมูล
    </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axiosClient from "@/utils/axios"

export default defineComponent({

    data() {
        return {
            bank_id: 0,
            bank_name: '',
            check_alert: '',
            bank_names: [
                { name: 'ธนาคารกรุงเทพ' },
                { name: 'ธนาคารกรุงไทย' },
                { name: 'ธนาคารกรุงศรีอยุธยา' },
                { name: 'ธนาคารกสิกรไทย' },
                { name: 'ธนาคารทหารไทยธนชาต' },
                { name: 'ธนาคารซีไอเอ็มบี ไทย' },
                { name: 'ธนาคารไทยพาณิชย์' },
            ],
            back_account: '',
            account_name: '',
            banks: [
                { bank_id: 0, bank_name: '', back_account: '', account_name: '' },
            ]
        }
    },
    methods: {
        editPayment(to: any) {
            this.$router.push(to)
        },
        async getPayment() {
            const data = JSON.parse(localStorage.getItem('user')!)
            let getAllBank = await axiosClient.get('/payment')
            this.banks = getAllBank.data.filter((bank: any) => data.commu_id == bank.commu_id)
        },
        async deletePayment(id: number) {
            try {
                if (confirm('คุณต้องการลบ ?')) {
                    await axiosClient.delete('/payment/' + id)
                    this.check_alert = 'ลบบัญชีสำเร็จ'
                    this.getPayment()
                }
            } catch (error) {
                console.error(error)
            }
        },
    },
    async mounted() {
        this.getPayment()
    }

})
</script>