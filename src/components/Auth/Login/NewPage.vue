<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
                ระบบจัดการซื้อขายผลิตภัณฑ์กลุ่มวิสาหกิจชุมชนในจังหวัดสงขลา
            </a>
            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        เข้าสู่ระบบ
                    </h1>
                    <form class="space-y-4 md:space-y-6" @submit.prevent="login">
                        <div>
                            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                ชื่อผู้ใช้</label>
                            <input type="username" name="username" id="username"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                v-model="username" placeholder="username" required>
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                รหัสผ่าน</label>
                            <input type="password" name="password" id="password" placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                v-model="password" required>
                        </div>
                        <button type="submit"
                            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            เข้าสู่ระบบ</button>
                        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                            ยังไม่ได้ลงทะเบียน?
                            <RouterLink to="/signup" class="text-blue-700 hover:underline dark:text-blue-500">
                                สร้างบัญชี</RouterLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from "@/store/index"
export default defineComponent({
    setup() {
        const userStore = useUserStore()
        return { userStore }
    },
    data() {
        return {
            username: "user04",
            password: "1234",
            err: "",
        }
    },
    methods: {
        async login() {
            const res = await this.userStore.signIn(this.username, this.password)
            if (res == 'err') this.err = 'ชื่อผู้ใช้หรือรหัสผ่านผิด'
        },
    },
    mounted() {
    }
})
</script>