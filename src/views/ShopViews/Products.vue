<style>
img {
    width: 100%;
    object-fit: cover;
}
</style>

<template>
    <div class="container mx-auto">

        <div class="mt-16 mb-8 md:flex md:items-center md:justify-end">
            <!-- <h1 class="text-2xl">ยินดีต้อนรับคุณ <p class="text-2xl font-semibold inline">{{ 'รดิศ ลำสุณีกาญ' }}</p>
            </h1> -->
            <h1 class="text-xl">ผลิตภัณฑ์ทั้งหมดของคุณมี {{ count_products }} ชิ้น</h1>
        </div>

        <div class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5">

            <a :href="`/edit/${product_id}`"
                v-for="({ name, image_1, quantity, product_id, otop, price }, index) in products" :key="index"
                class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a :href="`/edit/${product_id}`">
                    <img class="rounded-t-lg w-full h-48" :src="image_1" alt="" />
                </a>
                <div class="p-5">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {{ name }}
                    </h5>
                    <div class="mb-5">
                        <p class="text-lg text-gray-700 dark:text-gray-400">
                            จำนวนสินค้า: {{ quantity }}
                        </p>
                        <Rating :get-star="otop" />
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-2xl font-bold text-gray-900 dark:text-white">{{ price }} บาท</span>
                        <button type="button"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            รายละเอียด
                        </button>
                    </div>
                </div>
            </a>

            <div>
                <a href="/add"
                    class="block max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <div class="grid justify-items-center">
                        <svg width="200" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
                        </svg>
                        <p class="text-2xl text-gray-700 dark:text-gray-400">
                            เพิ่มสินค้า
                        </p>
                    </div>
                </a>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from "@/store/index"
import axiosClient from "@/utils/axios"

import Rating from '@/components/HomePage/Rating.vue'

export default defineComponent({
    setup() {
        const userStore = useUserStore()
        return { userStore }
    },
    data() {
        return {
            products: [{
                product_id: '',
                name: '',
                price: '',
                quantity: '',
                otop: '',
                gram: '',
                image_1: '',
                image_2: '',
                image_3: '',
                users_commu_id: '',
                category_id: '',
                username: '',
                password: '',
                full_name: '',
            }],
            count_products: 0,
        }
    },
    components: {
        Rating
    },
    methods: {

    },
    async mounted() {
        this.products.pop()
        const data = JSON.parse(localStorage.getItem('user')!)
        const result = await axiosClient.get('/products/shop/' + data.users_commu_id)
        result.data.map((product: any) => {
            this.products.push(product)
        })
        this.count_products = this.products.length
        console.log(this.products)
    }
})
</script>