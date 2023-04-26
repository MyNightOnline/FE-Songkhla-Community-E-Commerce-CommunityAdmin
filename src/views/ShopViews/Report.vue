<script setup lang="ts">
import Report_All from '@/components/Report/Report_All.vue'
import Report_Order from '@/components/Report/Report_Order.vue'
import Report_Paid from '@/components/Report/Report_Paid.vue'
import { onMounted } from 'vue'
import {
    initTabs,
} from 'flowbite'
onMounted(() => {
    initTabs()
})

const tabs = [
    { name: 'รายงานผลิตภัณฑ์', id: 'report-product-tab', target: 'all', },
    { name: 'รายงานการสั่งซื้อผลิตภัณฑ์', id: 'report-product-tab', target: 'order', },
    { name: 'รายงานรายได้', id: 'report-income-tab', target: 'paid', },
]
</script>

<script lang="ts">
</script>

<template>
    <div class="container mx-auto mt-12">
        <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
            <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent"
                role="tablist">
                <li v-for="{ name, id, target }, index in tabs" :key="index" class="mr-2" role="presentation">
                    <button class="inline-block p-4 border-b-2 rounded-t-lg" :id="id" :data-tabs-target="`#${target}`"
                        type="button" role="tab" :aria-controls="target" aria-selected="false">
                        {{ name }}
                    </button>
                </li>
            </ul>
        </div>
        <div id="myTabContent">
            <div v-for="({ id, target }, index) in tabs" :key="index" :id="target" role="tabpanel" :aria-labelledby="id">

                <div v-if="target == 'all'">
                    <Report_All />
                </div>

                <div v-else-if="target == 'order'">
                    <Report_Order />
                </div>

                <div v-else-if="target == 'paid'">
                    <Report_Paid />
                </div>

            </div>
        </div>
    </div>
</template>

