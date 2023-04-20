<script setup>
import { useUserStore } from "@/store/index"

import DefaultNavbar from './Navbar.vue'
import DefaultView from './View.vue'
import Sidebar from './Sidebar.vue'

const userStore = useUserStore()
</script>

<template>
    <DefaultNavbar />
    <Sidebar v-if="userStore.user.full_name" />
    <DefaultView />
</template>