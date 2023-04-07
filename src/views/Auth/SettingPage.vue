<template>
    <div class="my-10 flex justify-center">
        <div
            class="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div v-if="alert"
                class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                role="alert">
                <span class="font-medium">{{ alert }}</span>
            </div>
            <form @submit.prevent="onSubmit">
                <h5 class="mb-6 text-xl font-medium text-gray-900 dark:text-white">
                    ข้อมูลร้านค้า</h5>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="shop_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            ชื่อร้านค้า</label>
                        <input v-model="shop_name" type="text" id="shop_name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Shop Name" required>
                    </div>
                    <div>
                        <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            ที่อยู่</label>
                        <input v-model="address" type="text" id="address"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="..." required>
                    </div>
                    <div>
                        <label for="mobile" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            เบอร์โทร</label>
                        <input v-model="mobile" type="text" id="mobile" maxlength="10"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="0XX-XXX-XXXX" required>
                    </div>
                    <div>
                        <label for="regis_code" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            รหัสทะเบียน</label>
                        <input v-model="regis_code" type="tel" id="regis_code"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="X-XX-XX-XX/X-XXXX" required>
                    </div>
                    <div>
                        <label for="amp" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            อำเภอ</label>
                        <select required id="amp" @change="getTam"
                            class="bg-gray-50 overflow-auto border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option disabled selected>
                                --- เลือกอำเภอ ---
                            </option>
                            <option v-for="(item, index) in ampAll" :key="index" :value="item.id">
                                {{ item.name_th }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label for="tam" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            ตำบล</label>
                        <select required id="tam"
                            class="bg-gray-50 overflow-auto border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option disabled selected>--- เลือกตำบล ---</option>
                            <option v-for="(item, index) in tamAll" :key="index" :value="item.nameTAM">
                                {{ item.nameTAM }}
                            </option>
                        </select>
                    </div>
                </div>

                <div>
                    <h3 class="flex items-center mr-4 font-semibold text-gray-900 dark:text-white">
                        ช่องทางชำระเงิน
                    </h3>
                    <div class="flex items-center mr-4">
                        <input disabled checked id="inline-disabled-checkbox" type="checkbox" value=""
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="inline-disabled-checkbox"
                            class="ml-2 w-24 text-sm font-medium text-gray-400 dark:text-gray-500">
                            ชำระปลายทาง
                        </label>
                    </div>
                    <div class="flex items-center">
                        <input id="inline-2-checkbox" type="checkbox" value="" :checked="!togglePrompay"
                            @click="changeToggle"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="inline-2-checkbox"
                            class="ml-2 w-24 text-sm font-medium text-gray-900 dark:text-gray-300">
                            พร้อมเพย์
                        </label>
                        <input type="text" id="small-input" :disabled="togglePrompay" v-model="promptpay"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                </div>

                <h5 class="my-6 text-xl font-medium text-gray-900 dark:text-white">
                    ข้อมูลผู้ใช้</h5>
                <div class="mb-6">
                    <label for="full_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        ชื่อเต็ม</label>
                    <input v-model="full_name" type="text" id="full_name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="full name" required>
                </div>
                <div class="mb-6">
                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        ชื่อผู้ใช้</label>
                    <input v-model="username" type="text" id="disabled-input" aria-label="disabled input"
                        class="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        disabled>
                </div>
                <div class="mb-6">
                    <label for="password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">รหัสผ่าน</label>
                    <input v-model="password" type="password" id="password"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="•••••••••">
                </div>
                <div class="mb-6">
                    <label for="confirm_password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ยืนยันรหัสผ่าน</label>
                    <input v-model="cf_password" type="password" id="confirm_password"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="•••••••••">
                </div>
                <button type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    บันทึก</button>
            </form>


        </div>
    </div>
</template>

<script lang="ts">
import { useUserStore } from "@/store/index"
import { getAmphure, getTambons } from '@/assets/functions/fetchAreaSongkhla'
import axios from "axios"
export default {
    setup() {
        const userStore = useUserStore()
        return { userStore }
    },
    data() {
        return {
            commu_id: "",
            users_commu_id: "",
            confirm_status: "",

            shop_name: "",
            address: "",
            mobile: "",
            promptpay: "",
            regis_code: "",
            selected_amp: "",
            selected_tam: "",

            full_name: "",
            username: "",
            password: "",
            cf_password: "",
            alert: "",

            ampAll: getAmphure(),
            tamAll: [{
                id: 0,
                nameTAM: '',
            }],

            togglePrompay: true,
        }
    },
    methods: {
        getTam() {
            var el = document.querySelector('#amp') as HTMLSelectElement
            var value = el.value
            const result = getTambons(Number(value))
            this.tamAll = []
            result.map(el => {
                this.tamAll.push(el)
            })
        },
        async onSubmit() {
            const password = this.password == this.cf_password
            if (!password) return alert('ใส่รหัสผ่านให้ตรงกัน')
            const sAMP = document.querySelector('#amp') as HTMLSelectElement
            const sTAM = document.querySelector('#tam') as HTMLSelectElement
            this.selected_amp = sAMP.options[sAMP.selectedIndex].text
            this.selected_tam = sTAM.options[sTAM.selectedIndex].text

            console.log(this.users_commu_id + ' ' + this.commu_id)

            await axios.put(`http://localhost:3001/api/commu/` + this.commu_id, {
                name: this.shop_name,
                address: this.address,
                mobile: this.mobile,
                promptpay: this.promptpay,
                regis_code: this.regis_code,
                amp: this.selected_amp,
                tam: this.selected_tam,
            })
            await axios.put(`http://localhost:3001/api/auth/users-community/` + this.users_commu_id, {
                full_name: this.full_name,
                password: this.password,
            })
            const data = JSON.parse(localStorage.getItem('user')!)
            this.userStore.user.full_name = data.full_name
            let changeData = {
                address: this.address,
                amp: this.selected_amp,
                commu_id: this.commu_id,
                confirm_status: this.confirm_status,
                full_name: this.full_name,
                mobile: this.mobile,
                promptpay: this.promptpay,
                name: this.shop_name,
                regis_code: this.regis_code,
                tam: this.selected_tam,
                username: this.username,
                users_commu_id: this.users_commu_id,
            }
            localStorage.setItem('user', JSON.stringify(changeData))
            this.alert = "อัปเดตข้อมูลสำเร็จ"
            scroll(0, 0)
        },
        changeToggle() {
            this.togglePrompay = !this.togglePrompay
            if (this.togglePrompay) this.promptpay = ''
            else {
                const data = JSON.parse(localStorage.getItem('user')!)
                this.promptpay = data.promptpay
            }
        },
    },
    mounted() {
        const data = JSON.parse(localStorage.getItem('user')!)
        this.commu_id = data.commu_id
        this.users_commu_id = data.users_commu_id

        this.shop_name = data.name
        this.address = data.address
        this.mobile = data.mobile
        if (data.promptpay) {
            console.log('on')
            this.promptpay = data.promptpay
            this.togglePrompay = false
        }

        this.regis_code = data.regis_code
        this.full_name = data.full_name
        this.username = data.username

        var el = document.querySelector('#amp') as HTMLSelectElement
        var el2 = document.querySelector('#tam') as HTMLSelectElement
        // var value = el.value
        el.options[el.selectedIndex].text = data.amp
        el2.options[el2.selectedIndex].text = data.tam

        this.selected_amp = data.amp
        this.selected_tam = data.tam
    }
}
</script>