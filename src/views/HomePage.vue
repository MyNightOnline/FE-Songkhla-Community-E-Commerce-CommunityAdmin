<template>
    <div>
        <h1>Hello {{ userStore.getUser }}</h1>
    </div>
</template>

<script lang="ts">
import { useUserStore } from "@/store/index"
export default {
    setup() {
        const userStore = useUserStore()
        return { userStore }
    },
    data() {
        return {

        }
    },
    methods: {

    },
}
</script>