<template>
    <OldPage v-if="false" />
    <NewPage />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import components
import OldPage from '@/components/Auth/SignUp/OldPage.vue'
import NewPage from '@/components/Auth/SignUp/NewPage.vue'

export default defineComponent({
    components: {
        OldPage,
        NewPage
    }
})
</script>