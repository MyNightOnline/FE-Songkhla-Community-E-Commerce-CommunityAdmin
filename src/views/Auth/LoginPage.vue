<template>
    <OldPage v-if="false" />
    <NewPage />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import OldPage from '@/components/Auth/Login/OldPage.vue'
import NewPage from '@/components/Auth/Login/NewPage.vue'

export default defineComponent({
    components: {
        OldPage,
        NewPage
    }
})
</script>