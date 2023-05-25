<style>
.required:after {
    content: " *";
    color: red;
}
</style>
<template>
    <div class="sm:mr-64 flex justify-center my-10">
        <div
            class="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">

            <form @submit.prevent="onSubmit">
                <div>
                    <h5 class="mb-6 text-xl font-medium text-gray-900 dark:text-white">
                        ข้อมูลผู้ใช้</h5>
                    <div class="mb-6">
                        <label for="full_name"
                            class="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            ชื่อ-สกุล</label>
                        <input v-model="full_name" type="text" id="full_name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="ชื่อ-สกุล" required>
                    </div>
                    <div class="mb-6">
                        <label for="username" class="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            ชื่อผู้ใช้</label>
                        <input v-model="username" type="text" id="username"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="ชื่อผู้ใช้" required>
                    </div>
                    <div class="mb-6">
                        <label for="password"
                            class="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">รหัสผ่าน</label>
                        <input v-model="password" type="password" id="password"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="•••••••••" required>
                    </div>
                    <div class="mb-6">
                        <label for="confirm_password"
                            class="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">ยืนยันรหัสผ่าน</label>
                        <input v-model="cf_password" type="password" id="confirm_password"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="•••••••••" required>
                    </div>
                </div>
                <div>
                    <h5 class="mb-6 text-xl font-medium text-gray-900 dark:text-white">
                        ข้อมูลกลุ่มวิสาหกิจชุมชน</h5>
                    <div class="grid gap-6 mb-6 md:grid-cols-2">
                        <div class="col-span-2">
                            <label for="person" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                ผู้มีอำนาจแทนการ</label>
                            <input v-model="person" type="text" id="person"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="ชื่อ-สกุล">
                        </div>
                        <div>
                            <label for="shop_name"
                                class="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                ชื่อกลุ่มวิสาหกิจชุมชน</label>
                            <input v-model="shop_name" type="text" id="shop_name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="ชื่อกลุ่มวิสาหกิจชุมชน" required>
                        </div>
                        <div>
                            <label for="address"
                                class="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                ที่อยู่</label>
                            <input v-model="address" type="text" id="address"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="..." required>
                        </div>
                        <div>
                            <label for="mobile"
                                class="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                เบอร์โทรศัพท์</label>
                            <input v-model="mobile" type="text" id="mobile" maxlength="10"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="0XX-XXX-XXXX" required>
                        </div>
                        <div>
                            <label for="regis_code"
                                class="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                รหัสทะเบียน</label>
                            <input v-model="regis_code" type="tel" id="regis_code"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="X-XX-XX-XX/X-XXXX" required>
                        </div>
                        <div>
                            <label for="amp" class="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                            <label for="ะฟท" class="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                </div>
                <button type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    สมัคร</button>
            </form>


        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from "@/store/index"
import { getAmphure, getTambons } from '@/assets/functions/fetchAreaSongkhla'
export default defineComponent({
    setup() {
        const userStore = useUserStore()
        return { userStore }
    },
    data() {
        return {

            shop_name: "",
            person: "",
            address: "",
            mobile: "",
            regis_code: "",
            selected_amp: "",
            selected_tam: "",

            full_name: "",
            username: "",
            password: "",
            cf_password: "",
            err: "",

            ampAll: getAmphure(),
            tamAll: [{
                id: 0,
                nameTAM: '',
            }],
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

            const dataCommu = {
                username: this.username,
                password: this.password,
                full_name: this.full_name,

                name: this.shop_name,
                person: this.person,
                address: this.address,
                mobile: this.mobile,
                regis_code: this.regis_code,
                amp: this.selected_amp,
                tam: this.selected_tam,
                confirm_status: 1,
            }

            let resultSignup = await this.userStore.signUp(dataCommu)
            console.log(resultSignup)
        }
    },
    mounted() {
        this.tamAll.pop()
    },
})
</script>