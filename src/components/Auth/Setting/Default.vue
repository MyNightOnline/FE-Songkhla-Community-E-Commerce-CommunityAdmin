<script setup lang="ts">
import Menu from "@/components/Auth/Setting/Menu.vue"
</script>

<template>
    <Menu />
    <div class="container mx-auto mt-20 border rounded-lg max-w-6xl p-5">
        <div>
            <RouterView />
        </div>
        <!-- <div class="grid md:grid-cols-4 gap-4">
            <div class="flex justify-center md:justify-end">
                
            </div>
            <div class="max-w-4xl md:col-span-3 border rounded-lg p-5">
                <RouterView />
            </div>
        </div> -->
    </div>
</template>