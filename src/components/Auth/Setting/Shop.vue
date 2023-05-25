<template>
    <div v-if="check_alert"
        class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
        <span class="font-medium">
            {{ check_alert }}
        </span>
    </div>
    <h5 class="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
        ข้อมูลกลุ่มวิสาหกิจชุมชน</h5>
    <form @submit.prevent="updatComunity">
        <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div class="col-span-2">
                <label for="person" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    ผู้มีอำนาจทำการแทน</label>
                <input v-model="person" type="text" id="person"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Shop Name" required>
            </div>
            <div>
                <label for="shop_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    ชื่อกลุ่มวิสาหกิจชุมชน</label>
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
                    เบอร์โทรศัพท์</label>
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
        <button type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            บันทึก</button>
    </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getAmphure, getTambons } from '@/assets/functions/fetchAreaSongkhla'
import axiosClient from "@/utils/axios"

export default defineComponent({

    data() {
        return {
            commu_id: 0,

            person: '',
            shop_name: '',
            address: '',
            mobile: '',
            regis_code: '',
            selected_amp: "",
            selected_tam: "",

            ampAll: getAmphure(),
            tamAll: [{
                id: 0,
                nameTAM: '',
            }],

            check_alert: '',
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
        async updatComunity() {
            try {
                const sAMP = document.querySelector('#amp') as HTMLSelectElement
                const sTAM = document.querySelector('#tam') as HTMLSelectElement
                this.selected_amp = sAMP.options[sAMP.selectedIndex].text
                this.selected_tam = sTAM.options[sTAM.selectedIndex].text

                await axiosClient.put(`/commu/${this.commu_id}`, {
                    person: this.person,
                    name: this.shop_name,
                    address: this.address,
                    mobile: this.mobile,
                    regis_code: this.regis_code,
                    amp: this.selected_amp,
                    tam: this.selected_tam,
                })

                this.check_alert = "อัปเดตข้อมูลสำเร็จ"
            } catch (error) {
                console.log(error)
            }
        },
    },
    async mounted() {
        const data = JSON.parse(localStorage.getItem('user')!)

        this.commu_id = data.commu_id

        this.shop_name = data.name
        this.person = data.person
        this.address = data.address
        this.mobile = data.mobile
        this.regis_code = data.regis_code

        this.selected_amp = data.amp
        this.selected_tam = data.tam
        var el = document.querySelector('#amp') as HTMLSelectElement
        var el2 = document.querySelector('#tam') as HTMLSelectElement
        el.options[el.selectedIndex].text = data.amp
        el2.options[el2.selectedIndex].text = data.tam
    }

})

</script>