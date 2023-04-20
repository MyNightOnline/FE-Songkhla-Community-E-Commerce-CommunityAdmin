<template>
    <table class="w-full text-base text-left text-gray-500 dark:text-gray-400">
        <thead class="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th v-for="({ name }, index) in title" scope="col" class="px-6 py-3">
                    {{ name }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="({ order_id, full_name, total, date, order_status }, index) in orders"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    #{{ order_id }}
                </th>
                <td class="px-6 py-4">
                    {{ full_name }}
                </td>
                <td class="px-6 py-4">
                    {{ date }}
                </td>

                <td class="px-6 py-4">
                    {{ total }}
                </td>
                <td class="px-6 py-4">
                    <span class="text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                        :class="getColorStatus(order_status)">
                        {{ getStatus(order_status) }}
                    </span>
                </td>
                <td class="px-6 py-4 text-center">
                    <a :href="'/manage-order/' + order_id"
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline">รายละเอียด</a>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
export default {
    props: [
        "getColorStatus",
        "getStatus",
        "title",
        "orders",
        "index",
    ],

}

</script>