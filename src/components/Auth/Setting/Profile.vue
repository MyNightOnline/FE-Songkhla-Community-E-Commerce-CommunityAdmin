<template>
    <div v-if="check_alert"
        class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
        <span class="font-medium">
            {{ check_alert }}
        </span>
    </div>
    <h5 class="mb-6 text-xl font-bold text-gray-900 dark:text-white">
        ข้อมูลผู้ใช้
    </h5>
    <form @submit.prevent="updateUserComunity">
        <div class="mb-6">
            <label for="full_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                ชื่อ-สกุล</label>
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
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">รหัสผ่าน</label>
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
</template>

<script lang="ts">
import { useUserStore } from "@/store/index"
import axiosClient from "@/utils/axios"

export default {
    setup() {
        const userStore = useUserStore()
        return { userStore }
    },
    data() {
        return {
            users_commu_id: 0,

            full_name: '',
            username: '',
            password: '',
            cf_password: '',

            check_alert: '',
        }
    },
    methods: {
        async getUserCommunity() {

        },
        async updateUserComunity() {
            try {
                const password = this.password == this.cf_password
                if (!password) return alert('ใส่รหัสผ่านให้ตรงกัน')
                await axiosClient.put(`/auth/users-community/${this.users_commu_id}`, {
                    full_name: this.full_name,
                    password: this.password,
                })
                this.check_alert = "อัปเดตข้อมูลสำเร็จ"
            } catch (error) {
                console.log(error)
            }
        }
    },
    async mounted() {
        const data = JSON.parse(localStorage.getItem('user')!)
        this.users_commu_id = data.users_commu_id

        this.full_name = data.full_name
        this.username = data.username
    }
}

</script>