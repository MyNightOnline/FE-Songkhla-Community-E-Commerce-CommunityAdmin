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
                    <td class="px-6 py-4 text-right">
                        <a :href="`/setting/payment/edit/${bank_id}`"
                            class="font-medium text-green-600 dark:text-green-500 hover:underline mr-3">แก้ไข</a>
                        <button @click="deletePayment(bank_id)"
                            class="font-medium text-red-600 dark:text-red-500 hover:underline">ลบ</button>
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