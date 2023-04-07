<script setup>
import Table from '@/components/ManageOrder/Table.vue'

import { onMounted } from 'vue'
import { initTabs } from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
    initTabs()
})

const tabs = [
    { name: 'ทั้งหมด', id: 'all-tab', target: 'all', text: 'TAB 1' },
    { name: 'ชำระเงินแล้ว', id: 'paid-tab', target: 'paid', text: 'TAB 2' },
    { name: 'ยังไม่ชำระเงิน', id: 'unpaid-tab', target: 'alunpaidl', text: 'TAB 3' },
    { name: 'เตรียมผลิตภัณฑ์', id: 'prepare-the-product-tab', target: 'prepare', text: 'TAB 4' },
    { name: 'จัดส่งผลิตภัณฑ์', id: 'product-delivery-tab', target: 'product', text: 'TAB 5' },
]

</script>

<template>
    <div class="max-w-5xl container mx-auto mt-12">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <Table />
        </div>
        <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
            <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent"
                role="tablist">
                <li v-for="{ name, id, target } in tabs" class="mr-2" role="presentation">
                    <button class="inline-block p-4 border-b-2 rounded-t-lg" :id="id" :data-tabs-target="`#${target}`"
                        type="button" role="tab" :aria-controls="target" aria-selected="false">
                        {{ name }} <strong style="color:red">10</strong>
                    </button>
                </li>
            </ul>
        </div>
        <div id="myTabContent">
            <div v-for="{ name, id, target, text } in tabs" class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                :id="target" role="tabpanel" :aria-labelledby="id">
                {{ text }}

                <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Product name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Color
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row"
                                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Apple MacBook Pro 17"
                                </th>
                                <td class="px-6 py-4">
                                    Silver
                                </td>
                                <td class="px-6 py-4">
                                    Laptop
                                </td>
                                <td class="px-6 py-4">
                                    $2999
                                </td>
                            </tr>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row"
                                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Microsoft Surface Pro
                                </th>
                                <td class="px-6 py-4">
                                    White
                                </td>
                                <td class="px-6 py-4">
                                    Laptop PC
                                </td>
                                <td class="px-6 py-4">
                                    $1999
                                </td>
                            </tr>
                            <tr class="bg-white dark:bg-gray-800">
                                <th scope="row"
                                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Magic Mouse 2
                                </th>
                                <td class="px-6 py-4">
                                    Black
                                </td>
                                <td class="px-6 py-4">
                                    Accessories
                                </td>
                                <td class="px-6 py-4">
                                    $99
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </div>
</template>