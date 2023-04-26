<script setup lang="ts">
import { onMounted } from 'vue'
import {
    initDropdowns
} from 'flowbite'
onMounted(() => {
    initDropdowns()
})

const dropdownMenu = [
    { name: 'ทั่วไป', value: 0 },
    { name: 'OTOP 1 ดาว', value: 1 },
    { name: 'OTOP 2 ดาว', value: 2 },
    { name: 'OTOP 3 ดาว', value: 3 },
    { name: 'OTOP 4 ดาว', value: 4 },
    { name: 'OTOP 5 ดาว', value: 5 },
]
</script>
<script lang="ts">
import axios from 'axios'

interface ValProducts {
    name: string | string[]
    category_name: string | string[]
    price: { toString: () => string | string[] }
    otop: { toString: () => string | string[] }
}

export default {
    data() {
        return {
            search: '',
            checkedValues: [0, 1, 2, 3, 4, 5],
            dataUser: {
                users_commu_id: 0
            },
            products: [
                { name: '', category_id: 0, otop: 0, category_name: '', price: 0, quantity: 0 }
            ],
            defaultProducts: [
                { name: '', category_id: 0, otop: 0, category_name: '', price: 0, quantity: 0 }
            ],
            // Category 
            selected: '0',
            options: [
                { category_id: 'One', name: 'A' },
            ],
            // Level
            levelSelected: '0',
            dataEmty: false
        }
    },
    methods: {
        async getProducts() {
            let products = await axios.get('http://localhost:3001/api/products')
            products.data.forEach(async (product: any) => {
                if (product.users_commu_id == this.dataUser.users_commu_id) {
                    const { data } = await axios.get('http://localhost:3001/api/category/' + product.category_id)
                    let json = {
                        name: product.name,
                        category_id: product.category_id,
                        category_name: data.name,
                        price: product.price,
                        otop: product.otop,
                        quantity: product.quantity,
                    }
                    this.products.push(json)
                }
            })
            this.defaultProducts = this.products
        },
        getLevelOtop(otop: any) {
            if (otop == 0) return 'ทั่วไป'
            else if (otop == 1) return 'OTOP 1 ดาว'
            else if (otop == 2) return 'OTOP 2 ดาว'
            else if (otop == 3) return 'OTOP 3 ดาว'
            else if (otop == 4) return 'OTOP 4 ดาว'
            else if (otop == 5) return 'OTOP 5 ดาว'
        },
        getVal() {
            let word = this.search
            if (word.length) {
                this.products = this.defaultProducts.filter((val: ValProducts) => {
                    let result = (
                        val.name.includes(word) ||
                        val.category_name.includes(word) ||
                        val.price.toString().includes(word) ||
                        val.otop.toString().includes(word)
                    )
                    return result
                })
            } else {
                this.products = this.defaultProducts
            }
        },
        async getCategory() {
            const { data } = await axios.get('http://localhost:3001/api/category')
            this.options = data
        },
        categorySelect() {
            if (this.selected == "0") {
                this.products = this.defaultProducts
            } else {
                this.products = this.defaultProducts.filter(product => product.category_id.toString() == this.selected)
            }
            this.checkDataEmty()
        },
        levelSelect() {
            if (this.levelSelected == "0") {
                this.products = this.defaultProducts
            } else {
                this.products = this.defaultProducts.filter(product => product.otop.toString() == this.levelSelected)
            }
            this.checkDataEmty()
        },
        checkDataEmty() {
            if (this.products.length == 0) this.dataEmty = true
            else this.dataEmty = false
        }
    },
    mounted() {
        this.products.pop()
        this.defaultProducts.pop()
        this.dataUser = JSON.parse(localStorage.getItem('user')!)
        this.getProducts()
        this.options.pop()
        this.getCategory()
    }
}

</script>

<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        <div class="lg:flex lg:items-center lg:justify-end p-4">
            <div class="search mr-4 mb-2 lg:mb-0">
                <label for="table-search" class="sr-only">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <input v-model="search" @input="getVal()" type="text" id="table-search"
                        class="block w-full lg:w-80 p-2 pl-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="ค้นหา">
                </div>
            </div>
            <div class="mr-4 mb-2 lg:mb-0">
                <select id="small" v-model="selected" @change="categorySelect"
                    class="block py-2.5 px-0 w-full text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                    <option value="0">ประเภททั้งหมด</option>
                    <option v-for="({ category_id, name }, index) in options" :key="index" :value="category_id">{{ name }}
                    </option>
                </select>
            </div>
            <div class="mr-4 mb-2 lg:mb-0">
                <label for="underline_select2" class="sr-only">Underline select</label>
                <select id="underline_select2" v-model="levelSelected" @change="levelSelect"
                    class="block py-2.5 px-0 w-full text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                    <option value="0">ระดับทั้งหมด</option>
                    <option v-for="({ name, value }, index) in dropdownMenu" :key="index" :value="value">
                        {{ name }}
                    </option>
                </select>
            </div>
        </div>
        <div class="pb-28">
            <div v-if="dataEmty">
                <div class="flex items-center p-4 mb-4 text-lg max-w-sm ml-8 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert">
                    <svg aria-hidden="true" class="flex-shrink-0 inline w-6 h-6 mr-3" fill="currentColor"
                        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clip-rule="evenodd"></path>
                    </svg>
                    <span class="sr-only">Info</span>
                    <div>
                        <span class="font-medium">ไม่มีข้อมูล</span>
                    </div>
                </div>
            </div>
            <table v-else class="w-[600px] md:w-full text-base text-left text-gray-500 dark:text-gray-400">
                <thead class="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            ชื่อ
                        </th>
                        <th scope="col" class="px-6 py-3">
                            ประเภท
                        </th>
                        <th scope="col" class="px-6 py-3">
                            ระดับ
                        </th>
                        <th scope="col" class="px-6 py-3">
                            ราคา
                        </th>
                        <th scope="col" class="px-6 py-3">
                            จำนวน/คงเหลือ
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="({ name, category_name, otop, price, quantity }, index) in products" :key="index"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ name }}
                        </th>
                        <td class="px-6 py-4">
                            {{ category_name }}
                        </td>
                        <td class="px-6 py-4">
                            {{ getLevelOtop(otop) }}
                        </td>
                        <td class="px-6 py-4">
                            {{ price }}
                        </td>
                        <td class="px-6 py-4">
                            {{ quantity }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>