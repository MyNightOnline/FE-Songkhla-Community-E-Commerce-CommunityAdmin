<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import DataTable from 'datatables.net-vue3'
import DataTablesLib from 'datatables.net'
import 'datatables.net-select'
import { BuddhistDateFormatter } from '@/assets/functions/BuddhistDateFormatter'
DataTable.use(DataTablesLib)

let data = ref([
    {
        order_id: '#25',
        full_name: 'รดิศ ลำสุณีกาญ',
        total: '245',
        date: '01-04-2566',
        order_status: '2',
    }
])
data.value.pop()
const table = ref()
const columns = [
    {
        data: 'order_id',
        title: 'order_id',
    },
    {
        data: 'full_name',
        title: 'full_name',
    },
    {
        data: 'total',
        title: 'total',
    },
    {
        data: 'order_status',
        title: 'order_status',
    },
    {
        data: 'date',
        title: 'date',
    },
]

function dateFormat(oldDate: any) {
    const formatter = new BuddhistDateFormatter(oldDate)
    const formattedDate = formatter.format()
    return formattedDate
}

async function add() {
    const data2 = JSON.parse(localStorage.getItem('user')!)
    const getOrders = await axios.get('http://localhost:3001/api/orders')
    const ordersData = getOrders.data

    ordersData.map((order: any) => {
        if (order.users_commu_id == data2.users_commu_id) {
            const date = order.date
            const date2 = new Date(date)
            data.value.push({
                order_id: order.order_id,
                full_name: order.full_name,
                total: order.total,
                date: dateFormat(date2),
                order_status: order.order_status,
            })
        }
    })

}

add()

</script>

<template>
    <div class="test2012">
        <DataTable class="display" :columns="columns" :data="data" :options="{ select: true }" ref="table" />
    </div>
</template>

<style>
@import 'datatables.net-dt';
</style>
