<template>
    <DefaultPayment />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import DefaultPayment from './SubPayment/DefaultPayment.vue'

export default defineComponent({
    components: {
        DefaultPayment
    }
})
</script>
