<template>
    <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        แก้ไขช่องทางการชำระเงิน
    </h3>
    <div class="space-y-6">
        <div>
            <label for="default-input" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                ชื่อบัญชี
            </label>
            <input type="text" id="default-input" v-model="account_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </div>
        <div class="mt-3">
            <label for="default-input" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                เลขที่บัญชี
            </label>
            <input type="text" id="default-input" v-model="back_account"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </div>
        <div>
            <label for="countries" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                ธนาคาร
            </label>
            <select id="countries" v-model="bank_name" required
                class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option disabled value="">เลือกธนาคาร</option>
                <option v-for="({ name }, index) in bank_names" :key="index" :value="name">{{ name }}</option>
            </select>
        </div>
    </div>
    <div class="flex items-center mt-6 pt-6 border-gray-200 rounded-b dark:border-gray-600">
        <button type="button" @click="updatePayment"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            แก้ไขข้อมูล
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
    data() {
        return {
            bank_id: 0,
            bank_name: '',
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
        async updatePayment() {
            try {
                const back_account = this.back_account
                if (back_account.length != 10 || isNaN(Number(back_account))) return alert('โปรดกรอกหมายเลขบัญชีให้ถูกต้อง')
                if (confirm('ยืนยันการแก้ไข ?')) {

                    const data = JSON.parse(localStorage.getItem('user')!)
                    const postData = {
                        commu_id: data.commu_id,
                        bank_name: this.bank_name,
                        back_account: this.back_account,
                        account_name: this.account_name,
                    }
                    await axios.put(`http://localhost:3001/api/payment/${this.bank_id}`, postData)
                    this.$router.push('/setting/payment')
                }
            } catch (error) {
                console.error(error)
            }
        },
        async getPaymentId() {
            try {
                const getBackId = await axios.get('http://localhost:3001/api/payment/' + this.$route.params.id)
                const backData = getBackId.data[0]
                this.bank_id = backData.bank_id
                this.bank_name = backData.bank_name
                this.back_account = backData.back_account
                this.account_name = backData.account_name
            } catch (error) {
                console.error(error)
            }
        },
    },
    mounted() {
        this.getPaymentId()
    }
})
</script>
