<template>
    <VueDatePicker locale="th" lang="th" format="dd/MM/yyyy" position="left" v-model="date" range
        :preset-ranges="presetRanges" :partial-range="false" :enable-time-picker="false" cancelText="ปิด"
        selectText="บันทึก" @update:model-value="handleDate" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import { endOfMonth, endOfYear, startOfMonth, startOfYear, subMonths } from 'date-fns'
import '@vuepic/vue-datepicker/dist/main.css'

const date = ref()
const presetRanges = ref([
    { label: 'วันนี้', range: [new Date(), new Date()] },
    { label: 'เดือนนี้', range: [startOfMonth(new Date()), endOfMonth(new Date())] },
    {
        label: 'เดือนที่แล้ว',
        range: [startOfMonth(subMonths(new Date(), 1)), endOfMonth(subMonths(new Date(), 1))],
    },
])
const handleDate = (modelData: any) => {
    date.value = modelData
    // do something else with the data
    const day1 = date.value[0].getDate()
    const month1 = date.value[0].getMonth() + 1
    const year1 = date.value[0].getFullYear()

    const day2 = date.value[1].getDate()
    const month2 = date.value[1].getMonth() + 1
    const year2 = date.value[1].getFullYear()
    return `${day1}/${month1}/${year1} - ${day2}/${month2}/${year2}`
}
</script>

<script lang="ts">
// Your component logic here

export default {
    name: "VueDatePicker",
    // Other component options here
}
</script>