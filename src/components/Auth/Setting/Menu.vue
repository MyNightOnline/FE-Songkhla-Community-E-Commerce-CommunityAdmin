<template>
  <div class="border-b border-gray-200 dark:border-gray-700">
        <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            <li class="mr-2">
                <a href="/setting/profile" :class="toggleClassA('/setting/profile')">
                    <svg aria-hidden="true" :class="toggleClassSVG('/setting/profile')" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" 
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd">
                        </path>
                    </svg>
                    ข้อมูลผู้ใช้
                </a>
            </li>
            <li class="mr-2">
                <a href="/setting/shop" :class="toggleClassA('/setting/shop')" aria-current="page">
                    <svg fill="currentColor" :class="toggleClassSVG('/setting/shop')" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path
                            d="M2.879 7.121A3 3 0 007.5 6.66a2.997 2.997 0 002.5 1.34 2.997 2.997 0 002.5-1.34 3 3 0 104.622-3.78l-.293-.293A2 2 0 0015.415 2H4.585a2 2 0 00-1.414.586l-.292.292a3 3 0 000 4.243zM3 9.032a4.507 4.507 0 004.5-.29A4.48 4.48 0 0010 9.5a4.48 4.48 0 002.5-.758 4.507 4.507 0 004.5.29V16.5h.25a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75v-3.5a.75.75 0 00-.75-.75h-2.5a.75.75 0 00-.75.75v3.5a.75.75 0 01-.75.75h-4.5a.75.75 0 010-1.5H3V9.032z">
                        </path>
                    </svg>
                    ข้อมูลร้านค้า
                </a>
            </li>
            <li class="mr-2">
                <a href="/setting/payment" :class="toggleClassA('/setting/payment')">
                    <svg fill="currentColor" :class="toggleClassSVG('/setting/payment')" viewBox="0 0 20 20" 
                        xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path clip-rule="evenodd" fill-rule="evenodd"
                            d="M2.5 4A1.5 1.5 0 001 5.5V6h18v-.5A1.5 1.5 0 0017.5 4h-15zM19 8.5H1v6A1.5 1.5 0 002.5 16h15a1.5 1.5 0 001.5-1.5v-6zM3 13.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm4.75-.75a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z">
                        </path>
                    </svg>
                    ช่องทางชำระเงิน
                </a>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
export default {

    methods: {
        toggleClassSVG(pathz:any) {
            if (this.$route.path == pathz) {
                return 'w-5 h-5 mr-2 text-blue-600 dark:text-blue-500'
            } else {
                return 'w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300'
            }
        },
        toggleClassA(pathz: any) {
            if (this.$route.path == pathz) {
                return 'inline-flex p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group'
            } else {
                return 'inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group'
            }
        }
    },

}
</script>
