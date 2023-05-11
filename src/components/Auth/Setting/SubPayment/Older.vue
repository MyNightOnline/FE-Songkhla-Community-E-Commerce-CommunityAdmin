<script setup lang="ts">
import axiosClient from "@/utils/axios"
import { onMounted } from 'vue'
import {
    initAccordions,
    initCarousels,
    initCollapses,
    initDials,
    initDismisses,
    initDrawers,
    initDropdowns,
    initModals,
    initPopovers,
    initTabs,
    initTooltips
} from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
    initAccordions()
    initCarousels()
    initCollapses()
    initDials()
    initDismisses()
    initDrawers()
    initDropdowns()
    initModals()
    initPopovers()
    initTabs()
    initTooltips()
})
</script>
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
                        <button @click="getUpdateData(bank_id, bank_name, back_account, account_name)" type="button"
                            data-modal-target="medium-modal" data-modal-toggle="medium-modal"
                            class="font-medium text-green-600 dark:text-green-500 hover:underline mr-3">แก้ไข</button>
                        <button @click="deletePayment(bank_id)"
                            class="font-medium text-red-600 dark:text-red-500 hover:underline">ลบ</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <button @click="clearData" type="button" data-modal-target="defaultModal" data-modal-toggle="defaultModal"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        เพิ่มข้อมูล
    </button>

    <div id="defaultModal" tabindex="-1" aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative w-full max-w-2xl max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        เพิ่มช่องทางการชำระเงิน
                    </h3>
                    <button type="button" id="btndefaultModal"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="defaultModal">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-6 space-y-6">
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
                <!-- Modal footer -->
                <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button type="button" @click="addPayment"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        เพิ่มข้อมูล
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div id="medium-modal" tabindex="-1" aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative w-full max-w-2xl max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        แก้ไขช่องทางการชำระเงิน
                    </h3>
                    <button type="button" id="medium-modal"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="medium-modal">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-6 space-y-6">
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
                <!-- Modal footer -->
                <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button type="button" @click="updatePayment"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        เพิ่มข้อมูล
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

export default {

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
        async addPayment() {
            try {
                const back_account = this.back_account
                if (back_account.length != 10 || isNaN(Number(back_account))) return alert('โปรดกรอกหมายเลขบัญชีให้ถูกต้อง')
                const data = JSON.parse(localStorage.getItem('user')!)
                const postData = {
                    commu_id: data.commu_id,
                    bank_name: this.bank_name,
                    back_account: this.back_account,
                    account_name: this.account_name,
                }
                await axiosClient.post('/payment', postData)
                this.check_alert = 'เพิ่มบัญชีสำเร็จ'
                this.getPayment()
                document.getElementById('btndefaultModal')?.click()
            } catch (error) {
                console.error(error)
            }
        },
        clearData() {
            this.bank_id = 0
            this.bank_name = ''
            this.account_name = ''
            this.back_account = ''
        },
        getUpdateData(bank_id: number, bank_name: string, back_account: string, account_name: string) {
            this.bank_id = bank_id
            this.bank_name = bank_name
            this.account_name = account_name
            this.back_account = back_account
        },
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
                    await axiosClient.put(`/payment/${this.bank_id}`, postData)
                    this.check_alert = 'แก้ไขบัญชีสำเร็จ'
                    this.getPayment()
                    document.getElementById('medium-modal')?.click()
                }
            } catch (error) {
                console.error(error)
            }
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
        async getPayment() {
            const data = JSON.parse(localStorage.getItem('user')!)
            let getAllBank = await axiosClient.get('/payment')
            this.banks = getAllBank.data.filter((bank: any) => data.commu_id == bank.commu_id)
        }
    },
    async mounted() {
        this.getPayment()
    }

}

</script>