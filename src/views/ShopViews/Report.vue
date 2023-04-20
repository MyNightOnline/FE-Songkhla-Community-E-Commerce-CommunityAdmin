<script setup lang="ts">

import { onMounted } from 'vue'
import { initTabs } from 'flowbite'
import axios from 'axios'

// initialize components based on data attribute selectors
onMounted(() => {
    initTabs()
})

const tabs = [
    { name: 'รายงานผลิตภัณฑ์', id: 'report-product-tab', target: 'all', },
    { name: 'รายงานรายได้', id: 'report-income-tab', target: 'paid', },
]

const dropdownRadio = [
    { name: 'ล่าสุด', value: 0 },
    { name: '7 วันล่าสุด', value: 1 },
    { name: '30 วันล่าสุด', value: 2 },
]

</script>

<template>
    <div class="max-w-5xl container mx-auto mt-12">
        <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
            <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent"
                role="tablist">
                <li v-for="{ name, id, target }, index in tabs" class="mr-2" role="presentation">
                    <button class="inline-block p-4 border-b-2 rounded-t-lg" :id="id" :data-tabs-target="`#${target}`"
                        type="button" role="tab" :aria-controls="target" aria-selected="false">
                        {{ name }}
                    </button>
                </li>
            </ul>
        </div>
        <div id="myTabContent">
            <div v-for="({ name, id, target }, index) in tabs" :id="target" role="tabpanel" :aria-labelledby="id">

                <div>
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                        <div class="flex items-center justify-between p-4">
                            <div class="">
                                <button id="dropdownRadioButton" data-dropdown-toggle="dropdownRadio"
                                    class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                    type="button">
                                    <svg class="w-4 h-4 mr-2 text-gray-400" aria-hidden="true" fill="currentColor"
                                        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    30 วันล่าสุด
                                    <svg class="w-3 h-3 ml-2" aria-hidden="true" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>
                                <!-- Dropdown menu -->
                                <div id="dropdownRadio"
                                    class="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                                    data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top"
                                    style="position: absolute; inset: auto auto 0px 0px; margin: 0px; transform: translate3d(522.5px, 3847.5px, 0px);">
                                    <ul class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                                        aria-labelledby="dropdownRadioButton">
                                        <li v-for="({ name, value }, index) in dropdownRadio" :key="index">
                                            <div
                                                class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <input @change="getValueRadio($event)"
                                                    :id="`filter-radio-example-1${value}`" type="radio" :value="value"
                                                    name="filter-radio"
                                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                                <label :for="`filter-radio-example-1${value}`"
                                                    class="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                                                    {{ name }}
                                                </label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <label for="table-search" class="sr-only">Search</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <input type="text" id="table-search"
                                    class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="ค้นหา">
                            </div>
                        </div>
                        <table class="w-[600px] md:w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        ชื่อ
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        ประเภท
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
                                <tr v-for="({ name, category_name, price, quantity }, index) in products" :key="index"
                                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                    <th scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {{ name }}
                                    </th>
                                    <td class="px-6 py-4">
                                        {{ category_name }}
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

            </div>
        </div>
    </div>
</template>

<script lang="ts">

export default {

    data() {
        return {
            dataUser: {
                users_commu_id: 0
            },
            products: [
                { name: '', category_id: 0, category_name: '', price: 0, quantity: 0 }
            ],
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
                        quantity: product.quantity,
                    }
                    this.products.push(json)
                }
            })
        },
        getValueRadio(v: any) {
            return v.target.value
        },
    },
    async mounted() {
        this.products.pop()
        this.dataUser = JSON.parse(localStorage.getItem('user')!)
        this.getProducts()
    }

}

</script>